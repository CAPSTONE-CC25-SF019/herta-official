// health-analytic/index.tsx
import { useState, useRef } from 'react';
import Navbar from '../../components/ui/navbar';

const SymptomInput = () => {
  const nav = [
    { name: "Home", link: "/#home" },
    { name: "Analytic", link: "/#about" },
    { name: "History", link: "/history" },
  ];

  // Example data for suggestions
  const allSuggestions = ['Stroke', 'Cough', 'Fever', 'Headache', 'Nausea', 'Dizziness', 'Fatigue', 'Pain'];
  
  // Simple state management - no custom hooks
  const [input, setInput] = useState('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    // Filter suggestions based on input
    if (value.trim() === '') {
      setSuggestions([]);
    } else {
      const filtered = allSuggestions.filter(
        item => item.toLowerCase().includes(value.toLowerCase()) && !selectedItems.includes(item)
      );
      setSuggestions(filtered);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    if (!selectedItems.includes(suggestion)) {
      setSelectedItems([...selectedItems, suggestion]);
      setInput('');
      setSuggestions([]);
      
      // Focus input after selection
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  // Handle removing an item
  const handleRemoveItem = (item: string) => {
    setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item));
  };

  // Handle key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && input.trim() !== '' && suggestions.length > 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[0]);
    }
  };

  // Handle check button click
  const handleCheck = () => {
    console.log('Checking symptoms:', selectedItems);
    // Here you would implement your check logic
  };

  return (
    <>
      <Navbar srcLogo="/src/assets/images/logo.png" navItem={nav} stickyThreshold={-100} />
      <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-4">Health Symptom Analyzer</h2>
        <p className="mb-4 text-gray-600">Enter your symptoms below or select from common symptoms to get an analysis.</p>
        
        <div className="relative mb-4">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <div className="flex flex-wrap gap-2 p-2 w-full">
              {selectedItems.map((item, index) => (
                <span 
                  key={index} 
                  className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {item}
                  <button
                    onClick={() => handleRemoveItem(item)}
                    className="ml-2 text-white font-bold"
                    type="button"
                  >
                    &times;
                  </button>
                </span>
              ))}
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="flex-grow outline-none p-2 min-w-[200px]"
                placeholder="Insert your symptoms..."
              />
            </div>
          </div>
          
          {suggestions.length > 0 && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <p className="w-full mb-2 text-sm text-gray-500">Common symptoms:</p>
          {allSuggestions.map((suggestion, index) => (
            <button
              type="button"
              key={index}
              className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm hover:bg-blue-200 transition-colors"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
        
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleCheck}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={selectedItems.length === 0}
          >
            {selectedItems.length === 0 ? "Select symptoms first" : "Check Symptoms"}
          </button>
        </div>
      </div>
    </>
  );
};

export default SymptomInput;