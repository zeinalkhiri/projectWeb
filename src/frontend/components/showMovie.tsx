import { useSelector } from 'react-redux';
import {
  useAddUserMovieMutation,
  useFetchUserMoviesQuery,
} from '../movieStore';
import { useNavigate } from 'react-router-dom';
function ShowMovie() {
  const navigate = useNavigate();
  const [addUserMovie, addUserMovieResult] = useAddUserMovieMutation();
  const movieSelectMovie = useSelector(
    (state: any) => state.movies.movieThatUserClickedFromSearchBar
  );

  const username = sessionStorage.getItem('username');
  const { data } = useFetchUserMoviesQuery(username, {
    skip: !username,
  });

  let isUserHaveThisMovie;
  if (data)
    isUserHaveThisMovie = data.data.some((movie: any) => {
      return movie.movie_id === movieSelectMovie.imdbID;
    });

  const handleClickAddMovieToMovies = () => {
    const username = sessionStorage.getItem('username');
    if (!username) navigate('/signin');
    const dataToSend = { movieSelectMovie, username };
    addUserMovie(dataToSend);
  };

  let renderMovie;
  if (Object.keys(movieSelectMovie).length === 0) {
    renderMovie = <div></div>;
  } else {
    renderMovie = (
      <div className=" ">
        <div className="flex flex-row shadow-md bg-gray-400 items-center rounded-lg rounded-b-none">
          <div className="w-40">
            <img
              className="max-w-full h-auto p-4 rounded-3xl"
              src={movieSelectMovie.Poster}
              alt=""
            />
          </div>
          <div className="px-6 pb-2 flex flex-col">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              Title: {movieSelectMovie.Title}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              Year: {movieSelectMovie.Year}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              Type: {movieSelectMovie.Type}
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-center shadow-md bg-gray-400 rounded-lg rounded-t-none h-20">
          <div className="flex justify-center items-center">
            <button
              className={`mr-14 p-3 w-24  text-white rounded-lg ${
                isUserHaveThisMovie
                  ? 'bg-gradient-to-r from-red-500 to-gray-500 w-28'
                  : 'bg-gradient-to-r from-gray-500 to-slate-700'
              }  focus:transition-colors duration-200 ease-in-out`}
              onClick={handleClickAddMovieToMovies}
            >
              {isUserHaveThisMovie ? 'in your list' : 'add'}
            </button>
            <button className="p-3 w-24 bg-gradient-to-r from-gray-500 to-slate-700 hover:bg-white-200 text-white rounded-lg  transition-colors duration-200 ease-in-out">
              Wishlist
            </button>
          </div>
        </div>
      </div>
    );
  }
  return <div className="p-4">{renderMovie}</div>;
}
export default ShowMovie;
