import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SettingsSectionProps {
  title: string;
  icon?: LucideIcon;
  iconBg?: string;
  iconColour?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  icon: Icon,
  iconBg = 'bg-elec-yellow/10',
  iconColour = 'text-elec-yellow',
  description,
  children,
  className,
  headerClassName,
}) => {
  return (
    <div className={cn(
      "rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden",
      className
    )}>
      {/* Section Header */}
      <div className={cn(
        "px-4 md:px-6 py-4 border-b border-white/10",
        headerClassName
      )}>
        <div className="flex items-center gap-3">
          {Icon && (
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
              iconBg
            )}>
              <Icon className={cn("h-5 w-5", iconColour)} />
            </div>
          )}
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Section Content */}
      <div className="p-4 md:p-6 space-y-3">
        {children}
      </div>
    </div>
  );
};

export default SettingsSection;
