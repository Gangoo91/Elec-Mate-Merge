/**
 * VideosWatchedDetailSheet
 *
 * Premium yellow-themed 85vh bottom sheet with:
 * - Glowing StatRing hero with completion %
 * - Time invested + remaining stats with gradient accents
 * - Level distribution bar (beginner/intermediate/advanced)
 * - Categories explored gauge + clickable category pills
 * - "Up Next" card with YouTube thumbnail
 * - Bookmarked videos with thumbnails
 * - Personalised insight card
 * - Smart recommendations
 *
 * All interactive items navigate to /apprentice/learning-videos.
 */

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/ui/sheet';
import {
  Video,
  ChevronDown,
  ChevronRight,
  Bookmark,
  LayoutGrid,
  Play,
  Target,
  Clock,
  BarChart3,
  Lightbulb,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useVideoInsights } from '@/hooks/apprentice-stats/useVideoInsights';
import { RecommendationCard } from './RecommendationCard';
import { StatRing } from './StatRing';
import { AnimatedCounter } from '@/components/dashboard/AnimatedCounter';
import { categoryLabels, type VideoCategory } from '@/data/apprentice/curatedVideos';

const categoryColours: Partial<Record<VideoCategory, string>> = {
  'electrical-theory': 'bg-white/[0.03] text-white/85 border-white/10',
  wiring: 'bg-white/[0.03] text-white/85 border-white/10',
  'testing-inspection': 'bg-white/[0.03] text-white/85 border-white/10',
  bs7671: 'bg-white/[0.03] text-white/85 border-white/10',
  'am2-prep': 'bg-white/[0.03] text-white/85 border-white/10',
  domestic: 'bg-white/[0.03] text-white/85 border-white/10',
  commercial: 'bg-white/[0.03] text-white/85 border-white/10',
  'solar-ev': 'bg-white/[0.03] text-white/85 border-white/10',
  safety: 'bg-white/[0.03] text-white/85 border-white/10',
  'tools-equipment': 'bg-white/[0.03] text-white/85 border-white/10',
  career: 'bg-white/[0.03] text-white/85 border-white/10',
};

const levelColours = {
  beginner: 'bg-elec-yellow',
  intermediate: 'bg-elec-yellow/60',
  advanced: 'bg-white/30',
};

const levelTextColours = {
  beginner: 'text-elec-yellow',
  intermediate: 'text-white/85',
  advanced: 'text-white/55',
};

const levelLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

interface VideosWatchedDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VideosWatchedDetailSheet({ open, onOpenChange }: VideosWatchedDetailSheetProps) {
  const navigate = useNavigate();

  const goToVideos = () => {
    navigate('/apprentice/learning-videos');
    setTimeout(() => onOpenChange(false), 50);
  };

  const {
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
    nextRecommendedVideo,
    insightText,
    recommendations,
  } = useVideoInsights();

  const totalLevelWatched =
    levelDistribution.beginner + levelDistribution.intermediate + levelDistribution.advanced;

