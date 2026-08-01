/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G2 — Tab 3: Zones & Devices
 * Zone schedule, detector/sounder/call point device schedules
 * Smart features: auto-count, duplicate, numbering, dB validation, compatibility
 */

import { useRef, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useHaptic } from '@/hooks/useHaptic';
import { cn } from '@/lib/utils';
import {
  FireAlarmZone,
  FireAlarmDetector,
  FireAlarmSounder,
  FireAlarmCallPoint,
} from '@/types/fire-alarm';
import ComboboxCell from '@/components/table-cells/ComboboxCell';
import { getCompatibleDetectors } from '@/data/fireAlarmEquipmentDatabase';
import { useFireAlarmSmartForm } from '@/hooks/inspection/useFireAlarmSmartForm';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const addButtonCn =
  'w-full h-11 rounded-xl border border-dashed border-white/[0.25] text-sm font-medium text-elec-yellow touch-manipulation active:scale-[0.98] transition-transform';

const entryActionCn = 'h-11 px-2 text-sm font-medium touch-manipulation active:opacity-70';

const SectionHeader = ({ title, count }: { title: string; count?: number }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">
    {title}
    {count !== undefined && <span className="ml-2 font-normal text-white/80">({count})</span>}
  </h2>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className={labelCn}>{label}</Label>
    {children}
  </div>
);

/* ── Option lists ── */

const detectorTypeOptions = [
  { value: 'optical-smoke', label: 'Optical Smoke' },
  { value: 'ionisation-smoke', label: 'Ionisation Smoke' },
  { value: 'heat-fixed', label: 'Heat (Fixed)' },
  { value: 'heat-ror', label: 'Heat (Rate of Rise)' },
  { value: 'multi-sensor', label: 'Multi-sensor' },
  { value: 'beam', label: 'Beam' },
  { value: 'aspirating', label: 'Aspirating' },
  { value: 'flame', label: 'Flame' },
  { value: 'co', label: 'CO' },
  { value: 'linear-heat', label: 'Linear Heat' },
  { value: 'duct', label: 'Duct Detector' },
  { value: 'video', label: 'Video Smoke Detection' },
];

const sounderTypeOptions = [
  { value: 'bell', label: 'Bell' },
  { value: 'electronic-sounder', label: 'Electronic Sounder' },
  { value: 'voice-alarm', label: 'Voice Alarm' },
  { value: 'visual-beacon', label: 'Visual Beacon (VAD)' },
  { value: 'sounder-beacon', label: 'Sounder/Beacon Combined' },
  { value: 'wall-sounder', label: 'Wall Sounder' },
  { value: 'ceiling-sounder', label: 'Ceiling Sounder' },
];

const callPointTypeOptions = [
  { value: 'resettable', label: 'Resettable' },
  { value: 'break-glass', label: 'Break Glass' },
  { value: 'waterproof', label: 'Waterproof (IP67)' },
  { value: 'is-resettable', label: 'IS Resettable' },
  { value: 'key-operated', label: 'Key-operated' },
];

