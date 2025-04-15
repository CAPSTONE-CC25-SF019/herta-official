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
        const response = await axiosClient.get("/api/v1/users/profile");
        const data = await response.data.data;

        setUser(data);
      } catch {
        // setToken(null);
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
export { AuthContext };
