import { useState, useEffect } from "react";

import axiosPublic, { setAccessToken } from "../api/axios";
import { AuthContext } from "../Context";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const persistLogin = async () => {
      try {
        const res = await axiosPublic.post("/refresh");

        setAccessToken(res.data.accessToken);
        setUser(res.data.user);
      } catch (err) {
        console.error("No valid session found on refresh.");
      } finally {
        setLoading(false);
      }
    };

    persistLogin();
  }, []);

  const login = async ({ email, password }) => {
    const res = await axiosPublic.post("/login", { email, password });
    setAccessToken(res.data.accessToken);
    setUser(res.data.user);
    return res;
  };

  const register = async (userData) => {
    return await axiosPublic.post("/register", userData);
  };

  const logOut = async () => {
    try {
      await axiosPublic.post("/logout");
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  };

  const authInfo = { user, login, register, logOut, loading };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading ? children : <div className="loading-spinner">Loading...</div>}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
