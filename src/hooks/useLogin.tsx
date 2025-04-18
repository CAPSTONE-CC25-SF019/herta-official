import axiosClient from "../libs/axios-client";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useInput from "./useInput";
import { AxiosError } from "axios";

interface ErrorDetail {
  message: string;
  path?: string;
}

interface ErrorItem {
  title: string;
  status: number;
  code: string;
  detail: ErrorDetail;
}

interface ErrorResponse {
  errors: ErrorItem[];
}

export default function useLogin() {
  const [email, setEmail] = useInput();
  const [password, setPassword] = useInput();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const context = useContext(AuthContext);
  
  const login = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axiosClient.post("/api/v1/users/login", {
        email,
        password,
      });
      
      const accessToken = response.data.data.accessToken;
      context?.setToken(accessToken);
      localStorage.setItem('token', accessToken);
      
    } catch (err) {
      console.error("Login error:", err);
      const error = err as AxiosError<ErrorResponse>;
      if (error.response) {
        if (error.response.status === 404) {
          setError(
            error.response.data?.errors?.[0]?.detail.message || 
            "User not found"
          );
        } 
        else if (error.response.status === 400) {
          setError(
            error.response.data?.errors?.[0]?.detail.message || 
            "Invalid email or password"
          );
        }
        else if (error.response.status === 401) {
          setError(
            error.response.data?.errors?.[0]?.detail.message || 
            "Email or password wrong"
          );
        }
        else {
          setError(
            error.response.data?.errors?.[0]?.detail.message || 
            "An error occurred during login"
          );
        }
      } else if (error.request) {
        setError("No response from server. Please check your connection.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    login, 
    email, 
    setEmail, 
    password, 
    setPassword,
    isLoading,
    error
  };
}