import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "../../../hooks/useCurrentUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MovieCard from "../../Shared/components/MovieCard";

const MyMovies = () => {
  const { data: currentUser, isLoading: userLoading } = useCurrentUser();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const purchasedIds = currentUser?.purchasedMovies || [];

  const { data: movies = [], isLoading: moviesLoading } = useQuery({
    queryKey: ["purchasedMovies", purchasedIds],
    enabled: !!currentUser && purchasedIds.length > 0,
    queryFn: async () => {
      const res = await axiosSecure.post("/movies/by-ids", {
        ids: purchasedIds,
      });
      return res.data;
    },
  });

  // Loading State
  if (userLoading || moviesLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  //  Empty State
  if (purchasedIds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center min-h-[60vh] bg-base-200 rounded-xl p-6">
        <div className="text-5xl mb-3">🎬</div>
        <h2 className="text-2xl font-bold mb-2">No Movies Purchased Yet</h2>

        <button
          onClick={() => navigate("/all-movies")}
          className="btn btn-primary"
        >
          Browse All Movies
        </button>
      </div>
    );
  }

  // Movies Grid
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">My Purchased Movies</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MyMovies;
