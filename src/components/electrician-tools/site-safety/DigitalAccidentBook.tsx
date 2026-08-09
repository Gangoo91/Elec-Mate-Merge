import React, { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLocalDraft } from '@/hooks/useLocalDraft';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { useShowMore } from '@/hooks/useShowMore';
import { useToast } from '@/hooks/use-toast';
import {
  useAccidentRecords,
  useCreateAccidentRecord,
  useRIDDORDeadlineCheck,
  useArchiveOldRecords,
  useMarkRIDDORReported,
  getRIDDORDeadlineStatus,
} from '@/hooks/useAccidentRecords';

import { Switch } from '@/components/ui/switch';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent } from '@/components/ui/sheet';

import {
  FilterBar,
  EmptyState,
  LoadingState,
  Eyebrow,
  Field,
  FormCard,
  SheetShell,
  PrimaryButton,
  SecondaryButton,
  selectContentClass,
  type Tone,
} from '@/components/college/primitives';
import { SafetyModuleShell, SafetyMasthead } from './common/SafetyModuleShell';
import { SignatureField } from './common/SignatureField';
import { ReadinessGate } from './common/ReadinessGate';
import { DraftRecoveryBanner } from './common/DraftRecoveryBanner';
import { DraftSaveIndicator } from './common/DraftSaveIndicator';
import { safetyInputCn, safetySelectTriggerCn, safetyTextareaCn } from './common/SafetyDocField';
import { SmartTextarea } from './common/SmartTextarea';
import { LocationAutoFill } from './common/LocationAutoFill';
import { SafetyPhotoCapture } from './common/SafetyPhotoCapture';
import { LoadMoreButton } from './common/LoadMoreButton';
import { fmtCardDate } from './common/SafetyRecordCard';
import { SafetyDocumentShare } from './common/SafetyDocumentShare';
import { RemoteSignShareSheet } from './common/RemoteSignShareSheet';
import {
  createSafetySignToken,
  buildSignUrl,
  useRecordSignatures,
} from '@/hooks/useRemoteSignToken';
import { CorrectiveActionsPanel } from './common/CorrectiveActionsPanel';
import { FiveWhysAnalysis } from './common/FiveWhysAnalysis';
import { RIDDORCountdown } from './common/RIDDORCountdown';
import { JobLinkField } from './common/JobLinkField';
import { useSparkProjects } from '@/hooks/useSparkProjects';
import { SafetyListCard, SafetyListRow } from './common/SafetyList';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { SafetyPageHeader, SafetyStatStrip } from './common/SafetyPageHeader';

// ─── Date helpers ───

/**
 * Sanitise a date string to ISO YYYY-MM-DD.
 * Handles:
 *   - Already ISO: "2026-06-04" → "2026-06-04"
 *   - UK format: "04/06/2026" → "2026-06-04"
 *   - D/M/YYYY: "4/6/2026" → "2026-06-04"
 * Returns the original string unchanged if it cannot be parsed,
 * so the DB write fails with a clear Postgres error rather than silently corrupting data.
 */
function sanitiseDateToISO(raw: string): string {
  if (!raw) return raw;
  // Already ISO YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  // UK DD/MM/YYYY or D/M/YYYY
  const ukMatch = raw.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
  if (ukMatch) {
    const [, d, m, y] = ukMatch;
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }
  return raw;
}

/**
 * Returns true if the value is a valid ISO date string or empty.
 * Used for inline validation before saving.
 */
function isValidISODate(val: string): boolean {
  if (!val) return true; // empty is allowed (optional fields)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(val)) return false;
  const d = new Date(val);
  return !isNaN(d.getTime());
}

/**
 * Optional date → ISO string or NULL. Never an empty string.
 *
 * ⚠️ This is why nothing could be saved. `return_date` and `reported_date` are
 * `date` columns, and the save used `sanitiseDateToISO(...) || ''`. PostgREST
 * inserts through `json_populate_record`, which parses `""` as a date and
 * raises `22007 invalid input syntax for type date: ""` — so every save that
 * left "Expected return" blank (i.e. every save that didn't open the optional
 * Treatment & aftermath section) came back as a 400 with a raw Postgres string
 * in the error toast. Proven against the live schema:
 *   select (json_populate_record(null::accident_records,'{"return_date":""}'::json)).return_date;
 *   → ERROR: 22007 invalid input syntax for type date: ""
 * A nullable date column wants NULL, and `|| ''` is the one value it cannot take.
 */
function toISODateOrNull(raw: string | undefined | null): string | null {
  const v = sanitiseDateToISO((raw || '').trim());
  if (!v) return null;
  return isValidISODate(v) ? v : null;
}

// ─── Types ───

type InjuryType =
  | 'cut-laceration'
  | 'burn'
  | 'electric-shock'
  | 'fracture'
  | 'sprain-strain'
  | 'bruise-contusion'
  | 'eye-injury'
  | 'chemical-exposure'
  | 'fall-injury'
  | 'crush-injury'
  | 'head-injury'
  | 'respiratory'
  | 'other';

type BodyPart =
  | 'head'
  | 'face'
  | 'eyes'
  | 'neck'
  | 'shoulder'
  | 'arm'
  | 'hand-fingers'
  | 'chest'
  | 'back'
  | 'abdomen'
  | 'hip'
  | 'leg'
  | 'knee'
  | 'foot-toes'
  | 'multiple';

type Severity = 'minor' | 'moderate' | 'major' | 'fatal';

interface AccidentRecord {
  id: string;
  // Injured person
  injured_name: string;
  injured_role: string;
  injured_employer: string;
  injured_address: string;
  // Incident
  incident_date: string;
  incident_time: string;
  location: string;
  location_detail: string;
  // Injury
  injury_type: InjuryType;
  body_part: BodyPart;
  severity: Severity;
  injury_description: string;
  // How it happened
  incident_description: string;
  activity_at_time: string;
  cause: string;
  // Witnesses
  witnesses: string;
  // Treatment
  first_aid_given: boolean;
  first_aid_details: string;
  first_aider_name: string;
  hospital_visit: boolean;
  hospital_name: string;
  // Aftermath
  time_off_work: boolean;
  days_off: number;
  return_date: string;
  // Reporting
  reported_to: string;
  reported_date: string;
  // RIDDOR
  is_riddor_reportable: boolean;
  riddor_category: string;
  riddor_reference: string;
  riddor_reported: boolean;
  riddor_deadline: string | null;
  riddor_reported_date: string | null;
  // Meta
  recorded_by: string;
  additional_notes: string;
  corrective_actions: string;
  job_id: string | null;
  photos?: string[];
  incident_number?: string;
  is_archived?: boolean;
  /** Root-cause analysis — real columns on `accident_records`. `five_whys` is
      jsonb, hence the loose element type. */
  five_whys?: unknown[];
  root_cause?: string | null;
  root_cause_category?: string | null;
  created_at: string;
}

// ─── Constants ───

const INJURY_TYPES: { id: InjuryType; label: string }[] = [
  { id: 'cut-laceration', label: 'Cut / Laceration' },
  { id: 'burn', label: 'Burn (thermal/chemical)' },
  { id: 'electric-shock', label: 'Electric Shock' },
  { id: 'fracture', label: 'Fracture / Break' },
  { id: 'sprain-strain', label: 'Sprain / Strain' },
  { id: 'bruise-contusion', label: 'Bruise / Contusion' },
  { id: 'eye-injury', label: 'Eye Injury' },
  { id: 'chemical-exposure', label: 'Chemical Exposure' },
  { id: 'fall-injury', label: 'Fall Injury' },
  { id: 'crush-injury', label: 'Crush Injury' },
  { id: 'head-injury', label: 'Head Injury' },
  { id: 'respiratory', label: 'Respiratory Issue' },
  { id: 'other', label: 'Other' },
];

const BODY_PARTS: { id: BodyPart; label: string }[] = [
  { id: 'head', label: 'Head' },
  { id: 'face', label: 'Face' },
  { id: 'eyes', label: 'Eyes' },
  { id: 'neck', label: 'Neck' },
  { id: 'shoulder', label: 'Shoulder' },
  { id: 'arm', label: 'Arm / Elbow' },
  { id: 'hand-fingers', label: 'Hand / Fingers' },
  { id: 'chest', label: 'Chest' },
  { id: 'back', label: 'Back' },
  { id: 'abdomen', label: 'Abdomen' },
  { id: 'hip', label: 'Hip / Pelvis' },
  { id: 'leg', label: 'Leg / Thigh' },
  { id: 'knee', label: 'Knee' },
  { id: 'foot-toes', label: 'Foot / Toes' },
  { id: 'multiple', label: 'Multiple Areas' },
];

// One colour dimension = severity. Fatal/major (RIDDOR immediate) = red,
// moderate = amber, minor = green.
const SEVERITIES: { id: Severity; label: string; description: string }[] = [
  { id: 'minor', label: 'Minor', description: 'First-aid only' },
  { id: 'moderate', label: 'Moderate', description: 'Treatment needed' },
  { id: 'major', label: 'Major', description: 'Specified injury' },
  { id: 'fatal', label: 'Fatal', description: 'Report immediately' },
];

