import { cn } from "@/lib/utils";
import { AgentType, AGENT_CONFIG } from "./AgentConfig";

interface CircularProgressProps {
  progress: number; // 0-100
  agentType: AgentType;
  size?: "sm" | "md" | "lg";
  showPercentage?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: { svgSize: 64, strokeWidth: 4, fontSize: "text-sm" },
  md: { svgSize: 96, strokeWidth: 6, fontSize: "text-lg" },
  lg: { svgSize: 128, strokeWidth: 8, fontSize: "text-2xl" },
};

export function CircularProgress({
  progress,
  agentType,
  size = "lg",
  showPercentage = true,
  className,
}: CircularProgressProps) {
  const config = AGENT_CONFIG[agentType];
  const { svgSize, strokeWidth, fontSize } = sizeConfig[size];

  const radius = (svgSize - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      {/* Background glow effect */}
      <div
        className="absolute inset-0 rounded-full opacity-20 blur-xl"
        style={{
          background: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
        }}
      />

      <svg
        width={svgSize}
        height={svgSize}
        className="transform -rotate-90 relative z-10"
      >
        {/* Background circle */}
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-white/10"
        />

        {/* Progress circle with gradient */}
        <defs>
          <linearGradient id={`gradient-${agentType}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={config.gradientFrom} />
            <stop offset="100%" stopColor={config.gradientTo} />
          </linearGradient>
        </defs>
        <circle
          cx={svgSize / 2}
          cy={svgSize / 2}
          r={radius}
          fill="none"
          stroke={`url(#gradient-${agentType})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
          style={{
            filter: `drop-shadow(0 0 8px ${config.gradientFrom}40)`,
          }}
        />
      </svg>

      {/* Center content */}
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <span
            className={cn(
              fontSize,
              "font-bold bg-clip-text text-transparent"
            )}
            style={{
              backgroundImage: `linear-gradient(135deg, ${config.gradientFrom}, ${config.gradientTo})`,
            }}
          >
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
}
