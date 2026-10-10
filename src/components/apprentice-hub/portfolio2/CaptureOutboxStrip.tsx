/**
 * CaptureOutboxStrip — the visible "Waiting to sync" queue (ELE-1894).
 *
 * Shows evidence saved on this phone that has not reached the server yet:
 * each item, how many files it holds, and whether it is waiting for signal,
 * sending now, or was refused (with the reason and Try again). Renders
 * nothing when the outbox is empty, so it can sit at the top of any screen.
 *
 * Removing a queued item is the only way anything leaves the outbox without
 * being sent, and it asks first.
 */
import { useState } from 'react';
import { CloudOff, Loader2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cardCn, buttonSecondaryCn } from '@/components/forms/fieldStyles';
import { useCaptureOutbox } from '@/hooks/portfolio/useCaptureOutbox';

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

function sizeLabel(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function CaptureOutboxStrip({ className }: { className?: string }) {
  const { items, waiting, failed, sending, online, syncNow, retry, discard } = useCaptureOutbox();
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  if (items.length === 0) return null;

  const headline = sending
    ? 'Sending to your portfolio'
    : failed > 0 && waiting === 0
      ? plural(failed, 'item') + " couldn't send"
      : 'Waiting to sync';
  const sub = !online
    ? 'Saved on this phone. It sends by itself when you have signal.'
    : sending
      ? 'Keep the app open until it finishes.'
      : 'Saved on this phone. Tap Send now, or it sends by itself shortly.';

  return (
    <section
      aria-label="Evidence waiting to sync"
      data-testid="capture-outbox"
      className={cn(cardCn, 'space-y-3', className)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[15px] font-semibold text-white">
            {sending ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin text-elec-yellow" aria-hidden />
            ) : (
              <CloudOff className="h-4 w-4 shrink-0 text-elec-yellow" aria-hidden />
            )}
            {headline}
            <span className="tabular-nums">· {items.length}</span>
          </p>
          <p className="mt-1 text-[13px] leading-snug text-white">{sub}</p>
        </div>
        <button
          type="button"
          disabled={!online || sending || busy}
          onClick={async () => {
            setBusy(true);
            try {
              await syncNow();
            } finally {
              setBusy(false);
            }
          }}
          className={cn(buttonSecondaryCn, 'h-11 shrink-0 px-4 inline-flex items-center gap-2')}
        >
          <RefreshCw className={cn('h-4 w-4', (sending || busy) && 'animate-spin')} aria-hidden />
          Send now
        </button>
      </div>

      <ul className="divide-y divide-white/[0.08] border-t border-white/[0.08]">
        {items.map((it) => {
          const bytes = it.files.reduce((n, f) => n + (f.size || 0), 0);
          const sent = it.files.filter((f) => f.storageUrl).length;
          return (
            <li key={it.id} className="py-3" data-testid="capture-outbox-item">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="line-clamp-2 break-words text-[14px] font-medium text-white">
                    {it.entry.title || 'Untitled evidence'}
                  </p>
                  <p className="mt-0.5 text-[12px] tabular-nums text-white">
                    {it.files.length > 0
                      ? `${plural(it.files.length, 'file')} · ${sizeLabel(bytes)}${sent > 0 && sent < it.files.length ? ` · ${sent} sent` : ''}`
                      : 'No files'}
                    {it.otj ? ` · ${it.otj.duration_minutes} min off-the-job` : ''}
                  </p>
                </div>
                <span
                  className={cn(
                    'shrink-0 rounded-full border px-2.5 py-1 text-[12px] font-medium',
                    it.state === 'failed'
                      ? 'border-orange-400/50 text-orange-300'
                      : 'border-white/[0.18] text-white'
                  )}
                >
                  {it.state === 'syncing'
                    ? 'Sending'
                    : it.state === 'failed'
                      ? "Couldn't send"
                      : 'Waiting'}
                </span>
              </div>
              {it.state === 'failed' && (
                <div className="mt-2 space-y-2">
                  {it.lastError && (
                    <p className="text-[12px] leading-snug text-orange-300">{it.lastError}</p>
                  )}
                  {confirmId === it.id ? (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setConfirmId(null)}
                        className={cn(buttonSecondaryCn, 'h-11')}
                      >
                        Keep it
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setConfirmId(null);
                          void discard(it.id);
                        }}
                        className="h-11 rounded-xl border border-red-500/40 text-[14px] font-medium text-red-300 touch-manipulation"
                      >
                        Remove for good
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        disabled={!online}
                        onClick={() => void retry(it.id)}
                        className={cn(buttonSecondaryCn, 'h-11')}
                      >
                        Try again
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmId(it.id)}
                        className={cn(buttonSecondaryCn, 'h-11')}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default CaptureOutboxStrip;
