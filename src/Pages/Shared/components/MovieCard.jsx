import { Link } from "react-router-dom";
import { formatMinutesToHours } from "../../../utils/formatMinutesToHours";
import useMovieAction from "../../../hooks/useMovieAction";

const MovieCard = ({ movie }) => {
  const { handleAction, getButtonText, isPurchased } = useMovieAction(movie);

  const isUpcoming = movie?.release_status === "upcoming";

  return (
    <div className="bg-[#141414] flex flex-col h-full  group rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500 transition-all duration-300 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]">
      {/* Image */}
      <div className="relative h-90 overflow-hidden">
        <img
          src={movie?.poster}
          alt={movie?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#141414] via-transparent to-transparent"></div>

        {/* Badge */}
        {isUpcoming && (
          <div className="absolute top-3 left-3">
            <span className="bg-black/60 text-white text-[10px] px-2 py-1 rounded border border-white/20 group-hover:text-amber-400 group-hover:border-amber-500/40 transition">
              COMING SOON
            </span>
          </div>
        )}

        {/* Price */}
        <div className="absolute top-3 right-3">
          <span className="bg-white text-black text-xs px-3 py-1 rounded-full font-bold group-hover:bg-amber-500 transition">
            ${movie?.price}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition line-clamp-1">
          {movie?.title}
        </h3>

        <p className="text-gray-400 text-sm mt-1 flex gap-2">
          <span>{movie?.release_year}</span>
          <span>|</span>
          <span>{formatMinutesToHours(movie?.duration)}</span>
        </p>

        <p className="text-gray-500 text-sm mt-3 line-clamp-2">
          {movie?.description}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 pt-5 mt-auto">
          <button
            onClick={() => handleAction()}
            className={`flex-1 relative overflow-hidden rounded-xl border backdrop-blur-md py-2.5 text-sm font-semibold transition-all duration-300 ${isPurchased ? "bg-green-800 text-white border-green-500 cursor-default" : "bg-white/5 text-white border-white/20 hover:border-amber-500 hover:text-black group/btn"}`}
          >
            <span className="absolute inset-0 bg-amber-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></span>

            <span className="relative z-10 flex items-center justify-center gap-2">
              {getButtonText()}
            </span>
          </button>

          <Link to={`/movies/${movie._id}`} className="flex-1">
            <button className="w-full rounded-xl border border-white/20 py-2.5 text-sm font-medium text-gray-300 transition-all duration-300 hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-amber-400">
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
