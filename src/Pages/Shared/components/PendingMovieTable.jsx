import { FiCalendar, FiDollarSign, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";

const PendingMovieTable = ({ movies, isAdmin, renderActions }) => {

  return (
    <div className="overflow-hidden bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02]">
              <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">
                Movie Info
              </th>
              <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">
                Year
              </th>
              <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider">
                Status
              </th>
              {/* Only show column header if admin */}
              {isAdmin && (
                <th className="px-6 py-5 text-sm font-bold text-gray-400 uppercase tracking-wider text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {movies.map((movie) => (
              <tr
                key={movie._id}
                className="group hover:bg-white/[0.03] transition-colors duration-300"
              >
                {/* Movie Info */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-14 flex-shrink-0">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="h-full w-full object-cover rounded-lg shadow-lg border border-white/10 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg leading-tight group-hover:text-amber-400 transition-colors">
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
                  <div className="flex items-center gap-2 font-medium">
                    <FiCalendar className="text-gray-600" />
                    {movie.release_year}
                  </div>
                </td>

                {/* Price */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 font-bold text-emerald-400 text-lg">
                    <FiDollarSign className="text-sm" />
                    {movie.price}
                  </div>
                </td>

                {/* Status Badge */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                    {movie.release_status}
                  </span>
                </td>

                {/* Conditional Actions Cell */}
                {isAdmin && (
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2  ">
                      <Link to={`/movies/${movie._id}`}>
                        <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                          <FiEye size={18} />
                        </button>
                      </Link>

                      {renderActions && renderActions(movie)}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingMovieTable;
