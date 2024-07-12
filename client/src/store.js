import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './reducers/searchReducer';

const store = configureStore({
  reducer: {
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
