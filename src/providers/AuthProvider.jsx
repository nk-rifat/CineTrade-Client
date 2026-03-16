import { useState } from "react";
import { AuthContext } from "../Context";
import axiosPublic, { setAccessToken } from "../api/axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  console.log(user);

  const login = async ({ email, password }) => {
    const res = await axiosPublic.post("/login", { email, password });

    setAccessToken(res.data.accessToken);

    setUser(res.data.user);
    return res;
  };

  const register = async ({ fullName, email, password }) => {
    return await axiosPublic.post("register", { fullName, email, password });
  };

  const logOut = async () => {
    const res = await axiosPublic("/logout");
    setUser(null);
    setAccessToken(null);
    return res;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
