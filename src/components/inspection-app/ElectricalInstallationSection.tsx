
import React, { useState } from 'react';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { SectionHeader } from '@/components/ui/section-header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
              <Select value={formData.cuLocation || ''} onValueChange={(value) => onUpdate('cuLocation', value)}>
                <SelectTrigger className="h-11 touch-manipulation border-white/30 focus:border-emerald-500 focus:ring-emerald-500 data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                  <SelectItem value="Hallway cupboard">Hallway cupboard</SelectItem>
                  <SelectItem value="Under stairs cupboard">Under stairs cupboard</SelectItem>
                  <SelectItem value="Garage">Garage</SelectItem>
                  <SelectItem value="Utility room">Utility room</SelectItem>
                  <SelectItem value="Kitchen">Kitchen</SelectItem>
                  <SelectItem value="Entrance hallway">Entrance hallway</SelectItem>
                  <SelectItem value="Meter cupboard">Meter cupboard</SelectItem>
                  <SelectItem value="Airing cupboard">Airing cupboard</SelectItem>
                  <SelectItem value="Basement">Basement</SelectItem>
                  <SelectItem value="Outside (external box)">Outside (external box)</SelectItem>
                  <SelectItem value="Loft">Loft</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cuManufacturer">Manufacturer *</Label>
              <Select value={formData.cuManufacturer || ''} onValueChange={(value) => onUpdate('cuManufacturer', value)}>
                <SelectTrigger className="h-11 touch-manipulation border-white/30 focus:border-emerald-500 focus:ring-emerald-500 data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                  <SelectValue placeholder="Select manufacturer" />
                </SelectTrigger>
                <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                  <SelectItem value="Hager">Hager</SelectItem>
                  <SelectItem value="MK Electric">MK Electric</SelectItem>
                  <SelectItem value="Schneider Electric">Schneider Electric</SelectItem>
                  <SelectItem value="Fusebox">Fusebox</SelectItem>
                  <SelectItem value="Elucian">Elucian</SelectItem>
                  <SelectItem value="Eaton">Eaton</SelectItem>
                  <SelectItem value="Wylex">Wylex</SelectItem>
                  <SelectItem value="BG Electrical">BG Electrical</SelectItem>
                  <SelectItem value="Lewden">Lewden</SelectItem>
                  <SelectItem value="Crabtree">Crabtree</SelectItem>
                  <SelectItem value="ABB">ABB</SelectItem>
                  <SelectItem value="Legrand">Legrand</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cuType">Type *</Label>
              <Select value={formData.cuType || ''} onValueChange={(value) => onUpdate('cuType', value)}>
                <SelectTrigger className="h-11 touch-manipulation border-white/30 focus:border-emerald-500 focus:ring-emerald-500 data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                  <SelectItem value="metal">Metal Enclosure</SelectItem>
                  <SelectItem value="plastic">Plastic Enclosure</SelectItem>
                  <SelectItem value="metal-clad">Metal Clad</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="boardSize">Board Size / Number of Ways *</Label>
              <Select value={formData.boardSize || ''} onValueChange={(value) => onUpdate('boardSize', value)}>
                <SelectTrigger className="h-11 touch-manipulation border-white/30 focus:border-emerald-500 focus:ring-emerald-500 data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                  <SelectValue placeholder="Select board size" />
                </SelectTrigger>
                <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                  <SelectItem value="4-way">4 Way</SelectItem>
                  <SelectItem value="6-way">6 Way</SelectItem>
                  <SelectItem value="8-way">8 Way</SelectItem>
                  <SelectItem value="10-way">10 Way</SelectItem>
                  <SelectItem value="12-way">12 Way</SelectItem>
                  <SelectItem value="16-way">16 Way</SelectItem>
                  <SelectItem value="18-way">18 Way</SelectItem>
                  <SelectItem value="24-way">24 Way</SelectItem>
                </SelectContent>
              </Select>
              {formData.circuits && formData.circuits.length > 0 && (
                <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-emerald-400"></div>
                  Suggested: {suggestedBoardSize()} for {formData.circuits.length} circuits
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="intakeCableSize">Intake Cable Size *</Label>
              <Select value={formData.intakeCableSize || ''} onValueChange={(value) => onUpdate('intakeCableSize', value)}>
                <SelectTrigger className="h-11 touch-manipulation border-white/30 focus:border-emerald-500 focus:ring-emerald-500 data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                  <SelectValue placeholder="Select cable size" />
                </SelectTrigger>
                <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                  <SelectItem value="16mm">16mm²</SelectItem>
                  <SelectItem value="25mm">25mm²</SelectItem>
                  <SelectItem value="35mm">35mm²</SelectItem>
                  <SelectItem value="50mm">50mm²</SelectItem>
                  <SelectItem value="70mm">70mm²</SelectItem>
                  <SelectItem value="95mm">95mm²</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="intakeCableType">Intake Cable Type *</Label>
              <Select value={formData.intakeCableType || ''} onValueChange={(value) => onUpdate('intakeCableType', value)}>
                <SelectTrigger className="h-11 touch-manipulation border-white/30 focus:border-emerald-500 focus:ring-emerald-500 data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                  <SelectValue placeholder="Select cable type" />
                </SelectTrigger>
                <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                  <SelectItem value="swa">Steel Wire Armoured (SWA)</SelectItem>
                  <SelectItem value="pvc-singles">PVC Singles</SelectItem>
                  <SelectItem value="xlpe">XLPE</SelectItem>
                  <SelectItem value="concentric">Concentric Cable</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
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
              <Select value={formData.tailsSize || ''} onValueChange={(value) => onUpdate('tailsSize', value)}>
                <SelectTrigger className="h-11 touch-manipulation border-white/30 focus:border-emerald-500 focus:ring-emerald-500 data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                  <SelectValue placeholder="Select tails size" />
                </SelectTrigger>
                <SelectContent className="z-[100] max-w-[calc(100vw-2rem)]">
                  <SelectItem value="16mm">16mm²</SelectItem>
                  <SelectItem value="25mm">25mm²</SelectItem>
                  <SelectItem value="35mm">35mm²</SelectItem>
                </SelectContent>
              </Select>
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
