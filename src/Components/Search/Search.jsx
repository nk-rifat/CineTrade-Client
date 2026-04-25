import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IoSearchOutline } from "react-icons/io5";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const {
    data: results = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["movieSearch", searchTerm],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/search?title=${searchTerm}`,
      );
      return data;
    },
    enabled: searchTerm.length > 1,
    staleTime: 1000 * 60 * 5,
  });

  const handleSelect = (id) => {
    setSearchTerm("");
    navigate(`/movies/${id}`);
  };

  return (
    <div className="relative hidden xl:block w-64">
      <div className="relative flex items-center">
        <IoSearchOutline className="absolute left-3 text-slate-400 text-lg" />

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search movies..."
          className="input input-sm input-bordered w-full rounded-full bg-slate-100 border-none focus:ring-1 focus:ring-sky-500 pl-10"
        />

        {(isLoading || isFetching) && searchTerm.length > 1 && (
          <span className="loading loading-spinner loading-xs absolute right-3 text-sky-500"></span>
        )}
      </div>

      {/* Results Dropdown */}
      {searchTerm.length > 1 && results.length > 0 && (
        <div className="absolute mt-2 w-full bg-white  shadow-2xl rounded-xl overflow-hidden z-50 border border-slate-200 ">
          {results.map((movie) => (
            <button
              key={movie._id}
              onClick={() => handleSelect(movie._id)}
              className="w-full text-left px-4 py-3 hover:bg-sky-100 flex items-center gap-3 transition-colors border-b last:border-none border-slate-100 "
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-8 h-10 object-cover rounded shadow-sm bg-slate-200"
              />
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate text-slate-900">
                  {movie.title}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No Results Fallback */}
      {searchTerm.length > 1 &&
        results.length === 0 &&
        !isLoading &&
        !isFetching && (
          <div className="absolute mt-2 w-full bg-white dark:bg-slate-900 p-4 text-center text-sm text-slate-500 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700">
            No movies found for "{searchTerm}"
          </div>
        )}
    </div>
  );
};

export default Search;
