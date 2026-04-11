import { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { cn } from '@/lib/utils';
import { useLightningProtectionSmartForm } from '@/hooks/inspection/useLightningProtectionSmartForm';

const inputCn = '!h-10 !py-1 !text-xs touch-manipulation bg-white/[0.06] border-white/[0.08] text-white [color-scheme:dark]';
const pickerTrigger = 'h-10 w-full touch-manipulation bg-white/[0.06] border-white/[0.08] text-white';

const SectionHeader = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const Sub = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 pt-2">
    <p className="text-[10px] font-semibold text-white uppercase tracking-wider shrink-0">{title}</p>
    <div className="h-px flex-1 bg-white/[0.06]" />
  </div>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>
    {children}
  </div>
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
      {/* Certificate Details */}
      <div className="space-y-4">
        <SectionHeader title="Certificate Details" />
        <Field label="Certificate Number"><Input value={formData.certificateNumber} onChange={(e) => onUpdate('certificateNumber', e.target.value)} className={inputCn} /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Inspection Date"><Input type="date" value={formData.inspectionDate} onChange={(e) => onUpdate('inspectionDate', e.target.value)} className={inputCn} /></Field>
          <Field label="Inspection Type" required>
            <MobileSelectPicker
              value={formData.inspectionType}
              onValueChange={(v) => onUpdate('inspectionType', v)}
              placeholder="Select..."
              title="Inspection Type"
              triggerClassName={pickerTrigger}
              options={[
                { value: 'initial', label: 'Initial (new installation)' },
                { value: 'periodic', label: 'Periodic inspection' },
                { value: 'after-alteration', label: 'After alteration/extension' },
                { value: 'after-strike', label: 'After lightning strike' },
              ]}
            />
          </Field>
        </div>

        <Sub title="Previous Certificate" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Previous Certificate Ref"><Input value={formData.previousCertRef} onChange={(e) => onUpdate('previousCertRef', e.target.value)} className={inputCn} placeholder="Ref from last test" /></Field>
          <Field label="Previous Certificate Date"><Input type="date" value={formData.previousCertDate} onChange={(e) => onUpdate('previousCertDate', e.target.value)} className={inputCn} /></Field>
        </div>

        <Sub title="Design & Schedule" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Design Standard">
            <MobileSelectPicker
              value={formData.designStandard}
              onValueChange={(v) => onUpdate('designStandard', v)}
              placeholder="Select..."
              title="Design Standard"
              triggerClassName={pickerTrigger}
              options={[
                { value: 'BS EN 62305', label: 'BS EN 62305' },
                { value: 'BS 6651', label: 'BS 6651 (legacy)' },
                { value: 'unknown', label: 'Unknown' },
              ]}
            />
          </Field>
          <Field label="Next Complete Test Due">
            <Input type="date" value={formData.nextInspectionDue || autoNextDue} onChange={(e) => onUpdate('nextInspectionDue', e.target.value)} className={inputCn} />
            {autoNextDue && !formData.nextInspectionDue && <p className="text-[10px] text-elec-yellow mt-1">Auto: {formData.lpsClass ? `Class ${formData.lpsClass} = every ${formData.lpsClass === 'I' || formData.lpsClass === 'II' ? '2' : '4'} years` : 'Set LPS class to auto-calculate'}</p>}
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Next Visual Inspection Due">
            <Input type="date" value={formData.nextVisualInspectionDue || autoNextVisualDue} onChange={(e) => onUpdate('nextVisualInspectionDue', e.target.value)} className={inputCn} />
            {autoNextVisualDue && !formData.nextVisualInspectionDue && <p className="text-[10px] text-elec-yellow mt-1">Auto: always 1 year from inspection date</p>}
          </Field>
        </div>
      </div>

      {/* Client Details */}
      <div className="space-y-4">
        <SectionHeader title="Client Details" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Client Name" required><Input value={formData.clientName} onChange={(e) => onUpdate('clientName', e.target.value)} className={inputCn} /></Field>
          <Field label="Phone"><Input type="tel" value={formData.clientPhone} onChange={(e) => onUpdate('clientPhone', e.target.value)} className={inputCn} /></Field>
        </div>
        <Field label="Email"><Input type="email" value={formData.clientEmail} onChange={(e) => onUpdate('clientEmail', e.target.value)} className={inputCn} /></Field>
        <Field label="Client Address"><Input value={formData.clientAddress} onChange={(e) => onUpdate('clientAddress', e.target.value)} className={inputCn} /></Field>
      </div>

      {/* Site Details */}
      <div className="space-y-4">
        <SectionHeader title="Site Details" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Site Name"><Input value={formData.siteName} onChange={(e) => onUpdate('siteName', e.target.value)} className={inputCn} placeholder="e.g. St Mary's Church" /></Field>
          <Field label="Site Address" required><Input value={formData.siteAddress} onChange={(e) => onUpdate('siteAddress', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Building Type">
            <MobileSelectPicker
              value={formData.buildingType}
              onValueChange={(v) => onUpdate('buildingType', v)}
              placeholder="Select..."
              title="Building Type"
              triggerClassName={pickerTrigger}
              options={[
                { value: 'Office', label: 'Office' },
                { value: 'Warehouse', label: 'Warehouse' },
                { value: 'School', label: 'School' },
                { value: 'Church', label: 'Church' },
                { value: 'Hospital', label: 'Hospital' },
                { value: 'Residential Block', label: 'Residential Block' },
                { value: 'Factory', label: 'Factory' },
                { value: 'Listed Building', label: 'Listed Building' },
                { value: 'Data Centre', label: 'Data Centre' },
                { value: 'Other', label: 'Other' },
              ]}
            />
          </Field>
          <Field label="Building Use"><Input value={formData.buildingUse} onChange={(e) => onUpdate('buildingUse', e.target.value)} className={inputCn} placeholder="e.g. Offices, storage" /></Field>
        </div>

        <Sub title="Building Dimensions" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="No. of Floors"><Input type="number" value={formData.numberOfFloors} onChange={(e) => onUpdate('numberOfFloors', e.target.value)} className={inputCn} /></Field>
          <Field label="Height (m)"><Input type="number" step="0.1" value={formData.buildingHeight} onChange={(e) => onUpdate('buildingHeight', e.target.value)} className={inputCn} /></Field>
        </div>
        <Field label="Construction">
          <MobileSelectPicker
            value={formData.constructionType}
            onValueChange={(v) => onUpdate('constructionType', v)}
            placeholder="Select..."
            title="Construction Type"
            triggerClassName={pickerTrigger}
            options={[
              { value: 'Steel frame', label: 'Steel frame' },
              { value: 'Reinforced concrete', label: 'Reinforced concrete' },
              { value: 'Timber', label: 'Timber' },
              { value: 'Masonry', label: 'Masonry' },
              { value: 'Mixed', label: 'Mixed' },
            ]}
          />
        </Field>
      </div>

      {/* Contractor & Tester */}
      <div className="space-y-4">
        <SectionHeader title="Contractor & Tester" />
        {hasSavedTesterDetails && !formData.testerName && (
          <button type="button" onClick={handleLoadTester} className="w-full h-10 rounded-lg bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow text-xs font-semibold touch-manipulation active:scale-[0.98]">Load from Business Settings</button>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Company"><Input value={formData.contractorCompany} onChange={(e) => onUpdate('contractorCompany', e.target.value)} className={inputCn} /></Field>
          <Field label="ATLAS No."><Input value={formData.atlasNumber} onChange={(e) => onUpdate('atlasNumber', e.target.value)} className={inputCn} placeholder="If applicable" /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Tester Name" required><Input value={formData.testerName} onChange={(e) => onUpdate('testerName', e.target.value)} className={inputCn} /></Field>
          <Field label="Qualifications"><Input value={formData.testerQualifications} onChange={(e) => onUpdate('testerQualifications', e.target.value)} className={inputCn} placeholder="e.g. C&G 2399" /></Field>
        </div>
        <Field label="Reviewer / Supervisor"><Input value={formData.reviewerName} onChange={(e) => onUpdate('reviewerName', e.target.value)} className={inputCn} placeholder="If applicable" /></Field>
      </div>
    </div>
  );
}
