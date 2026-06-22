import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PrimaryButton, Pill, inputClass, textareaClass } from '@/components/employer/editorial';
import { useQsReviewComments } from '@/hooks/useQsReviewComments';

/* ==========================================================================
   QsReviewComments — itemised comments inside a QS review. Shared by the
   employer hub, I&T bench and worker-tools surfaces. A QS leaves targeted
   notes (against a circuit / observation / the cert as a whole); the
   electrician sees them and can reply, and either side can mark them resolved.
   ========================================================================== */

export function QsReviewComments({
  reviewId,
  authorName,
  prefillTarget,
}: {
  reviewId: string;
  authorName?: string | null;
  /** Set when the user taps an item in the cert body — pre-fills the target. */
  prefillTarget?: string;
}) {
  const { comments, add, resolve } = useQsReviewComments(reviewId);
  const [body, setBody] = useState('');
  const [label, setLabel] = useState('');
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  // Tapping a circuit/observation in the cert body pre-fills the target here
  // and brings the composer into view.
  useEffect(() => {
    if (!prefillTarget) return;
    setLabel(prefillTarget);
    bodyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    bodyRef.current?.focus();
  }, [prefillTarget]);

  const openCount = comments.filter((c) => !c.resolved).length;

  const post = async () => {
    if (!body.trim()) return;
    await add.mutateAsync({
      body: body.trim(),
      target_label: label.trim() || null,
      author_name: authorName ?? null,
    });
    setBody('');
    setLabel('');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
          QS comments{comments.length > 0 ? ` (${comments.length})` : ''}
        </h3>
        {openCount > 0 && <Pill tone="orange">{openCount} open</Pill>}
      </div>

      {comments.length === 0 ? (
        <p className="text-sm text-white/50">
          No comments yet — add a note against a circuit, an observation, or the certificate as a
          whole.
        </p>
      ) : (
        <div className="space-y-2">
          {comments.map((c) => (
            <div
              key={c.id}
              className={cn(
                'rounded-xl border px-3 py-2.5',
                c.resolved
                  ? 'border-white/[0.06] bg-white/[0.02] opacity-60'
                  : 'border-white/[0.1] bg-white/[0.04]'
              )}
            >
              <div className="flex items-start justify-between gap-2.5">
                <div className="min-w-0 flex-1">
                  {c.target_label && (
                    <p className="text-[10px] uppercase tracking-[0.12em] text-yellow-400/80">
                      {c.target_label}
                    </p>
                  )}
                  <p className="text-sm text-white/90 whitespace-pre-wrap">{c.body}</p>
                  <p className="text-[11px] text-white/40 mt-1">
                    {c.author_name || 'QS'} ·{' '}
                    {new Date(c.created_at).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                    })}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => resolve.mutate({ id: c.id, resolved: !c.resolved })}
                  className="shrink-0 text-white/40 hover:text-emerald-300 touch-manipulation"
                  aria-label={c.resolved ? 'Mark unresolved' : 'Mark resolved'}
                >
                  {c.resolved ? (
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Against (optional) — e.g. Circuit 5, Observation 2"
          className={inputClass}
        />
        <textarea
          ref={bodyRef}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Add a comment…"
          rows={2}
          className={textareaClass}
        />
        <PrimaryButton onClick={post} disabled={!body.trim() || add.isPending}>
          {add.isPending ? 'Posting…' : 'Add comment'}
        </PrimaryButton>
      </div>
    </div>
  );
}

export default QsReviewComments;
