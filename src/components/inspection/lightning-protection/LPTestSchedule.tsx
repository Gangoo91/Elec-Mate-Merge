import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { cn } from '@/lib/utils';
import { useLightningProtectionSmartForm } from '@/hooks/inspection/useLightningProtectionSmartForm';
import { EarthElectrodeTest, DownConductorTest, BondingTest, SPDCheck, SeparationDistanceCheck, EARTH_RESISTANCE_THRESHOLD, CONTINUITY_THRESHOLD, BONDING_THRESHOLD } from '@/types/lightning-protection';
import useReadingKeypad, { ReadingMeta } from '@/hooks/useReadingKeypad';

/* eslint-disable @typescript-eslint/no-explicit-any */

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const pickerTrigger =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const addButtonCn =
  'w-full h-11 rounded-xl border border-dashed border-white/[0.25] text-sm font-medium text-elec-yellow touch-manipulation active:scale-[0.98] transition-all';

const removeButtonCn =
  'h-11 shrink-0 px-2 text-[13px] font-medium text-red-400 touch-manipulation active:scale-[0.97]';

const photoButtonCn = (hasPhoto: boolean) =>
  cn('h-11 shrink-0 px-2 text-[13px] font-medium touch-manipulation active:scale-[0.97]', hasPhoto ? 'text-elec-yellow' : 'text-white/85');

const entryCn = (idx: number) => cn('space-y-3', idx > 0 && 'border-t border-white/[0.08] pt-4');

const SectionHeader = ({ title, count, subtitle }: { title: string; count?: number; subtitle?: string }) => (
  <div className="mb-3 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
    <h2 className="text-[15px] font-semibold tracking-tight text-white">{title}</h2>
    {count !== undefined && <span className="text-[12px] font-semibold tabular-nums text-white/80">{count}</span>}
    {subtitle && <span className="text-[12px] text-white/80">— {subtitle}</span>}
  </div>
);

const Sub = ({ title }: { title: string }) => (
  <div className="border-t border-white/[0.1] pt-4">
    <h3 className="text-sm font-semibold text-white">{title}</h3>
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div><Label className={labelCn}>{label}</Label>{children}</div>
);

const PassFailBadge = ({ value }: { value: 'pass' | 'fail' | '' }) => {
  if (!value) return null;
  return <span className={cn('text-[11px] font-bold', value === 'pass' ? 'text-green-400' : 'text-red-400')}>{value.toUpperCase()}</span>;
};

const Toggle = ({ label, value, onChange }: { label: string; value: boolean | undefined; onChange: (v: boolean) => void }) => (
  <div className="flex min-h-11 items-center justify-between gap-3">
    <Label className="text-[13px] font-medium text-white">{label}</Label>
    <div className="flex gap-2">
      {[true, false].map((v) => (
        <button
          key={String(v)}
          type="button"
          onClick={() => onChange(v)}
          className={cn(
            'h-11 w-16 rounded-xl text-sm transition-all touch-manipulation active:scale-[0.98]',
            value === v
              ? v ? 'bg-green-500 border border-green-500 text-black font-semibold' : 'bg-red-500 border border-red-500 text-white font-semibold'
              : 'bg-white/[0.06] border border-white/[0.12] text-white font-medium'
          )}
        >
          {v ? 'Yes' : 'No'}
        </button>
      ))}
    </div>
  </div>
);

interface Props { formData: any; onUpdate: (field: string, value: any) => void }

