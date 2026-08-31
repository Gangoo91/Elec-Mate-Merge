import React, { useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { assessPlugInSolar } from '@/lib/plugInSolarAssessment';
import {
  toAssessmentInput,
  type PlugInSolarData,
  type RemedialItem,
  type RemedialStatus,
} from '@/types/plug-in-solar';
import {
  cardCn,
  cardFlowCn,
  ChipGroup,
  Field,
  inputCn,
  SectionHeader,
  SourceNote,
} from './PlugInSolarPrimitives';

/**
 * Tab 3 — Remedial works.
 *
 * The list is derived from the assessment rather than typed, so what the
 * electrician quotes is exactly what the findings called for. Merging is keyed
 * on findingId and preserves any status or notes already entered: going back to
 * tab 1 to correct a field must not wipe out the fact that the customer already
 * declined an item.
 *
 * Items that disappear from the assessment (because the underlying answer
 * changed) are dropped only if they are still 'required' — anything the user has
 * touched is kept, so nothing quoted or completed silently vanishes.
 */

interface Props {
  data: PlugInSolarData;
  onUpdate: <K extends keyof PlugInSolarData>(field: K, value: PlugInSolarData[K]) => void;
  /** Opens the quote builder pre-loaded with the outstanding items. */
  onCreateQuote?: () => void;
  /** How many items would actually go across — drives the button's copy. */
  quotableCount?: number;
}

const STATUS_OPTIONS: { value: RemedialStatus; label: string }[] = [
  { value: 'required', label: 'Required' },
  { value: 'quoted', label: 'Quoted' },
  { value: 'declined', label: 'Declined' },
  { value: 'complete', label: 'Complete' },
];

const mergeRemedialItems = (
  existing: RemedialItem[],
  derived: { findingId: string; description: string }[],
): RemedialItem[] => {
  const byId = new Map(existing.map((i) => [i.findingId, i]));
  const derivedIds = new Set(derived.map((d) => d.findingId));

  const merged: RemedialItem[] = derived.map((d) => {
    const prior = byId.get(d.findingId);
    return prior
      ? { ...prior, description: d.description }
      : { findingId: d.findingId, description: d.description, status: 'required' };
  });

  // Keep anything the user has already acted on, even if the finding has gone.
  for (const item of existing) {
    if (!derivedIds.has(item.findingId) && item.status !== 'required') merged.push(item);
  }
  return merged;
};

const sameItems = (a: RemedialItem[], b: RemedialItem[]): boolean =>
  a.length === b.length &&
  a.every((x, i) => x.findingId === b[i].findingId && x.description === b[i].description);

const PlugInSolarRemedialWorks: React.FC<Props> = ({
  data,
  onUpdate,
  onCreateQuote,
  quotableCount = 0,
}) => {
  const result = useMemo(() => assessPlugInSolar(toAssessmentInput(data)), [data]);

  const derived = useMemo(
    () =>
      result.findings
        .filter((f) => f.remedialWork)
        .map((f) => ({ findingId: f.id, description: f.remedialWork as string })),
    [result],
  );

  useEffect(() => {
    const merged = mergeRemedialItems(data.remedialItems, derived);
    if (!sameItems(merged, data.remedialItems)) onUpdate('remedialItems', merged);
  }, [derived, data.remedialItems, onUpdate]);

  const updateItem = (findingId: string, patch: Partial<RemedialItem>) => {
    onUpdate(
      'remedialItems',
      data.remedialItems.map((i) => (i.findingId === findingId ? { ...i, ...patch } : i)),
    );
  };

  if (data.remedialItems.length === 0) {
    return (
      <section className={cardCn}>
        <SectionHeader title="Remedial works" />
        <p className="text-[13px] leading-relaxed text-white">
          Nothing outstanding. The assessment found no work needed before a compliant device could
          be connected. If that changes on the earlier steps, the items will appear here.
        </p>
      </section>
    );
  }

  return (
    <div>
      <section className={cardCn}>
        <SectionHeader title="Remedial works" />
        <p className="text-[13px] leading-relaxed text-white">
          Taken straight from the assessment findings. Mark each one as you quote, complete or
          record the customer declining it. Work that alters the fixed installation — a new
          socket-outlet, or changing a protective device — needs its own certificate, which you
          can raise against each item.
        </p>
        {onCreateQuote && quotableCount > 0 && (
          <button
            type="button"
            onClick={onCreateQuote}
            className="h-11 w-full rounded-xl bg-elec-yellow text-[14px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.99]"
          >
            Quote this work ({quotableCount} {quotableCount === 1 ? 'item' : 'items'})
          </button>
        )}
        {onCreateQuote && quotableCount === 0 && data.remedialItems.length > 0 && (
          <p className="text-[12px] leading-snug text-white">
            Nothing left to quote — every item is either complete or was declined.
          </p>
        )}
      </section>

      <div className={cardFlowCn}>
      {data.remedialItems.map((item) => (
        <section key={item.findingId} className={cardCn}>
          <p className="text-[14px] font-semibold leading-snug text-white">{item.description}</p>

          <Field label="Status">
            <ChipGroup
              value={item.status}
              onChange={(v) => updateItem(item.findingId, { status: v })}
              options={STATUS_OPTIONS}
            />
          </Field>

          <Field
            label="Linked certificate reference"
            htmlFor={`pis-link-${item.findingId}`}
            hint="Where this work has its own Minor Works or EIC, record it so the two documents point at each other."
          >
            <Input
              id={`pis-link-${item.findingId}`}
              value={item.linkedReportId ?? ''}
              onChange={(e) =>
                updateItem(item.findingId, { linkedReportId: e.target.value || undefined })
              }
              className={inputCn}
              placeholder="e.g. MW-2026-0142"
            />
          </Field>

          <Field label="Notes" htmlFor={`pis-note-${item.findingId}`}>
            <Textarea
              id={`pis-note-${item.findingId}`}
              value={item.notes ?? ''}
              onChange={(e) => updateItem(item.findingId, { notes: e.target.value || undefined })}
              className={`${inputCn} h-auto min-h-[44px] resize-none py-2`}
              rows={2}
            />
          </Field>
        </section>
      ))}

      </div>

      <section className={`${cardCn} mt-6 sm:mt-8`}>
        <SourceNote>
          Recording a declined item matters as much as a completed one. If the customer chooses
          not to proceed, this is the record that the risk was identified and explained.
        </SourceNote>
      </section>
    </div>
  );
};

export default PlugInSolarRemedialWorks;
