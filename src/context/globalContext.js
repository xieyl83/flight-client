import { createContext } from 'react';

const GlobalContext = createContext({
  isLogin: false,
  userid: '',
  token: '',
  searchForm: {},
});

export default GlobalContext;
