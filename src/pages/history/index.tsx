import { useEffect, useState } from "react";
import CardHistory from "../../components/general/history/card-history";
import axiosClient from "../../libs/axios-client";

export default function HistoryPage() {
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axiosClient.get(
        "/api/v1/diagnoses/self/relationship/users",
      );

      setHistories(response.data.data);
    };

    getData();
  }, []);

  console.log(histories);

  return (
    <section className="mx-auto w-full max-w-[1200px] p-4">
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">History</h1>
      <div className="grid w-full grid-cols-2 gap-2 xl:grid-cols-3">
        {histories.map((history) => (
          // TODO: Change it
          <CardHistory name={history?.title} tags={["Stroke", "Fever"]} />
        ))}
      </div>
    </section>
  );
}
