import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, XCircle, AlertTriangle, AlertCircle, Info, FileText, Circle, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface InspectionItem {
  id: string;
  section: string;
  item: string;
  clause: string;
  inspected: boolean;
  outcome: 'satisfactory' | 'C1' | 'C2' | 'C3' | 'FI' | 'not-applicable' | 'not-verified' | 'limitation' | '';
  notes?: string;
}

interface EnhancedInspectionOutcomeSelectProps {
  itemId: string;
  currentOutcome: InspectionItem['outcome'];
  onOutcomeChange: (itemId: string, outcome: InspectionItem['outcome']) => void;
}

interface OutcomeOption {
  value: InspectionItem['outcome'];
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  priority: 'critical' | 'warning' | 'normal';
}

const outcomeOptions: OutcomeOption[] = [
  {
    value: 'satisfactory',
    label: 'Satisfactory',
    description: 'Complies with BS 7671 requirements',
    icon: <CheckCircle className="h-5 w-5" />,
    color: 'text-bs7671-safe',
    priority: 'normal'
  },
  {
    value: 'C1',
    label: 'C1 - Danger Present',
    description: 'Immediate danger to persons or property',
    icon: <XCircle className="h-5 w-5" />,
    color: 'text-bs7671-danger',
    priority: 'critical'
  },
  {
    value: 'C2',
    label: 'C2 - Potentially Dangerous',
    description: 'Urgent remedial action required',
    icon: <AlertCircle className="h-5 w-5" />,
    color: 'text-bs7671-warning',
    priority: 'critical'
  },
  {
    value: 'C3',
    label: 'C3 - Improvement Recommended',
    description: 'Does not comply with current standards',
    icon: <AlertTriangle className="h-5 w-5" />,
    color: 'text-bs7671-caution',
    priority: 'warning'
  },
  {
    value: 'FI',
    label: 'FI - Further Investigation',
    description: 'Requires further investigation without delay',
    icon: <Search className="h-5 w-5" />,
    color: 'text-blue-400',
    priority: 'warning'
  },
  {
    value: 'not-applicable',
    label: 'N/A - Not Applicable',
    description: 'Does not apply to this installation',
    icon: <Circle className="h-5 w-5" />,
    color: 'text-muted-foreground',
    priority: 'normal'
  },
  {
    value: 'not-verified',
    label: 'N/V - Not Verified',
    description: 'Unable to verify compliance',
    icon: <FileText className="h-5 w-5" />,
    color: 'text-bs7671-info',
    priority: 'normal'
  },
  {
    value: 'limitation',
    label: 'LIM - Limitation',
    description: 'Inspection limitation noted',
    icon: <Info className="h-5 w-5" />,
    color: 'text-purple-500',
    priority: 'normal'
  }
];

const EnhancedInspectionOutcomeSelect = ({ 
  itemId, 
  currentOutcome, 
  onOutcomeChange 
}: EnhancedInspectionOutcomeSelectProps) => {
  const currentOption = outcomeOptions.find(option => option.value === currentOutcome);
  
  const handleValueChange = (value: InspectionItem['outcome']) => {
      oldOutcome: currentOutcome,
      newValue: value,
      timestamp: new Date().toISOString()
    });
    
    onOutcomeChange(itemId, value);
  };

  const selectValue = currentOutcome === '' ? undefined : currentOutcome;

  return (
    <Select
      value={selectValue}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="bs7671-outcome-select w-full touch-manipulation">
        <SelectValue placeholder="Select outcome">
          {currentOption && (
            <div className="flex items-center gap-3">
              <div className={currentOption.color}>
                {currentOption.icon}
              </div>
              <div className="flex flex-col items-start gap-1">
                <span className="text-sm font-medium">{currentOption.label}</span>
              </div>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      
      <SelectContent 
        className="z-50 bg-popover border shadow-lg rounded-lg w-full max-w-sm mx-auto"
        align="center"
        sideOffset={4}
        avoidCollisions={true}
      >
        {outcomeOptions.map((option) => (
          <SelectItem 
            key={option.value} 
            value={option.value} 
            className="bs7671-touch-target px-4 py-3 cursor-pointer focus:bg-muted group"
          >
            <div className="flex items-start gap-3 w-full">
              <div className={`${option.color} flex-shrink-0 mt-0.5`}>
                {option.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{option.label}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-tight">
                  {option.description}
                </p>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default EnhancedInspectionOutcomeSelect;