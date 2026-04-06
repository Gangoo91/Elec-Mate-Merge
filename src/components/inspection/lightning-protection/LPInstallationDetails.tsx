import { useState, useMemo } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, ArrowDown, Globe2, Link, Zap, ChevronUp, ChevronDown, AlertTriangle } from 'lucide-react';
import { useLightningProtectionSmartForm } from '@/hooks/inspection/useLightningProtectionSmartForm';
import { MESH_SIZE } from '@/types/lightning-protection';

const inputCn = 'h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500';
const selectTriggerCn = 'h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2';
const selectContentCn = 'z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground';
const checkboxCn = 'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';

interface SH { title: string; icon: React.ReactNode; isOpen: boolean; color: string; subtitle?: string; badge?: string }
const SectionHeader = ({ title, icon, isOpen, color, subtitle, badge }: SH) => (
  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-white/5 transition-colors rounded-t-xl">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-11 rounded-xl flex items-center justify-center bg-${color}/15`}>{icon}</div>
      <div className="text-left"><h3 className="text-base font-semibold text-foreground flex items-center gap-2">{title}{badge && <span className="text-[10px] font-bold text-elec-yellow bg-elec-yellow/10 border border-elec-yellow/20 px-2 py-0.5 rounded">{badge}</span>}</h3>{subtitle && <span className="text-xs text-white">{subtitle}</span>}</div>
    </div>
    {isOpen ? <ChevronUp className="h-5 w-5 text-white" /> : <ChevronDown className="h-5 w-5 text-white" />}
  </CollapsibleTrigger>
);

interface Props { formData: any; onUpdate: (field: string, value: any) => void }

