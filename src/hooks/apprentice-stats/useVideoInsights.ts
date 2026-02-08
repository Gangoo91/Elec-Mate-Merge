/**
 * useVideoInsights
 *
 * Deep analysis of video learning:
 * - Watched/total with completion percentage
 * - Estimated total watch time invested
 * - Level distribution (beginner/intermediate/advanced)
 * - Category breakdown with coverage visual
 * - Unwatched bookmarks
 * - Next recommended video (based on quiz weakness)
 * - Personalised insight sentence
 */

import { useMemo } from 'react';
import { useVideoBookmarks } from '@/hooks/learning-videos/useVideoBookmarks';
import { useQuizResults } from '@/hooks/useQuizResults';
import { curatedVideos, categoryLabels, type VideoCategory, type CuratedVideo } from '@/data/apprentice/curatedVideos';

export interface VideoRecommendation {
  id: string;
  title: string;
  description: string;
  actionLabel: string;
  actionPath: string;
  priority: number;
}

// Map quiz categories to video categories for cross-referencing
const quizToVideoCategory: Record<string, VideoCategory[]> = {
  'Regulations': ['bs7671'],
  'Safety': ['safety'],
  'Testing': ['testing-inspection'],
  'Design': ['wiring', 'domestic', 'commercial'],
};

// Parse duration string "MM:SS" to minutes
function parseDurationMinutes(duration: string): number {
  const parts = duration.split(':');
  if (parts.length === 2) {
    return parseInt(parts[0], 10) + parseInt(parts[1], 10) / 60;
  }
  return 0;
}

