import { createSlice } from '@reduxjs/toolkit';

export const returnTripSlice = createSlice({
  name: 'returnTripSlice',
  initialState: {
    returnTrip: {
      flight_id: 0,
      flight_number: '',
      company_id: '',
      departure_airport_id: 0,
      destination_airport_id: 0,
      departure_date: null,
      departure_time: null,
      destination_date: null,
      destination_time: null,
      stop_over: null,
      price: 0,
      dep_code: '',
      dep_name: '',
      dep_city: '',
      des_code: '',
      des_name: '',
      des_city: '',
      company_name: '',
    },
  },
  reducers: {
    setReturnTrip: (state, form) => {
      state.returnTrip.flight_id = form.payload.flight_id;
      state.returnTrip.flight_number = form.payload.flight_number;
      state.returnTrip.company_id = form.payload.company_id;
      state.returnTrip.departure_airport_id = form.payload.departure_airport_id;
      state.returnTrip.destination_airport_id =
        form.payload.destination_airport_id;
      state.returnTrip.departure_date = form.payload.departure_date;
      state.returnTrip.departure_time = form.payload.departure_time;
      state.returnTrip.destination_date = form.payload.destination_date;
      state.returnTrip.destination_time = form.payload.destination_time;
      state.returnTrip.stop_over = form.payload.stop_over;
      state.returnTrip.price = form.payload.price;
      state.returnTrip.dep_code = form.payload.dep_code;
      state.returnTrip.dep_name = form.payload.dep_name;
      state.returnTrip.dep_city = form.payload.dep_city;
      state.returnTrip.des_code = form.payload.des_code;
      state.returnTrip.des_name = form.payload.des_name;
      state.returnTrip.des_city = form.payload.des_city;
      state.returnTrip.company_name = form.payload.company_name;
    },
  },
});

export const { setReturnTrip } = returnTripSlice.actions;

export default returnTripSlice.reducer;
