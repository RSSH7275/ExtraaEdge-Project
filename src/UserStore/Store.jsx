import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../UserSlice/UserSlice';

export const store = configureStore({
  reducer: {
    userReducer:userReducer,
  },
})