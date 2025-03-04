
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
          ? "bg-[#2C3930] border border-[#3F4F44]" 
          : "bg-[#F6F0F0] border border-[#D5C7A3]",
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
              ? "transform translate-x-0 bg-[#3F4F44]" 
              : "transform translate-x-8 bg-[#F2E2B1]"
          )}
        >
          {theme === "dark" ? (
            <Moon 
              className="w-4 h-4 text-[#DCD7C9]" 
              strokeWidth={1.5}
            />
          ) : (
            <Sun 
              className="w-4 h-4 text-[#BDB395]" 
              strokeWidth={1.5}
            />
          )}
        </div>
      </div>
    </div>
  );
}
