/**
 * LearningVideos
 *
 * Full-viewport app-like learning videos page at /apprentice/learning-videos.
 * Single window view with inline player that replaces the grid (YouTube mobile pattern).
 * When a video is selected, the grid fades out and the player + related videos appear.
 * No bottom sheet -- instant, immersive playback.
 */

import { useState, useMemo, useEffect, useLayoutEffect, useCallback, useRef, memo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
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
  Mic,
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import { chipBase, chipOff, chipOn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import {
  curatedVideos,
  getAvailableCategories,
  categoryLabels,
  learningPaths,
  getPathVideos,
} from '@/data/apprentice/curatedVideos';
import type { CuratedVideo, VideoCategory, LearningPath } from '@/data/apprentice/curatedVideos';
import { useVideoBookmarks } from '@/hooks/learning-videos/useVideoBookmarks';
import { useVideoWatchSession } from '@/hooks/learning-videos/useVideoWatchCredit';
import { useVideoProgress } from '@/hooks/learning-videos/useVideoProgress';
import { useLearningXP } from '@/hooks/useLearningXP';
import { YouTubePlayer } from '@/components/apprentice/learning-videos/YouTubePlayer';
import { VideoQuizSheet } from '@/components/apprentice/learning-videos/VideoQuizSheet';
import { getVideoQuiz } from '@/data/apprentice/videoQuizzes';
import { openExternalUrl } from '@/utils/open-external-url';
import { useToast } from '@/hooks/use-toast';

// Spotlight rotates daily through the flagship videos — same pick for
// everyone on a given day, fresh tomorrow. (Was pinned to one video forever.)
const FEATURED_IDS = [
  '4lAyzRxsbDc', // Multimeter ultimate guide
  'mc979OhitAg', // How electricity works
  'J6w-ASh6eKw', // Consumer unit explained
  'K7-FxWD87Kg', // Ring final testing
  'QykwWs3L1W8', // Heat pumps explained
  'E-1G_4kh5Rk', // How to price jobs
  '4oRT7PoXSS0', // Three phase
  'qUJ8carxtIM', // Sequence of tests
];
const dayOfYear = Math.floor(
  (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86_400_000
);
const FEATURED_ID = FEATURED_IDS[dayOfYear % FEATURED_IDS.length];

/**
 * A callback whose identity never changes but which always runs the latest
 * closure. Needed because the tile callbacks close over hook state that
 * changes on every bookmark and every watch — see the note at their
 * definitions. Assigning during render (rather than in an effect) is safe
 * here: these are only ever invoked from event handlers, never during render.
 */
function useStableCallback<A extends unknown[], R>(fn: (...args: A) => R): (...args: A) => R {
  const ref = useRef(fn);
  ref.current = fn;
  return useCallback((...args: A) => ref.current(...args), []);
}

/*
 * ELE-1653 — scrolling was jumpy with ~400 videos.
 *
 * The default view rendered every tile in every category at once: 400 nodes,
 * 400 YouTube thumbnails and (worse) 800 `backdrop-blur` layers, all live on
 * every frame. `loading="lazy"` defers the network fetch but not the layout,
 * the decode or the compositing.
 *
 * `LazyMount` keeps a block of tiles out of the tree until it comes within
 * `LAZY_MARGIN_PX` of the viewport, reserving its height first so the
 * scrollbar doesn't lurch. Once mounted it STAYS mounted — unmounting on
 * scroll-out trades one stutter for another.
 *
 * Measured on /study-centre/videos: 63 tiles mount on load instead of 403.
 */
const LAZY_MARGIN_PX = 1200;

function LazyMount({
  count,
  children,
}: {
  /** How many tiles this block holds — used to reserve its height. */
  count: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  const [reserved, setReserved] = useState(() => estimateGridHeight(count, null));

  /*
   * The first screenful mounts from a measurement, not from an observer.
   * IntersectionObserver only delivers callbacks while the page is actually
   * being rendered, so relying on it for the initial mount means the library
   * can paint empty — a backgrounded tab, a restored session or a slow first
   * frame all defer that first callback. A layout-effect rect check runs
   * before paint and settles the visible blocks immediately; the observer
   * then handles everything that scrolls into view afterwards.
   */
  useLayoutEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el) return;
    // Reserve from the block's OWN width. Deriving it from the viewport was
    // 30% out on desktop, where the app shell's sidebar takes ~340px.
    // A zero width means the block is display:none somewhere up the tree —
    // fall back to the viewport estimate rather than reserving nothing, which
    // would collapse the page and pull every block into view at once.
    const measured = estimateGridHeight(count, el.clientWidth > 0 ? el.clientWidth : null);
    if (Math.abs(measured - reserved) > 1) setReserved(measured);
    if (el.getBoundingClientRect().top - LAZY_MARGIN_PX < window.innerHeight) setShown(true);
  }, [shown, count, reserved]);

  useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el) return;
    // No IntersectionObserver (old WebView) → render everything, as before.
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setShown(true);
      },
      { rootMargin: `${LAZY_MARGIN_PX}px 0px` }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  /*
   * Unmounted blocks show skeleton tiles rather than nothing. 1200px of lead
   * is roughly a screen and a half, which a hard flick on a phone can outrun —
   * and empty space reads as a broken page, where a skeleton reads as loading.
   * They're bare divs: no images, no text, nothing to lay out beyond a box.
   */
  return (
    <div ref={ref} style={shown ? undefined : { minHeight: reserved }}>
      {shown ? (
        children
      ) : (
        <div
          className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-6 lg:grid-cols-4"
          aria-hidden
        >
          {Array.from({ length: Math.min(count, 8) }, (_, i) => (
            <div key={i} className="flex flex-col">
              <div className="aspect-video w-full rounded-xl bg-white/[0.04]" />
              <div className="mt-2.5 h-3 w-[85%] rounded bg-white/[0.04]" />
              <div className="mt-1.5 h-3 w-[55%] rounded bg-white/[0.03]" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Height to reserve for a grid of `count` tiles that hasn't mounted yet.
 *
 * Worked from the grid's own geometry — its measured width, the column count
 * at this breakpoint and the 16:9 thumbnail — rather than a flat per-tile
 * guess, which left the page visibly shrinking under the scrollbar as blocks
 * mounted. `width` is null only on the very first render, before the block has
 * been measured; the layout effect corrects it before paint.
 */
function estimateGridHeight(count: number, width: number | null): number {
  if (typeof window === 'undefined') return count * 90;
  const vw = window.innerWidth;
  const cols = vw >= 1024 ? 4 : vw >= 640 ? 3 : 2;
  const gapX = vw >= 640 ? 16 : 12;
  const gapY = vw >= 640 ? 24 : 20;
  const gridW = width ?? Math.min(1600, vw) - (vw >= 1024 ? 64 : 32);
  const tileW = (gridW - gapX * (cols - 1)) / cols;
  const META_H = 68; // title (2 lines) + channel/level row + its top padding
  const rowH = (tileW * 9) / 16 + META_H + gapY;
  return Math.max(0, Math.ceil(count / cols) * rowH - gapY);
}

/** Flat grids (search / category / saved) mount a screenful of tiles at a time. */
const FLAT_CHUNK = 24;

/**
 * Hides learning-path cards past the first DESKTOP row when the rail is
 * collapsed. Done in CSS rather than by slicing the array because the mobile
 * layout is a horizontal snap rail — one row already, and every path has to
 * stay reachable there. The grid is 3 / 4 / 5 columns at lg / xl / 2xl, so
 * each of those cut-off indices needs its own rule.
 */
function pathRowCls(i: number, showAll: boolean): string {
  if (showAll || i < 3) return '';
  if (i === 3) return 'lg:hidden xl:block';
  if (i === 4) return 'lg:hidden 2xl:block';
  return 'lg:hidden';
}

const chunk = <T,>(items: T[], size: number): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
};

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
  const [levelFilter, setLevelFilter] = useState<
    'all' | 'beginner' | 'intermediate' | 'advanced' | 'quick'
  >('all');
  const [activePath, setActivePath] = useState<LearningPath | null>(null);
  const [savedOnly, setSavedOnly] = useState(false);
  const [showAllPaths, setShowAllPaths] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizRecord, setQuizRecord] = useState<{ best: number; total: number } | null>(null);

  const { bookmarks, isBookmarked, toggleBookmark, getWatchedIds } = useVideoBookmarks();
  // Measured watch time → off-the-job minutes. Records the "watched" flag on
  // play and credits the real elapsed time when the player closes.
  const { startWatch, stopWatch } = useVideoWatchSession();
  const { logActivity } = useLearningXP();
  const { toast } = useToast();
  const { saveProgress, markCompleted, getProgress, inProgressIds } = useVideoProgress();
  const categories = getAvailableCategories();

  /*
   * Opening a video starts the clock. It does NOT credit the hours.
   *
   * This used to log the video's full runtime the moment you tapped play, so
   * twenty seconds of a twelve-minute video banked twelve minutes. These are
   * ESFA off-the-job hours — a tutor signs them and a gateway assessor can
   * inspect them — so they now come from measured watch time, capped at the
   * runtime, credited by useVideoWatchSession when the player closes.
   */
  const awardWatch = useCallback(
    (video: CuratedVideo) => {
      startWatch({
        videoId: video.id,
        title: video.title,
        channel: video.channel,
        duration: video.duration,
        category: video.category,
      });

      // Did this watch complete a learning path? Bonus XP, once per path.
      // Carries ZERO minutes on purpose — the watch itself is the only thing
      // allowed to credit time, or a path bonus would double-count it.
      const nowWatched = new Set([...getWatchedIds(), video.id]);
      for (const path of learningPaths) {
        if (!path.videoIds.includes(video.id)) continue;
        const complete = getPathVideos(path).every((v) => nowWatched.has(v.id));
        if (!complete) continue;
        const guardKey = `elecmate_path_xp_${path.id}`;
        if (localStorage.getItem(guardKey)) continue;
        localStorage.setItem(guardKey, '1');
        logActivity({
          activityType: 'path_completed',
          sourceId: path.id,
          sourceTitle: path.title,
          metadata: { videos: path.videoIds.length },
        });
        toast({
          title: `Path complete: ${path.title}`,
          description: 'Every video watched — bonus XP earned. Nice going.',
        });
      }
    },
    [startWatch, logActivity, getWatchedIds, toast]
  );

  // Post-video quiz — questions exist for path + spotlight videos
  const quizQuestions = useMemo(
    () => (selectedVideo ? getVideoQuiz(selectedVideo.id) : null),
    [selectedVideo]
  );

  useEffect(() => {
    setQuizOpen(false);
    if (!selectedVideo) {
      setQuizRecord(null);
      return;
    }
    try {
      const raw = localStorage.getItem(`elecmate_video_quiz_${selectedVideo.id}`);
      setQuizRecord(raw ? JSON.parse(raw) : null);
    } catch {
      setQuizRecord(null);
    }
  }, [selectedVideo]);

  // Pass = 2 of 3. XP awarded once per video (localStorage guard) via the
  // standard quiz_completed rule; retakes are free and only improve the best
  // score. Minutes are real elapsed quiz time — never the video's runtime.
  const handleQuizComplete = useCallback(
    (correct: number, total: number, minutes: number) => {
      if (!selectedVideo) return;
      const key = `elecmate_video_quiz_${selectedVideo.id}`;
      let prev: { best: number; total: number; xp?: boolean } | null = null;
      try {
        prev = JSON.parse(localStorage.getItem(key) || 'null');
      } catch {
        /* corrupt record — treat as fresh */
      }
      const passed = correct / total >= 2 / 3;
      const next = {
        best: Math.max(prev?.best ?? 0, correct),
        total,
        xp: (prev?.xp ?? false) || passed,
      };
      localStorage.setItem(key, JSON.stringify(next));
      setQuizRecord(next);
      if (passed && !prev?.xp) {
        logActivity({
          activityType: 'quiz_completed',
          sourceId: selectedVideo.id,
          sourceTitle: `Video quiz — ${selectedVideo.title}`,
          scorePercent: Math.round((correct / total) * 100),
          actualMinutes: minutes,
          metadata: { videoId: selectedVideo.id, correct, total, kind: 'video_quiz' },
        });
        toast({
          title: 'Quiz passed — XP earned',
          description: `${correct}/${total} — nice work.`,
        });
      }
    },
    [selectedVideo, logActivity, toast]
  );

  // Handle ?play=VIDEO_ID from hub navigation
  useEffect(() => {
    const playId = searchParams.get('play');
    if (playId && !selectedVideo) {
      const video = curatedVideos.find((v) => v.id === playId);
      if (video) {
        setSelectedVideo(video);
        awardWatch(video);
      }
      // Clean the URL param
      searchParams.delete('play');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams, selectedVideo, awardWatch]);

  // Filter videos
  const savedIds = useMemo(() => new Set(bookmarks.map((b) => b.videoId)), [bookmarks]);

  const filteredVideos = useMemo(() => {
    let videos = curatedVideos;

    if (savedOnly) {
      videos = videos.filter((v) => savedIds.has(v.id));
    }

    if (activeCategory !== 'all') {
      videos = videos.filter((v) => v.category === activeCategory);
    }

    if (levelFilter === 'quick') {
      videos = videos.filter((v) => durationToMinutes(v.duration) <= 5);
    } else if (levelFilter !== 'all') {
      videos = videos.filter((v) => v.level === levelFilter);
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
  }, [activeCategory, searchQuery, levelFilter, savedOnly, savedIds]);

  // Related videos for player
  const relatedVideos = useMemo(() => {
    if (!selectedVideo) return [];
    return curatedVideos
      .filter((v) => v.category === selectedVideo.category && v.id !== selectedVideo.id)
      .slice(0, 8);
  }, [selectedVideo]);

  // Default landing state: no search, no filters → spotlight + paths + sections
  const isDefaultView =
    activeCategory === 'all' && !searchQuery.trim() && levelFilter === 'all' && !savedOnly;

  const featuredVideo = useMemo(() => curatedVideos.find((v) => v.id === FEATURED_ID) ?? null, []);

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

  /*
   * ELE-1652 — open the player at the TOP, and come back where you left off.
   *
   * The page scrolls the window (there is no inner scroll container), and
   * React swaps the grid for the player without touching scroll position. Tap
   * the 300th video and the player mounts with the window still scrolled a
   * few thousand pixels down, so it looks like nothing happened until you
   * scroll up.
   *
   * Restoring on the way back matters just as much: landing at the top of a
   * 400-video list after every video means finding your place again each time.
   */
  const gridScrollY = useRef(0);
  const playingId = selectedVideo?.id ?? null;

  /*
   * A layout effect, not `useEffect` + `requestAnimationFrame`.
   *
   * The old version deferred the restore by one animation frame to give the
   * grid time to lay out. That frame is not guaranteed: if the page isn't
   * rendering when it's queued — backgrounded tab, restored session, a slow
   * first frame — the callback never runs and the restore is silently lost.
   *
   * It's also no longer needed. `LazyMount` reserves each block's height while
   * it's unmounted, and child layout effects run before this one, so by the
   * time we get here the document is already its full height and the scroll
   * target exists. Doing it synchronously before paint also means the user
   * never sees the top of the list flash past on the way back.
   */
  useLayoutEffect(() => {
    if (playingId) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    const y = gridScrollY.current;
    if (y > 0) window.scrollTo({ top: y, behavior: 'auto' });
  }, [playingId]);

  /*
   * Tile callbacks go through `useStableCallback`, not plain `useCallback`.
   *
   * `useCallback` isn't enough here. `toggleBookmark` depends on the bookmarks
   * array and `awardWatch` on the watched-ids array, so both change identity
   * the moment either list changes — and every tile then gets new props.
   * Saving ONE video re-rendered all 400. The ref indirection pins the
   * identity for the lifetime of the page while still calling the latest
   * closure, so a bookmark tap now re-renders exactly the tile that changed.
   */
  const handleVideoTap = useStableCallback((video: CuratedVideo) => {
    gridScrollY.current = window.scrollY;
    setSelectedVideo(video);
    awardWatch(video);
  });

  const handleClosePlayer = useCallback(() => {
    // Banks what was actually watched. Navigating away instead of closing is
    // covered too — the hook settles on unmount and on pagehide.
    stopWatch();
    setSelectedVideo(null);
  }, [stopWatch]);

  const handleBookmarkToggle = useStableCallback((video: CuratedVideo) => {
    toggleBookmark(video.id, video.title, video.category);
  });

  const savedCount = bookmarks.length;
  const isPlayerMode = !!selectedVideo;

  const renderTile = useCallback(
    (video: CuratedVideo) => (
      <VideoTile
        key={video.id}
        video={video}
        isBookmarked={isBookmarked(video.id)}
        isWatched={isWatched(video.id)}
        progressPct={getProgress(video.id)?.pct}
        onTap={handleVideoTap}
        onBookmarkToggle={handleBookmarkToggle}
      />
    ),
    [isBookmarked, isWatched, getProgress, handleVideoTap, handleBookmarkToggle]
  );

  return (
    <HubPage>
      <HubMasthead
        section="Learning"
        title={isPlayerMode ? selectedVideo.title : activePath ? activePath.title : 'Video library'}
        onBack={
          isPlayerMode
            ? handleClosePlayer
            : activePath
              ? () => setActivePath(null)
              : () => navigate(backTo)
        }
        trailing={
          <>
            {/* Action buttons -- only show in grid mode */}
            {!isPlayerMode && !activePath && (
              <div className="hidden flex-shrink-0 items-center gap-0.5 rounded-full border border-white/[0.10] bg-white/[0.04] p-0.5 lg:flex">
                {(
                  [
                    { v: 'all', label: 'Any level' },
                    { v: 'beginner', label: 'Beginner' },
                    { v: 'intermediate', label: 'Intermediate' },
                    { v: 'advanced', label: 'Advanced' },
                    { v: 'quick', label: '≤ 5 min' },
                  ] as const
                ).map((opt) => (
                  <button
                    key={opt.v}
                    onClick={() => setLevelFilter(opt.v)}
                    className={`h-11 whitespace-nowrap rounded-full px-3 text-[12px] font-semibold transition-colors touch-manipulation ${levelFilter === opt.v ? 'bg-elec-yellow text-black' : 'text-white'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {!isPlayerMode && (
              <div className="flex items-center gap-1.5">
                {!activePath && (
                  <select
                    value={levelFilter}
                    onChange={(e) => setLevelFilter(e.target.value as typeof levelFilter)}
                    aria-label="Filter by level"
                    className={`h-11 w-[96px] flex-shrink-0 rounded-full border px-2.5 text-[12px] font-medium touch-manipulation [color-scheme:dark] focus:outline-none lg:hidden ${levelFilter === 'all' ? 'border-white/[0.12] bg-white/[0.06] text-white' : 'border-elec-yellow bg-elec-yellow text-black'}`}
                  >
                    <option value="all">Any</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermed.</option>
                    <option value="advanced">Advanced</option>
                    <option value="quick">≤ 5 min</option>
                  </select>
                )}

                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  aria-label="Search videos"
                  className={`h-11 w-11 flex items-center justify-center rounded-xl touch-manipulation transition-colors ${
                    searchOpen ? 'bg-elec-yellow text-black' : 'text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <Search className="h-5 w-5" />
                </button>
                {savedCount > 0 && (
                  <button
                    onClick={() => {
                      setSavedOnly((v) => !v);
                      setActivePath(null);
                      setSearchQuery('');
                    }}
                    aria-pressed={savedOnly}
                    className={`h-11 flex items-center gap-1.5 px-3 rounded-xl border touch-manipulation transition-colors ${
                      savedOnly
                        ? 'bg-elec-yellow border-elec-yellow'
                        : 'border-elec-yellow/50 bg-white/[0.06]'
                    }`}
                  >
                    <Bookmark
                      className={`h-4 w-4 ${savedOnly ? 'text-black fill-black' : 'text-elec-yellow fill-elec-yellow'}`}
                    />
                    <span
                      className={`text-sm font-medium tabular-nums ${savedOnly ? 'text-black' : 'text-elec-yellow'}`}
                    >
                      {savedCount}
                    </span>
                  </button>
                )}
              </div>
            )}
          </>
        }
      />

      {/* Search + filter rows sit directly under the masthead, in the same
          column as the content, so the control set stays one row from sm: up. */}
      {!isPlayerMode && (searchOpen || !activePath) && (
        <div className="sticky top-12 z-40 border-b border-white/[0.06] bg-elec-dark/95 backdrop-blur-sm">
          <div className="mx-auto max-w-[1600px] px-4 pt-3 lg:px-8">
            {/* Search bar - slides down when open (grid mode only) */}
            {!isPlayerMode && searchOpen && (
              <div className="pb-3">
                <div className="relative max-w-xl">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, channel or topic…"
                    autoFocus
                    className="h-11 w-full rounded-xl border border-white/[0.12] bg-white/[0.06] pl-10 pr-10 text-base text-white placeholder:text-white/40 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                      className="absolute right-0 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-white touch-manipulation"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Filter bar — one line: categories scroll, level sits on the right.
              Three stacked rows of chips ate the top of the screen; this keeps
              the whole control set to a single row from sm: up. */}
            {!isPlayerMode && !activePath && (
              <div className="pb-3">
                {/* Categories — horizontal scroll with a fade so it reads as scrollable */}
                <div className="relative min-w-0 flex-1">
                  <div className="flex flex-nowrap gap-1.5 overflow-x-auto scrollbar-hide">
                    <button
                      onClick={() => setActiveCategory('all')}
                      className={cn(
                        chipBase,
                        'flex-shrink-0 rounded-full px-3.5',
                        activeCategory === 'all' ? chipOn : chipOff
                      )}
                    >
                      All
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                          chipBase,
                          'flex-shrink-0 whitespace-nowrap rounded-full px-3.5',
                          activeCategory === cat ? chipOn : chipOff
                        )}
                      >
                        {categoryLabels[cat]}
                      </button>
                    ))}
                  </div>
                  <div
                    className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-elec-dark to-transparent"
                    aria-hidden
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══ CONTENT AREA ═══ */}
      {isPlayerMode ? (
        /* ─── INLINE PLAYER VIEW ─── */
        <div>
          <div className="mx-auto max-w-5xl lg:px-8 lg:pt-6">
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

              {/* Meta row. Category is the one chip — it's the only value here
                  you can act on. Channel, duration and level are plain text at
                  reduced opacity, so the row reads as a sentence rather than a
                  row of competing badges in four different colours. */}
              <div className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-[13px] text-white">
                <span className="font-medium">{selectedVideo.channel}</span>
                <span className="h-1 w-1 rounded-full bg-white/25" aria-hidden />
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {selectedVideo.duration}
                </span>
                <span className="h-1 w-1 rounded-full bg-white/25" aria-hidden />
                <span className="text-[12px] uppercase tracking-[0.12em] opacity-55">
                  {selectedVideo.level}
                </span>
                <span className="rounded-md border border-elec-yellow/50 px-2 py-0.5 text-[11px] font-medium text-elec-yellow">
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
                  if (p && p.pct > 0) return <span className="text-[12px]">{p.pct}% watched</span>;
                  return null;
                })()}
              </div>

              {/* Actions — compact pills */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => handleBookmarkToggle(selectedVideo)}
                  className={`inline-flex items-center gap-2 h-11 px-4 rounded-full text-[13px] font-semibold touch-manipulation transition-all active:scale-[0.98] ${
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
                  className="inline-flex items-center gap-2 h-11 px-4 rounded-full bg-white/[0.06] border border-white/[0.12] text-white text-[13px] font-medium hover:bg-white/[0.1] touch-manipulation transition-all active:scale-[0.98]"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open in YouTube
                </button>
              </div>

              {/* Test yourself — quick quiz on this video */}
              {quizQuestions && (
                <button
                  onClick={() => setQuizOpen(true)}
                  className="mt-4 w-full flex items-center gap-3.5 rounded-2xl border border-elec-yellow/25 bg-gradient-to-b from-elec-yellow/[0.1] to-elec-yellow/[0.04] px-4 py-3.5 text-left touch-manipulation transition-all active:scale-[0.99]"
                >
                  <div className="h-10 w-10 rounded-xl bg-elec-yellow flex items-center justify-center shrink-0">
                    {quizRecord && quizRecord.best / quizRecord.total >= 2 / 3 ? (
                      <Check className="h-5 w-5 text-black" strokeWidth={3} />
                    ) : (
                      <Zap className="h-5 w-5 text-black" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13.5px] font-semibold text-white">
                      {quizRecord && quizRecord.best / quizRecord.total >= 2 / 3
                        ? `Quiz passed — best ${quizRecord.best}/${quizRecord.total}`
                        : 'Test yourself'}
                    </p>
                    <p className="text-[12px] text-white">
                      {quizRecord && quizRecord.best / quizRecord.total >= 2 / 3
                        ? 'Retake it any time'
                        : `${quizQuestions.length} quick questions on this video`}
                    </p>
                  </div>
                  <span className="text-[12px] font-semibold text-elec-yellow shrink-0">
                    {quizRecord && quizRecord.best / quizRecord.total >= 2 / 3 ? 'Retake' : 'Start'}
                  </span>
                </button>
              )}

              {/* Description */}
              {selectedVideo.description && (
                <p className="mt-4 max-w-[68ch] text-[13.5px] leading-relaxed text-white">
                  {selectedVideo.description}
                </p>
              )}

              {/* Tags */}
              {selectedVideo.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {selectedVideo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/[0.08] bg-white/[0.05] px-2 py-0.5 text-[11px] text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Creator promotion — one card, looked up by channel */}
              {CREATORS[selectedVideo.channel] && (
                <div className="mt-6">
                  <CreatorCard creator={CREATORS[selectedVideo.channel]} />
                </div>
              )}

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
        <div>
          {filteredVideos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-28 text-center px-8">
              <div className="h-16 w-16 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-4">
                <Video className="h-8 w-8 text-white" />
              </div>
              <p className="text-base font-medium text-white mb-1">No videos found</p>
              <p className="text-sm text-white">
                {searchQuery ? 'Try a different search term' : 'No videos in this category yet'}
              </p>
            </div>
          ) : (
            <div className="mx-auto max-w-[1600px] px-4 py-5 sm:py-6 lg:px-8 pb-24">
              {isDefaultView && !activePath && continueVideos.length > 0 && (
                <section className="space-y-3 sm:space-y-4 mb-9 sm:mb-12">
                  <div className="flex items-baseline justify-between gap-4 px-1">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
                      Continue watching
                    </span>
                    <span className="text-[11px] tabular-nums text-white">
                      {continueVideos.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-5 sm:gap-x-4 sm:gap-y-6">
                    {continueVideos.map(renderTile)}
                  </div>
                </section>
              )}

              {isDefaultView && !activePath && (
                <section className="space-y-3 sm:space-y-4 mb-9 sm:mb-12">
                  <div className="flex items-baseline justify-between gap-4 px-1">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
                      Learning paths
                    </span>
                    <span className="text-[11px] tabular-nums text-white">
                      {learningPaths.length} paths · watch in order
                    </span>
                  </div>
                  {/* Mobile: a snap-scrolling row with an edge fade so it reads as
                      scrollable. Desktop: a plain grid — with 10 paths a hidden
                      horizontal scrollbar left half of them unreachable.
                      Collapsed to one desktop row by default: 12 paths at three
                      rows deep pushed every video below the fold. Mobile is
                      unaffected — the rail already only shows one row. */}
                  <div className="relative">
                    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide snap-x lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible xl:grid-cols-4 2xl:grid-cols-5">
                      {learningPaths.map((path, i) => {
                        const vids = getPathVideos(path);
                        const done = vids.filter((v) => watchedSet.has(v.id)).length;
                        const pct = vids.length ? Math.round((done / vids.length) * 100) : 0;
                        return (
                          <button
                            key={path.id}
                            onClick={() => setActivePath(path)}
                            className={`snap-start flex-shrink-0 w-[215px] sm:w-[260px] lg:w-auto text-left rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-4 touch-manipulation active:scale-[0.98] transition-transform ${pathRowCls(i, showAllPaths)}`}
                          >
                            <p className="text-[14px] font-semibold text-white leading-snug">
                              {path.title}
                            </p>
                            <p className="mt-1 text-[11.5px] leading-snug text-white line-clamp-2">
                              {path.strap}
                            </p>
                            <div className="mt-3 h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                              <div
                                className="h-full rounded-full bg-elec-yellow transition-all"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <p className="mt-1.5 text-[11px] tabular-nums text-white">
                              {done}/{vids.length} watched{pct === 100 ? ' · complete ✓' : ''}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                    <div
                      className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-elec-dark to-transparent sm:w-16 lg:hidden"
                      aria-hidden
                    />
                  </div>
                  {learningPaths.length > 3 && (
                    <button
                      onClick={() => setShowAllPaths((v) => !v)}
                      className="hidden h-11 items-center text-[12px] font-medium text-elec-yellow touch-manipulation lg:inline-flex"
                    >
                      {showAllPaths ? 'Show fewer paths' : `Show all ${learningPaths.length} paths`}
                    </button>
                  )}
                </section>
              )}

              {isDefaultView && featuredVideo && !activePath && (
                <div className="mb-9 sm:mb-12">
                  <FeaturedSpotlight
                    video={featuredVideo}
                    onTap={() => handleVideoTap(featuredVideo)}
                  />
                </div>
              )}

              {activePath ? (
                <PathDetail
                  path={activePath}
                  watchedSet={watchedSet}
                  getProgressPct={(id) => getProgress(id)?.pct}
                  onPlay={handleVideoTap}
                />
              ) : isDefaultView ? (
                /* Grouped, scannable sections by category */
                <div className="space-y-9 sm:space-y-12">
                  {groupedVideos.map(({ cat, items }) => (
                    <section key={cat} className="space-y-3 sm:space-y-4">
                      <div className="flex items-baseline justify-between gap-4 px-1">
                        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
                          {categoryLabels[cat]}
                        </span>
                        <span className="text-[11px] tabular-nums text-white">
                          {(() => {
                            const w = items.filter((v) => watchedSet.has(v.id)).length;
                            return w > 0
                              ? `${w}/${items.length} watched`
                              : `${items.length} ${items.length === 1 ? 'video' : 'videos'}`;
                          })()}
                        </span>
                      </div>
                      <LazyMount count={items.length}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-5 sm:gap-x-4 sm:gap-y-6">
                          {items.map(renderTile)}
                        </div>
                      </LazyMount>
                    </section>
                  ))}
                </div>
              ) : (
                /* Filtered / search → single flat grid */
                <>
                  <div className="flex items-baseline justify-between gap-4 mb-4 px-1">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
                      {savedOnly
                        ? 'Saved videos'
                        : activeCategory === 'all'
                          ? 'Results'
                          : categoryLabels[activeCategory]}
                    </span>
                    <span className="text-[11px] tabular-nums text-white">
                      {filteredVideos.length} {filteredVideos.length === 1 ? 'video' : 'videos'}
                      {searchQuery.trim() ? ` · “${searchQuery}”` : ''}
                    </span>
                  </div>
                  {/* One flat list can be the whole 400 on its own (search
                      cleared, category 'all' but a level filter on), so it
                      mounts a screenful at a time rather than in one go. */}
                  {/* Chunk size is a multiple of every column count (2/3/4) so
                      no block ends on a ragged row. */}
                  <div className="space-y-5 sm:space-y-6">
                    {chunk(filteredVideos, FLAT_CHUNK).map((block, i) => (
                      <LazyMount key={block[0]?.id ?? i} count={block.length}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-5 sm:gap-x-4 sm:gap-y-6">
                          {block.map(renderTile)}
                        </div>
                      </LazyMount>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {/* Post-video quiz sheet */}
      {selectedVideo && quizQuestions && (
        <VideoQuizSheet
          open={quizOpen}
          onOpenChange={setQuizOpen}
          videoTitle={selectedVideo.title}
          questions={quizQuestions}
          onComplete={handleQuizComplete}
        />
      )}
    </HubPage>
  );
}

/* ─── Inline VideoTile ─── */

const VideoTile = memo(function VideoTile({
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
  /* Take the video rather than closing over it, so the parent can pass one
     stable callback to every tile and `memo` above actually holds. */
  onTap: (video: CuratedVideo) => void;
  onBookmarkToggle: (video: CuratedVideo) => void;
}) {
  const inProgress = progressPct != null && progressPct > 0 && progressPct < 100;

  /*
   * Deliberately no `content-visibility: auto` on the tile. It needs a
   * `contain-intrinsic-size` to stand in for the skipped content, and the real
   * tile height changes with the column count (2 / 3 / 4) — any fixed value is
   * wrong at most breakpoints, so the grid resizes as tiles enter and leave
   * the skipped state. That is the very stutter ELE-1653 is about. `LazyMount`
   * already keeps off-screen tiles out of the tree.
   */
  return (
    <div className="group flex flex-col">
      {/* Thumbnail.
          No `backdrop-blur` anywhere on this tile: at 400 tiles the duration
          chip and the bookmark button alone were 800 backdrop-filter layers,
          which is what made the scroll stutter. Solid fills read the same. */}
      <div className="relative">
        <button
          onClick={() => onTap(video)}
          className="relative block w-full aspect-video rounded-xl overflow-hidden bg-white/[0.04] ring-1 ring-white/[0.06] group-hover:ring-elec-yellow/30 transition-all touch-manipulation"
        >
          <img
            src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
            alt={video.title}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04] ${
              isWatched ? 'opacity-50' : ''
            }`}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          {/* Play affordance — appears on hover (desktop), subtle on touch */}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-black/60 border border-white/25 flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
              <Play className="h-4 w-4 text-white fill-white ml-0.5" />
            </span>
          </span>
          {isWatched && !inProgress && (
            <span className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded bg-elec-yellow px-1.5 py-0.5 text-[9px] font-semibold text-black">
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
              Watched
            </span>
          )}
          <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-white">
            {video.duration}
          </span>
          {/* Resume progress bar */}
          {inProgress && (
            <span className="absolute inset-x-0 bottom-0 h-[3px] bg-black/40">
              <span className="block h-full bg-elec-yellow" style={{ width: `${progressPct}%` }} />
            </span>
          )}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookmarkToggle(video);
          }}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Save video'}
          className="absolute top-1.5 right-1.5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 transition-colors touch-manipulation hover:bg-black/75 active:bg-black/80"
        >
          <Bookmark
            className={`h-3.5 w-3.5 ${
              isBookmarked ? 'text-elec-yellow fill-elec-yellow' : 'text-white'
            }`}
          />
        </button>
      </div>

      {/* Meta. One accent only — gold. The level used to be a traffic-light
          chip (green / amber / red), which put three more colours on screen
          400 times over. */}
      <button onClick={() => onTap(video)} className="w-full pt-2.5 text-left touch-manipulation">
        {/* Always two lines tall, clamped or not, so the channel/level row sits
            on the same baseline right across a grid row — and so every tile is
            the same height, which is what `estimateGridHeight` assumes. */}
        <h4 className="min-h-[2.75em] text-[12.5px] sm:text-[13px] font-medium text-white leading-snug line-clamp-2 group-hover:text-elec-yellow transition-colors">
          {video.title}
        </h4>
        <div className="mt-1.5 flex items-center gap-2 text-[11px] text-white">
          <span className="min-w-0 flex-1 truncate">{video.channel}</span>
          <span className="shrink-0 text-[9px] font-medium uppercase tracking-[0.12em] opacity-45">
            {video.level}
          </span>
        </div>
      </button>
    </div>
  );
});

/* ─── Featured Spotlight ─── */

function FeaturedSpotlight({ video, onTap }: { video: CuratedVideo; onTap: () => void }) {
  return (
    <button
      onClick={onTap}
      className="group relative w-full text-left rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.05] touch-manipulation"
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
            <span className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-black/60 border border-white/25 flex items-center justify-center transition-transform group-hover:scale-105">
              <Play className="h-6 w-6 text-white fill-white ml-0.5" />
            </span>
          </span>
          <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white">
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
            <p className="mt-2.5 max-w-[52ch] text-[13px] sm:text-sm leading-relaxed text-white line-clamp-2 sm:line-clamp-3">
              {video.description}
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] text-white">
            <span className="">{video.channel}</span>
            <span className="h-1 w-1 rounded-full bg-white/25" />
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {video.duration}
            </span>
            <span className="text-[9px] font-medium uppercase tracking-[0.12em] opacity-45">
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

/* ─── Creator cards ─── */

/*
 * ELE-1658 — one card, four creators.
 *
 * Each creator used to have its own hand-written card on its own accent
 * colour: Craig gold, Ben emerald, A121 sky, The Engineering Mindset indigo.
 * Four near-identical blocks of JSX, and four different colours appearing
 * under the player depending on whose video you happened to open — which is
 * not a design, it is an accident. They now share this component and the one
 * gold accent the rest of the app uses.
 *
 * Content is data, not markup, so adding a fifth creator is a table entry.
 */

type CreatorBlock = {
  icon: LucideIcon;
  title: string;
  body: string;
  cta?: { label: string; href: string; primary?: boolean };
};

type Creator = {
  name: string;
  strap: string;
  icon: LucideIcon;
  bio: string;
  /** Optional caveat shown between the bio and the blocks. */
  note?: string;
  blocks: CreatorBlock[];
};

/** Keyed by `CuratedVideo.channel` — the value the player matches on. */
const CREATORS: Record<string, Creator> = {
  'Craig Wiltshire': {
    name: 'Craig Wiltshire',
    strap: 'NVQ assessor & electrical trainer',
    icon: Award,
    bio: "Craig is an experienced NVQ assessor and electrical training specialist who's helped hundreds of apprentices achieve their electrotechnical qualifications through his straightforward, no-nonsense teaching style.",
    blocks: [
      {
        icon: BookOpen,
        title: "Craig's book",
        body: 'Electrotechnical NVQ — The Ultimate Guide. Everything you need to pass your Electrotechnical NVQ: practical tips, assessment guidance and insider knowledge.',
        cta: {
          label: 'Get the book on Amazon',
          href: 'https://www.amazon.co.uk/Electrotechnical-NVQ-ultimate-guide-busting/dp/B0DWLDSTF4/',
          primary: true,
        },
      },
      {
        icon: Video,
        title: 'YouTube channel',
        body: 'Follow Craig for more free training content, NVQ tips and assessment guidance.',
        cta: {
          label: "Visit Craig's channel",
          href: 'https://www.youtube.com/@craigwiltshire9628',
        },
      },
    ],
  },

  'Toolbox Talk For Electricians': {
    name: 'Ben Poulter',
    strap: 'Toolbox Talk For Electricians',
    icon: Mic,
    bio: 'Ben has worked in the electrical trade since he was 19, with experience around the world. His podcast covers the side of the job the training courses skip — setting up and running an electrical business, pricing work properly, winning customers and keeping them.',
    blocks: [
      {
        icon: Briefcase,
        title: 'The business side',
        body: "Pricing and quoting, going self-employed, getting paid on time, and getting found by local customers — whether you're employed, self-employed or still an apprentice.",
      },
      {
        icon: Video,
        title: 'The podcast',
        body: 'Ben publishes new episodes for UK electricians regularly. Follow the channel for the full back catalogue.',
        cta: { label: "Visit Ben's channel", href: 'https://www.youtube.com/@toolboxtalking' },
      },
    ],
  },

  'A121 Training': {
    name: 'Apprentice 121',
    strap: 'A121 Training',
    icon: GraduationCap,
    bio: 'A121 Training is a resource for people working in or training towards the electrical industry, mixing podcast conversations with workplace demonstrations and teaching from their own training centre.',
    blocks: [
      {
        icon: BookOpen,
        title: 'What they cover',
        body: 'Circuit design (2396), inspection and testing (2391), AM2 preparation, solar PV and battery installation, and the routes into the trade.',
      },
      {
        icon: Video,
        title: 'The channel',
        body: 'Follow A121 Training for the full back catalogue of podcasts and demonstrations.',
        cta: { label: 'Visit A121 Training', href: 'https://www.youtube.com/@A121-Training' },
      },
    ],
  },

  'The Engineering Mindset': {
    name: 'The Engineering Mindset',
    strap: 'Paul Evans — electrical engineering educator',
    icon: Zap,
    bio: 'Paul Evans breaks down complex electrical engineering concepts with clear animations and explanations. His channel has helped millions of students and apprentices understand the theory behind electrical systems.',
    note: 'Some videos use US voltage examples (120V / 240V) — the principles are identical. UK mains is 230V single phase, 400V three phase.',
    blocks: [
      {
        icon: Video,
        title: 'The channel',
        body: 'Animated explanations of the theory, from the basics up to three-phase systems and power distribution.',
        cta: {
          label: 'Visit The Engineering Mindset',
          href: 'https://www.youtube.com/@TheEngineeringMindset',
        },
      },
    ],
  },
};

function CreatorCard({ creator }: { creator: Creator }) {
  const HeadIcon = creator.icon;

  return (
    <div className={cn('overflow-hidden rounded-2xl border border-elec-yellow/20', CARD_SURFACE)}>
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3.5">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-elec-yellow/35 bg-white/[0.06]">
          <HeadIcon className="h-5 w-5 text-elec-yellow" />
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-semibold text-white">{creator.name}</h3>
          <p className="truncate text-[12px] text-white">{creator.strap}</p>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <p className="text-[13px] leading-relaxed text-white opacity-85">{creator.bio}</p>

        {creator.note && (
          <div className="flex gap-2 rounded-xl border border-elec-yellow/35 bg-white/[0.05] p-3">
            <Zap className="mt-0.5 h-4 w-4 flex-shrink-0 text-elec-yellow" />
            <p className="text-[12px] leading-relaxed text-white">{creator.note}</p>
          </div>
        )}

        <div
          className={`grid grid-cols-1 gap-3 ${creator.blocks.length > 1 ? 'sm:grid-cols-2' : ''}`}
        >
          {creator.blocks.map((block) => {
            const BlockIcon = block.icon;
            return (
              <div
                key={block.title}
                className="flex flex-col gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] p-3"
              >
                <div className="flex items-center gap-2">
                  <BlockIcon className="h-4 w-4 flex-shrink-0 text-elec-yellow" />
                  <h4 className="text-[13px] font-semibold text-white">{block.title}</h4>
                </div>
                <p className="flex-1 text-[12px] leading-relaxed text-white">{block.body}</p>
                {block.cta && (
                  <a
                    href={block.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-11 w-full items-center gap-2 rounded-xl px-4 text-sm font-semibold transition-transform touch-manipulation active:scale-[0.98] ${
                      block.cta.primary
                        ? 'bg-elec-yellow text-black'
                        : 'border border-white/[0.12] bg-white/[0.08] text-white'
                    }`}
                  >
                    {block.cta.label}
                    <ExternalLink className="ml-auto h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            );
          })}
        </div>
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
        <p className="mt-1 text-[11px] text-white">{video.channel}</p>
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

/* ─── Path detail — ordered steps with progress ─── */

function PathDetail({
  path,
  watchedSet,
  getProgressPct,
  onPlay,
}: {
  path: LearningPath;
  watchedSet: Set<string>;
  getProgressPct: (id: string) => number | undefined;
  onPlay: (video: CuratedVideo) => void;
}) {
  const videos = getPathVideos(path);
  const done = videos.filter((v) => watchedSet.has(v.id)).length;
  const pct = videos.length ? Math.round((done / videos.length) * 100) : 0;
  const next = videos.find((v) => !watchedSet.has(v.id)) ?? videos[0];
  const totalMinutes = videos.reduce((acc, v) => acc + durationToMinutes(v.duration), 0);

  return (
    <div className="mx-auto max-w-3xl xl:max-w-6xl">
      <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-5 mb-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
          Learning path
        </p>
        <h2 className="mt-1 text-[20px] font-semibold tracking-tight text-white">{path.title}</h2>
        <p className="mt-1 text-[13px] text-white">{path.strap}</p>
        <div className="mt-4 h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
          <div
            className="h-full rounded-full bg-elec-yellow transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-[12px] tabular-nums text-white">
            {done}/{videos.length} watched · about {totalMinutes} min total
          </p>
          {next && pct < 100 && (
            <button
              onClick={() => onPlay(next)}
              className="inline-flex items-center gap-1.5 h-11 px-4 rounded-full bg-elec-yellow text-[13px] font-semibold text-black touch-manipulation active:scale-[0.98]"
            >
              <Play className="h-3.5 w-3.5 fill-black" />
              {done === 0 ? 'Start' : 'Continue'}
            </button>
          )}
          {pct === 100 && (
            <span className="flex items-center gap-1 text-[13px] font-semibold text-elec-yellow">
              <Check className="h-4 w-4" strokeWidth={3} /> Complete
            </span>
          )}
        </div>
      </div>

      {/* Two columns from xl: a single ribbon of rows wastes half the screen
          on desktop once a path runs to 11 or 12 videos. */}
      <div className="space-y-2 xl:grid xl:grid-cols-2 xl:gap-x-4 xl:gap-y-2 xl:space-y-0">
        {videos.map((video, i) => {
          const watched = watchedSet.has(video.id);
          const prog = getProgressPct(video.id);
          const inProgress = !watched && prog != null && prog > 0;
          return (
            <button
              key={video.id}
              onClick={() => onPlay(video)}
              className="w-full flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] p-3 text-left touch-manipulation active:bg-white/[0.06] transition-colors"
            >
              <span
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-[13px] font-bold tabular-nums ${
                  watched
                    ? 'bg-elec-yellow text-black'
                    : 'bg-white/[0.07] text-white border border-white/[0.1]'
                }`}
              >
                {watched ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[13.5px] font-medium text-white leading-snug line-clamp-2">
                  {video.title}
                </span>
                <span className="mt-0.5 block text-[11.5px] text-white">
                  {video.channel} · {video.duration}
                  {inProgress ? ` · ${prog}% watched` : ''}
                </span>
              </span>
              <Play className="h-4 w-4 flex-shrink-0 text-white" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
