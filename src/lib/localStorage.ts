/**
 * Safe storage utilities — thin wrappers around the platform-aware storage
 * abstraction (Capacitor Preferences on native, localStorage on web).
 *
 * These functions preserve the same API so existing callers don't need to
 * change their signatures.
 */

import {
  storageGetSync,
  storageSetSync,
  storageRemoveSync,
  storageGetJSONSync,
  storageSetJSONSync,
} from '@/utils/storage';

/**
 * Detect if localStorage is restricted (private browsing mode)
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

export function safeGetJSON<T>(key: string, defaultValue: T): T {
  return storageGetJSONSync(key, defaultValue);
}

export function safeSetJSON<T>(key: string, value: T): boolean {
  try {
    storageSetJSONSync(key, value);
    return true;
  } catch {
    return false;
  }
}

export function safeRemove(key: string): void {
  storageRemoveSync(key);
}

export function safeGet(key: string): string | null {
  return storageGetSync(key);
}

export function safeSet(key: string, value: string): boolean {
  try {
    storageSetSync(key, value);
    return true;
  } catch {
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
