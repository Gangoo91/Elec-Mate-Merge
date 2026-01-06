
import React from 'react';
import { MobileTabs, MobileTabsList, MobileTabsTrigger, MobileTabsContent } from '@/components/ui/mobile-tabs';
import { DropdownTabs, DropdownTab } from '@/components/ui/dropdown-tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

export interface SmartTab {
  value: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  /** Optional - whether this tab is completed */
  isComplete?: boolean;
}

interface SmartTabsProps {
  tabs: SmartTab[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  breakpoint?: number; // Number of tabs at which to switch to dropdown (default: 6)
  /** Optional - map of tab values to completion status */
  completedTabs?: Record<string, boolean>;
  /** Optional - show overall progress bar */
  showProgress?: boolean;
}

export const SmartTabs = ({
  tabs,
  defaultValue,
  value,
  onValueChange,
  className,
  breakpoint = 6,
  completedTabs = {},
  showProgress = false
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

  // Check if tab is complete (from tab prop or completedTabs map)
  const isTabComplete = (tab: SmartTab): boolean => {
    return tab.isComplete || completedTabs[tab.value] || false;
  };

  // Calculate progress percentage
  const completedCount = tabs.filter(tab => isTabComplete(tab)).length;
  const progressPercent = Math.round((completedCount / tabs.length) * 100);

  const dropdownTabs: DropdownTab[] = tabs.map(tab => ({
    value: tab.value,
    label: isTabComplete(tab) ? `✓ ${tab.label}` : tab.label,
    icon: tab.icon
  }));

  if (useDropdown) {
    const activeTab = tabs.find(tab => tab.value === activeValue);
    const activeTabComplete = activeTab ? isTabComplete(activeTab) : false;

    return (
      <div className={cn("pt-4 space-y-4", className)}>
        {/* Progress bar */}
        {showProgress && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{completedCount} of {tabs.length} sections complete</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-elec-yellow transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <DropdownTabs
            tabs={dropdownTabs}
            value={activeValue}
            onValueChange={handleValueChange}
            className="max-w-xs h-11 touch-manipulation flex-1"
          />
          {activeTabComplete && (
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
          )}
        </div>

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
    <div className={cn("w-full space-y-4", className)}>
      {/* Progress bar for desktop too */}
      {showProgress && (
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{completedCount} of {tabs.length} sections complete</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-elec-yellow transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      <MobileTabs
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
        className="w-full"
      >
        <MobileTabsList className="bg-card border-border">
          {tabs.map((tab) => {
            const tabComplete = isTabComplete(tab);
            return (
              <MobileTabsTrigger
                key={tab.value}
                value={tab.value}
                className={cn(
                  "flex items-center gap-2 data-[state=active]:bg-elec-yellow data-[state=active]:text-black text-gray-300 hover:text-foreground transition-colors relative",
                  isMobile ? 'text-xs min-w-[80px]' : '',
                  tabComplete && 'pr-7'
                )}
              >
                {tab.icon}
                <span className={isMobile ? 'hidden sm:inline' : ''}>{tab.label}</span>
                <span className={isMobile ? 'sm:hidden' : 'hidden'}>{tab.label.split(' ')[0]}</span>
                {tabComplete && (
                  <CheckCircle className="h-3.5 w-3.5 text-green-500 absolute right-1.5 top-1/2 -translate-y-1/2" />
                )}
              </MobileTabsTrigger>
            );
          })}
        </MobileTabsList>

        {tabs.map((tab) => (
          <MobileTabsContent key={tab.value} value={tab.value} className="space-y-4">
            {tab.content}
          </MobileTabsContent>
        ))}
      </MobileTabs>
    </div>
  );
};
