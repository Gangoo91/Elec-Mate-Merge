
import React, { useState } from 'react';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { SectionHeader } from '@/components/ui/section-header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Copy, Palette, Calculator, Cable } from 'lucide-react';
import CircuitTemplateSelector from './CircuitTemplateSelector';

interface ElectricalInstallationSectionProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const ElectricalInstallationSection = ({ formData, onUpdate }: ElectricalInstallationSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);

  const addCircuit = () => {
    const circuits = formData.circuits || [];
    const nextCircuitNumber = circuits.length > 0 
      ? String(Math.max(...circuits.map((c: any) => parseInt(c.circuitNumber) || 0)) + 1)
      : '1';
    
    const newCircuit = {
      id: Date.now(),
      circuitNumber: nextCircuitNumber,
      cableSize: '',
      cableType: '',
      protectiveDeviceRating: '',
      circuitDescription: ''
    };
    onUpdate('circuits', [...circuits, newCircuit]);
  };

  const duplicateCircuit = (circuitToDuplicate: any) => {
    const circuits = formData.circuits || [];
    const nextCircuitNumber = String(Math.max(...circuits.map((c: any) => parseInt(c.circuitNumber) || 0)) + 1);
    
    const newCircuit = {
      ...circuitToDuplicate,
      id: Date.now(),
      circuitNumber: nextCircuitNumber,
    };
    onUpdate('circuits', [...circuits, newCircuit]);
  };

  const removeCircuit = (circuitId: number) => {
    const circuits = formData.circuits || [];
    onUpdate('circuits', circuits.filter((circuit: any) => circuit.id !== circuitId));
  };

  const updateCircuit = (circuitId: number, field: string, value: string) => {
    const circuits = formData.circuits || [];
    const updatedCircuits = circuits.map((circuit: any) => 
      circuit.id === circuitId ? { ...circuit, [field]: value } : circuit
    );
    onUpdate('circuits', updatedCircuits);
  };

  const handleTemplateSelect = (templateCircuits: any[]) => {
    onUpdate('circuits', templateCircuits);
  };

  // Auto-suggest board size based on number of circuits
  const suggestedBoardSize = () => {
    const circuitCount = (formData.circuits || []).length;
    if (circuitCount <= 4) return '6-way';
    if (circuitCount <= 6) return '8-way';
    if (circuitCount <= 8) return '10-way';
    if (circuitCount <= 10) return '12-way';
    if (circuitCount <= 14) return '16-way';
    if (circuitCount <= 16) return '18-way';
    return '24-way';
  };

  // Get cable size recommendations
  const getCableSizeRecommendation = (deviceRating: string) => {
    const rating = parseInt(deviceRating);
    if (rating <= 6) return '1.5mm';
    if (rating <= 16) return '2.5mm';
    if (rating <= 25) return '4.0mm';
    if (rating <= 32) return '6.0mm';
    if (rating <= 40) return '10mm';
    return '16mm';
  };

  return (
    <div className="eicr-section-card">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <SectionHeader
          title="Electrical Installation Details"
          icon={Cable}
          isOpen={isOpen}
          color="green-500"
        />
        <CollapsibleContent>
          <div className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-5">
        {/* Consumer Unit Details */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-border pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
            Consumer Unit / Distribution Board
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cuLocation">Location *</Label>
              <MobileSelectPicker
                value={formData.cuLocation || ''}
                onValueChange={(value) => onUpdate('cuLocation', value)}
                options={[
                  { value: 'Hallway cupboard', label: 'Hallway cupboard' },
                  { value: 'Under stairs cupboard', label: 'Under stairs cupboard' },
                  { value: 'Garage', label: 'Garage' },
                  { value: 'Utility room', label: 'Utility room' },
                  { value: 'Kitchen', label: 'Kitchen' },
                  { value: 'Entrance hallway', label: 'Entrance hallway' },
                  { value: 'Meter cupboard', label: 'Meter cupboard' },
                  { value: 'Airing cupboard', label: 'Airing cupboard' },
                  { value: 'Basement', label: 'Basement' },
                  { value: 'Outside (external box)', label: 'Outside (external box)' },
                  { value: 'Loft', label: 'Loft' },
                  { value: 'Other', label: 'Other' },
                ]}
                placeholder="Select location"
                title="Consumer Unit Location"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cuManufacturer">Manufacturer *</Label>
              <MobileSelectPicker
                value={formData.cuManufacturer || ''}
                onValueChange={(value) => onUpdate('cuManufacturer', value)}
                options={[
                  { value: 'Hager', label: 'Hager' },
                  { value: 'MK Electric', label: 'MK Electric' },
                  { value: 'Schneider Electric', label: 'Schneider Electric' },
                  { value: 'Fusebox', label: 'Fusebox' },
                  { value: 'Elucian', label: 'Elucian' },
                  { value: 'Eaton', label: 'Eaton' },
                  { value: 'Wylex', label: 'Wylex' },
                  { value: 'BG Electrical', label: 'BG Electrical' },
                  { value: 'Lewden', label: 'Lewden' },
                  { value: 'Crabtree', label: 'Crabtree' },
                  { value: 'ABB', label: 'ABB' },
                  { value: 'Legrand', label: 'Legrand' },
                  { value: 'Other', label: 'Other' },
                ]}
                placeholder="Select manufacturer"
                title="Consumer Unit Manufacturer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cuType">Type *</Label>
              <MobileSelectPicker
                value={formData.cuType || ''}
                onValueChange={(value) => onUpdate('cuType', value)}
                options={[
                  { value: 'metal', label: 'Metal Enclosure' },
                  { value: 'plastic', label: 'Plastic Enclosure' },
                  { value: 'metal-clad', label: 'Metal Clad' },
                ]}
                placeholder="Select type"
                title="Consumer Unit Type"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="boardSize">Board Size / Number of Ways *</Label>
              <MobileSelectPicker
                value={formData.boardSize || ''}
                onValueChange={(value) => onUpdate('boardSize', value)}
                options={[
                  { value: '4-way', label: '4 Way' },
                  { value: '6-way', label: '6 Way' },
                  { value: '8-way', label: '8 Way' },
                  { value: '10-way', label: '10 Way' },
                  { value: '12-way', label: '12 Way' },
                  { value: '16-way', label: '16 Way' },
                  { value: '18-way', label: '18 Way' },
                  { value: '24-way', label: '24 Way' },
                ]}
                placeholder="Select board size"
                title="Board Size"
              />
              {formData.circuits && formData.circuits.length > 0 && (
                <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-emerald-400"></div>
                  Suggested: {suggestedBoardSize()} for {formData.circuits.length} circuits
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="intakeCableSize">Intake Cable Size *</Label>
              <MobileSelectPicker
                value={formData.intakeCableSize || ''}
                onValueChange={(value) => onUpdate('intakeCableSize', value)}
                options={[
                  { value: '16mm', label: '16mm²' },
                  { value: '25mm', label: '25mm²' },
                  { value: '35mm', label: '35mm²' },
                  { value: '50mm', label: '50mm²' },
                  { value: '70mm', label: '70mm²' },
                  { value: '95mm', label: '95mm²' },
                ]}
                placeholder="Select cable size"
                title="Intake Cable Size"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="intakeCableType">Intake Cable Type *</Label>
              <MobileSelectPicker
                value={formData.intakeCableType || ''}
                onValueChange={(value) => onUpdate('intakeCableType', value)}
                options={[
                  { value: 'swa', label: 'Steel Wire Armoured (SWA)' },
                  { value: 'pvc-singles', label: 'PVC Singles' },
                  { value: 'xlpe', label: 'XLPE' },
                  { value: 'concentric', label: 'Concentric Cable' },
                  { value: 'other', label: 'Other' },
                ]}
                placeholder="Select cable type"
                title="Intake Cable Type"
              />
            </div>
          </div>
        </div>

        {/* Tails Information */}
        <div className="space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-border pb-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
            Meter Tails
          </h3>
          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tailsSize">Tails Size *</Label>
              <MobileSelectPicker
                value={formData.tailsSize || ''}
                onValueChange={(value) => onUpdate('tailsSize', value)}
                options={[
                  { value: '16mm', label: '16mm²' },
                  { value: '25mm', label: '25mm²' },
                  { value: '35mm', label: '35mm²' },
                ]}
                placeholder="Select tails size"
                title="Tails Size"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tailsLength">Approximate Length (m)</Label>
              <Input
                id="tailsLength"
                value={formData.tailsLength || ''}
                onChange={(e) => onUpdate('tailsLength', e.target.value)}
                placeholder="e.g., 3"
                type="number"
                min="0"
                step="0.1"
                className="h-11 text-base touch-manipulation border-white/30 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default ElectricalInstallationSection;
