import { useState, useMemo } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Gauge, Battery, Radio, Globe, Wifi, ChevronUp, ChevronDown, CheckCircle2, XCircle } from 'lucide-react';
import { useBESSSmartForm } from '@/hooks/inspection/useBESSSmartForm';

const inputCn = 'h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500';
const selectTriggerCn = 'h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2';
const selectContentCn = 'z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground';
const checkboxCn = 'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';

const PassFailSelect = ({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) => (
  <div className="space-y-2">
    <Label className="text-xs text-white">{label}</Label>
    <div className="flex gap-2">
      {['pass', 'fail'].map((v) => (
        <button key={v} type="button" onClick={() => onChange(v)}
          className={`flex-1 h-11 rounded-lg text-sm font-semibold touch-manipulation transition-all flex items-center justify-center gap-1.5 ${value === v ? (v === 'pass' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]'}`}>
          {v === 'pass' ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          {v === 'pass' ? 'Pass' : 'Fail'}
        </button>
      ))}
    </div>
  </div>
);

interface SectionHeaderProps { title: string; icon: React.ReactNode; isOpen: boolean; color: string; subtitle?: string; badge?: string }
const SectionHeader = ({ title, icon, isOpen, color, subtitle, badge }: SectionHeaderProps) => (
  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-white/5 transition-colors rounded-t-xl">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-11 rounded-xl flex items-center justify-center bg-${color}/15`}>{icon}</div>
      <div className="text-left">
        <h3 className="text-base font-semibold text-foreground flex items-center gap-2">{title}
          {badge && <span className="text-[10px] font-bold text-elec-yellow bg-elec-yellow/10 border border-elec-yellow/20 px-2 py-0.5 rounded">{badge}</span>}
        </h3>
        {subtitle && <span className="text-xs text-white">{subtitle}</span>}
      </div>
    </div>
    {isOpen ? <ChevronUp className="h-5 w-5 text-white" /> : <ChevronDown className="h-5 w-5 text-white" />}
  </CollapsibleTrigger>
);

interface Props { formData: any; onUpdate: (field: string, value: any) => void }

export default function BESSTestResults({ formData, onUpdate }: Props) {
  const [acTestOpen, setAcTestOpen] = useState(true);
  const [dcTestOpen, setDcTestOpen] = useState(true);
  const [gridOpen, setGridOpen] = useState(true);
  const [dnoOpen, setDnoOpen] = useState(true);
  const [funcOpen, setFuncOpen] = useState(true);
  const [mfgOpen, setMfgOpen] = useState(true);

  const { getChemistryGuidance } = useBESSSmartForm();
  const chemGuidance = useMemo(() => getChemistryGuidance(formData.batteryChemistry), [formData.batteryChemistry, getChemistryGuidance]);

  return (
    <div className="space-y-3">
      {/* AC Test Results */}
      <div className="eicr-section-card">
        <Collapsible open={acTestOpen} onOpenChange={setAcTestOpen}>
          <SectionHeader title="AC Test Results" icon={<Gauge className="h-5 w-5 text-elec-yellow" />} isOpen={acTestOpen} color="elec-yellow" subtitle="Standard BS 7671 tests" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">Ze (Ω) *</Label><Input value={formData.ze} onChange={(e) => onUpdate('ze', e.target.value)} className={inputCn} placeholder="e.g. 0.35" /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Zs (Ω)</Label><Input value={formData.zs} onChange={(e) => onUpdate('zs', e.target.value)} className={inputCn} placeholder="e.g. 0.72" /></div>
                <div className="space-y-2"><Label className="text-xs text-white">R1+R2 (Ω)</Label><Input value={formData.r1r2} onChange={(e) => onUpdate('r1r2', e.target.value)} className={inputCn} placeholder="e.g. 0.37" /></div>
                <div className="space-y-2"><Label className="text-xs text-white">R2 (Ω)</Label><Input value={formData.r2} onChange={(e) => onUpdate('r2', e.target.value)} className={inputCn} placeholder="e.g. 0.18" /></div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">AC IR (MΩ) *</Label><Input value={formData.acInsulationResistance} onChange={(e) => onUpdate('acInsulationResistance', e.target.value)} className={inputCn} placeholder="≥1.0" /></div>
                <div className="space-y-2">
                  <Label className="text-xs text-white">Polarity</Label>
                  <Select value={formData.acPolarity} onValueChange={(v) => onUpdate('acPolarity', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="correct">Correct</SelectItem>
                      <SelectItem value="incorrect">Incorrect</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label className="text-xs text-white">PSCC (kA)</Label><Input value={formData.pscc} onChange={(e) => onUpdate('pscc', e.target.value)} className={inputCn} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">RCD @ Idn (ms)</Label><Input value={formData.rcdTripTimeIdn} onChange={(e) => onUpdate('rcdTripTimeIdn', e.target.value)} className={inputCn} placeholder="≤300" /></div>
                <div className="space-y-2"><Label className="text-xs text-white">RCD @ 5×Idn (ms)</Label><Input value={formData.rcdTripTime5xIdn} onChange={(e) => onUpdate('rcdTripTime5xIdn', e.target.value)} className={inputCn} placeholder="≤40" /></div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/[0.06]">
                <div className="space-y-2"><Label className="text-xs text-white">Instrument Make</Label><Input value={formData.testInstrumentMake} onChange={(e) => onUpdate('testInstrumentMake', e.target.value)} className={inputCn} placeholder="e.g. Megger" /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Model</Label><Input value={formData.testInstrumentModel} onChange={(e) => onUpdate('testInstrumentModel', e.target.value)} className={inputCn} placeholder="e.g. MFT1741" /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Serial No.</Label><Input value={formData.testInstrumentSerial} onChange={(e) => onUpdate('testInstrumentSerial', e.target.value)} className={inputCn} /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Cal. Date</Label><Input type="date" value={formData.testInstrumentCalDate} onChange={(e) => onUpdate('testInstrumentCalDate', e.target.value)} className={inputCn} /></div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* DC Test Results */}
      <div className="eicr-section-card">
        <Collapsible open={dcTestOpen} onOpenChange={setDcTestOpen}>
          <SectionHeader title="DC Test Results" icon={<Battery className="h-5 w-5 text-green-400" />} isOpen={dcTestOpen} color="green-500" subtitle="Battery circuit specific tests" badge="BESS" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              {formData.batteryChemistry && (
                <div className="rounded-xl p-2.5 bg-white/[0.04] border border-white/[0.08]">
                  <p className="text-[11px] text-white">Test at <span className="font-bold text-elec-yellow">{chemGuidance.dcTestVoltage}V</span> — minimum <span className="font-bold text-elec-yellow">{chemGuidance.minResistance}MΩ</span> for {formData.batteryChemistry} chemistry</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">DC IR (MΩ) *</Label><Input value={formData.dcInsulationResistance} onChange={(e) => onUpdate('dcInsulationResistance', e.target.value)} className={inputCn} placeholder={`≥${chemGuidance.minResistance}`} /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Test Voltage (V)</Label><Input value={formData.dcTestVoltage || chemGuidance.dcTestVoltage} onChange={(e) => onUpdate('dcTestVoltage', e.target.value)} className={inputCn} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">DC String Voltage (V)</Label><Input value={formData.dcStringVoltage} onChange={(e) => onUpdate('dcStringVoltage', e.target.value)} className={inputCn} placeholder="Measured" /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Expected Voltage (V)</Label><Input value={formData.dcStringVoltageExpected} onChange={(e) => onUpdate('dcStringVoltageExpected', e.target.value)} className={inputCn} placeholder="Per datasheet" /></div>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox checked={formData.dcPolarityVerified} onCheckedChange={(v) => onUpdate('dcPolarityVerified', v)} className={checkboxCn} />
                <Label className="text-sm text-white">DC polarity verified correct</Label>
              </div>
              <div className="space-y-2"><Label className="text-xs text-white">Battery SoC at Commissioning (%)</Label><Input type="number" value={formData.batterySoCAtCommissioning} onChange={(e) => onUpdate('batterySoCAtCommissioning', e.target.value)} className={inputCn} placeholder="e.g. 85" /></div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Grid Protection Settings — Pre-filled G98 */}
      <div className="eicr-section-card">
        <Collapsible open={gridOpen} onOpenChange={setGridOpen}>
          <SectionHeader title="Grid Protection Settings" icon={<Radio className="h-5 w-5 text-purple-400" />} isOpen={gridOpen} color="purple-500" subtitle="G98 defaults pre-filled" badge="G98" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="rounded-xl p-2.5 bg-purple-500/10 border border-purple-500/20">
                <p className="text-[11px] text-white">Pre-filled with G98 default settings. Verify against inverter display and edit if DNO has specified non-standard values.</p>
              </div>
              {/* Over-voltage */}
              <div><Label className="text-xs text-white font-semibold">Over-voltage</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1.5">
                  <div className="space-y-1"><Label className="text-[10px] text-white">OV1 (V)</Label><Input value={formData.ovStage1Voltage} onChange={(e) => onUpdate('ovStage1Voltage', e.target.value)} className={inputCn} /></div>
                  <div className="space-y-1"><Label className="text-[10px] text-white">OV1 Time (s)</Label><Input value={formData.ovStage1Time} onChange={(e) => onUpdate('ovStage1Time', e.target.value)} className={inputCn} /></div>
                  <div className="space-y-1"><Label className="text-[10px] text-white">OV2 (V)</Label><Input value={formData.ovStage2Voltage} onChange={(e) => onUpdate('ovStage2Voltage', e.target.value)} className={inputCn} /></div>
                  <div className="space-y-1"><Label className="text-[10px] text-white">OV2 Time (s)</Label><Input value={formData.ovStage2Time} onChange={(e) => onUpdate('ovStage2Time', e.target.value)} className={inputCn} /></div>
                </div>
              </div>
              {/* Under-voltage */}
              <div><Label className="text-xs text-white font-semibold">Under-voltage</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1.5">
                  <div className="space-y-1"><Label className="text-[10px] text-white">UV1 (V)</Label><Input value={formData.uvStage1Voltage} onChange={(e) => onUpdate('uvStage1Voltage', e.target.value)} className={inputCn} /></div>
                  <div className="space-y-1"><Label className="text-[10px] text-white">UV1 Time (s)</Label><Input value={formData.uvStage1Time} onChange={(e) => onUpdate('uvStage1Time', e.target.value)} className={inputCn} /></div>
                  <div className="space-y-1"><Label className="text-[10px] text-white">UV2 (V)</Label><Input value={formData.uvStage2Voltage} onChange={(e) => onUpdate('uvStage2Voltage', e.target.value)} className={inputCn} /></div>
                  <div className="space-y-1"><Label className="text-[10px] text-white">UV2 Time (s)</Label><Input value={formData.uvStage2Time} onChange={(e) => onUpdate('uvStage2Time', e.target.value)} className={inputCn} /></div>
                </div>
              </div>
              {/* Over-frequency */}
              <div><Label className="text-xs text-white font-semibold">Over-frequency</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1.5">
                  <div className="space-y-1"><Label className="text-[10px] text-white">OF1 (Hz)</Label><Input value={formData.ofStage1Freq} onChange={(e) => onUpdate('ofStage1Freq', e.target.value)} className={inputCn} /></div>
                  <div className="space-y-1"><Label className="text-[10px] text-white">OF1 Time (s)</Label><Input value={formData.ofStage1Time} onChange={(e) => onUpdate('ofStage1Time', e.target.value)} className={inputCn} /></div>
                  <div className="space-y-1"><Label className="text-[10px] text-white">OF2 (Hz)</Label><Input value={formData.ofStage2Freq} onChange={(e) => onUpdate('ofStage2Freq', e.target.value)} className={inputCn} /></div>
                  <div className="space-y-1"><Label className="text-[10px] text-white">OF2 Time (s)</Label><Input value={formData.ofStage2Time} onChange={(e) => onUpdate('ofStage2Time', e.target.value)} className={inputCn} /></div>
                </div>
              </div>
              {/* Under-frequency */}
              <div><Label className="text-xs text-white font-semibold">Under-frequency</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1.5">
                  <div className="space-y-1"><Label className="text-[10px] text-white">UF1 (Hz)</Label><Input value={formData.ufStage1Freq} onChange={(e) => onUpdate('ufStage1Freq', e.target.value)} className={inputCn} /></div>
                  <div className="space-y-1"><Label className="text-[10px] text-white">UF1 Time (s)</Label><Input value={formData.ufStage1Time} onChange={(e) => onUpdate('ufStage1Time', e.target.value)} className={inputCn} /></div>
                  <div className="space-y-1"><Label className="text-[10px] text-white">UF2 (Hz)</Label><Input value={formData.ufStage2Freq} onChange={(e) => onUpdate('ufStage2Freq', e.target.value)} className={inputCn} /></div>
                  <div className="space-y-1"><Label className="text-[10px] text-white">UF2 Time (s)</Label><Input value={formData.ufStage2Time} onChange={(e) => onUpdate('ufStage2Time', e.target.value)} className={inputCn} /></div>
                </div>
              </div>
              {/* ROCOF & Reconnection */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">ROCOF (Hz/s)</Label><Input value={formData.rocoFRate} onChange={(e) => onUpdate('rocoFRate', e.target.value)} className={inputCn} /></div>
                <div className="space-y-2"><Label className="text-xs text-white">ROCOF Time (s)</Label><Input value={formData.rocoFTime} onChange={(e) => onUpdate('rocoFTime', e.target.value)} className={inputCn} /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Reconnection Delay (s)</Label><Input value={formData.reconnectionDelay} onChange={(e) => onUpdate('reconnectionDelay', e.target.value)} className={inputCn} /></div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* DNO Details */}
      <div className="eicr-section-card">
        <Collapsible open={dnoOpen} onOpenChange={setDnoOpen}>
          <SectionHeader title="DNO Details" icon={<Globe className="h-5 w-5 text-blue-400" />} isOpen={dnoOpen} color="blue-500" subtitle="Grid connection notification" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-white">Connection Type *</Label>
                  <Select value={formData.gridConnectionType} onValueChange={(v) => onUpdate('gridConnectionType', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="G98">G98 (≤16A/phase — notify only)</SelectItem>
                      <SelectItem value="G99">G99 (>16A/phase — approval required)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label className="text-xs text-white">DNO Name</Label><Input value={formData.dnoName} onChange={(e) => onUpdate('dnoName', e.target.value)} className={inputCn} placeholder="e.g. UK Power Networks" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">DNO Reference</Label><Input value={formData.dnoReference} onChange={(e) => onUpdate('dnoReference', e.target.value)} className={inputCn} /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Notification Date</Label><Input type="date" value={formData.dnoNotificationDate} onChange={(e) => onUpdate('dnoNotificationDate', e.target.value)} className={inputCn} /></div>
              </div>
              <div className="space-y-2"><Label className="text-xs text-white">MPAN</Label><Input value={formData.mpan} onChange={(e) => onUpdate('mpan', e.target.value)} className={inputCn} placeholder="21-digit MPAN" /></div>
              <div className="flex items-center gap-3">
                <Checkbox checked={formData.exportMeterFitted} onCheckedChange={(v) => onUpdate('exportMeterFitted', v)} className={checkboxCn} />
                <Label className="text-sm text-white">Export meter fitted</Label>
              </div>
              {formData.exportMeterFitted && (
                <div className="space-y-2 ml-8"><Label className="text-xs text-white">Export Meter Serial</Label><Input value={formData.exportMeterSerial} onChange={(e) => onUpdate('exportMeterSerial', e.target.value)} className={inputCn} /></div>
              )}
              <div className="flex items-center gap-3">
                <Checkbox checked={formData.smartMeterFitted} onCheckedChange={(v) => onUpdate('smartMeterFitted', v)} className={checkboxCn} />
                <Label className="text-sm text-white">Smart meter fitted</Label>
              </div>
              {formData.smartMeterFitted && (
                <div className="space-y-2 ml-8"><Label className="text-xs text-white">Smart Meter Serial</Label><Input value={formData.smartMeterSerial} onChange={(e) => onUpdate('smartMeterSerial', e.target.value)} className={inputCn} /></div>
              )}
              <div className="flex items-center gap-3">
                <Checkbox checked={formData.segRegistered} onCheckedChange={(v) => onUpdate('segRegistered', v)} className={checkboxCn} />
                <Label className="text-sm text-white">Smart Export Guarantee (SEG) registered</Label>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Functional Tests */}
      <div className="eicr-section-card">
        <Collapsible open={funcOpen} onOpenChange={setFuncOpen}>
          <SectionHeader title="Functional Tests" icon={<CheckCircle2 className="h-5 w-5 text-green-400" />} isOpen={funcOpen} color="green-500" subtitle="Charge, discharge & anti-islanding" badge="Critical" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PassFailSelect value={formData.antiIslandingTest} onChange={(v) => onUpdate('antiIslandingTest', v)} label="Anti-islanding Test *" />
                <div className="space-y-2"><Label className="text-xs text-white">Anti-islanding Method</Label><Input value={formData.antiIslandingMethod} onChange={(e) => onUpdate('antiIslandingMethod', e.target.value)} className={inputCn} placeholder="e.g. Frequency shift" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PassFailSelect value={formData.chargeTest} onChange={(v) => onUpdate('chargeTest', v)} label="Charge Test (Grid/PV → Battery) *" />
                <PassFailSelect value={formData.dischargeTest} onChange={(v) => onUpdate('dischargeTest', v)} label="Discharge Test (Battery → Loads) *" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-white">EPS / Backup Switchover Test</Label>
                  <div className="flex gap-2">
                    {['pass', 'fail', ''].map((v) => (
                      <button key={v || 'na'} type="button" onClick={() => onUpdate('epsTest', v)}
                        className={`flex-1 h-11 rounded-lg text-sm font-semibold touch-manipulation transition-all ${formData.epsTest === v ? (v === 'pass' ? 'bg-green-500 text-white' : v === 'fail' ? 'bg-red-500 text-white' : 'bg-white/20 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]'}`}>
                        {v === 'pass' ? 'Pass' : v === 'fail' ? 'Fail' : 'N/A'}
                      </button>
                    ))}
                  </div>
                </div>
                {formData.epsTest === 'pass' && (
                  <div className="space-y-2"><Label className="text-xs text-white">Switchover Time (ms)</Label><Input value={formData.epsSwitchoverTime} onChange={(e) => onUpdate('epsSwitchoverTime', e.target.value)} className={inputCn} placeholder="e.g. 10" /></div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Checkbox checked={formData.monitoringConfirmed} onCheckedChange={(v) => onUpdate('monitoringConfirmed', v)} className={checkboxCn} />
                <Label className="text-sm text-white">Monitoring system confirmed operational</Label>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Manufacturer Commissioning */}
      <div className="eicr-section-card">
        <Collapsible open={mfgOpen} onOpenChange={setMfgOpen}>
          <SectionHeader title="Manufacturer Commissioning" icon={<Wifi className="h-5 w-5 text-cyan-400" />} isOpen={mfgOpen} color="cyan-500" subtitle="Portal registration & firmware" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3">
                <Checkbox checked={formData.portalRegistered} onCheckedChange={(v) => onUpdate('portalRegistered', v)} className={checkboxCn} />
                <Label className="text-sm text-white">Manufacturer portal/app registration completed</Label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-white">Communication Module</Label>
                  <Select value={formData.commModuleType} onValueChange={(v) => onUpdate('commModuleType', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="wifi">Wi-Fi dongle</SelectItem>
                      <SelectItem value="4g">4G dongle</SelectItem>
                      <SelectItem value="lan">LAN / Ethernet</SelectItem>
                      <SelectItem value="ethernet">Direct Ethernet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label className="text-xs text-white">Comm Module Serial</Label><Input value={formData.commModuleSerial} onChange={(e) => onUpdate('commModuleSerial', e.target.value)} className={inputCn} /></div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Checkbox checked={formData.cloudMonitoringWorking} onCheckedChange={(v) => onUpdate('cloudMonitoringWorking', v)} className={checkboxCn} />
                  <Label className="text-sm text-white">Cloud monitoring confirmed working</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox checked={formData.firmwaresCurrent} onCheckedChange={(v) => onUpdate('firmwaresCurrent', v)} className={checkboxCn} />
                  <Label className="text-sm text-white">All firmware versions confirmed current</Label>
                </div>
              </div>
              <div className="space-y-2"><Label className="text-xs text-white">Manufacturer Commissioning Ref / ID</Label><Input value={formData.manufacturerCommRef} onChange={(e) => onUpdate('manufacturerCommRef', e.target.value)} className={inputCn} placeholder="From manufacturer portal" /></div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
