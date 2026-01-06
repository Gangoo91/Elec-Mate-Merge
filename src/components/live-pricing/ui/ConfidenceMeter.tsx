import { cn } from "@/lib/utils";
import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";

interface ConfidenceMeterProps {
  score: number; // 0-100
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const ConfidenceMeter = ({
  score,
  showLabel = true,
  size = "md",
  className
}: ConfidenceMeterProps) => {
  const getConfidenceLevel = () => {
    if (score >= 80) return { label: "High", color: "bg-green-500", textColor: "text-green-500", icon: ShieldCheck };
    if (score >= 50) return { label: "Medium", color: "bg-yellow-500", textColor: "text-yellow-500", icon: Shield };
    return { label: "Low", color: "bg-red-500", textColor: "text-red-500", icon: ShieldAlert };
  };

  const { label, color, textColor, icon: Icon } = getConfidenceLevel();

  const sizeClasses = {
    sm: { bar: "h-1", icon: "h-3 w-3", text: "text-xs" },
    md: { bar: "h-1.5", icon: "h-4 w-4", text: "text-sm" },
    lg: { bar: "h-2", icon: "h-5 w-5", text: "text-base" }
  };

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {showLabel && (
        <div className="flex items-center justify-between">
          <div className={cn("flex items-center gap-1", textColor)}>
            <Icon className={sizeClasses[size].icon} />
            <span className={cn("font-medium", sizeClasses[size].text)}>
              {label} Confidence
            </span>
          </div>
          <span className={cn("text-white/60", sizeClasses[size].text)}>
            {score}%
          </span>
        </div>
      )}
      <div className={cn("w-full bg-white/10 rounded-full overflow-hidden", sizeClasses[size].bar)}>
        <div
          className={cn("h-full rounded-full transition-all duration-500", color)}
          style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
        />
      </div>
    </div>
  );
};

export default ConfidenceMeter;
