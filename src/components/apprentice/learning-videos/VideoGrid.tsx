/**
 * VideoGrid
 *
 * Responsive vertical grid for the full videos page.
 * 1 col on small mobile, 2 cols on mobile, 3 cols on desktop.
 */

import { VideoCard } from './VideoCard';
import type { CuratedVideo } from '@/data/apprentice/curatedVideos';

interface VideoGridProps {
  videos: CuratedVideo[];
  isBookmarked: (videoId: string) => boolean;
  onVideoTap: (video: CuratedVideo) => void;
  onBookmarkToggle: (video: CuratedVideo) => void;
}

export function VideoGrid({ videos, isBookmarked, onVideoTap, onBookmarkToggle }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center space-y-2">
        <p className="text-[14px] text-white/85">No videos found</p>
        <p className="text-[12px] text-white/55">Try a different search or category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          isBookmarked={isBookmarked(video.id)}
          onTap={() => onVideoTap(video)}
          onBookmarkToggle={() => onBookmarkToggle(video)}
        />
      ))}
    </div>
  );
}
