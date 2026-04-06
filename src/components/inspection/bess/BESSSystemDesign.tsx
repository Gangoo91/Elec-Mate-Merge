import { useState, useMemo } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Battery, Cpu, Settings, ChevronUp, ChevronDown, AlertTriangle, Info } from 'lucide-react';
import { BATTERY_MANUFACTURERS, INVERTER_MANUFACTURERS } from '@/types/bess';
import { useBESSSmartForm } from '@/hooks/inspection/useBESSSmartForm';

const inputCn = 'h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500';
const selectTriggerCn = 'h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2';
const selectContentCn = 'z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground';
const checkboxCn = 'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';

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

export default function BESSSystemDesign({ formData, onUpdate }: Props) {
  const [batteryOpen, setBatteryOpen] = useState(true);
  const [inverterOpen, setInverterOpen] = useState(true);
  const [configOpen, setConfigOpen] = useState(true);

  const { getChemistryGuidance, getGridConnectionRequirement } = useBESSSmartForm();

  const chemistryGuidance = useMemo(() => getChemistryGuidance(formData.batteryChemistry), [formData.batteryChemistry, getChemistryGuidance]);

  // Auto-calculate total site generation
  const totalGeneration = useMemo(() => {
    const batteryKW = parseFloat(formData.inverterRatedPower) || 0;
    const pvKW = parseFloat(formData.associatedPVCapacity) || 0;
    return Math.round((batteryKW + pvKW) * 100) / 100;
  }, [formData.inverterRatedPower, formData.associatedPVCapacity]);

  const gridReq = useMemo(() => getGridConnectionRequirement(totalGeneration, formData.inverterPhases), [totalGeneration, formData.inverterPhases, getGridConnectionRequirement]);

  return (
    <div className="space-y-3">
      {/* Battery System */}
      <div className="eicr-section-card">
        <Collapsible open={batteryOpen} onOpenChange={setBatteryOpen}>
          <SectionHeader title="Battery System" icon={<Battery className="h-5 w-5 text-green-400" />} isOpen={batteryOpen} color="green-500" subtitle="Battery modules & chemistry" badge="MCS" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-white">Manufacturer *</Label>
                  <Select value={formData.batteryManufacturer} onValueChange={(v) => onUpdate('batteryManufacturer', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select manufacturer..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      {BATTERY_MANUFACTURERS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label className="text-xs text-white">Model *</Label><Input value={formData.batteryModel} onChange={(e) => onUpdate('batteryModel', e.target.value)} className={inputCn} placeholder="e.g. LUNA2000-5-S0" /></div>
              </div>
              <div className="space-y-2"><Label className="text-xs text-white">Serial Number(s) *</Label><Input value={formData.batterySerials} onChange={(e) => onUpdate('batterySerials', e.target.value)} className={inputCn} placeholder="Comma-separated if multiple modules" /></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-white">Chemistry *</Label>
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
                </div>
                <div className="space-y-2"><Label className="text-xs text-white">Usable Capacity (kWh) *</Label><Input type="number" step="0.1" value={formData.usableCapacity} onChange={(e) => onUpdate('usableCapacity', e.target.value)} className={inputCn} placeholder="e.g. 13.5" /></div>
              </div>

              {/* Chemistry guidance banner */}
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
                <div className="space-y-2"><Label className="text-xs text-white">Nominal Voltage (V)</Label><Input type="number" value={formData.nominalVoltage} onChange={(e) => onUpdate('nominalVoltage', e.target.value)} className={inputCn} placeholder="e.g. 51.2" /></div>
                <div className="space-y-2"><Label className="text-xs text-white">No. of Modules</Label><Input type="number" value={formData.numberOfModules} onChange={(e) => onUpdate('numberOfModules', e.target.value)} className={inputCn} placeholder="1" /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Max Charge (kW)</Label><Input type="number" step="0.1" value={formData.maxChargeRate} onChange={(e) => onUpdate('maxChargeRate', e.target.value)} className={inputCn} /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Max Discharge (kW)</Label><Input type="number" step="0.1" value={formData.maxDischargeRate} onChange={(e) => onUpdate('maxDischargeRate', e.target.value)} className={inputCn} /></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-white">Configuration</Label>
                  <Select value={formData.configuration} onValueChange={(v) => onUpdate('configuration', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="single">Single unit</SelectItem>
                      <SelectItem value="parallel">Parallel</SelectItem>
                      <SelectItem value="series-parallel">Series-parallel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label className="text-xs text-white">DoD (%)</Label><Input type="number" value={formData.depthOfDischarge} onChange={(e) => onUpdate('depthOfDischarge', e.target.value)} className={inputCn} placeholder="100" /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Efficiency (%)</Label><Input type="number" step="0.1" value={formData.roundTripEfficiency} onChange={(e) => onUpdate('roundTripEfficiency', e.target.value)} className={inputCn} placeholder="e.g. 95.5" /></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">MCS Product Cert No.</Label><Input value={formData.mcsBatteryProductCert} onChange={(e) => onUpdate('mcsBatteryProductCert', e.target.value)} className={inputCn} /></div>
                <div className="space-y-2"><Label className="text-xs text-white">BMS Firmware</Label><Input value={formData.bmsFirmware} onChange={(e) => onUpdate('bmsFirmware', e.target.value)} className={inputCn} placeholder="e.g. v3.2.1" /></div>
                <div className="flex items-center gap-3 pt-6">
                  <Checkbox checked={formData.iec62619Compliant} onCheckedChange={(v) => onUpdate('iec62619Compliant', v)} className={checkboxCn} />
                  <Label className="text-sm text-white">IEC 62619 compliant</Label>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Inverter/Charger */}
      <div className="eicr-section-card">
        <Collapsible open={inverterOpen} onOpenChange={setInverterOpen}>
          <SectionHeader title="Inverter / Charger" icon={<Cpu className="h-5 w-5 text-blue-400" />} isOpen={inverterOpen} color="blue-500" subtitle="Hybrid or battery inverter" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-white">Manufacturer *</Label>
                  <Select value={formData.inverterManufacturer} onValueChange={(v) => onUpdate('inverterManufacturer', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select manufacturer..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      {INVERTER_MANUFACTURERS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label className="text-xs text-white">Model *</Label><Input value={formData.inverterModel} onChange={(e) => onUpdate('inverterModel', e.target.value)} className={inputCn} placeholder="e.g. SUN2000-5KTL-L1" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">Serial Number *</Label><Input value={formData.inverterSerial} onChange={(e) => onUpdate('inverterSerial', e.target.value)} className={inputCn} /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Rated Power (kW) *</Label><Input type="number" step="0.1" value={formData.inverterRatedPower} onChange={(e) => onUpdate('inverterRatedPower', e.target.value)} className={inputCn} placeholder="e.g. 5.0" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-white">Inverter Type *</Label>
                  <Select value={formData.inverterType} onValueChange={(v) => onUpdate('inverterType', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="hybrid">Hybrid (PV + Battery)</SelectItem>
                      <SelectItem value="ac-coupled">AC-coupled (battery only)</SelectItem>
                      <SelectItem value="dc-coupled">DC-coupled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-white">Phases</Label>
                  <Select value={formData.inverterPhases} onValueChange={(v) => onUpdate('inverterPhases', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="single">Single phase</SelectItem>
                      <SelectItem value="three">Three phase</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label className="text-xs text-white">Firmware Version</Label><Input value={formData.inverterFirmware} onChange={(e) => onUpdate('inverterFirmware', e.target.value)} className={inputCn} /></div>
              </div>
              <div className="space-y-2"><Label className="text-xs text-white">MCS Product Cert No.</Label><Input value={formData.mcsInverterProductCert} onChange={(e) => onUpdate('mcsInverterProductCert', e.target.value)} className={inputCn} /></div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* System Configuration */}
      <div className="eicr-section-card">
        <Collapsible open={configOpen} onOpenChange={setConfigOpen}>
          <SectionHeader title="System Configuration" icon={<Settings className="h-5 w-5 text-purple-400" />} isOpen={configOpen} color="purple-500" subtitle="Operating mode & limits" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-white">Coupling Type *</Label>
                  <Select value={formData.couplingType} onValueChange={(v) => onUpdate('couplingType', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="AC">AC-coupled</SelectItem>
                      <SelectItem value="DC">DC-coupled</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-white">Operating Mode</Label>
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
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">Charge Limit (kW)</Label><Input type="number" step="0.1" value={formData.chargeRateLimit} onChange={(e) => onUpdate('chargeRateLimit', e.target.value)} className={inputCn} /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Discharge Limit (kW)</Label><Input type="number" step="0.1" value={formData.dischargeRateLimit} onChange={(e) => onUpdate('dischargeRateLimit', e.target.value)} className={inputCn} /></div>
                <div className="space-y-2"><Label className="text-xs text-white">DoD Limit (%)</Label><Input type="number" value={formData.dodLimit} onChange={(e) => onUpdate('dodLimit', e.target.value)} className={inputCn} /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Backup Reserve (%)</Label><Input type="number" value={formData.backupReserve} onChange={(e) => onUpdate('backupReserve', e.target.value)} className={inputCn} /></div>
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
                {formData.exportLimited && (
                  <div className="space-y-2 ml-8"><Label className="text-xs text-white">Export Limit (kW)</Label><Input type="number" step="0.1" value={formData.exportLimit} onChange={(e) => onUpdate('exportLimit', e.target.value)} className={inputCn} /></div>
                )}
              </div>

              {/* Auto G98/G99 determination */}
              <div className="space-y-2">
                <Label className="text-xs text-white">Total Site Generation Capacity (kW)</Label>
                <Input type="number" step="0.01" value={formData.totalSiteGeneration || totalGeneration || ''} onChange={(e) => onUpdate('totalSiteGeneration', e.target.value)} className={inputCn} placeholder={totalGeneration > 0 ? `Auto: ${totalGeneration}kW` : 'Enter total capacity'} />
              </div>

              {/* G98/G99 banner */}
              {(parseFloat(formData.totalSiteGeneration) > 0 || totalGeneration > 0) && (
                <div className={`rounded-xl p-3 border ${gridReq.warning ? 'bg-amber-500/10 border-amber-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
                  <p className={`text-sm font-semibold ${gridReq.warning ? 'text-amber-400' : 'text-green-400'}`}>{gridReq.message}</p>
                  <p className="text-xs text-white mt-1">{gridReq.details}</p>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
