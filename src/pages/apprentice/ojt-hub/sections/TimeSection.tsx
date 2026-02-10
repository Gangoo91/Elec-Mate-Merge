import { useState, useEffect, useRef } from 'react';
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
  CheckCircle2,
  Timer,
  Zap,
  ShieldCheck,
  MapPin,
  User,
  FileText,
  ChevronRight,
} from 'lucide-react';
import { useTimeEntries } from '@/hooks/time-tracking/useTimeEntries';
import { useToast } from '@/hooks/use-toast';
import TimeEntryCard from '@/components/apprentice/time-tracking/TimeEntryCard';

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

const DURATION_PRESETS = [
  { value: '0.5', label: '30m' },
  { value: '1', label: '1h' },
  { value: '1.5', label: '1.5h' },
  { value: '2', label: '2h' },
  { value: '3', label: '3h' },
  { value: '4', label: '4h' },
  { value: '7.5', label: '7.5h' },
];

/**
 * TimeSection - Time tracking section for OJT Hub
 *
 * Features:
 * - Weekly progress overview
 * - Redesigned entry form with location/supervisor
 * - Live timer
 * - Rich session history cards with verify buttons
 * - Activity type categorisation
 */
export function TimeSection() {
  const { entries, totalTime, addTimeEntry, isLoading } = useTimeEntries();
  const { toast } = useToast();

  const [showAddEntry, setShowAddEntry] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActivity, setTimerActivity] = useState('');
  const [showAllSessions, setShowAllSessions] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Form state
  const [newEntry, setNewEntry] = useState({
    activity: '',
    type: '',
    duration: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    location: '',
    supervisor: '',
  });

  // Calculate weekly progress (7.5h target for 37.5h work week)
  const weeklyTarget = 7.5;
  const weeklyHours = getWeeklyHours(entries);
  const weeklyPercent = Math.round((weeklyHours / weeklyTarget) * 100);

  const handleAddEntry = async () => {
    if (!newEntry.activity || !newEntry.duration) {
      toast({
        title: 'Missing information',
        description: 'Please fill in activity type and duration',
        variant: 'destructive',
      });
      return;
    }

    const durationMinutes = parseFloat(newEntry.duration) * 60;

    if (isNaN(durationMinutes) || durationMinutes <= 0) {
      toast({
        title: 'Invalid duration',
        description: 'Please enter a valid duration',
        variant: 'destructive',
      });
      return;
    }

    // Build notes with location/supervisor info
    const noteParts: string[] = [];
    if (newEntry.location) noteParts.push(`Location: ${newEntry.location}`);
    if (newEntry.supervisor) noteParts.push(`Supervisor: ${newEntry.supervisor}`);
    if (newEntry.notes) noteParts.push(newEntry.notes);
    const combinedNotes = noteParts.join(' | ');

    await addTimeEntry({
      date: newEntry.date,
      duration: durationMinutes,
      activity: newEntry.activity,
      notes: combinedNotes,
    });

    setNewEntry({
      activity: '',
      type: '',
      duration: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      location: '',
      supervisor: '',
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
  useEffect(() => {
    if (!isTimerActive) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTimerSeconds((s) => s + 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isTimerActive]);

  // How many to show in compact view
  const visibleEntries = showAllSessions ? entries : entries.slice(0, 5);

  return (
    <>
      <div className="p-4 sm:p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Time Tracking</h1>
            <p className="text-sm text-muted-foreground">Log your off-the-job training hours</p>
          </div>
          <Button
            onClick={() => setShowAddEntry(true)}
            className="h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 gap-2 touch-manipulation active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Log Time
          </Button>
        </div>

        {/* Weekly Progress Card */}
        <Card
          className={cn(
            'border-2',
            weeklyPercent >= 100
              ? 'border-green-500/30 bg-green-500/5'
              : weeklyPercent >= 75
                ? 'border-elec-yellow/30 bg-elec-yellow/5'
                : 'border-amber-500/30 bg-amber-500/5'
          )}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">This Week</p>
                <div className="flex items-end gap-1 mt-1">
                  <span className="text-3xl font-bold text-foreground">
                    {weeklyHours.toFixed(1)}
                  </span>
                  <span className="text-lg text-muted-foreground mb-0.5">/ {weeklyTarget}h</span>
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
                <div
                  className={cn(
                    'h-12 w-12 rounded-xl flex items-center justify-center',
                    isTimerActive ? 'bg-green-500/20 animate-pulse' : 'bg-elec-yellow/20'
                  )}
                >
                  <Timer
                    className={cn('h-6 w-6', isTimerActive ? 'text-green-500' : 'text-elec-yellow')}
                  />
                </div>
                <div>
                  <p className="font-mono text-2xl font-bold text-foreground">
                    {formatTimerDisplay(timerSeconds)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isTimerActive
                      ? timerActivity || 'Training in progress...'
                      : 'Start a live session'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!isTimerActive && (
                  <Select value={timerActivity} onValueChange={setTimerActivity}>
                    <SelectTrigger className="w-[120px] sm:w-[140px] h-11 text-xs touch-manipulation">
                      <SelectValue placeholder="Activity" />
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
                    'h-11 w-11 rounded-full touch-manipulation active:scale-95',
                    isTimerActive
                      ? 'bg-amber-500 hover:bg-amber-600'
                      : 'bg-green-500 hover:bg-green-600'
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
                    className="h-11 w-11 rounded-full touch-manipulation active:scale-95"
                  >
                    <Square className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <Card className="border-border">
            <CardContent className="p-2 sm:p-3 text-center">
              <p className="text-lg sm:text-xl font-bold text-foreground">{entries.length}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Sessions</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-2 sm:p-3 text-center">
              <p className="text-lg sm:text-xl font-bold text-foreground">
                {Math.round(totalTime.hours + totalTime.minutes / 60)}h
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Total Hours</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-2 sm:p-3 text-center">
              <p className="text-lg sm:text-xl font-bold text-foreground">
                {entries.length > 0
                  ? Math.round((totalTime.hours * 60 + totalTime.minutes) / entries.length)
                  : 0}
                m
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Avg Session</p>
            </CardContent>
          </Card>
        </div>

        {/* Session History */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4 text-elec-yellow" />
              Recent Sessions
            </h2>
            {entries.length > 5 && (
              <button
                onClick={() => setShowAllSessions(!showAllSessions)}
                className="text-xs text-elec-yellow font-medium flex items-center gap-1 touch-manipulation"
              >
                {showAllSessions ? 'Show less' : `View all ${entries.length}`}
                <ChevronRight className="h-3 w-3" />
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-muted/50 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : entries.length === 0 ? (
            <Card className="border-border">
              <CardContent className="py-10 text-center">
                <Clock className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="font-medium text-foreground">No sessions logged</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Start tracking your off-the-job training
                </p>
                <Button
                  onClick={() => setShowAddEntry(true)}
                  className="mt-4 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Log your first session
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {visibleEntries.map((entry) => (
                <TimeEntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          )}
        </div>

        {/* Guidelines */}
        <Card className="border-border bg-muted/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              What counts as off-the-job training?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>College/training provider sessions</li>
              <li>Online learning and courses</li>
              <li>Shadowing and mentoring</li>
              <li>Practical skills practice</li>
              <li>Written assignments and projects</li>
              <li>Industry visits and events</li>
            </ul>
          </CardContent>
        </Card>

        {/* Bottom safe area */}
        <div className="h-4" />
      </div>

      {/* Add Entry Sheet — Redesigned */}
      <Sheet open={showAddEntry} onOpenChange={setShowAddEntry}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 rounded-t-2xl overflow-hidden [&>button.absolute]:hidden sm:max-w-[640px] sm:mx-auto"
        >
          <div className="flex flex-col h-full bg-background">
            {/* Drag handle + Header */}
            <SheetHeader className="flex-shrink-0 border-b border-border px-4 pt-3 pb-4">
              <div className="flex justify-center pb-2">
                <div className="h-1 w-10 rounded-full bg-white/30" />
              </div>
              <SheetTitle className="text-lg font-bold text-foreground">
                Log Training Time
              </SheetTitle>
              <p className="text-sm text-muted-foreground">
                Record your off-the-job training hours
              </p>
            </SheetHeader>

            {/* Scrollable form */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-5">
              {/* Section: Activity Type */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 border-l-2 border-l-elec-yellow/60 pl-3">
                  <span className="text-sm font-semibold text-foreground">Activity Type</span>
                </div>
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
                  <SelectTrigger className="h-12 touch-manipulation text-base bg-muted/50 border-border focus:border-elec-yellow focus:ring-elec-yellow">
                    <SelectValue placeholder="Select activity type" />
                  </SelectTrigger>
                  <SelectContent className="z-[100] bg-background border-border">
                    {ACTIVITY_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value} className="py-3">
                        <span className="flex items-center gap-3">
                          <span className="text-lg">{type.icon}</span>
                          <span className="text-sm">{type.label}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Section: Description */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 border-l-2 border-l-blue-500/60 pl-3">
                  <FileText className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-sm font-semibold text-foreground">Description</span>
                </div>
                <Input
                  placeholder="What did you work on?"
                  value={newEntry.activity}
                  onChange={(e) => setNewEntry({ ...newEntry, activity: e.target.value })}
                  className="h-12 text-base touch-manipulation bg-muted/50 border-border focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>

              {/* Section: Duration */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 border-l-2 border-l-purple-500/60 pl-3">
                  <Clock className="h-3.5 w-3.5 text-purple-400" />
                  <span className="text-sm font-semibold text-foreground">Duration</span>
                </div>

                {/* Preset chips */}
                <div className="flex flex-wrap gap-2">
                  {DURATION_PRESETS.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => setNewEntry({ ...newEntry, duration: preset.value })}
                      className={cn(
                        'h-11 px-4 rounded-xl text-sm font-medium touch-manipulation active:scale-95 transition-all border',
                        newEntry.duration === preset.value
                          ? 'bg-elec-yellow text-black border-elec-yellow'
                          : 'bg-muted/50 text-foreground border-border hover:border-elec-yellow/40'
                      )}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Custom duration input */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">or enter:</span>
                  <Input
                    type="number"
                    step="0.5"
                    min="0.5"
                    inputMode="decimal"
                    placeholder="Custom hours"
                    value={newEntry.duration}
                    onChange={(e) => setNewEntry({ ...newEntry, duration: e.target.value })}
                    className="h-11 text-base touch-manipulation bg-muted/50 border-border focus:border-elec-yellow focus:ring-elec-yellow flex-1"
                  />
                  <span className="text-sm text-muted-foreground">hours</span>
                </div>
              </div>

              {/* Section: Date */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 border-l-2 border-l-amber-500/60 pl-3">
                  <Calendar className="h-3.5 w-3.5 text-amber-400" />
                  <span className="text-sm font-semibold text-foreground">Date</span>
                </div>
                <Input
                  type="date"
                  value={newEntry.date}
                  onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                  className="h-12 text-base touch-manipulation bg-muted/50 border-border focus:border-elec-yellow focus:ring-elec-yellow w-full"
                />
              </div>

              {/* Section: Location & Supervisor */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 border-l-2 border-l-green-500/60 pl-3">
                  <MapPin className="h-3.5 w-3.5 text-green-400" />
                  <span className="text-sm font-semibold text-foreground">
                    Location & Supervisor
                  </span>
                  <span className="text-xs text-muted-foreground">(optional)</span>
                </div>
                <Input
                  placeholder="e.g., Sellafield, College campus"
                  value={newEntry.location}
                  onChange={(e) => setNewEntry({ ...newEntry, location: e.target.value })}
                  className="h-12 text-base touch-manipulation bg-muted/50 border-border focus:border-elec-yellow focus:ring-elec-yellow"
                />
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Supervisor name"
                    value={newEntry.supervisor}
                    onChange={(e) => setNewEntry({ ...newEntry, supervisor: e.target.value })}
                    className="h-12 text-base touch-manipulation bg-muted/50 border-border focus:border-elec-yellow focus:ring-elec-yellow pl-10"
                  />
                </div>
              </div>

              {/* Section: Notes */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 border-l-2 border-l-white/20 pl-3">
                  <span className="text-sm font-semibold text-foreground">Notes</span>
                  <span className="text-xs text-muted-foreground">(optional)</span>
                </div>
                <Textarea
                  placeholder="Any additional details about this training session..."
                  value={newEntry.notes}
                  onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                  rows={3}
                  className="text-base touch-manipulation bg-muted/50 border-border focus:border-elec-yellow focus:ring-elec-yellow min-h-[80px]"
                />
              </div>

              {/* Bottom safe area for fixed button */}
              <div className="h-24" />
            </div>

            {/* Fixed bottom actions */}
            <div className="flex-shrink-0 border-t border-border bg-background px-4 py-3 pb-8 sm:pb-4">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowAddEntry(false)}
                  className="flex-1 h-12 touch-manipulation active:scale-95 text-base"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddEntry}
                  disabled={!newEntry.activity || !newEntry.duration}
                  className="flex-1 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation active:scale-95 text-base font-semibold disabled:opacity-40"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Log Time
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

// Helper: Get hours logged this week
function getWeeklyHours(entries: { date: string; duration: number }[]): number {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Monday
  startOfWeek.setHours(0, 0, 0, 0);

  return entries
    .filter((e) => new Date(e.date) >= startOfWeek)
    .reduce((sum, e) => sum + (isNaN(e.duration) ? 0 : e.duration) / 60, 0);
}

// Helper: Format timer display
function formatTimerDisplay(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export default TimeSection;
