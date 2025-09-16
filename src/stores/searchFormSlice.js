import { createSlice } from '@reduxjs/toolkit';

const storageName = 'flightclient-searchForm';
const searchFormFromStorage = localStorage.getItem(storageName)
  ? localStorage.getItem(storageName)
  : JSON.stringify({
      dep: null,
      des: null,
      depDate: null,
      rtnDate: null,
      pnum: 1,
      isRoundTrip: false,
    });

export const searchFormSlice = createSlice({
  name: 'searchFormSlice',
  initialState: {
    searchForm: JSON.parse(searchFormFromStorage),
  },
  reducers: {
    setSearchForm: (state, form) => {
      state.searchForm.dep = form.payload.dep;
      state.searchForm.des = form.payload.des;
      state.searchForm.depDate = form.payload.depDate;
      state.searchForm.rtnDate = form.payload.rtnDate;
      state.searchForm.pnum = form.payload.pnum;
      state.searchForm.isRoundTrip = form.payload.isRoundTrip;
      localStorage.setItem(storageName, JSON.stringify(state.searchForm));
    },
  },
});

export const { setSearchForm } = searchFormSlice.actions;

export default searchFormSlice.reducer;
