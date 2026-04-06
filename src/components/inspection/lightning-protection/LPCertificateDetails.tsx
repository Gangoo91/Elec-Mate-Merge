import { useState, useMemo } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, User, MapPin, Wrench, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLightningProtectionSmartForm } from '@/hooks/inspection/useLightningProtectionSmartForm';

const inputCn = 'h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500';
const dateCn = 'h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';
const selectTriggerCn = 'h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2';
const selectContentCn = 'z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground';

interface SH { title: string; icon: React.ReactNode; isOpen: boolean; color: string; subtitle?: string }
const SectionHeader = ({ title, icon, isOpen, color, subtitle }: SH) => (
  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-white/5 transition-colors rounded-t-xl">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-11 rounded-xl flex items-center justify-center bg-${color}/15`}>{icon}</div>
      <div className="text-left"><h3 className="text-base font-semibold text-foreground">{title}</h3>{subtitle && <span className="text-xs text-white">{subtitle}</span>}</div>
    </div>
    {isOpen ? <ChevronUp className="h-5 w-5 text-white" /> : <ChevronDown className="h-5 w-5 text-white" />}
  </CollapsibleTrigger>
);

interface Props { formData: any; onUpdate: (field: string, value: any) => void }

export default function LPCertificateDetails({ formData, onUpdate }: Props) {
  const [certOpen, setCertOpen] = useState(true);
  const [clientOpen, setClientOpen] = useState(true);
  const [siteOpen, setSiteOpen] = useState(true);
  const [testerOpen, setTesterOpen] = useState(true);

  const { hasSavedTesterDetails, loadTesterDetails, calculateNextInspectionDue, calculateNextVisualDue } = useLightningProtectionSmartForm();

  // Auto-calculate next inspection due when class or date changes
  const autoNextDue = useMemo(() => calculateNextInspectionDue(formData.inspectionDate, formData.lpsClass), [formData.inspectionDate, formData.lpsClass, calculateNextInspectionDue]);
  const autoNextVisualDue = useMemo(() => calculateNextVisualDue(formData.inspectionDate), [formData.inspectionDate, calculateNextVisualDue]);

  const handleLoadTester = () => {
    const details = loadTesterDetails();
    if (details) Object.entries(details).forEach(([k, v]) => { if (v) onUpdate(k, v); });
  };

  return (
    <div className="space-y-3">
      {/* Certificate Details */}
      <div className="eicr-section-card">
        <Collapsible open={certOpen} onOpenChange={setCertOpen}>
          <SectionHeader title="Certificate Details" icon={<FileText className="h-5 w-5 text-yellow-400" />} isOpen={certOpen} color="yellow-500" subtitle="Type, reference, dates" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="space-y-2"><Label className="text-xs text-white">Certificate Number</Label><Input value={formData.certificateNumber} onChange={(e) => onUpdate('certificateNumber', e.target.value)} className={inputCn} /></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">Inspection Date</Label><Input type="date" value={formData.inspectionDate} onChange={(e) => onUpdate('inspectionDate', e.target.value)} className={dateCn} /></div>
                <div className="space-y-2">
                  <Label className="text-xs text-white">Inspection Type *</Label>
                  <Select value={formData.inspectionType} onValueChange={(v) => onUpdate('inspectionType', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="initial">Initial (new installation)</SelectItem>
                      <SelectItem value="periodic">Periodic inspection</SelectItem>
                      <SelectItem value="after-alteration">After alteration/extension</SelectItem>
                      <SelectItem value="after-strike">After lightning strike</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">Previous Certificate Ref</Label><Input value={formData.previousCertRef} onChange={(e) => onUpdate('previousCertRef', e.target.value)} className={inputCn} placeholder="Ref from last test" /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Previous Certificate Date</Label><Input type="date" value={formData.previousCertDate} onChange={(e) => onUpdate('previousCertDate', e.target.value)} className={dateCn} /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-white">Design Standard</Label>
                  <Select value={formData.designStandard} onValueChange={(v) => onUpdate('designStandard', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="BS EN 62305">BS EN 62305</SelectItem>
                      <SelectItem value="BS 6651">BS 6651 (legacy)</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs text-white">Next Complete Test Due</Label>
                  <Input type="date" value={formData.nextInspectionDue || autoNextDue} onChange={(e) => onUpdate('nextInspectionDue', e.target.value)} className={dateCn} />
                  {autoNextDue && !formData.nextInspectionDue && <p className="text-[10px] text-elec-yellow">Auto: {formData.lpsClass ? `Class ${formData.lpsClass} = every ${formData.lpsClass === 'I' || formData.lpsClass === 'II' ? '2' : '4'} years` : 'Set LPS class to auto-calculate'}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-white">Next Visual Inspection Due</Label>
                  <Input type="date" value={formData.nextVisualInspectionDue || autoNextVisualDue} onChange={(e) => onUpdate('nextVisualInspectionDue', e.target.value)} className={dateCn} />
                  {autoNextVisualDue && !formData.nextVisualInspectionDue && <p className="text-[10px] text-elec-yellow">Auto: always 1 year from inspection date</p>}
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Client */}
      <div className="eicr-section-card">
        <Collapsible open={clientOpen} onOpenChange={setClientOpen}>
          <SectionHeader title="Client Details" icon={<User className="h-5 w-5 text-blue-400" />} isOpen={clientOpen} color="blue-500" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">Client Name *</Label><Input value={formData.clientName} onChange={(e) => onUpdate('clientName', e.target.value)} className={inputCn} /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Phone</Label><Input type="tel" value={formData.clientPhone} onChange={(e) => onUpdate('clientPhone', e.target.value)} className={inputCn} /></div>
              </div>
              <div className="space-y-2"><Label className="text-xs text-white">Email</Label><Input type="email" value={formData.clientEmail} onChange={(e) => onUpdate('clientEmail', e.target.value)} className={inputCn} /></div>
              <div className="space-y-2"><Label className="text-xs text-white">Client Address</Label><Input value={formData.clientAddress} onChange={(e) => onUpdate('clientAddress', e.target.value)} className={inputCn} /></div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Site */}
      <div className="eicr-section-card">
        <Collapsible open={siteOpen} onOpenChange={setSiteOpen}>
          <SectionHeader title="Site Details" icon={<MapPin className="h-5 w-5 text-emerald-400" />} isOpen={siteOpen} color="emerald-500" subtitle="Building information" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">Site Name</Label><Input value={formData.siteName} onChange={(e) => onUpdate('siteName', e.target.value)} className={inputCn} placeholder="e.g. St Mary's Church" /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Site Address *</Label><Input value={formData.siteAddress} onChange={(e) => onUpdate('siteAddress', e.target.value)} className={inputCn} /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs text-white">Building Type</Label>
                  <Select value={formData.buildingType} onValueChange={(v) => onUpdate('buildingType', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="Office">Office</SelectItem>
                      <SelectItem value="Warehouse">Warehouse</SelectItem>
                      <SelectItem value="School">School</SelectItem>
                      <SelectItem value="Church">Church / Place of Worship</SelectItem>
                      <SelectItem value="Hospital">Hospital</SelectItem>
                      <SelectItem value="Residential Block">Residential Block</SelectItem>
                      <SelectItem value="Factory">Factory / Industrial</SelectItem>
                      <SelectItem value="Listed Building">Listed Building</SelectItem>
                      <SelectItem value="Data Centre">Data Centre</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label className="text-xs text-white">Building Use</Label><Input value={formData.buildingUse} onChange={(e) => onUpdate('buildingUse', e.target.value)} className={inputCn} placeholder="e.g. Offices, storage" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">No. of Floors</Label><Input type="number" value={formData.numberOfFloors} onChange={(e) => onUpdate('numberOfFloors', e.target.value)} className={inputCn} /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Height (m)</Label><Input type="number" step="0.1" value={formData.buildingHeight} onChange={(e) => onUpdate('buildingHeight', e.target.value)} className={inputCn} /></div>
                <div className="space-y-2">
                  <Label className="text-xs text-white">Construction</Label>
                  <Select value={formData.constructionType} onValueChange={(v) => onUpdate('constructionType', v)}>
                    <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                    <SelectContent className={selectContentCn}>
                      <SelectItem value="Steel frame">Steel frame</SelectItem>
                      <SelectItem value="Reinforced concrete">Reinforced concrete</SelectItem>
                      <SelectItem value="Timber">Timber</SelectItem>
                      <SelectItem value="Masonry">Masonry</SelectItem>
                      <SelectItem value="Mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Tester */}
      <div className="eicr-section-card">
        <Collapsible open={testerOpen} onOpenChange={setTesterOpen}>
          <SectionHeader title="Contractor & Tester" icon={<Wrench className="h-5 w-5 text-amber-400" />} isOpen={testerOpen} color="amber-500" />
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              {hasSavedTesterDetails && !formData.testerName && (
                <Button variant="outline" onClick={handleLoadTester} className="w-full h-11 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 touch-manipulation">
                  Load from Business Settings
                </Button>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">Company</Label><Input value={formData.contractorCompany} onChange={(e) => onUpdate('contractorCompany', e.target.value)} className={inputCn} /></div>
                <div className="space-y-2"><Label className="text-xs text-white">ATLAS No.</Label><Input value={formData.atlasNumber} onChange={(e) => onUpdate('atlasNumber', e.target.value)} className={inputCn} placeholder="If applicable" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2"><Label className="text-xs text-white">Tester Name *</Label><Input value={formData.testerName} onChange={(e) => onUpdate('testerName', e.target.value)} className={inputCn} /></div>
                <div className="space-y-2"><Label className="text-xs text-white">Qualifications</Label><Input value={formData.testerQualifications} onChange={(e) => onUpdate('testerQualifications', e.target.value)} className={inputCn} placeholder="e.g. C&G 2399" /></div>
              </div>
              <div className="space-y-2"><Label className="text-xs text-white">Reviewer / Supervisor</Label><Input value={formData.reviewerName} onChange={(e) => onUpdate('reviewerName', e.target.value)} className={inputCn} placeholder="If applicable" /></div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
