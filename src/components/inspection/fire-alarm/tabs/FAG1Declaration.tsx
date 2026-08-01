/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fire Alarm G1 Design — Tab 4: Declaration & Documentation
 * Design document reference, deviations, designer signature
 */

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

export default function FAG1Declaration({ formData, onUpdate }: Props) {
  return (
    <div className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Design documentation */}
      <div className={cardCn}>
        <SectionHeader title="Design documentation" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Design specification ref">
            <Input
              value={formData.designSpecRef || ''}
              onChange={(e) => onUpdate('designSpecRef', e.target.value)}
              className={inputCn}
              placeholder="e.g. SPEC-FA-001 Rev A"
            />
          </Field>
          <Field label="Document date">
            <Input
              type="date"
              value={formData.designDocDate || ''}
              onChange={(e) => onUpdate('designDocDate', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <Field label="Document reference">
          <Input
            value={formData.designDocRef || ''}
            onChange={(e) => onUpdate('designDocRef', e.target.value)}
            className={inputCn}
            placeholder="e.g. DWG-FA-001 Rev A"
          />
        </Field>
      </div>

      {/* Related standards */}
      <div className={cardCn}>
        <SectionHeader title="Related standards" />
        <div className="space-y-2">
          {[
            { field: 'relStdEN54', label: 'BS EN 54 — Fire detection and alarm systems' },
            { field: 'relStd5839_6', label: 'BS 5839-6 — Dwellings (Grade D/E systems)' },
            { field: 'relStd7671', label: 'BS 7671 — Wiring Regulations' },
            { field: 'relStdBuildRegs', label: 'Building Regulations Part B — Fire Safety' },
            { field: 'relStdRRO', label: 'Regulatory Reform (Fire Safety) Order 2005' },
          ].map(({ field, label }) => (
            <button
              key={field}
              type="button"
              onClick={() => onUpdate(field, !formData[field])}
              className={cn(
                'w-full min-h-11 text-left p-3.5 rounded-xl border touch-manipulation active:scale-[0.98] transition-all',
                formData[field]
                  ? 'bg-green-500 border-green-500'
                  : 'bg-white/[0.06] border-white/[0.12]'
              )}
            >
              <span
                className={cn(
                  'text-sm',
                  formData[field] ? 'text-black font-semibold' : 'text-white font-medium'
                )}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Deviations from standard */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Deviations from BS 5839-1" />
        <div className="rounded-xl border border-amber-500/30 bg-white/[0.05] p-3">
          <p className="text-[12px] text-white/85 leading-relaxed">
            Any deviations from BS 5839-1:2025 recommendations must be documented with full
            justification.
          </p>
        </div>
        <Field label="Deviations & justification">
          <Textarea
            value={formData.designDeviations || ''}
            onChange={(e) => onUpdate('designDeviations', e.target.value)}
            className={textareaCn}
            placeholder="List any departures from the standard and explain why they are acceptable..."
          />
        </Field>
      </div>

      {/* Designer declaration */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Designer declaration" />
        <div className="rounded-xl bg-white/[0.05] p-3.5">
          <p className="text-[12px] text-white/85 leading-relaxed">
            I hereby certify that the fire detection and fire alarm system design described in this
            certificate has been carried out in accordance with BS 5839-1:2025 and is based on the
            fire risk assessment referenced above. The design provides adequate detection and alarm
            coverage for the identified fire risks, except for any variations stated.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Designer name" required>
            <Input
              value={formData.designerName || ''}
              onChange={(e) => onUpdate('designerName', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Company">
            <Input
              value={formData.designerCompany || ''}
              onChange={(e) => onUpdate('designerCompany', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <Field label="Qualifications">
          <Input
            value={formData.designerQualifications || ''}
            onChange={(e) => onUpdate('designerQualifications', e.target.value)}
            className={inputCn}
            placeholder="e.g. FIA certified, BAFE SP203-1"
          />
        </Field>
        <SignatureInput
          label="Designer signature *"
          value={formData.designerSignature || ''}
          onChange={(sig) => onUpdate('designerSignature', sig || '')}
        />
        <Field label="Date">
          <Input
            type="date"
            value={formData.designerDate || ''}
            onChange={(e) => onUpdate('designerDate', e.target.value)}
            className={inputCn}
          />
        </Field>
      </div>

      {/* Notes */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Notes" />
        <Textarea
          value={formData.additionalNotes || ''}
          onChange={(e) => onUpdate('additionalNotes', e.target.value)}
          className={textareaCn}
          placeholder="Additional design notes..."
        />
      </div>
    </div>
  );
}
