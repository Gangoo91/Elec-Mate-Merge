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
  /** Prompt biometric then return stored credentials (or null on cancel) */
  authenticateWithBiometric: () => Promise<{ email: string; password: string } | null>;
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
    return authenticateAndGetCredentials();
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
