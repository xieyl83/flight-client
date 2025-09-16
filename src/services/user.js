import axios from 'axios';
import api from './app';

export const createUser = (
  email = '',
  password = '',
  firstName = '',
  lastName = '',
  phone = '',
  country = ''
) =>
  new Promise((resolve) => {
    const headers = {
      'Content-Type': 'application/json',
    };
    email = email.trim();
    firstName = firstName.trim();
    lastName = lastName.trim();
    phone = phone.trim();
    country = country.trim();
    api
      .post(
        'user/create',
        { email, password, firstName, lastName, phone, country },
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
