import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClipboardCheck, ChevronRight } from 'lucide-react';
import { useSparkTaskOverdueCount } from '@/hooks/useSparkTaskOverdueCount';

/**
 * Compact widget for the Electrician Hub home page.
 * Only renders when there are overdue tasks.
 * Matches the ToolCard glass-premium pattern with purple accent.
 */
export function TasksDueWidget() {
  const overdueCount = useSparkTaskOverdueCount();

  if (overdueCount === 0) return null;

  return (
    <Link
      to="/electrician/tasks?view=today"
      className="block group touch-manipulation active:opacity-90"
    >
      <motion.div
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="glass-premium rounded-xl active:bg-white/[0.02]"
      >
        <div className="p-4 sm:p-5 flex items-center gap-4">
          <div className="flex-shrink-0 p-2.5 rounded-lg bg-purple-500/10 group-active:bg-purple-500/25 transition-colors">
            <ClipboardCheck className="h-6 w-6 sm:h-7 sm:w-7 text-purple-400" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-1 group-active:text-purple-400 transition-colors">
              {overdueCount} overdue {overdueCount === 1 ? 'task' : 'tasks'}
            </h3>
            <p className="text-sm text-white leading-relaxed">Tap to view and manage</p>
          </div>

          <ChevronRight className="h-5 w-5 text-white group-active:text-purple-400 group-active:translate-x-1 transition-all flex-shrink-0" />
        </div>
      </motion.div>
    </Link>
  );
}
