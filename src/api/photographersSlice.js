import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = import.meta.env.VITE_PEXEL_API_KEY;

const photographersAdapter = createEntityAdapter({
  selectId: (image) => image.id,
});

const initialState = photographersAdapter.getInitialState({
  // searchNextPage: null,
  // searchPrevPage: null,
  // searchQuery: "",
  // isSearchState: "not-search",
  // pageNumber: 1,
  // total_results: null,
});

export const fetchAllPhotographers = createAsyncThunk(
  "/photoGraphers/fetchAllPhotographers",
  async (url) => {
    let data;
    let response;

    !url
      ? (response = await axios.get(
          `https://api.pexels.com/v1/curated?page=1&per_page=70`,
          {
            headers: { Authorization: apiKey },
          }
        ))
      : (response = await axios.get(url, {
          headers: { Authorization: apiKey },
        }));

    data = response.data;

    console.log("fetchAllPhotographers : " + data);
    return data;
  }
);

const photographersSlice = createSlice({
  name: "photographers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPhotographers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAllPhotographers.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload.photos) {
          photographersAdapter.setAll(state, action.payload.photos);
        }

        // state.total_results = action.payload.total_results;
        // console.log("state.total_results : " + state.total_results);
        // state.pageNumber = action.payload.page;
        // state.searchNextPage = action.payload.next_page;
        // state.searchPrevPage = action.payload.prev_page;
      })
      .addCase(fetchAllPhotographers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAllPhotographers,
  selectById: selectPhotographersById,
  selectIds: selectPhotographersIds,
} = photographersAdapter.getSelectors((state) => state.photographers);

export const selectPhotographerPics = createSelector(
  [selectAllPhotographers, (state, photographerId) => photographerId],
  (photographers, photographerId) => {
    const filteredPhotographers = photographers.filter(
      (photographer) => photographer.photographer_id === photographerId
    );
    console.log("Filtered photographers:", filteredPhotographers);
    return filteredPhotographers;
  }
);

// export const { searchAct, isSearchAct } = photographersSlice.actions;

export default photographersSlice.reducer;