export default function LPInstallationDetails({ formData, onUpdate }: Props) {
  const [overviewOpen, setOverviewOpen] = useState(true);
  const [airOpen, setAirOpen] = useState(true);
  const [downOpen, setDownOpen] = useState(true);
  const [earthOpen, setEarthOpen] = useState(true);
  const [bondOpen, setBondOpen] = useState(true);
  const [spdOpen, setSpdOpen] = useState(false);

  const { validateDownConductorSpacing } = useLightningProtectionSmartForm();
  const spacingValidation = useMemo(() => validateDownConductorSpacing(formData.downConductorSpacing, formData.lpsClass), [formData.downConductorSpacing, formData.lpsClass, validateDownConductorSpacing]);
  const requiredMesh = formData.lpsClass ? MESH_SIZE[formData.lpsClass] : '';

  const updateBonding = (key: string, value: any) => {
    onUpdate('servicesBonded', { ...formData.servicesBonded, [key]: value });
  };

  return (
    <div className="space-y-3">
      {/* LPS Overview */}
      <div className="eicr-section-card">
        <Collapsible open={overviewOpen} onOpenChange={setOverviewOpen}>
          <SectionHeader title="LPS Overview" icon={<Shield className="h-5 w-5 text-yellow-400" />} isOpen={overviewOpen} color="yellow-500" subtitle="Class, type, age" badge="BS EN 62305" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-white">LPS Class *</Label>
                  <Select value={formData.lpsClass} onValueChange={(v) => onUpdate('lpsClass', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="I">Class I (highest — 20m sphere, 5×5m mesh)</SelectItem>
                      <SelectItem value="II">Class II (30m sphere, 10×10m mesh)</SelectItem>
                      <SelectItem value="III">Class III (45m sphere, 15×15m mesh)</SelectItem>
                      <SelectItem value="IV">Class IV (60m sphere, 20×20m mesh)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-white">LPS Type *</Label>
                  <Select value={formData.lpsType} onValueChange={(v) => onUpdate('lpsType', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="isolated">Isolated (standalone masts/catenary)</SelectItem>
                      <SelectItem value="non-isolated">Non-isolated (building-mounted)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">Original Installation Date</Label><Input type="date" value={formData.originalInstallDate} onChange={(e) => onUpdate('originalInstallDate', e.target.value)} className={`${inputCn} [color-scheme:dark]`} /></div>
                <div className="space-y-2"><Label className="text-xs text-white">System Age (years)</Label><Input type="number" value={formData.systemAge} onChange={(e) => onUpdate('systemAge', e.target.value)} className={inputCn} /></div>
              </div>

              {/* Strike Counter */}
              <div className="flex items-center gap-3">
                <Checkbox checked={formData.strikeCounterFitted} onCheckedChange={(v) => onUpdate('strikeCounterFitted', v)} className={checkboxCn} />
                <Label className="text-sm text-white">Lightning strike counter fitted</Label>
              </div>
              {formData.strikeCounterFitted && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-8">
                  <div className="space-y-2"><Label className="text-xs text-white">Current Reading</Label><Input type="number" value={formData.strikeCounterReading} onChange={(e) => onUpdate('strikeCounterReading', e.target.value)} className={inputCn} placeholder="e.g. 12" /></div>
                  <div className="space-y-2"><Label className="text-xs text-white">Previous Reading</Label><Input type="number" value={formData.strikeCounterPreviousReading} onChange={(e) => onUpdate('strikeCounterPreviousReading', e.target.value)} className={inputCn} placeholder="From last cert" /></div>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Air Termination */}
      <div className="eicr-section-card">
        <Collapsible open={airOpen} onOpenChange={setAirOpen}>
          <SectionHeader title="Air Termination" icon={<Zap className="h-5 w-5 text-amber-400" />} isOpen={airOpen} color="amber-500" subtitle="Rods, mesh, catenary" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-white">Type</Label>
                  <Select value={formData.airTerminationType} onValueChange={(v) => onUpdate('airTerminationType', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="mesh">Mesh conductor</SelectItem>
                      <SelectItem value="rod">Air rods</SelectItem>
                      <SelectItem value="catenary">Catenary wire</SelectItem>
                      <SelectItem value="natural">Natural component</SelectItem>
                      <SelectItem value="combination">Combination</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-white">Material</Label>
                  <Select value={formData.airTerminationMaterial} onValueChange={(v) => onUpdate('airTerminationMaterial', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="copper-tape">Copper tape</SelectItem>
                      <SelectItem value="copper-cable">Copper cable</SelectItem>
                      <SelectItem value="aluminium">Aluminium</SelectItem>
                      <SelectItem value="stainless-steel">Stainless steel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">Mesh Size (m × m)</Label><Input value={formData.meshSize} onChange={(e) => onUpdate('meshSize', e.target.value)} className={inputCn} placeholder={requiredMesh ? `Required: ${requiredMesh}m` : 'e.g. 10×10'} /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Number of Air Rods</Label><Input type="number" value={formData.numberOfAirRods} onChange={(e) => onUpdate('numberOfAirRods', e.target.value)} className={inputCn} /></div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Down Conductors */}
      <div className="eicr-section-card">
        <Collapsible open={downOpen} onOpenChange={setDownOpen}>
          <SectionHeader title="Down Conductors" icon={<ArrowDown className="h-5 w-5 text-blue-400" />} isOpen={downOpen} color="blue-500" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-white">Material</Label>
                  <Select value={formData.downConductorMaterial} onValueChange={(v) => onUpdate('downConductorMaterial', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="copper-tape">Copper tape</SelectItem>
                      <SelectItem value="copper-cable">Copper cable</SelectItem>
                      <SelectItem value="aluminium">Aluminium</SelectItem>
                      <SelectItem value="galvanised-steel">Galvanised steel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label className="text-xs text-white">Size (mm²)</Label><Input value={formData.downConductorSize} onChange={(e) => onUpdate('downConductorSize', e.target.value)} className={inputCn} placeholder="e.g. 50" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">Number of Down Conductors</Label><Input type="number" value={formData.numberOfDownConductors} onChange={(e) => onUpdate('numberOfDownConductors', e.target.value)} className={inputCn} /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Spacing (m)</Label><Input type="number" step="0.1" value={formData.downConductorSpacing} onChange={(e) => onUpdate('downConductorSpacing', e.target.value)} className={inputCn} /></div>
              </div>
              {spacingValidation.message && (
                <div className={`rounded-xl p-2.5 border ${spacingValidation.valid ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                  <p className={`text-xs font-semibold ${spacingValidation.valid ? 'text-green-400' : 'text-red-400'}`}>{spacingValidation.message}</p>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Earth Termination */}
      <div className="eicr-section-card">
        <Collapsible open={earthOpen} onOpenChange={setEarthOpen}>
          <SectionHeader title="Earth Termination" icon={<Globe2 className="h-5 w-5 text-green-400" />} isOpen={earthOpen} color="green-500" subtitle="Electrodes" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">No. of Electrodes</Label><Input type="number" value={formData.numberOfElectrodes} onChange={(e) => onUpdate('numberOfElectrodes', e.target.value)} className={inputCn} /></div>
                <div className="space-y-2">
                  <Label className="text-xs text-white">Type</Label>
                  <Select value={formData.electrodeType} onValueChange={(v) => onUpdate('electrodeType', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="rod">Rod</SelectItem>
                      <SelectItem value="plate">Plate</SelectItem>
                      <SelectItem value="strip">Strip</SelectItem>
                      <SelectItem value="ring">Ring</SelectItem>
                      <SelectItem value="foundation">Foundation earth</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-white">Material</Label>
                  <Select value={formData.electrodeMaterial} onValueChange={(v) => onUpdate('electrodeMaterial', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="copper-clad-steel">Copper-clad steel</SelectItem>
                      <SelectItem value="solid-copper">Solid copper</SelectItem>
                      <SelectItem value="galvanised-steel">Galvanised steel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label className="text-xs text-white">Depth (m)</Label><Input type="number" step="0.1" value={formData.electrodeDepth} onChange={(e) => onUpdate('electrodeDepth', e.target.value)} className={inputCn} placeholder="e.g. 2.4" /></div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Bonding */}
      <div className="eicr-section-card">
        <Collapsible open={bondOpen} onOpenChange={setBondOpen}>
          <SectionHeader title="Equipotential Bonding" icon={<Link className="h-5 w-5 text-purple-400" />} isOpen={bondOpen} color="purple-500" subtitle="Services bonded to LPS" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="space-y-2"><Label className="text-xs text-white">Bonding Bar Location</Label><Input value={formData.bondingBarLocation} onChange={(e) => onUpdate('bondingBarLocation', e.target.value)} className={inputCn} placeholder="e.g. Basement, main intake" /></div>
              <div className="space-y-2">
                <Label className="text-xs text-white mb-1">Services Bonded</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'electrical', label: 'Electrical supply' },
                    { key: 'gas', label: 'Gas' },
                    { key: 'water', label: 'Water' },
                    { key: 'telecoms', label: 'Telecoms / data' },
                    { key: 'structuralSteel', label: 'Structural steel' },
                    { key: 'hvac', label: 'HVAC' },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center gap-3">
                      <Checkbox checked={formData.servicesBonded?.[key]} onCheckedChange={(v) => updateBonding(key, v)} className={checkboxCn} />
                      <Label className="text-sm text-white">{label}</Label>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 mt-2"><Label className="text-xs text-white">Other services bonded</Label><Input value={formData.servicesBonded?.other || ''} onChange={(e) => updateBonding('other', e.target.value)} className={inputCn} placeholder="e.g. Metal cladding, railings" /></div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* SPDs */}
      <div className="eicr-section-card">
        <Collapsible open={spdOpen} onOpenChange={setSpdOpen}>
          <SectionHeader title="Surge Protection Devices" icon={<Zap className="h-5 w-5 text-cyan-400" />} isOpen={spdOpen} color="cyan-500" subtitle="Type 1, 2 & 3" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              {[
                { num: '1', fitted: 'spd1Fitted', loc: 'spd1Location', make: 'spd1Make', model: 'spd1Model', label: 'Type 1 SPD (main DB)' },
                { num: '2', fitted: 'spd2Fitted', loc: 'spd2Location', make: 'spd2Make', model: 'spd2Model', label: 'Type 2 SPD (sub-DB)' },
                { num: '3', fitted: 'spd3Fitted', loc: 'spd3Location', make: 'spd3Make', model: 'spd3Model', label: 'Type 3 SPD (point of use)' },
              ].map(({ fitted, loc, make, model, label }) => (
                <div key={fitted}>
                  <div className="flex items-center gap-3 mb-2">
                    <Checkbox checked={formData[fitted]} onCheckedChange={(v) => onUpdate(fitted, v)} className={checkboxCn} />
                    <Label className="text-sm text-white">{label}</Label>
                  </div>
                  {formData[fitted] && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 ml-8 mb-3">
                      <Input value={formData[loc]} onChange={(e) => onUpdate(loc, e.target.value)} className={inputCn} placeholder="Location" />
                      <Input value={formData[make]} onChange={(e) => onUpdate(make, e.target.value)} className={inputCn} placeholder="Make" />
                      <Input value={formData[model]} onChange={(e) => onUpdate(model, e.target.value)} className={inputCn} placeholder="Model" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
