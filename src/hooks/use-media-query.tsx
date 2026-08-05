import { useState, useEffect } from 'react';

/** Evaluate a media query now. Guarded so a non-browser environment can't throw. */
const readMatches = (query: string): boolean =>
  typeof window !== 'undefined' && window.matchMedia(query).matches;

export function useMediaQuery(query: string): boolean {
  // Seeded from the real match rather than `false` — `useEffect` runs after
  // paint, so starting at false renders one frame as though the query did not
  // match and then corrects it.
  const [matches, setMatches] = useState<boolean>(() => readMatches(query));

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // Re-read on mount in case the viewport changed between the first render
    // and the effect firing.
    setMatches(mediaQuery.matches);

    // Create event listener
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Add listener
    mediaQuery.addEventListener('change', handler);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;
