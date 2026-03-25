import { Link } from "react-router-dom";
import bg from "../../../../src/assets/banner-bg.png";

const Banner = () => {
  return (
    <div className="relative w-full h-[500px] md:h-[650px] overflow-hidden shadow-xl bg-indigo-950">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[4000ms] hover:scale-105"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-indigo-950/95 via-indigo-900/70 to-sky-500/20 mix-blend-multiply"></div>
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-center items-end text-right text-white z-10">
        <div className="max-w-2xl space-y-6 animate-fadeInUp">
          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tighter">
            Discover. Watch. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-sky-300 to-white">
              Share Your Movies.
            </span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-sky-100/90 max-w-lg ml-auto font-medium leading-relaxed">
            Explore a growing library of movies to watch anytime. Upgrade to a
            moderator to upload your own content, reach a wider audience, and
            earn from every sale.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-4 justify-end">
            <Link to="/all-movies">
              <button className="px-8 md:px-10 py-3 md:py-4 border-2 border-white/30 backdrop-blur-sm font-bold rounded-xl hover:bg-white/10 hover:border-white transition-all">
                Browse & Watch
              </button>
            </Link>

            <Link to="/become-partner">
              <button className="px-8 md:px-10 py-3 md:py-4 bg-white text-indigo-900 font-extrabold rounded-xl shadow-lg hover:bg-sky-50 transition-all hover:-translate-y-1 active:scale-95">
                Become a Partner
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
