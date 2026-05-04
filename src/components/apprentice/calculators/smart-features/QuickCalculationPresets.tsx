import React from 'react';
import { Home, Building, Factory } from 'lucide-react';

interface PresetScenario {
  id: string;
  name: string;
  description: string;
  category: 'domestic' | 'commercial' | 'industrial' | 'common';
  icon: React.ReactNode;
  inputs: { [key: string]: string };
  explanation: string;
}

interface QuickCalculationPresetsProps {
  calculatorType: string;
  onPresetSelect: (preset: PresetScenario) => void;
}

const QuickCalculationPresets: React.FC<QuickCalculationPresetsProps> = ({
  calculatorType,
  onPresetSelect,
}) => {
  const getPresetsForCalculator = (type: string): PresetScenario[] => {
    switch (type) {
      case 'ohms-law':
        return [
          {
            id: 'led-strip',
            name: 'LED Strip Lighting',
            description: '12V LED strip power calculation',
            category: 'domestic',
            icon: <Home className="h-4 w-4" />,
            inputs: { voltage: '12', current: '1.5' },
            explanation: 'Common 12V LED strip drawing 1.5A',
          },
          {
            id: 'socket-outlet',
            name: 'Socket Outlet',
            description: '230V socket with 13A load',
            category: 'domestic',
            icon: <Home className="h-4 w-4" />,
            inputs: { voltage: '230', current: '13' },
            explanation: 'Maximum load on UK domestic socket',
          },
          {
            id: 'industrial-motor',
            name: 'Industrial Motor',
            description: '400V three-phase motor',
            category: 'industrial',
            icon: <Factory className="h-4 w-4" />,
            inputs: { voltage: '400', power: '5500' },
            explanation: '5.5kW industrial motor on 400V supply',
          },
        ];

      case 'cable-size':
        return [
          {
            id: 'lighting-circuit',
            name: 'Lighting Circuit',
            description: 'Domestic lighting circuit',
            category: 'domestic',
            icon: <Home className="h-4 w-4" />,
            inputs: { current: '6', length: '15', voltage: '230', voltageDrop: '3' },
            explanation: '6A lighting circuit, 15m run, 3% voltage drop limit',
          },
          {
            id: 'socket-circuit',
            name: 'Socket Circuit',
            description: 'Ring final circuit',
            category: 'domestic',
            icon: <Home className="h-4 w-4" />,
            inputs: { current: '32', length: '50', voltage: '230', voltageDrop: '5' },
            explanation: '32A ring final, 50m total length',
          },
          {
            id: 'submain-feed',
            name: 'Sub-main Feed',
            description: 'Distribution board feed',
            category: 'commercial',
            icon: <Building className="h-4 w-4" />,
            inputs: { current: '63', length: '25', voltage: '400', voltageDrop: '5' },
            explanation: '63A three-phase sub-main, 25m run',
          },
        ];

      case 'power-factor':
        return [
          {
            id: 'fluorescent-lighting',
            name: 'Fluorescent Lighting',
            description: 'Office fluorescent lights',
            category: 'commercial',
            icon: <Building className="h-4 w-4" />,
            inputs: { activePower: '2000', apparentPower: '2500' },
            explanation: 'Typical fluorescent lighting with magnetic ballasts',
          },
          {
            id: 'electric-motor',
            name: 'Electric Motor',
            description: 'Induction motor load',
            category: 'industrial',
            icon: <Factory className="h-4 w-4" />,
            inputs: { voltage: '400', current: '10', activePower: '5500' },
            explanation: 'Three-phase induction motor at full load',
          },
          {
            id: 'mixed-commercial',
            name: 'Mixed Commercial Load',
            description: 'Office building mixed load',
            category: 'commercial',
            icon: <Building className="h-4 w-4" />,
            inputs: { activePower: '15000', apparentPower: '18000' },
            explanation: 'Typical office building with mixed loads',
          },
        ];

      case 'voltage-drop':
        return [
          {
            id: 'long-garden-run',
            name: 'Garden Outbuilding',
            description: 'SWA cable to garden building',
            category: 'domestic',
            icon: <Home className="h-4 w-4" />,
            inputs: { current: '20', length: '40', cableSize: '4', voltage: '230' },
            explanation: '20A supply to garden office, 40m SWA run',
          },
          {
            id: 'street-lighting',
            name: 'Street Lighting',
            description: 'Highway lighting circuit',
            category: 'commercial',
            icon: <Building className="h-4 w-4" />,
            inputs: { current: '10', length: '100', cableSize: '6', voltage: '230' },
            explanation: 'Street lighting circuit, 100m cable run',
          },
        ];

      default:
        return [];
    }
  };

  const presets = getPresetsForCalculator(calculatorType);

  if (presets.length === 0) return null;

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        Quick start scenarios
      </span>
      <div className="grid gap-3">
        {presets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => onPresetSelect(preset)}
            className="text-left p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors touch-manipulation"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-[14px] text-white font-medium">{preset.name}</h4>
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/55">
                {preset.category}
              </span>
            </div>

            <p className="text-[12px] text-white/55 mb-2">{preset.description}</p>

            <div className="flex flex-wrap gap-1.5 mb-2">
              {Object.entries(preset.inputs)
                .slice(0, 3)
                .map(([key, value]) => (
                  <span
                    key={key}
                    className="text-[11px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03] font-mono"
                  >
                    {key}: {value}
                  </span>
                ))}
            </div>

            <p className="text-[11px] text-white/55 italic">{preset.explanation}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickCalculationPresets;
export type { PresetScenario };
