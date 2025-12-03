import { useState, useRef, useEffect } from "react";

export const useFloatingNav = (toggleStars) => {
  const [starsVisible, setStarsVisible] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navRef = useRef(null);
  const animationFrameRef = useRef(null);

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

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleMouseMove = (event) => {
    if (!navRef.current) return;

    // Cancel previous animation frame to avoid performance issues
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const navElement = navRef.current;
      const rect = navElement.getBoundingClientRect();
      const mouseX = event.clientX;

      // Calculate mouse position relative to the nav center (-1 to 1)
      const navCenter = rect.left + rect.width / 2;
      const mouseOffset = (mouseX - navCenter) / (rect.width / 2);

      const MAX_TRANSLATE = 8; // Max pixels an icon can move

      const navItemsElements = navElement.querySelectorAll(".nav-item");

      navItemsElements.forEach((item, index) => {
        // Calculate each item's position relative to the nav center (-1 to 1)
        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.left + itemRect.width / 2;
        const itemOffset = (itemCenter - navCenter) / (rect.width / 2);

        // The formula pushes icons away from the mouse's side of the center
        const translateX =
          -mouseOffset * MAX_TRANSLATE * (1 - Math.abs(itemOffset));

        item.style.transform = `translateX(${translateX}px)`;
      });
    });
  };

  const handleNavMouseLeave = () => {
    // Also call the original mouse leave to reset the spread effect
    handleMouseLeave();

    if (!navRef.current) return;

    // Cancel any pending animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // Reset all icon positions
    const navItemsElements = navRef.current.querySelectorAll(".nav-item");
    navItemsElements.forEach((item) => {
      item.style.transform = "translateX(0px)";
    });
  };

  return {
    starsVisible,
    isDarkMode,
    hoveredIndex,
    navRef,
    handleToggleStars,
    handleMouseEnter,
    handleMouseMove,
    handleNavMouseLeave,
  };
};
