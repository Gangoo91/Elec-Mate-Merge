/**
 * capacitorStorage.ts
 *
 * A Supabase-compatible async storage adapter backed by @capacitor/preferences.
 * Replaces localStorage for the Supabase auth client when running natively so
 * sessions survive WKWebView (iOS) and WebView (Android) cache clears.
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

/**
 * Async Capacitor Preferences storage — persists across WebView resets on iOS/Android.
 */
const capacitorStorage: SupabaseStorageAdapter = {
  async getItem(key: string) {
    const { value } = await Preferences.get({ key });
    return value;
  },
  async setItem(key: string, value: string) {
    await Preferences.set({ key, value });
  },
  async removeItem(key: string) {
    await Preferences.remove({ key });
  },
};

/**
 * Returns Capacitor Preferences on native platforms, localStorage on web.
 * Import this and pass it as `storage` in createClient({ auth: { storage } }).
 */
export const authStorage: SupabaseStorageAdapter = Capacitor.isNativePlatform()
  ? capacitorStorage
  : localStorage;
