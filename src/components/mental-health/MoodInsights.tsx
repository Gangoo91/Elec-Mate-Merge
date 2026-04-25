import { useState, useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  BarChart3,
  Lightbulb,
  Clock,
} from 'lucide-react';
import { useMentalHealth } from '@/contexts/MentalHealthContext';
import {
  Eyebrow,
  ListCard,
  EmptyState,
  FilterBar,
} from '@/components/college/primitives';

const moodEmojis = [
  { value: 1, emoji: '😢', label: 'Struggling' },
  { value: 2, emoji: '😔', label: 'Low' },
  { value: 3, emoji: '😐', label: 'Okay' },
  { value: 4, emoji: '🙂', label: 'Good' },
  { value: 5, emoji: '😊', label: 'Great' },
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
    return moodHistory.filter((e) => new Date(e.date) >= cutoff);
  }, [moodHistory, viewPeriod]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (filteredEntries.length === 0) return null;

    const sum = filteredEntries.reduce((acc, e) => acc + e.mood, 0);
    const average = sum / filteredEntries.length;

    // Mood distribution
    const distribution = [0, 0, 0, 0, 0];
    filteredEntries.forEach((e) => distribution[e.mood - 1]++);

    // Day of week analysis
    const dayMoods: number[][] = [[], [], [], [], [], [], []];
    filteredEntries.forEach((e) => {
      const day = new Date(e.date).getDay();
      dayMoods[day].push(e.mood);
    });
    const dayAverages = dayMoods.map((moods) =>
      moods.length > 0 ? moods.reduce((a, b) => a + b, 0) / moods.length : 0
    );

    // Find best and worst days
    let bestDay = 0,
      worstDay = 0;
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
      totalEntries: filteredEntries.length,
    };
  }, [filteredEntries]);

  // Generate insights
  const insights = useMemo(() => {
    if (!stats || stats.totalEntries < 3) return [];

    const insights: { text: string; type: 'positive' | 'neutral' | 'concern' }[] = [];

    // Trend insight
    if (stats.trend > 0.3) {
      insights.push({
        text: "Your mood has been improving recently! Keep up what you're doing.",
        type: 'positive',
      });
    } else if (stats.trend < -0.3) {
      insights.push({
        text: 'Your mood has been lower lately. Consider reaching out for support.',
        type: 'concern',
      });
    }

    // Day pattern insight
    if (stats.dayAverages[stats.bestDay] > 0 && stats.dayAverages[stats.worstDay] > 0) {
      if (stats.dayAverages[stats.bestDay] - stats.dayAverages[stats.worstDay] > 0.5) {
        insights.push({
          text: `${dayNames[stats.bestDay]}s tend to be your best days. ${dayNames[stats.worstDay]}s are harder.`,
          type: 'neutral',
        });
      }
    }

    // Average mood insight
    if (stats.average >= 4) {
      insights.push({
        text: "You've been feeling good overall. That's wonderful.",
        type: 'positive',
      });
    } else if (stats.average < 2.5) {
      insights.push({
        text: "You've been going through a tough time. Remember, it's okay to ask for help.",
        type: 'concern',
      });
    }

    // Consistency insight
    if (stats.totalEntries >= 5 && viewPeriod === 'week') {
      insights.push({
        text: 'Great job tracking regularly. This builds self-awareness.',
        type: 'positive',
      });
    }

    return insights;
  }, [stats, viewPeriod]);

  // Not enough data
  if (moodHistory.length < 2) {
    return (
      <div className="space-y-4">
        <div className="text-center py-2">
          <Eyebrow>Mental health</Eyebrow>
          <h2 className="mt-1.5 text-xl font-semibold text-white tracking-tight">Mood insights</h2>
          <p className="mt-1 text-[13px] text-white">Track patterns in how you feel</p>
        </div>

        <EmptyState
          title="Not enough data yet"
          description="Log your mood a few more times to start seeing patterns and insights. Check in regularly to understand yourself better."
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center py-2">
        <Eyebrow>Mental health</Eyebrow>
        <h2 className="mt-1.5 text-xl font-semibold text-white tracking-tight">Mood insights</h2>
        <p className="mt-1 text-[13px] text-white">Understanding your patterns</p>
      </div>

      {/* Period Toggle */}
      <FilterBar
        tabs={[
          { value: 'week', label: 'Past week' },
          { value: 'month', label: 'Past month' },
        ]}
        activeTab={viewPeriod}
        onTabChange={(value) => setViewPeriod(value as 'week' | 'month')}
      />

      {stats && (
        <>
          {/* Overview Stats */}
          <div className="grid grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="bg-[hsl(0_0%_12%)] px-4 py-5 text-center">
              <Eyebrow>Average</Eyebrow>
              <div className="mt-2 text-2xl">
                {moodEmojis.find((m) => m.value === Math.round(stats.average))?.emoji || '😐'}
              </div>
              <div className="mt-1 text-lg font-semibold text-white tabular-nums">
                {stats.average.toFixed(1)}
              </div>
            </div>
            <div className="bg-[hsl(0_0%_12%)] px-4 py-5 text-center">
              <Eyebrow>Trend</Eyebrow>
              <div className="mt-2 flex items-center justify-center">
                {stats.trend > 0 ? (
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                ) : stats.trend < 0 ? (
                  <TrendingDown className="h-5 w-5 text-red-400" />
                ) : (
                  <Minus className="h-5 w-5 text-elec-yellow" />
                )}
              </div>
              <div
                className={`mt-1 text-lg font-semibold tabular-nums ${
                  stats.trend > 0
                    ? 'text-emerald-400'
                    : stats.trend < 0
                      ? 'text-red-400'
                      : 'text-elec-yellow'
                }`}
              >
                {stats.trend > 0 ? '+' : ''}
                {stats.trend.toFixed(1)}
              </div>
            </div>
            <div className="bg-[hsl(0_0%_12%)] px-4 py-5 text-center">
              <Eyebrow>Check-ins</Eyebrow>
              <div className="mt-2">
                <Calendar className="h-5 w-5 text-white mx-auto" />
              </div>
              <div className="mt-1 text-lg font-semibold text-white tabular-nums">
                {stats.totalEntries}
              </div>
            </div>
          </div>

          {/* Mood Distribution */}
          <ListCard>
            <div className="px-5 py-4 border-b border-white/[0.06]">
              <Eyebrow>Mood distribution</Eyebrow>
              <h3 className="mt-1 text-[15px] font-medium text-white flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-elec-yellow" />
                Mood distribution
              </h3>
            </div>
            <div className="px-5 py-5">
              <div className="flex items-end justify-between gap-2 h-24">
                {stats.distribution.map((count, i) => {
                  const maxCount = Math.max(...stats.distribution);
                  const height = maxCount > 0 ? (count / maxCount) * 100 : 0;
                  const mood = moodEmojis[i];
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex flex-col items-center">
                        <span className="text-[11px] text-white mb-1 tabular-nums">{count}</span>
                        <div
                          className="w-full rounded-t bg-elec-yellow transition-all"
                          style={{ height: `${Math.max(height, 4)}%`, minHeight: '4px' }}
                        />
                      </div>
                      <span className="text-lg">{mood.emoji}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </ListCard>

          {/* Day of Week Analysis */}
          <ListCard>
            <div className="px-5 py-4 border-b border-white/[0.06]">
              <Eyebrow>By day of week</Eyebrow>
              <h3 className="mt-1 text-[15px] font-medium text-white flex items-center gap-2">
                <Clock className="h-4 w-4 text-elec-yellow" />
                By day of week
              </h3>
            </div>
            <div className="px-5 py-5">
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {dayNames.map((day, i) => {
                  const avg = stats.dayAverages[i];
                  const mood = avg > 0 ? moodEmojis[Math.round(avg) - 1] : null;
                  const isBest = i === stats.bestDay && avg > 0;
                  const isWorst = i === stats.worstDay && avg > 0;
                  return (
                    <div
                      key={day}
                      className={`p-1.5 sm:p-2 rounded-lg text-center ${
                        isBest
                          ? 'bg-emerald-500/15 border border-emerald-500/30'
                          : isWorst
                            ? 'bg-red-500/15 border border-red-500/30'
                            : 'bg-[hsl(0_0%_9%)] border border-white/[0.08]'
                      }`}
                    >
                      <span className="text-base sm:text-lg block mb-0.5 sm:mb-1">
                        {mood ? mood.emoji : '—'}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-white block">{day}</span>
                      {avg > 0 && (
                        <span className="text-[10px] text-white tabular-nums hidden sm:block">
                          {avg.toFixed(1)}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </ListCard>

          {/* Insights */}
          {insights.length > 0 && (
            <ListCard>
              <div className="px-5 py-4 border-b border-white/[0.06]">
                <Eyebrow>Your insights</Eyebrow>
                <h3 className="mt-1 text-[15px] font-medium text-white flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-elec-yellow" />
                  Your insights
                </h3>
              </div>
              <div className="px-5 py-5 space-y-2">
                {insights.map((insight, i) => (
                  <div
                    key={i}
                    className={`px-4 py-3 rounded-xl text-[13px] border ${
                      insight.type === 'positive'
                        ? 'bg-emerald-500/10 text-white border-emerald-500/25'
                        : insight.type === 'concern'
                          ? 'bg-red-500/10 text-white border-red-500/25'
                          : 'bg-[hsl(0_0%_9%)] text-white border-white/[0.08]'
                    }`}
                  >
                    {insight.text}
                  </div>
                ))}
              </div>
            </ListCard>
          )}

          {/* Tip */}
          <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5">
            <Eyebrow>Keep tracking</Eyebrow>
            <p className="mt-2 text-[13px] text-white leading-relaxed">
              The more data you log, the better insights you'll get about your mental health
              patterns.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default MoodInsights;
