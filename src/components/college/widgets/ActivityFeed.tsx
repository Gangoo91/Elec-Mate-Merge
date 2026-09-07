import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';

/* ==========================================================================
   ActivityFeed — recent grading and attendance on the college record.

   Rebuilt on the hub card language: one CARD_SURFACE card, a 15px volt
   title, hairline-divided rows (rule · who · what · when). The three old
   variants (avatars + scroll area, compact, "iconless editorial") all drew
   the same twelve rows three different ways; they now share one renderer
   and the props only change how many rows show.

   Data fix (2026-09-04): the feed read `full_name`, `assessor_id` and
   `graded_at` through `as any`. The context exposes the service shapes —
   `name`, `assessed_by`, `assessed_at` — so every row said "Assessor graded
   Assessment", never named the learner, and was stamped with the current
   time. It now reads the real columns.
   ========================================================================== */

interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  subject: string;
  target?: string;
  timestamp: string;
  grade?: string;
}

interface ActivityFeedProps {
  maxItems?: number;
  /** Five rows instead of `maxItems`. */
  compact?: boolean;
  /** Kept for callers; the feed no longer draws icons in any mode. */
  iconless?: boolean;
  onViewAll?: () => void;
}

function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function ActivityFeed({ maxItems = 10, compact = false, onViewAll }: ActivityFeedProps) {
  const { grades: assessments, attendance, students, staff } = useCollegeSupabase();

  const activities = useMemo(() => {
    const items: ActivityItem[] = [];

    assessments
      .filter((a) => a.status === 'graded' || a.status === 'Graded')
      .slice(0, 8)
      .forEach((assessment) => {
        const assessor = staff.find((s) => s.id === assessment.assessed_by);
        const student = students.find((s) => s.id === assessment.student_id);
        items.push({
          id: `grade-${assessment.id}`,
          actor: assessor?.name || 'Assessor',
          action: 'graded',
          subject: assessment.unit_name || 'an assessment',
          target: student?.name,
          timestamp: assessment.assessed_at || assessment.created_at || new Date().toISOString(),
          grade: assessment.grade ?? undefined,
        });
      });

    attendance.slice(0, 5).forEach((record) => {
      const student = students.find((s) => s.id === record.student_id);
      items.push({
        id: `attendance-${record.id}`,
        actor: student?.name || 'Learner',
        action: 'was marked',
        subject: record.status?.toLowerCase() || 'present',
        timestamp: record.date || record.created_at || new Date().toISOString(),
      });
    });

    return items
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, maxItems);
  }, [assessments, attendance, students, staff, maxItems]);

  const shown = compact ? activities.slice(0, 5) : activities;

  return (
    <section
      className={cn('overflow-hidden rounded-2xl border border-elec-yellow/35', CARD_SURFACE)}
    >
      <div className="flex items-end justify-between gap-4 px-4 py-3.5 sm:px-5">
        <h3 className="text-[15px] font-semibold tracking-tight text-elec-yellow">
          Recent activity
        </h3>
        {shown.length > 0 && (
          <span className="text-[11px] font-semibold tabular-nums text-white">{shown.length}</span>
        )}
      </div>

      {shown.length === 0 ? (
        <p className="border-t border-white/[0.10] px-4 py-4 text-[12.5px] leading-snug text-white sm:px-5">
          Nothing recent. Grades and attendance will appear here as they are logged.
        </p>
      ) : (
        <ul className="divide-y divide-white/[0.10] border-t border-white/[0.10]">
          {shown.map((activity) => (
            <li key={activity.id} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
              <span aria-hidden="true" className="h-8 w-[3px] shrink-0 rounded-full bg-white/[0.25]" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                  {activity.actor}
                </span>
                <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                  {activity.action} {activity.subject}
                  {activity.target ? ` for ${activity.target}` : ''}
                  {activity.grade ? ` · ${activity.grade}` : ''}
                </span>
              </span>
              <span className="shrink-0 text-[12px] font-semibold tabular-nums text-white">
                {formatTime(activity.timestamp)}
              </span>
            </li>
          ))}
        </ul>
      )}

      {onViewAll && (
        <button
          type="button"
          onClick={onViewAll}
          className="flex h-11 w-full items-center justify-center border-t border-white/[0.10] text-[12.5px] font-semibold text-white transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09]"
        >
          View all activity
        </button>
      )}
    </section>
  );
}
