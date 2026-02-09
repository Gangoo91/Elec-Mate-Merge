import { useState, useEffect, useCallback, useRef } from 'react';
import { Capacitor } from '@capacitor/core';
import { Purchases, type PurchasesPackage, LOG_LEVEL } from '@revenuecat/purchases-capacitor';

// RevenueCat public API keys (loaded from .env — not secret, safe for client-side)
const RC_IOS_API_KEY = import.meta.env.VITE_REVENUECAT_IOS_KEY || '';
const RC_ANDROID_API_KEY = import.meta.env.VITE_REVENUECAT_ANDROID_KEY || '';

const ENTITLEMENT_ID = 'Elec-Mate Pro';

interface RevenueCatState {
  isInitialised: boolean;
  isProEntitled: boolean;
  availablePackages: PurchasesPackage[];
  isPurchasing: boolean;
  error: string | null;
}

export function useRevenueCat(userId?: string) {
  const isNative = Capacitor.isNativePlatform();
  const initRef = useRef(false);

  const [state, setState] = useState<RevenueCatState>({
    isInitialised: false,
    isProEntitled: false,
    availablePackages: [],
    isPurchasing: false,
    error: null,
  });

  // Initialise RevenueCat SDK — only on native platforms
  useEffect(() => {
    if (!isNative || initRef.current) return;

    const init = async () => {
      try {
        const platform = Capacitor.getPlatform();
        const apiKey = platform === 'ios' ? RC_IOS_API_KEY : RC_ANDROID_API_KEY;

        await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
        await Purchases.configure({
          apiKey,
          ...(userId ? { appUserID: userId } : {}),
        });

        initRef.current = true;
        setState((prev) => ({ ...prev, isInitialised: true }));

        // Fetch initial entitlements & offerings
        await checkEntitlements();
        await loadOfferings();
      } catch (err) {
        console.error('RevenueCat init error:', err);
        setState((prev) => ({
          ...prev,
          error: err instanceof Error ? err.message : String(err),
        }));
      }
    };

    init();
  }, [isNative, userId]);

  // Check if user has pro_access entitlement
  const checkEntitlements = useCallback(async (): Promise<boolean> => {
    if (!isNative) return false;

    try {
      const { customerInfo } = await Purchases.getCustomerInfo();
      const isEntitled = customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;

      setState((prev) => ({ ...prev, isProEntitled: isEntitled, error: null }));
      return isEntitled;
    } catch (err) {
      console.error('RevenueCat entitlement check error:', err);
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : String(err),
      }));
      return false;
    }
  }, [isNative]);

  // Load available offerings/packages
  const loadOfferings = useCallback(async () => {
    if (!isNative) return;

    try {
      const { offerings } = await Purchases.getOfferings();
      const current = offerings?.current;

      if (current?.availablePackages) {
        setState((prev) => ({
          ...prev,
          availablePackages: current.availablePackages,
        }));
      }
    } catch (err) {
      console.error('RevenueCat offerings error:', err);
    }
  }, [isNative]);

  // Purchase a package (triggers native Apple/Google payment sheet)
  const purchasePackage = useCallback(
    async (pkg: PurchasesPackage): Promise<boolean> => {
      if (!isNative) return false;

      setState((prev) => ({ ...prev, isPurchasing: true, error: null }));

      try {
        const { customerInfo } = await Purchases.purchasePackage({
          aPackage: pkg,
        });

        const isEntitled = customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;

        setState((prev) => ({
          ...prev,
          isProEntitled: isEntitled,
          isPurchasing: false,
        }));

        return isEntitled;
      } catch (err: any) {
        // User cancelled — not an error
        if (err?.userCancelled) {
          setState((prev) => ({ ...prev, isPurchasing: false }));
          return false;
        }

        console.error('RevenueCat purchase error:', err);
        setState((prev) => ({
          ...prev,
          isPurchasing: false,
          error: err instanceof Error ? err.message : String(err),
        }));
        return false;
      }
    },
    [isNative]
  );

  // Restore purchases (required by Apple for all subscription apps)
  const restorePurchases = useCallback(async (): Promise<boolean> => {
    if (!isNative) return false;

    setState((prev) => ({ ...prev, isPurchasing: true, error: null }));

    try {
      const { customerInfo } = await Purchases.restorePurchases();
      const isEntitled = customerInfo.entitlements.active[ENTITLEMENT_ID] !== undefined;

      setState((prev) => ({
        ...prev,
        isProEntitled: isEntitled,
        isPurchasing: false,
      }));

      return isEntitled;
    } catch (err) {
      console.error('RevenueCat restore error:', err);
      setState((prev) => ({
        ...prev,
        isPurchasing: false,
        error: err instanceof Error ? err.message : String(err),
      }));
      return false;
    }
  }, [isNative]);

  return {
    isNative,
    isInitialised: state.isInitialised,
    isProEntitled: state.isProEntitled,
    availablePackages: state.availablePackages,
    isPurchasing: state.isPurchasing,
    error: state.error,
    checkEntitlements,
    purchasePackage,
    restorePurchases,
    loadOfferings,
  };
}
