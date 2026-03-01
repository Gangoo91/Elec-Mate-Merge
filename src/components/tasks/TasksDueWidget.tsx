import { Link } from 'react-router-dom';
import { ClipboardCheck, ChevronRight } from 'lucide-react';
import { useSparkTaskOverdueCount } from '@/hooks/useSparkTaskOverdueCount';

/**
 * Compact widget for the Electrician Hub home page.
 * Only renders when there are overdue tasks.
 */
export function TasksDueWidget() {
  const overdueCount = useSparkTaskOverdueCount();

  if (overdueCount === 0) return null;

  return (
    <Link to="/electrician/tasks?view=today" className="block touch-manipulation active:opacity-90">
      <div className="flex items-center gap-3 p-4 rounded-xl bg-purple-500/[0.08] border border-purple-500/20 active:bg-purple-500/[0.12] transition-colors">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
          <ClipboardCheck className="h-5 w-5 text-purple-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white">
            {overdueCount} overdue {overdueCount === 1 ? 'task' : 'tasks'}
          </p>
          <p className="text-xs text-white">Tap to view and manage</p>
        </div>
        <ChevronRight className="h-5 w-5 text-purple-400 shrink-0" />
      </div>
    </Link>
  );
}
