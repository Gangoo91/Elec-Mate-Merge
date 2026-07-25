import { openExternalUrl } from '@/utils/open-external-url';
import { ExternalLink, Mic, Globe } from 'lucide-react';
import { Podcast } from './PodcastData';

// Platform-specific icons as SVG components
const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const ApplePodcastIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0H5.34zm6.525 2.568c2.336 0 4.448.902 6.053 2.507 1.607 1.606 2.489 3.72 2.489 6.057 0 2.337-.882 4.451-2.489 6.057-1.605 1.605-3.717 2.507-6.053 2.507-2.337 0-4.449-.902-6.055-2.507C4.205 15.582 3.32 13.47 3.32 11.132c0-2.338.885-4.451 2.49-6.057 1.606-1.605 3.718-2.507 6.055-2.507z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

interface PodcastCardProps {
  podcast: Podcast;
}

const PLATFORM_BUTTON =
  'inline-flex items-center gap-1.5 h-11 sm:h-9 px-3.5 rounded-full text-[12px] font-medium touch-manipulation active:scale-[0.97] transition-colors';

const PodcastCard = ({ podcast }: PodcastCardProps) => {
  const platforms = [
    podcast.links.spotify && {
      key: 'spotify',
      label: 'Spotify',
      icon: <SpotifyIcon />,
      className: 'bg-[#1DB954]/15 border border-[#1DB954]/30 text-[#1ed760]',
      url: podcast.links.spotify,
    },
    podcast.links.apple && {
      key: 'apple',
      label: 'Apple',
      icon: <ApplePodcastIcon />,
      className: 'bg-[#9933FF]/15 border border-[#9933FF]/30 text-[#c084fc]',
      url: podcast.links.apple,
    },
    podcast.links.youtube && {
      key: 'youtube',
      label: 'YouTube',
      icon: <YouTubeIcon />,
      className: 'bg-[#FF0000]/15 border border-[#FF0000]/30 text-[#f87171]',
      url: podcast.links.youtube,
    },
    podcast.links.facebook && {
      key: 'facebook',
      label: 'Facebook',
      icon: <FacebookIcon />,
      className: 'bg-[#1877F2]/15 border border-[#1877F2]/30 text-[#60a5fa]',
      url: podcast.links.facebook,
    },
    podcast.links.website && {
      key: 'website',
      label: 'Website',
      icon: <Globe className="h-4 w-4" />,
      className: 'bg-white/[0.06] border border-white/[0.12] text-white',
      url: podcast.links.website,
    },
  ].filter(Boolean) as { key: string; label: string; icon: JSX.Element; className: string; url: string }[];

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] p-4 sm:p-5 space-y-3">
      {/* Title & host */}
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center shrink-0">
          <Mic className="h-4.5 w-4.5 text-elec-yellow" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-white text-[15px] sm:text-base leading-tight line-clamp-2">
            {podcast.name}
          </h3>
          <p className="text-[12px] sm:text-[13px] text-white/70 mt-0.5">{podcast.host}</p>
        </div>
      </div>

      {/* Description — hidden on mobile for cleaner cards */}
      <p className="hidden sm:block text-sm text-white/85 leading-relaxed line-clamp-3">
        {podcast.description}
      </p>

      {/* Topics */}
      <div className="flex flex-wrap gap-1.5">
        {podcast.topics.slice(0, 3).map((topic, idx) => (
          <span
            key={idx}
            className="text-[10.5px] sm:text-xs px-2.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.04] text-white/80"
          >
            {topic}
          </span>
        ))}
      </div>

      {/* Platform buttons — 44px targets on mobile, labels always visible */}
      {platforms.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {platforms.map((p) => (
            <button
              key={p.key}
              onClick={() => openExternalUrl(p.url)}
              className={`${PLATFORM_BUTTON} ${p.className}`}
              aria-label={`Open ${podcast.name} on ${p.label}`}
            >
              {p.icon}
              <span>{p.label}</span>
              {p.key === 'website' && <ExternalLink className="h-3 w-3 opacity-50" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PodcastCard;
