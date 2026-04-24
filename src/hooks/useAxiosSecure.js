import { useEffect } from "react";
import { axiosSecure, axiosPublic, setAccessToken } from "../api/axios";
import { useAuth } from "./useAuth";
import { useQueryClient } from "@tanstack/react-query";

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    // 1. This watches every response coming back from the server.
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalRequest = error.config;

        if (originalRequest.url.includes("/refresh")) {
          return Promise.reject(error);
        }

        // 2. Only attempt a refresh if the error is 401 and we haven't tried retrying yet.
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // 3. Use axiosPublic so this call DOES NOT trigger this same interceptor.
            const res = await axiosPublic.post("/refresh");
            const newAccessToken = res.data.accessToken;

            // 4. Save the new token in memory and update the headers for the retry.
            setAccessToken(newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            // 5.Re-run the failed request with the fresh token and return the result.
            return axiosSecure(originalRequest);
          } catch (refreshError) {
            // 6.Clear the TanStack Query cache to remove stale data.
            queryClient.clear();
            // Log the user out to reset the app state.
            logOut();
            return Promise.reject(refreshError);
          }
        }

        // If it's not a 401 error or retry already happened, just throw the error.
        return Promise.reject(error);
      },
    );

    // 7. Remove the interceptor when this hook unmounts to prevent multiple interceptors stacking up.
    return () => {
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, queryClient]);

  // Return the configured axios instance for use in components.
  return axiosSecure;
};

export default useAxiosSecure;
