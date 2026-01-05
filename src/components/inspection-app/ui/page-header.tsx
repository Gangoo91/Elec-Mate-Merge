import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  backPath?: string;
  onBack?: () => void;
  actions?: React.ReactNode;
  sticky?: boolean;
}

export const PageHeader = ({
  title,
  subtitle,
  icon: Icon,
  backPath,
  onBack,
  actions,
  sticky = true,
}: PageHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={cn(
      "border-b border-border bg-card/50 backdrop-blur-sm",
      sticky && "sticky top-0 z-10"
    )}>
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 sm:py-4">
        {/* Row 1: Back Button + Title */}
        <div className="flex items-center gap-3 mb-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="text-neutral-400 hover:text-foreground flex-shrink-0 h-10 w-10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            {Icon && <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow flex-shrink-0" />}
            <h1 className="text-lg sm:text-2xl font-bold text-foreground">
              {title}
            </h1>
          </div>
        </div>

        {/* Row 2: Actions */}
        {actions && (
          <div className="flex items-center gap-2 pl-0 sm:pl-[52px]">
            {actions}
          </div>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p className="text-sm text-neutral-400 mt-2 pl-[52px] hidden sm:block">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
