/**
 * AttemptHistory — every time a piece of evidence was sent, and what the
 * assessor decided each time, oldest first (batch 2, 10 Oct 2026). Earlier
 * attempts stay visible, read only: a decision is never edited, a newer one
 * replaces it. Used on the learner's evidence card and the assessor's
 * decision sheet.
 */
import { cn } from '@/lib/utils';
import { COUNTERSIGN_PENDING_LABEL } from '@/hooks/portfolio/usePortfolioAcState';
import { useEvidenceAttempts, type DecisionGroup } from '@/hooks/portfolio/useEvidenceAttempts';

const WORD: Record<DecisionGroup['decision'], string> = {
  passed: 'Passed',
  referred: 'Needs more',
  not_yet: 'Not yet',
};

const day = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });

export function AttemptHistory({
  learnerId,
  itemId,
  audience,
  className,
  /** Show even a single attempt (the staff sheet); the learner card shows it once there is history. */
  showSingle = false,
}: {
  learnerId: string | null | undefined;
  itemId: string | null | undefined;
  audience: 'learner' | 'staff';
  className?: string;
  showSingle?: boolean;
}) {
  const { attempts, hasHistory } = useEvidenceAttempts(learnerId, itemId);
  if (attempts.length === 0) return null;
  if (!hasHistory && !showSingle) return null;
  const you = audience === 'learner';
  return (
    <section data-testid="attempt-history" className={className}>
      <h3 className="text-[13px] font-semibold text-white">
        {attempts.length === 1 ? 'Assessment' : `${attempts.length} attempts`}
      </h3>
      <p className="mt-0.5 text-[12.5px] text-white">
        {attempts.length > 1
          ? `Earlier attempts stay as they were assessed. ${you ? 'Your assessor' : 'The assessor'} sees the same history.`
          : 'Each time this is sent, the decision on it is kept here.'}
      </p>
      <ol className="mt-3 space-y-4 border-l border-white/[0.14] pl-4">
        {attempts.map((a) => (
          <li key={a.n} className="relative">
            <span
              aria-hidden
              className={cn(
                'absolute -left-[21px] top-1.5 h-2 w-2 rounded-full',
                a.current ? 'bg-white' : 'bg-white/[0.4]'
              )}
            />
            <p className="text-[13.5px] font-semibold text-white">
              Attempt {a.n}
              {a.sentAt ? `, sent ${day(a.sentAt)}` : ''}
              {a.current && attempts.length > 1 ? ' (current)' : ''}
            </p>
            {!a.current && <p className="text-[12px] text-white">Read only</p>}
            {a.decisions.length === 0 ? (
              <p className="mt-1 text-[13px] text-white">
                {a.current ? 'Waiting for a decision.' : 'No decision recorded on this attempt.'}
              </p>
            ) : (
              <ul className="mt-1.5 space-y-2.5">
                {a.decisions.map((g) => (
                  <li key={g.key}>
                    <p className="text-[13px] text-white">
                      <span
                        className={cn(
                          'font-semibold',
                          g.decision === 'passed' && !g.countersignPending && 'text-emerald-300',
                          g.decision !== 'passed' && 'text-orange-300'
                        )}
                      >
                        {g.decision === 'passed' && g.countersignPending
                          ? COUNTERSIGN_PENDING_LABEL
                          : WORD[g.decision]}
                      </span>{' '}
                      · {g.criteria.slice(0, 4).join(', ')}
                      {g.criteria.length > 4 ? ` and ${g.criteria.length - 4} more` : ''}
                    </p>
                    {g.feedback && (
                      <p className="mt-0.5 whitespace-pre-line text-[13px] leading-snug text-white">
                        “{g.feedback}”
                      </p>
                    )}
                    <p className="mt-0.5 text-[12px] text-white">
                      {g.assessor_name ?? 'Assessor'} · {day(g.at)}
                      {g.countersignedBy ? ` · countersigned by ${g.countersignedBy}` : ''}
                      {g.replaced ? ' · replaced by a later decision' : ''}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
