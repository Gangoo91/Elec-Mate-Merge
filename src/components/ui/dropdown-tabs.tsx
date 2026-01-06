import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface DropdownTab {
  value: string;
  label: string;
  icon?: React.ReactNode | LucideIcon;
  content?: React.ReactNode;
}

interface DropdownTabsProps {
  tabs: DropdownTab[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  triggerClassName?: string;
  placeholder?: string;
}

// Helper to render icon - handles both ReactNode and LucideIcon component types
const renderIcon = (icon: React.ReactNode | LucideIcon | undefined) => {
  if (!icon) return null;

  // Check if it's already a valid React element (already rendered)
  if (React.isValidElement(icon)) {
    return icon;
  }

  // Check if it's a component type (function or forwardRef object)
  // LucideIcons are forwardRef components which have $$typeof and render properties
  if (typeof icon === 'function' || (typeof icon === 'object' && icon !== null && '$$typeof' in icon)) {
    const IconComponent = icon as LucideIcon;
    return <IconComponent className="h-4 w-4" />;
  }

  // Fallback - should not reach here normally
  return null;
};

export const DropdownTabs = ({
  tabs,
  value: controlledValue,
  defaultValue,
  onValueChange,
  className,
  triggerClassName,
  placeholder = "Select a section..."
}: DropdownTabsProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue || tabs[0]?.value || '');

  // Use controlled value if provided, otherwise use internal state
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;

  const handleValueChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  const selectedTab = tabs.find(tab => tab.value === currentValue);

  return (
    <div className={cn("space-y-4", className)}>
      <Select value={currentValue} onValueChange={handleValueChange}>
        <SelectTrigger className={cn("w-full h-9 bg-muted text-foreground border-border focus:ring-1 focus:ring-elec-yellow focus:border-elec-yellow text-sm", triggerClassName)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-muted text-foreground border-border z-[100]">
          {tabs.map((tab) => (
            <SelectItem key={tab.value} value={tab.value} className="min-h-[36px] py-2 cursor-pointer text-foreground text-sm data-[highlighted]:bg-neutral-600 data-[state=checked]:bg-neutral-600 focus:bg-neutral-600 focus:text-foreground">
              <div className="flex items-center gap-2 text-sm">
                {renderIcon(tab.icon)}
                <span>{tab.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Render content of selected tab */}
      {selectedTab?.content && (
        <div className="animate-fade-in">
          {selectedTab.content}
        </div>
      )}
    </div>
  );
};