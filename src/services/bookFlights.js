import axios from 'axios';
import api from './app';

const bookFlights = (token = '', searchForm, departureTrip, returnTrip) =>
  new Promise((resolve) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      alg: 'HS256',
    };
    const flights = [];
    flights.push({
      flight_id: departureTrip.flight_id,
      pnum: searchForm.pnum,
    });
    if (searchForm.isRoundTrip) {
      flights.push({
        flight_id: returnTrip.flight_id,
        pnum: searchForm.pnum,
      });
    }
    api
      .post('booking', { flights }, { headers })
      .then((response) => {
        resolve({
          success: response.data.success,
          code: response.data.code,
          message: response.data.message,
          data: response.data.data,
        });
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          resolve({
            success: false,
            code: err.status,
            message: err.message,
            data: {},
          });
        } else {
          resolve({
            success: false,
            code: 0,
            message: err.message,
            data: {},
          });
        }
      });
  });

export default bookFlights;
