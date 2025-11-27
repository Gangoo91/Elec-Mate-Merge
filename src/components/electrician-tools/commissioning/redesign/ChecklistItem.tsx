import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
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
        "w-full text-left p-5 rounded-xl border-2 transition-all touch-manipulation",
        "hover:scale-[1.02] active:scale-[0.98]",
        checked 
          ? "bg-green-500/10 border-green-500/50" 
          : "bg-background/40 border-border/40 hover:border-border/60"
      )}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox Circle */}
        <div className={cn(
          "shrink-0 mt-1",
          checked ? "text-green-400" : "text-muted-foreground"
        )}>
          {checked ? (
            <CheckCircle2 className="h-8 w-8" />
          ) : (
            <Circle className="h-8 w-8" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className={cn(
            "text-base font-semibold",
            checked ? "text-white line-through" : "text-white"
          )}>
            {item}
          </div>
          <div className={cn(
            "text-sm",
            checked ? "text-muted-foreground line-through" : "text-white/90"
          )}>
            {requirement}
          </div>
          {reference && (
            <div className="text-sm text-purple-400">
              📖 {reference}
            </div>
          )}
        </div>

        {/* Done Badge */}
        {checked && (
          <div className="shrink-0 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
            ✓ Done
          </div>
        )}
      </div>
    </button>
  );
};
