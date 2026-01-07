import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Clock,
  Target,
  MessageCircle,
  ChevronRight,
  Sparkles,
  Camera,
  FileText,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import { ProgressRingsGroup, MiniProgressRing } from './ProgressRings';
import { NavSection } from './PortfolioHubNav';

interface PortfolioOverviewProps {
  userName?: string;
  portfolioProgress: { current: number; target: number };
  otjProgress: { current: number; target: number };
  pendingReviews: number;
  recentActivity: ActivityItem[];
  nextAction?: NextAction;
  onNavigate: (section: NavSection) => void;
  onQuickCapture: () => void;
}

interface ActivityItem {
  id: string;
  type: 'evidence_added' | 'review_received' | 'hours_logged' | 'ksb_completed' | 'milestone';
  title: string;
  description?: string;
  timestamp: Date;
  metadata?: {
    rating?: number;
    hours?: number;
    ksbName?: string;
  };
}

interface NextAction {
  type: 'capture' | 'review' | 'hours' | 'ksb';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}

/**
 * PortfolioOverview - Dashboard home screen for the Portfolio Hub
 *
 * Mobile-first design with:
 * - Personalized welcome
 * - Progress rings
 * - Smart next action suggestion
 * - Recent activity timeline
 * - Quick access cards
 */
export function PortfolioOverview({
  userName = 'Apprentice',
  portfolioProgress,
  otjProgress,
  pendingReviews,
  recentActivity,
  nextAction,
  onNavigate,
  onQuickCapture,
}: PortfolioOverviewProps) {
  // Get time-based greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const firstName = userName.split(' ')[0];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Welcome Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          {greeting}, {firstName}
        </h1>
        <p className="text-muted-foreground">
          Here's your portfolio progress at a glance
        </p>
      </div>

      {/* Progress Rings */}
      <Card className="border-elec-yellow/20 bg-gradient-to-br from-elec-yellow/5 to-transparent overflow-hidden">
        <CardContent className="pt-6 pb-4">
          <ProgressRingsGroup
            portfolio={portfolioProgress}
            otjHours={otjProgress}
            reviews={pendingReviews > 0 ? { pending: pendingReviews, completed: 0 } : undefined}
          />
        </CardContent>
      </Card>

      {/* Smart Next Action */}
      {nextAction && (
        <NextActionCard
          action={nextAction}
          onAction={() => {
            if (nextAction.type === 'capture') onQuickCapture();
            else if (nextAction.type === 'review') onNavigate('tutor');
            else if (nextAction.type === 'hours') onNavigate('progress');
            else onNavigate('evidence');
          }}
        />
      )}

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-3">
        <QuickActionCard
          icon={Camera}
          label="Capture Evidence"
          description="Add new portfolio item"
          onClick={onQuickCapture}
          color="bg-blue-500"
        />
        <QuickActionCard
          icon={Clock}
          label="Log Hours"
          description="Track OTJ time"
          onClick={() => onNavigate('progress')}
          color="bg-purple-500"
        />
        <QuickActionCard
          icon={MessageCircle}
          label="Tutor Chat"
          description={pendingReviews > 0 ? `${pendingReviews} pending` : 'No new messages'}
          onClick={() => onNavigate('tutor')}
          color="bg-green-500"
          badge={pendingReviews > 0 ? pendingReviews : undefined}
        />
        <QuickActionCard
          icon={Target}
          label="View Progress"
          description="KSB tracking"
          onClick={() => onNavigate('progress')}
          color="bg-amber-500"
        />
      </div>

      {/* Recent Activity */}
      <Card className="border-border">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-elec-yellow" />
              Recent Activity
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:text-foreground"
              onClick={() => onNavigate('evidence')}
            >
              View All
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {recentActivity.length === 0 ? (
            <EmptyActivity onCapture={onQuickCapture} />
          ) : (
            <div className="space-y-3">
              {recentActivity.slice(0, 5).map((item) => (
                <ActivityItemRow key={item.id} item={item} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Next Action Card
function NextActionCard({
  action,
  onAction,
}: {
  action: NextAction;
  onAction: () => void;
}) {
  const priorityColors = {
    high: 'bg-red-500/10 border-red-500/30 text-red-500',
    medium: 'bg-amber-500/10 border-amber-500/30 text-amber-500',
    low: 'bg-blue-500/10 border-blue-500/30 text-blue-500',
  };

  const icons = {
    capture: Camera,
    review: MessageCircle,
    hours: Clock,
    ksb: Target,
  };

  const Icon = icons[action.type];

  return (
    <Card className={cn(
      "border overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform",
      priorityColors[action.priority]
    )}>
      <CardContent className="p-4" onClick={onAction}>
        <div className="flex items-start gap-3">
          <div className={cn(
            "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
            action.priority === 'high' ? 'bg-red-500' :
            action.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
          )}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-3.5 w-3.5 text-elec-yellow" />
              <span className="text-xs font-medium text-muted-foreground">Your next step</span>
            </div>
            <h3 className="font-semibold text-foreground">{action.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1">{action.description}</p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
        </div>
      </CardContent>
    </Card>
  );
}

// Quick Action Card
function QuickActionCard({
  icon: Icon,
  label,
  description,
  onClick,
  color,
  badge,
}: {
  icon: typeof Camera;
  label: string;
  description: string;
  onClick: () => void;
  color: string;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-start p-4 rounded-xl",
        "bg-card border border-border",
        "hover:border-elec-yellow/30 hover:bg-elec-yellow/5",
        "transition-all duration-200",
        "text-left active:scale-95"
      )}
    >
      <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center mb-3", color)}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <span className="font-medium text-foreground text-sm">{label}</span>
      <span className="text-xs text-muted-foreground">{description}</span>

      {badge !== undefined && badge > 0 && (
        <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 min-w-[20px] flex items-center justify-center px-1">
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </button>
  );
}

// Activity Item Row
function ActivityItemRow({ item }: { item: ActivityItem }) {
  const typeConfig = {
    evidence_added: { icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    review_received: { icon: MessageCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
    hours_logged: { icon: Clock, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    ksb_completed: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    milestone: { icon: Target, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  };

  const config = typeConfig[item.type];
  const Icon = config.icon;

  const timeAgo = getTimeAgo(item.timestamp);

  return (
    <div className="flex items-start gap-3 py-2">
      <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center shrink-0", config.bg)}>
        <Icon className={cn("h-4 w-4", config.color)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground line-clamp-1">{item.title}</p>
        {item.description && (
          <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
        )}
      </div>
      <span className="text-xs text-muted-foreground whitespace-nowrap">{timeAgo}</span>
    </div>
  );
}

// Empty Activity State
function EmptyActivity({ onCapture }: { onCapture: () => void }) {
  return (
    <div className="py-8 text-center">
      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
        <AlertCircle className="h-6 w-6 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium text-foreground mb-1">No activity yet</p>
      <p className="text-xs text-muted-foreground mb-4">Start building your portfolio today</p>
      <Button onClick={onCapture} size="sm" className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
        <Camera className="h-4 w-4 mr-2" />
        Capture First Evidence
      </Button>
    </div>
  );
}

// Time ago helper
function getTimeAgo(date: Date): string {
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
}

export default PortfolioOverview;
