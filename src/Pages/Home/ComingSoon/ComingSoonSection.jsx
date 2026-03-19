import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MovieCard from "../../Shared/components/MovieCard";

const ComingSoonSection = () => {
  const { data: comingSoonMovies, isLoading } = useQuery({
    queryKey: ["comingSoon"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/movies/coming-soon`,
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-[#050505]">
        <span className="loading loading-ring loading-lg text-white"></span>
      </div>
    );
  }

  return (
    <section className="w-full bg-[#050505] py-20 text-white">
      <div className="px-6 md:px-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-14">
          <h2 className="text-4xl md:text-5xl font-black uppercase italic">
            Upcoming{" "}
            <span className="text-sky-500 border-b-2 border-sky-500">
              Movies
            </span>
          </h2>
          <div className="h-[1px] flex-grow ml-8 bg-gradient-to-r from-sky-500/50 to-transparent hidden md:block"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {comingSoonMovies?.map((movie) => (
            <MovieCard movie={movie} comingSoon={true} preOrder={true} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComingSoonSection;