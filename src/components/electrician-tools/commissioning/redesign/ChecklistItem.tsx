import { useState } from "react";
import { CheckCircle2, Circle, BookOpen, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ChecklistItemProps {
  item: string;
  requirement: string;
  reference?: string;
  onToggle?: (checked: boolean, notes?: string) => void;
  initialChecked?: boolean;
  initialNotes?: string;
}

export const ChecklistItem = ({ 
  item, 
  requirement, 
  reference,
  onToggle,
  initialChecked = false,
  initialNotes = ""
}: ChecklistItemProps) => {
  const [checked, setChecked] = useState(initialChecked);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState(initialNotes);

  const handleClick = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onToggle?.(newChecked, notes);
  };

  const handleNotesChange = (value: string) => {
    setNotes(value);
    onToggle?.(checked, value);
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

        {/* Done Badge & Notes Button */}
        <div className="shrink-0 flex items-center gap-2">
          {checked && (
            <div className="bg-elec-yellow/20 text-elec-yellow px-3 py-1 rounded-full text-xs font-semibold">
              Complete
            </div>
          )}
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setShowNotes(!showNotes);
            }}
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 px-2",
              showNotes ? "text-elec-yellow" : "text-white/50"
            )}
          >
            <FileText className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Notes Section */}
      {showNotes && (
        <div className="pt-3 mt-3 border-t border-elec-yellow/20" onClick={(e) => e.stopPropagation()}>
          <label className="text-xs text-white/70 mb-2 block">Notes</label>
          <Textarea
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder="Add notes about this checkpoint..."
            className="bg-background/40 border-elec-yellow/30 text-white text-sm min-h-[80px]"
          />
        </div>
      )}
    </button>
  );
};
