import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LucideIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export interface DropdownTab {
  value: string;
  label: string;
  icon?: LucideIcon;
  content: React.ReactNode;
}

interface DropdownTabsProps {
  tabs: DropdownTab[];
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  onValueChange?: (value: string) => void;
}

export const DropdownTabs: React.FC<DropdownTabsProps> = ({
  tabs,
  defaultValue,
  placeholder = "Select option",
  className = "",
  triggerClassName,
  onValueChange
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value || "");
  const isMobile = useIsMobile();

  // Update activeTab when defaultValue changes externally
  React.useEffect(() => {
    if (defaultValue && defaultValue !== activeTab) {
      setActiveTab(defaultValue);
    }
  }, [defaultValue]);

  const handleValueChange = (value: string) => {
    setActiveTab(value);
    onValueChange?.(value);
  };

  const activeTabData = tabs.find(tab => tab.value === activeTab);

  // Mobile-optimized trigger styling
  const defaultTriggerClassName = isMobile 
    ? "w-full max-w-sm h-12 text-base bg-background border-border" 
    : "w-[280px] md:w-[320px] bg-background border-border";

  return (
    <div className={`w-full space-y-6 ${className}`}>
      <div className={`flex ${isMobile ? '' : 'justify-center'}`}>
        <Select value={activeTab} onValueChange={handleValueChange}>
          <SelectTrigger className={triggerClassName || defaultTriggerClassName}>
            <SelectValue placeholder={placeholder}>
              <div className="flex items-center gap-2">
                {(() => {
                  const currentTab = tabs.find(tab => tab.value === activeTab);
                  const IconComponent = currentTab?.icon;
                  return (
                    <>
                      {IconComponent && (
                        <IconComponent className={`${isMobile ? 'h-5 w-5' : 'h-4 w-4'}`} />
                      )}
                      <span className={isMobile ? 'text-base font-medium' : ''}>
                        {currentTab?.label}
                      </span>
                    </>
                  );
                })()}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent 
            position="popper"
            side="bottom"
            sideOffset={8}
            className={`${isMobile ? 'w-[calc(100vw-2rem)] max-h-[70vh]' : 'max-h-[80vh]'} bg-background border border-border shadow-2xl rounded-lg overflow-y-auto z-50`}
          >
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <SelectItem 
                  key={tab.value} 
                  value={tab.value}
                  className={`${isMobile ? 'h-12 px-4 text-base' : ''} hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground`}
                >
                  <div className="flex items-center gap-2">
                    {IconComponent && (
                      <IconComponent className={`${isMobile ? 'h-5 w-5' : 'h-4 w-4'}`} />
                    )}
                    <span className={isMobile ? 'text-base' : ''}>
                      {tab.label}
                    </span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full animate-fade-in">
        {activeTabData?.content}
      </div>
    </div>
  );
};