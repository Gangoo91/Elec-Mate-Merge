import { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { useLightningProtectionSmartForm } from '@/hooks/inspection/useLightningProtectionSmartForm';

/* eslint-disable @typescript-eslint/no-explicit-any */

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const pickerTrigger =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const Sub = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 pt-2">
    <p className="text-[12px] font-semibold text-white shrink-0">{title}</p>
    <div className="h-px flex-1 bg-white/[0.08]" />
  </div>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div>
    <Label className={labelCn}>{label}{required && ' *'}</Label>
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
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Certificate Details */}
      <div className={cardCn}>
        <SectionHeader title="Certificate details" />
        <Field label="Certificate number"><Input value={formData.certificateNumber} onChange={(e) => onUpdate('certificateNumber', e.target.value)} className={inputCn} /></Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Inspection date"><Input type="date" value={formData.inspectionDate} onChange={(e) => onUpdate('inspectionDate', e.target.value)} className={inputCn} /></Field>
          <Field label="Inspection type" required>
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

        <Sub title="Previous certificate" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Previous certificate ref"><Input value={formData.previousCertRef} onChange={(e) => onUpdate('previousCertRef', e.target.value)} className={inputCn} placeholder="Ref from last test" /></Field>
          <Field label="Previous certificate date"><Input type="date" value={formData.previousCertDate} onChange={(e) => onUpdate('previousCertDate', e.target.value)} className={inputCn} /></Field>
        </div>

        <Sub title="Design & schedule" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Design standard">
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
          <Field label="Next complete test due">
            <Input type="date" value={formData.nextInspectionDue || autoNextDue} onChange={(e) => onUpdate('nextInspectionDue', e.target.value)} className={inputCn} />
            {autoNextDue && !formData.nextInspectionDue && <p className="text-[11px] text-elec-yellow mt-1">Auto: {formData.lpsClass ? `Class ${formData.lpsClass} = every ${formData.lpsClass === 'I' || formData.lpsClass === 'II' ? '2' : '4'} years` : 'Set LPS class to auto-calculate'}</p>}
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Next visual inspection due">
            <Input type="date" value={formData.nextVisualInspectionDue || autoNextVisualDue} onChange={(e) => onUpdate('nextVisualInspectionDue', e.target.value)} className={inputCn} />
            {autoNextVisualDue && !formData.nextVisualInspectionDue && <p className="text-[11px] text-elec-yellow mt-1">Auto: always 1 year from inspection date</p>}
          </Field>
        </div>
      </div>

      {/* Client Details */}
      <div className={cardCn}>
        <SectionHeader title="Client details" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Client name" required><Input value={formData.clientName} onChange={(e) => onUpdate('clientName', e.target.value)} className={inputCn} /></Field>
          <Field label="Phone"><Input type="tel" value={formData.clientPhone} onChange={(e) => onUpdate('clientPhone', e.target.value)} className={inputCn} /></Field>
        </div>
        <Field label="Email"><Input type="email" value={formData.clientEmail} onChange={(e) => onUpdate('clientEmail', e.target.value)} className={inputCn} /></Field>
        <Field label="Client address"><Input value={formData.clientAddress} onChange={(e) => onUpdate('clientAddress', e.target.value)} className={inputCn} /></Field>
      </div>

      {/* Site Details */}
      <div className={cardCn}>
        <SectionHeader title="Site details" />
        <Field label="Site name"><Input value={formData.siteName} onChange={(e) => onUpdate('siteName', e.target.value)} className={inputCn} placeholder="e.g. St Mary's Church" /></Field>
        <Field label="Site address" required><Input value={formData.siteAddress} onChange={(e) => onUpdate('siteAddress', e.target.value)} className={inputCn} /></Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Building type">
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
          <Field label="Building use"><Input value={formData.buildingUse} onChange={(e) => onUpdate('buildingUse', e.target.value)} className={inputCn} placeholder="e.g. Offices, storage" /></Field>
        </div>

        <Sub title="Building dimensions" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="No. of floors"><Input type="number" value={formData.numberOfFloors} onChange={(e) => onUpdate('numberOfFloors', e.target.value)} className={inputCn} /></Field>
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
      <div className={cardCn}>
        <SectionHeader title="Contractor & tester" />
        {hasSavedTesterDetails && !formData.testerName && (
          <button type="button" onClick={handleLoadTester} className="w-full h-11 rounded-xl bg-elec-yellow text-sm font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98] transition-all">Load from Business Settings</button>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Company"><Input value={formData.contractorCompany} onChange={(e) => onUpdate('contractorCompany', e.target.value)} className={inputCn} /></Field>
          <Field label="ATLAS no."><Input value={formData.atlasNumber} onChange={(e) => onUpdate('atlasNumber', e.target.value)} className={inputCn} placeholder="If applicable" /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Tester name" required><Input value={formData.testerName} onChange={(e) => onUpdate('testerName', e.target.value)} className={inputCn} /></Field>
          <Field label="Qualifications"><Input value={formData.testerQualifications} onChange={(e) => onUpdate('testerQualifications', e.target.value)} className={inputCn} placeholder="e.g. C&G 2399" /></Field>
        </div>
        <Field label="Reviewer / supervisor"><Input value={formData.reviewerName} onChange={(e) => onUpdate('reviewerName', e.target.value)} className={inputCn} placeholder="If applicable" /></Field>
      </div>
    </div>
  );
}
