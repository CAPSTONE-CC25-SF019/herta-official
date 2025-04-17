import { useState, useCallback } from "react";
import axiosClient from "../libs/axios-client";

interface SymptomDetail {
  id: string;
  name: string;
  description: string | null;
}

interface SymptomWrapper {
  symptom: SymptomDetail;
}

interface Disease {
  id: string;
  name: string;
  image: string | null;
  description: string | null;
  symptoms: SymptomWrapper[];
}

interface DiagnoseHistory {
  id: string;
  confidence: number;
  diseaseId: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: null;
  symptoms: SymptomWrapper[];
  disease: Disease;
}

const useDiagnosisHistory = () => {
  const [histories, setHistories] = useState<DiagnoseHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axiosClient.get<{ data: DiagnoseHistory[] }>(
        "/api/v1/diagnoses/self/relationship/users"
      );
      setHistories(response.data.data);
    } catch (err) {
      console.error("Error fetching history:", err);
      setError("Failed to load history. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    histories,
    isLoading,
    error,
    fetchHistory
  };
};

export default useDiagnosisHistory;