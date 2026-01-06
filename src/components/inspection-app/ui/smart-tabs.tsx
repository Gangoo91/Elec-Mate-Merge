
import React from 'react';
import { MobileTabs, MobileTabsList, MobileTabsTrigger, MobileTabsContent } from '@/components/ui/mobile-tabs';
import { DropdownTabs, DropdownTab } from '@/components/ui/dropdown-tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

export interface SmartTab {
  value: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface SmartTabsProps {
  tabs: SmartTab[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  breakpoint?: number; // Number of tabs at which to switch to dropdown (default: 6)
}

export const SmartTabs = ({ 
  tabs, 
  defaultValue, 
  value, 
  onValueChange,
  className,
  breakpoint = 6 
}: SmartTabsProps) => {
  const isMobile = useIsMobile();
  // Always use dropdown on mobile for better UX, or when tabs exceed breakpoint on desktop
  const useDropdown = isMobile || tabs.length >= breakpoint;
  
  // Always call useState hook to maintain hook order consistency
  const [currentValue, setCurrentValue] = React.useState(defaultValue || tabs[0]?.value || '');
  const [isChanging, setIsChanging] = React.useState(false);
  const activeValue = value ?? currentValue;
  
  const handleValueChange = (newValue: string) => {
    setIsChanging(true);
    setTimeout(() => {
      setCurrentValue(newValue);
      onValueChange?.(newValue);
      setIsChanging(false);
    }, 150);
  };
  
  const dropdownTabs: DropdownTab[] = tabs.map(tab => ({
    value: tab.value,
    label: tab.label,
    icon: tab.icon
  }));

  if (useDropdown) {
    const activeTab = tabs.find(tab => tab.value === activeValue);

    return (
      <div className={cn("pt-4 space-y-4", className)}>
        <DropdownTabs
          tabs={dropdownTabs}
          value={activeValue}
          onValueChange={handleValueChange}
          className="max-w-xs h-11 touch-manipulation"
        />
        
        <div 
          className={cn(
            "mt-4 transition-opacity duration-200",
            isChanging ? "opacity-0" : "opacity-100"
          )}
        >
          {activeTab?.content}
        </div>
      </div>
    );
  }

  return (
    <MobileTabs 
      defaultValue={defaultValue} 
      value={value} 
      onValueChange={onValueChange}
      className={cn("w-full", className)}
    >
      <MobileTabsList className="bg-card border-border">
        {tabs.map((tab) => (
          <MobileTabsTrigger 
            key={tab.value} 
            value={tab.value} 
            className={`flex items-center gap-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-white/80 hover:text-foreground transition-colors ${
              isMobile ? 'text-xs min-w-[80px]' : ''
            }`}
          >
            {tab.icon}
            <span className={isMobile ? 'hidden sm:inline' : ''}>{tab.label}</span>
            <span className={isMobile ? 'sm:hidden' : 'hidden'}>{tab.label.split(' ')[0]}</span>
          </MobileTabsTrigger>
        ))}
      </MobileTabsList>

      {tabs.map((tab) => (
        <MobileTabsContent key={tab.value} value={tab.value} className="space-y-4">
          {tab.content}
        </MobileTabsContent>
      ))}
    </MobileTabs>
  );
};
