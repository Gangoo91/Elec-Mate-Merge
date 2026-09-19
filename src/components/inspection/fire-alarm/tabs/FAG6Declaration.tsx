/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G6 Periodic Inspection — Tab 5: Declaration & Sign-off
 * Inspector + Responsible Person signatures, overall result, service schedule
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

export default function FAG6Declaration({ formData, onUpdate }: Props) {
  // Auto-suggest service dates
  useEffect(() => {
    if (!formData.inspectionDate) return;
    const date = new Date(formData.inspectionDate);
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
  }, [formData.inspectionDate]);

  return (
    <div className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/*
        Clause 6.4 — "All variations should be listed in the relevant system
        certificate". The Annex G statement below carves out "the variations, if
        any, stated in this certificate", so there has to be somewhere to state
        them or the carve-out points at nothing.

        This is NOT the same thing as `inspectionLimitations` on the scope tab:
        that records what could not be reached on the day, whereas a variation is
        a departure from the standard's recommendations.
      */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Variations from BS 5839-1" />
        <div className="rounded-xl border border-amber-500/30 bg-white/[0.05] p-3">
          <p className="text-[12px] leading-relaxed text-white/85">
            Any variation from the recommendations of BS 5839-1:2025 must be listed here with its
            justification. Left blank, the certificate states that there were none.
          </p>
        </div>
        <Field label="Variations & justification">
          <Textarea
            value={formData.inspectionVariations || ''}
            onChange={(e) => onUpdate('inspectionVariations', e.target.value)}
            className={textareaCn}
            placeholder="List any departures from the standard and explain why they are acceptable..."
          />
        </Field>
      </div>

      {/* Inspector declaration */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Inspector declaration" />
        <div className="rounded-xl bg-white/[0.05] px-3.5 py-3">
          <p className="text-sm leading-relaxed text-white/80">
            I/we being the competent person(s) responsible (as indicated by my/our signature(s)
            below) for the servicing of the fire detection and fire alarm system, particulars of
            which are set out in this certificate, CERTIFY that the said work for which I/we have
            been responsible complies to the best of my/our knowledge and belief with the
            recommendations of BS 5839-1:2025, Clause 43, in respect of periodic inspection and
            test, except for the variations, if any, stated in this certificate.
          </p>
          <p className="mt-2 text-[12px] italic leading-relaxed text-white/85">
            The extent of liability of the signatory is limited to the system described in this
            certificate.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Inspector name" required>
            <Input
              value={formData.inspectorName || ''}
              onChange={(e) => onUpdate('inspectorName', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Company">
            <Input
              value={formData.inspectorCompany || ''}
              onChange={(e) => onUpdate('inspectorCompany', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <Field label="Qualifications">
          <Input
            value={formData.inspectorQualifications || ''}
            onChange={(e) => onUpdate('inspectorQualifications', e.target.value)}
            className={inputCn}
            placeholder="e.g. FIA certified, BAFE SP203-1"
          />
        </Field>
        <SignatureInput
          label="Inspector signature *"
          value={formData.inspectorSignature || ''}
          onChange={(sig) => onUpdate('inspectorSignature', sig || '')}
        />
        <Field label="Date">
          <Input
            type="date"
            value={formData.inspectorDate || ''}
            onChange={(e) => onUpdate('inspectorDate', e.target.value)}
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
          label="Responsible person signature"
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
              'h-12 rounded-xl border text-sm touch-manipulation transition-all active:scale-[0.98]',
              formData.overallResult === 'satisfactory'
                ? 'border-green-500 bg-green-500 font-semibold text-black'
                : 'border-white/[0.12] bg-white/[0.06] font-medium text-white'
            )}
          >
            Satisfactory
          </button>
          <button
            type="button"
            onClick={() => onUpdate('overallResult', 'unsatisfactory')}
            className={cn(
              'h-12 rounded-xl border text-sm touch-manipulation transition-all active:scale-[0.98]',
              formData.overallResult === 'unsatisfactory'
                ? 'border-red-500 bg-red-500 font-semibold text-white'
                : 'border-white/[0.12] bg-white/[0.06] font-medium text-white'
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
