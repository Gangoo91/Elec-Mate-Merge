/**
 * MockHistoryCard — the Study Centre front page's "Mock exams" panel
 * (ELE-1815, redesigned ELE-2024 on the College Hub kit).
 *
 * The last result and how it moved, the trend on the paper they're working
 * on, and the last few attempts. "What to do about it" lives in
 * <HowToGetBetter>, so this card only reports; it has no competing buttons.
 */
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SC_LIST, SC_ROW } from '@/components/study-centre/ui/StudyKit';
import { useMockHistory, paperName } from '@/hooks/study-centre/useMockHistory';
import { mainPaper } from '@/lib/study-centre/mockInsights';

import { Delta, ScoreBadge, TrendChart, fmtWhen } from './MockBits';

type History = ReturnType<typeof useMockHistory>;

/** Pass `history` when the page already loads it (one query, not two). */
/**
 * `wide`: full-width on a computer (the Study Centre front page) — the latest
 * result and recent sittings on the left, the trend on the right where it has
 * room to read. A phone is unchanged.
 */
export function MockHistoryCard({ history, wide = false }: { history?: History; wide?: boolean }) {
  const navigate = useNavigate();
  const own = useMockHistory(60, !history);
  const { rows, papers, loading, signedIn } = history ?? own;
  const paper = useMemo(() => mainPaper(papers, rows), [papers, rows]);

  if (!signedIn || loading || rows.length === 0) return null;

  const last = rows[0];
  const prevSame = rows.find((r, i) => i > 0 && r.exam_slug === last.exam_slug);
  const recent = rows.slice(1, 4);

  const trend = (cls: string) =>
    paper && paper.trend.length >= 2 ? (
      <div className={cn('px-5 pb-4 pt-3 sm:px-6', cls)}>
        <p className="mb-2 text-[12px] font-medium text-white">
          {paper.slug === last.exam_slug
            ? `${paper.name} · last ${paper.trend.length} sittings`
            : `Your most-sat paper this month: ${paper.name} · last ${paper.trend.length} sittings`}
        </p>
        <TrendChart values={paper.trend} passMark={paper.last.pass_mark ?? 60} />
      </div>
    ) : null;

  return (
    <div className={cn(SC_LIST, wide && 'lg:grid lg:grid-cols-2 lg:divide-x lg:divide-y-0')}>
      <div className="min-w-0 divide-y divide-white/[0.07]">
        <button
          type="button"
          onClick={() => navigate(`/study-centre/mock-exams/history/${last.id}`)}
          className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors touch-manipulation hover:bg-white/[0.04] active:bg-white/[0.08] sm:px-6"
        >
          <ScoreBadge pct={last.percentage} passed={last.passed} size="lg" />
          <span className="min-w-0 flex-1">
            <span className="block text-[12px] font-medium text-white">
              Last mock · {fmtWhen(last.created_at)}
            </span>
            <span className="mt-0.5 line-clamp-2 text-[15.5px] font-bold leading-tight text-white">
              {paperName(last)}
            </span>
            <span className="mt-1 flex flex-wrap items-center gap-x-3 text-[12.5px] text-white">
              <span>
                {/* AM2 practicals record a result, not questions: never "0 of 0". */}
                {last.total_questions > 0 && `${last.score} of ${last.total_questions} · `}
                {last.passed ? 'Pass' : 'Not yet'}
              </span>
              <Delta now={last.percentage} before={prevSame?.percentage} />
            </span>
          </span>
          <ChevronRight className="h-5 w-5 shrink-0 text-white" aria-hidden />
        </button>

        {/* The trend under the latest result (phone, or not wide). */}
        {trend(wide ? 'lg:hidden' : '')}

        {recent.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => navigate(`/study-centre/mock-exams/history/${r.id}`)}
            className={SC_ROW}
          >
            <ScoreBadge pct={r.percentage} passed={r.passed} size="sm" />
            <span className="min-w-0 flex-1">
              <span className="block break-words leading-snug text-[14px] font-semibold text-white">
                {paperName(r)}
              </span>
              <span className="block text-[12px] text-white">{fmtWhen(r.created_at)}</span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden />
          </button>
        ))}

        <button
          type="button"
          onClick={() => navigate('/study-centre/mock-exams/history')}
          className={cn(SC_ROW, 'min-h-[52px] justify-center font-semibold text-elec-yellow')}
        >
          <span className="text-[13.5px] text-elec-yellow">
            {rows.length === 1
              ? 'Open your history'
              : `All ${rows.length >= 60 ? '60+' : rows.length} attempts and topics`}
          </span>
          <ChevronRight className="h-4 w-4 text-elec-yellow" aria-hidden />
        </button>
      </div>
      {/* Wide: the trend beside the list, where it has room. */}
      {wide && trend('hidden lg:flex lg:h-full lg:flex-col lg:justify-center lg:py-6')}
    </div>
  );
}
