import { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useLightningProtectionSmartForm } from '@/hooks/inspection/useLightningProtectionSmartForm';
import { MESH_SIZE } from '@/types/lightning-protection';

const inputCn = 'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';
const selectTriggerCn = 'h-12 touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 data-[state=open]:border-yellow-500';
const selectContentCn = 'z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground';
const checkboxCn = 'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';

const Section = ({ title, accentColor, badge, children }: { title: string; accentColor?: string; badge?: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <div className="border-b border-white/[0.06] pb-1 mb-3">
      <div className={cn('h-[2px] w-full rounded-full bg-gradient-to-r mb-2', accentColor || 'from-yellow-500 to-amber-400')} />
      <h2 className="text-xs font-medium text-white uppercase tracking-wider flex items-center gap-2">{title}
        {badge && <span className="text-[10px] font-bold text-elec-yellow bg-elec-yellow/10 border border-elec-yellow/20 px-2 py-0.5 rounded">{badge}</span>}
      </h2>
    </div>
    {children}
  </div>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div><Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>{children}</div>
);

interface Props { formData: any; onUpdate: (field: string, value: any) => void }

export default function LPInstallationDetails({ formData, onUpdate }: Props) {
  const { validateDownConductorSpacing } = useLightningProtectionSmartForm();
  const spacingValidation = useMemo(() => validateDownConductorSpacing(formData.downConductorSpacing, formData.lpsClass), [formData.downConductorSpacing, formData.lpsClass, validateDownConductorSpacing]);
  const requiredMesh = formData.lpsClass ? MESH_SIZE[formData.lpsClass] : '';

  const updateBonding = (key: string, value: any) => {
    onUpdate('servicesBonded', { ...formData.servicesBonded, [key]: value });
  };

  return (
    <div className="space-y-5">
      <Section title="LPS Overview" accentColor="from-yellow-500/40 to-amber-400/20" badge="BS EN 62305">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="LPS Class" required>
            <Select value={formData.lpsClass} onValueChange={(v) => onUpdate('lpsClass', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="I">Class I (highest — 20m sphere, 5×5m mesh)</SelectItem>
                <SelectItem value="II">Class II (30m sphere, 10×10m mesh)</SelectItem>
                <SelectItem value="III">Class III (45m sphere, 15×15m mesh)</SelectItem>
                <SelectItem value="IV">Class IV (60m sphere, 20×20m mesh)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="LPS Type" required>
            <Select value={formData.lpsType} onValueChange={(v) => onUpdate('lpsType', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="isolated">Isolated (standalone masts/catenary)</SelectItem>
                <SelectItem value="non-isolated">Non-isolated (building-mounted)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Original Installation Date"><Input type="date" value={formData.originalInstallDate} onChange={(e) => onUpdate('originalInstallDate', e.target.value)} className={inputCn} /></Field>
          <Field label="System Age (years)"><Input type="number" value={formData.systemAge} onChange={(e) => onUpdate('systemAge', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox checked={formData.strikeCounterFitted} onCheckedChange={(v) => onUpdate('strikeCounterFitted', v)} className={checkboxCn} />
          <Label className="text-sm text-white">Lightning strike counter fitted</Label>
        </div>
        {formData.strikeCounterFitted && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-8">
            <Field label="Current Reading"><Input type="number" value={formData.strikeCounterReading} onChange={(e) => onUpdate('strikeCounterReading', e.target.value)} className={inputCn} placeholder="e.g. 12" /></Field>
            <Field label="Previous Reading"><Input type="number" value={formData.strikeCounterPreviousReading} onChange={(e) => onUpdate('strikeCounterPreviousReading', e.target.value)} className={inputCn} placeholder="From last cert" /></Field>
          </div>
        )}
      </Section>

      <Section title="Air Termination" accentColor="from-amber-500/40 to-yellow-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Type">
            <Select value={formData.airTerminationType} onValueChange={(v) => onUpdate('airTerminationType', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="mesh">Mesh conductor</SelectItem><SelectItem value="rod">Air rods</SelectItem>
                <SelectItem value="catenary">Catenary wire</SelectItem><SelectItem value="natural">Natural component</SelectItem>
                <SelectItem value="combination">Combination</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Material">
            <Select value={formData.airTerminationMaterial} onValueChange={(v) => onUpdate('airTerminationMaterial', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="copper-tape">Copper tape</SelectItem><SelectItem value="copper-cable">Copper cable</SelectItem>
                <SelectItem value="aluminium">Aluminium</SelectItem><SelectItem value="stainless-steel">Stainless steel</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Mesh Size (m × m)"><Input value={formData.meshSize} onChange={(e) => onUpdate('meshSize', e.target.value)} className={inputCn} placeholder={requiredMesh ? `Required: ${requiredMesh}m` : 'e.g. 10×10'} /></Field>
          <Field label="Number of Air Rods"><Input type="number" value={formData.numberOfAirRods} onChange={(e) => onUpdate('numberOfAirRods', e.target.value)} className={inputCn} /></Field>
        </div>
      </Section>

      <Section title="Down Conductors" accentColor="from-blue-500/40 to-cyan-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Material">
            <Select value={formData.downConductorMaterial} onValueChange={(v) => onUpdate('downConductorMaterial', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="copper-tape">Copper tape</SelectItem><SelectItem value="copper-cable">Copper cable</SelectItem>
                <SelectItem value="aluminium">Aluminium</SelectItem><SelectItem value="galvanised-steel">Galvanised steel</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Size (mm²)"><Input value={formData.downConductorSize} onChange={(e) => onUpdate('downConductorSize', e.target.value)} className={inputCn} placeholder="e.g. 50" /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Number of Down Conductors"><Input type="number" value={formData.numberOfDownConductors} onChange={(e) => onUpdate('numberOfDownConductors', e.target.value)} className={inputCn} /></Field>
          <Field label="Spacing (m)"><Input type="number" step="0.1" value={formData.downConductorSpacing} onChange={(e) => onUpdate('downConductorSpacing', e.target.value)} className={inputCn} /></Field>
        </div>
        {spacingValidation.message && (
          <div className={`rounded-xl p-2.5 border ${spacingValidation.valid ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
            <p className={`text-xs font-semibold ${spacingValidation.valid ? 'text-green-400' : 'text-red-400'}`}>{spacingValidation.message}</p>
          </div>
        )}
      </Section>

      <Section title="Earth Termination" accentColor="from-green-500/40 to-emerald-400/20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Field label="No. of Electrodes"><Input type="number" value={formData.numberOfElectrodes} onChange={(e) => onUpdate('numberOfElectrodes', e.target.value)} className={inputCn} /></Field>
          <Field label="Type">
            <Select value={formData.electrodeType} onValueChange={(v) => onUpdate('electrodeType', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="rod">Rod</SelectItem><SelectItem value="plate">Plate</SelectItem><SelectItem value="strip">Strip</SelectItem>
                <SelectItem value="ring">Ring</SelectItem><SelectItem value="foundation">Foundation earth</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Material">
            <Select value={formData.electrodeMaterial} onValueChange={(v) => onUpdate('electrodeMaterial', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="copper-clad-steel">Copper-clad steel</SelectItem><SelectItem value="solid-copper">Solid copper</SelectItem><SelectItem value="galvanised-steel">Galvanised steel</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Depth (m)"><Input type="number" step="0.1" value={formData.electrodeDepth} onChange={(e) => onUpdate('electrodeDepth', e.target.value)} className={inputCn} placeholder="e.g. 2.4" /></Field>
        </div>
      </Section>

      <Section title="Equipotential Bonding" accentColor="from-purple-500/40 to-indigo-400/20">
        <Field label="Bonding Bar Location"><Input value={formData.bondingBarLocation} onChange={(e) => onUpdate('bondingBarLocation', e.target.value)} className={inputCn} placeholder="e.g. Basement, main intake" /></Field>
        <Label className="text-white text-xs mb-1 block">Services Bonded</Label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { key: 'electrical', label: 'Electrical supply' }, { key: 'gas', label: 'Gas' },
            { key: 'water', label: 'Water' }, { key: 'telecoms', label: 'Telecoms / data' },
            { key: 'structuralSteel', label: 'Structural steel' }, { key: 'hvac', label: 'HVAC' },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center gap-3">
              <Checkbox checked={formData.servicesBonded?.[key]} onCheckedChange={(v) => updateBonding(key, v)} className={checkboxCn} />
              <Label className="text-sm text-white">{label}</Label>
            </div>
          ))}
        </div>
        <Field label="Other services bonded"><Input value={formData.servicesBonded?.other || ''} onChange={(e) => updateBonding('other', e.target.value)} className={inputCn} placeholder="e.g. Metal cladding, railings" /></Field>
      </Section>

      <Section title="Surge Protection Devices" accentColor="from-cyan-500/40 to-blue-400/20">
        {[
          { num: '1', fitted: 'spd1Fitted', loc: 'spd1Location', make: 'spd1Make', model: 'spd1Model', label: 'Type 1 SPD (main DB)' },
          { num: '2', fitted: 'spd2Fitted', loc: 'spd2Location', make: 'spd2Make', model: 'spd2Model', label: 'Type 2 SPD (sub-DB)' },
          { num: '3', fitted: 'spd3Fitted', loc: 'spd3Location', make: 'spd3Make', model: 'spd3Model', label: 'Type 3 SPD (point of use)' },
        ].map(({ fitted, loc, make, model, label }) => (
          <div key={fitted}>
            <div className="flex items-center gap-3 mb-2">
              <Checkbox checked={formData[fitted]} onCheckedChange={(v) => onUpdate(fitted, v)} className={checkboxCn} />
              <Label className="text-sm text-white">{label}</Label>
            </div>
            {formData[fitted] && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 ml-8 mb-3">
                <Input value={formData[loc]} onChange={(e) => onUpdate(loc, e.target.value)} className={inputCn} placeholder="Location" />
                <Input value={formData[make]} onChange={(e) => onUpdate(make, e.target.value)} className={inputCn} placeholder="Make" />
                <Input value={formData[model]} onChange={(e) => onUpdate(model, e.target.value)} className={inputCn} placeholder="Model" />
              </div>
            )}
          </div>
        ))}
      </Section>
    </div>
  );
}
