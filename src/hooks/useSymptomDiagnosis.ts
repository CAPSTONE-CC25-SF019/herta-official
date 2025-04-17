import { useState, useEffect, useRef } from "react";
import axiosClient from "../libs/axios-client";

interface Symptom {
  id: string;
  name: string;
  description: string | null;
}

interface Disease {
  id: string;
  name: string;
  image: string | null;
  description: string | null;
  symptoms: Array<{ symptom: Symptom }>;
}

interface DiagnosisResponse {
  title: string;
  data: Array<{
    id: string;
    confidence: number;
    diseaseId: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    symptoms: Array<{
      diagnosisId: string;
      symptomId: string;
      symptom: Symptom;
    }>;
  }>;
  status: number;
  code: string;
}

interface DiseaseResponse {
  title: string;
  data: Disease;
  status: number;
  code: string;
}

const useSymptomDiagnosis = (symptomsList: string[]) => {
  const [input, setInput] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disease, setDisease] = useState<Disease | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDisease(null);
    setConfidence(null);
    setError(null);
  }, [selectedItems]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = symptomsList.filter(
        (item) =>
          item.toLowerCase().includes(value.toLowerCase()) &&
          !selectedItems.includes(item),
      );
      setSuggestions(filtered);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!selectedItems.includes(suggestion)) {
      setSelectedItems([...selectedItems, suggestion]);
      setInput("");
      setSuggestions([]);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const handleRemoveItem = (item: string) => {
    setSelectedItems(
      selectedItems.filter((selectedItem) => selectedItem !== item),
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim() !== "" && suggestions.length > 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[0]);
    }
  };

  const handleCheck = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setDisease(null);

      const symptomNames = selectedItems.map((item) => item.toLowerCase());

      const diagnosisResponse = await axiosClient.post<DiagnosisResponse>(
        "/api/v1/diagnoses",
        { symptomNames },
      );

      if (
        diagnosisResponse.data.status === 201 &&
        diagnosisResponse.data.data.length > 0
      ) {
        const diagnosisResult = diagnosisResponse.data.data[0];
        setConfidence(diagnosisResult.confidence);

        const diseaseResponse = await axiosClient.get<DiseaseResponse>(
          `/api/v1/diseases/${diagnosisResult.diseaseId}`,
        );

        if (diseaseResponse.data.status === 200) {
          setDisease(diseaseResponse.data.data);
        }
      }
    } catch (err) {
      console.error("Diagnosis error:", err);
      setError(
        "An error occurred while processing your symptoms. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
  };
};

export default useSymptomDiagnosis;