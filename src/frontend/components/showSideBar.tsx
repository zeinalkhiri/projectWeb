import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaHeart, FaFilm, FaLinkedin } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';
import { AiOutlineAlignRight } from 'react-icons/ai';
import { FaGithub } from 'react-icons/fa';

export default function ShowSideBar() {
  const [expandSideBar, setExpandSideBar] = useState(false);
  const navigate = useNavigate();
  return (
    <div className=" ">
      {expandSideBar ? (
        <div className=" fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <svg
              className={'h-8 w-auto hover: cursor-pointer'}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              onClick={() => navigate('/')}
            >
              <g data-name="21-Clapperboard">
                <path d="M27 32H5a5.006 5.006 0 0 1-5-5V5a5.006 5.006 0 0 1 5-5h22a5.006 5.006 0 0 1 5 5v22a5.006 5.006 0 0 1-5 5zM5 2a3 3 0 0 0-3 3v22a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3z" />
                <path d="M31 10H1a1 1 0 0 1 0-2h30a1 1 0 0 1 0 2z" />
                <path d="M4 10a1 1 0 0 1-.707-1.707l8-8a1 1 0 0 1 1.414 1.414l-8 8A1 1 0 0 1 4 10zM12 10a1 1 0 0 1-.707-1.707l8-8a1 1 0 0 1 1.414 1.414l-8 8A1 1 0 0 1 12 10zM20 10a1 1 0 0 1-.707-1.707l8-8a1 1 0 0 1 1.414 1.414l-8 8A1 1 0 0 1 20 10zM25 17H6a1 1 0 0 1 0-2h19a1 1 0 0 1 0 2z" />
                <path d="M19 25a1 1 0 0 1-1-1v-8a1 1 0 0 1 2 0v8a1 1 0 0 1-1 1z" />
              </g>
            </svg>

            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setExpandSideBar(!expandSideBar)}
            >
              <span className="sr-only">Close menu</span>

              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to={'/movies'}
                  className="-mx-3 flex  rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  your movie <FaFilm className={'ml-3 mt-1.5'} />
                </Link>

                <Link
                  to={'/wishlist'}
                  className="-mx-3 flex rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  wishlist <FaBars className={'ml-3 mt-1.5'} />
                </Link>
              </div>
              <div className="py-6">
                <Link
                  to={'/signin'}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>{' '}
          <div className=" absolute bottom-2 left-0 w-full flex justify-center ">
            <Link className="flex" to={'https://github.com/zeinalkhiri'}>
              <FaGithub size={30} />
              <Link
                className="flex ml-5"
                to={'https:linkedin.com/in/zein-alkhiri-7ab4242b6'}
              >
                <FaLinkedin size={30} />
              </Link>
            </Link>
          </div>
        </div>
      ) : (
        <button
          className="p-3"
          onClick={() => setExpandSideBar(!expandSideBar)}
        >
          <FaBars size={20} />
        </button>
      )}
    </div>
  );
}
