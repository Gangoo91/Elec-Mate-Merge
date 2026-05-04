import { cn } from '@/lib/utils';
import type { CollegeOverviewStat } from '@/hooks/useMyCollegeOverview';

/* ==========================================================================
   HubHeadlineStrip — 4 KPI tiles. Editorial: tabular numerals, eyebrow caps,
   single accent colour per tile (not a parade of icons). Mobile-first 2x2,
   desktop 4-col.
   ========================================================================== */

function fmtHours(min: number): string {
  if (min < 60) return `${Math.round(min)}m`;
  const h = min / 60;
  return h >= 10 ? `${h.toFixed(0)}h` : `${h.toFixed(1)}h`;
}

interface Props {
  stats: CollegeOverviewStat;
}

export function HubHeadlineStrip({ stats }: Props) {
  const tiles: Array<{
    label: string;
    value: string;
    sub: string | null;
    tone: string;
    href: string;
  }> = [
    {
      label: 'Verified hours',
      value: fmtHours(stats.verified_otj_minutes),
      sub: stats.pending_otj_minutes > 0 ? `${fmtHours(stats.pending_otj_minutes)} pending` : null,
      tone: 'text-white/85',
      href: '#otj',
    },
    {
      label: 'Open goals',
      value: stats.open_goals.toString(),
      sub:
        stats.overdue_goals > 0
          ? `${stats.overdue_goals} overdue`
          : stats.blocked_goals > 0
            ? `${stats.blocked_goals} blocked`
            : null,
      tone:
        stats.overdue_goals > 0
          ? 'text-white/85'
          : stats.blocked_goals > 0
            ? 'text-white/85'
            : 'text-white/85',
      href: '#plan',
    },
    {
      label: 'Quizzes to do',
      value: stats.pending_quizzes.toString(),
      sub: stats.overdue_quizzes > 0 ? `${stats.overdue_quizzes} overdue` : null,
      tone:
        stats.overdue_quizzes > 0
          ? 'text-white/85'
          : stats.pending_quizzes > 0
            ? 'text-white/85'
            : 'text-white/85',
      href: '#activities',
    },
    {
      // Replaces EPA verdict (apprentice can't read epa_judgements yet) with
      // a portfolio attention prompt — surfaces the same urgency mechanic.
      label: 'Portfolio',
      value: stats.unactioned_portfolio_comments.toString(),
      sub: stats.unactioned_portfolio_comments > 0 ? 'tutor needs reply' : 'all clear',
      tone: stats.unactioned_portfolio_comments > 0 ? 'text-white/85' : 'text-white/85',
      href: '#portfolio',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
      {tiles.map((t) => (
        <a
          key={t.label}
          href={t.href}
          className="group rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] hover:border-white/[0.14] transition-colors px-3 sm:px-4 py-3 sm:py-3.5 touch-manipulation"
        >
          <div className="text-[9.5px] sm:text-[10.5px] font-medium uppercase tracking-[0.16em] text-white/95">
            {t.label}
          </div>
          <div
            className={cn('mt-1 text-[20px] sm:text-[24px] lg:text-[28px] font-semibold tabular-nums leading-none',
              t.tone
            )}
          >
            {t.value}
          </div>
          {t.sub && <div className="mt-1 text-[10.5px] sm:text-[11px] text-white/50">{t.sub}</div>}
        </a>
      ))}
    </div>
  );
}
