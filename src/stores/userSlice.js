import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: {
      isLogin: false,
      token: '',
      userId: 0,
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      country: '',
    },
  },
  reducers: {
    login: (state, userInfo) => {
      state.user = {
        isLogin: true,
        token: userInfo.payload.token,
        userId: userInfo.payload.userId,
        email: userInfo.payload.email,
        firstName: userInfo.payload.firstName,
        lastName: userInfo.payload.lastName,
        phone: userInfo.payload.phone,
        country: userInfo.payload.country,
      };
    },
    logout: (state) => {
      state.user = {
        isLogin: false,
        token: '',
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
