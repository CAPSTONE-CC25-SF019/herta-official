import { useState, ChangeEvent } from 'react';

type UseInputReturn = [
  string,
  (e: ChangeEvent<HTMLInputElement>) => void,
  (value: string) => void
];

const useInput = (initialValue: string = ''): UseInputReturn => {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const resetValue = (newValue: string) => {
    setValue(newValue);
  };

  return [value, handleChange, resetValue];
};

export default useInput;