import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TimeSession } from '@/hooks/useTimeTracker';

interface SessionRowProps {
  session: TimeSession;
  value: number;
  projectTitle: string | null;
  /** Long enough to look like a timer someone forgot to stop. */
  flagged: boolean;
  selectMode: boolean;
  selected: boolean;
  onTap: () => void;
  formatDuration: (seconds: number) => string;
  formatCurrency: (amount: number) => string;
  formatSessionDate: (iso: string) => string;
}

const SessionRow = ({
  session,
  value,
  projectTitle,
  flagged,
  selectMode,
  selected,
  onTap,
  formatDuration,
  formatCurrency,
  formatSessionDate,
}: SessionRowProps) => {
  const invoiced = !!session.invoice_id;
  const selectable = !invoiced;

  /**
   * Starting a timer from a job card copies the job title into the label, so
   * both lines would render the same truncated string and the project name
   * would push the billing status off the end — hiding the one thing this list
   * exists to show. Only name the job when it adds something.
   */
  const showProject =
    projectTitle &&
    session.label &&
    projectTitle.trim().toLowerCase() !== session.label.trim().toLowerCase();

  return (
    <button
      type="button"
      onClick={onTap}
      className={cn(
        'flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation sm:px-5',
        selectMode && !selectable ? 'opacity-40' : 'hover:bg-white/[0.04] active:bg-white/[0.06]',
        selected && 'bg-elec-yellow/[0.08]'
      )}
    >
      {selectMode ? (
        <span
          aria-hidden
          className={cn(
            'flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-colors',
            !selectable
              ? 'border border-white/10 bg-white/[0.04]'
              : selected
                ? 'border border-elec-yellow bg-elec-yellow'
                : 'border-2 border-white/30 bg-transparent'
          )}
        >
          {selected && selectable && <Check className="h-3.5 w-3.5 text-black" strokeWidth={3} />}
        </span>
      ) : (
        /* A bar, not a dot: it reads as a block of time and gives the status
           somewhere to be seen at a glance down the list. */
        <span
          aria-hidden
          className={cn(
            'h-8 w-[3px] shrink-0 rounded-full',
            invoiced ? 'bg-white/25' : flagged ? 'bg-orange-400' : 'bg-elec-yellow'
          )}
        />
      )}

      <span className="min-w-0 flex-1">
        <span className="block truncate text-[14px] font-semibold leading-snug tracking-tight text-white">
          {session.label || projectTitle || 'Untitled session'}
        </span>
        <span className="mt-0.5 block truncate text-[12px] leading-snug text-white">
          {formatSessionDate(session.started_at)}
          {showProject ? ` · ${projectTitle}` : ''}
          {' · '}
          {invoiced ? 'Invoiced' : 'Awaiting invoice'}
        </span>
      </span>

      <span className="shrink-0 text-right">
        <span
          className={cn(
            'block text-[13px] font-semibold leading-tight tabular-nums',
            flagged ? 'text-orange-300' : 'text-white'
          )}
        >
          {formatDuration(session.duration_seconds ?? 0)}
        </span>
        <span className="block text-[12px] leading-tight text-elec-yellow tabular-nums">
          {formatCurrency(value)}
        </span>
      </span>

      {!selectMode && <ChevronRight className="h-4 w-4 shrink-0 text-elec-yellow" />}
    </button>
  );
};

export default SessionRow;
