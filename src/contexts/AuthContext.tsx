import {
  createContext,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
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
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>();
  const [user, setUser] = useState<User | null>(null);
  const [_apiRetry, _setApiRetry] = useState(false);

  useEffect(() => {
    const getAuthenticatedUser = async () => {
      try {
        const response = await axiosClient.get("/users");
      } catch {
        setToken(null);
      }
    };

    getAuthenticatedUser();
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

  useLayoutEffect(() => {
    const refreshInterceptor = axiosClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response.status === 401 && // Depend on error status and message
          error.response.data.message === "Unauthenticated."
        ) {
          try {
            const response = await axiosClient.get("/api/refreshToken");
            setToken(response.data.accessToken);

            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            _setApiRetry(true);
          } catch {
            setToken(null);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosClient.interceptors.request.eject(refreshInterceptor);
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      token,
      user,
      setToken,
      setUser,
    }),
    [token, user],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
