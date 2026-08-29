import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import SignaturePad from '@/components/forms/SignaturePad';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import {
  SURVEY_LIMITATIONS,
  type PrePurchaseSurveyFormData,
} from '@/types/pre-purchase-survey';

/**
 * Everything on the survey that is not a photograph (ELE-1634).
 *
 * Collapsed by default, and that is a deliberate choice rather than a space
 * saving. The brief asks for camera-first with the report assembling behind the
 * shutter; putting a client-details card above the photographs would turn it
 * back into the form-then-photos wizard it is meant to replace. These open when
 * the electrician is ready for them, usually back in the van.
 */

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] ' +
  'bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 ' +
  'caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow ' +
  'focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';

const textareaCn =
  'input-underline w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent ' +
  'px-1 py-2 text-base font-medium text-white placeholder:text-white/25 caret-elec-yellow ' +
  'transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 ' +
  'focus:ring-0 focus:outline-none resize-none touch-manipulation';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-1 block text-[12px] font-medium text-white">{label}</p>
      {children}
    </div>
  );
}

function Section({
  title,
  hint,
  done,
  defaultOpen,
  children,
}: {
  title: string;
  hint?: string;
  /** Drives the completeness dot — undefined means "nothing to complete". */
  done?: boolean;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div className="-mx-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] sm:mx-0 sm:rounded-2xl sm:border-x">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex min-h-[56px] w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-white/[0.03] touch-manipulation sm:px-5"
      >
        <span className="min-w-0">
          <span className="flex items-center gap-2">
            {/*
             * A collapsed section hides whether it has been filled in. This dot
             * is the only thing that tells you, and without it the sensible
             * move is to open all four and check — which defeats collapsing
             * them in the first place.
             */}
            {done !== undefined && (
              <span
                aria-hidden="true"
                className={cn(
                  'h-1.5 w-1.5 shrink-0 rounded-full',
                  done ? 'bg-emerald-400' : 'bg-white/30'
                )}
              />
            )}
            <span className="text-[15px] font-semibold tracking-tight text-white">
              {title}
            </span>
          </span>
          {hint && <span className="mt-0.5 block text-[12px] text-white">{hint}</span>}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-white transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>
      {open && (
        <div className="space-y-4 border-t border-white/[0.08] px-4 pb-5 pt-4 sm:px-5">
          {children}
        </div>
      )}
    </div>
  );
}

interface Props {
  formData: PrePurchaseSurveyFormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: keyof PrePurchaseSurveyFormData, value: any) => void;
}

export default function SurveyDetailsSections({ formData, onUpdate }: Props) {
  return (
    <div className="space-y-3">
      <Section
        title="Who it is for"
        hint="The buyer, and the property"
        done={!!formData.clientName.trim() && !!formData.installationAddress.trim()}
      >
        <Field label="Client name">
          <input
            value={formData.clientName}
            onChange={(e) => onUpdate('clientName', e.target.value)}
            placeholder="Who commissioned the survey"
            className={inputCn}
          />
        </Field>
        <Field label="Property surveyed">
          <textarea
            value={formData.installationAddress}
            onChange={(e) => onUpdate('installationAddress', e.target.value)}
            rows={3}
            placeholder="Address of the property being bought"
            className={textareaCn}
          />
        </Field>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Email">
            <input
              type="email"
              value={formData.clientEmail}
              onChange={(e) => onUpdate('clientEmail', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Phone">
            <input
              type="tel"
              value={formData.clientPhone}
              onChange={(e) => onUpdate('clientPhone', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <Field label="Date of survey">
          <input
            type="date"
            value={formData.surveyDate}
            onChange={(e) => onUpdate('surveyDate', e.target.value)}
            className={inputCn}
          />
        </Field>
      </Section>

      <Section
        title="The property"
        hint="Helps the buyer read the findings in context"
        done={!!formData.propertyType || !!formData.extent.trim()}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Type">
            <MobileSelectPicker
              value={formData.propertyType}
              onValueChange={(v) => onUpdate('propertyType', v)}
              placeholder="Select"
              options={[
                { value: 'house', label: 'House' },
                { value: 'flat', label: 'Flat' },
                { value: 'bungalow', label: 'Bungalow' },
                { value: 'commercial', label: 'Commercial' },
                { value: 'other', label: 'Other' },
              ]}
            />
          </Field>
          <Field label="Approximate age">
            <input
              value={formData.approximateAge}
              onChange={(e) => onUpdate('approximateAge', e.target.value)}
              placeholder="e.g. 1930s, or unknown"
              className={inputCn}
            />
          </Field>
        </div>
        <Field label="What you were able to look at">
          <textarea
            value={formData.extent}
            onChange={(e) => onUpdate('extent', e.target.value)}
            rows={3}
            placeholder="e.g. All accessible areas except the loft, which was boarded"
            className={textareaCn}
          />
        </Field>
        {/*
         * 🔴 The standard wording prints whether or not this box is filled in —
         * see SURVEY_LIMITATIONS. This field ADDS to it and cannot replace it.
         * Shown here so nobody writes their own disclaimer believing the
         * standard one has been switched off.
         */}
        <Field label="Anything else that limited the survey">
          <textarea
            value={formData.limitations}
            onChange={(e) => onUpdate('limitations', e.target.value)}
            rows={3}
            placeholder="e.g. Furniture against the walls in two bedrooms"
            className={textareaCn}
          />
        </Field>
        <p className="rounded-xl border border-white/[0.12] bg-white/[0.04] p-3 text-[12px] leading-snug text-white">
          The standard wording below always prints on the report, on top of anything you
          add here.
          <span className="mt-2 block text-white">“{SURVEY_LIMITATIONS.slice(0, 168)}…”</span>
        </p>
      </Section>

      <Section
        title="Your summary"
        hint="Written by you, not drafted for you"
        done={!!formData.summary.trim()}
      >
        {/*
         * 🔴 Deliberately NOT AI-drafted, unlike the per-photo notes.
         *
         * The conclusion is the part a buyer reads first and quotes to their
         * solicitor. A machine summarising a set of photographs it never stood
         * in front of would produce something confident and unearned — and
         * unlike a per-photo note there is no photograph to check it against.
         */}
        <Field label="Overall impression">
          <textarea
            value={formData.summary}
            onChange={(e) => onUpdate('summary', e.target.value)}
            rows={5}
            placeholder="In plain English — what would you tell them if they rang you?"
            className={textareaCn}
          />
        </Field>
        <Field label="What you would recommend">
          <textarea
            value={formData.recommendations}
            onChange={(e) => onUpdate('recommendations', e.target.value)}
            rows={4}
            placeholder="e.g. Budget for a consumer unit change; commission a full EICR before exchange"
            className={textareaCn}
          />
        </Field>
      </Section>

      <Section title="Sign off" done={!!formData.surveyorName.trim() && !!formData.surveyorSignature}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Your name">
            <input
              value={formData.surveyorName}
              onChange={(e) => onUpdate('surveyorName', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Position">
            <input
              value={formData.surveyorPosition}
              onChange={(e) => onUpdate('surveyorPosition', e.target.value)}
              placeholder="e.g. Qualified Electrician"
              className={inputCn}
            />
          </Field>
        </div>
        <Field label="Signature">
          <SignaturePad onSignatureChange={(v) => onUpdate('surveyorSignature', v)} />
        </Field>
        {formData.surveyorSignature && (
          <p className="text-[12px] font-medium text-white">Signature captured</p>
        )}
      </Section>
    </div>
  );
}
