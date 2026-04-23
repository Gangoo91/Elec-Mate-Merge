import { useMemo } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { cn } from '@/lib/utils';

interface ActivityItem {
  id: string;
  type: 'comment' | 'evidence' | 'grade' | 'attendance' | 'enrollment' | 'review';
  action: string;
  subject: string;
  actor: string;
  actorInitials: string;
  actorRole: string;
  target?: string;
  timestamp: string;
  metadata?: Record<string, string>;
}

interface ActivityFeedProps {
  maxItems?: number;
  compact?: boolean;
  iconless?: boolean;
  onViewAll?: () => void;
}

export function ActivityFeed({ maxItems = 10, compact = false, iconless = false, onViewAll }: ActivityFeedProps) {
  const { grades: assessments, attendance, students, staff } = useCollegeSupabase();

  // Generate activity items from available Supabase data
  const activities = useMemo(() => {
    const items: ActivityItem[] = [];

    // Recent grading activity
    assessments
      .filter((a) => a.status === 'graded' || a.status === 'Graded')
      .slice(0, 8)
      .forEach((assessment) => {
        const assessor = staff.find((s) => s.id === (assessment as any).assessor_id);
        const student = students.find((s) => s.id === (assessment as any).student_id);
        const initials = assessor?.full_name
          ?.split(' ')
          .map((n: string) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2) || 'AS';
        items.push({
          id: `grade-${assessment.id}`,
          type: 'grade',
          action: 'graded',
          subject: (assessment as any).unit_name || 'Assessment',
          actor: assessor?.full_name || 'Assessor',
          actorInitials: initials,
          actorRole: 'assessor',
          target: student?.full_name,
          timestamp: (assessment as any).graded_at || (assessment as any).created_at || new Date().toISOString(),
          metadata: (assessment as any).grade ? { grade: (assessment as any).grade } : undefined,
        });
      });

    // Recent attendance records
    attendance
      .slice(0, 5)
      .forEach((record) => {
        const student = students.find((s) => s.id === (record as any).student_id);
        items.push({
          id: `attendance-${record.id}`,
          type: 'attendance',
          action: `marked ${(record as any).status?.toLowerCase() || 'present'}`,
          subject: 'attendance',
          actor: student?.full_name || 'Student',
          actorInitials: student?.full_name
            ?.split(' ')
            .map((n: string) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2) || 'ST',
          actorRole: 'student',
          timestamp: (record as any).date || (record as any).created_at || new Date().toISOString(),
        });
      });

    // Sort by timestamp and limit
    return items
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, maxItems);
  }, [assessments, attendance, students, staff, maxItems]);

  const getTypeDot = (type: string) => {
    switch (type) {
      case 'comment':
        return 'bg-blue-400';
      case 'evidence':
        return 'bg-elec-yellow';
      case 'grade':
        return 'bg-green-400';
      case 'attendance':
        return 'bg-purple-400';
      case 'enrollment':
        return 'bg-blue-400';
      case 'review':
        return 'bg-green-400';
      default:
        return 'bg-white/40';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'tutor':
        return 'bg-info/10 text-info border-info/20';
      case 'assessor':
        return 'bg-success/10 text-success border-success/20';
      case 'iqa':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'student':
        return 'bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20';
      default:
        return 'bg-white/10 text-white border-white/20';
    }
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  /* Iconless editorial variant — for best-in-class dashboard redesign.
     Renders as a hairline-divided list, no card/icon chrome. */
  if (iconless) {
    if (activities.length === 0) {
      return (
        <div className="py-10 text-center text-[12px] text-white/70 border-y border-white/[0.06]">
          No recent activity
        </div>
      );
    }

    const getRoleDot = (role: string) => {
      switch (role) {
        case 'tutor':
          return 'bg-blue-400';
        case 'assessor':
          return 'bg-green-400';
        case 'iqa':
          return 'bg-amber-400';
        case 'student':
          return 'bg-elec-yellow';
        default:
          return 'bg-white/40';
      }
    };

    return (
      <div>
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 px-5 sm:px-6 py-4 sm:py-5"
            >
              <span
                className={cn(
                  'mt-1.5 h-1.5 w-1.5 rounded-full shrink-0',
                  getRoleDot(activity.actorRole)
                )}
                aria-hidden
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white leading-relaxed">
                  <span className="font-medium">{activity.actor}</span>{' '}
                  <span className="text-white/60">{activity.action}</span>{' '}
                  <span className="font-medium">{activity.subject}</span>
                  {activity.target && (
                    <>
                      {' '}
                      <span className="text-white/60">for</span>{' '}
                      <span className="font-medium">{activity.target}</span>
                    </>
                  )}
                </p>
                {activity.metadata?.grade && (
                  <span className="mt-1.5 inline-block text-[11px] font-medium px-1.5 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20 tabular-nums">
                    {activity.metadata.grade}
                  </span>
                )}
              </div>
              <span className="text-[11px] tabular-nums text-white/70 shrink-0 mt-1">
                {formatTime(activity.timestamp)}
              </span>
            </div>
          ))}
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="mt-5 text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
          >
            View all activity →
          </button>
        )}
      </div>
    );
  }

  if (compact) {
    return (
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Activity
            </div>
            <h3 className="mt-1 text-base font-semibold text-white tracking-tight">
              Recent activity
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 tabular-nums">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
        </div>
        <div className="space-y-3">
          {activities.slice(0, 5).map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 text-left">
              <span
                className={cn(
                  'mt-2 h-1.5 w-1.5 rounded-full shrink-0',
                  getTypeDot(activity.type)
                )}
                aria-hidden
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[12px] leading-relaxed text-white/80 line-clamp-2">
                    <span className="font-medium text-white">{activity.actor}</span>{' '}
                    <span className="text-white/60">{activity.action}</span>{' '}
                    <span className="font-medium text-white">{activity.subject}</span>
                  </p>
                  <span className="text-[10px] text-white/70 shrink-0 tabular-nums">
                    {formatTime(activity.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="mt-4 text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
          >
            View all activity →
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/80 via-amber-400/70 to-elec-yellow/80" />
      <div className="p-5 sm:p-6 pb-4 flex items-baseline justify-between">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Activity
          </div>
          <h3 className="mt-1.5 text-xl sm:text-2xl font-semibold text-white tracking-tight">
            Activity feed
          </h3>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 tabular-nums">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      </div>
      <ScrollArea className="h-[440px] px-5 sm:px-6 pb-5">
        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/[0.08]" />

          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex gap-4 relative">
                <div className="relative z-10 shrink-0">
                  <Avatar className="h-10 w-10 ring-2 ring-[hsl(0_0%_12%)]">
                    <AvatarFallback
                      className={cn('text-xs font-semibold', getRoleColor(activity.actorRole))}
                    >
                      {activity.actorInitials}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1 min-w-0 pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[13px] leading-relaxed">
                        <span className="font-medium text-white">{activity.actor}</span>{' '}
                        <span className="text-white/60">{activity.action}</span>{' '}
                        <span className="font-medium text-white">{activity.subject}</span>
                        {activity.target && (
                          <>
                            {' '}
                            <span className="text-white/60">for</span>{' '}
                            <span className="font-medium text-white">{activity.target}</span>
                          </>
                        )}
                      </p>
                      {activity.metadata && (
                        <div className="flex items-center gap-1.5 mt-1.5">
                          {activity.metadata.grade && (
                            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 tabular-nums">
                              {activity.metadata.grade}
                            </span>
                          )}
                          {activity.metadata.mentions && (
                            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              {activity.metadata.mentions}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="text-[11px] text-white/70 shrink-0 tabular-nums">
                      {formatTime(activity.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>

      {onViewAll && (
        <div className="border-t border-white/[0.06] px-5 sm:px-6 py-3">
          <button
            onClick={onViewAll}
            className="text-[12px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation"
          >
            View all activity →
          </button>
        </div>
      )}
    </div>
  );
}
