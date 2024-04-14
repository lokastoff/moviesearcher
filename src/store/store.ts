import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from './slices/searchParamsSlice';
import searchReducer from './slices/searchLatestSlice'
import authReducer from './slices/isLoggedSlice';
export const store = configureStore({
    reducer: {
        navigation: navigationReducer,
        search: searchReducer,
        auth: authReducer,
      }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;