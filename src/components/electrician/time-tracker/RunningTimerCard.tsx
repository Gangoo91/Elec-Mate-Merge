import { Pencil, Square, StickyNote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cardCn, eyebrowCn, ghostButtonCn, warningPanelCn } from '@/components/shared/surfaceStyles';
import { inputCn, textareaCn } from '@/components/forms/fieldStyles';

interface RunningTimerCardProps {
  elapsedSeconds: number;
  startedAt: string;
  label: string | null;
  notes: string | null;
  hourlyRate: number;
  /** Elapsed time past which this looks like a timer someone forgot to stop. */
  runawaySeconds: number;

  editingLabel: boolean;
  editLabelValue: string;
  onEditLabelChange: (v: string) => void;
  onBeginEditLabel: () => void;
  onSaveLabel: () => void;
  onCancelEditLabel: () => void;

  showNotes: boolean;
  notesValue: string;
  onNotesChange: (v: string) => void;
  onBeginNotes: () => void;
  onSaveNotes: () => void;
  onCancelNotes: () => void;

  onStop: () => void;
  formatTime: (seconds: number) => string;
  formatStartTime: (iso: string) => string;
  formatCurrency: (amount: number) => string;
}

/**
 * The running timer.
 *
 * Two things changed beyond the paint. The elapsed clock now shows what the
 * session is worth as it runs — the number the electrician actually cares about
 * and the reason to keep the timer honest. And a session that has been running
 * past the runaway threshold says so HERE, while it is running and can still be
 * corrected, rather than only being noticed days later in the billing list.
 */
const RunningTimerCard = ({
  elapsedSeconds,
  startedAt,
  label,
  notes,
  hourlyRate,
  runawaySeconds,
  editingLabel,
  editLabelValue,
  onEditLabelChange,
  onBeginEditLabel,
  onSaveLabel,
  onCancelEditLabel,
  showNotes,
  notesValue,
  onNotesChange,
  onBeginNotes,
  onSaveNotes,
  onCancelNotes,
  onStop,
  formatTime,
  formatStartTime,
  formatCurrency,
}: RunningTimerCardProps) => {
  const runningValue = (elapsedSeconds / 3600) * hourlyRate;
  const overrunning = elapsedSeconds >= runawaySeconds;

  return (
    <div className={cn(cardCn, 'overflow-hidden')}>
      <div className="flex flex-col items-center px-4 py-6 sm:px-5">
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-elec-yellow opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-elec-yellow" />
          </span>
          <span className={eyebrowCn}>Running</span>
        </span>

        <p className="mt-3 font-mono text-[46px] font-bold leading-none tracking-tight text-white tabular-nums sm:text-[56px]">
          {formatTime(elapsedSeconds)}
        </p>

        {/* Live value — the figure this session is actually about. */}
        <p className="mt-2 text-[17px] font-bold leading-none text-elec-yellow tabular-nums">
          {formatCurrency(runningValue)}
        </p>

        <p className="mt-2 text-[12px] text-white">
          Started {formatStartTime(startedAt)} · {formatCurrency(hourlyRate)}/hr
        </p>

        {overrunning && (
          <div className={cn(warningPanelCn, 'mt-4 w-full')}>
            <p className="text-[13px] font-semibold text-orange-300">
              This has been running a long time
            </p>
            <p className="mt-0.5 text-[12px] text-white">
              Stop it and correct the times if you left it going — it goes straight into what you
              are owed.
            </p>
          </div>
        )}

        {/* Job description */}
        <div className="mt-5 w-full">
          {editingLabel ? (
            <div className="space-y-2">
              <input
                value={editLabelValue}
                onChange={(e) => onEditLabelChange(e.target.value)}
                placeholder="What is this job?"
                autoFocus
                className={inputCn}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onSaveLabel();
                  if (e.key === 'Escape') onCancelEditLabel();
                }}
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={onCancelEditLabel} className={ghostButtonCn}>
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onSaveLabel}
                  className="h-11 rounded-xl bg-elec-yellow px-4 text-[13px] font-semibold text-black touch-manipulation active:scale-[0.98]"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={onBeginEditLabel}
              className="mx-auto flex items-center gap-2 text-white touch-manipulation"
            >
              <Pencil className="h-3.5 w-3.5 text-elec-yellow" />
              <span className="text-[14px] font-medium">{label || 'Add a job description'}</span>
            </button>
          )}
        </div>

        {/* Notes */}
        <div className="mt-3 w-full">
          {showNotes ? (
            <div className="space-y-2">
              <textarea
                value={notesValue}
                onChange={(e) => onNotesChange(e.target.value)}
                placeholder="What was done, parts used, anything to remember"
                autoFocus
                className={textareaCn}
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={onCancelNotes} className={ghostButtonCn}>
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onSaveNotes}
                  className="h-11 rounded-xl bg-elec-yellow px-4 text-[13px] font-semibold text-black touch-manipulation active:scale-[0.98]"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={onBeginNotes}
              className="mx-auto flex items-center gap-2 text-white touch-manipulation"
            >
              <StickyNote className="h-3.5 w-3.5 text-elec-yellow" />
              <span className="text-[13px]">{notes ? 'Edit notes' : 'Add notes'}</span>
            </button>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onStop}
        className="flex h-14 w-full items-center justify-center gap-2 border-t border-white/[0.10] bg-red-500/15 text-[15px] font-semibold text-red-300 transition-colors hover:bg-red-500/20 touch-manipulation active:scale-[0.99]"
      >
        <Square className="h-4 w-4 fill-current" />
        Stop timer
      </button>
    </div>
  );
};

export default RunningTimerCard;
