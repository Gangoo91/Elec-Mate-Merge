/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G3 Commissioning — Tab 1: Project & System Reference
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

const comboTriggerCn =
  'h-11 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white hover:bg-transparent hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

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
  { value: 'Data Centre', label: 'Data Centre' },
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

export default function FAG3ProjectReference({ formData, onUpdate }: Props) {
  useEffect(() => {
    if (formData.commissionerName) return;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data: cpData } = await supabase.rpc('get_my_company_profile');
      const cp = Array.isArray(cpData) ? cpData[0] : cpData;
      if (cp) {
        onUpdate('commissionerName', cp.inspector_name || cp.company_name || '');
        onUpdate('commissionerCompany', cp.company_name || '');
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
          <Field label="Commissioning date">
            <Input
              type="date"
              value={formData.commissioningDate || ''}
              onChange={(e) => onUpdate('commissioningDate', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="G2 installation cert ref">
            <Input
              value={formData.installationCertRef || ''}
              onChange={(e) => onUpdate('installationCertRef', e.target.value)}
              className={inputCn}
              placeholder="Reference of G2 cert"
            />
          </Field>
          <Field label="G1 design cert ref">
            <Input
              value={formData.designCertReference || ''}
              onChange={(e) => onUpdate('designCertReference', e.target.value)}
              className={inputCn}
              placeholder="Reference of G1 cert"
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
          <Field label="Phone">
            <Input
              type="tel"
              value={formData.clientTelephone || ''}
              onChange={(e) => onUpdate('clientTelephone', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Client email">
            <Input
              type="email"
              inputMode="email"
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

      {/* Premises */}
      <div className={cardCn}>
        <SectionHeader title="Premises" />
        <Field label="Premises name">
          <Input
            value={formData.premisesName || ''}
            onChange={(e) => onUpdate('premisesName', e.target.value)}
            className={inputCn}
          />
        </Field>
        <Field label="Premises address" required>
          <Input
            value={formData.premisesAddress || ''}
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
              placeholder="Select..."
              className={comboTriggerCn}
            />
          </Field>
          <Field label="Floors">
            <Input
              type="number"
              inputMode="numeric"
              value={formData.numberOfFloors || ''}
              onChange={(e) => onUpdate('numberOfFloors', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
      </div>

      {/* System reference */}
      <div className={cardCn}>
        <SectionHeader title="System reference" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="System category">
            <Input
              value={formData.systemCategory || ''}
              onChange={(e) => onUpdate('systemCategory', e.target.value)}
              className={inputCn}
              placeholder="e.g. L2"
            />
          </Field>
          <Field label="Panel make">
            <Input
              value={formData.systemMake || ''}
              onChange={(e) => onUpdate('systemMake', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Panel model">
            <Input
              value={formData.systemModel || ''}
              onChange={(e) => onUpdate('systemModel', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <Field label="Panel location">
          <Input
            value={formData.panelLocation || ''}
            onChange={(e) => onUpdate('panelLocation', e.target.value)}
            className={inputCn}
          />
        </Field>
      </div>
    </div>
  );
}
