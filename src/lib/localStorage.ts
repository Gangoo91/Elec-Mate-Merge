/**
 * Safe localStorage utilities for handling edge cases
 * - Private browsing mode detection
 * - Corrupted data handling
 * - Type-safe JSON parsing
 */

/**
 * Detect if localStorage is restricted (private browsing mode)
 * In private mode, localStorage.setItem() will throw an error
 */
export function isPrivateBrowsing(): boolean {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return false;
  } catch (e) {
    return true;
  }
}

/**
 * Safely get and parse JSON from localStorage
 * Handles:
 * - Missing keys (returns defaultValue)
 * - Corrupted/invalid JSON (clears key and returns defaultValue)
 * - Private browsing mode (returns defaultValue)
 *
 * @param key - localStorage key
 * @param defaultValue - Value to return if key doesn't exist or is invalid
 * @returns Parsed value or defaultValue
 */
export function safeGetJSON<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;

    try {
      return JSON.parse(item) as T;
    } catch (parseError) {
      // Corrupted data - remove it and log warning
      console.warn(`[localStorage] Corrupted data for key "${key}", clearing:`, parseError);
      localStorage.removeItem(key);
      return defaultValue;
    }
  } catch (e) {
    // localStorage not available (private browsing, etc.)
    console.warn(`[localStorage] Unable to access "${key}":`, e);
    return defaultValue;
  }
}

/**
 * Safely set JSON in localStorage
 * Handles:
 * - Private browsing mode (fails silently)
 * - Quota exceeded (logs warning)
 *
 * @param key - localStorage key
 * @param value - Value to stringify and store
 * @returns true if successful, false otherwise
 */
export function safeSetJSON<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e: any) {
    if (e?.name === 'QuotaExceededError') {
      console.warn(`[localStorage] Quota exceeded for key "${key}"`);
    } else {
      console.warn(`[localStorage] Unable to set "${key}":`, e);
    }
    return false;
  }
}

/**
 * Safely remove item from localStorage
 * Handles private browsing mode gracefully
 *
 * @param key - localStorage key to remove
 */
export function safeRemove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn(`[localStorage] Unable to remove "${key}":`, e);
  }
}

/**
 * Get raw string from localStorage safely
 *
 * @param key - localStorage key
 * @returns string value or null
 */
export function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.warn(`[localStorage] Unable to get "${key}":`, e);
    return null;
  }
}

/**
 * Set raw string in localStorage safely
 *
 * @param key - localStorage key
 * @param value - string value to store
 * @returns true if successful, false otherwise
 */
export function safeSet(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.warn(`[localStorage] Unable to set "${key}":`, e);
    return false;
  }
}

// ========================
// Elec-Mate specific keys
// ========================

export const STORAGE_KEYS = {
  PENDING_EMAIL: 'elec-mate-pending-email',
  PENDING_NAME: 'elec-mate-pending-name',
  ONBOARDING: 'elec-mate-onboarding',
  PENDING_ELECID: 'elec-mate-pending-elecid',
} as const;

/**
 * Get onboarding data safely
 */
export function getOnboardingData(): {
  role?: string;
  ecsCardType?: string;
  createElecId?: boolean;
  consent?: Record<string, any>;
  completedAt?: string;
} | null {
  return safeGetJSON(STORAGE_KEYS.ONBOARDING, null);
}

/**
 * Get pending Elec-ID data safely
 */
export function getPendingElecIdData(): {
  createElecId?: boolean;
  ecsCardType?: string;
  userId?: string;
} | null {
  return safeGetJSON(STORAGE_KEYS.PENDING_ELECID, null);
}

/**
 * Clear all signup-related localStorage data
 */
export function clearSignupData(): void {
  safeRemove(STORAGE_KEYS.PENDING_EMAIL);
  safeRemove(STORAGE_KEYS.PENDING_NAME);
  safeRemove(STORAGE_KEYS.ONBOARDING);
  safeRemove(STORAGE_KEYS.PENDING_ELECID);
}
