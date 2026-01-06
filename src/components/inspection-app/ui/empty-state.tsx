import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  className,
}: EmptyStateProps) => {
  return (
    <Card className={cn('border-elec-yellow/20', className)}>
      <CardContent className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div className="p-4 rounded-full bg-elec-yellow/10 mb-4">
          <Icon className="h-12 w-12 text-elec-yellow/60" />
        </div>
        
        <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
          {title}
        </h3>
        
        <p className="text-base md:text-sm text-white/70 max-w-md mb-6">
          {description}
        </p>
        
        {(action || secondaryAction) && (
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {action && (
              <Button
                onClick={action.onClick}
                variant="accent"
                size="default"
                className="w-full sm:w-auto"
              >
                {action.label}
              </Button>
            )}
            {secondaryAction && (
              <Button
                onClick={secondaryAction.onClick}
                variant="accent-outline"
                size="default"
                className="w-full sm:w-auto"
              >
                {secondaryAction.label}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
