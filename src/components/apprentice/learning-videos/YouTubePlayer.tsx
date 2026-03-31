/**
 * YouTubePlayer
 *
 * Tap-to-play YouTube embed — works on web, iOS and Android.
 *
 * Native (Capacitor): Uses a proxy HTML page hosted on elec-mate.com to bypass
 * YouTube Error 153 caused by WKWebView's capacitor:// origin not sending valid
 * HTTP Referer headers. The proxy page loads from a real HTTPS domain, so YouTube
 * accepts the embed.
 *
 * Web: Standard youtube-nocookie.com iframe embed.
 */

import { useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { Play } from 'lucide-react';

// Proxy page hosted on our domain — YouTube sees referer as elec-mate.com
const YOUTUBE_PROXY_URL = 'https://www.elec-mate.com/youtube.html';

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  /** Called when the user taps play (for watch tracking) */
  onOpen?: () => void;
}

export function YouTubePlayer({ videoId, title, onOpen }: YouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const isNative = Capacitor.isNativePlatform();
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const fallbackThumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const handlePlay = () => {
    onOpen?.();
    setIsPlaying(true);
  };

  if (isPlaying) {
    // Native: proxy page on our domain (fixes YouTube Error 153 in WKWebView)
    // Web: direct youtube-nocookie.com embed
    const embedSrc = isNative
      ? `${YOUTUBE_PROXY_URL}?v=${videoId}&autoplay=1`
      : `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`;

    return (
      <div className="relative w-full aspect-video bg-black">
        <iframe
          src={embedSrc}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          allowFullScreen
        />
      </div>
    );
  }

  // Before tap — show thumbnail with play button
  return (
    <div className="relative w-full aspect-video bg-black">
      <img
        src={thumbnailUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = fallbackThumbnailUrl;
        }}
      />
      <div className="absolute inset-0 bg-black/40" />
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
