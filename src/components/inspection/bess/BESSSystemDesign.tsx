import { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BATTERY_MANUFACTURERS, INVERTER_MANUFACTURERS } from '@/types/bess';
import { useBESSSmartForm } from '@/hooks/inspection/useBESSSmartForm';

const inputCn = 'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';
const selectTriggerCn = 'h-12 touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 data-[state=open]:border-yellow-500';
const selectContentCn = 'z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground';
const checkboxCn = 'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';

const Section = ({ title, accentColor, children }: { title: string; accentColor?: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <div className="border-b border-white/[0.06] pb-1 mb-3">
      <div className={cn('h-[2px] w-full rounded-full bg-gradient-to-r mb-2', accentColor || 'from-green-500 to-emerald-400')} />
      <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
    </div>
    {children}
  </div>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div><Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>{children}</div>
);

interface Props { formData: any; onUpdate: (field: string, value: any) => void }

export default function BESSSystemDesign({ formData, onUpdate }: Props) {
  const { getChemistryGuidance, getGridConnectionRequirement } = useBESSSmartForm();
  const chemistryGuidance = useMemo(() => getChemistryGuidance(formData.batteryChemistry), [formData.batteryChemistry, getChemistryGuidance]);

  const totalGeneration = useMemo(() => {
    const batteryKW = parseFloat(formData.inverterRatedPower) || 0;
    const pvKW = parseFloat(formData.associatedPVCapacity) || 0;
    return Math.round((batteryKW + pvKW) * 100) / 100;
  }, [formData.inverterRatedPower, formData.associatedPVCapacity]);

  const gridReq = useMemo(() => getGridConnectionRequirement(totalGeneration, formData.inverterPhases), [totalGeneration, formData.inverterPhases, getGridConnectionRequirement]);

  return (
    <div className="space-y-5">
      {/* Battery System */}
      <Section title="Battery System" accentColor="from-green-500/40 to-emerald-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Manufacturer" required>
            <Select value={formData.batteryManufacturer} onValueChange={(v) => onUpdate('batteryManufacturer', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select manufacturer..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                {BATTERY_MANUFACTURERS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Model" required><Input value={formData.batteryModel} onChange={(e) => onUpdate('batteryModel', e.target.value)} className={inputCn} placeholder="e.g. LUNA2000-5-S0" /></Field>
        </div>
        <Field label="Serial Number(s)" required><Input value={formData.batterySerials} onChange={(e) => onUpdate('batterySerials', e.target.value)} className={inputCn} placeholder="Comma-separated if multiple modules" /></Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Chemistry" required>
            <Select value={formData.batteryChemistry} onValueChange={(v) => onUpdate('batteryChemistry', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select chemistry..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="LFP">LFP (Lithium Iron Phosphate)</SelectItem>
                <SelectItem value="NMC">NMC (Nickel Manganese Cobalt)</SelectItem>
                <SelectItem value="NCA">NCA (Nickel Cobalt Aluminium)</SelectItem>
                <SelectItem value="lead-acid">Lead-acid</SelectItem>
                <SelectItem value="flow">Flow battery</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Usable Capacity (kWh)" required><Input type="number" step="0.1" value={formData.usableCapacity} onChange={(e) => onUpdate('usableCapacity', e.target.value)} className={inputCn} placeholder="e.g. 13.5" /></Field>
        </div>

        {formData.batteryChemistry && (
          <div className={`rounded-xl p-3 border ${chemistryGuidance.thermalRunawayRisk === 'high' ? 'bg-red-500/10 border-red-500/20' : chemistryGuidance.thermalRunawayRisk === 'low' ? 'bg-green-500/10 border-green-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
            <div className="flex items-start gap-2">
              {chemistryGuidance.thermalRunawayRisk === 'high' ? <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" /> : <Info className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />}
              <div>
                <p className="text-xs font-semibold text-white">{formData.batteryChemistry} — Thermal runaway risk: {chemistryGuidance.thermalRunawayRisk}</p>
                <p className="text-xs text-white mt-1">{chemistryGuidance.ventilationAdvice}</p>
                <p className="text-[10px] text-white mt-1">DC test voltage: {chemistryGuidance.dcTestVoltage}V | Min IR: {chemistryGuidance.minResistance}MΩ</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Field label="Nominal Voltage (V)"><Input type="number" value={formData.nominalVoltage} onChange={(e) => onUpdate('nominalVoltage', e.target.value)} className={inputCn} placeholder="e.g. 51.2" /></Field>
          <Field label="No. of Modules"><Input type="number" value={formData.numberOfModules} onChange={(e) => onUpdate('numberOfModules', e.target.value)} className={inputCn} placeholder="1" /></Field>
          <Field label="Max Charge (kW)"><Input type="number" step="0.1" value={formData.maxChargeRate} onChange={(e) => onUpdate('maxChargeRate', e.target.value)} className={inputCn} /></Field>
          <Field label="Max Discharge (kW)"><Input type="number" step="0.1" value={formData.maxDischargeRate} onChange={(e) => onUpdate('maxDischargeRate', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field label="Configuration">
            <Select value={formData.configuration} onValueChange={(v) => onUpdate('configuration', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="single">Single unit</SelectItem>
                <SelectItem value="parallel">Parallel</SelectItem>
                <SelectItem value="series-parallel">Series-parallel</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="DoD (%)"><Input type="number" value={formData.depthOfDischarge} onChange={(e) => onUpdate('depthOfDischarge', e.target.value)} className={inputCn} placeholder="100" /></Field>
          <Field label="Efficiency (%)"><Input type="number" step="0.1" value={formData.roundTripEfficiency} onChange={(e) => onUpdate('roundTripEfficiency', e.target.value)} className={inputCn} placeholder="e.g. 95.5" /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field label="MCS Product Cert No."><Input value={formData.mcsBatteryProductCert} onChange={(e) => onUpdate('mcsBatteryProductCert', e.target.value)} className={inputCn} /></Field>
          <Field label="BMS Firmware"><Input value={formData.bmsFirmware} onChange={(e) => onUpdate('bmsFirmware', e.target.value)} className={inputCn} placeholder="e.g. v3.2.1" /></Field>
          <div className="flex items-center gap-3 pt-6">
            <Checkbox checked={formData.iec62619Compliant} onCheckedChange={(v) => onUpdate('iec62619Compliant', v)} className={checkboxCn} />
            <Label className="text-sm text-white">IEC 62619 compliant</Label>
          </div>
        </div>
      </Section>

      {/* Inverter */}
      <Section title="Inverter / Charger" accentColor="from-blue-500/40 to-cyan-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Manufacturer" required>
            <Select value={formData.inverterManufacturer} onValueChange={(v) => onUpdate('inverterManufacturer', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select manufacturer..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                {INVERTER_MANUFACTURERS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Model" required><Input value={formData.inverterModel} onChange={(e) => onUpdate('inverterModel', e.target.value)} className={inputCn} placeholder="e.g. SUN2000-5KTL-L1" /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Serial Number" required><Input value={formData.inverterSerial} onChange={(e) => onUpdate('inverterSerial', e.target.value)} className={inputCn} /></Field>
          <Field label="Rated Power (kW)" required><Input type="number" step="0.1" value={formData.inverterRatedPower} onChange={(e) => onUpdate('inverterRatedPower', e.target.value)} className={inputCn} placeholder="e.g. 5.0" /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field label="Inverter Type" required>
            <Select value={formData.inverterType} onValueChange={(v) => onUpdate('inverterType', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="hybrid">Hybrid (PV + Battery)</SelectItem>
                <SelectItem value="ac-coupled">AC-coupled (battery only)</SelectItem>
                <SelectItem value="dc-coupled">DC-coupled</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Phases">
            <Select value={formData.inverterPhases} onValueChange={(v) => onUpdate('inverterPhases', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="single">Single phase</SelectItem>
                <SelectItem value="three">Three phase</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Firmware Version"><Input value={formData.inverterFirmware} onChange={(e) => onUpdate('inverterFirmware', e.target.value)} className={inputCn} /></Field>
        </div>
        <Field label="MCS Product Cert No."><Input value={formData.mcsInverterProductCert} onChange={(e) => onUpdate('mcsInverterProductCert', e.target.value)} className={inputCn} /></Field>
      </Section>

      {/* System Configuration */}
      <Section title="System Configuration" accentColor="from-purple-500/40 to-indigo-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Coupling Type" required>
            <Select value={formData.couplingType} onValueChange={(v) => onUpdate('couplingType', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="AC">AC-coupled</SelectItem>
                <SelectItem value="DC">DC-coupled</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Operating Mode">
            <Select value={formData.operatingMode} onValueChange={(v) => onUpdate('operatingMode', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="self-consumption">Self-consumption</SelectItem>
                <SelectItem value="time-of-use">Time-of-use</SelectItem>
                <SelectItem value="backup">Backup only</SelectItem>
                <SelectItem value="export-maximisation">Export maximisation</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Field label="Charge Limit (kW)"><Input type="number" step="0.1" value={formData.chargeRateLimit} onChange={(e) => onUpdate('chargeRateLimit', e.target.value)} className={inputCn} /></Field>
          <Field label="Discharge Limit (kW)"><Input type="number" step="0.1" value={formData.dischargeRateLimit} onChange={(e) => onUpdate('dischargeRateLimit', e.target.value)} className={inputCn} /></Field>
          <Field label="DoD Limit (%)"><Input type="number" value={formData.dodLimit} onChange={(e) => onUpdate('dodLimit', e.target.value)} className={inputCn} /></Field>
          <Field label="Backup Reserve (%)"><Input type="number" value={formData.backupReserve} onChange={(e) => onUpdate('backupReserve', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Checkbox checked={formData.epsEnabled} onCheckedChange={(v) => onUpdate('epsEnabled', v)} className={checkboxCn} />
            <Label className="text-sm text-white">EPS / Backup power enabled</Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox checked={formData.exportLimited} onCheckedChange={(v) => onUpdate('exportLimited', v)} className={checkboxCn} />
            <Label className="text-sm text-white">Export limited by DNO</Label>
          </div>
          {formData.exportLimited && <div className="ml-8"><Field label="Export Limit (kW)"><Input type="number" step="0.1" value={formData.exportLimit} onChange={(e) => onUpdate('exportLimit', e.target.value)} className={inputCn} /></Field></div>}
        </div>
        <Field label="Total Site Generation Capacity (kW)"><Input type="number" step="0.01" value={formData.totalSiteGeneration || totalGeneration || ''} onChange={(e) => onUpdate('totalSiteGeneration', e.target.value)} className={inputCn} placeholder={totalGeneration > 0 ? `Auto: ${totalGeneration}kW` : 'Enter total capacity'} /></Field>

        {(parseFloat(formData.totalSiteGeneration) > 0 || totalGeneration > 0) && (
          <div className={`rounded-xl p-3 border ${gridReq.warning ? 'bg-amber-500/10 border-amber-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
            <p className={`text-sm font-semibold ${gridReq.warning ? 'text-amber-400' : 'text-green-400'}`}>{gridReq.message}</p>
            <p className="text-xs text-white mt-1">{gridReq.details}</p>
          </div>
        )}
      </Section>
    </div>
  );
}
