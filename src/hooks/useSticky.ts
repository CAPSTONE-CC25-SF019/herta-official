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

  useEffect(() => {
    const actualThreshold =
      threshold !== undefined ? threshold : window.innerHeight * thresholdRatio;

    const buffer = 50;

    const handleScroll = () => {
      if (scrollTimeout.current) {
        window.cancelAnimationFrame(scrollTimeout.current);
      }

      scrollTimeout.current = window.requestAnimationFrame(() => {
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
      });
      let scrollTimer: number | null = null;
      const header = document.querySelector("header");

      const onScroll = () => {
        if (header) {
          header.classList.add("no-scroll-animation");

          if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
          }

          scrollTimer = setTimeout(() => {
            header.classList.remove("no-scroll-animation");
          }, 150) as unknown as number;
        }
      };

      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", onScroll);
        if (scrollTimer !== null) {
          clearTimeout(scrollTimer);
        }
      };
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (scrollTimeout.current) {
        window.cancelAnimationFrame(scrollTimeout.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold, thresholdRatio]);

  return isSticky;
};
