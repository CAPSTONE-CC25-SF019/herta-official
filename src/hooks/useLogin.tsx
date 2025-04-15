import axiosClient from "../libs/axios-client";
import { FormEvent, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useInput from "./useInput";

export default function useLogin() {
  const [email, setEmail] = useInput();
  const [password, setPassword] = useInput();

  const context = useContext(AuthContext);

  const login = async (e: FormEvent) => {
    e.preventDefault();
    try {
      console.log("TEST");
      const response = await axiosClient.post("/api/v1/users/login", {
        email,
        password,
      });
      context?.setToken(response.data.data.accessToken);
      
    } catch (error) {
      console.log(error);
    }
  };

  return { login, email, setEmail, password, setPassword };
}
