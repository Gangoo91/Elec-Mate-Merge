/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G1 Design — Tab 3: Device Design
 * Planned quantities, zone schedule, detector spacing, interface equipment
 * Smart features: auto-total mismatch warning, haptics, empty state
 */

import { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import { FireAlarmZone } from '@/types/fire-alarm';
import ComboboxCell from '@/components/table-cells/ComboboxCell';
import {
  suggestDetectorCount,
  suggestCallPointCount,
  suggestZoneCount,
} from '@/data/fireAlarmEquipmentDatabase';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const addButtonCn =
  'w-full h-12 rounded-xl border-2 border-dashed border-white/[0.15] text-sm font-medium text-white touch-manipulation active:scale-[0.98] transition-transform';

const removeButtonCn =
  'h-11 px-2 text-sm font-medium text-red-400 touch-manipulation active:opacity-60 shrink-0';

const SectionHeader = ({ title, count }: { title: string; count?: number }) => (
  <h2 className="mb-3 flex items-center gap-2 text-[15px] font-semibold tracking-tight text-white">
    {title}
    {count !== undefined && (
      <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-[11px] font-semibold text-white/80">
        {count}
      </span>
    )}
  </h2>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className={labelCn}>{label}</Label>
    {children}
  </div>
);

const ceilingHeightOptions = [
  { value: '2.4', label: '2.4' },
  { value: '2.7', label: '2.7' },
  { value: '3.0', label: '3.0' },
  { value: '3.5', label: '3.5' },
  { value: '4.0', label: '4.0' },
  { value: '4.5', label: '4.5' },
  { value: '5.0', label: '5.0' },
  { value: '6.0', label: '6.0' },
];

const beamSpacingOptions = [
  { value: 'No beams', label: 'No beams' },
  { value: '600mm centres', label: '600mm centres' },
  { value: '1200mm centres', label: '1200mm centres' },
  { value: 'Closely spaced (<1m)', label: 'Closely spaced (<1m)' },
  { value: 'Widely spaced (>1m)', label: 'Widely spaced (>1m)' },
];

const interfaceTypeOptions = [
  { value: 'door-holders', label: 'Door Holders' },
  { value: 'sprinkler-interface', label: 'Sprinkler Interface' },
  { value: 'lift-recall', label: 'Lift Recall' },
  { value: 'ventilation-dampers', label: 'Ventilation / Dampers' },
  { value: 'gas-shutdown', label: 'Gas Shutdown' },
  { value: 'access-control', label: 'Access Control Release' },
  { value: 'suppression', label: 'Suppression System' },
  { value: 'emergency-lighting', label: 'Emergency Lighting' },
  { value: 'hvac-shutdown', label: 'HVAC Shutdown' },
  { value: 'fire-shutter', label: 'Fire Shutter Control' },
  { value: 'smoke-extract', label: 'Smoke Extract System' },
  { value: 'other', label: 'Other' },
];

interface Props {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

export default function FAG1DeviceDesign({ formData, onUpdate }: Props) {
  const zones: FireAlarmZone[] = formData.zones || [];
  const interfaces: any[] = formData.interfaceEquipment || [];
  const haptic = useHaptic();

  // Smart suggestions
  const detectorSuggestion = useMemo(() => {
    const area = parseFloat(formData.floorArea);
    const height = parseFloat(
      formData.ceilingHeight || formData.ceilingType?.match(/(\d+\.?\d*)/)?.[1] || '2.7'
    );
    if (!area || area <= 0) return null;
    return suggestDetectorCount(area, height);
  }, [formData.floorArea, formData.ceilingHeight, formData.ceilingType]);

  const cpSuggestion = useMemo(() => {
    const floors = parseInt(formData.numberOfFloors);
    if (!floors || floors <= 0) return null;
    return suggestCallPointCount(floors);
  }, [formData.numberOfFloors]);

  const zoneSuggestion = useMemo(() => {
    const floors = parseInt(formData.numberOfFloors);
    if (!floors || floors <= 0) return null;
    return suggestZoneCount(floors);
  }, [formData.numberOfFloors]);

  // Zone helpers
  const addZone = () => {
    haptic.light();
    onUpdate('zones', [
      ...zones,
      {
        id: crypto.randomUUID(),
        zoneNumber: zones.length + 1,
        zoneName: '',
        location: '',
        detectorCount: 0,
        callPointCount: 0,
        sounderCount: 0,
      },
    ]);
  };
  const removeZone = (id: string) => {
    if (zones.length <= 1) return;
    haptic.medium();
    onUpdate(
      'zones',
      zones.filter((z) => z.id !== id)
    );
  };
  const updateZone = (id: string, field: string, value: any) =>
    onUpdate(
      'zones',
      zones.map((z) => (z.id === id ? { ...z, [field]: value } : z))
    );

  // Interface helpers
  const addInterface = () => {
    haptic.light();
    onUpdate('interfaceEquipment', [
      ...interfaces,
      { id: crypto.randomUUID(), type: '', location: '', details: '' },
    ]);
  };
  const removeInterface = (id: string) => {
    haptic.medium();
    onUpdate(
      'interfaceEquipment',
      interfaces.filter((i: any) => i.id !== id)
    );
  };
  const updateInterface = (id: string, field: string, value: any) =>
    onUpdate(
      'interfaceEquipment',
      interfaces.map((i: any) => (i.id === id ? { ...i, [field]: value } : i))
    );

  // Planned totals
  const plannedDetectors =
    (formData.plannedOpticalSmoke || 0) +
    (formData.plannedHeat || 0) +
    (formData.plannedMultiSensor || 0) +
    (formData.plannedBeam || 0) +
    (formData.plannedAspirating || 0) +
    (formData.plannedFlame || 0) +
    (formData.plannedCO || 0);
  const plannedCPs = formData.plannedCallPoints || 0;
  const plannedSounders = formData.plannedSounders || 0;

  // Zone totals (for mismatch warning)
  const zoneDetectors = zones.reduce((sum, z) => sum + (z.detectorCount || 0), 0);
  const zoneCPs = zones.reduce((sum, z) => sum + (z.callPointCount || 0), 0);
  const zoneSounders = zones.reduce((sum, z) => sum + (z.sounderCount || 0), 0);
  const hasMismatch =
    zones.length > 0 &&
    ((plannedDetectors > 0 && zoneDetectors !== plannedDetectors) ||
      (plannedCPs > 0 && zoneCPs !== plannedCPs) ||
      (plannedSounders > 0 && zoneSounders !== plannedSounders));

  return (
    <div className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Empty state */}
      {zones.length === 0 && plannedDetectors === 0 && (
        <div className="rounded-xl bg-white/[0.05] p-4 text-center lg:col-span-2">
          <p className="text-sm font-medium text-white">
            Start by entering your planned device quantities
          </p>
          <p className="text-xs text-white/80 mt-1">
            Then add zones and assign device counts to each zone
          </p>
        </div>
      )}

      {/* Planned device quantities */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Planned device quantities" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
          <Field label="Optical smoke">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.plannedOpticalSmoke || ''}
              onChange={(e) => onUpdate('plannedOpticalSmoke', parseInt(e.target.value) || 0)}
              className={inputCn}
            />
          </Field>
          <Field label="Heat">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.plannedHeat || ''}
              onChange={(e) => onUpdate('plannedHeat', parseInt(e.target.value) || 0)}
              className={inputCn}
            />
          </Field>
          <Field label="Multi-sensor">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.plannedMultiSensor || ''}
              onChange={(e) => onUpdate('plannedMultiSensor', parseInt(e.target.value) || 0)}
              className={inputCn}
            />
          </Field>
          <Field label="Beam">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.plannedBeam || ''}
              onChange={(e) => onUpdate('plannedBeam', parseInt(e.target.value) || 0)}
              className={inputCn}
            />
          </Field>
          <Field label="Aspirating">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.plannedAspirating || ''}
              onChange={(e) => onUpdate('plannedAspirating', parseInt(e.target.value) || 0)}
              className={inputCn}
            />
          </Field>
          <Field label="Flame">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.plannedFlame || ''}
              onChange={(e) => onUpdate('plannedFlame', parseInt(e.target.value) || 0)}
              className={inputCn}
            />
          </Field>
          <Field label="CO">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.plannedCO || ''}
              onChange={(e) => onUpdate('plannedCO', parseInt(e.target.value) || 0)}
              className={inputCn}
            />
          </Field>
        </div>
        <div className="grid grid-cols-3 gap-x-6 gap-y-4">
          <Field label="Call points">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.plannedCallPoints || ''}
              onChange={(e) => onUpdate('plannedCallPoints', parseInt(e.target.value) || 0)}
              className={inputCn}
            />
          </Field>
          <Field label="Sounders">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.plannedSounders || ''}
              onChange={(e) => onUpdate('plannedSounders', parseInt(e.target.value) || 0)}
              className={inputCn}
            />
          </Field>
          <Field label="VADs">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.plannedVADs || ''}
              onChange={(e) => onUpdate('plannedVADs', parseInt(e.target.value) || 0)}
              className={inputCn}
            />
          </Field>
        </div>
        {/* Summary tiles */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl bg-white/[0.05] p-3 text-center">
            <p className="text-2xl font-bold text-red-400">{plannedDetectors}</p>
            <p className="text-[11px] text-white/80">Detectors</p>
          </div>
          <div className="rounded-xl bg-white/[0.05] p-3 text-center">
            <p className="text-2xl font-bold text-elec-yellow">{plannedSounders}</p>
            <p className="text-[11px] text-white/80">Sounders</p>
          </div>
          <div className="rounded-xl bg-white/[0.05] p-3 text-center">
            <p className="text-2xl font-bold text-green-400">{plannedCPs}</p>
            <p className="text-[11px] text-white/80">Call points</p>
          </div>
        </div>
      </div>

      {/* Smart suggestions */}
      {(detectorSuggestion || cpSuggestion) && (
        <div className="space-y-2 lg:col-span-2">
          {detectorSuggestion && (
            <div className="rounded-xl border border-amber-500/30 bg-white/[0.05] p-3">
              <p className="text-xs font-semibold text-amber-400">
                Suggested: {detectorSuggestion.count} detectors minimum
              </p>
              <p className="text-xs text-white/85 mt-1">{detectorSuggestion.reason}</p>
            </div>
          )}
          {cpSuggestion && (
            <div className="rounded-xl border border-amber-500/30 bg-white/[0.05] p-3">
              <p className="text-xs font-semibold text-amber-400">
                Suggested: {cpSuggestion.count} call points minimum
              </p>
              <p className="text-xs text-white/85 mt-1">{cpSuggestion.reason}</p>
            </div>
          )}
        </div>
      )}

      {/* Zone schedule */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Zone schedule" count={zones.length} />
        {/* Mismatch warning */}
        {hasMismatch && (
          <div className="rounded-xl border border-amber-500/30 bg-white/[0.05] p-3">
            <p className="text-xs text-amber-400">
              Zone device totals don't match planned quantities above. Zones: {zoneDetectors} det /{' '}
              {zoneCPs} CP / {zoneSounders} snd vs Planned: {plannedDetectors} / {plannedCPs} /{' '}
              {plannedSounders}
            </p>
          </div>
        )}
        {zones.map((zone) => (
          <div key={zone.id} className="border-t border-white/[0.08] pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">Zone {zone.zoneNumber}</span>
              {zones.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeZone(zone.id)}
                  className={removeButtonCn}
                >
                  Remove
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <Field label="Name">
                <Input
                  value={zone.zoneName}
                  onChange={(e) => updateZone(zone.id, 'zoneName', e.target.value)}
                  className={inputCn}
                  placeholder="e.g. Ground Floor"
                />
              </Field>
              <Field label="Location">
                <Input
                  value={zone.location}
                  onChange={(e) => updateZone(zone.id, 'location', e.target.value)}
                  className={inputCn}
                  placeholder="e.g. Main building"
                />
              </Field>
            </div>
            <div className="grid grid-cols-3 gap-x-6 gap-y-4">
              <Field label="Detectors">
                <Input
                  type="number"
                  inputMode="numeric"
                  value={zone.detectorCount || ''}
                  onChange={(e) =>
                    updateZone(zone.id, 'detectorCount', parseInt(e.target.value) || 0)
                  }
                  className={inputCn}
                />
              </Field>
              <Field label="CPs">
                <Input
                  type="number"
                  inputMode="numeric"
                  value={zone.callPointCount || ''}
                  onChange={(e) =>
                    updateZone(zone.id, 'callPointCount', parseInt(e.target.value) || 0)
                  }
                  className={inputCn}
                />
              </Field>
              <Field label="Sounders">
                <Input
                  type="number"
                  inputMode="numeric"
                  value={zone.sounderCount || ''}
                  onChange={(e) =>
                    updateZone(zone.id, 'sounderCount', parseInt(e.target.value) || 0)
                  }
                  className={inputCn}
                />
              </Field>
            </div>
            <Field label="Notification method">
              <ComboboxCell
                value={zone.notificationMethod || ''}
                onChange={(v) => updateZone(zone.id, 'notificationMethod', v)}
                options={[
                  { value: 'sounder', label: 'Sounder' },
                  { value: 'voice-alarm', label: 'Voice Alarm' },
                  { value: 'vad', label: 'Visual Alarm (VAD)' },
                  { value: 'sounder-vad', label: 'Sounder + VAD' },
                  { value: 'voice-vad', label: 'Voice Alarm + VAD' },
                  { value: 'staff-alert', label: 'Staff Alert Only' },
                ]}
                placeholder="Select notification..."
                className="h-11 text-base"
              />
            </Field>
          </div>
        ))}
        {zoneSuggestion && zones.length < zoneSuggestion.count && (
          <div className="rounded-xl border border-amber-500/30 bg-white/[0.05] p-3">
            <p className="text-xs text-amber-400">
              {zoneSuggestion.reason} — you have {zones.length} of {zoneSuggestion.count} minimum
            </p>
          </div>
        )}
        <button type="button" onClick={addZone} className={addButtonCn}>
          Add zone
        </button>
      </div>

      {/* Detector spacing calculations */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Detector spacing & coverage" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Ceiling height (m)">
            <ComboboxCell
              value={formData.ceilingHeight || ''}
              onChange={(v) => onUpdate('ceilingHeight', v)}
              options={ceilingHeightOptions}
              placeholder="Select or type..."
              className="h-11 text-base"
            />
          </Field>
          <Field label="Beam spacing">
            <ComboboxCell
              value={formData.beamSpacing || ''}
              onChange={(v) => onUpdate('beamSpacing', v)}
              options={beamSpacingOptions}
              placeholder="Select or type..."
              className="h-11 text-base"
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Detector spacing (m)">
            <Input
              value={formData.detectorSpacing || ''}
              onChange={(e) => onUpdate('detectorSpacing', e.target.value)}
              inputMode="decimal"
              className={inputCn}
              placeholder="e.g. 5.3m radius"
            />
          </Field>
          <Field label="Coverage per detector (m2)">
            <Input
              value={formData.coveragePerDetector || ''}
              onChange={(e) => onUpdate('coveragePerDetector', e.target.value)}
              inputMode="decimal"
              className={inputCn}
              placeholder="e.g. 100"
            />
          </Field>
        </div>
        <Field label="Spacing calculations & notes">
          <Textarea
            value={formData.spacingCalculations || ''}
            onChange={(e) => onUpdate('spacingCalculations', e.target.value)}
            className={textareaCn}
            placeholder="Document detector spacing calculations, coverage overlaps, any adjustments for ceiling type or beam spacing..."
          />
        </Field>
      </div>

      {/* Interface equipment */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Planned interface equipment" count={interfaces.length} />
        {interfaces.map((iface: any, idx: number) => (
          <div key={iface.id} className="border-t border-white/[0.08] pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">
                Interface {idx + 1} of {interfaces.length}
              </span>
              <button
                type="button"
                onClick={() => removeInterface(iface.id)}
                className={removeButtonCn}
              >
                Remove
              </button>
            </div>
            <Field label="Type">
              <ComboboxCell
                value={iface.type}
                onChange={(v) => updateInterface(iface.id, 'type', v)}
                options={interfaceTypeOptions}
                placeholder="Select type..."
                className="h-11 text-base"
              />
            </Field>
            <Field label="Location">
              <Input
                value={iface.location || ''}
                onChange={(e) => updateInterface(iface.id, 'location', e.target.value)}
                className={inputCn}
                placeholder="e.g. Main entrance"
              />
            </Field>
            <Field label="Details">
              <Input
                value={iface.details || ''}
                onChange={(e) => updateInterface(iface.id, 'details', e.target.value)}
                className={inputCn}
                placeholder="Design notes..."
              />
            </Field>
          </div>
        ))}
        <button type="button" onClick={addInterface} className={addButtonCn}>
          Add interface
        </button>
      </div>

      {/* Drawing schedule (G1 unique) */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Drawing schedule" count={(formData.drawings || []).length} />
        {(formData.drawings || []).map((dwg: any, idx: number) => (
          <div key={dwg.id} className="border-t border-white/[0.08] pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">
                Drawing {idx + 1} of {(formData.drawings || []).length}
              </span>
              <button
                type="button"
                onClick={() => {
                  haptic.medium();
                  onUpdate(
                    'drawings',
                    (formData.drawings || []).filter((d: any) => d.id !== dwg.id)
                  );
                }}
                className={removeButtonCn}
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <Field label="Drawing no.">
                <Input
                  value={dwg.number || ''}
                  onChange={(e) =>
                    onUpdate(
                      'drawings',
                      (formData.drawings || []).map((d: any) =>
                        d.id === dwg.id ? { ...d, number: e.target.value } : d
                      )
                    )
                  }
                  className={inputCn}
                  placeholder="e.g. FA-001"
                />
              </Field>
              <Field label="Revision">
                <Input
                  value={dwg.revision || ''}
                  onChange={(e) =>
                    onUpdate(
                      'drawings',
                      (formData.drawings || []).map((d: any) =>
                        d.id === dwg.id ? { ...d, revision: e.target.value } : d
                      )
                    )
                  }
                  className={inputCn}
                  placeholder="e.g. Rev A"
                />
              </Field>
            </div>
            <Field label="Title">
              <Input
                value={dwg.title || ''}
                onChange={(e) =>
                  onUpdate(
                    'drawings',
                    (formData.drawings || []).map((d: any) =>
                      d.id === dwg.id ? { ...d, title: e.target.value } : d
                    )
                  )
                }
                className={inputCn}
                placeholder="e.g. Ground Floor Detection Layout"
              />
            </Field>
            <Field label="Date">
              <Input
                type="date"
                value={dwg.date || ''}
                onChange={(e) =>
                  onUpdate(
                    'drawings',
                    (formData.drawings || []).map((d: any) =>
                      d.id === dwg.id ? { ...d, date: e.target.value } : d
                    )
                  )
                }
                className={inputCn}
              />
            </Field>
          </div>
        ))}
        <button
          type="button"
          onClick={() => {
            haptic.light();
            onUpdate('drawings', [
              ...(formData.drawings || []),
              { id: crypto.randomUUID(), number: '', title: '', revision: '', date: '' },
            ]);
          }}
          className={addButtonCn}
        >
          Add drawing
        </button>
      </div>

      {/* Cable route notes */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Cable route design" />
        <Field label="Cable route notes">
          <Textarea
            value={formData.cableRouteNotes || ''}
            onChange={(e) => onUpdate('cableRouteNotes', e.target.value)}
            className={textareaCn}
            placeholder="Describe planned cable routing, containment, segregation from other services..."
          />
        </Field>
      </div>
    </div>
  );
}
