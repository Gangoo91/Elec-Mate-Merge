import { useMemo, useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { FormCard, FieldLabel, SectionHeading } from '@/components/forms';
import { textareaCn } from '@/components/forms/fieldStyles';
import {
  groupsForVisitType,
  type RoutineInspectionItem,
  type RoutineOutcome,
  type VisitType,
} from '@/data/routineInspectionItems';
import type { RoutineObservation, ObservationCode } from '@/types/routine-inspection';
import PhotoStrip from './PhotoStrip';

/**
 * The maintenance walk round.
 *
 * Same interaction language as the visual condition report — grouped
 * accordions, one section open at a time, outcome as a row of chips rather than
 * a picker. Twenty-three items in a flat scroll is unusable on a 6" screen held
 * one-handed in a plant room, and a select that opens a sheet per item turns a
 * two-minute job into a ten-minute one.
 */

interface Props {
  /**
   * 🔴 Drives the SECTION ORDER, and nothing else here.
   *
   * The items themselves come from `items` — the form's own state — so this
   * component never has to decide which schedule is in play. That matters
   * during a visit-type change: state updates in one render, and a component
   * that derived its items from the type while reading answers from props
   * would spend that render showing one schedule's questions against the
   * other's answers.
   */
  visitType: VisitType;
  items: RoutineInspectionItem[];
  observations: RoutineObservation[];
  onItemsChange: (items: RoutineInspectionItem[]) => void;
  onObservationsChange: (obs: RoutineObservation[]) => void;
  /**
   * Set when the report's photo budget is spent.
   *
   * ⚠️ It has to reach the FINDING photos too, not just the site photos. The
   * budget is the whole report's, and a limit that only stopped one of the two
   * places photos are added would simply move the overflow to the other.
   */
  budgetBlockedReason?: string;
}

/*
 * Four outcomes, not the visual report's five.
 *
 * There is no "further investigation" here: a maintenance visit that finds
 * something it cannot resolve records a DEFECT and codes the observation FI.
 * Having both an item-level FI and an observation-level FI on the visual report
 * meant the same finding could be counted twice in the summary.
 */
const OUTCOMES: { value: RoutineOutcome; label: string; cls: string }[] = [
  { value: 'satisfactory', label: 'OK', cls: 'bg-emerald-500 border-emerald-500 text-black' },
  { value: 'defect', label: 'Defect', cls: 'bg-red-500 border-red-500 text-white' },
  { value: 'not-applicable', label: 'N/A', cls: 'bg-white/[0.18] border-white/[0.3] text-white' },
  { value: 'not-verified', label: 'Not seen', cls: 'bg-white/[0.18] border-white/[0.3] text-white' },
];

const CODES: {
  value: ObservationCode; label: string; hint: string; short: string; cls: string;
}[] = [
  { value: 'C1', label: 'C1', hint: 'Danger present', short: 'Danger present', cls: 'bg-red-500 border-red-500 text-white' },
  { value: 'C2', label: 'C2', hint: 'Potentially dangerous', short: 'Potentially dangerous', cls: 'bg-orange-500 border-orange-500 text-black' },
  { value: 'C3', label: 'C3', hint: 'Improvement recommended', short: 'Improvement', cls: 'bg-amber-300 border-amber-300 text-black' },
  { value: 'FI', label: 'FI', hint: 'Further investigation', short: 'Investigation', cls: 'bg-sky-400 border-sky-400 text-black' },
];

export default function RoutineInspectionSchedule({
  visitType,
  items,
  observations,
  onItemsChange,
  onObservationsChange,
  budgetBlockedReason,
}: Props) {
  const groups = useMemo(() => groupsForVisitType(visitType), [visitType]);

  /*
   * ⚠️ Derived from the items, not held in state.
   *
   * Held in state, the open section would be a name from the PREVIOUS
   * schedule after a visit-type change — every section collapsed, with no
   * indication why. `openGroup` is therefore a nullable override that falls
   * back to whichever section is first in the schedule actually on screen.
   */
  const [openOverride, setOpenOverride] = useState<string | null>(null);
  const openGroup =
    // '' is the user having collapsed everything — a real choice, not "unset".
    openOverride === ''
      ? ''
      : // A name left over from the OTHER schedule matches nothing here, so it
        // falls through to the first section rather than collapsing the lot.
        openOverride !== null && groups.includes(openOverride)
        ? openOverride
        : groups[0];

  const byGroup = useMemo(() => {
    const m = new Map<string, RoutineInspectionItem[]>();
    for (const g of groups) m.set(g, items.filter((i) => i.group === g));
    return m;
  }, [items, groups]);

  /** The text `setOutcome` pre-fills, and the test for "still untouched". */
  const seedText = (item?: RoutineInspectionItem) =>
    item ? `${item.itemNumber} — ${item.description}` : '';

  const setOutcome = (id: string, outcome: RoutineOutcome) => {
    onItemsChange(items.map((i) => (i.id === id ? { ...i, outcome } : i)));
    const item = items.find((i) => i.id === id);

    // A defect is worth nothing without a record of what it was. Raise the
    // observation the moment it is marked, pre-filled with the item.
    if (outcome === 'defect') {
      if (observations.some((o) => o.itemId === id)) return;
      onObservationsChange([
        ...observations,
        {
          id: crypto.randomUUID(),
          itemId: id,
          location: '',
          description: seedText(item),
          code: '',
          photos: [],
        },
      ]);
      return;
    }

    /*
     * Marking an item away from Defect withdraws the observation this raised
     * for it — but ONLY while that observation is still exactly as seeded.
     *
     * A mis-tap on "Defect" otherwise leaves an orphan behind that says an item
     * failed while the schedule says it passed. It would not even show up in
     * the verdict, because an uncoded observation changes nothing — so the user
     * has no prompt to go and find it. Anything they have actually typed, coded
     * or photographed is theirs, and is left alone.
     */
    if (outcome === '') return;
    const untouched = observations.find(
      (o) =>
        o.itemId === id &&
        !o.code &&
        !o.location.trim() &&
        !o.photos?.length &&
        o.description === seedText(item)
    );
    if (untouched) {
      onObservationsChange(observations.filter((o) => o.id !== untouched.id));
    }
  };

  const setNotes = (id: string, notes: string) =>
    onItemsChange(items.map((i) => (i.id === id ? { ...i, notes } : i)));

  const updateObs = (id: string, patch: Partial<RoutineObservation>) =>
    onObservationsChange(observations.map((o) => (o.id === id ? { ...o, ...patch } : o)));

  const answered = items.filter((i) => i.outcome !== '').length;

  return (
    <div className="space-y-5">
      <FormCard>
        <div className="flex items-baseline justify-between gap-3">
          <SectionHeading title="Maintenance inspection" className="mb-0" />
          <span className="text-[13px] font-semibold text-white">
            {answered} of {items.length}
          </span>
        </div>
        <p className="text-[13px] leading-snug text-white">
          Record what you checked on this visit. Anything you could not reach or
          could not open is <span className="font-semibold">Not seen</span> — not OK.
          It prints in the limitations so the client knows what was left.
        </p>
      </FormCard>

      {groups.map((group) => {
        const groupItems = byGroup.get(group) ?? [];
        const done = groupItems.filter((i) => i.outcome !== '').length;
        const open = openGroup === group;
        return (
          <FormCard key={group} className="space-y-0 p-0 sm:p-0">
            <button
              type="button"
              onClick={() => setOpenOverride(open ? '' : group)}
              className="flex h-14 w-full items-center justify-between gap-3 px-4 text-left touch-manipulation sm:px-5"
            >
              <span className="text-[15px] font-semibold tracking-tight text-white">{group}</span>
              <span className="flex flex-shrink-0 items-center gap-2">
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-[11px] font-semibold',
                    done === groupItems.length
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-white/[0.1] text-white'
                  )}
                >
                  {done}/{groupItems.length}
                </span>
                <ChevronDown
                  className={cn('h-4 w-4 text-white transition-transform', open && 'rotate-180')}
                />
              </span>
            </button>

            {open && (
              <div className="space-y-4 border-t border-white/[0.1] px-4 py-4 sm:px-5">
                {/*
                  ── "Mark the rest OK" ──────────────────────────────────────
                  The landlord schedule runs to 42 items and most of them are
                  fine on most visits; forty-two taps to say so is the
                  difference between a form that gets used on site and one that
                  gets filled in afterwards from memory.

                  🔴 IT ONLY FILLS BLANKS. Marking everything satisfactory
                  would erase a defect the inspector had already recorded — the
                  one answer on the page that took real work — and they would
                  have no way of knowing. So the label counts what is still
                  unanswered, and the button disappears when nothing is.
                */}
                {groupItems.some((i) => i.outcome === '') && (
                  <button
                    type="button"
                    onClick={() => {
                      const ids = new Set(
                        groupItems.filter((i) => i.outcome === '').map((i) => i.id)
                      );
                      onItemsChange(
                        items.map((i) =>
                          ids.has(i.id) ? { ...i, outcome: 'satisfactory' as const } : i
                        )
                      );
                    }}
                    className="h-11 w-full rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-[13px] font-semibold text-emerald-300 touch-manipulation active:scale-[0.98]"
                  >
                    Mark the remaining{' '}
                    {groupItems.filter((i) => i.outcome === '').length} OK
                  </button>
                )}

                {groupItems.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <div className="flex gap-2">
                      <span className="mt-0.5 flex-shrink-0 font-mono text-[12px] font-semibold text-white">
                        {item.itemNumber}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[14px] leading-snug text-white">{item.description}</p>
                        {item.hint && (
                          <p className="mt-1 text-[12px] leading-snug text-white">{item.hint}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {OUTCOMES.map((o) => (
                        <button
                          key={o.value}
                          type="button"
                          onClick={() => setOutcome(item.id, o.value)}
                          className={cn(
                            'h-11 min-w-[52px] flex-1 rounded-xl border px-2 text-[12px] font-semibold transition-colors touch-manipulation active:scale-[0.97]',
                            item.outcome === o.value
                              ? o.cls
                              : 'border-white/[0.14] bg-white/[0.05] text-white'
                          )}
                        >
                          {o.label}
                        </button>
                      ))}
                    </div>

                    {item.outcome === 'not-verified' && (
                      <Textarea
                        value={item.notes || ''}
                        onChange={(e) => setNotes(item.id, e.target.value)}
                        placeholder="Why could it not be checked? This prints in the limitations."
                        className={cn(textareaCn, 'min-h-[64px]')}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </FormCard>
        );
      })}

      {/* ── Observations ─────────────────────────────────────────────── */}
      <FormCard className="space-y-4">
        <div className="flex items-baseline justify-between gap-3">
          <SectionHeading title="Observations" className="mb-0" />
          <button
            type="button"
            onClick={() =>
              onObservationsChange([
                ...observations,
                { id: crypto.randomUUID(), location: '', description: '', code: '', photos: [] },
              ])
            }
            className="flex h-11 items-center gap-1 rounded-xl border border-elec-yellow/50 bg-elec-yellow/10 px-3 text-[13px] font-semibold text-elec-yellow touch-manipulation active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>

        {observations.length === 0 ? (
          <p className="text-[13px] text-white">
            Nothing recorded. Marking an item as a defect adds one here automatically.
          </p>
        ) : (
          observations.map((o, idx) => (
            <div
              key={o.id}
              className="space-y-3 rounded-xl border border-white/[0.14] bg-white/[0.04] p-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold text-white">Observation {idx + 1}</span>
                <button
                  type="button"
                  onClick={() => onObservationsChange(observations.filter((x) => x.id !== o.id))}
                  className="h-11 px-2 text-[13px] font-semibold text-red-400 touch-manipulation"
                >
                  Remove
                </button>
              </div>

              {/*
                ⚠️ LABELLED, not just placeheld.

                A placeholder disappears the moment anything is typed into it,
                so two stacked boxes of free text ended up with nothing on
                screen saying which was the finding and which was the location.
                Both reach the client's report — the first as the description of
                a defect, the second as the place it is — and an inspector
                coming back to a half-written observation had to guess.
              */}
              <div>
                <FieldLabel>What did you find?</FieldLabel>
                <Textarea
                  value={o.description}
                  onChange={(e) => updateObs(o.id, { description: e.target.value })}
                  placeholder="e.g. Socket front cracked and scorched around the live terminal"
                  className={cn(textareaCn, 'min-h-[64px]')}
                />
              </div>
              <div>
                <FieldLabel>Where is it?</FieldLabel>
                <Textarea
                  value={o.location}
                  onChange={(e) => updateObs(o.id, { location: e.target.value })}
                  placeholder={
                    visitType === 'landlord'
                      ? 'e.g. Kitchen, socket left of the sink'
                      : 'e.g. DB2, way 6'
                  }
                  className={cn(textareaCn, 'min-h-[44px]')}
                />
              </div>

              <div>
                <FieldLabel>How serious is it?</FieldLabel>
              {/*
                ⚠️ The meaning is ALWAYS on screen, never in a `title` tooltip —
                a tooltip needs hover, and there is no hover on a phone.
              */}
              {/*
                ⚠️ TWO COLUMNS ON A PHONE, four across from `sm` up.

                Four chips across a 390px screen leaves about 85px each, which
                is why the meanings were abbreviated to "Pot. dang." and set at
                9px — unreadable on a phone, in a hall cupboard, at arm's
                length, which is exactly where this gets used. Two columns give
                each chip roughly 170px: the full words fit, and they fit at a
                size someone can actually read.

                The meaning stays ON SCREEN rather than in a `title` tooltip —
                a tooltip needs hover and there is no hover on a phone. Choosing
                the wrong code is not a cosmetic mistake.
              */}
              <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                {CODES.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => updateObs(o.id, { code: c.value })}
                    aria-label={`${c.label} — ${c.hint}`}
                    aria-pressed={o.code === c.value}
                    className={cn(
                      'flex h-14 min-w-0 flex-col items-center justify-center gap-0.5 rounded-xl border px-1.5 transition-colors touch-manipulation active:scale-[0.97]',
                      o.code === c.value ? c.cls : 'border-white/[0.14] bg-white/[0.05] text-white'
                    )}
                  >
                    <span className="text-[13px] font-bold leading-none">{c.label}</span>
                    <span className="text-center text-[11px] font-medium leading-tight">
                      {c.short}
                    </span>
                  </button>
                ))}
              </div>
              </div>

              {/*
                Shown only once the finding is coded, because an uncoded
                observation never reaches the quote anyway — offering the switch
                before then would suggest a choice that does not exist yet.
              */}
              {o.code && (
                <label className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-xl border border-white/[0.14] bg-white/[0.04] px-3 touch-manipulation">
                  <input
                    type="checkbox"
                    checked={!o.excludeFromQuote}
                    onChange={(e) => updateObs(o.id, { excludeFromQuote: !e.target.checked })}
                    className="h-5 w-5 flex-shrink-0 accent-elec-yellow"
                  />
                  <span className="text-[13px] leading-snug text-white">
                    Include when pricing the remedial work
                  </span>
                </label>
              )}

              <PhotoStrip
                photos={o.photos ?? []}
                onChange={(photos) => updateObs(o.id, { photos })}
                source="camera"
                label="Add photo"
                altPrefix={`Observation ${idx + 1} photo`}
                budgetBlockedReason={budgetBlockedReason}
              />
            </div>
          ))
        )}
      </FormCard>
    </div>
  );
}
