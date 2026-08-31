import { ChevronDown, FolderOpen, Loader2, Play, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cardCn } from '@/components/shared/surfaceStyles';
import { inputCn, labelCn } from '@/components/forms/fieldStyles';

interface StartSessionCardProps {
  jobLabel: string;
  onJobLabelChange: (v: string) => void;
  projectTitle: string | null;
  onOpenProjectPicker: () => void;
  onClearProject: () => void;
  onStart: () => void;
  isStarting: boolean;
  /** Label of the last session, offered as a one-tap repeat. */
  lastLabel?: string | null;
  onRepeatLast?: () => void;
}

/**
 * Starting a session.
 *
 * The description field is optional and, on live data, skipped 39% of the time —
 * seventeen of forty-four sessions are "Untitled session", which is no use at
 * all when it comes to putting the time on an invoice weeks later. It is still
 * not compulsory (an electrician arriving on site should be able to start a
 * timer in one tap), but the last session's description is offered as a
 * one-tap repeat, since the same job usually spans several visits.
 */
const StartSessionCard = ({
  jobLabel,
  onJobLabelChange,
  projectTitle,
  onOpenProjectPicker,
  onClearProject,
  onStart,
  isStarting,
  lastLabel,
  onRepeatLast,
}: StartSessionCardProps) => (
  <div className={cn(cardCn, 'p-4 sm:p-5')}>
    <label className={labelCn} htmlFor="tt-label">
      What is the job?
    </label>
    <input
      id="tt-label"
      value={jobLabel}
      onChange={(e) => onJobLabelChange(e.target.value)}
      placeholder="Consumer unit swap — Mrs Hughes"
      className={inputCn}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onStart();
      }}
    />

    {!jobLabel && lastLabel && onRepeatLast && (
      <button
        type="button"
        onClick={onRepeatLast}
        className="mt-2 max-w-full truncate rounded-full border border-white/[0.12] bg-white/[0.06] px-3 py-1.5 text-[12px] font-medium text-white touch-manipulation active:scale-[0.97]"
      >
        Again: {lastLabel}
      </button>
    )}

    <div className="mt-4 flex items-center gap-2">
      <div className="flex min-w-0 flex-1 items-center rounded-xl border border-white/[0.12] bg-white/[0.05]">
        <button
          type="button"
          onClick={onOpenProjectPicker}
          className="flex h-11 min-w-0 flex-1 items-center gap-2 px-3 text-left touch-manipulation"
        >
          <FolderOpen
            className={cn('h-4 w-4 shrink-0', projectTitle ? 'text-elec-yellow' : 'text-white')}
          />
          <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-white">
            {projectTitle ?? 'Tag a job'}
          </span>
          {!projectTitle && <ChevronDown className="h-3.5 w-3.5 shrink-0 text-white" />}
        </button>
        {/* Clear is its own button beside the picker — nested inside it, the tap
            target belonged to the parent and clearing was a coin toss. */}
        {projectTitle && (
          <button
            type="button"
            aria-label="Clear job"
            onClick={onClearProject}
            className="flex h-11 w-10 shrink-0 items-center justify-center text-white touch-manipulation"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onStart}
        disabled={isStarting}
        className="flex h-11 shrink-0 items-center gap-2 rounded-xl bg-elec-yellow px-5 text-[15px] font-semibold text-black transition-colors touch-manipulation active:scale-[0.98] disabled:bg-white/[0.08] disabled:text-white/70"
      >
        {isStarting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Play className="h-4 w-4 fill-black" />
        )}
        {isStarting ? 'Starting…' : 'Start'}
      </button>
    </div>
  </div>
);

export default StartSessionCard;
