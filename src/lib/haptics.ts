/**
 * The one switch for vibration (ELE-1805 — "too much haptic feedback").
 *
 * Haptics reach the device two ways, and neither went through one place:
 *  - `navigator.vibrate`, called directly from 22 files (and the web fallback
 *    in both haptic hooks);
 *  - the Capacitor Haptics plugin (Taptic Engine / Android vibrator), called
 *    from useHaptic, useHaptics and three components.
 *
 * Rather than edit 22 call sites (and miss the 23rd someone adds next month),
 * `installHapticsGate` wraps `navigator.vibrate` once at start-up so every web
 * vibration consults the setting. The plugin calls are few and each checks
 * `hapticsEnabled()` before firing. New code should use useHaptic.
 *
 * Stored per device: vibration is a property of the phone in your hand, and
 * the gate has to read it synchronously on every buzz. Default on.
 */
import { storageGetSync, storageSetSync } from '@/utils/storage';

const KEY = 'elec-mate-haptics-enabled';

export const hapticsEnabled = (): boolean => storageGetSync(KEY) !== 'false';

export const setHapticsEnabled = (enabled: boolean): void => {
  storageSetSync(KEY, enabled ? 'true' : 'false');
};

let installed = false;

/** Wrap navigator.vibrate so the setting covers every direct caller. */
export function installHapticsGate(): void {
  if (installed || typeof navigator === 'undefined') return;
  const original = typeof navigator.vibrate === 'function' ? navigator.vibrate.bind(navigator) : null;
  if (!original) return;
  installed = true;
  const gated: Navigator['vibrate'] = (pattern) => (hapticsEnabled() ? original(pattern) : false);
  try {
    Object.defineProperty(navigator, 'vibrate', { value: gated, configurable: true, writable: true });
  } catch {
    // Some engines refuse to redefine it; the hooks still check the setting.
    installed = false;
  }
}
