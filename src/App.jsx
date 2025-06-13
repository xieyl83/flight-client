import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';
import GlobalContext from './context/globalContext';
import globalStore from './stores/globalStore.js';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <div className='flex flex-col items-center w-full'>
      <Provider store={globalStore}>
        <GlobalContext.Provider
          value={{
            isLogin: false,
            userid: '',
            token: '',
          }}
        >
          <RouterProvider router={router} />
        </GlobalContext.Provider>
      </Provider>
    </div>
  );
};

export default App;
