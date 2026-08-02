import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { SwipeableBottomSheet } from '@/components/native/SwipeableBottomSheet';
import { useHaptic } from '@/hooks/useHaptic';

interface EVCircuitPresetsProps {
  onApplyPreset: (preset: Record<string, unknown>) => void;
  className?: string;
}

const SINGLE_PHASE_PRESETS = [
  {
    id: 'ev-3.6kw-16a',
    label: '3.6kW Slow (16A)',
    desc: '16A MCB B, 2.5mm\u00B2 6242Y',
    values: {
      protectionDeviceType: 'MCB',
      protectionDeviceRating: '16',
      protectionDeviceCurve: 'B',
      cableSize: '2.5',
      cableType: '6242Y',
      rcdType: 'Type A',
      rcdRating: '30',
      powerRating: '3.6',
      ratedCurrent: '16',
      phases: 1,
      supplyPhases: 'single',
      chargerType: 'Mode3',
    },
  },
  {
    id: 'ev-7kw-32a',
    label: '7kW Standard (32A)',
    desc: '32A RCBO, Type A RCD, 6mm\u00B2 6242Y/SWA',
    values: {
      protectionDeviceType: 'RCBO',
      protectionDeviceRating: '32',
      protectionDeviceCurve: '', // RCD type is carried by rcdType; curve not specified by this preset
      cableSize: '6',
      cableType: '6242Y or SWA',
      rcdType: 'Type A',
      rcdRating: '30',
      powerRating: '7',
      ratedCurrent: '32',
      phases: 1,
      supplyPhases: 'single',
      chargerType: 'Mode3',
    },
  },
  {
    id: 'ev-7.4kw-32a',
    label: '7.4kW Standard (32A)',
    desc: '32A RCBO, Type A + 6mA DC, 6mm\u00B2 SWA',
    values: {
      protectionDeviceType: 'RCBO',
      protectionDeviceRating: '32',
      protectionDeviceCurve: '', // RCD type is carried by rcdType; curve not specified by this preset
      cableSize: '6',
      cableType: 'SWA',
      rcdType: 'Type A + 6mA DC',
      rcdRating: '30',
      powerRating: '7.4',
      ratedCurrent: '32',
      phases: 1,
      supplyPhases: 'single',
      chargerType: 'Mode3',
    },
  },
  {
    id: 'ev-11kw-48a',
    label: '11kW Fast (48A)',
    desc: '50A MCB B, 10mm\u00B2 SWA',
    values: {
      protectionDeviceType: 'MCB',
      protectionDeviceRating: '50',
      protectionDeviceCurve: 'B',
      cableSize: '10',
      cableType: 'SWA',
      rcdType: 'Type A + 6mA DC',
      rcdRating: '30',
      powerRating: '11',
      ratedCurrent: '48',
      phases: 1,
      supplyPhases: 'single',
      chargerType: 'Mode3',
    },
  },
];

