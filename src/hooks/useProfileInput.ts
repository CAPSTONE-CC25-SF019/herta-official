import useInput from "./useInput";

interface UseProfileHookProps {
  usernameDefault?: string;
  emailDefault?: string;
  genderDefault?: string;
  passwordDefault?: string;
}

export default function useProfileInput({
  usernameDefault = "",
  emailDefault = "",
  genderDefault = "",
  passwordDefault = "",
}: UseProfileHookProps) {
  const [username, handleUsernameChange, setUsername] = useInput(usernameDefault);
  const [email, handleEmailChange, setEmail] = useInput(emailDefault);
  const [gender, handleGenderChange, setGender] = useInput(genderDefault);
  const [password, handlePasswordChange, setPassword] = useInput(passwordDefault);

  return {
    username,
    email,
    gender,
    password,
    handleUsernameChange,
    handleEmailChange,
    handleGenderChange,
    handlePasswordChange,
    setUsername,
    setEmail,
    setGender,
    setPassword,
  };
}