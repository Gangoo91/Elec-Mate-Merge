import { useState, useEffect } from 'react';

interface OrientationState {
  isLandscape: boolean;
  isMobile: boolean;
  shouldShowDesktopTable: boolean;
}

/**
 * Read the viewport. Shared by the initial state and every update so the two
 * cannot drift apart. Guarded so a non-browser environment can't throw.
 */
const readOrientation = (): OrientationState => {
  if (typeof window === 'undefined') {
    return { isLandscape: false, isMobile: false, shouldShowDesktopTable: false };
  }
  const isMobile = window.innerWidth < 768; // sm breakpoint
  const isLandscape = window.innerWidth > window.innerHeight;
  return { isMobile, isLandscape, shouldShowDesktopTable: isMobile && isLandscape };
};

export const useOrientation = () => {
  // Seeded from the real viewport, not all-false. This hook is read by the
  // three schedule-of-tests components (EICR, EICR three-phase, EIC), and it
  // chooses between the mobile rows and the desktop table. Starting at false
  // meant a phone built the wrong variant on first paint and then remounted
  // the correct one — the heaviest screen in the app, rendered twice.
  const [orientation, setOrientation] = useState<OrientationState>(readOrientation);

  useEffect(() => {
    const updateOrientation = () => {
      const { isMobile, isLandscape, shouldShowDesktopTable } = readOrientation();

      setOrientation((prev) => {
        if (
          prev.isLandscape === isLandscape &&
          prev.isMobile === isMobile &&
          prev.shouldShowDesktopTable === shouldShowDesktopTable
        ) {
          return prev;
        }
        return {
          isLandscape,
          isMobile,
          shouldShowDesktopTable,
        };
      });
    };

    // Initial check
    updateOrientation();

    // Create a more aggressive listener that catches all possible orientation events
    const handleResize = () => {
      updateOrientation();
    };

    const handleOrientationChange = () => {
      // Add a small delay to ensure the viewport has updated
      setTimeout(updateOrientation, 100);
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateOrientation();
      }
    };

    // Add multiple event listeners to catch orientation changes
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Also listen for screen orientation API if available
    if (screen.orientation) {
      screen.orientation.addEventListener('change', handleOrientationChange);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (screen.orientation) {
        screen.orientation.removeEventListener('change', handleOrientationChange);
      }
    };
  }, []);

  return orientation;
};
