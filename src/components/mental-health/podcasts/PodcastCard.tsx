import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, Mic, Globe } from 'lucide-react';
import { Podcast } from './PodcastData';

// Platform-specific icons as SVG components
const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const ApplePodcastIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0H5.34zm6.525 2.568c2.336 0 4.448.902 6.053 2.507 1.607 1.606 2.489 3.72 2.489 6.057 0 2.337-.882 4.451-2.489 6.057-1.605 1.605-3.717 2.507-6.053 2.507-2.337 0-4.449-.902-6.055-2.507C4.205 15.582 3.32 13.47 3.32 11.132c0-2.338.885-4.451 2.49-6.057 1.606-1.605 3.718-2.507 6.055-2.507z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

// Category color configurations
const categoryColors: Record<string, {
  gradient: string;
  border: string;
  accent: string;
  iconBg: string;
  topicBg: string;
  topicText: string;
}> = {
  'trades-specific': {
    gradient: 'from-amber-500/30 via-amber-600/20 to-amber-700/10',
    border: 'border-amber-500/30 hover:border-amber-400/50',
    accent: 'text-amber-400',
    iconBg: 'bg-amber-500/20',
    topicBg: 'bg-amber-500/15 border-amber-500/25',
    topicText: 'text-amber-300',
  },
  'general-mental-health': {
    gradient: 'from-blue-500/30 via-blue-600/20 to-blue-700/10',
    border: 'border-blue-500/30 hover:border-blue-400/50',
    accent: 'text-blue-400',
    iconBg: 'bg-blue-500/20',
    topicBg: 'bg-blue-500/15 border-blue-500/25',
    topicText: 'text-blue-300',
  },
  'personal-stories': {
    gradient: 'from-pink-500/30 via-pink-600/20 to-rose-700/10',
    border: 'border-pink-500/30 hover:border-pink-400/50',
    accent: 'text-pink-400',
    iconBg: 'bg-pink-500/20',
    topicBg: 'bg-pink-500/15 border-pink-500/25',
    topicText: 'text-pink-300',
  },
  'sleep-anxiety': {
    gradient: 'from-indigo-500/30 via-indigo-600/20 to-purple-700/10',
    border: 'border-indigo-500/30 hover:border-indigo-400/50',
    accent: 'text-indigo-400',
    iconBg: 'bg-indigo-500/20',
    topicBg: 'bg-indigo-500/15 border-indigo-500/25',
    topicText: 'text-indigo-300',
  },
};

interface PodcastCardProps {
  podcast: Podcast;
}

const PodcastCard = ({ podcast }: PodcastCardProps) => {
  const colors = categoryColors[podcast.category] || categoryColors['general-mental-health'];

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const hasLinks = podcast.links.spotify || podcast.links.apple || podcast.links.youtube || podcast.links.website || podcast.links.facebook;

  return (
    <div className={`
      group relative overflow-hidden rounded-2xl border backdrop-blur-sm
      bg-white/[0.03] transition-all duration-500
      hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/20
      ${colors.border}
    `}>
      {/* Glassmorphism Background Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Category Gradient Header */}
      <div className={`
        relative h-24 sm:h-28 bg-gradient-to-br ${colors.gradient}
        flex items-center justify-center overflow-hidden
      `}>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />

        {/* Glow Effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />

        {/* Mic Icon */}
        <div className={`
          relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${colors.iconBg}
          border border-white/20 backdrop-blur-sm
          flex items-center justify-center
          shadow-lg group-hover:scale-110 transition-transform duration-300
        `}>
          <Mic className={`w-7 h-7 sm:w-8 sm:h-8 ${colors.accent}`} />
        </div>
      </div>

      {/* Content */}
      <div className="relative p-4 sm:p-5 space-y-4">
        {/* Title & Host */}
        <div>
          <h3 className="font-bold text-white text-lg sm:text-xl leading-tight group-hover:text-white transition-colors">
            {podcast.name}
          </h3>
          <p className={`text-sm mt-1 ${colors.accent}`}>
            {podcast.host}
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-white/70 leading-relaxed line-clamp-3">
          {podcast.description}
        </p>

        {/* Topics */}
        <div className="flex flex-wrap gap-1.5">
          {podcast.topics.slice(0, 4).map((topic, idx) => (
            <span
              key={idx}
              className={`
                text-xs px-2.5 py-1 rounded-full border
                ${colors.topicBg} ${colors.topicText}
              `}
            >
              {topic}
            </span>
          ))}
        </div>

        {/* Platform Buttons */}
        {hasLinks && (
          <div className="flex flex-wrap gap-2 pt-2">
            {podcast.links.spotify && (
              <Button
                size="sm"
                onClick={() => openLink(podcast.links.spotify!)}
                className="h-9 px-4 bg-[#1DB954] hover:bg-[#1ed760] text-white border-0 gap-2
                  shadow-lg shadow-[#1DB954]/0 hover:shadow-[#1DB954]/30
                  transition-all duration-300 hover:scale-105"
              >
                <SpotifyIcon />
                <span className="text-xs font-medium">Spotify</span>
              </Button>
            )}

            {podcast.links.apple && (
              <Button
                size="sm"
                onClick={() => openLink(podcast.links.apple!)}
                className="h-9 px-4 bg-[#9933FF] hover:bg-[#a855f7] text-white border-0 gap-2
                  shadow-lg shadow-[#9933FF]/0 hover:shadow-[#9933FF]/30
                  transition-all duration-300 hover:scale-105"
              >
                <ApplePodcastIcon />
                <span className="text-xs font-medium">Apple</span>
              </Button>
            )}

            {podcast.links.youtube && (
              <Button
                size="sm"
                onClick={() => openLink(podcast.links.youtube!)}
                className="h-9 px-4 bg-[#FF0000] hover:bg-[#ff1a1a] text-white border-0 gap-2
                  shadow-lg shadow-[#FF0000]/0 hover:shadow-[#FF0000]/30
                  transition-all duration-300 hover:scale-105"
              >
                <YouTubeIcon />
                <span className="text-xs font-medium">YouTube</span>
              </Button>
            )}

            {podcast.links.facebook && (
              <Button
                size="sm"
                onClick={() => openLink(podcast.links.facebook!)}
                className="h-9 px-4 bg-[#1877F2] hover:bg-[#1a85ff] text-white border-0 gap-2
                  shadow-lg shadow-[#1877F2]/0 hover:shadow-[#1877F2]/30
                  transition-all duration-300 hover:scale-105"
              >
                <FacebookIcon />
                <span className="text-xs font-medium">Facebook</span>
              </Button>
            )}

            {podcast.links.website && !podcast.links.spotify && !podcast.links.apple && !podcast.links.youtube && !podcast.links.facebook && (
              <Button
                size="sm"
                onClick={() => openLink(podcast.links.website!)}
                className="h-9 px-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 gap-2
                  transition-all duration-300 hover:scale-105"
              >
                <Globe className="h-4 w-4" />
                <span className="text-xs font-medium">Website</span>
                <ExternalLink className="h-3 w-3 opacity-50" />
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Bottom Glow on Hover */}
      <div className={`
        absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px
        bg-gradient-to-r from-transparent via-current to-transparent
        ${colors.accent} opacity-0 group-hover:opacity-50 transition-opacity duration-500
      `} />
    </div>
  );
};

export default PodcastCard;
