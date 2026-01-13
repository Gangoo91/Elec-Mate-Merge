/**
 * UnifiedDashboard
 *
 * Home tab content - unified dashboard showing:
 * - Course selection (if not selected) OR Course requirements (if selected)
 * - Portfolio progress
 * - OJT hours (weekly + yearly)
 * - Action required items
 * - Recent activity
 */

import { useState } from 'react';
import {
  Clock,
  Briefcase,
  Target,
  AlertCircle,
  ChevronRight,
  FileCheck,
  MessageSquare,
  Timer,
  Plus,
  GraduationCap,
  Pencil,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { usePortfolioData } from '@/hooks/portfolio/usePortfolioData';
import { usePortfolioComments } from '@/hooks/portfolio/usePortfolioComments';
import { useTimeEntries } from '@/hooks/time-tracking/useTimeEntries';
import { useComplianceTracking } from '@/hooks/time-tracking/useComplianceTracking';
import { useQualifications } from '@/hooks/qualification/useQualifications';
import { ApprenticeHubTab } from './ApprenticeHubNav';
import { CourseRequirementsPanel } from './CourseRequirementsPanel';
import QualificationSelector from '@/components/apprentice/qualification/QualificationSelector';

interface UnifiedDashboardProps {
  onNavigate: (tab: ApprenticeHubTab) => void;
  onCapture: () => void;
}

export function UnifiedDashboard({ onNavigate, onCapture }: UnifiedDashboardProps) {
  const { user, profile } = useAuth();
  const { entries: portfolioEntries, isLoading: portfolioLoading } = usePortfolioData();
  const { actionRequiredCount, unreadCount } = usePortfolioComments();
  const { entries: timeEntries, totalTime, isLoading: timeLoading } = useTimeEntries();
  const { otjGoal } = useComplianceTracking();
  const { userSelection, isLoading: qualLoading } = useQualifications();

  const [showCourseSelector, setShowCourseSelector] = useState(false);

  // Calculate stats
  const portfolioTotal = portfolioEntries?.length || 0;
  const portfolioCompleted = portfolioEntries?.filter(e => e.status === 'completed' || e.status === 'reviewed').length || 0;
  const portfolioPercent = portfolioTotal > 0 ? Math.round((portfolioCompleted / portfolioTotal) * 100) : 0;

  const yearlyHours = Math.round(totalTime.hours + totalTime.minutes / 60);
  const yearlyTarget = otjGoal?.target_hours || 400;
  const yearlyPercent = Math.round((yearlyHours / yearlyTarget) * 100);

  const weeklyHours = getWeeklyHours(timeEntries || []);
  const weeklyTarget = 7.5;
  const weeklyPercent = Math.round((weeklyHours / weeklyTarget) * 100);

  // Get greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const fullName = profile?.full_name || user?.email?.split('@')[0] || 'Apprentice';
  const firstName = fullName.split(' ')[0];

  // No course selected - show course selector
  if (!userSelection && !qualLoading) {
    return (
      <div className="px-4 py-6 space-y-6 lg:px-6">
        {/* Welcome Header */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground">
            {getGreeting()}, <span className="text-elec-yellow">{firstName}</span>
          </h2>
          <p className="text-muted-foreground">
            Let's get started by selecting your qualification
          </p>
        </div>

        {/* Course Selection - Full Width */}
        <QualificationSelector />
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-6 lg:px-6">
      {/* Welcome Header with Course Badge */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          {getGreeting()}, <span className="text-elec-yellow">{firstName}</span>
        </h2>
        {userSelection && (
          <button
            onClick={() => setShowCourseSelector(true)}
            className="flex items-center gap-2 h-11 text-sm text-muted-foreground hover:text-foreground transition-colors group touch-manipulation"
          >
            <GraduationCap className="h-4 w-4" />
            <span>{userSelection.qualification?.title}</span>
            <Pencil className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
          </button>
        )}
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-2 gap-3 lg:gap-4">
        {/* Portfolio Progress */}
        <ProgressCard
          title="Portfolio"
          value={portfolioPercent}
          subtitle={`${portfolioCompleted}/${portfolioTotal} items`}
          icon={Briefcase}
          color="yellow"
          onClick={() => onNavigate('work')}
        />

        {/* Weekly Hours */}
        <ProgressCard
          title="This Week"
          value={weeklyPercent}
          subtitle={`${weeklyHours.toFixed(1)}/${weeklyTarget}h`}
          icon={Clock}
          color={weeklyPercent >= 100 ? 'green' : weeklyPercent >= 75 ? 'yellow' : 'red'}
          onClick={() => onNavigate('hours')}
        />

        {/* Yearly Hours */}
        <ProgressCard
          title="This Year"
          value={yearlyPercent}
          subtitle={`${yearlyHours}/${yearlyTarget}h`}
          icon={Target}
          color="blue"
          onClick={() => onNavigate('hours')}
        />

        {/* Actions Required */}
        <ActionCard
          title="Actions"
          count={actionRequiredCount}
          subtitle="Need attention"
          icon={AlertCircle}
          onClick={() => onNavigate('me')}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={onCapture}
          className="h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-medium touch-manipulation active:scale-95"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Evidence
        </Button>
        <Button
          variant="outline"
          onClick={() => onNavigate('hours')}
          className="h-12 font-medium touch-manipulation active:scale-95"
        >
          <Timer className="h-5 w-5 mr-2" />
          Log Time
        </Button>
      </div>

      {/* Course Requirements Panel */}
      <CourseRequirementsPanel onChangeCourse={() => setShowCourseSelector(true)} />

      {/* Recent Activity */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('work')}
              className="text-muted-foreground hover:text-foreground"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {portfolioEntries?.slice(0, 4).map((entry) => (
              <ActivityItem
                key={entry.id}
                title={entry.title}
                type="evidence"
                date={new Date(entry.dateCreated)}
                status={entry.status}
              />
            ))}
            {(!portfolioEntries || portfolioEntries.length === 0) && (
              <p className="text-sm text-muted-foreground py-4 text-center">
                No activity yet. Add your first evidence!
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Course Selector Sheet */}
      <Sheet open={showCourseSelector} onOpenChange={setShowCourseSelector}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl">
          <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4" />
          <SheetHeader className="pb-4">
            <SheetTitle>Change Qualification</SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto pb-20 sm:pb-8">
            <QualificationSelector />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// Progress card component
function ProgressCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  onClick,
}: {
  title: string;
  value: number;
  subtitle: string;
  icon: typeof Clock;
  color: 'yellow' | 'green' | 'blue' | 'red';
  onClick: () => void;
}) {
  const colorClasses = {
    yellow: 'text-elec-yellow bg-elec-yellow/10',
    green: 'text-green-500 bg-green-500/10',
    blue: 'text-blue-500 bg-blue-500/10',
    red: 'text-red-500 bg-red-500/10',
  };

  const progressColors = {
    yellow: 'bg-elec-yellow',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    red: 'bg-red-500',
  };

  return (
    <button
      onClick={onClick}
      className="p-4 rounded-xl bg-card border border-border text-left active:scale-[0.98] transition-transform touch-manipulation"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn('p-2 rounded-lg', colorClasses[color])}>
          <Icon className="h-4 w-4" />
        </div>
        <span className="text-2xl font-bold text-foreground">{Math.min(value, 100)}%</span>
      </div>
      <div className="space-y-2">
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all', progressColors[color])}
            style={{ width: `${Math.min(value, 100)}%` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">{title}</span>
          <span className="text-xs text-muted-foreground">{subtitle}</span>
        </div>
      </div>
    </button>
  );
}

// Action card component
function ActionCard({
  title,
  count,
  subtitle,
  icon: Icon,
  onClick,
}: {
  title: string;
  count: number;
  subtitle: string;
  icon: typeof AlertCircle;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="p-4 rounded-xl bg-card border border-border text-left active:scale-[0.98] transition-transform touch-manipulation"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn(
          'p-2 rounded-lg',
          count > 0 ? 'text-orange-500 bg-orange-500/10' : 'text-green-500 bg-green-500/10'
        )}>
          <Icon className="h-4 w-4" />
        </div>
        {count > 0 && (
          <Badge variant="destructive" className="text-xs">
            {count}
          </Badge>
        )}
      </div>
      <div className="space-y-1">
        <span className="text-sm font-medium text-foreground">{title}</span>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </button>
  );
}

// Activity item component
function ActivityItem({
  title,
  type,
  date,
  status,
}: {
  title: string;
  type: 'evidence' | 'time' | 'comment';
  date: Date;
  status?: string;
}) {
  const icons = {
    evidence: FileCheck,
    time: Clock,
    comment: MessageSquare,
  };
  const Icon = icons[type];

  return (
    <div className="flex items-center gap-3 py-2">
      <div className="p-2 rounded-lg bg-muted">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{title}</p>
        <p className="text-xs text-muted-foreground">
          {formatRelativeDate(date)}
        </p>
      </div>
      {status && (
        <Badge
          variant="outline"
          className={cn(
            'text-[10px]',
            status === 'completed' || status === 'reviewed'
              ? 'border-green-500/30 text-green-500'
              : status === 'in-progress'
              ? 'border-blue-500/30 text-blue-500'
              : 'border-muted-foreground/30 text-muted-foreground'
          )}
        >
          {status}
        </Badge>
      )}
    </div>
  );
}

// Helper: Get hours logged this week
function getWeeklyHours(entries: any[]): number {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Monday
  startOfWeek.setHours(0, 0, 0, 0);

  return entries
    .filter((e) => new Date(e.date) >= startOfWeek)
    .reduce((sum, e) => sum + (e.duration || 0) / 60, 0);
}

// Helper: Format relative date
function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export default UnifiedDashboard;
