import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCurrentUser = () => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/me");
      return res.data;
    },
  });
};

export default useCurrentUser;
