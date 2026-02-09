import { useCallback, useRef } from 'react';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';

type HapticPattern = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' | 'selection';

const isNative = Capacitor.isNativePlatform();

// Web Vibration API fallback patterns (milliseconds)
const WEB_PATTERNS: Record<HapticPattern, number | number[]> = {
  light: 10,
  medium: 25,
  heavy: 50,
  success: [10, 50, 20],
  warning: [30, 30, 30],
  error: [50, 100, 50, 100, 50],
  selection: 5,
};

// Native haptic implementations — uses Capacitor Haptics (Taptic Engine on iOS)
function triggerNative(pattern: HapticPattern) {
  switch (pattern) {
    case 'light':
    case 'selection':
      return Haptics.impact({ style: ImpactStyle.Light });
    case 'medium':
      return Haptics.impact({ style: ImpactStyle.Medium });
    case 'heavy':
      return Haptics.impact({ style: ImpactStyle.Heavy });
    case 'success':
      return Haptics.notification({ type: NotificationType.Success });
    case 'warning':
      return Haptics.notification({ type: NotificationType.Warning });
    case 'error':
      return Haptics.notification({ type: NotificationType.Error });
  }
}

// Web fallback — navigator.vibrate (no-op on iOS Safari)
function triggerWeb(pattern: HapticPattern) {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(WEB_PATTERNS[pattern]);
  }
}

interface UseHapticOptions {
  enabled?: boolean;
  defaultPattern?: HapticPattern;
}

interface UseHapticReturn {
  trigger: (pattern?: HapticPattern) => void;
  isSupported: boolean;
  success: () => void;
  warning: () => void;
  error: () => void;
  light: () => void;
  medium: () => void;
  heavy: () => void;
  selection: () => void;
}

/**
 * useHaptic — Native haptic feedback via Capacitor Haptics.
 * Falls back to Web Vibration API on non-native platforms.
 * No-ops silently when unsupported.
 *
 * @example
 * const haptic = useHaptic();
 * <Button onClick={() => { haptic.medium(); doAction(); }}>Submit</Button>
 */
export function useHaptic(options: UseHapticOptions = {}): UseHapticReturn {
  const { enabled = true, defaultPattern = 'medium' } = options;

  const isSupported = isNative || (typeof navigator !== 'undefined' && 'vibrate' in navigator);

  // Throttle to prevent rapid triggers
  const lastTriggerRef = useRef<number>(0);

  const trigger = useCallback(
    (pattern: HapticPattern = defaultPattern) => {
      if (!enabled || !isSupported) return;

      const now = Date.now();
      if (now - lastTriggerRef.current < 50) return;
      lastTriggerRef.current = now;

      if (isNative) {
        triggerNative(pattern).catch(() => {});
      } else {
        triggerWeb(pattern);
      }
    },
    [enabled, isSupported, defaultPattern]
  );

  const success = useCallback(() => trigger('success'), [trigger]);
  const warning = useCallback(() => trigger('warning'), [trigger]);
  const error = useCallback(() => trigger('error'), [trigger]);
  const light = useCallback(() => trigger('light'), [trigger]);
  const medium = useCallback(() => trigger('medium'), [trigger]);
  const heavy = useCallback(() => trigger('heavy'), [trigger]);
  const selection = useCallback(() => trigger('selection'), [trigger]);

  return { trigger, isSupported, success, warning, error, light, medium, heavy, selection };
}

/**
 * useHapticCallback — Wrap any callback with haptic feedback.
 *
 * @example
 * const handleClick = useHapticCallback(() => { doThing(); }, { pattern: 'medium' });
 */
export function useHapticCallback<T extends (...args: any[]) => any>(
  callback: T,
  options: { pattern?: HapticPattern; before?: boolean } = {}
): T {
  const { pattern = 'medium', before = true } = options;
  const haptic = useHaptic();

  return useCallback(
    ((...args: Parameters<T>) => {
      if (before) haptic.trigger(pattern);
      const result = callback(...args);
      if (!before) haptic.trigger(pattern);
      return result;
    }) as T,
    [callback, haptic, pattern, before]
  );
}

export default useHaptic;
