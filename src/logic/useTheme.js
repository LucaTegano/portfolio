import { useEffect, useState } from "react";

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for user's OS preference first for a better initial experience
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const storedTheme = localStorage.getItem("theme");

    setTimeout(() => {
      if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      } else {
        // Set light theme if no preference or storage is found
        localStorage.setItem("theme", "light");
        setIsDarkMode(false);
        document.documentElement.classList.remove("dark");
      }
    }, 0);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newIsDarkMode = !prev;
      if (newIsDarkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newIsDarkMode;
    });
  };

  return {
    isDarkMode,
    toggleTheme,
  };
};
