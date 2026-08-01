/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G2 — Tab 1: Client & Premises
 * Paper-form section cards with underline fields
 */

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';
import ComboboxCell from '@/components/table-cells/ComboboxCell';
import CertificateClientSection from '@/components/inspection/shared/CertificateClientSection';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const premisesTypeOptions = [
  { value: 'Office', label: 'Office' },
  { value: 'Retail', label: 'Retail' },
  { value: 'Warehouse', label: 'Warehouse' },
  { value: 'Factory', label: 'Factory / Industrial' },
  { value: 'School', label: 'School / Education' },
  { value: 'Hospital', label: 'Hospital / Healthcare' },
  { value: 'Care Home', label: 'Care Home / Residential' },
  { value: 'Hotel', label: 'Hotel / B&B' },
  { value: 'HMO', label: 'HMO' },
  { value: 'Place of Worship', label: 'Place of Worship' },
  { value: 'Restaurant', label: 'Restaurant / Kitchen' },
  { value: 'Leisure', label: 'Leisure / Sports' },
  { value: 'Data Centre', label: 'Data Centre' },
  { value: 'Mixed Use', label: 'Mixed Use' },
];

const occupancyTypeOptions = [
  { value: 'Sleeping', label: 'Sleeping accommodation' },
  { value: 'Non-sleeping', label: 'Non-sleeping' },
  { value: 'Mixed', label: 'Mixed (sleeping + non-sleeping)' },
  { value: 'Unoccupied', label: 'Unoccupied / Storage' },
];

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div>
    <Label className={labelCn}>
      {label}
      {required && ' *'}
    </Label>
    {children}
  </div>
);

