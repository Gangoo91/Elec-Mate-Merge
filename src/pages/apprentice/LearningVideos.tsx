/**
 * LearningVideos
 *
 * Full-viewport app-like learning videos page at /apprentice/learning-videos.
 * Single window view with inline player that replaces the grid (YouTube mobile pattern).
 * When a video is selected, the grid fades out and the player + related videos appear.
 * No bottom sheet -- instant, immersive playback.
 */

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Search,
  X,
  Bookmark,
  Play,
  Check,
  Video,
  Clock,
  ExternalLink,
  BookOpen,
  Award,
  Zap,
} from 'lucide-react';
import {
  curatedVideos,
  getAvailableCategories,
  categoryLabels,
} from '@/data/apprentice/curatedVideos';
import type { CuratedVideo, VideoCategory } from '@/data/apprentice/curatedVideos';
import { useVideoBookmarks } from '@/hooks/learning-videos/useVideoBookmarks';
import { useVideoProgress } from '@/hooks/learning-videos/useVideoProgress';
import { useLearningXP } from '@/hooks/useLearningXP';
import { YouTubePlayer } from '@/components/apprentice/learning-videos/YouTubePlayer';
import { openExternalUrl } from '@/utils/open-external-url';

// Editor's pick shown as the spotlight at the top of the default (All) view
const FEATURED_ID = 'J3kKNNizARc'; // How to Use a Multimeter Like a Pro

/** Parse a "mm:ss" / "h:mm:ss" duration string to whole minutes (min 1). */
function durationToMinutes(d: string): number {
  const parts = d.split(':').map((n) => parseInt(n, 10));
  if (parts.some((n) => Number.isNaN(n))) return 1;
  const secs = parts.reduce((acc, p) => acc * 60 + p, 0);
  return Math.max(1, Math.round(secs / 60));
}

