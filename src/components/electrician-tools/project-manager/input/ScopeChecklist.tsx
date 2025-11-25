import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface ScopeChecklistProps {
  onScopeChange: (scope: string[]) => void;
  initialScope?: string[];
}

const SCOPE_ITEMS = [
  { id: 'consumer_unit', label: 'Consumer Unit Replacement', category: 'core' },
  { id: 'full_rewire', label: 'Full Rewire', category: 'core' },
  { id: 'partial_rewire', label: 'Partial Rewire (selected rooms)', category: 'core' },
  { id: 'shower_circuit', label: 'Shower Circuit', category: 'circuits' },
  { id: 'cooker_circuit', label: 'Cooker Circuit', category: 'circuits' },
  { id: 'ev_charger', label: 'EV Charger Circuit', category: 'circuits' },
  { id: 'immersion', label: 'Immersion Heater Circuit', category: 'circuits' },
  { id: 'lighting_upgrade', label: 'Lighting Upgrade/LEDs', category: 'lighting' },
  { id: 'downlights', label: 'Downlights Installation', category: 'lighting' },
  { id: 'external_lights', label: 'External Lighting', category: 'lighting' },
  { id: 'emergency_lighting', label: 'Emergency Lighting', category: 'commercial' },
  { id: 'data_cabling', label: 'Data/Network Cabling', category: 'commercial' },
  { id: 'fire_alarm', label: 'Fire Alarm Integration', category: 'commercial' },
  { id: 'external_works', label: 'External Works (garage/shed)', category: 'external' },
  { id: 'solar_ready', label: 'Solar PV Ready', category: 'external' },
];

export const ScopeChecklist = ({ onScopeChange, initialScope = [] }: ScopeChecklistProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(initialScope);

  const handleToggle = (itemId: string) => {
    const updated = selectedItems.includes(itemId)
      ? selectedItems.filter(id => id !== itemId)
      : [...selectedItems, itemId];
    
    setSelectedItems(updated);
    onScopeChange(updated);
  };

  const groupedByCategory = SCOPE_ITEMS.reduce((acc: any, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const categoryLabels: Record<string, string> = {
    core: 'Core Works',
    circuits: 'Additional Circuits',
    lighting: 'Lighting',
    commercial: 'Commercial Features',
    external: 'External Works',
  };

  return (
    <div className="border border-border/50 rounded-lg bg-card">
      <div className="p-4 sm:p-6 border-b border-border/30">
        <h3 className="text-base sm:text-lg font-semibold text-foreground">Project Scope</h3>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Select the work items included in this project
        </p>
      </div>
      <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
        {Object.entries(groupedByCategory).map(([category, items]: [string, any]) => (
          <div key={category} className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">
              {categoryLabels[category] || category}
            </h4>
            <div className="space-y-2.5">
              {items.map((item: any) => (
                <div key={item.id} className="flex items-center space-x-3 touch-manipulation min-h-[44px] py-1">
                  <Checkbox
                    id={item.id}
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={() => handleToggle(item.id)}
                    className="h-5 w-5"
                  />
                  <Label
                    htmlFor={item.id}
                    className="text-sm font-normal cursor-pointer leading-relaxed flex-1"
                  >
                    {item.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
