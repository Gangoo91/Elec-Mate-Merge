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

/**
 * Trigger confetti animation
 */
export const triggerConfetti = (): void => {
  // Simple confetti effect using CSS animations
  const colors = ['#f97316', '#fb923c', '#fdba74'];
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '10px';
    particle.style.height = '10px';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '-10px';
    particle.style.opacity = '1';
    particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    particle.style.zIndex = '9999';
    particle.style.pointerEvents = 'none';
    
    document.body.appendChild(particle);
    
    const duration = 2000 + Math.random() * 1000;
    const rotation = Math.random() * 360;
    const xMovement = (Math.random() - 0.5) * 200;
    
    particle.animate([
      { 
        transform: `translateY(0) translateX(0) rotate(0deg)`,
        opacity: 1 
      },
      { 
        transform: `translateY(${window.innerHeight}px) translateX(${xMovement}px) rotate(${rotation}deg)`,
        opacity: 0 
      }
    ], {
      duration,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    setTimeout(() => {
      particle.remove();
    }, duration);
  }
};
