import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChipItem {
  label: string;
  value: string;
  icon?: LucideIcon;
}

interface ScrollableChipsProps {
  items: ChipItem[];
  className?: string;
}

/**
 * ScrollableChips - Horizontal scrollable specification chips
 *
 * Features:
 * - Horizontal scroll on mobile (no wrapping)
 * - Premium glassmorphism chip styling
 * - Optional icon per chip
 * - Hide scrollbar for clean look
 */
export function ScrollableChips({ items, className }: ScrollableChipsProps) {
  if (!items || items.length === 0) return null;

  return (
    <div
      className={cn(
        "flex gap-3 overflow-x-auto pb-2",
        // Hide scrollbar but keep functionality
        "scrollbar-none",
        "-mx-1 px-1", // Prevent chip shadows from being clipped
        className
      )}
      style={{
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "flex-shrink-0",
            "px-4 py-3 rounded-xl",
            "bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5",
            "border border-elec-yellow/20",
            "backdrop-blur-sm",
            "min-w-[80px]"
          )}
        >
          <div className="flex items-center gap-2 mb-1">
            {item.icon && (
              <item.icon className="h-3.5 w-3.5 text-elec-yellow/60" />
            )}
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
              {item.label}
            </span>
          </div>
          <div className="text-lg font-bold text-elec-yellow">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ScrollableChips;
