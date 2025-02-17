import { createContext, useContext, useState, useCallback } from "react";
import { TContextType } from "../types";
import { checkSession } from "../lib/axios/axiosApis";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const INITIAL_USER = {
  id: "",
  name: "",
  email: "",
  avatar: "",
  createdAt: "",
  updatedAt: "",
};

const INITIAL_STATE = {
  isAuthenticated: false,
  user: INITIAL_USER,
  isLoading: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false,
};

const AuthContext = createContext<TContextType>(INITIAL_STATE);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const checkAuthUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await checkSession();
      console.log("checkSession response:", response);

      if (!response?.success) {
        setIsAuthenticated(false);
        setUser(INITIAL_USER);
        navigate("/auth/signin");
        return false;
      }
      toast.success("Authentication successful");
      setIsAuthenticated(true);
      setUser(response.data);
      return true;
    } catch (error) {
      toast.error("Authentication failed, please login again");
      setIsAuthenticated(false);
      navigate("/auth/signin");
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => useContext(AuthContext);
