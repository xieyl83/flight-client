import axios from 'axios';

const getFlights = (dep, des, depDate) =>
  new Promise((resolve) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    const params = {
      dep,
      des,
      depDate,
    };
    axios
      .get('/api/flights', { headers, params })
      .then((response) => {
        // todo: treat errors...
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
