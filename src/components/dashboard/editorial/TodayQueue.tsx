/**
 * TodayQueue — numbered "what to do today" list.
 *
 * Composes from college editorial primitives. Each row is a tone-accented
 * action a user can fire from the dashboard without thinking. Items are
 * generated upstream by `useDashboardVerdict` from existing dashboard data
 * (overdue invoices, idle drafts, expiring certs, study streak nudges) — no
 * new schema, no new endpoints.
 */
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import {
  Eyebrow,
  ListCard,
  ListRow,
  containerVariants,
  itemVariants,
} from '@/components/college/primitives';
import type { QueueItem } from '@/hooks/useDashboardVerdict';

interface TodayQueueProps {
  number?: string;
  label?: string;
  items: QueueItem[];
  emptyMessage?: string;
}

export function TodayQueue({
  number = '01',
  label = 'TODAY',
  items,
  emptyMessage = "You're all caught up.",
}: TodayQueueProps) {
  const navigate = useNavigate();

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div variants={itemVariants} className="flex items-end justify-between gap-4">
        <Eyebrow>
          {number} · {label}
        </Eyebrow>
        {items.length > 0 && (
          <span className="text-[11px] text-white/50 tabular-nums">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
        )}
      </motion.div>

      <motion.div variants={itemVariants}>
        {items.length === 0 ? (
          <ListCard>
            <div className="px-5 sm:px-6 py-8 text-center">
              <p className="text-[14px] text-white/70">{emptyMessage}</p>
            </div>
          </ListCard>
        ) : (
          <ListCard>
            {items.map((item) => (
              <ListRow
                key={item.id}
                accent={item.tone}
                title={item.title}
                subtitle={item.subtitle}
                onClick={() => navigate(item.href)}
                trailing={
                  item.trailing ? (
                    <span className="inline-flex items-center gap-2 text-[12px] text-white/70 tabular-nums">
                      <span>{item.trailing}</span>
                      <span className="text-elec-yellow/70">→</span>
                    </span>
                  ) : (
                    <span className="text-elec-yellow/70 text-[15px]">→</span>
                  )
                }
              />
            ))}
          </ListCard>
        )}
      </motion.div>
    </motion.section>
  );
}

export default TodayQueue;
