import { Link } from "react-router-dom";
import { useGenres } from "../../../hooks/useGenres";

const GenresSection = () => {
  const { data: genres, isLoading } = useGenres();

  if (isLoading) {
    return (
      <div className="flex justify-center p-10 w-full bg-[#050505]">
        <span className="loading loading-spinner loading-sm text-amber-500"></span>
      </div>
    );
  }

  return (
    <section className="w-full py-10 ">
      <div className="px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-14">
          <h2 className="text-2xl md:text-3xl font-black uppercase italic text-white">
            Explore{" "}
            <span className="text-sky-500 border-b-2 border-sky-500">
              Categories
            </span>
          </h2>
          <div className="h-[1px] flex-grow ml-8 bg-gradient-to-r from-sky-500/50 to-transparent hidden md:block"></div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
          {genres?.map((genre) => (
            <Link
              key={genre}
              to={`/movies?genre=${genre}`}
              className="group flex items-center justify-center py-3 px-4 rounded-md 
                         bg-[#1a1a1a] border border-white/[0.03] 
                         hover:border-amber-500/50 hover:bg-amber-500/10 
                         active:scale-95
                         transition-all duration-200 ease-in-out
                         shadow-sm"
            >
              <span
                className="text-[11px] md:text-[12px] font-bold text-gray-300 
                           group-hover:text-amber-400 uppercase tracking-widest truncate"
              >
                {genre}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GenresSection;
