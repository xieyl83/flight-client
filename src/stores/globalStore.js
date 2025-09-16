import { configureStore } from '@reduxjs/toolkit';
import searchFormReducer from './searchFormSlice';
import departureTripReducer from './departureTripSlice';
import returnTripReducer from './returnTripSlice';
import userReducer from './userSlice';

const globalStore = configureStore({
  reducer: {
    searchFormReducer,
    departureTripReducer,
    returnTripReducer,
    userReducer,
  },
});

export default globalStore;
