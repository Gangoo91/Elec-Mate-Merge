import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
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
import {
  Clock,
  Plus,
  Play,
  Pause,
  Square,
  Calendar,
  ChevronRight,
  Filter,
  CheckCircle2,
  TrendingUp,
  Timer,
  Zap,
} from 'lucide-react';
import { useTimeEntries } from '@/hooks/time-tracking/useTimeEntries';
import { useToast } from '@/hooks/use-toast';

const ACTIVITY_TYPES = [
  { value: 'workshop', label: 'Workshop Training', icon: '🔧' },
  { value: 'college', label: 'College Session', icon: '🎓' },
  { value: 'online', label: 'Online Learning', icon: '💻' },
  { value: 'practical', label: 'Practical Assessment', icon: '⚡' },
  { value: 'study', label: 'Self Study', icon: '📚' },
  { value: 'site-visit', label: 'Site Visit/Tour', icon: '🏗️' },
  { value: 'mentoring', label: 'Mentoring Session', icon: '👥' },
  { value: 'safety', label: 'Safety Training', icon: '🦺' },
];

/**
 * TimeSection - Time tracking section for OJT Hub
 *
 * Features:
 * - Weekly progress overview
 * - Quick time entry
 * - Live timer
 * - Session history with filters
 * - Activity type categorization
 */
