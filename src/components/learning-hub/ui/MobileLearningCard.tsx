import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileLearningCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

const variantStyles = {
  default: 'border-muted',
  success: 'border-green-500/20 bg-green-500/5',
  warning: 'border-yellow-500/20 bg-yellow-500/5',
  error: 'border-red-500/20 bg-red-500/5',
  info: 'border-blue-500/20 bg-blue-500/5',
};

export const MobileLearningCard: React.FC<MobileLearningCardProps> = ({
  title,
  icon,
  children,
  collapsible = false,
  defaultOpen = true,
  variant = 'default',
  className,
}) => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // On mobile and collapsible, use accordion-style
  if (collapsible && isMobile) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <Card className={cn(
          'touch-manipulation transition-all duration-200',
          variantStyles[variant],
          className
        )}>
          <CollapsibleTrigger className="w-full">
            <CardHeader className="flex flex-row items-center justify-between py-3 px-4 space-y-0">
              <div className="flex items-center gap-2">
                {icon && <div className="flex-shrink-0">{icon}</div>}
                <CardTitle className="text-sm sm:text-base text-left">{title}</CardTitle>
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200 flex-shrink-0 ml-2',
                  isOpen && 'rotate-180'
                )}
              />
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="px-4 pb-4 pt-0">
              {children}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    );
  }

  // Standard card for desktop or non-collapsible
  return (
    <Card className={cn(variantStyles[variant], className)}>
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex items-center gap-2">
          {icon && <div className="flex-shrink-0">{icon}</div>}
          <CardTitle className="text-sm sm:text-base md:text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0">{children}</CardContent>
    </Card>
  );
};
