import React from 'react';
import { Star, Mic, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Podcast } from './PodcastData';

// Platform icons
const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const ApplePodcastIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0H5.34zm6.525 2.568c2.336 0 4.448.902 6.053 2.507 1.607 1.606 2.489 3.72 2.489 6.057 0 2.337-.882 4.451-2.489 6.057-1.605 1.605-3.717 2.507-6.053 2.507-2.337 0-4.449-.902-6.055-2.507C4.205 15.582 3.32 13.47 3.32 11.132c0-2.338.885-4.451 2.49-6.057 1.606-1.605 3.718-2.507 6.055-2.507z"/>
  </svg>
);

interface FeaturedPodcastHeroProps {
  podcast: Podcast;
}

const FeaturedPodcastHero = ({ podcast }: FeaturedPodcastHeroProps) => {
  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/30 via-amber-500/20 to-orange-400/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" />

      {/* Animated Glow Orbs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
        backgroundSize: '20px 20px'
      }} />

      {/* Content */}
      <div className="relative z-10 p-4 sm:p-6 md:p-8">
        {/* Featured Badge */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/30 border border-orange-400/40 backdrop-blur-sm">
            <Star className="h-4 w-4 text-orange-300 fill-orange-300" />
            <span className="text-sm font-semibold text-orange-200 uppercase tracking-wide">Featured Podcast</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-row items-start sm:items-center gap-4 sm:gap-6 md:gap-8">
          {/* Podcast Icon/Visual */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-16 h-16 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-xl sm:rounded-2xl md:rounded-3xl bg-gradient-to-br from-orange-500/40 to-amber-600/30 border border-orange-400/30 backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-orange-500/20">
                <Mic className="w-8 h-8 sm:w-14 sm:h-14 md:w-16 md:h-16 text-orange-300" />
              </div>
              {/* Glow ring */}
              <div className="absolute -inset-1 rounded-xl sm:rounded-2xl md:rounded-3xl bg-gradient-to-br from-orange-500/30 to-amber-500/20 blur-lg -z-10" />
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 space-y-2 sm:space-y-4">
            <div>
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2 tracking-tight">
                {podcast.name}
              </h2>
              <p className="text-sm sm:text-base text-orange-200/90 font-medium">
                {podcast.host}
              </p>
            </div>

            <p className="hidden sm:block text-white text-base sm:text-lg leading-relaxed max-w-2xl">
              {podcast.description}
            </p>

            {/* Topics - hidden on mobile for cleaner look */}
            <div className="hidden sm:flex flex-wrap gap-2">
              {podcast.topics.map((topic, idx) => (
                <span
                  key={idx}
                  className="text-xs sm:text-sm px-3 py-1 rounded-full bg-white/10 text-white/90 border border-white/10 backdrop-blur-sm"
                >
                  {topic}
                </span>
              ))}
            </div>

            {/* Platform Buttons - compact on mobile */}
            <div className="flex flex-wrap gap-2 sm:gap-3 pt-1 sm:pt-2">
              {podcast.links.youtube && (
                <Button
                  size="sm"
                  onClick={() => openLink(podcast.links.youtube!)}
                  className="h-8 sm:h-10 px-2.5 sm:px-4 text-xs sm:text-sm bg-[#FF0000] hover:bg-[#CC0000] text-white border-0 gap-1.5 sm:gap-2 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <YouTubeIcon />
                  <span className="hidden sm:inline">YouTube</span>
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 opacity-70" />
                </Button>
              )}

              {podcast.links.facebook && (
                <Button
                  size="sm"
                  onClick={() => openLink(podcast.links.facebook!)}
                  className="h-8 sm:h-10 px-2.5 sm:px-4 text-xs sm:text-sm bg-[#1877F2] hover:bg-[#1466D9] text-white border-0 gap-1.5 sm:gap-2 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <FacebookIcon />
                  <span className="hidden sm:inline">Facebook</span>
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 opacity-70" />
                </Button>
              )}

              {podcast.links.spotify && (
                <Button
                  size="sm"
                  onClick={() => openLink(podcast.links.spotify!)}
                  className="h-8 sm:h-10 px-2.5 sm:px-4 text-xs sm:text-sm bg-[#1DB954] hover:bg-[#1AA34A] text-white border-0 gap-1.5 sm:gap-2 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <SpotifyIcon />
                  <span className="hidden sm:inline">Spotify</span>
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 opacity-70" />
                </Button>
              )}

              {podcast.links.apple && (
                <Button
                  size="sm"
                  onClick={() => openLink(podcast.links.apple!)}
                  className="h-8 sm:h-10 px-2.5 sm:px-4 text-xs sm:text-sm bg-[#9933FF] hover:bg-[#8822EE] text-white border-0 gap-1.5 sm:gap-2 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <ApplePodcastIcon />
                  <span className="hidden sm:inline">Apple</span>
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 opacity-70" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPodcastHero;
