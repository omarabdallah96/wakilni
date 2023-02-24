import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import API from "../utils/API";
const AuthContext = createContext();

export const AuthProvider = ({ children, userData }) => {
  const [user, setUser] = useLocalStorage("user", userData);
  const navigate = useNavigate();

  const login = async (data) => {
    API.post("login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        setUser(res.data.data);
        navigate("/dashboard/product_types", { replace: true });

      })
      .catch((res) => console.log(res.data));
  };
  const register = async (data) => {
    API.post("register", data)
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        setUser(res.data.data);
        navigate("/dashboard/product_types", { replace: true });

      })
      .catch((res) => console.log(res.data));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");


    navigate("/", { replace: true });

  };

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
