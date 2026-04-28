import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MovieHero from "./Components/MovieHero";
import MovieInfo from "./Components/MovieInfo";
import MovieTrailer from "./Components/MovieTrailer";
import RelatedMovies from "./Components/RelatedMovies";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../../Components/Shared/Loading";
import Error from "../../Components/Shared/Error";

const MovieDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();

  const {
    data: movie,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/movies/${id}`,
      );
      return res.data;
    },
  });

  // Scroll to top whenever the ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  //increase the views of movie if visit details page

  useEffect(() => {
    if (!id) return;
    const key = `viewed-${id}`;
    const lastView = localStorage.getItem(key);
    const now = Date.now();

    //  12 hours cooldown
    if (!lastView || now - lastView > 12 * 60 * 60 * 1000) {
      axios.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/movies/${id}/view`, {
        role: user?.role || "guest",
      });
      localStorage.setItem(key, now.toString());
    }
  }, [id, user?.role]);

  if (isLoading) {
    return <Loading message="Unrolling Film..." fullPage={true} />;
  }

  if (isError || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-6">
        <Error
          message={
            error?.message ||
            "This title might have been removed or is temporarily unavailable."
          }
          onRetry={refetch}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-slate-900 to-black text-white">
      <MovieHero movie={movie} />

      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <MovieInfo movie={movie} />
          </div>
          <div className="lg:col-span-8">
            <MovieTrailer movie={movie} />
          </div>
        </div>
        <RelatedMovies />
      </div>
    </div>
  );
};

export default MovieDetails;
