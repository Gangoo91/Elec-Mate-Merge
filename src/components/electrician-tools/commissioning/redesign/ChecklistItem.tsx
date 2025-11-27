import { useState } from "react";
import { CheckCircle2, Circle, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChecklistItemProps {
  item: string;
  requirement: string;
  reference?: string;
  onToggle?: (checked: boolean) => void;
}

export const ChecklistItem = ({ 
  item, 
  requirement, 
  reference,
  onToggle 
}: ChecklistItemProps) => {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onToggle?.(newChecked);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "w-full text-left p-4 rounded-lg border transition-all touch-manipulation",
        "hover:border-elec-yellow/40 active:scale-[0.99]",
        checked 
          ? "bg-elec-yellow/10 border-elec-yellow/40" 
          : "bg-elec-dark/40 border-elec-yellow/20"
      )}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox Circle */}
        <div className={cn(
          "shrink-0 mt-0.5",
          checked ? "text-elec-yellow" : "text-white/40"
        )}>
          {checked ? (
            <CheckCircle2 className="h-6 w-6" />
          ) : (
            <Circle className="h-6 w-6" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-1.5">
          <div className={cn(
            "text-base font-semibold",
            checked ? "text-white/70 line-through" : "text-white"
          )}>
            {item}
          </div>
          <div className={cn(
            "text-sm leading-relaxed",
            checked ? "text-white/50 line-through" : "text-white/90"
          )}>
            {requirement}
          </div>
          {reference && (
            <div className="flex items-center gap-1.5 text-xs text-elec-yellow/80 mt-2">
              <BookOpen className="h-3 w-3" />
              {reference}
            </div>
          )}
        </div>

        {/* Done Badge */}
        {checked && (
          <div className="shrink-0 bg-elec-yellow/20 text-elec-yellow px-3 py-1 rounded-full text-xs font-semibold">
            Complete
          </div>
        )}
      </div>
    </button>
  );
};
