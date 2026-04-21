import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure"; // Assuming you have this
import useCurrentUser from "./useCurrentUser";

const usePurchasedMovies = () => {
  const axiosSecure = useAxiosSecure();
  const { data: currentUser, isLoading: userLoading } = useCurrentUser();

  const purchasedIds = currentUser?.purchasedMovies || [];

  const {
    data: purchaseMovies = [],
    isLoading: moviesLoading,
    error,
  } = useQuery({
    queryKey: ["purchasedMovies", purchasedIds],
    enabled: !!currentUser && purchasedIds.length > 0,
    queryFn: async () => {
      const res = await axiosSecure.post("/movies/by-ids", {
        ids: purchasedIds,
      });
      return res.data;
    },
  });

  return {
    purchaseMovies,
    isLoading: userLoading || moviesLoading,
    currentUser,
    error,
  };
};

export default usePurchasedMovies;
