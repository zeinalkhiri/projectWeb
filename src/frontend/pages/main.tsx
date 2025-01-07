import ShowMovie from '../components/showMovie';
import SearchInput from '../components/searchInput';

import ShowSideBar from '../components/showSideBar';
import SignInButton from '../components/signInButton';
import SingInForm from '../components/logInFrom';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  isUserSignIn,
  writeUsername,
  isSignInFormOpen,
} from '../movieStore';
import { useDispatch } from 'react-redux';

function Main() {
  const dispatch = useDispatch();
  const usernameSession = sessionStorage.getItem('username');
  console.log(usernameSession);
  if (usernameSession === null) {
    dispatch(isUserSignIn(false));
    dispatch(writeUsername(''));
  } else {
    dispatch(isUserSignIn(true));
    dispatch(writeUsername(usernameSession));
  }
  const location = useLocation();
  const isSignInPage = location.pathname === '/signin';
  isSignInPage && dispatch(isSignInFormOpen(true));
  !isSignInPage && dispatch(isSignInFormOpen(false));
  return (
    <div className="bg-slate-800 overflow-auto h-screen h-full">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to={'/'} className="-m-1.5 p-1.5">
              <svg
                className={'h-8 w-auto'}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <g data-name="21-Clapperboard">
                  <path d="M27 32H5a5.006 5.006 0 0 1-5-5V5a5.006 5.006 0 0 1 5-5h22a5.006 5.006 0 0 1 5 5v22a5.006 5.006 0 0 1-5 5zM5 2a3 3 0 0 0-3 3v22a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3z" />
                  <path d="M31 10H1a1 1 0 0 1 0-2h30a1 1 0 0 1 0 2z" />
                  <path d="M4 10a1 1 0 0 1-.707-1.707l8-8a1 1 0 0 1 1.414 1.414l-8 8A1 1 0 0 1 4 10zM12 10a1 1 0 0 1-.707-1.707l8-8a1 1 0 0 1 1.414 1.414l-8 8A1 1 0 0 1 12 10zM20 10a1 1 0 0 1-.707-1.707l8-8a1 1 0 0 1 1.414 1.414l-8 8A1 1 0 0 1 20 10zM25 17H6a1 1 0 0 1 0-2h19a1 1 0 0 1 0 2z" />
                  <path d="M19 25a1 1 0 0 1-1-1v-8a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1z" />
                </g>
              </svg>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <ShowSideBar />
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link to={'/movies'}>
              <p className="text-sm font-semibold leading-6 text-gray-900">
                <span className="relative group inline-block overflow-hidden">
                  <span className="relative z-10 text-black transition-colors duration-500 group-hover:text-white">
                    Your movies
                  </span>
                </span>
              </p>
            </Link>
            <Link to={'/wishlist'}>
              <p className="text-sm font-semibold leading-6 text-gray-900">
                <span className="relative group inline-block overflow-hidden">
                  <span className="relative z-10 text-black transition-colors duration-500 group-hover:text-white">
                    wishlist
                  </span>
                </span>
              </p>
            </Link>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <span className="text-sm font-semibold leading-6 text-gray-900 relative group ">
              <SignInButton />
            </span>
          </div>
        </nav>
        <div className="lg:hidden" role="dialog" aria-modal="true"></div>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(80%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          ></div>
        </div>
        <div className="mx-auto max-w-2xl mt-48">
          <div className="flex flex-col items-center justify-center mx-4 ">
            <Outlet />
            <h1 className="text-3xl font-bold p-4 bg-gradient-to-r from-blue-500 to-slate-400   bg-clip-text text-transparent">
              my movie list
            </h1>
            <SearchInput />
            <ShowMovie />
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
export default Main;
