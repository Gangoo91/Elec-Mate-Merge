import { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLightningProtectionSmartForm } from '@/hooks/inspection/useLightningProtectionSmartForm';

const inputCn = 'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';
const selectTriggerCn = 'h-12 touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 data-[state=open]:border-yellow-500';
const selectContentCn = 'z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground';

const Section = ({ title, accentColor, children }: { title: string; accentColor?: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <div className="border-b border-white/[0.06] pb-1 mb-3">
      <div className={cn('h-[2px] w-full rounded-full bg-gradient-to-r mb-2', accentColor || 'from-yellow-500 to-amber-400')} />
      <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
    </div>
    {children}
  </div>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div><Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>{children}</div>
);

interface Props { formData: any; onUpdate: (field: string, value: any) => void }

export default function LPCertificateDetails({ formData, onUpdate }: Props) {
  const { hasSavedTesterDetails, loadTesterDetails, calculateNextInspectionDue, calculateNextVisualDue } = useLightningProtectionSmartForm();
  const autoNextDue = useMemo(() => calculateNextInspectionDue(formData.inspectionDate, formData.lpsClass), [formData.inspectionDate, formData.lpsClass, calculateNextInspectionDue]);
  const autoNextVisualDue = useMemo(() => calculateNextVisualDue(formData.inspectionDate), [formData.inspectionDate, calculateNextVisualDue]);

  const handleLoadTester = () => {
    const details = loadTesterDetails();
    if (details) Object.entries(details).forEach(([k, v]) => { if (v) onUpdate(k, v); });
  };

  return (
    <div className="space-y-5">
      <Section title="Certificate Details" accentColor="from-yellow-500/40 to-amber-400/20">
        <Field label="Certificate Number"><Input value={formData.certificateNumber} onChange={(e) => onUpdate('certificateNumber', e.target.value)} className={inputCn} /></Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Inspection Date"><Input type="date" value={formData.inspectionDate} onChange={(e) => onUpdate('inspectionDate', e.target.value)} className={inputCn} /></Field>
          <Field label="Inspection Type" required>
            <Select value={formData.inspectionType} onValueChange={(v) => onUpdate('inspectionType', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="initial">Initial (new installation)</SelectItem>
                <SelectItem value="periodic">Periodic inspection</SelectItem>
                <SelectItem value="after-alteration">After alteration/extension</SelectItem>
                <SelectItem value="after-strike">After lightning strike</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Previous Certificate Ref"><Input value={formData.previousCertRef} onChange={(e) => onUpdate('previousCertRef', e.target.value)} className={inputCn} placeholder="Ref from last test" /></Field>
          <Field label="Previous Certificate Date"><Input type="date" value={formData.previousCertDate} onChange={(e) => onUpdate('previousCertDate', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Design Standard">
            <Select value={formData.designStandard} onValueChange={(v) => onUpdate('designStandard', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="BS EN 62305">BS EN 62305</SelectItem>
                <SelectItem value="BS 6651">BS 6651 (legacy)</SelectItem>
                <SelectItem value="unknown">Unknown</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Next Complete Test Due">
            <Input type="date" value={formData.nextInspectionDue || autoNextDue} onChange={(e) => onUpdate('nextInspectionDue', e.target.value)} className={inputCn} />
            {autoNextDue && !formData.nextInspectionDue && <p className="text-[10px] text-elec-yellow mt-1">Auto: {formData.lpsClass ? `Class ${formData.lpsClass} = every ${formData.lpsClass === 'I' || formData.lpsClass === 'II' ? '2' : '4'} years` : 'Set LPS class to auto-calculate'}</p>}
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Next Visual Inspection Due">
            <Input type="date" value={formData.nextVisualInspectionDue || autoNextVisualDue} onChange={(e) => onUpdate('nextVisualInspectionDue', e.target.value)} className={inputCn} />
            {autoNextVisualDue && !formData.nextVisualInspectionDue && <p className="text-[10px] text-elec-yellow mt-1">Auto: always 1 year from inspection date</p>}
          </Field>
        </div>
      </Section>

      <Section title="Client Details" accentColor="from-blue-500/40 to-cyan-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Client Name" required><Input value={formData.clientName} onChange={(e) => onUpdate('clientName', e.target.value)} className={inputCn} /></Field>
          <Field label="Phone"><Input type="tel" value={formData.clientPhone} onChange={(e) => onUpdate('clientPhone', e.target.value)} className={inputCn} /></Field>
        </div>
        <Field label="Email"><Input type="email" value={formData.clientEmail} onChange={(e) => onUpdate('clientEmail', e.target.value)} className={inputCn} /></Field>
        <Field label="Client Address"><Input value={formData.clientAddress} onChange={(e) => onUpdate('clientAddress', e.target.value)} className={inputCn} /></Field>
      </Section>

      <Section title="Site Details" accentColor="from-emerald-500/40 to-green-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Site Name"><Input value={formData.siteName} onChange={(e) => onUpdate('siteName', e.target.value)} className={inputCn} placeholder="e.g. St Mary's Church" /></Field>
          <Field label="Site Address" required><Input value={formData.siteAddress} onChange={(e) => onUpdate('siteAddress', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Building Type">
            <Select value={formData.buildingType} onValueChange={(v) => onUpdate('buildingType', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="Office">Office</SelectItem><SelectItem value="Warehouse">Warehouse</SelectItem>
                <SelectItem value="School">School</SelectItem><SelectItem value="Church">Church</SelectItem>
                <SelectItem value="Hospital">Hospital</SelectItem><SelectItem value="Residential Block">Residential Block</SelectItem>
                <SelectItem value="Factory">Factory</SelectItem><SelectItem value="Listed Building">Listed Building</SelectItem>
                <SelectItem value="Data Centre">Data Centre</SelectItem><SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Building Use"><Input value={formData.buildingUse} onChange={(e) => onUpdate('buildingUse', e.target.value)} className={inputCn} placeholder="e.g. Offices, storage" /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field label="No. of Floors"><Input type="number" value={formData.numberOfFloors} onChange={(e) => onUpdate('numberOfFloors', e.target.value)} className={inputCn} /></Field>
          <Field label="Height (m)"><Input type="number" step="0.1" value={formData.buildingHeight} onChange={(e) => onUpdate('buildingHeight', e.target.value)} className={inputCn} /></Field>
          <Field label="Construction">
            <Select value={formData.constructionType} onValueChange={(v) => onUpdate('constructionType', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="Steel frame">Steel frame</SelectItem><SelectItem value="Reinforced concrete">Reinforced concrete</SelectItem>
                <SelectItem value="Timber">Timber</SelectItem><SelectItem value="Masonry">Masonry</SelectItem><SelectItem value="Mixed">Mixed</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </Section>

      <Section title="Contractor & Tester" accentColor="from-elec-yellow/40 to-amber-400/20">
        {hasSavedTesterDetails && !formData.testerName && (
          <Button variant="outline" onClick={handleLoadTester} className="w-full h-12 border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10 touch-manipulation">Load from Business Settings</Button>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Company"><Input value={formData.contractorCompany} onChange={(e) => onUpdate('contractorCompany', e.target.value)} className={inputCn} /></Field>
          <Field label="ATLAS No."><Input value={formData.atlasNumber} onChange={(e) => onUpdate('atlasNumber', e.target.value)} className={inputCn} placeholder="If applicable" /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Tester Name" required><Input value={formData.testerName} onChange={(e) => onUpdate('testerName', e.target.value)} className={inputCn} /></Field>
          <Field label="Qualifications"><Input value={formData.testerQualifications} onChange={(e) => onUpdate('testerQualifications', e.target.value)} className={inputCn} placeholder="e.g. C&G 2399" /></Field>
        </div>
        <Field label="Reviewer / Supervisor"><Input value={formData.reviewerName} onChange={(e) => onUpdate('reviewerName', e.target.value)} className={inputCn} placeholder="If applicable" /></Field>
      </Section>
    </div>
  );
}
