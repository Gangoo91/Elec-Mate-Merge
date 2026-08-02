import React, { useState, useEffect, useCallback } from 'react';
import { Check, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import FormSelectSheet from '@/components/ui/form-select-sheet';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useHaptic } from '@/hooks/useHaptic';
import {
  FieldLimitationBadge,
  isFieldMarker,
} from '@/components/field-limitations';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white';

const pickerTriggerCn =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

const chipOn = 'bg-elec-yellow border border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border border-white/[0.12] text-white font-medium';

// Fields managed by this section (for memoization comparison)
const INSPECTION_SECTION_FIELDS = [
  'purposeOfInspection',
  'otherPurpose',
  'inspectionDate',
  'nextInspectionDate',
  'inspectionInterval',
  'intervalReasons',
  'agreedWith',
  'extentOfInspection',
  'limitationsOfInspection',
  'operationalLimitations',
  'bsAmendment',
  'description', // Referenced for recommended interval
  'propertyType', // Referenced for the rented-homes interval cap (PRS 2020)
  'duplicatedFrom', // Effect guard — must re-render when a duplicate lands
] as const;

// Starting wording for the three section D free-text boxes. Surfaced via the
// "Apply standard wording" actions so inspectors don't retype boilerplate.
//
// ⚠️ limitationsOfInspection used to hold the model form's PRE-PRINTED standard
// exclusions (concealed cables / safety alerts). Those are not "agreed
// limitations" — they are printed on every report by the certificate template
// itself, so typing them into this box printed them twice. Section D box (b)
// asks for "agreed limitations INCLUDING THE REASONS", so the default here is
// now an honest statement that none were agreed, and real limitations are
// inserted from AGREED_LIMITATION_PHRASES below.
const STANDARD_SCOPE_TEXT = {
  extentOfInspection:
    'A periodic inspection and test of the electrical installation has been carried out in accordance with BS 7671. The inspection covered the consumer unit(s)/distribution board(s) and the final circuits detailed in the attached schedules of inspection and test results.',
  limitationsOfInspection:
    'None agreed with the client prior to the inspection, other than the standard exclusions printed on this report.',
  operationalLimitations:
    'None agreed prior to the inspection, unless otherwise stated above.',
} as const;

type StandardScopeField = keyof typeof STANDARD_SCOPE_TEXT;

// Agreed limitations, each written WITH its reason because the model form's own
// wording demands it ("agreed limitations including the reasons"). These are the
// inspector's operational statements about this job — they are NOT BS 7671 text
// and must never be attributed to the standard.
const AGREED_LIMITATION_PHRASES = [
  'Loft space not accessible — no safe access available at the time of inspection.',
  'Consumer unit could not be isolated — premises occupied and in use.',
  'Socket-outlets behind fixed furniture and white goods were not accessed — the units could not be moved without risk of damage.',
  "Areas occupied by the tenant's belongings were not inspected — the client agreed the belongings would not be moved.",
  'Fire alarm and emergency lighting systems excluded — covered by separate certification.',
  'Underground and external circuits beyond the origin not inspected — no excavation or ground disturbance was agreed.',
] as const;

// The model form's PRE-PRINTED exclusions, verbatim. Single source of truth for
// BOTH the read-only display block below AND the strip applied to saved scope —
// the certificate template hard-codes these, so they must never be re-inserted
// into the agreed-limitations box from an inspector's remembered wording.
const PREPRINTED_LIMITATION_SENTENCES = [
  'Cables concealed within trunking and conduits, under floors, in roof spaces, and generally within the fabric of the building or underground, have not been inspected.',
  'No checks for safety alerts, corrective actions or product recalls for electrical equipment forming part of the installation have been made.',
] as const;

const stripPrePrinted = (value: string) =>
  PREPRINTED_LIMITATION_SENTENCES.reduce(
    (acc, sentence) => acc.split(sentence).join(' '),
    value || ''
  )
    .replace(/\s{2,}/g, ' ')
    .trim();

// Extent presets compose a section D statement sentence by sentence rather than
// dropping one canned paragraph. Sampling wording is normal GN3 practice, stated
// as what the inspector did — not as a regulation claim.
const EXTENT_SAMPLE_SENTENCE = (percent: string) =>
  `A ${percent}% sample of accessories and accessible joint boxes was inspected.`;

// Matches the sample sentence at ANY percentage, so the row can show whether one
// is already in the box and remove it — the percentage in state is not
// necessarily the percentage that was inserted.
const EXTENT_SAMPLE_RE =
  /A \d+% sample of accessories and accessible joint boxes was inspected\.\s*/;

// min/max on a number input are not enforced on typed input — clamp before the
// figure goes anywhere near the certificate. "A 0% sample was inspected" is not
// a statement anyone should be able to sign.
const clampPercent = (raw: string) => {
  const trimmed = (raw || '').trim();
  if (!trimmed) return null; // empty box keeps Insert disabled
  const n = Math.round(Number(trimmed));
  if (!Number.isFinite(n)) return null;
  return String(Math.min(100, Math.max(1, n)));
};

const EXTENT_AREAS_STUB =
  'The inspection was limited to the following parts of the installation: ';

