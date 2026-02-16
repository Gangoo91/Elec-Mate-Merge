import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import {
  Activity,
  MessageSquare,
  FileText,
  CheckCircle2,
  Upload,
  UserPlus,
  ClipboardCheck,
  AlertCircle,
  Calendar,
  ChevronRight,
} from 'lucide-react';
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
  onViewAll?: () => void;
}

export function ActivityFeed({ maxItems = 10, compact = false, onViewAll }: ActivityFeedProps) {
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'comment':
        return <MessageSquare className="h-4 w-4 text-info" />;
      case 'evidence':
        return <FileText className="h-4 w-4 text-elec-yellow" />;
      case 'grade':
        return <ClipboardCheck className="h-4 w-4 text-success" />;
      case 'attendance':
        return <Calendar className="h-4 w-4 text-primary" />;
      case 'enrollment':
        return <UserPlus className="h-4 w-4 text-info" />;
      case 'review':
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      default:
        return <Activity className="h-4 w-4" />;
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

  if (compact) {
    return (
      <Card className="relative overflow-hidden glass-premium hover:border-elec-yellow/30 transition-all duration-300">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow" />
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-elec-yellow/[0.04] rounded-full blur-3xl pointer-events-none" />
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/20 shadow-lg shadow-elec-yellow/5">
              <Activity className="h-3.5 w-3.5 text-elec-yellow" />
            </div>
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {activities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-start gap-2">
                <div className="mt-0.5">{getTypeIcon(activity.type)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs line-clamp-2">
                    <span className="font-medium">{activity.actor}</span> {activity.action}{' '}
                    <span className="text-white">{activity.subject}</span>
                  </p>
                  <p className="text-[10px] text-white mt-0.5">
                    {formatTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {onViewAll && (
            <Button variant="ghost" className="w-full mt-3 h-8 text-xs" onClick={onViewAll}>
              View all activity
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden glass-premium hover:border-elec-yellow/30 transition-all duration-300">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow" />
      <div className="absolute -top-8 -right-8 w-24 h-24 bg-elec-yellow/[0.04] rounded-full blur-3xl pointer-events-none" />
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/20 shadow-lg shadow-elec-yellow/5">
              <Activity className="h-4 w-4 text-elec-yellow" />
            </div>
            Activity Feed
          </CardTitle>
          <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/30">
            Live
            <span className="ml-1 h-2 w-2 rounded-full bg-success animate-pulse" />
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="h-[400px] pr-4">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/10" />

            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={activity.id} className="flex gap-4 relative">
                  {/* Timeline dot */}
                  <div className="relative z-10">
                    <Avatar className="h-10 w-10 border-2 border-elec-dark">
                      <AvatarFallback
                        className={cn('text-xs font-semibold', getRoleColor(activity.actorRole))}
                      >
                        {activity.actorInitials}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-1 min-w-0 pb-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm">
                          <span className="font-medium">{activity.actor}</span>{' '}
                          <span className="text-white">{activity.action}</span>{' '}
                          <span className="font-medium">{activity.subject}</span>
                          {activity.target && (
                            <>
                              {' '}
                              <span className="text-white">for</span>{' '}
                              <span className="font-medium">{activity.target}</span>
                            </>
                          )}
                        </p>
                        {activity.metadata && (
                          <div className="flex items-center gap-2 mt-1">
                            {activity.metadata.grade && (
                              <Badge
                                variant="outline"
                                className="text-xs bg-success/10 text-success"
                              >
                                {activity.metadata.grade}
                              </Badge>
                            )}
                            {activity.metadata.mentions && (
                              <Badge
                                variant="outline"
                                className="text-xs bg-success/10 text-success border-success/30"
                              >
                                {activity.metadata.mentions}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-white shrink-0">
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
          <>
            <div className="border-t border-white/10 mt-4 pt-4">
              <Button variant="outline" className="w-full" onClick={onViewAll}>
                View all activity
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
