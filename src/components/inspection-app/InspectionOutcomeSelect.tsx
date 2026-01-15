import React from 'react';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
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
      default: return <div className="h-4 w-4 bg-white/10 rounded-full" />;
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

  return (
    <MobileSelectPicker
      value={currentOutcome || ''}
      onValueChange={handleValueChange}
      options={[
        { value: 'satisfactory', label: 'Satisfactory' },
        { value: 'C1', label: 'C1 - Danger Present' },
        { value: 'C2', label: 'C2 - Potentially Dangerous' },
        { value: 'C3', label: 'C3 - Improvement Recommended' },
        { value: 'not-applicable', label: 'N/A - Not Applicable' },
        { value: 'not-verified', label: 'N/V - Not Verified' },
        { value: 'limitation', label: 'LIM - Limitation' },
      ]}
      placeholder="Select outcome"
      title="Inspection Outcome"
    />
  );
};

export default InspectionOutcomeSelect;