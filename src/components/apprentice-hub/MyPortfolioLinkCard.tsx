/**
 * MyPortfolioLinkCard — the portfolio as seen from the College area
 * (/apprentice/college/activities). ELE-1892: college sections link to the one
 * portfolio home instead of repeating its own counts and its own submit flow.
 *
 * Figures come from the same read model as the home (usePortfolio): passed is
 * the progress figure, the rest are what needs doing. Submitting happens from
 * the evidence itself, where the learner signs the declaration (ELE-1875).
 */
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePortfolio } from '@/hooks/portfolio/usePortfolio';
import { P_BTN, P_BTN_PRIMARY, P_CARD } from './portfolio2/ui';

const PORTFOLIO_AI_PROMPT =
  "Help me write up a piece of work for my portfolio. I'll describe the job and you draft the entry against the right ACs.";

export function MyPortfolioLinkCard() {
  const navigate = useNavigate();
  const { items, headline, loading } = usePortfolio();
  const needsStep = items.filter((i) => i.next.actionable).length;
  const needsMore = items.filter((i) => i.state === 'needs_more');

  return (
    <section className={cn(P_CARD, 'space-y-4')}>
      <div>
        <h2 className="text-[17px] font-semibold tracking-tight text-white">Your portfolio</h2>
        <p className="mt-0.5 text-[13px] text-white">
          Evidence, criteria and your assessor's decisions all live in one place.
        </p>
      </div>

      {loading ? (
        <div className="h-16 animate-pulse rounded-2xl bg-white/[0.04]" />
      ) : (
        <dl className="grid grid-cols-2 gap-2">
          {[
            [headline.total ? `Passed, of ${headline.total}` : 'Passed', String(headline.passed)],
            ['With your assessor', String(headline.submitted)],
            ['Needs more', String(headline.needsMore)],
            ['Evidence', String(items.length)],
          ].map(([k, v]) => (
            <div key={k} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3">
              <dt className="text-[12px] font-medium text-white">{k}</dt>
              <dd className="mt-0.5 font-mono text-[20px] font-semibold tabular-nums text-white">{v}</dd>
            </div>
          ))}
        </dl>
      )}

      {needsMore.length > 0 && (
        <button
          type="button"
          onClick={() => navigate(`/apprentice/hub?item=${needsMore[0].id}`)}
          className="flex min-h-[48px] w-full items-center gap-3 rounded-2xl border border-orange-500/40 bg-orange-500/10 px-4 py-3 text-left touch-manipulation"
        >
          <span className="min-w-0 flex-1 text-[13.5px] text-white">
            Your assessor needs more on "{needsMore[0].title}"
            {needsMore.length > 1 ? ` and ${needsMore.length - 1} more` : ''}.
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-white" />
        </button>
      )}

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button type="button" className={cn(P_BTN_PRIMARY, 'sm:col-span-2')} onClick={() => navigate('/apprentice/hub')}>
          {needsStep > 0 ? `Open portfolio · ${needsStep} to do` : 'Open portfolio'}
        </button>
        <button
          type="button"
          className={P_BTN}
          onClick={() => window.dispatchEvent(new CustomEvent('elecmate:open-capture'))}
        >
          Add evidence
        </button>
        <button
          type="button"
          className={P_BTN}
          onClick={() => navigate(`/apprentice/college-ai?prompt=${encodeURIComponent(PORTFOLIO_AI_PROMPT)}`)}
        >
          <Sparkles className="h-4 w-4" /> Draft a write-up
        </button>
      </div>
    </section>
  );
}

export default MyPortfolioLinkCard;
