import { useState, useEffect } from 'react';
import {
  Moon,
  Sun,
  Clock,
  TrendingUp,
  ChevronLeft,
  Sparkles,
  Calendar,
  Check,
  BedDouble,
  Cloud,
  CloudOff,
} from 'lucide-react';
import { useSleepData } from '@/hooks/useMentalHealthSync';
import { useAuth } from '@/contexts/AuthContext';
import {
  Eyebrow,
  PrimaryButton,
  SecondaryButton,
  FormCard,
  ListCard,
  ListRow,
  EmptyState,
  inputClass,
} from '@/components/college/primitives';

interface SleepEntry {
  id?: string;
  date: string;
  bed_time: string;
  wake_time: string;
  hours: number;
  quality: number;
  notes?: string[];
}

const qualityLabels = [
  { value: 1, label: 'Terrible', emoji: '😫' },
  { value: 2, label: 'Poor', emoji: '😔' },
  { value: 3, label: 'Okay', emoji: '😐' },
  { value: 4, label: 'Good', emoji: '🙂' },
  { value: 5, label: 'Great', emoji: '😴' },
];

const sleepFactors = [
  'Caffeine late',
  'Screen time',
  'Stressed',
  'Exercise helped',
  'Good routine',
  'Bad dreams',
  'Woke up often',
  'Felt rested',
];

