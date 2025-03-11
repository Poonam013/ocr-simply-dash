
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div
      className={cn(
        "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300",
        theme === "dark" 
          ? "bg-[#1E3A5F] border border-[#2A4365]" 
          : "bg-[#EBF8FF] border border-[#90CDF4]",
        className
      )}
      onClick={toggleTheme}
      role="button"
      tabIndex={0}
    >
      <div className="flex justify-between items-center w-full">
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            theme === "dark" 
              ? "transform translate-x-0 bg-[#2A4365]" 
              : "transform translate-x-8 bg-[#4299E1]"
          )}
        >
          {theme === "dark" ? (
            <Moon 
              className="w-4 h-4 text-[#90CDF4]" 
              strokeWidth={1.5}
            />
          ) : (
            <Sun 
              className="w-4 h-4 text-[#FFFFFF]" 
              strokeWidth={1.5}
            />
          )}
        </div>
      </div>
    </div>
  );
}
