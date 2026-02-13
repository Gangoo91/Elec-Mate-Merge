/**
 * OJTProgressSection — Best-in-class Hours tab
 *
 * Features:
 * - Weekly + yearly progress (compliance-aware)
 * - Compliance forecast ("on track to finish by...")
 * - 4-week bar chart with target reference line
 * - Category breakdown donut chart
 * - OJT streak counter with milestones
 * - Smart day-of-week suggestions
 * - Verification rate + remind supervisor
 * - Active goals from useOJTGoals
 * - Monthly history summaries
 * - Day-grouped sessions with full TimeEntryCard
 * - Upcoming assessments from useOJTAssessments
 * - "What counts as OJT?" guidance
 * - Enhanced quick log sheet with duration presets + location/supervisor
 * - Milestone celebrations via localStorage + toast
 */

import { useState, useEffect, useRef, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
} from 'recharts';
import {
  Clock,
  Plus,
  Play,
  Pause,
  Square,
  Calendar,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Timer,
  Flame,
  Target,
  Award,
  Info,
  MapPin,
  User,
  Share2,
  Zap,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import { useTimeEntries } from '@/hooks/time-tracking/useTimeEntries';
import { useComplianceTracking } from '@/hooks/time-tracking/useComplianceTracking';
import { useTimeEntryVerification } from '@/hooks/time-tracking/useTimeEntryVerification';
import { useOJTGoals } from '@/hooks/time-tracking/useOJTGoals';
import { useOJTAssessments } from '@/hooks/time-tracking/useOJTAssessments';
import { useOJTInsights } from '@/hooks/time-tracking/useOJTInsights';
import { useToast } from '@/hooks/use-toast';
import { TimeEntry } from '@/types/time-tracking';
import TimeEntryCard from '@/components/apprentice/time-tracking/TimeEntryCard';

/* ─── Constants ─── */

interface DayGroup {
  date: string;
  label: string;
  totalMinutes: number;
  entries: TimeEntry[];
}

const ACTIVITY_TYPES = [
  { value: 'workshop', label: 'Workshop Training', icon: '\u{1F527}' },
  { value: 'college', label: 'College Session', icon: '\u{1F393}' },
  { value: 'online', label: 'Online Learning', icon: '\u{1F4BB}' },
  { value: 'practical', label: 'Practical Assessment', icon: '\u{26A1}' },
  { value: 'study', label: 'Self Study', icon: '\u{1F4DA}' },
  { value: 'site-visit', label: 'Site Visit/Tour', icon: '\u{1F3D7}' },
  { value: 'mentoring', label: 'Mentoring Session', icon: '\u{1F465}' },
  { value: 'safety', label: 'Safety Training', icon: '\u{1F9BA}' },
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

const weeklyChartConfig: ChartConfig = {
  hours: { label: 'Hours', color: '#EAB308' },
};

/* ─── Component ─── */

export function OJTProgressSection() {
  const { toast } = useToast();
  const { entries, totalTime, addTimeEntry } = useTimeEntries();
  const { otjGoal, getComplianceStatus } = useComplianceTracking();
  const { getVerificationForTimeEntry } = useTimeEntryVerification();
  const { goals } = useOJTGoals();
  const { assessments } = useOJTAssessments();

  // Core stats
  const yearlyHours = Math.round(totalTime.hours + totalTime.minutes / 60);
  const yearlyTarget = otjGoal?.target_hours || 400;
  const yearlyPercent = Math.round((yearlyHours / yearlyTarget) * 100);
  const weeklyHours = getWeeklyHours(entries || []);
  const weeklyTarget = 7.5;
  const weeklyPercent = Math.round((weeklyHours / weeklyTarget) * 100);
  const compliance = getComplianceStatus();

  // Insights hook — charts, streaks, categories, suggestions, etc.
  const insights = useOJTInsights(entries || [], yearlyTarget);

  // Timer state
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActivity, setTimerActivity] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Quick log sheet
  const [showQuickLog, setShowQuickLog] = useState(false);
  const [logData, setLogData] = useState({
    activity: '',
    type: '',
    duration: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    location: '',
    supervisor: '',
  });

  // Expanded sections
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set());
  const [showMonthly, setShowMonthly] = useState(false);

  /* ─── Computed ─── */

  const yearlyColour = (() => {
    switch (compliance.status) {
      case 'compliant':
        return 'green';
      case 'on-track':
        return 'blue';
      case 'at-risk':
        return 'orange';
      case 'behind':
        return 'red';
      default:
        return 'blue';
    }
  })();

  const getWeekColour = () => {
    if (weeklyPercent >= 100) return 'green';
    if (weeklyPercent >= 75) return 'yellow';
    if (weeklyPercent >= 50) return 'orange';
    return 'red';
  };

  // Compliance forecast message
  const forecastMessage = useMemo(() => {
    if (yearlyHours >= yearlyTarget) return 'Target achieved!';
    if (insights.forecastData.weeklyRate <= 0)
      return 'Start logging to see your forecast';

    const remainingHours = yearlyTarget - yearlyHours;
    const weeksRemaining = remainingHours / insights.forecastData.weeklyRate;
    const estimatedDate = new Date(
      Date.now() + weeksRemaining * 7 * 24 * 60 * 60 * 1000
    );

    const deadline = otjGoal?.deadline
      ? new Date(otjGoal.deadline)
      : new Date(new Date().getFullYear(), 11, 31);
    const onTrack = estimatedDate <= deadline;

    if (onTrack) {
      return `On track \u2014 est. completion ${estimatedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;
    }
    const weeksLeft = Math.max(
      1,
      (deadline.getTime() - Date.now()) / (7 * 24 * 60 * 60 * 1000)
    );
    const neededRate = remainingHours / weeksLeft;
    return `Need ${neededRate.toFixed(1)}h/week to meet target`;
  }, [yearlyHours, yearlyTarget, insights.forecastData, otjGoal]);

  // Verification stats
  const verificationStats = useMemo(() => {
    const all = entries || [];
    if (all.length === 0) return { total: 0, verified: 0, rate: 0 };
    const verified = all.filter((e) => {
      if (e.is_supervisor_verified) return true;
      const v = getVerificationForTimeEntry(e.id);
      return !!v?.verified_at;
    }).length;
    return {
      total: all.length,
      verified,
      rate: Math.round((verified / all.length) * 100),
    };
  }, [entries, getVerificationForTimeEntry]);

  // Summary stats
  const summaryStats = useMemo(() => {
    const allEntries = entries || [];
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    startOfWeek.setHours(0, 0, 0, 0);
    const weekEntries = allEntries.filter(
      (e) => new Date(e.date) >= startOfWeek
    );
    const sessionCount = weekEntries.length;
    const totalMins = weekEntries.reduce((sum, e) => sum + e.duration, 0);
    const avgMins =
      sessionCount > 0 ? Math.round(totalMins / sessionCount) : 0;
    return { sessionCount, avgMins };
  }, [entries]);

  // Day-grouped sessions (last 7 day groups)
  const groupedSessions = useMemo((): DayGroup[] => {
    const allEntries = entries || [];
    const sorted = [...allEntries].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const dayMap = new Map<string, TimeEntry[]>();
    for (const entry of sorted) {
      const dateKey = entry.date.split('T')[0];
      const existing = dayMap.get(dateKey) || [];
      existing.push(entry);
      dayMap.set(dateKey, existing);
    }
    const groups: DayGroup[] = [];
    for (const [date, dayEntries] of dayMap) {
      groups.push({
        date,
        label: formatDateLabel(date),
        totalMinutes: dayEntries.reduce((sum, e) => sum + e.duration, 0),
        entries: dayEntries,
      });
    }
    return groups.slice(0, 7);
  }, [entries]);

  // Active goals (non-completed, non-cancelled)
  const activeGoals = useMemo(
    () =>
      goals.filter(
        (g) => g.status !== 'completed' && g.status !== 'cancelled'
      ),
    [goals]
  );

  // Upcoming assessments (not completed/failed, due in next 30 days)
  const upcomingAssessments = useMemo(() => {
    const now = new Date();
    const limit = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    return assessments.filter((a) => {
      if (a.status === 'completed' || a.status === 'failed') return false;
      const due = new Date(a.due_date);
      return due <= limit;
    });
  }, [assessments]);

  // Dynamic chart config for category donut
  const categoryChartConfig = useMemo((): ChartConfig => {
    const config: ChartConfig = {};
    for (const cat of insights.categoryData) {
      config[cat.name] = { label: cat.name, color: cat.colour };
    }
    return config;
  }, [insights.categoryData]);

  /* ─── Effects ─── */

  // Timer tick
  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive]);

  // Milestone celebrations
  useEffect(() => {
    if (yearlyHours <= 0) return;
    const lastCelebrated = parseInt(
      localStorage.getItem('ojt_last_milestone') || '0',
      10
    );
    const milestoneValues = [50, 100, 150, 200, 250, 300, 350, 400];
    const reached = milestoneValues.filter((m) => yearlyHours >= m);
    const currentMilestone = reached.length > 0 ? reached[reached.length - 1] : 0;

    if (currentMilestone > lastCelebrated) {
      localStorage.setItem('ojt_last_milestone', currentMilestone.toString());
      toast({
        title: `${currentMilestone}h Milestone Reached!`,
        description: `You've logged ${currentMilestone} hours of off-the-job training!`,
      });
    }
  }, [yearlyHours, toast]);

  /* ─── Handlers ─── */

  const startTimer = () => setTimerActive(true);
  const pauseTimer = () => setTimerActive(false);

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

  const toggleDay = (date: string) => {
    setExpandedDays((prev) => {
      const next = new Set(prev);
      if (next.has(date)) next.delete(date);
      else next.add(date);
      return next;
    });
  };

  const openQuickLog = () => {
    setLogData({
      activity: '',
      type: '',
      duration: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      location: '',
      supervisor: '',
    });
    setShowQuickLog(true);
  };

  const useSuggestionAndLog = () => {
    if (!insights.smartSuggestion) return;
    setLogData({
      activity: insights.smartSuggestion.activity,
      type: '',
      duration: (insights.smartSuggestion.duration / 60).toFixed(1),
      date: new Date().toISOString().split('T')[0],
      notes: '',
      location: '',
      supervisor: '',
    });
    setShowQuickLog(true);
  };

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
    if (isNaN(durationMinutes) || durationMinutes <= 0) {
      toast({
        title: 'Invalid duration',
        description: 'Please enter a valid duration',
        variant: 'destructive',
      });
      return;
    }

    // Combine location/supervisor into notes
    const noteParts: string[] = [];
    if (logData.location) noteParts.push(`Location: ${logData.location}`);
    if (logData.supervisor) noteParts.push(`Supervisor: ${logData.supervisor}`);
    if (logData.notes) noteParts.push(logData.notes);
    const combinedNotes = noteParts.join(' | ');

    await addTimeEntry({
      date: logData.date,
      duration: durationMinutes,
      activity: logData.activity,
      notes: combinedNotes,
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
      location: '',
      supervisor: '',
    });
    setShowQuickLog(false);
  };

  const handleRemindSupervisor = async () => {
    const allEntries = entries || [];
    const unverified = allEntries.filter((e) => {
      if (e.is_supervisor_verified) return false;
      const v = getVerificationForTimeEntry(e.id);
      return !v?.verified_at;
    });

    if (unverified.length === 0) {
      toast({
        title: 'All verified',
        description: 'All your sessions are already verified',
      });
      return;
    }

    const lines = unverified.slice(0, 10).map(
      (e) =>
        `- ${e.activity} (${(e.duration / 60).toFixed(1)}h) on ${new Date(e.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
    );

    const text = `OJT Verification Request\n\nHi, could you please verify my training sessions?\n\n${lines.join('\n')}${unverified.length > 10 ? `\n...and ${unverified.length - 10} more` : ''}\n\nThank you!`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'OJT Verification Request',
          text,
        });
      } else {
        await navigator.clipboard.writeText(text);
        toast({
          title: 'Copied to clipboard',
          description: 'Share this with your supervisor',
        });
      }
    } catch {
      // User cancelled share dialog
    }
  };

  /* ─── Render ─── */

  return (
    <div className="px-4 py-6 space-y-5 lg:px-6">
      {/* ── 1. Header with streak badge ── */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-foreground">
            Off-the-Job Training
          </h2>
          <p className="text-sm text-muted-foreground">
            Track your 20% off-the-job training hours
          </p>
        </div>
        {insights.streak.current > 0 && (
          <div className="flex items-center gap-1.5 bg-orange-500/10 px-3 py-1.5 rounded-full">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-bold text-orange-500">
              {insights.streak.current}
            </span>
          </div>
        )}
      </div>

      {/* ── 2. Progress cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Weekly */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-3xl font-bold text-foreground">
                  {weeklyHours.toFixed(1)}
                  <span className="text-lg text-muted-foreground">
                    /{weeklyTarget}h
                  </span>
                </p>
              </div>
              <div
                className={cn(
                  'p-2 rounded-lg',
                  getWeekColour() === 'green' && 'bg-green-500/10',
                  getWeekColour() === 'yellow' && 'bg-elec-yellow/10',
                  getWeekColour() === 'orange' && 'bg-orange-500/10',
                  getWeekColour() === 'red' && 'bg-red-500/10'
                )}
              >
                <Clock
                  className={cn(
                    'h-5 w-5',
                    getWeekColour() === 'green' && 'text-green-500',
                    getWeekColour() === 'yellow' && 'text-elec-yellow',
                    getWeekColour() === 'orange' && 'text-orange-500',
                    getWeekColour() === 'red' && 'text-red-500'
                  )}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all',
                    getWeekColour() === 'green' && 'bg-green-500',
                    getWeekColour() === 'yellow' && 'bg-elec-yellow',
                    getWeekColour() === 'orange' && 'bg-orange-500',
                    getWeekColour() === 'red' && 'bg-red-500'
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

        {/* Yearly — compliance-aware */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-muted-foreground">This Year</p>
                <p className="text-3xl font-bold text-foreground">
                  {yearlyHours}
                  <span className="text-lg text-muted-foreground">
                    /{yearlyTarget}h
                  </span>
                </p>
              </div>
              <div
                className={cn(
                  'p-2 rounded-lg',
                  yearlyColour === 'green' && 'bg-green-500/10',
                  yearlyColour === 'blue' && 'bg-blue-500/10',
                  yearlyColour === 'orange' && 'bg-orange-500/10',
                  yearlyColour === 'red' && 'bg-red-500/10'
                )}
              >
                <TrendingUp
                  className={cn(
                    'h-5 w-5',
                    yearlyColour === 'green' && 'text-green-500',
                    yearlyColour === 'blue' && 'text-blue-500',
                    yearlyColour === 'orange' && 'text-orange-500',
                    yearlyColour === 'red' && 'text-red-500'
                  )}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all',
                    yearlyColour === 'green' && 'bg-green-500',
                    yearlyColour === 'blue' && 'bg-blue-500',
                    yearlyColour === 'orange' && 'bg-orange-500',
                    yearlyColour === 'red' && 'bg-red-500'
                  )}
                  style={{ width: `${Math.min(yearlyPercent, 100)}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {yearlyPercent}% complete &bull; {yearlyTarget - yearlyHours}h
                remaining
              </p>
              <p
                className={cn(
                  'text-xs font-medium',
                  yearlyColour === 'green' && 'text-green-400',
                  yearlyColour === 'blue' && 'text-blue-400',
                  yearlyColour === 'orange' && 'text-orange-400',
                  yearlyColour === 'red' && 'text-red-400'
                )}
              >
                {compliance.message}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── 3. Compliance forecast ── */}
      <div className="flex items-center gap-2 px-1">
        <TrendingUp className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
        <p className="text-xs text-muted-foreground">
          {insights.forecastData.weeklyRate > 0 && (
            <span className="text-foreground font-medium">
              {insights.forecastData.weeklyRate}h/week avg
            </span>
          )}{' '}
          &middot; {forecastMessage}
        </p>
      </div>

      {/* ── 4. Quick actions ── */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={openQuickLog}
          className="h-14 bg-elec-yellow text-black hover:bg-elec-yellow/90 font-medium touch-manipulation active:scale-95"
        >
          <Plus className="h-5 w-5 mr-2" />
          Log Time
        </Button>
        <Button
          variant="outline"
          onClick={timerActive ? pauseTimer : startTimer}
          className="h-14 font-medium touch-manipulation active:scale-95"
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

      {/* ── 5. Active timer ── */}
      {(timerActive || timerSeconds > 0) && (
        <Card className="bg-elec-yellow/10 border-elec-yellow/30">
          <CardContent className="p-4 space-y-3">
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
                className="h-11 touch-manipulation active:scale-95"
              >
                <Square className="h-4 w-4 mr-1" />
                Stop
              </Button>
            </div>
            {/* Activity picker for timer */}
            <Select
              value={
                ACTIVITY_TYPES.find((t) => t.label === timerActivity)?.value ||
                ''
              }
              onValueChange={(value) => {
                const type = ACTIVITY_TYPES.find((t) => t.value === value);
                if (type) setTimerActivity(type.label);
              }}
            >
              <SelectTrigger className="h-11 touch-manipulation text-sm bg-background/50 border-elec-yellow/30 focus:border-elec-yellow focus:ring-elec-yellow">
                <SelectValue placeholder="Select activity type" />
              </SelectTrigger>
              <SelectContent className="z-[100] bg-background border-border">
                {ACTIVITY_TYPES.map((type) => (
                  <SelectItem
                    key={type.value}
                    value={type.value}
                    className="py-3"
                  >
                    <span className="flex items-center gap-2">
                      <span>{type.icon}</span>
                      <span className="text-sm">{type.label}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      )}

      {/* ── 6. Smart suggestion ── */}
      {insights.smartSuggestion && (
        <Card className="border-elec-yellow/20 bg-elec-yellow/5">
          <CardContent className="p-3 flex items-center gap-3">
            <Zap className="h-4 w-4 text-elec-yellow shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                You usually do{' '}
                <span className="font-medium">
                  {insights.smartSuggestion.activity}
                </span>{' '}
                on {insights.smartSuggestion.dayName}s
              </p>
            </div>
            <Button
              size="sm"
              onClick={useSuggestionAndLog}
              className="h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation shrink-0"
            >
              Log
            </Button>
          </CardContent>
        </Card>
      )}

      {/* ── 7. Weekly hours chart ── */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Calendar className="h-4 w-4 text-elec-yellow" />
            Weekly Hours
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <ChartContainer
            config={weeklyChartConfig}
            className="aspect-auto h-[180px] w-full"
          >
            <BarChart
              data={insights.weeklyChartData}
              margin={{ top: 20, right: 8, bottom: 0, left: -24 }}
            >
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <ReferenceLine
                y={7.5}
                stroke="hsl(var(--muted-foreground))"
                strokeDasharray="3 3"
                strokeOpacity={0.5}
              />
              <Bar dataKey="hours" radius={[6, 6, 0, 0]} maxBarSize={48}>
                {insights.weeklyChartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.hours >= 7.5 ? '#22C55E' : '#EAB308'}
                  />
                ))}
              </Bar>
              <ChartTooltip
                content={<ChartTooltipContent hideLabel />}
              />
            </BarChart>
          </ChartContainer>
          <p className="text-[10px] text-muted-foreground text-center mt-1">
            Dashed line = 7.5h weekly target
          </p>
        </CardContent>
      </Card>

      {/* ── 8. Stats row ── */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="bg-card border-border">
          <CardContent className="p-2.5 text-center">
            <p className="text-lg font-bold text-foreground">
              {summaryStats.sessionCount}
            </p>
            <p className="text-[10px] text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-2.5 text-center">
            <p className="text-lg font-bold text-foreground">
              {summaryStats.avgMins > 0
                ? `${(summaryStats.avgMins / 60).toFixed(1)}h`
                : '\u2014'}
            </p>
            <p className="text-[10px] text-muted-foreground">Avg session</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-2.5 text-center">
            <p className="text-lg font-bold text-foreground">
              {verificationStats.rate}%
            </p>
            <p className="text-[10px] text-muted-foreground">Verified</p>
            {verificationStats.total > 0 &&
              verificationStats.rate < 100 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemindSupervisor}
                  className="h-11 px-2 text-xs text-elec-yellow font-medium flex items-center gap-1 mx-auto mt-1 touch-manipulation active:scale-95"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  Remind
                </Button>
              )}
          </CardContent>
        </Card>
      </div>

      {/* ── 9. Category breakdown ── */}
      {insights.categoryData.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">
              Training Mix
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              {/* Donut */}
              <ChartContainer
                config={categoryChartConfig}
                className="aspect-square h-[160px] mx-auto"
              >
                <PieChart>
                  <Pie
                    data={insights.categoryData}
                    dataKey="hours"
                    nameKey="name"
                    innerRadius={45}
                    outerRadius={70}
                    strokeWidth={2}
                    stroke="hsl(var(--background))"
                  >
                    {insights.categoryData.map((cat, i) => (
                      <Cell key={i} fill={cat.colour} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={<ChartTooltipContent nameKey="name" />}
                  />
                </PieChart>
              </ChartContainer>

              {/* Legend */}
              <div className="space-y-2">
                {insights.categoryData.slice(0, 6).map((cat) => (
                  <div key={cat.name} className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-sm shrink-0"
                      style={{ backgroundColor: cat.colour }}
                    />
                    <span className="text-xs text-foreground truncate flex-1">
                      {cat.name}
                    </span>
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {cat.percentage}%
                    </span>
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {cat.hours}h
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── 10. Streak + milestones ── */}
      <Card className="bg-card border-border">
        <CardContent className="p-4 space-y-4">
          {/* Streak */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10">
                <Flame className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {insights.streak.current > 0
                    ? `${insights.streak.current} day streak`
                    : 'No active streak'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {insights.streak.isActiveToday
                    ? 'Logged today'
                    : insights.streak.current > 0
                      ? 'Log today to continue'
                      : 'Log today to start one'}
                  {insights.streak.longest > 0 &&
                    ` \u00B7 Best: ${insights.streak.longest} days`}
                </p>
              </div>
            </div>
          </div>

          {/* Milestones */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5" />
                Milestones
              </p>
              {insights.nextMilestone && (
                <p className="text-xs text-muted-foreground">
                  Next: {insights.nextMilestone.label}
                </p>
              )}
            </div>
            <div className="flex gap-1">
              {insights.milestones.map((m) => (
                <div
                  key={m.hours}
                  className={cn(
                    'flex-1 h-2 rounded-full transition-all',
                    m.reached ? 'bg-elec-yellow' : 'bg-muted'
                  )}
                  title={m.label}
                />
              ))}
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-muted-foreground">0h</span>
              <span className="text-[10px] text-muted-foreground">
                {yearlyTarget}h
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 11. Active goals ── */}
      {activeGoals.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Target className="h-4 w-4 text-elec-yellow" />
              Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-3">
            {activeGoals.slice(0, 3).map((goal) => {
              const progress = goal.target_value > 0
                ? Math.round(
                    ((goal.current_value || 0) / goal.target_value) * 100
                  )
                : 0;
              return (
                <div key={goal.id} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground truncate">
                      {goal.title}
                    </p>
                    <div className="flex items-center gap-2 shrink-0">
                      {goal.priority === 'high' && (
                        <Badge
                          variant="outline"
                          className="text-[10px] border-red-500/30 text-red-400"
                        >
                          High
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {goal.current_value || 0}/{goal.target_value}{' '}
                        {goal.unit}
                      </span>
                    </div>
                  </div>
                  <Progress value={Math.min(progress, 100)} className="h-1.5" />
                  {goal.deadline && (
                    <p className="text-[10px] text-muted-foreground">
                      Due{' '}
                      {new Date(goal.deadline).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </p>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* ── 12. Monthly history ── */}
      {insights.monthlySummaries.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <button
              type="button"
              onClick={() => setShowMonthly(!showMonthly)}
              className="w-full flex items-center justify-between touch-manipulation min-h-[44px]"
            >
              <CardTitle className="text-base font-semibold">
                Monthly History
              </CardTitle>
              <ChevronDown
                className={cn(
                  'h-4 w-4 text-muted-foreground transition-transform',
                  showMonthly && 'rotate-180'
                )}
              />
            </button>
          </CardHeader>
          {showMonthly && (
            <CardContent className="pt-0 space-y-2">
              {insights.monthlySummaries.map((month) => (
                <div
                  key={month.key}
                  className="flex items-center gap-3 py-2 px-1 border-b border-border last:border-0"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {month.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {month.sessionCount} session
                      {month.sessionCount !== 1 ? 's' : ''} &middot;{' '}
                      {month.topCategory}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-foreground tabular-nums shrink-0">
                    {month.totalHours}h
                  </p>
                </div>
              ))}
            </CardContent>
          )}
        </Card>
      )}

      {/* ── 13. Recent sessions — day-grouped ── */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Recent Sessions
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {groupedSessions.length === 0 ? (
            <div className="text-center py-8">
              <Clock className="h-10 w-10 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">
                No sessions logged
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Start tracking your off-the-job training
              </p>
              <Button
                onClick={openQuickLog}
                className="mt-3 h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
              >
                <Plus className="h-4 w-4 mr-2" />
                Log your first session
              </Button>
            </div>
          ) : (
            <div className="space-y-1">
              {groupedSessions.map((group) => {
                const isExpanded = expandedDays.has(group.date);
                const verifiedCount = group.entries.filter((e) => {
                  const v = getVerificationForTimeEntry(e.id);
                  return e.is_supervisor_verified || !!v?.verified_at;
                }).length;
                const dayDot =
                  verifiedCount === group.entries.length && verifiedCount > 0
                    ? 'bg-green-500'
                    : verifiedCount > 0
                      ? 'bg-amber-500'
                      : 'bg-muted-foreground/30';

                return (
                  <div key={group.date}>
                    <button
                      type="button"
                      onClick={() => toggleDay(group.date)}
                      className="w-full flex items-center gap-3 py-3 px-2 rounded-lg hover:bg-muted/50 touch-manipulation active:bg-muted/70 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            'w-2 h-2 rounded-full shrink-0',
                            dayDot
                          )}
                        />
                        <div className="p-2 rounded-lg bg-muted">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="text-sm font-medium text-foreground">
                          {group.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {group.entries.length} session
                          {group.entries.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <div className="text-right mr-1">
                        <p className="text-sm font-medium text-foreground">
                          {(group.totalMinutes / 60).toFixed(1)}h
                        </p>
                      </div>
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 text-muted-foreground transition-transform',
                          isExpanded && 'rotate-180'
                        )}
                      />
                    </button>

                    {isExpanded && (
                      <div className="space-y-2 pb-2 pl-2">
                        {group.entries.map((session) => (
                          <TimeEntryCard key={session.id} entry={session} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* ── 14. Upcoming assessments ── */}
      {upcomingAssessments.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-400" />
              Upcoming Assessments
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {upcomingAssessments.slice(0, 4).map((assessment) => {
              const due = new Date(assessment.due_date);
              const now = new Date();
              const daysUntil = Math.ceil(
                (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
              );
              const isOverdue = daysUntil < 0;

              return (
                <div
                  key={assessment.id}
                  className="flex items-center gap-3 py-2"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {assessment.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge
                        variant="outline"
                        className="text-[10px] capitalize"
                      >
                        {assessment.type}
                      </Badge>
                      <span
                        className={cn(
                          'text-xs',
                          isOverdue
                            ? 'text-red-400 font-medium'
                            : daysUntil <= 3
                              ? 'text-orange-400'
                              : 'text-muted-foreground'
                        )}
                      >
                        {isOverdue
                          ? `${Math.abs(daysUntil)} day${Math.abs(daysUntil) !== 1 ? 's' : ''} overdue`
                          : daysUntil === 0
                            ? 'Due today'
                            : `In ${daysUntil} day${daysUntil !== 1 ? 's' : ''}`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}

      {/* ── 15. What counts as OJT? ── */}
      <Card className="border-border bg-muted/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5" />
            What counts as off-the-job training?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>College / training provider sessions</li>
            <li>Online learning and courses</li>
            <li>Shadowing and mentoring</li>
            <li>Practical skills practice</li>
            <li>Written assignments and projects</li>
            <li>Industry visits and events</li>
          </ul>
          <p className="text-[10px] text-muted-foreground mt-2">
            Must be at least 20% of your working hours (ESFA funding rules)
          </p>
        </CardContent>
      </Card>

      {/* Bottom safe area for home indicator */}
      <div className="h-20" />

      {/* ── 16. Enhanced quick log sheet ── */}
      <Sheet open={showQuickLog} onOpenChange={setShowQuickLog}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 rounded-t-2xl overflow-hidden [&>button.absolute]:hidden sm:max-w-[640px] sm:mx-auto"
        >
          <div className="flex flex-col h-full bg-background">
            {/* Header */}
            <SheetHeader className="flex-shrink-0 border-b border-border px-4 pt-3 pb-4">
              <div className="flex justify-center pb-2">
                <div className="h-1 w-10 rounded-full bg-muted" />
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
              {/* Smart suggestion banner */}
              {insights.smartSuggestion && !logData.activity && (
                <button
                  type="button"
                  onClick={useSuggestionAndLog}
                  className="w-full flex items-center gap-3 p-3 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 touch-manipulation"
                >
                  <Zap className="h-4 w-4 text-elec-yellow shrink-0" />
                  <span className="text-sm text-foreground text-left flex-1">
                    Use suggestion:{' '}
                    <span className="font-medium">
                      {insights.smartSuggestion.activity}
                    </span>{' '}
                    ({(insights.smartSuggestion.duration / 60).toFixed(1)}h)
                  </span>
                  <ChevronRight className="h-4 w-4 text-elec-yellow shrink-0" />
                </button>
              )}

              {/* Activity Type */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 border-l-2 border-l-elec-yellow/60 pl-3">
                  <span className="text-sm font-semibold text-foreground">
                    Activity Type
                  </span>
                </div>
                <Select
                  value={logData.type}
                  onValueChange={(value) => {
                    const type = ACTIVITY_TYPES.find(
                      (t) => t.value === value
                    );
                    setLogData({
                      ...logData,
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
                      <SelectItem
                        key={type.value}
                        value={type.value}
                        className="py-3"
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-lg">{type.icon}</span>
                          <span className="text-sm">{type.label}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 border-l-2 border-l-blue-500/60 pl-3">
                  <span className="text-sm font-semibold text-foreground">
                    Description
                  </span>
                </div>
                <Input
                  placeholder="What did you work on?"
                  value={logData.activity}
                  onChange={(e) =>
                    setLogData({ ...logData, activity: e.target.value })
                  }
                  className="h-12 text-base touch-manipulation bg-muted/50 border-border focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>

              {/* Duration */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 border-l-2 border-l-purple-500/60 pl-3">
                  <Clock className="h-3.5 w-3.5 text-purple-400" />
                  <span className="text-sm font-semibold text-foreground">
                    Duration
                  </span>
                </div>

                {/* Preset chips */}
                <div className="flex flex-wrap gap-2">
                  {DURATION_PRESETS.map((preset) => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() =>
                        setLogData({ ...logData, duration: preset.value })
                      }
                      className={cn(
                        'h-11 px-4 rounded-xl text-sm font-medium touch-manipulation active:scale-95 transition-all border',
                        logData.duration === preset.value
                          ? 'bg-elec-yellow text-black border-elec-yellow'
                          : 'bg-muted/50 text-foreground border-border hover:border-elec-yellow/40'
                      )}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Custom input */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    or enter:
                  </span>
                  <Input
                    type="number"
                    step="0.5"
                    min="0.5"
                    inputMode="decimal"
                    placeholder="Custom hours"
                    value={logData.duration}
                    onChange={(e) =>
                      setLogData({ ...logData, duration: e.target.value })
                    }
                    className="h-11 text-base touch-manipulation bg-muted/50 border-border focus:border-elec-yellow focus:ring-elec-yellow flex-1"
                  />
                  <span className="text-sm text-muted-foreground">hours</span>
                </div>
              </div>

              {/* Date */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 border-l-2 border-l-amber-500/60 pl-3">
                  <Calendar className="h-3.5 w-3.5 text-amber-400" />
                  <span className="text-sm font-semibold text-foreground">
                    Date
                  </span>
                </div>
                <Input
                  type="date"
                  value={logData.date}
                  onChange={(e) =>
                    setLogData({ ...logData, date: e.target.value })
                  }
                  className="h-12 text-base touch-manipulation bg-muted/50 border-border focus:border-elec-yellow focus:ring-elec-yellow w-full"
                />
              </div>

              {/* Location & Supervisor */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 border-l-2 border-l-green-500/60 pl-3">
                  <MapPin className="h-3.5 w-3.5 text-green-400" />
                  <span className="text-sm font-semibold text-foreground">
                    Location & Supervisor
                  </span>
                  <span className="text-xs text-muted-foreground">
                    (optional)
                  </span>
                </div>
                <Input
                  placeholder="e.g., College campus, Sellafield"
                  value={logData.location}
                  onChange={(e) =>
                    setLogData({ ...logData, location: e.target.value })
                  }
                  className="h-12 text-base touch-manipulation bg-muted/50 border-border focus:border-elec-yellow focus:ring-elec-yellow"
                />
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Supervisor name"
                    value={logData.supervisor}
                    onChange={(e) =>
                      setLogData({ ...logData, supervisor: e.target.value })
                    }
                    className="h-12 text-base touch-manipulation bg-muted/50 border-border focus:border-elec-yellow focus:ring-elec-yellow pl-10"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 border-l-2 border-l-white/20 pl-3">
                  <span className="text-sm font-semibold text-foreground">
                    Notes
                  </span>
                  <span className="text-xs text-muted-foreground">
                    (optional)
                  </span>
                </div>
                <Textarea
                  placeholder="Any additional details about this training session..."
                  value={logData.notes}
                  onChange={(e) =>
                    setLogData({ ...logData, notes: e.target.value })
                  }
                  rows={3}
                  className="text-base touch-manipulation bg-muted/50 border-border focus:border-elec-yellow focus:ring-elec-yellow min-h-[80px]"
                />
              </div>

              {/* Spacer for fixed button */}
              <div className="h-24" />
            </div>

            {/* Fixed bottom actions */}
            <div className="flex-shrink-0 border-t border-border bg-background px-4 py-3 pb-8 sm:pb-4">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowQuickLog(false)}
                  className="flex-1 h-12 touch-manipulation active:scale-95 text-base"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitLog}
                  disabled={!logData.activity || !logData.duration}
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
    </div>
  );
}

/* ─── Helpers ─── */

function getWeeklyHours(entries: TimeEntry[]): number {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  startOfWeek.setHours(0, 0, 0, 0);
  return entries
    .filter((e) => new Date(e.date) >= startOfWeek)
    .reduce((sum, e) => sum + (e.duration || 0) / 60, 0);
}

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function formatDateLabel(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (date.getTime() === today.getTime()) return 'Today';
  if (date.getTime() === yesterday.getTime()) return 'Yesterday';
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export default OJTProgressSection;
