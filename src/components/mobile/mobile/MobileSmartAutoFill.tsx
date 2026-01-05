import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Zap, Lightbulb, Plug, ChefHat, Car, Check } from 'lucide-react';
import { TestResult } from '@/types/testResult';
import { checkRegulationCompliance } from '@/utils/autoRegChecker';
import RegulationWarningDialog from '../RegulationWarningDialog';

interface MobileSmartAutoFillProps {
  testResults: TestResult[];
  onUpdate: (id: string, updates: Partial<TestResult>) => void;
}

// Quick circuit presets for mobile (BS 7671 Table 54.7 Twin & Earth)
const quickCircuitPresets = [
  {
    category: 'Lighting',
    icon: Lightbulb,
    color: 'bg-elec-gray hover:bg-elec-gray-light',
    circuits: [
      { 
        label: 'Downstairs Lights', 
        type: 'Downstairs Lights',
        suggestions: { liveSize: '1.5mm', cpcSize: '1.0mm', protectiveDeviceRating: '6', referenceMethod: '1', protectiveDeviceType: 'MCB Type B' }
      },
      { 
        label: 'Upstairs Lights', 
        type: 'Upstairs Lights',
        suggestions: { liveSize: '1.5mm', cpcSize: '1.0mm', protectiveDeviceRating: '6', referenceMethod: '1', protectiveDeviceType: 'MCB Type B' }
      },
      { 
        label: 'Kitchen Lights', 
        type: 'Kitchen Lights',
        suggestions: { liveSize: '1.5mm', cpcSize: '1.0mm', protectiveDeviceRating: '10', referenceMethod: '1', protectiveDeviceType: 'MCB Type B' }
      },
      { 
        label: 'Outdoor Lights', 
        type: 'Outdoor Lights',
        suggestions: { liveSize: '1.5mm', cpcSize: '1.0mm', protectiveDeviceRating: '6', referenceMethod: '1', protectiveDeviceType: 'RCBO 30mA' }
      }
    ]
  },
  {
    category: 'Sockets',
    icon: Plug,
    color: 'bg-elec-gray hover:bg-elec-gray-light',
    circuits: [
      { 
        label: 'Downstairs Ring', 
        type: 'Downstairs Ring',
        suggestions: { liveSize: '2.5mm', cpcSize: '1.5mm', protectiveDeviceRating: '32', referenceMethod: '1', protectiveDeviceType: 'MCB Type B' }
      },
      { 
        label: 'Upstairs Ring', 
        type: 'Upstairs Ring',
        suggestions: { liveSize: '2.5mm', cpcSize: '1.5mm', protectiveDeviceRating: '32', referenceMethod: '1', protectiveDeviceType: 'MCB Type B' }
      },
      { 
        label: 'Kitchen Ring', 
        type: 'Kitchen Ring',
        suggestions: { liveSize: '2.5mm', cpcSize: '1.5mm', protectiveDeviceRating: '32', referenceMethod: '1', protectiveDeviceType: 'MCB Type B' }
      }
    ]
  },
  {
    category: 'Appliances',
    icon: ChefHat,
    color: 'bg-elec-gray hover:bg-elec-gray-light',
    circuits: [
      { 
        label: 'Cooker', 
        type: 'Electric Cooker',
        suggestions: { liveSize: '6.0mm', cpcSize: '2.5mm', protectiveDeviceRating: '32', referenceMethod: '1', protectiveDeviceType: 'MCB Type B' }
      },
      { 
        label: 'Shower', 
        type: 'Electric Shower',
        suggestions: { liveSize: '10mm', cpcSize: '4.0mm', protectiveDeviceRating: '40', referenceMethod: '1', protectiveDeviceType: 'RCBO 30mA' }
      },
      { 
        label: 'Immersion', 
        type: 'Immersion Heater',
        suggestions: { liveSize: '2.5mm', cpcSize: '1.5mm', protectiveDeviceRating: '16', referenceMethod: '1', protectiveDeviceType: 'MCB Type B' }
      }
    ]
  },
  {
    category: 'Modern',
    icon: Car,
    color: 'bg-elec-gray hover:bg-elec-gray-light',
    circuits: [
      { 
        label: 'EV Charger', 
        type: 'EV Charging Point',
        suggestions: { liveSize: '6.0mm', cpcSize: '2.5mm', protectiveDeviceRating: '32', referenceMethod: '1', protectiveDeviceType: 'RCBO 30mA' }
      },
      { 
        label: 'Heat Pump', 
        type: 'Heat Pump',
        suggestions: { liveSize: '4.0mm', cpcSize: '1.5mm', protectiveDeviceRating: '25', referenceMethod: '1', protectiveDeviceType: 'MCB Type B' }
      },
      { 
        label: 'Solar PV', 
        type: 'Solar PV',
        suggestions: { liveSize: '4.0mm', cpcSize: '1.5mm', protectiveDeviceRating: '16', referenceMethod: '1', protectiveDeviceType: 'MCB Type B' }
      }
    ]
  }
];

