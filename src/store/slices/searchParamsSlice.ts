import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
  url: string;
}

const initialState: NavigationState = {
  url: ''
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setUrl(state, action: PayloadAction<string>) {
      state.url = action.payload;
    }
  }
});

export const { setUrl } = navigationSlice.actions;
export default navigationSlice.reducer;