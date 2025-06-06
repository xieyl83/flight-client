import axios from 'axios';

const getFlights = () =>
  new Promise((resolve) => {
    axios
      .get('/api/flights')
      .then((response) => {
        resolve({
          success: true,
          code: response.status,
          data: response.data,
        });
      })
      .catch((e) => {
        resolve({ success: false, code: 500, message: e.message, data: {} });
      });
  });

export default getFlights;
