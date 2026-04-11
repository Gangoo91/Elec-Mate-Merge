import { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { cn } from '@/lib/utils';
import { useLightningProtectionSmartForm } from '@/hooks/inspection/useLightningProtectionSmartForm';
import { MESH_SIZE } from '@/types/lightning-protection';

const inputCn = 'h-10 text-xs touch-manipulation bg-white/[0.06] border-white/[0.08] text-white [color-scheme:dark]';
const pickerTrigger = 'h-10 w-full touch-manipulation bg-white/[0.06] border-white/[0.08] text-white';

const SectionHeader = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const Sub = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 pt-2">
    <p className="text-[10px] font-semibold text-white uppercase tracking-wider shrink-0">{title}</p>
    <div className="h-px flex-1 bg-white/[0.06]" />
  </div>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>
    {children}
  </div>
);

const Toggle = ({ label, field, value, onUpdate }: { label: string; field: string; value: boolean | undefined; onUpdate: (f: string, v: boolean) => void }) => (
  <div className="flex items-center justify-between">
    <Label className="text-white text-xs font-medium">{label}</Label>
    <div className="flex gap-1.5">
      {[true, false].map((v) => (
        <button
          key={String(v)}
          type="button"
          onClick={() => onUpdate(field, v)}
          className={cn(
            'w-14 h-8 rounded-lg text-[11px] font-semibold touch-manipulation transition-all',
            value === v
              ? v
                ? 'bg-green-500 text-white'
                : 'bg-white/20 text-white'
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

export default function LPInstallationDetails({ formData, onUpdate }: Props) {
  const { validateDownConductorSpacing } = useLightningProtectionSmartForm();
  const spacingValidation = useMemo(() => validateDownConductorSpacing(formData.downConductorSpacing, formData.lpsClass), [formData.downConductorSpacing, formData.lpsClass, validateDownConductorSpacing]);
  const requiredMesh = formData.lpsClass ? MESH_SIZE[formData.lpsClass] : '';

  const updateBonding = (key: string, value: any) => {
    onUpdate('servicesBonded', { ...formData.servicesBonded, [key]: value });
  };

  return (
    <div className="space-y-5">
      {/* LPS Overview */}
      <div className="space-y-4">
        <SectionHeader title="LPS Overview" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="LPS Class" required>
            <MobileSelectPicker
              value={formData.lpsClass}
              onValueChange={(v) => onUpdate('lpsClass', v)}
              placeholder="Select..."
              title="LPS Class"
              triggerClassName={pickerTrigger}
              options={[
                { value: 'I', label: 'Class I (highest)', description: '20m sphere, 5x5m mesh' },
                { value: 'II', label: 'Class II', description: '30m sphere, 10x10m mesh' },
                { value: 'III', label: 'Class III', description: '45m sphere, 15x15m mesh' },
                { value: 'IV', label: 'Class IV', description: '60m sphere, 20x20m mesh' },
              ]}
            />
          </Field>
          <Field label="LPS Type" required>
            <MobileSelectPicker
              value={formData.lpsType}
              onValueChange={(v) => onUpdate('lpsType', v)}
              placeholder="Select..."
              title="LPS Type"
              triggerClassName={pickerTrigger}
              options={[
                { value: 'isolated', label: 'Isolated', description: 'Standalone masts/catenary' },
                { value: 'non-isolated', label: 'Non-isolated', description: 'Building-mounted' },
              ]}
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Original Installation Date"><Input type="date" value={formData.originalInstallDate} onChange={(e) => onUpdate('originalInstallDate', e.target.value)} className={inputCn} /></Field>
          <Field label="System Age (years)"><Input type="number" value={formData.systemAge} onChange={(e) => onUpdate('systemAge', e.target.value)} className={inputCn} /></Field>
        </div>

        <Sub title="Strike Counter" />
        <Toggle label="Lightning strike counter fitted" field="strikeCounterFitted" value={formData.strikeCounterFitted} onUpdate={onUpdate} />
        {formData.strikeCounterFitted && (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Current Reading"><Input type="number" value={formData.strikeCounterReading} onChange={(e) => onUpdate('strikeCounterReading', e.target.value)} className={inputCn} placeholder="e.g. 12" /></Field>
            <Field label="Previous Reading"><Input type="number" value={formData.strikeCounterPreviousReading} onChange={(e) => onUpdate('strikeCounterPreviousReading', e.target.value)} className={inputCn} placeholder="From last cert" /></Field>
          </div>
        )}
      </div>

      {/* Air Termination */}
      <div className="space-y-4">
        <SectionHeader title="Air Termination" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Type">
            <MobileSelectPicker
              value={formData.airTerminationType}
              onValueChange={(v) => onUpdate('airTerminationType', v)}
              placeholder="Select..."
              title="Air Termination Type"
              triggerClassName={pickerTrigger}
              options={[
                { value: 'mesh', label: 'Mesh conductor' },
                { value: 'rod', label: 'Air rods' },
                { value: 'catenary', label: 'Catenary wire' },
                { value: 'natural', label: 'Natural component' },
                { value: 'combination', label: 'Combination' },
              ]}
            />
          </Field>
          <Field label="Material">
            <MobileSelectPicker
              value={formData.airTerminationMaterial}
              onValueChange={(v) => onUpdate('airTerminationMaterial', v)}
              placeholder="Select..."
              title="Air Termination Material"
              triggerClassName={pickerTrigger}
              options={[
                { value: 'copper-tape', label: 'Copper tape' },
                { value: 'copper-cable', label: 'Copper cable' },
                { value: 'aluminium', label: 'Aluminium' },
                { value: 'stainless-steel', label: 'Stainless steel' },
              ]}
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Mesh Size (m x m)"><Input value={formData.meshSize} onChange={(e) => onUpdate('meshSize', e.target.value)} className={inputCn} placeholder={requiredMesh ? `Required: ${requiredMesh}m` : 'e.g. 10x10'} /></Field>
          <Field label="Number of Air Rods"><Input type="number" value={formData.numberOfAirRods} onChange={(e) => onUpdate('numberOfAirRods', e.target.value)} className={inputCn} /></Field>
        </div>
      </div>

      {/* Down Conductors */}
      <div className="space-y-4">
        <SectionHeader title="Down Conductors" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Material">
            <MobileSelectPicker
              value={formData.downConductorMaterial}
              onValueChange={(v) => onUpdate('downConductorMaterial', v)}
              placeholder="Select..."
              title="Down Conductor Material"
              triggerClassName={pickerTrigger}
              options={[
                { value: 'copper-tape', label: 'Copper tape' },
                { value: 'copper-cable', label: 'Copper cable' },
                { value: 'aluminium', label: 'Aluminium' },
                { value: 'galvanised-steel', label: 'Galvanised steel' },
              ]}
            />
          </Field>
          <Field label="Size (mm2)"><Input value={formData.downConductorSize} onChange={(e) => onUpdate('downConductorSize', e.target.value)} className={inputCn} placeholder="e.g. 50" /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Number of Down Conductors"><Input type="number" value={formData.numberOfDownConductors} onChange={(e) => onUpdate('numberOfDownConductors', e.target.value)} className={inputCn} /></Field>
          <Field label="Spacing (m)"><Input type="number" step="0.1" value={formData.downConductorSpacing} onChange={(e) => onUpdate('downConductorSpacing', e.target.value)} className={inputCn} /></Field>
        </div>
        {spacingValidation.message && (
          <div className={`rounded-xl p-2.5 border ${spacingValidation.valid ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
            <p className={`text-xs font-semibold ${spacingValidation.valid ? 'text-green-400' : 'text-red-400'}`}>{spacingValidation.message}</p>
          </div>
        )}
      </div>

      {/* Earth Termination */}
      <div className="space-y-4">
        <SectionHeader title="Earth Termination" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="No. of Electrodes"><Input type="number" value={formData.numberOfElectrodes} onChange={(e) => onUpdate('numberOfElectrodes', e.target.value)} className={inputCn} /></Field>
          <Field label="Depth (m)"><Input type="number" step="0.1" value={formData.electrodeDepth} onChange={(e) => onUpdate('electrodeDepth', e.target.value)} className={inputCn} placeholder="e.g. 2.4" /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Type">
            <MobileSelectPicker
              value={formData.electrodeType}
              onValueChange={(v) => onUpdate('electrodeType', v)}
              placeholder="Select..."
              title="Electrode Type"
              triggerClassName={pickerTrigger}
              options={[
                { value: 'rod', label: 'Rod' },
                { value: 'plate', label: 'Plate' },
                { value: 'strip', label: 'Strip' },
                { value: 'ring', label: 'Ring' },
                { value: 'foundation', label: 'Foundation earth' },
              ]}
            />
          </Field>
          <Field label="Material">
            <MobileSelectPicker
              value={formData.electrodeMaterial}
              onValueChange={(v) => onUpdate('electrodeMaterial', v)}
              placeholder="Select..."
              title="Electrode Material"
              triggerClassName={pickerTrigger}
              options={[
                { value: 'copper-clad-steel', label: 'Copper-clad steel' },
                { value: 'solid-copper', label: 'Solid copper' },
                { value: 'galvanised-steel', label: 'Galvanised steel' },
              ]}
            />
          </Field>
        </div>
      </div>

      {/* Equipotential Bonding */}
      <div className="space-y-4">
        <SectionHeader title="Equipotential Bonding" />
        <Field label="Bonding Bar Location"><Input value={formData.bondingBarLocation} onChange={(e) => onUpdate('bondingBarLocation', e.target.value)} className={inputCn} placeholder="e.g. Basement, main intake" /></Field>

        <Sub title="Services Bonded" />
        <div className="space-y-2">
          {[
            { key: 'electrical', label: 'Electrical supply' },
            { key: 'gas', label: 'Gas' },
            { key: 'water', label: 'Water' },
            { key: 'telecoms', label: 'Telecoms / data' },
            { key: 'structuralSteel', label: 'Structural steel' },
            { key: 'hvac', label: 'HVAC' },
          ].map(({ key, label }) => (
            <Toggle key={key} label={label} field={key} value={formData.servicesBonded?.[key]} onUpdate={(f, v) => updateBonding(f, v)} />
          ))}
        </div>
        <Field label="Other services bonded"><Input value={formData.servicesBonded?.other || ''} onChange={(e) => updateBonding('other', e.target.value)} className={inputCn} placeholder="e.g. Metal cladding, railings" /></Field>
      </div>

      {/* Surge Protection Devices */}
      <div className="space-y-4">
        <SectionHeader title="Surge Protection Devices" />
        {[
          { fitted: 'spd1Fitted', loc: 'spd1Location', make: 'spd1Make', model: 'spd1Model', label: 'Type 1 SPD (main DB)' },
          { fitted: 'spd2Fitted', loc: 'spd2Location', make: 'spd2Make', model: 'spd2Model', label: 'Type 2 SPD (sub-DB)' },
          { fitted: 'spd3Fitted', loc: 'spd3Location', make: 'spd3Make', model: 'spd3Model', label: 'Type 3 SPD (point of use)' },
        ].map(({ fitted, loc, make, model, label }) => (
          <div key={fitted} className="space-y-2">
            <Toggle label={label} field={fitted} value={formData[fitted]} onUpdate={onUpdate} />
            {formData[fitted] && (
              <div className="grid grid-cols-2 gap-2">
                <Field label="Location"><Input value={formData[loc]} onChange={(e) => onUpdate(loc, e.target.value)} className={inputCn} placeholder="Location" /></Field>
                <Field label="Make"><Input value={formData[make]} onChange={(e) => onUpdate(make, e.target.value)} className={inputCn} placeholder="Make" /></Field>
                <Field label="Model" ><Input value={formData[model]} onChange={(e) => onUpdate(model, e.target.value)} className={inputCn} placeholder="Model" /></Field>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
