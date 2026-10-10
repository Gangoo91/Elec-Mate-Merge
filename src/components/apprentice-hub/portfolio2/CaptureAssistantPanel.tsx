/**
 * CaptureAssistantPanel — the on-site capture assistant (ELE-1927).
 *
 * Shows the assistant's four suggestions inside the capture sheet. It never
 * claims anything: criteria are "Suggested" until the learner taps one, the
 * reflective account is a draft until they tap "Use this draft", the test
 * sheet is a question, and the next job is advice. Marked with UsesAi.
 */
import { Check, ClipboardList, Loader2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonSecondaryCn, cardCn } from '@/components/forms/fieldStyles';
import { UsesAi } from '@/components/college/ui/UsesAi';
import type { CaptureAssist } from '@/hooks/portfolio/useCaptureAssistant';

interface Props {
  assist: CaptureAssist | null;
  loading: boolean;
  error: string | null;
  /** Claimed refs, "UNIT AC x.y". */
  selected: string[];
  onToggle: (ref: string) => void;
  /** The text currently in the reflection field. */
  reflectionText: string;
  onUseReflection: (text: string) => void;
  onAddTestSheet: () => void;
  onRetry: () => void;
}

const refOf = (u: string, a: string) => `${u} AC ${a}`;

export function CaptureAssistantPanel({
  assist,
  loading,
  error,
  selected,
  onToggle,
  reflectionText,
  onUseReflection,
  onAddTestSheet,
  onRetry,
}: Props) {
  if (!assist && !loading && !error) return null;

  return (
    <section
      aria-label="On-site assistant"
      data-testid="capture-assistant"
      className={cn(cardCn, 'space-y-5')}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-[15px] font-semibold text-white">
          On-site assistant <UsesAi />
        </h3>
        {loading ? (
          <span className="inline-flex items-center gap-2 text-[13px] text-white">
            <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" aria-hidden />
            Reading your capture
          </span>
        ) : (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.14] px-3.5 text-[13px] font-medium text-white touch-manipulation"
          >
            <RefreshCw className="h-4 w-4" aria-hidden />
            Ask again
          </button>
        )}
      </div>

      {error && !loading && (
        <p className="text-[13px] leading-snug text-orange-300">
          The assistant could not run just now. Your capture is fine; you can save it without
          suggestions.
        </p>
      )}

      {assist && (
        <>
          {/* 1. Suggested criteria: chips the learner taps to claim */}
          {assist.criteria.length > 0 && (
            <div className="space-y-2">
              <p className="text-[13px] font-semibold text-white">Criteria this could show</p>
              <p className="text-[12px] leading-snug text-white">
                Suggested only. Tap the ones this really shows to claim them; your assessor decides.
              </p>
              <ul className="grid gap-2 lg:grid-cols-2">
                {assist.criteria.map((c) => {
                  const ref = refOf(c.unit_code, c.ac_code);
                  const on = selected.includes(ref);
                  return (
                    <li key={ref}>
                      <button
                        type="button"
                        aria-pressed={on}
                        data-testid="assist-criterion"
                        onClick={() => onToggle(ref)}
                        className={cn(
                          'flex h-full min-h-11 w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left touch-manipulation transition-colors',
                          on ? 'border-elec-yellow' : 'border-white/[0.14]'
                        )}
                      >
                        <span
                          className={cn(
                            'mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2',
                            on ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/40'
                          )}
                        >
                          {on && <Check className="h-3 w-3" aria-hidden />}
                        </span>
                        <span className="min-w-0 flex-1 space-y-0.5">
                          <span className="flex flex-wrap items-baseline gap-2">
                            <span className="font-mono text-[12px] text-elec-yellow">
                              {c.unit_code} AC {c.ac_code}
                            </span>
                            <span className="text-[13px] font-medium text-white">
                              {on ? 'Claimed by you' : 'Suggested'}
                            </span>
                          </span>
                          <span
                            className="block text-[13px] leading-snug text-white line-clamp-3"
                            title={c.ac_text}
                          >
                            {c.ac_text}
                          </span>
                          {c.reason && (
                            <span className="block text-[12px] leading-snug text-white">
                              {c.reason}
                            </span>
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* 2. Test sheet: asked for when a board is in the photo */}
          {assist.testSheet.needed && (
            <div
              data-testid="assist-test-sheet"
              className="space-y-3 rounded-xl border border-white/[0.14] px-3.5 py-3"
            >
              <p className="flex items-start gap-2 text-[13px] leading-snug text-white">
                <ClipboardList className="mt-0.5 h-4 w-4 shrink-0 text-elec-yellow" aria-hidden />
                <span>
                  <span className="block font-semibold">Missing the test sheet?</span>
                  {assist.testSheet.ask}
                </span>
              </p>
              <button
                type="button"
                onClick={onAddTestSheet}
                className={cn(buttonSecondaryCn, 'h-11 w-full sm:w-auto sm:px-5')}
              >
                Add test results
              </button>
            </div>
          )}

          {/* 3. Reflective account: a draft in the learner's words */}
          {assist.reflection && (
            <div className="space-y-2" data-testid="assist-reflection">
              <p className="text-[13px] font-semibold text-white">
                Your reflective account, drafted from your notes
              </p>
              <p className="whitespace-pre-line rounded-xl border border-white/[0.14] px-3.5 py-3 text-[13px] leading-relaxed text-white">
                {assist.reflection}
              </p>
              {reflectionText.trim() === assist.reflection.trim() ? (
                <p className="flex items-center gap-1.5 text-[13px] font-medium text-white">
                  <Check className="h-4 w-4 text-elec-yellow" aria-hidden />
                  In your reflection below. Change anything that is not how you would say it.
                </p>
              ) : (
                <button
                  type="button"
                  onClick={() => onUseReflection(assist.reflection)}
                  className={cn(buttonSecondaryCn, 'h-11 w-full sm:w-auto sm:px-5')}
                >
                  {reflectionText.trim()
                    ? 'Replace my reflection with this draft'
                    : 'Use this draft'}
                </button>
              )}
            </div>
          )}

          {/* 4. The one job that closes the most gaps */}
          {assist.nextJob && (
            <div
              className="space-y-2 border-t border-white/[0.1] pt-4"
              data-testid="assist-next-job"
            >
              <p className="text-[13px] font-semibold text-white">
                The job that closes the most gaps
              </p>
              <p className="text-[14px] font-medium leading-snug text-white">
                {assist.nextJob.title} covers {assist.nextJob.covers.length} of your{' '}
                {assist.openGaps} open criteria.
              </p>
              {assist.nextJob.why && (
                <p className="text-[13px] leading-snug text-white">{assist.nextJob.why}</p>
              )}
              <div className="flex flex-wrap gap-1.5">
                {assist.nextJob.covers.map((c) => (
                  <span
                    key={`${c.unit_code}|${c.ac_code}`}
                    title={c.ac_text}
                    className="rounded-full border border-white/[0.18] px-2.5 py-1 font-mono text-[12px] text-white"
                  >
                    {c.unit_code} AC {c.ac_code}
                  </span>
                ))}
              </div>
            </div>
          )}

          {assist.regs.length > 0 && (
            <p className="text-[12px] leading-snug text-white">
              Checked against BS 7671:{' '}
              {assist.regs
                .slice(0, 4)
                .map((r) => r.reg)
                .join(', ')}
            </p>
          )}
          <UsesAi variant="note" />
        </>
      )}
    </section>
  );
}

export default CaptureAssistantPanel;
