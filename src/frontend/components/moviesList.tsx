import { useNavigate } from 'react-router-dom';
import { useFetchUserMoviesQuery } from '../movieStore';
import { useSelector } from 'react-redux';
import ShowSideBar from './showSideBar';
export default function MoviesList() {
  const navigate = useNavigate();
  //this bad ? when the user refresh the page the username will go
  // const username = useSelector((state): any => state.signIn.username);
  const username = sessionStorage.getItem('username');
  const { data, error, isLoading } = useFetchUserMoviesQuery(username);
  let renderMovies;
  if (username) {
    if (isLoading) {
      renderMovies = 'is loading';
    } else if (error) {
      renderMovies = error;
    } else {
      console.log(data || error);
      if (data.data.length === 0) {
        renderMovies = (
          <p className="text-2xl font-bold text-center text-gray-800 mt-8 bg-white rounded-lg shadow-md p-4 transition-colors duration-500 hover:bg-gray-100">
            No Movies Found
          </p>
        );
      } else {
        renderMovies = data.data.map((movie: any) => {
          return (
            <div
              className="w-60  rounded-lg shadow-lg bg-slate-100 bg-opacity-50 mr-2 mt-3"
              key={movie.movie_id}
            >
              <img
                className="w-full h-2/3"
                src={movie.poster}
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{movie.title}</div>
              </div>
              <div className="px-6  pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  year: {movie.year}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  type: {movie.type}
                </span>
              </div>
            </div>
          );
        });
      }
    }
  } else {
    console.log('user undefine');
    navigate('/signin');
  }

  return (
    <div className="">
      <div className=" flex flex-1 justify-end">
        <span className="text-sm font-semibold leading-6 text-gray-900 relative group ">
          <ShowSideBar />
        </span>
      </div>
      <div className="flex flex-wrap flex-row overflow-auto justify-center">
        {renderMovies}
      </div>
    </div>
  );
}
