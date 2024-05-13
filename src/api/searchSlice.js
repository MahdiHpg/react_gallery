import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = import.meta.env.VITE_PEXEL_API_KEY;

const searchImagesAdapter = createEntityAdapter({
  selectId: (image) => image.id,
});

const initialState = searchImagesAdapter.getInitialState({
  searchNextPage: null,
  searchPrevPage: null,
  searchQuery: "",
  isSearchState: "not-search",
  pageNumber: 1,
  total_results: null,
});

export const fetchImagesBySearch = createAsyncThunk(
  "fetchImagesBySearch",
  async (url, thunkAPI) => {
    const state = thunkAPI.getState();
    let data;

    // console.log("url: ", url);

    const response = await axios.get(url, {
      headers: { Authorization: apiKey },
    });

    data = response.data;
    // console.log("data of fetchImagesBySearch : ", response.data);
    return data;
  }
);

// .........................................................
// .........................................................
// export const fetchImagesBySearch = createAsyncThunk(
//   "fetchImagesBySearch",
//   async (_, thunkAPI) => {
//     const state = thunkAPI.getState();
//     try {
//       const response = await client.photos.search({
//         query: state.imagesSearched.searchQuery,
//         per_page: perPageCount,
//         page: 1,
//       });
//       console.log(response);
//       return response;
//     } catch (error) {
//       console.error("Error in fetchSearchedPhotos:", error.message);
//       throw error;
//     }
//   }
// );

// .........................................................
// .........................................................
// export const fetchImagesBySearch = createAsyncThunk(
//   "fetchImagesBySearch",
//   async (query, page) => {
//     let data;

//     const response = await axios.get(
//       `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=${perPageCount}`,
//       {
//         headers: { Authorization: apiKey },
//       }
//     );
//     data = response.data;

//     console.log(data);
//     return data;
//   }
// );

const imageSearchedSlice = createSlice({
  name: "imagesSearched",
  initialState,
  reducers: {
    searchAct: (state, action) => {
      state.searchQuery = action.payload;
      // console.log("state.searchQuery : " + state.searchQuery);
    },
    isSearchAct: (state, action) => {
      state.isSearchState = action.payload;
      // console.log("state.isSearchState : " + state.isSearchState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImagesBySearch.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchImagesBySearch.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.photos) {
          searchImagesAdapter.setAll(state, action.payload.photos);
        }

        state.total_results = action.payload.total_results;
        // console.log("state.total_results : " + state.total_results);
        state.pageNumber = action.payload.page;
        state.searchNextPage = action.payload.next_page;
        state.searchPrevPage = action.payload.prev_page;
      })
      .addCase(fetchImagesBySearch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllSearchedImages,
  selectById: selectSearchedImageById,
  selectIds: selectSearchedImageIds,
} = searchImagesAdapter.getSelectors((state) => state.imagesSearched);

export const { searchAct, isSearchAct } = imageSearchedSlice.actions;

export default imageSearchedSlice.reducer;
