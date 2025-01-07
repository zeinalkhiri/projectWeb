import { configureStore } from '@reduxjs/toolkit';
import { movieReducer, writeInSearchInput } from './slice/sliceMovie';
import { useFetchMovieQuery } from './api/movieApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { movieApi } from './api/movieApi';
import { signInReducer } from './slice/sliceSignIn';
import { mysqlApi } from './api/mysqlApi';
import { mysqlMoviesApi } from './api/mysqlMovieApi';
const store = configureStore({
  reducer: {
    movies: movieReducer,
    signIn: signInReducer,
    [movieApi.reducerPath]: movieApi.reducer,
    [mysqlApi.reducerPath]: mysqlApi.reducer,
    [mysqlMoviesApi.reducerPath]: mysqlMoviesApi.reducer,
  },
  middleware: (getDefaultMiddleware): any =>
    getDefaultMiddleware()
      .concat(movieApi.middleware)
      .concat(mysqlApi.middleware)
      .concat(mysqlMoviesApi.middleware),
});
setupListeners(store.dispatch);
export { useFetchMovieQuery } from './api/movieApi';
export { useFetchuserQuery, useAddUserMutation } from './api/mysqlApi';
export {
  useFetchUserMoviesQuery,
  useAddUserMovieMutation,
} from './api/mysqlMovieApi';
export { store };
export {
  writeInSearchInput,
  addToMovieThatUserClickedFromSearchBar,
} from './slice/sliceMovie';
export {
  isUserSignIn,
  writeInPasswordInput,
  writeInUsernameInput,
  writeUsername,
  isSignInFormOpen,
} from './slice/sliceSignIn';
