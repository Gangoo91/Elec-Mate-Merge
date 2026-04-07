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
import { Plus, Trash2, AlertTriangle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import { FireAlarmZone } from '@/types/fire-alarm';
import ComboboxCell from '@/components/table-cells/ComboboxCell';
import {
  suggestDetectorCount,
  suggestCallPointCount,
  suggestZoneCount,
} from '@/data/fireAlarmEquipmentDatabase';

const inputCn =
  'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';
const inputSmCn =
  'h-10 text-sm touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';
const textareaCn =
  'touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';

const Section = ({
  title,
  accentColor,
  count,
  children,
}: {
  title: string;
  accentColor?: string;
  count?: number;
  children: React.ReactNode;
}) => (
  <div className="space-y-4">
    <div className="border-b border-white/[0.06] pb-1 mb-3">
      <div
        className={cn(
          'h-[2px] w-full rounded-full bg-gradient-to-r mb-2',
          accentColor || 'from-red-500 to-rose-400'
        )}
      />
      <h2 className="text-xs font-medium text-white uppercase tracking-wider flex items-center gap-2">
        {title}
        {count !== undefined && (
          <span className="text-[10px] font-bold text-white bg-white/[0.1] px-2 py-0.5 rounded">
            {count}
          </span>
        )}
      </h2>
    </div>
    {children}
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">{label}</Label>
    {children}
  </div>
);

const ceilingTypeOptions = [
  { value: 'Flat plasterboard 2.4m', label: 'Flat plasterboard 2.4m' },
  { value: 'Flat plasterboard 2.7m', label: 'Flat plasterboard 2.7m' },
  { value: 'Flat plasterboard 3.0m', label: 'Flat plasterboard 3.0m' },
  { value: 'Suspended tiles 2.7m', label: 'Suspended tiles 2.7m' },
  { value: 'Suspended tiles 3.0m', label: 'Suspended tiles 3.0m' },
  { value: 'Exposed soffit 3.5m', label: 'Exposed soffit 3.5m' },
  { value: 'Exposed soffit 4.0m+', label: 'Exposed soffit 4.0m+' },
  { value: 'Vaulted/pitched', label: 'Vaulted / pitched' },
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
    <div className="space-y-5">
      {/* Empty state */}
      {zones.length === 0 && plannedDetectors === 0 && (
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 text-center">
          <p className="text-sm font-medium text-white">
            Start by entering your planned device quantities
          </p>
          <p className="text-xs text-white mt-1">
            Then add zones and assign device counts to each zone
          </p>
        </div>
      )}

      {/* Planned Device Quantities */}
      <Section title="Planned Device Quantities" accentColor="from-amber-500/40 to-yellow-400/20">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Field label="Optical Smoke">
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
          <Field label="Flame / CO">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.plannedFlame || ''}
              onChange={(e) => onUpdate('plannedFlame', parseInt(e.target.value) || 0)}
              className={inputCn}
            />
          </Field>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <Field label="Call Points">
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
        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-3 mt-2">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
            <p className="text-2xl font-bold text-red-400">{plannedDetectors}</p>
            <p className="text-[10px] text-white uppercase">Detectors</p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
            <p className="text-2xl font-bold text-blue-400">{plannedSounders}</p>
            <p className="text-[10px] text-white uppercase">Sounders</p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
            <p className="text-2xl font-bold text-green-400">{plannedCPs}</p>
            <p className="text-[10px] text-white uppercase">Call Points</p>
          </div>
        </div>
      </Section>

      {/* Smart Suggestions */}
      {(detectorSuggestion || cpSuggestion) && (
        <div className="space-y-2">
          {detectorSuggestion && (
            <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3">
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-amber-400">
                    Suggested: {detectorSuggestion.count} detectors minimum
                  </p>
                  <p className="text-xs text-white mt-1">{detectorSuggestion.reason}</p>
                </div>
              </div>
            </div>
          )}
          {cpSuggestion && (
            <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3">
              <div className="flex items-start gap-2">
                <Sparkles className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-amber-400">
                    Suggested: {cpSuggestion.count} call points minimum
                  </p>
                  <p className="text-xs text-white mt-1">{cpSuggestion.reason}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Zone Schedule */}
      <Section
        title="Zone Schedule"
        accentColor="from-red-500/40 to-orange-400/20"
        count={zones.length}
      >
        {/* Mismatch warning */}
        {hasMismatch && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
            <p className="text-xs text-amber-400">
              Zone device totals don't match planned quantities above. Zones: {zoneDetectors} det /{' '}
              {zoneCPs} CP / {zoneSounders} snd vs Planned: {plannedDetectors} / {plannedCPs} /{' '}
              {plannedSounders}
            </p>
          </div>
        )}
        {zones.map((zone) => (
          <div
            key={zone.id}
            className="p-3.5 bg-white/[0.03] rounded-xl border border-white/[0.06] space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-elec-yellow">Zone {zone.zoneNumber}</span>
              {zones.length > 1 && (
                <button
                  onClick={() => removeZone(zone.id)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center border border-red-500/20 bg-red-500/10 text-red-400 touch-manipulation active:scale-90"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Name">
                <Input
                  value={zone.zoneName}
                  onChange={(e) => updateZone(zone.id, 'zoneName', e.target.value)}
                  className={inputSmCn}
                  placeholder="e.g. Ground Floor"
                />
              </Field>
              <Field label="Location">
                <Input
                  value={zone.location}
                  onChange={(e) => updateZone(zone.id, 'location', e.target.value)}
                  className={inputSmCn}
                  placeholder="e.g. Main building"
                />
              </Field>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <Field label="Detectors">
                <Input
                  type="number"
                  inputMode="numeric"
                  value={zone.detectorCount || ''}
                  onChange={(e) =>
                    updateZone(zone.id, 'detectorCount', parseInt(e.target.value) || 0)
                  }
                  className={inputSmCn}
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
                  className={inputSmCn}
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
                  className={inputSmCn}
                />
              </Field>
            </div>
            <Field label="Notification Method">
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
                className="h-10 text-sm"
              />
            </Field>
          </div>
        ))}
        {zoneSuggestion && zones.length < zoneSuggestion.count && (
          <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3">
            <div className="flex items-start gap-2">
              <Sparkles className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-400">
                {zoneSuggestion.reason} — you have {zones.length} of {zoneSuggestion.count} minimum
              </p>
            </div>
          </div>
        )}
        <button
          onClick={addZone}
          className="w-full h-12 rounded-xl border-2 border-dashed border-red-500/20 flex items-center justify-center gap-2 text-sm font-medium text-red-400 touch-manipulation active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> Add Zone
        </button>
      </Section>

      {/* Detector Spacing Calculations */}
      <Section title="Detector Spacing & Coverage" accentColor="from-red-500/40 to-rose-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Ceiling Height (m)">
            <ComboboxCell
              value={formData.ceilingHeight || ''}
              onChange={(v) => onUpdate('ceilingHeight', v)}
              options={ceilingTypeOptions}
              placeholder="Select or type..."
              className="h-12 text-base"
            />
          </Field>
          <Field label="Beam Spacing">
            <ComboboxCell
              value={formData.beamSpacing || ''}
              onChange={(v) => onUpdate('beamSpacing', v)}
              options={beamSpacingOptions}
              placeholder="Select or type..."
              className="h-12 text-base"
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Detector Spacing (m)">
            <Input
              value={formData.detectorSpacing || ''}
              onChange={(e) => onUpdate('detectorSpacing', e.target.value)}
              inputMode="decimal"
              className={inputCn}
              placeholder="e.g. 5.3m radius"
            />
          </Field>
          <Field label="Coverage per Detector (m2)">
            <Input
              value={formData.coveragePerDetector || ''}
              onChange={(e) => onUpdate('coveragePerDetector', e.target.value)}
              inputMode="decimal"
              className={inputCn}
              placeholder="e.g. 100"
            />
          </Field>
        </div>
        <Field label="Spacing Calculations & Notes">
          <Textarea
            value={formData.spacingCalculations || ''}
            onChange={(e) => onUpdate('spacingCalculations', e.target.value)}
            className={textareaCn}
            placeholder="Document detector spacing calculations, coverage overlaps, any adjustments for ceiling type or beam spacing..."
          />
        </Field>
      </Section>

      {/* Interface Equipment */}
      <Section
        title="Planned Interface Equipment"
        accentColor="from-cyan-500/40 to-blue-400/20"
        count={interfaces.length}
      >
        {interfaces.map((iface: any, idx: number) => (
          <div key={iface.id} className="rounded-xl border border-white/[0.06] overflow-hidden">
            <div className="flex items-center justify-between px-3.5 py-2 bg-white/[0.04] border-b border-white/[0.06]">
              <span className="text-xs font-bold text-cyan-400">
                Interface {idx + 1} of {interfaces.length}
              </span>
              <button
                onClick={() => removeInterface(iface.id)}
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-red-500/20 bg-red-500/10 text-red-400 touch-manipulation active:scale-90"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="p-3.5 space-y-3 bg-white/[0.02]">
              <Field label="Type">
                <ComboboxCell
                  value={iface.type}
                  onChange={(v) => updateInterface(iface.id, 'type', v)}
                  options={interfaceTypeOptions}
                  placeholder="Select type..."
                  className="h-12 text-base"
                />
              </Field>
              <Field label="Location">
                <Input
                  value={iface.location || ''}
                  onChange={(e) => updateInterface(iface.id, 'location', e.target.value)}
                  className={inputSmCn}
                  placeholder="e.g. Main entrance"
                />
              </Field>
              <Field label="Details">
                <Input
                  value={iface.details || ''}
                  onChange={(e) => updateInterface(iface.id, 'details', e.target.value)}
                  className={inputSmCn}
                  placeholder="Design notes..."
                />
              </Field>
            </div>
          </div>
        ))}
        <button
          onClick={addInterface}
          className="w-full h-12 rounded-xl border-2 border-dashed border-cyan-500/20 flex items-center justify-center gap-2 text-sm font-medium text-cyan-400 touch-manipulation active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> Add Interface
        </button>
      </Section>

      {/* Drawing Schedule (G1 unique) */}
      <Section
        title="Drawing Schedule"
        accentColor="from-amber-500/40 to-yellow-400/20"
        count={(formData.drawings || []).length}
      >
        {(formData.drawings || []).map((dwg: any, idx: number) => (
          <div key={dwg.id} className="rounded-xl border border-white/[0.06] overflow-hidden">
            <div className="flex items-center justify-between px-3.5 py-2 bg-white/[0.04] border-b border-white/[0.06]">
              <span className="text-xs font-bold text-amber-400">
                Drawing {idx + 1} of {(formData.drawings || []).length}
              </span>
              <button
                onClick={() => {
                  haptic.medium();
                  onUpdate(
                    'drawings',
                    (formData.drawings || []).filter((d: any) => d.id !== dwg.id)
                  );
                }}
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-red-500/20 bg-red-500/10 text-red-400 touch-manipulation active:scale-90"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="p-3.5 space-y-3 bg-white/[0.02]">
              <div className="grid grid-cols-2 gap-2">
                <Field label="Drawing No.">
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
                    className={inputSmCn}
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
                    className={inputSmCn}
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
                  className={inputSmCn}
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
                  className={cn(inputSmCn, '[color-scheme:dark]')}
                />
              </Field>
            </div>
          </div>
        ))}
        <button
          onClick={() => {
            haptic.light();
            onUpdate('drawings', [
              ...(formData.drawings || []),
              { id: crypto.randomUUID(), number: '', title: '', revision: '', date: '' },
            ]);
          }}
          className="w-full h-12 rounded-xl border-2 border-dashed border-amber-500/20 flex items-center justify-center gap-2 text-sm font-medium text-amber-400 touch-manipulation active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" /> Add Drawing
        </button>
      </Section>

      {/* Cable Route Notes */}
      <Section title="Cable Route Design" accentColor="from-red-500/40 to-rose-400/20">
        <Field label="Cable Route Notes">
          <Textarea
            value={formData.cableRouteNotes || ''}
            onChange={(e) => onUpdate('cableRouteNotes', e.target.value)}
            className={textareaCn}
            placeholder="Describe planned cable routing, containment, segregation from other services..."
          />
        </Field>
      </Section>
    </div>
  );
}
