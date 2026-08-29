import { useMemo, useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { FormCard, SectionHeading } from '@/components/forms';
import { textareaCn } from '@/components/forms/fieldStyles';
import {
  routineInspectionGroups,
  type RoutineInspectionItem,
  type RoutineOutcome,
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
  items: RoutineInspectionItem[];
  observations: RoutineObservation[];
  onItemsChange: (items: RoutineInspectionItem[]) => void;
  onObservationsChange: (obs: RoutineObservation[]) => void;
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
  { value: 'C1', label: 'C1', hint: 'Danger present', short: 'Danger', cls: 'bg-red-500 border-red-500 text-white' },
  { value: 'C2', label: 'C2', hint: 'Potentially dangerous', short: 'Pot. dang.', cls: 'bg-orange-500 border-orange-500 text-black' },
  { value: 'C3', label: 'C3', hint: 'Improvement recommended', short: 'Improve', cls: 'bg-amber-300 border-amber-300 text-black' },
  { value: 'FI', label: 'FI', hint: 'Further investigation', short: 'Investigate', cls: 'bg-sky-400 border-sky-400 text-black' },
];

export default function RoutineInspectionSchedule({
  items,
  observations,
  onItemsChange,
  onObservationsChange,
}: Props) {
  const [openGroup, setOpenGroup] = useState<string>(routineInspectionGroups[0]);

  const byGroup = useMemo(() => {
    const m = new Map<string, RoutineInspectionItem[]>();
    for (const g of routineInspectionGroups) m.set(g, items.filter((i) => i.group === g));
    return m;
  }, [items]);

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

      {routineInspectionGroups.map((group) => {
        const groupItems = byGroup.get(group) ?? [];
        const done = groupItems.filter((i) => i.outcome !== '').length;
        const open = openGroup === group;
        return (
          <FormCard key={group} className="space-y-0 p-0 sm:p-0">
            <button
              type="button"
              onClick={() => setOpenGroup(open ? '' : group)}
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

              <Textarea
                value={o.description}
                onChange={(e) => updateObs(o.id, { description: e.target.value })}
                placeholder="What did you find?"
                className={cn(textareaCn, 'min-h-[64px]')}
              />
              <Textarea
                value={o.location}
                onChange={(e) => updateObs(o.id, { location: e.target.value })}
                placeholder="Where? e.g. DB2, way 6"
                className={cn(textareaCn, 'min-h-[44px]')}
              />

              {/*
                ⚠️ The meaning is ALWAYS on screen, never in a `title` tooltip —
                a tooltip needs hover, and there is no hover on a phone.
              */}
              <div className="flex flex-wrap gap-1.5">
                {CODES.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => updateObs(o.id, { code: c.value })}
                    aria-label={`${c.label} — ${c.hint}`}
                    aria-pressed={o.code === c.value}
                    className={cn(
                      'flex h-14 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl border px-1 transition-colors touch-manipulation active:scale-[0.97]',
                      o.code === c.value ? c.cls : 'border-white/[0.14] bg-white/[0.05] text-white'
                    )}
                  >
                    <span className="text-[13px] font-bold leading-none">{c.label}</span>
                    <span className="text-[9px] font-medium leading-tight opacity-90">
                      {c.short}
                    </span>
                  </button>
                ))}
              </div>

              <PhotoStrip
                photos={o.photos ?? []}
                onChange={(photos) => updateObs(o.id, { photos })}
                source="camera"
                label="Add photo"
                altPrefix={`Observation ${idx + 1} photo`}
              />
            </div>
          ))
        )}
      </FormCard>
    </div>
  );
}
