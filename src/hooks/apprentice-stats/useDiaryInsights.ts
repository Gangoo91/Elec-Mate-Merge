/**
 * useDiaryInsights
 *
 * Deep analysis of site diary entries:
 * - Week-over-week comparison
 * - Mood trends + average mood
 * - Most productive day of the week
 * - Top sites with visit counts
 * - Skill frequency + diversity score
 * - Learning highlights (what_i_learned excerpts)
 * - Average entries per week
 * - First entry date
 * - Personalised insight sentences
 */

import { useMemo } from 'react';
import type { SiteDiaryEntry } from '@/hooks/site-diary/useSiteDiaryEntries';

export interface DiaryRecommendation {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  actionPath: string;
  priority: number;
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function startOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday start
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

const ALL_SKILLS = [
  'Practical Skills', 'Health & Safety', 'Testing & Inspection',
  'Wiring & Containment', 'Regulations', 'Tools & Equipment',
  'Communication', 'Problem Solving',
];

export function useDiaryInsights(entries: SiteDiaryEntry[]) {
  const today = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString('en-CA');
  }, []);

  // Entries this week vs last week
  const weekComparison = useMemo(() => {
    const now = new Date();
    const thisWeekStart = startOfWeek(now);
    const lastWeekStart = new Date(thisWeekStart);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);

    const thisWeek = entries.filter(e => {
      const d = new Date(e.date + 'T00:00:00');
      return d >= thisWeekStart;
    }).length;

    const lastWeek = entries.filter(e => {
      const d = new Date(e.date + 'T00:00:00');
      return d >= lastWeekStart && d < thisWeekStart;
    }).length;

    return { thisWeek, lastWeek, delta: thisWeek - lastWeek };
  }, [entries]);

  // Mood trend (last 7 entries with moods)
  const moodTrend = useMemo(() => {
    return entries
      .filter(e => e.mood_rating != null)
      .slice(0, 7)
      .map(e => ({
        date: e.date,
        mood: e.mood_rating!,
      }))
      .reverse(); // oldest first
  }, [entries]);

  // Average mood
  const averageMood = useMemo(() => {
    const withMood = entries.filter(e => e.mood_rating != null);
    if (withMood.length === 0) return null;
    const sum = withMood.reduce((s, e) => s + e.mood_rating!, 0);
    return Math.round((sum / withMood.length) * 10) / 10;
  }, [entries]);

  // Is mood declining?
  const moodDeclining = useMemo(() => {
    if (moodTrend.length < 3) return false;
    const recent = moodTrend.slice(-3);
    return recent.every((m, i) => i === 0 || m.mood <= recent[i - 1].mood) && recent[0].mood > recent[2].mood;
  }, [moodTrend]);

  // Most productive day of the week
  const mostProductiveDay = useMemo(() => {
    if (entries.length === 0) return null;
    const dayCounts = [0, 0, 0, 0, 0, 0, 0];
    entries.forEach(e => {
      const d = new Date(e.date + 'T00:00:00');
      dayCounts[d.getDay()]++;
    });
    const max = Math.max(...dayCounts);
    if (max === 0) return null;
    return DAY_NAMES[dayCounts.indexOf(max)];
  }, [entries]);

  // Top 3 sites
  const topSites = useMemo(() => {
    const counts: Record<string, number> = {};
    entries.forEach(e => {
      counts[e.site_name] = (counts[e.site_name] || 0) + 1;
    });
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([name, count]) => ({ name, count }));
  }, [entries]);

  // Unique sites count
  const uniqueSitesCount = useMemo(() => {
    return new Set(entries.map(e => e.site_name)).size;
  }, [entries]);

  // Skill frequency
  const skillFrequency = useMemo(() => {
    const counts: Record<string, number> = {};
    entries.forEach(e => {
      e.skills_practised.forEach(s => {
        counts[s] = (counts[s] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .map(([skill, count]) => ({ skill, count }));
  }, [entries]);

  // Skill diversity score (skills logged / total possible)
  const skillDiversityPercent = useMemo(() => {
    const logged = new Set(skillFrequency.map(s => s.skill));
    return Math.round((logged.size / ALL_SKILLS.length) * 100);
  }, [skillFrequency]);

  // Learning highlights (recent what_i_learned excerpts)
  const learningHighlights = useMemo(() => {
    return entries
      .filter(e => e.what_i_learned && e.what_i_learned.trim().length > 10)
      .slice(0, 3)
      .map(e => ({
        date: e.date,
        text: e.what_i_learned!.slice(0, 120) + (e.what_i_learned!.length > 120 ? '...' : ''),
        site: e.site_name,
      }));
  }, [entries]);

  // Has entry today?
  const hasEntryToday = useMemo(() => {
    return entries.some(e => e.date === today);
  }, [entries, today]);

  // Diary streak (consecutive days with entries)
  const diaryStreak = useMemo(() => {
    let streak = 0;
    const d = new Date();
    for (let i = 0; i < 365; i++) {
      const dateStr = d.toLocaleDateString('en-CA');
      if (entries.some(e => e.date === dateStr)) {
        streak++;
        d.setDate(d.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }, [entries]);

  // Average entries per week (over last 4 weeks)
  const avgEntriesPerWeek = useMemo(() => {
    if (entries.length === 0) return 0;
    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
    const recentEntries = entries.filter(e => new Date(e.date + 'T00:00:00') >= fourWeeksAgo);
    return Math.round((recentEntries.length / 4) * 10) / 10;
  }, [entries]);

  // First entry date
  const firstEntryDate = useMemo(() => {
    if (entries.length === 0) return null;
    const oldest = entries[entries.length - 1];
    return new Date(oldest.date + 'T00:00:00').toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }, [entries]);

  // Personalised insight
  const insightText = useMemo(() => {
    const insights: string[] = [];

    if (mostProductiveDay) {
      insights.push(`You tend to log more entries on ${mostProductiveDay}s.`);
    }
    if (averageMood !== null && averageMood >= 4) {
      insights.push('Your average mood is positive -- great sign for your wellbeing.');
    }
    if (skillDiversityPercent >= 75) {
      insights.push(`Impressive skill diversity -- you've logged ${skillDiversityPercent}% of all skill categories.`);
    } else if (skillDiversityPercent < 40 && entries.length > 5) {
      insights.push(`You've only covered ${skillDiversityPercent}% of skill categories. Try logging different skills.`);
    }
    if (uniqueSitesCount >= 3) {
      insights.push(`You've worked across ${uniqueSitesCount} different sites -- great breadth of experience.`);
    }
    if (avgEntriesPerWeek >= 4) {
      insights.push(`Averaging ${avgEntriesPerWeek} entries per week -- excellent record-keeping.`);
    }

    return insights[0] || null;
  }, [mostProductiveDay, averageMood, skillDiversityPercent, uniqueSitesCount, avgEntriesPerWeek, entries.length]);

  // Recommendations
  const recommendations = useMemo((): DiaryRecommendation[] => {
    const recs: DiaryRecommendation[] = [];

    if (!hasEntryToday) {
      recs.push({
        id: 'log-today',
        title: 'Log today\'s experience',
        description: 'Record what you worked on and learned today.',
        actionLabel: 'Add diary entry',
        actionPath: '/apprentice/site-diary',
        priority: 1,
      });
    }

    if (moodDeclining) {
      recs.push({
        id: 'mood-check',
        title: 'Check in with the Mental Health Hub',
        description: 'Your recent mood has been trending down. It\'s okay to ask for support.',
        actionLabel: 'Visit Mental Health Hub',
        actionPath: '/apprentice/mental-health',
        priority: 2,
      });
    }

    if (weekComparison.delta < 0) {
      recs.push({
        id: 'keep-up',
        title: 'You logged more last week -- keep it up!',
        description: `${weekComparison.lastWeek} entries last week vs ${weekComparison.thisWeek} this week.`,
        actionLabel: 'Add entry',
        actionPath: '/apprentice/site-diary',
        priority: 3,
      });
    }

    const loggedSkills = new Set(skillFrequency.map(s => s.skill));
    const unlogged = ALL_SKILLS.filter(s => !loggedSkills.has(s));
    if (unlogged.length > 0 && entries.length > 3) {
      recs.push({
        id: 'new-skill',
        title: `Try logging "${unlogged[0]}"`,
        description: `You've covered ${loggedSkills.size} of ${ALL_SKILLS.length} skill categories. Broaden your portfolio.`,
        actionLabel: 'Add diary entry',
        actionPath: '/apprentice/site-diary',
        priority: 4,
      });
    }

    return recs.sort((a, b) => a.priority - b.priority);
  }, [hasEntryToday, moodDeclining, weekComparison, skillFrequency, entries.length]);

  return {
    totalEntries: entries.length,
    weekComparison,
    moodTrend,
    averageMood,
    moodDeclining,
    mostProductiveDay,
    topSites,
    uniqueSitesCount,
    skillFrequency,
    skillDiversityPercent,
    learningHighlights,
    hasEntryToday,
    diaryStreak,
    avgEntriesPerWeek,
    firstEntryDate,
    insightText,
    recommendations,
  };
}
