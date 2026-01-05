import { useState, useEffect } from 'react';

interface OrientationState {
  isLandscape: boolean;
  isMobile: boolean;
  shouldShowDesktopTable: boolean;
}

export const useOrientation = () => {
  const [orientation, setOrientation] = useState<OrientationState>({
    isLandscape: false,
    isMobile: false,
    shouldShowDesktopTable: false,
  });

  useEffect(() => {
    const updateOrientation = () => {
      const isMobile = window.innerWidth < 768; // sm breakpoint
      const isLandscape = window.innerWidth > window.innerHeight;
      const shouldShowDesktopTable = isMobile && isLandscape;

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