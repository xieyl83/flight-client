import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';
import GlobalContext from './context/globalContext';

const App = () => {
  return (
    <div className='flex flex-col items-center w-full'>
      <GlobalContext.Provider
        value={{
          isLogin: false,
          userid: '',
          token: '',
          searchForm: {
            dep: null,
            des: null,
            depDate: null,
            rtnDate: null,
            pnum: 1,
            roundTrip: 1,
          },
        }}
      >
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </div>
  );
};

export default App;
