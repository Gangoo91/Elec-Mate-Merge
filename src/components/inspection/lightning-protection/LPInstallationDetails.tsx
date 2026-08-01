import { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { cn } from '@/lib/utils';
import { useLightningProtectionSmartForm } from '@/hooks/inspection/useLightningProtectionSmartForm';
import { MESH_SIZE } from '@/types/lightning-protection';

/* eslint-disable @typescript-eslint/no-explicit-any */

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const pickerTrigger =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const Sub = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 pt-2">
    <p className="text-[12px] font-semibold text-white shrink-0">{title}</p>
    <div className="h-px flex-1 bg-white/[0.08]" />
  </div>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div>
    <Label className={labelCn}>{label}{required && ' *'}</Label>
    {children}
  </div>
);

const Toggle = ({ label, field, value, onUpdate }: { label: string; field: string; value: boolean | undefined; onUpdate: (f: string, v: boolean) => void }) => (
  <div className="flex min-h-11 items-center justify-between gap-3">
    <Label className="text-[13px] font-medium text-white">{label}</Label>
    <div className="flex gap-2">
      {[true, false].map((v) => (
        <button
          key={String(v)}
          type="button"
          onClick={() => onUpdate(field, v)}
          className={cn(
            'h-11 w-16 rounded-xl text-sm transition-all touch-manipulation active:scale-[0.98]',
            value === v
              ? v
                ? 'bg-green-500 border border-green-500 text-black font-semibold'
                : 'bg-white/20 border border-white/20 text-white font-semibold'
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

export default function LPInstallationDetails({ formData, onUpdate }: Props) {
  const { validateDownConductorSpacing } = useLightningProtectionSmartForm();
  const spacingValidation = useMemo(() => validateDownConductorSpacing(formData.downConductorSpacing, formData.lpsClass), [formData.downConductorSpacing, formData.lpsClass, validateDownConductorSpacing]);
  const requiredMesh = formData.lpsClass ? MESH_SIZE[formData.lpsClass] : '';

  const updateBonding = (key: string, value: any) => {
    onUpdate('servicesBonded', { ...formData.servicesBonded, [key]: value });
  };

  return (
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* LPS Overview */}
      <div className={cardCn}>
        <SectionHeader title="LPS overview" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="LPS class" required>
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
          <Field label="LPS type" required>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Original installation date"><Input type="date" value={formData.originalInstallDate} onChange={(e) => onUpdate('originalInstallDate', e.target.value)} className={inputCn} /></Field>
          <Field label="System age (years)"><Input type="number" value={formData.systemAge} onChange={(e) => onUpdate('systemAge', e.target.value)} className={inputCn} /></Field>
        </div>

        <Sub title="Strike counter" />
        <Toggle label="Lightning strike counter fitted" field="strikeCounterFitted" value={formData.strikeCounterFitted} onUpdate={onUpdate} />
        {formData.strikeCounterFitted && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <Field label="Current reading"><Input type="number" value={formData.strikeCounterReading} onChange={(e) => onUpdate('strikeCounterReading', e.target.value)} className={inputCn} placeholder="e.g. 12" /></Field>
            <Field label="Previous reading"><Input type="number" value={formData.strikeCounterPreviousReading} onChange={(e) => onUpdate('strikeCounterPreviousReading', e.target.value)} className={inputCn} placeholder="From last cert" /></Field>
          </div>
        )}
      </div>

      {/* Air Termination */}
      <div className={cardCn}>
        <SectionHeader title="Air termination" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Mesh size (m x m)"><Input value={formData.meshSize} onChange={(e) => onUpdate('meshSize', e.target.value)} className={inputCn} placeholder={requiredMesh ? `Required: ${requiredMesh}m` : 'e.g. 10x10'} /></Field>
          <Field label="Number of air rods"><Input type="number" value={formData.numberOfAirRods} onChange={(e) => onUpdate('numberOfAirRods', e.target.value)} className={inputCn} /></Field>
        </div>
      </div>

      {/* Down Conductors */}
      <div className={cardCn}>
        <SectionHeader title="Down conductors" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Number of down conductors"><Input type="number" value={formData.numberOfDownConductors} onChange={(e) => onUpdate('numberOfDownConductors', e.target.value)} className={inputCn} /></Field>
          <Field label="Spacing (m)"><Input type="number" step="0.1" value={formData.downConductorSpacing} onChange={(e) => onUpdate('downConductorSpacing', e.target.value)} className={inputCn} /></Field>
        </div>
        {spacingValidation.message && (
          <div className={cn('rounded-xl border bg-white/[0.05] px-3.5 py-3', spacingValidation.valid ? 'border-green-500/40' : 'border-red-500/40')}>
            <p className={cn('text-sm font-semibold', spacingValidation.valid ? 'text-green-400' : 'text-red-400')}>{spacingValidation.message}</p>
          </div>
        )}
      </div>

      {/* Earth Termination */}
      <div className={cardCn}>
        <SectionHeader title="Earth termination" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="No. of electrodes"><Input type="number" value={formData.numberOfElectrodes} onChange={(e) => onUpdate('numberOfElectrodes', e.target.value)} className={inputCn} /></Field>
          <Field label="Depth (m)"><Input type="number" step="0.1" value={formData.electrodeDepth} onChange={(e) => onUpdate('electrodeDepth', e.target.value)} className={inputCn} placeholder="e.g. 2.4" /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
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
      <div className={cardCn}>
        <SectionHeader title="Equipotential bonding" />
        <Field label="Bonding bar location"><Input value={formData.bondingBarLocation} onChange={(e) => onUpdate('bondingBarLocation', e.target.value)} className={inputCn} placeholder="e.g. Basement, main intake" /></Field>

        <Sub title="Services bonded" />
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
      <div className={cardCn}>
        <SectionHeader title="Surge protection devices" />
        {[
          { fitted: 'spd1Fitted', loc: 'spd1Location', make: 'spd1Make', model: 'spd1Model', label: 'Type 1 SPD (main DB)' },
          { fitted: 'spd2Fitted', loc: 'spd2Location', make: 'spd2Make', model: 'spd2Model', label: 'Type 2 SPD (sub-DB)' },
          { fitted: 'spd3Fitted', loc: 'spd3Location', make: 'spd3Make', model: 'spd3Model', label: 'Type 3 SPD (point of use)' },
        ].map(({ fitted, loc, make, model, label }, idx) => (
          <div key={fitted} className={cn('space-y-3', idx > 0 && 'border-t border-white/[0.08] pt-4')}>
            <Toggle label={label} field={fitted} value={formData[fitted]} onUpdate={onUpdate} />
            {formData[fitted] && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <Field label="Location"><Input value={formData[loc]} onChange={(e) => onUpdate(loc, e.target.value)} className={inputCn} placeholder="Location" /></Field>
                <Field label="Make"><Input value={formData[make]} onChange={(e) => onUpdate(make, e.target.value)} className={inputCn} placeholder="Make" /></Field>
                <Field label="Model"><Input value={formData[model]} onChange={(e) => onUpdate(model, e.target.value)} className={inputCn} placeholder="Model" /></Field>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
