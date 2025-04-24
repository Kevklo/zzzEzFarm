import { createSlice } from "@reduxjs/toolkit";
import { fetchApiData } from "./thunks";


const apiDataSlice = createSlice({
  name: 'api',
  initialState: {
    characters: {},
    items: [],
    loading: 'idle',
    error: null,
    lastUpdated: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiData.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchApiData.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.characters = action.payload.characters;
        state.items = action.payload.items;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchApiData.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
  }
});

export { apiDataSlice }