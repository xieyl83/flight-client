import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    isLogin: false,
    token: '',
    user: {
      userId: 0,
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      country: '',
    },
  },
  reducers: {
    login: (state, token, userInfo) => {
      state.isLogin = true;
      state.token = token;
      state.user = {
        userId: userInfo.userId,
        email: userInfo.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        phone: userInfo.phone,
        country: userInfo.country,
      };
    },
    logout: (state) => {
      state.isLogin = false;
      state.token = '';
      state.user = {
        userId: 0,
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        country: '',
      };
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
