/**
 * capacitorStorage.ts
 *
 * A Supabase-compatible storage adapter backed by @capacitor/preferences.
 * Uses a sync-first hybrid approach: an in-memory Map serves getItem()
 * synchronously, while writes persist to Capacitor Preferences in the
 * background. This prevents the race condition where GoTrue's internal
 * session bootstrap calls getItem() before an async Preferences.get()
 * can resolve — the root cause of ELE-398 (session lost on app close).
 *
 * On web the Supabase client falls back to localStorage as normal.
 */

import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

export interface SupabaseStorageAdapter {
  getItem(key: string): string | null | Promise<string | null>;
  setItem(key: string, value: string): void | Promise<void>;
  removeItem(key: string): void | Promise<void>;
}

// In-memory cache — primed from Preferences before createClient() runs.
const cache = new Map<string, string>();

// The Supabase auth keys that need to be pre-loaded for session restoration.
// GoTrue stores the session under a key like `sb-<ref>-auth-token`.
const AUTH_KEY_PREFIX = 'sb-jtwygbeceundfgnkirof-auth-token';

/**
 * Prime the in-memory cache from Capacitor Preferences.
 * MUST be awaited before `createClient()` is called (in main.tsx).
 */
export async function primeAuthCache(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;

  try {
    // Load the primary auth token key
    const { value } = await Preferences.get({ key: AUTH_KEY_PREFIX });
    if (value) {
      cache.set(AUTH_KEY_PREFIX, value);
    }

    // Also load any code-verifier key used by PKCE flow
    const codeVerifierKey = `${AUTH_KEY_PREFIX}-code-verifier`;
    const { value: codeVerifier } = await Preferences.get({ key: codeVerifierKey });
    if (codeVerifier) {
      cache.set(codeVerifierKey, codeVerifier);
    }
  } catch (err) {
    console.warn('[capacitorStorage] Failed to prime auth cache:', err);
  }
}

/**
 * Sync-first Capacitor storage adapter.
 * getItem returns synchronously from the in-memory cache.
 * setItem/removeItem update both the cache and Capacitor Preferences.
 */
const capacitorStorage: SupabaseStorageAdapter = {
  getItem(key: string): string | null {
    return cache.get(key) ?? null;
  },
  setItem(key: string, value: string): void {
    cache.set(key, value);
    // Fire-and-forget persist to native storage
    Preferences.set({ key, value }).catch((err) =>
      console.warn('[capacitorStorage] setItem persist failed:', err)
    );
  },
  removeItem(key: string): void {
    cache.delete(key);
    // Fire-and-forget remove from native storage
    Preferences.remove({ key }).catch((err) =>
      console.warn('[capacitorStorage] removeItem persist failed:', err)
    );
  },
};

/**
 * Returns Capacitor Preferences on native platforms, localStorage on web.
 * Import this and pass it as `storage` in createClient({ auth: { storage } }).
 */
export const authStorage: SupabaseStorageAdapter = Capacitor.isNativePlatform()
  ? capacitorStorage
  : localStorage;
