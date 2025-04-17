import { useEffect } from "react";
import CardHistory from "../../components/general/history/card-history";
import Navbar from "../../components/ui/navbar";
import useCheckUser from "../../hooks/useCheckUser";
import useDiagnosisHistory from "../../hooks/useDiagnosisHistory";
import logo from "../../assets/images/logo.png"

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
  const { isAuthenticated } = useCheckUser();
  const { histories, isLoading, error, fetchHistory } = useDiagnosisHistory();

  useEffect(() => {
    if (isAuthenticated) {
      fetchHistory();
    }
  }, [isAuthenticated, fetchHistory]);

  return (
    <>
      <Navbar
        srcLogo={logo}
        navItem={nav}
        stickyThreshold={-100}
      />
      <section className="mx-auto w-full max-w-[1200px] p-4">
        <h1 className="mb-4 text-2xl font-semibold tracking-tight">History</h1>

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="border-herta-400 h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"></div>
            <span className="ml-2 text-gray-600">Loading history...</span>
          </div>
        )}

        {error && (
          <div className="rounded-md bg-red-100 p-4 text-red-700">{error}</div>
        )}

        {!isLoading && histories.length === 0 && (
          <div className="rounded-md bg-gray-100 p-8 text-center text-gray-600">
            No diagnosis history found. Try analyzing some symptoms first.
          </div>
        )}

        {histories.length > 0 && (
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {histories.map((history, index) => (
              <CardHistory
                key={index}
                name={history.disease.name}
                tags={history.symptoms.map((s) => s.symptom.name)}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
