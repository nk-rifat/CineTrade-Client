import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { formatMinutesToHours } from "../../../utils/formatMinutesToHours";
import { FaHandshake } from "react-icons/fa";
import usePopularMovies from "../../../hooks/usePopularMovies";

const Banner = () => {
  const { data: popularMovies, isLoading } = usePopularMovies();

  if (isLoading) {
    return (
      <div className="w-full h-[450px] md:h-[550px] lg:h-[650px] bg-indigo-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sky-200 font-medium animate-pulse tracking-widest text-sm md:text-base">
            FETCHING BLOCKBUSTERS...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden shadow-2xl bg-indigo-950">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {popularMovies?.map((movie) => (
          <SwiperSlide key={movie._id}>
            <div className="relative h-full w-full">
              {/* --- BACKGROUND LAYER --- */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[7000ms] scale-110"
                style={{ backgroundImage: `url(${movie.poster})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-indigo-950 via-indigo-950/70 md:via-indigo-950/60 to-transparent"></div>
              </div>

              {/* --- CONTENT LAYER --- */}
              <div className="relative h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center items-center md:items-end text-center md:text-right text-white z-10">
                <div className="max-w-2xl space-y-4 md:space-y-6">
                  <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black leading-tight tracking-tighter uppercase drop-shadow-2xl">
                    {movie.title}
                  </h1>

                  {/* Info Row */}
                  <div className="flex justify-center md:justify-end items-center gap-3 md:gap-4 text-xs md:text-sm font-bold text-sky-100/80">
                    <span>{movie.release_year}</span>
                    <span className="text-sky-400/50 text-lg">•</span>
                    <span>{formatMinutesToHours(movie?.duration)} MIN</span>
                    <span className="text-sky-400/50 text-lg">•</span>
                    <span className="text-white uppercase tracking-wider">
                      {movie.language}
                    </span>
                  </div>

                  <div className="flex flex-row flex-wrap gap-2 md:gap-4 pt-6 justify-center md:justify-end items-center">
                    <Link to="/become-partner" className="block w-fit">
                      <button className="w-fit px-4 md:px-8 py-2.5 md:py-4 bg-sky-500 text-white text-[12px] md:text-base font-black rounded-xl md:rounded-2xl shadow-lg hover:bg-sky-400 transition-all active:scale-95 flex items-center justify-center gap-2">
                        <FaHandshake className="text-lg" />
                        <span>Become Partner</span>
                      </button>
                    </Link>

                    <Link to={`/movies/${movie._id}`} className="block w-fit">
                      <button className="w-fit px-4 md:px-8 py-2.5 md:py-4 bg-white text-indigo-950 text-[12px] md:text-base font-black rounded-xl md:rounded-2xl shadow-xl hover:bg-sky-50 transition-all active:scale-95">
                        View Details
                      </button>
                    </Link>

                    <Link to="/all-movies" className="block w-fit">
                      <button className="w-fit px-4 md:px-8 py-2.5 md:py-4 border-2 border-white/40 backdrop-blur-md text-[12px] md:text-base font-bold rounded-xl md:rounded-2xl hover:bg-white/10 hover:border-white transition-all text-white">
                        Explore All
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