const THREE_PHASE_PRESETS = [
  {
    id: 'ev-3p-11kw-16a',
    label: '11kW (16A/phase)',
    desc: '16A RCBO B, 2.5mm\u00B2 SWA',
    values: {
      protectionDeviceType: 'RCBO',
      protectionDeviceRating: '16',
      protectionDeviceCurve: 'B',
      cableSize: '2.5',
      cableType: 'SWA',
      rcdType: 'Type B',
      rcdRating: '30',
      powerRating: '11',
      ratedCurrent: '16',
      phases: 3,
      supplyPhases: 'three',
      chargerType: 'Mode3',
    },
  },
  {
    id: 'ev-3p-22kw-32a',
    label: '22kW (32A/phase)',
    desc: '32A MCB B, 6mm\u00B2 SWA',
    values: {
      protectionDeviceType: 'MCB',
      protectionDeviceRating: '32',
      protectionDeviceCurve: 'B',
      cableSize: '6',
      cableType: 'SWA',
      rcdType: 'Type B',
      rcdRating: '30',
      powerRating: '22',
      ratedCurrent: '32',
      phases: 3,
      supplyPhases: 'three',
      chargerType: 'Mode3',
    },
  },
  {
    id: 'ev-3p-50kw-80a',
    label: '50kW Fast DC (80A)',
    desc: '80A MCCB, 25mm\u00B2 SWA',
    values: {
      protectionDeviceType: 'MCCB',
      protectionDeviceRating: '80',
      protectionDeviceCurve: '',
      cableSize: '25',
      cableType: 'SWA',
      rcdType: 'Type B',
      rcdRating: '300',
      powerRating: '50',
      ratedCurrent: '80',
      phases: 3,
      supplyPhases: 'three',
      chargerType: 'Mode4',
    },
  },
  {
    id: 'ev-3p-150kw-200a',
    label: '150kW Rapid DC (200A)',
    desc: '200A MCCB, 95mm\u00B2 SWA',
    values: {
      protectionDeviceType: 'MCCB',
      protectionDeviceRating: '200',
      protectionDeviceCurve: '',
      cableSize: '95',
      cableType: 'SWA',
      rcdType: 'Type B',
      rcdRating: '300',
      powerRating: '150',
      ratedCurrent: '200',
      phases: 3,
      supplyPhases: 'three',
      chargerType: 'Mode4',
    },
  },
];

export const EVCircuitPresetsTrigger: React.FC<{ onClick: () => void; className?: string }> = ({
  onClick,
  className,
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'w-full h-11 rounded-xl font-semibold text-sm bg-elec-yellow border border-elec-yellow text-black touch-manipulation active:scale-[0.98] transition-all',
      className
    )}
  >
    Quick Fill — EV Circuit Preset
  </button>
);

const EVCircuitPresets: React.FC<EVCircuitPresetsProps> = ({ onApplyPreset, className }) => {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<'single' | 'three'>('single');
  const haptic = useHaptic();

  const presets = phase === 'single' ? SINGLE_PHASE_PRESETS : THREE_PHASE_PRESETS;

  const handleSelect = (values: Record<string, unknown>) => {
    haptic.success();
    onApplyPreset(values);
    setOpen(false);
  };

  return (
    <div className={className}>
      <EVCircuitPresetsTrigger onClick={() => setOpen(true)} />

      <SwipeableBottomSheet
        open={open}
        onOpenChange={setOpen}
        title="EV Circuit Presets"
        contentClassName="pb-safe max-h-[85vh] overflow-y-auto"
      >
        {/* Phase toggle */}
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setPhase('single')}
            className={cn(
              'flex-1 h-11 rounded-xl text-sm touch-manipulation active:scale-[0.98] transition-all',
              phase === 'single'
                ? 'bg-elec-yellow border border-elec-yellow text-black font-semibold'
                : 'bg-white/[0.06] border border-white/[0.12] text-white font-medium'
            )}
          >
            Single Phase
          </button>
          <button
            type="button"
            onClick={() => setPhase('three')}
            className={cn(
              'flex-1 h-11 rounded-xl text-sm touch-manipulation active:scale-[0.98] transition-all',
              phase === 'three'
                ? 'bg-elec-yellow border border-elec-yellow text-black font-semibold'
                : 'bg-white/[0.06] border border-white/[0.12] text-white font-medium'
            )}
          >
            Three Phase
          </button>
        </div>

        {/* Presets grid */}
        <div className="grid grid-cols-2 gap-2">
          {presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelect(preset.values)}
              className="flex flex-col items-start min-h-[64px] p-3.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.09] active:scale-[0.98] transition-all touch-manipulation text-left border border-white/[0.12]"
            >
              <span className="text-[15px] font-semibold text-white">{preset.label}</span>
              <span className="text-xs text-white/85 mt-0.5">{preset.desc}</span>
            </button>
          ))}
        </div>
      </SwipeableBottomSheet>
    </div>
  );
};

export default EVCircuitPresets;
