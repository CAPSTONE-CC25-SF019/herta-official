import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const useCheckUser = () => {
  const authContext = useContext(AuthContext);
  const { token } = authContext ?? {};
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return { isAuthenticated: !!token };
};

export default useCheckUser;