import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ColorVariant = "blue" | "green" | "orange" | "purple" | "pink" | "yellow" | "emerald" | "rose";

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
  sublabel?: string;
  color?: ColorVariant;
  className?: string;
}

const colorConfig: Record<ColorVariant, { bg: string; iconBg: string; text: string }> = {
  blue: {
    bg: "bg-blue-500/10",
    iconBg: "bg-blue-500/20",
    text: "text-blue-400",
  },
  green: {
    bg: "bg-green-500/10",
    iconBg: "bg-green-500/20",
    text: "text-green-400",
  },
  orange: {
    bg: "bg-orange-500/10",
    iconBg: "bg-orange-500/20",
    text: "text-orange-400",
  },
  purple: {
    bg: "bg-purple-500/10",
    iconBg: "bg-purple-500/20",
    text: "text-purple-400",
  },
  pink: {
    bg: "bg-pink-500/10",
    iconBg: "bg-pink-500/20",
    text: "text-pink-400",
  },
  yellow: {
    bg: "bg-yellow-500/10",
    iconBg: "bg-yellow-500/20",
    text: "text-yellow-400",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    iconBg: "bg-emerald-500/20",
    text: "text-emerald-400",
  },
  rose: {
    bg: "bg-rose-500/10",
    iconBg: "bg-rose-500/20",
    text: "text-rose-400",
  },
};

const StatCard = ({
  icon: Icon,
  value,
  label,
  sublabel,
  color = "blue",
  className,
}: StatCardProps) => {
  const colors = colorConfig[color];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl p-3 sm:p-4",
        "border border-white/10",
        colors.bg,
        className
      )}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={cn("flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center", colors.iconBg)}>
          <Icon className={cn("h-5 w-5", colors.text)} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className={cn("text-xl sm:text-2xl font-black", colors.text)}>{value}</p>
          <p className="text-xs sm:text-sm text-white/70 font-medium truncate">{label}</p>
          {sublabel && (
            <p className="text-[10px] sm:text-xs text-white mt-0.5">{sublabel}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
