import React from "react";
import { Link } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Button from "./particles/button";
import MobileNavBar from "./mobile/mobile-navbar";
import { useSticky } from "../../hooks/useSticky";
import { useMobileMenu } from "../../hooks/useMobileMenu";

interface NavItem {
  id?: number;
  name: string;
  link: string;
}

interface NavbarProps {
  srcLogo: string;
  navItem: NavItem[];
  className?: string;
  stickyThreshold?: number;
}

const Navbar: React.FC<NavbarProps> = ({
  srcLogo,
  navItem,
  className = "",
  stickyThreshold,
}) => {
  const isSticky = useSticky({
    threshold: stickyThreshold,
    thresholdRatio: 1,
  });

  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();

  const headerClasses = `w-full sticky z-50 transition-all duration-500 ease-in-out ${
    isSticky ? "top-1 flex justify-center" : "top-0"
  } ${className}`;

  const navClasses = `transition-all border-b-[1px] border-zinc-200 duration-500 ease-in-out ${
    isSticky
      ? "bg-white rounded-lg m-5 max-w-[800px] w-full shadow-sm h-18"
      : "bg-herta-100 h-22"
  } flex items-center justify-between px-8 py-4`;

  return (
    <header className={headerClasses}>
      <nav className={navClasses}>
        <div className="mx-auto flex w-full max-w-[1200px]">
          <div className="flex flex-grow items-center">
            <Link to="/" className="flex-shrink-0">
              <img src={srcLogo} alt="Logo" className="mr-6" />
            </Link>

            <ul className="ml-6 flex space-x-6 max-md:hidden">
              <li>
                <Button
                  variant="none"
                  type="hashlink"
                  to="#home"
                  smooth={true}
                  className="text-herta-500 !p-0 hover:underline"
                >
                  Home
                </Button>
              </li>
              <li>
                <Link to="/" className="text-herta-500 hover:underline">
                  Check Disease
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-end">
            <Button type="link" to="/login" className="max-md:hidden">
              Sign In
            </Button>

            <button
              className="rounded-full p-2 hover:bg-black/10 md:hidden"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              <Bars3Icon className="size-6" />
            </button>
            <MobileNavBar isOpen={isOpen} onClose={closeMenu} items={navItem} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
