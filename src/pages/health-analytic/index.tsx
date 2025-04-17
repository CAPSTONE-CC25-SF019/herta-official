import { useEffect, useState } from "react";
import Navbar from "../../components/ui/navbar";
import useCheckUser from "../../hooks/useCheckUser";
import useSymptomDiagnosis from "../../hooks/useSymptomDiagnosis";
import symptomsData from "../../libs/symptoms.json";
import logo from "../../assets/images/logo.png"

const SymptomInput = () => {
  const { isAuthenticated } = useCheckUser();
  const allSuggestions = symptomsData.symptoms;
  const [showAllSymptoms, setShowAllSymptoms] = useState(false);

  const INITIAL_SYMPTOM_COUNT = 8;
  const displayedSymptoms = showAllSymptoms
    ? allSuggestions
    : allSuggestions.slice(0, INITIAL_SYMPTOM_COUNT);

  const {
    input,
    selectedItems,
    suggestions,
    isLoading,
    error,
    disease,
    confidence,
    inputRef,
    handleInputChange,
    handleSuggestionClick,
    handleRemoveItem,
    handleKeyDown,
    handleCheck,
  } = useSymptomDiagnosis(allSuggestions);

  const nav = [
    { name: "Home", link: "/" },
    { name: "Analytic", link: "/health-analytic" },
    { name: "History", link: "/history" },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }
  }, [isAuthenticated]);

  const toggleSymptomDisplay = () => {
    setShowAllSymptoms(!showAllSymptoms);
  };

  return (
    <>
      <Navbar
        srcLogo={logo}
        navItem={nav}
        stickyThreshold={-100}
      />
      <div className="mx-auto my-8 max-w-4xl rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Health Symptom Analyzer</h2>
        <p className="mb-4 text-gray-600">
          Enter your symptoms below or select from common symptoms to get an
          analysis.
        </p>

        <div className="relative mb-4">
          <div className="flex items-center overflow-hidden rounded-lg border border-gray-300">
            <div className="flex w-full flex-wrap gap-2 p-2">
              {selectedItems.map((item, index) => (
                <span
                  key={index}
                  className="bg-herta-400 flex items-center rounded-full px-3 py-1 text-sm text-white"
                >
                  {item}
                  <button
                    onClick={() => handleRemoveItem(item)}
                    className="ml-2 font-bold text-white"
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
                className="min-w-[200px] flex-grow p-2 outline-none"
                placeholder="Insert your symptoms..."
              />
            </div>
          </div>

          {suggestions.length > 0 && (
            <div className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-gray-500">Common symptoms:</p>
            <button
              onClick={toggleSymptomDisplay}
              className="text-herta-400 hover:text-herta-500 text-sm hover:underline"
            >
              {showAllSymptoms ? "Show less" : "Show more"}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {displayedSymptoms.map((suggestion, index) => (
              <button
                type="button"
                key={index}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  selectedItems.includes(suggestion)
                    ? "bg-herta-400 hover:bg-herta-500 text-white"
                    : "bg-herta-200/30 text-herta-500 hover:bg-herta-300/50"
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-100 p-4 text-red-700">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleCheck}
            className="bg-herta-400 hover:bg-herta-500 rounded-md px-6 py-2 text-white transition-colors disabled:cursor-not-allowed disabled:bg-gray-300"
            disabled={selectedItems.length === 0 || isLoading}
          >
            {isLoading
              ? "Processing..."
              : selectedItems.length === 0
                ? "Select symptoms first"
                : "Check Symptoms"}
          </button>
        </div>

        {/* Disease Result Card */}
        {disease && (
          <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800 capitalize">
                {disease.name}
              </h3>
              {confidence !== null && (
                <span className="bg-herta-100 text-herta-500 rounded-full px-3 py-1 text-sm font-medium">
                  {confidence}% confidence
                </span>
              )}
            </div>

            {disease.description && (
              <p className="mt-4 text-gray-600">{disease.description}</p>
            )}

            <div className="mt-6">
              <h4 className="mb-2 font-semibold text-gray-700">
                Associated Symptoms:
              </h4>
              <div className="flex flex-wrap gap-2">
                {disease.symptoms.map((item, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                  >
                    {item.symptom.name}
                  </span>
                ))}
              </div>
            </div>

            {disease.image && (
              <div className="mt-4">
                <img
                  src={disease.image}
                  alt={`Image of ${disease.name}`}
                  className="mx-auto h-48 w-auto rounded-md object-cover"
                />
              </div>
            )}

            <div className="mt-6 border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-500">
                This analysis is based on the symptoms you provided and should
                not replace professional medical advice. Please consult with a
                healthcare provider for proper diagnosis and treatment.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SymptomInput;
