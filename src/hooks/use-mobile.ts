import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 1024;

/** Read the current viewport. Guarded so a non-browser environment can't throw. */
const readIsMobile = (): boolean =>
  typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT;

export function useIsMobile() {
  // Seeded from the real viewport rather than `false`.
  //
  // `useEffect` runs after the browser has painted, so initialising to `false`
  // meant every phone rendered one frame of the desktop layout and then threw
  // it away — a visible flash, and a full unmount/remount of everything behind
  // an `isMobile` branch. On the schedule of tests that discards a table that
  // had just been built. 175 files read this hook, so a wrong first paint was
  // not a local cost.
  //
  // The initialiser is passed as a function so `window.innerWidth` is read once
  // on mount rather than on every render.
  const [isMobile, setIsMobile] = useState<boolean>(readIsMobile);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(readIsMobile());
    };
    mql.addEventListener('change', onChange);
    // Re-read on mount: the viewport can change between the first render and
    // the effect firing (rotation mid-load, or a restored window size).
    setIsMobile(readIsMobile());
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return isMobile;
}
