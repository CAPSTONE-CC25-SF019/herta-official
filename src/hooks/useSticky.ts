import { useState, useEffect, useMemo } from 'react';

interface UseStickyOptions {
  threshold?: number;
  thresholdRatio?: number;
}

export const useSticky = ({ 
  threshold, 
  thresholdRatio = 1 
}: UseStickyOptions = {}) => {
  const [isSticky, setIsSticky] = useState(false);
  
  const actualThreshold = useMemo(() => {
    return threshold ?? window.innerHeight * thresholdRatio;
  }, [threshold, thresholdRatio]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    
    const handleScroll = () => {
      if (timeoutId) return;
      
      timeoutId = setTimeout(() => {
        setIsSticky(window.scrollY > actualThreshold);
        timeoutId = null;
      }, 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    handleScroll();
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [actualThreshold]);

  return isSticky;
};