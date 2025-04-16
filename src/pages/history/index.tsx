import { useContext, useEffect, useState } from "react";
import CardHistory from "../../components/general/history/card-history";
import axiosClient from "../../libs/axios-client";
import Navbar from "../../components/ui/navbar";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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

const nav = [
  {
    name: "Home",
    link: "/#home",
  },
  {
    name: "Analytic",
    link: "/health-analytic",
  },
  {
    name: "History",
    link: "/history",
  },
];

export default function HistoryPage() {
  const { token } = useContext(AuthContext) ?? {};
  const navigate = useNavigate();

  const [histories, setHistories] = useState<DiagnoseHistory[]>([]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const getData = async () => {
      const response = await axiosClient.get(
        "/api/v1/diagnoses/self/relationship/users",
      );

      setHistories(response.data.data);
    };

    if (token) {
      getData();
    }
  }, [token]);
  console.log(histories);

  return (
    <>
      <Navbar srcLogo="/src/assets/images/logo.png" navItem={nav} stickyThreshold={-100} />
      <section className="mx-auto w-full max-w-[1200px] p-4">
        <h1 className="mb-4 text-2xl font-semibold tracking-tight">History</h1>
        <div className="grid w-full grid-cols-2 gap-2 xl:grid-cols-3">
        {histories.map((history: DiagnoseHistory, index) => (
          <CardHistory
            key={index}
            name={history.disease.name}
            tags={history.symptoms.map((s) => s.symptom.name)}
          />
        ))}
        </div>
      </section>
    </>
  );
}