// Remembers the inspector's last-used scope wording (per device) so it can be
// re-applied on future EICRs without retyping — see the "Apply my saved" action.
const SAVED_SCOPE_KEY = 'eicr:savedInspectionScope';
// Separate key on purpose — SAVED_SCOPE_KEY's shape (the trio, nothing else) is
// relied on by hasSavedScope/applyMySaved and must not gain extra members.
const SAVED_SCOPE_AT_KEY = 'eicr:savedInspectionScopeAt';
type SavedScope = Record<StandardScopeField, string>;

// Inspectors who filled Limitations before this change have the PRE-PRINTED
// exclusions sitting in their remembered scope. Handing that back via "Apply my
// saved" would print them twice, so strip them on the way in and out of storage.
const sanitiseSavedScope = (scope: SavedScope | null): SavedScope | null => {
  if (!scope) return scope;
  const cleaned = stripPrePrinted((scope.limitationsOfInspection || '').toString());
  return cleaned === scope.limitationsOfInspection
    ? scope
    : { ...scope, limitationsOfInspection: cleaned };
};

interface InspectionDetailsSectionProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formData: any;
  onUpdate: (field: string, value: string) => void;
}

const SectionHeading = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const FormField = ({
  label,
  required,
  hint,
  trailing,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  trailing?: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div>
    {/* Fixed-height label row so a field WITH a trailing action (e.g. "Today")
        keeps its input on the same baseline as the field beside it — the two
        date underlines must line up. */}
    {/* h-8 clears the N/A / LIM badges (h-7/h-8) so they never sit on the
        field below, and being FIXED it keeps every field on one baseline —
        a field with a trailing action lines up with one without. */}
    <div className="mb-2 flex h-8 items-center justify-between gap-2">
      <Label className={labelCn}>
        {label}
        {required && ' *'}
      </Label>
      {trailing}
    </div>
    {children}
    {hint && <span className="text-xs text-white block mt-1">{hint}</span>}
  </div>
);

// Quiet header action — sits beside a section heading, never shouts.
const quietChipCn =
  'h-11 rounded-xl border border-white/[0.12] bg-white/[0.06] px-3 text-[12px] font-medium text-white transition-colors hover:border-white/[0.3] touch-manipulation active:scale-[0.98] disabled:opacity-40';

// Inline field action — matches the existing "Use standard" chrome so the label
// row keeps its height.
// py/-my are paired so the HIT box is a full 44px while the LAYOUT box stays
// ~14px — the h-8 label row keeps its height and every field keeps its baseline.
const fieldActionCn =
  'px-2 -mx-2 py-[15px] -my-[15px] inline-flex items-center text-[11px] font-medium text-elec-yellow touch-manipulation whitespace-nowrap';

/**
 * ScopePicker — wording picker for the section D free-text boxes.
 *
 * Mobile: bottom sheet. Desktop: anchored dropdown (same branch FormSelectSheet
 * makes — a drawer sliding up over a desktop form hides the fields you're
 * filling in). Body is a render prop so each field can offer its own rows.
 */
const ScopePicker = ({
  triggerLabel,
  triggerClassName,
  title,
  subtitle,
  children,
}: {
  triggerLabel: string;
  triggerClassName?: string;
  title: string;
  subtitle?: string;
  children: (close: () => void) => React.ReactNode;
}) => {
  const isMobile = useIsMobile();
  const haptic = useHaptic();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  const triggerCn = triggerClassName || quietChipCn;

  if (!isMobile) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button type="button" className={triggerCn} onClick={() => haptic.light()}>
            {triggerLabel}
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={6}
          className="z-[9999] w-[min(92vw,460px)] overflow-hidden rounded-xl border border-white/[0.14] bg-[hsl(0_0%_16%)] p-0 shadow-[0_16px_40px_rgba(0,0,0,0.55)]"
        >
          <div className="border-b border-white/[0.08] px-4 py-3">
            <h3 className="text-sm font-semibold text-white">{title}</h3>
            {subtitle && <p className="mt-0.5 text-[11px] text-white">{subtitle}</p>}
          </div>
          <div className="max-h-[360px] overflow-y-auto p-2">{children(close)}</div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <>
      <button
        type="button"
        className={triggerCn}
        onClick={() => {
          haptic.light();
          setOpen(true);
        }}
      >
        {triggerLabel}
      </button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          hideCloseButton
          className="h-[85vh] overflow-hidden rounded-t-2xl p-0 outline-none focus:outline-none focus-visible:outline-none"
        >
          <div className="flex h-full flex-col bg-background">
            <div className="flex flex-shrink-0 justify-center pb-1 pt-2">
              <div className="h-1 w-10 rounded-full bg-white/20" />
            </div>
            <div className="flex flex-shrink-0 items-start justify-between gap-2 border-b border-white/[0.08] px-4 py-3">
              <div>
                <h3 className="text-sm font-semibold text-white">{title}</h3>
                {subtitle && <p className="mt-0.5 text-[11px] text-white">{subtitle}</p>}
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="-mr-2 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg text-white touch-manipulation"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain p-3 pb-safe">
              {children(close)}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

/** Picker row — selected state is solid volt, never a translucent wash. */
const PickerRow = ({
  selected,
  onClick,
  children,
}: {
  selected?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'mb-1.5 flex w-full items-start justify-between gap-3 rounded-xl px-3 py-3 text-left text-sm transition-colors touch-manipulation active:scale-[0.99]',
      selected
        ? 'bg-elec-yellow font-semibold text-black'
        : 'border border-white/[0.1] bg-white/[0.05] text-white hover:bg-white/[0.08]'
    )}
    aria-pressed={selected}
  >
    <span className="min-w-0 leading-snug">{children}</span>
    {selected ? (
      <Check className="mt-0.5 h-4 w-4 flex-shrink-0" />
    ) : (
      <Plus className="mt-0.5 h-4 w-4 flex-shrink-0 text-white" />
    )}
  </button>
);

/**
 * InspectionDetailsSection - paper-form step for inspection purpose, dates and scope
 *
 * Performance optimised with React.memo
 */
const InspectionDetailsSectionInner = ({ formData, onUpdate }: InspectionDetailsSectionProps) => {
  const isMobile = useIsMobile();
  const haptic = useHaptic();
  const { toast } = useToast();

  // Auto-calculate next inspection date based on interval
  const calculateNextInspectionDate = () => {
    if (!formData.inspectionDate || !formData.inspectionInterval) return;

    const inspectionDate = new Date(formData.inspectionDate);
    const intervalYears = parseInt(formData.inspectionInterval);

    if (isNaN(intervalYears)) return;

    const nextDate = new Date(inspectionDate);
    nextDate.setFullYear(nextDate.getFullYear() + intervalYears);

    haptic.success();
    onUpdate('nextInspectionDate', nextDate.toISOString().split('T')[0]);
  };

  // Set today's date for inspection
  const setTodaysDate = () => {
    haptic.light();
    const today = new Date().toISOString().split('T')[0];
    onUpdate('inspectionDate', today);
  };

  // Standard wording auto-fill (Craig Soper request). A single field can be
  // filled via its "Use standard" link, or all blanks at once via the
  // section button. Bulk fill never overwrites text the inspector has typed.
  const applyStandardField = useCallback(
    (field: StandardScopeField) => {
      haptic.light();
      onUpdate(field, STANDARD_SCOPE_TEXT[field]);
    },
    [haptic, onUpdate]
  );

  const applyAllStandard = useCallback(() => {
    const fields = Object.keys(STANDARD_SCOPE_TEXT) as StandardScopeField[];
    let filled = 0;
    fields.forEach((field) => {
      // Fill blanks AND N/A markers (ELE-1169): inspectors often set Limitations
      // to "N/A", and an explicit "Apply" should replace that — only genuinely
      // typed text is preserved.
      const hasRealText =
        !!(formData[field] || '').toString().trim() && !isFieldMarker(formData[field]);
      if (!hasRealText) {
        onUpdate(field, STANDARD_SCOPE_TEXT[field]);
        filled += 1;
      }
    });
    haptic.success();
    toast({
      title: filled > 0 ? 'Standard wording applied' : 'Nothing to fill',
      description:
        filled > 0
          ? `Filled ${filled} blank field${filled === 1 ? '' : 's'}. Any text you'd already entered was left untouched.`
          : 'All scope fields already contain text — nothing was overwritten.',
    });
  }, [formData, haptic, onUpdate, toast]);

  // Remember the inspector's last-used scope wording so it can be re-applied on
  // future EICRs without retyping. Persists whenever a scope field holds real text.
  const [savedScope, setSavedScope] = useState<SavedScope | null>(() =>
    sanitiseSavedScope(storageGetJSONSync<SavedScope | null>(SAVED_SCOPE_KEY, null))
  );
  const [savedAt, setSavedAt] = useState<number | null>(() =>
    storageGetJSONSync<number | null>(SAVED_SCOPE_AT_KEY, null)
  );

  useEffect(() => {
    // A DUPLICATED cert loads with the source's scope already populated. Don't
    // let that carried-over text overwrite the inspector's own saved scope
    // (ELE-1160) — only genuine edits on a normal cert should update the store.
    if (formData.duplicatedFrom) return;
    const fields = Object.keys(STANDARD_SCOPE_TEXT) as StandardScopeField[];
    const trio = {} as SavedScope;
    let hasText = false;
    fields.forEach((f) => {
      const v = (formData[f] ?? '').toString();
      // Never remember the pre-printed exclusions — the template prints them.
      trio[f] = f === 'limitationsOfInspection' ? stripPrePrinted(v) : v;
      if (v.trim() && !isFieldMarker(v)) hasText = true;
    });
    if (hasText) {
      const now = Date.now();
      storageSetJSONSync(SAVED_SCOPE_KEY, trio);
      storageSetJSONSync(SAVED_SCOPE_AT_KEY, now);
      setSavedScope(trio);
      setSavedAt(now);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    formData.extentOfInspection,
    formData.limitationsOfInspection,
    formData.operationalLimitations,
  ]);

  const hasSavedScope =
    !!savedScope && Object.values(savedScope).some((v) => (v || '').trim());

  const applyMySaved = useCallback(() => {
    if (!savedScope) return;
    const fields = Object.keys(STANDARD_SCOPE_TEXT) as StandardScopeField[];
    let filled = 0;
    fields.forEach((field) => {
      const saved = (savedScope[field] || '').trim();
      // Fill blanks AND N/A markers (ELE-1169) — only genuinely typed text is kept.
      const hasRealText =
        !!(formData[field] || '').toString().trim() && !isFieldMarker(formData[field]);
      if (saved && !hasRealText) {
        onUpdate(field, savedScope[field]);
        filled += 1;
      }
    });
    haptic.success();
    toast({
      title: filled > 0 ? 'Your saved wording applied' : 'Nothing to fill',
      description:
        filled > 0
          ? `Filled ${filled} blank field${filled === 1 ? '' : 's'} from your saved scope. Existing text was left untouched.`
          : 'All scope fields already contain text — nothing was overwritten.',
    });
  }, [savedScope, formData, haptic, onUpdate, toast]);

  // Escape hatch (ELE-1160): a duplicated cert carries the source's scope text,
  // which the blank-only Apply buttons can't overwrite — leaving the inspector
  // stuck with stale wording. Let them clear the scope fields in one tap, then
  // re-apply their saved/standard wording.
  const clearScope = useCallback(() => {
    haptic.light();
    (['extentOfInspection', 'limitationsOfInspection', 'operationalLimitations'] as const).forEach(
      (f) => onUpdate(f, '')
    );
    toast({
      title: 'Scope cleared',
      description: 'Now tap Apply my saved or Apply standard wording.',
    });
  }, [haptic, onUpdate, toast]);

  const hasScopeText = (
    ['extentOfInspection', 'limitationsOfInspection', 'operationalLimitations'] as const
  ).some((f) => ((formData[f] || '') as string).trim() && !isFieldMarker(formData[f]));

  // The scope is remembered automatically as you type (effect above). This is
  // the deliberate version of the same thing — so saving isn't invisible, and
  // so a duplicated cert (where the silent save is suppressed, ELE-1160) can
  // still be promoted to the inspector's default on purpose.
  const saveCurrentAsDefault = useCallback(() => {
    const trio = {} as SavedScope;
    (Object.keys(STANDARD_SCOPE_TEXT) as StandardScopeField[]).forEach((f) => {
      const v = (formData[f] ?? '').toString();
      // Never remember the pre-printed exclusions — the template prints them.
      trio[f] = f === 'limitationsOfInspection' ? stripPrePrinted(v) : v;
    });
    const now = Date.now();
    storageSetJSONSync(SAVED_SCOPE_KEY, trio);
    storageSetJSONSync(SAVED_SCOPE_AT_KEY, now);
    setSavedScope(trio);
    setSavedAt(now);
    haptic.success();
    toast({
      title: 'Saved as your default',
      description: 'This wording will be offered on your next EICR.',
    });
  }, [formData, haptic, toast]);

  const savedAtLabel = savedAt
    ? new Date(savedAt).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  // Phrase insertion — appends a complete sentence, never overwrites what the
  // inspector has typed. Tapping an already-inserted phrase takes it back out.
  const scopeText = (field: StandardScopeField) => {
    const raw = (formData[field] ?? '').toString();
    // ELE-1169 — an explicit insert replaces an N/A marker; typed text is kept.
    return isFieldMarker(raw) ? '' : raw;
  };

  // NB: the "already there?" test runs against the RAW value — a phrase that
  // ends in a space (the areas stub) would otherwise go missing once it sits at
  // the end of the box and get inserted twice.
  const togglePhrase = (field: StandardScopeField, phrase: string) => {
    haptic.light();
    const current = scopeText(field);
    if (current.includes(phrase)) {
      onUpdate(field, current.split(phrase).join(' ').replace(/\s{2,}/g, ' ').trim());
      return;
    }
    const base = current.trim();
    onUpdate(field, base ? `${base} ${phrase}` : phrase);
  };

  const insertPhrase = (field: StandardScopeField, phrase: string) => {
    haptic.light();
    const current = scopeText(field);
    if (current.includes(phrase)) return;
    const base = current.trim();
    onUpdate(field, base ? `${base} ${phrase}` : phrase);
  };

  const clearField = (field: StandardScopeField) => {
    haptic.light();
    onUpdate(field, '');
  };

  // Picker-local entry state
  const [customLimitation, setCustomLimitation] = useState('');
  const [samplePercent, setSamplePercent] = useState('10');
  // Is a sample sentence (at any percentage) already in the statement? Drives
  // the row's selected state and flips Insert to Remove.
  const sampleInserted = EXTENT_SAMPLE_RE.test(scopeText('extentOfInspection'));

  // Industry-guidance starting points by premises type. BS 7671 itself
  // prescribes NO fixed intervals — Reg 652.1/653.4 leave the frequency to the
  // inspector's judgement based on the installation's type, use and condition.
  // These figures are conventional guidance only, never a BS 7671 requirement.
  const getRecommendedInterval = (propertyType: string) => {
    const recommendations: { [key: string]: string } = {
      domestic: '10',
      commercial: '5',
      industrial: '1',
      'domestic-dwelling': '10',
      'commercial-office': '5',
      'retail-shop': '5',
      'industrial-unit': '1',
      'healthcare-facility': '1',
      'hotel-accommodation': '1',
      'school-education': '5',
    };
    return recommendations[propertyType] || '5';
  };

  // One statutory hard limit does exist: rented homes in England must be
  // inspected at least every 5 years (Electrical Safety Standards in the
  // Private Rented Sector (England) Regulations 2020). Detect a rented
  // context from the property type (HMO is definitionally rented; custom
  // entries may say "rented flat") or a rental/landlord purpose, and cap the
  // suggestion at 5 years — never let the domestic 10-year guidance surface
  // for a rental.
  const rentalWording = /\b(rent(ed|al)?|landlord|tenan\w*|letting|hmo|prs)\b/i;
  const isRentedProperty =
    formData.propertyType === 'hmo' ||
    rentalWording.test((formData.propertyType || '').toString()) ||
    (formData.purposeOfInspection === 'other' &&
      rentalWording.test((formData.otherPurpose || '').toString()));

  const baseInterval = getRecommendedInterval(formData.description);
  const rentalCapApplies = isRentedProperty && parseInt(baseInterval, 10) > 5;
  const suggestedInterval = rentalCapApplies ? '5' : baseInterval;

  // ELE-882 — Track whether the user has manually overridden the next
  // inspection date. Once they have, never silently recompute it again.
  // Initial value: if a date already exists when the component mounts (loaded
  // cert), assume it's intentional unless the user explicitly clears it.
  const [manualNextDate, setManualNextDate] = useState<boolean>(
    !!formData.nextInspectionDate
  );

  // ELE-882 — Removed silent auto-set of inspectionInterval on description
  // change. Was setting 10y for domestic without consent, and 5y as a
  // fallback for unrecognised property types. The recommended interval is
  // now only surfaced visually next to the interval picker (see render below)
  // — the user must tap a button to apply it. No silent writes.

  // Auto-calculate next inspection only when the user hasn't manually set it.
  // ELE-882 — was overwriting any manual edit on every parent re-render.
  React.useEffect(() => {
    if (manualNextDate) return;
    if (formData.inspectionDate && formData.inspectionInterval) {
      calculateNextInspectionDate();
    }
  }, [formData.inspectionDate, formData.inspectionInterval, manualNextDate]);

  const isOtherPurposeRequired = formData.purposeOfInspection === 'other';

  // Purpose option buttons
  const purposeOptions = [
    { value: 'periodic', label: 'Periodic', shortLabel: 'Periodic' },
    { value: 'change-of-occupancy', label: 'Change of occupancy', shortLabel: 'Occupancy' },
    { value: 'change-of-use', label: 'Change of use', shortLabel: 'Use change' },
    { value: 'extension', label: 'Extension', shortLabel: 'Extension' },
    { value: 'other', label: 'Other', shortLabel: 'Other' },
  ];

  // Interval options
  const intervalOptions = [
    { value: '1', label: '1 year' },
    { value: '3', label: '3 years' },
    { value: '5', label: '5 years' },
    { value: '10', label: '10 years' },
  ];

  return (
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Purpose of inspection */}
      <div className={cardCn}>
        <SectionHeading title="Purpose of inspection" />
        <FormField label="Purpose" required>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {purposeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  haptic.light();
                  onUpdate(
                    'purposeOfInspection',
                    formData.purposeOfInspection === option.value ? '' : option.value
                  );
                }}
                className={cn(
                  'h-11 rounded-xl text-sm px-2 transition-all touch-manipulation active:scale-[0.98]',
                  formData.purposeOfInspection === option.value ? chipOn : chipOff
                )}
              >
                {isMobile ? option.shortLabel : option.label}
              </button>
            ))}
          </div>
        </FormField>

        {isOtherPurposeRequired && (
          <FormField label="Other purpose" required>
            <Input
              value={formData.otherPurpose || ''}
              onChange={(e) => onUpdate('otherPurpose', e.target.value)}
              placeholder="Please specify the purpose"
              className={inputCn}
            />
          </FormField>
        )}
      </div>

      {/* Inspection dates */}
      <div className={cardCn}>
        <SectionHeading title="Inspection dates" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField
            label="Date of inspection"
            required
            trailing={
              <button
                type="button"
                onClick={setTodaysDate}
                className="px-2 -mx-2 py-3 -my-3 inline-flex items-center text-[11px] font-medium text-elec-yellow touch-manipulation"
              >
                Today
              </button>
            }
          >
            <Input
              type="date"
              value={formData.inspectionDate || ''}
              onChange={(e) => onUpdate('inspectionDate', e.target.value)}
              className={inputCn}
            />
          </FormField>
          <FormField label="Next inspection">
            <Input
              type="date"
              value={formData.nextInspectionDate || ''}
              onChange={(e) => {
                // ELE-882 — flag manual edit so the auto-calc effect stops
                // overwriting it on every parent re-render.
                setManualNextDate(true);
                onUpdate('nextInspectionDate', e.target.value);
              }}
              className={inputCn}
            />
            {manualNextDate && (
              <button
                type="button"
                onClick={() => {
                  haptic.light();
                  setManualNextDate(false); // hand control back to auto-calc
                }}
                className="px-2 -mx-2 py-3 -my-3 inline-flex items-center text-[11px] text-white/80 hover:text-elec-yellow underline mt-1.5 touch-manipulation"
              >
                Reset to auto-calculate from interval
              </button>
            )}
          </FormField>
        </div>

        <FormField label="Inspection interval" required>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {intervalOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  haptic.light();
                  onUpdate(
                    'inspectionInterval',
                    formData.inspectionInterval === option.value ? '' : option.value
                  );
                }}
                className={cn(
                  'h-11 rounded-xl text-sm transition-all touch-manipulation active:scale-[0.98]',
                  formData.inspectionInterval === option.value ? chipOn : chipOff
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          {/* ELE-882 — explicit suggestion + Apply button instead of silent
              auto-set. User must tap to apply the suggested interval — no
              silent writes. Attributed as guidance, NOT "BS 7671 recommends":
              BS 7671 prescribes no fixed intervals (Reg 652.1/653.4). */}
          {formData.description && formData.inspectionInterval !== suggestedInterval && (
            <div className="flex items-center justify-between gap-3 mt-3 rounded-xl border border-elec-yellow/30 bg-white/[0.05] px-3.5 py-2.5">
              <span className="text-xs text-white">
                Guidance for this property type:{' '}
                <span className="font-semibold text-elec-yellow">
                  {suggestedInterval} year{suggestedInterval === '1' ? '' : 's'}
                </span>
                {rentalCapApplies && (
                  <span className="block mt-0.5 text-[11px] text-white/80">
                    Statutory maximum for rented homes in England — PRS
                    Regulations 2020
                  </span>
                )}
                <span className="block mt-0.5 text-[11px] text-white/80">
                  Recommended interval is the inspector&apos;s judgement — Reg
                  652.1/653.4
                </span>
              </span>
              <button
                type="button"
                onClick={() => {
                  haptic.light();
                  onUpdate('inspectionInterval', suggestedInterval);
                }}
                className="h-11 flex-shrink-0 rounded-lg bg-elec-yellow px-4 text-[13px] font-semibold text-black touch-manipulation active:scale-[0.98] transition-all"
              >
                Apply
              </button>
            </div>
          )}
        </FormField>

        <FormField
          label="Reasons for interval"
          trailing={
            <FieldLimitationBadge
              compact
              value={formData.intervalReasons || ''}
              markers={['N/A']}
              onChange={(v) => onUpdate('intervalReasons', v)}
            />
          }
        >
          {isFieldMarker(formData.intervalReasons) ? (
            <Input
              value={formData.intervalReasons}
              disabled
              className={cn(inputCn, 'opacity-60')}
            />
          ) : (
            <Textarea
              value={formData.intervalReasons || ''}
              onChange={(e) => onUpdate('intervalReasons', e.target.value)}
              placeholder="e.g., Age of installation, type of premises, environmental conditions"
              className={textareaCn}
            />
          )}
        </FormField>
      </div>

      {/* Inspection scope */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        {/* Heading + its actions on one row — the shortcuts belong to this card,
            not floating above the fields. */}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">
            Inspection scope
          </h2>
          {/* Phone: two per row on their own line rather than three ragged rows */}
          <div className="grid w-full grid-cols-2 gap-1.5 sm:flex sm:w-auto sm:flex-wrap sm:items-center">
            {hasSavedScope && (
              <button type="button" onClick={applyMySaved} className={quietChipCn}>
                Apply my saved
              </button>
            )}
            <button type="button" onClick={applyAllStandard} className={quietChipCn}>
              Apply standard wording
            </button>
            <button
              type="button"
              onClick={saveCurrentAsDefault}
              disabled={!hasScopeText}
              className={quietChipCn}
            >
              Save current as my default
            </button>
            {hasScopeText && (
              <button type="button" onClick={clearScope} className={quietChipCn}>
                Clear scope
              </button>
            )}
          </div>
        </div>

        <p className="-mt-1 text-[11px] leading-relaxed text-white">
          {savedAtLabel
            ? `Your wording is remembered as you type — last saved ${savedAtLabel}. `
            : 'Your wording is remembered as you type, ready for your next EICR. '}
          Use N/A when a box has nothing to record; LIM records that the extent
          itself was limited.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField
            label="Agreed with"
            hint="Who the limitations were agreed with before the inspection."
            trailing={
              <FieldLimitationBadge
                compact
                value={formData.agreedWith || ''}
                markers={['N/A']}
                onChange={(v) => onUpdate('agreedWith', v)}
              />
            }
          >
            <Input
              value={formData.agreedWith || ''}
              onChange={(e) => onUpdate('agreedWith', e.target.value)}
              placeholder="Name of person"
              disabled={isFieldMarker(formData.agreedWith)}
              className={cn(inputCn, isFieldMarker(formData.agreedWith) && 'opacity-60')}
            />
          </FormField>
          <FormField label="BS 7671 edition">
            <FormSelectSheet
              value={formData.bsAmendment || 'amd4-2026'}
              onValueChange={(value) => onUpdate('bsAmendment', value)}
              label="BS 7671 edition"
              placeholder="Select"
              options={[
                { value: 'amd1-2020', label: 'Amendment 1 (2020)' },
                { value: 'amd2-2022', label: 'Amendment 2 (2022)' },
                { value: 'amd3-2024', label: 'Amendment 3 (2024)' },
                { value: 'amd4-2026', label: 'Amendment 4 (2026)' },
              ]}
              className={pickerTriggerCn}
            />
          </FormField>
        </div>

        <FormField
          label="Extent of inspection"
          required
          hint="Section D — the parts of the installation that have been inspected and tested."
          trailing={
            <div className="flex items-center gap-2.5">
              {!isFieldMarker(formData.extentOfInspection) && (
                <ScopePicker
                  triggerLabel="Presets"
                  triggerClassName={fieldActionCn}
                  title="Extent of inspection"
                  subtitle="Build the statement a sentence at a time. Nothing you have typed is replaced."
                >
                  {(close) => (
                    <div>
                      <PickerRow
                        selected={scopeText('extentOfInspection').includes(
                          STANDARD_SCOPE_TEXT.extentOfInspection
                        )}
                        onClick={() =>
                          togglePhrase(
                            'extentOfInspection',
                            STANDARD_SCOPE_TEXT.extentOfInspection
                          )
                        }
                      >
                        <span className="block font-semibold">Full inspection</span>
                        <span className="block text-[11px] leading-snug">
                          {STANDARD_SCOPE_TEXT.extentOfInspection}
                        </span>
                      </PickerRow>

                      {/* Sampling — normal GN3 practice, written as a statement of
                          what was done, not as a regulation claim. */}
                      <div
                        // The row stays neutral whether or not the sentence is
                        // in. Filling it volt put a translucent volt block
                        // behind an input and a button, which renders muddy
                        // brown on this ground — the state is carried by the
                        // tick, the wording and the Insert/Remove label instead.
                        className="mb-1.5 rounded-xl border border-white/[0.1] bg-white/[0.05] p-3"
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="block text-sm font-semibold text-white">Sampled</span>
                          {sampleInserted && (
                            <Check className="h-4 w-4 flex-shrink-0 text-elec-yellow" />
                          )}
                        </span>
                        <span className="mt-0.5 block text-[11px] leading-snug text-white">
                          {sampleInserted
                            ? 'In the statement. Tap Remove to take it out.'
                            : `Adds: ${EXTENT_SAMPLE_SENTENCE(clampPercent(samplePercent) || 'n')}`}
                        </span>
                        <div className="mt-2.5 flex items-end gap-3">
                          <div className="w-24">
                            <Label className={cn(labelCn, 'mb-1 block')}>Sample %</Label>
                            <Input
                              type="number"
                              inputMode="numeric"
                              min={1}
                              max={100}
                              value={samplePercent}
                              onChange={(e) => setSamplePercent(e.target.value)}
                              className={inputCn}
                            />
                          </div>
                          <button
                            type="button"
                            disabled={!sampleInserted && !clampPercent(samplePercent)}
                            onClick={() => {
                              const current = scopeText('extentOfInspection');
                              if (sampleInserted) {
                                haptic.light();
                                onUpdate(
                                  'extentOfInspection',
                                  current.replace(EXTENT_SAMPLE_RE, '').replace(/\s{2,}/g, ' ').trim()
                                );
                                return;
                              }
                              const pct = clampPercent(samplePercent);
                              if (!pct) return;
                              setSamplePercent(pct);
                              insertPhrase('extentOfInspection', EXTENT_SAMPLE_SENTENCE(pct));
                            }}
                            className={cn(
                              'h-11 flex-1 rounded-xl text-sm font-semibold transition-all touch-manipulation active:scale-[0.98] disabled:opacity-40',
                              // Solid volt to add; neutral to remove. Never a
                              // volt tint — it goes brown on this ground.
                              sampleInserted
                                ? 'border border-white/[0.16] bg-white/[0.08] text-white'
                                : 'bg-elec-yellow text-black'
                            )}
                          >
                            {sampleInserted ? 'Remove' : 'Insert'}
                          </button>
                        </div>
                      </div>

                      <PickerRow
                        selected={scopeText('extentOfInspection').includes(
                          EXTENT_AREAS_STUB.trim()
                        )}
                        onClick={() => togglePhrase('extentOfInspection', EXTENT_AREAS_STUB)}
                      >
                        <span className="block font-semibold">Limited to specific areas</span>
                        <span className="block text-[11px] leading-snug">
                          Adds an opening line for you to finish in the box.
                        </span>
                      </PickerRow>

                      <div className="mt-2 flex gap-2 border-t border-white/[0.08] pt-3">
                        <button
                          type="button"
                          onClick={() => clearField('extentOfInspection')}
                          className="h-11 flex-1 rounded-xl border border-white/[0.12] bg-white/[0.06] text-sm font-medium text-white touch-manipulation active:scale-[0.98]"
                        >
                          Clear box
                        </button>
                        <button
                          type="button"
                          onClick={close}
                          className="h-11 flex-1 rounded-xl bg-elec-yellow text-sm font-semibold text-black touch-manipulation active:scale-[0.98]"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  )}
                </ScopePicker>
              )}
              <FieldLimitationBadge
                compact
                value={formData.extentOfInspection || ''}
                markers={['LIM']}
                onChange={(v) => onUpdate('extentOfInspection', v)}
              />
            </div>
          }
        >
          {isFieldMarker(formData.extentOfInspection) ? (
            <Input
              value={formData.extentOfInspection}
              disabled
              className={cn(inputCn, 'opacity-60')}
            />
          ) : (
            <Textarea
              value={formData.extentOfInspection || ''}
              onChange={(e) => onUpdate('extentOfInspection', e.target.value)}
              placeholder="Areas, circuits, and systems inspected"
              className={textareaCn}
            />
          )}
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <FormField
            label="Agreed limitations"
            hint="Give the reason for each one — the model form asks for limitations including the reasons."
            trailing={
              <div className="flex items-center gap-2.5">
                {!isFieldMarker(formData.limitationsOfInspection) && (
                  <ScopePicker
                    triggerLabel="Add limitation"
                    triggerClassName={fieldActionCn}
                    title="Agreed limitations"
                    subtitle="Each one is inserted with its reason. Tap again to take it back out — your own text is never replaced."
                  >
                    {(close) => (
                      <div>
                        {AGREED_LIMITATION_PHRASES.map((phrase) => (
                          <PickerRow
                            key={phrase}
                            selected={scopeText('limitationsOfInspection').includes(phrase)}
                            onClick={() => togglePhrase('limitationsOfInspection', phrase)}
                          >
                            {phrase}
                          </PickerRow>
                        ))}

                        <div className="mt-2 rounded-xl border border-white/[0.1] bg-white/[0.05] p-3">
                          <Label className={cn(labelCn, 'mb-1 block')}>Add your own</Label>
                          <Input
                            value={customLimitation}
                            onChange={(e) => setCustomLimitation(e.target.value)}
                            placeholder="Limitation — and the reason for it"
                            className={inputCn}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && customLimitation.trim()) {
                                e.preventDefault();
                                insertPhrase('limitationsOfInspection', customLimitation.trim());
                                setCustomLimitation('');
                              }
                            }}
                          />
                          <button
                            type="button"
                            disabled={!customLimitation.trim()}
                            onClick={() => {
                              insertPhrase('limitationsOfInspection', customLimitation.trim());
                              setCustomLimitation('');
                            }}
                            className="mt-2.5 h-11 w-full rounded-xl bg-elec-yellow text-sm font-semibold text-black transition-all touch-manipulation active:scale-[0.98] disabled:opacity-40"
                          >
                            Add to limitations
                          </button>
                        </div>

                        <div className="mt-2 flex gap-2 border-t border-white/[0.08] pt-3">
                          <button
                            type="button"
                            onClick={() => clearField('limitationsOfInspection')}
                            className="h-11 flex-1 rounded-xl border border-white/[0.12] bg-white/[0.06] text-sm font-medium text-white touch-manipulation active:scale-[0.98]"
                          >
                            Clear box
                          </button>
                          <button
                            type="button"
                            onClick={close}
                            className="h-11 flex-1 rounded-xl bg-elec-yellow text-sm font-semibold text-black touch-manipulation active:scale-[0.98]"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    )}
                  </ScopePicker>
                )}
                <FieldLimitationBadge
                  compact
                  value={formData.limitationsOfInspection || ''}
                  markers={['N/A']}
                  onChange={(v) => onUpdate('limitationsOfInspection', v)}
                />
              </div>
            }
          >
            {isFieldMarker(formData.limitationsOfInspection) ? (
              <Input
                value={formData.limitationsOfInspection}
                disabled
                className={cn(inputCn, 'opacity-60')}
              />
            ) : (
              <Textarea
                value={formData.limitationsOfInspection || ''}
                onChange={(e) => onUpdate('limitationsOfInspection', e.target.value)}
                placeholder="e.g. Loft space not accessible — no safe access available"
                className={textareaCn}
              />
            )}
          </FormField>
          <FormField
            label="Operational limitations"
            hint="Anything that stopped the installation being worked on — and why."
            trailing={
              <div className="flex items-center gap-2.5">
                {!isFieldMarker(formData.operationalLimitations) && (
                  <button
                    type="button"
                    onClick={() => applyStandardField('operationalLimitations')}
                    className={fieldActionCn}
                  >
                    Use standard
                  </button>
                )}
                <FieldLimitationBadge
                  compact
                  value={formData.operationalLimitations || ''}
                  markers={['N/A']}
                  onChange={(v) => onUpdate('operationalLimitations', v)}
                />
              </div>
            }
          >
            {isFieldMarker(formData.operationalLimitations) ? (
              <Input
                value={formData.operationalLimitations}
                disabled
                className={cn(inputCn, 'opacity-60')}
              />
            ) : (
              <Textarea
                value={formData.operationalLimitations || ''}
                onChange={(e) => onUpdate('operationalLimitations', e.target.value)}
                placeholder="Circuits not isolated, etc."
                className={textareaCn}
              />
            )}
          </FormField>
        </div>

        {/* The Section D pre-printed exclusions used to be reproduced here in
            full. Removed — the certificate template prints them on every report
            regardless, so restating them made the form busy without changing
            what the client receives. `PREPRINTED_LIMITATION_SENTENCES` stays:
            `stripPrePrinted` still uses it to stop an inspector typing the same
            sentences into the limitations box a second time. */}
      </div>
    </div>
  );
};

// Memoized component - only re-renders when INSPECTION_SECTION_FIELDS change
const InspectionDetailsSection = React.memo(
  InspectionDetailsSectionInner,
  (prevProps, nextProps) => {
    // Compare only the fields this section cares about
    for (const field of INSPECTION_SECTION_FIELDS) {
      if (prevProps.formData[field] !== nextProps.formData[field]) {
        return false; // Re-render needed
      }
    }
    return prevProps.onUpdate === nextProps.onUpdate;
  }
);

InspectionDetailsSection.displayName = 'InspectionDetailsSection';

export default InspectionDetailsSection;
