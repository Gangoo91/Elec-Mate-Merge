/**
 * biometricAuth.ts
 *
 * Standalone utility functions for native biometric authentication
 * (Face ID / Touch ID / Android Fingerprint). Uses capacitor-native-biometric
 * to verify identity and store/retrieve credentials in iOS Keychain / Android Keystore.
 *
 * All functions are safe to call on web — they return stubs when not on a native platform.
 */

import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { NativeBiometric, BiometryType } from '@capgo/capacitor-native-biometric';

const BIOMETRIC_PREF_KEY = 'elecmate_biometric_enabled';
const CREDENTIAL_SERVER = 'com.elecmate.app';

export interface BiometricAvailability {
  isAvailable: boolean;
  biometryType: string; // "Face ID" | "Touch ID" | "Fingerprint" | "Iris" | "None"
}

/**
 * Map the numeric BiometryType enum to a human-readable label.
 */
function biometryLabel(type: BiometryType): string {
  switch (type) {
    case BiometryType.FACE_ID:
      return 'Face ID';
    case BiometryType.TOUCH_ID:
      return 'Touch ID';
    case BiometryType.FINGERPRINT:
      return 'Fingerprint';
    case BiometryType.FACE_AUTHENTICATION:
      return 'Face Unlock';
    case BiometryType.IRIS_AUTHENTICATION:
      return 'Iris';
    default:
      return 'Biometrics';
  }
}

/**
 * Check whether biometric hardware is available and enrolled on this device.
 */
export async function checkBiometricAvailability(): Promise<BiometricAvailability> {
  if (!Capacitor.isNativePlatform()) {
    return { isAvailable: false, biometryType: 'None' };
  }

  try {
    const result = await NativeBiometric.isAvailable();
    return {
      isAvailable: result.isAvailable,
      biometryType: biometryLabel(result.biometryType),
    };
  } catch {
    return { isAvailable: false, biometryType: 'None' };
  }
}

/**
 * Read the user preference flag — has the user opted in to biometric login?
 */
export async function isBiometricEnabled(): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return false;

  try {
    const { value } = await Preferences.get({ key: BIOMETRIC_PREF_KEY });
    return value === 'true';
  } catch {
    return false;
  }
}

/**
 * Persist the user's biometric opt-in preference.
 */
export async function setBiometricEnabled(enabled: boolean): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;

  await Preferences.set({ key: BIOMETRIC_PREF_KEY, value: String(enabled) });
}

/**
 * Store email + password in the platform secure store (Keychain / Keystore).
 */
export async function storeCredentials(email: string, password: string): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;

  // ELE-1677 — always clear before writing.
  //
  // On iOS the plugin's setCredentials does SecItemAdd, and on
  // errSecDuplicateItem falls back to SecItemUpdate. After an iOS update a
  // stale Keychain entry can be visible to Add (duplicate) but not to Update
  // (errSecItemNotFound), which the plugin surfaces as "KeychainError error 0"
  // (`.noPassword`). Deleting first collapses that state; if the write still
  // fails, clear again and retry once before giving up.
  await clearCredentials();
  const write = () =>
    NativeBiometric.setCredentials({
      username: email,
      password,
      server: CREDENTIAL_SERVER,
    });
  try {
    await write();
  } catch {
    await clearCredentials();
    await write();
  }
}

/**
 * Remove stored credentials from the platform secure store.
 */
export async function clearCredentials(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;

  try {
    await NativeBiometric.deleteCredentials({ server: CREDENTIAL_SERVER });
  } catch {
    // Credentials may not exist — safe to ignore
  }
}

export interface BiometricCredentials {
  email: string;
  password: string;
}

/**
 * Why a biometric sign-in produced no credentials.
 *   - unavailable       — not a native platform
 *   - cancelled         — the user dismissed the prompt, or the biometric check failed
 *   - credentials_lost  — identity verified but the Keychain / Keystore entry could not be
 *                         read (typically after an OS update or a restore). The stale entry
 *                         and the opt-in flag have already been cleared so the next password
 *                         sign-in offers to re-enable biometrics.
 */
export type BiometricAuthResult =
  | { credentials: BiometricCredentials; reason?: undefined }
  | { credentials: null; reason: 'unavailable' | 'cancelled' | 'credentials_lost' };

/**
 * Prompt biometric verification then return stored credentials.
 *
 * ELE-1677 — this used to swallow every failure into `null`, so a Keychain
 * entry that had gone unreadable after an iOS update looked identical to the
 * user tapping Cancel: Face ID "wouldn't accept" with no way back except the
 * user working out on his own to type his password. A lost entry is now
 * reported as such, and cleaned up here, so callers can say what happened.
 */
export async function authenticateAndGetCredentials(): Promise<BiometricAuthResult> {
  if (!Capacitor.isNativePlatform()) return { credentials: null, reason: 'unavailable' };

  try {
    await NativeBiometric.verifyIdentity({
      reason: 'Sign in to Elec-Mate',
      title: 'Sign In',
      subtitle: 'Verify your identity',
      useFallback: true, // Allow device passcode as fallback
    });
  } catch {
    // User cancelled, or the biometric check itself failed.
    return { credentials: null, reason: 'cancelled' };
  }

  try {
    const credentials = await NativeBiometric.getCredentials({
      server: CREDENTIAL_SERVER,
    });
    if (credentials.username && credentials.password) {
      return { credentials: { email: credentials.username, password: credentials.password } };
    }
  } catch {
    // Fall through — the entry is missing or unreadable ("KeychainError error 0").
  }

  await clearCredentials();
  try {
    await setBiometricEnabled(false);
  } catch {
    // Preference write failed — the cleared credentials are the important part.
  }
  return { credentials: null, reason: 'credentials_lost' };
}
