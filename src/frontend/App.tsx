import SingInForm from './components/singInForm';
import ErrorPage from './pages/errorPage';
import Main from './pages/main';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import MoviePage from './pages/movies';
import WishList from './pages/wishlist';
import LogOut from './components/logOut';
import LogInForm from './components/logInFrom';
import Account from './pages/accountPage';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/signin',
          element: <SingInForm />,
        },
      ],
    },
    {
      path: '/movies',
      element: <MoviePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/wishlist',
      element: <WishList />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/logout',
      element: <LogOut />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/login',
      element: <LogInForm />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/account',
      element: <Account />,
      errorElement: <ErrorPage />,
    },
  ]);
  return (
    <div className=" min-h-screen bg-gradient-to-r from-gray-800 to-slate-700">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
