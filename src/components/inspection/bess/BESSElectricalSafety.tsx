import { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { AlertTriangle } from 'lucide-react';
import { useBESSSmartForm } from '@/hooks/inspection/useBESSSmartForm';
import { cn } from '@/lib/utils';

const inputCn = 'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white [color-scheme:dark]';
const pickerTrigger = 'h-11 w-full touch-manipulation bg-white/[0.06] border-white/[0.08] text-white';

const SectionHeader = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div><Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>{children}</div>
);

const Sub = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 pt-2">
    <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider shrink-0">{title}</p>
    <div className="h-px flex-1 bg-white/[0.06]" />
  </div>
);

interface Props { formData: any; onUpdate: (field: string, value: any) => void }

export default function BESSElectricalSafety({ formData, onUpdate }: Props) {
  const { getPMEGuidance, getChemistryGuidance } = useBESSSmartForm();
  const inverterHasGalvanicIsolation = formData.dcEarthingMethod === 'galvanic-isolation';
  const pmeGuidance = useMemo(() => getPMEGuidance(formData.earthingArrangement, inverterHasGalvanicIsolation), [formData.earthingArrangement, inverterHasGalvanicIsolation, getPMEGuidance]);
  const chemGuidance = useMemo(() => getChemistryGuidance(formData.batteryChemistry), [formData.batteryChemistry, getChemistryGuidance]);

  return (
    <div className="space-y-6">
      {/* DC Circuit */}
      <div className="space-y-4">
        <SectionHeader title="DC Circuit Details" />
        <Sub title="Cable" />
        <div className="grid grid-cols-3 gap-3">
          <Field label="Type">
            <MobileSelectPicker value={formData.dcCableType} onValueChange={(v) => onUpdate('dcCableType', v)}
              options={[
                { value: 'H07RN-F', label: 'H07RN-F' },
                { value: 'H07Z-K', label: 'H07Z-K (LSZH)' },
                { value: 'Solar DC', label: 'Solar DC (H1Z2Z2-K)' },
                { value: 'SWA', label: 'SWA' },
                { value: 'Flex', label: 'Manufacturer flex' },
                { value: 'other', label: 'Other' },
              ]}
              placeholder="Select..." triggerClassName={pickerTrigger} />
          </Field>
          <Field label="CSA (mm²)">
            <MobileSelectPicker value={formData.dcCableCSA} onValueChange={(v) => onUpdate('dcCableCSA', v)}
              options={[
                { value: '2.5', label: '2.5' }, { value: '4', label: '4' }, { value: '6', label: '6' },
                { value: '10', label: '10' }, { value: '16', label: '16' }, { value: '25', label: '25' },
              ]}
              placeholder="mm²" triggerClassName={pickerTrigger} />
          </Field>
          <Field label="Length (m)"><Input type="number" value={formData.dcCableLength} onChange={(e) => onUpdate('dcCableLength', e.target.value)} className={inputCn} /></Field>
        </div>
        <Sub title="Protection" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Type">
            <MobileSelectPicker value={formData.dcProtectionType} onValueChange={(v) => onUpdate('dcProtectionType', v)}
              options={[
                { value: 'DC MCB', label: 'DC MCB' },
                { value: 'DC Fuse', label: 'DC Fuse' },
                { value: 'DC MCCB', label: 'DC MCCB' },
                { value: 'Integrated', label: 'Integrated (in inverter)' },
              ]}
              placeholder="Select..." triggerClassName={pickerTrigger} />
          </Field>
          <Field label="Rating (A)">
            <MobileSelectPicker value={formData.dcProtectionRating} onValueChange={(v) => onUpdate('dcProtectionRating', v)}
              options={[
                { value: '10', label: '10A' }, { value: '16', label: '16A' }, { value: '20', label: '20A' },
                { value: '25', label: '25A' }, { value: '32', label: '32A' }, { value: '40', label: '40A' },
                { value: '50', label: '50A' }, { value: '63', label: '63A' },
              ]}
              placeholder="A" triggerClassName={pickerTrigger} />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Isolator Location">
            <MobileSelectPicker value={formData.dcIsolatorLocation} onValueChange={(v) => onUpdate('dcIsolatorLocation', v)}
              options={[
                { value: 'Adjacent to battery', label: 'Adjacent to battery' },
                { value: 'Adjacent to inverter', label: 'Adjacent to inverter' },
                { value: 'In battery enclosure', label: 'In battery enclosure' },
                { value: 'In inverter', label: 'In inverter (integrated)' },
                { value: 'External wall', label: 'External wall' },
              ]}
              placeholder="Select..." triggerClassName={pickerTrigger} />
          </Field>
          <Field label="Isolator Rating (A)">
            <MobileSelectPicker value={formData.dcIsolatorRating} onValueChange={(v) => onUpdate('dcIsolatorRating', v)}
              options={[
                { value: '16', label: '16A' }, { value: '25', label: '25A' }, { value: '32', label: '32A' },
                { value: '40', label: '40A' }, { value: '50', label: '50A' }, { value: '63', label: '63A' },
              ]}
              placeholder="A" triggerClassName={pickerTrigger} />
          </Field>
        </div>
        <Sub title="SPD & Earth Fault" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="SPD Type">
            <MobileSelectPicker value={formData.dcSPDType} onValueChange={(v) => onUpdate('dcSPDType', v)}
              options={[
                { value: 'Type 1', label: 'Type 1' }, { value: 'Type 2', label: 'Type 2' },
                { value: 'Type 1+2', label: 'Type 1+2 Combined' }, { value: 'None', label: 'None fitted' },
              ]}
              placeholder="Select..." triggerClassName={pickerTrigger} />
          </Field>
          <Field label="SPD Manufacturer">
            <MobileSelectPicker value={formData.dcSPDManufacturer} onValueChange={(v) => onUpdate('dcSPDManufacturer', v)}
              options={[
                { value: 'Hager', label: 'Hager' },
                { value: 'Schneider Electric', label: 'Schneider Electric' },
                { value: 'ABB', label: 'ABB' },
                { value: 'Eaton', label: 'Eaton' },
                { value: 'Dehn', label: 'Dehn' },
                { value: 'OBO Bettermann', label: 'OBO Bettermann' },
                { value: 'Phoenix Contact', label: 'Phoenix Contact' },
                { value: 'Weidmuller', label: 'Weidmuller' },
                { value: 'Citel', label: 'Citel' },
                { value: 'Raycap', label: 'Raycap' },
                { value: 'Finder', label: 'Finder' },
                { value: 'Lewden', label: 'Lewden' },
                { value: 'Chint', label: 'Chint' },
                { value: 'Havells', label: 'Havells' },
                { value: 'Wylex', label: 'Wylex' },
                { value: 'ESP', label: 'ESP (EnviroSpark)' },
                { value: 'SMA', label: 'SMA' },
                { value: 'Fronius', label: 'Fronius' },
                { value: 'Integrated', label: 'Integrated (inverter)' },
                { value: 'other', label: 'Other' },
              ]}
              placeholder="Select..." triggerClassName={pickerTrigger} />
          </Field>
        </div>
        <Field label="Earth Fault Protection">
          <MobileSelectPicker value={formData.dcEarthFaultMethod} onValueChange={(v) => onUpdate('dcEarthFaultMethod', v)}
            options={[
              { value: 'RCD', label: 'RCD' },
              { value: 'IMD', label: 'IMD (Insulation Monitoring Device)' },
              { value: 'Galvanic isolation', label: 'Galvanic isolation (transformer)' },
              { value: 'Integrated BMS', label: 'Integrated BMS protection' },
              { value: 'None required', label: 'None required (IT system)' },
            ]}
            placeholder="Select..." triggerClassName={pickerTrigger} />
        </Field>
      </div>

      {/* Earthing Assessment */}
      <div className="space-y-4">
        <SectionHeader title="Earthing Assessment" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Earthing" required>
            <MobileSelectPicker value={formData.earthingArrangement} onValueChange={(v) => onUpdate('earthingArrangement', v)}
              options={[{ value: 'TN-S', label: 'TN-S' }, { value: 'TN-C-S', label: 'TN-C-S (PME)' }, { value: 'TT', label: 'TT' }]}
              placeholder="Select..." triggerClassName={pickerTrigger} />
          </Field>
          <Field label="DC Earthing Method">
            <MobileSelectPicker value={formData.dcEarthingMethod} onValueChange={(v) => onUpdate('dcEarthingMethod', v)}
              options={[{ value: 'galvanic-isolation', label: 'Galvanic isolation' }, { value: 'separate-earth-electrode', label: 'Separate electrode' }, { value: 'it-with-imd', label: 'IT system with IMD' }]}
              placeholder="Select..." triggerClassName={pickerTrigger} />
          </Field>
        </div>

        {pmeGuidance.requiresAction && (
          <div className="rounded-xl overflow-hidden border border-red-500/30">
            <div className="px-3 py-2 bg-red-500/15 flex items-center gap-2">
              <AlertTriangle className="h-3.5 w-3.5 text-red-400 flex-shrink-0" />
              <p className="text-xs font-bold text-red-400">PME Earthing — Action Required</p>
            </div>
            <div className="px-3 py-2.5 bg-white/[0.02] space-y-2">
              <p className="text-[11px] text-white leading-relaxed">{pmeGuidance.recommendation}</p>
              <p className="text-[10px] text-white/60">Ref: {pmeGuidance.regulation}</p>
              <ul className="space-y-1">
                {pmeGuidance.options.map((opt, i) => (
                  <li key={i} className="text-[11px] text-white flex items-start gap-1.5"><span className="text-red-400 font-bold">{i + 1}.</span> {opt}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <Label className="text-white text-xs font-medium">PME risk assessment (Reg 411.4.2)</Label>
          <div className="flex gap-1.5">
            {[true, false].map((v) => (
              <button key={String(v)} type="button" onClick={() => onUpdate('pmeRiskAssessment', v)}
                className={cn('w-14 h-8 rounded-lg text-[11px] font-semibold touch-manipulation transition-all',
                  formData.pmeRiskAssessment === v ? (v ? 'bg-green-500 text-white' : 'bg-white/20 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                {v ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>
        {formData.dcEarthingMethod === 'separate-earth-electrode' && (
          <Field label="Earth Electrode Resistance (Ω)"><Input type="number" step="0.1" value={formData.earthElectrodeResistance} onChange={(e) => onUpdate('earthElectrodeResistance', e.target.value)} className={inputCn} placeholder="e.g. 21.5" /></Field>
        )}
      </div>

      {/* AC Circuit */}
      <div className="space-y-4">
        <SectionHeader title="AC Circuit Details" />
        <Sub title="Cable" />
        <div className="grid grid-cols-3 gap-3">
          <Field label="Type" required>
            <MobileSelectPicker value={formData.acCableType} onValueChange={(v) => onUpdate('acCableType', v)}
              options={[
                { value: '6242Y', label: '6242Y (T&E)' },
                { value: 'SWA', label: 'SWA' },
                { value: '6491X', label: '6491X (singles)' },
                { value: 'H07RN-F', label: 'H07RN-F' },
                { value: 'LSZH', label: 'LSZH' },
                { value: 'other', label: 'Other' },
              ]}
              placeholder="Select..." triggerClassName={pickerTrigger} />
          </Field>
          <Field label="CSA (mm²)">
            <MobileSelectPicker value={formData.acCableCSA} onValueChange={(v) => onUpdate('acCableCSA', v)}
              options={[
                { value: '2.5', label: '2.5' }, { value: '4', label: '4' }, { value: '6', label: '6' },
                { value: '10', label: '10' }, { value: '16', label: '16' }, { value: '25', label: '25' },
              ]}
              placeholder="mm²" triggerClassName={pickerTrigger} />
          </Field>
          <Field label="Length (m)"><Input type="number" value={formData.acCableLength} onChange={(e) => onUpdate('acCableLength', e.target.value)} className={inputCn} /></Field>
        </div>
        <Sub title="Protection" />
        <div className="grid grid-cols-3 gap-3">
          <Field label="Device">
            <MobileSelectPicker value={formData.acProtectionType} onValueChange={(v) => onUpdate('acProtectionType', v)}
              options={[{ value: 'MCB', label: 'MCB' }, { value: 'RCBO', label: 'RCBO' }, { value: 'MCCB', label: 'MCCB' }, { value: 'fuse', label: 'Fuse' }]}
              placeholder="Select..." triggerClassName={pickerTrigger} />
          </Field>
          <Field label="Rating (A)"><Input type="number" value={formData.acProtectionRating} onChange={(e) => onUpdate('acProtectionRating', e.target.value)} className={inputCn} /></Field>
          <Field label="Curve">
            <MobileSelectPicker value={formData.acProtectionCurve} onValueChange={(v) => onUpdate('acProtectionCurve', v)}
              options={[{ value: 'B', label: 'Type B' }, { value: 'C', label: 'Type C' }, { value: 'D', label: 'Type D' }]}
              placeholder="Select..." triggerClassName={pickerTrigger} />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="RCD Type">
            <MobileSelectPicker value={formData.rcdType} onValueChange={(v) => onUpdate('rcdType', v)}
              options={[{ value: 'Type A', label: 'Type A' }, { value: 'Type B', label: 'Type B' }, { value: 'Type F', label: 'Type F' }]}
              placeholder="Select..." triggerClassName={pickerTrigger} />
          </Field>
          <Field label="RCD Rating (mA)">
            <MobileSelectPicker value={formData.rcdRating} onValueChange={(v) => onUpdate('rcdRating', v)}
              options={[
                { value: '30', label: '30mA' }, { value: '100', label: '100mA' }, { value: '300', label: '300mA' },
              ]}
              placeholder="mA" triggerClassName={pickerTrigger} />
          </Field>
        </div>
        <Field label="Isolator Location">
          <MobileSelectPicker value={formData.acIsolatorLocation} onValueChange={(v) => onUpdate('acIsolatorLocation', v)}
            options={[
              { value: 'Consumer unit', label: 'Consumer unit' },
              { value: 'Dedicated CU', label: 'Dedicated CU / DB' },
              { value: 'Adjacent to inverter', label: 'Adjacent to inverter' },
              { value: 'Henley block', label: 'Henley block' },
              { value: 'Meter tails', label: 'At meter tails' },
            ]}
            placeholder="Select..." triggerClassName={pickerTrigger} />
        </Field>
        <Sub title="SPD" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Type">
            <MobileSelectPicker value={formData.acSPDType} onValueChange={(v) => onUpdate('acSPDType', v)}
              options={[
                { value: 'Type 1', label: 'Type 1' }, { value: 'Type 2', label: 'Type 2' },
                { value: 'Type 1+2', label: 'Type 1+2 Combined' }, { value: 'Type 3', label: 'Type 3 (fine)' },
                { value: 'None', label: 'None fitted' },
              ]}
              placeholder="Select..." triggerClassName={pickerTrigger} />
          </Field>
          <Field label="Manufacturer">
            <MobileSelectPicker value={formData.acSPDManufacturer} onValueChange={(v) => onUpdate('acSPDManufacturer', v)}
              options={[
                { value: 'Hager', label: 'Hager' },
                { value: 'Schneider Electric', label: 'Schneider Electric' },
                { value: 'ABB', label: 'ABB' },
                { value: 'Eaton', label: 'Eaton' },
                { value: 'Dehn', label: 'Dehn' },
                { value: 'OBO Bettermann', label: 'OBO Bettermann' },
                { value: 'Phoenix Contact', label: 'Phoenix Contact' },
                { value: 'Weidmuller', label: 'Weidmuller' },
                { value: 'Citel', label: 'Citel' },
                { value: 'Raycap', label: 'Raycap' },
                { value: 'Finder', label: 'Finder' },
                { value: 'Lewden', label: 'Lewden' },
                { value: 'Chint', label: 'Chint' },
                { value: 'Havells', label: 'Havells' },
                { value: 'Wylex', label: 'Wylex' },
                { value: 'ESP', label: 'ESP (EnviroSpark)' },
                { value: 'other', label: 'Other' },
              ]}
              placeholder="Select..." triggerClassName={pickerTrigger} />
          </Field>
        </div>
        <Sub title="AFDD" />
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-white text-xs font-medium">AFDD Installed</Label>
            {formData.installationType === 'domestic' && (
              <p className="text-[10px] text-elec-yellow mt-0.5">Recommended for sleeping accommodation</p>
            )}
          </div>
          <div className="flex gap-1.5">
            {[true, false].map((v) => (
              <button key={String(v)} type="button" onClick={() => onUpdate('afddInstalled', v)}
                className={cn('w-14 h-8 rounded-lg text-[11px] font-semibold touch-manipulation transition-all',
                  formData.afddInstalled === v ? (v ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                {v ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Battery Safety */}
      <div className="space-y-4">
        <SectionHeader title="Battery Safety Assessment" />
        {formData.batteryChemistry && (
          <div className={`rounded-xl overflow-hidden border ${chemGuidance.thermalRunawayRisk === 'high' ? 'border-red-500/30' : 'border-green-500/30'}`}>
            <div className={`px-3 py-2 ${chemGuidance.thermalRunawayRisk === 'high' ? 'bg-red-500/15' : 'bg-green-500/15'}`}>
              <p className="text-xs font-bold text-white">Safety Notes — {formData.batteryChemistry}</p>
            </div>
            <div className="px-3 py-2.5 bg-white/[0.02]">
              <p className="text-[11px] text-white leading-relaxed">{chemGuidance.safetyNotes}</p>
            </div>
          </div>
        )}
        <Sub title="Location & Environment" />
        <div className="flex items-center justify-between">
          <Label className="text-white text-xs font-medium">Location suitability confirmed</Label>
          <div className="flex gap-1.5">
            {[true, false].map((v) => (
              <button key={String(v)} type="button" onClick={() => onUpdate('locationSuitable', v)}
                className={cn('w-14 h-8 rounded-lg text-[11px] font-semibold touch-manipulation transition-all',
                  formData.locationSuitable === v ? (v ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                {v ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>
        <Field label="Distance from Combustibles (mm)"><Input type="number" value={formData.distanceFromCombustibles} onChange={(e) => onUpdate('distanceFromCombustibles', e.target.value)} className={inputCn} placeholder="e.g. 500" /></Field>
        <div className="grid grid-cols-3 gap-3">
          <Field label="Ventilation">
            <MobileSelectPicker value={formData.ventilation} onValueChange={(v) => onUpdate('ventilation', v)}
              options={[{ value: 'natural', label: 'Natural' }, { value: 'mechanical', label: 'Mechanical' }, { value: 'none', label: 'None' }]}
              placeholder="Select..." triggerClassName={pickerTrigger} />
          </Field>
          <Field label="Fire Detection">
            <MobileSelectPicker value={formData.fireDetection} onValueChange={(v) => onUpdate('fireDetection', v)}
              options={[{ value: 'smoke', label: 'Smoke' }, { value: 'heat', label: 'Heat' }, { value: 'none', label: 'None' }]}
              placeholder="Select..." triggerClassName={pickerTrigger} />
          </Field>
          <Field label="Cooling">
            <MobileSelectPicker value={formData.thermalManagement} onValueChange={(v) => onUpdate('thermalManagement', v)}
              options={[{ value: 'passive', label: 'Passive' }, { value: 'active-air', label: 'Active air' }, { value: 'liquid', label: 'Liquid' }]}
              placeholder="Select..." triggerClassName={pickerTrigger} />
          </Field>
        </div>
        <Sub title="Safety Provisions" />
        <div className="space-y-2">
          {([
            ['warningSignageInstalled', 'Warning signage installed'],
            ['emergencyShutdownProvided', 'Emergency shutdown provided'],
            ['fireServiceInfoProvided', 'Fire service info provided'],
          ] as const).map(([field, label]) => (
            <div key={field}>
              <div className="flex items-center justify-between">
                <Label className="text-white text-xs font-medium">{label}</Label>
                <div className="flex gap-1.5">
                  {[true, false].map((v) => (
                    <button key={String(v)} type="button" onClick={() => onUpdate(field, v)}
                      className={cn('w-14 h-8 rounded-lg text-[11px] font-semibold touch-manipulation transition-all',
                        formData[field] === v ? (v ? 'bg-green-500 text-white' : 'bg-white/20 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                      {v ? 'Yes' : 'No'}
                    </button>
                  ))}
                </div>
              </div>
              {field === 'warningSignageInstalled' && formData.warningSignageInstalled && (
                <div className="mt-2"><Field label="Signage Locations"><Input value={formData.warningSignageLocations} onChange={(e) => onUpdate('warningSignageLocations', e.target.value)} className={inputCn} placeholder="Main intake, CU, battery" /></Field></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* PAS 63100 — Domestic Fire Safety */}
      {formData.installationType === 'domestic' && (
        <div className="space-y-4">
          <SectionHeader title="PAS 63100 — Domestic Fire Safety" />

          <Sub title="Location Prohibition" />
          <div className="space-y-3">
            {([
              ['notInSleepingRoom', 'Not in sleeping room'],
              ['notInEscapeRoute', 'Not on escape route'],
              ['notInLoftOrVoid', 'Not in loft/void/roof space'],
              ['notInBasementNoAccess', 'Not in basement without exit'],
            ] as const).map(([field, label]) => (
              <div key={field} className="flex items-center justify-between">
                <Label className="text-white text-xs font-medium">{label}</Label>
                <div className="flex gap-1.5">
                  {[true, false].map((v) => (
                    <button key={String(v)} type="button" onClick={() => onUpdate(field, v)}
                      className={cn('w-14 h-8 rounded-lg text-[11px] font-semibold touch-manipulation transition-all',
                        formData[field] === v ? (v ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                      {v ? 'Yes' : 'No'}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Sub title="Energy Limits" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Per Enclosure (kWh)"><Input type="number" step="0.1" value={formData.energyPerEnclosure} onChange={(e) => onUpdate('energyPerEnclosure', e.target.value)} className={inputCn} placeholder="Max 20 kWh" /></Field>
            <Field label="Total at Premises (kWh)"><Input type="number" step="0.1" value={formData.totalEnergyAtPremises} onChange={(e) => onUpdate('totalEnergyAtPremises', e.target.value)} className={inputCn} placeholder="Max 80 kWh garage / 40 kWh other" /></Field>
          </div>

          <Sub title="Distances" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="From Openings (m)"><Input type="number" step="0.1" value={formData.distanceFromOpenings} onChange={(e) => onUpdate('distanceFromOpenings', e.target.value)} className={inputCn} placeholder="Min 1m (outdoor)" /></Field>
            <Field label="From Flammables (m)"><Input type="number" step="0.1" value={formData.distanceFromFlammables} onChange={(e) => onUpdate('distanceFromFlammables', e.target.value)} className={inputCn} placeholder="Min 2m" /></Field>
          </div>

          <Sub title="Enclosure" />
          <div className="space-y-3">
            {([
              ['enclosureNonCombustible', 'Non-combustible enclosure'],
              ['enclosureToolAccessOnly', 'Tool-only access'],
              ['dcFusesToolAccessOnly', 'DC fuses tool-access only'],
              ['ik10Protection', 'IK10 protection (garage/vehicle area)'],
            ] as const).map(([field, label]) => (
              <div key={field} className="flex items-center justify-between">
                <Label className="text-white text-xs font-medium">{label}</Label>
                <div className="flex gap-1.5">
                  {[true, false].map((v) => (
                    <button key={String(v)} type="button" onClick={() => onUpdate(field, v)}
                      className={cn('w-14 h-8 rounded-lg text-[11px] font-semibold touch-manipulation transition-all',
                        formData[field] === v ? (v ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                      {v ? 'Yes' : 'No'}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Sub title="Detection & Ventilation" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Fire Detection Grade">
              <MobileSelectPicker value={formData.fireDetectionGrade} onValueChange={(v) => onUpdate('fireDetectionGrade', v)}
                options={[{ value: 'D1', label: 'Grade D1' }, { value: 'D2', label: 'Grade D2 (PAS 63100)' }, { value: 'A', label: 'Grade A' }, { value: 'other', label: 'Other' }]}
                placeholder="Select..." triggerClassName={pickerTrigger} />
            </Field>
            <Field label="Category">
              <MobileSelectPicker value={formData.fireDetectionCategory} onValueChange={(v) => onUpdate('fireDetectionCategory', v)}
                options={[{ value: 'LD1', label: 'LD1' }, { value: 'LD2', label: 'LD2 (PAS 63100)' }, { value: 'LD3', label: 'LD3' }, { value: 'PD1', label: 'PD1' }, { value: 'PD2', label: 'PD2' }]}
                placeholder="Select..." triggerClassName={pickerTrigger} />
            </Field>
          </div>
          <div className="space-y-3">
            {([
              ['audibleBatteryWarning', 'Audible battery warning'],
              ['ventilationToOutdoors', 'Ventilation to outdoors'],
              ['ventPortMinDistance', 'Vent port ≥1m from openings'],
            ] as const).map(([field, label]) => (
              <div key={field} className="flex items-center justify-between">
                <Label className="text-white text-xs font-medium">{label}</Label>
                <div className="flex gap-1.5">
                  {[true, false].map((v) => (
                    <button key={String(v)} type="button" onClick={() => onUpdate(field, v)}
                      className={cn('w-14 h-8 rounded-lg text-[11px] font-semibold touch-manipulation transition-all',
                        formData[field] === v ? (v ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                      {v ? 'Yes' : 'No'}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Labelling (Reg 514.15) */}
      <div className="space-y-4">
        <SectionHeader title="Labelling (Reg 514.15)" />
        <div className="space-y-3">
          {([
            ['labelAtOrigin', 'Warning at origin'],
            ['labelAtMeteringPoint', 'Warning at metering point'],
            ['labelAtMainCU', 'Warning at main CU'],
            ['labelAtIsolationPoints', 'Warning at isolation points'],
            ['batteryEnclosureLabel', 'Battery enclosure labelled'],
            ['dcIsolationLabelled', 'DC isolation labelled'],
            ['emergencyProcedureDisplayed', 'Emergency procedure displayed'],
          ] as const).map(([field, label]) => (
            <div key={field} className="flex items-center justify-between">
              <Label className="text-white text-xs font-medium">{label}</Label>
              <div className="flex gap-1.5">
                {[true, false].map((v) => (
                  <button key={String(v)} type="button" onClick={() => onUpdate(field, v)}
                    className={cn('w-14 h-8 rounded-lg text-[11px] font-semibold touch-manipulation transition-all',
                      formData[field] === v ? (v ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                    {v ? 'Yes' : 'No'}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
