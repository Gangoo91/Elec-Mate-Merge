/**
 * MockHistoryCard — the Study Centre's "your mock exams" card (ELE-1815).
 *
 * Andrzej (29 mocks since 15 Sep) asked for test history and the questions he
 * got wrong; Jack wanted to be told what to revise. This is the way in: the
 * last result and how it moved, the trend, how many questions are waiting to
 * be revised, and the last few attempts — each one opens a full review.
 */
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMockHistory, useRevisionPile, paperName } from '@/hooks/study-centre/useMockHistory';
import { Delta, MH_CARD, ScoreBadge, Sparkline, fmtWhen } from './MockBits';

type History = ReturnType<typeof useMockHistory>;

/** Pass `history` when the page already loads it (one query, not two). */
export function MockHistoryCard({ history }: { history?: History }) {
  const navigate = useNavigate();
  const own = useMockHistory(60, !history);
  const { rows, loading, signedIn } = history ?? own;
  const pile = useRevisionPile({ countOnly: true });

  if (!signedIn || loading) return null;

  if (rows.length === 0) {
    return (
      <section className="space-y-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
          Your mock exams
        </h2>
        <div className={cn(MH_CARD, 'p-4 sm:p-5')}>
          <p className="text-[14px] leading-relaxed text-white">
            Sit a mock and it lands here: your score, how it’s moving, every question you got wrong
            with the right answer, and what to revise next.
          </p>
          <button
            type="button"
            onClick={() => navigate('/study-centre/mock-exams')}
            className="mt-3 inline-flex h-11 items-center rounded-xl bg-elec-yellow px-4 text-[14px] font-bold text-black touch-manipulation"
          >
            Choose a mock exam
          </button>
        </div>
      </section>
    );
  }

  const last = rows[0];
  const prevSame = rows.find((r, i) => i > 0 && r.exam_slug === last.exam_slug);
  const trend = rows
    .slice(0, 12)
    .map((r) => r.percentage)
    .reverse();
  const recent = rows.slice(0, 3);
  const toRevise = pile.count;

  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <h2 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
          Your mock exams
        </h2>
        <button
          type="button"
          onClick={() => navigate('/study-centre/mock-exams/history')}
          className="-my-2 -mr-2 inline-flex h-11 items-center gap-1 px-2 text-[13px] font-semibold text-white touch-manipulation"
        >
          {rows.length >= 60
            ? 'All attempts'
            : rows.length === 1
              ? 'Your attempt'
              : `All ${rows.length} attempts`}
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div className={cn(MH_CARD, 'overflow-hidden')}>
        {/* Last result */}
        <button
          type="button"
          onClick={() => navigate(`/study-centre/mock-exams/history/${last.id}`)}
          className="flex w-full items-center gap-4 p-4 text-left touch-manipulation hover:bg-white/[0.03] sm:p-5"
        >
          <ScoreBadge pct={last.percentage} passed={last.passed} size="lg" />
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold text-white">
              Last mock · {fmtWhen(last.created_at)}
            </p>
            <p className="line-clamp-2 text-[16px] font-bold leading-tight text-white">
              {paperName(last)}
            </p>
            <p className="mt-0.5 flex flex-wrap items-center gap-x-3 text-[12.5px] text-white">
              <span>
                {last.score} of {last.total_questions} right · {last.passed ? 'Pass' : 'Not yet'}
              </span>
              <Delta now={last.percentage} before={prevSame?.percentage} />
            </p>
          </div>
          <Sparkline values={trend} className="hidden sm:block" />
          <ChevronRight className="h-5 w-5 shrink-0 text-white" aria-hidden />
        </button>

        {/* What to do about it */}
        <div className="flex flex-col gap-2 border-t border-white/[0.1] p-4 sm:flex-row sm:items-center sm:p-5">
          <p className="flex-1 text-[13.5px] text-white">
            {toRevise > 0 ? (
              <>
                <span className="font-bold">{toRevise}</span>{' '}
                {toRevise === 1 ? 'question' : 'questions'} you got wrong due to revise
                {pile.scheduled > 0 ? `, ${pile.scheduled} more coming back later.` : '.'}
              </>
            ) : pile.loading ? (
              'Checking what you’ve still to revise…'
            ) : pile.scheduled > 0 ? (
              `All caught up for today — ${pile.scheduled} ${pile.scheduled === 1 ? 'question comes' : 'questions come'} back over the next few days.`
            ) : (
              'Nothing waiting to revise. Sit another mock to keep it that way.'
            )}
          </p>
          {toRevise > 0 && (
            <button
              type="button"
              onClick={() => navigate('/study-centre/mock-exams/revise')}
              className="h-11 rounded-xl bg-elec-yellow px-4 text-[14px] font-bold text-black touch-manipulation"
            >
              Revise them now
            </button>
          )}
          {toRevise + pile.scheduled > 0 && (
            <button
              type="button"
              onClick={() => navigate('/study-centre/mock-exams/targeted')}
              className="h-11 rounded-xl border border-white/[0.22] px-4 text-[14px] font-semibold text-white touch-manipulation"
            >
              Weak spots mock
            </button>
          )}
          <button
            type="button"
            onClick={() => navigate(`/study-centre/mock-exams/history/${last.id}`)}
            className="h-11 rounded-xl border border-white/[0.22] px-4 text-[14px] font-semibold text-white touch-manipulation"
          >
            See what went wrong
          </button>
        </div>

        {/* Recent attempts */}
        {recent.length > 1 && (
          <ul className="divide-y divide-white/[0.08] border-t border-white/[0.1]">
            {recent.slice(1).map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  onClick={() => navigate(`/study-centre/mock-exams/history/${r.id}`)}
                  className="flex min-h-[56px] w-full items-center gap-3 px-4 py-2.5 text-left touch-manipulation hover:bg-white/[0.03] sm:px-5"
                >
                  <ScoreBadge pct={r.percentage} passed={r.passed} size="sm" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-semibold text-white">
                      {paperName(r)}
                    </span>
                    <span className="block text-[12px] text-white">{fmtWhen(r.created_at)}</span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
