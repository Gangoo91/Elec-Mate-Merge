
import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
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
import MultiboardSetup from '@/components/testing/MultiboardSetup';
import { DistributionBoard, createMainBoard, MAIN_BOARD_ID } from '@/types/distributionBoard';

interface ElectricalInstallationSectionProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const ElectricalInstallationSection = ({ formData, onUpdate }: ElectricalInstallationSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);

  // Migrate legacy single-board data to multi-board format
  const boards: DistributionBoard[] = useMemo(() => {
    // If we already have distributionBoards, use them
    if (formData.distributionBoards && formData.distributionBoards.length > 0) {
      return formData.distributionBoards;
    }

    // Otherwise, create main board from legacy fields
    const mainBoard = createMainBoard();
    if (formData.cuLocation) mainBoard.location = formData.cuLocation;
    if (formData.cuManufacturer) mainBoard.make = formData.cuManufacturer;
    if (formData.cuType) mainBoard.type = formData.cuType as any;
    if (formData.boardSize) {
      const sizeMatch = formData.boardSize.match(/(\d+)/);
      if (sizeMatch) mainBoard.totalWays = parseInt(sizeMatch[1]);
    }
    return [mainBoard];
  }, [formData.distributionBoards, formData.cuLocation, formData.cuManufacturer, formData.cuType, formData.boardSize]);

  // Handle board changes - sync to both new and legacy fields for backward compatibility
  const handleBoardsChange = (newBoards: DistributionBoard[]) => {
    onUpdate('distributionBoards', newBoards);

    // Also update legacy fields from main board for backward compatibility
    const mainBoard = newBoards.find(b => b.id === MAIN_BOARD_ID) || newBoards[0];
    if (mainBoard) {
      if (mainBoard.location) onUpdate('cuLocation', mainBoard.location);
      if (mainBoard.make) onUpdate('cuManufacturer', mainBoard.make);
      if (mainBoard.type) onUpdate('cuType', mainBoard.type);
      if (mainBoard.totalWays) onUpdate('boardSize', `${mainBoard.totalWays}-way`);
    }
  };

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
    <Card className="border border-border/30 bg-card overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <SectionHeader
          title="Electrical Installation Details"
          icon={Cable}
          isOpen={isOpen}
          color="orange-500"
        />
        <CollapsibleContent>
          <CardContent className="p-4 space-y-6">
            {/* Distribution Boards - Multi-board support */}
            <MultiboardSetup
              boards={boards}
              onBoardsChange={handleBoardsChange}
            />

            <Separator className="bg-border/30" />

            {/* Intake Cable Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-elec-yellow"></div>
                Intake Cable
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="intakeCableSize">Intake Cable Size <span className="text-elec-yellow">*</span></Label>
                  <Select value={formData.intakeCableSize || ''} onValueChange={(value) => onUpdate('intakeCableSize', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cable size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="16mm">16mm²</SelectItem>
                      <SelectItem value="25mm">25mm²</SelectItem>
                      <SelectItem value="35mm">35mm²</SelectItem>
                      <SelectItem value="50mm">50mm²</SelectItem>
                      <SelectItem value="70mm">70mm²</SelectItem>
                      <SelectItem value="95mm">95mm²</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="intakeCableType">Intake Cable Type <span className="text-elec-yellow">*</span></Label>
                  <Select value={formData.intakeCableType || ''} onValueChange={(value) => onUpdate('intakeCableType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cable type" />
                    </SelectTrigger>
                    <SelectContent>
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

            <Separator className="bg-border/30" />

            {/* Tails Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-elec-yellow"></div>
                Meter Tails
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="tailsSize">Tails Size <span className="text-elec-yellow">*</span></Label>
                  <Select value={formData.tailsSize || ''} onValueChange={(value) => onUpdate('tailsSize', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tails size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="16mm">16mm²</SelectItem>
                      <SelectItem value="25mm">25mm²</SelectItem>
                      <SelectItem value="35mm">35mm²</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="tailsLength">Approximate Length (m)</Label>
                  <Input
                    id="tailsLength"
                    value={formData.tailsLength || ''}
                    onChange={(e) => onUpdate('tailsLength', e.target.value)}
                    placeholder="e.g., 3"
                    type="number"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>
            </div>

          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default ElectricalInstallationSection;
