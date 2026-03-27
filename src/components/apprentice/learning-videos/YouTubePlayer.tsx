/**
 * YouTubePlayer
 *
 * Tap-to-play YouTube embed — works identically on web, iOS and Android.
 * Shows a thumbnail with a play button. Tapping replaces it with an inline
 * iframe using `playsinline=1` so the video plays inside the app's WebView
 * rather than launching an external browser or the YouTube app.
 */

import { useState } from 'react';
import { Play } from 'lucide-react';

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  /** Called when the user taps play (for watch tracking) */
  onOpen?: () => void;
}

export function YouTubePlayer({ videoId, title, onOpen }: YouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const fallbackThumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const handlePlay = () => {
    onOpen?.();
    setIsPlaying(true);
  };

  // Once tapped — show inline iframe.
  // playsinline=1 is essential for iOS WKWebView (prevents full-screen hijack).
  // autoplay=1 starts playback immediately after tap.
  if (isPlaying) {
    return (
      <div className="relative w-full aspect-video bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  // Before tap — show thumbnail with play button
  return (
    <div className="relative w-full aspect-video bg-black">
      {/* Thumbnail */}
      <img
        src={thumbnailUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = fallbackThumbnailUrl;
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Play button */}
      <button
        onClick={handlePlay}
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 touch-manipulation"
        aria-label={`Play ${title}`}
      >
        <div className="h-16 w-16 rounded-full bg-elec-yellow/95 flex items-center justify-center shadow-xl shadow-black/40 active:scale-90 transition-transform duration-150">
          <Play className="h-7 w-7 text-black fill-black ml-1" />
        </div>
        <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[12px] font-medium">
          Tap to play
        </span>
      </button>
    </div>
  );
}
