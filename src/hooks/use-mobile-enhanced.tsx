import { useState, useEffect } from 'react';

interface MobileEnhancedHook {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  touchSupport: boolean;
  screenSize: 'mobile' | 'tablet' | 'desktop';
  orientation: 'portrait' | 'landscape';
}

/**
 * Read the device. Shared by the initial state and every update so the two
 * cannot drift apart. Guarded so a non-browser environment can't throw.
 */
const readDeviceInfo = (): MobileEnhancedHook => {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      touchSupport: false,
      screenSize: 'desktop',
      orientation: 'landscape',
    };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;
  const touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const orientation: 'portrait' | 'landscape' = height > width ? 'portrait' : 'landscape';
  const screenSize: 'mobile' | 'tablet' | 'desktop' = isMobile
    ? 'mobile'
    : isTablet
      ? 'tablet'
      : 'desktop';

  return { isMobile, isTablet, isDesktop, touchSupport, screenSize, orientation };
};

export function useMobileEnhanced(): MobileEnhancedHook {
  // Seeded from the real device rather than a desktop guess — the old initial
  // state claimed isDesktop:true with no touch support, so on a phone the first
  // paint was the desktop branch and everything under it remounted once the
  // effect corrected it.
  const [deviceInfo, setDeviceInfo] = useState<MobileEnhancedHook>(readDeviceInfo);

  useEffect(() => {
    const updateDeviceInfo = () => {
      setDeviceInfo(readDeviceInfo());
    };

    // Re-read on mount: the viewport can change between the first render and
    // the effect firing (rotation mid-load, or a restored window size).
    updateDeviceInfo();

    // Add event listeners
    window.addEventListener('resize', updateDeviceInfo);
    window.addEventListener('orientationchange', updateDeviceInfo);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      window.removeEventListener('orientationchange', updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
}
