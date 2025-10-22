//import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for user's OS preference first for a better initial experience
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
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

  return (
    <button
      onClick={toggleTheme}
      className={cn(
      )}
      aria-label="Toggle theme"
    >
      {/* 2. Wrap the icons in a div that will be our colored background */}
      <div
        className={cn(
        )}
      >
        {isDarkMode ? (
          //<Sun className="h-6 w-6 text-white" />
          <i className="bi bi-brightness-high-fill text-foreground cursor-pointer"></i>
        ) : (
          //<Moon className="h-6 w-6 text-black" />
          <i className="bi bi-moon text-foreground cursor-pointer"></i>
        )}
      </div>
    </button>
  );
};