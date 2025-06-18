import axios from 'axios';
import api from './app';

const getMyBookings = (
  token = '',
  page_number = 1,
  page_limit = 50,
  sort_col = '',
  sort_type = 'asc'
) =>
  new Promise((resolve) => {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      alg: 'HS256',
    };
    api
      .post(
        'mybookings',
        { page_number, page_limit, sort_col, sort_type },
        { headers }
      )
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

export default getMyBookings;
