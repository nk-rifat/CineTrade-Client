import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePopularMovies = () => {
  return useQuery({
    queryKey: ["popularMovies"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/movies/popular`,
      );
      return res.data;
    },
  });
};

export default usePopularMovies;
