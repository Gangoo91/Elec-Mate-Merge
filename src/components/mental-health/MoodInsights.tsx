
import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  BarChart3,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Sun,
  Moon,
  Clock
} from "lucide-react";
import { useMentalHealth } from "@/contexts/MentalHealthContext";

const moodEmojis = [
  { value: 1, emoji: "😢", label: "Struggling", color: "bg-red-500" },
  { value: 2, emoji: "😔", label: "Low", color: "bg-orange-500" },
  { value: 3, emoji: "😐", label: "Okay", color: "bg-yellow-500" },
  { value: 4, emoji: "🙂", label: "Good", color: "bg-lime-500" },
  { value: 5, emoji: "😊", label: "Great", color: "bg-green-500" }
];

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MoodInsights = () => {
  const { moodHistory } = useMentalHealth();
  const [viewPeriod, setViewPeriod] = useState<'week' | 'month'>('week');

  // Filter entries based on view period
  const filteredEntries = useMemo(() => {
    const now = new Date();
    const days = viewPeriod === 'week' ? 7 : 30;
    const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    return moodHistory.filter(e => new Date(e.date) >= cutoff);
  }, [moodHistory, viewPeriod]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (filteredEntries.length === 0) return null;

    const sum = filteredEntries.reduce((acc, e) => acc + e.mood, 0);
    const average = sum / filteredEntries.length;

    // Mood distribution
    const distribution = [0, 0, 0, 0, 0];
    filteredEntries.forEach(e => distribution[e.mood - 1]++);

    // Day of week analysis
    const dayMoods: number[][] = [[], [], [], [], [], [], []];
    filteredEntries.forEach(e => {
      const day = new Date(e.date).getDay();
      dayMoods[day].push(e.mood);
    });
    const dayAverages = dayMoods.map(moods =>
      moods.length > 0 ? moods.reduce((a, b) => a + b, 0) / moods.length : 0
    );

    // Find best and worst days
    let bestDay = 0, worstDay = 0;
    dayAverages.forEach((avg, i) => {
      if (avg > dayAverages[bestDay] && avg > 0) bestDay = i;
      if ((avg < dayAverages[worstDay] || dayAverages[worstDay] === 0) && avg > 0) worstDay = i;
    });

    // Trend analysis (compare first half to second half)
    const half = Math.floor(filteredEntries.length / 2);
    if (half > 0) {
      const firstHalf = filteredEntries.slice(half).reduce((a, e) => a + e.mood, 0) / half;
      const secondHalf = filteredEntries.slice(0, half).reduce((a, e) => a + e.mood, 0) / half;
      var trend = secondHalf - firstHalf;
    } else {
      var trend = 0;
    }

    // Most common mood
    const maxCount = Math.max(...distribution);
    const mostCommon = distribution.indexOf(maxCount) + 1;

    return {
      average,
      distribution,
      dayAverages,
      bestDay,
      worstDay,
      trend,
      mostCommon,
      totalEntries: filteredEntries.length
    };
  }, [filteredEntries]);

  // Generate insights
  const insights = useMemo(() => {
    if (!stats || stats.totalEntries < 3) return [];

    const insights: { text: string; type: 'positive' | 'neutral' | 'concern' }[] = [];

    // Trend insight
    if (stats.trend > 0.3) {
      insights.push({ text: "Your mood has been improving recently! Keep up what you're doing.", type: 'positive' });
    } else if (stats.trend < -0.3) {
      insights.push({ text: "Your mood has been lower lately. Consider reaching out for support.", type: 'concern' });
    }

    // Day pattern insight
    if (stats.dayAverages[stats.bestDay] > 0 && stats.dayAverages[stats.worstDay] > 0) {
      if (stats.dayAverages[stats.bestDay] - stats.dayAverages[stats.worstDay] > 0.5) {
        insights.push({
          text: `${dayNames[stats.bestDay]}s tend to be your best days. ${dayNames[stats.worstDay]}s are harder.`,
          type: 'neutral'
        });
      }
    }

    // Average mood insight
    if (stats.average >= 4) {
      insights.push({ text: "You've been feeling good overall. That's wonderful!", type: 'positive' });
    } else if (stats.average < 2.5) {
      insights.push({ text: "You've been going through a tough time. Remember, it's okay to ask for help.", type: 'concern' });
    }

    // Consistency insight
    if (stats.totalEntries >= 5 && viewPeriod === 'week') {
      insights.push({ text: "Great job tracking regularly! This builds self-awareness.", type: 'positive' });
    }

    return insights;
  }, [stats, viewPeriod]);

  // Not enough data
  if (moodHistory.length < 2) {
    return (
      <div className="space-y-4">
        <div className="text-center py-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-3">
            <BarChart3 className="h-6 w-6 text-blue-400" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-1">Mood Insights</h2>
          <p className="text-sm text-white/80">
            Track patterns in how you feel
          </p>
        </div>

        <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-purple-500/5">
          <CardContent className="text-center py-8">
            <Lightbulb className="h-10 w-10 text-blue-400 mx-auto mb-3 opacity-50" />
            <h3 className="font-medium text-foreground mb-2">Not enough data yet</h3>
            <p className="text-sm text-white/80 max-w-xs mx-auto">
              Log your mood a few more times to start seeing patterns and insights.
              Check in regularly to understand yourself better.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center py-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-3">
          <BarChart3 className="h-6 w-6 text-blue-400" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-1">Mood Insights</h2>
        <p className="text-sm text-white/80">
          Understanding your patterns
        </p>
      </div>

      {/* Period Toggle */}
      <div className="flex justify-center gap-2">
        <Button
          size="sm"
          variant={viewPeriod === 'week' ? 'default' : 'outline'}
          onClick={() => setViewPeriod('week')}
          className={viewPeriod === 'week' ? 'bg-blue-500' : ''}
        >
          Past Week
        </Button>
        <Button
          size="sm"
          variant={viewPeriod === 'month' ? 'default' : 'outline'}
          onClick={() => setViewPeriod('month')}
          className={viewPeriod === 'month' ? 'bg-blue-500' : ''}
        >
          Past Month
        </Button>
      </div>

      {stats && (
        <>
          {/* Overview Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <Card className="border-blue-500/20 bg-blue-500/5">
              <CardContent className="p-2 sm:p-3 text-center">
                <div className="text-xl sm:text-2xl mb-1">
                  {moodEmojis.find(m => m.value === Math.round(stats.average))?.emoji || "😐"}
                </div>
                <div className="text-lg sm:text-xl font-bold text-blue-400">{stats.average.toFixed(1)}</div>
                <div className="text-[11px] sm:text-xs text-white/80">Average</div>
              </CardContent>
            </Card>
            <Card className="border-purple-500/20 bg-purple-500/5">
              <CardContent className="p-2 sm:p-3 text-center">
                {stats.trend > 0 ? (
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 mx-auto mb-1" />
                ) : stats.trend < 0 ? (
                  <TrendingDown className="h-5 w-5 sm:h-6 sm:w-6 text-red-400 mx-auto mb-1" />
                ) : (
                  <Minus className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 mx-auto mb-1" />
                )}
                <div className={`text-lg sm:text-xl font-bold ${
                  stats.trend > 0 ? 'text-green-400' :
                  stats.trend < 0 ? 'text-red-400' :
                  'text-yellow-400'
                }`}>
                  {stats.trend > 0 ? '+' : ''}{stats.trend.toFixed(1)}
                </div>
                <div className="text-[11px] sm:text-xs text-white/80">Trend</div>
              </CardContent>
            </Card>
            <Card className="border-green-500/20 bg-green-500/5">
              <CardContent className="p-2 sm:p-3 text-center">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 mx-auto mb-1" />
                <div className="text-lg sm:text-xl font-bold text-green-400">{stats.totalEntries}</div>
                <div className="text-[11px] sm:text-xs text-white/80">Check-ins</div>
              </CardContent>
            </Card>
          </div>

          {/* Mood Distribution */}
          <Card className="border-white/10 bg-white/5">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-400" />
                Mood Distribution
              </h3>
              <div className="flex items-end justify-between gap-2 h-20">
                {stats.distribution.map((count, i) => {
                  const maxCount = Math.max(...stats.distribution);
                  const height = maxCount > 0 ? (count / maxCount) * 100 : 0;
                  const mood = moodEmojis[i];
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex flex-col items-center">
                        <span className="text-xs text-white/80 mb-1">{count}</span>
                        <div
                          className={`w-full rounded-t ${mood.color}/60 transition-all`}
                          style={{ height: `${Math.max(height, 4)}%`, minHeight: '4px' }}
                        />
                      </div>
                      <span className="text-lg">{mood.emoji}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Day of Week Analysis */}
          <Card className="border-white/10 bg-white/5">
            <CardContent className="p-4">
              <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-400" />
                By Day of Week
              </h3>
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {dayNames.map((day, i) => {
                  const avg = stats.dayAverages[i];
                  const mood = avg > 0 ? moodEmojis[Math.round(avg) - 1] : null;
                  const isBest = i === stats.bestDay && avg > 0;
                  const isWorst = i === stats.worstDay && avg > 0;
                  return (
                    <div
                      key={day}
                      className={`p-1 sm:p-2 rounded-lg text-center ${
                        isBest ? 'bg-green-500/20 ring-1 ring-green-500/40' :
                        isWorst ? 'bg-red-500/20 ring-1 ring-red-500/40' :
                        'bg-white/5'
                      }`}
                    >
                      <span className="text-base sm:text-lg block mb-0.5 sm:mb-1">
                        {mood ? mood.emoji : "—"}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-white/80 block">{day}</span>
                      {avg > 0 && (
                        <span className="text-[9px] sm:text-[10px] text-foreground/50 hidden sm:block">{avg.toFixed(1)}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Insights */}
          {insights.length > 0 && (
            <Card className="border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-orange-500/5">
              <CardContent className="p-4">
                <h3 className="text-sm font-medium text-amber-400 mb-3 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Your Insights
                </h3>
                <div className="space-y-2">
                  {insights.map((insight, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg text-sm ${
                        insight.type === 'positive' ? 'bg-green-500/10 text-green-200' :
                        insight.type === 'concern' ? 'bg-red-500/10 text-red-200' :
                        'bg-white/5 text-foreground/80'
                      }`}
                    >
                      {insight.text}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tip */}
          <Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-indigo-500/5">
            <CardContent className="p-4">
              <p className="text-sm text-blue-200">
                <strong className="text-blue-400">Keep tracking:</strong> The more data you log,
                the better insights you'll get about your mental health patterns.
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default MoodInsights;
