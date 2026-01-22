import { useEffect, useRef } from 'react';

/**
 * Custom hook for managing scroll lock on the document body.
 * Uses position: fixed approach for iOS Safari compatibility.
 * Handles nested modal scenarios with a reference counter.
 */

// Global state to track scroll lock across multiple components
let scrollLockCount = 0;
let savedScrollPosition = 0;
let savedBodyStyles: {
  position: string;
  top: string;
  left: string;
  right: string;
  width: string;
  overflow: string;
} | null = null;

function lockScroll() {
  if (scrollLockCount === 0) {
    // Save current scroll position and body styles
    savedScrollPosition = window.scrollY;
    savedBodyStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };

    // Apply scroll lock using position: fixed (iOS Safari compatible)
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollPosition}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
  }
  scrollLockCount++;
}

function unlockScroll() {
  scrollLockCount--;

  if (scrollLockCount <= 0) {
    scrollLockCount = 0;

    // Restore body styles
    if (savedBodyStyles) {
      document.body.style.position = savedBodyStyles.position;
      document.body.style.top = savedBodyStyles.top;
      document.body.style.left = savedBodyStyles.left;
      document.body.style.right = savedBodyStyles.right;
      document.body.style.width = savedBodyStyles.width;
      document.body.style.overflow = savedBodyStyles.overflow;
    } else {
      // Fallback: reset to defaults
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    }

    // Restore scroll position
    window.scrollTo(0, savedScrollPosition);
    savedBodyStyles = null;
  }
}

/**
 * Hook to lock body scroll when a modal/overlay is open.
 * Automatically cleans up on unmount.
 *
 * @param isLocked - Whether scroll should be locked
 */
export function useScrollLock(isLocked: boolean) {
  const wasLockedRef = useRef(false);

  useEffect(() => {
    if (isLocked && !wasLockedRef.current) {
      lockScroll();
      wasLockedRef.current = true;
    } else if (!isLocked && wasLockedRef.current) {
      unlockScroll();
      wasLockedRef.current = false;
    }

    // Cleanup on unmount
    return () => {
      if (wasLockedRef.current) {
        unlockScroll();
        wasLockedRef.current = false;
      }
    };
  }, [isLocked]);
}

/**
 * Alternative hook that returns lock/unlock functions for manual control.
 * Useful when you need more granular control over scroll locking.
 */
export function useScrollLockControls() {
  const isLockedRef = useRef(false);

  const lock = () => {
    if (!isLockedRef.current) {
      lockScroll();
      isLockedRef.current = true;
    }
  };

  const unlock = () => {
    if (isLockedRef.current) {
      unlockScroll();
      isLockedRef.current = false;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (isLockedRef.current) {
        unlockScroll();
        isLockedRef.current = false;
      }
    };
  }, []);

  return { lock, unlock, isLocked: isLockedRef.current };
}

export default useScrollLock;
