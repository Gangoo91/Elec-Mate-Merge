import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SettingsRowProps {
  icon?: LucideIcon;
  iconBg?: string;
  iconColour?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  badge?: React.ReactNode;
  disabled?: boolean;
}

const SettingsRow: React.FC<SettingsRowProps> = ({
  icon: Icon,
  iconBg = 'bg-elec-yellow/10',
  iconColour = 'text-elec-yellow',
  title,
  description,
  children,
  onClick,
  className,
  badge,
  disabled = false,
}) => {
  const Wrapper = onClick ? 'button' : 'div';
  const wrapperProps = onClick ? {
    onClick,
    type: 'button' as const,
    disabled,
  } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg border transition-all duration-200",
        "bg-white/5 border-white/10",
        onClick && !disabled && "touch-manipulation cursor-pointer hover:bg-white/[0.08] active:bg-white/[0.12] active:scale-[0.99]",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        {Icon && (
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
            iconBg
          )}>
            <Icon className={cn("h-5 w-5", iconColour)} />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-foreground truncate">{title}</p>
            {badge}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground truncate">{description}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0 sm:ml-4">
        {children}
      </div>
    </Wrapper>
  );
};

export default SettingsRow;
