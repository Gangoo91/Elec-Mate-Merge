import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, XCircle, AlertTriangle, AlertCircle, Info, FileText } from 'lucide-react';

interface InspectionItem {
  id: string;
  section: string;
  item: string;
  clause: string;
  inspected: boolean;
  outcome: 'satisfactory' | 'C1' | 'C2' | 'C3' | 'not-applicable' | 'not-verified' | 'limitation' | '';
  notes?: string;
}

interface InspectionOutcomeSelectProps {
  itemId: string;
  currentOutcome: InspectionItem['outcome'];
  onOutcomeChange: (itemId: string, outcome: InspectionItem['outcome']) => void;
}

const InspectionOutcomeSelect = ({ itemId, currentOutcome, onOutcomeChange }: InspectionOutcomeSelectProps) => {
  const getOutcomeIcon = (outcome: string) => {
    switch (outcome) {
      case 'satisfactory': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'C1': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'C2': return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'C3': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'limitation': return <Info className="h-4 w-4 text-purple-500" />;
      case 'not-verified': return <FileText className="h-4 w-4 text-blue-500" />;
      default: return <div className="h-4 w-4 bg-gray-300 rounded-full" />;
    }
  };

  const getOutcomeLabel = (outcome: string) => {
    switch (outcome) {
      case 'satisfactory': return 'Satisfactory';
      case 'C1': return 'C1 - Danger Present';
      case 'C2': return 'C2 - Potentially Dangerous';
      case 'C3': return 'C3 - Improvement Recommended';
      case 'not-applicable': return 'N/A';
      case 'not-verified': return 'N/V - Not Verified';
      case 'limitation': return 'LIM - Limitation';
      default: return 'Select outcome';
    }
  };

  const handleValueChange = (value: InspectionItem['outcome']) => {
      oldOutcome: currentOutcome,
      newValue: value,
      timestamp: new Date().toISOString()
    });
    
    // Trigger parent callback immediately - no local state management
    onOutcomeChange(itemId, value);
    
  };

    currentOutcome,
    timestamp: new Date().toISOString()
  });

  // Use undefined for empty state to show placeholder properly
  const selectValue = currentOutcome === '' ? undefined : currentOutcome;

  return (
    <Select
      value={selectValue}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="w-full min-h-[44px] touch-manipulation">
        <SelectValue>
          <div className="flex items-center gap-3">
            {getOutcomeIcon(currentOutcome)}
            <span>{getOutcomeLabel(currentOutcome)}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent 
        className="z-50 bg-background border shadow-lg rounded-lg w-full max-w-sm mx-auto"
        align="center"
        sideOffset={4}
        avoidCollisions={true}
      >
        <SelectItem value="satisfactory" className="min-h-[48px] px-4 py-3 cursor-pointer focus:bg-muted">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
            <span>Satisfactory</span>
          </div>
        </SelectItem>
        <SelectItem value="C1" className="min-h-[48px] px-4 py-3 cursor-pointer focus:bg-muted">
          <div className="flex items-center gap-3">
            <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <span>C1 - Danger Present</span>
          </div>
        </SelectItem>
        <SelectItem value="C2" className="min-h-[48px] px-4 py-3 cursor-pointer focus:bg-muted">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-orange-500 flex-shrink-0" />
            <span>C2 - Potentially Dangerous</span>
          </div>
        </SelectItem>
        <SelectItem value="C3" className="min-h-[48px] px-4 py-3 cursor-pointer focus:bg-muted">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
            <span>C3 - Improvement Recommended</span>
          </div>
        </SelectItem>
        <SelectItem value="not-applicable" className="min-h-[48px] px-4 py-3 cursor-pointer focus:bg-muted">
          <div className="flex items-center gap-3">
            <div className="h-5 w-5 bg-muted-foreground/40 rounded-full flex-shrink-0" />
            <span>N/A - Not Applicable</span>
          </div>
        </SelectItem>
        <SelectItem value="not-verified" className="min-h-[48px] px-4 py-3 cursor-pointer focus:bg-muted">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-blue-500 flex-shrink-0" />
            <span>N/V - Not Verified</span>
          </div>
        </SelectItem>
        <SelectItem value="limitation" className="min-h-[48px] px-4 py-3 cursor-pointer focus:bg-muted">
          <div className="flex items-center gap-3">
            <Info className="h-5 w-5 text-purple-500 flex-shrink-0" />
            <span>LIM - Limitation</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default InspectionOutcomeSelect;