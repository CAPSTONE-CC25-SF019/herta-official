import useInput from "./useInput";

interface UseProfileHookProps {
  usernameDefault?: string;
  emailDefault?: string;
  phoneNumberDefault?: string;
}

export default function useProfileInput({
  usernameDefault = "",
  emailDefault = "",
}: UseProfileHookProps) {
  const [username, setUsername] = useInput(usernameDefault);
  const [email, setEmail] = useInput(emailDefault);

  return {
    username,
    email,
    setUsername,
    setEmail,
  };
}
