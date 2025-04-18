import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import Button from "./particles/button";
import MobileNavBar from "./mobile/mobile-navbar";
import { useSticky } from "../../hooks/useSticky";
import { useMobileMenu } from "../../hooks/useMobileMenu";
import { AuthContext } from "../../contexts/AuthContext";

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
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("Navbar must be used within an AuthProvider");
  }
  const { token, user, logout } = auth;
  const isLoggedIn = !!token && !!user;

  const headerClasses = `w-full sticky z-50 transition-all duration-500 ease-in-out contain-layout ${
    isSticky ? "top-1 flex justify-center" : "top-0"
  } ${className}`;
  
  const navClasses = `transition-all duration-500 ease-in-out h-[64px] ${
    isSticky
      ? "bg-white rounded-lg mt-5 w-full max-w-[800px] mx-2 shadow-md"
      : "bg-herta-100"
  } flex items-center justify-between px-8`;

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLoggingOut) return;
    
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className={headerClasses}>
      <nav className={navClasses}>
        <div className="flex flex-grow items-center">
          <Link to="/" className="flex-shrink-0">
            <img src={srcLogo} alt="Logo" className="mr-6 max-w-18" />
          </Link>
          <ul className="ml-6 flex space-x-6 max-md:hidden">
            {navItem.map((item, index) => (
              <li key={item.id ?? index}>
                <Link to={item.link} className="text-blue-800 hover:underline">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-end">
          {isLoggedIn ? (
            <div className="flex items-center max-md:hidden">
              <div className="mr-2 text-sm">{user?.username}</div>
              <Link
                to="/profile"
                className="flex items-center"
                aria-label="View profile"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                  {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
                </div>
              </Link>
              <Button
                variant="none"
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`ml-4 text-sm ${
                  isLoggingOut ? "text-gray-400" : "text-red-500 hover:text-red-700"
                }`}
              >
                <ArrowRightStartOnRectangleIcon className="w-8 mr-2" />
            </Button>
            </div>
          ) : (
            <Button type="link" to="/register" className="max-md:hidden">
              Sign In
            </Button>
          )}

          <button
            className="ml-4 rounded-full p-2 hover:bg-black/10 md:hidden"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            <Bars3Icon className="size-6" />
          </button>
        </div>
      </nav>

      <MobileNavBar
        isOpen={isOpen}
        onClose={closeMenu}
        items={navItem}
        isLoggedIn={isLoggedIn}
        username={user?.username}
        onLogout={handleLogout}
        isLoggingOut={isLoggingOut}
      />
    </header>
  );
};

export default Navbar;