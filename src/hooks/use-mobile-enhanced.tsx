
import { useState, useEffect } from 'react';

interface MobileEnhancedHook {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  touchSupport: boolean;
  screenSize: 'mobile' | 'tablet' | 'desktop';
  orientation: 'portrait' | 'landscape';
}

export function useMobileEnhanced(): MobileEnhancedHook {
  const [deviceInfo, setDeviceInfo] = useState<MobileEnhancedHook>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    touchSupport: false,
    screenSize: 'desktop',
    orientation: 'landscape'
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;
      const touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const orientation = height > width ? 'portrait' : 'landscape';
      
      const screenSize: 'mobile' | 'tablet' | 'desktop' = 
        isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        touchSupport,
        screenSize,
        orientation
      });
    };
    
    // Initial check
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
