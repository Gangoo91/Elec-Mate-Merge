import { cn } from "@/lib/utils";

interface RadialGaugeProps {
  value: number;
  max?: number;
  label?: string;
  sublabel?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'yellow' | 'green' | 'red' | 'amber';
  showPercentage?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: { width: 120, stroke: 8, fontSize: 'text-2xl', labelSize: 'text-xs' },
  md: { width: 160, stroke: 10, fontSize: 'text-3xl', labelSize: 'text-sm' },
  lg: { width: 200, stroke: 12, fontSize: 'text-4xl', labelSize: 'text-base' },
};

const colorConfig = {
  yellow: { stroke: '#FACC15', glow: 'shadow-elec-yellow/30' },
  green: { stroke: '#22C55E', glow: 'shadow-green-500/30' },
  red: { stroke: '#EF4444', glow: 'shadow-red-500/30' },
  amber: { stroke: '#F59E0B', glow: 'shadow-amber-500/30' },
};

/**
 * RadialGauge - SVG circular progress indicator
 *
 * Features:
 * - Smooth SVG arc animation
 * - Configurable size and color
 * - Center label with percentage
 * - Subtle glow effect
 */
export function RadialGauge({
  value,
  max = 100,
  label,
  sublabel,
  size = 'md',
  color = 'yellow',
  showPercentage = true,
  className,
}: RadialGaugeProps) {
  const config = sizeConfig[size];
  const colors = colorConfig[color];

  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (config.width - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Determine color based on value if not explicitly set
  const autoColor = percentage >= 80 ? 'green' : percentage >= 50 ? 'amber' : 'red';
  const finalColor = colorConfig[color === 'yellow' ? autoColor : color];

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className={cn("relative", `shadow-lg ${finalColor.glow}`, "rounded-full")}>
        <svg
          width={config.width}
          height={config.width}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={config.width / 2}
            cy={config.width / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={config.stroke}
            className="text-muted/20"
          />

          {/* Progress arc */}
          <circle
            cx={config.width / 2}
            cy={config.width / 2}
            r={radius}
            fill="none"
            stroke={finalColor.stroke}
            strokeWidth={config.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {showPercentage && (
            <span className={cn(config.fontSize, "font-bold text-foreground")}>
              {Math.round(percentage)}%
            </span>
          )}
          {label && (
            <span className={cn(config.labelSize, "font-semibold text-muted-foreground uppercase tracking-wide")}>
              {label}
            </span>
          )}
        </div>
      </div>

      {sublabel && (
        <p className="mt-3 text-sm text-muted-foreground text-center">
          {sublabel}
        </p>
      )}
    </div>
  );
}

export default RadialGauge;
