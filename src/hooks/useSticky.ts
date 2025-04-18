import { useState, useEffect, useRef } from "react";

interface UseStickyOptions {
  threshold?: number;
  thresholdRatio?: number;
}

export const useSticky = ({
  threshold,
  thresholdRatio = 1,
}: UseStickyOptions = {}) => {
  const [isSticky, setIsSticky] = useState(false);
  const scrollTimeout = useRef<number | null>(null);
  const lastSetValue = useRef<boolean>(false);
  const scrollTimer = useRef<number | null>(null);

  useEffect(() => {
    const actualThreshold =
      threshold !== undefined ? threshold : window.innerHeight * thresholdRatio;
    const buffer = 50;

    const handleScroll = () => {
      if (scrollTimeout.current) {
        cancelAnimationFrame(scrollTimeout.current);
      }

      scrollTimeout.current = requestAnimationFrame(() => {
        const shouldBeSticky = window.scrollY > actualThreshold;

        if (shouldBeSticky !== lastSetValue.current) {
          if (
            (shouldBeSticky && window.scrollY > actualThreshold + buffer) ||
            (!shouldBeSticky && window.scrollY < actualThreshold - buffer)
          ) {
            setIsSticky(shouldBeSticky);
            lastSetValue.current = shouldBeSticky;
          }
        }

        const header = document.querySelector("header");
        if (header) {
          header.classList.add("no-scroll-animation");

          if (scrollTimer.current) {
            clearTimeout(scrollTimer.current);
          }

          scrollTimer.current = window.setTimeout(() => {
            header.classList.remove("no-scroll-animation");
          }, 150);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (scrollTimeout.current) {
        cancelAnimationFrame(scrollTimeout.current);
      }
      if (scrollTimer.current) {
        clearTimeout(scrollTimer.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold, thresholdRatio]);

  return isSticky;
};