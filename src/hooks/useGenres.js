import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGenres = () => {
  return useQuery({
    queryKey: ["movieGenres"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/movies/genres`,
      );
      return res.data;
    },
  });
};
