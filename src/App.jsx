import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';
import globalStore from './stores/globalStore.js';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <div className='flex flex-col items-center w-full'>
      <Provider store={globalStore}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
};

export default App;
