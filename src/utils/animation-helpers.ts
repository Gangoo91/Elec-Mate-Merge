/**
 * Animation utility functions for smooth UX
 */

/**
 * Easing function for smooth deceleration
 * @param t Progress value between 0 and 1
 * @returns Eased value between 0 and 1
 */
export const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

/**
 * Easing function for smooth acceleration
 */
export const easeInCubic = (t: number): number => {
  return t * t * t;
};

/**
 * Easing function for smooth acceleration and deceleration
 */
export const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

/**
 * Animate a value from start to end using requestAnimationFrame
 * @param start Starting value
 * @param end Ending value
 * @param duration Duration in milliseconds
 * @param onUpdate Callback function called with the current value
 * @param easingFn Easing function to use (defaults to easeOutCubic)
 * @returns Cleanup function to cancel the animation
 */
export const animateValue = (
  start: number,
  end: number,
  duration: number,
  onUpdate: (value: number) => void,
  easingFn: (t: number) => number = easeOutCubic
): (() => void) => {
  const startTime = performance.now();
  let animationFrameId: number;

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easingFn(progress);
    const currentValue = start + (end - start) * eased;

    onUpdate(currentValue);

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(animate);
    }
  };

  animationFrameId = requestAnimationFrame(animate);

  // Return cleanup function
  return () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  };
};

/**
 * Animate a number counter with comma formatting
 */
export const animateCounter = (
  start: number,
  end: number,
  duration: number,
  onUpdate: (value: string) => void
): (() => void) => {
  return animateValue(start, end, duration, (value) => {
    onUpdate(Math.round(value).toString());
  });
};

/**
 * Format time in seconds to MM:SS format
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Trigger haptic feedback if available
 * @param pattern Vibration pattern (single duration or array)
 */
export const triggerHaptic = (pattern: number | number[] = 100): void => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};
