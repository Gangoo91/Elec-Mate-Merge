/**
 * VideoCard
 *
 * Polished video thumbnail card with:
 * - YouTube thumbnail with always-visible play overlay
 * - Duration badge bottom-right
 * - Bookmark icon top-right
 * - Title, channel, level below
 * - Compact variant for hub preview
 */

import { Bookmark, Clock, Play } from 'lucide-react';
import type { CuratedVideo } from '@/data/apprentice/curatedVideos';

interface VideoCardProps {
  video: CuratedVideo;
  isBookmarked: boolean;
  onTap: () => void;
  onBookmarkToggle: () => void;
  /** Compact mode for hub preview (smaller, no description) */
  compact?: boolean;
}

export function VideoCard({ video, isBookmarked, onTap, onBookmarkToggle, compact }: VideoCardProps) {
  const levelColour = video.level === 'beginner'
    ? 'text-green-400'
    : video.level === 'intermediate'
      ? 'text-amber-400'
      : 'text-red-400';

  const levelDot = video.level === 'beginner'
    ? 'bg-green-400'
    : video.level === 'intermediate'
      ? 'bg-amber-400'
      : 'bg-red-400';

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden bg-white/[0.04] border border-white/[0.06] transition-colors active:bg-white/[0.08] ${
        compact ? 'flex-shrink-0 w-[240px] sm:w-auto' : ''
      }`}
    >
      {/* Thumbnail area */}
      <button
        onClick={onTap}
        className="relative w-full aspect-video bg-black/50 touch-manipulation overflow-hidden"
      >
        <img
          src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-active:scale-105"
          loading="lazy"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Centred play button - always visible */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-12 w-12 rounded-full bg-elec-yellow/90 flex items-center justify-center shadow-lg shadow-black/30 transition-transform duration-200 group-active:scale-90">
            <Play className="h-5 w-5 text-black fill-black ml-0.5" />
          </div>
        </div>

        {/* Duration badge - bottom right */}
        <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/75 text-white text-[11px] font-medium backdrop-blur-sm">
          <Clock className="h-3 w-3" />
          {video.duration}
        </div>
      </button>

      {/* Bookmark button - top right of thumbnail */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onBookmarkToggle();
        }}
        className="absolute top-2 right-2 h-9 w-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm touch-manipulation active:bg-black/70 z-10"
        aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark video'}
      >
        <Bookmark
          className={`h-4 w-4 ${
            isBookmarked
              ? 'text-elec-yellow fill-elec-yellow'
              : 'text-white/70'
          }`}
        />
      </button>

      {/* Info section */}
      <button
        onClick={onTap}
        className="text-left touch-manipulation w-full p-3"
      >
        <h4 className={`font-medium text-white leading-snug line-clamp-2 ${compact ? 'text-[13px]' : 'text-sm'}`}>
          {video.title}
        </h4>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[11px] text-white/45">{video.channel}</span>
          <span className="text-white/20">·</span>
          <span className={`flex items-center gap-1 text-[11px] ${levelColour}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${levelDot}`} />
            {video.level.charAt(0).toUpperCase() + video.level.slice(1)}
          </span>
        </div>
      </button>
    </div>
  );
}
