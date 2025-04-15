import { useState, ChangeEvent } from "react";

export default function useInput(defaultValue = ""): [string, (e: ChangeEvent<HTMLInputElement>) => void] {
  const [input, setInput] = useState(defaultValue);
  
  function onChangeInputHandler(e: ChangeEvent<HTMLInputElement>): void {
    setInput(e.target.value);
  }
  
  return [input, onChangeInputHandler];
}