
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollableTabsList, ScrollableTabsTrigger } from '@/components/ui/scrollable-tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface MobileTabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

interface MobileTabsListProps {
  className?: string;
  children: React.ReactNode;
}

interface MobileTabsTriggerProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const MobileTabs = ({ 
  defaultValue, 
  value, 
  onValueChange, 
  className, 
  children 
}: MobileTabsProps) => {
  return (
    <Tabs 
      defaultValue={defaultValue} 
      value={value} 
      onValueChange={onValueChange}
      className={cn("w-full", className)}
    >
      {children}
    </Tabs>
  );
};

export const MobileTabsList = ({ className, children }: MobileTabsListProps) => {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <div className="relative w-full">
        <div 
          className="overflow-x-auto overflow-y-hidden scrollbar-hide pb-1"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          <TabsList 
            className={cn(
              "h-auto items-center justify-center rounded-lg bg-muted p-2 text-muted-foreground gap-2",
              "flex flex-nowrap min-w-full w-full",
              className
            )}
          >
            {children}
          </TabsList>
        </div>
        
        {/* Only show scroll indicators and hint if content overflows */}
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-muted via-muted/80 to-transparent pointer-events-none z-10 opacity-0" />
        <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-muted via-muted/80 to-transparent pointer-events-none z-10 opacity-0" />
      </div>
    );
  }
  
  return (
    <TabsList className={className}>
      {children}
    </TabsList>
  );
};

export const MobileTabsTrigger = ({ 
  value, 
  disabled, 
  className, 
  children 
}: MobileTabsTriggerProps) => {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <TabsTrigger 
        value={value}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-3 text-sm font-medium transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-md",
          "hover:bg-muted/50 min-w-0 flex-shrink-0",
          "touch-manipulation select-none",
          "min-h-[48px] min-w-[120px]", // Larger touch targets for mobile
          "text-center",
          className
        )}
      >
        {children}
      </TabsTrigger>
    );
  }
  
  return (
    <TabsTrigger 
      value={value} 
      disabled={disabled}
      className={className}
    >
      {children}
    </TabsTrigger>
  );
};

export const MobileTabsContent = TabsContent;
