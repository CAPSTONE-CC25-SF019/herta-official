import React from "react";

export default function ErrorLabel({ error }: { error: string }) {
  return <span className="text-sm text-red-600">{error}</span>;
}
