import { CalendarClock, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Avatar,
  DestructiveButton,
  Pill,
  PrimaryButton,
  SecondaryButton,
  type Tone,
} from '@/components/employer/editorial';
import { stageTone } from '@/components/employer/vacancies/PipelineStrip';
import type { VacancyApplication } from '@/services/vacancyService';

const tierTone: Record<string, Tone> = {
  basic: 'blue',
  verified: 'cyan',
  premium: 'yellow',
};

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

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
      const date = at.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
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
  const tone = stageTone[app.status] ?? 'blue';

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
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          (selectionMode ? onToggleSelect : onOpen)?.();
        }
      }}
      className={cn(
        'group bg-[hsl(0_0%_12%)] border rounded-2xl overflow-hidden text-left cursor-pointer transition-colors touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
        selectionMode && isSelected
          ? 'border-elec-yellow/50 bg-elec-yellow/[0.04]'
          : 'border-white/[0.06] hover:bg-[hsl(0_0%_14%)]'
      )}
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <Avatar initials={getInitials(app.applicant_name)} size="md" />
          <div className="flex-1 min-w-0">
            <div className="text-[14.5px] font-semibold text-white truncate">
              {app.applicant_name}
            </div>
            <div className="mt-0.5 text-[11.5px] text-white/55 truncate">
              {vacancyTitle} · Applied {formatShortDate(app.applied_at)}
            </div>
          </div>
          {selectionMode ? (
            <span
              aria-hidden
              className={cn(
                'h-7 w-7 rounded-full border flex items-center justify-center text-[12px] font-semibold shrink-0',
                isSelected
                  ? 'bg-elec-yellow text-black border-elec-yellow'
                  : 'bg-transparent text-white border-white/[0.2]'
              )}
            >
              {isSelected ? '✓' : ''}
            </span>
          ) : (
            <Pill tone={tone} className="shrink-0">
              {app.status}
            </Pill>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {tier && <Pill tone={tierTone[tier] ?? 'blue'}>{tier}</Pill>}
          {ecs && <Pill tone="blue">{ecs}</Pill>}
          {app.cv_url && (
            <Pill tone="cyan" className="inline-flex items-center gap-1">
              <FileText className="h-3 w-3" aria-hidden />
              CV
            </Pill>
          )}
          {interview && (
            <Pill tone="purple" className="inline-flex items-center gap-1">
              <CalendarClock className="h-3 w-3" aria-hidden />
              {interview}
            </Pill>
          )}
          <span className="ml-auto text-[11px] text-white/45 whitespace-nowrap">
            Last activity {lastActivityLabel(app.updated_at)}
          </span>
        </div>
      </div>

      {!selectionMode && (advanceLabel || onReject || onReinstate) && (
        <div className="border-t border-white/[0.06] px-4 sm:px-5 py-3 flex items-center gap-2">
          {onReject && (
            <DestructiveButton
              onClick={(e) => stop(e, onReject)}
              disabled={actionPending}
            >
              Reject
            </DestructiveButton>
          )}
          <div className="ml-auto flex items-center gap-2">
            {onReinstate && (
              <SecondaryButton
                onClick={(e) => stop(e, onReinstate)}
                disabled={actionPending}
              >
                Reinstate
              </SecondaryButton>
            )}
            {advanceLabel && onAdvance && (
              <PrimaryButton
                onClick={(e) => stop(e, onAdvance)}
                disabled={actionPending}
              >
                {advanceLabel}
              </PrimaryButton>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
