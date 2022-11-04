import { configureStore } from '@reduxjs/toolkit';
import quoteReducer from '../features/quotes/quoteSlice';

export const store = configureStore({
  reducer: {

    quotes: quoteReducer
  },
});
