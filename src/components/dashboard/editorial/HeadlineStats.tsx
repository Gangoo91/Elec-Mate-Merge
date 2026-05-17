/**
 * HeadlineStats — calm monochrome stat strip for the dashboard "this month"
 * row. Custom layout (not the college StatStrip primitive) so we can drop
 * the per-cell tone gradients and keep the dashboard restrained — single
 * yellow accent only, big tabular numbers, hairline grid.
 */
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { Eyebrow, containerVariants, itemVariants } from '@/components/college/primitives';
import { useSharedDashboardData } from '@/hooks/useDashboardData';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface StatCell {
  label: string;
  value: string | number;
  sub?: string;
  /** When true, value rendered in elec-yellow as the single accent */
  accent?: boolean;
  /** Click target — every stat is clickable so the dashboard works as a launcher */
  href: string;
}

interface HeadlineStatsProps {
  number?: string;
  label?: string;
}

export function HeadlineStats({ number = '01', label = 'THIS MONTH' }: HeadlineStatsProps) {
  const { profile } = useAuth();
  const data = useSharedDashboardData();
  const navigate = useNavigate();
  const isApprentice = profile?.role === 'apprentice';

  // Each row has ONE accent cell — the headline signal for the role —
  // rendered in elec-yellow. The rest are white. Avoids the rainbow look
  // while still giving the strip a focal point. Every cell has an `href`
  // so the whole strip works as a launcher.
  const stats: StatCell[] = isApprentice
    ? [
        {
          label: 'Streak',
          value: data.learning.currentStreak,
          sub: data.learning.studiedToday ? 'Studied today' : 'Open today',
          accent: true,
          href: '/study-centre/apprentice',
        },
        {
          label: 'Sessions',
          value: data.learning.totalSessions,
          sub: 'All-time',
          href: '/study-centre/apprentice',
        },
        {
          label: 'Cards',
          value: data.learning.totalCardsReviewed,
          sub: 'Reviewed',
          href: '/study-centre/apprentice',
        },
        {
          label: 'Best run',
          value: data.learning.longestStreak,
          sub: 'Longest streak',
          href: '/study-centre/leaderboard',
        },
      ]
    : [
        {
          label: 'Pipeline',
          value: data.business.formattedQuoteValue,
          sub: `${data.business.activeQuotes} active quote${data.business.activeQuotes === 1 ? '' : 's'}`,
          accent: true,
          href: '/electrician/quotes',
        },
        {
          label: 'Certs',
          value: data.certificates.total,
          sub:
            data.certificates.expiringSoon > 0
              ? `${data.certificates.expiringSoon} in progress`
              : 'All complete',
          href: '/electrician/inspection-testing?section=my-reports',
        },
        {
          label: 'Projects',
          value: data.business.activeProjects,
          sub: 'On the books',
          href: '/electrician/projects',
        },
        {
          label: 'Overdue',
          value: data.business.overdueInvoices,
          sub:
            data.business.overdueValue > 0
              ? `£${data.business.overdueValue.toLocaleString('en-GB', { maximumFractionDigits: 0 })} out`
              : 'All paid',
          href: '/electrician/invoices?filter=overdue',
        },
      ];

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div variants={itemVariants}>
        <Eyebrow>
          {number} · {label}
        </Eyebrow>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="relative grid grid-cols-2 lg:grid-cols-4 gap-[2px] bg-black border border-white/[0.08] rounded-2xl overflow-hidden"
      >
        {/* Single yellow hairline along the top of the strip — gives the
            grid a brand-anchored ceiling without colouring each cell. */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none" />

        {stats.map((stat) => {
          const valueStr = String(stat.value);
          const isNumericish =
            typeof stat.value === 'number' || /^[\d.,+\-/%hkm£]+$/i.test(valueStr);
          const sizeClass =
            isNumericish || valueStr.length <= 4
              ? 'text-4xl sm:text-5xl lg:text-[56px]'
              : valueStr.length <= 8
                ? 'text-3xl sm:text-4xl lg:text-5xl'
                : 'text-2xl sm:text-3xl lg:text-4xl';

          return (
            <button
              key={stat.label}
              type="button"
              onClick={() => navigate(stat.href)}
              className={cn(
                'group relative bg-[hsl(0_0%_10%)] px-5 py-6 sm:px-7 sm:py-8 flex flex-col text-left touch-manipulation',
                'hover:bg-elec-yellow/[0.04] transition-colors',
                stat.accent &&
                  'bg-gradient-to-br from-elec-yellow/[0.06] via-amber-500/[0.02] to-transparent hover:from-elec-yellow/[0.10]'
              )}
            >
              <div
                className={cn(
                  'text-[10px] font-medium uppercase tracking-[0.18em]',
                  stat.accent ? 'text-elec-yellow/80' : 'text-white/50'
                )}
              >
                {stat.label}
              </div>
              <span
                className={cn(
                  'mt-3 sm:mt-4 font-semibold tabular-nums tracking-tight leading-none',
                  sizeClass,
                  stat.accent ? 'text-elec-yellow' : 'text-white'
                )}
              >
                {stat.value}
              </span>
              {stat.sub && (
                <span className="mt-3 text-[11.5px] text-white/55 group-hover:text-white/75 transition-colors">
                  {stat.sub}
                </span>
              )}
            </button>
          );
        })}
      </motion.div>
    </motion.section>
  );
}

export default HeadlineStats;
