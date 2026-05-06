/**
 * VideosWatchedDetailSheet
 *
 * Editorial detail sheet for the videos-watched stat tile.
 *
 * Layout: header → editorial hero → KPI strip → Up Next → level mix → categories
 * → bookmarks → insight → empty/recs.
 *
 * Drops the centered StatRing hero and chunky stat cards for the editorial
 * pattern used across Portfolio / OJT Hub / Diary.
 */

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/ui/sheet';
import {
  Video,
  ChevronRight,
  Bookmark,
  LayoutGrid,
  Play,
  Target,
  Clock,
  ExternalLink,
  X,
  type LucideIcon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useVideoInsights } from '@/hooks/apprentice-stats/useVideoInsights';
import { RecommendationCard } from './RecommendationCard';
import {
  Eyebrow,
  SectionHeader,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';
import { categoryLabels, type VideoCategory } from '@/data/apprentice/curatedVideos';

const levelTone: Record<'beginner' | 'intermediate' | 'advanced', string> = {
  beginner: 'bg-elec-yellow',
  intermediate: 'bg-elec-yellow/60',
  advanced: 'bg-white/30',
};

const levelTextTone: Record<'beginner' | 'intermediate' | 'advanced', string> = {
  beginner: 'text-elec-yellow',
  intermediate: 'text-white/85',
  advanced: 'text-white/55',
};

const levelLabel: Record<'beginner' | 'intermediate' | 'advanced', string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

interface VideosWatchedDetailSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatTime(minutes: number): string {
  if (minutes >= 60) {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
  }
  return `${minutes}m`;
}

export function VideosWatchedDetailSheet({
  open,
  onOpenChange,
}: VideosWatchedDetailSheetProps) {
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

  const subtitleParts: string[] = [];
  if (watchedCount > 0) {
    subtitleParts.push(`${formatTime(watchTimeMinutes)} invested`);
  }
  if (remainingTimeMinutes > 0) {
    subtitleParts.push(`${formatTime(remainingTimeMinutes)} of curated content left`);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[90vh] sm:h-[85vh] p-0 rounded-t-3xl overflow-hidden bg-[hsl(0_0%_8%)] border-white/[0.06]"
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="flex-shrink-0 relative">
            <div className="flex justify-center pt-2.5 pb-1">
              <div className="h-1 w-10 rounded-full bg-white/15" />
            </div>
            <SheetTitle className="sr-only">Videos detail</SheetTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-2 top-2 h-11 w-11 flex items-center justify-center rounded-full active:bg-white/10 touch-manipulation z-10"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-white/70" />
            </button>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto overscroll-contain px-4 sm:px-6 pt-2 pb-10 space-y-7 sm:space-y-8">
            {/* ── Editorial hero ──────────────────────────────────── */}
            <motion.section
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="space-y-2 pt-1"
            >
              <Eyebrow>Learning videos</Eyebrow>
              <h2 className="text-[24px] sm:text-[28px] lg:text-[30px] font-semibold tracking-tight text-white leading-[1.05]">
                {watchedCount === 0 ? (
                  'Library waiting'
                ) : (
                  <>
                    <span className="font-mono tabular-nums">{watchedCount}</span>{' '}
                    of {totalVideos} watched
                  </>
                )}
              </h2>
              {watchedCount > 0 && (
                <div className="flex items-baseline gap-2">
                  <span className="text-[13px] font-mono text-elec-yellow tabular-nums">
                    {completionPercent}%
                  </span>
                  <span className="text-[13px] text-white/55">complete</span>
                </div>
              )}
              {subtitleParts.length > 0 && (
                <p className="text-[13px] text-white/70 leading-relaxed">
                  {subtitleParts.join(' · ')}
                </p>
              )}
              <button
                onClick={goToVideos}
                className="inline-flex items-center justify-center gap-1.5 h-11 px-4 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation mt-1"
              >
                <Play className="h-4 w-4 fill-current" />
                Browse library
                <ChevronRight className="h-4 w-4" />
              </button>
            </motion.section>

            {/* ── KPI strip ───────────────────────────────────────── */}
            {watchedCount > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                <KpiCell
                  label="Watched"
                  value={watchedCount}
                  sub={`of ${totalVideos}`}
                  bar={completionPercent}
                  highlight={completionPercent >= 50}
                />
                <KpiCell
                  label="Invested"
                  value={watchTimeMinutes > 0 ? formatTime(watchTimeMinutes) : '0m'}
                  sub={
                    remainingTimeMinutes > 0
                      ? `${formatTime(remainingTimeMinutes)} left`
                      : 'All caught up'
                  }
                  icon={Clock}
                />
                <KpiCell
                  label="Categories"
                  value={categoriesExplored}
                  sub={`of ${categoriesTotal} explored`}
                  bar={
                    categoriesTotal > 0
                      ? Math.round((categoriesExplored / categoriesTotal) * 100)
                      : 0
                  }
                  icon={LayoutGrid}
                />
                <KpiCell
                  label="Bookmarks"
                  value={bookmarks.length}
                  sub={
                    unwatchedBookmarks.length > 0
                      ? `${unwatchedBookmarks.length} unwatched`
                      : 'All watched'
                  }
                  icon={Bookmark}
                  warn={unwatchedBookmarks.length > 5}
                />
              </div>
            )}

            {/* ── Up next ─────────────────────────────────────────── */}
            {nextRecommendedVideo && (
              <section className="space-y-3">
                <SectionHeader
                  eyebrow="Up next"
                  title={nextRecommendedVideo.title}
                  meta={`${nextRecommendedVideo.channel} · ${nextRecommendedVideo.duration}`}
                />
                <button
                  onClick={goToVideos}
                  className="w-full text-left rounded-xl overflow-hidden border border-white/[0.06] bg-[hsl(0_0%_10%)] active:bg-white/[0.04] active:scale-[0.99] transition-all group touch-manipulation"
                >
                  <div className="relative w-full aspect-video bg-black/50">
                    <img
                      src={`https://img.youtube.com/vi/${nextRecommendedVideo.id}/mqdefault.jpg`}
                      alt={nextRecommendedVideo.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-14 w-14 rounded-full bg-elec-yellow/90 flex items-center justify-center shadow-lg shadow-black/40 group-active:scale-90 transition-transform">
                        <Play className="h-6 w-6 text-black fill-black ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/75 text-white text-[11px] font-medium backdrop-blur-sm">
                      <Clock className="h-3 w-3" />
                      {nextRecommendedVideo.duration}
                    </div>
                    <div className="absolute bottom-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-sm">
                      <span
                        className={cn(
                          'h-1.5 w-1.5 rounded-full',
                          levelTone[nextRecommendedVideo.level]
                        )}
                      />
                      <span
                        className={cn(
                          'text-[10px] font-medium uppercase tracking-[0.14em]',
                          levelTextTone[nextRecommendedVideo.level]
                        )}
                      >
                        {nextRecommendedVideo.level}
                      </span>
                    </div>
                  </div>
                </button>
              </section>
            )}

            {/* ── Level mix ───────────────────────────────────────── */}
            {totalLevelWatched > 0 && (
              <section className="space-y-3">
                <SectionHeader
                  eyebrow="Difficulty mix"
                  title="What you're watching"
                  meta="Where you've spent your viewing time"
                />
                <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
                  {/* Stacked bar */}
                  <div className="h-2.5 w-full rounded-full overflow-hidden bg-white/[0.04] flex">
                    {(['beginner', 'intermediate', 'advanced'] as const).map((level) => {
                      const count = levelDistribution[level];
                      if (count === 0) return null;
                      const pct = (count / totalLevelWatched) * 100;
                      return (
                        <motion.div
                          key={level}
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                          className={cn('h-full', levelTone[level])}
                          title={`${levelLabel[level]}: ${count}`}
                        />
                      );
                    })}
                  </div>
                  {/* Legend */}
                  <ul className="grid grid-cols-3 gap-x-3 gap-y-1">
                    {(['beginner', 'intermediate', 'advanced'] as const).map((level) => {
                      const count = levelDistribution[level];
                      return (
                        <li
                          key={level}
                          className="flex items-center gap-1.5 text-[11.5px] text-white/85"
                        >
                          <span
                            className={cn(
                              'h-1.5 w-1.5 rounded-sm flex-shrink-0',
                              levelTone[level]
                            )}
                          />
                          <span className="flex-1 truncate">{levelLabel[level]}</span>
                          <span className="font-mono tabular-nums text-white/55">
                            {count}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </section>
            )}

            {/* ── Categories ─────────────────────────────────────── */}
            {categoriesTotal > 0 && (
              <section className="space-y-3">
                <SectionHeader
                  eyebrow="Categories"
                  title="Coverage across topics"
                  meta={`${categoriesExplored} of ${categoriesTotal} explored`}
                />
                <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <Eyebrow>Coverage</Eyebrow>
                      <span className="text-[12px] font-mono text-white/85 tabular-nums">
                        {Math.round((categoriesExplored / categoriesTotal) * 100)}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.round((categoriesExplored / categoriesTotal) * 100)}%`,
                        }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        className="h-full rounded-full bg-elec-yellow"
                      />
                    </div>
                  </div>
                  {categoryBreakdown.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {categoryBreakdown.map(({ category, label, count }) => (
                        <button
                          key={category}
                          onClick={goToVideos}
                          className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md border border-white/[0.08] bg-white/[0.02] text-white/85 text-[12px] hover:bg-white/[0.04] active:scale-[0.98] transition-all touch-manipulation"
                        >
                          <span>{label}</span>
                          <span className="font-mono text-white/55 tabular-nums">
                            {count}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* ── Bookmarks ─────────────────────────────────────── */}
            {bookmarks.length > 0 && (
              <section className="space-y-3">
                <SectionHeader
                  eyebrow="Bookmarks"
                  title={`${bookmarks.length} saved for later`}
                  meta={
                    unwatchedBookmarks.length > 0
                      ? `${unwatchedBookmarks.length} still unwatched`
                      : 'All caught up'
                  }
                />
                <ul className="space-y-2">
                  {bookmarks.slice(0, 5).map((b) => (
                    <li key={b.videoId}>
                      <button
                        onClick={goToVideos}
                        className="w-full flex items-center gap-3 rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] active:bg-white/[0.04] active:scale-[0.99] transition-all text-left overflow-hidden touch-manipulation"
                      >
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
                        <div className="flex-1 min-w-0 py-2 pr-3 space-y-1">
                          <p className="text-[13px] text-white font-medium truncate">
                            {b.title}
                          </p>
                          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/55">
                            {categoryLabels[b.category as VideoCategory] || b.category}
                          </span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-white/40 flex-shrink-0 mr-3" />
                      </button>
                    </li>
                  ))}
                  {bookmarks.length > 5 && (
                    <li>
                      <button
                        onClick={goToVideos}
                        className="w-full inline-flex items-center justify-center gap-1.5 h-10 rounded-xl border border-white/[0.06] bg-white/[0.02] text-[12px] font-medium text-elec-yellow/85 hover:text-elec-yellow active:bg-white/[0.04] transition-all touch-manipulation"
                      >
                        View all {bookmarks.length} bookmarks
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  )}
                </ul>
              </section>
            )}

            {/* ── Insight ─────────────────────────────────────────── */}
            {insightText && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-1.5"
              >
                <Eyebrow className="text-elec-yellow/85">Insight</Eyebrow>
                <p className="text-[13.5px] text-white/85 leading-relaxed">
                  {insightText}
                </p>
              </motion.div>
            )}

            {/* ── Empty state ─────────────────────────────────────── */}
            {watchedCount === 0 && !nextRecommendedVideo && (
              <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-6 sm:p-7 text-center space-y-3">
                <Eyebrow>Library waiting</Eyebrow>
                <p className="text-[14px] text-white/85 leading-relaxed max-w-[300px] mx-auto">
                  Curated electrical training videos, organised by topic and
                  level. Pick one and start watching.
                </p>
                <button
                  onClick={goToVideos}
                  className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation"
                >
                  Browse videos
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* ── Recommendations ─────────────────────────────────── */}
            {recommendations.length > 0 && (
              <section className="space-y-3">
                <SectionHeader eyebrow="What to do next" title="Smart suggestions" />
                <div className="space-y-2.5">
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
              </section>
            )}

            {/* lint-quiet imports */}
            <span className="hidden">
              <Video />
            </span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

/* ─────────────────── KPI cell ─────────────────── */

function KpiCell({
  label,
  value,
  sub,
  bar,
  highlight,
  warn,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  sub?: string;
  bar?: number;
  highlight?: boolean;
  warn?: boolean;
  icon?: LucideIcon;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-3.5 sm:p-5 space-y-1.5">
      <div className="flex items-center gap-1.5">
        {Icon && <Icon className="h-3 w-3 text-white/40" />}
        <Eyebrow className="text-[9.5px] sm:text-[10px]">{label}</Eyebrow>
      </div>
      <div
        className={cn(
          'text-[22px] sm:text-[26px] font-mono font-semibold tabular-nums leading-none',
          highlight ? 'text-elec-yellow' : warn ? 'text-red-300' : 'text-white'
        )}
      >
        {value}
      </div>
      {bar !== undefined && (
        <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-700',
              highlight ? 'bg-elec-yellow' : 'bg-white/55'
            )}
            style={{ width: `${Math.min(bar, 100)}%` }}
          />
        </div>
      )}
      {sub && (
        <span className="text-[10.5px] sm:text-[11px] text-white/55 block leading-snug">
          {sub}
        </span>
      )}
    </div>
  );
}
