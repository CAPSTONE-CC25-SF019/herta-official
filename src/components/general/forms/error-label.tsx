export default function ErrorLabel({ error }: { error: string }) {
  return <span className="text-base text-red-600">{error}</span>;
}
