/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G3 Commissioning — Tab 3: Sound Levels & Environment
 * Sound level readings with dB validation, environmental conditions, test equipment
 */

import { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useHaptic } from '@/hooks/useHaptic';
import ComboboxCell from '@/components/table-cells/ComboboxCell';
import { useFireAlarmSmartForm } from '@/hooks/inspection/useFireAlarmSmartForm';
import useReadingKeypad, { ReadingMeta } from '@/hooks/useReadingKeypad';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const comboTriggerCn =
  'h-11 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white hover:bg-transparent hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

const addButtonCn =
  'w-full h-11 rounded-xl border border-dashed border-white/[0.25] text-sm font-medium text-white touch-manipulation active:scale-[0.98] transition-transform';

const removeButtonCn =
  'h-11 px-2 text-sm font-medium text-red-400 touch-manipulation active:scale-95 transition-transform shrink-0';

const SectionHeader = ({ title, count }: { title: string; count?: number }) => (
  <h2 className="mb-3 flex items-center gap-2 text-[15px] font-semibold tracking-tight text-white">
    {title}
    {count !== undefined && (
      <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-[11px] font-medium text-white/80">
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

interface Props {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

export default function FAG3SoundEnvironment({ formData, onUpdate }: Props) {
  const readings: any[] = formData.soundLevelReadings || [];
  const equipment: any[] = formData.testEquipment || [];
  const haptic = useHaptic();
  const { validateSoundReading } = useFireAlarmSmartForm();

  const addReading = () => {
    haptic.light();
    onUpdate('soundLevelReadings', [
      ...readings,
      {
        id: crypto.randomUUID(),
        zone: '',
        location: '',
        areaType: 'general',
        dBReading: '',
        minRequired: '65',
        result: '',
      },
    ]);
  };
  const removeReading = (id: string) => {
    haptic.medium();
    onUpdate(
      'soundLevelReadings',
      readings.filter((r: any) => r.id !== id)
    );
  };
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
        if (ambient > 0 && ambient + 5 > minReq) {
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

  const addEquipment = () => {
    haptic.light();
    onUpdate('testEquipment', [
      ...equipment,
      {
        id: crypto.randomUUID(),
        type: '',
        make: '',
        model: '',
        serialNumber: '',
        calibrationDate: '',
        calibrationDue: '',
      },
    ]);
  };
  const removeEquipment = (id: string) => {
    haptic.medium();
    onUpdate(
      'testEquipment',
      equipment.filter((e: any) => e.id !== id)
    );
  };
  const updateEquipment = (id: string, field: string, value: any) =>
    onUpdate(
      'testEquipment',
      equipment.map((e: any) => (e.id === id ? { ...e, [field]: value } : e))
    );

  // ── Reading keypad — shared MW pattern ──
  // Per-reading dB fields are keyed by reading id so data-keypad-field stays
  // unique as rows are added/removed. Values flow through the EXISTING
  // updateReading/onUpdate paths; the header verdict reuses the r.result the
  // file already auto-computes (no new compliance logic).
  const keypadMeta = useMemo(() => {
    const meta: Record<string, ReadingMeta> = {
      ambientTemperature: { label: 'Ambient temperature', unit: '°C' },
      ambientNoiseLevel: { label: 'Ambient noise level', unit: 'dB' },
    };
    readings.forEach((r: any, idx: number) => {
      meta[`dBReading-${r.id}`] = { label: `Sound level — reading ${idx + 1}`, unit: 'dB' };
    });
    return meta;
  }, [readings]);
  const keypad = useReadingKeypad({
    meta: keypadMeta,
    getValue: (field) => {
      if (field === 'ambientTemperature') return String(formData.ambientTemperature ?? '');
      if (field === 'ambientNoiseLevel') return String(formData.ambientNoiseLevel ?? '');
      const id = field.replace('dBReading-', '');
      const reading = readings.find((r: any) => r.id === id);
      return String(reading?.dBReading ?? '');
    },
    setValue: (field, value) => {
      if (field === 'ambientTemperature' || field === 'ambientNoiseLevel') {
        onUpdate(field, value);
        return;
      }
      updateReading(field.replace('dBReading-', ''), 'dBReading', value);
    },
    getStatus: (field) => {
      if (!field.startsWith('dBReading-')) return null;
      const id = field.replace('dBReading-', '');
      const reading = readings.find((r: any) => r.id === id);
      if (!reading) return null;
      if (reading.result === 'pass')
        return { tone: 'pass', label: `Meets ${reading.minRequired || '65'} dB minimum` };
      if (reading.result === 'fail')
        return { tone: 'check', label: `Below ${reading.minRequired || '65'} dB minimum` };
      return null;
    },
  });

  return (
    <div className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Sound level readings */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Sound level readings" count={readings.length} />
        {readings.length === 0 && (
          <div className="rounded-xl bg-white/[0.05] p-4 text-center">
            <p className="text-sm font-medium text-white">Add sound level readings per zone</p>
            <p className="text-[12px] text-white/80 mt-1">
              BS 5839-1:2025 requires 65 dB general, 75 dB sleeping areas
            </p>
          </div>
        )}
        {readings.map((r: any, idx: number) => (
          <div key={r.id} className="border-t border-white/[0.08] pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">
                Reading {idx + 1} of {readings.length}
              </span>
              <button type="button" onClick={() => removeReading(r.id)} className={removeButtonCn}>
                Remove
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <Field label="Zone">
                <Input
                  value={r.zone || ''}
                  onChange={(e) => updateReading(r.id, 'zone', e.target.value)}
                  className={inputCn}
                  placeholder="e.g. Zone 1"
                />
              </Field>
              <Field label="Area type">
                <ComboboxCell
                  value={r.areaType || 'general'}
                  onChange={(v) => updateReading(r.id, 'areaType', v)}
                  options={areaTypeOptions}
                  placeholder="Select..."
                  className={comboTriggerCn}
                  allowCustom={false}
                />
              </Field>
            </div>
            <Field label="Location">
              <Input
                value={r.location || ''}
                onChange={(e) => updateReading(r.id, 'location', e.target.value)}
                className={inputCn}
                placeholder="e.g. First floor corridor"
              />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
              <Field label="Measured (dB)">
                <Input
                  value={r.dBReading || ''}
                  onChange={(e) => updateReading(r.id, 'dBReading', e.target.value)}
                  inputMode="decimal"
                  className={cn(
                    inputCn,
                    r.result === 'pass'
                      ? 'border-green-500/70'
                      : r.result === 'fail'
                        ? 'border-red-500/70'
                        : ''
                  )}
                  placeholder="e.g. 85"
                  {...keypad.field(`dBReading-${r.id}`)}
                />
              </Field>
              <Field label="Min required">
                <div className="flex h-11 items-center rounded-xl bg-white/[0.05] px-3.5 text-sm font-medium text-white">
                  {r.minRequired || '65'} dB
                </div>
              </Field>
              <Field label="Result">
                <div
                  className={cn(
                    'flex h-11 items-center justify-center rounded-xl text-sm font-semibold',
                    r.result === 'pass'
                      ? 'bg-green-500 text-black'
                      : r.result === 'fail'
                        ? 'bg-red-500 text-white'
                        : 'bg-white/[0.05] text-white/80'
                  )}
                >
                  {r.result === 'pass' ? 'Pass' : r.result === 'fail' ? 'Fail' : '—'}
                </div>
              </Field>
            </div>
          </div>
        ))}
        <button type="button" onClick={addReading} className={addButtonCn}>
          Add sound reading
        </button>
      </div>

      {/* Environmental conditions */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Environmental conditions" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
          <Field label="Temperature (C)">
            <Input
              value={formData.ambientTemperature || ''}
              onChange={(e) => onUpdate('ambientTemperature', e.target.value)}
              inputMode="decimal"
              className={inputCn}
              placeholder="e.g. 20"
              {...keypad.field('ambientTemperature')}
            />
          </Field>
          <Field label="Ambient noise (dB)">
            <Input
              value={formData.ambientNoiseLevel || ''}
              onChange={(e) => onUpdate('ambientNoiseLevel', e.target.value)}
              inputMode="decimal"
              className={inputCn}
              placeholder="e.g. 45"
              {...keypad.field('ambientNoiseLevel')}
            />
          </Field>
          <Field label="Weather">
            <ComboboxCell
              value={formData.weatherConditions || ''}
              onChange={(v) => onUpdate('weatherConditions', v)}
              options={weatherOptions}
              placeholder="Select..."
              className={comboTriggerCn}
            />
          </Field>
        </div>
      </div>

      {/* Test equipment */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Test equipment used" count={equipment.length} />
        {equipment.map((eq: any, idx: number) => (
          <div key={eq.id} className="border-t border-white/[0.08] pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">
                Equipment {idx + 1} of {equipment.length}
              </span>
              <button
                type="button"
                onClick={() => removeEquipment(eq.id)}
                className={removeButtonCn}
              >
                Remove
              </button>
            </div>
            <Field label="Type">
              <ComboboxCell
                value={eq.type || ''}
                onChange={(v) => updateEquipment(eq.id, 'type', v)}
                options={equipmentTypeOptions}
                placeholder="Select type..."
                className={comboTriggerCn}
              />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <Field label="Make">
                <Input
                  value={eq.make || ''}
                  onChange={(e) => updateEquipment(eq.id, 'make', e.target.value)}
                  className={inputCn}
                />
              </Field>
              <Field label="Model">
                <Input
                  value={eq.model || ''}
                  onChange={(e) => updateEquipment(eq.id, 'model', e.target.value)}
                  className={inputCn}
                />
              </Field>
              <Field label="Serial no.">
                <Input
                  value={eq.serialNumber || ''}
                  onChange={(e) => updateEquipment(eq.id, 'serialNumber', e.target.value)}
                  className={inputCn}
                />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <Field label="Calibration date">
                <Input
                  type="date"
                  value={eq.calibrationDate || ''}
                  onChange={(e) => updateEquipment(eq.id, 'calibrationDate', e.target.value)}
                  className={inputCn}
                />
              </Field>
              <Field label="Calibration due">
                <Input
                  type="date"
                  value={eq.calibrationDue || ''}
                  onChange={(e) => updateEquipment(eq.id, 'calibrationDue', e.target.value)}
                  className={inputCn}
                />
              </Field>
            </div>
          </div>
        ))}
        <button type="button" onClick={addEquipment} className={addButtonCn}>
          Add test equipment
        </button>
      </div>

      {/* Scroll room so the last reading can rise clear of the keypad */}
      {keypad.spacer}

      {/* Reading keypad — coarse-pointer devices only */}
      {keypad.element}
    </div>
  );
}
