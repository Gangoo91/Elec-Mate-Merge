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

export default function FAG1Declaration({ formData, onUpdate }: Props) {
  return (
    <div className="space-y-5">
      {/* Design Documentation */}
      <Section title="Design Documentation" accentColor="from-red-500/40 to-rose-400/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Design Specification Ref">
            <Input
              value={formData.designSpecRef || ''}
              onChange={(e) => onUpdate('designSpecRef', e.target.value)}
              className={inputCn}
              placeholder="e.g. SPEC-FA-001 Rev A"
            />
          </Field>
          <Field label="Document Date">
            <Input
              type="date"
              value={formData.designDocDate || ''}
              onChange={(e) => onUpdate('designDocDate', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <Field label="Document Reference">
          <Input
            value={formData.designDocRef || ''}
            onChange={(e) => onUpdate('designDocRef', e.target.value)}
            className={inputCn}
            placeholder="e.g. DWG-FA-001 Rev A"
          />
        </Field>
      </Section>

      {/* Related Standards */}
      <Section title="Related Standards" accentColor="from-blue-500/40 to-cyan-400/20">
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
                'w-full text-left p-3.5 rounded-xl border touch-manipulation active:scale-[0.98] transition-all flex items-center gap-3',
                formData[field]
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-white/[0.03] border-white/[0.06]'
              )}
            >
              <div
                className={cn(
                  'w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all',
                  formData[field] ? 'bg-green-500 border-green-500' : 'border-white/30'
                )}
              >
                {formData[field] && (
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
              <span
                className={cn(
                  'text-sm font-medium',
                  formData[field] ? 'text-green-400' : 'text-white'
                )}
              >
                {label}
              </span>
            </button>
          ))}
        </div>
      </Section>

      {/* Deviations from Standard */}
      <Section title="Deviations from BS 5839-1" accentColor="from-amber-500/40 to-yellow-400/20">
        <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 mb-3">
          <p className="text-xs text-white leading-relaxed">
            Any deviations from BS 5839-1:2025 recommendations must be documented with full
            justification.
          </p>
        </div>
        <Field label="Deviations & Justification">
          <Textarea
            value={formData.designDeviations || ''}
            onChange={(e) => onUpdate('designDeviations', e.target.value)}
            className={textareaCn}
            placeholder="List any departures from the standard and explain why they are acceptable..."
          />
        </Field>
      </Section>

      {/* Designer Declaration */}
      <Section title="Designer Declaration" accentColor="from-red-500/40 to-rose-400/20">
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 mb-3">
          <p className="text-xs text-white leading-relaxed">
            I hereby certify that the fire detection and fire alarm system design described in this
            certificate has been carried out in accordance with BS 5839-1:2025 and is based on the
            fire risk assessment referenced above. The design provides adequate detection and alarm
            coverage for the identified fire risks, except for any variations stated.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Designer Name" required>
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
          label="Designer Signature *"
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
      </Section>

      {/* Notes */}
      <Section title="Notes" accentColor="from-white/20 to-white/5">
        <Textarea
          value={formData.additionalNotes || ''}
          onChange={(e) => onUpdate('additionalNotes', e.target.value)}
          className={textareaCn}
          placeholder="Additional design notes..."
        />
      </Section>
    </div>
  );
}
