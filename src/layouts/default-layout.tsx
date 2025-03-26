import { ReactNode } from "react";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header></header>
      <main>{children}</main>
    </>
  );
}
