import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    recentSearches: [] as string[],
  },
  reducers: {
    addSearchTerm: (state, action: PayloadAction<string>) => {
      if (state.recentSearches.length >= 20) {
        state.recentSearches.pop();
      }
      state.recentSearches.unshift(action.payload);
    },
  },
});

export const { addSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;