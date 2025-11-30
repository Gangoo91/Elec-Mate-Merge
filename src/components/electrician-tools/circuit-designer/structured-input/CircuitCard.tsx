import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MobileInput } from "@/components/ui/mobile-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CircuitInput, DomesticLoadType, CommercialLoadType, IndustrialLoadType } from "@/types/installation-design";
import { Trash2, Copy, GripVertical, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DEFAULT_CABLE_LENGTHS } from "@/lib/circuit-templates";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

interface CircuitCardProps {
  circuit: CircuitInput;
  index: number;
  installationType: 'domestic' | 'commercial' | 'industrial';
  onUpdate: (updates: Partial<CircuitInput>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

const DOMESTIC_LOADS: { value: DomesticLoadType | 'other'; label: string }[] = [
  { value: 'socket', label: 'Socket Outlet / Ring Main' },
  { value: 'lighting', label: 'Lighting Circuit' },
  { value: 'cooker', label: 'Cooker' },
  { value: 'shower', label: 'Electric Shower' },
  { value: 'ev-charger', label: 'EV Charger' },
  { value: 'immersion', label: 'Immersion Heater' },
  { value: 'heating', label: 'Heating' },
  { value: 'smoke-alarm', label: 'Smoke Alarm' },
  { value: 'garage', label: 'Garage Supply' },
  { value: 'outdoor', label: 'Outdoor Supply' },
  { value: 'other', label: 'Other (Solar, Metering, etc.)' }
];

const COMMERCIAL_LOADS: { value: CommercialLoadType | 'other'; label: string }[] = [
  { value: 'office-sockets', label: 'Office Sockets' },
  { value: 'emergency-lighting', label: 'Emergency Lighting' },
  { value: 'hvac', label: 'HVAC Unit' },
  { value: 'server-room', label: 'Server Room / IT' },
  { value: 'kitchen-equipment', label: 'Commercial Kitchen' },
  { value: 'signage', label: 'Signage' },
  { value: 'fire-alarm', label: 'Fire Alarm System' },
  { value: 'access-control', label: 'Access Control' },
  { value: 'cctv', label: 'CCTV System' },
  { value: 'data-cabinet', label: 'Data Cabinet' },
  { value: 'other', label: 'Other (Solar, Metering, etc.)' }
];

const INDUSTRIAL_LOADS: { value: IndustrialLoadType | 'other'; label: string }[] = [
  { value: 'three-phase-motor', label: 'Three Phase Motor' },
  { value: 'machine-tool', label: 'Machine Tool' },
  { value: 'welding', label: 'Welding Equipment' },
  { value: 'conveyor', label: 'Conveyor System' },
  { value: 'extraction', label: 'Extraction System' },
  { value: 'control-panel', label: 'Control Panel' },
  { value: 'overhead-lighting', label: 'Overhead Lighting' },
  { value: 'workshop-sockets', label: 'Workshop Sockets' },
  { value: 'compressor', label: 'Air Compressor' },
  { value: 'production-line', label: 'Production Line' },
  { value: 'other', label: 'Other (Solar, Metering, etc.)' }
];

export const CircuitCard = ({ circuit, index, installationType, onUpdate, onDelete, onDuplicate }: CircuitCardProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const getLoadOptions = () => {
    switch (installationType) {
      case 'domestic':
        return DOMESTIC_LOADS;
      case 'commercial':
        return COMMERCIAL_LOADS;
      case 'industrial':
        return INDUSTRIAL_LOADS;
      default:
        return DOMESTIC_LOADS;
    }
  };

  const loadOptions = getLoadOptions();

  return (
    <Card className="p-2.5 sm:p-4 relative">
      {/* Compact Header */}
      <div className="flex items-center justify-between mb-2.5 sm:mb-3">
        <div className="flex items-center gap-1.5">
          <GripVertical className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
          <Badge variant="outline" className="text-[10px] sm:text-xs">Circuit {index + 1}</Badge>
          {circuit.phases === 'three' && (
            <Badge variant="secondary" className="text-[10px] sm:text-xs">3Φ</Badge>
          )}
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={onDuplicate} className="h-8 w-8 p-0">
            <Copy className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete} className="h-8 w-8 p-0 text-destructive">
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid gap-2.5 sm:gap-3">
        {/* Circuit Name */}
        <div className="space-y-1.5">
          <Label className="text-xs sm:text-sm font-medium">
            <span className="sm:hidden">Name *</span>
            <span className="hidden sm:inline">Circuit Name/Description *</span>
          </Label>
          <MobileInput
            value={circuit.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="e.g., Kitchen Ring Main"
            className="text-sm sm:text-base"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          {/* Load Type */}
          <div className="space-y-1.5">
            <Label className="text-xs sm:text-sm font-medium">Load Type</Label>
            <Select 
              value={circuit.loadType} 
              onValueChange={(value) => {
                const updates: Partial<CircuitInput> = { loadType: value as any };
                
                // Auto-fill cable length if currently empty
                if (!circuit.cableLength) {
                  const defaultLength = DEFAULT_CABLE_LENGTHS[installationType]?.[value as any];
                  if (defaultLength) {
                    updates.cableLength = defaultLength;
                  }
                }
                
                onUpdate(updates);
              }}
            >
              <SelectTrigger className="text-sm sm:text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {loadOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Phases */}
          <div className="space-y-1.5">
            <Label className="text-xs sm:text-sm font-medium">Phases *</Label>
            <Select 
              value={circuit.phases} 
              onValueChange={(v: 'single' | 'three') => onUpdate({ phases: v })}
            >
              <SelectTrigger className="text-sm sm:text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single Phase</SelectItem>
                <SelectItem value="three">Three Phase</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Circuit Topology (Ring vs Radial) - Show only for socket circuits */}
        {(circuit.loadType === 'socket' || circuit.loadType === 'office-sockets' || circuit.loadType === 'workshop-sockets') && (
          <div className="space-y-1.5">
            <Label className="text-xs sm:text-sm font-medium">Circuit Topology</Label>
            <Select 
              value={circuit.circuitTopology || 'auto'} 
              onValueChange={(v: 'ring' | 'radial' | 'auto') => onUpdate({ circuitTopology: v })}
            >
              <SelectTrigger className="text-sm sm:text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto-detect (AI decides)</SelectItem>
                <SelectItem value="ring">Ring Final Circuit (32A, 2.5mm²)</SelectItem>
                <SelectItem value="radial">Radial Circuit (MCB based on load)</SelectItem>
              </SelectContent>
            </Select>
            {circuit.circuitTopology === 'ring' && (
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                Ring finals use 2.5mm² cable with 32A RCBO (BS 7671 Appendix 15)
              </p>
            )}
            {circuit.circuitTopology === 'radial' && (
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                Radial circuits: 20A uses 2.5mm², 32A requires 4mm² minimum
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
          {/* Load Power */}
          <div className="space-y-1.5">
            <Label className="text-xs sm:text-sm font-medium">
              <span className="sm:hidden">Power (W) *</span>
              <span className="hidden sm:inline">Load Power (W) *</span>
            </Label>
            <MobileInput
              type="number"
              min="1"
              step="1"
              value={circuit.loadPower || ''}
              onChange={(e) => onUpdate({ loadPower: e.target.value ? Number(e.target.value) : undefined })}
              placeholder="Ring: 7360W | Lighting: 1000W"
              className="text-sm sm:text-base"
            />
          </div>

          {/* Cable Length */}
          <div className="space-y-1.5">
            <Label className="text-xs sm:text-sm font-medium">
              <span className="sm:hidden">Cable (m)</span>
              <span className="hidden sm:inline">Cable Run Length (m)</span>
            </Label>
            <MobileInput
              type="number"
              min="1"
              step="0.5"
              value={circuit.cableLength || ''}
              onChange={(e) => onUpdate({ cableLength: e.target.value ? Number(e.target.value) : undefined })}
              placeholder="e.g., 25"
              className="text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Collapsible Advanced Options */}
        <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced} className="border-t border-border/50 pt-2.5">
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full text-xs h-8 text-muted-foreground hover:text-foreground gap-1"
            >
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
              {showAdvanced ? 'Hide' : 'Show'} Advanced Options
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2.5 mt-2.5">
            {/* Special Location */}
            <div className="space-y-1.5">
              <Label className="text-xs sm:text-sm font-medium">Special Location</Label>
              <Select 
                value={circuit.specialLocation || 'none'} 
                onValueChange={(v) => onUpdate({ specialLocation: v as any })}
              >
                <SelectTrigger className="text-sm sm:text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="bathroom">Bathroom (Zones apply)</SelectItem>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                  <SelectItem value="underground">Underground</SelectItem>
                  <SelectItem value="kitchen">Kitchen (RCD required)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <Label className="text-xs sm:text-sm font-medium">Additional Notes</Label>
              <Textarea
                value={circuit.notes || ''}
                onChange={(e) => onUpdate({ notes: e.target.value })}
                placeholder="Special requirements or considerations..."
                className="min-h-[50px] text-sm sm:text-base resize-none"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </Card>
  );
};