export function TimeSection() {
  const { entries, totalTime, addTimeEntry, isLoading } = useTimeEntries();
  const { toast } = useToast();

  const [showAddEntry, setShowAddEntry] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActivity, setTimerActivity] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);

  // Form state
  const [newEntry, setNewEntry] = useState({
    activity: '',
    type: '',
    duration: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  // Calculate weekly progress (7.5h target for 37.5h work week)
  const weeklyTarget = 7.5;
  const weeklyHours = getWeeklyHours(entries);
  const weeklyPercent = Math.round((weeklyHours / weeklyTarget) * 100);

  // Filter entries
  const filteredEntries = filterType
    ? entries.filter((e) => e.activity.toLowerCase().includes(filterType.toLowerCase()))
    : entries;

  const handleAddEntry = async () => {
    if (!newEntry.activity || !newEntry.duration) {
      toast({
        title: 'Missing information',
        description: 'Please fill in activity and duration',
        variant: 'destructive',
      });
      return;
    }

    const durationMinutes = parseFloat(newEntry.duration) * 60;

    await addTimeEntry({
      date: newEntry.date,
      duration: durationMinutes,
      activity: newEntry.activity,
      notes: newEntry.notes,
    });

    setNewEntry({
      activity: '',
      type: '',
      duration: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    });
    setShowAddEntry(false);

    toast({
      title: 'Time logged',
      description: `${newEntry.duration}h added for ${newEntry.activity}`,
    });
  };

  const toggleTimer = () => {
    if (!isTimerActive && !timerActivity) {
      toast({
        title: 'Select activity',
        description: 'Please select an activity type before starting',
        variant: 'destructive',
      });
      return;
    }
    setIsTimerActive(!isTimerActive);
  };

  const stopTimer = async () => {
    if (timerSeconds < 60) {
      toast({
        title: 'Too short',
        description: 'Session must be at least 1 minute',
        variant: 'destructive',
      });
      return;
    }

    await addTimeEntry({
      date: new Date().toISOString().split('T')[0],
      duration: Math.round(timerSeconds / 60),
      activity: timerActivity,
      notes: 'Recorded via live timer',
    });

    setIsTimerActive(false);
    setTimerSeconds(0);
    setTimerActivity('');

    toast({
      title: 'Session saved',
      description: `${formatTimerDisplay(timerSeconds)} logged for ${timerActivity}`,
    });
  };

  // Timer effect
  useState(() => {
    if (!isTimerActive) return;

    const interval = setInterval(() => {
      setTimerSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  });

  return (
    <>
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Time Tracking</h1>
            <p className="text-sm text-muted-foreground">Log your off-the-job training hours</p>
          </div>
          <Button
            onClick={() => setShowAddEntry(true)}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 gap-2"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Log Time</span>
          </Button>
        </div>

        {/* Weekly Progress Card */}
        <Card className={cn(
          "border-2",
          weeklyPercent >= 100 ? "border-green-500/30 bg-green-500/5" :
          weeklyPercent >= 75 ? "border-elec-yellow/30 bg-elec-yellow/5" :
          "border-amber-500/30 bg-amber-500/5"
        )}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">This Week</p>
                <div className="flex items-end gap-1 mt-1">
                  <span className="text-3xl font-bold text-foreground">
                    {weeklyHours.toFixed(1)}
                  </span>
                  <span className="text-lg text-muted-foreground mb-0.5">
                    / {weeklyTarget}h
                  </span>
                </div>
              </div>
              <div className="text-right">
                {weeklyPercent >= 100 ? (
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="font-medium">Complete!</span>
                  </div>
                ) : (
                  <div className="text-muted-foreground">
                    <span className="text-2xl font-bold text-foreground">{weeklyPercent}%</span>
                    <p className="text-xs">{(weeklyTarget - weeklyHours).toFixed(1)}h to go</p>
                  </div>
                )}
              </div>
            </div>
            <Progress value={Math.min(weeklyPercent, 100)} className="h-3" />
          </CardContent>
        </Card>

        {/* Live Timer Card */}
        <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-yellow/5 to-transparent">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-12 w-12 rounded-xl flex items-center justify-center",
                  isTimerActive ? "bg-green-500/20 animate-pulse" : "bg-elec-yellow/20"
                )}>
                  <Timer className={cn(
                    "h-6 w-6",
                    isTimerActive ? "text-green-500" : "text-elec-yellow"
                  )} />
                </div>
                <div>
                  <p className="font-mono text-2xl font-bold text-foreground">
                    {formatTimerDisplay(timerSeconds)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isTimerActive ? timerActivity || 'Training in progress...' : 'Start a live session'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!isTimerActive && (
                  <Select value={timerActivity} onValueChange={setTimerActivity}>
                    <SelectTrigger className="w-[140px] h-9 text-xs">
                      <SelectValue placeholder="Activity type" />
                    </SelectTrigger>
                    <SelectContent>
                      {ACTIVITY_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.label}>
                          <span className="flex items-center gap-2">
                            <span>{type.icon}</span>
                            <span>{type.label}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <Button
                  size="icon"
                  onClick={toggleTimer}
                  className={cn(
                    "h-10 w-10 rounded-full",
                    isTimerActive
                      ? "bg-amber-500 hover:bg-amber-600"
                      : "bg-green-500 hover:bg-green-600"
                  )}
                >
                  {isTimerActive ? (
                    <Pause className="h-5 w-5 text-white" />
                  ) : (
                    <Play className="h-5 w-5 text-white ml-0.5" />
                  )}
                </Button>
                {isTimerActive && timerSeconds > 0 && (
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={stopTimer}
                    className="h-10 w-10 rounded-full"
                  >
                    <Square className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-border">
            <CardContent className="p-3 text-center">
              <p className="text-xl font-bold text-foreground">{entries.length}</p>
              <p className="text-xs text-muted-foreground">Sessions</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-3 text-center">
              <p className="text-xl font-bold text-foreground">
                {Math.round(totalTime.hours + totalTime.minutes / 60)}h
              </p>
              <p className="text-xs text-muted-foreground">Total Hours</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-3 text-center">
              <p className="text-xl font-bold text-foreground">
                {entries.length > 0 ? Math.round((totalTime.hours * 60 + totalTime.minutes) / entries.length) : 0}m
              </p>
              <p className="text-xs text-muted-foreground">Avg Session</p>
            </CardContent>
          </Card>
        </div>

        {/* Session History */}
        <Card className="border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4 text-elec-yellow" />
                Recent Sessions
              </CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {isLoading ? (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-muted/50 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : filteredEntries.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="font-medium text-foreground">No sessions logged</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Start tracking your off-the-job training
                </p>
                <Button
                  variant="link"
                  onClick={() => setShowAddEntry(true)}
                  className="text-elec-yellow mt-2"
                >
                  Log your first session
                </Button>
              </div>
            ) : (
              filteredEntries.slice(0, 10).map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="h-10 w-10 rounded-lg bg-elec-yellow/10 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-elec-yellow" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {entry.activity}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(entry.date).toLocaleDateString('en-GB', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                      })}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-foreground">
                      {formatDuration(entry.duration)}
                    </p>
                    {entry.isAutomatic && (
                      <Badge variant="secondary" className="text-[10px]">
                        <Zap className="h-2.5 w-2.5 mr-0.5" />
                        Auto
                      </Badge>
                    )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Guidelines */}
        <Card className="border-border bg-muted/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">What counts as off-the-job training?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• College/training provider sessions</li>
              <li>• Online learning and courses</li>
              <li>• Shadowing and mentoring</li>
              <li>• Practical skills practice</li>
              <li>• Written assignments and projects</li>
              <li>• Industry visits and events</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Add Entry Sheet */}
      <Sheet open={showAddEntry} onOpenChange={setShowAddEntry}>
        <SheetContent side="bottom" className="h-[85vh] sm:h-auto sm:max-h-[85vh]">
          <SheetHeader>
            <SheetTitle>Log Training Time</SheetTitle>
            <SheetDescription>
              Record your off-the-job training hours
            </SheetDescription>
          </SheetHeader>
          <div className="space-y-4 mt-4">
            {/* Activity Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Activity Type</label>
              <Select
                value={newEntry.type}
                onValueChange={(value) => {
                  const type = ACTIVITY_TYPES.find((t) => t.value === value);
                  setNewEntry({
                    ...newEntry,
                    type: value,
                    activity: type?.label || '',
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select activity type" />
                </SelectTrigger>
                <SelectContent>
                  {ACTIVITY_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <span className="flex items-center gap-2">
                        <span>{type.icon}</span>
                        <span>{type.label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Activity Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input
                placeholder="e.g., Cable sizing calculations workshop"
                value={newEntry.activity}
                onChange={(e) => setNewEntry({ ...newEntry, activity: e.target.value })}
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
                  value={newEntry.duration}
                  onChange={(e) => setNewEntry({ ...newEntry, duration: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={newEntry.date}
                  onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Notes (optional)</label>
              <Textarea
                placeholder="Any additional details..."
                value={newEntry.notes}
                onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                rows={3}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setShowAddEntry(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddEntry}
                className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90"
              >
                Log Time
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
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
    .reduce((sum, e) => sum + e.duration / 60, 0);
}

// Helper: Format duration in minutes to readable string
function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

// Helper: Format timer display
function formatTimerDisplay(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export default TimeSection;
