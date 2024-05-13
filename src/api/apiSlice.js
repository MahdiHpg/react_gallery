import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = import.meta.env.VITE_PEXEL_API_KEY;
let perPageCount = 15;
let pageNumber = 1;

const imagesAdapter = createEntityAdapter({
  selectId: (image) => image.id,
});

const initialState = imagesAdapter.getInitialState({
  defaultPage: 1,
  nextPage: null,
  prevPage: null,
});

export const fetchImages = createAsyncThunk("fetchImages", async (url) => {
  let data;
  let response;

  !url
    ? (response = await axios.get(
        `https://api.pexels.com/v1/curated?page=1&per_page=${perPageCount}`,
        {
          headers: { Authorization: apiKey },
        }
      ))
    : (response = await axios.get(url, {
        headers: { Authorization: apiKey },
      }));

  data = response.data;

  console.log(data);
  return data;
});

export const nextPageImages = () => async (dispatch, getState) => {
  dispatch(loadNextPage());
  const state = getState();

  try {
    await dispatch(fetchImages(state.images.defaultPage));
  } catch (error) {
    console.error("Error fetching images:", error.message);
  }
};

export const prevPageImages = () => async (dispatch, getState) => {
  dispatch(prevPage());
  const state = getState();

  try {
    await dispatch(fetchImages(state.images.defaultPage));
  } catch (error) {
    console.error("Error fetching images:", error.message);
  }
};

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    loadNextPage: (state, action) => {
      state.defaultPage += 1;
    },
    prevPage: (state, action) => {
      state.defaultPage -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.photos) {
          imagesAdapter.setAll(state, action.payload.photos);
        }

        state.defaultPage = action.payload.page;
        state.nextPage = action.payload.next_page;
        state.prevPage = action.payload.prev_page;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // .addCase(fetchImages.fulfilled, (state, action) => {
    //   state.status = "success";
    //   const photosData = action.payload.photos; // استخراج بخش photos
    //   const photosToUpsert = photosData.map((photo) => ({
    //     id: photo.id,
    //     alt: photo.alt,
    //     url: photo.url,
    //     photographer: photo.photographer,
    //     large2x: photo.src.large2x, // اضافه کردن ویژگی large2x
    //   }));
    //   imagesAdapter.upsertMany(state, photosToUpsert);
    // })
  },
});

export const {
  selectAll: selectAllImages,
  selectById: selectImageById,
  selectIds: selectImageIds,
} = imagesAdapter.getSelectors((state) => state.images);

export const { loadNextPage, prevPage, searchAct } = imageSlice.actions;

export default imageSlice.reducer;
