import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiLoader, FiClock, FiFilm, FiDollarSign, FiCalendar } from "react-icons/fi";

const PendingMovies = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: pendingMovies = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["pending-movies"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/movies/pending");
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
        <FiLoader className="animate-spin text-4xl text-blue-500" />
        <p className="text-gray-500 animate-pulse font-medium">Fetching pending Movies...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center bg-red-500/10 border border-red-500/20 rounded-2xl p-10 mt-10 max-w-lg mx-auto">
        <p className="text-red-500 font-semibold">Failed to load pending movies.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-4xl font-extrabold text-white tracking-t  ight flex items-center gap-3">
            <FiClock className="text-amber-500" /> Pending Movies
          </h2>
          <p className="text-gray-500 mt-2 text-lg">
            There are <span className="text-amber-500 font-bold">{pendingMovies.length}</span> movies awaiting approval.
          </p>
        </div>
        
        <div className="h-1 w-20 bg-amber-500 rounded-full md:hidden"></div>
      </div>

      {pendingMovies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white/5 rounded-[2.5rem] border border-white/10 border-dashed">
          <FiFilm className="text-6xl text-gray-700 mb-4" />
          <p className="text-gray-400 text-xl font-medium">The queue is empty.</p>
        </div>
      ) : (
        <div className="overflow-hidden bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Movie Info</th>
                  <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Release Year</th>
                  <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {pendingMovies.map((movie) => (
                  <tr key={movie._id} className="group hover:bg-white/[0.03] transition-colors duration-300">
                    
                    {/* Movie Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-20 w-14 flex-shrink-0">
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            className="h-full w-full object-cover rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-white text-lg leading-tight group-hover:text-blue-400 transition-colors">
                            {movie.title}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest text-gray-400">
                                {movie.language}
                            </span>
                            <span>•</span>
                            <span>{movie.category}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Release Year */}
                    <td className="px-6 py-4 text-gray-300">
                        <div className="flex items-center gap-2">
                            <FiCalendar className="text-gray-600" />
                            {movie.release_year}
                        </div>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 font-bold text-green-400 text-lg">
                        <FiDollarSign className="text-sm" />
                        {movie.price}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                        Pending
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingMovies;