import { createContext } from 'react';

const GlobalContext = createContext({
  isLogin: false,
  userid: '',
  token: '',
});

export default GlobalContext;
