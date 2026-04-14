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
 * Fetch version config from the `app_versions` table (per-platform). Each
 * row is tagged with `is_current = true` for the latest approved build.
 * `min_supported_version` forces an update when the installed version is
 * lower than it.
 */
async function fetchVersionConfig(): Promise<{
  minimumVersion: string;
  latestVersion: string;
} | null> {
  const platform = Capacitor.getPlatform() as 'ios' | 'android';

  const { data, error } = await supabase
    .from('app_versions')
    .select('version, min_supported_version')
    .eq('platform', platform)
    .eq('is_current', true)
    .maybeSingle();

  if (error || !data) {
    console.warn('[app-version] Failed to fetch app version row:', error?.message);
    return null;
  }

  const row = data as { version: string; min_supported_version?: string };
  const latestVersion = row.version;
  // If min_supported_version isn't set, default to the current version so
  // we never accidentally force-update everyone.
  const minimumVersion = row.min_supported_version || row.version;

  if (!latestVersion) {
    console.warn('[app-version] Missing version value on app_versions row');
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
    const [appInfo, versionConfig] = await Promise.all([App.getInfo(), fetchVersionConfig()]);

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
