import { configureStore } from '@reduxjs/toolkit';
import searchFormReducer from './searchFormSlice';
import departureTripReducer from './departureTripSlice';
import returnTripReducer from './returnTripSlice';

const globalStore = configureStore({
  reducer: {
    searchFormReducer,
    departureTripReducer,
    returnTripReducer,
  },
});

export default globalStore;
