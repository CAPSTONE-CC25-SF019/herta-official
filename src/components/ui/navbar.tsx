import React from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Button from './particles/button';
import MobileNavBar from './mobile/mobile-navbar';
import { useSticky } from '../../hooks/useSticky';
import { useMobileMenu } from '../../hooks/useMobileMenu';

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
  className = '',
  stickyThreshold
}) => {
  const isSticky = useSticky({ 
    threshold: stickyThreshold,
    thresholdRatio: 1
  });
  
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu();

  const headerClasses = `w-full sticky z-50 transition-all duration-500 ease-in-out ${
    isSticky ? "top-1 flex justify-center" : "top-0"
  } ${className}`;
  
  const navClasses = `transition-all duration-500 ease-in-out ${
    isSticky ? "bg-white rounded-lg mt-5 w-3/4 shadow-md h-18" : "bg-herta-100 h-22"
  } flex items-center justify-between px-8 py-4`;

  return (
    <header className={headerClasses}>
      <nav className={navClasses}>
        <div className="flex items-center flex-grow">
          <Link to="/" className="flex-shrink-0">
            <img src={srcLogo} alt="Logo" className="max-w-18 mr-6" />
          </Link>
          
          <ul className="max-md:hidden flex space-x-6 ml-6">
            {navItem.map((item, index) => (
              <li key={item.id ?? index}>
                <Link to={item.link} className="text-herta-500 hover:underline">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-center justify-end">
          <Button type="link" to="/register" className="max-md:hidden">
            Sign In
          </Button>
          
          <Button 
            type="button"
            variant="none"
            className="md:hidden p-2 rounded-full hover:bg-zinc-300"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-label="Toggle navigation menu"
          >
            <Bars3Icon className="size-6" />
          </Button>
        </div>
      </nav>
      
      <MobileNavBar 
        isOpen={isOpen} 
        onClose={closeMenu} 
        items={navItem} 
      />
    </header>
  );
};

export default Navbar;