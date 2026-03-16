import axiosPublic, { setAccessToken } from "../api/axios";
import { useAuth } from "./useAuth";

const useAxiosSecure = () => {
  const { logout } = useAuth();

  axiosPublic.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const res = await axiosPublic.post("/refresh", {});

          setAccessToken(res.data.accessToken);

          originalRequest.headers.Authorization =
            "Bearer" + res.data.accessToken;
          return axiosPublic(originalRequest);
        } catch {
          logout();
        }
      }

      return Promise.reject(error);
    },
  );

  return axiosPublic;
};

export default useAxiosSecure;
