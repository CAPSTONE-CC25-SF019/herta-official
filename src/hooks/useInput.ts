import { useState } from "react";

export default function useInput(defaultValue = "") {
  const [input, setInput] = useState<string>(defaultValue);
  function onChangeInputHandler(e: React.ChangeEvent<HTMLInputElement>): void {
    setInput(e.target.value);
  }

  return [input, onChangeInputHandler];
}
