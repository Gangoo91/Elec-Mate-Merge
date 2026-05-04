/**
 * LearningVideosSection
 *
 * Compact widget for the ApprenticeHub - shows 3 videos in horizontal scroll
 * on mobile, 3-col grid on desktop, + "View All Videos" link.
 * Tapping a video navigates to the full LearningVideos page with ?play=VIDEO_ID.
 */

import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Bookmark, Clock } from 'lucide-react';
import { curatedVideos } from '@/data/apprentice/curatedVideos';
import type { CuratedVideo } from '@/data/apprentice/curatedVideos';
import { useVideoBookmarks } from '@/hooks/learning-videos/useVideoBookmarks';
import { useAuth } from '@/contexts/AuthContext';

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
  const { profile } = useAuth();

  const previewVideos = (() => {
    const level = profile?.apprentice_level;
    if (level === 'level2') {
      const theoryVideos = curatedVideos.filter(
        (v) =>
          v.channel === 'The Engineering Mindset' &&
          v.category === 'electrical-theory' &&
          v.level === 'beginner'
      );
      return theoryVideos.slice(0, 3);
    }
    const craigVideos = curatedVideos.filter((v) => v.channel === 'Craig Wiltshire');
    return craigVideos.slice(0, 3);
  })();

  const handleVideoTap = (video: CuratedVideo) => {
    navigate(`/apprentice/learning-videos?play=${video.id}`);
  };

  const handleBookmarkToggle = (video: CuratedVideo) => {
    toggleBookmark(video.id, video.title, video.category);
  };

  if (previewVideos.length === 0) {
    return (
      <motion.div variants={itemVariants}>
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 text-center space-y-2">
          <h3 className="text-[14px] font-semibold text-white">Videos coming soon</h3>
          <p className="text-[12px] text-white/55">
            Curated electrical training videos from approved UK creators
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div variants={itemVariants} className="space-y-3">
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide sm:grid sm:grid-cols-3 sm:overflow-x-visible">
        {previewVideos.map((video) => (
          <HubVideoCard
            key={video.id}
            video={video}
            isBookmarked={isBookmarked(video.id)}
            onTap={() => handleVideoTap(video)}
            onBookmarkToggle={() => handleBookmarkToggle(video)}
          />
        ))}
      </div>

      {curatedVideos.length > 3 && (
        <Link
          to="/apprentice/learning-videos"
          className="flex items-center justify-center gap-2 h-11 text-[13px] text-white font-medium touch-manipulation active:opacity-70 rounded-xl border border-white/[0.06] bg-white/[0.02]"
        >
          View all {curatedVideos.length} videos
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
  return (
    <div className="flex-shrink-0 w-[220px] sm:w-auto group relative rounded-xl overflow-hidden bg-white/[0.02] border border-white/[0.06] active:bg-white/[0.05] transition-colors">
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
          <div className="h-9 w-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <div className="w-0 h-0 border-l-[8px] border-l-white border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent ml-0.5" />
          </div>
        </div>

        <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/70 text-[10px] text-white font-mono backdrop-blur-sm flex items-center gap-1">
          <Clock className="h-2.5 w-2.5" />
          {video.duration}
        </span>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onBookmarkToggle();
        }}
        className="absolute top-1.5 right-1.5 h-7 w-7 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm touch-manipulation active:bg-black/60 z-10"
      >
        <Bookmark
          className={`h-3 w-3 ${isBookmarked ? 'text-elec-yellow fill-elec-yellow' : 'text-white'}`}
        />
      </button>

      <button onClick={onTap} className="text-left touch-manipulation w-full px-2.5 py-2 pb-2.5 space-y-1">
        <h4 className="text-[12px] font-medium text-white leading-tight line-clamp-2">
          {video.title}
        </h4>
        <span className="text-[10px] uppercase tracking-[0.18em] text-white/55">
          {video.level}
        </span>
      </button>
    </div>
  );
}
