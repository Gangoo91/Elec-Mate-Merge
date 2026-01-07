import { cn } from '@/lib/utils';

interface ProgressRingProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  trackColor?: string;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  showPercentage?: boolean;
  animated?: boolean;
  className?: string;
}

/**
 * ProgressRing - Animated circular progress indicator
 *
 * Used for:
 * - Portfolio completion percentage
 * - OTJ hours progress
 * - KSB category completion
 */
export function ProgressRing({
  percentage,
  size = 'md',
  color = '#FACC15', // elec-yellow
  trackColor = 'rgba(255,255,255,0.1)',
  strokeWidth,
  label,
  sublabel,
  showPercentage = true,
  animated = true,
  className,
}: ProgressRingProps) {
  const sizeConfig = {
    sm: { diameter: 60, stroke: 4, fontSize: 'text-sm', labelSize: 'text-[10px]' },
    md: { diameter: 80, stroke: 5, fontSize: 'text-lg', labelSize: 'text-xs' },
    lg: { diameter: 120, stroke: 6, fontSize: 'text-2xl', labelSize: 'text-sm' },
    xl: { diameter: 160, stroke: 8, fontSize: 'text-3xl', labelSize: 'text-base' },
  };

  const config = sizeConfig[size];
  const actualStrokeWidth = strokeWidth ?? config.stroke;
  const radius = (config.diameter - actualStrokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(percentage, 0), 100);
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      <svg
        width={config.diameter}
        height={config.diameter}
        className={cn("transform -rotate-90", animated && "transition-all duration-1000 ease-out")}
      >
        {/* Background Track */}
        <circle
          cx={config.diameter / 2}
          cy={config.diameter / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={actualStrokeWidth}
        />

        {/* Progress Arc */}
        <circle
          cx={config.diameter / 2}
          cy={config.diameter / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={actualStrokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animated ? offset : 0}
          className={animated ? "transition-all duration-1000 ease-out" : ""}
          style={animated ? { strokeDashoffset: offset } : undefined}
        />
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showPercentage && (
          <span className={cn("font-bold text-foreground", config.fontSize)}>
            {Math.round(progress)}%
          </span>
        )}
        {label && !showPercentage && (
          <span className={cn("font-bold text-foreground", config.fontSize)}>
            {label}
          </span>
        )}
      </div>

      {/* Label Below */}
      {(label || sublabel) && showPercentage && (
        <div className="mt-2 text-center">
          {label && (
            <p className={cn("font-medium text-foreground", config.labelSize)}>
              {label}
            </p>
          )}
          {sublabel && (
            <p className={cn("text-muted-foreground", config.labelSize)}>
              {sublabel}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

interface ProgressRingsGroupProps {
  portfolio: { current: number; target: number };
  otjHours: { current: number; target: number };
  reviews?: { pending: number; completed: number };
  className?: string;
}

/**
 * ProgressRingsGroup - Combined view of key progress metrics
 *
 * Shows:
 * - Portfolio completion ring
 * - OTJ hours ring
 * - Optional reviews count
 */
export function ProgressRingsGroup({
  portfolio,
  otjHours,
  reviews,
  className,
}: ProgressRingsGroupProps) {
  const portfolioPercent = portfolio.target > 0
    ? Math.round((portfolio.current / portfolio.target) * 100)
    : 0;

  const otjPercent = otjHours.target > 0
    ? Math.round((otjHours.current / otjHours.target) * 100)
    : 0;

  return (
    <div className={cn("flex items-center justify-center gap-6 sm:gap-10", className)}>
      {/* Portfolio Progress */}
      <ProgressRing
        percentage={portfolioPercent}
        size="lg"
        color="#22c55e" // green-500
        label="Portfolio"
        sublabel={`${portfolio.current}/${portfolio.target}`}
      />

      {/* OTJ Hours */}
      <ProgressRing
        percentage={otjPercent}
        size="lg"
        color="#a855f7" // purple-500
        label="OTJ Hours"
        sublabel={`${otjHours.current}h / ${otjHours.target}h`}
      />

      {/* Reviews (if provided) */}
      {reviews && (
        <div className="flex flex-col items-center">
          <div className="h-[120px] w-[120px] rounded-full bg-blue-500/10 border-4 border-blue-500/30 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-blue-500">{reviews.pending}</span>
            <span className="text-xs text-muted-foreground">Pending</span>
          </div>
          <div className="mt-2 text-center">
            <p className="text-sm font-medium text-foreground">Reviews</p>
            <p className="text-xs text-muted-foreground">{reviews.completed} completed</p>
          </div>
        </div>
      )}
    </div>
  );
}

interface MiniProgressRingProps {
  percentage: number;
  color?: string;
  size?: number;
  className?: string;
}

/**
 * MiniProgressRing - Compact progress indicator for lists/cards
 */
export function MiniProgressRing({
  percentage,
  color = '#FACC15',
  size = 32,
  className,
}: MiniProgressRingProps) {
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(Math.max(percentage, 0), 100);
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <span className="absolute text-[10px] font-semibold text-foreground">
        {Math.round(progress)}
      </span>
    </div>
  );
}

export default ProgressRing;
