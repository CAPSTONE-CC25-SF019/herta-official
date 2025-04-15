import { useState, useEffect, useRef } from 'react';
import useInput from './useInput';

interface UseSymptomInputProps {
  initialSuggestions: string[];
}

export const useSymptomInput = ({ initialSuggestions }: UseSymptomInputProps) => {
  const [input, onChangeInputHandler] = useInput('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (input.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = initialSuggestions.filter(
      item => item.toLowerCase().includes(input.toLowerCase()) && !selectedItems.includes(item)
    );
    setSuggestions(filteredSuggestions);
  }, [input, selectedItems, initialSuggestions]);

  const handleSuggestionClick = (suggestion: string) => {
    if (!selectedItems.includes(suggestion)) {
      setSelectedItems([...selectedItems, suggestion]);
    }
    // Karena useInput tidak menyediakan metode untuk mengatur nilai langsung,
    // kita perlu mengatur ulang input secara manual
    if (inputRef.current) {
      inputRef.current.value = '';
      // Trigger change event untuk mengupdate state di useInput
      const event = new Event('input', { bubbles: true });
      inputRef.current.dispatchEvent(event);
    }
    inputRef.current?.focus();
  };

  const handleRemoveItem = (item: string) => {
    setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() !== '' && suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]);
    }
  };

  const handleCheck = () => {
    console.log('Checking symptoms:', selectedItems);
    // Implementasi logika check di sini
  };

  return {
    input,
    suggestions,
    selectedItems,
    inputRef,
    onChangeInputHandler,
    handleSuggestionClick,
    handleRemoveItem,
    handleKeyDown,
    handleCheck
  };
};