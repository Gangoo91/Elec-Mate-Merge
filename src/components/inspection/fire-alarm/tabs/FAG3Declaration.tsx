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

const inputCn =
  'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';
const textareaCn =
  'touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';

const Section = ({
  title,
  accentColor,
  children,
}: {
  title: string;
  accentColor?: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-4">
    <div className="border-b border-white/[0.06] pb-1 mb-3">
      <div
        className={cn(
          'h-[2px] w-full rounded-full bg-gradient-to-r mb-2',
          accentColor || 'from-red-500 to-rose-400'
        )}
      />
      <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
    </div>
    {children}
  </div>
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
    <Label className="text-white text-xs mb-1.5 block">
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
    <div className="space-y-5">
      {/* Commissioner Declaration */}
      <Section title="Commissioner Declaration" accentColor="from-red-500/40 to-rose-400/20">
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 mb-3">
          <p className="text-xs text-white leading-relaxed">
            I hereby certify that the fire detection and fire alarm system described in this
            certificate has been commissioned in accordance with BS 5839-1:2025. All tests have been
            carried out satisfactorily and the system is ready for use, subject to any observations
            recorded.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Commissioner Name" required>
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
      </Section>

      {/* Responsible Person */}
      <Section
        title="Responsible Person Acknowledgement"
        accentColor="from-blue-500/40 to-cyan-400/20"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
      </Section>

      {/* Overall Result */}
      <Section title="Overall Result" accentColor="from-green-500/40 to-emerald-400/20">
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => onUpdate('overallResult', 'satisfactory')}
            className={cn(
              'w-full text-left p-4 rounded-xl border touch-manipulation active:scale-[0.98] transition-all',
              formData.overallResult === 'satisfactory'
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-white/[0.03] border-white/[0.06]'
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0',
                  formData.overallResult === 'satisfactory'
                    ? 'bg-green-500 border-green-500'
                    : 'border-white/30'
                )}
              >
                {formData.overallResult === 'satisfactory' && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <p
                className={cn(
                  'text-sm font-semibold',
                  formData.overallResult === 'satisfactory' ? 'text-green-400' : 'text-white'
                )}
              >
                Satisfactory
              </p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => onUpdate('overallResult', 'unsatisfactory')}
            className={cn(
              'w-full text-left p-4 rounded-xl border touch-manipulation active:scale-[0.98] transition-all',
              formData.overallResult === 'unsatisfactory'
                ? 'bg-red-500/10 border-red-500/30'
                : 'bg-white/[0.03] border-white/[0.06]'
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0',
                  formData.overallResult === 'unsatisfactory'
                    ? 'bg-red-500 border-red-500'
                    : 'border-white/30'
                )}
              >
                {formData.overallResult === 'unsatisfactory' && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <p
                className={cn(
                  'text-sm font-semibold',
                  formData.overallResult === 'unsatisfactory' ? 'text-red-400' : 'text-white'
                )}
              >
                Unsatisfactory
              </p>
            </div>
          </button>
        </div>
      </Section>

      {/* Service Schedule */}
      <Section title="Service Schedule" accentColor="from-amber-500/40 to-yellow-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Next Service Due">
            <Input
              type="date"
              value={formData.nextServiceDue || ''}
              onChange={(e) => onUpdate('nextServiceDue', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Next Inspection Due">
            <Input
              type="date"
              value={formData.nextInspectionDue || ''}
              onChange={(e) => onUpdate('nextInspectionDue', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
      </Section>

      {/* Notes */}
      <Section title="Notes" accentColor="from-white/20 to-white/5">
        <Textarea
          value={formData.additionalNotes || ''}
          onChange={(e) => onUpdate('additionalNotes', e.target.value)}
          className={textareaCn}
          placeholder="Additional commissioning notes..."
        />
      </Section>
    </div>
  );
}
