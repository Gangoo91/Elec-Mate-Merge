
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Zap, Lightbulb, Plug, ChefHat, Droplets, Car, Flame, Home, Building2, Tv, Server, Wind, Cpu, Factory, Wrench, DoorOpen, Shield } from 'lucide-react';
import { TestResult } from '@/types/testResult';
import CircuitTypeListPanel from './CircuitTypeListPanel';

interface SmartAutoFillPromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUseAutoFill: (circuitType?: string, suggestions?: Partial<TestResult>) => void;
  onSkip: () => void;
  circuitNumber: string;
}

// Circuit types with auto-fill suggestions (BS 7671 Table 41.3 compliant)
const circuitTypes = [
  // Lighting circuits - 1.5mm²/1.0mm² T&E
  { type: 'Downstairs Lights', icon: Lightbulb, category: 'Lighting', suggestions: { liveSize: '1.5mm', cpcSize: '1.0mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'B', protectiveDeviceRating: '6', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '6', maxZs: '7.28', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },
  { type: 'Upstairs Lights', icon: Lightbulb, category: 'Lighting', suggestions: { liveSize: '1.5mm', cpcSize: '1.0mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'B', protectiveDeviceRating: '6', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '6', maxZs: '7.28', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },
  { type: 'Kitchen Lights', icon: Lightbulb, category: 'Lighting', suggestions: { liveSize: '1.5mm', cpcSize: '1.0mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'B', protectiveDeviceRating: '10', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '6', maxZs: '4.37', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },
  { type: 'Outdoor Lights', icon: Lightbulb, category: 'Lighting', suggestions: { liveSize: '1.5mm', cpcSize: '1.0mm', protectiveDeviceType: 'RCBO', protectiveDeviceCurve: 'B', protectiveDeviceRating: '6', bsStandard: 'BS EN 61009', protectiveDeviceKaRating: '6', maxZs: '7.28', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },
  
  // Socket circuits - 2.5mm²/1.5mm² T&E
  { type: 'Downstairs Ring', icon: Plug, category: 'Sockets', suggestions: { liveSize: '2.5mm', cpcSize: '1.5mm', protectiveDeviceType: 'RCBO', protectiveDeviceCurve: 'B', protectiveDeviceRating: '32', bsStandard: 'BS EN 61009', protectiveDeviceKaRating: '6', maxZs: '1.37', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },
  { type: 'Upstairs Ring', icon: Plug, category: 'Sockets', suggestions: { liveSize: '2.5mm', cpcSize: '1.5mm', protectiveDeviceType: 'RCBO', protectiveDeviceCurve: 'B', protectiveDeviceRating: '32', bsStandard: 'BS EN 61009', protectiveDeviceKaRating: '6', maxZs: '1.37', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },
  { type: 'Kitchen Ring', icon: Plug, category: 'Sockets', suggestions: { liveSize: '2.5mm', cpcSize: '1.5mm', protectiveDeviceType: 'RCBO', protectiveDeviceCurve: 'B', protectiveDeviceRating: '32', bsStandard: 'BS EN 61009', protectiveDeviceKaRating: '6', maxZs: '1.37', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },
  { type: 'Utility Radial', icon: Zap, category: 'Sockets', suggestions: { liveSize: '2.5mm', cpcSize: '1.5mm', protectiveDeviceType: 'RCBO', protectiveDeviceCurve: 'B', protectiveDeviceRating: '20', bsStandard: 'BS EN 61009', protectiveDeviceKaRating: '6', maxZs: '2.19', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },
  
  // Fixed appliances - Various T&E sizes
  { type: 'Electric Cooker', icon: ChefHat, category: 'Fixed Appliances', suggestions: { liveSize: '6.0mm', cpcSize: '2.5mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'B', protectiveDeviceRating: '32', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '6', maxZs: '1.37', pointsServed: '1', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },
  { type: 'Electric Shower', icon: Droplets, category: 'Fixed Appliances', suggestions: { liveSize: '10mm', cpcSize: '4.0mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'B', protectiveDeviceRating: '40', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '6', maxZs: '1.09', pointsServed: '1', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },
  { type: 'Immersion Heater', icon: Droplets, category: 'Fixed Appliances', suggestions: { liveSize: '2.5mm', cpcSize: '1.5mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'B', protectiveDeviceRating: '16', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '6', maxZs: '2.73', pointsServed: '1', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },
  
  // Modern circuits - Various T&E sizes
  { type: 'EV Charging Point', icon: Car, category: 'Modern Systems', suggestions: { liveSize: '6.0mm', cpcSize: '2.5mm', protectiveDeviceType: 'RCBO', protectiveDeviceCurve: 'C', protectiveDeviceRating: '32', bsStandard: 'BS EN 61009', protectiveDeviceKaRating: '6', maxZs: '0.68', pointsServed: '1', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },
  { type: 'Heat Pump', icon: Home, category: 'Modern Systems', suggestions: { liveSize: '4.0mm', cpcSize: '1.5mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'B', protectiveDeviceRating: '25', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '6', maxZs: '1.75', pointsServed: '1', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },
  { type: 'Solar PV', icon: Building2, category: 'Modern Systems', suggestions: { liveSize: '4.0mm', cpcSize: '1.5mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'B', protectiveDeviceRating: '16', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '6', maxZs: '2.73', pointsServed: '1', referenceMethod: 'C', typeOfWiring: 'Twin & Earth Cable' } },
  { type: 'Central Heating', icon: Flame, category: 'Modern Systems', suggestions: { liveSize: '1.5mm', cpcSize: '1.0mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'B', protectiveDeviceRating: '6', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '6', maxZs: '7.28', pointsServed: '1', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },

  // Commercial circuits - SWA/Single Core (CPC = Live size for ≤16mm²)
  { type: 'Office Lighting', icon: Lightbulb, category: 'Commercial', suggestions: { liveSize: '2.5mm', cpcSize: '2.5mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'B', protectiveDeviceRating: '16', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '10', maxZs: '2.73', referenceMethod: 'C', typeOfWiring: 'SWA Cable' } },
  { type: 'Office Sockets (Radial)', icon: Plug, category: 'Commercial', suggestions: { liveSize: '4.0mm', cpcSize: '4.0mm', protectiveDeviceType: 'RCBO', protectiveDeviceCurve: 'B', protectiveDeviceRating: '32', bsStandard: 'BS EN 61009', protectiveDeviceKaRating: '10', maxZs: '1.37', referenceMethod: 'C', typeOfWiring: 'SWA Cable' } },
  { type: 'Server Room Sockets', icon: Server, category: 'Commercial', suggestions: { liveSize: '4.0mm', cpcSize: '4.0mm', protectiveDeviceType: 'RCBO', protectiveDeviceCurve: 'C', protectiveDeviceRating: '20', bsStandard: 'BS EN 61009', protectiveDeviceKaRating: '10', maxZs: '1.09', referenceMethod: 'C', typeOfWiring: 'SWA Cable' } },
  { type: 'Air Conditioning Unit', icon: Wind, category: 'Commercial', suggestions: { liveSize: '4.0mm', cpcSize: '4.0mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'C', protectiveDeviceRating: '20', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '10', maxZs: '1.09', pointsServed: '1', referenceMethod: 'C', typeOfWiring: 'SWA Cable' } },
  { type: 'Emergency Lighting', icon: Shield, category: 'Commercial', suggestions: { liveSize: '1.5mm', cpcSize: '1.5mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'B', protectiveDeviceRating: '6', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '10', maxZs: '7.28', referenceMethod: 'C', typeOfWiring: 'SWA Cable' } },
  { type: 'Fire Alarm System', icon: Flame, category: 'Commercial', suggestions: { liveSize: '1.5mm', cpcSize: '1.5mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'B', protectiveDeviceRating: '6', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '10', maxZs: '7.28', pointsServed: '1', referenceMethod: 'C', typeOfWiring: 'Fire Resistant Cable' } },
  { type: 'Commercial Kitchen', icon: ChefHat, category: 'Commercial', suggestions: { liveSize: '10mm', cpcSize: '10mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'C', protectiveDeviceRating: '32', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '10', maxZs: '0.68', referenceMethod: 'C', typeOfWiring: 'SWA Cable' } },
  { type: 'Lift Motor', icon: DoorOpen, category: 'Commercial', suggestions: { liveSize: '16mm', cpcSize: '16mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'D', protectiveDeviceRating: '63', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '10', maxZs: '0.17', pointsServed: '1', referenceMethod: 'E', typeOfWiring: 'SWA Cable' } },

  // Industrial circuits - SWA/Single Core (CPC = Live size for ≤16mm², 16mm for 25-35mm)
  { type: 'Three-Phase Motor 5.5kW', icon: Factory, category: 'Industrial', suggestions: { liveSize: '4.0mm', cpcSize: '4.0mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'D', protectiveDeviceRating: '16', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '10', maxZs: '0.68', pointsServed: '1', referenceMethod: 'E', typeOfWiring: 'SWA Cable' } },
  { type: 'Industrial Machinery', icon: Wrench, category: 'Industrial', suggestions: { liveSize: '10mm', cpcSize: '10mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'D', protectiveDeviceRating: '40', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '10', maxZs: '0.27', pointsServed: '1', referenceMethod: 'E', typeOfWiring: 'SWA Cable' } },
  { type: 'Workshop Sockets', icon: Plug, category: 'Industrial', suggestions: { liveSize: '6.0mm', cpcSize: '6.0mm', protectiveDeviceType: 'RCBO', protectiveDeviceCurve: 'C', protectiveDeviceRating: '32', bsStandard: 'BS EN 61009', protectiveDeviceKaRating: '10', maxZs: '0.68', referenceMethod: 'C', typeOfWiring: 'SWA Cable' } },
  { type: 'High-Bay Lighting', icon: Lightbulb, category: 'Industrial', suggestions: { liveSize: '2.5mm', cpcSize: '2.5mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'B', protectiveDeviceRating: '20', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '10', maxZs: '2.19', referenceMethod: 'C', typeOfWiring: 'SWA Cable' } },
  { type: 'Compressor Unit', icon: Wind, category: 'Industrial', suggestions: { liveSize: '10mm', cpcSize: '10mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'D', protectiveDeviceRating: '32', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '10', maxZs: '0.34', pointsServed: '1', referenceMethod: 'E', typeOfWiring: 'SWA Cable' } },
  { type: 'Welding Equipment', icon: Zap, category: 'Industrial', suggestions: { liveSize: '16mm', cpcSize: '16mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'D', protectiveDeviceRating: '63', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '10', maxZs: '0.17', pointsServed: '1', referenceMethod: 'E', typeOfWiring: 'SWA Cable' } },
  { type: 'Industrial Heaters', icon: Flame, category: 'Industrial', suggestions: { liveSize: '6.0mm', cpcSize: '6.0mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'C', protectiveDeviceRating: '32', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '10', maxZs: '0.68', pointsServed: '1', referenceMethod: 'C', typeOfWiring: 'SWA Cable' } },
  { type: 'Control Panel', icon: Cpu, category: 'Industrial', suggestions: { liveSize: '2.5mm', cpcSize: '2.5mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'B', protectiveDeviceRating: '10', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '10', maxZs: '4.37', pointsServed: '1', referenceMethod: 'C', typeOfWiring: 'SWA Cable' } }
];

const SmartAutoFillPromptDialog: React.FC<SmartAutoFillPromptDialogProps> = ({
  open,
  onOpenChange,
  onUseAutoFill,
  onSkip,
  circuitNumber
}) => {
  const [selectedCircuitType, setSelectedCircuitType] = useState<string>('');

  // Reset selected circuit type when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setSelectedCircuitType('');
    }
  }, [open]);

  const handleUseAutoFill = () => {
    if (selectedCircuitType) {
      const circuitConfig = circuitTypes.find(ct => ct.type === selectedCircuitType);
      if (circuitConfig) {
        onUseAutoFill(circuitConfig.type, circuitConfig.suggestions);
      } else {
        onUseAutoFill();
      }
    } else {
      onUseAutoFill();
    }
  };

  const selectedConfig = circuitTypes.find(ct => ct.type === selectedCircuitType);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md md:max-w-md bg-card flex flex-col max-h-[90vh]">
        <DialogHeader className="flex-shrink-0 space-y-2">
          <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-elec-yellow flex-shrink-0" />
            <span>Smart Auto-Fill Available</span>
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm leading-relaxed">
            You've added a new circuit (C{circuitNumber}). Choose a circuit type to auto-fill with BS 7671 compliant settings.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto overscroll-contain dropdown-scrollbar space-y-3 py-3 min-h-0">
          <div>
            <label className="text-xs sm:text-sm font-medium mb-2 block">Select Circuit Type:</label>
            
            {/* Mobile: Use MobileSelectPicker */}
            <div className="md:hidden">
              <MobileSelectPicker
                value={selectedCircuitType}
                onValueChange={setSelectedCircuitType}
                options={circuitTypes.map(circuit => ({
                  value: circuit.type,
                  label: `${circuit.category}: ${circuit.type}`,
                }))}
                placeholder="Choose a circuit type..."
                title="Circuit Type"
              />
            </div>

            {/* Desktop: Use scrollable list panel */}
            <div className="hidden md:block">
              <CircuitTypeListPanel
                value={selectedCircuitType}
                onChange={setSelectedCircuitType}
                items={circuitTypes}
              />
            </div>
          </div>

          {selectedConfig && (
            <div className="p-3 bg-muted rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-2">
                <selectedConfig.icon className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <span className="font-medium text-foreground text-sm">Auto-Fill Preview:</span>
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground space-y-1">
                <div>• Live Size: {selectedConfig.suggestions.liveSize}</div>
                <div>• CPC Size: {selectedConfig.suggestions.cpcSize}</div>
                <div>• Type of Wiring: {selectedConfig.suggestions.typeOfWiring}</div>
                <div>• Protective Device: {selectedConfig.suggestions.protectiveDeviceType} {selectedConfig.suggestions.protectiveDeviceCurve}{selectedConfig.suggestions.protectiveDeviceRating}A</div>
                <div>• BS Standard: {selectedConfig.suggestions.bsStandard}</div>
                <div>• Breaking Capacity: {selectedConfig.suggestions.protectiveDeviceKaRating}kA</div>
                <div>• Max Zs: {selectedConfig.suggestions.maxZs}Ω</div>
                <div>• Reference Method: {selectedConfig.suggestions.referenceMethod}</div>
                {selectedConfig.suggestions.pointsServed && (
                  <div>• Points Served: {selectedConfig.suggestions.pointsServed}</div>
                )}
              </div>
            </div>
          )}

          <div className="p-3 bg-muted rounded-lg border-l-4 border-green-500">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs sm:text-sm">
                <p className="font-medium text-foreground mb-1">Smart Auto-Fill Benefits:</p>
                <ul className="text-muted-foreground space-y-1 text-xs">
                  <li>• Instantly populate cable sizes and protective device ratings</li>
                  <li>• BS 7671 regulation compliance checking</li>
                  <li>• Consistent professional configuration</li>
                  <li>• Save time with pre-configured circuit types</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-shrink-0 flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onSkip} className="w-full sm:w-auto h-9 touch-manipulation">
            Skip for Now
          </Button>
          <Button onClick={handleUseAutoFill} className="w-full sm:w-auto h-9 gap-2 touch-manipulation">
            <Zap className="h-4 w-4" />
            {selectedCircuitType ? `Create ${selectedCircuitType}` : 'Create Empty Circuit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SmartAutoFillPromptDialog;
