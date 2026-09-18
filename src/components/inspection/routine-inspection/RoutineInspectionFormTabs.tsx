import { useState } from 'react';
import { Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { FormCard, FieldLabel, SectionHeading, ToggleRow, SelectField } from '@/components/forms';
import { inputCn, textareaCn, grid2Cn, fieldWideCn } from '@/components/forms/fieldStyles';
import SignaturePad from '@/components/forms/SignaturePad';
import RoutineInspectionSchedule from './RoutineInspectionSchedule';
import SitePhotoGrid from './SitePhotoGrid';
import SpotChecksSection from './SpotChecksSection';
import ThermalSurveySection from './ThermalSurveySection';
import {
  deriveRoutineAssessment,
  effectiveAnomalies,
  ROUTINE_ASSESSMENT_LABEL,
  routineInspectionLimitations,
  eicrStatus,
  effectiveSpotChecks,
  reportPhotoBytes,
  formatPhotoBytes,
  PHOTO_BUDGET_WARN_BYTES,
  PHOTO_BUDGET_MAX_BYTES,
  THERMAL_SURVEY_LIMITATIONS,
  type RoutineInspectionFormData,
} from '@/types/routine-inspection';
import {
  getDefaultRoutineInspectionItems,
  VISIT_TYPE_LABEL,
  type VisitType,
} from '@/data/routineInspectionItems';
import type { RoutineInspectionTabValue } from '@/hooks/useRoutineInspectionTabs';

interface Props {
  currentTab: RoutineInspectionTabValue;
  formData: RoutineInspectionFormData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (field: keyof RoutineInspectionFormData, value: any) => void;
  /**
   * Customer linked to the saved report, used only to offer their jobs first in
   * the photo picker. Absent until the report has been saved once, which is
   * fine — the picker then lists every job instead of sorting theirs to the top.
   */
  customerId?: string | null;
}

/**
 * Premises where AFDD protection is MANDATORY, not recommended.
 *
 * Reg 421.1.7: arc fault detection devices to BS EN 62606 shall be provided for
 * single-phase AC final circuits supplying socket-outlets rated 32 A or less in
 * higher-risk residential buildings, houses in multiple occupation, purpose-built
 * student accommodation and care homes. For all other premises the same
 * regulation RECOMMENDS them — advisory, and deliberately not flagged here,
 * because a banner that fires on every ordinary flat teaches people to ignore it.
 *
 * Verified against `bs7671_facets` (A4:2026).
 */
const AFDD_REQUIRED = new Set(['hmo', 'student', 'care-home', 'hrrb']);

/**
 * Stock phrases for the three free-text boxes on the Visit step.
 *
 * Those boxes are the slowest thing on this form — three paragraphs of typing
 * on a phone, standing in a hall cupboard — and most of what goes in them is
 * the same sentence every visit. A chip appends rather than replaces, so they
 * compose: tap two, then type the bit that is specific to the day.
 *
 * ⚠️ Deliberately NOT defaults. Pre-filling "all accessible rooms" into a
 * report nobody has read would put a claim about the extent of an inspection
 * onto a signed document by accident — which is the whole failure this form
 * spends its limitations section guarding against.
 */
const VISIT_PRESETS: Record<
  'landlord' | 'commercial',
  { purpose: string[]; extent: string[]; limitations: string[] }
> = {
  landlord: {
    purpose: [
      'Annual landlord safety visit between condition reports',
      'Check at change of tenancy',
      'Visit following a fault reported by the tenant',
      'Periodic visit under a management agreement',
    ],
    extent: [
      'All accessible rooms and the consumer unit',
      'Smoke, heat and CO alarms tested',
      'Outside sockets and external lighting',
      'Supply to the garage or outbuilding',
    ],
    limitations: [
      'Rooms occupied at the time were not accessed',
      'Loft not accessed',
      'Furniture and appliances not moved',
      'Tenant declined access to part of the property',
    ],
  },
  commercial: {
    purpose: [
      'Annual planned maintenance under service contract',
      'Six-monthly maintenance visit',
      'Visit following a reported fault',
    ],
    extent: [
      'Main panel and distribution boards, enclosures opened',
      'Terminations checked for tightness',
      'Thermal sweep under normal operating load',
    ],
    limitations: [
      'Boards serving live processes could not be shut down',
      'Areas requiring a permit to work were not accessed',
      'Access equipment not available for high-level items',
    ],
  },
};

const ASSESSMENT_CLS: Record<string, string> = {
  satisfactory: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  'requires-attention': 'border-amber-400/40 bg-amber-400/10 text-amber-300',
  unsatisfactory: 'border-red-500/40 bg-red-500/10 text-red-300',
};

export default function RoutineInspectionFormTabs({
  currentTab,
  formData,
  onUpdate,
  customerId,
}: Props) {
  /*
   * 🔴 Declared before the tab branches below, which return early. A hook after
   * an early return is called on some renders and not others, which React
   * treats as a changed hook order and throws on.
   */
  const [pendingVisitType, setPendingVisitType] = useState<VisitType | null>(null);

  /*
   * ── Changing the visit type REPLACES the schedule ───────────────────────
   *
   * The two schedules are different questions with namespaced ids, so there is
   * no honest way to carry answers across: a landlord's "CO alarm present" has
   * no commercial counterpart, and pretending otherwise would leave answers
   * attached to questions nobody was asked.
   *
   * So the switch is free while nothing has been answered, and confirmed once
   * something has. Observations go with it — each is bound to an item by
   * `itemId`, and an observation pointing at an item that no longer exists is
   * an orphan the summary counts but no screen can show.
   */
  const isLandlord = formData.visitType === 'landlord';

  /**
   * Appends a stock phrase to one of the Visit boxes.
   *
   * ⚠️ Appends, never replaces — the phrases compose, and silently overwriting
   * something already typed is how a form loses a sentence somebody wrote about
   * a specific property. Already present? It does nothing rather than
   * duplicating the line.
   */
  const appendPreset = (field: 'purpose' | 'extent' | 'limitations', phrase: string) => {
    const current = typeof formData[field] === 'string' ? (formData[field] as string) : '';
    if (current.includes(phrase)) return;
    onUpdate(field, current.trim() ? `${current.replace(/\s+$/, '')}\n${phrase}` : phrase);
  };

  const PresetChips = ({ field }: { field: 'purpose' | 'extent' | 'limitations' }) => (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {VISIT_PRESETS[isLandlord ? 'landlord' : 'commercial'][field].map((phrase) => {
        const used = (typeof formData[field] === 'string' ? (formData[field] as string) : '').includes(phrase);
        return (
          <button
            key={phrase}
            type="button"
            disabled={used}
            onClick={() => appendPreset(field, phrase)}
            className={cn(
              'h-11 rounded-xl border px-3 text-[12px] font-medium touch-manipulation active:scale-[0.98]',
              used
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                : 'border-white/[0.16] bg-white/[0.06] text-white'
            )}
          >
            {used ? '✓ ' : '+ '}
            {phrase}
          </button>
        );
      })}
    </div>
  );

  /*
   * ── The photo budget ──────────────────────────────────────────────────
   * Photos live inline in the report row and are posted whole to PDFMonkey, so
   * the report has a size and the electrician is the only person who can keep
   * it sane. Counted in bytes because a count is a poor proxy — measured
   * through this app's own compression, one photo is 91 KB and another is
   * 505 KB. See `reportPhotoBytes`.
   */
  const photoUsage = reportPhotoBytes(formData);
  const budgetBlockedReason =
    photoUsage.bytes >= PHOTO_BUDGET_MAX_BYTES
      ? `The report is carrying ${formatPhotoBytes(photoUsage.bytes)} of photos, which is as much as it can send. Remove one to add another.`
      : undefined;
  const budgetWarning =
    !budgetBlockedReason && photoUsage.bytes >= PHOTO_BUDGET_WARN_BYTES
      ? `${formatPhotoBytes(photoUsage.bytes)} of photos on this report. Large reports are slower to produce and can be too big to email — keep the best ones.`
      : undefined;
  const eicrState = eicrStatus(formData.eicrNextDue);

  const answeredCount = (formData.inspectionItems ?? []).filter((i) => i.outcome !== '').length;
  const wouldLose = answeredCount > 0 || (formData.observations ?? []).length > 0;

  /* Named in the confirm dialog only when there is something to reassure about. */
  const keptExtras: string[] = [];
  {
    const readings = effectiveSpotChecks(formData).length;
    const photos = (formData.sitePhotos ?? []).length;
    if (readings) keptExtras.push(`${readings} reading${readings === 1 ? '' : 's'}`);
    if (photos) keptExtras.push(`${photos} photo${photos === 1 ? '' : 's'}`);
  }

  const applyVisitType = (next: VisitType) => {
    onUpdate('visitType', next);
    onUpdate('inspectionItems', getDefaultRoutineInspectionItems(next));
    onUpdate('observations', []);
    setPendingVisitType(null);
  };

  const requestVisitType = (next: VisitType) => {
    if (next === formData.visitType) return;
    if (wouldLose) setPendingVisitType(next);
    else applyVisitType(next);
  };

  const visitTypeSwitcher = (
    <>
      <FormCard>
        <SectionHeading title="Type of visit" />
        <ToggleRow
          options={[
            { label: VISIT_TYPE_LABEL.landlord, value: 'landlord' },
            { label: VISIT_TYPE_LABEL.commercial, value: 'commercial' },
          ]}
          value={formData.visitType}
          onChange={(v) => requestVisitType(v as VisitType)}
        />
        <p className="text-[12px] leading-snug text-white">
          {formData.visitType === 'landlord'
            ? 'A yearly walk round of a rented home, between EICRs. The report records the landlord’s duty to keep the installation in repair and in proper working order.'
            : 'Planned maintenance of a commercial or industrial installation, with an optional thermographic survey. The report supports the duty to maintain systems so as to prevent danger.'}
        </p>
      </FormCard>

      <ConfirmationDialog
        open={pendingVisitType !== null}
        onOpenChange={(open) => !open && setPendingVisitType(null)}
        title="Change the type of visit?"
        /*
         * ⚠️ It has to name what SURVIVES as well as what goes.
         *
         * Readings and photographs are kept — a measurement is a measurement
         * whichever kind of visit it was taken on — but the dialog used to
         * mention only the schedule and the observations, so an inspector
         * holding four readings and five photos had no way to know they were
         * safe. The likely response to that is to cancel, and then work around
         * the form.
         */
        description={
          `The two visits ask different questions, so the schedule is replaced rather than carried across. ` +
          `${answeredCount > 0 ? `${answeredCount} answered item${answeredCount === 1 ? '' : 's'}` : 'The schedule'}` +
          `${(formData.observations ?? []).length > 0 ? ` and ${(formData.observations ?? []).length} observation${(formData.observations ?? []).length === 1 ? '' : 's'}` : ''}` +
          ` will be cleared. ` +
          `Client and site details, your own details${keptExtras.length ? `, ${keptExtras.join(' and ')}` : ''} are all kept.`
        }
        confirmText="Change and clear"
        cancelText="Keep this visit"
        variant="destructive"
        onConfirm={() => pendingVisitType && applyVisitType(pendingVisitType)}
      />
    </>
  );

  /* ── Client and site ────────────────────────────────────────────────── */
  if (currentTab === 'client') {
    return (
      <div className="space-y-5">
        {visitTypeSwitcher}

        <FormCard>
          <SectionHeading title="Client" />
          <div className={grid2Cn}>
            {/* Full width on a phone — "Northgate Property Services" in 160px
                is truncated as it is typed. Pairs up again from `sm:`. */}
            <div className={fieldWideCn}>
              <FieldLabel>Client name</FieldLabel>
              <Input
                value={formData.clientName}
                onChange={(e) => onUpdate('clientName', e.target.value)}
                className={inputCn}
                placeholder="e.g. Northgate Property Services"
              />
            </div>
            <div>
              <FieldLabel>Phone</FieldLabel>
              <Input
                type="tel"
                inputMode="tel"
                value={formData.clientPhone}
                onChange={(e) => onUpdate('clientPhone', e.target.value)}
                className={inputCn}
              />
            </div>
            {/* No email address fits half a phone width. This one rendered as
                "landlord@example.cor" on an iPhone 14. */}
            <div className={fieldWideCn}>
              <FieldLabel>Email</FieldLabel>
              <Input
                type="email"
                inputMode="email"
                value={formData.clientEmail}
                onChange={(e) => onUpdate('clientEmail', e.target.value)}
                className={inputCn}
              />
            </div>
            <div>
              <FieldLabel>Occupier, if different</FieldLabel>
              <Input
                value={formData.occupier}
                onChange={(e) => onUpdate('occupier', e.target.value)}
                className={inputCn}
              />
            </div>
          </div>
          <div>
            <FieldLabel>Client address</FieldLabel>
            <Textarea
              value={formData.clientAddress}
              onChange={(e) => onUpdate('clientAddress', e.target.value)}
              className={cn(textareaCn, 'min-h-[64px]')}
            />
          </div>

          {/*
            Landlord visits only. The agent instructs and is invoiced; the
            landlord carries the repairing duty. The report has to be able to
            name both without implying they are the same person — and the
            property reference is the first thing a portfolio landlord searches
            on, and means nothing to us.
          */}
          {isLandlord && (
            <div className={grid2Cn}>
              <div className={fieldWideCn}>
                <FieldLabel>Letting agent, if any</FieldLabel>
                <Input
                  value={formData.lettingAgent}
                  onChange={(e) => onUpdate('lettingAgent', e.target.value)}
                  className={inputCn}
                  placeholder="e.g. Harper &amp; Co Lettings"
                />
              </div>
              <div>
                <FieldLabel>Their property reference</FieldLabel>
                <Input
                  value={formData.propertyReference}
                  onChange={(e) => onUpdate('propertyReference', e.target.value)}
                  className={inputCn}
                  placeholder="e.g. FLAT-14B"
                />
              </div>
            </div>
          )}
        </FormCard>

        <FormCard>
          <SectionHeading title="Installation" />
          <div>
            <FieldLabel>Installation address</FieldLabel>
            <Textarea
              value={formData.installationAddress}
              onChange={(e) => onUpdate('installationAddress', e.target.value)}
              className={cn(textareaCn, 'min-h-[64px]')}
            />
          </div>
          <div className={grid2Cn}>
            {/*
              Hidden on a landlord visit. A rented dwelling is domestic by
              definition and "Type of dwelling" below already asks the question
              that matters — two overlapping selects are an invitation to make
              them disagree. The PDF fills it in for landlord visits rather than
              storing a value the user never chose (see the JSON formatter).
            */}
            {!isLandlord && (
              <div>
                <FieldLabel>Type of premises</FieldLabel>
                <SelectField
                  value={formData.premisesType}
                  onValueChange={(v) => onUpdate('premisesType', v)}
                  placeholder="Select"
                  options={[
                    { value: 'domestic', label: 'Domestic' },
                    { value: 'commercial', label: 'Commercial' },
                    { value: 'industrial', label: 'Industrial' },
                    { value: 'other', label: 'Other' },
                  ]}
                />
              </div>
            )}
            <div className={fieldWideCn}>
              <FieldLabel>Supply</FieldLabel>
              <ToggleRow
                options={[
                  { label: 'Single phase', value: 'single-phase' },
                  { label: 'Three phase', value: 'three-phase' },
                ]}
                value={formData.supplyType}
                onChange={(v) => onUpdate('supplyType', v)}
              />
            </div>
          </div>
          <div>
            <FieldLabel>
              {isLandlord ? 'Consumer unit and any sub-boards' : 'Boards and switchgear covered'}
            </FieldLabel>
            <Textarea
              value={formData.boardsCovered}
              onChange={(e) => onUpdate('boardsCovered', e.target.value)}
              className={cn(textareaCn, 'min-h-[64px]')}
              placeholder={
                isLandlord
                  ? 'e.g. Consumer unit in the hall cupboard; garage sub-board'
                  : 'e.g. Main LV panel, DB1 (ground), DB2 (first floor), plant room DB3'
              }
            />
          </div>
          {/*
            Not a label — it decides which requirements are RELEVANT. Reg
            421.1.7 makes AFDDs mandatory on socket-outlet circuits rated 32 A
            or less in an HMO, purpose-built student accommodation, a care home
            or a higher-risk residential building; GN3 separately flags HMOs as
            premises that may require periodic inspection in their own right.
            A form that cannot tell an HMO from a two-bed flat cannot raise
            either point.
          */}
          {isLandlord && (
            <div>
              <FieldLabel>Type of dwelling</FieldLabel>
              <SelectField
                value={formData.dwellingType}
                onValueChange={(v) => onUpdate('dwellingType', v)}
                placeholder="Select"
                options={[
                  { value: 'house', label: 'House — single household' },
                  { value: 'flat', label: 'Flat — single household' },
                  { value: 'hmo', label: 'House in multiple occupation (HMO)' },
                  { value: 'student', label: 'Purpose-built student accommodation' },
                  { value: 'care-home', label: 'Care home' },
                  { value: 'hrrb', label: 'Higher-risk residential building' },
                ]}
              />
              {AFDD_REQUIRED.has(formData.dwellingType) && (
                <p className="mt-1.5 text-[12px] leading-snug text-elec-yellow">
                  Arc fault detection is mandatory here — Reg 421.1.7 requires AFDDs
                  on final circuits supplying socket-outlets rated 32 A or less in
                  these premises. Item 2.6 on the schedule.
                </p>
              )}
            </div>
          )}

          <div className="sm:max-w-[220px]">
            <FieldLabel>Date of visit</FieldLabel>
            <Input
              type="date"
              value={formData.inspectionDate}
              onChange={(e) => onUpdate('inspectionDate', e.target.value)}
              className={inputCn}
            />
          </div>
        </FormCard>

        {isLandlord && (
          <FormCard>
            <SectionHeading title="Condition report on file" />
            <div className={grid2Cn}>
              <div>
                <FieldLabel>Date of the last EICR</FieldLabel>
                <Input
                  type="date"
                  value={formData.eicrDate}
                  onChange={(e) => onUpdate('eicrDate', e.target.value)}
                  className={inputCn}
                />
              </div>
              <div>
                <FieldLabel>Next EICR due</FieldLabel>
                <Input
                  type="date"
                  value={formData.eicrNextDue}
                  onChange={(e) => onUpdate('eicrNextDue', e.target.value)}
                  className={inputCn}
                />
              </div>
            </div>

            {eicrState && (
              <div
                className={cn(
                  'rounded-xl border p-3 text-[13px] leading-snug',
                  eicrState.tone === 'overdue'
                    ? 'border-red-500/40 bg-red-500/10 text-red-300'
                    : eicrState.tone === 'soon'
                      ? 'border-amber-400/40 bg-amber-400/10 text-amber-300'
                      : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                )}
              >
                {eicrState.message}
              </div>
            )}

            {/*
              🔴 RECORDED, NOT ASSESSED — and the wording says so. This visit
              carries out no testing, so it cannot form a view on what the EICR
              found. What it can do is put the renewal in front of a landlord
              who would otherwise meet it as a surprise, which is most of them.
            */}
            <p className="text-[12px] leading-snug text-white">
              Taken from the report you were shown, not worked out here. For a
              private rented property in England the interval is not more than
              five years, or shorter where the inspector said so.
            </p>
          </FormCard>
        )}
      </div>
    );
  }

  /* ── The visit ──────────────────────────────────────────────────────── */
  if (currentTab === 'visit') {
    return (
      <div className="space-y-5">
        {/*
          The legal frame, stated once where the electrician is deciding what
          the visit covered. It is the reason the document is worth issuing.

          🔴 IT FOLLOWS THE VISIT TYPE, and it has to.

          EAWR 1989 Reg 4(2) is the duty on a dutyholder to maintain SYSTEMS at
          work. It is the right frame for a commercial maintenance visit and the
          wrong one for a tenant's home. What binds a landlord is a repairing
          duty — Landlord and Tenant Act 1985 s11(1)(b) in England and Wales,
          Housing (Scotland) Act 2014 s13 in Scotland — and unlike the
          five-yearly EICR it never pauses, which is the entire argument for
          issuing this record annually.

          Both verified in `bs7671_facets`; see the header of
          `data/landlordInspectionItems.ts`.
        */}
        <div className="-mx-4 border-y border-white/[0.12] bg-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x">
          <div className="flex gap-3">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-white" />
            <p className="text-[13px] leading-snug text-white">
              {formData.visitType === 'landlord' ? (
                <>
                  A landlord must keep the electrical installation in repair and
                  in proper working order — section 11(1)(b) of the Landlord and
                  Tenant Act 1985 in England and Wales, section 13 of the Housing
                  (Scotland) Act 2014 in Scotland. That duty is continuous, and
                  this visit is the record of it. It is not an EICR and does not
                  replace one.
                </>
              ) : (
                <>
                  A maintenance visit record supports the duty under Regulation
                  4(2) of the Electricity at Work Regulations 1989 to maintain
                  systems so as to prevent danger. It is not an EICR and does not
                  replace one.
                </>
              )}
            </p>
          </div>
        </div>

        <FormCard>
          <SectionHeading title="Purpose and extent" />
          <div>
            <FieldLabel>Purpose of the visit</FieldLabel>
            <Textarea
              value={formData.purpose}
              onChange={(e) => onUpdate('purpose', e.target.value)}
              className={cn(textareaCn, 'min-h-[64px]')}
              placeholder={
                isLandlord
                  ? 'e.g. Annual landlord safety visit between condition reports'
                  : 'e.g. Annual planned maintenance under service contract'
              }
            />
            <PresetChips field="purpose" />
          </div>
          <div>
            <FieldLabel>Extent — what was covered</FieldLabel>
            <Textarea
              value={formData.extent}
              onChange={(e) => onUpdate('extent', e.target.value)}
              className={cn(textareaCn, 'min-h-[80px]')}
              placeholder={
                isLandlord
                  ? 'e.g. All rooms, consumer unit, alarms tested, outside sockets and garage supply'
                  : 'e.g. Main panel and DB1–DB3: enclosures opened, connections checked, thermal sweep under load'
              }
            />
            <PresetChips field="extent" />
          </div>
          <div>
            <FieldLabel>Limitations — what was not covered, and why</FieldLabel>
            <Textarea
              value={formData.limitations}
              onChange={(e) => onUpdate('limitations', e.target.value)}
              className={cn(textareaCn, 'min-h-[80px]')}
              placeholder={
                isLandlord
                  ? 'e.g. Second bedroom occupied and not accessed; loft hatch sealed'
                  : 'e.g. DB4 serves a live production line and could not be shut down or opened'
              }
            />
            <PresetChips field="limitations" />
            <p className="mt-1.5 text-[12px] leading-snug text-white">
              The standard limitations for a maintenance visit are printed on
              every report automatically. This is for anything specific to the day.
            </p>
          </div>
        </FormCard>

        {/*
          Torque lives with the visit rather than the schedule: it describes HOW
          the connections were checked, and a torque figure with no instrument
          named cannot be relied on by anyone reading the report later.
        */}
        <FormCard>
          <SectionHeading title="Connection tightness" />
          <div>
            <FieldLabel>Were terminations checked with a torque instrument?</FieldLabel>
            <ToggleRow
              options={[
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ]}
              value={formData.torqueChecked ? 'yes' : 'no'}
              onChange={(v) => onUpdate('torqueChecked', v === 'yes')}
            />
          </div>
          {formData.torqueChecked && (
            <div className={grid2Cn}>
              <div className={fieldWideCn}>
                <FieldLabel>Instrument used</FieldLabel>
                <Input
                  value={formData.torqueInstrument}
                  onChange={(e) => onUpdate('torqueInstrument', e.target.value)}
                  className={inputCn}
                  placeholder="e.g. Wera Kraftform 1.2–3.0 Nm"
                />
              </div>
              <div className={fieldWideCn}>
                <FieldLabel>Settings applied</FieldLabel>
                <Input
                  value={formData.torqueSettings}
                  onChange={(e) => onUpdate('torqueSettings', e.target.value)}
                  className={inputCn}
                  placeholder="e.g. 2.5 Nm to manufacturer's data"
                />
              </div>
            </div>
          )}
        </FormCard>
      </div>
    );
  }

  /* ── Maintenance inspection ─────────────────────────────────────────── */
  if (currentTab === 'inspection') {
    return (
      <div className="space-y-5">
        <RoutineInspectionSchedule
          visitType={formData.visitType}
          items={formData.inspectionItems}
          observations={formData.observations}
          onItemsChange={(items) => onUpdate('inspectionItems', items)}
          onObservationsChange={(obs) => onUpdate('observations', obs)}
          budgetBlockedReason={budgetBlockedReason}
        />

        <SpotChecksSection formData={formData} onUpdate={onUpdate} />

        <FormCard>
          <div className="flex items-baseline justify-between gap-3">
            <SectionHeading title="Photos of the installation" className="mb-0" />
            {/*
              The running total is shown because the limit is in BYTES and the
              user cannot see bytes. Without it, hitting the cap would arrive as
              an unexplained refusal halfway through a job.
            */}
            {photoUsage.count > 0 && (
              <span
                className={cn(
                  'text-[12px] font-semibold',
                  photoUsage.bytes >= PHOTO_BUDGET_WARN_BYTES ? 'text-elec-yellow' : 'text-white'
                )}
              >
                {photoUsage.count} · {formatPhotoBytes(photoUsage.bytes)}
              </span>
            )}
          </div>
          <p className="text-[13px] leading-snug text-white">
            The board as found, the meter position, alarm heads, anything worth
            keeping with the report. These print on the PDF — caption each one so
            it still means something in a year.
          </p>
          <SitePhotoGrid
            photos={formData.sitePhotos ?? []}
            onChange={(v) => onUpdate('sitePhotos', v)}
            budgetBlockedReason={budgetBlockedReason}
            customerId={customerId}
          />
          {budgetWarning && (
            <p className="text-[12px] leading-snug text-elec-yellow">{budgetWarning}</p>
          )}
        </FormCard>
      </div>
    );
  }

  /* ── Thermal survey ─────────────────────────────────────────────────── */
  if (currentTab === 'thermal') {
    return <ThermalSurveySection formData={formData} onUpdate={onUpdate} />;
  }

  /* ── Summary and declaration ────────────────────────────────────────── */
  const assessment = deriveRoutineAssessment(
    formData.inspectionItems,
    formData.observations,
    effectiveAnomalies(formData)
  );

  return (
    <div className="space-y-5">
      <FormCard>
        <SectionHeading title="Outcome" />
        <div
          className={cn(
            'rounded-xl border p-4 text-center',
            ASSESSMENT_CLS[assessment]
          )}
        >
          <p className="text-[18px] font-bold tracking-tight">
            {ROUTINE_ASSESSMENT_LABEL[assessment]}
          </p>
          <p className="mt-1 text-[12px] leading-snug text-white">
            {/* A landlord visit has no thermal step, so naming thermal priorities
                here describes findings the report cannot contain. */}
            {assessment === 'unsatisfactory'
              ? isLandlord
                ? 'A C1 or a C2 was recorded — action is needed now.'
                : 'A C1, a C2 or a Priority 1 thermal finding was recorded — action is needed now.'
              : assessment === 'requires-attention'
                ? isLandlord
                  ? 'Defects were recorded that need attention, but nothing requiring immediate action.'
                  : 'Defects or thermal findings were recorded that need attention, but nothing requiring immediate action.'
                : isLandlord
                  ? 'No defects were recorded on this visit.'
                  : 'No defects or thermal findings were recorded on this visit.'}
          </p>
        </div>
        {/* A landlord visit has no thermal step, so naming thermal findings here
            describes an input the report cannot have. */}
        <p className="text-[12px] leading-snug text-white">
          {isLandlord
            ? 'Derived from the schedule and the observations together. It cannot be typed over — change the findings and this follows.'
            : 'Derived from the schedule, the observations and the thermal findings together. It cannot be typed over — change the findings and this follows.'}
        </p>

        <div>
          <FieldLabel>General condition of the installation</FieldLabel>
          <Textarea
            value={formData.generalCondition}
            onChange={(e) => onUpdate('generalCondition', e.target.value)}
            className={cn(textareaCn, 'min-h-[80px]')}
          />
        </div>
        <div>
          <FieldLabel>Recommendations and remedial work</FieldLabel>
          <Textarea
            value={formData.recommendations}
            onChange={(e) => onUpdate('recommendations', e.target.value)}
            className={cn(textareaCn, 'min-h-[80px]')}
          />
        </div>
      </FormCard>

      {/*
        🔴 NOT auto-filled from a table.

        The originating ticket asked for the next date to be suggested from a
        "GN3 frequency table". There is no such table — BS 7671 Reg 652.1 makes
        the interval a judgement weighing the installation, its use, its
        maintenance and the previous reports, and HSR25 §68 puts that judgement
        on the dutyholder. Printing a number the app invented, over the
        inspector's signature, would be the worst possible way to answer this.
      */}
      <FormCard>
        {/* "Next visit" on a landlord report, matching the PDF and the field
            below it. Calling it the next INSPECTION invites the reader to think
            the five-yearly EICR has just moved. */}
        <SectionHeading title={isLandlord ? 'Next visit' : 'Next inspection'} />
        <div className={grid2Cn}>
          <div>
            <FieldLabel>Recommended date of next visit</FieldLabel>
            <Input
              type="date"
              value={formData.nextInspectionDue}
              onChange={(e) => onUpdate('nextInspectionDue', e.target.value)}
              className={inputCn}
            />
          </div>
        </div>

        {/*
          🔴 A SHORTCUT, NOT A RULE.
          It fills the field with a date the inspector can see and change — it
          does not choose on their behalf, and there is deliberately no default.
          Twelve months is what a landlord visit is FOR (the EICR covers the
          five-yearly duty), so typing it out every time is friction with no
          judgement in it; but the reasoning box below is still theirs to fill,
          and the interval remains their recommendation.
        */}
        {isLandlord && (
          <button
            type="button"
            onClick={() => {
              const base = formData.inspectionDate || new Date().toISOString().slice(0, 10);
              const d = new Date(`${base}T00:00:00`);
              if (Number.isNaN(d.getTime())) return;
              d.setFullYear(d.getFullYear() + 1);
              onUpdate('nextInspectionDue', d.toISOString().slice(0, 10));
            }}
            className="h-11 rounded-xl border border-white/[0.16] bg-white/[0.06] px-4 text-[13px] font-semibold text-white touch-manipulation active:scale-[0.98]"
          >
            Twelve months from the visit
          </button>
        )}
        <div>
          <FieldLabel>Reasoning for the interval</FieldLabel>
          <Textarea
            value={formData.nextInspectionReasoning}
            onChange={(e) => onUpdate('nextInspectionReasoning', e.target.value)}
            className={cn(textareaCn, 'min-h-[64px]')}
            placeholder={
              isLandlord
                ? 'e.g. 12 months — tenanted flat, alarms replaced this visit, EICR due 2028'
                : 'e.g. 12 months — heavy industrial use, dusty environment, two Priority 3 findings this visit'
            }
          />
          <p className="mt-1.5 text-[12px] leading-snug text-white">
            {isLandlord ? (
              <>
                This is the next <span className="font-semibold">visit</span>, not
                the next EICR — they are separate, and the EICR is recorded on the
                first step. There is no published table of visit intervals, so the
                interval is your judgement: how the property is used, what you
                found today, and what the last visit found. Say why you chose it —
                that reasoning is what makes the recommendation defensible.
              </>
            ) : (
              <>
                There is no published table of maintenance intervals by premises
                type. The interval is your judgement, weighing the type of
                installation, how it is used, the quality of maintenance, external
                influences and what previous reports found. Say why you chose it —
                that reasoning is what makes the recommendation defensible.
              </>
            )}
          </p>
        </div>
      </FormCard>

      <FormCard>
        <SectionHeading title="Limitations" />
        <p className="whitespace-pre-line text-[12px] leading-relaxed text-white">
          {routineInspectionLimitations(formData.visitType, effectiveSpotChecks(formData).length > 0)}
        </p>
        {formData.thermalSurveyCarriedOut && (
          <p className="whitespace-pre-line border-t border-white/[0.1] pt-3 text-[12px] leading-relaxed text-white">
            {THERMAL_SURVEY_LIMITATIONS}
          </p>
        )}
        <p className="text-[12px] leading-snug text-elec-yellow">
          Printed on every report. It cannot be edited or removed.
        </p>
      </FormCard>

      <FormCard>
        <SectionHeading title="Declaration" />
        <div className={grid2Cn}>
          <div>
            <FieldLabel>Name</FieldLabel>
            <Input
              value={formData.inspectorName}
              onChange={(e) => onUpdate('inspectorName', e.target.value)}
              className={inputCn}
            />
          </div>
          <div>
            <FieldLabel>Position</FieldLabel>
            <Input
              value={formData.inspectorPosition}
              onChange={(e) => onUpdate('inspectorPosition', e.target.value)}
              className={inputCn}
              placeholder="e.g. Approved Electrician"
            />
          </div>
          <div>
            <FieldLabel>Company</FieldLabel>
            <Input
              value={formData.companyName}
              onChange={(e) => onUpdate('companyName', e.target.value)}
              className={inputCn}
            />
          </div>
          <div>
            <FieldLabel>Date</FieldLabel>
            <Input
              type="date"
              value={formData.inspectorDate}
              onChange={(e) => onUpdate('inspectorDate', e.target.value)}
              className={inputCn}
            />
          </div>
        </div>
        <div>
          <FieldLabel>Signature</FieldLabel>
          <SignaturePad onSignatureChange={(v) => onUpdate('inspectorSignature', v)} />
          {formData.inspectorSignature && (
            <p className="mt-1 text-[12px] text-white">Signature captured</p>
          )}
        </div>
      </FormCard>
    </div>
  );
}