interface Props {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

export default function FAZonesDevices({ formData, onUpdate }: Props) {
  const zones: FireAlarmZone[] = formData.zones || [];
  const detectors: FireAlarmDetector[] = formData.detectors || [];
  const sounders: FireAlarmSounder[] = formData.sounders || [];
  const callPoints: FireAlarmCallPoint[] = formData.callPoints || [];
  const { validateSoundReading } = useFireAlarmSmartForm();
  const haptic = useHaptic();

  // Hidden file inputs for device photos
  const detPhotoRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const sndPhotoRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const cpPhotoRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const zoneOptions = zones.map((z) => ({
    value: z.id,
    label: `Zone ${z.zoneNumber} — ${z.zoneName || 'Unnamed'}`,
  }));

  // ── Auto-count devices per zone ──
  const zoneDetCount = (zoneId: string) => detectors.filter((d) => d.zoneId === zoneId).length;
  const zoneSndCount = (zoneId: string) => sounders.filter((s) => s.zoneId === zoneId).length;
  const zoneCpCount = (zoneId: string) => callPoints.filter((c) => c.zoneId === zoneId).length;
  const hasDevicesListed = detectors.length > 0 || sounders.length > 0 || callPoints.length > 0;

  // ── Panel compatibility check ──
  const compatibleDetectorMakes = useMemo(() => {
    if (!formData.panelId) return null;
    try {
      const compatible = getCompatibleDetectors(formData.panelId);
      if (!compatible || compatible.length === 0) return null;
      return new Set(compatible.map((d: any) => d.manufacturer?.toLowerCase()));
    } catch {
      return null;
    }
  }, [formData.panelId]);

  const isDetectorCompatible = (make: string) => {
    if (!compatibleDetectorMakes || !make) return true;
    return compatibleDetectorMakes.has(make.toLowerCase());
  };

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

  // Detector helpers
  const addDetector = () => {
    haptic.light();
    onUpdate('detectors', [
      ...detectors,
      {
        id: crypto.randomUUID(),
        zoneId: '',
        location: '',
        type: '',
        make: '',
        model: '',
        serialNumber: '',
        installDate: '',
        testResult: '',
        notes: '',
      },
    ]);
  };
  const removeDetector = (id: string) => {
    haptic.medium();
    onUpdate(
      'detectors',
      detectors.filter((d) => d.id !== id)
    );
  };
  const updateDetector = (id: string, field: string, value: any) =>
    onUpdate(
      'detectors',
      detectors.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
  const duplicateDetector = (det: FireAlarmDetector) => {
    haptic.light();
    onUpdate('detectors', [
      ...detectors,
      { ...det, id: crypto.randomUUID(), serialNumber: '', location: '', photo: undefined },
    ]);
  };

  // Sounder helpers
  const addSounder = () => {
    haptic.light();
    onUpdate('sounders', [
      ...sounders,
      {
        id: crypto.randomUUID(),
        zoneId: '',
        location: '',
        type: '',
        make: '',
        model: '',
        dBReading: '',
        testResult: '',
      },
    ]);
  };
  const removeSounder = (id: string) => {
    haptic.medium();
    onUpdate(
      'sounders',
      sounders.filter((s) => s.id !== id)
    );
  };
  const updateSounder = (id: string, field: string, value: any) =>
    onUpdate(
      'sounders',
      sounders.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  const duplicateSounder = (snd: FireAlarmSounder) => {
    haptic.light();
    onUpdate('sounders', [
      ...sounders,
      { ...snd, id: crypto.randomUUID(), location: '', dBReading: '', photo: undefined },
    ]);
  };

  // Call point helpers
  const addCallPoint = () => {
    haptic.light();
    onUpdate('callPoints', [
      ...callPoints,
      {
        id: crypto.randomUUID(),
        zoneId: '',
        location: '',
        type: 'resettable',
        make: '',
        model: '',
        testResult: '',
      },
    ]);
  };
  const removeCallPoint = (id: string) => {
    haptic.medium();
    onUpdate(
      'callPoints',
      callPoints.filter((c) => c.id !== id)
    );
  };
  const updateCallPoint = (id: string, field: string, value: any) =>
    onUpdate(
      'callPoints',
      callPoints.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  const duplicateCallPoint = (cp: FireAlarmCallPoint) => {
    haptic.light();
    onUpdate('callPoints', [
      ...callPoints,
      { ...cp, id: crypto.randomUUID(), location: '', photo: undefined },
    ]);
  };

  // Photo capture helper
  const handlePhoto = (
    e: React.ChangeEvent<HTMLInputElement>,
    arrayField: string,
    items: any[],
    id: string
  ) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onUpdate(
        arrayField,
        items.map((item) => (item.id === id ? { ...item, photo: reader.result as string } : item))
      );
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = (arrayField: string, items: any[], id: string) => {
    onUpdate(
      arrayField,
      items.map((item) => (item.id === id ? { ...item, photo: undefined } : item))
    );
  };

  // dB validation for sounders
  const getDbValidation = (dBReading: string) => {
    if (!dBReading) return null;
    return validateSoundReading(dBReading);
  };

  return (
    <div className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Getting started hint */}
      {zones.length === 0 && detectors.length === 0 && (
        <div className="lg:col-span-2 rounded-xl bg-white/[0.05] p-4 text-center">
          <p className="text-sm font-medium text-white">Start by adding your zones</p>
          <p className="text-[12px] text-white/80 mt-1">
            Then add detectors, sounders, and call points and assign them to zones
          </p>
        </div>
      )}

      {/* Zone schedule */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Zone schedule" count={zones.length} />
        {zones.map((zone) => {
          const autoDetCount = zoneDetCount(zone.id);
          const autoSndCount = zoneSndCount(zone.id);
          const autoCpCount = zoneCpCount(zone.id);
          return (
            <div key={zone.id} className="border-t border-white/[0.08] pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">Zone {zone.zoneNumber}</p>
                {zones.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeZone(zone.id)}
                    className={cn(entryActionCn, '-mr-2 text-red-400')}
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
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
              {hasDevicesListed ? (
                /* Auto-counted from device lists */
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-xl bg-white/[0.05] p-2 text-center">
                    <p className="text-base font-bold text-elec-yellow">{autoDetCount}</p>
                    <p className="text-[11px] text-white/80">Detectors</p>
                  </div>
                  <div className="rounded-xl bg-white/[0.05] p-2 text-center">
                    <p className="text-base font-bold text-green-400">{autoCpCount}</p>
                    <p className="text-[11px] text-white/80">Call points</p>
                  </div>
                  <div className="rounded-xl bg-white/[0.05] p-2 text-center">
                    <p className="text-base font-bold text-blue-400">{autoSndCount}</p>
                    <p className="text-[11px] text-white/80">Sounders</p>
                  </div>
                </div>
              ) : (
                /* Manual entry when no devices listed */
                <div className="grid grid-cols-3 gap-x-3 gap-y-4">
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
                  <Field label="Call points">
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
              )}
            </div>
          );
        })}
        <button type="button" onClick={addZone} className={addButtonCn}>
          Add zone
        </button>
      </div>

      {/* Detectors */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Detectors" count={detectors.length} />
        {detectors.map((det, idx) => (
          <div key={det.id} className="border-t border-white/[0.08] pt-4 space-y-4">
            {/* Entry heading + actions */}
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-white">
                Detector {idx + 1} of {detectors.length}
              </p>
              <div className="flex items-center">
                <input
                  ref={(el) => {
                    detPhotoRefs.current[det.id] = el;
                  }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handlePhoto(e, 'detectors', detectors, det.id)}
                />
                <button
                  type="button"
                  onClick={() => duplicateDetector(det)}
                  className={cn(entryActionCn, 'text-white/85')}
                >
                  Duplicate
                </button>
                <button
                  type="button"
                  onClick={() => detPhotoRefs.current[det.id]?.click()}
                  className={cn(entryActionCn, 'text-white/85')}
                >
                  Photo
                </button>
                <button
                  type="button"
                  onClick={() => removeDetector(det.id)}
                  className={cn(entryActionCn, '-mr-2 text-red-400')}
                >
                  Remove
                </button>
              </div>
            </div>
            {/* Compatibility warning */}
            {det.make && !isDetectorCompatible(det.make) && (
              <div className="rounded-xl border border-amber-500/40 bg-white/[0.05] px-3 py-2">
                <p className="text-[12px] text-amber-400">
                  This detector may not be compatible with the selected panel
                </p>
              </div>
            )}
            {det.photo && (
              <div className="flex items-center gap-3">
                <img
                  src={det.photo}
                  alt="Device"
                  className="w-20 h-20 rounded-lg border border-white/[0.12] object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto('detectors', detectors, det.id)}
                  className={cn(entryActionCn, 'text-red-400')}
                >
                  Remove photo
                </button>
              </div>
            )}
            <Field label="Type">
              <ComboboxCell
                value={det.type}
                onChange={(v) => updateDetector(det.id, 'type', v)}
                options={detectorTypeOptions}
                placeholder="Select detector type..."
                className="h-11 text-base"
              />
            </Field>
            <Field label="Location">
              <Input
                value={det.location}
                onChange={(e) => updateDetector(det.id, 'location', e.target.value)}
                className={inputCn}
                placeholder="e.g. First floor corridor"
              />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <Field label="Make">
                <Input
                  value={det.make}
                  onChange={(e) => updateDetector(det.id, 'make', e.target.value)}
                  className={inputCn}
                  placeholder="e.g. Apollo"
                />
              </Field>
              <Field label="Model">
                <Input
                  value={det.model}
                  onChange={(e) => updateDetector(det.id, 'model', e.target.value)}
                  className={inputCn}
                  placeholder="e.g. Discovery"
                />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <Field label="Serial no.">
                <Input
                  value={det.serialNumber}
                  onChange={(e) => updateDetector(det.id, 'serialNumber', e.target.value)}
                  className={inputCn}
                />
              </Field>
              <Field label="Install date">
                <Input
                  type="date"
                  value={det.installDate || ''}
                  onChange={(e) => updateDetector(det.id, 'installDate', e.target.value)}
                  className={inputCn}
                />
              </Field>
            </div>
            <Field label="Zone">
              <ComboboxCell
                value={det.zoneId}
                onChange={(v) => updateDetector(det.id, 'zoneId', v)}
                options={zoneOptions}
                placeholder="Assign zone"
                className="h-11 text-base"
                allowCustom={false}
              />
            </Field>
          </div>
        ))}
        <button type="button" onClick={addDetector} className={addButtonCn}>
          Add detector
        </button>
      </div>

      {/* Sounders */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Sounders & VADs" count={sounders.length} />
        {sounders.map((snd, idx) => {
          const dbVal = getDbValidation(snd.dBReading);
          return (
            <div key={snd.id} className="border-t border-white/[0.08] pt-4 space-y-4">
              {/* Entry heading + actions */}
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-white">
                  Sounder {idx + 1} of {sounders.length}
                </p>
                <div className="flex items-center">
                  <input
                    ref={(el) => {
                      sndPhotoRefs.current[snd.id] = el;
                    }}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handlePhoto(e, 'sounders', sounders, snd.id)}
                  />
                  <button
                    type="button"
                    onClick={() => duplicateSounder(snd)}
                    className={cn(entryActionCn, 'text-white/85')}
                  >
                    Duplicate
                  </button>
                  <button
                    type="button"
                    onClick={() => sndPhotoRefs.current[snd.id]?.click()}
                    className={cn(entryActionCn, 'text-white/85')}
                  >
                    Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => removeSounder(snd.id)}
                    className={cn(entryActionCn, '-mr-2 text-red-400')}
                  >
                    Remove
                  </button>
                </div>
              </div>
              {snd.photo && (
                <div className="flex items-center gap-3">
                  <img
                    src={snd.photo}
                    alt="Device"
                    className="w-20 h-20 rounded-lg border border-white/[0.12] object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto('sounders', sounders, snd.id)}
                    className={cn(entryActionCn, 'text-red-400')}
                  >
                    Remove photo
                  </button>
                </div>
              )}
              <Field label="Type">
                <ComboboxCell
                  value={snd.type}
                  onChange={(v) => updateSounder(snd.id, 'type', v)}
                  options={sounderTypeOptions}
                  placeholder="Select sounder type..."
                  className="h-11 text-base"
                />
              </Field>
              <Field label="Location">
                <Input
                  value={snd.location}
                  onChange={(e) => updateSounder(snd.id, 'location', e.target.value)}
                  className={inputCn}
                  placeholder="e.g. Main stairwell"
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <Field label="Make">
                  <Input
                    value={snd.make}
                    onChange={(e) => updateSounder(snd.id, 'make', e.target.value)}
                    className={inputCn}
                    placeholder="e.g. Hochiki"
                  />
                </Field>
                <Field label="Model">
                  <Input
                    value={snd.model}
                    onChange={(e) => updateSounder(snd.id, 'model', e.target.value)}
                    className={inputCn}
                    placeholder="e.g. CHQ-WB"
                  />
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <Field label="dB reading">
                  <div>
                    <Input
                      value={snd.dBReading || ''}
                      onChange={(e) => updateSounder(snd.id, 'dBReading', e.target.value)}
                      inputMode="decimal"
                      className={cn(
                        inputCn,
                        dbVal &&
                          (dbVal.status === 'pass'
                            ? 'border-green-500/60'
                            : dbVal.status === 'fail'
                              ? 'border-red-500/60'
                              : '')
                      )}
                      placeholder="e.g. 85"
                    />
                    {dbVal && (
                      <p
                        className={cn(
                          'text-[11px] mt-1',
                          dbVal.status === 'pass'
                            ? 'text-green-400'
                            : dbVal.status === 'fail'
                              ? 'text-red-400'
                              : 'text-amber-400'
                        )}
                      >
                        {dbVal.status === 'pass'
                          ? 'Pass'
                          : dbVal.status === 'fail'
                            ? `Fail — min ${dbVal.minRequired} dB`
                            : dbVal.message}
                      </p>
                    )}
                  </div>
                </Field>
                <Field label="Zone">
                  <ComboboxCell
                    value={snd.zoneId || ''}
                    onChange={(v) => updateSounder(snd.id, 'zoneId', v)}
                    options={zoneOptions}
                    placeholder="Assign zone"
                    className="h-11 text-base"
                    allowCustom={false}
                  />
                </Field>
              </div>
            </div>
          );
        })}
        <button type="button" onClick={addSounder} className={addButtonCn}>
          Add sounder / VAD
        </button>
      </div>

      {/* Call points */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Manual call points" count={callPoints.length} />
        {callPoints.map((cp, idx) => (
          <div key={cp.id} className="border-t border-white/[0.08] pt-4 space-y-4">
            {/* Entry heading + actions */}
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold text-white">
                Call point {idx + 1} of {callPoints.length}
              </p>
              <div className="flex items-center">
                <input
                  ref={(el) => {
                    cpPhotoRefs.current[cp.id] = el;
                  }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handlePhoto(e, 'callPoints', callPoints, cp.id)}
                />
                <button
                  type="button"
                  onClick={() => duplicateCallPoint(cp)}
                  className={cn(entryActionCn, 'text-white/85')}
                >
                  Duplicate
                </button>
                <button
                  type="button"
                  onClick={() => cpPhotoRefs.current[cp.id]?.click()}
                  className={cn(entryActionCn, 'text-white/85')}
                >
                  Photo
                </button>
                <button
                  type="button"
                  onClick={() => removeCallPoint(cp.id)}
                  className={cn(entryActionCn, '-mr-2 text-red-400')}
                >
                  Remove
                </button>
              </div>
            </div>
            {cp.photo && (
              <div className="flex items-center gap-3">
                <img
                  src={cp.photo}
                  alt="Device"
                  className="w-20 h-20 rounded-lg border border-white/[0.12] object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePhoto('callPoints', callPoints, cp.id)}
                  className={cn(entryActionCn, 'text-red-400')}
                >
                  Remove photo
                </button>
              </div>
            )}
            <Field label="Type">
              <ComboboxCell
                value={cp.type}
                onChange={(v) => updateCallPoint(cp.id, 'type', v)}
                options={callPointTypeOptions}
                placeholder="Select call point type..."
                className="h-11 text-base"
              />
            </Field>
            <Field label="Location">
              <Input
                value={cp.location}
                onChange={(e) => updateCallPoint(cp.id, 'location', e.target.value)}
                className={inputCn}
                placeholder="e.g. Ground floor entrance"
              />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <Field label="Make">
                <Input
                  value={cp.make}
                  onChange={(e) => updateCallPoint(cp.id, 'make', e.target.value)}
                  className={inputCn}
                  placeholder="e.g. KAC"
                />
              </Field>
              <Field label="Model">
                <Input
                  value={cp.model}
                  onChange={(e) => updateCallPoint(cp.id, 'model', e.target.value)}
                  className={inputCn}
                  placeholder="e.g. PS200"
                />
              </Field>
            </div>
            <Field label="Zone">
              <ComboboxCell
                value={cp.zoneId || ''}
                onChange={(v) => updateCallPoint(cp.id, 'zoneId', v)}
                options={zoneOptions}
                placeholder="Assign zone"
                className="h-11 text-base"
                allowCustom={false}
              />
            </Field>
          </div>
        ))}
        <button type="button" onClick={addCallPoint} className={addButtonCn}>
          Add call point
        </button>
      </div>

      {/* Equipment summary */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Equipment summary" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl bg-white/[0.05] p-3 text-center">
            <p className="text-2xl font-bold text-elec-yellow">{zones.length}</p>
            <p className="text-[11px] text-white/80">Zones</p>
          </div>
          <div className="rounded-xl bg-white/[0.05] p-3 text-center">
            <p className="text-2xl font-bold text-red-400">{detectors.length}</p>
            <p className="text-[11px] text-white/80">Detectors</p>
          </div>
          <div className="rounded-xl bg-white/[0.05] p-3 text-center">
            <p className="text-2xl font-bold text-blue-400">{sounders.length}</p>
            <p className="text-[11px] text-white/80">Sounders</p>
          </div>
          <div className="rounded-xl bg-white/[0.05] p-3 text-center">
            <p className="text-2xl font-bold text-green-400">{callPoints.length}</p>
            <p className="text-[11px] text-white/80">Call points</p>
          </div>
        </div>
      </div>
    </div>
  );
}
