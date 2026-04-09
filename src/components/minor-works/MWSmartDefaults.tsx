import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { SMART_DEFAULTS, SmartDefault } from '@/constants/minorWorksOptions';
import { SwipeableBottomSheet } from '@/components/native/SwipeableBottomSheet';
import { useHaptic } from '@/hooks/useHaptic';

interface MWSmartDefaultsProps {
  onApply: (values: SmartDefault['values']) => void;
  className?: string;
}

const SINGLE_PHASE_PRESETS = [
  { id: 'lighting', label: 'Lighting', desc: '6A MCB B, 1.5mm²', values: { circuitDescription: 'Lighting circuit', protectiveDeviceType: 'mcb-type-b', protectiveDeviceRating: '6', liveConductorSize: '1.5', cpcSize: '1.0', cableType: 'twin-earth', overcurrentDeviceBsEn: 'BS EN 60898', protectiveDeviceKaRating: '6', numberOfConductors: '3', circuitType: 'radial', installationMethod: 'ceiling-void', referenceMethod: 'C' } },
  { id: 'sockets-ring', label: 'Ring Final', desc: '32A RCBO A, 2.5mm²', values: { circuitDescription: 'Ring final circuit', protectiveDeviceType: 'rcbo-type-a', protectiveDeviceRating: '32', liveConductorSize: '2.5', cpcSize: '1.5', cableType: 'twin-earth', overcurrentDeviceBsEn: 'BS EN 61009', protectiveDeviceKaRating: '6', numberOfConductors: '3', circuitType: 'ring', rcdIdn: '30', rcdType: 'A', rcdBsEn: 'BS EN 61009', protectionRcbo: true, installationMethod: 'under-plaster', referenceMethod: 'A' } },
  { id: 'sockets-radial', label: 'Radial Sockets', desc: '20A RCBO A, 2.5mm²', values: { circuitDescription: 'Radial socket circuit', protectiveDeviceType: 'rcbo-type-a', protectiveDeviceRating: '20', liveConductorSize: '2.5', cpcSize: '1.5', cableType: 'twin-earth', overcurrentDeviceBsEn: 'BS EN 61009', protectiveDeviceKaRating: '6', numberOfConductors: '3', circuitType: 'radial', rcdIdn: '30', rcdType: 'A', rcdBsEn: 'BS EN 61009', protectionRcbo: true, installationMethod: 'under-plaster', referenceMethod: 'A' } },
  { id: 'cooker', label: 'Cooker', desc: '32A MCB B, 6.0mm²', values: { circuitDescription: 'Cooker circuit', protectiveDeviceType: 'mcb-type-b', protectiveDeviceRating: '32', liveConductorSize: '6.0', cpcSize: '2.5', cableType: 'twin-earth', overcurrentDeviceBsEn: 'BS EN 60898', protectiveDeviceKaRating: '6', numberOfConductors: '3', circuitType: 'radial', installationMethod: 'under-plaster', referenceMethod: 'A' } },
  { id: 'shower-8.5kw', label: 'Shower 8.5kW', desc: '40A MCB B, 6.0mm²', values: { circuitDescription: 'Electric shower 8.5kW', protectiveDeviceType: 'mcb-type-b', protectiveDeviceRating: '40', liveConductorSize: '6.0', cpcSize: '2.5', cableType: 'twin-earth', overcurrentDeviceBsEn: 'BS EN 60898', protectiveDeviceKaRating: '6', numberOfConductors: '3', circuitType: 'radial', installationMethod: 'ceiling-void', referenceMethod: 'C' } },
  { id: 'shower-10.5kw', label: 'Shower 10.5kW', desc: '45A RCBO A, 10mm²', values: { circuitDescription: 'Electric shower 10.5kW', protectiveDeviceType: 'rcbo-type-a', protectiveDeviceRating: '45', liveConductorSize: '10.0', cpcSize: '4.0', cableType: 'twin-earth', overcurrentDeviceBsEn: 'BS EN 61009', protectiveDeviceKaRating: '6', numberOfConductors: '3', circuitType: 'radial', rcdIdn: '30', rcdType: 'A', protectionRcbo: true, installationMethod: 'ceiling-void', referenceMethod: 'C' } },
  { id: 'ev-charger', label: 'EV Charger', desc: '32A RCBO A, 6.0mm²', values: { circuitDescription: 'EV charger', protectiveDeviceType: 'rcbo-type-a', protectiveDeviceRating: '32', liveConductorSize: '6.0', cpcSize: '2.5', cableType: 'swa-pvc', overcurrentDeviceBsEn: 'BS EN 61009', protectiveDeviceKaRating: '6', numberOfConductors: '3', circuitType: 'radial', rcdIdn: '30', rcdType: 'A', protectionRcbo: true, installationMethod: 'in-duct', referenceMethod: 'D' } },
  { id: 'immersion', label: 'Immersion', desc: '16A MCB B, 2.5mm²', values: { circuitDescription: 'Immersion heater', protectiveDeviceType: 'mcb-type-b', protectiveDeviceRating: '16', liveConductorSize: '2.5', cpcSize: '1.5', cableType: 'twin-earth', overcurrentDeviceBsEn: 'BS EN 60898', protectiveDeviceKaRating: '6', numberOfConductors: '3', circuitType: 'radial', installationMethod: 'under-plaster', referenceMethod: 'A' } },
  { id: 'storage-heater', label: 'Storage Heater', desc: '20A MCB B, 2.5mm²', values: { circuitDescription: 'Storage heater', protectiveDeviceType: 'mcb-type-b', protectiveDeviceRating: '20', liveConductorSize: '2.5', cpcSize: '1.5', cableType: 'twin-earth', overcurrentDeviceBsEn: 'BS EN 60898', protectiveDeviceKaRating: '6', numberOfConductors: '3', circuitType: 'radial', installationMethod: 'under-plaster', referenceMethod: 'A' } },
  { id: 'extractor', label: 'Extractor Fan', desc: '6A MCB B, 1.5mm²', values: { circuitDescription: 'Extractor fan', protectiveDeviceType: 'mcb-type-b', protectiveDeviceRating: '6', liveConductorSize: '1.5', cpcSize: '1.0', cableType: 'twin-earth', overcurrentDeviceBsEn: 'BS EN 60898', protectiveDeviceKaRating: '6', numberOfConductors: '3', circuitType: 'radial', installationMethod: 'ceiling-void', referenceMethod: 'C' } },
  { id: 'smoke-alarm', label: 'Smoke/CO Alarm', desc: '6A MCB B, 1.5mm² FP200', values: { circuitDescription: 'Smoke/CO alarm system', protectiveDeviceType: 'mcb-type-b', protectiveDeviceRating: '6', liveConductorSize: '1.5', cpcSize: '1.0', cableType: 'fire-resistant', overcurrentDeviceBsEn: 'BS EN 60898', protectiveDeviceKaRating: '6', numberOfConductors: '3', circuitType: 'radial', installationMethod: 'ceiling-void', referenceMethod: 'C' } },
  { id: 'outdoor-socket', label: 'Outdoor Socket', desc: '20A RCBO A, 2.5mm² SWA', values: { circuitDescription: 'Outdoor socket outlet', protectiveDeviceType: 'rcbo-type-a', protectiveDeviceRating: '20', liveConductorSize: '2.5', cpcSize: '1.5', cableType: 'swa-pvc', overcurrentDeviceBsEn: 'BS EN 61009', protectiveDeviceKaRating: '6', numberOfConductors: '3', circuitType: 'radial', rcdIdn: '30', rcdType: 'A', protectionRcbo: true, installationMethod: 'in-duct', referenceMethod: 'D' } },
  { id: 'towel-rail', label: 'Towel Rail', desc: '16A RCBO A, 2.5mm²', values: { circuitDescription: 'Heated towel rail', protectiveDeviceType: 'rcbo-type-a', protectiveDeviceRating: '16', liveConductorSize: '2.5', cpcSize: '1.5', cableType: 'twin-earth', overcurrentDeviceBsEn: 'BS EN 61009', protectiveDeviceKaRating: '6', numberOfConductors: '3', circuitType: 'radial', rcdIdn: '30', rcdType: 'A', protectionRcbo: true, installationMethod: 'under-plaster', referenceMethod: 'A' } },
  { id: 'garage', label: 'Garage Supply', desc: '32A MCB B, 6.0mm² SWA', values: { circuitDescription: 'Garage/outbuilding supply', protectiveDeviceType: 'mcb-type-b', protectiveDeviceRating: '32', liveConductorSize: '6.0', cpcSize: '2.5', cableType: 'swa-pvc', overcurrentDeviceBsEn: 'BS EN 60898', protectiveDeviceKaRating: '6', numberOfConductors: '3', circuitType: 'radial', installationMethod: 'in-duct', referenceMethod: 'D' } },
  { id: 'usb-spur', label: 'USB Spur', desc: '32A MCB B, 2.5mm² (FCU)', values: { circuitDescription: 'Fused spur to USB socket', protectiveDeviceType: 'mcb-type-b', protectiveDeviceRating: '32', liveConductorSize: '2.5', cpcSize: '1.5', cableType: 'twin-earth', overcurrentDeviceBsEn: 'BS EN 60898', protectiveDeviceKaRating: '6', numberOfConductors: '3', circuitType: 'radial', installationMethod: 'under-plaster', referenceMethod: 'A' } },
  { id: 'underfloor', label: 'Underfloor Heat', desc: '16A RCBO A, 2.5mm²', values: { circuitDescription: 'Underfloor heating', protectiveDeviceType: 'rcbo-type-a', protectiveDeviceRating: '16', liveConductorSize: '2.5', cpcSize: '1.5', cableType: 'twin-earth', overcurrentDeviceBsEn: 'BS EN 61009', protectiveDeviceKaRating: '6', numberOfConductors: '3', circuitType: 'radial', rcdIdn: '30', rcdType: 'A', protectionRcbo: true, installationMethod: 'under-plaster', referenceMethod: 'A' } },
];

