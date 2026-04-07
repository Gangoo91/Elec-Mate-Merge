/**
 * Fire Alarm G3 Commissioning — Tab 3: Sound Levels & Environment
 * Sound level readings with dB validation, environmental conditions, test equipment
 */

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import ComboboxCell from '@/components/table-cells/ComboboxCell';
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
  <div><Label className="text-white text-xs mb-1.5 block">{label}</Label>{children}</div>
);

const areaTypeOptions = [
  { value: 'general', label: 'General Area (65 dB min)' },
  { value: 'sleeping', label: 'Sleeping Area (75 dB min)' },
  { value: 'stairwell', label: 'Stairwell' },
  { value: 'plant-room', label: 'Plant Room (high ambient)' },
];

const equipmentTypeOptions = [
  { value: 'sound-level-meter', label: 'Sound Level Meter' },
  { value: 'smoke-detector-tester', label: 'Smoke Detector Tester' },
  { value: 'heat-detector-tester', label: 'Heat Detector Tester' },
  { value: 'call-point-key', label: 'Call Point Key' },
  { value: 'multimeter', label: 'Multimeter' },
];

const weatherOptions = [
  { value: 'dry', label: 'Dry' },
  { value: 'wet', label: 'Wet' },
  { value: 'windy', label: 'Windy' },
  { value: 'extreme-heat', label: 'Extreme Heat' },
  { value: 'extreme-cold', label: 'Extreme Cold' },
];

interface Props { formData: any; onUpdate: (field: string, value: any) => void }

