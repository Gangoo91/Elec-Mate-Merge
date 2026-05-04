/**
 * VideoPlayerSheet
 *
 * Bottom sheet video player -- kept for hub widget (LearningVideosSection) use only.
 * The full LearningVideos page now uses inline player instead.
 * Simplified: 85vh, iframe immediately visible, drag handle overlays video.
 */

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/ui/sheet';
import { Bookmark, Clock, ExternalLink, ChevronDown } from 'lucide-react';
import type { CuratedVideo } from '@/data/apprentice/curatedVideos';
import { categoryLabels } from '@/data/apprentice/curatedVideos';
import { YouTubePlayer } from './YouTubePlayer';
import { openExternalUrl } from '@/utils/open-external-url';

interface VideoPlayerSheetProps {
  video: CuratedVideo | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
  relatedVideos: CuratedVideo[];
  onVideoSelect: (video: CuratedVideo) => void;
  isVideoBookmarked: (videoId: string) => boolean;
  onToggleVideoBookmark: (video: CuratedVideo) => void;
}

export function VideoPlayerSheet({
  video,
  open,
  onOpenChange,
  isBookmarked,
  onBookmarkToggle,
  relatedVideos,
  onVideoSelect,
  isVideoBookmarked,
  onToggleVideoBookmark,
}: VideoPlayerSheetProps) {
  if (!video) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-[hsl(240,5.9%,10%)]">
          <SheetHeader className="flex-shrink-0 relative z-10">
            <div className="flex justify-center pt-2.5 pb-1">
              <div className="h-1 w-10 rounded-full bg-white/30" />
            </div>
            <SheetTitle className="sr-only">{video.title}</SheetTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-2 top-1.5 h-11 w-11 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm active:bg-black/50 touch-manipulation z-10"
            >
              <ChevronDown className="h-5 w-5 text-white" />
            </button>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto overscroll-contain -mt-8">
            <YouTubePlayer videoId={video.id} title={video.title} />

            <div className="px-4 pt-4 pb-6 space-y-4">
              <h3 className="text-[16px] font-semibold text-white leading-snug">
                {video.title}
              </h3>

              <div className="flex items-baseline gap-2 flex-wrap text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                <span className="normal-case tracking-normal text-[13px] text-white/85">
                  {video.channel}
                </span>
                <span className="text-white/25">·</span>
                <span className="flex items-center gap-1 normal-case tracking-normal text-[13px] text-white/85">
                  <Clock className="h-3.5 w-3.5" />
                  {video.duration}
                </span>
                <span className="text-white/25">·</span>
                <span>{video.level}</span>
                <span className="text-white/25">·</span>
                <span>{categoryLabels[video.category]}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={onBookmarkToggle}
                  className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border touch-manipulation active:scale-[0.98] transition-all ${
                    isBookmarked
                      ? 'bg-elec-yellow/[0.06] border-elec-yellow/30 text-elec-yellow'
                      : 'bg-white/[0.02] border-white/[0.06] text-white'
                  }`}
                >
                  <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-elec-yellow' : ''}`} />
                  <span className="text-[14px] font-medium">{isBookmarked ? 'Saved' : 'Save'}</span>
                </button>
                <button
                  onClick={() => openExternalUrl(`https://www.youtube.com/watch?v=${video.id}`)}
                  className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-white/[0.02] border border-white/[0.06] text-white touch-manipulation active:scale-[0.98] transition-all"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="text-[14px] font-medium">Open in YouTube</span>
                </button>
              </div>

              {video.description && (
                <p className="text-[14px] text-white/85 leading-relaxed">{video.description}</p>
              )}

              {relatedVideos.length > 0 && (
                <div className="pt-4 border-t border-white/[0.06] space-y-3">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    More like this
                  </span>
                  <div className="space-y-2">
                    {relatedVideos.map((rv) => (
                      <RelatedVideoRow
                        key={rv.id}
                        video={rv}
                        isBookmarked={isVideoBookmarked(rv.id)}
                        onTap={() => onVideoSelect(rv)}
                        onBookmarkToggle={() => onToggleVideoBookmark(rv)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

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
        <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/70 text-[9px] text-white font-mono">
          {video.duration}
        </span>
      </button>

      <button onClick={onTap} className="flex-1 text-left touch-manipulation min-w-0 pt-0.5">
        <h5 className="text-[13px] font-medium text-white leading-tight line-clamp-2">
          {video.title}
        </h5>
        <p className="text-[11px] text-white/55 mt-1">{video.channel}</p>
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
