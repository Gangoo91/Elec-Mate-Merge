
import { ReactNode } from "react";

interface StatusIndicatorProps {
  isActive: boolean;
  activeIcon?: ReactNode;
  text: string;
  className?: string;
}

const StatusIndicator = ({ isActive, activeIcon, text, className }: StatusIndicatorProps) => {
  if (!isActive) return null;
  
  return (
    <span className={`text-xs bg-amber-950/30 px-2 py-1 rounded-full flex items-center gap-1 ${className}`}>
      {activeIcon}
      <span className="text-amber-500">{text}</span>
    </span>
  );
};

export default StatusIndicator;
