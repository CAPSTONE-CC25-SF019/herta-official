import React from "react";
import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Button from "../particles/button";

interface NavItem {
  id?: number;
  name: string;
  link: string;
}

interface MobileNavBarProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
}

const MobileNavBar: React.FC<MobileNavBarProps> = ({
  isOpen,
  onClose,
  items,
}) => (
  <>
    <div
      className={`fixed inset-0 z-20 w-full bg-black/50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={onClose}
      aria-hidden={!isOpen}
    />
    <div
      className={`fixed top-0 right-0 z-30 h-full w-64 max-w-sm transform bg-white transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Bar"
    >
      <button
        className="absolute top-4 right-4 rounded-full p-2 hover:bg-gray-100"
        onClick={onClose}
        aria-label="Close Bar"
      >
        <XMarkIcon className="size-6" />
      </button>

      <div className="flex h-full flex-col space-y-6 p-6 pt-16">
        {items.map((item, index) => (
          <Link
            key={item.id ?? index}
            to={item.link}
            className="text-lg text-blue-800 hover:underline"
            onClick={onClose}
          >
            {item.name}
          </Link>
        ))}
        <Button type="link" to="/login">
          Sign In
        </Button>
      </div>
    </div>
  </>
);

export default MobileNavBar;
