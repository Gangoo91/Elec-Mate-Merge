import { Flag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EnhancedFlagButtonProps {
  isFlagged: boolean;
  onClick: () => void;
  variant?: "desktop" | "mobile";
  className?: string;
}

export const EnhancedFlagButton = ({ 
  isFlagged, 
  onClick, 
  variant = "desktop",
  className = "" 
}: EnhancedFlagButtonProps) => {
  if (variant === "mobile") {
    return (
      <Button
        onClick={onClick}
        variant="ghost"
        size="sm"
        className={`
          relative group transition-all duration-300 hover:scale-110
          ${isFlagged 
            ? "text-elec-yellow bg-elec-yellow/10 hover:bg-elec-yellow/20" 
            : "text-muted-foreground hover:text-elec-yellow hover:bg-elec-yellow/5"
          }
          ${className}
        `}
      >
        <Flag 
          className={`
            h-4 w-4 transition-all duration-300 
            ${isFlagged ? 'fill-current animate-pulse' : 'group-hover:scale-110'}
          `} 
        />
      </Button>
    );
  }

  return (
    <Button
      onClick={onClick}
      variant={isFlagged ? "default" : "outline"}
      size="sm"
      className={`
        group relative overflow-hidden transition-all duration-300 hover:scale-105 px-4 py-2
        ${isFlagged 
          ? "bg-gradient-to-r from-elec-yellow to-elec-yellow/80 text-elec-dark border-elec-yellow shadow-lg shadow-elec-yellow/25" 
          : "border-muted/40 text-muted-foreground hover:border-elec-yellow/50 hover:text-elec-yellow hover:bg-elec-yellow/5"
        }
        ${className}
      `}
    >
      {/* Background glow effect for flagged state */}
      {isFlagged && (
        <div className="absolute inset-0 bg-gradient-to-r from-elec-yellow/20 to-transparent animate-pulse" />
      )}
      
      {/* Icon and text */}
      <div className="relative flex items-center gap-2">
        <Flag 
          className={`
            h-4 w-4 transition-all duration-300 
            ${isFlagged 
              ? 'fill-current animate-bounce' 
              : 'group-hover:scale-110 group-hover:rotate-12'
            }
          `} 
        />
        <span className="text-sm font-medium whitespace-nowrap">
          {isFlagged ? 'Flagged' : 'Flag'}
        </span>
      </div>

      {/* Hover shine effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      </div>
    </Button>
  );
};