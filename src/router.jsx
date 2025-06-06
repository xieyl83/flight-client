import { createBrowserRouter, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import SearchResultPage from './pages/SearchResultPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/index',
    element: <Navigate to='/' />,
  },
  {
    path: '/home',
    element: <Navigate to='/' />,
  },
  {
    path: '/search',
    element: <SearchResultPage />,
  },
  {
    path: '/go',
    element: <div>Hello go path.</div>,
  },
]);

export default router;
