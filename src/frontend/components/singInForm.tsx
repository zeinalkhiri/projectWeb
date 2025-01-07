import { Form, Link, useNavigate } from 'react-router-dom';
import { isUserSignIn, useFetchuserQuery, writeUsername } from '../movieStore';
import { useDispatch } from 'react-redux';
import { BsX } from 'react-icons/bs';
import { useState } from 'react';

function SignInForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [skip, setSkip] = useState(true);
  const { data, error, isLoading } = useFetchuserQuery(
    { username, password },
    {
      skip,
    }
  );
  console.log(data);

  console.log(skip);
  if (isLoading) {
    console.log('isLoding');
  } else if (error) {
    console.log(error);
  } else {
    console.log(data);
    sessionStorage.setItem('username', username);
    dispatch(isUserSignIn(true));
    dispatch(writeUsername(username));
    navigate('/');
  }
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setUsername(formData.get('username') as any);
    setPassword(formData.get('password') as any);
    setSkip((prev) => false);
  };

  const handleClickCloseLogInForm = () => {
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-slate-600 ">
      <div className=" flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 fixed inset-16 ">
        <Link to={'/'}>
          <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            sign in movielist
          </p>
        </Link>
        <div className=" w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
          <button onClick={handleClickCloseLogInForm} className=" text-white ">
            <BsX size={20} />
          </button>
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <Form
              method="post"
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="username"
                  required
                />
                <p className=" text-gray-300">
                  {error ? error.data.message.usernameError : ''}
                </p>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                <p className="text-gray-300">
                  {error ? error.data.message.passwordError : ''}
                </p>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <Link to={'/login'}>
                  <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Log In
                  </a>
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignInForm;
