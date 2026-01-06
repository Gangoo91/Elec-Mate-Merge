import { useCallback } from 'react';

/**
 * Haptic feedback patterns for mobile interactions
 * Uses the Vibration API when available
 */
export const useHaptics = () => {
  const isSupported = typeof navigator !== 'undefined' && 'vibrate' in navigator;

  /**
   * Light tap - for button presses, selections
   */
  const tap = useCallback(() => {
    if (isSupported) {
      navigator.vibrate(5);
    }
  }, [isSupported]);

  /**
   * Success feedback - task completed, validation passed
   */
  const success = useCallback(() => {
    if (isSupported) {
      navigator.vibrate(10);
    }
  }, [isSupported]);

  /**
   * Warning feedback - marginal values, attention needed
   */
  const warning = useCallback(() => {
    if (isSupported) {
      navigator.vibrate([10, 30, 10]);
    }
  }, [isSupported]);

  /**
   * Error feedback - validation failed, critical issue
   */
  const error = useCallback(() => {
    if (isSupported) {
      navigator.vibrate([30, 50, 30]);
    }
  }, [isSupported]);

  /**
   * Heavy impact - delete action, major change
   */
  const impact = useCallback(() => {
    if (isSupported) {
      navigator.vibrate(50);
    }
  }, [isSupported]);

  /**
   * Notification - new item, attention
   */
  const notification = useCallback(() => {
    if (isSupported) {
      navigator.vibrate([10, 50, 10, 50]);
    }
  }, [isSupported]);

  return {
    isSupported,
    tap,
    success,
    warning,
    error,
    impact,
    notification,
  };
};

export default useHaptics;