const THREE_PHASE_PRESETS = [
  { id: '3p-submain', label: 'Sub-Main', desc: '63A TP MCB, 16mm² SWA', values: { circuitDescription: 'Three phase sub-main', protectiveDeviceType: 'mcb-type-b', protectiveDeviceRating: '63', liveConductorSize: '16.0', cpcSize: '10.0', cableType: 'swa-pvc', overcurrentDeviceBsEn: 'BS EN 60898', protectiveDeviceKaRating: '10', numberOfConductors: '5', circuitType: 'radial', installationMethod: 'in-duct', referenceMethod: 'D' } },
  { id: '3p-cooker', label: 'Commercial Cooker', desc: '40A TP MCB, 6.0mm²', values: { circuitDescription: 'Three phase cooker', protectiveDeviceType: 'mcb-type-b', protectiveDeviceRating: '40', liveConductorSize: '6.0', cpcSize: '4.0', cableType: 'swa-pvc', overcurrentDeviceBsEn: 'BS EN 60898', protectiveDeviceKaRating: '10', numberOfConductors: '5', circuitType: 'radial', installationMethod: 'clipped-direct', referenceMethod: 'C' } },
  { id: '3p-motor', label: 'Motor Circuit', desc: '32A TP MCB C, 4.0mm²', values: { circuitDescription: 'Three phase motor', protectiveDeviceType: 'mcb-type-c', protectiveDeviceRating: '32', liveConductorSize: '4.0', cpcSize: '2.5', cableType: 'swa-pvc', overcurrentDeviceBsEn: 'BS EN 60898', protectiveDeviceKaRating: '10', numberOfConductors: '5', circuitType: 'radial', installationMethod: 'clipped-direct', referenceMethod: 'C' } },
  { id: '3p-hvac', label: 'HVAC Unit', desc: '20A TP MCB C, 4.0mm²', values: { circuitDescription: 'HVAC / air conditioning unit', protectiveDeviceType: 'mcb-type-c', protectiveDeviceRating: '20', liveConductorSize: '4.0', cpcSize: '2.5', cableType: 'swa-pvc', overcurrentDeviceBsEn: 'BS EN 60898', protectiveDeviceKaRating: '10', numberOfConductors: '5', circuitType: 'radial', installationMethod: 'clipped-direct', referenceMethod: 'C' } },
  { id: '3p-ev-fast', label: 'Fast EV Charger', desc: '100A TP MCCB, 35mm²', values: { circuitDescription: 'Three phase fast EV charger', protectiveDeviceType: 'mccb', protectiveDeviceRating: '100', liveConductorSize: '35.0', cpcSize: '16.0', cableType: 'swa-xlpe', overcurrentDeviceBsEn: 'BS EN 60947-2', protectiveDeviceKaRating: '25', numberOfConductors: '5', circuitType: 'radial', installationMethod: 'in-duct', referenceMethod: 'D' } },
  { id: '3p-socket-dist', label: 'Socket Distribution', desc: '63A TP RCBO, 10mm²', values: { circuitDescription: 'Three phase socket distribution', protectiveDeviceType: 'rcbo-type-a', protectiveDeviceRating: '63', liveConductorSize: '10.0', cpcSize: '6.0', cableType: 'swa-pvc', overcurrentDeviceBsEn: 'BS EN 61009', protectiveDeviceKaRating: '10', numberOfConductors: '5', circuitType: 'radial', rcdIdn: '30', rcdType: 'A', protectionRcbo: true, installationMethod: 'cable-tray', referenceMethod: 'E' } },
  { id: '3p-lighting-dist', label: 'Lighting Distribution', desc: '32A TP MCB, 6.0mm²', values: { circuitDescription: 'Three phase lighting distribution', protectiveDeviceType: 'mcb-type-b', protectiveDeviceRating: '32', liveConductorSize: '6.0', cpcSize: '4.0', cableType: 'swa-pvc', overcurrentDeviceBsEn: 'BS EN 60898', protectiveDeviceKaRating: '10', numberOfConductors: '5', circuitType: 'radial', installationMethod: 'cable-tray', referenceMethod: 'E' } },
  { id: '3p-compressor', label: 'Compressor', desc: '25A TP MCB C, 4.0mm²', values: { circuitDescription: 'Air compressor', protectiveDeviceType: 'mcb-type-c', protectiveDeviceRating: '25', liveConductorSize: '4.0', cpcSize: '2.5', cableType: 'swa-pvc', overcurrentDeviceBsEn: 'BS EN 60898', protectiveDeviceKaRating: '10', numberOfConductors: '5', circuitType: 'radial', installationMethod: 'clipped-direct', referenceMethod: 'C' } },
  { id: '3p-welder', label: 'Welder', desc: '63A TP MCB D, 16mm²', values: { circuitDescription: 'Welding machine', protectiveDeviceType: 'mcb-type-d', protectiveDeviceRating: '63', liveConductorSize: '16.0', cpcSize: '10.0', cableType: 'swa-pvc', overcurrentDeviceBsEn: 'BS EN 60898', protectiveDeviceKaRating: '10', numberOfConductors: '5', circuitType: 'radial', installationMethod: 'clipped-direct', referenceMethod: 'C' } },
  { id: '3p-pump', label: 'Water Pump', desc: '16A TP MCB C, 2.5mm²', values: { circuitDescription: 'Water pump', protectiveDeviceType: 'mcb-type-c', protectiveDeviceRating: '16', liveConductorSize: '2.5', cpcSize: '1.5', cableType: 'swa-pvc', overcurrentDeviceBsEn: 'BS EN 60898', protectiveDeviceKaRating: '10', numberOfConductors: '5', circuitType: 'radial', installationMethod: 'clipped-direct', referenceMethod: 'C' } },
  { id: '3p-heater-bank', label: 'Heater Bank', desc: '40A TP MCB B, 10mm²', values: { circuitDescription: 'Three phase heater bank', protectiveDeviceType: 'mcb-type-b', protectiveDeviceRating: '40', liveConductorSize: '10.0', cpcSize: '6.0', cableType: 'swa-pvc', overcurrentDeviceBsEn: 'BS EN 60898', protectiveDeviceKaRating: '10', numberOfConductors: '5', circuitType: 'radial', installationMethod: 'cable-tray', referenceMethod: 'E' } },
  { id: '3p-oven', label: 'Commercial Oven', desc: '32A TP MCB B, 6.0mm²', values: { circuitDescription: 'Commercial oven', protectiveDeviceType: 'mcb-type-b', protectiveDeviceRating: '32', liveConductorSize: '6.0', cpcSize: '4.0', cableType: 'swa-pvc', overcurrentDeviceBsEn: 'BS EN 60898', protectiveDeviceKaRating: '10', numberOfConductors: '5', circuitType: 'radial', installationMethod: 'clipped-direct', referenceMethod: 'C' } },
  { id: '3p-ups', label: 'UPS System', desc: '50A TP MCCB, 10mm²', values: { circuitDescription: 'Uninterruptible power supply', protectiveDeviceType: 'mccb', protectiveDeviceRating: '50', liveConductorSize: '10.0', cpcSize: '6.0', cableType: 'swa-pvc', overcurrentDeviceBsEn: 'BS EN 60947-2', protectiveDeviceKaRating: '25', numberOfConductors: '5', circuitType: 'radial', installationMethod: 'cable-tray', referenceMethod: 'E' } },
];

