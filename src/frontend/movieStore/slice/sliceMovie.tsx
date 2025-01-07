import { createSlice } from '@reduxjs/toolkit';
const moviesSlice = createSlice({
  name: 'movie',
  initialState: { searchInput: '', movieThatUserClickedFromSearchBar: {} },
  reducers: {
    writeInSearchInput(state, action) {
      state.searchInput = action.payload;
    },
    addToMovieThatUserClickedFromSearchBar(state, action) {
      state.movieThatUserClickedFromSearchBar = action.payload;
    },
  },
});
export const { writeInSearchInput, addToMovieThatUserClickedFromSearchBar } =
  moviesSlice.actions;
export const movieReducer = moviesSlice.reducer;
