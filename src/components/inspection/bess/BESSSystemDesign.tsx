import { useState, useMemo, useCallback } from 'react';
import { SectionHeader } from "./BESSSectionHeader";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { AlertTriangle, Info } from 'lucide-react';
import { BATTERY_MANUFACTURERS, INVERTER_MANUFACTURERS } from '@/types/bess';
import { useBESSSmartForm } from '@/hooks/inspection/useBESSSmartForm';

const inputCn = 'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white [color-scheme:dark]';
const selectTriggerCn = 'h-11 w-full touch-manipulation bg-white/[0.06] border-white/[0.08] text-white';
const checkboxCn = 'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div><Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>{children}</div>
);

const Sub = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 pt-2">
    <p className="text-[10px] font-semibold text-white uppercase tracking-wider shrink-0">{title}</p>
    <div className="h-px flex-1 bg-white/[0.06]" />
  </div>
);

// ── Popular battery system presets ──────────────────────────────────────────
interface BatteryPreset {
  label: string;
  manufacturer: string;
  model: string;
  chemistry: string;
  capacity: string;
  voltage: string;
  maxCharge: string;
  maxDischarge: string;
  modules: string;
  efficiency: string;
  // All-in-One units (battery + inverter/PCE in one enclosure = EESS Class 1):
  // selecting the preset also fills the inverter block. Omit for modular systems
  // where the installer pairs a separate inverter.
  integrated?: boolean;
  inverterPower?: string; // kW AC — rated output of the built-in inverter
  inverterType?: 'hybrid' | 'ac-coupled' | 'dc-coupled';
  coupling?: 'AC' | 'DC' | 'hybrid';
}

