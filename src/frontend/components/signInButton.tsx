import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function SignInButton() {
  const [slideDown, setSlideDown] = useState(false);
  const nameUsername = useSelector((state: any) => state.signIn.username);
  const isSignInFormOpen = useSelector(
    (state: any) => state.signIn.isSignInFromOpen
  );

  return (
    <div>
      {!nameUsername ? (
        <Link to={'/signin'}>
          <p className="transition-colors duration-500 hover:text-white transition-transform duration-500 hover:translate-x-2">
            Sign in →
          </p>
        </Link>
      ) : (
        <div className="">
          <div
            className="text-white  hover:text-blue-300 hover:translate-x-1 transition ease-in-out delay-150 cursor-pointer"
            onClick={() => setSlideDown(!slideDown)}
          >
            {nameUsername}
          </div>
          {slideDown && (
            <div className=" fixed -mx-4 w-24 rounded-lg flex flex-col justify-center bg-slate-600 bg-opacity-90 mt-1">
              <p className="text-blue-400 p-2 hover:text-gray-50 hover:translate-x-1 transition ease-in-out delay-150 cursor-pointer">
                <Link to={'account'}>Account</Link>
              </p>
              <Link to={'/logout'}>
                <p className="text-blue-400 p-2 hover:text-gray-50 hover:translate-x-1 transition ease-in-out delay-150 cursor-pointer">
                  Log Out
                </p>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
