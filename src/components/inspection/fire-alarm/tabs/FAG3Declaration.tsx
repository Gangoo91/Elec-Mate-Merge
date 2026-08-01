/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G3 Commissioning — Tab 5: Declaration & Sign-off
 * Commissioner + Responsible Person signatures, overall result, service schedule
 */

import { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import SignatureInput from '@/components/signature/SignatureInput';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

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

export default function FAG3Declaration({ formData, onUpdate }: Props) {
  // Auto-suggest service dates
  useEffect(() => {
    if (!formData.commissioningDate) return;
    const date = new Date(formData.commissioningDate);
    if (isNaN(date.getTime())) return;
    if (!formData.nextServiceDue) {
      const service = new Date(date);
      service.setMonth(service.getMonth() + 6);
      onUpdate('nextServiceDue', service.toISOString().split('T')[0]);
    }
    if (!formData.nextInspectionDue) {
      const inspection = new Date(date);
      inspection.setFullYear(inspection.getFullYear() + 1);
      onUpdate('nextInspectionDue', inspection.toISOString().split('T')[0]);
    }
  }, [formData.commissioningDate]);

  return (
    <div className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Commissioner declaration */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Commissioner declaration" />
        <div className="rounded-xl bg-white/[0.05] p-3.5">
          <p className="text-sm text-white/85 leading-relaxed">
            I hereby certify that the fire detection and fire alarm system described in this
            certificate has been commissioned in accordance with BS 5839-1:2025. All tests have been
            carried out satisfactorily and the system is ready for use, subject to any observations
            recorded.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Commissioner name" required>
            <Input
              value={formData.commissionerName || ''}
              onChange={(e) => onUpdate('commissionerName', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Company">
            <Input
              value={formData.commissionerCompany || ''}
              onChange={(e) => onUpdate('commissionerCompany', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <Field label="Qualifications">
          <Input
            value={formData.commissionerQualifications || ''}
            onChange={(e) => onUpdate('commissionerQualifications', e.target.value)}
            className={inputCn}
            placeholder="e.g. FIA certified, BAFE SP203-1"
          />
        </Field>
        <SignatureInput
          label="Commissioner Signature *"
          value={formData.commissionerSignature || ''}
          onChange={(sig) => onUpdate('commissionerSignature', sig || '')}
        />
        <Field label="Date">
          <Input
            type="date"
            value={formData.commissionerDate || ''}
            onChange={(e) => onUpdate('commissionerDate', e.target.value)}
            className={inputCn}
          />
        </Field>
      </div>

      {/* Responsible person */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Responsible person acknowledgement" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Name">
            <Input
              value={formData.responsiblePersonName || ''}
              onChange={(e) => onUpdate('responsiblePersonName', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Position">
            <Input
              value={formData.responsiblePersonPosition || ''}
              onChange={(e) => onUpdate('responsiblePersonPosition', e.target.value)}
              className={inputCn}
              placeholder="e.g. Building Manager"
            />
          </Field>
        </div>
        <SignatureInput
          label="Responsible Person Signature"
          value={formData.responsiblePersonSignature || ''}
          onChange={(sig) => onUpdate('responsiblePersonSignature', sig || '')}
        />
        <Field label="Date">
          <Input
            type="date"
            value={formData.responsiblePersonDate || ''}
            onChange={(e) => onUpdate('responsiblePersonDate', e.target.value)}
            className={inputCn}
          />
        </Field>
      </div>

      {/* Overall result */}
      <div className={cardCn}>
        <SectionHeader title="Overall result" />
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onUpdate('overallResult', 'satisfactory')}
            className={cn(
              'h-12 w-full rounded-xl border text-sm touch-manipulation active:scale-[0.98] transition-all',
              formData.overallResult === 'satisfactory'
                ? 'bg-green-500 border-green-500 text-black font-semibold'
                : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
            )}
          >
            Satisfactory
          </button>
          <button
            type="button"
            onClick={() => onUpdate('overallResult', 'unsatisfactory')}
            className={cn(
              'h-12 w-full rounded-xl border text-sm touch-manipulation active:scale-[0.98] transition-all',
              formData.overallResult === 'unsatisfactory'
                ? 'bg-red-500 border-red-500 text-white font-semibold'
                : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
            )}
          >
            Unsatisfactory
          </button>
        </div>
      </div>

      {/* Service schedule */}
      <div className={cardCn}>
        <SectionHeader title="Service schedule" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Next service due">
            <Input
              type="date"
              value={formData.nextServiceDue || ''}
              onChange={(e) => onUpdate('nextServiceDue', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Next inspection due">
            <Input
              type="date"
              value={formData.nextInspectionDue || ''}
              onChange={(e) => onUpdate('nextInspectionDue', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
      </div>

      {/* Notes */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Notes" />
        <Textarea
          value={formData.additionalNotes || ''}
          onChange={(e) => onUpdate('additionalNotes', e.target.value)}
          className={textareaCn}
          placeholder="Additional commissioning notes..."
        />
      </div>
    </div>
  );
}
