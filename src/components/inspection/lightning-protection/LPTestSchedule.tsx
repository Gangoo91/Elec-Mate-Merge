import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Camera, X } from 'lucide-react';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { cn } from '@/lib/utils';
import { useLightningProtectionSmartForm } from '@/hooks/inspection/useLightningProtectionSmartForm';
import { EarthElectrodeTest, DownConductorTest, BondingTest, SPDCheck, SeparationDistanceCheck, EARTH_RESISTANCE_THRESHOLD, CONTINUITY_THRESHOLD, BONDING_THRESHOLD } from '@/types/lightning-protection';

const inputCn = '!h-10 !py-1 !text-xs touch-manipulation bg-white/[0.06] border-white/[0.08] text-white [color-scheme:dark]';
const pickerTrigger = 'h-10 w-full touch-manipulation bg-white/[0.06] border-white/[0.08] text-white';

const SectionHeader = ({ title, count, subtitle }: { title: string; count?: number; subtitle?: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider flex items-center gap-2">
      {title}
      {count !== undefined && <span className="text-[10px] font-bold text-white bg-white/[0.1] px-2 py-0.5 rounded">{count}</span>}
      {subtitle && <span className="text-[10px] text-white font-normal">— {subtitle}</span>}
    </h2>
  </div>
);

const Sub = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 pt-2">
    <p className="text-[10px] font-semibold text-white uppercase tracking-wider shrink-0">{title}</p>
    <div className="h-px flex-1 bg-white/[0.06]" />
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div><Label className="text-white text-xs mb-1.5 block">{label}</Label>{children}</div>
);

const PassFailBadge = ({ value }: { value: 'pass' | 'fail' | '' }) => {
  if (!value) return null;
  return <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded', value === 'pass' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400')}>{value.toUpperCase()}</span>;
};