function sevTone(severity: Severity): Tone {
  return severity === 'fatal' || severity === 'major'
    ? 'red'
    : severity === 'moderate'
      ? 'amber'
      : 'green';
}

/**
 * Status pills: NEUTRAL surface, COLOURED text.
 *
 * A tinted wash per state (`bg-red-500/10`, `bg-amber-500/10`, …) meant a list
 * row could carry three differently-tinted lozenges stacked on top of each
 * other, and the eye read the coloured rectangles before it read any of the
 * words. One surface for every pill puts the difference back in the only place
 * that carries meaning — the text colour — and lets the row's left accent bar
 * be the thing that shows severity at a glance.
 */
const PILL_CLASS: Record<Tone, string> = {
  red: 'bg-white/[0.05] text-red-400 border-white/10',
  orange: 'bg-white/[0.05] text-orange-400 border-white/10',
  amber: 'bg-white/[0.05] text-amber-400 border-white/10',
  green: 'bg-white/[0.05] text-emerald-400 border-white/10',
  blue: 'bg-white/[0.05] text-blue-400 border-white/10',
  emerald: 'bg-white/[0.05] text-emerald-400 border-white/10',
  purple: 'bg-white/[0.05] text-purple-400 border-white/10',
  yellow: 'bg-white/[0.05] text-elec-yellow border-white/10',
  cyan: 'bg-white/[0.05] text-cyan-400 border-white/10',
  indigo: 'bg-white/[0.05] text-indigo-400 border-white/10',
  grey: 'bg-white/[0.05] text-white border-white/10',
};

const PILL_BASE =
  'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-[0.12em] border whitespace-nowrap';

/**
 * Selected-state fill for the severity chooser. Tinted fills are still right
 * here — the colour IS the selection, not a decoration on a label.
 */
const SEV_FILL: Record<Severity, string> = {
  minor: 'border-green-500/40 bg-green-500/15 text-green-400',
  moderate: 'border-amber-500/40 bg-amber-500/15 text-amber-400',
  major: 'border-red-500/40 bg-red-500/15 text-red-400',
  fatal: 'border-red-500/40 bg-red-500/15 text-red-400',
};

const SEV_LABEL: Record<Severity, string> = {
  minor: 'Minor',
  moderate: 'Moderate',
  major: 'Major',
  fatal: 'Fatal',
};

function SevPill({ severity }: { severity: Severity }) {
  return (
    <span className={cn(PILL_BASE, PILL_CLASS[sevTone(severity)])}>
      {SEV_LABEL[severity].toUpperCase()}
    </span>
  );
}

// RIDDOR deadline status → tone for the small pill in the list/detail.
function riddorTone(status: ReturnType<typeof getRIDDORDeadlineStatus>['status']): Tone {
  return status === 'reported'
    ? 'green'
    : status === 'overdue' || status === 'immediate'
      ? 'red'
      : status === 'due_soon'
        ? 'amber'
        : 'orange';
}

/**
 * The specified-injury list, RIDDOR 2013.
 *
 * Every line below is taken from the HSE guidance held in `safety_facets`
 * ("Injuries to be reported by the quickest practicable means"), not from
 * memory. Three of the previous entries had lost the qualifier that decides
 * whether an injury is actually reportable:
 *   - the crush entry dropped "to the head or torso" and "brain";
 *   - the hypothermia entry dropped BOTH "arising from working in an enclosed
 *     space" AND "for more than 24 hours", which made every cold-weather
 *     call-out look reportable;
 *   - the fracture and sight entries dropped "diagnosed by a registered
 *     medical practitioner", which is the whole test — an electrician's
 *     opinion that a wrist is broken is not a diagnosis.
 * On a compliance screen an over-broad list is not the safe error: it trains
 * people to ignore the list.
 */
const RIDDOR_SPECIFIED_INJURIES = [
  'Any bone fracture diagnosed by a registered medical practitioner, other than to a finger, thumb or toe',
  'Amputation of an arm, hand, finger, thumb, leg, foot or toe',
  'Any injury diagnosed by a registered medical practitioner as likely to cause permanent blinding or reduction of sight in one or both eyes',
  'Any crush injury to the head or torso causing damage to the brain or to internal organs in the chest or abdomen',
  'Any burn (including scalding) covering more than 10% of the body’s total surface area, or causing significant damage to the eyes, respiratory system or other vital organs',
  'Any degree of scalping requiring hospital treatment',
  'Loss of consciousness caused by head injury or asphyxia',
  'Any other injury arising from working in an enclosed space that leads to hypothermia or heat-induced illness, or requires resuscitation or admittance to hospital for more than 24 hours',
];

/**
 * Dangerous occurrences — the entries from the RIDDOR 2013 Schedule 2 list
 * most likely to arise on electrical work. Wording follows the HSE guidance in
 * `safety_facets`.
 *
 * The short-circuit entry previously read "Electrical short circuit or overload
 * with fire or explosion", which describes a bad afternoon rather than a
 * reportable event: the stoppage/risk-of-death test is what makes it one, and
 * without it every scorched CU looked notifiable. The scaffold and structural
 * entries were missing the "over five metres" and "over five tonnes" thresholds
 * that define them.
 */
const RIDDOR_DANGEROUS_OCCURRENCES = [
  'Electrical short circuit or overload causing fire or explosion that stops the plant involved for more than 24 hours, or has the potential to cause death',
  'Plant or equipment coming into unintentional contact with an overhead electric line',
  'Collapse, overturning or failure of any load-bearing part of lifting equipment',
  'Explosion, collapse or bursting of any closed vessel or its associated pipework',
  'Collapse or partial collapse of a scaffold over five metres high, or one erected near water where there is a risk of drowning after a fall',
  'Unintended collapse of a building or structure under construction, alteration or demolition where more than five tonnes of material falls, or of a wall or floor in a place of work',
  'Accidental release of a biological agent likely to cause severe human illness',
  'Explosion or fire that suspends normal work for more than 24 hours',
];

const F2508_CHECKLIST = [
  'Name, address and telephone number of the person reporting',
  'Date, time and location of the incident',
  'Name, address and occupation of the injured person',
  'Nature of the injury or condition',
  'Brief description of the circumstances',
  'Name and address of the injured person’s employer',
  'Details of the dangerous occurrence, if applicable',
];

// ─── RIDDOR Check ───

/** The four keys `RIDDORCountdown` knows how to price a deadline for. */
type RiddorCategory = 'death' | 'specified_injury' | 'over_7_day' | 'dangerous_occurrence';

/**
 * Canonical RIDDOR category key, derived from the record's own fields.
 *
 * ⚠️ This is NOT the `riddor_category` column. That column stores the prose
 * reasons (`reasons.join('; ')`), and the detail sheet was handing that prose
 * straight to `<RIDDORCountdown category={…}>`, which looks the value up in a
 * table keyed on 'death' | 'specified_injury' | 'over_7_day' |
 * 'dangerous_occurrence'. The lookup missed on every record ever saved, so the
 * countdown fell through to its no-category branch and sat on an amber,
 * pulsing "RIDDOR: PENDING — Determine RIDDOR category to see reporting
 * deadline" for ever. Deriving the key from severity/days-off instead of the
 * stored string fixes existing rows too, with no migration.
 *
 * Nothing in this form establishes a dangerous occurrence (they are events, not
 * injuries), so that key is never returned — a category is not guessed just to
 * fill the slot.
 */
function riddorCategoryOf(record: Partial<AccidentRecord>): RiddorCategory | undefined {
  if (record.severity === 'fatal') return 'death';
  if (record.severity === 'major') return 'specified_injury';
  if (record.time_off_work && (record.days_off ?? 0) > 7) return 'over_7_day';
  return undefined;
}

/**
 * The date the report must be with the enforcing authority BY.
 *
 * Deliberately computed here rather than delegated, because the shared
 * `calculateRIDDORDeadline` puts an electric shock with a hospital visit on a
 * 10-day clock as a "dangerous occurrence". Electric shock is not in the
 * Schedule 2 list — the electrical entry there is a short circuit or overload
 * causing fire or explosion — and the 10 days is the deadline for the written
 * F2508 that FOLLOWS an immediate notification, not a reporting window of its
 * own. An invented clock is worse than no clock: it reads as authority.
 *
 * Verified against HSE guidance in `safety_facets`: deaths, specified injuries
 * and dangerous occurrences are notified "by the quickest practicable means"
 * without delay; over-seven-day incapacitation is reported "as soon as
 * practicable and, in any event, within 15 days of the accident".
 */
function riddorDeadlineFor(
  record: Partial<AccidentRecord>,
  category: RiddorCategory | undefined
): string | null {
  if (!record.incident_date || !category) return null;
  const incident = new Date(record.incident_date);
  if (isNaN(incident.getTime())) return null;

  // Without delay — the deadline is the day of the accident itself.
  if (category === 'death' || category === 'specified_injury') {
    return incident.toISOString().split('T')[0];
  }

  if (category === 'over_7_day') {
    const deadline = new Date(incident);
    deadline.setDate(deadline.getDate() + 15);
    return deadline.toISOString().split('T')[0];
  }

  return null;
}

