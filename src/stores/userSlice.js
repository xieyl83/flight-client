import { createSlice } from '@reduxjs/toolkit';

const storageName = 'flightclient-user';
const userFromStorage = localStorage.getItem(storageName)
  ? localStorage.getItem(storageName)
  : JSON.stringify({
      isLogin: false,
      token: '',
      userId: 0,
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      country: '',
    });

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    user: JSON.parse(userFromStorage),
  },
  reducers: {
    login: (state, userInfo) => {
      const userData = {
        isLogin: true,
        token: userInfo.payload.token,
        userId: userInfo.payload.userId,
        email: userInfo.payload.email,
        firstName: userInfo.payload.firstName,
        lastName: userInfo.payload.lastName,
        phone: userInfo.payload.phone,
        country: userInfo.payload.country,
      };
      state.user = userData;
      localStorage.setItem(storageName, JSON.stringify(userData));
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
      localStorage.removeItem(storageName);
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
