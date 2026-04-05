/**
 * geolocation.ts
 *
 * Platform-aware geolocation wrapper. Uses the Capacitor Geolocation plugin
 * on native (better permission handling, background location support) and
 * falls back to the browser Geolocation API on web.
 */

import { Capacitor } from '@capacitor/core';
import { Geolocation as CapGeolocation } from '@capacitor/geolocation';

export interface Position {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export interface GetCurrentPositionOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

/**
 * Get the current position using Capacitor on native, browser API on web.
 */
export async function getCurrentPosition(
  options: GetCurrentPositionOptions = {}
): Promise<Position> {
  const { enableHighAccuracy = true, timeout = 10000, maximumAge = 60000 } = options;

  if (Capacitor.isNativePlatform()) {
    // Capacitor plugin — handles permissions natively
    const result = await CapGeolocation.getCurrentPosition({
      enableHighAccuracy,
      timeout,
      maximumAge,
    });
    return {
      latitude: result.coords.latitude,
      longitude: result.coords.longitude,
      accuracy: result.coords.accuracy,
    };
  }

  // Web fallback
  if (!navigator.geolocation) {
    throw new Error('Geolocation not supported');
  }

  return new Promise<Position>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        }),
      reject,
      { enableHighAccuracy, timeout, maximumAge }
    );
  });
}

/**
 * Check / request geolocation permissions (native only).
 * On web, returns 'granted' since permission is handled inline by the browser.
 */
export async function checkPermissions(): Promise<'granted' | 'denied' | 'prompt'> {
  if (!Capacitor.isNativePlatform()) return 'granted';

  const status = await CapGeolocation.checkPermissions();
  return status.location as 'granted' | 'denied' | 'prompt';
}

export async function requestPermissions(): Promise<'granted' | 'denied' | 'prompt'> {
  if (!Capacitor.isNativePlatform()) return 'granted';

  const status = await CapGeolocation.requestPermissions();
  return status.location as 'granted' | 'denied' | 'prompt';
}
