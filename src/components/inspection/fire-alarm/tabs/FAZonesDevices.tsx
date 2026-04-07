/**
 * Fire Alarm G2 — Tab 3: Zones & Devices
 * Zone schedule, detector/sounder/call point device schedules
 * Smart features: auto-count, duplicate, numbering, dB validation, compatibility
 */

import { useRef, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Camera, X, Copy, AlertTriangle } from 'lucide-react';
import { useHaptic } from '@/hooks/useHaptic';
import { cn } from '@/lib/utils';
import { FireAlarmZone, FireAlarmDetector, FireAlarmSounder, FireAlarmCallPoint } from '@/types/fire-alarm';
import ComboboxCell from '@/components/table-cells/ComboboxCell';
import { getCompatibleDetectors } from '@/data/fireAlarmEquipmentDatabase';
import { useFireAlarmSmartForm } from '@/hooks/inspection/useFireAlarmSmartForm';

const inputCn = 'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';
const inputSmCn = 'h-10 text-sm touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';

const Section = ({ title, accentColor, count, children }: { title: string; accentColor?: string; count?: number; children: React.ReactNode }) => (
  <div className="space-y-4">
    <div className="border-b border-white/[0.06] pb-1 mb-3">
      <div className={cn('h-[2px] w-full rounded-full bg-gradient-to-r mb-2', accentColor || 'from-red-500 to-rose-400')} />
      <h2 className="text-xs font-medium text-white uppercase tracking-wider flex items-center gap-2">{title}
        {count !== undefined && <span className="text-[10px] font-bold text-white bg-white/[0.1] px-2 py-0.5 rounded">{count}</span>}
      </h2>
    </div>
    {children}
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div><Label className="text-white text-[10px] uppercase tracking-wider mb-1 block">{label}</Label>{children}</div>
);

