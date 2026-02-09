import { useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

const isNative = Capacitor.isNativePlatform();

/**
 * Haptic feedback for mobile interactions.
 * Uses Capacitor Haptics (Taptic Engine / Android vibrator) when native,
 * falls back to Web Vibration API on non-native platforms.
 */
export const useHaptics = () => {
  const isSupported = isNative || (typeof navigator !== 'undefined' && 'vibrate' in navigator);

  /** Light tap — button presses, selections */
  const tap = useCallback(() => {
    if (!isSupported) return;
    if (isNative) {
      Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
    } else {
      navigator.vibrate(5);
    }
  }, [isSupported]);

  /** Success — task completed, validation passed */
  const success = useCallback(() => {
    if (!isSupported) return;
    if (isNative) {
      Haptics.notification({ type: NotificationType.Success }).catch(() => {});
    } else {
      navigator.vibrate(10);
    }
  }, [isSupported]);

  /** Warning — marginal values, attention needed */
  const warning = useCallback(() => {
    if (!isSupported) return;
    if (isNative) {
      Haptics.notification({ type: NotificationType.Warning }).catch(() => {});
    } else {
      navigator.vibrate([10, 30, 10]);
    }
  }, [isSupported]);

  /** Error — validation failed, critical issue */
  const error = useCallback(() => {
    if (!isSupported) return;
    if (isNative) {
      Haptics.notification({ type: NotificationType.Error }).catch(() => {});
    } else {
      navigator.vibrate([30, 50, 30]);
    }
  }, [isSupported]);

  /** Heavy impact — delete action, major change */
  const impact = useCallback(() => {
    if (!isSupported) return;
    if (isNative) {
      Haptics.impact({ style: ImpactStyle.Heavy }).catch(() => {});
    } else {
      navigator.vibrate(50);
    }
  }, [isSupported]);

  /** Notification — new item, attention */
  const notification = useCallback(() => {
    if (!isSupported) return;
    if (isNative) {
      Haptics.impact({ style: ImpactStyle.Medium }).catch(() => {});
    } else {
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