function checkRIDDOR(record: Partial<AccidentRecord>): {
  reportable: boolean;
  reasons: string[];
  deadline: string | null;
  category: RiddorCategory | undefined;
} {
  const reasons: string[] = [];

  // Fatal — notify without delay, written report follows
  if (record.severity === 'fatal') {
    reasons.push(
      'Fatal injury — notify the enforcing authority without delay by the quickest practicable means (0345 300 9923), then send the written report (F2508) within 10 days.'
    );
  }

  // Specified injury (RIDDOR 2013 Schedule 1) — notify without delay
  if (record.severity === 'major') {
    reasons.push(
      'Specified injury — notify without delay by the quickest practicable means, then send the written report (F2508) within 10 days. Check it against the specified-injury list before reporting.'
    );
  }

  // Over SEVEN CONSECUTIVE days — report within 15 days.
  //
  // ⚠️ This was `days_off >= 7`, which flagged a seven-day absence. The
  // regulation is "incapacitated … for MORE THAN seven consecutive days
  // (excluding the day of the accident but including any days which would not
  // have been working days)" — seven days is not more than seven days, so the
  // book was reporting incidents the HSE never asked for and starting a
  // 15-day clock on them.
  if (record.time_off_work && (record.days_off ?? 0) > 7) {
    reasons.push(
      `Incapacitated for more than seven consecutive days (${record.days_off} recorded) — send the report as soon as practicable and, in any event, within 15 days of the accident.`
    );
  }

  // Electric shock treated at hospital.
  //
  // Kept as a prompt to check, not as a verdict: an electric shock is
  // reportable through the specified-injury, over-seven-day or fatality routes,
  // not as a dangerous occurrence in its own right. The previous copy asserted
  // "reportable as dangerous occurrence (10 days)", which is not a category
  // RIDDOR 2013 has.
  if (record.injury_type === 'electric-shock' && record.hospital_visit) {
    reasons.push(
      'Electric shock treated at hospital — check the specified-injury list (loss of consciousness caused by asphyxia, or a burn damaging the eyes, respiratory system or other vital organs would each make it reportable without delay).'
    );
  }

  // Hospital attendance from a workplace accident (only if not covered above)
  if (
    record.hospital_visit &&
    record.severity !== 'major' &&
    record.severity !== 'fatal' &&
    record.injury_type !== 'electric-shock'
  ) {
    reasons.push(
      'Hospital attendance — check the specified-injury list. If the injured person was NOT at work (a member of the public or a client) and was taken to hospital for treatment, that alone is reportable without delay.'
    );
  }

  const category = riddorCategoryOf(record);

  return {
    reportable: reasons.length > 0,
    reasons,
    // Only a record that is actually reportable gets a clock, and only the two
    // routes above carry a fixed deadline. A "check this" flag gets none —
    // `getRIDDORDeadlineStatus` then shows "Review Required" rather than a
    // countdown to a date nothing in the regulations supports.
    deadline: reasons.length > 0 ? riddorDeadlineFor(record, category) : null,
    category,
  };
}

const emptyForm = (): Partial<AccidentRecord> => ({
  injured_name: '',
  injured_role: '',
  injured_employer: '',
  injured_address: '',
  incident_date: new Date().toISOString().split('T')[0],
  incident_time: '',
  location: '',
  location_detail: '',
  injury_type: undefined,
  body_part: undefined,
  severity: undefined,
  injury_description: '',
  incident_description: '',
  activity_at_time: '',
  cause: '',
  witnesses: '',
  first_aid_given: false,
  first_aid_details: '',
  first_aider_name: '',
  hospital_visit: false,
  hospital_name: '',
  time_off_work: false,
  days_off: 0,
  return_date: '',
  reported_to: '',
  reported_date: new Date().toISOString().split('T')[0],
  is_riddor_reportable: false,
  riddor_category: '',
  riddor_reference: '',
  riddor_reported: false,
  riddor_deadline: null,
  riddor_reported_date: null,
  recorded_by: '',
  additional_notes: '',
  corrective_actions: '',
  job_id: null,
});

const softTextareaClass = cn(safetyTextareaCn, 'min-h-[100px]');

/**
 * Card material for every `FormCard` on this screen.
 *
 * `FormCard` still ships the flat `bg-[hsl(0_0%_12%)]` body. `bg-transparent`
 * is what removes it: it lands in the same tailwind-merge group as the flat
 * fill, so the last one wins and the fill is dropped rather than left sitting
 * UNDER the recipe's translucent white ramp — which would light the card from
 * a 12% base instead of near-black and quietly make it a different material
 * from every other card in the hub.
 */
const cardCn = cn('bg-transparent border-elec-yellow/35', CARD_SURFACE);

/** The RIDDOR cards keep a red edge — it is the one place the colour is load-bearing. */
const alertCardCn = cn('bg-transparent border-red-500/40', CARD_SURFACE);

function CollapsibleSection({
  title,
  open,
  onOpenChange,
  children,
}: {
  title: string;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <div className={cn('rounded-2xl border overflow-hidden', cardCn)}>
      <Collapsible open={open} onOpenChange={onOpenChange}>
        {/* Press feel brightens, never dims — a dark surface that darkens under
            the thumb reads as "disabled", not "pressed". */}
        <CollapsibleTrigger className="flex min-h-11 items-center justify-between w-full px-5 py-4 touch-manipulation transition-[filter,transform] duration-150 active:scale-[0.99] active:brightness-125 [-webkit-tap-highlight-color:transparent]">
          <Eyebrow>{title}</Eyebrow>
          <span
            className={cn(
              'text-white text-[13px] transition-transform duration-200',
              open && 'rotate-180'
            )}
            aria-hidden
          >
            ⌄
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent className="px-5 pb-5 pt-1 space-y-4">{children}</CollapsibleContent>
      </Collapsible>
    </div>
  );
}

/**
 * Label and value were both plain 11–13px white, so a stack of them read as one
 * undifferentiated block of text with no way in. Everything stays full-opacity
 * white; the hierarchy comes from the label being a tracked micro-caption and
 * the value carrying the weight.
 */
function DetailField({ label, value }: { label: string; value?: React.ReactNode }) {
  if (value === undefined || value === null || value === '') return null;
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white">
        {label}
      </span>
      <span className="text-[13.5px] font-medium leading-relaxed text-white">{value}</span>
    </div>
  );
}

// ─── Main Component ───

