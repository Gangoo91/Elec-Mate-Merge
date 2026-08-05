import { useEffect, useState } from 'react';

/** Evaluate a media query now. Guarded so a non-browser environment can't throw. */
const readMatches = (query: string): boolean =>
  typeof window !== 'undefined' && window.matchMedia(query).matches;

export function useMediaQuery(query: string): boolean {
  // Seeded from the real match rather than `false`. `useEffect` runs after the
  // browser paints, so starting at false renders one frame as though the query
  // did not match and then corrects it — the same first-paint flash and
  // remount that `useIsMobile` had.
  const [matches, setMatches] = useState<boolean>(() => readMatches(query));

  useEffect(() => {
    const media = window.matchMedia(query);
    // Re-read on mount in case the viewport changed between the first render
    // and the effect firing.
    setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
    // `matches` is deliberately no longer a dependency. It was only read to
    // guard the initial set, which the seeded state now handles; keeping it
    // made the effect tear down and re-subscribe on every single change.
  }, [query]);

  return matches;
}
