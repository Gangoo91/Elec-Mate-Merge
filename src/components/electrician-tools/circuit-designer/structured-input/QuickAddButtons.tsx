import { CircuitInput } from '@/types/installation-design';
import { SMART_DEFAULTS, DEFAULT_CABLE_LENGTHS } from '@/lib/circuit-templates';
import { cn } from '@/lib/utils';
import { chipBase, chipOff } from '@/components/forms/fieldStyles';
import { Section } from './wizardUi';

interface QuickAddButtonsProps {
  installationType: 'domestic' | 'commercial' | 'industrial';
  onAddCircuit: (circuit: Omit<CircuitInput, 'id'>) => void;
}

const QUICK_ADD_PRESETS = {
  domestic: [
    { label: 'Socket Ring', type: 'socket', power: 7360 },
    { label: 'Lighting', type: 'lighting', power: 1000 },
    { label: 'Cooker', type: 'cooker', power: 9200 },
    { label: 'Shower', type: 'shower', power: 9500 },
    { label: 'EV Charger', type: 'ev-charger', power: 7400 },
  ],
  commercial: [
    { label: 'Office Sockets', type: 'office-sockets', power: 5000 },
    { label: 'Lighting', type: 'lighting', power: 2000 },
    { label: 'Emergency Lights', type: 'emergency-lighting', power: 500 },
    { label: 'Server Room', type: 'server-room', power: 5000 },
    { label: 'HVAC', type: 'hvac', power: 3000 },
  ],
  industrial: [
    { label: '3-Phase Motor', type: 'three-phase-motor', power: 15000 },
    { label: 'Machine Tool', type: 'machine-tool', power: 10000 },
    { label: 'Welding', type: 'welding', power: 12000 },
    { label: 'Workshop Sockets', type: 'workshop-sockets', power: 5000 },
    { label: 'Lighting', type: 'overhead-lighting', power: 2000 },
  ],
} as const;

export const QuickAddButtons = ({ installationType, onAddCircuit }: QuickAddButtonsProps) => {
  const presets = QUICK_ADD_PRESETS[installationType];

  const handleQuickAdd = (preset: (typeof presets)[number]) => {
    // Reference SMART_DEFAULTS to preserve dependency surface (parity with previous behaviour)
    void SMART_DEFAULTS[installationType];
    const presetType = preset.type as string;
    const defaultLength =
      DEFAULT_CABLE_LENGTHS[installationType][
        presetType as keyof (typeof DEFAULT_CABLE_LENGTHS)[typeof installationType]
      ];

    onAddCircuit({
      name: preset.label,
      loadType: preset.type as any,
      loadPower: preset.power,
      phases:
        installationType === 'industrial' && presetType.includes('motor') ? 'three' : 'single',
      specialLocation:
        presetType === 'shower' ? 'bathroom' : presetType === 'ev-charger' ? 'outdoor' : 'none',
      cableLength: defaultLength || 20,
      notes: '',
    });
  };

  return (
    <Section title="Quick add">
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.type}
            type="button"
            onClick={() => handleQuickAdd(preset)}
            className={cn(chipBase, chipOff, 'px-4')}
          >
            + {preset.label}
          </button>
        ))}
      </div>
    </Section>
  );
};
