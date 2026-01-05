import { cn } from '@/lib/utils';

interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  status?: 'success' | 'syncing' | 'warning' | 'error';
  children?: React.ReactNode;
  className?: string;
}

export const ProgressRing = ({
  progress,
  size = 120,
  strokeWidth = 8,
  status = 'syncing',
  children,
  className,
}: ProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  const statusColors = {
    success: 'stroke-green-500',
    syncing: 'stroke-blue-500',
    warning: 'stroke-amber-500',
    error: 'stroke-red-500',
  };

  const bgColors = {
    success: 'stroke-green-500/20',
    syncing: 'stroke-blue-500/20',
    warning: 'stroke-amber-500/20',
    error: 'stroke-red-500/20',
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          className={bgColors[status]}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn(
            statusColors[status],
            'transition-all duration-500 ease-out',
            status === 'syncing' && 'animate-pulse'
          )}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};
