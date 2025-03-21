import React from 'react';
import { Link } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from '../particles/button';

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
  items 
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
      aria-label="Navigation Bar"
    >
      <button 
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
        onClick={onClose}
        aria-label="Close Bar"
      >
        <XMarkIcon className="size-6" />
      </button>
      
      <div className="flex flex-col h-full p-6 pt-16 space-y-6">
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
        <Button type="link" to="/register">Sign In</Button>
      </div>
    </div>
  </>
);

export default MobileNavBar;