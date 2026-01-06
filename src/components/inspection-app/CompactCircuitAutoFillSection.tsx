
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Zap, Lightbulb, Plug, ChefHat, Droplets, Car, Flame, Home, Building2, Tv } from 'lucide-react';
import { TestResult } from '@/types/testResult';
import { checkRegulationCompliance } from '@/utils/autoRegChecker';
import RegulationWarningDialog from './RegulationWarningDialog';

interface CompactCircuitAutoFillSectionProps {
  testResults: TestResult[];
  onUpdate: (id: string, updates: Partial<TestResult>) => void;
}

// Enhanced circuit types with more specific options organised by category
const enhancedCircuitTypes = [
  {
    category: 'Lighting',
    icon: Lightbulb,
    color: 'bg-elec-gray-dark border-elec-gray hover:bg-elec-gray',
    options: [
      { type: 'Downstairs Lights', label: 'Downstairs', color: 'bg-elec-gray hover:bg-elec-gray-light text-foreground border-elec-gray', suggestions: { liveSize: '1.5', cpcSize: '1.5', protectiveDeviceRating: '6', referenceMethod: 'C', protectiveDeviceType: 'MCB', bsStandard: 'MCB', protectiveDeviceCurve: 'B' } },
      { type: 'Upstairs Lights', label: 'Upstairs', color: 'bg-elec-gray hover:bg-elec-gray-light text-foreground border-elec-gray', suggestions: { liveSize: '1.5', cpcSize: '1.5', protectiveDeviceRating: '6', referenceMethod: 'C', protectiveDeviceType: 'MCB', bsStandard: 'MCB', protectiveDeviceCurve: 'B' } },
      { type: 'Kitchen Lights', label: 'Kitchen', color: 'bg-elec-gray hover:bg-elec-gray-light text-foreground border-elec-gray', suggestions: { liveSize: '1.5', cpcSize: '1.5', protectiveDeviceRating: '10', referenceMethod: 'C', protectiveDeviceType: 'MCB', bsStandard: 'MCB', protectiveDeviceCurve: 'B' } },
      { type: 'Outdoor Lights', label: 'Outdoor', color: 'bg-elec-gray hover:bg-elec-gray-light text-foreground border-elec-gray', suggestions: { liveSize: '1.5', cpcSize: '1.5', protectiveDeviceRating: '6', referenceMethod: 'C', protectiveDeviceType: 'MCB', bsStandard: 'MCB', protectiveDeviceCurve: 'B' } }
    ]
  },
  {
    category: 'Sockets',
    icon: Plug,
    color: 'bg-elec-gray-dark border-elec-gray hover:bg-elec-gray',
    options: [
      { type: 'Downstairs Ring', label: 'Down Ring', color: 'bg-elec-gray hover:bg-elec-gray-light text-foreground border-elec-gray', suggestions: { liveSize: '2.5', cpcSize: '1.5', protectiveDeviceRating: '32', referenceMethod: 'C', protectiveDeviceType: 'MCB', bsStandard: 'MCB', protectiveDeviceCurve: 'B' } },
      { type: 'Upstairs Ring', label: 'Up Ring', color: 'bg-elec-gray hover:bg-elec-gray-light text-foreground border-elec-gray', suggestions: { liveSize: '2.5', cpcSize: '1.5', protectiveDeviceRating: '32', referenceMethod: 'C', protectiveDeviceType: 'MCB', bsStandard: 'MCB', protectiveDeviceCurve: 'B' } },
      { type: 'Kitchen Ring', label: 'Kitchen', color: 'bg-elec-gray hover:bg-elec-gray-light text-foreground border-elec-gray', suggestions: { liveSize: '2.5', cpcSize: '1.5', protectiveDeviceRating: '32', referenceMethod: 'C', protectiveDeviceType: 'MCB', bsStandard: 'MCB', protectiveDeviceCurve: 'B' } },
      { type: 'Utility Radial', label: 'Utility', color: 'bg-elec-gray hover:bg-elec-gray-light text-foreground border-elec-gray', suggestions: { liveSize: '2.5', cpcSize: '1.5', protectiveDeviceRating: '20', referenceMethod: 'C', protectiveDeviceType: 'MCB', bsStandard: 'MCB', protectiveDeviceCurve: 'B' } }
    ]
  },
  {
    category: 'Fixed Appliances',
    icon: ChefHat,
    color: 'bg-elec-gray-dark border-elec-gray hover:bg-elec-gray',
    options: [
      { type: 'Electric Cooker', label: 'Cooker', color: 'bg-elec-gray hover:bg-elec-gray-light text-foreground border-elec-gray', suggestions: { liveSize: '6', cpcSize: '2.5', protectiveDeviceRating: '32', referenceMethod: 'C', protectiveDeviceType: 'MCB', bsStandard: 'MCB', protectiveDeviceCurve: 'B' } },
      { type: 'Electric Shower', label: 'Shower', color: 'bg-elec-gray hover:bg-elec-gray-light text-foreground border-elec-gray', suggestions: { liveSize: '10', cpcSize: '4', protectiveDeviceRating: '40', referenceMethod: 'C', protectiveDeviceType: 'MCB', bsStandard: 'MCB', protectiveDeviceCurve: 'B' } },
      { type: 'Instantaneous Water Heater', label: 'Water Heater', color: 'bg-elec-gray hover:bg-elec-gray-light text-foreground border-elec-gray', suggestions: { liveSize: '6', cpcSize: '2.5', protectiveDeviceRating: '32', referenceMethod: 'C', protectiveDeviceType: 'MCB', bsStandard: 'MCB', protectiveDeviceCurve: 'B' } },
      { type: 'Immersion Heater', label: 'Immersion', color: 'bg-elec-gray hover:bg-elec-gray-light text-foreground border-elec-gray', suggestions: { liveSize: '2.5', cpcSize: '1.5', protectiveDeviceRating: '16', referenceMethod: 'C', protectiveDeviceType: 'MCB', bsStandard: 'MCB', protectiveDeviceCurve: 'B' } }
    ]
  },
  {
    category: 'Distribution Boards',
    icon: Building2,
    color: 'bg-elec-gray-dark border-elec-gray hover:bg-elec-gray',
    options: [
      { type: 'Garage DB', label: 'Garage DB', color: 'bg-elec-gray hover:bg-elec-gray-light text-foreground border-elec-gray', suggestions: { liveSize: '4', cpcSize: '1.5', protectiveDeviceRating: '25', referenceMethod: 'C', protectiveDeviceType: 'MCB', bsStandard: 'MCB', protectiveDeviceCurve: 'B' } },
      { type: 'Outside Shed DB', label: 'Shed DB', color: 'bg-elec-gray hover:bg-elec-gray-light text-foreground border-elec-gray', suggestions: { liveSize: '2.5', cpcSize: '1.5', protectiveDeviceRating: '20', referenceMethod: 'C', protectiveDeviceType: 'MCB', bsStandard: 'MCB', protectiveDeviceCurve: 'B' } }
    ]
  },
  {
    category: 'Modern Systems',
    icon: Car,
    color: 'bg-elec-gray-dark border-elec-gray hover:bg-elec-gray',
    options: [
      { type: 'EV Charging Point', label: 'EV Charge', color: 'bg-elec-gray hover:bg-elec-gray-light text-foreground border-elec-gray', suggestions: { liveSize: '6', cpcSize: '2.5', protectiveDeviceRating: '32', referenceMethod: 'C', protectiveDeviceType: 'MCB', bsStandard: 'MCB', protectiveDeviceCurve: 'B' } },
      { type: 'Heat Pump', label: 'Heat Pump', color: 'bg-elec-gray hover:bg-elec-gray-light text-foreground border-elec-gray', suggestions: { liveSize: '4', cpcSize: '1.5', protectiveDeviceRating: '25', referenceMethod: 'C', protectiveDeviceType: 'MCB', bsStandard: 'MCB', protectiveDeviceCurve: 'B' } },
      { type: 'Solar PV', label: 'Solar PV', color: 'bg-elec-gray hover:bg-elec-gray-light text-foreground border-elec-gray', suggestions: { liveSize: '4', cpcSize: '1.5', protectiveDeviceRating: '16', referenceMethod: 'C', protectiveDeviceType: 'MCB', bsStandard: 'MCB', protectiveDeviceCurve: 'B' } },
      { type: 'Central Heating', label: 'Heating', color: 'bg-elec-gray hover:bg-elec-gray-light text-foreground border-elec-gray', suggestions: { liveSize: '1.5', cpcSize: '1.5', protectiveDeviceRating: '6', referenceMethod: 'C', protectiveDeviceType: 'MCB', bsStandard: 'MCB', protectiveDeviceCurve: 'B' } }
    ]
  }
];