const MobileSmartAutoFill: React.FC<MobileSmartAutoFillProps> = ({ testResults, onUpdate }) => {
  const [selectedCircuit, setSelectedCircuit] = useState<TestResult | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const [pendingUpdate, setPendingUpdate] = useState<{ id: string; updates: Partial<TestResult> } | null>(null);
  const [pendingWarnings, setPendingWarnings] = useState<any[]>([]);

  const handleQuickFill = (circuitType: string, suggestions: Partial<TestResult>) => {
    if (!selectedCircuit) return;

    const result = testResults.find(r => r.id === selectedCircuit.id);
    if (!result) return;

    const updatedResult = {
      ...result,
      ...suggestions,
      circuitDescription: circuitType,
      type: circuitType,
      autoFilled: true
    };
    
    const complianceCheck = checkRegulationCompliance(updatedResult);
    
    if (complianceCheck.warnings.length > 0) {
      setPendingUpdate({
        id: selectedCircuit.id,
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
      onUpdate(selectedCircuit.id, {
        ...suggestions,
        circuitDescription: circuitType,
        type: circuitType,
        autoFilled: true
      });
      setSelectedCircuit(null); // Clear selection after successful fill
      setSelectedCategory(''); // Reset category
    }
  };

  const handleWarningApprove = () => {
    if (pendingUpdate) {
      onUpdate(pendingUpdate.id, pendingUpdate.updates);
      setSelectedCircuit(null);
      setSelectedCategory('');
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

  const selectedCategoryData = quickCircuitPresets.find(c => c.category === selectedCategory);

  return (
    <>
      <div className="space-y-4">
        {/* Step 1: Select Circuit to Fill */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-elec-gray-light border-2 border-elec-yellow text-elec-yellow font-bold shadow-lg">
              1
            </div>
            <h3 className="font-semibold text-foreground text-lg">Select Circuit to Fill</h3>
          </div>
          
          <div className="text-sm mb-2 font-medium">
            {selectedCircuit ? (
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-elec-yellow" />
                <span className="text-foreground">Selected:</span>
                <span className="text-elec-yellow font-bold">{selectedCircuit.circuitDesignation || 'Circuit'}</span>
              </span>
            ) : (
              <span className="text-gray-400">Tap a circuit below</span>
            )}
          </div>
          
          <ScrollArea className="h-[200px] w-full rounded-md border-2 border-elec-gray-light bg-elec-gray-darker">
            <div className="p-2 space-y-2">
              {testResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => setSelectedCircuit(result)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left touch-manipulation ${
                    selectedCircuit?.id === result.id
                      ? 'border-elec-yellow bg-elec-gray-light shadow-[0_0_15px_rgba(255,204,0,0.3)]'
                      : 'border-elec-gray-light bg-elec-gray hover:border-elec-yellow hover:bg-elec-gray-light hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-base text-foreground">
                        {result.circuitDesignation || `Circuit ${result.circuitNumber}`}
                      </div>
                      {result.circuitDescription && (
                        <div className="text-sm text-gray-400 mt-1 truncate">
                          {result.circuitDescription}
                        </div>
                      )}
                    </div>
                    {selectedCircuit?.id === result.id && (
                      <Check className="h-6 w-6 text-elec-yellow shrink-0 mt-0.5" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Step 2: Select Category */}
        {selectedCircuit && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-elec-gray-light border-2 border-elec-yellow text-elec-yellow font-bold shadow-lg">
                2
              </div>
              <h3 className="font-semibold text-foreground text-lg">Select Circuit Type</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {quickCircuitPresets.map((preset) => {
                const Icon = preset.icon;
                return (
                  <Button
                    key={preset.category}
                    onClick={() => setSelectedCategory(preset.category)}
                    variant="outline"
                    className={`h-20 flex-col gap-2 text-sm touch-manipulation border-2 transition-all ${
                      selectedCategory === preset.category 
                        ? 'bg-elec-gray-light border-elec-yellow text-foreground shadow-[0_0_15px_rgba(255,204,0,0.3)]' 
                        : 'bg-elec-gray border-elec-gray-light text-gray-300 hover:border-elec-yellow hover:text-foreground hover:bg-elec-gray-light'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                    {preset.category}
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Select Specific Circuit */}
        {selectedCircuit && selectedCategoryData && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-elec-gray-light border-2 border-elec-yellow text-elec-yellow font-bold shadow-lg">
                3
              </div>
              <h3 className="font-semibold text-foreground text-lg">Choose Configuration</h3>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {selectedCategoryData.circuits.map((circuit) => (
                <Button
                  key={circuit.label}
                  onClick={() => handleQuickFill(circuit.type, circuit.suggestions)}
                  variant="outline"
                  className="h-14 text-base transition-all touch-manipulation border-2 border-elec-gray-light bg-elec-gray text-foreground hover:border-elec-yellow hover:bg-elec-gray-light hover:shadow-md"
                >
                  {circuit.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <div className="text-xs p-4 bg-elec-gray-dark rounded-lg border-l-4 border-elec-yellow">
          <div className="flex items-start gap-2">
            <Lightbulb className="h-4 w-4 text-elec-yellow mt-0.5 shrink-0" />
            <div>
              <p className="text-foreground font-semibold mb-1">Auto-Reg Checker:</p>
              <p className="text-gray-300">All configurations are checked against BS 7671. Any issues will be flagged for review.</p>
            </div>
          </div>
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

export default MobileSmartAutoFill;
