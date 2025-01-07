import {
  writeInSearchInput,
  addToMovieThatUserClickedFromSearchBar,
} from '../movieStore';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchMovieQuery } from '../movieStore';
import { useEffect, useState } from 'react';
import { useDebouncedValue } from '../hooks/useDebounce';
import Skeleton from './Skeleton';

function SearchInput() {
  const dispatch = useDispatch();
  const movieInputValue = useSelector((state: any) => state.movies);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const debouncedSearchTerm = useDebouncedValue(
    movieInputValue.searchInput,
    400
  );
  const { data, error, isLoding, isFetching }: any =
    useFetchMovieQuery(debouncedSearchTerm);

  const handleChangeInput = (e: any) => {
    setSearchBarOpen(true);
    dispatch(writeInSearchInput(e.target.value));
  };
  const handleClickOnMovie = (id: any) => {
    setSearchBarOpen(false);
    const movie = data.Search.find((movie: any) => movie.imdbID === id);
    dispatch(addToMovieThatUserClickedFromSearchBar(movie));
  };
  let content;
  if (isFetching) {
    content = <Skeleton times={2} />;
  } else if (error) {
    content = 'There was an error: ' + error.message;
  } else if (data.Search) {
    content = (
      <div className="overflow-auto h-72  max-w-sm mx-auto bg-white dark:bg-slate-700 dark:highlight-white/5 shadow-lg ring-1 ring-black/5 rounded-xl flex flex-col divide-y dark:divide-slate-200/5">
        {data.Search.map((item: any, index: any) => (
          <div
            key={item.imdbID}
            onClick={() => handleClickOnMovie(item.imdbID)}
            className="flex p-2 cursor-pointer hover:bg-gray-200 transition flex items-center gap-4 p-4"
          >
            <img
              src={item.Poster}
              className="w-1/6 h-20 mr-2 rounded-md"
              alt=""
            />
            {item.Title}
          </div>
        ))}
      </div>
    );
  } else {
    content = (
      <div className="flex items-center overflow-auto   max-w-sm mx-auto bg-white dark:bg-slate-700 dark:highlight-white/5 shadow-lg ring-1 ring-black/5 rounded-xl flex flex-col divide-y dark:divide-slate-200/5">
        <div
          // onClick={() => handleClickOnMovie(item.imdbID)}
          className="flex p-2 cursor-pointer hover:bg-gray-200 transition items-center gap-4"
        >
          <p className="text-center text-xl text-white">No movie found</p>
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <input
        type="text"
        value={movieInputValue.searchInput}
        onChange={handleChangeInput}
        className="flex flex-row text-gray-900 border-gray-500 bg-gradient-to-r from-gray-400 to-slate-700 text-center w-96 h-12 rounded-md border border-gray-300 rounded-md focus:outline-none  focus:shadow-outline focus:border-gray-400 transition duration-200 ease-in-out  focus:placeholder-transparent "
        placeholder="search movie"
      />
      <h3>{searchBarOpen && content}</h3>
    </div>
  );
}
export default SearchInput;
