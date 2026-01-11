import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import {
  Clock,
  TrendingUp,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Zap,
  Target,
  FileCheck,
  Award,
  Play,
  Timer,
} from 'lucide-react';
import { OJTNavSection } from './OJTHubNav';

interface OJTDashboardProps {
  userName: string;
  weeklyProgress: {
    current: number;
    target: number;
  };
  yearlyProgress: {
    current: number;
    target: number;
  };
  recentSessions: Array<{
    id: string;
    activity: string;
    duration: number;
    date: Date;
    type: string;
  }>;
  pendingTasks: {
    evidence: number;
    assessments: number;
    goals: number;
  };
  onNavigate: (section: OJTNavSection) => void;
  onQuickLog: () => void;
  onStartTimer: () => void;
}

/**
 * OJTDashboard - Overview/home section of OJT Hub
 *
 * Shows:
 * - Weekly and yearly progress rings
 * - Quick actions (log time, start timer)
 * - Recent training sessions
 * - Pending tasks summary
 * - Smart next action prompt
 */
export function OJTDashboard({
  userName,
  weeklyProgress,
  yearlyProgress,
  recentSessions,
  pendingTasks,
  onNavigate,
  onQuickLog,
  onStartTimer,
}: OJTDashboardProps) {
  const weeklyPercent = Math.round((weeklyProgress.current / weeklyProgress.target) * 100);
  const yearlyPercent = Math.round((yearlyProgress.current / yearlyProgress.target) * 100);

  // Determine status
  const weeklyStatus = weeklyPercent >= 100 ? 'complete' : weeklyPercent >= 75 ? 'good' : weeklyPercent >= 50 ? 'warning' : 'behind';
  const yearlyStatus = yearlyPercent >= getExpectedYearlyPercent() ? 'on-track' : 'behind';

  const totalPending = pendingTasks.evidence + pendingTasks.assessments + pendingTasks.goals;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Greeting */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">
          Welcome back, {userName.split(' ')[0]}
        </h1>
        <p className="text-sm text-muted-foreground">
          Track your 20% off-the-job training progress
        </p>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* Weekly Progress */}
        <Card className={cn(
          "border-2 transition-colors",
          weeklyStatus === 'complete' ? "border-green-500/30 bg-green-500/5" :
          weeklyStatus === 'good' ? "border-elec-yellow/30 bg-elec-yellow/5" :
          weeklyStatus === 'warning' ? "border-amber-500/30 bg-amber-500/5" :
          "border-red-500/30 bg-red-500/5"
        )}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                This Week
              </span>
              {weeklyStatus === 'complete' && (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              )}
            </div>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-2xl sm:text-3xl font-bold text-foreground">
                {weeklyProgress.current.toFixed(1)}
              </span>
              <span className="text-sm text-muted-foreground mb-1">
                / {weeklyProgress.target}h
              </span>
            </div>
            <Progress
              value={Math.min(weeklyPercent, 100)}
              className="h-2"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {weeklyPercent >= 100
                ? 'Target achieved!'
                : `${(weeklyProgress.target - weeklyProgress.current).toFixed(1)}h remaining`}
            </p>
          </CardContent>
        </Card>

        {/* Yearly Progress */}
        <Card className={cn(
          "border-2 transition-colors",
          yearlyStatus === 'on-track' ? "border-green-500/30 bg-green-500/5" : "border-amber-500/30 bg-amber-500/5"
        )}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Year Total
              </span>
              {yearlyStatus === 'on-track' ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-amber-500" />
              )}
            </div>
            <div className="flex items-end gap-1 mb-2">
              <span className="text-2xl sm:text-3xl font-bold text-foreground">
                {yearlyProgress.current}
              </span>
              <span className="text-sm text-muted-foreground mb-1">
                / {yearlyProgress.target}h
              </span>
            </div>
            <Progress
              value={yearlyPercent}
              className="h-2"
            />
            <p className="text-xs text-muted-foreground mt-2">
              {yearlyPercent}% complete • {yearlyProgress.target - yearlyProgress.current}h to go
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={onQuickLog}
          className="h-auto py-4 bg-elec-yellow text-black hover:bg-elec-yellow/90 flex flex-col items-center gap-2 touch-manipulation active:scale-95"
        >
          <Clock className="h-5 w-5" />
          <span className="font-medium">Log Time</span>
        </Button>
        <Button
          onClick={onStartTimer}
          variant="outline"
          className="h-auto py-4 border-elec-yellow/30 hover:bg-elec-yellow/10 flex flex-col items-center gap-2 touch-manipulation active:scale-95"
        >
          <Play className="h-5 w-5 text-elec-yellow" />
          <span className="font-medium">Start Timer</span>
        </Button>
      </div>

      {/* Pending Tasks Summary */}
      {totalPending > 0 && (
        <Card className="border-amber-500/20 bg-gradient-to-r from-amber-500/5 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              Needs Attention
              <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-xs">
                {totalPending}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {pendingTasks.evidence > 0 && (
              <button
                onClick={() => onNavigate('evidence')}
                className="p-3 rounded-lg bg-background border border-border hover:border-elec-yellow/30 transition-colors text-center touch-manipulation active:scale-95"
              >
                <FileCheck className="h-5 w-5 text-elec-yellow mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground">{pendingTasks.evidence}</p>
                <p className="text-[10px] text-muted-foreground">Evidence</p>
              </button>
            )}
            {pendingTasks.assessments > 0 && (
              <button
                onClick={() => onNavigate('assessments')}
                className="p-3 rounded-lg bg-background border border-border hover:border-elec-yellow/30 transition-colors text-center touch-manipulation active:scale-95"
              >
                <Award className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground">{pendingTasks.assessments}</p>
                <p className="text-[10px] text-muted-foreground">Assessments</p>
              </button>
            )}
            {pendingTasks.goals > 0 && (
              <button
                onClick={() => onNavigate('goals')}
                className="p-3 rounded-lg bg-background border border-border hover:border-elec-yellow/30 transition-colors text-center touch-manipulation active:scale-95"
              >
                <Target className="h-5 w-5 text-green-500 mx-auto mb-1" />
                <p className="text-lg font-bold text-foreground">{pendingTasks.goals}</p>
                <p className="text-[10px] text-muted-foreground">Goals</p>
              </button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Recent Sessions */}
      <Card className="border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              <Timer className="h-4 w-4 text-elec-yellow" />
              Recent Training
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('time')}
              className="text-xs h-7 gap-1"
            >
              View All
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          {recentSessions.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-10 w-10 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No recent sessions</p>
              <Button
                variant="link"
                onClick={onQuickLog}
                className="text-elec-yellow mt-2"
              >
                Log your first session
              </Button>
            </div>
          ) : (
            recentSessions.slice(0, 4).map((session) => (
              <div
                key={session.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-elec-yellow/10 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-elec-yellow" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground line-clamp-1">
                    {session.activity}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{formatDuration(session.duration)}</span>
                    <span>•</span>
                    <span>{formatRelativeDate(session.date)}</span>
                  </div>
                </div>
                <Badge variant="secondary" className="text-[10px] shrink-0">
                  {session.type}
                </Badge>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate('evidence')}
          className="p-4 rounded-xl border border-border bg-card hover:border-elec-yellow/30 transition-colors text-left touch-manipulation active:scale-95"
        >
          <FileCheck className="h-6 w-6 text-elec-yellow mb-2" />
          <p className="font-medium text-foreground text-sm">Evidence</p>
          <p className="text-xs text-muted-foreground">Upload & manage</p>
        </button>
        <button
          onClick={() => onNavigate('assessments')}
          className="p-4 rounded-xl border border-border bg-card hover:border-elec-yellow/30 transition-colors text-left touch-manipulation active:scale-95"
        >
          <Award className="h-6 w-6 text-blue-500 mb-2" />
          <p className="font-medium text-foreground text-sm">Assessments</p>
          <p className="text-xs text-muted-foreground">Track progress</p>
        </button>
        <button
          onClick={() => onNavigate('goals')}
          className="p-4 rounded-xl border border-border bg-card hover:border-elec-yellow/30 transition-colors text-left touch-manipulation active:scale-95"
        >
          <Target className="h-6 w-6 text-green-500 mb-2" />
          <p className="font-medium text-foreground text-sm">Goals</p>
          <p className="text-xs text-muted-foreground">Set & achieve</p>
        </button>
        <button
          onClick={() => onNavigate('time')}
          className="p-4 rounded-xl border border-border bg-card hover:border-elec-yellow/30 transition-colors text-left touch-manipulation active:scale-95"
        >
          <Calendar className="h-6 w-6 text-purple-500 mb-2" />
          <p className="font-medium text-foreground text-sm">Logbook</p>
          <p className="text-xs text-muted-foreground">View history</p>
        </button>
      </div>
    </div>
  );
}

// Helper: Format duration in minutes to readable string
function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

// Helper: Format date relative to now
function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

// Helper: Get expected yearly progress percent
function getExpectedYearlyPercent(): number {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 8, 1); // September start
  if (now < startOfYear) {
    startOfYear.setFullYear(startOfYear.getFullYear() - 1);
  }
  const endOfYear = new Date(startOfYear.getFullYear() + 1, 7, 31);

  const totalDays = (endOfYear.getTime() - startOfYear.getTime()) / 86400000;
  const daysPassed = (now.getTime() - startOfYear.getTime()) / 86400000;

  return Math.min(Math.max((daysPassed / totalDays) * 100, 0), 100);
}

export default OJTDashboard;
