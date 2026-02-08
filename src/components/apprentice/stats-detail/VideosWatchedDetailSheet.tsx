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

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/ui/sheet';
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
  'wiring': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  'testing-inspection': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'bs7671': 'bg-green-500/20 text-green-300 border-green-500/30',
  'am2-prep': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'domestic': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  'commercial': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'solar-ev': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  'safety': 'bg-red-500/20 text-red-300 border-red-500/30',
  'tools-equipment': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  'career': 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30',
};

const levelColours = {
  beginner: 'bg-green-400',
  intermediate: 'bg-amber-400',
  advanced: 'bg-red-400',
};

const levelTextColours = {
  beginner: 'text-green-400',
  intermediate: 'text-amber-400',
  advanced: 'text-red-400',
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
    onOpenChange(false);
    setTimeout(() => navigate('/apprentice/learning-videos'), 150);
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

  const totalLevelWatched = levelDistribution.beginner + levelDistribution.intermediate + levelDistribution.advanced;

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
              <ChevronDown className="h-5 w-5 text-white/60" />
            </button>
          </SheetHeader>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-6">
            {/* ── Hero: StatRing with glow ── */}
            <div className="flex flex-col items-center text-center pt-2 pb-1">
              <div className="relative">
                {/* Glow behind ring */}
                <div className="absolute inset-0 bg-elec-yellow/15 rounded-full blur-2xl scale-110" />
                <StatRing percent={completionPercent} size={140} ringClass="stroke-elec-yellow" strokeWidth={10}>
                  <div className="flex flex-col items-center">
                    <div className="flex items-baseline">
                      <AnimatedCounter
                        value={watchedCount}
                        className="text-3xl font-bold text-elec-yellow"
                      />
                      <span className="text-base text-white/40 mx-1">/</span>
                      <span className="text-base text-white/40">{totalVideos}</span>
                    </div>
                    <span className="text-[11px] text-white/50 mt-0.5">watched</span>
                  </div>
                </StatRing>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-white/80 mt-4 font-medium"
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
              <div className="relative rounded-2xl overflow-hidden bg-white/[0.04] border border-white/[0.06] p-4 text-center">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/40 to-elec-yellow/0" />
                <Clock className="h-5 w-5 text-elec-yellow mx-auto mb-2" />
                <p className="text-xl font-bold text-white">
                  {watchTimeMinutes > 0 ? formatTime(watchTimeMinutes) : '0m'}
                </p>
                <p className="text-[11px] text-white/50 mt-1 uppercase tracking-wider font-medium">Time invested</p>
              </div>
              <div className="relative rounded-2xl overflow-hidden bg-white/[0.04] border border-white/[0.06] p-4 text-center">
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500/0 via-amber-400/40 to-amber-500/0" />
                <Video className="h-5 w-5 text-amber-400 mx-auto mb-2" />
                <p className="text-xl font-bold text-white">
                  {remainingTimeMinutes > 0 ? formatTime(remainingTimeMinutes) : '0m'}
                </p>
                <p className="text-[11px] text-white/50 mt-1 uppercase tracking-wider font-medium">Remaining</p>
              </div>
            </motion.div>

            {/* ── "Up Next" with YouTube thumbnail ── */}
            {nextRecommendedVideo && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-elec-yellow" />
                  <span className="text-sm font-semibold text-white">Up Next</span>
                </div>
                <button
                  onClick={goToVideos}
                  className="w-full text-left rounded-2xl overflow-hidden bg-white/[0.04] border border-elec-yellow/20 touch-manipulation active:scale-[0.98] transition-all group"
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
                        <span className="text-xs text-white/50">{nextRecommendedVideo.channel}</span>
                        <span className="text-white/15">·</span>
                        <span className={cn(
                          'flex items-center gap-1 text-xs font-semibold',
                          levelTextColours[nextRecommendedVideo.level]
                        )}>
                          <span className={cn('h-1.5 w-1.5 rounded-full', levelColours[nextRecommendedVideo.level])} />
                          {nextRecommendedVideo.level.charAt(0).toUpperCase() + nextRecommendedVideo.level.slice(1)}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-white/30 flex-shrink-0 mt-0.5 group-active:text-elec-yellow transition-colors" />
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
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="h-4 w-4 text-white/50" />
                  <span className="text-sm font-semibold text-white">Difficulty Level</span>
                </div>
                <div className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-4">
                  {/* Individual level bars */}
                  <div className="space-y-3">
                    {(['beginner', 'intermediate', 'advanced'] as const).map((level) => {
                      const count = levelDistribution[level];
                      const pct = totalLevelWatched > 0 ? (count / totalLevelWatched) * 100 : 0;
                      return (
                        <div key={level} className="flex items-center gap-3">
                          <span className="text-xs text-white/60 w-20 flex-shrink-0">
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
                          <span className={cn('text-xs font-semibold w-6 text-right', levelTextColours[level])}>
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
                <div className="flex items-center gap-2 mb-3">
                  <LayoutGrid className="h-4 w-4 text-white/50" />
                  <span className="text-sm font-semibold text-white">Categories</span>
                  <span className="text-xs text-white/40 ml-auto">
                    {categoriesExplored} of {categoriesTotal} explored
                  </span>
                </div>
                {/* Coverage bar */}
                <div className="mb-4">
                  <div className="h-2.5 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.round((categoriesExplored / categoriesTotal) * 100)}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
                      className="h-full rounded-full bg-gradient-to-r from-elec-yellow to-amber-400"
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
                        'px-3 py-1.5 rounded-xl text-xs font-semibold border',
                        'touch-manipulation active:scale-95 transition-all',
                        categoryColours[category] || 'bg-white/10 text-white/70 border-white/15'
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
                <div className="flex items-center gap-2 mb-3">
                  <Bookmark className="h-4 w-4 text-white/50" />
                  <span className="text-sm font-semibold text-white">Bookmarked</span>
                  <span className="text-xs text-white/40 ml-auto">
                    {bookmarks.length} saved{unwatchedBookmarks.length > 0 ? ` · ${unwatchedBookmarks.length} unwatched` : ''}
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
                          className={cn(
                            'inline-block mt-1 px-2 py-0.5 rounded-lg text-[10px] font-semibold border',
                            categoryColours[b.category as VideoCategory] || 'bg-white/10 text-white/60 border-white/15'
                          )}
                        >
                          {categoryLabels[b.category as VideoCategory] || b.category}
                        </span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-white/20 flex-shrink-0 mr-3" />
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
                className="relative rounded-2xl overflow-hidden bg-elec-yellow/[0.06] border border-elec-yellow/15 p-4"
              >
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-elec-yellow/10 rounded-full blur-2xl pointer-events-none" />
                <div className="relative flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-elec-yellow/15 flex-shrink-0">
                    <Lightbulb className="h-4 w-4 text-elec-yellow" />
                  </div>
                  <p className="text-sm text-white/90 leading-relaxed">{insightText}</p>
                </div>
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
                  <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">What to do next</span>
                  <div className="flex-1 border-t border-white/[0.06]" />
                </div>

                <div className="space-y-3 pb-6">
                  {recommendations.map((rec) => (
                    <RecommendationCard
                      key={rec.id}
                      icon={rec.id === 'watch-bookmark' ? Bookmark : rec.id === 'quiz-weakness' ? Target : rec.id === 'explore-category' ? LayoutGrid : Play}
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
                <div className="p-4 rounded-2xl bg-elec-yellow/10 border border-elec-yellow/20 mb-4">
                  <Play className="h-8 w-8 text-elec-yellow" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1">Start watching</h3>
                <p className="text-sm text-white/50 max-w-[260px] mb-5">
                  Curated electrical training videos from industry experts, ready when you are
                </p>
                <button
                  onClick={goToVideos}
                  className="flex items-center gap-2 px-6 h-12 rounded-xl bg-elec-yellow text-black text-sm font-semibold touch-manipulation active:scale-[0.98] transition-all"
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
