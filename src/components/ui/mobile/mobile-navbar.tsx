import React from "react";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "../particles/button";

interface NavItem {
  id?: number;
  name: string;
  link: string;
}

interface MobileNavMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
  isLoggedIn?: boolean;
  username?: string;
  onLogout?: (e: React.MouseEvent) => void;
  isLoggingOut?: boolean;
}

const MobileNavBar: React.FC<MobileNavMenuProps> = ({
  isOpen,
  onClose,
  items,
  isLoggedIn = false,
  username,
  onLogout,
  isLoggingOut = false
}) => (
  <>
    <div
      className={`w-full fixed inset-0 bg-black/50 z-20 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
      aria-hidden={!isOpen}
    />
    <div
      className={`fixed top-0 right-0 h-full w-64 max-w-sm bg-white z-30 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <button
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
        onClick={onClose}
        aria-label="Close menu"
      >
        <XMarkIcon className="size-6" />
      </button>

      <div className="flex flex-col h-full p-6 pt-16 space-y-6">
        {isLoggedIn && username && (
          <div className="flex items-center mb-4 pb-4 border-b border-gray-200">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center mr-3">
              {username.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-medium">{username}</div>
              <Link to="/profile" className="text-blue-600 text-sm" onClick={onClose}>
                View Profile
              </Link>
            </div>
          </div>
        )}

        {items.map((item, index) => (
          <Link
            key={item.id ?? index}
            to={item.link}
            className="text-blue-800 text-lg hover:underline"
            onClick={onClose}
          >
            {item.name}
          </Link>
        ))}

        {!isLoggedIn ? (
          <Button type="link" to="/register" onClick={onClose}>
            Sign In
          </Button>
        ) : onLogout && (
          <Button
            type="button" 
            onClick={(e) => {
              onLogout(e);
              // Don't close menu here - it will close after logout completes
            }}
            disabled={isLoggingOut}
            className={`mt-4 text-lg ${
              isLoggingOut ? "text-gray-400" : "text-red-500 hover:text-red-700"
            }`}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </Button>
        )}
      </div>
    </div>
  </>
);

export default MobileNavBar;