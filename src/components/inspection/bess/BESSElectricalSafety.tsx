import { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBESSSmartForm } from '@/hooks/inspection/useBESSSmartForm';

const inputCn = 'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';
const selectTriggerCn = 'h-12 touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 data-[state=open]:border-yellow-500';
const selectContentCn = 'z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground';
const checkboxCn = 'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';

const Section = ({ title, accentColor, children }: { title: string; accentColor?: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <div className="border-b border-white/[0.06] pb-1 mb-3">
      <div className={cn('h-[2px] w-full rounded-full bg-gradient-to-r mb-2', accentColor || 'from-amber-500 to-yellow-400')} />
      <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
    </div>
    {children}
  </div>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div><Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>{children}</div>
);

interface Props { formData: any; onUpdate: (field: string, value: any) => void }

export default function BESSElectricalSafety({ formData, onUpdate }: Props) {
  const { getPMEGuidance, getChemistryGuidance } = useBESSSmartForm();
  const inverterHasGalvanicIsolation = formData.dcEarthingMethod === 'galvanic-isolation';
  const pmeGuidance = useMemo(() => getPMEGuidance(formData.earthingArrangement, inverterHasGalvanicIsolation), [formData.earthingArrangement, inverterHasGalvanicIsolation, getPMEGuidance]);
  const chemGuidance = useMemo(() => getChemistryGuidance(formData.batteryChemistry), [formData.batteryChemistry, getChemistryGuidance]);

  return (
    <div className="space-y-5">
      {/* DC Circuit */}
      <Section title="DC Circuit Details" accentColor="from-amber-500/40 to-yellow-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field label="DC Cable Type"><Input value={formData.dcCableType} onChange={(e) => onUpdate('dcCableType', e.target.value)} className={inputCn} placeholder="e.g. H07RN-F, Solar DC" /></Field>
          <Field label="CSA (mm²)"><Input type="number" step="0.5" value={formData.dcCableCSA} onChange={(e) => onUpdate('dcCableCSA', e.target.value)} className={inputCn} placeholder="e.g. 6" /></Field>
          <Field label="Length (m)"><Input type="number" value={formData.dcCableLength} onChange={(e) => onUpdate('dcCableLength', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="DC Protection Type"><Input value={formData.dcProtectionType} onChange={(e) => onUpdate('dcProtectionType', e.target.value)} className={inputCn} placeholder="e.g. DC MCB, Fuse" /></Field>
          <Field label="DC Protection Rating (A)"><Input type="number" value={formData.dcProtectionRating} onChange={(e) => onUpdate('dcProtectionRating', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="DC Isolator Location"><Input value={formData.dcIsolatorLocation} onChange={(e) => onUpdate('dcIsolatorLocation', e.target.value)} className={inputCn} placeholder="e.g. Adjacent to battery" /></Field>
          <Field label="DC Isolator Rating (A)"><Input type="number" value={formData.dcIsolatorRating} onChange={(e) => onUpdate('dcIsolatorRating', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="DC SPD Type"><Input value={formData.dcSPDType} onChange={(e) => onUpdate('dcSPDType', e.target.value)} className={inputCn} placeholder="e.g. Type 2" /></Field>
          <Field label="DC SPD Manufacturer"><Input value={formData.dcSPDManufacturer} onChange={(e) => onUpdate('dcSPDManufacturer', e.target.value)} className={inputCn} /></Field>
        </div>
        <Field label="DC Earth Fault Protection Method"><Input value={formData.dcEarthFaultMethod} onChange={(e) => onUpdate('dcEarthFaultMethod', e.target.value)} className={inputCn} placeholder="e.g. RCD, IMD, galvanic isolation" /></Field>
      </Section>

      {/* Earthing Assessment */}
      <Section title="Earthing Assessment" accentColor="from-red-500/40 to-orange-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Earthing Arrangement" required>
            <Select value={formData.earthingArrangement} onValueChange={(v) => onUpdate('earthingArrangement', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="TN-S">TN-S</SelectItem>
                <SelectItem value="TN-C-S">TN-C-S (PME)</SelectItem>
                <SelectItem value="TT">TT</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="DC Earthing Method">
            <Select value={formData.dcEarthingMethod} onValueChange={(v) => onUpdate('dcEarthingMethod', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="galvanic-isolation">Galvanic isolation (transformer)</SelectItem>
                <SelectItem value="separate-earth-electrode">Separate earth electrode</SelectItem>
                <SelectItem value="it-with-imd">IT system with IMD</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>

        {pmeGuidance.requiresAction && (
          <div className="rounded-xl p-3 bg-red-500/10 border border-red-500/20">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-red-400">PME Earthing — Action Required</p>
                <p className="text-xs text-white mt-1">{pmeGuidance.recommendation}</p>
                <p className="text-[10px] text-white mt-1">Ref: {pmeGuidance.regulation}</p>
                <ul className="mt-2 space-y-1">
                  {pmeGuidance.options.map((opt, i) => (
                    <li key={i} className="text-xs text-white flex items-start gap-1.5"><span className="text-red-400 font-bold mt-0.5">{i + 1}.</span> {opt}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <Checkbox checked={formData.pmeRiskAssessment} onCheckedChange={(v) => onUpdate('pmeRiskAssessment', v)} className={checkboxCn} />
          <Label className="text-sm text-white">PME risk assessment completed (BS 7671 Reg 411.4.2)</Label>
        </div>
        {formData.dcEarthingMethod === 'separate-earth-electrode' && (
          <Field label="Earth Electrode Resistance (Ω)"><Input type="number" step="0.1" value={formData.earthElectrodeResistance} onChange={(e) => onUpdate('earthElectrodeResistance', e.target.value)} className={inputCn} placeholder="e.g. 21.5" /></Field>
        )}
      </Section>

      {/* AC Circuit */}
      <Section title="AC Circuit Details" accentColor="from-elec-yellow/40 to-amber-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field label="AC Cable Type" required><Input value={formData.acCableType} onChange={(e) => onUpdate('acCableType', e.target.value)} className={inputCn} placeholder="e.g. 6242Y, SWA" /></Field>
          <Field label="CSA (mm²)"><Input type="number" step="0.5" value={formData.acCableCSA} onChange={(e) => onUpdate('acCableCSA', e.target.value)} className={inputCn} placeholder="e.g. 6" /></Field>
          <Field label="Length (m)"><Input type="number" value={formData.acCableLength} onChange={(e) => onUpdate('acCableLength', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field label="Protection Device">
            <Select value={formData.acProtectionType} onValueChange={(v) => onUpdate('acProtectionType', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="MCB">MCB</SelectItem><SelectItem value="RCBO">RCBO</SelectItem><SelectItem value="MCCB">MCCB</SelectItem><SelectItem value="fuse">Fuse</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Rating (A)"><Input type="number" value={formData.acProtectionRating} onChange={(e) => onUpdate('acProtectionRating', e.target.value)} className={inputCn} /></Field>
          <Field label="Curve">
            <Select value={formData.acProtectionCurve} onValueChange={(v) => onUpdate('acProtectionCurve', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="B">Type B</SelectItem><SelectItem value="C">Type C</SelectItem><SelectItem value="D">Type D</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="RCD Type">
            <Select value={formData.rcdType} onValueChange={(v) => onUpdate('rcdType', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="Type A">Type A</SelectItem><SelectItem value="Type B">Type B</SelectItem><SelectItem value="Type F">Type F</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="RCD Rating (mA)"><Input type="number" value={formData.rcdRating} onChange={(e) => onUpdate('rcdRating', e.target.value)} className={inputCn} placeholder="30" /></Field>
        </div>
        <Field label="AC Isolator Location"><Input value={formData.acIsolatorLocation} onChange={(e) => onUpdate('acIsolatorLocation', e.target.value)} className={inputCn} placeholder="e.g. Consumer unit" /></Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="AC SPD Type"><Input value={formData.acSPDType} onChange={(e) => onUpdate('acSPDType', e.target.value)} className={inputCn} placeholder="e.g. Type 2" /></Field>
          <Field label="AC SPD Manufacturer"><Input value={formData.acSPDManufacturer} onChange={(e) => onUpdate('acSPDManufacturer', e.target.value)} className={inputCn} /></Field>
        </div>
      </Section>

      {/* Battery Safety */}
      <Section title="Battery Safety Assessment" accentColor="from-red-500/40 to-orange-400/20">
        {formData.batteryChemistry && (
          <div className={`rounded-xl p-3 border ${chemGuidance.thermalRunawayRisk === 'high' ? 'bg-red-500/10 border-red-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
            <p className="text-xs text-white">{chemGuidance.safetyNotes}</p>
          </div>
        )}
        <div className="flex items-center gap-3">
          <Checkbox checked={formData.locationSuitable} onCheckedChange={(v) => onUpdate('locationSuitable', v)} className={checkboxCn} />
          <Label className="text-sm text-white">Location suitability confirmed</Label>
        </div>
        <Field label="Distance from Combustibles (mm)"><Input type="number" value={formData.distanceFromCombustibles} onChange={(e) => onUpdate('distanceFromCombustibles', e.target.value)} className={inputCn} placeholder="e.g. 500" /></Field>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field label="Ventilation">
            <Select value={formData.ventilation} onValueChange={(v) => onUpdate('ventilation', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="natural">Natural</SelectItem><SelectItem value="mechanical">Mechanical</SelectItem><SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Fire Detection">
            <Select value={formData.fireDetection} onValueChange={(v) => onUpdate('fireDetection', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="smoke">Smoke detector</SelectItem><SelectItem value="heat">Heat detector</SelectItem><SelectItem value="none">None</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Thermal Management">
            <Select value={formData.thermalManagement} onValueChange={(v) => onUpdate('thermalManagement', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="passive">Passive</SelectItem><SelectItem value="active-air">Active air cooling</SelectItem><SelectItem value="liquid">Liquid cooling</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Checkbox checked={formData.warningSignageInstalled} onCheckedChange={(v) => onUpdate('warningSignageInstalled', v)} className={checkboxCn} />
            <Label className="text-sm text-white">Warning signage installed (BS 7671 Reg 514.15)</Label>
          </div>
          {formData.warningSignageInstalled && <div className="ml-8"><Field label="Signage Locations"><Input value={formData.warningSignageLocations} onChange={(e) => onUpdate('warningSignageLocations', e.target.value)} className={inputCn} placeholder="e.g. Main intake, CU, battery location" /></Field></div>}
          <div className="flex items-center gap-3">
            <Checkbox checked={formData.emergencyShutdownProvided} onCheckedChange={(v) => onUpdate('emergencyShutdownProvided', v)} className={checkboxCn} />
            <Label className="text-sm text-white">Emergency shutdown procedure provided</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox checked={formData.fireServiceInfoProvided} onCheckedChange={(v) => onUpdate('fireServiceInfoProvided', v)} className={checkboxCn} />
            <Label className="text-sm text-white">Fire service information sheet provided</Label>
          </div>
        </div>
      </Section>
    </div>
  );
}
