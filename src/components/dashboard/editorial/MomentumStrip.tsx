/**
 * MomentumStrip — newspaper-style closer for the editorial dashboard.
 *
 * Editorial pages end with a sense of "you're moving". This pulls a small
 * digest of the user's recent activity from the data we already aggregate
 * — no new schema, no new endpoints. Role-aware because momentum reads
 * differently for an apprentice (study) vs an electrician (business).
 */
import { motion } from 'framer-motion';

import { Eyebrow, containerVariants, itemVariants } from '@/components/college/primitives';
import { useSharedDashboardData } from '@/hooks/useDashboardData';
import { useAuth } from '@/contexts/AuthContext';

interface MomentumLine {
  value: string;
  label: string;
}

interface MomentumStripProps {
  number?: string;
  label?: string;
}

export function MomentumStrip({ number = '04', label = 'MOMENTUM' }: MomentumStripProps) {
  const { profile } = useAuth();
  const data = useSharedDashboardData();

  const isApprentice = profile?.role === 'apprentice';

  const lines: MomentumLine[] = isApprentice
    ? [
        {
          value: data.learning.studiedToday ? 'Yes' : 'Not yet',
          label: 'studied today',
        },
        { value: String(data.learning.currentStreak), label: 'day streak' },
        { value: String(data.learning.totalSessions), label: 'sessions' },
        { value: String(data.learning.totalCardsReviewed), label: 'cards reviewed' },
      ]
    : [
        { value: String(data.business.totalInvoices), label: 'invoices total' },
        { value: String(data.business.activeQuotes), label: 'active quotes' },
        { value: String(data.certificates.total), label: 'certificates' },
        {
          value: String(data.business.activeProjects),
          label: data.business.activeProjects === 1 ? 'project running' : 'projects running',
        },
      ];

  const verdict = isApprentice
    ? data.learning.studiedToday
      ? 'Day done — see you tomorrow.'
      : 'Five minutes is enough to count.'
    : data.business.overdueValue > 0
      ? "Chase what you're owed before the weekend."
      : data.business.activeQuotes > 0
        ? 'Keep the pipeline moving.'
        : 'Calm week — push a quote out.';

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
        className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] overflow-hidden"
      >
        {/* Headline verdict line — newspaper voice */}
        <div className="px-5 sm:px-7 pt-5 sm:pt-6 pb-4 border-b border-white/[0.04]">
          <p className="text-[15px] sm:text-base font-medium text-white leading-relaxed max-w-[42ch]">
            {verdict}
          </p>
        </div>

        {/* Stat row — small, tabular, monochrome */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-white/[0.04]">
          {lines.map((line) => (
            <div key={line.label} className="px-5 sm:px-6 py-4 sm:py-5">
              <div className="text-2xl sm:text-3xl font-semibold tabular-nums text-white tracking-tight">
                {line.value}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/50">
                {line.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}

export default MomentumStrip;
