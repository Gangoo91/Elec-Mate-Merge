import { useState, useRef } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Globe2, ArrowDown, Link, Zap, Thermometer, Gauge, ChevronUp, ChevronDown, CheckCircle2, XCircle, Camera, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLightningProtectionSmartForm } from '@/hooks/inspection/useLightningProtectionSmartForm';
import { EarthElectrodeTest, DownConductorTest, BondingTest, SPDCheck, SeparationDistanceCheck, EARTH_RESISTANCE_THRESHOLD, CONTINUITY_THRESHOLD, BONDING_THRESHOLD } from '@/types/lightning-protection';

const inputCn = 'h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500';
const inputSmCn = 'h-9 text-sm touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500';
const selectTriggerCn = 'h-9 text-sm touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow';
const selectContentCn = 'z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground';

interface SH { title: string; icon: React.ReactNode; isOpen: boolean; color: string; subtitle?: string; count?: number }
const SectionHeader = ({ title, icon, isOpen, color, subtitle, count }: SH) => (
  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-white/5 transition-colors rounded-t-xl">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-11 rounded-xl flex items-center justify-center bg-${color}/15`}>{icon}</div>
      <div className="text-left"><h3 className="text-base font-semibold text-foreground flex items-center gap-2">{title}{count !== undefined && <span className="text-[10px] font-bold text-white bg-white/[0.1] px-2 py-0.5 rounded">{count}</span>}</h3>{subtitle && <span className="text-xs text-white">{subtitle}</span>}</div>
    </div>
    {isOpen ? <ChevronUp className="h-5 w-5 text-white" /> : <ChevronDown className="h-5 w-5 text-white" />}
  </CollapsibleTrigger>
);

const PassFailBadge = ({ value }: { value: 'pass' | 'fail' | '' }) => {
  if (!value) return null;
  return <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded', value === 'pass' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400')}>{value.toUpperCase()}</span>;
};

interface Props { formData: any; onUpdate: (field: string, value: any) => void }

