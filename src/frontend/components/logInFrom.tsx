import { Form, Link, useNavigate } from 'react-router-dom';
import { isUserSignIn, useAddUserMutation, writeUsername } from '../movieStore';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { BsX } from 'react-icons/bs';
import validationForm from '../validation/validationForm';

function LogInForm() {
  const [validateError, setValidateError]: any = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addUser] = useAddUserMutation();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username: any = formData.get('username');
    const password: any = formData.get('password');

    const passwordConfirm = formData.get('passwordConfirm');
    let errorForm = validationForm(username, password, passwordConfirm);
    //TODO: use session library to store the sesstion rether then store as sold
    if (
      !errorForm.usernameError &&
      !errorForm.passwordError &&
      !errorForm.passwordConfirmError
    ) {
      const user = { username, password };
      const { error } = (await addUser(user)) as any;
      if (!error) {
        sessionStorage.setItem('username', username);
        dispatch(isUserSignIn(true));
        dispatch(writeUsername(username));
        navigate('/');
      } else {
        errorForm = { ...errorForm, usernameExist: error.data.message } as any;
        setValidateError(errorForm);
      }
    } else {
      setValidateError(errorForm);
    }
  };
  return (
    <div className="fixed inset-0 bg-slate-600 opacity-80">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 fixed inset-16">
        <Link to={'/'}>
          <p className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            sign in movielist
          </p>
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <button
            onClick={() => navigate('/')}
            className=" text-white px-2 py-2"
          >
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
                  {validateError.usernameError || validateError.usernameExist}
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
                <p className=" text-gray-300">{validateError.passwordError}</p>
              </div>
              <div>
                <label
                  htmlFor="passwordconfirm"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  password confirm
                </label>
                <input
                  type="password"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="enter the same password"
                />
                <p className=" text-gray-300">
                  {validateError.passwordConfirmError}
                </p>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800 "
              >
                Sign in
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LogInForm;
