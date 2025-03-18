import React from "react";

interface InputTextArea
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  id: string;
  label?: string;
  labelRequired?: boolean;
}

export default function InputTextArea({
  className = "",
  id,
  label,
  labelRequired = false,
  ...props
}: InputTextArea) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}>
        {label}{" "}
        {labelRequired && <span className="text-sm text-red-600">*</span>}{" "}
      </label>
      <textarea
        name={id}
        id={id}
        className={`outline-app-100 h-40 resize-y rounded-md border-[1px] border-black/20 px-4 py-2 transition-all focus:outline-1 ${className}`}
        {...props}
      ></textarea>
    </div>
  );
}
