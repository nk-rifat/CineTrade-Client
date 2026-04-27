import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MovieCard from "../../Shared/components/MovieCard";
import Loading from "../../../Components/Shared/Loading";

const MoviesByGenres = () => {
  const [searchParams] = useSearchParams();
  const genre = searchParams.get("genre");

  const { data, isLoading } = useQuery({
    queryKey: ["moviesByGenre", genre],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/movies?genre=${genre}`,
      );
      return res.data;
    },
  });

  const movies = data?.movies || [];

  if (isLoading) {
    return <Loading fullPage={true} />;
  }

  return (
    <section className="bg-linear-to-br from-black via-slate-900 to-black min-h-screen px-6 md:px-12 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl md:text-3xl font-black uppercase italic text-white">
          {genre}{" "}
          <span className="text-amber-500 border-b-2 border-amber-500">
            Movies
          </span>
        </h2>
        <div className="h-px grow ml-6 bg-linear-to-r from-amber-500/50 to-transparent hidden md:block"></div>
      </div>

      {/* Movies Grid */}
      {movies.length === 0 ? (
        <p className="text-gray-400 text-center mt-20">
          No movies found in this genre.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
};

export default MoviesByGenres;
