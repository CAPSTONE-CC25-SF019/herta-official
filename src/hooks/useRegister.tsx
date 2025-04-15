import axiosClient from "../libs/axios-client";
import { FormEvent, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useInput from "./useInput";

export default function useRegister() {
  const [email, setEmail] = useInput();
  const [username, setUsername] = useInput();
  const [password, setPassword] = useInput();
  const [passwordConfirmation, setPasswordConfirmation] = useInput();
  const [age, setAge] = useInput();
  const [gender, setGender] = useInput();

  const context = useContext(AuthContext);

  const register = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (password !== passwordConfirmation) {
        alert("Your password confirmation is wrong");
        return;
      }

      const response = await axiosClient.post("/api/v1/users/register", {
        email,
        username,
        password,
        age,
        gender,
      });
      context?.setToken(response.data.data.accessToken);
      console.log(context?.token);
    } catch (error) {
      console.log(error);
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
    age,
    setAge,
    gender,
    setGender,
  };
}
