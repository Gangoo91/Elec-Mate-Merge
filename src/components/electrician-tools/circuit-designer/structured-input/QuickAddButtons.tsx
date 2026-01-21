import { Button } from "@/components/ui/button";
import { CircuitInput } from "@/types/installation-design";
import { SMART_DEFAULTS, DEFAULT_CABLE_LENGTHS } from "@/lib/circuit-templates";
import { Plus, Zap, Lightbulb, UtensilsCrossed, Droplets, Car } from "lucide-react";
import { cn } from "@/lib/utils";

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
    { label: 'EV Charger', type: 'ev-charger', power: 7400 }
  ],
  commercial: [
    { label: 'Office Sockets', type: 'office-sockets', power: 5000 },
    { label: 'Lighting', type: 'lighting', power: 2000 },
    { label: 'Emergency Lights', type: 'emergency-lighting', power: 500 },
    { label: 'Server Room', type: 'server-room', power: 5000 },
    { label: 'HVAC', type: 'hvac', power: 3000 }
  ],
  industrial: [
    { label: '3-Phase Motor', type: 'three-phase-motor', power: 15000 },
    { label: 'Machine Tool', type: 'machine-tool', power: 10000 },
    { label: 'Welding', type: 'welding', power: 12000 },
    { label: 'Workshop Sockets', type: 'workshop-sockets', power: 5000 },
    { label: 'Lighting', type: 'overhead-lighting', power: 2000 }
  ]
} as const;

export const QuickAddButtons = ({ installationType, onAddCircuit }: QuickAddButtonsProps) => {
  const presets = QUICK_ADD_PRESETS[installationType];

  const handleQuickAdd = (preset: typeof presets[0]) => {
    const defaults = SMART_DEFAULTS[installationType];
    const presetType = preset.type as string;
    const defaultLength = DEFAULT_CABLE_LENGTHS[installationType][presetType as keyof typeof DEFAULT_CABLE_LENGTHS[typeof installationType]];
    
    onAddCircuit({
      name: preset.label,
      loadType: preset.type as any,
      loadPower: preset.power,
      phases: installationType === 'industrial' && presetType.includes('motor') ? 'three' : 'single',
      specialLocation: presetType === 'shower' ? 'bathroom' : 
                       presetType === 'ev-charger' ? 'outdoor' : 'none',
      cableLength: defaultLength || 20,
      notes: ''
    });
  };

  // Get icon for circuit type
  const getIcon = (type: string) => {
    if (type.includes('socket') || type.includes('ring')) return Zap;
    if (type.includes('lighting')) return Lightbulb;
    if (type.includes('cooker') || type.includes('kitchen')) return UtensilsCrossed;
    if (type.includes('shower')) return Droplets;
    if (type.includes('ev') || type.includes('charger')) return Car;
    return Zap;
  };

  return (
    <div
      className={cn(
        "p-4 rounded-xl",
        "bg-gradient-to-br from-elec-yellow/[0.06] to-transparent",
        "border border-elec-yellow/20 border-dashed"
      )}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-lg bg-elec-yellow/15">
          <Plus className="h-4 w-4 text-elec-yellow" />
        </div>
        <h3 className="font-semibold text-sm text-white">Quick Add Common Circuits</h3>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {presets.map(preset => {
          const Icon = getIcon(preset.type);
          return (
            <Button
              key={preset.type}
              variant="ghost"
              onClick={() => handleQuickAdd(preset)}
              className={cn(
                "h-12 px-3 gap-2.5 justify-start",
                "bg-gradient-to-br from-white/[0.06] to-white/[0.02]",
                "border border-elec-yellow/20",
                "hover:bg-elec-yellow/10 hover:border-elec-yellow/40",
                "active:scale-[0.98] active:bg-elec-yellow/15",
                "transition-all duration-150",
                "touch-manipulation",
                "rounded-xl"
              )}
            >
              <div className="p-1 rounded-md bg-elec-yellow/10">
                <Icon className="h-3.5 w-3.5 text-elec-yellow" />
              </div>
              <span className="text-sm font-medium text-white/90 truncate">{preset.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
