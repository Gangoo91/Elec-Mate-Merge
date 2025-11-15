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
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--elec-yellow))" />
            <stop offset="50%" stopColor="rgb(236, 72, 153)" />
            <stop offset="100%" stopColor="rgb(249, 115, 22)" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
          filter="url(#glow)"
        />
        
        {/* Floating particles */}
        {[...Array(3)].map((_, i) => {
          const angle = (animatedProgress / 100) * Math.PI * 2 + i * 2;
          const particleCx = size / 2 + Math.cos(angle) * (radius + 8);
          const particleCy = size / 2 + Math.sin(angle) * (radius + 8);
          
          return (
            <circle
              key={i}
              cx={particleCx}
              cy={particleCy}
              r="2"
              fill="hsl(var(--elec-yellow))"
              opacity={0.6}
              className="animate-float"
              style={{
                animationDelay: `${i * 0.3}s`
              }}
            />
          );
        })}
      </svg>
      
      {/* Center content */}
      {showPercentage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-black bg-gradient-to-br from-elec-yellow via-pink-500 to-orange-500 bg-clip-text text-transparent">
            {displayProgress}%
          </div>
          <div className="text-xs text-muted-foreground mt-1">Complete</div>
        </div>
      )}
    </div>
  );
};
