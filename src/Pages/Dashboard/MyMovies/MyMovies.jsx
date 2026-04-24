import { useNavigate } from "react-router-dom";
import MovieCard from "../../Shared/components/MovieCard";
import usePurchasedMovies from "../../../hooks/usePurchasedMovies";
import { FiCreditCard } from "react-icons/fi";
import Loading from "../../../Components/Shared/Loading";

const MyMovies = () => {
  const navigate = useNavigate();
  const { purchaseMovies, isLoading } = usePurchasedMovies();

  if (isLoading)
    return <Loading message="Accessing Your Library..." fullPage={true} />;

  //  Empty State
  if (purchaseMovies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center min-h-[60vh]  rounded-xl p-6">
        <div className="text-5xl mb-3">🎬</div>
        <h2 className="text-2xl font-bold mb-2">No Movies Purchased Yet</h2>

        <button
          onClick={() => navigate("/all-movies")}
          className="btn btn-primary btn-wide rounded-full font-bold shadow-lg hover:shadow-primary/30 transition-all duration-300"
        >
          Browse All Movies
        </button>
      </div>
    );
  }

  // Movies Grid
  return (
    <div className="p-4">
      <h2 className="text-4xl font-black text-white tracking-tight flex items-center gap-3 mb-8">
        <FiCreditCard className="text-amber-500" />
        My Purchase Movies
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {purchaseMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MyMovies;
