/**
 * YouTubePlayer
 *
 * Cross-platform YouTube player:
 * - Web: standard <iframe> embed (works fine in browser / PWA)
 * - Native iOS/Android: tappable thumbnail that opens via Capacitor Browser
 *   (WKWebView blocks YouTube iframes on iOS — this is the correct workaround)
 */

import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';
import { Play, ExternalLink } from 'lucide-react';

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  /** Called when the video is opened on native (for watch tracking) */
  onOpen?: () => void;
}

export function YouTubePlayer({ videoId, title, onOpen }: YouTubePlayerProps) {
  const isNative = Capacitor.isNativePlatform();
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const fallbackThumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  if (isNative) {
    // On iOS/Android: show thumbnail + open in browser via Capacitor Browser plugin
    const handleOpen = async () => {
      onOpen?.();
      await Browser.open({
        url: youtubeUrl,
        presentationStyle: 'popover',
        toolbarColor: '#0a0a0a',
      });
    };

    return (
      <div className="relative w-full aspect-video bg-black">
        {/* Thumbnail */}
        <img
          src={thumbnailUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            // Fallback to hqdefault if maxresdefault not available
            (e.target as HTMLImageElement).src = fallbackThumbnailUrl;
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Centred play button tap target */}
        <button
          onClick={handleOpen}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 touch-manipulation"
          aria-label={`Watch ${title} on YouTube`}
        >
          <div className="h-16 w-16 rounded-full bg-elec-yellow/95 flex items-center justify-center shadow-xl shadow-black/40 active:scale-90 transition-transform duration-150">
            <Play className="h-7 w-7 text-black fill-black ml-1" />
          </div>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[12px] font-medium">
            <ExternalLink className="h-3.5 w-3.5" />
            Tap to watch
          </span>
        </button>
      </div>
    );
  }

  // Web: standard iframe embed
  return (
    <div className="relative w-full aspect-video bg-black">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
        title={title}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
