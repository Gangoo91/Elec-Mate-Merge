/**
 * app-version.ts
 *
 * Checks the current native app version against minimum and latest versions
 * stored in the Supabase `app_config` table. Returns whether the user needs
 * a force update (below minimum) or optional update (below latest).
 *
 * Only runs on native platforms (Capacitor iOS/Android).
 * Results are cached for 1 hour to avoid spamming the database.
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { supabase } from '@/integrations/supabase/client';

export interface VersionCheckResult {
  currentVersion: string;
  latestVersion: string;
  minimumVersion: string;
  needsForceUpdate: boolean;
  needsOptionalUpdate: boolean;
}

const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

let cachedResult: VersionCheckResult | null = null;
let cachedAt = 0;

/**
 * Compare two semver-style version strings (e.g. "1.2.3" vs "1.3.0").
 * Returns -1 if a < b, 0 if equal, 1 if a > b.
 */
export function compareVersions(a: string, b: string): number {
  const partsA = a.split('.').map(Number);
  const partsB = b.split('.').map(Number);
  const len = Math.max(partsA.length, partsB.length);

  for (let i = 0; i < len; i++) {
    const segA = partsA[i] || 0;
    const segB = partsB[i] || 0;
    if (segA < segB) return -1;
    if (segA > segB) return 1;
  }

  return 0;
}

/**
 * Fetch version config from Supabase `app_config` table.
 * Expects rows with keys: `minimum_app_version` and `latest_app_version`.
 */
async function fetchVersionConfig(): Promise<{ minimumVersion: string; latestVersion: string } | null> {
  const { data, error } = await supabase
    .from('app_config')
    .select('key, value')
    .in('key', ['minimum_app_version', 'latest_app_version']);

  if (error || !data || data.length === 0) {
    console.warn('[app-version] Failed to fetch app config:', error?.message);
    return null;
  }

  const config: Record<string, string> = {};
  for (const row of data) {
    config[row.key] = row.value;
  }

  const minimumVersion = config['minimum_app_version'];
  const latestVersion = config['latest_app_version'];

  if (!minimumVersion || !latestVersion) {
    console.warn('[app-version] Missing version config keys in app_config table');
    return null;
  }

  return { minimumVersion, latestVersion };
}

/**
 * Perform a full version check. Returns null if not on native or if the
 * check fails (network error, missing config, etc.).
 */
export async function checkAppVersion(): Promise<VersionCheckResult | null> {
  if (!Capacitor.isNativePlatform()) return null;

  // Return cached result if still fresh
  if (cachedResult && Date.now() - cachedAt < CACHE_DURATION_MS) {
    return cachedResult;
  }

  try {
    const [appInfo, versionConfig] = await Promise.all([
      App.getInfo(),
      fetchVersionConfig(),
    ]);

    if (!versionConfig) return null;

    const currentVersion = appInfo.version; // e.g. "1.0.1"
    const { minimumVersion, latestVersion } = versionConfig;

    const result: VersionCheckResult = {
      currentVersion,
      latestVersion,
      minimumVersion,
      needsForceUpdate: compareVersions(currentVersion, minimumVersion) < 0,
      needsOptionalUpdate:
        compareVersions(currentVersion, minimumVersion) >= 0 &&
        compareVersions(currentVersion, latestVersion) < 0,
    };

    // Cache the result
    cachedResult = result;
    cachedAt = Date.now();

    return result;
  } catch (err) {
    console.warn('[app-version] Version check failed:', err);
    return null;
  }
}

/**
 * React hook that checks the app version on mount and on Capacitor resume.
 * Only runs on native platforms.
 */
export function useAppVersionCheck(): {
  versionStatus: VersionCheckResult | null;
  checking: boolean;
} {
  const [versionStatus, setVersionStatus] = useState<VersionCheckResult | null>(null);
  const [checking, setChecking] = useState(false);
  const mountedRef = useRef(true);

  const runCheck = useCallback(async () => {
    if (!Capacitor.isNativePlatform()) return;

    setChecking(true);
    try {
      const result = await checkAppVersion();
      if (mountedRef.current) {
        setVersionStatus(result);
      }
    } finally {
      if (mountedRef.current) {
        setChecking(false);
      }
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    // Check on mount
    runCheck();

    // Check on app resume (user returns from background)
    let removeListener: (() => void) | undefined;

    if (Capacitor.isNativePlatform()) {
      App.addListener('resume', () => {
        // Invalidate cache on resume so we get a fresh check
        cachedAt = 0;
        runCheck();
      }).then((handle) => {
        removeListener = () => handle.remove();
      });
    }

    return () => {
      mountedRef.current = false;
      removeListener?.();
    };
  }, [runCheck]);

  return { versionStatus, checking };
}