export default function FAG3SoundEnvironment({ formData, onUpdate }: Props) {
  const readings: any[] = formData.soundLevelReadings || [];
  const equipment: any[] = formData.testEquipment || [];
  const haptic = useHaptic();
  const { validateSoundReading } = useFireAlarmSmartForm();

  const addReading = () => { haptic.light(); onUpdate('soundLevelReadings', [...readings, { id: crypto.randomUUID(), zone: '', location: '', areaType: 'general', dBReading: '', minRequired: '65', result: '' }]); };
  const removeReading = (id: string) => { haptic.medium(); onUpdate('soundLevelReadings', readings.filter((r: any) => r.id !== id)); };
  const updateReading = (id: string, field: string, value: any) => {
    const ambient = parseFloat(formData.ambientNoiseLevel || '0');
    const updated = readings.map((r: any) => {
      if (r.id !== id) return r;
      const newR = { ...r, [field]: value };
      // Auto-set min required based on area type + ambient noise (BS 5839-1: 5dB above ambient)
      if (field === 'areaType' || field === 'dBReading') {
        const areaType = field === 'areaType' ? value : newR.areaType;
        let minReq = areaType === 'sleeping' ? 75 : 65;
        // If ambient noise is high, min required = ambient + 5
        if (ambient > 0 && (ambient + 5) > minReq) {
          minReq = Math.ceil(ambient + 5);
        }
        newR.minRequired = String(minReq);
      }
      // Auto-validate
      if (field === 'dBReading' || field === 'areaType') {
        const db = parseFloat(field === 'dBReading' ? value : newR.dBReading);
        const min = parseFloat(newR.minRequired || '65');
        if (!isNaN(db)) newR.result = db >= min ? 'pass' : 'fail';
      }
      return newR;
    });
    onUpdate('soundLevelReadings', updated);
  };

  const addEquipment = () => { haptic.light(); onUpdate('testEquipment', [...equipment, { id: crypto.randomUUID(), type: '', make: '', model: '', serialNumber: '', calibrationDate: '', calibrationDue: '' }]); };
  const removeEquipment = (id: string) => { haptic.medium(); onUpdate('testEquipment', equipment.filter((e: any) => e.id !== id)); };
  const updateEquipment = (id: string, field: string, value: any) => onUpdate('testEquipment', equipment.map((e: any) => e.id === id ? { ...e, [field]: value } : e));

  return (
    <div className="space-y-5">
      {/* Sound Level Readings */}
      <Section title="Sound Level Readings" accentColor="from-blue-500/40 to-cyan-400/20" count={readings.length}>
        {readings.length === 0 && (
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 text-center">
            <p className="text-sm font-medium text-white">Add sound level readings per zone</p>
            <p className="text-xs text-white mt-1">BS 5839-1:2025 requires 65 dB general, 75 dB sleeping areas</p>
          </div>
        )}
        {readings.map((r: any, idx: number) => (
          <div key={r.id} className="rounded-xl border border-white/[0.06] overflow-hidden">
            <div className="flex items-center justify-between px-3.5 py-2 bg-white/[0.04] border-b border-white/[0.06]">
              <span className="text-xs font-bold text-blue-400">Reading {idx + 1} of {readings.length}</span>
              <button onClick={() => removeReading(r.id)} className="w-9 h-9 rounded-xl flex items-center justify-center border border-red-500/20 bg-red-500/10 text-red-400 touch-manipulation active:scale-90"><Trash2 className="h-4 w-4" /></button>
            </div>
            <div className="p-3.5 space-y-3 bg-white/[0.02]">
              <div className="grid grid-cols-2 gap-2">
                <Field label="Zone"><Input value={r.zone || ''} onChange={(e) => updateReading(r.id, 'zone', e.target.value)} className={inputSmCn} placeholder="e.g. Zone 1" /></Field>
                <Field label="Area Type"><ComboboxCell value={r.areaType || 'general'} onChange={(v) => updateReading(r.id, 'areaType', v)} options={areaTypeOptions} placeholder="Select..." className="h-10 text-sm" allowCustom={false} /></Field>
              </div>
              <Field label="Location"><Input value={r.location || ''} onChange={(e) => updateReading(r.id, 'location', e.target.value)} className={inputSmCn} placeholder="e.g. First floor corridor" /></Field>
              <div className="grid grid-cols-3 gap-2">
                <Field label="Measured (dB)">
                  <Input value={r.dBReading || ''} onChange={(e) => updateReading(r.id, 'dBReading', e.target.value)} inputMode="decimal"
                    className={cn(inputSmCn, r.result === 'pass' ? 'border-green-500/50' : r.result === 'fail' ? 'border-red-500/50' : '')} placeholder="e.g. 85" />
                </Field>
                <Field label="Min Required">
                  <div className="h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center px-3 text-sm text-white">{r.minRequired || '65'} dB</div>
                </Field>
                <Field label="Result">
                  <div className={cn('h-10 rounded-xl flex items-center justify-center text-sm font-bold',
                    r.result === 'pass' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                    r.result === 'fail' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    'bg-white/[0.06] border border-white/[0.08] text-white')}>
                    {r.result === 'pass' ? 'PASS' : r.result === 'fail' ? 'FAIL' : '—'}
                  </div>
                </Field>
              </div>
            </div>
          </div>
        ))}
        <button onClick={addReading} className="w-full h-12 rounded-xl border-2 border-dashed border-blue-500/20 flex items-center justify-center gap-2 text-sm font-medium text-blue-400 touch-manipulation active:scale-[0.98]">
          <Plus className="h-4 w-4" /> Add Sound Reading
        </button>
      </Section>

      {/* Environmental Conditions */}
      <Section title="Environmental Conditions" accentColor="from-green-500/40 to-emerald-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field label="Temperature (C)"><Input value={formData.ambientTemperature || ''} onChange={(e) => onUpdate('ambientTemperature', e.target.value)} inputMode="decimal" className={inputCn} placeholder="e.g. 20" /></Field>
          <Field label="Ambient Noise (dB)"><Input value={formData.ambientNoiseLevel || ''} onChange={(e) => onUpdate('ambientNoiseLevel', e.target.value)} inputMode="decimal" className={inputCn} placeholder="e.g. 45" /></Field>
          <Field label="Weather"><ComboboxCell value={formData.weatherConditions || ''} onChange={(v) => onUpdate('weatherConditions', v)} options={weatherOptions} placeholder="Select..." className="h-12 text-base" /></Field>
        </div>
      </Section>

      {/* Test Equipment */}
      <Section title="Test Equipment Used" accentColor="from-amber-500/40 to-yellow-400/20" count={equipment.length}>
        {equipment.map((eq: any, idx: number) => (
          <div key={eq.id} className="rounded-xl border border-white/[0.06] overflow-hidden">
            <div className="flex items-center justify-between px-3.5 py-2 bg-white/[0.04] border-b border-white/[0.06]">
              <span className="text-xs font-bold text-amber-400">Equipment {idx + 1} of {equipment.length}</span>
              <button onClick={() => removeEquipment(eq.id)} className="w-9 h-9 rounded-xl flex items-center justify-center border border-red-500/20 bg-red-500/10 text-red-400 touch-manipulation active:scale-90"><Trash2 className="h-4 w-4" /></button>
            </div>
            <div className="p-3.5 space-y-3 bg-white/[0.02]">
              <Field label="Type"><ComboboxCell value={eq.type || ''} onChange={(v) => updateEquipment(eq.id, 'type', v)} options={equipmentTypeOptions} placeholder="Select type..." className="h-12 text-base" /></Field>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Make / Model"><Input value={`${eq.make || ''} ${eq.model || ''}`.trim()} onChange={(e) => updateEquipment(eq.id, 'make', e.target.value)} className={inputSmCn} /></Field>
                <Field label="Serial No."><Input value={eq.serialNumber || ''} onChange={(e) => updateEquipment(eq.id, 'serialNumber', e.target.value)} className={inputSmCn} /></Field>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Calibration Date"><Input type="date" value={eq.calibrationDate || ''} onChange={(e) => updateEquipment(eq.id, 'calibrationDate', e.target.value)} className={cn(inputSmCn, '[color-scheme:dark]')} /></Field>
                <Field label="Calibration Due"><Input type="date" value={eq.calibrationDue || ''} onChange={(e) => updateEquipment(eq.id, 'calibrationDue', e.target.value)} className={cn(inputSmCn, '[color-scheme:dark]')} /></Field>
              </div>
            </div>
          </div>
        ))}
        <button onClick={addEquipment} className="w-full h-12 rounded-xl border-2 border-dashed border-amber-500/20 flex items-center justify-center gap-2 text-sm font-medium text-amber-400 touch-manipulation active:scale-[0.98]">
          <Plus className="h-4 w-4" /> Add Test Equipment
        </button>
      </Section>
    </div>
  );
}