const CompactCircuitAutoFillSection: React.FC<CompactCircuitAutoFillSectionProps> = ({ testResults, onUpdate }) => {
  const [selectedCircuit, setSelectedCircuit] = useState<string>('');
  const [openCategories, setOpenCategories] = useState<string[]>([]);
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState<{ id: string; updates: Partial<TestResult> } | null>(null);
  const [pendingWarnings, setPendingWarnings] = useState<any[]>([]);

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleAutoFill = (circuitType: string, suggestions: Partial<TestResult>) => {
    if (!selectedCircuit) return;

    const result = testResults.find(r => r.id === selectedCircuit);
    if (!result) return;

    const updatedResult = {
      ...result,
      ...suggestions,
      circuitDescription: circuitType,
      type: circuitType,
      autoFilled: true
    };
    
    // Check for regulation compliance
    const complianceCheck = checkRegulationCompliance(updatedResult);
    
    if (complianceCheck.warnings.length > 0) {
      // Show warning dialog
      setPendingUpdate({
        id: selectedCircuit,
        updates: {
          ...suggestions,
          circuitDescription: circuitType,
          type: circuitType,
          autoFilled: true
        }
      });
      setPendingWarnings(complianceCheck.warnings);
      setShowWarningDialog(true);
    } else {
      // Apply update directly
      onUpdate(selectedCircuit, {
        ...suggestions,
        circuitDescription: circuitType,
        type: circuitType,
        autoFilled: true
      });
    }
  };

  const handleWarningApprove = () => {
    if (pendingUpdate) {
      onUpdate(pendingUpdate.id, pendingUpdate.updates);
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
      <div className="p-4 bg-elec-gray-dark rounded-lg border border-elec-gray">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="h-4 w-4 text-elec-yellow" />
          <h4 className="text-sm font-medium text-foreground">Smart Circuit Auto-Fill</h4>
        </div>
        
        {/* Circuit Selection - Remove orientation restrictions */}
        <div className="mb-4">
          <label className="text-xs font-medium text-white/80 block mb-2">Select Circuit to Auto-Fill:</label>
          <select 
            value={selectedCircuit}
            onChange={(e) => setSelectedCircuit(e.target.value)}
            className="w-full px-4 py-3 text-base border border-elec-gray rounded-md bg-elec-gray text-foreground focus:border-elec-yellow focus:ring-1 focus:ring-elec-yellow md:px-3 md:py-2 md:text-sm"
          >
            <option value="">Choose a circuit...</option>
            {testResults.map((result) => (
              <option key={result.id} value={result.id}>
                {result.circuitDesignation || `Circuit ${result.circuitNumber || 'New'}`} - {result.circuitDescription || 'No description'}
              </option>
            ))}
          </select>
        </div>

        {/* Collapsible Categories */}
        {selectedCircuit && (
          <div className="space-y-2">
            {enhancedCircuitTypes.map((category) => (
              <Collapsible key={category.category}>
                <CollapsibleTrigger 
                  onClick={() => toggleCategory(category.category)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${category.color}`}
                >
                  <div className="flex items-center gap-2">
                    <category.icon className="h-4 w-4 text-elec-yellow" />
                    <span className="text-sm font-medium text-foreground">{category.category}</span>
                  </div>
                  {openCategories.includes(category.category) ? 
                    <ChevronDown className="h-4 w-4 text-white/80" /> :
                    <ChevronRight className="h-4 w-4 text-white/80" />
                  }
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-2">
                  <div className="flex flex-wrap gap-2 pl-6">
                    {category.options.map((option) => (
                      <Button
                        key={option.type}
                        size="sm"
                        variant="outline"
                        onClick={() => handleAutoFill(option.type, option.suggestions)}
                        className={`h-10 px-4 py-2 text-sm ${option.color} hover:border-elec-yellow transition-colors md:h-8 md:px-3 md:text-xs`}
                        title={`Auto-fill ${option.type} circuit configuration`}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        )}
        
        <div className="text-xs text-white/80 mt-3 p-2 bg-elec-gray rounded border-l-2 border-elec-yellow">
          💡 <strong>Auto-Reg Checker:</strong> Configurations are automatically checked against BS 7671 regulations. 
          Any issues will be highlighted for your review.
        </div>
      </div>

      <RegulationWarningDialog
        open={showWarningDialog}
        onOpenChange={setShowWarningDialog}
        warnings={pendingWarnings}
        circuitDescription={pendingUpdate?.updates?.circuitDescription}
        onApprove={handleWarningApprove}
        onReject={handleWarningReject}
      />
    </>
  );
};

export default CompactCircuitAutoFillSection;
