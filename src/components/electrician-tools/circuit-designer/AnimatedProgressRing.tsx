import { useEffect, useState } from 'react';
import { animateValue } from '@/utils/animation-helpers';

interface AnimatedProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  showPercentage?: boolean;
  className?: string;
}

export const AnimatedProgressRing = ({
  progress,
  size = 160,
  strokeWidth = 12,
  showPercentage = true,
  className = ''
}: AnimatedProgressRingProps) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedProgress / 100) * circumference;
  
  useEffect(() => {
    // Animate the progress value
    const cleanup = animateValue(
      animatedProgress,
      progress,
      800,
      (value) => {
        setAnimatedProgress(value);
        setDisplayProgress(Math.round(value));
      }
    );
    
    return cleanup;
  }, [progress]);
  
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          opacity={0.2}
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--elec-yellow))"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      
      {/* Center content */}
      {showPercentage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold">
            {displayProgress}%
          </div>
          <div className="text-xs text-muted-foreground mt-1">Complete</div>
        </div>
      )}
    </div>
  );
};
