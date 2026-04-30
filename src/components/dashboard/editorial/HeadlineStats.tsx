/**
 * HeadlineStats — slim editorial StatStrip used for the dashboard "this
 * month" row. Composes from the college primitives so the dashboard speaks
 * the same visual language as the rest of the platform — but with role-aware
 * cells so apprentices see study-side numbers while electricians see
 * business-side ones.
 */
import { motion } from 'framer-motion';

import {
  Eyebrow,
  StatStrip,
  containerVariants,
  itemVariants,
} from '@/components/college/primitives';
import { useSharedDashboardData } from '@/hooks/useDashboardData';
import { useAuth } from '@/contexts/AuthContext';

interface HeadlineStatsProps {
  number?: string;
  label?: string;
}

export function HeadlineStats({ number = '02', label = 'THIS MONTH' }: HeadlineStatsProps) {
  const { profile } = useAuth();
  const data = useSharedDashboardData();
  const isApprentice = profile?.role === 'apprentice';

  const stats = isApprentice
    ? [
        {
          label: 'Streak',
          value: data.learning.currentStreak,
          sub: data.learning.studiedToday ? 'Studied today' : 'Open today',
          tone: 'amber' as const,
        },
        {
          label: 'Sessions',
          value: data.learning.totalSessions,
          sub: 'All-time',
          tone: 'blue' as const,
        },
        {
          label: 'Cards',
          value: data.learning.totalCardsReviewed,
          sub: 'Reviewed',
          tone: 'purple' as const,
        },
        {
          label: 'Best run',
          value: data.learning.longestStreak,
          sub: 'Longest streak',
          tone: 'emerald' as const,
        },
      ]
    : [
        {
          label: 'Pipeline',
          value: data.business.formattedQuoteValue,
          sub: `${data.business.activeQuotes} active quote${data.business.activeQuotes === 1 ? '' : 's'}`,
          tone: 'yellow' as const,
        },
        {
          label: 'Certs',
          value: data.certificates.total,
          sub:
            data.certificates.expiringSoon > 0
              ? `${data.certificates.expiringSoon} in progress`
              : 'All complete',
          tone: 'purple' as const,
        },
        {
          label: 'Jobs',
          value: data.business.activeJobs,
          sub: data.business.activeJobs === 1 ? 'On the books' : 'On the books',
          tone: 'blue' as const,
        },
        {
          label: 'Overdue',
          value: data.business.overdueInvoices,
          sub:
            data.business.overdueValue > 0
              ? `£${data.business.overdueValue.toLocaleString('en-GB', { maximumFractionDigits: 0 })} out`
              : 'All paid',
          tone: data.business.overdueInvoices > 0 ? ('red' as const) : ('emerald' as const),
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
      <motion.div variants={itemVariants}>
        <StatStrip stats={stats} columns={4} />
      </motion.div>
    </motion.section>
  );
}

export default HeadlineStats;