interface Props {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

export default function FAClientPremises({ formData, onUpdate }: Props) {
  // Auto-load installer details from company profile
  useEffect(() => {
    if (formData.installerName) return;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data: cpData } = await supabase.rpc('get_my_company_profile');
      const cp = Array.isArray(cpData) ? cpData[0] : cpData;
      if (cp) {
        onUpdate('installerName', cp.inspector_name || cp.company_name || '');
        onUpdate('installerCompany', cp.company_name || '');
        onUpdate('installerPhone', cp.company_phone || '');
        onUpdate('installerEmail', cp.company_email || '');
        onUpdate('registrationScheme', cp.registration_scheme || '');
        onUpdate('registrationNumber', cp.registration_number || '');
      }
    });
  }, []);

  return (
    <div className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Certificate reference */}
      <div className={cardCn}>
        <SectionHeader title="Certificate reference" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Certificate number">
            <Input
              value={formData.certificateNumber || ''}
              onChange={(e) => onUpdate('certificateNumber', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Date of issue">
            <Input
              type="date"
              value={formData.installationDate || ''}
              onChange={(e) => onUpdate('installationDate', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
      </div>

      {/* Client details */}
      <div className={cardCn}>
        <SectionHeader title="Client details" />
        <CertificateClientSection formData={formData} onUpdate={onUpdate} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Client name" required>
            <Input
              value={formData.clientName || ''}
              onChange={(e) => onUpdate('clientName', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Client position">
            <Input
              value={formData.clientPosition || ''}
              onChange={(e) => onUpdate('clientPosition', e.target.value)}
              className={inputCn}
              placeholder="e.g. Building Manager"
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Phone">
            <Input
              type="tel"
              value={formData.clientTelephone || ''}
              onChange={(e) => onUpdate('clientTelephone', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Email">
            <Input
              type="email"
              value={formData.clientEmail || ''}
              onChange={(e) => onUpdate('clientEmail', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <Field label="Client address">
          <Input
            value={formData.clientAddress || ''}
            onChange={(e) => onUpdate('clientAddress', e.target.value)}
            className={inputCn}
          />
        </Field>
      </div>

      {/* Premises details */}
      <div className={cardCn}>
        <SectionHeader title="Premises details" />
        <Field label="Premises name">
          <Input
            value={formData.premisesName || ''}
            onChange={(e) => onUpdate('premisesName', e.target.value)}
            className={inputCn}
            placeholder="e.g. Acme Office Building"
          />
        </Field>
        <Field label="Premises address" required>
          <Input
            value={formData.premisesAddress || formData.installationAddress || ''}
            onChange={(e) => onUpdate('premisesAddress', e.target.value)}
            className={inputCn}
          />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Premises type">
            <ComboboxCell
              value={formData.premisesType || ''}
              onChange={(v) => onUpdate('premisesType', v)}
              options={premisesTypeOptions}
              placeholder="Select or type..."
              className="h-11 text-base"
            />
          </Field>
          <Field label="Occupancy type">
            <ComboboxCell
              value={formData.occupancyType || ''}
              onChange={(v) => onUpdate('occupancyType', v)}
              options={occupancyTypeOptions}
              placeholder="Select or type..."
              className="h-11 text-base"
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Number of floors">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.numberOfFloors || ''}
              onChange={(e) => onUpdate('numberOfFloors', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Approximate floor area (m²)">
            <Input
              value={formData.floorArea || ''}
              onChange={(e) => onUpdate('floorArea', e.target.value)}
              inputMode="decimal"
              className={inputCn}
              placeholder="e.g. 500"
            />
          </Field>
        </div>
      </div>

      {/* Fire risk assessment */}
      <div className={cardCn}>
        <SectionHeader title="Fire risk assessment" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="FRA reference">
            <Input
              value={formData.fraReference || ''}
              onChange={(e) => onUpdate('fraReference', e.target.value)}
              className={inputCn}
              placeholder="e.g. FRA-2026-001"
            />
          </Field>
          <Field label="FRA date">
            <Input
              type="date"
              value={formData.fraDate || ''}
              onChange={(e) => onUpdate('fraDate', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="FRA author">
            <Input
              value={formData.fraAuthor || ''}
              onChange={(e) => onUpdate('fraAuthor', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="FRA company">
            <Input
              value={formData.fraCompany || ''}
              onChange={(e) => onUpdate('fraCompany', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
      </div>

      {/* Installer details */}
      <div className={cardCn}>
        <SectionHeader title="Installer details" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Name">
            <Input
              value={formData.installerName || ''}
              onChange={(e) => onUpdate('installerName', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Company">
            <Input
              value={formData.installerCompany || ''}
              onChange={(e) => onUpdate('installerCompany', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Phone">
            <Input
              type="tel"
              value={formData.installerPhone || ''}
              onChange={(e) => onUpdate('installerPhone', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Email">
            <Input
              type="email"
              value={formData.installerEmail || ''}
              onChange={(e) => onUpdate('installerEmail', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <Field label="Company address">
          <Input
            value={formData.installerCompanyAddress || ''}
            onChange={(e) => onUpdate('installerCompanyAddress', e.target.value)}
            className={inputCn}
          />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
          <Field label="Scheme">
            <Input
              value={formData.registrationScheme || ''}
              onChange={(e) => onUpdate('registrationScheme', e.target.value)}
              className={inputCn}
              placeholder="BAFE, FIA, NSI..."
            />
          </Field>
          <Field label="Reg. no.">
            <Input
              value={formData.registrationNumber || ''}
              onChange={(e) => onUpdate('registrationNumber', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Competency">
            <Input
              value={formData.competencyScheme || ''}
              onChange={(e) => onUpdate('competencyScheme', e.target.value)}
              className={inputCn}
              placeholder="e.g. ECS, FIA"
            />
          </Field>
        </div>
      </div>

      {/* Design certificate reference */}
      <div className={cardCn}>
        <SectionHeader title="Design certificate reference" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="G1 design cert reference">
            <Input
              value={formData.designCertReference || ''}
              onChange={(e) => onUpdate('designCertReference', e.target.value)}
              className={inputCn}
              placeholder="Ref number of G1 cert"
            />
          </Field>
          <Field label="G1 design cert date">
            <Input
              type="date"
              value={formData.designCertDate || ''}
              onChange={(e) => onUpdate('designCertDate', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <Field label="Designer name / company">
          <Input
            value={formData.designerName || ''}
            onChange={(e) => onUpdate('designerName', e.target.value)}
            className={inputCn}
            placeholder="If different from installer"
          />
        </Field>
      </div>
    </div>
  );
}
