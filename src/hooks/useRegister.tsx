import axiosClient from "../libs/axios-client";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useInput from "./useInput";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

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

interface ValidationErrors {
  username?: string[];
  email?: string[];
  password?: string[];
  password_confirmation?: string[];
  gender?: string[];
}

export default function useRegister() {
  const [email, setEmail] = useInput();
  const [username, setUsername] = useInput();
  const [password, setPassword] = useInput();
  const [passwordConfirmation, setPasswordConfirmation] = useInput();
  const [gender, setGender] = useInput();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  
  const context = useContext(AuthContext);

  const navigate = useNavigate();

  const register = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors(null);
    setGeneralError(null);

    const newErrors: ValidationErrors = {};
    let hasErrors = false;

    if (!username) {
      newErrors.username = ["Username is required"];
      hasErrors = true;
    }

    if (!email) {
      newErrors.email = ["Email is required"];
      hasErrors = true;
    } else if (!/\S+@\S+\.\S+/.test(email as string)) {
      newErrors.email = ["Please enter a valid email address"];
      hasErrors = true;
    }

    if (!password) {
      newErrors.password = ["Password is required"];
      hasErrors = true;
    } else if ((password as string).length < 6) {
      newErrors.password = ["Password must be at least 6 characters"];
      hasErrors = true;
    }

    if (password !== passwordConfirmation) {
      newErrors.password_confirmation = ["Password confirmation doesn't match"];
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axiosClient.post("/api/v1/users/register", {
        email,
        username,
        password,
        gender,
      });
      
      const accessToken = response.data.data.accessToken;
      context?.setToken(accessToken);
      localStorage.setItem('token', accessToken);
      
    } catch (err) {
      console.error("Registration error:", err);
      const error = err as AxiosError<ErrorResponse>;
      
      if (error.response) {
        if (error.response.status === 422) {
          const serverErrors: ValidationErrors = {};
          
          error.response.data?.errors?.forEach((errorItem) => {
            const field = errorItem.detail.path as keyof ValidationErrors;
            if (field) {
              if (!serverErrors[field]) {
                serverErrors[field] = [];
              }
              serverErrors[field]?.push(errorItem.detail.message);
            }
          });
          
          setErrors(serverErrors);
        } 
        else if (error.response.status === 409) {
          setGeneralError("Email or username already exists");
        } else {
          setGeneralError(
            error.response.data?.errors?.[0]?.detail.message ||
            "An error occurred during registration"
          );
        }
      } else if (error.request) {
        setGeneralError("No response from server. Please check your connection.");
      } else {
        setGeneralError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
      navigate("/login");
    }
  };

  return {
    register,
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    gender,
    setGender,
    isLoading,
    errors,
    generalError
  };
}