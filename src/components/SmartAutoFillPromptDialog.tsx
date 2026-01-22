import React, { useState, useEffect, useMemo } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Zap, Lightbulb, Plug, ChefHat, Droplets, Car, Flame, Home,
  Building2, Server, Wind, Cpu, Factory, Wrench, DoorOpen, Shield,
  X, Check, Sparkles
} from 'lucide-react';
import { TestResult } from '@/types/testResult';

interface SmartAutoFillPromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUseAutoFill: (circuitType?: string, suggestions?: Partial<TestResult>) => void;
  onSkip: () => void;
  circuitNumber: string;
}

// Circuit types with auto-fill suggestions (BS 7671 Table 41.3 compliant)
const circuitTypes = [
  // Lighting circuits
  { type: 'Downstairs Lights', icon: Lightbulb, category: 'Lighting', suggestions: { liveSize: '1.5mm', cpcSize: '1.0mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'B', protectiveDeviceRating: '6', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '6', maxZs: '7.28', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },
  { type: 'Upstairs Lights', icon: Lightbulb, category: 'Lighting', suggestions: { liveSize: '1.5mm', cpcSize: '1.0mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'B', protectiveDeviceRating: '6', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '6', maxZs: '7.28', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },
  { type: 'Kitchen Lights', icon: Lightbulb, category: 'Lighting', suggestions: { liveSize: '1.5mm', cpcSize: '1.0mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'B', protectiveDeviceRating: '10', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '6', maxZs: '4.37', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },
  { type: 'Outdoor Lights', icon: Lightbulb, category: 'Lighting', suggestions: { liveSize: '1.5mm', cpcSize: '1.0mm', protectiveDeviceType: 'RCBO', protectiveDeviceCurve: 'B', protectiveDeviceRating: '6', bsStandard: 'BS EN 61009', protectiveDeviceKaRating: '6', maxZs: '7.28', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },

  // Socket circuits
  { type: 'Downstairs Ring', icon: Plug, category: 'Sockets', suggestions: { liveSize: '2.5mm', cpcSize: '1.5mm', protectiveDeviceType: 'RCBO', protectiveDeviceCurve: 'B', protectiveDeviceRating: '32', bsStandard: 'BS EN 61009', protectiveDeviceKaRating: '6', maxZs: '1.37', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },
  { type: 'Upstairs Ring', icon: Plug, category: 'Sockets', suggestions: { liveSize: '2.5mm', cpcSize: '1.5mm', protectiveDeviceType: 'RCBO', protectiveDeviceCurve: 'B', protectiveDeviceRating: '32', bsStandard: 'BS EN 61009', protectiveDeviceKaRating: '6', maxZs: '1.37', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },
  { type: 'Kitchen Ring', icon: Plug, category: 'Sockets', suggestions: { liveSize: '2.5mm', cpcSize: '1.5mm', protectiveDeviceType: 'RCBO', protectiveDeviceCurve: 'B', protectiveDeviceRating: '32', bsStandard: 'BS EN 61009', protectiveDeviceKaRating: '6', maxZs: '1.37', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },
  { type: 'Utility Radial', icon: Zap, category: 'Sockets', suggestions: { liveSize: '2.5mm', cpcSize: '1.5mm', protectiveDeviceType: 'RCBO', protectiveDeviceCurve: 'B', protectiveDeviceRating: '20', bsStandard: 'BS EN 61009', protectiveDeviceKaRating: '6', maxZs: '2.19', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },

  // Fixed appliances
  { type: 'Cooker', icon: ChefHat, category: 'Appliances', suggestions: { liveSize: '6.0mm', cpcSize: '2.5mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'B', protectiveDeviceRating: '32', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '6', maxZs: '1.37', pointsServed: '1', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },
  { type: 'Shower', icon: Droplets, category: 'Appliances', suggestions: { liveSize: '10mm', cpcSize: '4.0mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'B', protectiveDeviceRating: '40', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '6', maxZs: '1.09', pointsServed: '1', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },
  { type: 'Immersion', icon: Droplets, category: 'Appliances', suggestions: { liveSize: '2.5mm', cpcSize: '1.5mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'B', protectiveDeviceRating: '16', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '6', maxZs: '2.73', pointsServed: '1', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },

  // Modern circuits
  { type: 'EV Charger', icon: Car, category: 'Modern', suggestions: { liveSize: '6.0mm', cpcSize: '2.5mm', protectiveDeviceType: 'RCBO', protectiveDeviceCurve: 'C', protectiveDeviceRating: '32', bsStandard: 'BS EN 61009', protectiveDeviceKaRating: '6', maxZs: '0.68', pointsServed: '1', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },
  { type: 'Heat Pump', icon: Home, category: 'Modern', suggestions: { liveSize: '4.0mm', cpcSize: '1.5mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'B', protectiveDeviceRating: '25', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '6', maxZs: '1.75', pointsServed: '1', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },
  { type: 'Solar PV', icon: Building2, category: 'Modern', suggestions: { liveSize: '4.0mm', cpcSize: '1.5mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'B', protectiveDeviceRating: '16', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '6', maxZs: '2.73', pointsServed: '1', referenceMethod: 'C', typeOfWiring: 'Twin & Earth Cable' } },
  { type: 'Heating', icon: Flame, category: 'Modern', suggestions: { liveSize: '1.5mm', cpcSize: '1.0mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'B', protectiveDeviceRating: '6', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '6', maxZs: '7.28', pointsServed: '1', referenceMethod: 'A', typeOfWiring: 'Twin & Earth Cable' } },

  // Commercial
  { type: 'Office Lights', icon: Lightbulb, category: 'Commercial', suggestions: { liveSize: '2.5mm', cpcSize: '2.5mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'B', protectiveDeviceRating: '16', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '10', maxZs: '2.73', referenceMethod: 'C', typeOfWiring: 'SWA Cable' } },
  { type: 'Office Sockets', icon: Plug, category: 'Commercial', suggestions: { liveSize: '4.0mm', cpcSize: '4.0mm', protectiveDeviceType: 'RCBO', protectiveDeviceCurve: 'B', protectiveDeviceRating: '32', bsStandard: 'BS EN 61009', protectiveDeviceKaRating: '10', maxZs: '1.37', referenceMethod: 'C', typeOfWiring: 'SWA Cable' } },
  { type: 'Server Room', icon: Server, category: 'Commercial', suggestions: { liveSize: '4.0mm', cpcSize: '4.0mm', protectiveDeviceType: 'RCBO', protectiveDeviceCurve: 'C', protectiveDeviceRating: '20', bsStandard: 'BS EN 61009', protectiveDeviceKaRating: '10', maxZs: '1.09', referenceMethod: 'C', typeOfWiring: 'SWA Cable' } },
  { type: 'A/C Unit', icon: Wind, category: 'Commercial', suggestions: { liveSize: '4.0mm', cpcSize: '4.0mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'C', protectiveDeviceRating: '20', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '10', maxZs: '1.09', pointsServed: '1', referenceMethod: 'C', typeOfWiring: 'SWA Cable' } },
  { type: 'Emergency Lights', icon: Shield, category: 'Commercial', suggestions: { liveSize: '1.5mm', cpcSize: '1.5mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'B', protectiveDeviceRating: '6', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '10', maxZs: '7.28', referenceMethod: 'C', typeOfWiring: 'SWA Cable' } },
  { type: 'Fire Alarm', icon: Flame, category: 'Commercial', suggestions: { liveSize: '1.5mm', cpcSize: '1.5mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'B', protectiveDeviceRating: '6', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '10', maxZs: '7.28', pointsServed: '1', referenceMethod: 'C', typeOfWiring: 'Fire Resistant Cable' } },

  // Industrial
  { type: '3-Phase Motor', icon: Factory, category: 'Industrial', suggestions: { liveSize: '4.0mm', cpcSize: '4.0mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'D', protectiveDeviceRating: '16', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '10', maxZs: '0.68', pointsServed: '1', referenceMethod: 'E', typeOfWiring: 'SWA Cable' } },
  { type: 'Machinery', icon: Wrench, category: 'Industrial', suggestions: { liveSize: '10mm', cpcSize: '10mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'D', protectiveDeviceRating: '40', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '10', maxZs: '0.27', pointsServed: '1', referenceMethod: 'E', typeOfWiring: 'SWA Cable' } },
  { type: 'Workshop Sockets', icon: Plug, category: 'Industrial', suggestions: { liveSize: '6.0mm', cpcSize: '6.0mm', protectiveDeviceType: 'RCBO', protectiveDeviceCurve: 'C', protectiveDeviceRating: '32', bsStandard: 'BS EN 61009', protectiveDeviceKaRating: '10', maxZs: '0.68', referenceMethod: 'C', typeOfWiring: 'SWA Cable' } },
  { type: 'Compressor', icon: Wind, category: 'Industrial', suggestions: { liveSize: '10mm', cpcSize: '10mm', protectiveDeviceType: 'MCB', protectiveDeviceCurve: 'D', protectiveDeviceRating: '32', bsStandard: 'BS EN 60898', protectiveDeviceKaRating: '10', maxZs: '0.34', pointsServed: '1', referenceMethod: 'E', typeOfWiring: 'SWA Cable' } },
];

// Category definitions with icons and colours
const categories = [
  { name: 'Lighting', icon: Lightbulb, color: 'text-yellow-400', bg: 'bg-yellow-500/10 hover:bg-yellow-500/20 border-yellow-500/30' },
  { name: 'Sockets', icon: Plug, color: 'text-blue-400', bg: 'bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/30' },
  { name: 'Appliances', icon: ChefHat, color: 'text-orange-400', bg: 'bg-orange-500/10 hover:bg-orange-500/20 border-orange-500/30' },
  { name: 'Modern', icon: Car, color: 'text-green-400', bg: 'bg-green-500/10 hover:bg-green-500/20 border-green-500/30' },
  { name: 'Commercial', icon: Building2, color: 'text-purple-400', bg: 'bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30' },
  { name: 'Industrial', icon: Factory, color: 'text-red-400', bg: 'bg-red-500/10 hover:bg-red-500/20 border-red-500/30' },
];

const SmartAutoFillPromptDialog: React.FC<SmartAutoFillPromptDialogProps> = ({
  open,
  onOpenChange,
  onUseAutoFill,
  onSkip,
  circuitNumber
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCircuitType, setSelectedCircuitType] = useState<string>('');

  // Reset when dialog opens/closes
  useEffect(() => {
    if (!open) {
      setSelectedCategory('');
      setSelectedCircuitType('');
    }
  }, [open]);

  const filteredCircuits = useMemo(() => {
    if (!selectedCategory) return [];
    return circuitTypes.filter(ct => ct.category === selectedCategory);
  }, [selectedCategory]);

  const selectedConfig = circuitTypes.find(ct => ct.type === selectedCircuitType);
  const selectedCategoryData = categories.find(c => c.name === selectedCategory);

  const handleSelectCircuit = (type: string) => {
    setSelectedCircuitType(type);
  };

  const handleCreate = () => {
    if (selectedCircuitType && selectedConfig) {
      onUseAutoFill(selectedConfig.type, selectedConfig.suggestions);
    } else {
      onUseAutoFill();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 bg-card border-border/50 overflow-hidden max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/30 bg-gradient-to-r from-amber-500/10 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Quick Add Circuit</h2>
              <p className="text-xs text-muted-foreground">C{circuitNumber} • BS 7671 compliant</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Step 1: Category Selection */}
          <div>
            <p className="text-xs font-semibold text-white/70 uppercase tracking-wide mb-3">
              1. Choose Category
            </p>
            <div className="grid grid-cols-3 gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isSelected = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.name}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setSelectedCircuitType('');
                    }}
                    className={`p-3 rounded-xl border transition-all touch-manipulation active:scale-95 flex flex-col items-center gap-1.5 ${
                      isSelected
                        ? `${cat.bg} border-2`
                        : 'bg-card border-border/50 hover:bg-muted/50'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isSelected ? cat.color : 'text-white/70'}`} />
                    <span className={`text-xs font-medium ${isSelected ? 'text-foreground' : 'text-white'}`}>
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Circuit Type Selection */}
          {selectedCategory && (
            <div>
              <p className="text-xs font-semibold text-white/70 uppercase tracking-wide mb-3">
                2. Select Circuit Type
              </p>
              <div className="grid grid-cols-2 gap-2">
                {filteredCircuits.map((circuit) => {
                  const Icon = circuit.icon;
                  const isSelected = selectedCircuitType === circuit.type;
                  return (
                    <button
                      key={circuit.type}
                      onClick={() => handleSelectCircuit(circuit.type)}
                      className={`p-3 rounded-xl border transition-all touch-manipulation active:scale-95 flex items-center gap-3 text-left ${
                        isSelected
                          ? `${selectedCategoryData?.bg} border-2`
                          : 'bg-card border-border/50 hover:bg-muted/50'
                      }`}
                    >
                      <Icon className={`h-4 w-4 flex-shrink-0 ${isSelected ? selectedCategoryData?.color : 'text-white/70'}`} />
                      <span className={`text-sm font-medium ${isSelected ? 'text-foreground' : 'text-white'}`}>
                        {circuit.type}
                      </span>
                      {isSelected && (
                        <Check className={`h-4 w-4 ml-auto ${selectedCategoryData?.color}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Preview */}
          {selectedConfig && (
            <div className={`p-4 rounded-xl border-2 ${selectedCategoryData?.bg}`}>
              <div className="flex items-center gap-2 mb-3">
                <selectedConfig.icon className={`h-4 w-4 ${selectedCategoryData?.color}`} />
                <span className="font-semibold text-foreground text-sm">{selectedConfig.type}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-white/60">Cable:</span>
                  <span className="text-white font-medium">{selectedConfig.suggestions.liveSize}/{selectedConfig.suggestions.cpcSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Protection:</span>
                  <span className="text-white font-medium">{selectedConfig.suggestions.protectiveDeviceType} {selectedConfig.suggestions.protectiveDeviceCurve}{selectedConfig.suggestions.protectiveDeviceRating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Breaking:</span>
                  <span className="text-white font-medium">{selectedConfig.suggestions.protectiveDeviceKaRating}kA</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/30 bg-muted/30 flex gap-3">
          <Button
            variant="outline"
            onClick={onSkip}
            className="flex-1 h-12 rounded-xl font-medium touch-manipulation active:scale-[0.98]"
          >
            Skip
          </Button>
          <Button
            onClick={handleCreate}
            className={`flex-1 h-12 rounded-xl font-medium touch-manipulation active:scale-[0.98] gap-2 ${
              selectedCircuitType
                ? 'bg-amber-500 hover:bg-amber-600 text-black'
                : 'bg-muted hover:bg-muted/80 text-foreground'
            }`}
          >
            {selectedCircuitType ? (
              <>
                <Check className="h-4 w-4" />
                Create {selectedConfig?.type}
              </>
            ) : (
              <>
                <Zap className="h-4 w-4" />
                Create Empty
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SmartAutoFillPromptDialog;
