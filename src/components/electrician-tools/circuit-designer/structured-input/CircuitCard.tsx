import { useState } from "react";
import { IOSInput } from "@/components/ui/ios-input";
import { IOSSelect } from "@/components/ui/ios-select";
import { Button } from "@/components/ui/button";
import { CircuitInput, DomesticLoadType, CommercialLoadType, IndustrialLoadType } from "@/types/installation-design";
import { Trash2, Copy, ChevronDown, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DEFAULT_CABLE_LENGTHS } from "@/lib/circuit-templates";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

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
    <div
      className={cn(
        "relative p-4 rounded-2xl",
        "bg-gradient-to-br from-elec-yellow/[0.04] to-white/[0.02]",
        "backdrop-blur border border-elec-yellow/20",
        "transition-all duration-ios-fast",
        "hover:border-elec-yellow/35",
        "shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
      )}
    >
      {/* Header - Native app style with swipe hint */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-elec-yellow/15 border border-elec-yellow/20">
            <Zap className="h-4 w-4 text-elec-yellow" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="bg-elec-yellow/10 border border-elec-yellow/20 text-elec-yellow text-xs font-semibold px-2"
              >
                Circuit {index + 1}
              </Badge>
              {circuit.phases === 'three' && (
                <Badge className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs px-1.5">
                  3Φ
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={onDuplicate}
            className={cn(
              "h-9 w-9 p-0 rounded-xl",
              "bg-white/[0.06] hover:bg-elec-yellow/15",
              "border border-white/10 hover:border-elec-yellow/30",
              "text-white/60 hover:text-elec-yellow",
              "transition-all duration-ios-fast",
              "active:scale-95",
              "touch-manipulation"
            )}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className={cn(
              "h-9 w-9 p-0 rounded-xl",
              "bg-red-500/10 hover:bg-red-500/20",
              "border border-red-500/20 hover:border-red-500/40",
              "text-red-400 hover:text-red-300",
              "transition-all duration-ios-fast",
              "active:scale-95",
              "touch-manipulation"
            )}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Circuit Name */}
        <IOSInput
          label="Circuit Name *"
          value={circuit.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="e.g., Kitchen Ring Main"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Load Type */}
          <IOSSelect
            label="Load Type"
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
            options={loadOptions}
          />

          {/* Phases */}
          <IOSSelect
            label="Phases *"
            value={circuit.phases}
            onValueChange={(v: 'single' | 'three') => onUpdate({ phases: v })}
            options={[
              { value: "single", label: "Single Phase" },
              { value: "three", label: "Three Phase" },
            ]}
          />
        </div>

        {/* Circuit Topology - Show only for socket circuits */}
        {(circuit.loadType === 'socket' || circuit.loadType === 'office-sockets' || circuit.loadType === 'workshop-sockets') && (
          <IOSSelect
            label="Circuit Topology"
            value={circuit.circuitTopology || 'auto'}
            onValueChange={(v: 'ring' | 'radial' | 'auto') => onUpdate({ circuitTopology: v })}
            options={[
              { value: "auto", label: "Auto-detect (AI decides)" },
              { value: "ring", label: "Ring Final Circuit", description: "32A, 2.5mm²" },
              { value: "radial", label: "Radial Circuit", description: "MCB based on load" },
            ]}
            hint={
              circuit.circuitTopology === 'ring'
                ? "Ring finals use 2.5mm² cable with 32A RCBO"
                : circuit.circuitTopology === 'radial'
                ? "Radial: 20A uses 2.5mm², 32A requires 4mm²"
                : undefined
            }
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Load Power */}
          <IOSInput
            label="Load Power (W) *"
            type="number"
            value={circuit.loadPower?.toString() || ''}
            onChange={(e) => onUpdate({ loadPower: e.target.value ? Number(e.target.value) : undefined })}
            placeholder="Ring: 7360W | Lighting: 1000W"
          />

          {/* Cable Length */}
          <IOSInput
            label="Cable Run (m)"
            type="number"
            value={circuit.cableLength?.toString() || ''}
            onChange={(e) => onUpdate({ cableLength: e.target.value ? Number(e.target.value) : undefined })}
            placeholder="e.g., 25"
          />
        </div>

        {/* Advanced Options */}
        <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-between h-11 px-4 rounded-xl",
                "bg-white/[0.04] border border-elec-yellow/15",
                "hover:bg-elec-yellow/10 hover:border-elec-yellow/30",
                "text-white/70 text-sm font-medium",
                "transition-all duration-ios-fast",
                "active:scale-[0.99]",
                "touch-manipulation"
              )}
            >
              <span>{showAdvanced ? 'Hide' : 'Show'} Advanced Options</span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-elec-yellow/60 transition-transform duration-ios-normal",
                  showAdvanced && "rotate-180"
                )}
              />
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-4 space-y-4">
            <IOSSelect
              label="Special Location"
              value={circuit.specialLocation || 'none'}
              onValueChange={(v) => onUpdate({ specialLocation: v as any })}
              options={[
                { value: "none", label: "None" },
                { value: "bathroom", label: "Bathroom", description: "Zones apply" },
                { value: "outdoor", label: "Outdoor" },
                { value: "underground", label: "Underground" },
                { value: "kitchen", label: "Kitchen", description: "RCD required" },
              ]}
            />

            <IOSInput
              label="Additional Notes"
              value={circuit.notes || ''}
              onChange={(e) => onUpdate({ notes: e.target.value })}
              placeholder="Special requirements..."
            />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};