const Toggle = ({ label, value, onChange }: { label: string; value: boolean | undefined; onChange: (v: boolean) => void }) => (
  <div className="flex items-center justify-between">
    <Label className="text-white text-xs font-medium">{label}</Label>
    <div className="flex gap-1.5">
      {[true, false].map((v) => (
        <button
          key={String(v)}
          type="button"
          onClick={() => onChange(v)}
          className={cn(
            'w-14 h-8 rounded-lg text-[11px] font-semibold touch-manipulation transition-all',
            value === v
              ? v ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              : 'bg-white/[0.06] text-white border border-white/[0.08]'
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
    <div className="space-y-5">
      <input ref={testPhotoRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleTestPhoto} />

      {/* ── Test Conditions ── */}
      <div>
        <SectionHeader title="Test Conditions" subtitle="Weather, soil, instrument" />
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Weather">
              <MobileSelectPicker value={formData.weatherCondition} onValueChange={(v) => onUpdate('weatherCondition', v)} options={weatherOptions} placeholder="Select..." title="Weather" triggerClassName={pickerTrigger} />
            </Field>
            <Field label="Soil Condition">
              <MobileSelectPicker value={formData.soilCondition} onValueChange={(v) => onUpdate('soilCondition', v)} options={soilOptions} placeholder="Select..." title="Soil Condition" triggerClassName={pickerTrigger} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Ambient Temp (°C)">
              <Input type="number" value={formData.ambientTemp} onChange={(e) => onUpdate('ambientTemp', e.target.value)} className={inputCn} />
            </Field>
            <Field label="Soil Resistivity (Ω·m)">
              <Input type="number" step="0.1" value={formData.soilResistivity} onChange={(e) => onUpdate('soilResistivity', e.target.value)} className={inputCn} placeholder="If measured" />
            </Field>
          </div>

          <Sub title="LPS Drawing" />
          <Field label="Drawing / Schematic Ref">
            <Input value={formData.lpsDrawingRef} onChange={(e) => onUpdate('lpsDrawingRef', e.target.value)} className={inputCn} placeholder="e.g. DWG-LP-001 Rev B" />
          </Field>

          <Sub title="Test Limitations" />
          <Toggle label="Test limitations apply" value={formData.hasTestLimitations} onChange={(v) => onUpdate('hasTestLimitations', v)} />
          {formData.hasTestLimitations && (
            <Field label="Describe Limitations">
              <Input value={formData.testLimitations} onChange={(e) => onUpdate('testLimitations', e.target.value)} className={inputCn} placeholder="e.g. Test clamp DC4 inaccessible — locked plant room" />
            </Field>
          )}

          <Sub title="Instrument Details" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Instrument Make">
              <Input value={formData.instrumentMake} onChange={(e) => onUpdate('instrumentMake', e.target.value)} className={inputCn} placeholder="e.g. Megger" />
            </Field>
            <Field label="Model">
              <Input value={formData.instrumentModel} onChange={(e) => onUpdate('instrumentModel', e.target.value)} className={inputCn} placeholder="e.g. DET4TC" />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Serial No.">
              <Input value={formData.instrumentSerial} onChange={(e) => onUpdate('instrumentSerial', e.target.value)} className={inputCn} />
            </Field>
            <Field label="Cal. Date">
              <Input type="date" value={formData.instrumentCalDate} onChange={(e) => onUpdate('instrumentCalDate', e.target.value)} className={inputCn} />
            </Field>
          </div>
        </div>
      </div>

      {/* ── Earth Electrode Tests ── */}
      <div>
        <SectionHeader title={`Earth Electrode Resistance (\u2264${EARTH_RESISTANCE_THRESHOLD}\u03A9)`} count={earthTests.length} />
        <div className="space-y-2">
          {earthTests.map((test) => (
            <div key={test.id} className="p-3 bg-white/[0.03] rounded-xl border border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-elec-yellow">{test.reference}</span>
                  <PassFailBadge value={isEarthResistancePass(test.measuredResistance)} />
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => { setPhotoTarget({ type: 'earth', id: test.id }); testPhotoRef.current?.click(); }}
                    className={cn('w-8 h-8 rounded-lg flex items-center justify-center touch-manipulation', test.photo ? 'bg-cyan-500/20 border border-cyan-500/30' : 'bg-white/[0.04] border border-white/[0.08]')}>
                    <Camera className={cn('h-3.5 w-3.5', test.photo ? 'text-cyan-400' : 'text-white')} />
                  </button>
                  {earthTests.length > 1 && <button onClick={() => removeEarthTest(test.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:text-red-400 touch-manipulation"><Trash2 className="h-4 w-4" /></button>}
                </div>
              </div>
              {test.photo && (
                <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                  <img src={test.photo} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => updateEarthTest(test.id, 'photo', '')} className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center"><X className="h-3 w-3 text-white" /></button>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                <Input value={test.reference} onChange={(e) => updateEarthTest(test.id, 'reference', e.target.value)} className={inputCn} placeholder="Ref" />
                <Input value={test.location} onChange={(e) => updateEarthTest(test.id, 'location', e.target.value)} className={inputCn} placeholder="Location" />
              </div>
              <Sub title="Test readings" />
              <div className="grid grid-cols-2 gap-2">
                <MobileSelectPicker value={test.testMethod} onValueChange={(v) => updateEarthTest(test.id, 'testMethod', v)} options={testMethodOptions} placeholder="Method" title="Test Method" triggerClassName={pickerTrigger} />
                <Input value={test.measuredResistance} onChange={(e) => updateEarthTest(test.id, 'measuredResistance', e.target.value)} className={inputCn} placeholder="Reading (\u03A9)" />
              </div>
              <Input value={test.previousReading} onChange={(e) => updateEarthTest(test.id, 'previousReading', e.target.value)} className={cn(inputCn, 'opacity-60')} placeholder="Previous (\u03A9)" />
            </div>
          ))}
          <button onClick={addEarthTest} className="w-full h-10 rounded-xl border-2 border-dashed border-elec-yellow/20 flex items-center justify-center gap-2 text-xs font-medium text-elec-yellow touch-manipulation active:scale-[0.98]">
            <Plus className="h-4 w-4" /> Add Earth Electrode
          </button>
        </div>
      </div>

      {/* ── Down Conductor Continuity ── */}
      <div>
        <SectionHeader title={`Down Conductor Continuity (<${CONTINUITY_THRESHOLD}\u03A9)`} count={dcTests.length} />
        <div className="space-y-2">
          {dcTests.map((test) => (
            <div key={test.id} className="p-3 bg-white/[0.03] rounded-xl border border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-elec-yellow">{test.reference}</span>
                  <PassFailBadge value={isContinuityPass(test.measuredResistance)} />
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => { setPhotoTarget({ type: 'dc', id: test.id }); testPhotoRef.current?.click(); }}
                    className={cn('w-8 h-8 rounded-lg flex items-center justify-center touch-manipulation', test.photo ? 'bg-cyan-500/20 border border-cyan-500/30' : 'bg-white/[0.04] border border-white/[0.08]')}>
                    <Camera className={cn('h-3.5 w-3.5', test.photo ? 'text-cyan-400' : 'text-white')} />
                  </button>
                  {dcTests.length > 1 && <button onClick={() => removeDcTest(test.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:text-red-400 touch-manipulation"><Trash2 className="h-4 w-4" /></button>}
                </div>
              </div>
              {test.photo && (
                <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                  <img src={test.photo} alt="" className="w-full h-full object-cover" />
                  <button onClick={() => updateDcTest(test.id, 'photo', '')} className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center"><X className="h-3 w-3 text-white" /></button>
                </div>
              )}
              <Input value={test.location} onChange={(e) => updateDcTest(test.id, 'location', e.target.value)} className={inputCn} placeholder="Location (e.g. NE corner)" />
              <Sub title="Continuity path" />
              <div className="grid grid-cols-2 gap-2">
                <Input value={test.fromPoint} onChange={(e) => updateDcTest(test.id, 'fromPoint', e.target.value)} className={inputCn} placeholder="From" />
                <Input value={test.toPoint} onChange={(e) => updateDcTest(test.id, 'toPoint', e.target.value)} className={inputCn} placeholder="To" />
              </div>
              <Input value={test.measuredResistance} onChange={(e) => updateDcTest(test.id, 'measuredResistance', e.target.value)} className={inputCn} placeholder="Reading (\u03A9)" />
            </div>
          ))}
          <button onClick={addDcTest} className="w-full h-10 rounded-xl border-2 border-dashed border-elec-yellow/20 flex items-center justify-center gap-2 text-xs font-medium text-elec-yellow touch-manipulation active:scale-[0.98]">
            <Plus className="h-4 w-4" /> Add Down Conductor
          </button>
        </div>
      </div>

      {/* ── Bonding Tests ── */}
      <div>
        <SectionHeader title={`Bonding Tests (\u2264${BONDING_THRESHOLD}\u03A9)`} count={bondTests.length} />
        <div className="space-y-2">
          {bondTests.map((test) => (
            <div key={test.id} className="p-3 bg-white/[0.03] rounded-xl border border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-elec-yellow">{test.reference}</span>
                  <PassFailBadge value={isBondingPass(test.measuredResistance)} />
                </div>
                {bondTests.length > 1 && <button onClick={() => removeBondTest(test.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:text-red-400 touch-manipulation"><Trash2 className="h-4 w-4" /></button>}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input value={test.serviceBonded} onChange={(e) => updateBondTest(test.id, 'serviceBonded', e.target.value)} className={inputCn} placeholder="Service (gas, water...)" />
                <Input value={test.bondLocation} onChange={(e) => updateBondTest(test.id, 'bondLocation', e.target.value)} className={inputCn} placeholder="Bond location" />
              </div>
              <Sub title="Readings" />
              <div className="grid grid-cols-2 gap-2">
                <Input value={test.conductorSize} onChange={(e) => updateBondTest(test.id, 'conductorSize', e.target.value)} className={inputCn} placeholder="Size (mm\u00B2)" />
                <Input value={test.measuredResistance} onChange={(e) => updateBondTest(test.id, 'measuredResistance', e.target.value)} className={inputCn} placeholder="Reading (\u03A9)" />
              </div>
            </div>
          ))}
          <button onClick={addBondTest} className="w-full h-10 rounded-xl border-2 border-dashed border-elec-yellow/20 flex items-center justify-center gap-2 text-xs font-medium text-elec-yellow touch-manipulation active:scale-[0.98]">
            <Plus className="h-4 w-4" /> Add Bonding Test
          </button>
        </div>
      </div>

      {/* ── SPD Checks ── */}
      <div>
        <SectionHeader title="SPD Checks" count={spdChecks.length} />
        <div className="space-y-2">
          {spdChecks.map((check) => (
            <div key={check.id} className="p-3 bg-white/[0.03] rounded-xl border border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-elec-yellow">{check.reference}</span>
                <button onClick={() => removeSpdCheck(check.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:text-red-400 touch-manipulation"><Trash2 className="h-4 w-4" /></button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input value={check.location} onChange={(e) => updateSpdCheck(check.id, 'location', e.target.value)} className={inputCn} placeholder="Location" />
                <MobileSelectPicker value={check.spdType} onValueChange={(v) => updateSpdCheck(check.id, 'spdType', v)} options={spdTypeOptions} placeholder="Type" title="SPD Type" triggerClassName={pickerTrigger} />
              </div>
              <Sub title="Status" />
              <div className="grid grid-cols-2 gap-2">
                <MobileSelectPicker value={check.statusIndicator} onValueChange={(v) => updateSpdCheck(check.id, 'statusIndicator', v)} options={spdStatusOptions} placeholder="Status" title="Status Indicator" triggerClassName={pickerTrigger} />
                <MobileSelectPicker value={check.disconnectorCheck} onValueChange={(v) => updateSpdCheck(check.id, 'disconnectorCheck', v)} options={disconnectorOptions} placeholder="Disconnector" title="Disconnector Check" triggerClassName={pickerTrigger} />
              </div>
            </div>
          ))}
          <button onClick={addSpdCheck} className="w-full h-10 rounded-xl border-2 border-dashed border-elec-yellow/20 flex items-center justify-center gap-2 text-xs font-medium text-elec-yellow touch-manipulation active:scale-[0.98]">
            <Plus className="h-4 w-4" /> Add SPD Check
          </button>
        </div>
      </div>

      {/* ── Separation Distance ── */}
      <div>
        <SectionHeader title="Separation Distance" subtitle="Optional" count={sepChecks.length} />
        <div className="space-y-2">
          {sepChecks.map((check) => (
            <div key={check.id} className="p-3 bg-white/[0.03] rounded-xl border border-white/[0.06] space-y-2">
              <div className="flex items-center justify-between">
                <PassFailBadge value={check.measuredDistance && check.requiredDistance ? (parseFloat(check.measuredDistance) >= parseFloat(check.requiredDistance) ? 'pass' : 'fail') : ''} />
                <button onClick={() => removeSepCheck(check.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:text-red-400 touch-manipulation"><Trash2 className="h-4 w-4" /></button>
              </div>
              <Input value={check.location} onChange={(e) => updateSepCheck(check.id, 'location', e.target.value)} className={inputCn} placeholder="Location" />
              <div className="grid grid-cols-2 gap-2">
                <Input value={check.measuredDistance} onChange={(e) => updateSepCheck(check.id, 'measuredDistance', e.target.value)} className={inputCn} placeholder="Measured (mm)" />
                <Input value={check.requiredDistance} onChange={(e) => updateSepCheck(check.id, 'requiredDistance', e.target.value)} className={inputCn} placeholder="Required (mm)" />
              </div>
            </div>
          ))}
          <button onClick={addSepCheck} className="w-full h-10 rounded-xl border-2 border-dashed border-elec-yellow/20 flex items-center justify-center gap-2 text-xs font-medium text-elec-yellow touch-manipulation active:scale-[0.98]">
            <Plus className="h-4 w-4" /> Add Separation Check
          </button>
        </div>
      </div>
    </div>
  );
}
