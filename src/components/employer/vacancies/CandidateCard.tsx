import { cn } from '@/lib/utils';
import {
  panel,
  Initials,
  StatusPill,
  rowBtn,
  rowBtnPrimary,
  rowBtnSecondary,
} from '@/components/employer/pageParts/PageParts';
import { stagePillTone } from '@/components/employer/vacancies/PipelineStrip';
import type { VacancyApplication } from '@/services/vacancyService';
import { ecsCardPhrase } from '@/data/uk-electrician-constants';

/**
 * Interview bookings were historically stored only as a structured line in
 * the application's notes column ("Interview booked: …"). Returns the most
 * recent booking line, or null — the fallback for legacy rows that predate
 * the first-class interview_* columns.
 */
export function parseInterviewNote(notes: string | null | undefined): string | null {
  if (!notes) return null;
  const matches = notes.match(/^Interview booked:.*$/gm);
  if (!matches || matches.length === 0) return null;
  return matches[matches.length - 1].replace(/^Interview booked:\s*/, '').trim() || null;
}

/**
 * Human summary of the booked interview. Reads the first-class
 * interview_at/interview_type/interview_location columns preferentially;
 * falls back to parsing the notes line for legacy rows.
 */
export function interviewSummary(
  app: Pick<VacancyApplication, 'interview_at' | 'interview_type' | 'interview_location' | 'notes'>
): string | null {
  if (app.interview_at) {
    const at = new Date(app.interview_at);
    if (!Number.isNaN(at.getTime())) {
      const date = at.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      const time = at.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
      return [`${date}, ${time}`, app.interview_type, app.interview_location]
        .filter(Boolean)
        .join(' · ');
    }
  }
  return parseInterviewNote(app.notes);
}

/** Honest recency from updated_at — the only stage timestamp the schema has.
 *  updated_at also moves on notes edits, so this is "last activity", never
 *  "days in stage". */
export function lastActivityLabel(iso: string): string {
  const days = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000));
  if (days === 0) return 'today';
  if (days === 1) return 'yesterday';
  return `${days}d ago`;
}

function formatShortDate(value: string) {
  return new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

interface CandidateCardProps {
  app: VacancyApplication;
  vacancyTitle: string;
  selectionMode?: boolean;
  isSelected?: boolean;
  onToggleSelect?: () => void;
  onOpen: () => void;
  /** Label for the one-tap move-to-next-stage action; null hides it. */
  advanceLabel?: string | null;
  onAdvance?: () => void;
  onReject?: () => void;
  onReinstate?: () => void;
  actionPending?: boolean;
}

/**
 * Decision-dense candidate card: everything an employer scanning 20 applicants
 * needs at a glance, with advance-stage as the primary action and reject
 * separated as a destructive one.
 */
export function CandidateCard({
  app,
  vacancyTitle,
  selectionMode,
  isSelected,
  onToggleSelect,
  onOpen,
  advanceLabel,
  onAdvance,
  onReject,
  onReinstate,
  actionPending,
}: CandidateCardProps) {
  const tier = app.elec_id_profile?.verification_tier;
  const ecs = app.elec_id_profile?.ecs_card_type;
  const interview = app.status === 'Interviewed' ? interviewSummary(app) : null;
  const facts = [
    tier ? `${tier.charAt(0).toUpperCase()}${tier.slice(1)} Elec-ID` : null,
    ecs ? ecsCardPhrase(ecs) : null,
    app.cv_url ? 'CV attached' : null,
    `last activity ${lastActivityLabel(app.updated_at)}`,
  ].filter(Boolean);

  const stop = (e: React.MouseEvent, fn?: () => void) => {
    e.stopPropagation();
    fn?.();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={selectionMode ? onToggleSelect : onOpen}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          (selectionMode ? onToggleSelect : onOpen)?.();
        }
      }}
      className={cn(
        panel,
        'cursor-pointer overflow-hidden text-left transition-colors touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
        selectionMode && isSelected ? 'sm:border-elec-yellow' : 'hover:bg-white/[0.04]'
      )}
    >
      <div className="flex items-center gap-3 px-4 py-3 sm:px-5">
        <Initials name={app.applicant_name} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-semibold leading-snug text-white">
            {app.applicant_name}
          </p>
          <p className="mt-0.5 truncate text-[13px] text-white">
            {vacancyTitle} · applied {formatShortDate(app.applied_at)}
          </p>
          <p className="mt-0.5 truncate text-[12.5px] text-white">{facts.join(' · ')}</p>
          {interview && (
            <p className="mt-0.5 truncate text-[12.5px] font-semibold text-white">
              Interview {interview}
            </p>
          )}
        </div>
        {selectionMode ? (
          <span
            aria-hidden
            className={cn(
              'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[12px] font-semibold',
              isSelected
                ? 'border-elec-yellow bg-elec-yellow text-black'
                : 'border-white/[0.3] bg-transparent text-white'
            )}
          >
            {isSelected ? '✓' : ''}
          </span>
        ) : (
          <StatusPill tone={stagePillTone[app.status] ?? 'neutral'}>{app.status}</StatusPill>
        )}
      </div>

      {!selectionMode && (advanceLabel || onReject || onReinstate) && (
        <div className="flex items-center gap-2 border-t border-white/[0.07] px-4 py-3 sm:px-5">
          {onReject && (
            <button
              type="button"
              onClick={(e) => stop(e, onReject)}
              disabled={actionPending}
              className={cn(rowBtn, 'border border-red-500/40 text-red-400 hover:bg-red-500/10')}
            >
              Reject
            </button>
          )}
          <div className="ml-auto flex items-center gap-2">
            {onReinstate && (
              <button
                type="button"
                onClick={(e) => stop(e, onReinstate)}
                disabled={actionPending}
                className={rowBtnSecondary}
              >
                Reinstate
              </button>
            )}
            {advanceLabel && onAdvance && (
              <button
                type="button"
                onClick={(e) => stop(e, onAdvance)}
                disabled={actionPending}
                className={rowBtnPrimary}
              >
                {advanceLabel}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
