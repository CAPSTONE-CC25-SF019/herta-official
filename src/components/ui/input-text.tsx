import React from "react";

interface InputText extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelRequired?: boolean;
  id: string;
}

export default function InputText({
  label,
  labelRequired,
  id,
  ...props
}: InputText) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm" htmlFor={id}>
          {label} {labelRequired && <span className="text-red-600">*</span>}
        </label>
      )}
      <input
        id={id}
        {...props}
        className="focus:ring-herta-300 focus:outline-herta-200 rounded-md border-[1px] border-zinc-200 px-3 py-2 text-sm focus:ring-2 focus:outline-1"
      />
    </div>
  );
}
