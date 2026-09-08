/**
 * useBiometricAuth.ts
 *
 * React hook wrapping biometric utility functions with reactive state.
 * Checks availability and user preference on mount, provides toggle/auth methods.
 */

import { useState, useEffect, useCallback } from 'react';
import {
  checkBiometricAvailability,
  isBiometricEnabled,
  setBiometricEnabled,
  storeCredentials,
  clearCredentials,
  authenticateAndGetCredentials,
  type BiometricAuthResult,
} from '@/utils/biometricAuth';

export interface UseBiometricAuth {
  /** Device supports biometric authentication */
  isAvailable: boolean;
  /** User has opted in to biometric login */
  isEnabled: boolean;
  /** Human-readable type: "Face ID" | "Touch ID" | "Fingerprint" etc. */
  biometricType: string;
  /** Still checking availability/preference on mount */
  isChecking: boolean;
  /** Store credentials and enable biometric login */
  enableBiometric: (email: string, password: string) => Promise<void>;
  /** Clear credentials and disable biometric login */
  disableBiometric: () => Promise<void>;
  /**
   * Prompt biometric then return stored credentials. `credentials` is null on
   * cancel, and null with `reason: 'credentials_lost'` when the secure-store
   * entry could not be read — in which case biometrics have been switched off
   * and `isEnabled` already reflects that (ELE-1677).
   */
  authenticateWithBiometric: () => Promise<BiometricAuthResult>;
}

export function useBiometricAuth(): UseBiometricAuth {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [biometricType, setBiometricType] = useState('None');
  const [isChecking, setIsChecking] = useState(true);

  // Check on mount
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const [availability, enabled] = await Promise.all([
        checkBiometricAvailability(),
        isBiometricEnabled(),
      ]);

      if (cancelled) return;

      setIsAvailable(availability.isAvailable);
      setBiometricType(availability.biometryType);
      setIsEnabled(enabled);
      setIsChecking(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const enableBiometric = useCallback(async (email: string, password: string) => {
    await storeCredentials(email, password);
    await setBiometricEnabled(true);
    setIsEnabled(true);
  }, []);

  const disableBiometric = useCallback(async () => {
    await clearCredentials();
    await setBiometricEnabled(false);
    setIsEnabled(false);
  }, []);

  const authenticateWithBiometric = useCallback(async () => {
    const result = await authenticateAndGetCredentials();
    if (result.reason === 'credentials_lost') setIsEnabled(false);
    return result;
  }, []);

  return {
    isAvailable,
    isEnabled,
    biometricType,
    isChecking,
    enableBiometric,
    disableBiometric,
    authenticateWithBiometric,
  };
}
