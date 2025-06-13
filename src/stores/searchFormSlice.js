import { createSlice } from '@reduxjs/toolkit';

export const searchFormSlice = createSlice({
  name: 'searchFormSlice',
  initialState: {
    searchForm: {
      dep: null,
      des: null,
      depDate: null,
      rtnDate: null,
      pnum: 1,
      isRoundTrip: false,
    },
  },
  reducers: {
    setSearchForm: (state, form) => {
      state.searchForm.dep = form.payload.dep;
      state.searchForm.des = form.payload.des;
      state.searchForm.depDate = form.payload.depDate;
      state.searchForm.rtnDate = form.payload.rtnDate;
      state.searchForm.pnum = form.payload.pnum;
      state.searchForm.isRoundTrip = form.payload.isRoundTrip;
    },
  },
});

export const { setSearchForm } = searchFormSlice.actions;

export default searchFormSlice.reducer;
