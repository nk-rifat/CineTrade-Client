import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCurrentUser = () => {
  const axiosSecure = useAxiosSecure();
  const { token } = useAuth();

  return useQuery({
    queryKey: ["currentUser"],
    enabled: !!token,
    queryFn: async () => {
      const res = await axiosSecure.get("/users/me");
      return res.data;
    },
  });
};

export default useCurrentUser;
