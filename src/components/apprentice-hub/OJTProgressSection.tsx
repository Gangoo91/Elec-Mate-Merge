/**
 * OJTProgressSection
 *
 * Hours tab content - OJT time tracking with:
 * - Weekly and yearly progress
 * - Quick log and timer
 * - Recent sessions
 */

import { useState } from 'react';
import {
  Clock,
  Plus,
  Play,
  Pause,
  Square,
  Calendar,
  TrendingUp,
  ChevronRight,
  Timer,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useTimeEntries } from '@/hooks/time-tracking/useTimeEntries';
import { useComplianceTracking } from '@/hooks/time-tracking/useComplianceTracking';
import { useToast } from '@/hooks/use-toast';

const ACTIVITY_TYPES = [
  { value: 'workshop', label: 'Workshop Training' },
  { value: 'college', label: 'College Session' },
  { value: 'online', label: 'Online Learning' },
  { value: 'practical', label: 'Practical Assessment' },
  { value: 'study', label: 'Self Study' },
  { value: 'site-visit', label: 'Site Visit/Tour' },
  { value: 'mentoring', label: 'Mentoring Session' },
  { value: 'safety', label: 'Safety Training' },
];

export function OJTProgressSection() {
  const { toast } = useToast();
  const { entries, totalTime, addTimeEntry, isLoading } = useTimeEntries();
  const { otjGoal } = useComplianceTracking();

  // Timer state
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActivity, setTimerActivity] = useState('');

  // Quick log sheet
  const [showQuickLog, setShowQuickLog] = useState(false);
  const [logData, setLogData] = useState({
    activity: '',
    type: '',
    duration: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  // Calculate stats
  const yearlyHours = Math.round(totalTime.hours + totalTime.minutes / 60);
  const yearlyTarget = otjGoal?.target_hours || 400;
  const yearlyPercent = Math.round((yearlyHours / yearlyTarget) * 100);

  const weeklyHours = getWeeklyHours(entries || []);
  const weeklyTarget = 7.5;
  const weeklyPercent = Math.round((weeklyHours / weeklyTarget) * 100);

  // Recent sessions
  const recentSessions = (entries || []).slice(0, 10);

  // Timer controls
  const startTimer = () => {
    setTimerActive(true);
    // In a real implementation, use setInterval
  };

  const pauseTimer = () => {
    setTimerActive(false);
  };

  const stopTimer = async () => {
    if (timerSeconds > 60) {
      await addTimeEntry({
        date: new Date().toISOString().split('T')[0],
        duration: Math.round(timerSeconds / 60),
        activity: timerActivity || 'Training Session',
        notes: '',
      });
      toast({
        title: 'Time logged',
        description: `${Math.round(timerSeconds / 60)} minutes added`,
      });
    }
    setTimerActive(false);
    setTimerSeconds(0);
    setTimerActivity('');
  };

  // Quick log submit
  const handleSubmitLog = async () => {
    if (!logData.activity || !logData.duration) {
      toast({
        title: 'Missing information',
        description: 'Please fill in activity and duration',
        variant: 'destructive',
      });
      return;
    }

    const durationMinutes = parseFloat(logData.duration) * 60;

    await addTimeEntry({
      date: logData.date,
      duration: durationMinutes,
      activity: logData.activity,
      notes: logData.notes,
    });

    toast({
      title: 'Time logged',
      description: `${logData.duration}h added successfully`,
    });

    setLogData({
      activity: '',
      type: '',
      duration: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    });
    setShowQuickLog(false);
  };

  // Get week color based on progress
  const getWeekColor = () => {
    if (weeklyPercent >= 100) return 'green';
    if (weeklyPercent >= 75) return 'yellow';
    if (weeklyPercent >= 50) return 'orange';
    return 'red';
  };

  return (
    <div className="px-4 py-6 space-y-6 lg:px-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-foreground">Off-the-Job Training</h2>
        <p className="text-sm text-muted-foreground">
          Track your 20% off-the-job training hours
        </p>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Weekly Progress */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-3xl font-bold text-foreground">
                  {weeklyHours.toFixed(1)}
                  <span className="text-lg text-muted-foreground">/{weeklyTarget}h</span>
                </p>
              </div>
              <div
                className={cn(
                  'p-2 rounded-lg',
                  getWeekColor() === 'green' && 'bg-green-500/10',
                  getWeekColor() === 'yellow' && 'bg-elec-yellow/10',
                  getWeekColor() === 'orange' && 'bg-orange-500/10',
                  getWeekColor() === 'red' && 'bg-red-500/10'
                )}
              >
                <Clock
                  className={cn(
                    'h-5 w-5',
                    getWeekColor() === 'green' && 'text-green-500',
                    getWeekColor() === 'yellow' && 'text-elec-yellow',
                    getWeekColor() === 'orange' && 'text-orange-500',
                    getWeekColor() === 'red' && 'text-red-500'
                  )}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all',
                    getWeekColor() === 'green' && 'bg-green-500',
                    getWeekColor() === 'yellow' && 'bg-elec-yellow',
                    getWeekColor() === 'orange' && 'bg-orange-500',
                    getWeekColor() === 'red' && 'bg-red-500'
                  )}
                  style={{ width: `${Math.min(weeklyPercent, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {weeklyPercent >= 100
                  ? 'Target achieved!'
                  : `${(weeklyTarget - weeklyHours).toFixed(1)}h remaining`}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Yearly Progress */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-muted-foreground">This Year</p>
                <p className="text-3xl font-bold text-foreground">
                  {yearlyHours}
                  <span className="text-lg text-muted-foreground">/{yearlyTarget}h</span>
                </p>
              </div>
              <div className="p-2 rounded-lg bg-blue-500/10">
                <TrendingUp className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${Math.min(yearlyPercent, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {yearlyPercent}% complete • {yearlyTarget - yearlyHours}h remaining
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={() => setShowQuickLog(true)}
          className="h-14 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-medium"
        >
          <Plus className="h-5 w-5 mr-2" />
          Log Time
        </Button>
        <Button
          variant="outline"
          onClick={timerActive ? pauseTimer : startTimer}
          className="h-14 font-medium"
        >
          {timerActive ? (
            <>
              <Pause className="h-5 w-5 mr-2" />
              Pause Timer
            </>
          ) : (
            <>
              <Play className="h-5 w-5 mr-2" />
              Start Timer
            </>
          )}
        </Button>
      </div>

      {/* Active Timer (if running) */}
      {(timerActive || timerSeconds > 0) && (
        <Card className="bg-elec-yellow/10 border-elec-yellow/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-elec-yellow/20 animate-pulse">
                  <Timer className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {timerActivity || 'Training Session'}
                  </p>
                  <p className="text-2xl font-mono font-bold text-elec-yellow">
                    {formatTime(timerSeconds)}
                  </p>
                </div>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={stopTimer}
              >
                <Square className="h-4 w-4 mr-1" />
                Stop
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Sessions */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Recent Sessions</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {recentSessions.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No sessions logged yet
            </p>
          ) : (
            <div className="space-y-3">
              {recentSessions.map((session: any) => (
                <div
                  key={session.id}
                  className="flex items-center gap-3 py-2 border-b border-border last:border-0"
                >
                  <div className="p-2 rounded-lg bg-muted">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {session.activity}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(session.date).toLocaleDateString('en-GB', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      {(session.duration / 60).toFixed(1)}h
                    </p>
                    <Badge
                      variant="outline"
                      className={cn(
                        'text-[10px]',
                        session.isAutomatic
                          ? 'border-blue-500/30 text-blue-500'
                          : 'border-muted-foreground/30 text-muted-foreground'
                      )}
                    >
                      {session.isAutomatic ? 'Auto' : 'Manual'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Log Sheet */}
      <Sheet open={showQuickLog} onOpenChange={setShowQuickLog}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
          <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4" />
          <SheetHeader>
            <SheetTitle>Log Training Time</SheetTitle>
            <SheetDescription>
              Record your off-the-job training hours
            </SheetDescription>
          </SheetHeader>

          <div className="space-y-4 mt-6">
            {/* Activity Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Activity Type</label>
              <Select
                value={logData.type}
                onValueChange={(value) => {
                  const type = ACTIVITY_TYPES.find((t) => t.value === value);
                  setLogData({
                    ...logData,
                    type: value,
                    activity: type?.label || '',
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {ACTIVITY_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Activity Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input
                placeholder="What did you work on?"
                value={logData.activity}
                onChange={(e) =>
                  setLogData({ ...logData, activity: e.target.value })
                }
              />
            </div>

            {/* Duration & Date */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Duration (hours)</label>
                <Input
                  type="number"
                  step="0.5"
                  min="0.5"
                  placeholder="e.g., 2.5"
                  value={logData.duration}
                  onChange={(e) =>
                    setLogData({ ...logData, duration: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={logData.date}
                  onChange={(e) =>
                    setLogData({ ...logData, date: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Notes (optional)</label>
              <Textarea
                placeholder="Any additional details..."
                value={logData.notes}
                onChange={(e) =>
                  setLogData({ ...logData, notes: e.target.value })
                }
                rows={2}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 pb-8">
              <Button
                variant="outline"
                onClick={() => setShowQuickLog(false)}
                className="flex-1 h-12"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitLog}
                className="flex-1 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                Log Time
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

// Helper: Get hours logged this week
function getWeeklyHours(entries: any[]): number {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1);
  startOfWeek.setHours(0, 0, 0, 0);

  return entries
    .filter((e) => new Date(e.date) >= startOfWeek)
    .reduce((sum, e) => sum + (e.duration || 0) / 60, 0);
}

// Helper: Format seconds to HH:MM:SS
function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export default OJTProgressSection;
