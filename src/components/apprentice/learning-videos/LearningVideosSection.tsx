/**
 * LearningVideosSection
 *
 * Compact widget for the ApprenticeHub - shows 3 videos in horizontal scroll
 * on mobile, 3-col grid on desktop, + "View All Videos" link.
 * Tapping a video navigates to the full LearningVideos page with ?play=VIDEO_ID.
 */

import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Video, Bookmark, Clock } from 'lucide-react';
import {
  curatedVideos,
} from '@/data/apprentice/curatedVideos';
import type { CuratedVideo } from '@/data/apprentice/curatedVideos';
import { useVideoBookmarks } from '@/hooks/learning-videos/useVideoBookmarks';

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
};

export function LearningVideosSection() {
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useVideoBookmarks();

  // Show first 3 videos on the hub
  const previewVideos = curatedVideos.slice(0, 3);

  const handleVideoTap = (video: CuratedVideo) => {
    navigate(`/apprentice/learning-videos?play=${video.id}`);
  };

  const handleBookmarkToggle = (video: CuratedVideo) => {
    toggleBookmark(video.id, video.title, video.category);
  };

  // Empty / coming soon state
  if (previewVideos.length === 0) {
    return (
      <motion.div variants={itemVariants}>
        <div className="glass-premium rounded-xl p-6 text-center">
          <div className="inline-flex p-3 rounded-full bg-elec-yellow/10 mb-3">
            <Video className="h-6 w-6 text-elec-yellow" />
          </div>
          <h3 className="text-sm font-semibold text-white mb-1">Videos Coming Soon</h3>
          <p className="text-xs text-white/50">
            Curated electrical training videos from approved UK creators
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div variants={itemVariants} className="space-y-3">
      {/* 3 preview video cards */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide sm:grid sm:grid-cols-3 sm:overflow-x-visible">
        {previewVideos.map(video => (
          <HubVideoCard
            key={video.id}
            video={video}
            isBookmarked={isBookmarked(video.id)}
            onTap={() => handleVideoTap(video)}
            onBookmarkToggle={() => handleBookmarkToggle(video)}
          />
        ))}
      </div>

      {/* View All link */}
      {curatedVideos.length > 3 && (
        <Link
          to="/apprentice/learning-videos"
          className="flex items-center justify-center gap-2 h-11 text-sm text-elec-yellow font-medium touch-manipulation active:opacity-70 rounded-xl bg-elec-yellow/[0.06] border border-elec-yellow/10"
        >
          View All {curatedVideos.length} Videos
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </motion.div>
  );
}

/* Hub-specific compact video card */
function HubVideoCard({
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
    <div className="flex-shrink-0 w-[220px] sm:w-auto group relative rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.05] active:bg-white/[0.06] transition-colors">
      {/* Thumbnail */}
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

        {/* Play icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-90">
          <div className="h-9 w-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent ml-0.5" />
          </div>
        </div>

        {/* Duration */}
        <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/70 text-[10px] text-white font-medium backdrop-blur-sm flex items-center gap-1">
          <Clock className="h-2.5 w-2.5" />
          {video.duration}
        </span>
      </button>

      {/* Bookmark */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onBookmarkToggle();
        }}
        className="absolute top-1.5 right-1.5 h-7 w-7 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm touch-manipulation active:bg-black/60 z-10"
      >
        <Bookmark
          className={`h-3 w-3 ${
            isBookmarked ? 'text-elec-yellow fill-elec-yellow' : 'text-white'
          }`}
        />
      </button>

      {/* Info */}
      <button onClick={onTap} className="text-left touch-manipulation w-full px-2.5 py-2 pb-2.5">
        <h4 className="text-[12px] font-medium text-white leading-tight line-clamp-2">
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
