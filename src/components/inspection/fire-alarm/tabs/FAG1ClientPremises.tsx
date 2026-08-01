/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G1 Design — Tab 1: Client & Premises
 * Client details, premises, FRA reference (mandatory for design justification)
 */

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';
import ComboboxCell from '@/components/table-cells/ComboboxCell';
import CertificateClientSection from '@/components/inspection/shared/CertificateClientSection';
import FireAlarmPhotoUpload from '@/components/inspection/fire-alarm/FireAlarmPhotoUpload';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

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

export default function FAG1ClientPremises({ formData, onUpdate }: Props) {
  // Auto-load designer details from company profile
  useEffect(() => {
    if (formData.designerName) return;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data: cpData } = await supabase.rpc('get_my_company_profile');
      const cp = Array.isArray(cpData) ? cpData[0] : cpData;
      if (cp) {
        onUpdate('designerName', cp.inspector_name || cp.company_name || '');
        onUpdate('designerCompany', cp.company_name || '');
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
          <Field label="Design date">
            <Input
              type="date"
              value={formData.designDate || ''}
              onChange={(e) => onUpdate('designDate', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        {/* New vs Modification */}
        <Field label="System type">
          <div className="flex gap-2">
            {[
              { value: 'new', label: 'New System' },
              { value: 'modification', label: 'Modification to Existing' },
            ].map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => onUpdate('systemScope', value)}
                className={cn(
                  'flex-1 min-h-11 rounded-xl border px-3 py-2.5 text-sm touch-manipulation active:scale-[0.98] transition-all',
                  formData.systemScope === value
                    ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
                    : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </Field>
        {formData.systemScope === 'modification' && (
          <Field label="Original certificate reference">
            <Input
              value={formData.originalCertRef || ''}
              onChange={(e) => onUpdate('originalCertRef', e.target.value)}
              className={inputCn}
              placeholder="Reference of existing system cert"
            />
          </Field>
        )}
        <Field label="System extent">
          <Textarea
            value={formData.systemExtent || ''}
            onChange={(e) => onUpdate('systemExtent', e.target.value)}
            className={textareaCn}
            placeholder="Describe the areas and floors covered by this system design..."
          />
        </Field>
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
          <Field label="Floor area (m2)">
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

      {/* Building construction (unique to G1) */}
      <div className={cardCn}>
        <SectionHeader title="Building construction" />
        <Field label="Ceiling type and height">
          <ComboboxCell
            value={formData.ceilingType || ''}
            onChange={(v) => onUpdate('ceilingType', v)}
            options={[
              { value: 'Flat plasterboard 2.4m', label: 'Flat plasterboard 2.4m' },
              { value: 'Flat plasterboard 2.7m', label: 'Flat plasterboard 2.7m' },
              { value: 'Flat plasterboard 3.0m', label: 'Flat plasterboard 3.0m' },
              { value: 'Suspended tiles 2.7m', label: 'Suspended tiles 2.7m' },
              { value: 'Suspended tiles 3.0m', label: 'Suspended tiles 3.0m' },
              { value: 'Exposed soffit 3.5m', label: 'Exposed soffit 3.5m' },
              { value: 'Exposed soffit 4.0m+', label: 'Exposed soffit 4.0m+' },
              { value: 'Vaulted/pitched', label: 'Vaulted / pitched' },
            ]}
            placeholder="Select or type..."
            className="h-11 text-base"
          />
        </Field>
        <Field label="Beam / joist spacing">
          <ComboboxCell
            value={formData.beamSpacing || ''}
            onChange={(v) => onUpdate('beamSpacing', v)}
            options={[
              { value: 'No beams', label: 'No beams' },
              { value: '600mm centres', label: '600mm centres' },
              { value: '1200mm centres', label: '1200mm centres' },
              { value: 'Closely spaced (<1m)', label: 'Closely spaced (<1m)' },
              { value: 'Widely spaced (>1m)', label: 'Widely spaced (>1m)' },
            ]}
            placeholder="Select or type..."
            className="h-11 text-base"
          />
        </Field>
        <Field label="Ventilation and airflow">
          <Input
            value={formData.ventilationNotes || ''}
            onChange={(e) => onUpdate('ventilationNotes', e.target.value)}
            className={inputCn}
            placeholder="e.g. Mechanical extract in kitchen"
          />
        </Field>
        <Field label="Construction notes">
          <Textarea
            value={formData.buildingConstructionNotes || ''}
            onChange={(e) => onUpdate('buildingConstructionNotes', e.target.value)}
            className={textareaCn}
            placeholder="Any building features that affect detector performance or placement..."
          />
        </Field>
        <Field label="Survey photos">
          <FireAlarmPhotoUpload
            photos={formData.photos || []}
            onPhotosChange={(photos) => onUpdate('photos', photos)}
            title="Survey photos"
          />
        </Field>
      </div>

      {/* Fire risk assessment (mandatory for G1) */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Fire risk assessment" />
        <div className="rounded-xl border border-amber-500/30 bg-white/[0.05] p-3">
          <p className="text-[12px] text-white/85 leading-relaxed">
            The system design must be based on the building's fire risk assessment. Provide the FRA
            reference below.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="FRA reference" required>
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
    </div>
  );
}
