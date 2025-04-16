import {
  createContext,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import axiosClient from "../libs/axios-client";

interface User {
  username: string;
  email: string;
}

interface AuthContextProps {
  token: string | null | undefined;
  user: User | null;
  setToken: React.Dispatch<React.SetStateAction<string | null | undefined>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null | undefined>(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken ? storedToken : null;
  });
  
  const [user, setUser] = useState<User | null>(null);
  const [_apiRetry, _setApiRetry] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    const getAuthenticatedUser = async () => {
      try {
        const response = await axiosClient.get("/api/v1/users/profile");
        const data = await response.data.data;
        setUser(data);
      } catch (error: unknown) {
        const err = error as { response?: { status?: number } };
        if (err.response?.status === 401) {
          setToken(null);
          localStorage.removeItem('token');
        }
      }
    };
    
    if (token) {
      getAuthenticatedUser();
    }
  }, [token]);

  useLayoutEffect(() => {
    const authInterceptor = axiosClient.interceptors.request.use((config) => {
      config.headers.Authorization =
        token && !_apiRetry ? `Bearer ${token}` : config.headers.Authorization;
      return config;
    });

    return () => {
      axiosClient.interceptors.request.eject(authInterceptor);
      _setApiRetry(false);
    };
  }, [token, _apiRetry]);

  const logout = useCallback(async () => {
    try {
      if (user?.email) {
        await axiosClient.delete(`/api/v1/users/logout?email=${encodeURIComponent(user.email)}`);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear semua local state and localStorage
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
    }
  }, [user]);

  const contextValue = useMemo(
    () => ({
      token,
      user,
      setToken,
      setUser,
      logout,
    }),
    [token, user, logout],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
export { AuthContext };