export function useVideoInsights() {
  const { bookmarks, watchedCount, isBookmarked, getWatchedIds } = useVideoBookmarks();
  const { getPerformanceByCategory, isLoading: quizLoading } = useQuizResults();

  const totalVideos = curatedVideos.length;

  // Get watched video IDs from the hook (user-specific)
  const watchedIds = useMemo(() => {
    return getWatchedIds();
  }, [getWatchedIds, watchedCount]);

  // Completion percentage
  const completionPercent = useMemo(() => {
    if (totalVideos === 0) return 0;
    return Math.round((watchedCount / totalVideos) * 100);
  }, [watchedCount, totalVideos]);

  // Estimated total watch time invested (minutes)
  const watchTimeMinutes = useMemo(() => {
    let total = 0;
    curatedVideos.forEach(v => {
      if (watchedIds.includes(v.id)) {
        total += parseDurationMinutes(v.duration);
      }
    });
    return Math.round(total);
  }, [watchedIds]);

  // Remaining watch time
  const remainingTimeMinutes = useMemo(() => {
    let total = 0;
    curatedVideos.forEach(v => {
      if (!watchedIds.includes(v.id)) {
        total += parseDurationMinutes(v.duration);
      }
    });
    return Math.round(total);
  }, [watchedIds]);

  // Level distribution of watched videos
  const levelDistribution = useMemo(() => {
    const counts = { beginner: 0, intermediate: 0, advanced: 0 };
    curatedVideos.forEach(v => {
      if (watchedIds.includes(v.id)) {
        counts[v.level]++;
      }
    });
    return counts;
  }, [watchedIds]);

  // Category breakdown of watched videos
  const categoryBreakdown = useMemo(() => {
    const counts: Partial<Record<VideoCategory, number>> = {};
    curatedVideos.forEach(v => {
      if (watchedIds.includes(v.id)) {
        counts[v.category] = (counts[v.category] || 0) + 1;
      }
    });
    return Object.entries(counts)
      .map(([cat, count]) => ({
        category: cat as VideoCategory,
        label: categoryLabels[cat as VideoCategory],
        count: count!,
      }))
      .sort((a, b) => b.count - a.count);
  }, [watchedIds]);

  // Total categories available vs explored
  const categoriesExplored = useMemo(() => categoryBreakdown.length, [categoryBreakdown]);
  const categoriesTotal = useMemo(() => new Set(curatedVideos.map(v => v.category)).size, []);

  // Unwatched bookmarks
  const unwatchedBookmarks = useMemo(() => {
    return bookmarks.filter(b => !watchedIds.includes(b.videoId));
  }, [bookmarks, watchedIds]);

  // Unexplored categories
  const unexploredCategories = useMemo(() => {
    const watchedCats = new Set(categoryBreakdown.map(c => c.category));
    const allCats = new Set(curatedVideos.map(v => v.category));
    return Array.from(allCats).filter(c => !watchedCats.has(c));
  }, [categoryBreakdown]);

  // Next recommended video (first unwatched in weakest quiz category, or first unwatched overall)
  const nextRecommendedVideo = useMemo((): CuratedVideo | null => {
    const categories = getPerformanceByCategory();
    const attempted = categories.filter(c => c.score > 0);

    if (attempted.length > 0) {
      const weakest = [...attempted].sort((a, b) => a.score - b.score)[0];
      const relatedCats = quizToVideoCategory[weakest.subject] || [];
      const recommended = curatedVideos.find(
        v => relatedCats.includes(v.category) && !watchedIds.includes(v.id)
      );
      if (recommended) return recommended;
    }

    // Fallback: first unwatched
    return curatedVideos.find(v => !watchedIds.includes(v.id)) || null;
  }, [watchedIds, getPerformanceByCategory]);

  // Personalised insight
  const insightText = useMemo(() => {
    const insights: string[] = [];

    if (watchTimeMinutes > 0) {
      const hrs = Math.floor(watchTimeMinutes / 60);
      const mins = watchTimeMinutes % 60;
      const timeStr = hrs > 0 ? `${hrs}h ${mins}m` : `${mins} minutes`;
      insights.push(`You've invested ${timeStr} in video learning.`);
    }
    if (completionPercent >= 50) {
      insights.push(`You've watched ${completionPercent}% of all available videos -- impressive commitment.`);
    }
    if (categoriesExplored >= 5) {
      insights.push(`You've explored ${categoriesExplored} of ${categoriesTotal} video categories.`);
    }
    if (levelDistribution.intermediate + levelDistribution.advanced > levelDistribution.beginner && watchedCount > 3) {
      insights.push('Most of your watched videos are intermediate+ level -- you\'re progressing well.');
    }
    if (unwatchedBookmarks.length > 0) {
      insights.push(`You have ${unwatchedBookmarks.length} bookmarked video${unwatchedBookmarks.length !== 1 ? 's' : ''} waiting to watch.`);
    }

    return insights[0] || null;
  }, [watchTimeMinutes, completionPercent, categoriesExplored, categoriesTotal, levelDistribution, watchedCount, unwatchedBookmarks]);

  // Recommendations
  const recommendations = useMemo((): VideoRecommendation[] => {
    const recs: VideoRecommendation[] = [];

    // 1. Unwatched bookmarks
    if (unwatchedBookmarks.length > 0) {
      recs.push({
        id: 'watch-bookmark',
        title: 'Watch your saved videos',
        description: `You have ${unwatchedBookmarks.length} bookmarked video${unwatchedBookmarks.length !== 1 ? 's' : ''} to watch.`,
        actionLabel: 'Watch now',
        actionPath: '/apprentice/learning-videos',
        priority: 1,
      });
    }

    // 2. Specific recommended video
    if (nextRecommendedVideo) {
      const categories = getPerformanceByCategory();
      const attempted = categories.filter(c => c.score > 0);
      const weakest = attempted.length > 0
        ? [...attempted].sort((a, b) => a.score - b.score)[0]
        : null;

      if (weakest && weakest.score < 70) {
        recs.push({
          id: 'quiz-weakness',
          title: `Watch: ${nextRecommendedVideo.title}`,
          description: `Boost your ${weakest.subject} score (${weakest.score}%) with this ${nextRecommendedVideo.duration} video.`,
          actionLabel: 'Watch now',
          actionPath: '/apprentice/learning-videos',
          priority: 2,
        });
      }
    }

    // 3. Unexplored categories
    if (unexploredCategories.length > 0) {
      const cat = unexploredCategories[0];
      recs.push({
        id: 'explore-category',
        title: `Explore ${categoryLabels[cat]} videos`,
        description: `You've covered ${categoriesExplored} of ${categoriesTotal} categories. Branch out!`,
        actionLabel: 'Explore',
        actionPath: '/apprentice/learning-videos',
        priority: 3,
      });
    }

    // 4. Daily goal
    recs.push({
      id: 'daily-video',
      title: 'Watch 1 video today',
      description: remainingTimeMinutes > 0
        ? `${remainingTimeMinutes} minutes of content remaining. One video at a time.`
        : 'Short training videos build knowledge fast.',
      actionLabel: 'Browse videos',
      actionPath: '/apprentice/learning-videos',
      priority: 4,
    });

    return recs.sort((a, b) => a.priority - b.priority);
  }, [unwatchedBookmarks, nextRecommendedVideo, getPerformanceByCategory, unexploredCategories, categoriesExplored, categoriesTotal, remainingTimeMinutes]);

  return {
    watchedCount,
    totalVideos,
    completionPercent,
    watchTimeMinutes,
    remainingTimeMinutes,
    levelDistribution,
    categoryBreakdown,
    categoriesExplored,
    categoriesTotal,
    bookmarks,
    unwatchedBookmarks,
    unexploredCategories,
    nextRecommendedVideo,
    insightText,
    recommendations,
  };
}
