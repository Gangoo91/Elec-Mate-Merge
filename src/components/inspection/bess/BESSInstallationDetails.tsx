import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, User, MapPin, Wrench, ChevronUp, ChevronDown, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
      <div className="text-left">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        {subtitle && <span className="text-xs text-white">{subtitle}</span>}
      </div>
    </div>
    {isOpen ? <ChevronUp className="h-5 w-5 text-white" /> : <ChevronDown className="h-5 w-5 text-white" />}
  </CollapsibleTrigger>
);

interface Props { formData: any; onUpdate: (field: string, value: any) => void; customerId?: string; onCustomerIdChange?: (id: string | undefined) => void }

export default function BESSInstallationDetails({ formData, onUpdate }: Props) {
  const [clientOpen, setClientOpen] = useState(true);
  const [siteOpen, setSiteOpen] = useState(true);
  const [installerOpen, setInstallerOpen] = useState(true);
  const [pvOpen, setPvOpen] = useState(formData.associatedPV);

  const { hasSavedInstallerDetails, loadInstallerDetails } = useBESSSmartForm();

  const handleLoadInstaller = () => {
    const details = loadInstallerDetails();
    if (details) {
      Object.entries(details).forEach(([key, value]) => { if (value) onUpdate(key, value); });
    }
  };

  return (
    <div className="space-y-3">
      {/* Client Details */}
      <div className="eicr-section-card">
        <Collapsible open={clientOpen} onOpenChange={setClientOpen}>
          <SectionHeader title="Client Details" icon={<User className="h-5 w-5 text-blue-400" />} isOpen={clientOpen} color="blue-500" subtitle="Customer information" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">Client Name *</Label><Input value={formData.clientName} onChange={(e) => onUpdate('clientName', e.target.value)} className={inputCn} placeholder="Full name" /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Telephone</Label><Input type="tel" value={formData.clientTelephone} onChange={(e) => onUpdate('clientTelephone', e.target.value)} className={inputCn} /></div>
              </div>
              <div className="space-y-2"><Label className="text-xs text-white">Email</Label><Input type="email" value={formData.clientEmail} onChange={(e) => onUpdate('clientEmail', e.target.value)} className={inputCn} /></div>
              <div className="space-y-2"><Label className="text-xs text-white">Client Address</Label><Input value={formData.clientAddress} onChange={(e) => onUpdate('clientAddress', e.target.value)} className={inputCn} /></div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Site Details */}
      <div className="eicr-section-card">
        <Collapsible open={siteOpen} onOpenChange={setSiteOpen}>
          <SectionHeader title="Installation Site" icon={<MapPin className="h-5 w-5 text-emerald-400" />} isOpen={siteOpen} color="emerald-500" subtitle="Where the BESS is installed" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="space-y-2"><Label className="text-xs text-white">Installation Address *</Label><Input value={formData.installationAddress} onChange={(e) => onUpdate('installationAddress', e.target.value)} className={inputCn} placeholder="If different from client address" /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-white">Installation Type</Label>
                  <Select value={formData.installationType} onValueChange={(v) => onUpdate('installationType', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="domestic">Domestic</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-white">Battery Location</Label>
                  <Select value={formData.installationLocation} onValueChange={(v) => onUpdate('installationLocation', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="indoor">Indoor</SelectItem>
                      <SelectItem value="outdoor">Outdoor</SelectItem>
                      <SelectItem value="garage">Garage</SelectItem>
                      <SelectItem value="dedicated-enclosure">Dedicated Enclosure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">Installation Date</Label><Input type="date" value={formData.installationDate} onChange={(e) => onUpdate('installationDate', e.target.value)} className={inputCn} /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Commissioning Date</Label><Input type="date" value={formData.commissioningDate} onChange={(e) => onUpdate('commissioningDate', e.target.value)} className={inputCn} /></div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Associated PV */}
      <div className="eicr-section-card">
        <Collapsible open={pvOpen} onOpenChange={setPvOpen}>
          <SectionHeader title="Associated PV System" icon={<Sun className="h-5 w-5 text-yellow-400" />} isOpen={pvOpen} color="yellow-500" subtitle="Linked solar PV installation" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3">
                <Checkbox checked={formData.associatedPV} onCheckedChange={(v) => onUpdate('associatedPV', v)} className={checkboxCn} />
                <Label className="text-sm text-white">This BESS is paired with a PV system</Label>
              </div>
              {formData.associatedPV && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2"><Label className="text-xs text-white">PV Certificate Reference</Label><Input value={formData.associatedPVRef} onChange={(e) => onUpdate('associatedPVRef', e.target.value)} className={inputCn} placeholder="e.g. PV-2026-001" /></div>
                  <div className="space-y-2"><Label className="text-xs text-white">PV Capacity (kWp)</Label><Input type="number" step="0.1" value={formData.associatedPVCapacity} onChange={(e) => onUpdate('associatedPVCapacity', e.target.value)} className={inputCn} placeholder="e.g. 4.0" /></div>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Installer */}
      <div className="eicr-section-card">
        <Collapsible open={installerOpen} onOpenChange={setInstallerOpen}>
          <SectionHeader title="Installer Details" icon={<Wrench className="h-5 w-5 text-amber-400" />} isOpen={installerOpen} color="amber-500" subtitle="MCS registered installer" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              {hasSavedInstallerDetails && !formData.installerName && (
                <Button variant="outline" onClick={handleLoadInstaller} className="w-full h-11 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 touch-manipulation">
                  Load Installer from Business Settings
                </Button>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">Name *</Label><Input value={formData.installerName} onChange={(e) => onUpdate('installerName', e.target.value)} className={inputCn} /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Company</Label><Input value={formData.installerCompany} onChange={(e) => onUpdate('installerCompany', e.target.value)} className={inputCn} /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">Phone</Label><Input type="tel" value={formData.installerPhone} onChange={(e) => onUpdate('installerPhone', e.target.value)} className={inputCn} /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Email</Label><Input type="email" value={formData.installerEmail} onChange={(e) => onUpdate('installerEmail', e.target.value)} className={inputCn} /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">Scheme</Label><Input value={formData.installerScheme} onChange={(e) => onUpdate('installerScheme', e.target.value)} className={inputCn} placeholder="NICEIC, NAPIT..." /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Scheme No.</Label><Input value={formData.installerSchemeNumber} onChange={(e) => onUpdate('installerSchemeNumber', e.target.value)} className={inputCn} /></div>
                <div className="space-y-2"><Label className="text-xs text-white">MCS No. *</Label><Input value={formData.mcsInstallerNumber} onChange={(e) => onUpdate('mcsInstallerNumber', e.target.value)} className={inputCn} placeholder="MCS installer number" /></div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
