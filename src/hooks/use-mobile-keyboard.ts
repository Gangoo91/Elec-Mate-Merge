import { useEffect, useState } from 'react';
import { useMobileEnhanced } from './use-mobile-enhanced';

interface MobileKeyboardState {
  isVisible: boolean;
  height: number;
}

export function useMobileKeyboard() {
  const { isMobile } = useMobileEnhanced();
  const [keyboardState, setKeyboardState] = useState<MobileKeyboardState>({
    isVisible: false,
    height: 0
  });

  useEffect(() => {
    if (!isMobile) return;

    let initialViewportHeight = window.visualViewport?.height || window.innerHeight;

    const handleResize = () => {
      const currentHeight = window.visualViewport?.height || window.innerHeight;
      const heightDifference = initialViewportHeight - currentHeight;
      
      // Consider keyboard visible if viewport shrunk by more than 150px
      const isKeyboardVisible = heightDifference > 150;
      
      setKeyboardState({
        isVisible: isKeyboardVisible,
        height: isKeyboardVisible ? heightDifference : 0
      });
    };

    // Use visualViewport if available (modern mobile browsers)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
      return () => {
        window.visualViewport?.removeEventListener('resize', handleResize);
      };
    } else {
      // Fallback for older browsers
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isMobile]);

  return keyboardState;
}