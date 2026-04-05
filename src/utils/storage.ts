/**
 * storage.ts
 *
 * Platform-aware storage abstraction. Uses Capacitor Preferences on native
 * (persisted to disk, survives iOS WKWebView cache clears) and falls back
 * to localStorage on web.
 *
 * Provides both async (preferred) and sync (migration convenience) APIs.
 * The sync API reads from an in-memory cache that is primed at app startup.
 */

import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

const isNative = Capacitor.isNativePlatform();

// In-memory cache for sync reads on native. Primed at startup.
const cache = new Map<string, string>();

/**
 * Prime the in-memory cache from Capacitor Preferences.
 * Call this once at app startup (in main.tsx) before any sync reads.
 * Only loads keys that are already known — new keys are cached on write.
 */
export async function primeStorageCache(): Promise<void> {
  if (!isNative) return;

  try {
    const { keys } = await Preferences.keys();
    const results = await Promise.all(
      keys.map(async (key) => {
        const { value } = await Preferences.get({ key });
        return { key, value };
      })
    );
    for (const { key, value } of results) {
      if (value !== null) {
        cache.set(key, value);
      }
    }
  } catch (err) {
    console.warn('[storage] Failed to prime cache:', err);
  }
}

// ─── Async API (preferred) ───────────────────────────────────────────────────

export async function storageGet(key: string): Promise<string | null> {
  if (isNative) {
    const { value } = await Preferences.get({ key });
    return value;
  }
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export async function storageSet(key: string, value: string): Promise<void> {
  if (isNative) {
    cache.set(key, value);
    await Preferences.set({ key, value });
    return;
  }
  try {
    localStorage.setItem(key, value);
  } catch (e: any) {
    if (e?.name === 'QuotaExceededError') {
      console.warn(`[storage] Quota exceeded for key "${key}"`);
    }
  }
}

export async function storageRemove(key: string): Promise<void> {
  if (isNative) {
    cache.delete(key);
    await Preferences.remove({ key });
    return;
  }
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export async function storageGetJSON<T>(key: string, defaultValue: T): Promise<T> {
  const raw = await storageGet(key);
  if (raw === null) return defaultValue;
  try {
    return JSON.parse(raw) as T;
  } catch {
    console.warn(`[storage] Corrupted data for key "${key}", clearing`);
    await storageRemove(key);
    return defaultValue;
  }
}

export async function storageSetJSON<T>(key: string, value: T): Promise<void> {
  await storageSet(key, JSON.stringify(value));
}

// ─── Sync API (for migration / initialState) ────────────────────────────────
// On native, reads from the in-memory cache (primed at startup).
// On web, reads from localStorage directly.

export function storageGetSync(key: string): string | null {
  if (isNative) {
    return cache.get(key) ?? null;
  }
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function storageSetSync(key: string, value: string): void {
  if (isNative) {
    cache.set(key, value);
    // Fire-and-forget persist to native storage
    Preferences.set({ key, value }).catch((err) =>
      console.warn('[storage] setSync persist failed:', err)
    );
    return;
  }
  try {
    localStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

export function storageRemoveSync(key: string): void {
  if (isNative) {
    cache.delete(key);
    Preferences.remove({ key }).catch((err) =>
      console.warn('[storage] removeSync persist failed:', err)
    );
    return;
  }
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export function storageGetJSONSync<T>(key: string, defaultValue: T): T {
  const raw = storageGetSync(key);
  if (raw === null) return defaultValue;
  try {
    return JSON.parse(raw) as T;
  } catch {
    console.warn(`[storage] Corrupted data for key "${key}", clearing`);
    storageRemoveSync(key);
    return defaultValue;
  }
}

export function storageSetJSONSync<T>(key: string, value: T): void {
  storageSetSync(key, JSON.stringify(value));
}