const SleepTracker = () => {
  const { user } = useAuth();
  const { entries, saveSleepEntry, isLoading } = useSleepData();
  const [view, setView] = useState<'log' | 'history'>('log');
  const [bedTime, setBedTime] = useState('22:30');
  const [wakeTime, setWakeTime] = useState('06:30');
  const [quality, setQuality] = useState(3);
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  // Check if already logged today
  const today = new Date().toISOString().split('T')[0];
  const todaysEntry = entries.find((e) => e.date === today);

  // Calculate sleep hours
  const calculateHours = (bed: string, wake: string): number => {
    const [bedH, bedM] = bed.split(':').map(Number);
    const [wakeH, wakeM] = wake.split(':').map(Number);

    let hours = wakeH - bedH;
    let mins = wakeM - bedM;

    if (hours < 0) hours += 24;
    if (mins < 0) {
      hours -= 1;
      mins += 60;
    }

    return Math.round((hours + mins / 60) * 10) / 10;
  };

  const sleepHours = calculateHours(bedTime, wakeTime);

  // Save entry
  const handleSaveSleep = async () => {
    const entry: SleepEntry = {
      date: today,
      bed_time: bedTime,
      wake_time: wakeTime,
      hours: sleepHours,
      quality,
      notes: selectedFactors,
    };

    await saveSleepEntry(entry);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Calculate weekly average
  const getWeeklyAverage = () => {
    const lastWeek = entries.slice(0, 7);
    if (lastWeek.length === 0) return 0;
    const avg = lastWeek.reduce((sum, e) => sum + e.hours, 0) / lastWeek.length;
    return Math.round(avg * 10) / 10;
  };

  // Get sleep quality trend
  const getQualityTrend = () => {
    const lastWeek = entries.slice(0, 7);
    if (lastWeek.length < 2) return 0;
    const recentAvg =
      lastWeek.slice(0, 3).reduce((s, e) => s + e.quality, 0) / Math.min(3, lastWeek.length);
    const prevAvg =
      lastWeek.slice(3).reduce((s, e) => s + e.quality, 0) / Math.max(1, lastWeek.length - 3);
    return recentAvg - prevAvg;
  };

  const toggleFactor = (factor: string) => {
    if (selectedFactors.includes(factor)) {
      setSelectedFactors(selectedFactors.filter((f) => f !== factor));
    } else {
      setSelectedFactors([...selectedFactors, factor]);
    }
  };

  // History view
  if (view === 'history') {
    const weeklyAvg = getWeeklyAverage();
    const qualityTrend = getQualityTrend();

    return (
      <div className="space-y-4">
        {/* Sticky Header */}
        <div className="sticky top-0 z-40 bg-[hsl(0_0%_8%)]/95 backdrop-blur-xl border-b border-white/[0.06] -mx-4 px-4 py-3 mb-2">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setView('log')}
              className="inline-flex items-center gap-1 h-11 px-3 rounded-full text-[13px] font-medium text-white hover:bg-white/[0.06] transition-colors touch-manipulation"
            >
              <ChevronLeft className="h-5 w-5" />
              Back
            </button>
            <span className="text-[13px] text-white font-medium">Sleep history</span>
            <div className="w-16" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="bg-[hsl(0_0%_12%)] px-5 py-5 text-center">
            <Eyebrow>Weekly average</Eyebrow>
            <div className="mt-3 text-2xl font-semibold text-white tabular-nums">
              {weeklyAvg}h
            </div>
          </div>
          <div className="bg-[hsl(0_0%_12%)] px-5 py-5 text-center">
            <Eyebrow>Quality trend</Eyebrow>
            <div
              className={`mt-3 text-2xl font-semibold tabular-nums ${
                qualityTrend > 0
                  ? 'text-emerald-400'
                  : qualityTrend < 0
                    ? 'text-red-400'
                    : 'text-elec-yellow'
              }`}
            >
              {qualityTrend > 0 ? '+' : ''}
              {qualityTrend.toFixed(1)}
            </div>
          </div>
        </div>

        {/* Entries */}
        <div className="space-y-2">
          {entries.length > 0 ? (
            <ListCard>
              {entries.slice(0, 14).map((entry) => {
                const q = qualityLabels.find((x) => x.value === entry.quality);
                const date = new Date(entry.date);
                return (
                  <ListRow
                    key={entry.id}
                    lead={<span className="text-2xl">{q?.emoji}</span>}
                    title={
                      <span>
                        {date.toLocaleDateString('en-GB', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    }
                    subtitle={
                      <div>
                        <div>
                          {entry.bed_time} – {entry.wake_time}
                        </div>
                        {entry.notes && entry.notes.length > 0 && (
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            {entry.notes.map((note) => (
                              <span
                                key={note}
                                className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-white border border-white/[0.08]"
                              >
                                {note}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    }
                    trailing={
                      <div className="text-right">
                        <div className="text-lg font-semibold text-elec-yellow tabular-nums">
                          {entry.hours}h
                        </div>
                        <div className="text-[11px] text-white">{q?.label}</div>
                      </div>
                    }
                  />
                );
              })}
            </ListCard>
          ) : (
            <EmptyState
              title="No sleep data yet"
              description="Log your first night to start tracking patterns."
              action="Log your sleep"
              onAction={() => setView('log')}
            />
          )}
        </div>

        {/* Tip */}
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5">
          <Eyebrow>Tip</Eyebrow>
          <p className="mt-2 text-[13px] text-white leading-relaxed">
            Adults need 7–9 hours of sleep. Consistent sleep schedules improve quality more than
            duration.
          </p>
        </div>
      </div>
    );
  }

  // Log view
  return (
    <div className="space-y-4 pb-24 sm:pb-4">
      {/* Header */}
      <div className="text-center py-2">
        <Eyebrow>Mental health</Eyebrow>
        <h2 className="mt-1.5 text-xl font-semibold text-white tracking-tight">Sleep tracker</h2>
        <p className="mt-1 text-[13px] text-white">Track your sleep for better mental health</p>
      </div>

      {/* Cloud Sync Status */}
      <div className="flex items-center justify-center gap-2 text-[12px]">
        {user ? (
          <span className="flex items-center gap-1 text-emerald-400">
            <Cloud className="h-3 w-3" />
            Synced to cloud
          </span>
        ) : (
          <span className="flex items-center gap-1 text-white">
            <CloudOff className="h-3 w-3" />
            Local only — sign in to sync
          </span>
        )}
      </div>

      {/* Quick Stats */}
      {entries.length > 0 && (
        <div className="flex justify-between items-center">
          <SecondaryButton onClick={() => setView('history')} size="sm">
            <Calendar className="h-4 w-4 mr-1" />
            History
          </SecondaryButton>
          <div className="text-right">
            <Eyebrow>Weekly avg</Eyebrow>
            <div className="mt-1 text-[13px] font-semibold text-elec-yellow tabular-nums">
              {getWeeklyAverage()}h
            </div>
          </div>
        </div>
      )}

      {/* Already logged indicator */}
      {todaysEntry && (
        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-[hsl(0_0%_12%)] border border-emerald-500/25">
          <Check className="h-5 w-5 text-emerald-400" />
          <div className="flex-1">
            <p className="text-[13px] text-white">Logged today: {todaysEntry.hours}h</p>
            <p className="text-[11px] text-white">You can update your entry below</p>
          </div>
        </div>
      )}

      {/* Sleep Time Input */}
      <FormCard eyebrow="Sleep window">
        <div className="space-y-1.5">
          <label className="text-[11.5px] text-white mb-1.5 inline-flex items-center gap-2">
            <BedDouble className="h-4 w-4 text-elec-yellow" />
            Went to bed
          </label>
          <input
            type="time"
            value={bedTime}
            onChange={(e) => setBedTime(e.target.value)}
            className={`${inputClass} text-center text-lg`}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11.5px] text-white mb-1.5 inline-flex items-center gap-2">
            <Sun className="h-4 w-4 text-elec-yellow" />
            Woke up
          </label>
          <input
            type="time"
            value={wakeTime}
            onChange={(e) => setWakeTime(e.target.value)}
            className={`${inputClass} text-center text-lg`}
          />
        </div>

        {/* Sleep Duration Display */}
        <div className="text-center py-4 rounded-xl bg-[hsl(0_0%_9%)] border border-white/[0.08]">
          <div className="text-4xl font-semibold text-elec-yellow tabular-nums">{sleepHours}h</div>
          <div className="mt-1 text-[12px] text-white">sleep duration</div>
          <div
            className={`text-[11px] mt-1 ${
              sleepHours < 6
                ? 'text-red-400'
                : sleepHours < 7
                  ? 'text-orange-400'
                  : sleepHours > 9
                    ? 'text-orange-400'
                    : 'text-emerald-400'
            }`}
          >
            {sleepHours < 6
              ? 'Try for more sleep'
              : sleepHours < 7
                ? 'A bit short'
                : sleepHours > 9
                  ? 'Quite long'
                  : 'Healthy range'}
          </div>
        </div>
      </FormCard>

      {/* Sleep Quality */}
      <FormCard eyebrow="How well did you sleep?">
        <div className="flex justify-between gap-1">
          {qualityLabels.map((q) => (
            <button
              key={q.value}
              onClick={() => setQuality(q.value)}
              className={`flex flex-col items-center gap-1 p-2 sm:p-3 rounded-xl transition-all min-h-[72px] min-w-[56px] touch-manipulation active:scale-[0.95] ${
                quality === q.value
                  ? 'bg-elec-yellow/15 border border-elec-yellow/40'
                  : 'bg-[hsl(0_0%_9%)] border border-white/[0.08] hover:bg-[hsl(0_0%_15%)]'
              }`}
            >
              <span className="text-2xl">{q.emoji}</span>
              <span className="text-[10px] text-white">{q.label}</span>
            </button>
          ))}
        </div>
      </FormCard>

      {/* Sleep Factors */}
      <FormCard eyebrow="What affected your sleep?">
        <div className="flex flex-wrap gap-2">
          {sleepFactors.map((factor) => (
            <button
              key={factor}
              onClick={() => toggleFactor(factor)}
              className={`px-4 py-2.5 rounded-full text-[13px] transition-all min-h-[40px] touch-manipulation active:scale-[0.95] ${
                selectedFactors.includes(factor)
                  ? 'bg-elec-yellow text-black font-semibold'
                  : 'bg-[hsl(0_0%_9%)] text-white border border-white/[0.08] hover:bg-[hsl(0_0%_15%)]'
              }`}
            >
              {factor}
            </button>
          ))}
        </div>
      </FormCard>

      {/* Sticky Save Button */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-6 bg-[hsl(0_0%_8%)]/95 backdrop-blur-xl border-t border-white/[0.06] sm:static sm:bg-transparent sm:border-none sm:p-0">
        <PrimaryButton onClick={handleSaveSleep} size="lg" fullWidth>
          {saved ? (
            <>
              <Check className="h-5 w-5 mr-2" />
              Saved
            </>
          ) : (
            <>
              <Moon className="h-5 w-5 mr-2" />
              {todaysEntry ? 'Update sleep log' : 'Save sleep log'}
            </>
          )}
        </PrimaryButton>
      </div>

      {/* Info Card */}
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
          <div>
            <Eyebrow>Why track sleep?</Eyebrow>
            <p className="mt-2 text-[13px] text-white leading-relaxed">
              Poor sleep affects mood, concentration, and decision-making — all crucial for safety
              on site. Tracking helps identify patterns and improve quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepTracker;
