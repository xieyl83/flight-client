import { createSlice } from '@reduxjs/toolkit';

export const departureTripSlice = createSlice({
  name: 'departureTripSlice',
  initialState: {
    departureTrip: {
      company_id: '',
      company_name: '',
      dep_city: '',
      dep_code: '',
      dep_name: '',
      departure: '',
      departure_airport_id: 0,
      departure_date: '',
      departure_time: '',
      des_city: '',
      des_code: '',
      des_name: '',
      destination: '',
      destination_airport_id: 0,
      destination_date: '',
      destination_time: '',
      dur_ms: 0,
      duration: '',
      flight_id: 0,
      flight_number: '',
      price: 0,
      stop_over: null,
    },
  },
  reducers: {
    setDepartureTrip: (state, form) => {
      state.departureTrip.company_id = form.payload.company_id;
      state.departureTrip.company_name = form.payload.company_name;
      state.departureTrip.dep_city = form.payload.dep_city;
      state.departureTrip.dep_code = form.payload.dep_code;
      state.departureTrip.dep_name = form.payload.dep_name;
      state.departureTrip.departure = form.payload.departure;
      state.departureTrip.departure_airport_id =
        form.payload.departure_airport_id;
      state.departureTrip.departure_date = form.payload.departure_date;
      state.departureTrip.departure_time = form.payload.departure_time;
      state.departureTrip.des_city = form.payload.des_city;
      state.departureTrip.des_code = form.payload.des_code;
      state.departureTrip.des_name = form.payload.des_name;
      state.departureTrip.destination = form.payload.destination;
      state.departureTrip.destination_airport_id =
        form.payload.destination_airport_id;
      state.departureTrip.destination_date = form.payload.destination_date;
      state.departureTrip.destination_time = form.payload.destination_time;
      state.departureTrip.dur_ms = form.payload.dur_ms;
      state.departureTrip.duration = form.payload.duration;
      state.departureTrip.flight_id = form.payload.flight_id;
      state.departureTrip.flight_number = form.payload.flight_number;
      state.departureTrip.price = form.payload.price;
      state.departureTrip.stop_over = form.payload.stop_over;
    },
  },
});

export const { setDepartureTrip } = departureTripSlice.actions;

export default departureTripSlice.reducer;
