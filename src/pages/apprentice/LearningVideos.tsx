/**
 * LearningVideos
 *
 * Full-viewport app-like learning videos page at /apprentice/learning-videos.
 * Single window view with inline player that replaces the grid (YouTube mobile pattern).
 * When a video is selected, the grid fades out and the player + related videos appear.
 * No bottom sheet -- instant, immersive playback.
 */

import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Search, X, Bookmark, Video, Clock, ExternalLink, BookOpen, Award, Zap } from 'lucide-react';
import {
  curatedVideos,
  getAvailableCategories,
  categoryLabels,
} from '@/data/apprentice/curatedVideos';
import type { CuratedVideo, VideoCategory } from '@/data/apprentice/curatedVideos';
import { useVideoBookmarks } from '@/hooks/learning-videos/useVideoBookmarks';

export default function LearningVideos() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<VideoCategory | 'all'>('all');
  const [selectedVideo, setSelectedVideo] = useState<CuratedVideo | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const { bookmarks, isBookmarked, toggleBookmark, trackVideoWatched } = useVideoBookmarks();
  const categories = getAvailableCategories();

  // Handle ?play=VIDEO_ID from hub navigation
  useEffect(() => {
    const playId = searchParams.get('play');
    if (playId && !selectedVideo) {
      const video = curatedVideos.find(v => v.id === playId);
      if (video) {
        setSelectedVideo(video);
        trackVideoWatched(video.id);
      }
      // Clean the URL param
      searchParams.delete('play');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams, selectedVideo, trackVideoWatched]);

  // Filter videos
  const filteredVideos = useMemo(() => {
    let videos = curatedVideos;

    if (activeCategory !== 'all') {
      videos = videos.filter(v => v.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      videos = videos.filter(v =>
        v.title.toLowerCase().includes(q) ||
        v.channel.toLowerCase().includes(q) ||
        v.tags.some(t => t.toLowerCase().includes(q)) ||
        categoryLabels[v.category].toLowerCase().includes(q)
      );
    }

    return videos;
  }, [activeCategory, searchQuery]);

  // Related videos for player
  const relatedVideos = useMemo(() => {
    if (!selectedVideo) return [];
    return curatedVideos
      .filter(v => v.category === selectedVideo.category && v.id !== selectedVideo.id)
      .slice(0, 8);
  }, [selectedVideo]);

  const handleVideoTap = (video: CuratedVideo) => {
    setSelectedVideo(video);
    trackVideoWatched(video.id);
  };

  const handleClosePlayer = () => {
    setSelectedVideo(null);
  };

  const handleBookmarkToggle = (video: CuratedVideo) => {
    toggleBookmark(video.id, video.title, video.category);
  };

  const savedCount = bookmarks.length;
  const isPlayerMode = !!selectedVideo;

  return (
    <div className="h-[100dvh] flex flex-col bg-[hsl(240,5.9%,10%)] overflow-hidden">
      {/* ═══ FIXED TOP BAR ═══ */}
      <div className="flex-shrink-0 bg-[hsl(240,5.9%,10%)]/95 backdrop-blur-xl border-b border-white/[0.06] z-20">
        {/* Title row */}
        <div className="flex items-center gap-3 px-4 h-14">
          <button
            onClick={isPlayerMode ? handleClosePlayer : () => navigate('/apprentice')}
            className="h-11 w-11 flex items-center justify-center rounded-xl active:bg-white/10 touch-manipulation -ml-1"
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </button>

          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold text-white truncate">
              {isPlayerMode ? selectedVideo.title : 'Learning Videos'}
            </h1>
          </div>

          {/* Action buttons -- only show in grid mode */}
          {!isPlayerMode && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`h-11 w-11 flex items-center justify-center rounded-xl touch-manipulation transition-colors ${
                  searchOpen ? 'bg-elec-yellow/15 text-elec-yellow' : 'active:bg-white/10 text-white'
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
                  className="h-11 flex items-center gap-1.5 px-3 rounded-xl active:bg-white/10 touch-manipulation"
                >
                  <Bookmark className="h-4 w-4 text-elec-yellow fill-elec-yellow" />
                  <span className="text-sm text-elec-yellow font-medium">{savedCount}</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Search bar - slides down when open (grid mode only) */}
        {!isPlayerMode && searchOpen && (
          <div className="px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search videos..."
                autoFocus
                className="w-full h-11 pl-10 pr-10 rounded-xl bg-white/[0.06] border border-white/[0.08] text-white text-sm placeholder:text-white focus:outline-none focus:border-elec-yellow/40 focus:ring-1 focus:ring-elec-yellow/20 touch-manipulation"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 flex items-center justify-center rounded-full active:bg-white/10 touch-manipulation"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Category tabs (grid mode only) */}
        {!isPlayerMode && (
          <div className="flex gap-1.5 overflow-x-auto px-4 pb-3 scrollbar-hide">
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex-shrink-0 px-4 h-9 text-[13px] rounded-full font-medium touch-manipulation transition-all ${
                activeCategory === 'all'
                  ? 'bg-elec-yellow text-black'
                  : 'bg-white/[0.06] text-white active:bg-white/10'
              }`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 h-9 text-[13px] rounded-full font-medium touch-manipulation transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-elec-yellow text-black'
                    : 'bg-white/[0.06] text-white active:bg-white/10'
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ═══ CONTENT AREA ═══ */}
      {isPlayerMode ? (
        /* ─── INLINE PLAYER VIEW ─── */
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div>
              {/* YouTube iframe -- immediately visible, full width, 16:9 */}
              <div className="relative w-full aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                  title={selectedVideo.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video info */}
              <div className="px-4 pt-4 pb-6 space-y-4 max-w-3xl mx-auto">
                {/* Title */}
                <h2 className="text-[15px] sm:text-base font-semibold text-white leading-snug">
                  {selectedVideo.title}
                </h2>

                {/* Metadata chips */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[13px] text-white">{selectedVideo.channel}</span>
                  <span className="text-white/30">|</span>
                  <span className="flex items-center gap-1 text-[13px] text-white">
                    <Clock className="h-3.5 w-3.5" />
                    {selectedVideo.duration}
                  </span>
                  <span className={`px-2 py-0.5 rounded-md border text-[11px] font-medium ${
                    selectedVideo.level === 'beginner'
                      ? 'text-green-400 bg-green-400/10 border-green-400/20'
                      : selectedVideo.level === 'intermediate'
                        ? 'text-amber-400 bg-amber-400/10 border-amber-400/20'
                        : 'text-red-400 bg-red-400/10 border-red-400/20'
                  }`}>
                    {selectedVideo.level.charAt(0).toUpperCase() + selectedVideo.level.slice(1)}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-elec-yellow/10 border border-elec-yellow/20 text-elec-yellow text-[11px] font-medium">
                    {categoryLabels[selectedVideo.category]}
                  </span>
                </div>

                {/* Action row */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBookmarkToggle(selectedVideo)}
                    className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border touch-manipulation active:scale-[0.98] transition-all ${
                      isBookmarked(selectedVideo.id)
                        ? 'bg-elec-yellow/15 border-elec-yellow/30 text-elec-yellow'
                        : 'bg-white/[0.05] border-white/[0.08] text-white'
                    }`}
                  >
                    <Bookmark
                      className={`h-4 w-4 ${isBookmarked(selectedVideo.id) ? 'fill-elec-yellow' : ''}`}
                    />
                    <span className="text-sm font-medium">
                      {isBookmarked(selectedVideo.id) ? 'Saved' : 'Save'}
                    </span>
                  </button>
                  <a
                    href={`https://www.youtube.com/watch?v=${selectedVideo.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white touch-manipulation active:scale-[0.98] transition-all"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span className="text-sm font-medium">Open in YouTube</span>
                  </a>
                </div>

                {/* Description */}
                {selectedVideo.description && (
                  <p className="text-[13px] text-white leading-relaxed">
                    {selectedVideo.description}
                  </p>
                )}

                {/* Tags */}
                {selectedVideo.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedVideo.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-white/[0.06] border border-white/[0.08] text-[11px] text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Creator promotion */}
                {selectedVideo.channel === 'Craig Wiltshire' && (
                  <CreatorPromoCard />
                )}
                {selectedVideo.channel === 'The Engineering Mindset' && (
                  <EngineeringMindsetPromoCard />
                )}

                {/* Related videos */}
                {relatedVideos.length > 0 && (
                  <div className="pt-4 border-t border-white/[0.06]">
                    <h4 className="text-sm font-semibold text-white mb-3">More like this</h4>
                    <div className="space-y-2">
                      {relatedVideos.map(rv => (
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
            <div className="px-3 py-3 sm:px-4">
              {(searchQuery.trim() || activeCategory !== 'all') && (
                <p className="text-xs text-white mb-3 px-1">
                  {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''}
                  {searchQuery.trim() && <> matching &quot;{searchQuery}&quot;</>}
                </p>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
                {filteredVideos.map(video => (
                  <VideoTile
                    key={video.id}
                    video={video}
                    isBookmarked={isBookmarked(video.id)}
                    onTap={() => handleVideoTap(video)}
                    onBookmarkToggle={() => handleBookmarkToggle(video)}
                  />
                ))}
              </div>
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
  onTap,
  onBookmarkToggle,
}: {
  video: CuratedVideo;
  isBookmarked: boolean;
  onTap: () => void;
  onBookmarkToggle: () => void;
}) {
  const levelDot = video.level === 'beginner'
    ? 'bg-green-400'
    : video.level === 'intermediate'
      ? 'bg-amber-400'
      : 'bg-red-400';

  return (
    <div className="group relative rounded-xl overflow-hidden bg-white/[0.03] active:bg-white/[0.06] transition-colors">
      <button
        onClick={onTap}
        className="relative w-full aspect-video touch-manipulation overflow-hidden"
      >
        <img
          src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-90">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <div className="w-0 h-0 border-l-[10px] border-l-white border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ml-1" />
          </div>
        </div>
        <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/70 text-[10px] text-white font-medium backdrop-blur-sm">
          {video.duration}
        </span>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onBookmarkToggle();
        }}
        className="absolute top-1.5 right-1.5 h-8 w-8 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm touch-manipulation active:bg-black/60 z-10"
      >
        <Bookmark
          className={`h-3.5 w-3.5 ${
            isBookmarked ? 'text-elec-yellow fill-elec-yellow' : 'text-white'
          }`}
        />
      </button>

      <button onClick={onTap} className="text-left touch-manipulation w-full px-2.5 py-2 pb-2.5">
        <h4 className="text-[12px] sm:text-[13px] font-medium text-white leading-tight line-clamp-2">
          {video.title}
        </h4>
        <div className="flex items-center gap-1.5 mt-1">
          <span className={`h-1.5 w-1.5 rounded-full ${levelDot} flex-shrink-0`} />
          <span className="text-[10px] text-white truncate">
            {video.level.charAt(0).toUpperCase() + video.level.slice(1)}
          </span>
        </div>
      </button>
    </div>
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
          Craig is an experienced NVQ assessor and electrical training specialist who's
          helped hundreds of apprentices achieve their electrotechnical qualifications
          through his straightforward, no-nonsense teaching style.
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
              Everything you need to pass your Electrotechnical NVQ — practical tips,
              assessment guidance, and insider knowledge.
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
          Paul Evans breaks down complex electrical engineering concepts with brilliant
          animations and clear explanations. His channel has helped millions of students
          and apprentices understand the theory behind electrical systems.
        </p>

        {/* US voltage note */}
        <div className="flex gap-2 rounded-lg bg-indigo-500/[0.08] border border-indigo-500/15 p-3">
          <Zap className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
          <p className="text-[12px] text-white leading-relaxed">
            Some videos use US voltage examples (120V/240V) — the principles are identical.
            UK mains is 230V single phase, 400V three phase.
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
    <div className="flex gap-3 items-start active:bg-white/[0.04] rounded-lg -mx-1 px-1 py-1 transition-colors">
      <button
        onClick={onTap}
        className="relative flex-shrink-0 w-[120px] aspect-video rounded-lg overflow-hidden bg-black/30 touch-manipulation"
      >
        <img
          src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/70 text-[9px] text-white font-medium">
          {video.duration}
        </span>
      </button>

      <button onClick={onTap} className="flex-1 text-left touch-manipulation min-w-0 pt-0.5">
        <h5 className="text-[12px] font-medium text-white leading-tight line-clamp-2">
          {video.title}
        </h5>
        <p className="text-[10px] text-white mt-1">{video.channel}</p>
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
