import { useState, useMemo } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Zap, Shield, Cable, Flame, ChevronUp, ChevronDown, AlertTriangle } from 'lucide-react';
import { useBESSSmartForm } from '@/hooks/inspection/useBESSSmartForm';

const inputCn = 'h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500';
const selectTriggerCn = 'h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2';
const selectContentCn = 'z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground';
const checkboxCn = 'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';

interface SectionHeaderProps { title: string; icon: React.ReactNode; isOpen: boolean; color: string; subtitle?: string }
const SectionHeader = ({ title, icon, isOpen, color, subtitle }: SectionHeaderProps) => (
  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-white/5 transition-colors rounded-t-xl">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-11 rounded-xl flex items-center justify-center bg-${color}/15`}>{icon}</div>
      <div className="text-left"><h3 className="text-base font-semibold text-foreground">{title}</h3>{subtitle && <span className="text-xs text-white">{subtitle}</span>}</div>
    </div>
    {isOpen ? <ChevronUp className="h-5 w-5 text-white" /> : <ChevronDown className="h-5 w-5 text-white" />}
  </CollapsibleTrigger>
);

interface Props { formData: any; onUpdate: (field: string, value: any) => void }

export default function BESSElectricalSafety({ formData, onUpdate }: Props) {
  const [dcOpen, setDcOpen] = useState(true);
  const [earthOpen, setEarthOpen] = useState(true);
  const [acOpen, setAcOpen] = useState(true);
  const [safetyOpen, setSafetyOpen] = useState(true);

  const { getPMEGuidance, getChemistryGuidance } = useBESSSmartForm();

  const inverterHasGalvanicIsolation = formData.dcEarthingMethod === 'galvanic-isolation';
  const pmeGuidance = useMemo(() => getPMEGuidance(formData.earthingArrangement, inverterHasGalvanicIsolation), [formData.earthingArrangement, inverterHasGalvanicIsolation, getPMEGuidance]);
  const chemGuidance = useMemo(() => getChemistryGuidance(formData.batteryChemistry), [formData.batteryChemistry, getChemistryGuidance]);

  return (
    <div className="space-y-3">
      {/* DC Circuit */}
      <div className="eicr-section-card">
        <Collapsible open={dcOpen} onOpenChange={setDcOpen}>
          <SectionHeader title="DC Circuit Details" icon={<Cable className="h-5 w-5 text-amber-400" />} isOpen={dcOpen} color="amber-500" subtitle="Battery to inverter wiring" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">DC Cable Type</Label><Input value={formData.dcCableType} onChange={(e) => onUpdate('dcCableType', e.target.value)} className={inputCn} placeholder="e.g. H07RN-F, Solar DC" /></div>
                <div className="space-y-2"><Label className="text-xs text-white">CSA (mm²)</Label><Input type="number" step="0.5" value={formData.dcCableCSA} onChange={(e) => onUpdate('dcCableCSA', e.target.value)} className={inputCn} placeholder="e.g. 6" /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Length (m)</Label><Input type="number" value={formData.dcCableLength} onChange={(e) => onUpdate('dcCableLength', e.target.value)} className={inputCn} /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">DC Protection Type</Label><Input value={formData.dcProtectionType} onChange={(e) => onUpdate('dcProtectionType', e.target.value)} className={inputCn} placeholder="e.g. DC MCB, Fuse" /></div>
                <div className="space-y-2"><Label className="text-xs text-white">DC Protection Rating (A)</Label><Input type="number" value={formData.dcProtectionRating} onChange={(e) => onUpdate('dcProtectionRating', e.target.value)} className={inputCn} /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">DC Isolator Location</Label><Input value={formData.dcIsolatorLocation} onChange={(e) => onUpdate('dcIsolatorLocation', e.target.value)} className={inputCn} placeholder="e.g. Adjacent to battery" /></div>
                <div className="space-y-2"><Label className="text-xs text-white">DC Isolator Rating (A)</Label><Input type="number" value={formData.dcIsolatorRating} onChange={(e) => onUpdate('dcIsolatorRating', e.target.value)} className={inputCn} /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">DC SPD Type</Label><Input value={formData.dcSPDType} onChange={(e) => onUpdate('dcSPDType', e.target.value)} className={inputCn} placeholder="e.g. Type 2" /></div>
                <div className="space-y-2"><Label className="text-xs text-white">DC SPD Manufacturer</Label><Input value={formData.dcSPDManufacturer} onChange={(e) => onUpdate('dcSPDManufacturer', e.target.value)} className={inputCn} /></div>
              </div>
              <div className="space-y-2"><Label className="text-xs text-white">DC Earth Fault Protection Method</Label><Input value={formData.dcEarthFaultMethod} onChange={(e) => onUpdate('dcEarthFaultMethod', e.target.value)} className={inputCn} placeholder="e.g. RCD, IMD, galvanic isolation" /></div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Earthing Assessment */}
      <div className="eicr-section-card">
        <Collapsible open={earthOpen} onOpenChange={setEarthOpen}>
          <SectionHeader title="Earthing Assessment" icon={<Shield className="h-5 w-5 text-red-400" />} isOpen={earthOpen} color="red-500" subtitle="Critical for BESS — PME considerations" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-white">Earthing Arrangement *</Label>
                  <Select value={formData.earthingArrangement} onValueChange={(v) => onUpdate('earthingArrangement', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="TN-S">TN-S</SelectItem>
                      <SelectItem value="TN-C-S">TN-C-S (PME)</SelectItem>
                      <SelectItem value="TT">TT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-white">DC Earthing Method</Label>
                  <Select value={formData.dcEarthingMethod} onValueChange={(v) => onUpdate('dcEarthingMethod', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="galvanic-isolation">Galvanic isolation (transformer)</SelectItem>
                      <SelectItem value="separate-earth-electrode">Separate earth electrode</SelectItem>
                      <SelectItem value="it-with-imd">IT system with IMD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* PME Decision Tree */}
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
                          <li key={i} className="text-xs text-white flex items-start gap-1.5">
                            <span className="text-red-400 font-bold mt-0.5">{i + 1}.</span> {opt}
                          </li>
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
                <div className="space-y-2"><Label className="text-xs text-white">Earth Electrode Resistance (Ω)</Label><Input type="number" step="0.1" value={formData.earthElectrodeResistance} onChange={(e) => onUpdate('earthElectrodeResistance', e.target.value)} className={inputCn} placeholder="e.g. 21.5" /></div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* AC Circuit */}
      <div className="eicr-section-card">
        <Collapsible open={acOpen} onOpenChange={setAcOpen}>
          <SectionHeader title="AC Circuit Details" icon={<Zap className="h-5 w-5 text-elec-yellow" />} isOpen={acOpen} color="elec-yellow" subtitle="Inverter to consumer unit" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">AC Cable Type *</Label><Input value={formData.acCableType} onChange={(e) => onUpdate('acCableType', e.target.value)} className={inputCn} placeholder="e.g. 6242Y, SWA" /></div>
                <div className="space-y-2"><Label className="text-xs text-white">CSA (mm²)</Label><Input type="number" step="0.5" value={formData.acCableCSA} onChange={(e) => onUpdate('acCableCSA', e.target.value)} className={inputCn} placeholder="e.g. 6" /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Length (m)</Label><Input type="number" value={formData.acCableLength} onChange={(e) => onUpdate('acCableLength', e.target.value)} className={inputCn} /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-white">Protection Device</Label>
                  <Select value={formData.acProtectionType} onValueChange={(v) => onUpdate('acProtectionType', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="MCB">MCB</SelectItem>
                      <SelectItem value="RCBO">RCBO</SelectItem>
                      <SelectItem value="MCCB">MCCB</SelectItem>
                      <SelectItem value="fuse">Fuse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label className="text-xs text-white">Rating (A)</Label><Input type="number" value={formData.acProtectionRating} onChange={(e) => onUpdate('acProtectionRating', e.target.value)} className={inputCn} /></div>
                <div className="space-y-2">
                  <Label className="text-xs text-white">Curve</Label>
                  <Select value={formData.acProtectionCurve} onValueChange={(v) => onUpdate('acProtectionCurve', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="B">Type B</SelectItem>
                      <SelectItem value="C">Type C</SelectItem>
                      <SelectItem value="D">Type D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-white">RCD Type</Label>
                  <Select value={formData.rcdType} onValueChange={(v) => onUpdate('rcdType', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="Type A">Type A</SelectItem>
                      <SelectItem value="Type B">Type B</SelectItem>
                      <SelectItem value="Type F">Type F</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label className="text-xs text-white">RCD Rating (mA)</Label><Input type="number" value={formData.rcdRating} onChange={(e) => onUpdate('rcdRating', e.target.value)} className={inputCn} placeholder="30" /></div>
              </div>
              <div className="space-y-2"><Label className="text-xs text-white">AC Isolator Location</Label><Input value={formData.acIsolatorLocation} onChange={(e) => onUpdate('acIsolatorLocation', e.target.value)} className={inputCn} placeholder="e.g. Consumer unit" /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">AC SPD Type</Label><Input value={formData.acSPDType} onChange={(e) => onUpdate('acSPDType', e.target.value)} className={inputCn} placeholder="e.g. Type 2" /></div>
                <div className="space-y-2"><Label className="text-xs text-white">AC SPD Manufacturer</Label><Input value={formData.acSPDManufacturer} onChange={(e) => onUpdate('acSPDManufacturer', e.target.value)} className={inputCn} /></div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Battery Safety */}
      <div className="eicr-section-card">
        <Collapsible open={safetyOpen} onOpenChange={setSafetyOpen}>
          <SectionHeader title="Battery Safety Assessment" icon={<Flame className="h-5 w-5 text-red-400" />} isOpen={safetyOpen} color="red-500" subtitle="Fire safety & ventilation" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              {formData.batteryChemistry && (
                <div className={`rounded-xl p-3 border ${chemGuidance.thermalRunawayRisk === 'high' ? 'bg-red-500/10 border-red-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
                  <p className="text-xs text-white">{chemGuidance.safetyNotes}</p>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Checkbox checked={formData.locationSuitable} onCheckedChange={(v) => onUpdate('locationSuitable', v)} className={checkboxCn} />
                <Label className="text-sm text-white">Location suitability confirmed</Label>
              </div>
              <div className="space-y-2"><Label className="text-xs text-white">Distance from Combustibles (mm)</Label><Input type="number" value={formData.distanceFromCombustibles} onChange={(e) => onUpdate('distanceFromCombustibles', e.target.value)} className={inputCn} placeholder="e.g. 500" /></div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-white">Ventilation</Label>
                  <Select value={formData.ventilation} onValueChange={(v) => onUpdate('ventilation', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="natural">Natural</SelectItem>
                      <SelectItem value="mechanical">Mechanical</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-white">Fire Detection</Label>
                  <Select value={formData.fireDetection} onValueChange={(v) => onUpdate('fireDetection', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="smoke">Smoke detector</SelectItem>
                      <SelectItem value="heat">Heat detector</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-white">Thermal Management</Label>
                  <Select value={formData.thermalManagement} onValueChange={(v) => onUpdate('thermalManagement', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="passive">Passive</SelectItem>
                      <SelectItem value="active-air">Active air cooling</SelectItem>
                      <SelectItem value="liquid">Liquid cooling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Checkbox checked={formData.warningSignageInstalled} onCheckedChange={(v) => onUpdate('warningSignageInstalled', v)} className={checkboxCn} />
                  <Label className="text-sm text-white">Warning signage installed (BS 7671 Reg 514.15)</Label>
                </div>
                {formData.warningSignageInstalled && (
                  <div className="space-y-2 ml-8"><Label className="text-xs text-white">Signage Locations</Label><Input value={formData.warningSignageLocations} onChange={(e) => onUpdate('warningSignageLocations', e.target.value)} className={inputCn} placeholder="e.g. Main intake, CU, battery location" /></div>
                )}
                <div className="flex items-center gap-3">
                  <Checkbox checked={formData.emergencyShutdownProvided} onCheckedChange={(v) => onUpdate('emergencyShutdownProvided', v)} className={checkboxCn} />
                  <Label className="text-sm text-white">Emergency shutdown procedure provided</Label>
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox checked={formData.fireServiceInfoProvided} onCheckedChange={(v) => onUpdate('fireServiceInfoProvided', v)} className={checkboxCn} />
                  <Label className="text-sm text-white">Fire service information sheet provided</Label>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
