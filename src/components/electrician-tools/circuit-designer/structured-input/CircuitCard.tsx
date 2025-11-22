import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MobileInput } from "@/components/ui/mobile-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CircuitInput, DomesticLoadType, CommercialLoadType, IndustrialLoadType } from "@/types/installation-design";
import { Trash2, Copy, GripVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DEFAULT_CABLE_LENGTHS } from "@/lib/circuit-templates";

interface CircuitCardProps {
  circuit: CircuitInput;
  index: number;
  installationType: 'domestic' | 'commercial' | 'industrial';
  onUpdate: (updates: Partial<CircuitInput>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

const DOMESTIC_LOADS: { value: DomesticLoadType; label: string }[] = [
  { value: 'socket', label: 'Socket Outlet / Ring Main' },
  { value: 'lighting', label: 'Lighting Circuit' },
  { value: 'cooker', label: 'Cooker' },
  { value: 'shower', label: 'Electric Shower' },
  { value: 'ev-charger', label: 'EV Charger' },
  { value: 'immersion', label: 'Immersion Heater' },
  { value: 'heating', label: 'Heating' },
  { value: 'smoke-alarm', label: 'Smoke Alarm' },
  { value: 'garage', label: 'Garage Supply' },
  { value: 'outdoor', label: 'Outdoor Supply' }
];

const COMMERCIAL_LOADS: { value: CommercialLoadType; label: string }[] = [
  { value: 'office-sockets', label: 'Office Sockets' },
  { value: 'emergency-lighting', label: 'Emergency Lighting' },
  { value: 'hvac', label: 'HVAC Unit' },
  { value: 'server-room', label: 'Server Room / IT' },
  { value: 'kitchen-equipment', label: 'Commercial Kitchen' },
  { value: 'signage', label: 'Signage' },
  { value: 'fire-alarm', label: 'Fire Alarm System' },
  { value: 'access-control', label: 'Access Control' },
  { value: 'cctv', label: 'CCTV System' },
  { value: 'data-cabinet', label: 'Data Cabinet' }
];

const INDUSTRIAL_LOADS: { value: IndustrialLoadType; label: string }[] = [
  { value: 'three-phase-motor', label: 'Three Phase Motor' },
  { value: 'machine-tool', label: 'Machine Tool' },
  { value: 'welding', label: 'Welding Equipment' },
  { value: 'conveyor', label: 'Conveyor System' },
  { value: 'extraction', label: 'Extraction System' },
  { value: 'control-panel', label: 'Control Panel' },
  { value: 'overhead-lighting', label: 'Overhead Lighting' },
  { value: 'workshop-sockets', label: 'Workshop Sockets' },
  { value: 'compressor', label: 'Air Compressor' },
  { value: 'production-line', label: 'Production Line' }
];

export const CircuitCard = ({ circuit, index, installationType, onUpdate, onDelete, onDuplicate }: CircuitCardProps) => {
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
    <Card className="p-3 sm:p-4 relative">
      {/* Header */}
      <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="mt-1">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-xs">Circuit {index + 1}</Badge>
            {circuit.phases === 'three' && (
              <Badge variant="secondary" className="text-xs">3-Phase</Badge>
            )}
          </div>
        </div>
        <div className="flex gap-1.5 sm:gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onDuplicate}
            className="h-10 w-10 sm:h-8 sm:w-8 p-0 touch-manipulation"
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="h-10 w-10 sm:h-8 sm:w-8 p-0 text-destructive hover:text-destructive touch-manipulation"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid gap-3 sm:gap-4">
        {/* Circuit Name */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Circuit Name/Description *</Label>
          <MobileInput
            value={circuit.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            placeholder="e.g., Kitchen Ring Main, Upstairs Lights"
            className="text-base"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Load Type */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Load Type *</Label>
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
              <SelectTrigger className="text-base">
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
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Phases *</Label>
            <Select 
              value={circuit.phases} 
              onValueChange={(v: 'single' | 'three') => onUpdate({ phases: v })}
            >
              <SelectTrigger className="text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single">Single Phase</SelectItem>
                <SelectItem value="three">Three Phase</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Load Power */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">
              Load Power (W) *
            </Label>
            <MobileInput
              type="number"
              min="1"
              step="1"
              value={circuit.loadPower || ''}
              onChange={(e) => onUpdate({ loadPower: e.target.value ? Number(e.target.value) : undefined })}
              placeholder="e.g., 7360 for 32A ring"
              className="text-base"
            />
            <p className="text-xs text-muted-foreground">
              Ring: 7360W | Lighting: 1000W | Shower: 9500W
            </p>
          </div>

          {/* Cable Length */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">
              Cable Run Length (m)
            </Label>
            <MobileInput
              type="number"
              min="1"
              step="0.5"
              value={circuit.cableLength || ''}
              onChange={(e) => onUpdate({ cableLength: e.target.value ? Number(e.target.value) : undefined })}
              placeholder="e.g., 25"
              className="text-base"
            />
            <p className="text-xs text-muted-foreground">
              Auto-filled based on typical runs - adjust if needed
            </p>
          </div>
        </div>

        {/* Special Location */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Special Location</Label>
          <Select 
            value={circuit.specialLocation || 'none'} 
            onValueChange={(v) => onUpdate({ specialLocation: v as any })}
          >
            <SelectTrigger className="text-base">
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
        <div className="space-y-2">
          <Label className="text-sm">Additional Notes (Optional)</Label>
          <Textarea
            value={circuit.notes || ''}
            onChange={(e) => onUpdate({ notes: e.target.value })}
            placeholder="Any special requirements, installation details, or considerations..."
            className="min-h-[60px] text-base resize-none"
          />
        </div>
      </div>
    </Card>
  );
};
