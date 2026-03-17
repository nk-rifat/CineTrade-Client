import { useEffect } from "react";
import axiosPublic, { setAccessToken } from "../api/axios";
import { useAuth } from "./useAuth";

const useAxiosSecure = () => {
  const { logOut } = useAuth();

  useEffect(() => {
    // RESPONSE INTERCEPTOR
    const responseInterceptor = axiosPublic.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalRequest = error.config;

        // If status is 401 (Expired) and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Attempt to get a new token
            const res = await axiosPublic.post("/refresh");
            const newAccessToken = res.data.accessToken;

            setAccessToken(newAccessToken);

            // Update the header for the retry
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            
            // Execute the original request again with the new token
            return axiosPublic(originalRequest);
          } catch (refreshError) {
            // If the refresh token is also expired, force logout
            logOut();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );

    // CLEANUP: Removes the interceptor when the component using this hook unmounts
    return () => {
      axiosPublic.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut]);

  return axiosPublic;
};

export default useAxiosSecure;
