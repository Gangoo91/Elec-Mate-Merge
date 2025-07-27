import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LucideIcon } from "lucide-react";

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
  triggerClassName = "w-[280px] md:w-[320px]",
  onValueChange
}) => {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value || "");

  const handleValueChange = (value: string) => {
    setActiveTab(value);
    onValueChange?.(value);
  };

  const activeTabData = tabs.find(tab => tab.value === activeTab);

  return (
    <div className={`w-full space-y-6 ${className}`}>
      <div className="flex justify-center">
        <Select value={activeTab} onValueChange={handleValueChange}>
          <SelectTrigger className={triggerClassName}>
            <SelectValue placeholder={placeholder}>
              <div className="flex items-center gap-2">
                {(() => {
                  const currentTab = tabs.find(tab => tab.value === activeTab);
                  const IconComponent = currentTab?.icon;
                  return (
                    <>
                      {IconComponent && <IconComponent className="h-4 w-4" />}
                      {currentTab?.label}
                    </>
                  );
                })()}
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <SelectItem key={tab.value} value={tab.value}>
                  <div className="flex items-center gap-2">
                    {IconComponent && <IconComponent className="h-4 w-4" />}
                    {tab.label}
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