import React from "react";
import { ButtonVariant } from "../../../types";
import { Link, LinkProps } from "react-router-dom";
import { HashLink, HashLinkProps } from "react-router-hash-link";

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

type ButtonPropsAsHashLink = ButtonPropsBase &
  HashLinkProps & {
    type: "hashlink";
    to: string;
    smooth?: boolean;
  };

type PropsButton = ButtonPropsAsButton | ButtonPropsAsLink | ButtonPropsAsHashLink;

export default function Button({
  type = "button",
  variant = "primary",
  children,
  className = "",
  ...props
}: PropsButton) {
  let styles =
    "w-fit cursor-pointer rounded-md px-5 py-2 text-base disabled:cursor-progress disabled:brightness-80";
  
  let color = "bg-gradient-to-tr from-herta-300 to-herta-400 text-white";
  if (variant === "none") color = styles = "";
  if (variant === "primary")
    color = "bg-gradient-to-tr from-herta-300 to-herta-400 text-white";
  if (variant === "secondary") color = "bg-zinc-200 text-black/80 shadow-sm";

  if (type === "hashlink") {
    return (
      <HashLink
        {...(props as HashLinkProps)}
        className={`${styles} ${color} ${className} inline-block`}
      >
        {children}
      </HashLink>
    );
  }

  if (type === "link") {
    return (
      <Link
        {...(props as LinkProps)}
        className={`${styles} ${color} ${className} block`}
      >
        {children}
      </Link>
    );
  }
  
  return (
    <button
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      className={`${styles} ${color} ${className}`}
    >
      {children}
    </button>
  );
}