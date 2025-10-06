import { Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface PulsatingLightbulbProps {
  size?: "sm" | "md" | "lg";
  state?: "thinking" | "active" | "complete";
  className?: string;
}

export const PulsatingLightbulb = ({
  size = "md",
  state = "active",
  className
}: PulsatingLightbulbProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12"
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };

  const stateStyles = {
    thinking: {
      bg: "bg-elec-yellow/20",
      border: "border-elec-yellow/40",
      icon: "text-elec-yellow",
      animation: "animate-pulse"
    },
    active: {
      bg: "bg-elec-yellow/30",
      border: "border-elec-yellow/60",
      icon: "text-elec-yellow",
      animation: "animate-lightbulb-pulse"
    },
    complete: {
      bg: "bg-green-500/20",
      border: "border-green-500/40",
      icon: "text-green-400",
      animation: ""
    }
  };

  const currentState = stateStyles[state];

  return (
    <div className={cn("relative", className)}>
      {/* Glow effect for active state */}
      {state === "active" && (
        <div className="absolute inset-0 bg-elec-yellow/30 rounded-xl blur-xl animate-pulse" />
      )}
      
      {/* Lightbulb container */}
      <div
        className={cn(
          "relative rounded-xl border flex items-center justify-center transition-all duration-300",
          sizeClasses[size],
          currentState.bg,
          currentState.border,
          currentState.animation
        )}
      >
        <Lightbulb className={cn(iconSizes[size], currentState.icon)} />
      </div>
    </div>
  );
};
