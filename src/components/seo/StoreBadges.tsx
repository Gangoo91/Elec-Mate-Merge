import { APP_STORE_URL, PLAY_STORE_URL } from '@/constants/social-proof';

interface StoreBadgesProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function StoreBadges({ className = '', size = 'md' }: StoreBadgesProps) {
  const heights = { sm: 'h-10', md: 'h-12', lg: 'h-14' };
  const h = heights[size];

  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download on the App Store"
        className="transition-opacity hover:opacity-80 active:scale-[0.97]"
      >
        <img
          src="/images/app-store-badge.svg"
          alt="Download on the App Store"
          className={h}
          loading="lazy"
        />
      </a>
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get it on Google Play"
        className="transition-opacity hover:opacity-80 active:scale-[0.97]"
      >
        <img
          src="/images/google-play-badge.svg"
          alt="Get it on Google Play"
          className={h}
          loading="lazy"
        />
      </a>
    </div>
  );
}

export { APP_STORE_URL, PLAY_STORE_URL };
