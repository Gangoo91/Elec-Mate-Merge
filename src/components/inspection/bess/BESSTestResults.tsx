/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo } from 'react';
import { SectionHeader } from "./BESSSectionHeader";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { cn } from '@/lib/utils';
import { useBESSSmartForm } from '@/hooks/inspection/useBESSSmartForm';
import useReadingKeypad from '@/hooks/useReadingKeypad';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';
const cardWideCn = cardCn + ' lg:col-span-2';
const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';
const pickerTrigger =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 w-full px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div><Label className="text-[12px] font-medium text-white mb-1 block">{label}{required && ' *'}</Label>{children}</div>
);

const Sub = ({ title }: { title: string }) => (
  <div className="border-t border-white/[0.1] pt-4">
    <h3 className="text-sm font-semibold text-white">{title}</h3>
  </div>
);

const PassFailSelect = ({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) => (
  <div className="space-y-2">
    <Label className="text-[12px] font-medium text-white">{label}</Label>
    <div className="flex gap-2">
      {['pass', 'fail'].map((v) => (
        <button key={v} type="button" onClick={() => onChange(v)}
          className={cn('flex-1 h-11 rounded-xl text-sm font-semibold touch-manipulation transition-all flex items-center justify-center',
            value === v ? (v === 'pass' ? 'bg-green-500 border border-green-500 text-black' : 'bg-red-500 border border-red-500 text-white') : 'bg-white/[0.06] border border-white/[0.12] text-white')}>
          {v === 'pass' ? 'Pass' : 'Fail'}
        </button>
      ))}
    </div>
  </div>
);

interface Props { formData: any; onUpdate: (field: string, value: any) => void }

/** Numeric test readings the keypad serves — free-number measurement inputs
 * only (selects, chips, dates and serial/text fields stay native). */
const KEYPAD_META = {
  ze: { label: 'Ze — external loop impedance', unit: 'Ω' },
  zs: { label: 'Zs — earth fault loop', unit: 'Ω' },
  r1r2: { label: 'R1+R2 — continuity', unit: 'Ω' },
  acInsulationResistance: { label: 'AC insulation resistance', unit: 'MΩ', inf: true },
  rcdTripTimeIdn: { label: 'RCD trip time at IΔn', unit: 'ms' },
  rcdTripTime5xIdn: { label: 'RCD trip time at 5×IΔn', unit: 'ms' },
  dcInsulationResistance: { label: 'DC insulation resistance', unit: 'MΩ', inf: true },
  dcTestVoltage: { label: 'DC test voltage', unit: 'V' },
  dcStringVoltage: { label: 'String voltage — measured', unit: 'V' },
  dcStringVoltageExpected: { label: 'String voltage — expected', unit: 'V' },
  epsSwitchoverTime: { label: 'EPS switchover time', unit: 'ms' },
  measuredCapacityKwh: { label: 'Measured capacity', unit: 'kWh' },
};
/** Natural test order — AC tests, RCD, then DC, then functional extras. */
const KEYPAD_SEQUENCE = [
  'ze',
  'zs',
  'r1r2',
  'acInsulationResistance',
  'rcdTripTimeIdn',
  'rcdTripTime5xIdn',
  'dcInsulationResistance',
  'dcTestVoltage',
  'dcStringVoltage',
  'dcStringVoltageExpected',
  'epsSwitchoverTime',
  'measuredCapacityKwh',
];

export default function BESSTestResults({ formData, onUpdate }: Props) {
  const { getChemistryGuidance, validateTestResults } = useBESSSmartForm();
  const chemGuidance = useMemo(() => getChemistryGuidance(formData.batteryChemistry), [formData.batteryChemistry, getChemistryGuidance]);

  // Commit the displayed chemistry default into formData. The input showed
  // `formData.dcTestVoltage || chemGuidance.dcTestVoltage`, so the tester saw
  // e.g. "500" while the stored value stayed '' — and the template renders
  // `{{ dcInsulationResistance }} MΩ @ {{ dcTestVoltage }}V`, printing
  // "1.5 MΩ @ V" on an MCS commissioning certificate. Only fills a blank, so a
  // value the tester actually measured is never overwritten.
  useEffect(() => {
    if (!formData.dcTestVoltage && chemGuidance?.dcTestVoltage) {
      onUpdate('dcTestVoltage', String(chemGuidance.dcTestVoltage));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.dcTestVoltage, chemGuidance?.dcTestVoltage]);

  // Reading keypad — shared MW pattern. Values flow through the existing
  // onUpdate path; getValue mirrors what each input renders (DC test voltage
  // defaults to the chemistry guidance value exactly like its value prop).
  const validations = useMemo(() => validateTestResults(formData), [formData, validateTestResults]);

  const keypad = useReadingKeypad({
    meta: KEYPAD_META,
    sequence: KEYPAD_SEQUENCE,
    getValue: (field) =>
      field === 'dcTestVoltage'
        ? String(formData.dcTestVoltage || chemGuidance.dcTestVoltage || '')
        : String(formData[field] ?? ''),
    setValue: (field, value) => onUpdate(field, value),
    // Reuse the verdicts useBESSSmartForm ALREADY computes (validateTestResults:
    // 1 MΩ AC, chemistry-dependent DC, RCD trip times). That function was built
    // and had no consumer anywhere, so BESS was the only specialist cert whose
    // keypad never showed a PASS/CHECK chip. No new limits are introduced here.
    getStatus: (field, value) => {
      if (!value) return null;
      const v = validations.find((x) => x.field === field);
      if (!v) return null;
      return v.status === 'pass'
        ? { tone: 'pass', label: String(v.message).replace(/^PASS:\s*/, '') }
        : { tone: 'check', label: String(v.message).replace(/^FAIL:\s*/, '') };
    },
  });

  return (
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* AC Test Results */}
      <div className={cardCn}>
        <SectionHeader title="AC Test Results" />
        <Sub title="Impedance" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-4">
          <Field label="Ze (Ω)" required><Input value={formData.ze} onChange={(e) => onUpdate('ze', e.target.value)} className={inputCn} placeholder="0.35" {...keypad.field('ze')} /></Field>
          <Field label="Zs (Ω)"><Input value={formData.zs} onChange={(e) => onUpdate('zs', e.target.value)} className={inputCn} placeholder="0.72" {...keypad.field('zs')} /></Field>
          <Field label="R1+R2 (Ω)"><Input value={formData.r1r2} onChange={(e) => onUpdate('r1r2', e.target.value)} className={inputCn} placeholder="0.37" {...keypad.field('r1r2')} /></Field>
        </div>
        <Sub title="Insulation & Polarity" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4">
          <Field label="AC IR (MΩ)" required><Input value={formData.acInsulationResistance} onChange={(e) => onUpdate('acInsulationResistance', e.target.value)} className={inputCn} placeholder="≥1.0" {...keypad.field('acInsulationResistance')} /></Field>
          <Field label="Polarity">
            <MobileSelectPicker value={formData.acPolarity} onValueChange={(v) => onUpdate('acPolarity', v)}
              options={[{ value: 'correct', label: 'Correct' }, { value: 'incorrect', label: 'Incorrect' }]}
              placeholder="Select..." triggerClassName={pickerTrigger} />
          </Field>
        </div>
        <Sub title="RCD" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="@ Idn (ms)"><Input value={formData.rcdTripTimeIdn} onChange={(e) => onUpdate('rcdTripTimeIdn', e.target.value)} className={inputCn} placeholder="≤300" {...keypad.field('rcdTripTimeIdn')} /></Field>
          <Field label="@ 5×Idn (ms)"><Input value={formData.rcdTripTime5xIdn} onChange={(e) => onUpdate('rcdTripTime5xIdn', e.target.value)} className={inputCn} placeholder="≤40" {...keypad.field('rcdTripTime5xIdn')} /></Field>
        </div>
        <Sub title="Test Instrument" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Make">
            <MobileSelectPicker value={formData.testInstrumentMake} onValueChange={(v) => onUpdate('testInstrumentMake', v)}
              options={[
                { value: 'Megger', label: 'Megger' },
                { value: 'Fluke', label: 'Fluke' },
                { value: 'Metrel', label: 'Metrel' },
                { value: 'Kewtech', label: 'Kewtech' },
                { value: 'Seaward', label: 'Seaward' },
                { value: 'Martindale', label: 'Martindale' },
                { value: 'Amprobe', label: 'Amprobe' },
                { value: 'Chauvin Arnoux', label: 'Chauvin Arnoux' },
                { value: 'Di-Log', label: 'Di-Log' },
                { value: 'Robin', label: 'Robin' },
                { value: 'other', label: 'Other' },
              ]}
              placeholder="Select..." triggerClassName={pickerTrigger} />
          </Field>
          <Field label="Model"><Input value={formData.testInstrumentModel} onChange={(e) => onUpdate('testInstrumentModel', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Serial No."><Input value={formData.testInstrumentSerial} onChange={(e) => onUpdate('testInstrumentSerial', e.target.value)} className={inputCn} /></Field>
          <Field label="Cal. Date"><Input type="date" value={formData.testInstrumentCalDate} onChange={(e) => onUpdate('testInstrumentCalDate', e.target.value)} className={inputCn} /></Field>
        </div>
      </div>

      {/* DC Test Results */}
      <div className={cardCn}>
        <SectionHeader title="DC Test Results" badge="BESS" />
        {formData.batteryChemistry && (
          <div className="rounded-xl p-3 bg-white/[0.05]">
            <p className="text-[12px] text-white/90">Test at <span className="font-bold text-elec-yellow">{chemGuidance.dcTestVoltage}V</span> — minimum <span className="font-bold text-elec-yellow">{chemGuidance.minResistance} MΩ</span> for {formData.batteryChemistry}</p>
          </div>
        )}
        <Sub title="Insulation" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="DC IR (MΩ)" required><Input value={formData.dcInsulationResistance} onChange={(e) => onUpdate('dcInsulationResistance', e.target.value)} className={inputCn} placeholder={`≥${chemGuidance.minResistance}`} {...keypad.field('dcInsulationResistance')} /></Field>
          <Field label="Test Voltage (V)"><Input value={formData.dcTestVoltage || chemGuidance.dcTestVoltage} onChange={(e) => onUpdate('dcTestVoltage', e.target.value)} className={inputCn} {...keypad.field('dcTestVoltage')} /></Field>
        </div>
        <Sub title="String Voltage" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Measured (V)"><Input value={formData.dcStringVoltage} onChange={(e) => onUpdate('dcStringVoltage', e.target.value)} className={inputCn} placeholder="Measured" {...keypad.field('dcStringVoltage')} /></Field>
          <Field label="Expected (V)"><Input value={formData.dcStringVoltageExpected} onChange={(e) => onUpdate('dcStringVoltageExpected', e.target.value)} className={inputCn} placeholder="Per datasheet" {...keypad.field('dcStringVoltageExpected')} /></Field>
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-[12px] font-medium text-white">DC polarity verified</Label>
          <div className="flex gap-1.5">
            {[true, false].map((v) => (
              <button key={String(v)} type="button" onClick={() => onUpdate('dcPolarityVerified', v)}
                className={cn('h-11 w-16 rounded-xl text-[12px] font-semibold touch-manipulation transition-all',
                  formData.dcPolarityVerified === v ? (v ? 'bg-green-500 border border-green-500 text-black' : 'bg-red-500 border border-red-500 text-white') : 'bg-white/[0.06] border border-white/[0.12] text-white')}>
                {v ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>
        <Field label="Battery SoC at Commissioning (%)"><Input type="number" value={formData.batterySoCAtCommissioning} onChange={(e) => onUpdate('batterySoCAtCommissioning', e.target.value)} className={inputCn} placeholder="e.g. 85" /></Field>
      </div>

      {/* Grid Protection Settings — verified against inverter G98/G99 type-test */}
      <div className={cardCn}>
        <SectionHeader title="Grid Protection Settings" />
        <div className="flex items-center justify-between">
          <Label className="text-[12px] font-medium text-white">
            OV/UV/OF/UF & ROCOF verified against inverter type-test
          </Label>
          <div className="flex gap-1.5">
            {[true, false].map((v) => (
              <button
                key={String(v)}
                type="button"
                onClick={() => onUpdate('gridProtectionVerified', v)}
                className={cn(
                  'h-11 w-16 rounded-xl text-[12px] font-semibold touch-manipulation transition-all',
                  formData.gridProtectionVerified === v
                    ? v
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-white/[0.06] text-white border border-white/[0.08]'
                )}
              >
                {v ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>
        <p className="text-[12px] text-white/85">
          Trip settings are factory type-tested per EREC G98/G99 and shown on the inverter display —
          confirmed correct, not re-configured on site.
        </p>
      </div>

      {/* DNO Details */}
      <div className={cardCn}>
        <SectionHeader title="DNO Details" />
        <Sub title="Connection" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Type" required>
            <MobileSelectPicker value={formData.gridConnectionType} onValueChange={(v) => onUpdate('gridConnectionType', v)}
              options={[{ value: 'G98', label: 'G98 (≤16A/phase)' }, { value: 'G99', label: 'G99 (>16A/phase)' }]}
              placeholder="Select..." triggerClassName={pickerTrigger} />
          </Field>
          <Field label="DNO Name">
            <MobileSelectPicker value={formData.dnoName} onValueChange={(v) => onUpdate('dnoName', v)}
              options={[
                { value: 'UK Power Networks', label: 'UK Power Networks (UKPN)' },
                { value: 'Western Power Distribution', label: 'Western Power Distribution (WPD)' },
                { value: 'National Grid Electricity Distribution', label: 'National Grid ED (NGED)' },
                { value: 'Northern Powergrid', label: 'Northern Powergrid' },
                { value: 'Scottish Power Energy Networks', label: 'SP Energy Networks' },
                { value: 'SSE Networks', label: 'SSE Networks (SSEN)' },
                { value: 'Electricity North West', label: 'Electricity North West (ENWL)' },
                { value: 'Northern Ireland Electricity', label: 'NIE Networks' },
                { value: 'other', label: 'Other' },
              ]}
              placeholder="Select..." triggerClassName={pickerTrigger} />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="DNO Reference"><Input value={formData.dnoReference} onChange={(e) => onUpdate('dnoReference', e.target.value)} className={inputCn} /></Field>
          <Field label="Notification Date"><Input type="date" value={formData.dnoNotificationDate} onChange={(e) => onUpdate('dnoNotificationDate', e.target.value)} className={inputCn} /></Field>
        </div>
        <Field label="MPAN"><Input value={formData.mpan} onChange={(e) => onUpdate('mpan', e.target.value)} className={inputCn} placeholder="21-digit MPAN" /></Field>
        <Sub title="Metering" />
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-[12px] font-medium text-white">Export meter fitted</Label>
            <div className="flex gap-1.5">
              {[true, false].map((v) => (
                <button key={String(v)} type="button" onClick={() => onUpdate('exportMeterFitted', v)}
                  className={cn('h-11 w-16 rounded-xl text-[12px] font-semibold touch-manipulation transition-all',
                    formData.exportMeterFitted === v ? (v ? 'bg-green-500 border border-green-500 text-black' : 'bg-white/20 border border-white/20 text-white') : 'bg-white/[0.06] border border-white/[0.12] text-white')}>
                  {v ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>
          {formData.exportMeterFitted && <Field label="Export Meter Serial"><Input value={formData.exportMeterSerial} onChange={(e) => onUpdate('exportMeterSerial', e.target.value)} className={inputCn} /></Field>}
          <div className="flex items-center justify-between">
            <Label className="text-[12px] font-medium text-white">Smart meter fitted</Label>
            <div className="flex gap-1.5">
              {[true, false].map((v) => (
                <button key={String(v)} type="button" onClick={() => onUpdate('smartMeterFitted', v)}
                  className={cn('h-11 w-16 rounded-xl text-[12px] font-semibold touch-manipulation transition-all',
                    formData.smartMeterFitted === v ? (v ? 'bg-green-500 border border-green-500 text-black' : 'bg-white/20 border border-white/20 text-white') : 'bg-white/[0.06] border border-white/[0.12] text-white')}>
                  {v ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>
          {formData.smartMeterFitted && <Field label="Smart Meter Serial"><Input value={formData.smartMeterSerial} onChange={(e) => onUpdate('smartMeterSerial', e.target.value)} className={inputCn} /></Field>}
          <div className="flex items-center justify-between">
            <Label className="text-[12px] font-medium text-white">SEG registered</Label>
            <div className="flex gap-1.5">
              {[true, false].map((v) => (
                <button key={String(v)} type="button" onClick={() => onUpdate('segRegistered', v)}
                  className={cn('h-11 w-16 rounded-xl text-[12px] font-semibold touch-manipulation transition-all',
                    formData.segRegistered === v ? (v ? 'bg-green-500 border border-green-500 text-black' : 'bg-white/20 border border-white/20 text-white') : 'bg-white/[0.06] border border-white/[0.12] text-white')}>
                  {v ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Functional Tests */}
      <div className={cardCn}>
        <SectionHeader title="Functional Tests" badge="Critical" />

        {/* Each test as a full-width row: label + inline pass/fail */}
        <div className="space-y-3">
          {/* Anti-islanding */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-[12px] font-medium text-white">Anti-islanding *</Label>
              <div className="flex gap-1.5">
                {['pass', 'fail'].map((v) => (
                  <button key={v} type="button" onClick={() => onUpdate('antiIslandingTest', v)}
                    className={cn('h-11 w-16 rounded-xl text-[12px] font-semibold touch-manipulation transition-all',
                      formData.antiIslandingTest === v ? (v === 'pass' ? 'bg-green-500 border border-green-500 text-black' : 'bg-red-500 border border-red-500 text-white') : 'bg-white/[0.06] border border-white/[0.12] text-white')}>
                    {v === 'pass' ? 'Pass' : 'Fail'}
                  </button>
                ))}
              </div>
            </div>
            <Field label="Method"><Input value={formData.antiIslandingMethod} onChange={(e) => onUpdate('antiIslandingMethod', e.target.value)} className={inputCn} placeholder="Frequency shift" /></Field>
          </div>

          {/* Charge */}
          <div className="flex items-center justify-between">
            <Label className="text-[12px] font-medium text-white">Charge Test *</Label>
            <div className="flex gap-1.5">
              {['pass', 'fail'].map((v) => (
                <button key={v} type="button" onClick={() => onUpdate('chargeTest', v)}
                  className={cn('h-11 w-16 rounded-xl text-[12px] font-semibold touch-manipulation transition-all',
                    formData.chargeTest === v ? (v === 'pass' ? 'bg-green-500 border border-green-500 text-black' : 'bg-red-500 border border-red-500 text-white') : 'bg-white/[0.06] border border-white/[0.12] text-white')}>
                  {v === 'pass' ? 'Pass' : 'Fail'}
                </button>
              ))}
            </div>
          </div>

          {/* Discharge */}
          <div className="flex items-center justify-between">
            <Label className="text-[12px] font-medium text-white">Discharge Test *</Label>
            <div className="flex gap-1.5">
              {['pass', 'fail'].map((v) => (
                <button key={v} type="button" onClick={() => onUpdate('dischargeTest', v)}
                  className={cn('h-11 w-16 rounded-xl text-[12px] font-semibold touch-manipulation transition-all',
                    formData.dischargeTest === v ? (v === 'pass' ? 'bg-green-500 border border-green-500 text-black' : 'bg-red-500 border border-red-500 text-white') : 'bg-white/[0.06] border border-white/[0.12] text-white')}>
                  {v === 'pass' ? 'Pass' : 'Fail'}
                </button>
              ))}
            </div>
          </div>

          {/* EPS / Backup */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-[12px] font-medium text-white">EPS / Backup</Label>
              <div className="flex gap-1.5">
                {['pass', 'fail', ''].map((v) => (
                  <button key={v || 'na'} type="button" onClick={() => onUpdate('epsTest', v)}
                    className={cn('h-11 w-14 rounded-xl text-[12px] font-semibold touch-manipulation transition-all',
                      formData.epsTest === v ? (v === 'pass' ? 'bg-green-500 border border-green-500 text-black' : v === 'fail' ? 'bg-red-500 border border-red-500 text-white' : 'bg-white/20 border border-white/20 text-white') : 'bg-white/[0.06] border border-white/[0.12] text-white')}>
                    {v === 'pass' ? 'Pass' : v === 'fail' ? 'Fail' : 'N/A'}
                  </button>
                ))}
              </div>
            </div>
            {formData.epsTest === 'pass' && <Field label="Switchover Time (ms)"><Input value={formData.epsSwitchoverTime} onChange={(e) => onUpdate('epsSwitchoverTime', e.target.value)} className={inputCn} placeholder="e.g. 10" {...keypad.field('epsSwitchoverTime')} /></Field>}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-[12px] font-medium text-white">Monitoring confirmed</Label>
          <div className="flex gap-1.5">
            {[true, false].map((v) => (
              <button key={String(v)} type="button" onClick={() => onUpdate('monitoringConfirmed', v)}
                className={cn('h-11 w-16 rounded-xl text-[12px] font-semibold touch-manipulation transition-all',
                  formData.monitoringConfirmed === v ? (v ? 'bg-green-500 border border-green-500 text-black' : 'bg-white/20 border border-white/20 text-white') : 'bg-white/[0.06] border border-white/[0.12] text-white')}>
                {v ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>

        {/* Additional functional tests */}
        <div className="flex items-center justify-between">
          <Label className="text-[12px] font-medium text-white">Emergency Shutdown *</Label>
          <div className="flex gap-1.5">
            {['pass', 'fail'].map((v) => (
              <button key={v} type="button" onClick={() => onUpdate('emergencyShutdownTest', v)}
                className={cn('h-11 w-16 rounded-xl text-[12px] font-semibold touch-manipulation transition-all',
                  formData.emergencyShutdownTest === v ? (v === 'pass' ? 'bg-green-500 border border-green-500 text-black' : 'bg-red-500 border border-red-500 text-white') : 'bg-white/[0.06] border border-white/[0.12] text-white')}>
                {v === 'pass' ? 'Pass' : 'Fail'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-[12px] font-medium text-white">BMS Operational *</Label>
          <div className="flex gap-1.5">
            {['pass', 'fail'].map((v) => (
              <button key={v} type="button" onClick={() => onUpdate('bmsOperationalTest', v)}
                className={cn('h-11 w-16 rounded-xl text-[12px] font-semibold touch-manipulation transition-all',
                  formData.bmsOperationalTest === v ? (v === 'pass' ? 'bg-green-500 border border-green-500 text-black' : 'bg-red-500 border border-red-500 text-white') : 'bg-white/[0.06] border border-white/[0.12] text-white')}>
                {v === 'pass' ? 'Pass' : 'Fail'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-[12px] font-medium text-white">Thermal Monitoring</Label>
          <div className="flex gap-1.5">
            {['pass', 'fail'].map((v) => (
              <button key={v} type="button" onClick={() => onUpdate('thermalMonitoringTest', v)}
                className={cn('h-11 w-16 rounded-xl text-[12px] font-semibold touch-manipulation transition-all',
                  formData.thermalMonitoringTest === v ? (v === 'pass' ? 'bg-green-500 border border-green-500 text-black' : 'bg-red-500 border border-red-500 text-white') : 'bg-white/[0.06] border border-white/[0.12] text-white')}>
                {v === 'pass' ? 'Pass' : 'Fail'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Manufacturer Commissioning */}
      <div className={cardCn}>
        <SectionHeader title="Manufacturer Commissioning" />

        <div className="flex items-center justify-between">
          <Label className="text-[12px] font-medium text-white">Portal Registration</Label>
          <div className="flex gap-1.5">
            {[true, false].map((v) => (
              <button key={String(v)} type="button" onClick={() => onUpdate('portalRegistered', v)}
                className={cn('h-11 w-16 rounded-xl text-[12px] font-semibold touch-manipulation transition-all',
                  formData.portalRegistered === v ? (v ? 'bg-green-500 border border-green-500 text-black' : 'bg-white/20 border border-white/20 text-white') : 'bg-white/[0.06] border border-white/[0.12] text-white')}>
                {v ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Commissioning Ref"><Input value={formData.manufacturerCommRef} onChange={(e) => onUpdate('manufacturerCommRef', e.target.value)} className={inputCn} placeholder="Portal reference" /></Field>
          <Field label="Comm Module">
            <MobileSelectPicker value={formData.commModuleType} onValueChange={(v) => onUpdate('commModuleType', v)}
              options={[{ value: 'wifi', label: 'Wi-Fi dongle' }, { value: '4g', label: '4G dongle' }, { value: 'lan', label: 'LAN / Ethernet' }, { value: 'ethernet', label: 'Direct Ethernet' }]}
              placeholder="Select..." triggerClassName={pickerTrigger} />
          </Field>
        </div>
        <Field label="Comm Module Serial"><Input value={formData.commModuleSerial} onChange={(e) => onUpdate('commModuleSerial', e.target.value)} className={inputCn} /></Field>

        <Sub title="Verification" />
        <div className="flex items-center justify-between">
          <Label className="text-[12px] font-medium text-white">Cloud Monitoring</Label>
          <div className="flex gap-1.5">
            {[true, false].map((v) => (
              <button key={String(v)} type="button" onClick={() => onUpdate('cloudMonitoringWorking', v)}
                className={cn('h-11 w-16 rounded-xl text-[12px] font-semibold touch-manipulation transition-all',
                  formData.cloudMonitoringWorking === v ? (v ? 'bg-green-500 border border-green-500 text-black' : 'bg-red-500 border border-red-500 text-white') : 'bg-white/[0.06] border border-white/[0.12] text-white')}>
                {v ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-[12px] font-medium text-white">Firmware Current</Label>
          <div className="flex gap-1.5">
            {[true, false].map((v) => (
              <button key={String(v)} type="button" onClick={() => onUpdate('firmwaresCurrent', v)}
                className={cn('h-11 w-16 rounded-xl text-[12px] font-semibold touch-manipulation transition-all',
                  formData.firmwaresCurrent === v ? (v ? 'bg-green-500 border border-green-500 text-black' : 'bg-red-500 border border-red-500 text-white') : 'bg-white/[0.06] border border-white/[0.12] text-white')}>
                {v ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Commercial / Large-System Tests (MIS 3012 Part 3/4) — non-domestic only */}
      {formData.installationType !== 'domestic' && (
        <div className={cardWideCn}>
          <SectionHeader title="Commercial / Large-System Tests" badge="MIS 3012" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4">
            <PassFailSelect label="Capacity test (BS EN 61427-1)" value={formData.capacityTestResult} onChange={(v) => onUpdate('capacityTestResult', v)} />
            <Field label="Measured Capacity (kWh)"><Input value={formData.measuredCapacityKwh} onChange={(e) => onUpdate('measuredCapacityKwh', e.target.value)} className={inputCn} {...keypad.field('measuredCapacityKwh')} /></Field>
            <PassFailSelect label="Ancillary equip (pumps/HVAC)" value={formData.ancillaryEquipmentTest} onChange={(v) => onUpdate('ancillaryEquipmentTest', v)} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <PassFailSelect label="Grid / ancillary services" value={formData.ancillaryServicesTest} onChange={(v) => onUpdate('ancillaryServicesTest', v)} />
            <PassFailSelect label="Revenue metering verified" value={formData.revenueMeteringVerified} onChange={(v) => onUpdate('revenueMeteringVerified', v)} />
          </div>
          {formData.ancillaryServicesTest && (
            <Field label="Ancillary Services Detail (FFR/DFS etc.)"><Input value={formData.ancillaryServicesDetail} onChange={(e) => onUpdate('ancillaryServicesDetail', e.target.value)} className={inputCn} placeholder="Service type / DNO ref" /></Field>
          )}
          <Field label="Arc-Flash Assessment Ref (CoP App. E)"><Input value={formData.arcFlashAssessmentRef} onChange={(e) => onUpdate('arcFlashAssessmentRef', e.target.value)} className={inputCn} /></Field>
        </div>
      )}

      {/* G100 export-limit test — when export-limited */}
      {formData.exportLimited && (
        <div className={cardWideCn}>
          <SectionHeader title="Export Limitation Test (G100)" />
          <PassFailSelect label="Export-limit scheme proven (G100)" value={formData.g100ExportTestResult} onChange={(v) => onUpdate('g100ExportTestResult', v)} />
        </div>
      )}

      {/* Wet-chemical check — lead-acid / flow only */}
      {(formData.batteryChemistry === 'lead-acid' || formData.batteryChemistry === 'flow') && (
        <div className={cardWideCn}>
          <SectionHeader title="Wet-Chemical Check" />
          <PassFailSelect label="Electrolyte / hydrometer check" value={formData.wetChemicalCheckResult} onChange={(v) => onUpdate('wetChemicalCheckResult', v)} />
        </div>
      )}

      {/* Scroll room so the last reading can rise clear of the keypad */}
      {keypad.spacer}

      {/* Reading keypad — coarse-pointer devices only */}
      {keypad.element}
    </div>
  );
}
