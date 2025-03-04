
import { Moon, Sun, Palette } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('lavender');
    } else {
      setTheme('dark');
    }
  };

  return (
    <div
      className={cn(
        "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300",
        theme === "dark" 
          ? "bg-zinc-950 border border-zinc-800" 
          : theme === "light"
          ? "bg-white border border-zinc-200"
          : "bg-[#260050] border border-purple-800",
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
              ? "transform translate-x-0 bg-zinc-800" 
              : theme === "light"
              ? "transform translate-x-8 bg-gray-200"
              : "transform translate-x-8 bg-purple-900"
          )}
        >
          {theme === "dark" ? (
            <Moon 
              className="w-4 h-4 text-white" 
              strokeWidth={1.5}
            />
          ) : theme === "light" ? (
            <Sun 
              className="w-4 h-4 text-gray-700" 
              strokeWidth={1.5}
            />
          ) : (
            <Palette 
              className="w-4 h-4 text-purple-200" 
              strokeWidth={1.5}
            />
          )}
        </div>
      </div>
    </div>
  );
}
