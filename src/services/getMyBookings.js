import axios from 'axios';

const getMyBookings = (
  page_number = 1,
  page_limit = 50,
  sort_col = '',
  sort_type = 'asc'
) =>
  new Promise((resolve) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    axios
      .post(
        '/api/mybookings',
        { page_number, page_limit, sort_col, sort_type },
        { headers }
      )
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

export default getMyBookings;
