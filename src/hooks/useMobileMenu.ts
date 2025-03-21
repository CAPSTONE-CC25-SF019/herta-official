import { useState, useCallback, useEffect } from 'react';

export const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  
  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  return {
    isOpen,
    toggleMenu,
    closeMenu
  };
};