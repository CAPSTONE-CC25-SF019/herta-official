import CardHistory from "../../components/general/history/card-history";

export default function HistoryPage() {
  return (
    <section className="mx-auto w-full max-w-[1200px] p-4">
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">History</h1>
      <div className="grid w-full grid-cols-2 gap-2 xl:grid-cols-3">
        <CardHistory name="Title" tags={["Stroke", "Fever"]} />
        <CardHistory name="Title" tags={["Stroke", "Fever"]} />
        <CardHistory name="Title" tags={["Stroke", "Fever"]} />
        <CardHistory name="Title" tags={["Stroke", "Fever"]} />
      </div>
    </section>
  );
}
