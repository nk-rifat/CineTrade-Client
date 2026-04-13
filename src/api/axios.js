import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_BASE_URL;

export const axiosPublic = axios.create({
  baseURL,
  withCredentials: true,
});

export const axiosSecure = axios.create({
  baseURL,
  withCredentials: true,
});

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

axiosSecure.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default axiosSecure;
