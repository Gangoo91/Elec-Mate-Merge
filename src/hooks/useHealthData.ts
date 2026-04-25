/**
 * Apple Health / Google Fit bridge for the mental health hub.
 *
 * Today this returns `available: false` everywhere — the native package
 * (`@capacitor-community/health` or similar) hasn't been installed yet, and
 * iOS / Android both need plist + manifest permission strings that can only
 * land via a real native build.
 *
 * Once installed, the implementation should swap the dynamic import below
 * for the real plugin, request HealthKit / Google Fit auth on first use, and
 * map the platform results into the same `HealthSnapshot` shape so the rest
 * of the app doesn't change.
 */

import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';

export interface HealthSnapshot {
  date: string;
  sleepHours: number | null;
  steps: number | null;
  hrv: number | null; // ms
  source: 'apple-health' | 'google-fit' | 'manual' | 'unknown';
}

export interface HealthBridge {
  available: boolean;
  authorised: boolean;
  loading: boolean;
  snapshot: HealthSnapshot | null;
  /** Triggers the native auth prompt. No-op when not available. */
  requestAccess: () => Promise<boolean>;
  /** Re-pulls the latest 24h snapshot. No-op when not available. */
  refresh: () => Promise<void>;
}

const PLATFORM_NAMES: Record<string, HealthSnapshot['source']> = {
  ios: 'apple-health',
  android: 'google-fit',
};

export function useHealthData(): HealthBridge {
  const [authorised, setAuthorised] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snapshot, setSnapshot] = useState<HealthSnapshot | null>(null);

  const platform = Capacitor.getPlatform();
  const available = platform === 'ios' || platform === 'android';

  useEffect(() => {
    if (!available) return;
    // The real plugin is not yet installed. When it lands, replace this
    // dynamic-import probe with the real plugin's `isAvailable()` check.
    setAuthorised(false);
  }, [available]);

  const requestAccess = async () => {
    if (!available) return false;
    // TODO: replace with `Health.requestAuthorization({ read: ['sleep', 'steps', 'hrv'] })`
    return false;
  };

  const refresh = async () => {
    if (!available || !authorised) return;
    setLoading(true);
    try {
      // TODO: real plugin call — for now leave snapshot null
      setSnapshot({
        date: new Date().toISOString().split('T')[0],
        sleepHours: null,
        steps: null,
        hrv: null,
        source: PLATFORM_NAMES[platform] ?? 'unknown',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    available,
    authorised,
    loading,
    snapshot,
    requestAccess,
    refresh,
  };
}
