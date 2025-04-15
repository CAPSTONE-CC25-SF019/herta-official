import { useSymptomInput } from '../../hooks/useSymptomInput';
import Navbar from '../../components/ui/navbar';

const SymptomInput = () => {
  const nav = [
  {
    name: "Home",
    link: "/#home",
  },
  {
    name: "Analytic",
    link: "/#about",
  },
  {
    name: "History",
    link: "/history",
  },
  ];

  // Contoh data untuk suggestion
  const allSuggestions = ['Stroke', 'Cough', 'Fever', 'Headache', 'Nausea', 'Dizziness', 'Fatigue', 'Pain'];
  
  const {
    input,
    suggestions,
    selectedItems,
    inputRef,
    onChangeInputHandler,
    handleSuggestionClick,
    handleRemoveItem,
    handleKeyDown,
    handleCheck
  } = useSymptomInput({ initialSuggestions: allSuggestions });

  return (
    <>
    <Navbar srcLogo="/src/assets/images/logo.png" navItem={nav} stickyThreshold={-100} />
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-sm">
      <div className="relative mb-4">
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <div className="flex flex-wrap gap-2 p-2">
            {selectedItems.length > 0 && selectedItems.map((item, index) => (
              <span 
                key={index} 
                className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center"
              >
                {item}
                <button 
                  onClick={() => handleRemoveItem(item)}
                  className="ml-2 text-white font-bold"
                >
                  &times;
                </button>
              </span>
            ))}
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={onChangeInputHandler}
              onKeyDown={handleKeyDown}
              className="flex-grow outline-none p-2 min-w-[200px]"
              placeholder="Insert you symptom..."
            />
          </div>
        </div>
        
        {suggestions.length > 0 && (
          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
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
        {allSuggestions.map((suggestion, index) => (
          <button
            key={index}
            className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
      
      <div className="flex justify-end">
        <button 
          onClick={handleCheck}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
        >
          Check
        </button>
      </div>
    </div>
    </>
  );
};

export default SymptomInput;