import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  CircuitInput,
  DomesticLoadType,
  CommercialLoadType,
  IndustrialLoadType,
} from '@/types/installation-design';
import { DEFAULT_CABLE_LENGTHS } from '@/lib/circuit-templates';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { labelCn } from '@/components/forms/fieldStyles';
import { ItemCard, TextField, SelectRow, ChipChoice } from './wizardUi';

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
    <ItemCard>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <h4 className="min-w-0 truncate text-[15px] font-semibold text-white">
          Circuit {index + 1}
          {circuit.phases === 'three' && <span className="font-normal"> · Three phase</span>}
        </h4>
        <div className="-mr-2 flex shrink-0 items-center">
          <button
            type="button"
            onClick={onDuplicate}
            className="h-11 rounded-lg px-3 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.06] touch-manipulation"
          >
            Duplicate
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="h-11 rounded-lg px-3 text-[13px] font-medium text-red-400 transition-colors hover:bg-white/[0.06] touch-manipulation"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-5 sm:gap-x-6">
        <TextField
          className="col-span-2"
          label="Circuit name *"
          value={circuit.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          placeholder="e.g., Kitchen Ring Main"
        />

        <SelectRow
          className="col-span-2 sm:col-span-1"
          label="Load type"
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

        <div className="col-span-2 sm:col-span-1">
          <span className={labelCn}>Phases *</span>
          <ChipChoice
            ariaLabel="Phases"
            columns="grid-cols-2"
            options={[
              { value: 'single', label: 'Single phase' },
              { value: 'three', label: 'Three phase' },
            ]}
            value={circuit.phases}
            onSelect={(v) => onUpdate({ phases: v as 'single' | 'three' })}
          />
        </div>

        {/* Circuit Topology, only for socket circuits */}
        {(circuit.loadType === 'socket' ||
          circuit.loadType === 'office-sockets' ||
          circuit.loadType === 'workshop-sockets') && (
          <SelectRow
            className="col-span-2"
            label="Circuit topology"
            value={circuit.circuitTopology || 'auto'}
            onValueChange={(v) => onUpdate({ circuitTopology: v as 'ring' | 'radial' | 'auto' })}
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

        <TextField
          label="Load power (W) *"
          type="number"
          value={circuit.loadPower?.toString() || ''}
          onChange={(e) =>
            onUpdate({ loadPower: e.target.value ? Number(e.target.value) : undefined })
          }
          placeholder="Ring 7360, lighting 1000"
        />

        <TextField
          label="Cable run (m)"
          type="number"
          value={circuit.cableLength?.toString() || ''}
          onChange={(e) =>
            onUpdate({ cableLength: e.target.value ? Number(e.target.value) : undefined })
          }
          placeholder="e.g., 25"
        />
      </div>

      {/* Advanced Options */}
      <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced} className="mt-4">
        <CollapsibleTrigger asChild>
          <button
            type="button"
            className="flex h-11 w-full items-center justify-between border-t border-white/[0.10] pt-1 text-left text-[14px] font-medium text-white touch-manipulation"
          >
            <span>{showAdvanced ? 'Hide advanced options' : 'Show advanced options'}</span>
            <ChevronDown
              className={cn(
                'h-5 w-5 text-white transition-transform',
                showAdvanced && 'rotate-180'
              )}
            />
          </button>
        </CollapsibleTrigger>

        <CollapsibleContent className="mt-3 grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-6">
          <SelectRow
            label="Special location"
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

          <TextField
            label="Additional notes"
            value={circuit.notes || ''}
            onChange={(e) => onUpdate({ notes: e.target.value })}
            placeholder="Special requirements..."
          />
        </CollapsibleContent>
      </Collapsible>
    </ItemCard>
  );
};
