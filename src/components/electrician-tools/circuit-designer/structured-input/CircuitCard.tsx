import { useState } from 'react';
import { IOSInput } from '@/components/ui/ios-input';
import { IOSSelect } from '@/components/ui/ios-select';
import {
  CircuitInput,
  DomesticLoadType,
  CommercialLoadType,
  IndustrialLoadType,
} from '@/types/installation-design';
import { DEFAULT_CABLE_LENGTHS } from '@/lib/circuit-templates';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';

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
  { value: 'other', label: 'Other (Solar, Metering, etc.)' },
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
  { value: 'other', label: 'Other (Solar, Metering, etc.)' },
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
  { value: 'other', label: 'Other (Solar, Metering, etc.)' },
];

export const CircuitCard = ({
  circuit,
  index,
  installationType,
  onUpdate,
  onDelete,
  onDuplicate,
}: CircuitCardProps) => {
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
    <div className="bg-[hsl(0_0%_10%)] border border-white/[0.10] rounded-2xl p-4 sm:p-5">
      {/* Header — editorial, no icons */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-elec-yellow">
            Circuit {String(index + 1).padStart(2, '0')}
          </span>
          {circuit.phases === 'three' && (
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60">
              · Three phase
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onDuplicate}
            className="text-[12px] text-white/60 hover:text-elec-yellow transition-colors touch-manipulation"
          >
            Duplicate
          </button>
          <span className="h-3 w-px bg-white/10" aria-hidden />
          <button
            type="button"
            onClick={onDelete}
            className="text-[12px] text-white/60 hover:text-elec-yellow transition-colors touch-manipulation"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <IOSInput
          label="Circuit Name *"
          value={circuit.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="e.g., Kitchen Ring Main"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          <IOSSelect
            label="Phases *"
            value={circuit.phases}
            onValueChange={(v: 'single' | 'three') => onUpdate({ phases: v })}
            options={[
              { value: 'single', label: 'Single Phase' },
              { value: 'three', label: 'Three Phase' },
            ]}
          />
        </div>

        {/* Circuit Topology — only for socket circuits */}
        {(circuit.loadType === 'socket' ||
          circuit.loadType === 'office-sockets' ||
          circuit.loadType === 'workshop-sockets') && (
          <IOSSelect
            label="Circuit Topology"
            value={circuit.circuitTopology || 'auto'}
            onValueChange={(v: 'ring' | 'radial' | 'auto') => onUpdate({ circuitTopology: v })}
            options={[
              { value: 'auto', label: 'Auto-detect (designer decides)' },
              { value: 'ring', label: 'Ring Final Circuit', description: '32A, 2.5mm²' },
              { value: 'radial', label: 'Radial Circuit', description: 'MCB based on load' },
            ]}
            hint={
              circuit.circuitTopology === 'ring'
                ? 'Ring finals use 2.5mm² cable with 32A RCBO'
                : circuit.circuitTopology === 'radial'
                  ? 'Radial: 20A uses 2.5mm², 32A requires 4mm²'
                  : undefined
            }
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <IOSInput
            label="Load Power (W) *"
            type="number"
            value={circuit.loadPower?.toString() || ''}
            onChange={(e) =>
              onUpdate({ loadPower: e.target.value ? Number(e.target.value) : undefined })
            }
            placeholder="Ring: 7360W | Lighting: 1000W"
          />

          <IOSInput
            label="Cable Run (m)"
            type="number"
            value={circuit.cableLength?.toString() || ''}
            onChange={(e) =>
              onUpdate({ cableLength: e.target.value ? Number(e.target.value) : undefined })
            }
            placeholder="e.g., 25"
          />
        </div>

        {/* Advanced Options */}
        <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className={cn(
                'w-full h-11 px-4 rounded-xl flex items-center justify-between',
                'bg-[hsl(0_0%_10%)] border border-white/[0.10]',
                'hover:border-white/20 hover:bg-[hsl(0_0%_15%)]',
                'text-[13px] font-medium text-white',
                'transition-colors active:scale-[0.99]',
                'touch-manipulation'
              )}
            >
              <span>{showAdvanced ? 'Hide advanced options' : 'Show advanced options'}</span>
              <span
                className={cn(
                  'text-[10.5px] font-semibold uppercase tracking-[0.18em]',
                  showAdvanced ? 'text-elec-yellow' : 'text-white/50'
                )}
              >
                {showAdvanced ? 'Close' : 'Open'}
              </span>
            </button>
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-4 space-y-4">
            <IOSSelect
              label="Special Location"
              value={circuit.specialLocation || 'none'}
              onValueChange={(v) => onUpdate({ specialLocation: v as any })}
              options={[
                { value: 'none', label: 'None' },
                { value: 'bathroom', label: 'Bathroom', description: 'Zones apply' },
                { value: 'outdoor', label: 'Outdoor' },
                { value: 'underground', label: 'Underground' },
                { value: 'kitchen', label: 'Kitchen', description: 'RCD required' },
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
