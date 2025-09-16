import { createBrowserRouter, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import SearchResultPage from './pages/SearchResultPage.jsx';
import BookingReviewPage from './pages/BookingReviewPage.jsx';
import MyBookingsPage from './pages/MyBookingsPage.jsx';

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
    path: '/booking',
    element: <BookingReviewPage />,
  },
  {
    path: '/mybookings',
    element: <MyBookingsPage />,
  },
]);

export default router;