  function formatTime(minutes: number): string {
    if (minutes >= 60) {
      const hrs = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
    }
    return `${minutes}m`;
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-[hsl(240,5.9%,10%)]">
          {/* Header */}
          <SheetHeader className="flex-shrink-0 relative">
            <div className="flex justify-center pt-2.5 pb-1">
              <div className="h-1 w-10 rounded-full bg-white/20" />
            </div>
            <SheetTitle className="sr-only">Videos Watched Details</SheetTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-2 top-1.5 h-11 w-11 flex items-center justify-center rounded-full active:bg-white/10 touch-manipulation z-10"
            >
              <ChevronDown className="h-5 w-5 text-white" />
            </button>
          </SheetHeader>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-6">
            {/* ── Hero: StatRing with glow ── */}
            <div className="flex flex-col items-center text-center pt-2 pb-1">
              <div className="relative">
                <StatRing
                  percent={completionPercent}
                  size={140}
                  ringClass="stroke-elec-yellow"
                  strokeWidth={10}
                >
                  <div className="flex flex-col items-center">
                    <div className="flex items-baseline">
                      <AnimatedCounter
                        value={watchedCount}
                        className="text-3xl font-bold text-elec-yellow"
                      />
                      <span className="text-base text-white mx-1">/</span>
                      <span className="text-base text-white">{totalVideos}</span>
                    </div>
                    <span className="text-[11px] text-white mt-0.5">watched</span>
                  </div>
                </StatRing>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-white mt-4 font-medium"
              >
                {completionPercent}% of available videos completed
              </motion.p>
            </div>

            {/* ── Time stats row ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="grid grid-cols-2 gap-3"
            >
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center">
                <Clock className="h-4 w-4 text-white/55 mx-auto mb-2" />
                <p className="text-xl font-bold text-white">
                  {watchTimeMinutes > 0 ? formatTime(watchTimeMinutes) : '0m'}
                </p>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 mt-1">
                  Time invested
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center">
                <Video className="h-4 w-4 text-white/55 mx-auto mb-2" />
                <p className="text-xl font-bold text-white">
                  {remainingTimeMinutes > 0 ? formatTime(remainingTimeMinutes) : '0m'}
                </p>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 mt-1">
                  Remaining
                </p>
              </div>
            </motion.div>

            {/* ── "Up Next" with YouTube thumbnail ── */}
            {nextRecommendedVideo && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 mb-3">
                  Up next
                </span>
                <button
                  onClick={goToVideos}
                  className="w-full text-left rounded-xl overflow-hidden border border-white/[0.06] bg-white/[0.02] touch-manipulation active:bg-white/[0.04] transition-all group"
                >
                  {/* Thumbnail */}
                  <div className="relative w-full aspect-video bg-black/50">
                    <img
                      src={`https://img.youtube.com/vi/${nextRecommendedVideo.id}/mqdefault.jpg`}
                      alt={nextRecommendedVideo.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-14 w-14 rounded-full bg-elec-yellow/90 flex items-center justify-center shadow-lg shadow-black/40 group-active:scale-90 transition-transform">
                        <Play className="h-6 w-6 text-black fill-black ml-0.5" />
                      </div>
                    </div>
                    {/* Duration badge */}
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/75 text-white text-[11px] font-medium backdrop-blur-sm">
                      <Clock className="h-3 w-3" />
                      {nextRecommendedVideo.duration}
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-4 flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white leading-snug group-active:text-elec-yellow transition-colors">
                        {nextRecommendedVideo.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs text-white">
                          {nextRecommendedVideo.channel}
                        </span>
                        <span className="text-white/15">·</span>
                        <span
                          className={cn(
                            'flex items-center gap-1 text-xs font-semibold',
                            levelTextColours[nextRecommendedVideo.level]
                          )}
                        >
                          <span
                            className={cn(
                              'h-1.5 w-1.5 rounded-full',
                              levelColours[nextRecommendedVideo.level]
                            )}
                          />
                          {nextRecommendedVideo.level.charAt(0).toUpperCase() +
                            nextRecommendedVideo.level.slice(1)}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-white flex-shrink-0 mt-0.5 group-active:text-elec-yellow transition-colors" />
                  </div>
                </button>
              </motion.div>
            )}

            {/* ── Level distribution ── */}
            {totalLevelWatched > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 mb-3">
                  Difficulty level
                </span>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  {/* Individual level bars */}
                  <div className="space-y-3">
                    {(['beginner', 'intermediate', 'advanced'] as const).map((level) => {
                      const count = levelDistribution[level];
                      const pct = totalLevelWatched > 0 ? (count / totalLevelWatched) * 100 : 0;
                      return (
                        <div key={level} className="flex items-center gap-3">
                          <span className="text-xs text-white w-20 flex-shrink-0">
                            {levelLabels[level]}
                          </span>
                          <div className="flex-1 h-3 rounded-full bg-white/[0.06] overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${pct}%` }}
                              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                              className={cn('h-full rounded-full', levelColours[level])}
                            />
                          </div>
                          <span
                            className={cn(
                              'text-xs font-semibold w-6 text-right',
                              levelTextColours[level]
                            )}
                          >
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── Categories explored ── */}
            {categoriesTotal > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Categories
                  </span>
                  <span className="text-[12px] text-white/55">
                    {categoriesExplored} of {categoriesTotal} explored
                  </span>
                </div>
                {/* Coverage bar */}
                <div className="mb-4">
                  <div className="h-2.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.round((categoriesExplored / categoriesTotal) * 100)}%`,
                      }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
                      className="h-full rounded-full bg-elec-yellow"
                    />
                  </div>
                </div>
                {/* Clickable category pills */}
                <div className="flex flex-wrap gap-2">
                  {categoryBreakdown.map(({ category, label, count }) => (
                    <button
                      key={category}
                      onClick={goToVideos}
                      className={cn(
                        'text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]',
                        'touch-manipulation active:bg-white/[0.06] transition-all'
                      )}
                    >
                      {label} ({count})
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── Bookmarked videos ── */}
            {bookmarks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Bookmarked
                  </span>
                  <span className="text-[12px] text-white/55">
                    {bookmarks.length} saved
                    {unwatchedBookmarks.length > 0
                      ? ` · ${unwatchedBookmarks.length} unwatched`
                      : ''}
                  </span>
                </div>
                <div className="space-y-2">
                  {bookmarks.slice(0, 5).map((b) => (
                    <button
                      key={b.videoId}
                      onClick={goToVideos}
                      className="w-full flex items-center gap-3 rounded-xl bg-white/[0.04] border border-white/[0.06] touch-manipulation active:scale-[0.98] active:bg-white/[0.08] transition-all text-left overflow-hidden"
                    >
                      {/* Mini thumbnail */}
                      <div className="relative w-20 h-14 flex-shrink-0 bg-black/50">
                        <img
                          src={`https://img.youtube.com/vi/${b.videoId}/default.jpg`}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="h-7 w-7 rounded-full bg-elec-yellow/80 flex items-center justify-center">
                            <Play className="h-3 w-3 text-black fill-black ml-px" />
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 py-2 pr-3">
                        <p className="text-sm text-white font-medium truncate">{b.title}</p>
                        <span
                          className="inline-block mt-1 text-[12px] text-white/85 px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.03]"
                        >
                          {categoryLabels[b.category as VideoCategory] || b.category}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-white flex-shrink-0 mr-3" />
                    </button>
                  ))}
                  {bookmarks.length > 5 && (
                    <button
                      onClick={goToVideos}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs font-medium text-elec-yellow/80 touch-manipulation active:bg-white/[0.06] active:text-elec-yellow transition-all"
                    >
                      View all {bookmarks.length} bookmarks
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── Personalised insight ── */}
            {insightText && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-2"
              >
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                  Insight
                </span>
                <p className="text-[14px] text-white/85 leading-relaxed">{insightText}</p>
              </motion.div>
            )}

            {/* ── Recommendations ── */}
            {recommendations.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
              >
                <div className="flex items-center gap-3 pt-1 mb-4">
                  <div className="flex-1 border-t border-white/[0.06]" />
                  <span className="text-[11px] font-semibold text-white uppercase tracking-wider">
                    What to do next
                  </span>
                  <div className="flex-1 border-t border-white/[0.06]" />
                </div>

                <div className="space-y-3 pb-6">
                  {recommendations.map((rec) => (
                    <RecommendationCard
                      key={rec.id}
                      icon={
                        rec.id === 'watch-bookmark'
                          ? Bookmark
                          : rec.id === 'quiz-weakness'
                            ? Target
                            : rec.id === 'explore-category'
                              ? LayoutGrid
                              : Play
                      }
                      title={rec.title}
                      description={rec.description}
                      actionLabel={rec.actionLabel}
                      actionPath={rec.actionPath}
                      variant="yellow"
                      onClose={() => onOpenChange(false)}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── Empty state CTA (when no videos watched) ── */}
            {watchedCount === 0 && !nextRecommendedVideo && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center text-center py-6"
              >
                <div className="p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] mb-4">
                  <Play className="h-7 w-7 text-elec-yellow" />
                </div>
                <h3 className="text-[16px] font-semibold text-white mb-1">Start watching</h3>
                <p className="text-[14px] text-white/70 max-w-[260px] mb-5 leading-relaxed">
                  Curated electrical training videos from industry experts, ready when you are
                </p>
                <button
                  onClick={goToVideos}
                  className="flex items-center gap-2 px-6 h-11 rounded-xl bg-elec-yellow hover:bg-elec-yellow/90 text-black text-[14px] font-semibold touch-manipulation active:scale-[0.98] transition-all"
                >
                  Browse videos
                  <ChevronRight className="h-4 w-4" />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
