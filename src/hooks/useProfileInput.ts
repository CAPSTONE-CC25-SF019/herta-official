import useInput from "./useInput";

interface UseProfileHookProps {
  usernameDefault?: string;
  emailDefault?: string;
  phoneNumberDefault?: string;
}

export default function useProfileInput({
  usernameDefault = "",
  emailDefault = "",
  phoneNumberDefault = "",
}: UseProfileHookProps) {
  const [username, setUsername] = useInput(usernameDefault);
  const [email, setEmail] = useInput(emailDefault);
  const [phoneNumber, setPhoneNumber] = useInput(phoneNumberDefault);

  return {
    username,
    email,
    phoneNumber,
    setUsername,
    setEmail,
    setPhoneNumber,
  };
}
