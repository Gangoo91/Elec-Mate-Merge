import { useState, useMemo, useCallback } from 'react';
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
}

const BATTERY_PRESETS: BatteryPreset[] = [
  // Tesla
  { label: 'Tesla Powerwall 3', manufacturer: 'Tesla', model: 'Powerwall 3', chemistry: 'LFP', capacity: '13.5', voltage: '51.2', maxCharge: '11.5', maxDischarge: '11.5', modules: '1', efficiency: '97.5' },
  { label: 'Tesla Powerwall 2', manufacturer: 'Tesla', model: 'Powerwall 2', chemistry: 'NMC', capacity: '13.5', voltage: '50', maxCharge: '5.0', maxDischarge: '5.0', modules: '1', efficiency: '90' },
  // GivEnergy
  { label: 'GivEnergy 9.5kWh', manufacturer: 'GivEnergy', model: 'Giv-BAT-9.5', chemistry: 'LFP', capacity: '9.5', voltage: '51.2', maxCharge: '3.6', maxDischarge: '3.6', modules: '1', efficiency: '95.6' },
  { label: 'GivEnergy AIO 13.5kWh', manufacturer: 'GivEnergy', model: 'AIO-13.5', chemistry: 'LFP', capacity: '13.5', voltage: '51.2', maxCharge: '6.0', maxDischarge: '6.0', modules: '1', efficiency: '95.6' },
  { label: 'GivEnergy 2.6kWh', manufacturer: 'GivEnergy', model: 'Giv-BAT-2.6', chemistry: 'LFP', capacity: '2.6', voltage: '51.2', maxCharge: '2.6', maxDischarge: '2.6', modules: '1', efficiency: '95.6' },
  // Huawei
  { label: 'Huawei LUNA2000 5kWh', manufacturer: 'Huawei', model: 'LUNA2000-5-S0', chemistry: 'LFP', capacity: '5.0', voltage: '51.2', maxCharge: '2.5', maxDischarge: '2.5', modules: '1', efficiency: '97.0' },
  { label: 'Huawei LUNA2000 10kWh', manufacturer: 'Huawei', model: 'LUNA2000-10-S0', chemistry: 'LFP', capacity: '10.0', voltage: '51.2', maxCharge: '5.0', maxDischarge: '5.0', modules: '2', efficiency: '97.0' },
  { label: 'Huawei LUNA2000 15kWh', manufacturer: 'Huawei', model: 'LUNA2000-15-S0', chemistry: 'LFP', capacity: '15.0', voltage: '51.2', maxCharge: '5.0', maxDischarge: '5.0', modules: '3', efficiency: '97.0' },
  // Fox ESS
  { label: 'Fox ESS ECS4100 8.2kWh', manufacturer: 'Fox ESS', model: 'ECS4100-H2', chemistry: 'LFP', capacity: '8.2', voltage: '51.2', maxCharge: '4.1', maxDischarge: '4.1', modules: '1', efficiency: '95.0' },
  { label: 'Fox ESS ECS2900 5.76kWh', manufacturer: 'Fox ESS', model: 'ECS2900-H2', chemistry: 'LFP', capacity: '5.76', voltage: '51.2', maxCharge: '2.9', maxDischarge: '2.9', modules: '1', efficiency: '95.0' },
  // BYD
  { label: 'BYD HVS 5.1kWh', manufacturer: 'BYD', model: 'HVS 5.1', chemistry: 'LFP', capacity: '5.1', voltage: '204.8', maxCharge: '5.1', maxDischarge: '5.1', modules: '2', efficiency: '95.3' },
  { label: 'BYD HVM 8.3kWh', manufacturer: 'BYD', model: 'HVM 8.3', chemistry: 'LFP', capacity: '8.3', voltage: '204.8', maxCharge: '8.3', maxDischarge: '8.3', modules: '3', efficiency: '95.3' },
  { label: 'BYD HVS 10.2kWh', manufacturer: 'BYD', model: 'HVS 10.2', chemistry: 'LFP', capacity: '10.2', voltage: '409.6', maxCharge: '10.2', maxDischarge: '10.2', modules: '4', efficiency: '95.3' },
  // Pylontech
  { label: 'Pylontech US5000 4.8kWh', manufacturer: 'Pylontech', model: 'US5000', chemistry: 'LFP', capacity: '4.8', voltage: '48', maxCharge: '2.4', maxDischarge: '2.4', modules: '1', efficiency: '95.0' },
  { label: 'Pylontech Force-H2 7.1kWh', manufacturer: 'Pylontech', model: 'Force-H2', chemistry: 'LFP', capacity: '7.1', voltage: '192', maxCharge: '3.55', maxDischarge: '3.55', modules: '1', efficiency: '95.0' },
  // SolarEdge
  { label: 'SolarEdge Home 9.7kWh', manufacturer: 'SolarEdge', model: 'Home Battery 9.7', chemistry: 'LFP', capacity: '9.7', voltage: '400', maxCharge: '5.0', maxDischarge: '5.0', modules: '1', efficiency: '94.5' },
  // Enphase
  { label: 'Enphase IQ 5P 5kWh', manufacturer: 'Enphase', model: 'IQ Battery 5P', chemistry: 'LFP', capacity: '5.0', voltage: '48', maxCharge: '3.84', maxDischarge: '3.84', modules: '1', efficiency: '96.0' },
  { label: 'Enphase IQ 10T 10.5kWh', manufacturer: 'Enphase', model: 'IQ Battery 10T', chemistry: 'LFP', capacity: '10.5', voltage: '48', maxCharge: '5.76', maxDischarge: '5.76', modules: '1', efficiency: '96.0' },
  // SolaX
  { label: 'SolaX T-BAT 5.8kWh', manufacturer: 'SolaX', model: 'T-BAT-SYS-5.8-HV', chemistry: 'LFP', capacity: '5.8', voltage: '172.8', maxCharge: '3.0', maxDischarge: '3.0', modules: '1', efficiency: '95.0' },
  // Sunsynk
  { label: 'Sunsynk 5.32kWh', manufacturer: 'Sunsynk', model: 'BESS-5.32kWh', chemistry: 'LFP', capacity: '5.32', voltage: '51.2', maxCharge: '2.66', maxDischarge: '2.66', modules: '1', efficiency: '95.0' },
  // Growatt
  { label: 'Growatt APX 6.1kWh', manufacturer: 'Growatt', model: 'APX-6.1-HV', chemistry: 'LFP', capacity: '6.1', voltage: '192', maxCharge: '3.0', maxDischarge: '3.0', modules: '1', efficiency: '95.0' },
  // AlphaESS
  { label: 'AlphaESS SMILE5 5.7kWh', manufacturer: 'AlphaESS', model: 'SMILE5', chemistry: 'LFP', capacity: '5.7', voltage: '51.2', maxCharge: '5.0', maxDischarge: '5.0', modules: '1', efficiency: '95.0' },
  // Sofar
  { label: 'Sofar Amass GTX 5kWh', manufacturer: 'Sofar', model: 'Amass GTX 5000', chemistry: 'LFP', capacity: '5.0', voltage: '51.2', maxCharge: '2.5', maxDischarge: '2.5', modules: '1', efficiency: '95.0' },
  // Victron
  { label: 'Victron Lynx 5.12kWh', manufacturer: 'Victron', model: 'Lynx Smart BMS 5.12', chemistry: 'LFP', capacity: '5.12', voltage: '51.2', maxCharge: '2.56', maxDischarge: '2.56', modules: '1', efficiency: '95.0' },
  // Solis
  { label: 'Solis 6.4kWh', manufacturer: 'Solis', model: 'AES-LV-6.4K', chemistry: 'LFP', capacity: '6.4', voltage: '51.2', maxCharge: '3.2', maxDischarge: '3.2', modules: '1', efficiency: '95.0' },
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
    <div className="space-y-6">
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
              <p className="text-[10px] text-white/70 leading-tight mt-0.5 truncate">{preset.model}</p>
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
            className="w-full h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[11px] text-white/70 font-medium touch-manipulation active:scale-[0.98]"
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
                <span className="text-[10px] text-white/70">Test at <span className="font-bold text-elec-yellow">{chemistryGuidance.dcTestVoltage}V</span></span>
                <span className="text-[10px] text-white/70">Min IR <span className="font-bold text-elec-yellow">{chemistryGuidance.minResistance} MΩ</span></span>
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
          <div className="grid grid-cols-3 gap-3">
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
            <Field label="BMS Firmware"><Input value={formData.bmsFirmware} onChange={(e) => onUpdate('bmsFirmware', e.target.value)} className={inputCn} placeholder="e.g. v3.2.1" /></Field>
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
          <div className="grid grid-cols-3 gap-3">
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
            <Field label="Firmware"><Input value={formData.inverterFirmware} onChange={(e) => onUpdate('inverterFirmware', e.target.value)} className={inputCn} /></Field>
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
