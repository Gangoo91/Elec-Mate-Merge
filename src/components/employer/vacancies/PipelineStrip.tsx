import { type Tone } from '@/components/employer/editorial';
import { Segments, type PillTone } from '@/components/employer/pageParts/PageParts';

/**
 * Hiring pipeline stage vocabulary — mirrors the live CHECK constraint on
 * employer_vacancy_applications.status exactly (verified 2026-07-20):
 * New / Reviewing / Shortlisted / Interviewed / Offered / Hired / Rejected.
 */
export type PipelineStage =
  'New' | 'Reviewing' | 'Shortlisted' | 'Interviewed' | 'Offered' | 'Hired' | 'Rejected';

export const PIPELINE_STAGES: { value: PipelineStage; label: string; tone: Tone }[] = [
  { value: 'New', label: 'New', tone: 'cyan' },
  { value: 'Reviewing', label: 'Reviewing', tone: 'blue' },
  { value: 'Shortlisted', label: 'Shortlisted', tone: 'yellow' },
  { value: 'Interviewed', label: 'Interview', tone: 'purple' },
  { value: 'Offered', label: 'Offer', tone: 'amber' },
  { value: 'Hired', label: 'Hired', tone: 'emerald' },
];

/** Single source for stage → tone so cards, pills and the strip never drift. */
export const stageTone: Record<string, Tone> = {
  New: 'cyan',
  Reviewing: 'blue',
  Shortlisted: 'yellow',
  Interviewed: 'purple',
  Offered: 'amber',
  Hired: 'emerald',
  Rejected: 'red',
};

/** One status pill per row: volt for "look at this now", red for an exit,
 *  emerald for done. Everything in between is plain. */
export const stagePillTone: Record<string, PillTone> = {
  New: 'volt',
  Reviewing: 'neutral',
  Shortlisted: 'neutral',
  Interviewed: 'neutral',
  Offered: 'neutral',
  Hired: 'green',
  Rejected: 'red',
};

interface PipelineStripProps {
  counts: Record<PipelineStage, number>;
  total: number;
  active: 'all' | PipelineStage;
  onChange: (value: 'all' | PipelineStage) => void;
}

/**
 * The hiring pipeline as filter chips with live counts. They wrap on a phone
 * rather than scroll sideways. Tap a stage to filter the candidate list; tap
 * it again to clear. Rejected sits last (an exit, not a stage). Quiet (white
 * when picked): a filter is not the page's one yellow action.
 */
export function PipelineStrip({ counts, total, active, onChange }: PipelineStripProps) {
  const items: { value: 'all' | PipelineStage; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: total },
    ...PIPELINE_STAGES.map((s) => ({ value: s.value, label: s.label, count: counts[s.value] })),
    { value: 'Rejected', label: 'Rejected', count: counts.Rejected },
  ];
  return (
    <Segments
      wrap
      quiet
      items={items}
      value={active}
      onChange={(v) => onChange(v !== 'all' && v === active ? 'all' : v)}
    />
  );
}
