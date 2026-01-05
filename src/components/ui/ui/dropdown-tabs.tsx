import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

export interface DropdownTab {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface DropdownTabsProps {
  tabs: DropdownTab[];
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export const DropdownTabs = ({ 
  tabs, 
  value, 
  onValueChange, 
  className,
  placeholder = "Select a section..." 
}: DropdownTabsProps) => {
  const selectedTab = tabs.find(tab => tab.value === value);
  
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={cn("w-full h-9 bg-neutral-700 text-foreground border-border focus:ring-1 focus:ring-elec-yellow focus:border-elec-yellow text-sm", className)}>
        <SelectValue placeholder={placeholder}>
          {selectedTab && (
            <div className="flex items-center gap-2 text-sm">
              {selectedTab.icon}
              <span className="font-medium">{selectedTab.label}</span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-neutral-700 text-foreground border-border z-[100]">
        {tabs.map((tab) => (
          <SelectItem key={tab.value} value={tab.value} className="min-h-[36px] py-2 cursor-pointer text-foreground text-sm data-[highlighted]:bg-neutral-600 data-[state=checked]:bg-neutral-600 focus:bg-neutral-600 focus:text-foreground">
            <div className="flex items-center gap-2 text-sm">
              {tab.icon}
              <span>{tab.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};