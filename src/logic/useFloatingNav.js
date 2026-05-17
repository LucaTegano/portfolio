import { useState, useRef, useEffect } from "react";

export const useFloatingNav = (toggleStars) => {
  const [starsVisible, setStarsVisible] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    setTimeout(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    }, 0);

    return () => observer.disconnect();
  }, []);

  const handleToggleStars = () => {
    toggleStars();
    setStarsVisible((prev) => !prev);
  };

  return {
    starsVisible,
    isDarkMode,
    navRef,
    handleToggleStars,
  };
};
