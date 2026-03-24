import { Link } from "react-router-dom";
import { FaStar, FaRegClock, FaGlobe, FaShoppingCart } from "react-icons/fa";
import { HiOutlineArrowLeft, HiOutlineCalendar } from "react-icons/hi";
import { formatMinutesToHours } from "../../../utils/formatMinutesToHours";

const MovieHero = ({ movie }) => (
  <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-1000"
      style={{ backgroundImage: `url(${movie?.poster})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent"></div>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
    </div>

    <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-12">
      <Link
        to="/all-movies"
        className="absolute top-8 flex items-center gap-2 text-white/60 hover:text-primary transition-all group"
      >
        <HiOutlineArrowLeft
          className="group-hover:-translate-x-1 text-white transition-transform"
          size={22}
        />
        <span className="font-medium text-white tracking-wide">
          Back to Browse
        </span>
      </Link>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-end">
        <div className="hidden md:block w-64 lg:w-80 shrink-0 shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-2xl overflow-hidden border border-white/10 translate-y-6">
          <img
            src={movie?.poster}
            alt={movie?.title}
            className="w-full h-auto"
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
            {(movie?.genres || []).map((genre, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-white/10 backdrop-blur-xl border border-white/10 rounded-md text-[10px] font-bold uppercase tracking-widest text-white"
              >
                {genre}
              </span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-4 tracking-tighter leading-none">
            {movie?.title}
          </h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-5 text-sm text-gray-300 mb-8 font-medium italic">
            <span className="flex items-center gap-2">
              <HiOutlineCalendar size={18} className="text-sky-500" />{" "}
              {movie?.release_year}
            </span>
            <span className="flex items-center gap-2">
              <FaRegClock size={16} className="text-sky-500" />
              {formatMinutesToHours(movie?.duration)}
            </span>
            <span className="flex items-center gap-2">
              <FaGlobe size={16} className="text-sky-500" /> {movie?.language}
            </span>
            <span className="flex items-center gap-1.5 text-yellow-400 font-bold not-italic">
              <FaStar /> {movie?.rating}
            </span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <button className="btn btn-primary btn-lg rounded-xl px-10 gap-3 shadow-lg shadow-primary/20 hover:scale-105 transition-all w-full md:w-auto">
              <FaShoppingCart size={18} /> Buy Now — ${movie?.price}
            </button>
            <div className="text-center md:text-left">
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">
                Audience reach
              </p>
              <p className="text-xl font-mono text-white/90">
                {movie?.views?.toLocaleString()} Views
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MovieHero;
