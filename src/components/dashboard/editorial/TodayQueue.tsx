/**
 * TodayQueue — numbered "what to do today" list.
 *
 * Pure monochrome rows on a single hairline-bordered card. The only colour
 * is the elec-yellow arrow on the right of each row — same restraint rule
 * as the rest of the dashboard.
 */
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Eyebrow, containerVariants, itemVariants } from '@/components/college/primitives';
import type { QueueItem } from '@/hooks/useDashboardVerdict';

interface TodayQueueProps {
  number?: string;
  label?: string;
  items: QueueItem[];
  emptyMessage?: string;
}

export function TodayQueue({
  number = '02',
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
          <div className="relative rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_10%)] px-5 sm:px-6 py-8 text-center overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0" />
            <p className="text-[14px] text-white/60">{emptyMessage}</p>
          </div>
        ) : (
          <div className="relative rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_10%)] divide-y divide-white/[0.05] overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none" />
            {items.map((item, i) => (
              <button
                key={item.id}
                onClick={() => navigate(item.href)}
                className="group relative w-full flex items-center gap-4 px-5 sm:px-7 py-4 sm:py-5 text-left touch-manipulation hover:bg-white/[0.06] transition-colors"
              >
                {/* Numbered eyebrow — yellow, tabular, signature anchor */}
                <span className="text-[10px] font-medium tracking-[0.18em] text-elec-yellow/70 tabular-nums shrink-0 w-7">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] sm:text-[15px] font-medium text-white truncate">
                    {item.title}
                  </div>
                  {item.subtitle && (
                    <div className="mt-0.5 text-[12px] text-white/55 truncate">{item.subtitle}</div>
                  )}
                </div>
                {item.trailing && (
                  <span className="text-[13px] font-medium text-white tabular-nums shrink-0">
                    {item.trailing}
                  </span>
                )}
                <ArrowRight className="h-4 w-4 text-elec-yellow group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </motion.section>
  );
}

export default TodayQueue;
