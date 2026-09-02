/**
 * LearningVideosSection — three curated videos on the Apprentice Hub.
 *
 * Rebuilt on the shared card language so a video tile is the same object as
 * every other card on the page. What changed:
 *
 *   THE SURFACE. `bg-white/[0.02]` over a `border-white/[0.06]` hairline — a
 *   fill two points off the page and a border almost invisible against it. It
 *   read as three floating thumbnails rather than three cards, which is why
 *   this block looked like it belonged to a different app.
 *
 *   THE GREYS. `text-white` on the level label and the empty state.
 *
 *   THREE BUTTONS PER CARD. The thumbnail, the bookmark and the caption were
 *   separate controls, with the caption nested inside the card's own hover
 *   region — two of them firing the same navigation. One card button now, with
 *   the bookmark as the single genuinely separate action, lifted to 44px: it
 *   was a 28px target sat over the thumbnail.
 *
 *   THE FOOTER LINK. A full-width bordered bar competing with the cards above
 *   it. It is a text action now.
 *
 * Duration and level are the two things worth knowing before you commit ten
 * minutes, so they stay — level as plain white rather than a grey eyebrow.
 */

import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { curatedVideos } from '@/data/apprentice/curatedVideos';
import type { CuratedVideo } from '@/data/apprentice/curatedVideos';
import { useVideoBookmarks } from '@/hooks/learning-videos/useVideoBookmarks';
import { useAuth } from '@/contexts/AuthContext';
import { CARD_BASE, CARD_NEUTRAL, CARD_SURFACE } from '@/components/ui/card-recipe';

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    // `ease` must be a literal, not a widened string, or framer-motion's
    // Variants type rejects the whole object (it was `'easeOut'` inferred as
    // string, which is where this file's two tsc errors came from).
    transition: { duration: 0.2, ease: 'easeOut' as const },
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

  if (previewVideos.length === 0) {
    return (
      <motion.div variants={itemVariants}>
        <div
          className={cn(
            'space-y-1.5 rounded-2xl border border-elec-yellow/35 p-6 text-center',
            CARD_SURFACE
          )}
        >
          <h3 className="text-[14px] font-semibold text-white">Videos coming soon</h3>
          <p className="text-[12px] text-white">
            Curated electrical training videos from approved UK creators
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div variants={itemVariants} className="space-y-3">
      {/* Two-up on phones like every other card grid in the app — this was a
          horizontal scroll strip of fixed 220px tiles, which hides the third
          video behind a gesture nobody knows is there. */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] sm:gap-3">
        {previewVideos.map((video) => (
          <HubVideoCard
            key={video.id}
            video={video}
            isBookmarked={isBookmarked(video.id)}
            onTap={() => handleVideoTap(video)}
            onBookmarkToggle={() => toggleBookmark(video.id, video.title, video.category)}
          />
        ))}
      </div>

      {curatedVideos.length > 3 && (
        <Link
          to="/apprentice/learning-videos"
          className="flex h-11 items-center text-[12.5px] font-semibold text-elec-yellow touch-manipulation"
        >
          View all {curatedVideos.length} videos →
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
    <div className="relative">
      <button
        type="button"
        onClick={onTap}
        className={cn(CARD_BASE, CARD_NEUTRAL, 'relative overflow-hidden p-0 lg:hover:-translate-y-0.5')}
      >
        <span className="relative block aspect-video w-full overflow-hidden">
          <img
            src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/55 backdrop-blur-sm transition-transform group-hover:scale-105">
              <span className="ml-0.5 h-0 w-0 border-b-[5px] border-l-[9px] border-t-[5px] border-b-transparent border-l-white border-t-transparent" />
            </span>
          </span>

          <span className="absolute bottom-1.5 right-1.5 flex items-center gap-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] tabular-nums text-white backdrop-blur-sm">
            <Clock className="h-2.5 w-2.5" />
            {video.duration}
          </span>
        </span>

        <span className="block px-3 py-2.5">
          <span className="line-clamp-2 text-[13px] font-semibold leading-tight text-white transition-colors group-hover:text-elec-yellow">
            {video.title}
          </span>
          <span className="mt-1 block text-[11px] capitalize text-white">{video.level}</span>
        </span>
      </button>

      {/* The one genuinely separate action, at a real 44px target. Outside the
          card button so it is not a nested control. */}
      <button
        type="button"
        onClick={onBookmarkToggle}
        aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this video'}
        aria-pressed={isBookmarked}
        className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center touch-manipulation"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
          <Bookmark
            className={cn('h-3.5 w-3.5', isBookmarked ? 'fill-elec-yellow text-elec-yellow' : 'text-white')}
          />
        </span>
      </button>
    </div>
  );
}
