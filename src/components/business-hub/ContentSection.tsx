import { useState, ReactNode } from "react";
import { ChevronDown, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ColorVariant = "blue" | "green" | "orange" | "purple" | "pink" | "yellow" | "emerald" | "rose";

interface ContentSectionProps {
  title: string;
  summary?: string;
  icon: LucideIcon;
  color?: ColorVariant;
  children: ReactNode;
  defaultExpanded?: boolean;
  badge?: string;
  className?: string;
}

const colorConfig: Record<ColorVariant, { iconBg: string; iconText: string; border: string; headerBg: string }> = {
  blue: {
    iconBg: "bg-blue-500/20",
    iconText: "text-blue-400",
    border: "border-blue-500/20",
    headerBg: "bg-blue-500/5",
  },
  green: {
    iconBg: "bg-green-500/20",
    iconText: "text-green-400",
    border: "border-green-500/20",
    headerBg: "bg-green-500/5",
  },
  orange: {
    iconBg: "bg-orange-500/20",
    iconText: "text-orange-400",
    border: "border-orange-500/20",
    headerBg: "bg-orange-500/5",
  },
  purple: {
    iconBg: "bg-purple-500/20",
    iconText: "text-purple-400",
    border: "border-purple-500/20",
    headerBg: "bg-purple-500/5",
  },
  pink: {
    iconBg: "bg-pink-500/20",
    iconText: "text-pink-400",
    border: "border-pink-500/20",
    headerBg: "bg-pink-500/5",
  },
  yellow: {
    iconBg: "bg-yellow-500/20",
    iconText: "text-yellow-400",
    border: "border-yellow-500/20",
    headerBg: "bg-yellow-500/5",
  },
  emerald: {
    iconBg: "bg-emerald-500/20",
    iconText: "text-emerald-400",
    border: "border-emerald-500/20",
    headerBg: "bg-emerald-500/5",
  },
  rose: {
    iconBg: "bg-rose-500/20",
    iconText: "text-rose-400",
    border: "border-rose-500/20",
    headerBg: "bg-rose-500/5",
  },
};

const ContentSection = ({
  title,
  summary,
  icon: Icon,
  color = "blue",
  children,
  defaultExpanded = false,
  badge,
  className,
}: ContentSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const colors = colorConfig[color];

  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden",
        "border-2 transition-all duration-300",
        isExpanded ? "border-white/20" : "border-white/10",
        className
      )}
    >
      {/* Header - Always visible, clickable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full p-4 text-left transition-all duration-200",
          "touch-manipulation active:scale-[0.99]",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/50 focus-visible:ring-inset",
          colors.headerBg
        )}
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={cn("flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center", colors.iconBg)}>
            <Icon className={cn("h-5 w-5", colors.iconText)} />
          </div>

          {/* Title and Summary */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-white">{title}</h3>
              {badge && (
                <span className={cn("px-2 py-0.5 text-[10px] font-semibold rounded-full", colors.iconBg, colors.iconText)}>
                  {badge}
                </span>
              )}
            </div>
            {summary && (
              <p className="text-sm text-white mt-1 line-clamp-2">{summary}</p>
            )}
          </div>

          {/* Expand indicator */}
          <div
            className={cn(
              "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
              isExpanded ? "bg-yellow-400/20 rotate-180" : "bg-white/10"
            )}
          >
            <ChevronDown
              className={cn(
                "h-5 w-5 transition-colors",
                isExpanded ? "text-yellow-400" : "text-white/80"
              )}
            />
          </div>
        </div>
      </button>

      {/* Expandable content */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-4 pt-0 border-t border-white/10">
          <div className="pt-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
