import { useNavigate } from "react-router-dom";
import useCurrentUser from "./useCurrentUser";

const useMovieAction = (movie) => {
  const navigate = useNavigate();
  const { data: currentUser } = useCurrentUser();

  const isPurchased = currentUser?.purchasedMovies?.includes(movie._id);

  const handleAction = () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    if (currentUser.role === "admin" || currentUser.role === "partner") {
      return;
    }

    if (isPurchased) {
      navigate(`movie/watch/${movie._id}`);
      return;
    }

    navigate(`/payment/movie/${movie._id}`);
  };

  const getButtonText = () => {
    if (!currentUser) return "Buy Now";
    if (currentUser.role === "admin" || currentUser.role === "partner")
      return "Not Available";
    if (isPurchased) return "Watch Now";
    if (movie.release_status === "upcoming") return "Pre-Order";
    return "Buy Now";
  };

  return {
    handleAction,
    getButtonText,
    isPurchased,
    currentUser,
  };
};

export default useMovieAction;
