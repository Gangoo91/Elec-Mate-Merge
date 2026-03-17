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
import { NativeBiometric, BiometryType } from 'capacitor-native-biometric';

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

  await NativeBiometric.setCredentials({
    username: email,
    password,
    server: CREDENTIAL_SERVER,
  });
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

/**
 * Prompt biometric verification then return stored credentials.
 * Returns `null` if the user cancels, biometric fails, or no credentials are stored.
 */
export async function authenticateAndGetCredentials(): Promise<{
  email: string;
  password: string;
} | null> {
  if (!Capacitor.isNativePlatform()) return null;

  try {
    await NativeBiometric.verifyIdentity({
      reason: 'Sign in to Elec-Mate',
      title: 'Sign In',
      subtitle: 'Verify your identity',
      useFallback: true, // Allow device passcode as fallback
    });

    const credentials = await NativeBiometric.getCredentials({
      server: CREDENTIAL_SERVER,
    });

    if (credentials.username && credentials.password) {
      return { email: credentials.username, password: credentials.password };
    }

    return null;
  } catch {
    // User cancelled or biometric failed
    return null;
  }
}
