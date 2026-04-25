import { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { cn } from '@/lib/utils';
import { useBESSSmartForm } from '@/hooks/inspection/useBESSSmartForm';

const inputCn = 'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white [color-scheme:dark]';
const pickerTrigger = 'h-11 w-full touch-manipulation bg-white/[0.06] border-white/[0.08] text-white';

const SectionHeader = ({ title, badge }: { title: string; badge?: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider flex items-center gap-2">{title}
      {badge && <span className="text-[10px] font-bold text-elec-yellow bg-elec-yellow/10 border border-elec-yellow/20 px-2 py-0.5 rounded">{badge}</span>}
    </h2>
  </div>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div><Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>{children}</div>
);

const Sub = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 pt-2">
    <p className="text-[10px] font-semibold text-white uppercase tracking-wider shrink-0">{title}</p>
    <div className="h-px flex-1 bg-white/[0.06]" />
  </div>
);

const PassFailSelect = ({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) => (
  <div className="space-y-2">
    <Label className="text-white text-xs">{label}</Label>
    <div className="flex gap-2">
      {['pass', 'fail'].map((v) => (
        <button key={v} type="button" onClick={() => onChange(v)}
          className={cn('flex-1 h-11 rounded-lg text-sm font-semibold touch-manipulation transition-all flex items-center justify-center',
            value === v ? (v === 'pass' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
          {v === 'pass' ? 'Pass' : 'Fail'}
        </button>
      ))}
    </div>
  </div>
);

interface Props { formData: any; onUpdate: (field: string, value: any) => void }

export default function BESSTestResults({ formData, onUpdate }: Props) {
  const { getChemistryGuidance } = useBESSSmartForm();
  const chemGuidance = useMemo(() => getChemistryGuidance(formData.batteryChemistry), [formData.batteryChemistry, getChemistryGuidance]);

  return (
    <div className="space-y-6">
      {/* AC Test Results */}
      <div className="space-y-4">
        <SectionHeader title="AC Test Results" />
        <Sub title="Impedance" />
        <div className="grid grid-cols-4 gap-2">
          <Field label="Ze (Ω)" required><Input value={formData.ze} onChange={(e) => onUpdate('ze', e.target.value)} className={inputCn} placeholder="0.35" /></Field>
          <Field label="Zs (Ω)"><Input value={formData.zs} onChange={(e) => onUpdate('zs', e.target.value)} className={inputCn} placeholder="0.72" /></Field>
          <Field label="R1+R2 (Ω)"><Input value={formData.r1r2} onChange={(e) => onUpdate('r1r2', e.target.value)} className={inputCn} placeholder="0.37" /></Field>
          <Field label="R2 (Ω)"><Input value={formData.r2} onChange={(e) => onUpdate('r2', e.target.value)} className={inputCn} placeholder="0.18" /></Field>
        </div>
        <Sub title="Insulation & Polarity" />
        <div className="grid grid-cols-3 gap-3">
          <Field label="AC IR (MΩ)" required><Input value={formData.acInsulationResistance} onChange={(e) => onUpdate('acInsulationResistance', e.target.value)} className={inputCn} placeholder="≥1.0" /></Field>
          <Field label="Polarity">
            <MobileSelectPicker value={formData.acPolarity} onValueChange={(v) => onUpdate('acPolarity', v)}
              options={[{ value: 'correct', label: 'Correct' }, { value: 'incorrect', label: 'Incorrect' }]}
              placeholder="Select..." triggerClassName={pickerTrigger} />
          </Field>
          <Field label="PSCC (kA)"><Input value={formData.pscc} onChange={(e) => onUpdate('pscc', e.target.value)} className={inputCn} /></Field>
        </div>
        <Sub title="RCD" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="@ Idn (ms)"><Input value={formData.rcdTripTimeIdn} onChange={(e) => onUpdate('rcdTripTimeIdn', e.target.value)} className={inputCn} placeholder="≤300" /></Field>
          <Field label="@ 5×Idn (ms)"><Input value={formData.rcdTripTime5xIdn} onChange={(e) => onUpdate('rcdTripTime5xIdn', e.target.value)} className={inputCn} placeholder="≤40" /></Field>
        </div>
        <Sub title="Test Instrument" />
        <div className="grid grid-cols-2 gap-3">
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
        <div className="grid grid-cols-2 gap-3">
          <Field label="Serial No."><Input value={formData.testInstrumentSerial} onChange={(e) => onUpdate('testInstrumentSerial', e.target.value)} className={inputCn} /></Field>
          <Field label="Cal. Date"><Input type="date" value={formData.testInstrumentCalDate} onChange={(e) => onUpdate('testInstrumentCalDate', e.target.value)} className={inputCn} /></Field>
        </div>
      </div>

      {/* DC Test Results */}
      <div className="space-y-4">
        <SectionHeader title="DC Test Results" badge="BESS" />
        {formData.batteryChemistry && (
          <div className="rounded-lg p-2.5 bg-elec-yellow/5 border border-elec-yellow/15">
            <p className="text-[11px] text-white">Test at <span className="font-bold text-elec-yellow">{chemGuidance.dcTestVoltage}V</span> — minimum <span className="font-bold text-elec-yellow">{chemGuidance.minResistance} MΩ</span> for {formData.batteryChemistry}</p>
          </div>
        )}
        <Sub title="Insulation" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="DC IR (MΩ)" required><Input value={formData.dcInsulationResistance} onChange={(e) => onUpdate('dcInsulationResistance', e.target.value)} className={inputCn} placeholder={`≥${chemGuidance.minResistance}`} /></Field>
          <Field label="Test Voltage (V)"><Input value={formData.dcTestVoltage || chemGuidance.dcTestVoltage} onChange={(e) => onUpdate('dcTestVoltage', e.target.value)} className={inputCn} /></Field>
        </div>
        <Sub title="String Voltage" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Measured (V)"><Input value={formData.dcStringVoltage} onChange={(e) => onUpdate('dcStringVoltage', e.target.value)} className={inputCn} placeholder="Measured" /></Field>
          <Field label="Expected (V)"><Input value={formData.dcStringVoltageExpected} onChange={(e) => onUpdate('dcStringVoltageExpected', e.target.value)} className={inputCn} placeholder="Per datasheet" /></Field>
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-white text-xs font-medium">DC polarity verified</Label>
          <div className="flex gap-1.5">
            {[true, false].map((v) => (
              <button key={String(v)} type="button" onClick={() => onUpdate('dcPolarityVerified', v)}
                className={cn('w-14 h-8 rounded-lg text-[11px] font-semibold touch-manipulation transition-all',
                  formData.dcPolarityVerified === v ? (v ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                {v ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>
        <Field label="Battery SoC at Commissioning (%)"><Input type="number" value={formData.batterySoCAtCommissioning} onChange={(e) => onUpdate('batterySoCAtCommissioning', e.target.value)} className={inputCn} placeholder="e.g. 85" /></Field>
      </div>

      {/* Grid Protection Settings */}
      <div className="space-y-4">
        <SectionHeader title="Grid Protection Settings" badge="G98" />
        <div className="rounded-lg p-2.5 bg-elec-yellow/5 border border-elec-yellow/15">
          <p className="text-[11px] text-white">Pre-filled with EREC G98 Issue 5 defaults. Verify against inverter display.</p>
        </div>
        <Sub title="Over-voltage" />
        <div className="grid grid-cols-4 gap-2">
          <Field label="OV1 (V)"><Input value={formData.ovStage1Voltage} onChange={(e) => onUpdate('ovStage1Voltage', e.target.value)} className={inputCn} /></Field>
          <Field label="Time (s)"><Input value={formData.ovStage1Time} onChange={(e) => onUpdate('ovStage1Time', e.target.value)} className={inputCn} /></Field>
          <Field label="OV2 (V)"><Input value={formData.ovStage2Voltage} onChange={(e) => onUpdate('ovStage2Voltage', e.target.value)} className={inputCn} /></Field>
          <Field label="Time (s)"><Input value={formData.ovStage2Time} onChange={(e) => onUpdate('ovStage2Time', e.target.value)} className={inputCn} /></Field>
        </div>
        <Sub title="Under-voltage" />
        <div className="grid grid-cols-4 gap-2">
          <Field label="UV1 (V)"><Input value={formData.uvStage1Voltage} onChange={(e) => onUpdate('uvStage1Voltage', e.target.value)} className={inputCn} /></Field>
          <Field label="Time (s)"><Input value={formData.uvStage1Time} onChange={(e) => onUpdate('uvStage1Time', e.target.value)} className={inputCn} /></Field>
          <Field label="UV2 (V)"><Input value={formData.uvStage2Voltage} onChange={(e) => onUpdate('uvStage2Voltage', e.target.value)} className={inputCn} /></Field>
          <Field label="Time (s)"><Input value={formData.uvStage2Time} onChange={(e) => onUpdate('uvStage2Time', e.target.value)} className={inputCn} /></Field>
        </div>
        <Sub title="Over-frequency" />
        <div className="grid grid-cols-4 gap-2">
          <Field label="OF1 (Hz)"><Input value={formData.ofStage1Freq} onChange={(e) => onUpdate('ofStage1Freq', e.target.value)} className={inputCn} /></Field>
          <Field label="Time (s)"><Input value={formData.ofStage1Time} onChange={(e) => onUpdate('ofStage1Time', e.target.value)} className={inputCn} /></Field>
          <Field label="OF2 (Hz)"><Input value={formData.ofStage2Freq} onChange={(e) => onUpdate('ofStage2Freq', e.target.value)} className={inputCn} /></Field>
          <Field label="Time (s)"><Input value={formData.ofStage2Time} onChange={(e) => onUpdate('ofStage2Time', e.target.value)} className={inputCn} /></Field>
        </div>
        <Sub title="Under-frequency" />
        <div className="grid grid-cols-4 gap-2">
          <Field label="UF1 (Hz)"><Input value={formData.ufStage1Freq} onChange={(e) => onUpdate('ufStage1Freq', e.target.value)} className={inputCn} /></Field>
          <Field label="Time (s)"><Input value={formData.ufStage1Time} onChange={(e) => onUpdate('ufStage1Time', e.target.value)} className={inputCn} /></Field>
          <Field label="UF2 (Hz)"><Input value={formData.ufStage2Freq} onChange={(e) => onUpdate('ufStage2Freq', e.target.value)} className={inputCn} /></Field>
          <Field label="Time (s)"><Input value={formData.ufStage2Time} onChange={(e) => onUpdate('ufStage2Time', e.target.value)} className={inputCn} /></Field>
        </div>
        <Sub title="ROCOF & Reconnection" />
        <div className="grid grid-cols-3 gap-2">
          <Field label="Rate (Hz/s)"><Input value={formData.rocoFRate} onChange={(e) => onUpdate('rocoFRate', e.target.value)} className={inputCn} /></Field>
          <Field label="Time (s)"><Input value={formData.rocoFTime} onChange={(e) => onUpdate('rocoFTime', e.target.value)} className={inputCn} /></Field>
          <Field label="Reconnect (s)"><Input value={formData.reconnectionDelay} onChange={(e) => onUpdate('reconnectionDelay', e.target.value)} className={inputCn} /></Field>
        </div>
      </div>

      {/* DNO Details */}
      <div className="space-y-4">
        <SectionHeader title="DNO Details" />
        <Sub title="Connection" />
        <div className="grid grid-cols-2 gap-3">
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
        <div className="grid grid-cols-2 gap-3">
          <Field label="DNO Reference"><Input value={formData.dnoReference} onChange={(e) => onUpdate('dnoReference', e.target.value)} className={inputCn} /></Field>
          <Field label="Notification Date"><Input type="date" value={formData.dnoNotificationDate} onChange={(e) => onUpdate('dnoNotificationDate', e.target.value)} className={inputCn} /></Field>
        </div>
        <Field label="MPAN"><Input value={formData.mpan} onChange={(e) => onUpdate('mpan', e.target.value)} className={inputCn} placeholder="21-digit MPAN" /></Field>
        <Sub title="Metering" />
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-white text-xs font-medium">Export meter fitted</Label>
            <div className="flex gap-1.5">
              {[true, false].map((v) => (
                <button key={String(v)} type="button" onClick={() => onUpdate('exportMeterFitted', v)}
                  className={cn('w-14 h-8 rounded-lg text-[11px] font-semibold touch-manipulation transition-all',
                    formData.exportMeterFitted === v ? (v ? 'bg-green-500 text-white' : 'bg-white/20 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                  {v ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>
          {formData.exportMeterFitted && <Field label="Export Meter Serial"><Input value={formData.exportMeterSerial} onChange={(e) => onUpdate('exportMeterSerial', e.target.value)} className={inputCn} /></Field>}
          <div className="flex items-center justify-between">
            <Label className="text-white text-xs font-medium">Smart meter fitted</Label>
            <div className="flex gap-1.5">
              {[true, false].map((v) => (
                <button key={String(v)} type="button" onClick={() => onUpdate('smartMeterFitted', v)}
                  className={cn('w-14 h-8 rounded-lg text-[11px] font-semibold touch-manipulation transition-all',
                    formData.smartMeterFitted === v ? (v ? 'bg-green-500 text-white' : 'bg-white/20 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                  {v ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>
          {formData.smartMeterFitted && <Field label="Smart Meter Serial"><Input value={formData.smartMeterSerial} onChange={(e) => onUpdate('smartMeterSerial', e.target.value)} className={inputCn} /></Field>}
          <div className="flex items-center justify-between">
            <Label className="text-white text-xs font-medium">SEG registered</Label>
            <div className="flex gap-1.5">
              {[true, false].map((v) => (
                <button key={String(v)} type="button" onClick={() => onUpdate('segRegistered', v)}
                  className={cn('w-14 h-8 rounded-lg text-[11px] font-semibold touch-manipulation transition-all',
                    formData.segRegistered === v ? (v ? 'bg-green-500 text-white' : 'bg-white/20 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                  {v ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Functional Tests */}
      <div className="space-y-4">
        <SectionHeader title="Functional Tests" badge="Critical" />

        {/* Each test as a full-width row: label + inline pass/fail */}
        <div className="space-y-3">
          {/* Anti-islanding */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-white text-xs font-medium">Anti-islanding *</Label>
              <div className="flex gap-1.5">
                {['pass', 'fail'].map((v) => (
                  <button key={v} type="button" onClick={() => onUpdate('antiIslandingTest', v)}
                    className={cn('w-16 h-9 rounded-lg text-xs font-semibold touch-manipulation transition-all',
                      formData.antiIslandingTest === v ? (v === 'pass' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                    {v === 'pass' ? 'Pass' : 'Fail'}
                  </button>
                ))}
              </div>
            </div>
            <Field label="Method"><Input value={formData.antiIslandingMethod} onChange={(e) => onUpdate('antiIslandingMethod', e.target.value)} className={inputCn} placeholder="Frequency shift" /></Field>
          </div>

          {/* Charge */}
          <div className="flex items-center justify-between">
            <Label className="text-white text-xs font-medium">Charge Test *</Label>
            <div className="flex gap-1.5">
              {['pass', 'fail'].map((v) => (
                <button key={v} type="button" onClick={() => onUpdate('chargeTest', v)}
                  className={cn('w-16 h-9 rounded-lg text-xs font-semibold touch-manipulation transition-all',
                    formData.chargeTest === v ? (v === 'pass' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                  {v === 'pass' ? 'Pass' : 'Fail'}
                </button>
              ))}
            </div>
          </div>

          {/* Discharge */}
          <div className="flex items-center justify-between">
            <Label className="text-white text-xs font-medium">Discharge Test *</Label>
            <div className="flex gap-1.5">
              {['pass', 'fail'].map((v) => (
                <button key={v} type="button" onClick={() => onUpdate('dischargeTest', v)}
                  className={cn('w-16 h-9 rounded-lg text-xs font-semibold touch-manipulation transition-all',
                    formData.dischargeTest === v ? (v === 'pass' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                  {v === 'pass' ? 'Pass' : 'Fail'}
                </button>
              ))}
            </div>
          </div>

          {/* EPS / Backup */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-white text-xs font-medium">EPS / Backup</Label>
              <div className="flex gap-1.5">
                {['pass', 'fail', ''].map((v) => (
                  <button key={v || 'na'} type="button" onClick={() => onUpdate('epsTest', v)}
                    className={cn('w-14 h-9 rounded-lg text-xs font-semibold touch-manipulation transition-all',
                      formData.epsTest === v ? (v === 'pass' ? 'bg-green-500 text-white' : v === 'fail' ? 'bg-red-500 text-white' : 'bg-white/20 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                    {v === 'pass' ? 'Pass' : v === 'fail' ? 'Fail' : 'N/A'}
                  </button>
                ))}
              </div>
            </div>
            {formData.epsTest === 'pass' && <Field label="Switchover Time (ms)"><Input value={formData.epsSwitchoverTime} onChange={(e) => onUpdate('epsSwitchoverTime', e.target.value)} className={inputCn} placeholder="e.g. 10" /></Field>}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-white text-xs font-medium">Monitoring confirmed</Label>
          <div className="flex gap-1.5">
            {[true, false].map((v) => (
              <button key={String(v)} type="button" onClick={() => onUpdate('monitoringConfirmed', v)}
                className={cn('w-14 h-8 rounded-lg text-[11px] font-semibold touch-manipulation transition-all',
                  formData.monitoringConfirmed === v ? (v ? 'bg-green-500 text-white' : 'bg-white/20 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                {v ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>

        {/* Additional functional tests */}
        <div className="flex items-center justify-between">
          <Label className="text-white text-xs font-medium">Emergency Shutdown *</Label>
          <div className="flex gap-1.5">
            {['pass', 'fail'].map((v) => (
              <button key={v} type="button" onClick={() => onUpdate('emergencyShutdownTest', v)}
                className={cn('w-16 h-9 rounded-lg text-xs font-semibold touch-manipulation transition-all',
                  formData.emergencyShutdownTest === v ? (v === 'pass' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                {v === 'pass' ? 'Pass' : 'Fail'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-white text-xs font-medium">BMS Operational *</Label>
          <div className="flex gap-1.5">
            {['pass', 'fail'].map((v) => (
              <button key={v} type="button" onClick={() => onUpdate('bmsOperationalTest', v)}
                className={cn('w-16 h-9 rounded-lg text-xs font-semibold touch-manipulation transition-all',
                  formData.bmsOperationalTest === v ? (v === 'pass' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                {v === 'pass' ? 'Pass' : 'Fail'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label className="text-white text-xs font-medium">Thermal Monitoring</Label>
          <div className="flex gap-1.5">
            {['pass', 'fail'].map((v) => (
              <button key={v} type="button" onClick={() => onUpdate('thermalMonitoringTest', v)}
                className={cn('w-16 h-9 rounded-lg text-xs font-semibold touch-manipulation transition-all',
                  formData.thermalMonitoringTest === v ? (v === 'pass' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                {v === 'pass' ? 'Pass' : 'Fail'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Manufacturer Commissioning */}
      <div className="space-y-4">
        <SectionHeader title="Manufacturer Commissioning" />

        <div className="flex items-center justify-between">
          <Label className="text-white text-xs font-medium">Portal Registration</Label>
          <div className="flex gap-1.5">
            {[true, false].map((v) => (
              <button key={String(v)} type="button" onClick={() => onUpdate('portalRegistered', v)}
                className={cn('w-16 h-9 rounded-lg text-xs font-semibold touch-manipulation transition-all',
                  formData.portalRegistered === v ? (v ? 'bg-green-500 text-white' : 'bg-white/20 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                {v ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
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
          <Label className="text-white text-xs font-medium">Cloud Monitoring</Label>
          <div className="flex gap-1.5">
            {[true, false].map((v) => (
              <button key={String(v)} type="button" onClick={() => onUpdate('cloudMonitoringWorking', v)}
                className={cn('w-16 h-9 rounded-lg text-xs font-semibold touch-manipulation transition-all',
                  formData.cloudMonitoringWorking === v ? (v ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                {v ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Label className="text-white text-xs font-medium">Firmware Current</Label>
          <div className="flex gap-1.5">
            {[true, false].map((v) => (
              <button key={String(v)} type="button" onClick={() => onUpdate('firmwaresCurrent', v)}
                className={cn('w-16 h-9 rounded-lg text-xs font-semibold touch-manipulation transition-all',
                  formData.firmwaresCurrent === v ? (v ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                {v ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
