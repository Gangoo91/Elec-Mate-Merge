
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Moon,
  Sun,
  Clock,
  TrendingUp,
  Minus,
  Plus,
  ChevronLeft,
  Coffee,
  Sparkles,
  Calendar,
  Check,
  BedDouble,
  Cloud,
  CloudOff
} from "lucide-react";
import { useSleepData } from "@/hooks/useMentalHealthSync";
import { useAuth } from "@/contexts/AuthContext";

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
  { value: 1, label: "Terrible", emoji: "😫", color: "bg-red-500" },
  { value: 2, label: "Poor", emoji: "😔", color: "bg-orange-500" },
  { value: 3, label: "Okay", emoji: "😐", color: "bg-yellow-500" },
  { value: 4, label: "Good", emoji: "🙂", color: "bg-lime-500" },
  { value: 5, label: "Great", emoji: "😴", color: "bg-green-500" }
];

const sleepFactors = [
  "Caffeine late", "Screen time", "Stressed", "Exercise helped",
  "Good routine", "Bad dreams", "Woke up often", "Felt rested"
];

const SleepTracker = () => {
  const { user } = useAuth();
  const { entries, saveSleepEntry, isLoading } = useSleepData();
  const [view, setView] = useState<'log' | 'history'>('log');
  const [bedTime, setBedTime] = useState("22:30");
  const [wakeTime, setWakeTime] = useState("06:30");
  const [quality, setQuality] = useState(3);
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);

  // Check if already logged today
  const today = new Date().toISOString().split('T')[0];
  const todaysEntry = entries.find(e => e.date === today);

  // Calculate sleep hours
  const calculateHours = (bed: string, wake: string): number => {
    const [bedH, bedM] = bed.split(":").map(Number);
    const [wakeH, wakeM] = wake.split(":").map(Number);

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
      notes: selectedFactors
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
    const recentAvg = lastWeek.slice(0, 3).reduce((s, e) => s + e.quality, 0) / Math.min(3, lastWeek.length);
    const prevAvg = lastWeek.slice(3).reduce((s, e) => s + e.quality, 0) / Math.max(1, lastWeek.length - 3);
    return recentAvg - prevAvg;
  };

  const toggleFactor = (factor: string) => {
    if (selectedFactors.includes(factor)) {
      setSelectedFactors(selectedFactors.filter(f => f !== factor));
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
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setView('log')}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <span className="text-sm text-white">Sleep History</span>
          <div className="w-16" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="border-indigo-500/20 bg-indigo-500/5">
            <CardContent className="p-3 text-center">
              <Clock className="h-5 w-5 text-indigo-400 mx-auto mb-1" />
              <div className="text-2xl font-bold text-foreground">{weeklyAvg}h</div>
              <div className="text-[10px] text-white">Weekly Average</div>
            </CardContent>
          </Card>
          <Card className="border-purple-500/20 bg-purple-500/5">
            <CardContent className="p-3 text-center">
              <TrendingUp className={`h-5 w-5 mx-auto mb-1 ${qualityTrend > 0 ? 'text-green-400' : qualityTrend < 0 ? 'text-red-400' : 'text-yellow-400'}`} />
              <div className="text-2xl font-bold text-foreground">
                {qualityTrend > 0 ? '+' : ''}{qualityTrend.toFixed(1)}
              </div>
              <div className="text-[10px] text-white">Quality Trend</div>
            </CardContent>
          </Card>
        </div>

        {/* Entries */}
        <div className="space-y-2">
          {entries.length > 0 ? (
            entries.slice(0, 14).map(entry => {
              const q = qualityLabels.find(x => x.value === entry.quality);
              const date = new Date(entry.date);
              return (
                <Card key={entry.id} className="border-white/10 bg-white/5">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{q?.emoji}</span>
                        <div>
                          <div className="text-sm font-medium text-foreground">
                            {date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                          </div>
                          <div className="text-xs text-white">
                            {entry.bed_time} - {entry.wake_time}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-indigo-400">{entry.hours}h</div>
                        <div className="text-xs text-white">{q?.label}</div>
                      </div>
                    </div>
                    {entry.notes && entry.notes.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {entry.notes.map(note => (
                          <span key={note} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-foreground/60">
                            {note}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Card className="border-white/10 bg-white/5">
              <CardContent className="text-center py-8">
                <Moon className="h-10 w-10 text-white mx-auto mb-3" />
                <p className="text-sm text-white">No sleep data yet</p>
                <Button size="sm" className="mt-3" onClick={() => setView('log')}>
                  Log Your Sleep
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Tip */}
        <Card className="border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-purple-500/5">
          <CardContent className="p-4">
            <p className="text-sm text-indigo-200">
              <strong className="text-indigo-400">Tip:</strong> Adults need 7-9 hours of sleep.
              Consistent sleep schedules improve quality more than duration.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Log view
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center py-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 mb-3">
          <Moon className="h-6 w-6 text-indigo-400" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-1">Sleep Tracker</h2>
        <p className="text-sm text-white">
          Track your sleep for better mental health
        </p>
      </div>

      {/* Cloud Sync Status */}
      <div className="flex items-center justify-center gap-2 text-xs">
        {user ? (
          <span className="flex items-center gap-1 text-green-400">
            <Cloud className="h-3 w-3" />
            Synced to cloud
          </span>
        ) : (
          <span className="flex items-center gap-1 text-white">
            <CloudOff className="h-3 w-3" />
            Local only - sign in to sync
          </span>
        )}
      </div>

      {/* Quick Stats */}
      {entries.length > 0 && (
        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm" onClick={() => setView('history')}>
            <Calendar className="h-4 w-4 mr-1" />
            History
          </Button>
          <div className="text-right">
            <div className="text-xs text-white">Weekly avg</div>
            <div className="text-sm font-bold text-indigo-400">{getWeeklyAverage()}h</div>
          </div>
        </div>
      )}

      {/* Already logged indicator */}
      {todaysEntry && (
        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="p-3 flex items-center gap-3">
            <Check className="h-5 w-5 text-green-400" />
            <div className="flex-1">
              <p className="text-sm text-foreground">Logged today: {todaysEntry.hours}h</p>
              <p className="text-xs text-white">You can update your entry below</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Sleep Time Input */}
      <Card className="border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 to-transparent">
        <CardContent className="p-4 space-y-4">
          {/* Bed Time */}
          <div>
            <label className="flex items-center gap-2 text-sm text-white mb-2">
              <BedDouble className="h-4 w-4 text-indigo-400" />
              Went to bed
            </label>
            <input
              type="time"
              value={bedTime}
              onChange={(e) => setBedTime(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-foreground text-lg text-center"
            />
          </div>

          {/* Wake Time */}
          <div>
            <label className="flex items-center gap-2 text-sm text-white mb-2">
              <Sun className="h-4 w-4 text-amber-400" />
              Woke up
            </label>
            <input
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-foreground text-lg text-center"
            />
          </div>

          {/* Sleep Duration Display */}
          <div className="text-center py-3 rounded-xl bg-white/5">
            <div className="text-4xl font-bold text-indigo-400">{sleepHours}h</div>
            <div className="text-sm text-white">sleep duration</div>
            <div className={`text-xs mt-1 ${
              sleepHours < 6 ? 'text-red-400' :
              sleepHours < 7 ? 'text-orange-400' :
              sleepHours > 9 ? 'text-orange-400' :
              'text-green-400'
            }`}>
              {sleepHours < 6 ? 'Try for more sleep' :
               sleepHours < 7 ? 'A bit short' :
               sleepHours > 9 ? 'Quite long' :
               'Healthy range!'}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sleep Quality */}
      <Card className="border-purple-500/20 bg-white/5">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-foreground mb-3">How well did you sleep?</h3>
          <div className="flex justify-between">
            {qualityLabels.map(q => (
              <button
                key={q.value}
                onClick={() => setQuality(q.value)}
                className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                  quality === q.value
                    ? `${q.color}/20 ring-2 ring-white/50`
                    : 'hover:bg-white/10'
                }`}
              >
                <span className="text-2xl">{q.emoji}</span>
                <span className="text-[10px] text-white">{q.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sleep Factors */}
      <Card className="border-white/10 bg-white/5">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-foreground mb-3">What affected your sleep?</h3>
          <div className="flex flex-wrap gap-2">
            {sleepFactors.map(factor => (
              <button
                key={factor}
                onClick={() => toggleFactor(factor)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                  selectedFactors.includes(factor)
                    ? 'bg-indigo-500 text-foreground'
                    : 'bg-white/10 text-foreground/60 hover:bg-white/20'
                }`}
              >
                {factor}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button
        className={`w-full h-12 transition-all ${
          saved
            ? 'bg-green-500 hover:bg-green-500'
            : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600'
        }`}
        onClick={handleSaveSleep}
      >
        {saved ? (
          <>
            <Check className="h-5 w-5 mr-2" />
            Saved!
          </>
        ) : (
          <>
            <Moon className="h-5 w-5 mr-2" />
            {todaysEntry ? 'Update Sleep Log' : 'Save Sleep Log'}
          </>
        )}
      </Button>

      {/* Info Card */}
      <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-indigo-500/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-200">
                <strong className="text-blue-400">Why track sleep?</strong>
              </p>
              <p className="text-xs text-white mt-1">
                Poor sleep affects mood, concentration, and decision-making - all crucial
                for safety on site. Tracking helps identify patterns and improve quality.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SleepTracker;
