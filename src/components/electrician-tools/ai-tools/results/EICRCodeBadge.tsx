import { cn } from "@/lib/utils";
import { AlertTriangle, AlertCircle, Info, HelpCircle } from "lucide-react";

type EICRCode = 'C1' | 'C2' | 'C3' | 'FI';

interface EICRCodeBadgeProps {
  code: EICRCode;
  count?: number;
  size?: 'sm' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const codeConfig: Record<EICRCode, {
  bg: string;
  border: string;
  text: string;
  label: string;
  description: string;
  icon: typeof AlertTriangle;
}> = {
  C1: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-400',
    label: 'Danger',
    description: 'Immediate action required',
    icon: AlertTriangle,
  },
  C2: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    label: 'Urgent',
    description: 'Potentially dangerous',
    icon: AlertCircle,
  },
  C3: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    label: 'Improve',
    description: 'Improvement recommended',
    icon: Info,
  },
  FI: {
    bg: 'bg-slate-500/10',
    border: 'border-slate-500/30',
    text: 'text-slate-400',
    label: 'Investigate',
    description: 'Further investigation',
    icon: HelpCircle,
  },
};

/**
 * EICRCodeBadge - Color-coded EICR classification badge
 *
 * Features:
 * - Large count display for summary grids
 * - Compact badge for inline use
 * - Semantic color coding (red/amber/blue/slate)
 * - Optional label display
 */
export function EICRCodeBadge({
  code,
  count,
  size = 'sm',
  showLabel = false,
  className,
}: EICRCodeBadgeProps) {
  const config = codeConfig[code];
  const Icon = config.icon;

  if (size === 'lg') {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-xl p-4",
          "border-2",
          config.bg,
          config.border,
          className
        )}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

        <div className="relative space-y-1">
          {/* Large count */}
          {count !== undefined && (
            <div className={cn("text-4xl sm:text-5xl font-bold", config.text)}>
              {count}
            </div>
          )}

          {/* Code label */}
          <div className={cn("text-xl font-bold", config.text)}>
            {code}
          </div>

          {/* Description */}
          {showLabel && (
            <div className="text-xs text-muted-foreground font-medium">
              {config.label}
            </div>
          )}
        </div>

        {/* Background icon */}
        <Icon className={cn(
          "absolute -right-2 -bottom-2 h-16 w-16 opacity-10",
          config.text
        )} />
      </div>
    );
  }

  // Small/inline badge
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5",
        "px-2.5 py-1 rounded-md",
        "text-sm font-bold",
        "border",
        config.bg,
        config.border,
        config.text,
        className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {code}
      {count !== undefined && (
        <span className="ml-1 opacity-80">({count})</span>
      )}
    </span>
  );
}

/**
 * EICRCodeGrid - Grid of all EICR codes with counts
 */
interface EICRCodeGridProps {
  c1Count: number;
  c2Count: number;
  c3Count: number;
  fiCount: number;
  className?: string;
}

export function EICRCodeGrid({
  c1Count,
  c2Count,
  c3Count,
  fiCount,
  className,
}: EICRCodeGridProps) {
  return (
    <div className={cn("grid grid-cols-4 gap-3", className)}>
      <EICRCodeBadge code="C1" count={c1Count} size="lg" showLabel />
      <EICRCodeBadge code="C2" count={c2Count} size="lg" showLabel />
      <EICRCodeBadge code="C3" count={c3Count} size="lg" showLabel />
      <EICRCodeBadge code="FI" count={fiCount} size="lg" showLabel />
    </div>
  );
}

export default EICRCodeBadge;
