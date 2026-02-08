/**
 * VideoGrid
 *
 * Responsive vertical grid for the full videos page.
 * 1 col on small mobile, 2 cols on mobile, 3 cols on desktop.
 */

import { VideoCard } from './VideoCard';
import type { CuratedVideo } from '@/data/apprentice/curatedVideos';
import { Video } from 'lucide-react';

interface VideoGridProps {
  videos: CuratedVideo[];
  isBookmarked: (videoId: string) => boolean;
  onVideoTap: (video: CuratedVideo) => void;
  onBookmarkToggle: (video: CuratedVideo) => void;
}

export function VideoGrid({ videos, isBookmarked, onVideoTap, onBookmarkToggle }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="p-4 rounded-full bg-white/[0.05] mb-3">
          <Video className="h-8 w-8 text-white/30" />
        </div>
        <p className="text-sm text-white/40 mb-1">No videos found</p>
        <p className="text-xs text-white/25">Try a different search or category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {videos.map(video => (
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