export default function LPTestSchedule({ formData, onUpdate }: Props) {
  const [condOpen, setCondOpen] = useState(true);
  const [earthOpen, setEarthOpen] = useState(true);
  const [dcOpen, setDcOpen] = useState(true);
  const [bondOpen, setBondOpen] = useState(true);
  const [spdOpen, setSpdOpen] = useState(false);
  const [sepOpen, setSepOpen] = useState(false);

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

  return (
    <div className="space-y-3">
      <input ref={testPhotoRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleTestPhoto} />

      {/* Test Conditions */}
      <div className="eicr-section-card">
        <Collapsible open={condOpen} onOpenChange={setCondOpen}>
          <SectionHeader title="Test Conditions" icon={<Thermometer className="h-5 w-5 text-amber-400" />} isOpen={condOpen} color="amber-500" subtitle="Weather, soil, instrument" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-white">Weather</Label>
                  <Select value={formData.weatherCondition} onValueChange={(v) => onUpdate('weatherCondition', v)}>
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30"><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="dry">Dry</SelectItem>
                      <SelectItem value="damp">Damp</SelectItem>
                      <SelectItem value="wet">Wet</SelectItem>
                      <SelectItem value="frost">Frost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-white">Soil Condition</Label>
                  <Select value={formData.soilCondition} onValueChange={(v) => onUpdate('soilCondition', v)}>
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30"><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="dry">Dry</SelectItem>
                      <SelectItem value="moist">Moist</SelectItem>
                      <SelectItem value="saturated">Saturated</SelectItem>
                      <SelectItem value="frozen">Frozen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label className="text-xs text-white">Ambient Temp (°C)</Label><Input type="number" value={formData.ambientTemp} onChange={(e) => onUpdate('ambientTemp', e.target.value)} className={inputCn} /></div>
              </div>
              {/* LPS Drawing */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">LPS Drawing / Schematic Ref</Label><Input value={formData.lpsDrawingRef} onChange={(e) => onUpdate('lpsDrawingRef', e.target.value)} className={inputCn} placeholder="e.g. DWG-LP-001 Rev B" /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Soil Resistivity (Ω·m)</Label><Input type="number" step="0.1" value={formData.soilResistivity} onChange={(e) => onUpdate('soilResistivity', e.target.value)} className={inputCn} placeholder="If measured" /></div>
              </div>

              {/* Test Limitations */}
              <div className="flex items-center gap-3">
                <Checkbox checked={formData.hasTestLimitations} onCheckedChange={(v) => onUpdate('hasTestLimitations', v)} className={checkboxCn} />
                <Label className="text-sm text-white">Test limitations apply (access restricted, points inaccessible)</Label>
              </div>
              {formData.hasTestLimitations && (
                <div className="space-y-2"><Label className="text-xs text-white">Describe Limitations</Label><Input value={formData.testLimitations} onChange={(e) => onUpdate('testLimitations', e.target.value)} className={inputCn} placeholder="e.g. Test clamp DC4 inaccessible — locked plant room" /></div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">Instrument Make</Label><Input value={formData.instrumentMake} onChange={(e) => onUpdate('instrumentMake', e.target.value)} className={inputCn} placeholder="e.g. Megger" /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Model</Label><Input value={formData.instrumentModel} onChange={(e) => onUpdate('instrumentModel', e.target.value)} className={inputCn} placeholder="e.g. DET4TC" /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Serial No.</Label><Input value={formData.instrumentSerial} onChange={(e) => onUpdate('instrumentSerial', e.target.value)} className={inputCn} /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Cal. Date</Label><Input type="date" value={formData.instrumentCalDate} onChange={(e) => onUpdate('instrumentCalDate', e.target.value)} className={`${inputCn} [color-scheme:dark]`} /></div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Earth Electrode Tests */}
      <div className="eicr-section-card">
        <Collapsible open={earthOpen} onOpenChange={setEarthOpen}>
          <SectionHeader title="Earth Electrode Resistance" icon={<Globe2 className="h-5 w-5 text-green-400" />} isOpen={earthOpen} color="green-500" subtitle={`≤${EARTH_RESISTANCE_THRESHOLD}Ω threshold`} count={earthTests.length} />
          <CollapsibleContent>
            <div className="p-4 space-y-3">
              {earthTests.map((test) => (
                <div key={test.id} className="p-3 bg-white/[0.03] rounded-xl border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-elec-yellow">{test.reference}</span>
                      <PassFailBadge value={isEarthResistancePass(test.measuredResistance)} />
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => { setPhotoTarget({ type: 'earth', id: test.id }); testPhotoRef.current?.click(); }}
                        className={cn('w-8 h-8 rounded-lg flex items-center justify-center touch-manipulation', test.photo ? 'bg-cyan-500/20 border border-cyan-500/30' : 'bg-white/[0.04] border border-white/[0.08]')}>
                        <Camera className={cn('h-3.5 w-3.5', test.photo ? 'text-cyan-400' : 'text-white/40')} />
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
                    <Input value={test.reference} onChange={(e) => updateEarthTest(test.id, 'reference', e.target.value)} className={inputSmCn} placeholder="Ref" />
                    <Input value={test.location} onChange={(e) => updateEarthTest(test.id, 'location', e.target.value)} className={inputSmCn} placeholder="Location" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Select value={test.testMethod} onValueChange={(v) => updateEarthTest(test.id, 'testMethod', v)}>
                      <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Method" /></SelectTrigger>
                      <SelectContent className={selectContentCn}>
                        <SelectItem value="fall-of-potential">Fall of potential</SelectItem>
                        <SelectItem value="stakeless">Stakeless</SelectItem>
                        <SelectItem value="clamp-on">Clamp-on</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input value={test.measuredResistance} onChange={(e) => updateEarthTest(test.id, 'measuredResistance', e.target.value)} className={inputSmCn} placeholder="Reading (Ω)" />
                    <Input value={test.previousReading} onChange={(e) => updateEarthTest(test.id, 'previousReading', e.target.value)} className={cn(inputSmCn, 'opacity-60')} placeholder="Previous (Ω)" />
                  </div>
                </div>
              ))}
              <button onClick={addEarthTest} className="w-full h-11 rounded-xl border-2 border-dashed border-green-500/20 flex items-center justify-center gap-2 text-sm font-medium text-green-400 touch-manipulation active:scale-[0.98]">
                <Plus className="h-4 w-4" /> Add Earth Electrode
              </button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Down Conductor Continuity */}
      <div className="eicr-section-card">
        <Collapsible open={dcOpen} onOpenChange={setDcOpen}>
          <SectionHeader title="Down Conductor Continuity" icon={<ArrowDown className="h-5 w-5 text-blue-400" />} isOpen={dcOpen} color="blue-500" subtitle={`<${CONTINUITY_THRESHOLD}Ω threshold`} count={dcTests.length} />
          <CollapsibleContent>
            <div className="p-4 space-y-3">
              {dcTests.map((test) => (
                <div key={test.id} className="p-3 bg-white/[0.03] rounded-xl border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-elec-yellow">{test.reference}</span>
                      <PassFailBadge value={isContinuityPass(test.measuredResistance)} />
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => { setPhotoTarget({ type: 'dc', id: test.id }); testPhotoRef.current?.click(); }}
                        className={cn('w-8 h-8 rounded-lg flex items-center justify-center touch-manipulation', test.photo ? 'bg-cyan-500/20 border border-cyan-500/30' : 'bg-white/[0.04] border border-white/[0.08]')}>
                        <Camera className={cn('h-3.5 w-3.5', test.photo ? 'text-cyan-400' : 'text-white/40')} />
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
                  <Input value={test.location} onChange={(e) => updateDcTest(test.id, 'location', e.target.value)} className={inputSmCn} placeholder="Location (e.g. NE corner)" />
                  <div className="grid grid-cols-3 gap-2">
                    <Input value={test.fromPoint} onChange={(e) => updateDcTest(test.id, 'fromPoint', e.target.value)} className={inputSmCn} placeholder="From" />
                    <Input value={test.toPoint} onChange={(e) => updateDcTest(test.id, 'toPoint', e.target.value)} className={inputSmCn} placeholder="To" />
                    <Input value={test.measuredResistance} onChange={(e) => updateDcTest(test.id, 'measuredResistance', e.target.value)} className={inputSmCn} placeholder="Reading (Ω)" />
                  </div>
                </div>
              ))}
              <button onClick={addDcTest} className="w-full h-11 rounded-xl border-2 border-dashed border-blue-500/20 flex items-center justify-center gap-2 text-sm font-medium text-blue-400 touch-manipulation active:scale-[0.98]">
                <Plus className="h-4 w-4" /> Add Down Conductor
              </button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Bonding Tests */}
      <div className="eicr-section-card">
        <Collapsible open={bondOpen} onOpenChange={setBondOpen}>
          <SectionHeader title="Bonding Tests" icon={<Link className="h-5 w-5 text-purple-400" />} isOpen={bondOpen} color="purple-500" subtitle={`≤${BONDING_THRESHOLD}Ω threshold`} count={bondTests.length} />
          <CollapsibleContent>
            <div className="p-4 space-y-3">
              {bondTests.map((test) => (
                <div key={test.id} className="p-3 bg-white/[0.03] rounded-xl border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-elec-yellow">{test.reference}</span>
                      <PassFailBadge value={isBondingPass(test.measuredResistance)} />
                    </div>
                    {bondTests.length > 1 && <button onClick={() => removeBondTest(test.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:text-red-400 touch-manipulation"><Trash2 className="h-4 w-4" /></button>}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input value={test.serviceBonded} onChange={(e) => updateBondTest(test.id, 'serviceBonded', e.target.value)} className={inputSmCn} placeholder="Service (gas, water...)" />
                    <Input value={test.bondLocation} onChange={(e) => updateBondTest(test.id, 'bondLocation', e.target.value)} className={inputSmCn} placeholder="Bond location" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input value={test.conductorSize} onChange={(e) => updateBondTest(test.id, 'conductorSize', e.target.value)} className={inputSmCn} placeholder="Size (mm²)" />
                    <Input value={test.measuredResistance} onChange={(e) => updateBondTest(test.id, 'measuredResistance', e.target.value)} className={inputSmCn} placeholder="Reading (Ω)" />
                  </div>
                </div>
              ))}
              <button onClick={addBondTest} className="w-full h-11 rounded-xl border-2 border-dashed border-purple-500/20 flex items-center justify-center gap-2 text-sm font-medium text-purple-400 touch-manipulation active:scale-[0.98]">
                <Plus className="h-4 w-4" /> Add Bonding Test
              </button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* SPD Checks */}
      <div className="eicr-section-card">
        <Collapsible open={spdOpen} onOpenChange={setSpdOpen}>
          <SectionHeader title="SPD Checks" icon={<Zap className="h-5 w-5 text-cyan-400" />} isOpen={spdOpen} color="cyan-500" count={spdChecks.length} />
          <CollapsibleContent>
            <div className="p-4 space-y-3">
              {spdChecks.map((check) => (
                <div key={check.id} className="p-3 bg-white/[0.03] rounded-xl border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-elec-yellow">{check.reference}</span>
                    <button onClick={() => removeSpdCheck(check.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:text-red-400 touch-manipulation"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input value={check.location} onChange={(e) => updateSpdCheck(check.id, 'location', e.target.value)} className={inputSmCn} placeholder="Location" />
                    <Select value={check.spdType} onValueChange={(v) => updateSpdCheck(check.id, 'spdType', v)}>
                      <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Type" /></SelectTrigger>
                      <SelectContent className={selectContentCn}>
                        <SelectItem value="1">Type 1</SelectItem>
                        <SelectItem value="2">Type 2</SelectItem>
                        <SelectItem value="3">Type 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Select value={check.statusIndicator} onValueChange={(v) => updateSpdCheck(check.id, 'statusIndicator', v)}>
                      <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Status" /></SelectTrigger>
                      <SelectContent className={selectContentCn}>
                        <SelectItem value="ok">OK (green)</SelectItem>
                        <SelectItem value="fault">Fault (red)</SelectItem>
                        <SelectItem value="replaced">Replaced</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={check.disconnectorCheck} onValueChange={(v) => updateSpdCheck(check.id, 'disconnectorCheck', v)}>
                      <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Disconnector" /></SelectTrigger>
                      <SelectContent className={selectContentCn}>
                        <SelectItem value="ok">OK</SelectItem>
                        <SelectItem value="tripped">Tripped</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
              <button onClick={addSpdCheck} className="w-full h-11 rounded-xl border-2 border-dashed border-cyan-500/20 flex items-center justify-center gap-2 text-sm font-medium text-cyan-400 touch-manipulation active:scale-[0.98]">
                <Plus className="h-4 w-4" /> Add SPD Check
              </button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Separation Distance */}
      <div className="eicr-section-card">
        <Collapsible open={sepOpen} onOpenChange={setSepOpen}>
          <SectionHeader title="Separation Distance" icon={<Gauge className="h-5 w-5 text-amber-400" />} isOpen={sepOpen} color="amber-500" subtitle="Optional" count={sepChecks.length} />
          <CollapsibleContent>
            <div className="p-4 space-y-3">
              {sepChecks.map((check) => (
                <div key={check.id} className="p-3 bg-white/[0.03] rounded-xl border border-white/[0.06] space-y-2">
                  <div className="flex items-center justify-between">
                    <PassFailBadge value={check.measuredDistance && check.requiredDistance ? (parseFloat(check.measuredDistance) >= parseFloat(check.requiredDistance) ? 'pass' : 'fail') : ''} />
                    <button onClick={() => removeSepCheck(check.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:text-red-400 touch-manipulation"><Trash2 className="h-4 w-4" /></button>
                  </div>
                  <Input value={check.location} onChange={(e) => updateSepCheck(check.id, 'location', e.target.value)} className={inputSmCn} placeholder="Location" />
                  <div className="grid grid-cols-2 gap-2">
                    <Input value={check.measuredDistance} onChange={(e) => updateSepCheck(check.id, 'measuredDistance', e.target.value)} className={inputSmCn} placeholder="Measured (mm)" />
                    <Input value={check.requiredDistance} onChange={(e) => updateSepCheck(check.id, 'requiredDistance', e.target.value)} className={inputSmCn} placeholder="Required (mm)" />
                  </div>
                </div>
              ))}
              <button onClick={addSepCheck} className="w-full h-11 rounded-xl border-2 border-dashed border-amber-500/20 flex items-center justify-center gap-2 text-sm font-medium text-amber-400 touch-manipulation active:scale-[0.98]">
                <Plus className="h-4 w-4" /> Add Separation Check
              </button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