export default function LearningVideos({ backTo = '/apprentice' }: { backTo?: string } = {}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<VideoCategory | 'all'>('all');
  const [selectedVideo, setSelectedVideo] = useState<CuratedVideo | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const { bookmarks, isBookmarked, toggleBookmark, trackVideoWatched, getWatchedIds } =
    useVideoBookmarks();
  const { logActivity } = useLearningXP();
  const { saveProgress, markCompleted, getProgress, inProgressIds } = useVideoProgress();
  const categories = getAvailableCategories();

  // First watch of a video → credit it to the Study Centre (XP + streak + minutes)
  const awardWatch = useCallback(
    async (video: CuratedVideo) => {
      const isNew = await trackVideoWatched(video.id);
      if (isNew) {
        logActivity({
          activityType: 'video_watched',
          sourceId: video.id,
          sourceTitle: video.title,
          actualMinutes: durationToMinutes(video.duration),
          metadata: { channel: video.channel, category: video.category },
        });
      }
    },
    [trackVideoWatched, logActivity]
  );

  // Handle ?play=VIDEO_ID from hub navigation
  useEffect(() => {
    const playId = searchParams.get('play');
    if (playId && !selectedVideo) {
      const video = curatedVideos.find((v) => v.id === playId);
      if (video) {
        setSelectedVideo(video);
        void awardWatch(video);
      }
      // Clean the URL param
      searchParams.delete('play');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams, selectedVideo, awardWatch]);

  // Filter videos
  const filteredVideos = useMemo(() => {
    let videos = curatedVideos;

    if (activeCategory !== 'all') {
      videos = videos.filter((v) => v.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      videos = videos.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.channel.toLowerCase().includes(q) ||
          v.tags.some((t) => t.toLowerCase().includes(q)) ||
          categoryLabels[v.category].toLowerCase().includes(q)
      );
    }

    return videos;
  }, [activeCategory, searchQuery]);

  // Related videos for player
  const relatedVideos = useMemo(() => {
    if (!selectedVideo) return [];
    return curatedVideos
      .filter((v) => v.category === selectedVideo.category && v.id !== selectedVideo.id)
      .slice(0, 8);
  }, [selectedVideo]);

  // Default landing state: no search, no category filter → show spotlight + grouped sections
  const isDefaultView = activeCategory === 'all' && !searchQuery.trim();

  const featuredVideo = useMemo(
    () => curatedVideos.find((v) => v.id === FEATURED_ID) ?? null,
    []
  );

  // Group the (filtered) videos by category, in data order, dropping empty groups
  const groupedVideos = useMemo(() => {
    const order = getAvailableCategories();
    return order
      .map((cat) => ({ cat, items: filteredVideos.filter((v) => v.category === cat) }))
      .filter((g) => g.items.length > 0);
  }, [filteredVideos]);

  const watchedIds = getWatchedIds();
  const watchedSet = useMemo(() => new Set(watchedIds), [watchedIds]);
  const isWatched = useCallback((id: string) => watchedSet.has(id), [watchedSet]);

  // Partially-watched videos, most recent first → "Continue watching" rail
  const continueVideos = useMemo(
    () =>
      inProgressIds
        .map((id) => curatedVideos.find((v) => v.id === id))
        .filter((v): v is CuratedVideo => Boolean(v))
        .slice(0, 8),
    [inProgressIds]
  );

  const handleVideoTap = (video: CuratedVideo) => {
    setSelectedVideo(video);
    void awardWatch(video);
  };

  const handleClosePlayer = () => {
    setSelectedVideo(null);
  };

  const handleBookmarkToggle = (video: CuratedVideo) => {
    toggleBookmark(video.id, video.title, video.category);
  };

  const savedCount = bookmarks.length;
  const isPlayerMode = !!selectedVideo;

  const renderTile = (video: CuratedVideo) => (
    <VideoTile
      key={video.id}
      video={video}
      isBookmarked={isBookmarked(video.id)}
      isWatched={isWatched(video.id)}
      progressPct={getProgress(video.id)?.pct}
      onTap={() => handleVideoTap(video)}
      onBookmarkToggle={() => handleBookmarkToggle(video)}
    />
  );

  return (
    <div className="h-[100dvh] flex flex-col bg-[hsl(240,5.9%,10%)] overflow-hidden">
      {/* ═══ STICKY HEADER ═══ */}
      <header className="flex-shrink-0 bg-[hsl(240,5.9%,10%)]/95 backdrop-blur-xl border-b border-white/[0.06] z-20">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          {/* Title row */}
          <div className="flex items-center gap-2 sm:gap-3 h-14">
            <button
              onClick={isPlayerMode ? handleClosePlayer : () => navigate(backTo)}
              className="h-11 w-11 -ml-1 flex items-center justify-center rounded-xl text-white hover:bg-white/[0.06] active:bg-white/10 touch-manipulation transition-colors"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="flex-1 min-w-0">
              {isPlayerMode ? (
                <h1 className="text-[15px] sm:text-base font-semibold text-white truncate">
                  {selectedVideo.title}
                </h1>
              ) : (
                <div className="flex items-baseline gap-2.5">
                  <span className="hidden sm:inline text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Learning
                  </span>
                  <span className="hidden sm:inline h-3 w-px bg-white/10" aria-hidden />
                  <h1 className="text-[15px] sm:text-base font-semibold tracking-tight text-white truncate">
                    Video Library
                  </h1>
                </div>
              )}
            </div>

            {/* Action buttons -- only show in grid mode */}
            {!isPlayerMode && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  aria-label="Search videos"
                  className={`h-11 w-11 flex items-center justify-center rounded-xl touch-manipulation transition-colors ${
                    searchOpen
                      ? 'bg-elec-yellow/15 text-elec-yellow'
                      : 'text-white hover:bg-white/[0.06] active:bg-white/10'
                  }`}
                >
                  <Search className="h-5 w-5" />
                </button>
                {savedCount > 0 && (
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setSearchQuery('');
                    }}
                    className="h-11 flex items-center gap-1.5 px-3 rounded-xl bg-elec-yellow/10 border border-elec-yellow/25 hover:bg-elec-yellow/15 touch-manipulation transition-colors"
                  >
                    <Bookmark className="h-4 w-4 text-elec-yellow fill-elec-yellow" />
                    <span className="text-sm text-elec-yellow font-medium tabular-nums">
                      {savedCount}
                    </span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Search bar - slides down when open (grid mode only) */}
          {!isPlayerMode && searchOpen && (
            <div className="pb-3">
              <div className="relative max-w-xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, channel or topic…"
                  autoFocus
                  className="w-full h-11 pl-10 pr-10 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20 touch-manipulation"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-full text-white/70 active:bg-white/10 touch-manipulation"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Category chips (grid mode only) — scroll on mobile, wrap on desktop */}
          {!isPlayerMode && (
            <div className="flex flex-nowrap lg:flex-wrap gap-1.5 overflow-x-auto lg:overflow-visible pb-3 scrollbar-hide">
              <button
                onClick={() => setActiveCategory('all')}
                className={`flex-shrink-0 px-4 h-9 text-[13px] rounded-full font-medium touch-manipulation transition-all ${
                  activeCategory === 'all'
                    ? 'bg-elec-yellow text-black'
                    : 'bg-white/[0.06] text-white/80 hover:bg-white/[0.1] active:bg-white/10'
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-4 h-9 text-[13px] rounded-full font-medium touch-manipulation transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-elec-yellow text-black'
                      : 'bg-white/[0.06] text-white/80 hover:bg-white/[0.1] active:bg-white/10'
                  }`}
                >
                  {categoryLabels[cat]}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* ═══ CONTENT AREA ═══ */}
      {isPlayerMode ? (
        /* ─── INLINE PLAYER VIEW ─── */
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="mx-auto max-w-5xl lg:px-6 lg:pt-6">
            {/* YouTube player — iframe on web, native browser on iOS/Android */}
            <div className="lg:rounded-2xl lg:overflow-hidden lg:border lg:border-white/[0.08]">
              <YouTubePlayer
                videoId={selectedVideo.id}
                title={selectedVideo.title}
                startSeconds={getProgress(selectedVideo.id)?.positionSeconds}
                onProgress={(pos, dur) => saveProgress(selectedVideo.id, pos, dur)}
                onEnded={() => markCompleted(selectedVideo.id)}
              />
            </div>

            {/* Video info */}
            <div className="px-4 pt-5 pb-6 max-w-4xl mx-auto">
              {/* Title */}
              <h2 className="text-[18px] sm:text-[22px] lg:text-[24px] font-semibold tracking-tight leading-[1.2] text-white">
                {selectedVideo.title}
              </h2>

              {/* Meta row */}
              <div className="mt-3 flex items-center flex-wrap gap-x-2.5 gap-y-2 text-[13px]">
                <span className="font-medium text-white/90">{selectedVideo.channel}</span>
                <span className="h-1 w-1 rounded-full bg-white/25" aria-hidden />
                <span className="flex items-center gap-1 text-white/55">
                  <Clock className="h-3.5 w-3.5" />
                  {selectedVideo.duration}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-md border text-[11px] font-medium ${
                    selectedVideo.level === 'beginner'
                      ? 'text-green-400/90 bg-green-400/10 border-green-400/20'
                      : selectedVideo.level === 'intermediate'
                        ? 'text-amber-400/90 bg-amber-400/10 border-amber-400/20'
                        : 'text-red-400/90 bg-red-400/10 border-red-400/20'
                  }`}
                >
                  {selectedVideo.level.charAt(0).toUpperCase() + selectedVideo.level.slice(1)}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-elec-yellow/10 border border-elec-yellow/20 text-elec-yellow text-[11px] font-medium">
                  {categoryLabels[selectedVideo.category]}
                </span>
                {(() => {
                  const p = getProgress(selectedVideo.id);
                  if (p?.completed)
                    return (
                      <span className="flex items-center gap-1 text-[12px] font-medium text-elec-yellow">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        Completed
                      </span>
                    );
                  if (p && p.pct > 0)
                    return <span className="text-[12px] text-white/45">{p.pct}% watched</span>;
                  return null;
                })()}
              </div>

              {/* Actions — compact pills */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleBookmarkToggle(selectedVideo)}
                  className={`inline-flex items-center gap-2 h-10 px-4 rounded-full text-[13px] font-semibold touch-manipulation transition-all active:scale-[0.98] ${
                    isBookmarked(selectedVideo.id)
                      ? 'bg-elec-yellow text-black'
                      : 'bg-white/[0.06] border border-white/[0.12] text-white hover:bg-white/[0.1]'
                  }`}
                >
                  <Bookmark
                    className={`h-4 w-4 ${isBookmarked(selectedVideo.id) ? 'fill-black' : ''}`}
                  />
                  {isBookmarked(selectedVideo.id) ? 'Saved' : 'Save'}
                </button>
                <button
                  onClick={() =>
                    openExternalUrl(`https://www.youtube.com/watch?v=${selectedVideo.id}`)
                  }
                  className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-white/[0.06] border border-white/[0.12] text-white text-[13px] font-medium hover:bg-white/[0.1] touch-manipulation transition-all active:scale-[0.98]"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open in YouTube
                </button>
              </div>

              {/* Description */}
              {selectedVideo.description && (
                <p className="mt-4 text-[13.5px] leading-relaxed text-white/70 max-w-[68ch]">
                  {selectedVideo.description}
                </p>
              )}

              {/* Tags */}
              {selectedVideo.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {selectedVideo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.08] text-[11px] text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Creator promotion */}
              <div className="mt-6">
                {selectedVideo.channel === 'Craig Wiltshire' && <CreatorPromoCard />}
                {selectedVideo.channel === 'The Engineering Mindset' && (
                  <EngineeringMindsetPromoCard />
                )}
              </div>

              {/* Related videos */}
              {relatedVideos.length > 0 && (
                <div className="mt-6 pt-6 border-t border-white/[0.06]">
                  <h4 className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 mb-4">
                    More like this
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2">
                    {relatedVideos.map((rv) => (
                      <RelatedVideoRow
                        key={rv.id}
                        video={rv}
                        isBookmarked={isBookmarked(rv.id)}
                        onTap={() => handleVideoTap(rv)}
                        onBookmarkToggle={() => handleBookmarkToggle(rv)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ─── VIDEO GRID VIEW ─── */
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {filteredVideos.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
              <div className="h-16 w-16 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-4">
                <Video className="h-8 w-8 text-white" />
              </div>
              <p className="text-base font-medium text-white mb-1">No videos found</p>
              <p className="text-sm text-white">
                {searchQuery ? 'Try a different search term' : 'No videos in this category yet'}
              </p>
            </div>
          ) : (
            <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-6 lg:px-6">
              {isDefaultView && continueVideos.length > 0 && (
                <section className="space-y-3 sm:space-y-4 mb-9 sm:mb-12">
                  <div className="flex items-baseline justify-between gap-4 px-1">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
                      Continue watching
                    </span>
                    <span className="text-[11px] text-white/45 tabular-nums">
                      {continueVideos.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-5 sm:gap-x-4 sm:gap-y-6">
                    {continueVideos.map(renderTile)}
                  </div>
                </section>
              )}

              {isDefaultView && featuredVideo && (
                <div className="mb-9 sm:mb-12">
                  <FeaturedSpotlight
                    video={featuredVideo}
                    onTap={() => handleVideoTap(featuredVideo)}
                  />
                </div>
              )}

              {isDefaultView ? (
                /* Grouped, scannable sections by category */
                <div className="space-y-9 sm:space-y-12">
                  {groupedVideos.map(({ cat, items }) => (
                    <section key={cat} className="space-y-3 sm:space-y-4">
                      <div className="flex items-baseline justify-between gap-4 px-1">
                        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
                          {categoryLabels[cat]}
                        </span>
                        <span className="text-[11px] text-white/45 tabular-nums">
                          {(() => {
                            const w = items.filter((v) => watchedSet.has(v.id)).length;
                            return w > 0
                              ? `${w}/${items.length} watched`
                              : `${items.length} ${items.length === 1 ? 'video' : 'videos'}`;
                          })()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-5 sm:gap-x-4 sm:gap-y-6">
                        {items.map(renderTile)}
                      </div>
                    </section>
                  ))}
                </div>
              ) : (
                /* Filtered / search → single flat grid */
                <>
                  <div className="flex items-baseline justify-between gap-4 mb-4 px-1">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
                      {activeCategory === 'all' ? 'Results' : categoryLabels[activeCategory]}
                    </span>
                    <span className="text-[11px] text-white/50 tabular-nums">
                      {filteredVideos.length} {filteredVideos.length === 1 ? 'video' : 'videos'}
                      {searchQuery.trim() ? ` · “${searchQuery}”` : ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-5 sm:gap-x-4 sm:gap-y-6">
                    {filteredVideos.map(renderTile)}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Inline VideoTile ─── */

function VideoTile({
  video,
  isBookmarked,
  isWatched,
  progressPct,
  onTap,
  onBookmarkToggle,
}: {
  video: CuratedVideo;
  isBookmarked: boolean;
  isWatched: boolean;
  progressPct?: number;
  onTap: () => void;
  onBookmarkToggle: () => void;
}) {
  const levelChip =
    video.level === 'beginner'
      ? 'text-green-400/90 bg-green-400/10 border-green-400/20'
      : video.level === 'intermediate'
        ? 'text-amber-400/90 bg-amber-400/10 border-amber-400/20'
        : 'text-red-400/90 bg-red-400/10 border-red-400/20';

  const inProgress = progressPct != null && progressPct > 0 && progressPct < 100;

  return (
    <div className="group flex flex-col">
      {/* Thumbnail */}
      <div className="relative">
        <button
          onClick={onTap}
          className="relative block w-full aspect-video rounded-xl overflow-hidden bg-white/[0.04] ring-1 ring-white/[0.06] group-hover:ring-elec-yellow/30 transition-all touch-manipulation"
        >
          <img
            src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
            alt={video.title}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04] ${
              isWatched ? 'opacity-60' : ''
            }`}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
          {/* Play affordance — appears on hover (desktop), subtle on touch */}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-black/55 backdrop-blur-sm border border-white/25 flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
              <Play className="h-4 w-4 text-white fill-white ml-0.5" />
            </span>
          </span>
          {isWatched && !inProgress && (
            <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 px-1.5 py-0.5 rounded bg-elec-yellow/90 text-black text-[9px] font-semibold backdrop-blur-sm">
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
              Watched
            </span>
          )}
          <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/75 text-[10px] text-white font-medium backdrop-blur-sm tabular-nums">
            {video.duration}
          </span>
          {/* Resume progress bar */}
          {inProgress && (
            <span className="absolute inset-x-0 bottom-0 h-[3px] bg-black/40">
              <span
                className="block h-full bg-elec-yellow"
                style={{ width: `${progressPct}%` }}
              />
            </span>
          )}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookmarkToggle();
          }}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Save video'}
          className="absolute top-1.5 right-1.5 h-8 w-8 flex items-center justify-center rounded-full bg-black/45 backdrop-blur-sm touch-manipulation hover:bg-black/65 active:bg-black/70 transition-colors z-10"
        >
          <Bookmark
            className={`h-3.5 w-3.5 ${
              isBookmarked ? 'text-elec-yellow fill-elec-yellow' : 'text-white'
            }`}
          />
        </button>
      </div>

      {/* Meta */}
      <button onClick={onTap} className="text-left touch-manipulation w-full pt-2.5">
        <h4 className="text-[12.5px] sm:text-[13px] font-medium text-white leading-snug line-clamp-2 group-hover:text-elec-yellow transition-colors">
          {video.title}
        </h4>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="flex-1 min-w-0 text-[11px] text-white/50 truncate">
            {video.channel}
          </span>
          <span
            className={`shrink-0 px-1.5 py-0.5 rounded border text-[9px] font-medium uppercase tracking-wide ${levelChip}`}
          >
            {video.level}
          </span>
        </div>
      </button>
    </div>
  );
}

/* ─── Featured Spotlight ─── */

function FeaturedSpotlight({ video, onTap }: { video: CuratedVideo; onTap: () => void }) {
  const levelChip =
    video.level === 'beginner'
      ? 'text-green-400/90 bg-green-400/10 border-green-400/20'
      : video.level === 'intermediate'
        ? 'text-amber-400/90 bg-amber-400/10 border-amber-400/20'
        : 'text-red-400/90 bg-red-400/10 border-red-400/20';

  return (
    <button
      onClick={onTap}
      className="group relative w-full text-left rounded-2xl overflow-hidden border border-white/[0.08] bg-[hsl(240,5.9%,12%)] touch-manipulation"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />
      <div className="flex flex-col lg:flex-row">
        {/* Thumbnail */}
        <div className="relative lg:w-[56%] aspect-video overflow-hidden">
          <img
            src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent lg:bg-gradient-to-r lg:from-black/30 lg:via-transparent" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-black/55 backdrop-blur-sm border border-white/25 flex items-center justify-center transition-transform group-hover:scale-105">
              <Play className="h-6 w-6 text-white fill-white ml-0.5" />
            </span>
          </span>
          <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/75 text-[11px] text-white font-medium backdrop-blur-sm tabular-nums">
            {video.duration}
          </span>
        </div>

        {/* Text */}
        <div className="flex-1 p-5 sm:p-7 lg:p-8 flex flex-col justify-center">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
            Featured
          </span>
          <h2 className="mt-2 text-[20px] sm:text-[26px] lg:text-[30px] font-semibold tracking-tight leading-[1.12] text-white group-hover:text-elec-yellow transition-colors">
            {video.title}
          </h2>
          {video.description && (
            <p className="mt-2.5 text-[13px] sm:text-sm leading-relaxed text-white/60 line-clamp-2 sm:line-clamp-3 max-w-[52ch]">
              {video.description}
            </p>
          )}
          <div className="mt-4 flex items-center flex-wrap gap-x-3 gap-y-2">
            <span className="text-[12px] text-white/70">{video.channel}</span>
            <span className="h-1 w-1 rounded-full bg-white/25" />
            <span className="flex items-center gap-1 text-[12px] text-white/55">
              <Clock className="h-3.5 w-3.5" />
              {video.duration}
            </span>
            <span
              className={`px-1.5 py-0.5 rounded border text-[9px] font-medium uppercase tracking-wide ${levelChip}`}
            >
              {video.level}
            </span>
          </div>
          <span className="mt-5 inline-flex items-center gap-2 h-10 px-4 rounded-full bg-elec-yellow text-black text-[13px] font-semibold w-fit">
            <Play className="h-3.5 w-3.5 fill-black" />
            Watch now
          </span>
        </div>
      </div>
    </button>
  );
}

/* ─── Creator Promo Card ─── */

function CreatorPromoCard() {
  return (
    <div className="rounded-xl border border-elec-yellow/20 bg-gradient-to-br from-elec-yellow/[0.06] to-transparent overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0">
            <Award className="h-5 w-5 text-elec-yellow" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-white">Craig Wiltshire</h3>
            <p className="text-[12px] text-white">NVQ Assessor & Electrical Trainer</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Bio */}
        <p className="text-[13px] text-white leading-relaxed">
          Craig is an experienced NVQ assessor and electrical training specialist who's helped
          hundreds of apprentices achieve their electrotechnical qualifications through his
          straightforward, no-nonsense teaching style.
        </p>

        {/* Book + Channel — side by side on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Book */}
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-elec-yellow flex-shrink-0" />
              <h4 className="text-[13px] font-semibold text-white">Craig's Book</h4>
            </div>
            <p className="text-[13px] font-medium text-white leading-snug">
              Electrotechnical NVQ — The Ultimate Guide
            </p>
            <p className="text-[12px] text-white leading-relaxed">
              Everything you need to pass your Electrotechnical NVQ — practical tips, assessment
              guidance, and insider knowledge.
            </p>
            <a
              href="https://www.amazon.co.uk/Electrotechnical-NVQ-ultimate-guide-busting/dp/B0DWLDSTF4/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 h-12 w-full px-4 rounded-xl bg-elec-yellow text-black font-semibold text-sm touch-manipulation active:scale-[0.98] transition-transform"
            >
              <BookOpen className="h-4 w-4" />
              Get the Book on Amazon
              <ExternalLink className="h-3.5 w-3.5 ml-auto" />
            </a>
          </div>

          {/* YouTube Channel */}
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-3 space-y-2 flex flex-col">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-elec-yellow flex-shrink-0" />
              <h4 className="text-[13px] font-semibold text-white">YouTube Channel</h4>
            </div>
            <p className="text-[12px] text-white leading-relaxed flex-1">
              Follow Craig for more free training content, NVQ tips, and assessment guidance.
            </p>
            <a
              href="https://www.youtube.com/@craigwiltshire9628"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 h-12 w-full px-4 rounded-xl bg-white/[0.08] border border-white/[0.1] text-white font-medium text-sm touch-manipulation active:scale-[0.98] transition-transform"
            >
              Visit Craig's Channel
              <ExternalLink className="h-3.5 w-3.5 ml-auto" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Engineering Mindset Promo Card ─── */

function EngineeringMindsetPromoCard() {
  return (
    <div className="rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/[0.06] to-transparent overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
            <Zap className="h-5 w-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-white">The Engineering Mindset</h3>
            <p className="text-[12px] text-white">Paul Evans — Electrical Engineering Educator</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Bio */}
        <p className="text-[13px] text-white leading-relaxed">
          Paul Evans breaks down complex electrical engineering concepts with brilliant animations
          and clear explanations. His channel has helped millions of students and apprentices
          understand the theory behind electrical systems.
        </p>

        {/* US voltage note */}
        <div className="flex gap-2 rounded-lg bg-indigo-500/[0.08] border border-indigo-500/15 p-3">
          <Zap className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
          <p className="text-[12px] text-white leading-relaxed">
            Some videos use US voltage examples (120V/240V) — the principles are identical. UK mains
            is 230V single phase, 400V three phase.
          </p>
        </div>

        {/* YouTube Channel */}
        <a
          href="https://www.youtube.com/@TheEngineeringMindset"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 h-12 w-full px-4 rounded-xl bg-indigo-500/15 border border-indigo-500/20 text-indigo-300 font-medium text-sm touch-manipulation active:scale-[0.98] transition-transform"
        >
          <Video className="h-4 w-4" />
          Visit The Engineering Mindset Channel
          <ExternalLink className="h-3.5 w-3.5 ml-auto" />
        </a>
      </div>
    </div>
  );
}

/* ─── Related Video Row ─── */

function RelatedVideoRow({
  video,
  isBookmarked,
  onTap,
  onBookmarkToggle,
}: {
  video: CuratedVideo;
  isBookmarked: boolean;
  onTap: () => void;
  onBookmarkToggle: () => void;
}) {
  return (
    <div className="group flex gap-3 items-start rounded-lg -mx-1.5 px-1.5 py-1.5 hover:bg-white/[0.04] active:bg-white/[0.04] transition-colors">
      <button
        onClick={onTap}
        className="relative flex-shrink-0 w-[132px] aspect-video rounded-lg overflow-hidden bg-black/30 ring-1 ring-white/[0.06] group-hover:ring-elec-yellow/30 transition-all touch-manipulation"
      >
        <img
          src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/75 text-[9px] text-white font-medium tabular-nums">
          {video.duration}
        </span>
      </button>

      <button onClick={onTap} className="flex-1 text-left touch-manipulation min-w-0 pt-0.5">
        <h5 className="text-[12.5px] font-medium text-white leading-snug line-clamp-2 group-hover:text-elec-yellow transition-colors">
          {video.title}
        </h5>
        <p className="text-[11px] text-white/50 mt-1">{video.channel}</p>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onBookmarkToggle();
        }}
        className="h-11 w-11 flex items-center justify-center rounded-lg touch-manipulation active:bg-white/10 flex-shrink-0 -mr-1"
      >
        <Bookmark
          className={`h-3.5 w-3.5 ${
            isBookmarked ? 'text-elec-yellow fill-elec-yellow' : 'text-white'
          }`}
        />
      </button>
    </div>
  );
}
