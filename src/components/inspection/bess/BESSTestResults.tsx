import { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBESSSmartForm } from '@/hooks/inspection/useBESSSmartForm';

const inputCn = 'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';
const selectTriggerCn = 'h-12 touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 data-[state=open]:border-yellow-500';
const selectContentCn = 'z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground';
const checkboxCn = 'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';

const Section = ({ title, accentColor, badge, children }: { title: string; accentColor?: string; badge?: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <div className="border-b border-white/[0.06] pb-1 mb-3">
      <div className={cn('h-[2px] w-full rounded-full bg-gradient-to-r mb-2', accentColor || 'from-elec-yellow to-amber-400')} />
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

const PassFailSelect = ({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) => (
  <div className="space-y-2">
    <Label className="text-white text-xs">{label}</Label>
    <div className="flex gap-2">
      {['pass', 'fail'].map((v) => (
        <button key={v} type="button" onClick={() => onChange(v)}
          className={cn('flex-1 h-12 rounded-lg text-sm font-semibold touch-manipulation transition-all flex items-center justify-center gap-1.5',
            value === v ? (v === 'pass' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
          {v === 'pass' ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
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
    <div className="space-y-5">
      <Section title="AC Test Results" accentColor="from-elec-yellow/40 to-amber-400/20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Field label="Ze (Ω)" required><Input value={formData.ze} onChange={(e) => onUpdate('ze', e.target.value)} className={inputCn} placeholder="e.g. 0.35" /></Field>
          <Field label="Zs (Ω)"><Input value={formData.zs} onChange={(e) => onUpdate('zs', e.target.value)} className={inputCn} placeholder="e.g. 0.72" /></Field>
          <Field label="R1+R2 (Ω)"><Input value={formData.r1r2} onChange={(e) => onUpdate('r1r2', e.target.value)} className={inputCn} placeholder="e.g. 0.37" /></Field>
          <Field label="R2 (Ω)"><Input value={formData.r2} onChange={(e) => onUpdate('r2', e.target.value)} className={inputCn} placeholder="e.g. 0.18" /></Field>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <Field label="AC IR (MΩ)" required><Input value={formData.acInsulationResistance} onChange={(e) => onUpdate('acInsulationResistance', e.target.value)} className={inputCn} placeholder="≥1.0" /></Field>
          <Field label="Polarity">
            <Select value={formData.acPolarity} onValueChange={(v) => onUpdate('acPolarity', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}><SelectItem value="correct">Correct</SelectItem><SelectItem value="incorrect">Incorrect</SelectItem></SelectContent>
            </Select>
          </Field>
          <Field label="PSCC (kA)"><Input value={formData.pscc} onChange={(e) => onUpdate('pscc', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="RCD @ Idn (ms)"><Input value={formData.rcdTripTimeIdn} onChange={(e) => onUpdate('rcdTripTimeIdn', e.target.value)} className={inputCn} placeholder="≤300" /></Field>
          <Field label="RCD @ 5×Idn (ms)"><Input value={formData.rcdTripTime5xIdn} onChange={(e) => onUpdate('rcdTripTime5xIdn', e.target.value)} className={inputCn} placeholder="≤40" /></Field>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/[0.06]">
          <Field label="Instrument Make"><Input value={formData.testInstrumentMake} onChange={(e) => onUpdate('testInstrumentMake', e.target.value)} className={inputCn} placeholder="e.g. Megger" /></Field>
          <Field label="Model"><Input value={formData.testInstrumentModel} onChange={(e) => onUpdate('testInstrumentModel', e.target.value)} className={inputCn} /></Field>
          <Field label="Serial No."><Input value={formData.testInstrumentSerial} onChange={(e) => onUpdate('testInstrumentSerial', e.target.value)} className={inputCn} /></Field>
          <Field label="Cal. Date"><Input type="date" value={formData.testInstrumentCalDate} onChange={(e) => onUpdate('testInstrumentCalDate', e.target.value)} className={inputCn} /></Field>
        </div>
      </Section>

      <Section title="DC Test Results" accentColor="from-green-500/40 to-emerald-400/20" badge="BESS">
        {formData.batteryChemistry && (
          <div className="rounded-xl p-2.5 bg-white/[0.04] border border-white/[0.08]">
            <p className="text-[11px] text-white">Test at <span className="font-bold text-elec-yellow">{chemGuidance.dcTestVoltage}V</span> — minimum <span className="font-bold text-elec-yellow">{chemGuidance.minResistance}MΩ</span> for {formData.batteryChemistry}</p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Field label="DC IR (MΩ)" required><Input value={formData.dcInsulationResistance} onChange={(e) => onUpdate('dcInsulationResistance', e.target.value)} className={inputCn} placeholder={`≥${chemGuidance.minResistance}`} /></Field>
          <Field label="Test Voltage (V)"><Input value={formData.dcTestVoltage || chemGuidance.dcTestVoltage} onChange={(e) => onUpdate('dcTestVoltage', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="DC String Voltage (V)"><Input value={formData.dcStringVoltage} onChange={(e) => onUpdate('dcStringVoltage', e.target.value)} className={inputCn} placeholder="Measured" /></Field>
          <Field label="Expected Voltage (V)"><Input value={formData.dcStringVoltageExpected} onChange={(e) => onUpdate('dcStringVoltageExpected', e.target.value)} className={inputCn} placeholder="Per datasheet" /></Field>
        </div>
        <div className="flex items-center gap-3">
          <Checkbox checked={formData.dcPolarityVerified} onCheckedChange={(v) => onUpdate('dcPolarityVerified', v)} className={checkboxCn} />
          <Label className="text-sm text-white">DC polarity verified correct</Label>
        </div>
        <Field label="Battery SoC at Commissioning (%)"><Input type="number" value={formData.batterySoCAtCommissioning} onChange={(e) => onUpdate('batterySoCAtCommissioning', e.target.value)} className={inputCn} placeholder="e.g. 85" /></Field>
      </Section>

      <Section title="Grid Protection Settings" accentColor="from-purple-500/40 to-indigo-400/20" badge="G98">
        <div className="rounded-xl p-2.5 bg-purple-500/5 border border-purple-500/15 mb-2">
          <p className="text-[11px] text-white">Pre-filled with EREC G98 Issue 5 default settings. Verify against inverter display.</p>
        </div>
        <p className="text-xs font-semibold text-white">Over-voltage</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Field label="OV1 (V)"><Input value={formData.ovStage1Voltage} onChange={(e) => onUpdate('ovStage1Voltage', e.target.value)} className={inputCn} /></Field>
          <Field label="OV1 Time (s)"><Input value={formData.ovStage1Time} onChange={(e) => onUpdate('ovStage1Time', e.target.value)} className={inputCn} /></Field>
          <Field label="OV2 (V)"><Input value={formData.ovStage2Voltage} onChange={(e) => onUpdate('ovStage2Voltage', e.target.value)} className={inputCn} /></Field>
          <Field label="OV2 Time (s)"><Input value={formData.ovStage2Time} onChange={(e) => onUpdate('ovStage2Time', e.target.value)} className={inputCn} /></Field>
        </div>
        <p className="text-xs font-semibold text-white mt-3">Under-voltage</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Field label="UV1 (V)"><Input value={formData.uvStage1Voltage} onChange={(e) => onUpdate('uvStage1Voltage', e.target.value)} className={inputCn} /></Field>
          <Field label="UV1 Time (s)"><Input value={formData.uvStage1Time} onChange={(e) => onUpdate('uvStage1Time', e.target.value)} className={inputCn} /></Field>
          <Field label="UV2 (V)"><Input value={formData.uvStage2Voltage} onChange={(e) => onUpdate('uvStage2Voltage', e.target.value)} className={inputCn} /></Field>
          <Field label="UV2 Time (s)"><Input value={formData.uvStage2Time} onChange={(e) => onUpdate('uvStage2Time', e.target.value)} className={inputCn} /></Field>
        </div>
        <p className="text-xs font-semibold text-white mt-3">Over-frequency</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Field label="OF1 (Hz)"><Input value={formData.ofStage1Freq} onChange={(e) => onUpdate('ofStage1Freq', e.target.value)} className={inputCn} /></Field>
          <Field label="OF1 Time (s)"><Input value={formData.ofStage1Time} onChange={(e) => onUpdate('ofStage1Time', e.target.value)} className={inputCn} /></Field>
          <Field label="OF2 (Hz)"><Input value={formData.ofStage2Freq} onChange={(e) => onUpdate('ofStage2Freq', e.target.value)} className={inputCn} /></Field>
          <Field label="OF2 Time (s)"><Input value={formData.ofStage2Time} onChange={(e) => onUpdate('ofStage2Time', e.target.value)} className={inputCn} /></Field>
        </div>
        <p className="text-xs font-semibold text-white mt-3">Under-frequency</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Field label="UF1 (Hz)"><Input value={formData.ufStage1Freq} onChange={(e) => onUpdate('ufStage1Freq', e.target.value)} className={inputCn} /></Field>
          <Field label="UF1 Time (s)"><Input value={formData.ufStage1Time} onChange={(e) => onUpdate('ufStage1Time', e.target.value)} className={inputCn} /></Field>
          <Field label="UF2 (Hz)"><Input value={formData.ufStage2Freq} onChange={(e) => onUpdate('ufStage2Freq', e.target.value)} className={inputCn} /></Field>
          <Field label="UF2 Time (s)"><Input value={formData.ufStage2Time} onChange={(e) => onUpdate('ufStage2Time', e.target.value)} className={inputCn} /></Field>
        </div>
        <p className="text-xs font-semibold text-white mt-3">ROCOF & Reconnection</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <Field label="ROCOF (Hz/s)"><Input value={formData.rocoFRate} onChange={(e) => onUpdate('rocoFRate', e.target.value)} className={inputCn} /></Field>
          <Field label="ROCOF Time (s)"><Input value={formData.rocoFTime} onChange={(e) => onUpdate('rocoFTime', e.target.value)} className={inputCn} /></Field>
          <Field label="Reconnection (s)"><Input value={formData.reconnectionDelay} onChange={(e) => onUpdate('reconnectionDelay', e.target.value)} className={inputCn} /></Field>
        </div>
      </Section>

      <Section title="DNO Details" accentColor="from-blue-500/40 to-cyan-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Connection Type" required>
            <Select value={formData.gridConnectionType} onValueChange={(v) => onUpdate('gridConnectionType', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}><SelectItem value="G98">G98 (≤16A/phase)</SelectItem><SelectItem value="G99">G99 (>16A/phase)</SelectItem></SelectContent>
            </Select>
          </Field>
          <Field label="DNO Name"><Input value={formData.dnoName} onChange={(e) => onUpdate('dnoName', e.target.value)} className={inputCn} placeholder="e.g. UK Power Networks" /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="DNO Reference"><Input value={formData.dnoReference} onChange={(e) => onUpdate('dnoReference', e.target.value)} className={inputCn} /></Field>
          <Field label="Notification Date"><Input type="date" value={formData.dnoNotificationDate} onChange={(e) => onUpdate('dnoNotificationDate', e.target.value)} className={inputCn} /></Field>
        </div>
        <Field label="MPAN"><Input value={formData.mpan} onChange={(e) => onUpdate('mpan', e.target.value)} className={inputCn} placeholder="21-digit MPAN" /></Field>
        <div className="space-y-2">
          <div className="flex items-center gap-3"><Checkbox checked={formData.exportMeterFitted} onCheckedChange={(v) => onUpdate('exportMeterFitted', v)} className={checkboxCn} /><Label className="text-sm text-white">Export meter fitted</Label></div>
          {formData.exportMeterFitted && <div className="ml-8"><Field label="Export Meter Serial"><Input value={formData.exportMeterSerial} onChange={(e) => onUpdate('exportMeterSerial', e.target.value)} className={inputCn} /></Field></div>}
          <div className="flex items-center gap-3"><Checkbox checked={formData.smartMeterFitted} onCheckedChange={(v) => onUpdate('smartMeterFitted', v)} className={checkboxCn} /><Label className="text-sm text-white">Smart meter fitted</Label></div>
          {formData.smartMeterFitted && <div className="ml-8"><Field label="Smart Meter Serial"><Input value={formData.smartMeterSerial} onChange={(e) => onUpdate('smartMeterSerial', e.target.value)} className={inputCn} /></Field></div>}
          <div className="flex items-center gap-3"><Checkbox checked={formData.segRegistered} onCheckedChange={(v) => onUpdate('segRegistered', v)} className={checkboxCn} /><Label className="text-sm text-white">Smart Export Guarantee (SEG) registered</Label></div>
        </div>
      </Section>

      <Section title="Functional Tests" accentColor="from-green-500/40 to-emerald-400/20" badge="Critical">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <PassFailSelect value={formData.antiIslandingTest} onChange={(v) => onUpdate('antiIslandingTest', v)} label="Anti-islanding Test *" />
          <Field label="Anti-islanding Method"><Input value={formData.antiIslandingMethod} onChange={(e) => onUpdate('antiIslandingMethod', e.target.value)} className={inputCn} placeholder="e.g. Frequency shift" /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <PassFailSelect value={formData.chargeTest} onChange={(v) => onUpdate('chargeTest', v)} label="Charge Test *" />
          <PassFailSelect value={formData.dischargeTest} onChange={(v) => onUpdate('dischargeTest', v)} label="Discharge Test *" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-white text-xs">EPS / Backup Test</Label>
            <div className="flex gap-2">
              {['pass', 'fail', ''].map((v) => (
                <button key={v || 'na'} type="button" onClick={() => onUpdate('epsTest', v)}
                  className={cn('flex-1 h-12 rounded-lg text-sm font-semibold touch-manipulation transition-all',
                    formData.epsTest === v ? (v === 'pass' ? 'bg-green-500 text-white' : v === 'fail' ? 'bg-red-500 text-white' : 'bg-white/20 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                  {v === 'pass' ? 'Pass' : v === 'fail' ? 'Fail' : 'N/A'}
                </button>
              ))}
            </div>
          </div>
          {formData.epsTest === 'pass' && <Field label="Switchover Time (ms)"><Input value={formData.epsSwitchoverTime} onChange={(e) => onUpdate('epsSwitchoverTime', e.target.value)} className={inputCn} placeholder="e.g. 10" /></Field>}
        </div>
        <div className="flex items-center gap-3">
          <Checkbox checked={formData.monitoringConfirmed} onCheckedChange={(v) => onUpdate('monitoringConfirmed', v)} className={checkboxCn} />
          <Label className="text-sm text-white">Monitoring system confirmed operational</Label>
        </div>
      </Section>

      <Section title="Manufacturer Commissioning" accentColor="from-cyan-500/40 to-blue-400/20">
        <div className="flex items-center gap-3">
          <Checkbox checked={formData.portalRegistered} onCheckedChange={(v) => onUpdate('portalRegistered', v)} className={checkboxCn} />
          <Label className="text-sm text-white">Manufacturer portal/app registration completed</Label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Communication Module">
            <Select value={formData.commModuleType} onValueChange={(v) => onUpdate('commModuleType', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="wifi">Wi-Fi dongle</SelectItem><SelectItem value="4g">4G dongle</SelectItem><SelectItem value="lan">LAN / Ethernet</SelectItem><SelectItem value="ethernet">Direct Ethernet</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Comm Module Serial"><Input value={formData.commModuleSerial} onChange={(e) => onUpdate('commModuleSerial', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3"><Checkbox checked={formData.cloudMonitoringWorking} onCheckedChange={(v) => onUpdate('cloudMonitoringWorking', v)} className={checkboxCn} /><Label className="text-sm text-white">Cloud monitoring confirmed working</Label></div>
          <div className="flex items-center gap-3"><Checkbox checked={formData.firmwaresCurrent} onCheckedChange={(v) => onUpdate('firmwaresCurrent', v)} className={checkboxCn} /><Label className="text-sm text-white">All firmware versions confirmed current</Label></div>
        </div>
        <Field label="Manufacturer Commissioning Ref / ID"><Input value={formData.manufacturerCommRef} onChange={(e) => onUpdate('manufacturerCommRef', e.target.value)} className={inputCn} placeholder="From manufacturer portal" /></Field>
      </Section>
    </div>
  );
}
