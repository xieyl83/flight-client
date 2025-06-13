import axios from 'axios';

const bookFlights = (searchForm, departureTrip, returnTrip) =>
  new Promise((resolve) => {
    const headers = {
      'Content-Type': 'application/json',
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
    axios
      .post('/api/booking', { flights }, { headers })
      .then((response) => {
        resolve({
          success: response.data.success,
          code: response.data.status,
          message: response.data.message,
          data: response.data.data,
        });
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          resolve({
            success: false,
            code: err.response.status,
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
