import axios from 'axios';
import api from './app';

const login = (email = '', password = '') =>
  new Promise((resolve) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    email = email.trim();
    api
      .post('login', { email, password }, { headers })
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

export default login;