export function DigitalAccidentBook({ onBack }: { onBack: () => void }) {
  const { data: dbRecords, isLoading } = useAccidentRecords();
  const createRecord = useCreateAccidentRecord();
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();
  const { toast } = useToast();
  const [showShare, setShowShare] = useState(false);

  // RIDDOR deadline warning toasts
  useRIDDORDeadlineCheck();
  // Auto-archive records older than 3 years (server-side)
  useArchiveOldRecords();

  const records: AccidentRecord[] = (dbRecords || []).map((row) => {
    // The query is `select('*')`, so the investigation columns come back — but
    // the hook's `AccidentRecord` interface doesn't declare them, so they are
    // invisible to TypeScript. Narrowing here (rather than in the hook, which
    // other screens share) keeps the change inside this module. See the report:
    // `useAccidentRecords.ts` should own these three fields.
    const r = row as typeof row & {
      five_whys?: unknown[] | null;
      root_cause?: string | null;
      root_cause_category?: string | null;
    };
    return {
      id: r.id,
      injured_name: r.injured_name,
      injured_role: r.injured_role || '',
      injured_employer: r.injured_employer || '',
      injured_address: r.injured_address || '',
      incident_date: r.incident_date,
      incident_time: r.incident_time || '',
      location: r.location,
      location_detail: r.location_detail || '',
      injury_type: r.injury_type as InjuryType,
      body_part: r.body_part as BodyPart,
      severity: r.severity as Severity,
      injury_description: r.injury_description || '',
      incident_description: r.incident_description,
      activity_at_time: r.activity_at_time || '',
      cause: r.cause || '',
      witnesses: r.witnesses || '',
      first_aid_given: r.first_aid_given,
      first_aid_details: r.first_aid_details || '',
      first_aider_name: r.first_aider_name || '',
      hospital_visit: r.hospital_visit,
      hospital_name: r.hospital_name || '',
      time_off_work: r.time_off_work,
      days_off: r.days_off,
      return_date: r.return_date || '',
      reported_to: r.reported_to || '',
      reported_date: r.reported_date || '',
      is_riddor_reportable: r.is_riddor_reportable,
      riddor_category: r.riddor_category || '',
      riddor_reference: r.riddor_reference || '',
      riddor_reported: r.riddor_reported,
      riddor_deadline: r.riddor_deadline || null,
      riddor_reported_date: r.riddor_reported_date || null,
      recorded_by: r.recorded_by,
      additional_notes: r.additional_notes || '',
      corrective_actions: r.corrective_actions || '',
      job_id: r.job_id ?? null,
      // These four were declared on the interface, read by the detail sheet,
      // and never copied out of the row — so `FiveWhysAnalysis` (which seeds
      // its state purely from props, it does no fetching of its own) opened
      // blank every time, and a saved 5-Whys investigation looked like it had
      // never been written. Same for the scene photos: uploaded on the way in,
      // then invisible for the life of the record.
      photos: Array.isArray(r.photos) ? (r.photos as string[]) : [],
      five_whys: Array.isArray(r.five_whys) ? r.five_whys : [],
      root_cause: r.root_cause ?? null,
      root_cause_category: r.root_cause_category ?? null,
      incident_number: r.incident_number || undefined,
      is_archived: r.is_archived ?? false,
      created_at: r.created_at,
    };
  });

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<AccidentRecord>>(emptyForm);

  // Spark project link
  const { projects: jobs = [] } = useSparkProjects('active');
  const jobTitleFor = (id: string | null) =>
    id ? (jobs.find((j) => j.id === id)?.title ?? null) : null;

  // ─── Draft persistence ───
  const {
    status: draftStatus,
    recoveredData: recoveredDraft,
    clearDraft,
    dismissRecovery: dismissDraft,
  } = useLocalDraft({
    key: 'accident-book',
    data: { form },
    enabled: showForm,
  });

  const restoreDraft = () => {
    if (!recoveredDraft) return;
    if (recoveredDraft.form) setForm((prev) => ({ ...prev, ...recoveredDraft.form }));
    dismissDraft();
  };

  const [viewingRecord, setViewingRecord] = useState<AccidentRecord | null>(null);
  // Remote supervisor sign-off (generic engine)
  const [showSignShare, setShowSignShare] = useState(false);
  const [signUrl, setSignUrl] = useState('');
  const [signLoading, setSignLoading] = useState(false);
  const { data: accidentSignatures = [] } = useRecordSignatures(
    'accident',
    viewingRecord?.id ?? null
  );
  const remoteSupervisor = accidentSignatures.find(
    (s) => s.role === 'supervisor' && s.signed_signature
  );

  const requestSupervisorSignOff = async (rec: AccidentRecord) => {
    setSignLoading(true);
    try {
      const token = await createSafetySignToken({
        documentType: 'accident',
        recordId: rec.id,
        role: 'supervisor',
        summary: {
          title: 'Accident Record — Supervisor Sign-off',
          subtitle: rec.incident_number || undefined,
          lines: [
            { label: 'Injury', value: injuryLabelOf(rec.injury_type) },
            { label: 'Severity', value: SEV_LABEL[rec.severity] },
            { label: 'Location', value: rec.location || '—' },
          ],
          statement:
            'By signing you confirm, as the responsible manager/supervisor, that this accident record has been reviewed and the corrective actions are appropriate.',
        },
      });
      if (!token) return;
      setSignUrl(buildSignUrl(token));
      setShowSignShare(true);
    } finally {
      setSignLoading(false);
    }
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showArchived, setShowArchived] = useState(false);
  const [showRIDDORGuide, setShowRIDDORGuide] = useState(false);
  const [reporterSigData, setReporterSigData] = useState('');
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  // Collapsible (optional) form sections
  const [treatmentOpen, setTreatmentOpen] = useState(false);
  const [reportingOpen, setReportingOpen] = useState(false);

  // RIDDOR reporting state
  const [showMarkReported, setShowMarkReported] = useState(false);
  const [riddorRef, setRiddorRef] = useState('');
  const [riddorReportedDate, setRiddorReportedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const markReported = useMarkRIDDORReported();

  const handleMarkReported = async () => {
    if (!viewingRecord || !riddorRef.trim()) return;
    // `riddor_reported_date` is a `date` column and the input can be cleared to
    // ''. Same 22007 trap as the insert path — fall back to today rather than
    // sending an empty string the column cannot parse.
    const reportedOn =
      toISODateOrNull(riddorReportedDate) ?? new Date().toISOString().split('T')[0];
    await markReported.mutateAsync({
      id: viewingRecord.id,
      riddor_reference: riddorRef.trim(),
      riddor_reported_date: reportedOn,
    });
    setShowMarkReported(false);
    setRiddorRef('');
    setViewingRecord(null);
  };

  const updateForm = (updates: Partial<AccidentRecord>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  };

  const resetForm = () => {
    setPhotoUrls([]);
    setReporterSigData('');
    setTreatmentOpen(false);
    setReportingOpen(false);
    setForm(emptyForm());
  };

  const riddorCheck = useMemo(() => checkRIDDOR(form), [form]);

  // ─── Readiness gate ───
  const readiness = [
    { ok: !!(form.injured_name || '').trim(), label: 'Injured person named' },
    { ok: !!(form.incident_date || '').trim(), label: 'Incident date' },
    { ok: !!(form.location || '').trim(), label: 'Location' },
    { ok: (form.incident_description || '').trim().length > 0, label: 'How it happened' },
    {
      ok: !!form.injury_type && !!form.body_part && !!form.severity,
      label: 'Injury, body part & severity',
    },
    { ok: !!(form.recorded_by || '').trim(), label: 'Recorded by' },
  ];
  const formReady = readiness.every((r) => r.ok);

  const saveRecord = async () => {
    // Sanitise date fields before saving — converts UK DD/MM/YYYY to ISO YYYY-MM-DD
    // and catches invalid formats before they hit the Postgres date column
    const incidentDate = sanitiseDateToISO(form.incident_date || '');
    // Optional dates go as NULL, never ''. See `toISODateOrNull` — `|| ''` on a
    // nullable `date` column is what made every save fail with a raw 22007.
    const returnDate = toISODateOrNull(form.return_date);
    const reportedDate = toISODateOrNull(form.reported_date);

    if (!isValidISODate(incidentDate) || !incidentDate) {
      // Surface a clear error rather than letting Postgres reject with a cryptic
      // message. A toast, not `alert()` — a native-feeling app never hands the
      // user a browser chrome dialog they cannot dismiss with a thumb.
      toast({
        title: 'Check the date of incident',
        description: 'Use the date picker, or type the date as DD/MM/YYYY.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await createRecord.mutateAsync({
        injured_name: form.injured_name || '',
        injured_role: form.injured_role || '',
        injured_employer: form.injured_employer || '',
        injured_address: form.injured_address || '',
        incident_date: incidentDate,
        incident_time: form.incident_time || '',
        location: form.location || '',
        location_detail: form.location_detail || '',
        injury_type: form.injury_type || 'other',
        body_part: form.body_part || 'multiple',
        severity: form.severity || 'minor',
        injury_description: form.injury_description || '',
        incident_description: form.incident_description || '',
        activity_at_time: form.activity_at_time || '',
        cause: form.cause || '',
        witnesses: form.witnesses || '',
        first_aid_given: form.first_aid_given || false,
        first_aid_details: form.first_aid_details || '',
        first_aider_name: form.first_aider_name || '',
        hospital_visit: form.hospital_visit || false,
        hospital_name: form.hospital_name || '',
        time_off_work: form.time_off_work || false,
        days_off: form.days_off || 0,
        return_date: returnDate,
        reported_to: form.reported_to || '',
        reported_date: reportedDate,
        is_riddor_reportable: riddorCheck.reportable,
        riddor_category: riddorCheck.reasons.join('; '),
        riddor_reference: form.riddor_reference || '',
        riddor_reported: form.riddor_reported || false,
        riddor_deadline: riddorCheck.deadline || null,
        riddor_reported_date: null,
        recorded_by: form.recorded_by || '',
        additional_notes: form.additional_notes || '',
        corrective_actions: form.corrective_actions || '',
        job_id: form.job_id ?? null,
        photos: photoUrls,
        reporter_signature: reporterSigData || undefined,
      });
      clearDraft();
      setShowForm(false);
      resetForm();
    } catch {
      // Error toast handled by the hook
    }
  };

  // 3-year archival: records flagged by DB trigger (never deleted — legal requirement)
  const isArchived = (r: AccidentRecord) => r.is_archived ?? false;
  const archivedCount = records.filter(isArchived).length;

  /**
   * The set every count on this screen is taken from.
   *
   * The tab counts used to be computed over ALL records while the list itself
   * dropped archived ones, so "RIDDOR pending 3" could sit above an empty tab
   * — the three pending records being 3-year-old archived ones. Counting the
   * same rows the list will show keeps the numbers answerable.
   */
  const countBase = showArchived ? records : records.filter((r) => !isArchived(r));

  const filteredRecords = records.filter((r) => {
    // Archive filter
    if (!showArchived && isArchived(r)) return false;
    // Status tab
    if (statusFilter === 'riddor' && !r.is_riddor_reportable) return false;
    if (statusFilter === 'riddor') {
      const st = getRIDDORDeadlineStatus(r as never).status;
      if (st === 'reported') return false;
    }
    if (statusFilter === 'fatal_major' && r.severity !== 'fatal' && r.severity !== 'major')
      return false;
    // Search filter
    const q = searchQuery.toLowerCase();
    return (
      r.injured_name.toLowerCase().includes(q) ||
      r.location.toLowerCase().includes(q) ||
      r.incident_description.toLowerCase().includes(q)
    );
  });

  // RIDDOR-pending / urgent records sort to the top.
  const sortedRecords = useMemo(() => {
    const rank = (r: AccidentRecord): number => {
      if (!r.is_riddor_reportable) return 2;
      const st = getRIDDORDeadlineStatus(r as never).status;
      if (st === 'reported') return 1;
      return 0; // pending RIDDOR → top
    };
    return [...filteredRecords].sort((a, b) => rank(a) - rank(b));
  }, [filteredRecords]);

  const {
    visible: visibleRecords,
    hasMore: hasMoreRecords,
    remaining: remainingRecords,
    loadMore: loadMoreRecords,
  } = useShowMore(sortedRecords);

  const total = countBase.length;
  const riddorPending = countBase.filter(
    (r) => r.is_riddor_reportable && getRIDDORDeadlineStatus(r as never).status !== 'reported'
  ).length;
  const fatalMajor = countBase.filter(
    (r) => r.severity === 'fatal' || r.severity === 'major'
  ).length;

  const filterTabs = useMemo(
    () => [
      { value: 'all', label: 'All', count: total },
      { value: 'riddor', label: 'RIDDOR pending', count: riddorPending },
      { value: 'fatal_major', label: 'Fatal / major', count: fatalMajor },
    ],
    [total, riddorPending, fatalMajor]
  );

  const injuryLabelOf = (t: InjuryType) => INJURY_TYPES.find((x) => x.id === t)?.label || t;
  const bodyPartLabelOf = (b: BodyPart) => BODY_PARTS.find((x) => x.id === b)?.label || b;

  // The detail sheet was printing raw ISO dates ("2026-08-09") at the user. UK
  // English throughout, and a record that may end up in front of an inspector
  // should not read like a database dump.
  const fmtUK = (iso: string | null | undefined) => {
    if (!iso) return '';
    const d = new Date(iso);
    return isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-GB');
  };

  // ─── Form ───
  if (showForm) {
    return (
      <div className="bg-elec-dark min-h-screen pb-28">
        <SafetyMasthead
          onBack={() => {
            resetForm();
            setShowForm(false);
          }}
          backLabel="Records"
          moduleName="Record accident"
          trailing={<DraftSaveIndicator status={draftStatus} />}
        />
        <div className="mx-auto max-w-3xl px-4 py-4 space-y-4">
          <AnimatePresence>
            {recoveredDraft && (
              <DraftRecoveryBanner onRestore={restoreDraft} onDismiss={dismissDraft} />
            )}
          </AnimatePresence>

          {/* Injured person */}
          <FormCard eyebrow="Injured person" className={cardCn}>
            <Field label="Full name" required>
              <input
                value={form.injured_name}
                onChange={(e) => updateForm({ injured_name: e.target.value })}
                placeholder="Name of injured person"
                className={safetyInputCn}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Role / job title">
                <input
                  value={form.injured_role}
                  onChange={(e) => updateForm({ injured_role: e.target.value })}
                  placeholder="e.g. Electrician"
                  className={safetyInputCn}
                />
              </Field>
              <Field label="Employer">
                <input
                  value={form.injured_employer}
                  onChange={(e) => updateForm({ injured_employer: e.target.value })}
                  placeholder="Company name"
                  className={safetyInputCn}
                />
              </Field>
            </div>
            <Field label="Address" hint="Required for RIDDOR records">
              <input
                value={form.injured_address}
                onChange={(e) => updateForm({ injured_address: e.target.value })}
                placeholder="Home address"
                className={safetyInputCn}
              />
            </Field>
          </FormCard>

          {/* When & where */}
          <FormCard eyebrow="When & where" className={cardCn}>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date of incident" required>
                <input
                  type="date"
                  value={form.incident_date}
                  onChange={(e) => updateForm({ incident_date: sanitiseDateToISO(e.target.value) })}
                  placeholder="DD/MM/YYYY"
                  className={cn(safetyInputCn, '[color-scheme:dark]')}
                />
                {form.incident_date && !isValidISODate(form.incident_date) && (
                  <p className="text-[11px] text-red-400 mt-1">
                    Use DD/MM/YYYY or tap the calendar icon
                  </p>
                )}
              </Field>
              <Field label="Time">
                <input
                  type="time"
                  value={form.incident_time}
                  onChange={(e) => updateForm({ incident_time: e.target.value })}
                  className={cn(safetyInputCn, '[color-scheme:dark]')}
                />
              </Field>
            </div>
            <LocationAutoFill
              value={form.location || ''}
              onChange={(v) => updateForm({ location: v })}
              label="Location"
              placeholder="Site name / address"
            />
            <Field label="Specific location">
              <input
                value={form.location_detail}
                onChange={(e) => updateForm({ location_detail: e.target.value })}
                placeholder="e.g. Plant room, Level 2, Riser 3"
                className={safetyInputCn}
              />
            </Field>
            <JobLinkField
              jobId={form.job_id ?? null}
              jobTitle={jobTitleFor(form.job_id ?? null)}
              onSelect={(id) => updateForm({ job_id: id })}
            />
          </FormCard>

          {/* What happened */}
          <FormCard eyebrow="What happened" className={cardCn}>
            <Field label="Activity at time of incident">
              <input
                value={form.activity_at_time}
                onChange={(e) => updateForm({ activity_at_time: e.target.value })}
                placeholder="e.g. Installing containment at height"
                className={safetyInputCn}
              />
            </Field>
            <Field label="How did the incident happen?" required>
              <SmartTextarea
                value={form.incident_description || ''}
                onChange={(val) => updateForm({ incident_description: val })}
                placeholder="Describe exactly what happened, including what the person was doing…"
                className={softTextareaClass}
              />
            </Field>
            <Field label="Cause / contributing factors">
              <input
                value={form.cause}
                onChange={(e) => updateForm({ cause: e.target.value })}
                placeholder="e.g. Wet floor, faulty equipment, inadequate PPE"
                className={safetyInputCn}
              />
            </Field>
            <Field label="Witnesses">
              <input
                value={form.witnesses}
                onChange={(e) => updateForm({ witnesses: e.target.value })}
                placeholder="Names and contact details of witnesses"
                className={safetyInputCn}
              />
            </Field>
          </FormCard>

          {/* Injury */}
          <FormCard eyebrow="Injury" className={cardCn}>
            <Field label="Type of injury" required>
              <Select
                value={form.injury_type}
                onValueChange={(v) => updateForm({ injury_type: v as InjuryType })}
              >
                <SelectTrigger className={safetySelectTriggerCn}>
                  <SelectValue placeholder="Select injury type…" />
                </SelectTrigger>
                <SelectContent className={cn(selectContentClass, 'max-h-[300px]')}>
                  {INJURY_TYPES.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Body part injured" required>
              <Select
                value={form.body_part}
                onValueChange={(v) => updateForm({ body_part: v as BodyPart })}
              >
                <SelectTrigger className={safetySelectTriggerCn}>
                  <SelectValue placeholder="Select body part…" />
                </SelectTrigger>
                <SelectContent className={cn(selectContentClass, 'max-h-[300px]')}>
                  {BODY_PARTS.map((part) => (
                    <SelectItem key={part.id} value={part.id}>
                      {part.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>

            <Field label="Severity" required>
              <div className="grid grid-cols-2 gap-2">
                {SEVERITIES.map((s) => {
                  const selected = form.severity === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => updateForm({ severity: s.id })}
                      className={cn(
                        'flex min-h-[68px] flex-col justify-center rounded-xl border p-3 text-left touch-manipulation',
                        'transition-[background-color,border-color,filter,transform] duration-150',
                        'active:scale-[0.99] active:brightness-125 [-webkit-tap-highlight-color:transparent]',
                        selected ? SEV_FILL[s.id] : 'border-white/[0.10] bg-white/[0.04] text-white'
                      )}
                    >
                      <span className="block text-[13px] font-semibold">{s.label}</span>
                      <span className="mt-0.5 block text-[11px] text-white">{s.description}</span>
                    </button>
                  );
                })}
              </div>
            </Field>

            <Field label="Injury description">
              <SmartTextarea
                value={form.injury_description || ''}
                onChange={(val) => updateForm({ injury_description: val })}
                placeholder="Describe the injury in detail…"
                className={cn(softTextareaClass, 'min-h-[80px]')}
              />
            </Field>

            <SafetyPhotoCapture
              photos={photoUrls}
              onPhotosChange={setPhotoUrls}
              label="Incident scene photos"
            />
          </FormCard>

          {/* Treatment & aftermath (optional) */}
          <CollapsibleSection
            title="Treatment & aftermath (optional)"
            open={treatmentOpen}
            onOpenChange={setTreatmentOpen}
          >
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] text-white">First aid given?</span>
              <Switch
                checked={form.first_aid_given}
                onCheckedChange={(c) => updateForm({ first_aid_given: c })}
              />
            </div>
            {form.first_aid_given && (
              <>
                <Field label="First aid details">
                  <SmartTextarea
                    value={form.first_aid_details || ''}
                    onChange={(val) => updateForm({ first_aid_details: val })}
                    placeholder="Treatment administered…"
                    className={cn(softTextareaClass, 'min-h-[60px]')}
                  />
                </Field>
                <Field label="First aider name">
                  <input
                    value={form.first_aider_name}
                    onChange={(e) => updateForm({ first_aider_name: e.target.value })}
                    className={safetyInputCn}
                  />
                </Field>
              </>
            )}

            <div className="flex items-center justify-between">
              <span className="text-[12.5px] text-white">Hospital visit required?</span>
              <Switch
                checked={form.hospital_visit}
                onCheckedChange={(c) => updateForm({ hospital_visit: c })}
              />
            </div>
            {form.hospital_visit && (
              <Field label="Hospital name">
                <input
                  value={form.hospital_name}
                  onChange={(e) => updateForm({ hospital_name: e.target.value })}
                  className={safetyInputCn}
                />
              </Field>
            )}

            <div className="flex items-center justify-between">
              <span className="text-[12.5px] text-white">Time off work required?</span>
              <Switch
                checked={form.time_off_work}
                onCheckedChange={(c) => updateForm({ time_off_work: c })}
              />
            </div>
            {form.time_off_work && (
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Days off"
                  // The counting rule decides whether this is reportable at all,
                  // and it is not obvious: the day of the accident is excluded
                  // and non-working days are included. Verified against the HSE
                  // guidance held in `safety_facets`.
                  hint="Count from the day after the accident, and include days the person would not have worked anyway."
                >
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    value={form.days_off}
                    onChange={(e) =>
                      updateForm({ days_off: Math.max(0, parseInt(e.target.value) || 0) })
                    }
                    className={safetyInputCn}
                  />
                </Field>
                <Field label="Expected return">
                  <input
                    type="date"
                    value={form.return_date}
                    onChange={(e) => updateForm({ return_date: e.target.value })}
                    className={cn(safetyInputCn, '[color-scheme:dark]')}
                  />
                </Field>
              </div>
            )}
          </CollapsibleSection>

          {/* RIDDOR alert (live).
              A verdict card, so the red tint stays — but the body copy is
              white, not `text-red-200`, and the inner panel is neutral. Red
              text on a red wash inside a red wash was three tints deep and the
              words came second to the colour. */}
          {riddorCheck.reportable && (
            <div className="p-4 rounded-2xl border border-red-500/40 bg-red-500/10 space-y-3">
              <Eyebrow className="text-red-400">RIDDOR reportable</Eyebrow>
              <p className="text-[12.5px] font-medium text-white">
                This incident looks reportable to the HSE under RIDDOR 2013.
              </p>
              <ul className="space-y-1.5">
                {riddorCheck.reasons.map((reason, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[12px] leading-relaxed text-white"
                  >
                    <span className="mt-[3px] text-red-400" aria-hidden>
                      •
                    </span>
                    {reason}
                  </li>
                ))}
              </ul>
              <div className="rounded-xl border border-white/10 bg-black/30 p-3 space-y-1">
                <p className="text-[12px] text-white">
                  <strong className="font-semibold">Report online:</strong> hse.gov.uk/riddor
                </p>
                <p className="text-[12px] text-white">
                  <strong className="font-semibold">Deaths and specified injuries:</strong> notify
                  without delay on 0345 300 9923
                </p>
              </div>
            </div>
          )}

          {/* Reporting & sign-off (optional) */}
          <CollapsibleSection
            title="Reporting & corrective actions (optional)"
            open={reportingOpen}
            onOpenChange={setReportingOpen}
          >
            <Field label="Reported to">
              <input
                value={form.reported_to}
                onChange={(e) => updateForm({ reported_to: e.target.value })}
                placeholder="Supervisor / manager name"
                className={safetyInputCn}
              />
            </Field>
            <Field label="Corrective actions taken">
              <SmartTextarea
                value={form.corrective_actions || ''}
                onChange={(val) => updateForm({ corrective_actions: val })}
                placeholder="Actions taken to prevent recurrence…"
                className={cn(softTextareaClass, 'min-h-[80px]')}
              />
            </Field>
            <Field label="Additional notes">
              <SmartTextarea
                value={form.additional_notes || ''}
                onChange={(val) => updateForm({ additional_notes: val })}
                placeholder="Any additional notes…"
                className={cn(softTextareaClass, 'min-h-[60px]')}
              />
            </Field>
          </CollapsibleSection>

          {/* Recorder & signature */}
          <FormCard eyebrow="Recorder & sign-off" className={cardCn}>
            <Field label="Recorded by" required>
              <input
                value={form.recorded_by}
                onChange={(e) => updateForm({ recorded_by: e.target.value })}
                placeholder="Your full name"
                className={safetyInputCn}
              />
            </Field>
            <SignatureField
              label="Reporter signature"
              value={reporterSigData}
              onChange={setReporterSigData}
            />
          </FormCard>

          <ReadinessGate items={readiness} title="Ready to save?" />
        </div>

        {/* Sticky save */}
        <div
          className="fixed bottom-0 inset-x-0 bg-elec-dark/95 backdrop-blur-sm border-t border-white/[0.06] px-4 py-3"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        >
          <div className="mx-auto max-w-3xl">
            <PrimaryButton
              fullWidth
              size="lg"
              disabled={!formReady || createRecord.isPending}
              onClick={saveRecord}
            >
              {createRecord.isPending ? 'Saving…' : 'Save record'}
            </PrimaryButton>
          </div>
        </div>
      </div>
    );
  }

  // ─── List ───
  return (
    <SafetyModuleShell
      onBack={onBack}
      moduleName="Accident Book"
      trailing={
        riddorPending > 0 ? (
          <span className={cn(PILL_BASE, PILL_CLASS.red)}>{riddorPending} RIDDOR</span>
        ) : undefined
      }
      hero={
        <SafetyPageHeader
          eyebrow="Accident Book · RIDDOR 2013"
          title="Record accidents, meet your RIDDOR deadlines"
          // Both timescales are verified against the HSE guidance in
          // `safety_facets`: deaths, specified injuries and dangerous
          // occurrences are notified without delay; over-seven-day
          // incapacitation is reported within 15 days of the accident. Records
          // of reportable incidents are kept for at least three years.
          description="Log workplace injuries, flag what looks reportable under RIDDOR 2013, and keep the 15-day clock in view. Records are retained for the statutory three years."
          tone="red"
          actions={
            <>
              <SecondaryButton onClick={() => setShowRIDDORGuide(true)}>
                RIDDOR guide
              </SecondaryButton>
              <PrimaryButton
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
              >
                Record accident
              </PrimaryButton>
            </>
          }
        />
      }
      stats={
        total > 0 || archivedCount > 0 ? (
          <SafetyStatStrip
            stats={[
              { value: total, label: 'Total' },
              {
                value: riddorPending,
                label: 'RIDDOR pending',
                sub: 'awaiting HSE report',
                tone: riddorPending > 0 ? 'red' : undefined,
              },
              { value: fatalMajor, label: 'Fatal / major' },
              { value: archivedCount, label: 'Archived', sub: '3-year statutory' },
            ]}
          />
        ) : undefined
      }
      filter={
        total > 0 ? (
          <FilterBar
            tabs={filterTabs}
            activeTab={statusFilter}
            onTabChange={setStatusFilter}
            search={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search records…"
            actions={
              archivedCount > 0 ? (
                <button
                  onClick={() => setShowArchived((v) => !v)}
                  aria-pressed={showArchived}
                  className={cn(
                    // h-10 was under the 44px target; this is a real control.
                    'h-11 px-4 rounded-full text-[12.5px] font-medium whitespace-nowrap border touch-manipulation',
                    'transition-[background-color,border-color,filter,transform] duration-150',
                    'active:scale-[0.99] active:brightness-125 [-webkit-tap-highlight-color:transparent]',
                    showArchived
                      ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                      : 'bg-white/[0.05] border-white/10 text-white'
                  )}
                >
                  {showArchived ? 'Hide' : 'Show'} archived ({archivedCount})
                </button>
              ) : undefined
            }
          />
        ) : undefined
      }
    >
      {isLoading ? (
        <LoadingState />
      ) : records.length === 0 ? (
        <EmptyState
          title="No accidents recorded"
          description="No accidents recorded — a good safety record. When an incident happens, record it here to stay RIDDOR-compliant."
          action="Record accident"
          onAction={() => {
            resetForm();
            setShowForm(true);
          }}
        />
      ) : sortedRecords.length === 0 ? (
        <EmptyState
          title="No matching records"
          description="Try a different tab or clear your search."
        />
      ) : (
        <div className="space-y-2.5">
          {visibleRecords.map((record) => {
            const riddorStatus = record.is_riddor_reportable
              ? getRIDDORDeadlineStatus(record as never)
              : null;
            return (
              <SafetyListCard key={record.id}>
                <SafetyListRow
                  accent={sevTone(record.severity)}
                  onClick={() => setViewingRecord(record)}
                  title={record.injured_name}
                  subtitle={`${injuryLabelOf(record.injury_type)}${record.location ? ` · ${record.location}` : ''}${
                    isArchived(record) ? ' · Archived' : ''
                  }`}
                  trailing={
                    <div className="flex flex-col items-end gap-1.5">
                      <SevPill severity={record.severity} />
                      {riddorStatus && (
                        <span
                          className={cn(PILL_BASE, PILL_CLASS[riddorTone(riddorStatus.status)])}
                        >
                          {riddorStatus.label}
                        </span>
                      )}
                      <span className="text-[11px] text-white tabular-nums">
                        {fmtCardDate(record.incident_date)}
                      </span>
                    </div>
                  }
                />
              </SafetyListCard>
            );
          })}
          {hasMoreRecords && (
            <LoadMoreButton onLoadMore={loadMoreRecords} remaining={remainingRecords} />
          )}
        </div>
      )}

      {/* Record detail sheet */}
      <Sheet open={!!viewingRecord} onOpenChange={() => setViewingRecord(null)}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.06]"
        >
          {viewingRecord && (
            <SheetShell
              eyebrow={`Accident · ${SEV_LABEL[viewingRecord.severity]}${
                viewingRecord.incident_number ? ` · ${viewingRecord.incident_number}` : ''
              }`}
              title={viewingRecord.injured_name}
              description={`${fmtUK(viewingRecord.incident_date)}${
                viewingRecord.incident_time ? ` at ${viewingRecord.incident_time}` : ''
              } · ${viewingRecord.location}`}
              footer={
                <div className="flex flex-col gap-2 w-full">
                  <div className="grid grid-cols-2 gap-2">
                    <PrimaryButton
                      fullWidth
                      disabled={isExporting && exportingId === viewingRecord.id}
                      onClick={() => exportPDF('accident', viewingRecord.id)}
                    >
                      {isExporting && exportingId === viewingRecord.id
                        ? 'Exporting…'
                        : 'Export PDF'}
                    </PrimaryButton>
                    <SecondaryButton fullWidth onClick={() => setShowShare(true)}>
                      Share
                    </SecondaryButton>
                  </div>
                  {/* Demoted from a bespoke red button to the quiet secondary
                      group. The urgency belongs to the countdown and the RIDDOR
                      status card at the top of the sheet; a third red control in
                      the footer competed with them and left the sheet with two
                      "most important" things. */}
                  {viewingRecord.is_riddor_reportable && (
                    <SecondaryButton
                      fullWidth
                      disabled={isExporting && exportingId === viewingRecord.id}
                      onClick={() => exportPDF('riddor-report', viewingRecord.id)}
                    >
                      {isExporting && exportingId === viewingRecord.id
                        ? 'Exporting…'
                        : 'Export RIDDOR report'}
                    </SecondaryButton>
                  )}
                </div>
              }
            >
              <div className="flex items-center gap-2">
                <SevPill severity={viewingRecord.severity} />
                {viewingRecord.is_riddor_reportable && (
                  <span className={cn(PILL_BASE, PILL_CLASS.red)}>RIDDOR reportable</span>
                )}
              </div>

              {/* RIDDOR countdown.
                  `category` must be one of the countdown's four canonical keys —
                  passing `riddor_category` (prose) meant the lookup always missed
                  and the widget never counted anything down. `isReported` now
                  honours the boolean too, which is what `useMarkRIDDORReported`
                  and `getRIDDORDeadlineStatus` both key on. */}
              {viewingRecord.is_riddor_reportable && (
                <RIDDORCountdown
                  category={riddorCategoryOf(viewingRecord)}
                  incidentDate={viewingRecord.incident_date}
                  isReported={viewingRecord.riddor_reported || !!viewingRecord.riddor_reported_date}
                  hseReference={viewingRecord.riddor_reference}
                />
              )}

              {/* RIDDOR status + report actions */}
              {viewingRecord.is_riddor_reportable &&
                (() => {
                  const deadlineStatus = getRIDDORDeadlineStatus(viewingRecord as never);
                  const category = riddorCategoryOf(viewingRecord);
                  // Only deaths and specified injuries carry the "notify by the
                  // quickest practicable means" duty, so the phone number is
                  // only offered where it is the right route.
                  const notifyWithoutDelay =
                    category === 'death' || category === 'specified_injury';
                  return (
                    <FormCard eyebrow="RIDDOR status" className={alertCardCn}>
                      {/* No `animate-pulse`. A pulsing lozenge is movement with
                          no information in it, and next to a countdown that is
                          already animated it reads as decoration. */}
                      <span
                        className={cn(PILL_BASE, PILL_CLASS[riddorTone(deadlineStatus.status)])}
                      >
                        {deadlineStatus.label}
                      </span>
                      {viewingRecord.riddor_category && (
                        <p className="text-[12px] leading-relaxed text-white">
                          {viewingRecord.riddor_category}
                        </p>
                      )}
                      {viewingRecord.riddor_deadline && (
                        <DetailField
                          label="Report by"
                          value={new Date(viewingRecord.riddor_deadline).toLocaleDateString(
                            'en-GB'
                          )}
                        />
                      )}
                      {viewingRecord.riddor_reference && (
                        <DetailField label="HSE reference" value={viewingRecord.riddor_reference} />
                      )}
                      {viewingRecord.riddor_reported_date && (
                        <DetailField
                          label="Reported"
                          value={
                            <span className="text-emerald-400">
                              {new Date(viewingRecord.riddor_reported_date).toLocaleDateString(
                                'en-GB'
                              )}
                            </span>
                          }
                        />
                      )}

                      {deadlineStatus.status !== 'reported' && (
                        <>
                          {/* Was a list of green ticks. Nothing had been
                              checked — the ticks were decoration on a list of
                              things you still have to go and find, and a screen
                              that shows a row of ✓ against unmet requirements is
                              lying to the person holding the phone. Numbered,
                              because it is the order the F2508 asks for it. */}
                          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                            <Eyebrow className="mb-2">You will be asked for</Eyebrow>
                            <ol className="space-y-1.5">
                              {F2508_CHECKLIST.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span
                                    className="mt-px w-4 shrink-0 text-[11px] tabular-nums text-elec-yellow"
                                    aria-hidden
                                  >
                                    {i + 1}
                                  </span>
                                  <span className="text-[11.5px] leading-relaxed text-white">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ol>
                          </div>

                          {/* One primary action — filing the report is the
                              whole reason this card exists — and a quiet pair
                              underneath. Previously all three controls were the
                              same red lozenge, so the screen had no answer to
                              "what do I do now". */}
                          <a
                            href="https://notifications.hse.gov.uk/riddorforms/Injury"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              'flex h-11 w-full items-center justify-center rounded-full bg-elec-yellow text-[13px] font-semibold text-black touch-manipulation',
                              'transition-[filter,transform] duration-150 active:scale-[0.99] active:brightness-125',
                              '[-webkit-tap-highlight-color:transparent]'
                            )}
                          >
                            Report to the HSE online
                          </a>
                          <div className="flex gap-2">
                            {notifyWithoutDelay && (
                              <a
                                href="tel:03453009923"
                                className={cn(
                                  'flex h-11 flex-1 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-[12.5px] font-medium text-white touch-manipulation',
                                  'transition-[filter,transform] duration-150 active:scale-[0.99] active:brightness-125',
                                  '[-webkit-tap-highlight-color:transparent]'
                                )}
                              >
                                Call 0345 300 9923
                              </a>
                            )}
                            <SecondaryButton
                              fullWidth={!notifyWithoutDelay}
                              className={notifyWithoutDelay ? 'flex-1' : undefined}
                              onClick={() => setShowMarkReported(true)}
                            >
                              Mark as reported
                            </SecondaryButton>
                          </div>
                        </>
                      )}
                    </FormCard>
                  );
                })()}

              {/* Injured person */}
              <FormCard eyebrow="Injured person" className={cardCn}>
                <DetailField label="Name" value={viewingRecord.injured_name} />
                <DetailField label="Role" value={viewingRecord.injured_role} />
                <DetailField label="Employer" value={viewingRecord.injured_employer} />
                <DetailField label="Address" value={viewingRecord.injured_address} />
              </FormCard>

              {/* Incident */}
              <FormCard eyebrow="Incident" className={cardCn}>
                <DetailField
                  label="Location"
                  value={`${viewingRecord.location}${
                    viewingRecord.location_detail ? ` — ${viewingRecord.location_detail}` : ''
                  }`}
                />
                <DetailField
                  label="Date / time"
                  value={`${fmtUK(viewingRecord.incident_date)} ${viewingRecord.incident_time}`.trim()}
                />
                <DetailField label="Activity" value={viewingRecord.activity_at_time} />
                <DetailField label="What happened" value={viewingRecord.incident_description} />
                <DetailField label="Cause" value={viewingRecord.cause} />
                <DetailField label="Witnesses" value={viewingRecord.witnesses} />
                {viewingRecord.job_id && (
                  <DetailField
                    label="Linked project"
                    value={jobTitleFor(viewingRecord.job_id) || 'Linked project'}
                  />
                )}
              </FormCard>

              {/* Injury */}
              <FormCard eyebrow="Injury" className={cardCn}>
                <DetailField label="Type" value={injuryLabelOf(viewingRecord.injury_type)} />
                <DetailField label="Body part" value={bodyPartLabelOf(viewingRecord.body_part)} />
                <DetailField label="Description" value={viewingRecord.injury_description} />
              </FormCard>

              {/* Scene photos.
                  The form has uploaded these since the module shipped and the
                  detail sheet never rendered them — the evidence went into
                  storage and out of reach of the person who took it. */}
              {(viewingRecord.photos?.length ?? 0) > 0 && (
                <FormCard eyebrow="Incident scene photos" className={cardCn}>
                  <div className="grid grid-cols-3 gap-2">
                    {viewingRecord.photos?.map((url, i) => (
                      <a
                        key={url}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block overflow-hidden rounded-xl border border-white/10 touch-manipulation transition-[filter,transform] duration-150 active:scale-[0.99] active:brightness-125 [-webkit-tap-highlight-color:transparent]"
                      >
                        <img
                          src={url}
                          alt={`Incident scene photo ${i + 1}`}
                          loading="lazy"
                          className="aspect-square w-full object-cover"
                        />
                      </a>
                    ))}
                  </div>
                </FormCard>
              )}

              {/* Treatment & aftermath */}
              {(viewingRecord.first_aid_given ||
                viewingRecord.hospital_visit ||
                viewingRecord.time_off_work) && (
                <FormCard eyebrow="Treatment & aftermath" className={cardCn}>
                  {viewingRecord.first_aid_given && (
                    <>
                      <DetailField label="First aid" value="Given" />
                      <DetailField label="Details" value={viewingRecord.first_aid_details} />
                      <DetailField label="First aider" value={viewingRecord.first_aider_name} />
                    </>
                  )}
                  {viewingRecord.hospital_visit && (
                    <DetailField label="Hospital" value={viewingRecord.hospital_name || 'Yes'} />
                  )}
                  {viewingRecord.time_off_work && (
                    <DetailField
                      label="Time off work"
                      value={`${viewingRecord.days_off} days${
                        viewingRecord.return_date
                          ? ` — expected back ${fmtUK(viewingRecord.return_date)}`
                          : ''
                      }`}
                    />
                  )}
                </FormCard>
              )}

              {/* Corrective actions (free text) */}
              {viewingRecord.corrective_actions && (
                <FormCard eyebrow="Corrective actions" className={cardCn}>
                  <p className="text-[13px] text-white">{viewingRecord.corrective_actions}</p>
                </FormCard>
              )}

              {/* Root cause analysis (5 Whys).
                  Keyed on the record id: the panel seeds its state from these
                  props on first render only, so it must not be reused across
                  two records. The sheet unmounts on close today, which hides
                  that — the key is what keeps it true if it ever doesn't. */}
              <FiveWhysAnalysis
                key={viewingRecord.id}
                table="accident_records"
                recordId={viewingRecord.id}
                existingWhys={(viewingRecord.five_whys as []) ?? []}
                existingCategory={viewingRecord.root_cause_category || ''}
                existingSummary={viewingRecord.root_cause || ''}
              />

              {/* Corrective actions tracker */}
              <CorrectiveActionsPanel sourceType="accident" sourceId={viewingRecord.id} />

              {/* Supervisor sign-off (remote). A signed-off record is a binary
                  safety verdict, so the emerald fill earns its keep here. */}
              <div>
                <Eyebrow className="mb-2">Supervisor sign-off</Eyebrow>
                {remoteSupervisor?.signed_signature ? (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/[0.08] p-3">
                    <p className="mb-2 text-[11.5px] text-emerald-400">
                      Signed by {remoteSupervisor.signed_name || 'supervisor'}
                      {remoteSupervisor.signed_at
                        ? ` · ${new Date(remoteSupervisor.signed_at).toLocaleDateString('en-GB')}`
                        : ''}
                    </p>
                    {/* was opacity-80 — a signature is evidence, not chrome */}
                    <img
                      src={remoteSupervisor.signed_signature}
                      alt="Supervisor signature"
                      className="h-12 w-auto"
                    />
                  </div>
                ) : (
                  <SecondaryButton
                    fullWidth
                    disabled={signLoading}
                    onClick={() => requestSupervisorSignOff(viewingRecord)}
                  >
                    {signLoading ? 'Preparing link…' : 'Request supervisor sign-off'}
                  </SecondaryButton>
                )}
              </div>

              {/* Meta */}
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-[11px] text-white">
                  <span>Recorded by {viewingRecord.recorded_by}</span>
                  {viewingRecord.reported_to && (
                    <span>Reported to {viewingRecord.reported_to}</span>
                  )}
                </div>
                {isArchived(viewingRecord) && (
                  <p className="mt-2 text-center text-[10.5px] text-amber-400">
                    Retained for the statutory period (three years). Do not delete.
                  </p>
                )}
              </div>
            </SheetShell>
          )}
        </SheetContent>
      </Sheet>

      {/* Mark as reported bottom sheet */}
      <Sheet open={showMarkReported} onOpenChange={setShowMarkReported}>
        <SheetContent side="bottom" className="rounded-t-2xl p-0 border-white/[0.06]">
          <SheetShell
            eyebrow="RIDDOR"
            title="Mark RIDDOR as reported"
            description="Record the HSE reference once you have submitted F2508."
            footer={
              <PrimaryButton
                fullWidth
                disabled={!riddorRef.trim() || markReported.isPending}
                onClick={handleMarkReported}
              >
                {markReported.isPending ? 'Saving…' : 'Confirm reported'}
              </PrimaryButton>
            }
          >
            <Field label="HSE reference number">
              <input
                value={riddorRef}
                onChange={(e) => setRiddorRef(e.target.value)}
                placeholder="e.g. 2024/12345"
                className={safetyInputCn}
              />
            </Field>
            <Field label="Date reported">
              <input
                type="date"
                value={riddorReportedDate}
                onChange={(e) => setRiddorReportedDate(e.target.value)}
                className={cn(safetyInputCn, '[color-scheme:dark]')}
              />
            </Field>
          </SheetShell>
        </SheetContent>
      </Sheet>

      {/* RIDDOR guide sheet */}
      <Sheet open={showRIDDORGuide} onOpenChange={setShowRIDDORGuide}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.06]"
        >
          <SheetShell
            eyebrow="RIDDOR 2013"
            title="RIDDOR reporting guide"
            description="Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013"
          >
            {/* Timescales.
                The middle card used to read "Within 10 days — Dangerous
                occurrences and occupational diseases", which put a dangerous
                occurrence on a ten-day fuse. It is not: a dangerous occurrence
                is notified WITHOUT DELAY, and the ten days is the deadline for
                the written F2508 that follows that notification. Every line
                below is from the HSE guidance held in `safety_facets`.
                Occupational diseases are reported on F2508A and are not given a
                timescale here — the source does not state one, and a made-up
                number on a compliance screen is worse than a gap. */}
            <FormCard eyebrow="Timescales" className={cardCn}>
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3">
                <Eyebrow className="text-red-400">Without delay</Eyebrow>
                <p className="mt-1.5 text-[12px] leading-relaxed text-white">
                  Deaths, specified injuries, dangerous occurrences, and any accident that takes a
                  person <strong className="font-semibold">not at work</strong> to hospital for
                  treatment. Notify by the quickest practicable means — 0345 300 9923.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <Eyebrow className="text-amber-400">Then within 10 days</Eyebrow>
                <p className="mt-1.5 text-[12px] leading-relaxed text-white">
                  The written report (form F2508) that follows the notification above.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                <Eyebrow className="text-amber-400">Within 15 days</Eyebrow>
                <p className="mt-1.5 text-[12px] leading-relaxed text-white">
                  Where someone is incapacitated for{' '}
                  <strong className="font-semibold">more than seven consecutive days</strong> —
                  excluding the day of the accident, including days they would not have worked.
                  Report as soon as practicable and, in any event, within 15 days of the accident.
                </p>
              </div>
            </FormCard>

            <FormCard eyebrow="Specified injuries" className={cardCn}>
              {RIDDOR_SPECIFIED_INJURIES.map((injury, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="mt-[3px] text-[11px] text-red-400" aria-hidden>
                    •
                  </span>
                  <span className="text-[12px] leading-relaxed text-white">{injury}</span>
                </div>
              ))}
            </FormCard>

            <FormCard eyebrow="Dangerous occurrences on electrical work" className={cardCn}>
              {RIDDOR_DANGEROUS_OCCURRENCES.map((occurrence, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="mt-[3px] text-[11px] text-amber-400" aria-hidden>
                    •
                  </span>
                  <span className="text-[12px] leading-relaxed text-white">{occurrence}</span>
                </div>
              ))}
            </FormCard>

            <FormCard eyebrow="How to report" className={cardCn}>
              <DetailField label="Online" value="hse.gov.uk/riddor" />
              <DetailField label="Phone (deaths and specified injuries)" value="0345 300 9923" />
              <DetailField
                label="Who reports"
                value="The responsible person — the employer, the self-employed person, or whoever is in control of the premises where the work was carried out."
              />
              <DetailField
                label="Record keeping"
                value="Records of reportable incidents must be kept for at least three years."
              />
            </FormCard>
          </SheetShell>
        </SheetContent>
      </Sheet>

      {viewingRecord && (
        <SafetyDocumentShare
          open={showShare}
          onClose={() => setShowShare(false)}
          pdfType="accident"
          recordId={viewingRecord.id}
          documentTitle={`Accident Record — ${viewingRecord.injured_name || 'Unknown'}`}
        />
      )}

      <RemoteSignShareSheet
        open={showSignShare}
        onOpenChange={setShowSignShare}
        url={signUrl}
        roleLabel="supervisor sign-off"
      />
    </SafetyModuleShell>
  );
}

export default DigitalAccidentBook;
