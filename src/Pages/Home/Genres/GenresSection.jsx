import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";

const GenresSection = () => {
  const { data: genres, isLoading } = useQuery({
    queryKey: ["movieGenres"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/genres`,
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-10 w-full bg-[#050505]">
        <span className="loading loading-spinner loading-sm text-amber-500"></span>
      </div>
    );
  }

  return (
    <section className="w-full bg-[#121212] py-10 border-y border-white/5">
      <div className="w-full px-6">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="h-4 w-[2px] bg-amber-500 shadow-[0_0_10px_#f59e0b]"></div>
          <h2 className="text-[12px] font-black uppercase tracking-[0.4em] text-white/80">
            Explore Category
          </h2>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
          {genres?.map((genre) => (
            <Link
              key={genre}
              to={`/all-movies?genre=${genre}`}
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
