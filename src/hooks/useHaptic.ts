import { useCallback, useRef } from 'react';

type HapticPattern = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' | 'selection';

// Vibration patterns in milliseconds
const HAPTIC_PATTERNS: Record<HapticPattern, number | number[]> = {
  light: 10,
  medium: 25,
  heavy: 50,
  success: [10, 50, 20], // Short, pause, short
  warning: [30, 30, 30], // Three medium pulses
  error: [50, 100, 50, 100, 50], // Long-pause-long pattern
  selection: 5, // Very light for selections
};

interface UseHapticOptions {
  /** Whether haptics are enabled */
  enabled?: boolean;
  /** Default pattern to use */
  defaultPattern?: HapticPattern;
}

interface UseHapticReturn {
  /** Trigger haptic feedback */
  trigger: (pattern?: HapticPattern) => void;
  /** Check if haptics are supported */
  isSupported: boolean;
  /** Trigger on successful action */
  success: () => void;
  /** Trigger on warning */
  warning: () => void;
  /** Trigger on error */
  error: () => void;
  /** Trigger light feedback (for selections) */
  light: () => void;
  /** Trigger medium feedback (for buttons) */
  medium: () => void;
  /** Trigger heavy feedback (for important actions) */
  heavy: () => void;
  /** Trigger selection feedback */
  selection: () => void;
}

/**
 * useHaptic - Hook for haptic feedback on mobile devices
 *
 * Provides various haptic patterns for different interaction types
 * Falls back gracefully on unsupported devices
 *
 * @example
 * const haptic = useHaptic();
 *
 * // Trigger on button press
 * <button onClick={() => { haptic.medium(); doAction(); }}>
 *   Submit
 * </button>
 *
 * // Trigger on success
 * const handleSave = async () => {
 *   await save();
 *   haptic.success();
 * };
 */
export function useHaptic(options: UseHapticOptions = {}): UseHapticReturn {
  const { enabled = true, defaultPattern = 'medium' } = options;

  // Check if Vibration API is supported
  const isSupported = typeof navigator !== 'undefined' && 'vibrate' in navigator;

  // Throttle ref to prevent rapid triggers
  const lastTriggerRef = useRef<number>(0);
  const throttleMs = 50; // Minimum time between triggers

  // Main trigger function
  const trigger = useCallback(
    (pattern: HapticPattern = defaultPattern) => {
      if (!enabled || !isSupported) return;

      // Throttle rapid triggers
      const now = Date.now();
      if (now - lastTriggerRef.current < throttleMs) return;
      lastTriggerRef.current = now;

      try {
        const vibrationPattern = HAPTIC_PATTERNS[pattern];
        navigator.vibrate(vibrationPattern);
      } catch (error) {
        // Silently fail - haptics are non-critical
        console.debug('Haptic feedback failed:', error);
      }
    },
    [enabled, isSupported, defaultPattern]
  );

  // Convenience methods
  const success = useCallback(() => trigger('success'), [trigger]);
  const warning = useCallback(() => trigger('warning'), [trigger]);
  const error = useCallback(() => trigger('error'), [trigger]);
  const light = useCallback(() => trigger('light'), [trigger]);
  const medium = useCallback(() => trigger('medium'), [trigger]);
  const heavy = useCallback(() => trigger('heavy'), [trigger]);
  const selection = useCallback(() => trigger('selection'), [trigger]);

  return {
    trigger,
    isSupported,
    success,
    warning,
    error,
    light,
    medium,
    heavy,
    selection,
  };
}

/**
 * useHapticCallback - Wrap a callback with haptic feedback
 *
 * @example
 * const handleClick = useHapticCallback(() => {
 *   // Do something
 * }, { pattern: 'medium' });
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

/**
 * useHapticState - Trigger haptics when state changes
 *
 * @example
 * const [isOn, setIsOn] = useHapticState(false, {
 *   onTrue: 'success',
 *   onFalse: 'light',
 * });
 */
export function useHapticState<T>(
  initialValue: T,
  options: {
    onTrue?: HapticPattern;
    onFalse?: HapticPattern;
    onChange?: HapticPattern;
  } = {}
): [T, (value: T | ((prev: T) => T)) => void] {
  const { onTrue = 'selection', onFalse = 'selection', onChange } = options;
  const haptic = useHaptic();
  const valueRef = useRef<T>(initialValue);
  const [, forceRender] = useCallback(() => ({}), []) as [unknown, () => void];

  const setValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      const resolvedValue =
        typeof newValue === 'function'
          ? (newValue as (prev: T) => T)(valueRef.current)
          : newValue;

      if (resolvedValue !== valueRef.current) {
        if (onChange) {
          haptic.trigger(onChange);
        } else if (typeof resolvedValue === 'boolean') {
          haptic.trigger(resolvedValue ? onTrue : onFalse);
        }
        valueRef.current = resolvedValue;
        forceRender();
      }
    },
    [haptic, onChange, onTrue, onFalse, forceRender]
  );

  return [valueRef.current, setValue];
}

export default useHaptic;
