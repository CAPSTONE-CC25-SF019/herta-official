import { useState } from "react";

export default function useCheck(defaultValue = false) {
  const [input, _setInput] = useState(defaultValue);
  const setInput = () => _setInput((prevState) => !prevState);
  return [input, setInput] as const;
}