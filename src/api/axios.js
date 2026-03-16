import axios from "axios";

const axiosPublic = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}`,
  withCredentials: true,
});

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

axiosPublic.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default axiosPublic;
