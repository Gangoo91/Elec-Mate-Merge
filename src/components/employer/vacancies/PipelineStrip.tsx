import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toneText, type Tone } from '@/components/employer/editorial';

/**
 * Hiring pipeline stage vocabulary — mirrors the live CHECK constraint on
 * employer_vacancy_applications.status exactly (verified 2026-07-20):
 * New / Reviewing / Shortlisted / Interviewed / Offered / Hired / Rejected.
 */
export type PipelineStage =
  | 'New'
  | 'Reviewing'
  | 'Shortlisted'
  | 'Interviewed'
  | 'Offered'
  | 'Hired'
  | 'Rejected';

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

interface StageTileProps {
  label: string;
  count: number;
  tone?: Tone;
  isActive: boolean;
  onClick: () => void;
  muted?: boolean;
}

function StageTile({ label, count, tone, isActive, onClick, muted }: StageTileProps) {
  return (
    <button
      onClick={onClick}
      aria-pressed={isActive}
      className={cn(
        'flex flex-col items-start justify-center rounded-xl px-3.5 py-2.5 min-w-[84px] min-h-[56px] text-left transition-colors touch-manipulation border focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
        isActive
          ? 'bg-elec-yellow/[0.10] border-elec-yellow/40'
          : 'border-transparent hover:bg-white/[0.04]'
      )}
    >
      <span
        className={cn(
          'text-[20px] font-semibold tabular-nums leading-none',
          muted && !isActive && count === 0
            ? 'text-white/35'
            : tone
              ? toneText[tone]
              : 'text-white'
        )}
      >
        {count}
      </span>
      <span
        className={cn(
          'mt-1.5 text-[10px] font-medium uppercase tracking-[0.14em] whitespace-nowrap',
          isActive ? 'text-white' : 'text-white/55'
        )}
      >
        {label}
      </span>
    </button>
  );
}

interface PipelineStripProps {
  counts: Record<PipelineStage, number>;
  total: number;
  active: 'all' | PipelineStage;
  onChange: (value: 'all' | PipelineStage) => void;
}

/**
 * Horizontal hiring pipeline — one tile per stage with a live count.
 * Tap a stage to filter the candidate list to it; tap again to clear.
 * Rejected sits apart from the flow (it is an exit, not a stage).
 */
export function PipelineStrip({ counts, total, active, onChange }: PipelineStripProps) {
  return (
    <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-x-auto hide-scrollbar">
      <div className="flex items-stretch min-w-max px-2 py-2 gap-0.5">
        <StageTile
          label="All"
          count={total}
          isActive={active === 'all'}
          onClick={() => onChange('all')}
        />
        <div aria-hidden className="w-px bg-white/[0.06] self-stretch mx-1.5 my-2" />
        {PIPELINE_STAGES.map((stage, i) => (
          <div key={stage.value} className="flex items-stretch">
            {i > 0 && (
              <ChevronRight
                aria-hidden
                className="h-3.5 w-3.5 text-white/20 self-center shrink-0"
              />
            )}
            <StageTile
              label={stage.label}
              count={counts[stage.value]}
              tone={stage.tone}
              muted
              isActive={active === stage.value}
              onClick={() => onChange(active === stage.value ? 'all' : stage.value)}
            />
          </div>
        ))}
        <div aria-hidden className="w-px bg-white/[0.06] self-stretch mx-1.5 my-2" />
        <StageTile
          label="Rejected"
          count={counts.Rejected}
          tone="red"
          muted
          isActive={active === 'Rejected'}
          onClick={() => onChange(active === 'Rejected' ? 'all' : 'Rejected')}
        />
      </div>
    </div>
  );
}