export default function LPTestSchedule({ formData, onUpdate }: Props) {

  const { isEarthResistancePass, isContinuityPass, isBondingPass } = useLightningProtectionSmartForm();
  const testPhotoRef = useRef<HTMLInputElement>(null);
  const [photoTarget, setPhotoTarget] = useState<{ type: string; id: string } | null>(null);

  const handleTestPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; if (!files || !photoTarget) return; e.target.value = '';
    const reader = new FileReader();
    reader.onload = () => {
      if (photoTarget.type === 'earth') updateEarthTest(photoTarget.id, 'photo', reader.result as string);
      else if (photoTarget.type === 'dc') updateDcTest(photoTarget.id, 'photo', reader.result as string);
      setPhotoTarget(null);
    };
    reader.readAsDataURL(files[0]);
  };

  // Earth electrode helpers
  const earthTests: EarthElectrodeTest[] = formData.earthElectrodeTests || [];
  const addEarthTest = () => {
    const next = `E${earthTests.length + 1}`;
    onUpdate('earthElectrodeTests', [...earthTests, { id: crypto.randomUUID(), reference: next, location: '', electrodeType: '', testMethod: '', measuredResistance: '', previousReading: '', photo: '', notes: '' }]);
  };
  const removeEarthTest = (id: string) => { if (earthTests.length <= 1) return; onUpdate('earthElectrodeTests', earthTests.filter((t) => t.id !== id)); };
  const updateEarthTest = (id: string, field: string, value: any) => onUpdate('earthElectrodeTests', earthTests.map((t) => t.id === id ? { ...t, [field]: value } : t));

  // Down conductor helpers
  const dcTests: DownConductorTest[] = formData.downConductorTests || [];
  const addDcTest = () => {
    const next = `DC${dcTests.length + 1}`;
    onUpdate('downConductorTests', [...dcTests, { id: crypto.randomUUID(), reference: next, location: '', fromPoint: '', toPoint: '', measuredResistance: '', previousReading: '', photo: '' }]);
  };
  const removeDcTest = (id: string) => { if (dcTests.length <= 1) return; onUpdate('downConductorTests', dcTests.filter((t) => t.id !== id)); };
  const updateDcTest = (id: string, field: string, value: any) => onUpdate('downConductorTests', dcTests.map((t) => t.id === id ? { ...t, [field]: value } : t));

  // Bonding helpers
  const bondTests: BondingTest[] = formData.bondingTests || [];
  const addBondTest = () => {
    const next = `B${bondTests.length + 1}`;
    onUpdate('bondingTests', [...bondTests, { id: crypto.randomUUID(), reference: next, serviceBonded: '', bondLocation: '', conductorSize: '', measuredResistance: '' }]);
  };
  const removeBondTest = (id: string) => { if (bondTests.length <= 1) return; onUpdate('bondingTests', bondTests.filter((t) => t.id !== id)); };
  const updateBondTest = (id: string, field: string, value: any) => onUpdate('bondingTests', bondTests.map((t) => t.id === id ? { ...t, [field]: value } : t));

  // SPD helpers
  const spdChecks: SPDCheck[] = formData.spdChecks || [];
  const addSpdCheck = () => onUpdate('spdChecks', [...spdChecks, { id: crypto.randomUUID(), reference: `SPD${spdChecks.length + 1}`, location: '', spdType: '', make: '', model: '', statusIndicator: '', disconnectorCheck: '' }]);
  const removeSpdCheck = (id: string) => onUpdate('spdChecks', spdChecks.filter((t) => t.id !== id));
  const updateSpdCheck = (id: string, field: string, value: any) => onUpdate('spdChecks', spdChecks.map((t) => t.id === id ? { ...t, [field]: value } : t));

  // Separation helpers
  const sepChecks: SeparationDistanceCheck[] = formData.separationChecks || [];
  const addSepCheck = () => onUpdate('separationChecks', [...sepChecks, { id: crypto.randomUUID(), location: '', measuredDistance: '', requiredDistance: '' }]);
  const removeSepCheck = (id: string) => onUpdate('separationChecks', sepChecks.filter((t) => t.id !== id));
  const updateSepCheck = (id: string, field: string, value: any) => onUpdate('separationChecks', sepChecks.map((t) => t.id === id ? { ...t, [field]: value } : t));

  // ── Reading keypad — shared MW pattern ──
  // Entry rows are dynamic, so reading names are keyed `${kind}-${entry.id}`
  // (unique per input on the page). Values flow through the existing per-entry
  // updaters; the header verdict reuses the SAME pass/fail helpers that drive
  // the PassFailBadge chips — no new limits. Sequence is omitted: DOM order
  // already matches the natural test order (conditions → earths → down
  // conductors → bonds → separation).
  const keypadMeta: Record<string, ReadingMeta> = {
    ambientTemp: { label: 'Ambient temperature', unit: '°C' },
    soilResistivity: { label: 'Soil resistivity', unit: 'Ω·m' },
  };
  earthTests.forEach((t) => {
    keypadMeta[`earth-measured-${t.id}`] = { label: `${t.reference || 'Electrode'} — earth electrode resistance`, unit: 'Ω' };
    keypadMeta[`earth-previous-${t.id}`] = { label: `${t.reference || 'Electrode'} — previous reading`, unit: 'Ω' };
  });
  dcTests.forEach((t) => {
    keypadMeta[`dc-measured-${t.id}`] = { label: `${t.reference || 'Down conductor'} — continuity resistance`, unit: 'Ω' };
  });
  bondTests.forEach((t) => {
    keypadMeta[`bond-measured-${t.id}`] = { label: `${t.reference || 'Bond'} — bonding resistance`, unit: 'Ω' };
  });
  sepChecks.forEach((c, i) => {
    keypadMeta[`sep-measured-${c.id}`] = { label: `Separation ${i + 1} — measured distance`, unit: 'mm' };
    keypadMeta[`sep-required-${c.id}`] = { label: `Separation ${i + 1} — required distance`, unit: 'mm' };
  });

  const keypad = useReadingKeypad({
    meta: keypadMeta,
    getValue: (field) => {
      if (field === 'ambientTemp' || field === 'soilResistivity') return String(formData[field] ?? '');
      if (field.startsWith('earth-measured-')) return earthTests.find((t) => t.id === field.slice('earth-measured-'.length))?.measuredResistance ?? '';
      if (field.startsWith('earth-previous-')) return earthTests.find((t) => t.id === field.slice('earth-previous-'.length))?.previousReading ?? '';
      if (field.startsWith('dc-measured-')) return dcTests.find((t) => t.id === field.slice('dc-measured-'.length))?.measuredResistance ?? '';
      if (field.startsWith('bond-measured-')) return bondTests.find((t) => t.id === field.slice('bond-measured-'.length))?.measuredResistance ?? '';
      if (field.startsWith('sep-measured-')) return sepChecks.find((c) => c.id === field.slice('sep-measured-'.length))?.measuredDistance ?? '';
      if (field.startsWith('sep-required-')) return sepChecks.find((c) => c.id === field.slice('sep-required-'.length))?.requiredDistance ?? '';
      return '';
    },
    setValue: (field, value) => {
      if (field === 'ambientTemp' || field === 'soilResistivity') { onUpdate(field, value); return; }
      if (field.startsWith('earth-measured-')) { updateEarthTest(field.slice('earth-measured-'.length), 'measuredResistance', value); return; }
      if (field.startsWith('earth-previous-')) { updateEarthTest(field.slice('earth-previous-'.length), 'previousReading', value); return; }
      if (field.startsWith('dc-measured-')) { updateDcTest(field.slice('dc-measured-'.length), 'measuredResistance', value); return; }
      if (field.startsWith('bond-measured-')) { updateBondTest(field.slice('bond-measured-'.length), 'measuredResistance', value); return; }
      if (field.startsWith('sep-measured-')) { updateSepCheck(field.slice('sep-measured-'.length), 'measuredDistance', value); return; }
      if (field.startsWith('sep-required-')) { updateSepCheck(field.slice('sep-required-'.length), 'requiredDistance', value); return; }
    },
    getStatus: (field, value) => {
      const badge = (result: 'pass' | 'fail' | '', passLabel: string, failLabel: string) =>
        result === '' ? null : result === 'pass'
          ? { tone: 'pass' as const, label: passLabel }
          : { tone: 'check' as const, label: failLabel };
      if (field.startsWith('earth-measured-'))
        return badge(isEarthResistancePass(value), `Within ≤${EARTH_RESISTANCE_THRESHOLD}Ω limit`, `Above ${EARTH_RESISTANCE_THRESHOLD}Ω limit`);
      if (field.startsWith('dc-measured-'))
        return badge(isContinuityPass(value), `Within <${CONTINUITY_THRESHOLD}Ω limit`, `At or above ${CONTINUITY_THRESHOLD}Ω limit`);
      if (field.startsWith('bond-measured-'))
        return badge(isBondingPass(value), `Within ≤${BONDING_THRESHOLD}Ω limit`, `Above ${BONDING_THRESHOLD}Ω limit`);
      if (field.startsWith('sep-measured-')) {
        // Same check as the entry's PassFailBadge: measured >= required.
        const check = sepChecks.find((c) => c.id === field.slice('sep-measured-'.length));
        if (!check?.requiredDistance || !value) return null;
        return parseFloat(value) >= parseFloat(check.requiredDistance)
          ? { tone: 'pass' as const, label: `Meets required ${check.requiredDistance}mm` }
          : { tone: 'check' as const, label: `Below required ${check.requiredDistance}mm` };
      }
      return null;
    },
  });

  // Select options
  const weatherOptions = [
    { value: 'dry', label: 'Dry' },
    { value: 'damp', label: 'Damp' },
    { value: 'wet', label: 'Wet' },
    { value: 'frost', label: 'Frost' },
  ];
  const soilOptions = [
    { value: 'dry', label: 'Dry' },
    { value: 'moist', label: 'Moist' },
    { value: 'saturated', label: 'Saturated' },
    { value: 'frozen', label: 'Frozen' },
  ];
  const testMethodOptions = [
    { value: 'fall-of-potential', label: 'Fall of potential' },
    { value: 'stakeless', label: 'Stakeless' },
    { value: 'clamp-on', label: 'Clamp-on' },
  ];
  const electrodeTypeOptions = [
    { value: 'rod', label: 'Rod' },
    { value: 'plate', label: 'Plate' },
    { value: 'strip', label: 'Strip' },
    { value: 'ring', label: 'Ring' },
    { value: 'foundation', label: 'Foundation' },
  ];
  const spdTypeOptions = [
    { value: '1', label: 'Type 1' },
    { value: '2', label: 'Type 2' },
    { value: '3', label: 'Type 3' },
  ];
  const spdStatusOptions = [
    { value: 'ok', label: 'OK (green)' },
    { value: 'fault', label: 'Fault (red)' },
    { value: 'replaced', label: 'Replaced' },
  ];
  const disconnectorOptions = [
    { value: 'ok', label: 'OK' },
    { value: 'tripped', label: 'Tripped' },
  ];

  return (
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      <input ref={testPhotoRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleTestPhoto} />

      {/* ── Test Conditions ── */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Test conditions" subtitle="Weather, soil, instrument" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Weather">
            <MobileSelectPicker value={formData.weatherCondition} onValueChange={(v) => onUpdate('weatherCondition', v)} options={weatherOptions} placeholder="Select..." title="Weather" triggerClassName={pickerTrigger} />
          </Field>
          <Field label="Soil condition">
            <MobileSelectPicker value={formData.soilCondition} onValueChange={(v) => onUpdate('soilCondition', v)} options={soilOptions} placeholder="Select..." title="Soil Condition" triggerClassName={pickerTrigger} />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Ambient temp (°C)">
            <Input value={formData.ambientTemp} onChange={(e) => onUpdate('ambientTemp', e.target.value)} className={inputCn} {...keypad.field('ambientTemp')} />
          </Field>
          <Field label="Soil resistivity (Ω·m)">
            <Input step="0.1" value={formData.soilResistivity} onChange={(e) => onUpdate('soilResistivity', e.target.value)} className={inputCn} placeholder="If measured" {...keypad.field('soilResistivity')} />
          </Field>
        </div>

        <Sub title="LPS drawing" />
        <Field label="Drawing / schematic ref">
          <Input value={formData.lpsDrawingRef} onChange={(e) => onUpdate('lpsDrawingRef', e.target.value)} className={inputCn} placeholder="e.g. DWG-LP-001 Rev B" />
        </Field>
        <Toggle label="Drawing attached to certificate" value={formData.lpsDrawingAttached} onChange={(v) => onUpdate('lpsDrawingAttached', v)} />

        <Sub title="Test limitations" />
        <Toggle label="Test limitations apply" value={formData.hasTestLimitations} onChange={(v) => onUpdate('hasTestLimitations', v)} />
        {formData.hasTestLimitations && (
          <Field label="Describe limitations">
            <Input value={formData.testLimitations} onChange={(e) => onUpdate('testLimitations', e.target.value)} className={inputCn} placeholder="e.g. Test clamp DC4 inaccessible — locked plant room" />
          </Field>
        )}

        <Sub title="Instrument details" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Instrument make">
            <Input value={formData.instrumentMake} onChange={(e) => onUpdate('instrumentMake', e.target.value)} className={inputCn} placeholder="e.g. Megger" />
          </Field>
          <Field label="Model">
            <Input value={formData.instrumentModel} onChange={(e) => onUpdate('instrumentModel', e.target.value)} className={inputCn} placeholder="e.g. DET4TC" />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Serial no.">
            <Input value={formData.instrumentSerial} onChange={(e) => onUpdate('instrumentSerial', e.target.value)} className={inputCn} />
          </Field>
          <Field label="Cal. date">
            <Input type="date" value={formData.instrumentCalDate} onChange={(e) => onUpdate('instrumentCalDate', e.target.value)} className={inputCn} />
          </Field>
        </div>
      </div>

      {/* ── Earth Electrode Tests ── */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title={`Earth electrode resistance (≤${EARTH_RESISTANCE_THRESHOLD}Ω)`} count={earthTests.length} />
        <div>
          {earthTests.map((test, idx) => (
            <div key={test.id} className={entryCn(idx)}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-elec-yellow">{test.reference}</span>
                  <PassFailBadge value={isEarthResistancePass(test.measuredResistance)} />
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => { setPhotoTarget({ type: 'earth', id: test.id }); testPhotoRef.current?.click(); }} className={photoButtonCn(!!test.photo)}>
                    {test.photo ? 'Photo added' : 'Photo'}
                  </button>
                  {earthTests.length > 1 && <button onClick={() => removeEarthTest(test.id)} className={removeButtonCn}>Remove</button>}
                </div>
              </div>
              {test.photo && (
                <div className="relative w-20 h-20 rounded-xl overflow-hidden">
                  <img src={test.photo} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => updateEarthTest(test.id, 'photo', '')} className="absolute top-1 right-1 rounded-md bg-black/70 px-1.5 py-0.5 text-[11px] font-medium text-white touch-manipulation">Remove</button>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <Input value={test.reference} onChange={(e) => updateEarthTest(test.id, 'reference', e.target.value)} className={inputCn} placeholder="Ref" />
                <Input value={test.location} onChange={(e) => updateEarthTest(test.id, 'location', e.target.value)} className={inputCn} placeholder="Location" />
              </div>
              <MobileSelectPicker value={test.electrodeType} onValueChange={(v) => updateEarthTest(test.id, 'electrodeType', v)} options={electrodeTypeOptions} placeholder="Electrode type" title="Electrode Type" triggerClassName={pickerTrigger} />
              <Sub title="Test readings" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <MobileSelectPicker value={test.testMethod} onValueChange={(v) => updateEarthTest(test.id, 'testMethod', v)} options={testMethodOptions} placeholder="Method" title="Test Method" triggerClassName={pickerTrigger} />
                <Input value={test.measuredResistance} onChange={(e) => updateEarthTest(test.id, 'measuredResistance', e.target.value)} className={inputCn} placeholder="Reading (Ω)" {...keypad.field(`earth-measured-${test.id}`)} />
              </div>
              <Input value={test.previousReading} onChange={(e) => updateEarthTest(test.id, 'previousReading', e.target.value)} className={cn(inputCn, 'opacity-60')} placeholder="Previous (Ω)" {...keypad.field(`earth-previous-${test.id}`)} />
            </div>
          ))}
        </div>
        <button onClick={addEarthTest} className={addButtonCn}>Add earth electrode</button>
      </div>

      {/* ── Down Conductor Continuity ── */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title={`Down conductor continuity (<${CONTINUITY_THRESHOLD}Ω)`} count={dcTests.length} />
        <div>
          {dcTests.map((test, idx) => (
            <div key={test.id} className={entryCn(idx)}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-elec-yellow">{test.reference}</span>
                  <PassFailBadge value={isContinuityPass(test.measuredResistance)} />
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => { setPhotoTarget({ type: 'dc', id: test.id }); testPhotoRef.current?.click(); }} className={photoButtonCn(!!test.photo)}>
                    {test.photo ? 'Photo added' : 'Photo'}
                  </button>
                  {dcTests.length > 1 && <button onClick={() => removeDcTest(test.id)} className={removeButtonCn}>Remove</button>}
                </div>
              </div>
              {test.photo && (
                <div className="relative w-20 h-20 rounded-xl overflow-hidden">
                  <img src={test.photo} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => updateDcTest(test.id, 'photo', '')} className="absolute top-1 right-1 rounded-md bg-black/70 px-1.5 py-0.5 text-[11px] font-medium text-white touch-manipulation">Remove</button>
                </div>
              )}
              <Input value={test.location} onChange={(e) => updateDcTest(test.id, 'location', e.target.value)} className={inputCn} placeholder="Location (e.g. NE corner)" />
              <Sub title="Continuity path" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <Input value={test.fromPoint} onChange={(e) => updateDcTest(test.id, 'fromPoint', e.target.value)} className={inputCn} placeholder="From" />
                <Input value={test.toPoint} onChange={(e) => updateDcTest(test.id, 'toPoint', e.target.value)} className={inputCn} placeholder="To" />
              </div>
              <Input value={test.measuredResistance} onChange={(e) => updateDcTest(test.id, 'measuredResistance', e.target.value)} className={inputCn} placeholder="Reading (Ω)" {...keypad.field(`dc-measured-${test.id}`)} />
            </div>
          ))}
        </div>
        <button onClick={addDcTest} className={addButtonCn}>Add down conductor</button>
      </div>

      {/* ── Bonding Tests ── */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title={`Bonding tests (≤${BONDING_THRESHOLD}Ω)`} count={bondTests.length} />
        <div>
          {bondTests.map((test, idx) => (
            <div key={test.id} className={entryCn(idx)}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-elec-yellow">{test.reference}</span>
                  <PassFailBadge value={isBondingPass(test.measuredResistance)} />
                </div>
                {bondTests.length > 1 && <button onClick={() => removeBondTest(test.id)} className={removeButtonCn}>Remove</button>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <Input value={test.serviceBonded} onChange={(e) => updateBondTest(test.id, 'serviceBonded', e.target.value)} className={inputCn} placeholder="Service (gas, water...)" />
                <Input value={test.bondLocation} onChange={(e) => updateBondTest(test.id, 'bondLocation', e.target.value)} className={inputCn} placeholder="Bond location" />
              </div>
              <Sub title="Readings" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <Input value={test.conductorSize} onChange={(e) => updateBondTest(test.id, 'conductorSize', e.target.value)} className={inputCn} placeholder="Size (mm²)" />
                <Input value={test.measuredResistance} onChange={(e) => updateBondTest(test.id, 'measuredResistance', e.target.value)} className={inputCn} placeholder="Reading (Ω)" {...keypad.field(`bond-measured-${test.id}`)} />
              </div>
            </div>
          ))}
        </div>
        <button onClick={addBondTest} className={addButtonCn}>Add bonding test</button>
      </div>

      {/* ── SPD Checks ── */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="SPD checks" count={spdChecks.length} />
        <div>
          {spdChecks.map((check, idx) => (
            <div key={check.id} className={entryCn(idx)}>
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-elec-yellow">{check.reference}</span>
                <button onClick={() => removeSpdCheck(check.id)} className={removeButtonCn}>Remove</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <Input value={check.location} onChange={(e) => updateSpdCheck(check.id, 'location', e.target.value)} className={inputCn} placeholder="Location" />
                <MobileSelectPicker value={check.spdType} onValueChange={(v) => updateSpdCheck(check.id, 'spdType', v)} options={spdTypeOptions} placeholder="Type" title="SPD Type" triggerClassName={pickerTrigger} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <Input value={check.make} onChange={(e) => updateSpdCheck(check.id, 'make', e.target.value)} className={inputCn} placeholder="Make" />
                <Input value={check.model} onChange={(e) => updateSpdCheck(check.id, 'model', e.target.value)} className={inputCn} placeholder="Model" />
              </div>
              <Sub title="Status" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <MobileSelectPicker value={check.statusIndicator} onValueChange={(v) => updateSpdCheck(check.id, 'statusIndicator', v)} options={spdStatusOptions} placeholder="Status" title="Status Indicator" triggerClassName={pickerTrigger} />
                <MobileSelectPicker value={check.disconnectorCheck} onValueChange={(v) => updateSpdCheck(check.id, 'disconnectorCheck', v)} options={disconnectorOptions} placeholder="Disconnector" title="Disconnector Check" triggerClassName={pickerTrigger} />
              </div>
            </div>
          ))}
        </div>
        <button onClick={addSpdCheck} className={addButtonCn}>Add SPD check</button>
      </div>

      {/* ── Separation Distance ── */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Separation distance" subtitle="Optional" count={sepChecks.length} />
        <div>
          {sepChecks.map((check, idx) => (
            <div key={check.id} className={entryCn(idx)}>
              <div className="flex items-center justify-between gap-3">
                <PassFailBadge value={check.measuredDistance && check.requiredDistance ? (parseFloat(check.measuredDistance) >= parseFloat(check.requiredDistance) ? 'pass' : 'fail') : ''} />
                <button onClick={() => removeSepCheck(check.id)} className={removeButtonCn}>Remove</button>
              </div>
              <Input value={check.location} onChange={(e) => updateSepCheck(check.id, 'location', e.target.value)} className={inputCn} placeholder="Location" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <Input value={check.measuredDistance} onChange={(e) => updateSepCheck(check.id, 'measuredDistance', e.target.value)} className={inputCn} placeholder="Measured (mm)" {...keypad.field(`sep-measured-${check.id}`)} />
                <Input value={check.requiredDistance} onChange={(e) => updateSepCheck(check.id, 'requiredDistance', e.target.value)} className={inputCn} placeholder="Required (mm)" {...keypad.field(`sep-required-${check.id}`)} />
              </div>
            </div>
          ))}
        </div>
        <button onClick={addSepCheck} className={addButtonCn}>Add separation check</button>
      </div>

      {/* Scroll room so the last reading can rise clear of the keypad */}
      {keypad.spacer}

      {/* Reading keypad — coarse-pointer devices only */}
      {keypad.element}
    </div>
  );
}
