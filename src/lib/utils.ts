import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  } else {
    return `${remainingSeconds}s`;
  }
}

/**
 * Mobile-aware blur class
 *
 * Problem: backdrop-blur is GPU-intensive on mobile Safari
 * Solution: Use solid background on mobile Safari, blur on other browsers
 *
 * @param intensity - Blur intensity: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
 * @returns CSS class string
 */
export function mobileBlurClass(
  intensity: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' = 'md'
): string {
  // Check if running in browser
  if (typeof window === 'undefined') {
    return `backdrop-blur-${intensity}`;
  }

  // Detect mobile Safari
  const isMobileSafari =
    /Safari/.test(navigator.userAgent) &&
    !/Chrome/.test(navigator.userAgent) &&
    /iPhone|iPad|iPod/.test(navigator.userAgent);

  // On mobile Safari, use solid background instead of blur
  if (isMobileSafari) {
    return 'bg-background/95';
  }

  return `backdrop-blur-${intensity}`;
}

/**
 * Detect if device is likely low-powered
 * Useful for disabling expensive effects
 */
export function isLowPowerDevice(): boolean {
  if (typeof window === 'undefined') return false;

  // Check for reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return true;
  }

  // Check for low memory (if available)
  const nav = navigator as Navigator & { deviceMemory?: number };
  if (nav.deviceMemory && nav.deviceMemory < 4) {
    return true;
  }

  // Check for slow connection (if available)
  const connection = (
    navigator as Navigator & {
      connection?: { effectiveType?: string };
    }
  ).connection;
  if (connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') {
    return true;
  }

  return false;
}

/**
 * True on any iOS or iPadOS device, native app or browser.
 *
 * Not the same question as `useIsMobile()`, which is a 1024px VIEWPORT check.
 * The two were conflated in the certificate viewer and that is what ELE-1667
 * was: an iPad in landscape is 1180–1366px wide, so it counted as "desktop"
 * and was handed a `<iframe src="blob:…pdf">`. WKWebView — which backs both the
 * native app and every browser on iOS — cannot render a PDF from a blob URL in
 * an iframe, so the frame just sits there empty. iPhones were fine, because
 * they fell under the breakpoint and took the button path instead.
 *
 * ⚠️ iPadOS 13+ deliberately reports a desktop Safari user-agent
 * ("Macintosh; Intel Mac OS X"), so a `/iPad/` test alone silently misses every
 * modern iPad — the exact device in the bug report. The touch-point check is
 * what catches it: a real Mac reports `maxTouchPoints === 0`.
 */
export function isIOSDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) return true;
  return /Mac/.test(navigator.userAgent) && navigator.maxTouchPoints > 1;
}
