import { FiEdit2, FiTrash2, FiEye, FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const DashboardMovieCard = ({ movie }) => {
  const navigate = useNavigate();
  return (
    <div className="group relative h-[420px] rounded-2xl overflow-hidden bg-base-300 shadow-xl transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl">
      {/* Background Poster */}
      <img
        src={movie.poster}
        alt={movie.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6">
        <button
        onClick={() => navigate(`/dashboard/edit-movie/${movie._id}`)}
          className="btn btn-circle btn-lg bg-emerald-500 hover:bg-emerald-600 border-none text-white shadow-2xl scale-75 group-hover:scale-100 transition-all duration-300 delay-75"
        >
          <FiEdit2 size={26} />
        </button>
        <button
      
          className="btn btn-circle btn-lg bg-red-500 hover:bg-red-600 border-none text-white shadow-2xl scale-75 group-hover:scale-100 transition-all duration-300 delay-100"
        >
          <FiTrash2 size={26} />
        </button>
      </div>

      <div className="absolute bottom-0 w-full p-6 text-white z-10">
        <h2 className="text-2xl font-extrabold mb-4 truncate drop-shadow-lg">
          {movie.title}
        </h2>

        <div className="flex items-center gap-5 text-sm font-semibold text-gray-100">
          <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
            <FiEye className="text-teal-400" size={16} />
            <span>{movie.views?.toLocaleString()}</span>
          </div>

          <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
            <FiShoppingBag className="text-amber-400" size={16} />
            <span>{movie.sold} Sold</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMovieCard;
