import { Check, Loader2, ArrowUpRight, RotateCcw, X } from 'lucide-react';
import type {
  MateActionEntry,
  MateCardLine,
  MateCardLink,
} from '@/components/employer/mateActionModel';

/** The confirmation card Mate streams, and the result after the user's Confirm. */

const timeOf = (iso: string) =>
  new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

function Lines({ lines }: { lines: MateCardLine[] }) {
  if (!lines.length) return null;
  return (
    <dl className="mt-3 grid gap-x-4 gap-y-2 sm:grid-cols-[minmax(0,10rem)_1fr]">
      {lines.map((l, i) => (
        <div key={`${l.label}-${i}`} className="contents">
          <dt className="text-[12px] font-medium text-white">{l.label}</dt>
          <dd className="text-[13.5px] text-white whitespace-pre-wrap break-words -mt-1.5 sm:mt-0">
            {l.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function LinkButtons({
  links,
  onOpen,
}: {
  links: MateCardLink[];
  onOpen: (l: MateCardLink) => void;
}) {
  return (
    <>
      {links.map((l) => (
        <button
          key={`${l.section}-${l.label}`}
          type="button"
          onClick={() => onOpen(l)}
          className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-white/[0.18] px-4 text-[13px] font-medium text-white hover:border-white/[0.35] touch-manipulation"
        >
          {l.label}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      ))}
    </>
  );
}

export function MateActionCard({
  entry,
  onConfirm,
  onCancel,
  onUndo,
  onOpen,
}: {
  entry: MateActionEntry;
  onConfirm: () => void;
  onCancel: () => void;
  onUndo: () => void;
  onOpen: (l: MateCardLink) => void;
}) {
  const { confirm: c, state, result } = entry;
  const expired = state === 'pending' && new Date(c.expires_at).getTime() <= Date.now();
  const canUndo =
    !!result?.ok &&
    !!result.undo_token &&
    !result.undone?.ok &&
    !!result.undo_until &&
    new Date(result.undo_until).getTime() > Date.now();

  return (
    <div className="space-y-2" data-testid="mate-action">
      <div
        data-testid="mate-confirm-card"
        className="rounded-2xl border border-white/[0.16] bg-white/[0.05] px-4 py-3.5"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
          {state === 'done' ? 'You confirmed' : state === 'cancelled' ? 'Cancelled' : 'Check and confirm'}
        </p>
        <p className="mt-1 text-[15px] font-semibold text-white">{c.title}</p>
        <Lines lines={c.lines} />
        {c.warnings.length > 0 && (
          <ul className="mt-3 space-y-1.5">
            {c.warnings.map((w) => (
              <li
                key={w}
                className="rounded-lg border border-orange-500/40 border-l-4 border-l-orange-500 px-3 py-2 text-[13px] text-white"
              >
                {w}
              </li>
            ))}
          </ul>
        )}
        {state !== 'done' && state !== 'cancelled' && (
          <p className="mt-3 text-[12px] text-white">
            {c.undo} {expired ? 'This card has expired.' : `Confirm by ${timeOf(c.expires_at)}.`}
          </p>
        )}
        {(state === 'pending' || state === 'working') && !expired && (
          <div className="mt-3 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              disabled={state === 'working'}
              className="h-11 rounded-xl border border-white/[0.18] px-5 text-[14px] font-medium text-white hover:border-white/[0.35] disabled:opacity-50 touch-manipulation"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={state === 'working'}
              data-testid="mate-confirm-button"
              className="h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-elec-yellow px-5 text-[14px] font-semibold text-black disabled:opacity-60 touch-manipulation active:scale-[0.98]"
            >
              {state === 'working' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              {c.confirm_label || 'Confirm'}
            </button>
          </div>
        )}
      </div>

      {result && (
        <div
          data-testid="mate-result-card"
          className={`rounded-2xl border px-4 py-3.5 bg-white/[0.04] ${
            result.ok ? 'border-emerald-500/60' : 'border-red-500/60'
          }`}
        >
          <div className="flex items-start gap-2">
            {result.ok ? (
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
            ) : (
              <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
            )}
            <p className="text-[14.5px] font-semibold text-white">{result.title}</p>
          </div>
          <Lines lines={result.lines} />
          {result.undone && (
            <p className="mt-2 text-[13px] text-white">
              {result.undone.ok ? 'Undone: ' : 'Could not undo: '}
              {result.undone.title}
            </p>
          )}
          {(result.links.length > 0 || canUndo) && (
            <div className="mt-3 flex flex-wrap gap-2">
              <LinkButtons links={result.links} onOpen={onOpen} />
              {canUndo && (
                <button
                  type="button"
                  onClick={onUndo}
                  disabled={entry.undoing}
                  className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-white/[0.18] px-4 text-[13px] font-medium text-white hover:border-white/[0.35] disabled:opacity-50 touch-manipulation"
                >
                  {entry.undoing ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <RotateCcw className="h-3.5 w-3.5" />
                  )}
                  Undo (until {timeOf(result.undo_until!)})
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
