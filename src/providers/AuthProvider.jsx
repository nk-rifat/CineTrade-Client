import { useState } from "react";
import { AuthContext } from "../Context";
import axiosPublic, { setAccessToken } from "../api/axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async ({ email, password }) => {
    const res = await axiosPublic.post("/login", { email, password });

    setAccessToken(res.data.accessToken);

    setUser(res.data.user);
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
