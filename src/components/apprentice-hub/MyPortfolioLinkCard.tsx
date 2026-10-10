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
import { ChevronRight, PenLine } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePortfolio } from '@/hooks/portfolio/usePortfolio';
import { P_BTN } from './portfolio2/ui';
import { LC_CARD } from '@/components/apprentice-hub/college-hub/learnerUi';

const PORTFOLIO_AI_PROMPT =
  "Help me write up a piece of work for my portfolio. I'll describe the job and you draft the entry against the right criteria.";

export function MyPortfolioLinkCard() {
  const navigate = useNavigate();
  const { items, headline, loading } = usePortfolio();
  const needsStep = items.filter((i) => i.next.actionable).length;
  const needsMore = items.filter((i) => i.state === 'needs_more');

  return (
    <section className={cn(LC_CARD, 'space-y-4')}>
      <div>
        <h3 className="text-[15px] font-semibold tracking-tight text-white">Your portfolio</h3>
        <p className="mt-0.5 text-[13px] text-white">
          Evidence, criteria and your assessor's decisions all live in one place.
        </p>
      </div>

      {loading ? (
        <div className="h-10 animate-pulse rounded-xl bg-white/[0.04]" />
      ) : (
        <p className="text-[14px] font-medium leading-snug text-white">
          {headline.total
            ? `${headline.passed} of ${headline.total} criteria passed.`
            : `${headline.passed} criteria passed.`}{' '}
          {[
            headline.submitted > 0 && `${headline.submitted} with your assessor`,
            headline.needsMore > 0 &&
              `${headline.needsMore} need${headline.needsMore === 1 ? 's' : ''} more`,
            `${items.length} ${items.length === 1 ? 'piece' : 'pieces'} of evidence`,
          ]
            .filter(Boolean)
            .join(', ')}
          .
        </p>
      )}

      {needsMore.length > 0 && (
        <button
          type="button"
          onClick={() => navigate(`/apprentice/hub?item=${needsMore[0].id}`)}
          className="flex min-h-[48px] w-full items-center gap-3 rounded-xl border border-orange-400/60 px-4 py-3 text-left touch-manipulation transition-colors hover:border-orange-300"
        >
          <span className="min-w-0 flex-1 text-[13.5px] text-white">
            Your assessor needs more on "{needsMore[0].title}"
            {needsMore.length > 1 ? ` and ${needsMore.length - 1} more` : ''}.
          </span>
          <ChevronRight className="h-4 w-4 shrink-0 text-white" />
        </button>
      )}

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button
          type="button"
          className={cn(P_BTN, 'sm:col-span-2')}
          onClick={() => navigate('/apprentice/hub')}
        >
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
          onClick={() =>
            navigate(`/apprentice/college-ai?prompt=${encodeURIComponent(PORTFOLIO_AI_PROMPT)}`)
          }
        >
          <PenLine className="h-4 w-4" strokeWidth={1.5} aria-hidden /> Draft a write-up
        </button>
      </div>
    </section>
  );
}

export default MyPortfolioLinkCard;
