import { useMemo, useRef, useState } from 'react';
import { ChevronDown, Camera, Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';
import { FormCard, SectionHeading } from '@/components/forms';
import { textareaCn } from '@/components/forms/fieldStyles';
import {
  visualConditionGroups,
  type VisualInspectionItem,
  type VisualOutcome,
} from '@/data/visualConditionInspectionItems';
import type { VisualObservation, ObservationCode } from '@/types/visual-condition';

/**
 * The walk round. This is the whole substance of a visual condition report, so
 * it has to be genuinely fast on a phone held one-handed in somebody's hallway.
 *
 * ── DESIGN ────────────────────────────────────────────────────────────────
 * • Grouped accordions, one section open at a time. Twenty-three items in one
 *   flat scroll is unusable on a 6" screen.
 * • Outcome is a row of chips, not a select. No sheet to open, no picker to
 *   dismiss — one tap per item, which is the difference between this taking
 *   two minutes and taking ten.
 * • Marking an item Unsatisfactory raises an observation immediately, right
 *   there, rather than making the user remember it for a later screen.
 *
 * 🔴 `requiresTest` items cannot be marked Satisfactory. A visual inspection
 * cannot establish that an RCD operates or that a protective device is
 * correctly rated — those need instruments. Offering "Satisfactory" there
 * would invite someone to sign for a result they had no way to obtain, on a
 * document a landlord or a buyer may rely on.
 */

interface Props {
  items: VisualInspectionItem[];
  observations: VisualObservation[];
  onItemsChange: (items: VisualInspectionItem[]) => void;
  onObservationsChange: (obs: VisualObservation[]) => void;
}

/** Full set. `satisfactory` is filtered out for items needing a test. */
const OUTCOMES: { value: VisualOutcome; label: string; cls: string }[] = [
  { value: 'satisfactory', label: 'OK', cls: 'bg-emerald-500 border-emerald-500 text-black' },
  { value: 'unsatisfactory', label: 'Defect', cls: 'bg-red-500 border-red-500 text-white' },
  { value: 'further-investigation', label: 'FI', cls: 'bg-orange-400 border-orange-400 text-black' },
  { value: 'not-applicable', label: 'N/A', cls: 'bg-white/[0.18] border-white/[0.3] text-white' },
  { value: 'not-verified', label: 'Not seen', cls: 'bg-white/[0.18] border-white/[0.3] text-white' },
];

/*
 * Photographs live inline in the report data, matching the danger notice and
 * isolation certificate (the certs use a separate `inspection_photos` table,
 * but those carry far more). Inline means every autosave rewrites them, so the
 * count is capped: without a limit one report could grow without bound and make
 * a 30-second autosave expensive on a phone with a poor signal.
 *
 * Six is generous for a single observation — most warrant two or three.
 */
const MAX_PHOTOS_PER_OBSERVATION = 6;

const CODES: {
  value: ObservationCode; label: string; hint: string; short: string; cls: string;
}[] = [
  { value: 'C1', label: 'C1', hint: 'Danger present', short: 'Danger', cls: 'bg-red-500 border-red-500 text-white' },
  { value: 'C2', label: 'C2', hint: 'Potentially dangerous', short: 'Pot. dang.', cls: 'bg-orange-500 border-orange-500 text-black' },
  { value: 'C3', label: 'C3', hint: 'Improvement recommended', short: 'Improve', cls: 'bg-amber-300 border-amber-300 text-black' },
  { value: 'FI', label: 'FI', hint: 'Further investigation', short: 'Investigate', cls: 'bg-sky-400 border-sky-400 text-black' },
];

export default function VisualInspectionSchedule({
  items,
  observations,
  onItemsChange,
  onObservationsChange,
}: Props) {
  const [openGroup, setOpenGroup] = useState<string>(visualConditionGroups[0]);
  /*
   * One hidden input per observation would be a lot of DOM on a long report, so
   * a single input is retargeted at whichever observation asked for it.
   */
  const fileRef = useRef<HTMLInputElement>(null);
  const targetObs = useRef<string | null>(null);

  const byGroup = useMemo(() => {
    const m = new Map<string, VisualInspectionItem[]>();
    for (const g of visualConditionGroups) m.set(g, items.filter((i) => i.group === g));
    return m;
  }, [items]);

  const setOutcome = (id: string, outcome: VisualOutcome) => {
    onItemsChange(items.map((i) => (i.id === id ? { ...i, outcome } : i)));

    // A defect is worth nothing without a record of what it was. Raise the
    // observation the moment it is marked, pre-filled with the item.
    if (outcome === 'unsatisfactory' && !observations.some((o) => o.itemId === id)) {
      const item = items.find((i) => i.id === id);
      onObservationsChange([
        ...observations,
        {
          id: crypto.randomUUID(),
          itemId: id,
          location: '',
          description: item ? `${item.itemNumber} — ${item.description}` : '',
          code: '',
          photos: [],
        },
      ]);
    }
  };

  const setNotes = (id: string, notes: string) =>
    onItemsChange(items.map((i) => (i.id === id ? { ...i, notes } : i)));

  const updateObs = (id: string, patch: Partial<VisualObservation>) =>
    onObservationsChange(observations.map((o) => (o.id === id ? { ...o, ...patch } : o)));

  const removeObs = (id: string) =>
    onObservationsChange(observations.filter((o) => o.id !== id));

  /*
   * A visual report has no test results to fall back on — the photograph IS
   * the evidence. This was a dead camera icon and a count with no way to add
   * one, which is worse than not offering it at all.
   *
   * Compressed to 1000px / JPEG 75 before it ever reaches state, matching the
   * danger notice and isolation certificate. Full-resolution phone photos
   * would blow the PDFMonkey payload and the autosave row alike.
   */
  const onPickPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const obsId = targetObs.current;
    e.target.value = '';
    if (!files || !obsId) return;
    for (const file of Array.from(files)) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const MAX = 1000;
          const scale = img.width > MAX ? MAX / img.width : 1;
          const canvas = document.createElement('canvas');
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const compressed = canvas.toDataURL('image/jpeg', 0.75);
          /*
           * Read from the live array each time — several files resolve
           * independently and would otherwise overwrite each other.
           *
           * 🔴 The ref alone is NOT sufficient. It is only refreshed during
           * render, so two callbacks landing before React has re-rendered still
           * read the same array and the second silently drops the first. The
           * result is written straight back onto the ref here, claiming the
           * slot immediately, which makes it correct regardless of when React
           * chooses to re-render.
           */
          const next = observationsRef.current.map((o) => {
            if (o.id !== obsId) return o;
            const existing = o.photos ?? [];
            if (existing.length >= MAX_PHOTOS_PER_OBSERVATION) return o;
            return { ...o, photos: [...existing, compressed] };
          });
          observationsRef.current = next;
          onObservationsChange(next);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (obsId: string, idx: number) =>
    onObservationsChange(
      observations.map((o) =>
        o.id === obsId ? { ...o, photos: (o.photos ?? []).filter((_, i) => i !== idx) } : o
      )
    );

  /*
   * Each FileReader.onload fires on its own tick with a stale closure over
   * `observations`. Two photos picked at once would see the same array and the
   * second would drop the first. The ref always holds the latest.
   */
  const observationsRef = useRef(observations);
  observationsRef.current = observations;

  const answered = items.filter((i) => i.outcome !== '').length;

  return (
    <div className="space-y-5">
      <FormCard>
        <div className="flex items-baseline justify-between gap-3">
          <SectionHeading title="Visual inspection" className="mb-0" />
          <span className="text-[13px] font-semibold text-white">
            {answered} of {items.length}
          </span>
        </div>
        <p className="text-[13px] leading-snug text-white">
          Record what you can see. Anything you could not reach or could not
          determine by looking is <span className="font-semibold">Not seen</span> or{' '}
          <span className="font-semibold">FI</span> — not OK.
        </p>
      </FormCard>

      {visualConditionGroups.map((group) => {
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
                {groupItems.map((item) => {
                  /* 🔴 See the note at the top — no Satisfactory without a test. */
                  const outcomes = item.requiresTest
                    ? OUTCOMES.filter((o) => o.value !== 'satisfactory')
                    : OUTCOMES;
                  return (
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
                          {item.requiresTest && (
                            <p className="mt-1 text-[12px] font-medium leading-snug text-orange-300">
                              Cannot be confirmed by looking — needs a test
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {outcomes.map((o) => (
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

                      {(item.outcome === 'not-verified' ||
                        item.outcome === 'further-investigation') && (
                        <Textarea
                          value={item.notes || ''}
                          onChange={(e) => setNotes(item.id, e.target.value)}
                          placeholder={
                            item.outcome === 'not-verified'
                              ? 'Why could it not be inspected? This prints in the limitations.'
                              : 'What needs investigating, and why?'
                          }
                          className={cn(textareaCn, 'min-h-[64px]')}
                        />
                      )}
                    </div>
                  );
                })}
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
                <span className="text-[12px] font-semibold text-white">
                  Observation {idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeObs(o.id)}
                  className="h-11 px-2 text-[13px] font-semibold text-red-400 touch-manipulation"
                >
                  Remove
                </button>
              </div>

              <Textarea
                value={o.description}
                onChange={(e) => updateObs(o.id, { description: e.target.value })}
                placeholder="What did you see?"
                className={cn(textareaCn, 'min-h-[64px]')}
              />
              <Textarea
                value={o.location}
                onChange={(e) => updateObs(o.id, { location: e.target.value })}
                placeholder="Where? e.g. Kitchen, under the sink"
                className={cn(textareaCn, 'min-h-[44px]')}
              />

              {/*
                ⚠️ The meaning is ALWAYS on screen, not in a `title` tooltip.
                A tooltip needs hover, and there is no hover on a phone — the
                codes would have read as four bare initials to anyone who did
                not already know them, which is exactly the apprentice this
                app is also for.
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
                      o.code === c.value
                        ? c.cls
                        : 'border-white/[0.14] bg-white/[0.05] text-white'
                    )}
                  >
                    <span className="text-[13px] font-bold leading-none">{c.label}</span>
                    <span className="text-[9px] font-medium leading-tight opacity-90">
                      {c.short}
                    </span>
                  </button>
                ))}
              </div>

              {/*
                Photographs are the evidence a visual report rests on — it has
                no test results to fall back on. Capture is wired by the page,
                which owns the compression.
              */}
              <div className="space-y-2">
                <button
                  type="button"
                  disabled={(o.photos?.length ?? 0) >= MAX_PHOTOS_PER_OBSERVATION}
                  onClick={() => {
                    targetObs.current = o.id;
                    fileRef.current?.click();
                  }}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.16] bg-white/[0.06] text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.12] touch-manipulation active:scale-[0.98] disabled:opacity-50"
                >
                  <Camera className="h-4 w-4" />
                  {(o.photos?.length ?? 0) >= MAX_PHOTOS_PER_OBSERVATION
                    ? `${MAX_PHOTOS_PER_OBSERVATION} photos — limit reached`
                    : o.photos?.length
                      ? `${o.photos.length} photo${o.photos.length === 1 ? '' : 's'} — add another`
                      : 'Add photo'}
                </button>

                {!!o.photos?.length && (
                  <div className="flex flex-wrap gap-2">
                    {o.photos.map((src, i) => (
                      <div key={i} className="relative">
                        <img
                          src={src}
                          alt={`Observation ${idx + 1} photo ${i + 1}`}
                          className="h-16 w-16 rounded-lg border border-white/[0.14] object-cover"
                        />
                        {/*
                          ⚠️ The HIT AREA is 44px, the visible badge is not.
                          It was a 24px button, well under the 44px minimum —
                          and a miss-tap next to a 64px thumbnail deletes
                          evidence. The outer button is a transparent 44px
                          square; the inner span is what you actually see.
                        */}
                        <button
                          type="button"
                          onClick={() => removePhoto(o.id, i)}
                          aria-label={`Remove photo ${i + 1}`}
                          className="absolute -right-3.5 -top-3.5 flex h-11 w-11 items-center justify-center touch-manipulation"
                        >
                          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.2] bg-black/85 text-white">
                            <X className="h-3.5 w-3.5" />
                          </span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </FormCard>

      {/* `capture` opens the camera directly on a phone rather than the gallery. */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        capture="environment"
        multiple
        onChange={onPickPhotos}
        className="hidden"
      />
    </div>
  );
}