/* ── Icon button ── */
const IconBtn = ({ onClick, colour, icon: Icon, label }: { onClick: () => void; colour: string; icon: any; label: string }) => (
  <button
    onClick={onClick}
    title={label}
    className={cn(
      'w-9 h-9 rounded-xl flex items-center justify-center touch-manipulation active:scale-90 transition-all border',
      colour === 'yellow' && 'border-elec-yellow/20 bg-elec-yellow/10 text-elec-yellow hover:bg-elec-yellow/20',
      colour === 'red' && 'border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20',
      colour === 'blue' && 'border-blue-500/20 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'
    )}
  >
    <Icon className="h-4 w-4" />
  </button>
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

interface Props { formData: any; onUpdate: (field: string, value: any) => void }

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

  const zoneOptions = zones.map((z) => ({ value: z.id, label: `Zone ${z.zoneNumber} — ${z.zoneName || 'Unnamed'}` }));

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
    } catch { return null; }
  }, [formData.panelId]);

  const isDetectorCompatible = (make: string) => {
    if (!compatibleDetectorMakes || !make) return true;
    return compatibleDetectorMakes.has(make.toLowerCase());
  };

  // Zone helpers
  const addZone = () => { haptic.light(); onUpdate('zones', [...zones, { id: crypto.randomUUID(), zoneNumber: zones.length + 1, zoneName: '', location: '', detectorCount: 0, callPointCount: 0, sounderCount: 0 }]);  };
  const removeZone = (id: string) => { if (zones.length <= 1) return; haptic.medium(); onUpdate('zones', zones.filter((z) => z.id !== id)); };
  const updateZone = (id: string, field: string, value: any) => onUpdate('zones', zones.map((z) => z.id === id ? { ...z, [field]: value } : z));

  // Detector helpers
  const addDetector = () => { haptic.light(); onUpdate('detectors', [...detectors, { id: crypto.randomUUID(), zoneId: '', location: '', type: '', make: '', model: '', serialNumber: '', installDate: '', testResult: '', notes: '' }]);  };
  const removeDetector = (id: string) => { haptic.medium(); onUpdate('detectors', detectors.filter((d) => d.id !== id)); };
  const updateDetector = (id: string, field: string, value: any) => onUpdate('detectors', detectors.map((d) => d.id === id ? { ...d, [field]: value } : d));
  const duplicateDetector = (det: FireAlarmDetector) => { haptic.light(); onUpdate('detectors', [...detectors, { ...det, id: crypto.randomUUID(), serialNumber: '', location: '', photo: undefined }]);  };

  // Sounder helpers
  const addSounder = () => { haptic.light(); onUpdate('sounders', [...sounders, { id: crypto.randomUUID(), zoneId: '', location: '', type: '', make: '', model: '', dBReading: '', testResult: '' }]);  };
  const removeSounder = (id: string) => { haptic.medium(); onUpdate('sounders', sounders.filter((s) => s.id !== id)); };
  const updateSounder = (id: string, field: string, value: any) => onUpdate('sounders', sounders.map((s) => s.id === id ? { ...s, [field]: value } : s));
  const duplicateSounder = (snd: FireAlarmSounder) => { haptic.light(); onUpdate('sounders', [...sounders, { ...snd, id: crypto.randomUUID(), location: '', dBReading: '', photo: undefined }]);  };

  // Call point helpers
  const addCallPoint = () => { haptic.light(); onUpdate('callPoints', [...callPoints, { id: crypto.randomUUID(), zoneId: '', location: '', type: 'resettable', make: '', model: '', testResult: '' }]);  };
  const removeCallPoint = (id: string) => { haptic.medium(); onUpdate('callPoints', callPoints.filter((c) => c.id !== id)); };
  const updateCallPoint = (id: string, field: string, value: any) => onUpdate('callPoints', callPoints.map((c) => c.id === id ? { ...c, [field]: value } : c));
  const duplicateCallPoint = (cp: FireAlarmCallPoint) => { haptic.light(); onUpdate('callPoints', [...callPoints, { ...cp, id: crypto.randomUUID(), location: '', photo: undefined }]);  };

  // Photo capture helper
  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>, arrayField: string, items: any[], id: string) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      onUpdate(arrayField, items.map((item) => item.id === id ? { ...item, photo: reader.result as string } : item));
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = (arrayField: string, items: any[], id: string) => {
    onUpdate(arrayField, items.map((item) => item.id === id ? { ...item, photo: undefined } : item));
  };

  // dB validation for sounders
  const getDbValidation = (dBReading: string) => {
    if (!dBReading) return null;
    return validateSoundReading(dBReading);
  };

  return (
    <div className="space-y-5">
      {/* Getting started hint */}
      {zones.length === 0 && detectors.length === 0 && (
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 text-center">
          <p className="text-sm font-medium text-white">Start by adding your zones</p>
          <p className="text-xs text-white mt-1">Then add detectors, sounders, and call points and assign them to zones</p>
        </div>
      )}

      {/* Zone Schedule */}
      <Section title="Zone Schedule" accentColor="from-red-500/40 to-orange-400/20" count={zones.length}>
        {zones.map((zone) => {
          const autoDetCount = zoneDetCount(zone.id);
          const autoSndCount = zoneSndCount(zone.id);
          const autoCpCount = zoneCpCount(zone.id);
          return (
            <div key={zone.id} className="p-3.5 bg-white/[0.03] rounded-xl border border-white/[0.06] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-elec-yellow">Zone {zone.zoneNumber}</span>
                {zones.length > 1 && <IconBtn onClick={() => removeZone(zone.id)} colour="red" icon={Trash2} label="Remove zone" />}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Name"><Input value={zone.zoneName} onChange={(e) => updateZone(zone.id, 'zoneName', e.target.value)} className={inputSmCn} placeholder="e.g. Ground Floor" /></Field>
                <Field label="Location"><Input value={zone.location} onChange={(e) => updateZone(zone.id, 'location', e.target.value)} className={inputSmCn} placeholder="e.g. Main building" /></Field>
              </div>
              {hasDevicesListed ? (
                /* Auto-counted from device lists */
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 rounded-lg bg-white/[0.04]">
                    <p className="text-base font-bold text-amber-400">{autoDetCount}</p>
                    <p className="text-[9px] text-white uppercase">Detectors</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-white/[0.04]">
                    <p className="text-base font-bold text-green-400">{autoCpCount}</p>
                    <p className="text-[9px] text-white uppercase">CPs</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-white/[0.04]">
                    <p className="text-base font-bold text-blue-400">{autoSndCount}</p>
                    <p className="text-[9px] text-white uppercase">Sounders</p>
                  </div>
                </div>
              ) : (
                /* Manual entry when no devices listed */
                <div className="grid grid-cols-3 gap-2">
                  <Field label="Detectors"><Input type="number" inputMode="numeric" value={zone.detectorCount || ''} onChange={(e) => updateZone(zone.id, 'detectorCount', parseInt(e.target.value) || 0)} className={inputSmCn} /></Field>
                  <Field label="CPs"><Input type="number" inputMode="numeric" value={zone.callPointCount || ''} onChange={(e) => updateZone(zone.id, 'callPointCount', parseInt(e.target.value) || 0)} className={inputSmCn} /></Field>
                  <Field label="Sounders"><Input type="number" inputMode="numeric" value={zone.sounderCount || ''} onChange={(e) => updateZone(zone.id, 'sounderCount', parseInt(e.target.value) || 0)} className={inputSmCn} /></Field>
                </div>
              )}
            </div>
          );
        })}
        <button onClick={addZone} className="w-full h-12 rounded-xl border-2 border-dashed border-red-500/20 flex items-center justify-center gap-2 text-sm font-medium text-red-400 touch-manipulation active:scale-[0.98]">
          <Plus className="h-4 w-4" /> Add Zone
        </button>
      </Section>

      {/* Detectors */}
      <Section title="Detectors" accentColor="from-amber-500/40 to-yellow-400/20" count={detectors.length}>
        {detectors.map((det, idx) => (
          <div key={det.id} className="rounded-xl border border-white/[0.06] overflow-hidden">
            {/* Card header — number + actions */}
            <div className="flex items-center justify-between px-3.5 py-2 bg-white/[0.04] border-b border-white/[0.06]">
              <span className="text-xs font-bold text-amber-400">Detector {idx + 1} of {detectors.length}</span>
              <div className="flex items-center gap-1.5">
                <input ref={(el) => { detPhotoRefs.current[det.id] = el; }} type="file" accept="image/*" className="hidden" onChange={(e) => handlePhoto(e, 'detectors', detectors, det.id)} />
                <IconBtn onClick={() => duplicateDetector(det)} colour="blue" icon={Copy} label="Duplicate" />
                <IconBtn onClick={() => detPhotoRefs.current[det.id]?.click()} colour="yellow" icon={Camera} label="Photo" />
                <IconBtn onClick={() => removeDetector(det.id)} colour="red" icon={Trash2} label="Remove" />
              </div>
            </div>
            {/* Card body */}
            <div className="p-3.5 space-y-3 bg-white/[0.02]">
              {/* Compatibility warning */}
              {det.make && !isDetectorCompatible(det.make) && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <p className="text-[11px] text-amber-400">This detector may not be compatible with the selected panel</p>
                </div>
              )}
              {det.photo && (
                <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/[0.1]">
                  <img src={det.photo} alt="Device" className="w-full h-full object-cover" />
                  <button onClick={() => removePhoto('detectors', detectors, det.id)} className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 flex items-center justify-center touch-manipulation"><X className="h-3 w-3 text-white" /></button>
                </div>
              )}
              <Field label="Type"><ComboboxCell value={det.type} onChange={(v) => updateDetector(det.id, 'type', v)} options={detectorTypeOptions} placeholder="Select detector type..." className="h-12 text-base" /></Field>
              <Field label="Location"><Input value={det.location} onChange={(e) => updateDetector(det.id, 'location', e.target.value)} className={inputSmCn} placeholder="e.g. First floor corridor" /></Field>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Make"><Input value={det.make} onChange={(e) => updateDetector(det.id, 'make', e.target.value)} className={inputSmCn} placeholder="e.g. Apollo" /></Field>
                <Field label="Model"><Input value={det.model} onChange={(e) => updateDetector(det.id, 'model', e.target.value)} className={inputSmCn} placeholder="e.g. Discovery" /></Field>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Serial No."><Input value={det.serialNumber} onChange={(e) => updateDetector(det.id, 'serialNumber', e.target.value)} className={inputSmCn} /></Field>
                <Field label="Install Date"><Input type="date" value={det.installDate || ''} onChange={(e) => updateDetector(det.id, 'installDate', e.target.value)} className={cn(inputSmCn, '[color-scheme:dark]')} /></Field>
              </div>
              <Field label="Zone"><ComboboxCell value={det.zoneId} onChange={(v) => updateDetector(det.id, 'zoneId', v)} options={zoneOptions} placeholder="Assign zone" className="h-10 text-sm" allowCustom={false} /></Field>
            </div>
          </div>
        ))}
        <button onClick={addDetector} className="w-full h-12 rounded-xl border-2 border-dashed border-amber-500/20 flex items-center justify-center gap-2 text-sm font-medium text-amber-400 touch-manipulation active:scale-[0.98]">
          <Plus className="h-4 w-4" /> Add Detector
        </button>
      </Section>

      {/* Sounders */}
      <Section title="Sounders & VADs" accentColor="from-blue-500/40 to-cyan-400/20" count={sounders.length}>
        {sounders.map((snd, idx) => {
          const dbVal = getDbValidation(snd.dBReading);
          return (
            <div key={snd.id} className="rounded-xl border border-white/[0.06] overflow-hidden">
              {/* Card header */}
              <div className="flex items-center justify-between px-3.5 py-2 bg-white/[0.04] border-b border-white/[0.06]">
                <span className="text-xs font-bold text-blue-400">Sounder {idx + 1} of {sounders.length}</span>
                <div className="flex items-center gap-1.5">
                  <input ref={(el) => { sndPhotoRefs.current[snd.id] = el; }} type="file" accept="image/*" className="hidden" onChange={(e) => handlePhoto(e, 'sounders', sounders, snd.id)} />
                  <IconBtn onClick={() => duplicateSounder(snd)} colour="blue" icon={Copy} label="Duplicate" />
                  <IconBtn onClick={() => sndPhotoRefs.current[snd.id]?.click()} colour="yellow" icon={Camera} label="Photo" />
                  <IconBtn onClick={() => removeSounder(snd.id)} colour="red" icon={Trash2} label="Remove" />
                </div>
              </div>
              {/* Card body */}
              <div className="p-3.5 space-y-3 bg-white/[0.02]">
                {snd.photo && (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/[0.1]">
                    <img src={snd.photo} alt="Device" className="w-full h-full object-cover" />
                    <button onClick={() => removePhoto('sounders', sounders, snd.id)} className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 flex items-center justify-center touch-manipulation"><X className="h-3 w-3 text-white" /></button>
                  </div>
                )}
                <Field label="Type"><ComboboxCell value={snd.type} onChange={(v) => updateSounder(snd.id, 'type', v)} options={sounderTypeOptions} placeholder="Select sounder type..." className="h-12 text-base" /></Field>
                <Field label="Location"><Input value={snd.location} onChange={(e) => updateSounder(snd.id, 'location', e.target.value)} className={inputSmCn} placeholder="e.g. Main stairwell" /></Field>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="Make"><Input value={snd.make} onChange={(e) => updateSounder(snd.id, 'make', e.target.value)} className={inputSmCn} placeholder="e.g. Hochiki" /></Field>
                  <Field label="Model"><Input value={snd.model} onChange={(e) => updateSounder(snd.id, 'model', e.target.value)} className={inputSmCn} placeholder="e.g. CHQ-WB" /></Field>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="dB Reading">
                    <div>
                      <Input
                        value={snd.dBReading || ''}
                        onChange={(e) => updateSounder(snd.id, 'dBReading', e.target.value)}
                        inputMode="decimal"
                        className={cn(inputSmCn, dbVal && (dbVal.status === 'pass' ? 'border-green-500/50' : dbVal.status === 'fail' ? 'border-red-500/50' : ''))}
                        placeholder="e.g. 85"
                      />
                      {dbVal && (
                        <p className={cn('text-[10px] mt-1', dbVal.status === 'pass' ? 'text-green-400' : dbVal.status === 'fail' ? 'text-red-400' : 'text-amber-400')}>
                          {dbVal.status === 'pass' ? 'Pass' : dbVal.status === 'fail' ? `Fail — min ${dbVal.minRequired} dB` : dbVal.message}
                        </p>
                      )}
                    </div>
                  </Field>
                  <Field label="Zone"><ComboboxCell value={snd.zoneId || ''} onChange={(v) => updateSounder(snd.id, 'zoneId', v)} options={zoneOptions} placeholder="Assign zone" className="h-10 text-sm" allowCustom={false} /></Field>
                </div>
              </div>
            </div>
          );
        })}
        <button onClick={addSounder} className="w-full h-12 rounded-xl border-2 border-dashed border-blue-500/20 flex items-center justify-center gap-2 text-sm font-medium text-blue-400 touch-manipulation active:scale-[0.98]">
          <Plus className="h-4 w-4" /> Add Sounder / VAD
        </button>
      </Section>

      {/* Call Points */}
      <Section title="Manual Call Points" accentColor="from-green-500/40 to-emerald-400/20" count={callPoints.length}>
        {callPoints.map((cp, idx) => (
          <div key={cp.id} className="rounded-xl border border-white/[0.06] overflow-hidden">
            {/* Card header */}
            <div className="flex items-center justify-between px-3.5 py-2 bg-white/[0.04] border-b border-white/[0.06]">
              <span className="text-xs font-bold text-green-400">Call Point {idx + 1} of {callPoints.length}</span>
              <div className="flex items-center gap-1.5">
                <input ref={(el) => { cpPhotoRefs.current[cp.id] = el; }} type="file" accept="image/*" className="hidden" onChange={(e) => handlePhoto(e, 'callPoints', callPoints, cp.id)} />
                <IconBtn onClick={() => duplicateCallPoint(cp)} colour="blue" icon={Copy} label="Duplicate" />
                <IconBtn onClick={() => cpPhotoRefs.current[cp.id]?.click()} colour="yellow" icon={Camera} label="Photo" />
                <IconBtn onClick={() => removeCallPoint(cp.id)} colour="red" icon={Trash2} label="Remove" />
              </div>
            </div>
            {/* Card body */}
            <div className="p-3.5 space-y-3 bg-white/[0.02]">
              {cp.photo && (
                <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/[0.1]">
                  <img src={cp.photo} alt="Device" className="w-full h-full object-cover" />
                  <button onClick={() => removePhoto('callPoints', callPoints, cp.id)} className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 flex items-center justify-center touch-manipulation"><X className="h-3 w-3 text-white" /></button>
                </div>
              )}
              <Field label="Type"><ComboboxCell value={cp.type} onChange={(v) => updateCallPoint(cp.id, 'type', v)} options={callPointTypeOptions} placeholder="Select call point type..." className="h-12 text-base" /></Field>
              <Field label="Location"><Input value={cp.location} onChange={(e) => updateCallPoint(cp.id, 'location', e.target.value)} className={inputSmCn} placeholder="e.g. Ground floor entrance" /></Field>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Make"><Input value={cp.make} onChange={(e) => updateCallPoint(cp.id, 'make', e.target.value)} className={inputSmCn} placeholder="e.g. KAC" /></Field>
                <Field label="Model"><Input value={cp.model} onChange={(e) => updateCallPoint(cp.id, 'model', e.target.value)} className={inputSmCn} placeholder="e.g. PS200" /></Field>
              </div>
              <Field label="Zone"><ComboboxCell value={cp.zoneId || ''} onChange={(v) => updateCallPoint(cp.id, 'zoneId', v)} options={zoneOptions} placeholder="Assign zone" className="h-10 text-sm" allowCustom={false} /></Field>
            </div>
          </div>
        ))}
        <button onClick={addCallPoint} className="w-full h-12 rounded-xl border-2 border-dashed border-green-500/20 flex items-center justify-center gap-2 text-sm font-medium text-green-400 touch-manipulation active:scale-[0.98]">
          <Plus className="h-4 w-4" /> Add Call Point
        </button>
      </Section>

      {/* Equipment Summary */}
      <Section title="Equipment Summary" accentColor="from-white/20 to-white/5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
            <p className="text-2xl font-bold text-elec-yellow">{zones.length}</p>
            <p className="text-[10px] text-white uppercase">Zones</p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
            <p className="text-2xl font-bold text-red-400">{detectors.length}</p>
            <p className="text-[10px] text-white uppercase">Detectors</p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
            <p className="text-2xl font-bold text-blue-400">{sounders.length}</p>
            <p className="text-[10px] text-white uppercase">Sounders</p>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-center">
            <p className="text-2xl font-bold text-green-400">{callPoints.length}</p>
            <p className="text-[10px] text-white uppercase">Call Points</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
