import { configureStore } from '@reduxjs/toolkit';
import reposReducer from './features/repos/reposSlice';
import pagesReducer from './features/pagination/pagesSlice';

const store = configureStore({
  reducer: {
    repos: reposReducer,
    pages: pagesReducer,
  },
});

export default store;
