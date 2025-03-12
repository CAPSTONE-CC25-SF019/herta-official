import React from "react";
import { ButtonVariant } from "../../types";
import { Link, LinkProps } from "react-router-dom";

type ButtonPropsBase = {
  variant?: ButtonVariant;
  children: React.ReactNode;
};

type ButtonPropsAsButton = ButtonPropsBase &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    type?: "button" | "submit";
  };

type ButtonPropsAsLink = ButtonPropsBase &
  LinkProps & {
    type: "link";
    to: string;
  };

type PropsButton = ButtonPropsAsButton | ButtonPropsAsLink;

export default function Button({
  type = "button",
  variant = "primary",
  children,
  className = "",
  ...props
}: PropsButton) {
  const styles =
    "w-fit cursor-pointer rounded-md px-5 py-2 text-sm disabled:cursor-progress disabled:brightness-80";
  let color = "bg-gradient-to-tr from-herta-300 to-herta-400 text-white";

  if (variant === "primary")
    color = "bg-gradient-to-tr from-herta-300 to-herta-400 text-white";
  if (variant === "secondary") color = "bg-zinc-200 text-black/80 shadow-sm";

  if (type === "link")
    return (
      <Link
        {...(props as LinkProps)}
        className={`${styles} ${color} ${className} inline-block`}
      >
        {children}
      </Link>
    );

  return (
    <button
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      className={`${styles} ${color} ${className}`}
    >
      {children}
    </button>
  );
}