// Specs verified against manufacturer datasheets (June 2026). AIO units (battery +
// inverter in one enclosure = EESS Class 1) carry integrated/inverter fields.
const BATTERY_PRESETS: BatteryPreset[] = [
  // Tesla
  { label: 'Tesla Powerwall 3', manufacturer: 'Tesla', model: 'Powerwall 3', chemistry: 'LFP', capacity: '13.5', voltage: '51.2', maxCharge: '5.0', maxDischarge: '11.5', modules: '1', efficiency: '97.5', integrated: true, inverterPower: '11.04', inverterType: 'hybrid', coupling: 'hybrid' },
  { label: 'Tesla Powerwall 2', manufacturer: 'Tesla', model: 'Powerwall 2', chemistry: 'NMC', capacity: '13.5', voltage: '50', maxCharge: '5.0', maxDischarge: '5.0', modules: '1', efficiency: '90', integrated: true, inverterPower: '5.0', inverterType: 'ac-coupled', coupling: 'AC' },
  // GivEnergy
  { label: 'GivEnergy All-in-One 13.5kWh', manufacturer: 'GivEnergy', model: 'GIV-AIO-13.5-AC', chemistry: 'LFP', capacity: '13.5', voltage: '51.2', maxCharge: '6.0', maxDischarge: '6.0', modules: '1', efficiency: '97.6', integrated: true, inverterPower: '6.0', inverterType: 'ac-coupled', coupling: 'AC' },
  { label: 'GivEnergy Giv-Bat 9.5 (Gen 3)', manufacturer: 'GivEnergy', model: 'Giv-Bat 9.5 (Gen 3)', chemistry: 'LFP', capacity: '9.5', voltage: '51.2', maxCharge: '5.1', maxDischarge: '5.1', modules: '1', efficiency: '95.6' },
  { label: 'GivEnergy Giv-Bat 2.6', manufacturer: 'GivEnergy', model: 'Giv-Bat 2.6', chemistry: 'LFP', capacity: '2.6', voltage: '51.2', maxCharge: '1.5', maxDischarge: '1.5', modules: '1', efficiency: '95.6' },
  // Sigenergy
  { label: 'Sigenergy SigenStor 8kWh', manufacturer: 'Sigenergy', model: 'SigenStor (BAT-8.0)', chemistry: 'LFP', capacity: '8.06', voltage: '', maxCharge: '5.0', maxDischarge: '5.0', modules: '1', efficiency: '97.5', integrated: true, inverterPower: '5.0', inverterType: 'hybrid', coupling: 'hybrid' },
  // Huawei
  { label: 'Huawei LUNA2000 5kWh', manufacturer: 'Huawei', model: 'LUNA2000-5-S0', chemistry: 'LFP', capacity: '5.0', voltage: '450', maxCharge: '2.5', maxDischarge: '2.5', modules: '1', efficiency: '97.0' },
  { label: 'Huawei LUNA2000 10kWh', manufacturer: 'Huawei', model: 'LUNA2000-10-S0', chemistry: 'LFP', capacity: '10.0', voltage: '450', maxCharge: '5.0', maxDischarge: '5.0', modules: '2', efficiency: '97.0' },
  { label: 'Huawei LUNA2000 15kWh', manufacturer: 'Huawei', model: 'LUNA2000-15-S0', chemistry: 'LFP', capacity: '15.0', voltage: '450', maxCharge: '5.0', maxDischarge: '5.0', modules: '3', efficiency: '97.0' },
  // Fox ESS (ECS HV stack — 2 modules minimum)
  { label: 'Fox ESS ECS4100 8.1kWh', manufacturer: 'Fox ESS', model: 'ECS4100-H2', chemistry: 'LFP', capacity: '4.03', voltage: '115.2', maxCharge: '5.0', maxDischarge: '5.0', modules: '2', efficiency: '95.0' },
  { label: 'Fox ESS ECS2900 5.76kWh', manufacturer: 'Fox ESS', model: 'ECS2900-H2', chemistry: 'LFP', capacity: '2.88', voltage: '115.2', maxCharge: '5.0', maxDischarge: '5.0', modules: '2', efficiency: '95.0' },
  // BYD Battery-Box Premium
  { label: 'BYD HVS 5.1kWh', manufacturer: 'BYD', model: 'Battery-Box Premium HVS 5.1', chemistry: 'LFP', capacity: '5.12', voltage: '204', maxCharge: '5.1', maxDischarge: '5.1', modules: '2', efficiency: '95.3' },
  { label: 'BYD HVM 8.3kWh', manufacturer: 'BYD', model: 'Battery-Box Premium HVM 8.3', chemistry: 'LFP', capacity: '8.28', voltage: '153.6', maxCharge: '8.3', maxDischarge: '8.3', modules: '3', efficiency: '95.3' },
  { label: 'BYD HVS 10.2kWh', manufacturer: 'BYD', model: 'Battery-Box Premium HVS 10.2', chemistry: 'LFP', capacity: '10.24', voltage: '409', maxCharge: '10.2', maxDischarge: '10.2', modules: '4', efficiency: '95.3' },
  // Pylontech
  { label: 'Pylontech US5000 4.8kWh', manufacturer: 'Pylontech', model: 'US5000', chemistry: 'LFP', capacity: '4.8', voltage: '48', maxCharge: '4.8', maxDischarge: '4.8', modules: '1', efficiency: '95.0' },
  { label: 'Pylontech Force-H2 7.1kWh', manufacturer: 'Pylontech', model: 'Force-H2', chemistry: 'LFP', capacity: '3.55', voltage: '192', maxCharge: '3.55', maxDischarge: '3.55', modules: '2', efficiency: '96.0' },
  // SolarEdge
  { label: 'SolarEdge Home Battery 48V 4.6kWh', manufacturer: 'SolarEdge', model: 'Home Battery 48V (BAT-05K48)', chemistry: 'LFP', capacity: '4.6', voltage: '51.2', maxCharge: '5.0', maxDischarge: '5.0', modules: '1', efficiency: '94.5' },
  // Enphase
  { label: 'Enphase IQ 5P 5kWh', manufacturer: 'Enphase', model: 'IQ Battery 5P', chemistry: 'LFP', capacity: '5.0', voltage: '76.8', maxCharge: '3.84', maxDischarge: '3.84', modules: '1', efficiency: '90.0', integrated: true, inverterPower: '3.84', inverterType: 'ac-coupled', coupling: 'AC' },
  { label: 'Enphase IQ Battery 10C', manufacturer: 'Enphase', model: 'IQ Battery 10C', chemistry: 'LFP', capacity: '10.0', voltage: '76.8', maxCharge: '7.08', maxDischarge: '7.08', modules: '1', efficiency: '90.0', integrated: true, inverterPower: '7.08', inverterType: 'ac-coupled', coupling: 'AC' },
  // SolaX
  { label: 'SolaX T-BAT 5.8kWh', manufacturer: 'SolaX', model: 'T-BAT-SYS-HV-5.8', chemistry: 'LFP', capacity: '5.8', voltage: '115.2', maxCharge: '4.0', maxDischarge: '4.0', modules: '1', efficiency: '95.0' },
  // Sunsynk
  { label: 'Sunsynk L5.3 5.32kWh', manufacturer: 'Sunsynk', model: 'L5.3 (SUN-BATT-5.32)', chemistry: 'LFP', capacity: '5.32', voltage: '51.2', maxCharge: '5.1', maxDischarge: '5.1', modules: '1', efficiency: '95.0' },
  // Growatt
  { label: 'Growatt APX 5.0kWh', manufacturer: 'Growatt', model: 'APX 5.0P-B1', chemistry: 'LFP', capacity: '5.0', voltage: '385', maxCharge: '7.5', maxDischarge: '7.5', modules: '1', efficiency: '95.0' },
  // AlphaESS (inverter + battery are separate enclosures — not AIO)
  { label: 'AlphaESS SMILE-BAT 5.7kWh', manufacturer: 'AlphaESS', model: 'SMILE-BAT-5.7', chemistry: 'LFP', capacity: '5.7', voltage: '51.2', maxCharge: '5.0', maxDischarge: '5.0', modules: '1', efficiency: '95.0' },
  // Sofar
  { label: 'Sofar AMASS GTX3000 10kWh', manufacturer: 'Sofar', model: 'AMASS GTX3000-H', chemistry: 'LFP', capacity: '2.5', voltage: '51.2', maxCharge: '5.0', maxDischarge: '5.0', modules: '4', efficiency: '95.0' },
  // Victron
  { label: 'Victron Lithium NG 5.12kWh', manufacturer: 'Victron', model: 'Lithium NG 51.2V/100Ah', chemistry: 'LFP', capacity: '5.12', voltage: '51.2', maxCharge: '5.1', maxDischarge: '5.1', modules: '1', efficiency: '95.0' },
  // myenergi (UK)
  { label: 'myenergi libbi 5kWh', manufacturer: 'myenergi', model: 'libbi', chemistry: 'LFP', capacity: '5.12', voltage: '51.2', maxCharge: '5.0', maxDischarge: '5.0', modules: '1', efficiency: '95.0', integrated: true, inverterPower: '5.0', inverterType: 'hybrid', coupling: 'hybrid' },
  // Puredrive (UK)
  { label: 'Puredrive PureStorage II 5kWh', manufacturer: 'Puredrive', model: 'PureStorage II (DC 5kWh)', chemistry: 'LFP', capacity: '5.0', voltage: '51.2', maxCharge: '5.1', maxDischarge: '5.1', modules: '1', efficiency: '95.0' },
  // Solis (IntelliHome — launched 2026; "AES-LV" did not exist)
  { label: 'Solis IntelliHome 5kWh', manufacturer: 'Solis', model: 'IntelliHome-5kWh-OD', chemistry: 'LFP', capacity: '5.1', voltage: '51.2', maxCharge: '2.56', maxDischarge: '2.56', modules: '1', efficiency: '95.0' },
];

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

  // Auto-set configuration based on module count
  const moduleCount = parseInt(formData.numberOfModules) || 1;
  const autoConfig = moduleCount === 1 ? 'single' : 'parallel';

  const applyPreset = useCallback((preset: BatteryPreset) => {
    onUpdate('batteryManufacturer', preset.manufacturer);
    onUpdate('batteryModel', preset.model);
    onUpdate('batteryChemistry', preset.chemistry);
    onUpdate('usableCapacity', preset.capacity);
    onUpdate('nominalVoltage', preset.voltage);
    onUpdate('maxChargeRate', preset.maxCharge);
    onUpdate('maxDischargeRate', preset.maxDischarge);
    onUpdate('numberOfModules', preset.modules);
    onUpdate('roundTripEfficiency', preset.efficiency);
    onUpdate('depthOfDischarge', '100');
    onUpdate('configuration', parseInt(preset.modules) > 1 ? 'parallel' : 'single');

    // All-in-One units: the inverter (PCE) is the same unit — fill it too and set
    // EESS Class 1 (battery + BMS + PCE in one manufacturer enclosure, MIS 3012).
    if (preset.integrated) {
      onUpdate('inverterManufacturer', preset.manufacturer);
      onUpdate('inverterModel', preset.model);
      onUpdate('inverterRatedPower', preset.inverterPower || '');
      onUpdate('inverterType', preset.inverterType || 'hybrid');
      onUpdate('couplingType', preset.coupling || 'hybrid');
      onUpdate('eessClass', '1');
    }
  }, [onUpdate]);

  // Total capacity badge
  const totalCapacity = useMemo(() => {
    const perModule = parseFloat(formData.usableCapacity) || 0;
    const modules = parseInt(formData.numberOfModules) || 1;
    return modules > 1 ? Math.round(perModule * modules * 10) / 10 : 0;
  }, [formData.usableCapacity, formData.numberOfModules]);

  const [showAllPresets, setShowAllPresets] = useState(false);
  const visiblePresets = showAllPresets ? BATTERY_PRESETS : BATTERY_PRESETS.slice(0, 8);
  const isPresetActive = (p: BatteryPreset) => formData.batteryManufacturer === p.manufacturer && formData.batteryModel === p.model;

  return (
    <div className="space-y-6 sm:[&>div]:rounded-2xl sm:[&>div]:border sm:[&>div]:border-white/[0.07] sm:[&>div]:bg-white/[0.03] sm:[&>div]:p-4">
      {/* Quick-fill presets */}
      <div className="space-y-3">
        <SectionHeader title="Quick Fill — Popular Systems" />
        <div className="grid grid-cols-2 gap-2">
          {visiblePresets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => applyPreset(preset)}
              className={`rounded-xl p-2.5 text-left touch-manipulation active:scale-[0.98] transition-all ${
                isPresetActive(preset)
                  ? 'bg-elec-yellow/15 border border-elec-yellow/40 ring-1 ring-elec-yellow/20'
                  : 'bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06]'
              }`}
            >
              <p className={`text-[11px] font-bold leading-tight ${isPresetActive(preset) ? 'text-elec-yellow' : 'text-white'}`}>{preset.manufacturer}</p>
              <p className="text-[10px] text-white leading-tight mt-0.5 truncate">{preset.model}</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span className="text-[10px] font-bold text-elec-yellow bg-elec-yellow/10 px-1.5 py-0.5 rounded">{preset.capacity} kWh</span>
                <span className="text-[9px] text-white/50">{preset.chemistry}</span>
              </div>
            </button>
          ))}
        </div>
        {BATTERY_PRESETS.length > 8 && (
          <button
            type="button"
            onClick={() => setShowAllPresets(!showAllPresets)}
            className="w-full h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] text-white font-medium touch-manipulation active:scale-[0.98]"
          >
            {showAllPresets ? `Show less` : `Show all ${BATTERY_PRESETS.length} systems`}
          </button>
        )}
      </div>

      {/* Battery System */}
      <div className="space-y-4">
        <SectionHeader title="Battery System" />

        {/* Identification */}
        <div className="space-y-3">
          <Sub title="Identification" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Manufacturer" required>
              <MobileSelectPicker
                value={formData.batteryManufacturer}
                onValueChange={(v) => onUpdate('batteryManufacturer', v)}
                options={[...BATTERY_MANUFACTURERS.map((m) => ({ value: m, label: m })), { value: 'other', label: 'Other' }]}
                placeholder="Select..."
                triggerClassName={selectTriggerCn}
              />
            </Field>
            <Field label="Model" required><Input value={formData.batteryModel} onChange={(e) => onUpdate('batteryModel', e.target.value)} className={inputCn} placeholder="e.g. LUNA2000-5-S0" /></Field>
          </div>
          <Field label="Serial Number(s)" required><Input value={formData.batterySerials} onChange={(e) => onUpdate('batterySerials', e.target.value)} className={inputCn} placeholder="Comma-separated if multiple modules" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Chemistry" required>
              <MobileSelectPicker
                value={formData.batteryChemistry}
                onValueChange={(v) => onUpdate('batteryChemistry', v)}
                options={[
                  { value: 'LFP', label: 'LFP (Lithium Iron Phosphate)' },
                  { value: 'NMC', label: 'NMC (Nickel Manganese Cobalt)' },
                  { value: 'NCA', label: 'NCA (Nickel Cobalt Aluminium)' },
                  { value: 'lead-acid', label: 'Lead-acid' },
                  { value: 'flow', label: 'Flow battery' },
                  { value: 'other', label: 'Other' },
                ]}
                placeholder="Select..."
                triggerClassName={selectTriggerCn}
              />
            </Field>
            <Field label="Usable Capacity (kWh)" required><Input type="number" step="0.1" value={formData.usableCapacity} onChange={(e) => onUpdate('usableCapacity', e.target.value)} className={inputCn} placeholder="e.g. 13.5" /></Field>
          </div>
        </div>

        {/* Chemistry guidance */}
        {formData.batteryChemistry && (
          <div className={`rounded-xl overflow-hidden border ${chemistryGuidance.thermalRunawayRisk === 'high' ? 'border-red-500/30' : chemistryGuidance.thermalRunawayRisk === 'low' ? 'border-green-500/30' : 'border-amber-500/30'}`}>
            <div className={`px-3 py-2 flex items-center gap-2 ${chemistryGuidance.thermalRunawayRisk === 'high' ? 'bg-red-500/15' : chemistryGuidance.thermalRunawayRisk === 'low' ? 'bg-green-500/15' : 'bg-amber-500/15'}`}>
              {chemistryGuidance.thermalRunawayRisk === 'high' ? <AlertTriangle className="h-3.5 w-3.5 text-red-400 flex-shrink-0" /> : <Info className="h-3.5 w-3.5 text-green-400 flex-shrink-0" />}
              <p className="text-xs font-bold text-white">{formData.batteryChemistry} Chemistry — {chemistryGuidance.thermalRunawayRisk} thermal runaway risk</p>
            </div>
            <div className="px-3 py-2.5 bg-white/[0.02] space-y-1.5">
              <p className="text-[11px] text-white leading-relaxed">{chemistryGuidance.ventilationAdvice}</p>
              <div className="flex gap-3">
                <span className="text-[10px] text-white">Test at <span className="font-bold text-elec-yellow">{chemistryGuidance.dcTestVoltage}V</span></span>
                <span className="text-[10px] text-white">Min IR <span className="font-bold text-elec-yellow">{chemistryGuidance.minResistance} MΩ</span></span>
              </div>
            </div>
          </div>
        )}

        {/* System Specs */}
        <div className="space-y-3">
          <Sub title="System Specs" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Field label="Voltage (V)"><Input type="number" value={formData.nominalVoltage} onChange={(e) => onUpdate('nominalVoltage', e.target.value)} className={inputCn} placeholder="e.g. 51.2" /></Field>
            <Field label="Modules"><Input type="number" value={formData.numberOfModules} onChange={(e) => onUpdate('numberOfModules', e.target.value)} className={inputCn} placeholder="1" /></Field>
            <Field label="Max Charge (kW)"><Input type="number" step="0.1" value={formData.maxChargeRate} onChange={(e) => onUpdate('maxChargeRate', e.target.value)} className={inputCn} /></Field>
            <Field label="Max Discharge (kW)"><Input type="number" step="0.1" value={formData.maxDischargeRate} onChange={(e) => onUpdate('maxDischargeRate', e.target.value)} className={inputCn} /></Field>
          </div>

          {/* Total capacity badge when multiple modules */}
          {totalCapacity > 0 && (
            <div className="rounded-lg p-2 bg-elec-yellow/8 border border-elec-yellow/20">
              <p className="text-[11px] text-white text-center">Total capacity: <span className="font-bold text-elec-yellow">{totalCapacity} kWh</span> <span className="text-white/50">({formData.numberOfModules} × {formData.usableCapacity})</span></p>
            </div>
          )}
        </div>

        {/* Performance */}
        <div className="space-y-3">
          <Sub title="Performance" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Field label="Configuration">
              <MobileSelectPicker
                value={formData.configuration || autoConfig}
                onValueChange={(v) => onUpdate('configuration', v)}
                options={[
                  { value: 'single', label: 'Single unit' },
                  { value: 'parallel', label: 'Parallel' },
                  { value: 'series-parallel', label: 'Series-parallel' },
                ]}
                placeholder="Select..."
                triggerClassName={selectTriggerCn}
              />
            </Field>
            <Field label="DoD (%)"><Input type="number" value={formData.depthOfDischarge} onChange={(e) => onUpdate('depthOfDischarge', e.target.value)} className={inputCn} placeholder="100" /></Field>
            <Field label="Efficiency (%)"><Input type="number" step="0.1" value={formData.roundTripEfficiency} onChange={(e) => onUpdate('roundTripEfficiency', e.target.value)} className={inputCn} placeholder="95.5" /></Field>
          </div>
        </div>

        {/* Compliance */}
        <div className="space-y-3">
          <Sub title="Compliance" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="MCS Product Cert"><Input value={formData.mcsBatteryProductCert} onChange={(e) => onUpdate('mcsBatteryProductCert', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox checked={formData.iec62619Compliant} onCheckedChange={(v) => onUpdate('iec62619Compliant', v)} className={checkboxCn} />
            <Label className="text-sm text-white">IEC 62619 compliant</Label>
          </div>
        </div>
      </div>

      {/* Inverter / Charger */}
      <div className="space-y-4">
        <SectionHeader title="Inverter / Charger" />

        {/* Inverter Identification */}
        <div className="space-y-3">
          <Sub title="Identification" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Manufacturer" required>
              <MobileSelectPicker
                value={formData.inverterManufacturer}
                onValueChange={(v) => onUpdate('inverterManufacturer', v)}
                options={[...INVERTER_MANUFACTURERS.map((m) => ({ value: m, label: m })), { value: 'other', label: 'Other' }]}
                placeholder="Select..."
                triggerClassName={selectTriggerCn}
              />
            </Field>
            <Field label="Model" required><Input value={formData.inverterModel} onChange={(e) => onUpdate('inverterModel', e.target.value)} className={inputCn} placeholder="e.g. SUN2000-5KTL-L1" /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Serial Number" required><Input value={formData.inverterSerial} onChange={(e) => onUpdate('inverterSerial', e.target.value)} className={inputCn} /></Field>
            <Field label="Rated Power (kW)" required><Input type="number" step="0.1" value={formData.inverterRatedPower} onChange={(e) => onUpdate('inverterRatedPower', e.target.value)} className={inputCn} placeholder="e.g. 5.0" /></Field>
          </div>
        </div>

        {/* Inverter Config */}
        <div className="space-y-3">
          <Sub title="Configuration" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <Field label="Type" required>
              <MobileSelectPicker
                value={formData.inverterType}
                onValueChange={(v) => onUpdate('inverterType', v)}
                options={[
                  { value: 'hybrid', label: 'Hybrid (PV + Battery)' },
                  { value: 'ac-coupled', label: 'AC-coupled' },
                  { value: 'dc-coupled', label: 'DC-coupled' },
                ]}
                placeholder="Select..."
                triggerClassName={selectTriggerCn}
              />
            </Field>
            <Field label="Phases">
              <MobileSelectPicker
                value={formData.inverterPhases}
                onValueChange={(v) => onUpdate('inverterPhases', v)}
                options={[
                  { value: 'single', label: 'Single phase' },
                  { value: 'three', label: 'Three phase' },
                ]}
                placeholder="Select..."
                triggerClassName={selectTriggerCn}
              />
            </Field>
          </div>
          <Field label="MCS Product Cert No."><Input value={formData.mcsInverterProductCert} onChange={(e) => onUpdate('mcsInverterProductCert', e.target.value)} className={inputCn} /></Field>
        </div>
      </div>

      {/* System Configuration */}
      <div className="space-y-4">
        <SectionHeader title="System Configuration" />

        {/* Mode & Coupling */}
        <div className="space-y-3">
          <Sub title="Mode & Coupling" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Coupling Type" required>
              <MobileSelectPicker
                value={formData.couplingType}
                onValueChange={(v) => onUpdate('couplingType', v)}
                options={[
                  { value: 'AC', label: 'AC-coupled' },
                  { value: 'DC', label: 'DC-coupled' },
                  { value: 'hybrid', label: 'Hybrid' },
                ]}
                placeholder="Select..."
                triggerClassName={selectTriggerCn}
              />
            </Field>
            <Field label="Operating Mode">
              <MobileSelectPicker
                value={formData.operatingMode}
                onValueChange={(v) => onUpdate('operatingMode', v)}
                options={[
                  { value: 'self-consumption', label: 'Self-consumption' },
                  { value: 'time-of-use', label: 'Time-of-use' },
                  { value: 'backup', label: 'Backup only' },
                  { value: 'export-maximisation', label: 'Export maximisation' },
                  { value: 'custom', label: 'Custom' },
                ]}
                placeholder="Select..."
                triggerClassName={selectTriggerCn}
              />
            </Field>
          </div>
        </div>

        {/* Power Limits */}
        <div className="space-y-3">
          <Sub title="Power Limits" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Field label="Charge (kW)"><Input type="number" step="0.1" value={formData.chargeRateLimit} onChange={(e) => onUpdate('chargeRateLimit', e.target.value)} className={inputCn} /></Field>
            <Field label="Discharge (kW)"><Input type="number" step="0.1" value={formData.dischargeRateLimit} onChange={(e) => onUpdate('dischargeRateLimit', e.target.value)} className={inputCn} /></Field>
            <Field label="DoD Limit (%)"><Input type="number" value={formData.dodLimit} onChange={(e) => onUpdate('dodLimit', e.target.value)} className={inputCn} /></Field>
            <Field label="Backup Reserve (%)"><Input type="number" value={formData.backupReserve} onChange={(e) => onUpdate('backupReserve', e.target.value)} className={inputCn} /></Field>
          </div>
        </div>

        {/* Features & Export */}
        <div className="space-y-3">
          <Sub title="Features & Export" />
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
        </div>

        {/* Grid Connection */}
        <div className="space-y-3">
          <Sub title="Grid Connection" />
          <Field label="Total Site Generation (kW)"><Input type="number" step="0.01" value={formData.totalSiteGeneration || totalGeneration || ''} onChange={(e) => onUpdate('totalSiteGeneration', e.target.value)} className={inputCn} placeholder={totalGeneration > 0 ? `Auto: ${totalGeneration}kW` : 'Enter total capacity'} /></Field>
          {(parseFloat(formData.totalSiteGeneration) > 0 || totalGeneration > 0) && (
            <div className={`rounded-lg p-2.5 border ${gridReq.warning ? 'bg-amber-500/10 border-amber-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
              <p className={`text-xs font-semibold ${gridReq.warning ? 'text-amber-400' : 'text-green-400'}`}>{gridReq.message}</p>
              <p className="text-[11px] text-white mt-1">{gridReq.details}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
