//import { Moon, Sun } from "lucide-react";
import { useTheme } from "../logic/useTheme";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className={cn()} aria-label="Toggle theme">
      {/* 2. Wrap the icons in a div that will be our colored background */}
      <div className={cn()}>
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
