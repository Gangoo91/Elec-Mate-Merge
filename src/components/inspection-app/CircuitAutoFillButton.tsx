import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Zap, Lightbulb, Plug, ChefHat, Droplets, Car, Flame, Home, Building2, Tv } from 'lucide-react';
import { TestResult } from '@/types/testResult';
import { getAutoFillSuggestions } from '@/types/autoFillTypes';
import { checkRegulationCompliance } from '@/utils/autoRegChecker';
import RegulationWarningDialog from './RegulationWarningDialog';

interface CircuitAutoFillButtonProps {
  result: TestResult;
  onUpdate: (id: string, updates: Partial<TestResult>) => void;
}

// Enhanced circuit types with more specific options
const enhancedCircuitTypes = [
  // Lighting circuits
  {
    category: 'Lighting',
    options: [
      { type: 'Downstairs Lights', icon: Lightbulb, label: 'Downstairs', color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800', suggestions: { liveSize: '1.5mm', cpcSize: '1.5mm', protectiveDeviceRating: '6', referenceMethod: 'A' } },
      { type: 'Upstairs Lights', icon: Lightbulb, label: 'Upstairs', color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800', suggestions: { liveSize: '1.5mm', cpcSize: '1.5mm', protectiveDeviceRating: '6', referenceMethod: 'A' } },
      { type: 'Kitchen Lights', icon: Lightbulb, label: 'Kitchen', color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800', suggestions: { liveSize: '1.5mm', cpcSize: '1.5mm', protectiveDeviceRating: '10', referenceMethod: 'A' } },
      { type: 'Outdoor Lights', icon: Lightbulb, label: 'Outdoor', color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800', suggestions: { liveSize: '1.5mm', cpcSize: '1.5mm', protectiveDeviceRating: '6', referenceMethod: 'A' } }
    ]
  },
  // Socket circuits
  {
    category: 'Sockets',
    options: [
      { type: 'Downstairs Ring', icon: Plug, label: 'Down Ring', color: 'bg-blue-100 hover:bg-blue-200 text-blue-800', suggestions: { liveSize: '2.5mm', cpcSize: '2.5mm', protectiveDeviceRating: '32', referenceMethod: 'A' } },
      { type: 'Upstairs Ring', icon: Plug, label: 'Up Ring', color: 'bg-blue-100 hover:bg-blue-200 text-blue-800', suggestions: { liveSize: '2.5mm', cpcSize: '2.5mm', protectiveDeviceRating: '32', referenceMethod: 'A' } },
      { type: 'Kitchen Ring', icon: Plug, label: 'Kitchen', color: 'bg-blue-100 hover:bg-blue-200 text-blue-800', suggestions: { liveSize: '2.5mm', cpcSize: '2.5mm', protectiveDeviceRating: '32', referenceMethod: 'A' } },
      { type: 'Utility Radial', icon: Zap, label: 'Utility', color: 'bg-green-100 hover:bg-green-200 text-green-800', suggestions: { liveSize: '2.5mm', cpcSize: '2.5mm', protectiveDeviceRating: '20', referenceMethod: 'A' } }
    ]
  },
  // Fixed appliances
  {
    category: 'Fixed Appliances',
    options: [
      { type: 'Electric Cooker', icon: ChefHat, label: 'Cooker', color: 'bg-orange-100 hover:bg-orange-200 text-orange-800', suggestions: { liveSize: '6.0mm', cpcSize: '6.0mm', protectiveDeviceRating: '32', referenceMethod: 'A' } },
      { type: 'Electric Shower', icon: Droplets, label: 'Shower', color: 'bg-purple-100 hover:bg-purple-200 text-purple-800', suggestions: { liveSize: '10mm', cpcSize: '10mm', protectiveDeviceRating: '40', referenceMethod: 'A' } },
      { type: 'Instantaneous Water Heater', icon: Droplets, label: 'Water Heater', color: 'bg-purple-100 hover:bg-purple-200 text-purple-800', suggestions: { liveSize: '6.0mm', cpcSize: '6.0mm', protectiveDeviceRating: '32', referenceMethod: 'A' } },
      { type: 'Immersion Heater', icon: Droplets, label: 'Immersion', color: 'bg-purple-100 hover:bg-purple-200 text-purple-800', suggestions: { liveSize: '2.5mm', cpcSize: '2.5mm', protectiveDeviceRating: '16', referenceMethod: 'A' } }
    ]
  },
  // Distribution boards
  {
    category: 'Distribution Boards',
    options: [
      { type: 'Garage DB', icon: Building2, label: 'Garage DB', color: 'bg-slate-100 hover:bg-slate-200 text-slate-800', suggestions: { liveSize: '4.0mm', cpcSize: '4.0mm', protectiveDeviceRating: '25', referenceMethod: 'A' } },
      { type: 'Outside Shed DB', icon: Building2, label: 'Shed DB', color: 'bg-slate-100 hover:bg-slate-200 text-slate-800', suggestions: { liveSize: '2.5mm', cpcSize: '2.5mm', protectiveDeviceRating: '20', referenceMethod: 'A' } }
    ]
  },
  // Modern circuits
  {
    category: 'Modern Systems',
    options: [
      { type: 'EV Charging Point', icon: Car, label: 'EV Charge', color: 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800', suggestions: { liveSize: '6.0mm', cpcSize: '6.0mm', protectiveDeviceRating: '32', referenceMethod: 'A' } },
      { type: 'Heat Pump', icon: Home, label: 'Heat Pump', color: 'bg-teal-100 hover:bg-teal-200 text-teal-800', suggestions: { liveSize: '4.0mm', cpcSize: '4.0mm', protectiveDeviceRating: '25', referenceMethod: 'A' } },
      { type: 'Solar PV', icon: Building2, label: 'Solar PV', color: 'bg-sky-100 hover:bg-sky-200 text-sky-800', suggestions: { liveSize: '4.0mm', cpcSize: '4.0mm', protectiveDeviceRating: '16', referenceMethod: 'A' } },
      { type: 'Central Heating', icon: Flame, label: 'Heating', color: 'bg-red-100 hover:bg-red-200 text-red-800', suggestions: { liveSize: '1.5mm', cpcSize: '1.5mm', protectiveDeviceRating: '6', referenceMethod: 'A' } }
    ]
  },
  // Communication & security
  {
    category: 'Low Current',
    options: [
      { type: 'Fire Alarm', icon: Flame, label: 'Fire Alarm', color: 'bg-red-100 hover:bg-red-200 text-red-800', suggestions: { liveSize: '1.5mm', cpcSize: '1.5mm', protectiveDeviceRating: '6', referenceMethod: 'A' } },
      { type: 'Security System', icon: Building2, label: 'Security', color: 'bg-gray-100 hover:bg-gray-200 text-gray-800', suggestions: { liveSize: '1.5mm', cpcSize: '1.5mm', protectiveDeviceRating: '6', referenceMethod: 'A' } },
      { type: 'Door Entry', icon: Home, label: 'Door Entry', color: 'bg-gray-100 hover:bg-gray-200 text-gray-800', suggestions: { liveSize: '1.5mm', cpcSize: '1.5mm', protectiveDeviceRating: '6', referenceMethod: 'A' } },
      { type: 'TV/Data', icon: Tv, label: 'TV/Data', color: 'bg-indigo-100 hover:bg-indigo-200 text-indigo-800', suggestions: { liveSize: '1.5mm', cpcSize: '1.5mm', protectiveDeviceRating: '6', referenceMethod: 'A' } }
    ]
  }
];

const CircuitAutoFillButton: React.FC<CircuitAutoFillButtonProps> = ({ result, onUpdate }) => {
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState<Partial<TestResult> | null>(null);
  const [pendingWarnings, setPendingWarnings] = useState<any[]>([]);

  const handleAutoFill = (circuitType: string, suggestions: Partial<TestResult>) => {
    const updatedResult = {
      ...result,
      ...suggestions,
      circuitDescription: circuitType,
      type: circuitType
    };
    
    // Check for regulation compliance
    const complianceCheck = checkRegulationCompliance(updatedResult);
    
    if (complianceCheck.warnings.length > 0) {
      // Show warning dialog
      setPendingUpdate({
        ...suggestions,
        circuitDescription: circuitType,
        type: circuitType
      });
      setPendingWarnings(complianceCheck.warnings);
      setShowWarningDialog(true);
    } else {
      // Apply update directly
      onUpdate(result.id, {
        ...suggestions,
        circuitDescription: circuitType,
        type: circuitType
      });
    }
  };

  const handleWarningApprove = () => {
    if (pendingUpdate) {
      onUpdate(result.id, pendingUpdate);
    }
    setShowWarningDialog(false);
    setPendingUpdate(null);
    setPendingWarnings([]);
  };

  const handleWarningReject = () => {
    setShowWarningDialog(false);
    setPendingUpdate(null);
    setPendingWarnings([]);
  };

  return (
    <>
      <div className="flex flex-col gap-3 p-3 bg-gray-50 rounded border-t">
        <span className="text-xs font-medium text-gray-700 mb-1">Quick Fill Circuit Types:</span>
        
        {enhancedCircuitTypes.map((category) => (
          <div key={category.category} className="space-y-2">
            <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              {category.category}
            </span>
            <div className="flex flex-wrap gap-1">
              {category.options.map((option) => (
                <Button
                  key={option.type}
                  size="sm"
                  variant="outline"
                  onClick={() => handleAutoFill(option.type, option.suggestions)}
                  className={`h-7 px-2 text-xs ${option.color} border-0`}
                  title={`Auto-fill ${option.type} circuit configuration`}
                >
                  <option.icon className="h-3 w-3 mr-1" />
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        ))}
        
        <div className="text-xs text-gray-500 mt-2 p-2 bg-blue-50 rounded border-l-2 border-blue-200">
          💡 <strong>Auto-Reg Checker:</strong> Configurations are automatically checked against BS 7671 regulations. 
          Any issues will be highlighted for your review.
        </div>
      </div>

      <RegulationWarningDialog
        open={showWarningDialog}
        onOpenChange={setShowWarningDialog}
        warnings={pendingWarnings}
        circuitDescription={pendingUpdate?.circuitDescription}
        onApprove={handleWarningApprove}
        onReject={handleWarningReject}
      />
    </>
  );
};

export default CircuitAutoFillButton;
