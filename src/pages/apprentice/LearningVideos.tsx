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
  Mic,
  Briefcase,
  GraduationCap,
} from 'lucide-react';
import {
  curatedVideos,
  getAvailableCategories,
  categoryLabels,
  learningPaths,
  getPathVideos,
} from '@/data/apprentice/curatedVideos';
import type { CuratedVideo, VideoCategory, LearningPath } from '@/data/apprentice/curatedVideos';
import { useVideoBookmarks } from '@/hooks/learning-videos/useVideoBookmarks';
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
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizRecord, setQuizRecord] = useState<{ best: number; total: number } | null>(null);

  const { bookmarks, isBookmarked, toggleBookmark, trackVideoWatched, getWatchedIds } =
    useVideoBookmarks();
  const { logActivity } = useLearningXP();
  const { toast } = useToast();
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

        // Did this watch complete a learning path? Bonus XP, once per path
        // (localStorage guards re-awards; the watch itself logged its own
        // minutes, so the bonus carries none).
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
      }
    },
    [trackVideoWatched, logActivity, getWatchedIds, toast]
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
        void awardWatch(video);
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
    <div className="min-h-screen bg-[hsl(240,5.9%,10%)]">
      {/* ═══ STICKY HEADER ═══ */}
      <header className="sticky top-0 z-20 bg-[hsl(240,5.9%,10%)]/95 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="mx-auto max-w-[1600px] px-4 lg:px-8">
          {/* Title row */}
          <div className="flex items-center gap-2 sm:gap-3 h-14">
            <button
              onClick={
                isPlayerMode
                  ? handleClosePlayer
                  : activePath
                    ? () => setActivePath(null)
                    : () => navigate(backTo)
              }
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
                  <span className="hidden sm:inline text-[10px] font-medium uppercase tracking-[0.18em] text-white/70">
                    Learning
                  </span>
                  <span className="hidden sm:inline h-3 w-px bg-white/10" aria-hidden />
                  <h1 className="text-[15px] sm:text-base font-semibold tracking-tight text-white truncate">
                    {activePath ? activePath.title : 'Video Library'}
                  </h1>
                </div>
              )}
            </div>

            {/* Action buttons -- only show in grid mode */}
            {!isPlayerMode && !activePath && (
              <div className="hidden lg:flex flex-shrink-0 items-center gap-1 rounded-full bg-white/[0.04] p-1 mr-1">
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
                    className={`px-3 h-7 text-[12px] rounded-full font-medium touch-manipulation transition-all whitespace-nowrap ${
                      levelFilter === opt.v
                        ? 'bg-white text-black'
                        : 'text-white hover:bg-white/[0.08]'
                    }`}
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
                    className={`lg:hidden w-[88px] flex-shrink-0 h-9 rounded-full border px-2.5 text-[12px] font-medium touch-manipulation [color-scheme:dark] focus:outline-none ${
                      levelFilter === 'all'
                        ? 'bg-white/[0.06] border-white/[0.1] text-white'
                        : 'bg-white text-black border-white'
                    }`}
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
                      setSavedOnly((v) => !v);
                      setActivePath(null);
                      setSearchQuery('');
                    }}
                    aria-pressed={savedOnly}
                    className={`h-11 flex items-center gap-1.5 px-3 rounded-xl border touch-manipulation transition-colors ${
                      savedOnly
                        ? 'bg-elec-yellow border-elec-yellow'
                        : 'bg-elec-yellow/10 border-elec-yellow/25 hover:bg-elec-yellow/15'
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
          </div>

          {/* Search bar - slides down when open (grid mode only) */}
          {!isPlayerMode && searchOpen && (
            <div className="pb-3">
              <div className="relative max-w-xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title, channel or topic…"
                  autoFocus
                  className="w-full h-11 pl-10 pr-10 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm placeholder:text-white/70 focus:outline-none focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20 touch-manipulation"
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
                    className={`flex-shrink-0 px-3.5 h-9 text-[13px] rounded-full font-medium touch-manipulation transition-all ${
                      activeCategory === 'all'
                        ? 'bg-elec-yellow text-black'
                        : 'bg-white/[0.06] text-white hover:bg-white/[0.1] active:bg-white/10'
                    }`}
                  >
                    All
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`flex-shrink-0 px-3.5 h-9 text-[13px] rounded-full font-medium touch-manipulation transition-all whitespace-nowrap ${
                        activeCategory === cat
                          ? 'bg-elec-yellow text-black'
                          : 'bg-white/[0.06] text-white hover:bg-white/[0.1] active:bg-white/10'
                      }`}
                    >
                      {categoryLabels[cat]}
                    </button>
                  ))}
                </div>
                <div
                  className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[hsl(240,5.9%,10%)] to-transparent"
                  aria-hidden
                />
              </div>
            </div>
          )}
        </div>
      </header>

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

              {/* Meta row */}
              <div className="mt-3 flex items-center flex-wrap gap-x-2.5 gap-y-2 text-[13px]">
                <span className="font-medium text-white/90">{selectedVideo.channel}</span>
                <span className="h-1 w-1 rounded-full bg-white/25" aria-hidden />
                <span className="flex items-center gap-1 text-white/70">
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
                    return <span className="text-[12px] text-white/70">{p.pct}% watched</span>;
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
                    <p className="text-[12px] text-white/70">
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
                {selectedVideo.channel === 'Toolbox Talk For Electricians' && (
                  <BenPoulterPromoCard />
                )}
                {selectedVideo.channel === 'A121 Training' && <A121PromoCard />}
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
                    <span className="text-[11px] text-white/70 tabular-nums">
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
                    <span className="text-[11px] text-white/70 tabular-nums">
                      {learningPaths.length} paths · watch in order
                    </span>
                  </div>
                  {/* Mobile: a snap-scrolling row with an edge fade so it reads as
                      scrollable. Desktop: a plain grid — with 10 paths a hidden
                      horizontal scrollbar left half of them unreachable. */}
                  <div className="relative">
                    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide snap-x lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible xl:grid-cols-4 2xl:grid-cols-5">
                      {learningPaths.map((path) => {
                        const vids = getPathVideos(path);
                        const done = vids.filter((v) => watchedSet.has(v.id)).length;
                        const pct = vids.length ? Math.round((done / vids.length) * 100) : 0;
                        return (
                          <button
                            key={path.id}
                            onClick={() => setActivePath(path)}
                            className="snap-start flex-shrink-0 w-[215px] sm:w-[260px] lg:w-auto text-left rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-4 touch-manipulation active:scale-[0.98] transition-transform"
                          >
                            <p className="text-[14px] font-semibold text-white leading-snug">
                              {path.title}
                            </p>
                            <p className="mt-1 text-[11.5px] leading-snug text-white/70 line-clamp-2">
                              {path.strap}
                            </p>
                            <div className="mt-3 h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                              <div
                                className="h-full rounded-full bg-elec-yellow transition-all"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <p className="mt-1.5 text-[11px] tabular-nums text-white/70">
                              {done}/{vids.length} watched{pct === 100 ? ' · complete ✓' : ''}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                    <div
                      className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[hsl(240,5.9%,10%)] to-transparent sm:w-16 lg:hidden"
                      aria-hidden
                    />
                  </div>
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
                        <span className="text-[11px] text-white/70 tabular-nums">
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
                      {savedOnly
                        ? 'Saved videos'
                        : activeCategory === 'all'
                          ? 'Results'
                          : categoryLabels[activeCategory]}
                    </span>
                    <span className="text-[11px] text-white/70 tabular-nums">
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
              <span className="block h-full bg-elec-yellow" style={{ width: `${progressPct}%` }} />
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
          <span className="flex-1 min-w-0 text-[11px] text-white/70 truncate">{video.channel}</span>
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
            <p className="mt-2.5 text-[13px] sm:text-sm leading-relaxed text-white/70 line-clamp-2 sm:line-clamp-3 max-w-[52ch]">
              {video.description}
            </p>
          )}
          <div className="mt-4 flex items-center flex-wrap gap-x-3 gap-y-2">
            <span className="text-[12px] text-white/70">{video.channel}</span>
            <span className="h-1 w-1 rounded-full bg-white/25" />
            <span className="flex items-center gap-1 text-[12px] text-white/70">
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

function A121PromoCard() {
  return (
    <div className="rounded-xl border border-sky-500/20 bg-gradient-to-br from-sky-500/[0.06] to-transparent overflow-hidden">
      <div className="px-4 pt-4 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-sky-500/20 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="h-5 w-5 text-sky-400" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-white">Apprentice 121</h3>
            <p className="text-[12px] text-white">A121 Training</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Bio taken from the channel's own description */}
        <p className="text-[13px] text-white leading-relaxed">
          A121 Training is a resource for people working in or training towards the electrical
          industry, mixing podcast conversations with workplace demonstrations and teaching from
          their own training centre.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-sky-400 flex-shrink-0" />
              <h4 className="text-[13px] font-semibold text-white">What They Cover</h4>
            </div>
            <p className="text-[12px] text-white leading-relaxed">
              Circuit design (2396), inspection and testing (2391), AM2 preparation, solar PV and
              battery installation, and the routes into the trade.
            </p>
          </div>

          <div className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-3 space-y-2 flex flex-col">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-sky-400 flex-shrink-0" />
              <h4 className="text-[13px] font-semibold text-white">The Channel</h4>
            </div>
            <p className="text-[12px] text-white leading-relaxed flex-1">
              Follow A121 Training for the full back catalogue of podcasts and demonstrations.
            </p>
            <a
              href="https://www.youtube.com/@A121-Training"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 h-12 w-full px-4 rounded-xl bg-white/[0.08] border border-white/[0.1] text-white font-medium text-sm touch-manipulation active:scale-[0.98] transition-transform"
            >
              Visit A121 Training
              <ExternalLink className="h-3.5 w-3.5 ml-auto" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function BenPoulterPromoCard() {
  return (
    <div className="rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.06] to-transparent overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <Mic className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-[15px] font-semibold text-white">Ben Poulter</h3>
            <p className="text-[12px] text-white">Toolbox Talk For Electricians</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Bio — drawn from Ben's own channel description */}
        <p className="text-[13px] text-white leading-relaxed">
          Ben has worked in the electrical trade since he was 19, with experience around the world.
          His podcast covers the side of the job the training courses skip — setting up and running
          an electrical business, pricing work properly, winning customers and keeping them.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* What you'll learn */}
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <h4 className="text-[13px] font-semibold text-white">The Business Side</h4>
            </div>
            <p className="text-[12px] text-white leading-relaxed">
              Pricing and quoting, going self-employed, getting paid on time, and getting found by
              local customers — whether you're employed, self-employed or still an apprentice.
            </p>
          </div>

          {/* Channel */}
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-lg p-3 space-y-2 flex flex-col">
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-emerald-400 flex-shrink-0" />
              <h4 className="text-[13px] font-semibold text-white">The Podcast</h4>
            </div>
            <p className="text-[12px] text-white leading-relaxed flex-1">
              Ben publishes new episodes for UK electricians regularly. Follow the channel for the
              full back catalogue.
            </p>
            <a
              href="https://www.youtube.com/@toolboxtalking"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 h-12 w-full px-4 rounded-xl bg-white/[0.08] border border-white/[0.1] text-white font-medium text-sm touch-manipulation active:scale-[0.98] transition-transform"
            >
              Visit Ben's Channel
              <ExternalLink className="h-3.5 w-3.5 ml-auto" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

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
        <p className="text-[11px] text-white/70 mt-1">{video.channel}</p>
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
        <p className="mt-1 text-[13px] text-white/70">{path.strap}</p>
        <div className="mt-4 h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
          <div
            className="h-full rounded-full bg-elec-yellow transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-[12px] tabular-nums text-white/70">
            {done}/{videos.length} watched · about {totalMinutes} min total
          </p>
          {next && pct < 100 && (
            <button
              onClick={() => onPlay(next)}
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-elec-yellow text-[13px] font-semibold text-black touch-manipulation active:scale-[0.98]"
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
                    : 'bg-white/[0.07] text-white/70 border border-white/[0.1]'
                }`}
              >
                {watched ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block text-[13.5px] font-medium text-white leading-snug line-clamp-2">
                  {video.title}
                </span>
                <span className="mt-0.5 block text-[11.5px] text-white/70">
                  {video.channel} · {video.duration}
                  {inProgress ? ` · ${prog}% watched` : ''}
                </span>
              </span>
              <Play className="h-4 w-4 flex-shrink-0 text-white/70" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
