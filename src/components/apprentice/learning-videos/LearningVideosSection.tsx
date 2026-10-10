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
import { Bookmark, ChevronRight, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { curatedVideos } from '@/data/apprentice/curatedVideos';
import type { CuratedVideo } from '@/data/apprentice/curatedVideos';
import { useVideoBookmarks } from '@/hooks/learning-videos/useVideoBookmarks';
import { useAuth } from '@/contexts/AuthContext';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { HOME_SURFACE } from '@/components/apprentice/ApprenticeHomeUi';

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
            'space-y-1.5 rounded-2xl border border-white/[0.14] p-6 text-center',
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
      {/* A phone gets rows (thumbnail beside the title, nothing cut short);
          from sm: three equal cards. */}
      <div className="-mx-4 grid gap-0 sm:mx-0 sm:grid-cols-3 sm:gap-3">
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
          className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-white/[0.14] px-4 text-[13.5px] font-semibold text-white touch-manipulation transition-colors hover:border-white/[0.3]"
        >
          All {curatedVideos.length} videos
          <ChevronRight className="h-4 w-4" aria-hidden />
        </Link>
      )}
    </motion.div>
  );
}

/* Hub video card: a row on a phone, a card from sm: */
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
    <div
      className={cn(
        'relative min-w-0 border-b border-white/[0.07] first:border-t sm:rounded-2xl sm:border sm:first:border-t-[1px]',
        HOME_SURFACE,
        'max-sm:rounded-none max-sm:shadow-none'
      )}
    >
      <button
        type="button"
        onClick={onTap}
        className="group flex w-full min-w-0 items-center gap-3.5 p-3 pr-14 text-left touch-manipulation sm:block sm:p-0 sm:pr-0"
      >
        <span className="relative block aspect-video w-[132px] shrink-0 overflow-hidden rounded-xl bg-black sm:w-full sm:rounded-none sm:rounded-t-2xl">
          <img
            src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
            alt=""
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 ring-1 ring-white/25 backdrop-blur-sm sm:h-11 sm:w-11">
              <Play className="ml-0.5 h-4 w-4 fill-white text-white" aria-hidden />
            </span>
          </span>
          <span className="absolute bottom-1.5 right-1.5 rounded-md bg-black/75 px-1.5 py-0.5 text-[12px] font-medium tabular-nums text-white">
            {video.duration}
          </span>
        </span>

        <span className="block min-w-0 flex-1 sm:px-4 sm:pb-4 sm:pt-3.5">
          <span className="line-clamp-3 text-[14px] font-semibold leading-snug text-white sm:line-clamp-2 sm:text-[15px]">
            {video.title}
          </span>
          <span className="mt-1 block text-[12.5px] capitalize text-white">
            {video.level}
          </span>
        </span>
      </button>

      {/* The one separate action, a real 44px target: beside the row on a
          phone, over the thumbnail corner on a card. */}
      <button
        type="button"
        onClick={onBookmarkToggle}
        aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this video'}
        aria-pressed={isBookmarked}
        className="absolute right-1.5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center touch-manipulation sm:right-1 sm:top-1 sm:translate-y-0"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.14] bg-black/55 backdrop-blur-sm">
          <Bookmark
            className={cn(
              'h-3.5 w-3.5',
              isBookmarked ? 'fill-elec-yellow text-elec-yellow' : 'text-white'
            )}
            aria-hidden
          />
        </span>
      </button>
    </div>
  );
}
