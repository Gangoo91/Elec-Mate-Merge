import { ReactNode } from 'react';

interface StatusIndicatorProps {
  isActive: boolean;
  activeIcon?: ReactNode;
  text: string;
  className?: string;
}

const StatusIndicator = ({ isActive, activeIcon, text, className }: StatusIndicatorProps) => {
  if (!isActive) return null;

  return (
    <span
      className={`text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] flex items-center gap-1 ${className}`}
    >
      {activeIcon}
      <span>{text}</span>
    </span>
  );
};

export default StatusIndicator;
