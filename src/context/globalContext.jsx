import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext({
  isLogin: false,
  user: {},
  token: '',
  login: (userInfo) => userInfo,
  logout: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(
    () => 'Y' === localStorage.getItem('isLogin')
  );
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        return userData;
      }
      // eslint-disable-next-line no-unused-vars
    } catch (_e) {
      // do nothing
    }
    localStorage.setItem('token', '');
    localStorage.setItem('user', JSON.stringify({}));
    localStorage.setItem('isLogin', false);
    return {};
  });

  const login = (userInfo) => {
    const { token, ...userData } = userInfo;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isLogin', 'Y');
    setToken(token);
    setUser(JSON.stringify(userData));
    setIsLogin(true);
  };

  const logout = () => {
    localStorage.setItem('token', '');
    localStorage.setItem('user', JSON.stringify({}));
    localStorage.setItem('isLogin', '');
    setToken('');
    setUser(JSON.stringify({}));
    setIsLogin(false);
  };

  return (
    <GlobalContext.Provider value={{ isLogin, token, user, login, logout }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
