import { useState, useEffect, RefObject } from "react";

function useInView<T extends HTMLElement>(ref: RefObject<T>): boolean {
  const [isInViewport, setIsInViewport] = useState(false);

  const checkIsInViewport = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setIsInViewport(
        rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= window.innerHeight &&
          rect.right <= window.innerWidth,
      );
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      checkIsInViewport();
    };

    window.addEventListener("scroll", handleScroll);
    checkIsInViewport();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isInViewport;
}

export default useInView;