const MWSmartDefaults: React.FC<MWSmartDefaultsProps> = ({ onApply, className }) => {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<'single' | 'three'>('single');
  const haptic = useHaptic();

  const presets = phase === 'single' ? SINGLE_PHASE_PRESETS : THREE_PHASE_PRESETS;

  const handleSelect = (values: SmartDefault['values']) => {
    haptic.success();
    onApply(values);
    setOpen(false);
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full h-10 rounded-lg font-semibold text-xs bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow touch-manipulation active:scale-[0.98]"
      >
        Quick Fill — Select Circuit Type
      </button>

      <SwipeableBottomSheet
        open={open}
        onOpenChange={setOpen}
        title="Circuit Presets"
        contentClassName="pb-safe max-h-[85vh] overflow-y-auto"
      >
        {/* Phase toggle */}
        <div className="flex gap-1 mb-3">
          <button
            type="button"
            onClick={() => setPhase('single')}
            className={cn(
              'flex-1 h-10 rounded-lg font-semibold text-xs touch-manipulation active:scale-[0.98]',
              phase === 'single'
                ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                : 'bg-white/[0.05] border border-white/[0.08] text-white'
            )}
          >
            Single Phase
          </button>
          <button
            type="button"
            onClick={() => setPhase('three')}
            className={cn(
              'flex-1 h-10 rounded-lg font-semibold text-xs touch-manipulation active:scale-[0.98]',
              phase === 'three'
                ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
                : 'bg-white/[0.05] border border-white/[0.08] text-white'
            )}
          >
            Three Phase
          </button>
        </div>

        {/* Presets grid */}
        <div className="grid grid-cols-2 gap-1">
          {presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelect(preset.values)}
              className="flex flex-col items-start p-3 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] active:scale-[0.98] transition-all touch-manipulation text-left"
            >
              <span className="text-xs font-semibold text-white">{preset.label}</span>
              <span className="text-[9px] text-white mt-0.5">{preset.desc}</span>
            </button>
          ))}
        </div>
      </SwipeableBottomSheet>
    </div>
  );
};

export default MWSmartDefaults;
