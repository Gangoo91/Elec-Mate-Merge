import { useState, useEffect, useCallback, useRef } from 'react';
import { Capacitor } from '@capacitor/core';
import { Purchases, type PurchasesPackage, LOG_LEVEL } from '@revenuecat/purchases-capacitor';
import { useHaptic } from '@/hooks/useHaptic';

// RevenueCat public API keys (loaded from .env — not secret, safe for client-side)
const RC_IOS_API_KEY = import.meta.env.VITE_REVENUECAT_IOS_KEY || '';
const RC_ANDROID_API_KEY = import.meta.env.VITE_REVENUECAT_ANDROID_KEY || '';

// Multi-tier entitlement IDs — must match RevenueCat dashboard entitlement names
// Priority order: highest tier first (used to resolve the "best" entitlement)
const ENTITLEMENT_IDS = ['mate', 'electrician', 'apprentice'] as const;
export type RevenueCatTier = (typeof ENTITLEMENT_IDS)[number] | null;

// Map entitlement IDs to human-readable tier names (must match profiles.subscription_tier values)
const TIER_DISPLAY_NAMES: Record<string, string> = {
  mate: 'Mate',
  electrician: 'Electrician Pro',
  apprentice: 'Apprentice',
};

// Legacy entitlement from single-tier era — still checked for backwards compatibility
const LEGACY_ENTITLEMENT_ID = 'Elec-Mate Pro';

// Aliases for plan IDs that don't match RevenueCat package naming
const TIER_ALIASES: Record<string, string> = {
  'business-ai': 'mate',
};

interface RevenueCatState {
  isInitialised: boolean;
  isProEntitled: boolean;
  activeTier: RevenueCatTier;
  availablePackages: PurchasesPackage[];
  isPurchasing: boolean;
  error: string | null;
}

export function useRevenueCat(userId?: string) {
  const isNative = Capacitor.isNativePlatform();
  const initRef = useRef(false);
  const attachedUserIdRef = useRef<string | undefined>(undefined);
  const haptic = useHaptic();

  const [state, setState] = useState<RevenueCatState>({
    isInitialised: false,
    isProEntitled: false,
    activeTier: null,
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

        await Purchases.setLogLevel({ level: LOG_LEVEL.WARN });
        await Purchases.configure({
          apiKey,
          ...(userId ? { appUserID: userId } : {}),
          // Let SDK auto-select best StoreKit version (SK1 is deprecated on iOS 26+)
          diagnosticsEnabled: true,
        });

        if (userId) attachedUserIdRef.current = userId;
        initRef.current = true;

        // Fetch initial entitlements & offerings
        await checkEntitlements();
        await loadOfferings();
      } catch (err) {
        console.error('RevenueCat init error:', err);
        setState((prev) => ({
          ...prev,
          error: err instanceof Error ? err.message : String(err),
        }));
      } finally {
        // Always mark initialised so the UI can show retry / error states
        setState((prev) => ({ ...prev, isInitialised: true }));
      }
    };

    init();
  }, [isNative, userId]);

  // If RC was initialised anonymously and userId arrives later, attach the real user
  // so purchases are attributed correctly and the webhook receives the Supabase user ID
  useEffect(() => {
    if (!isNative || !initRef.current || !userId) return;
    if (attachedUserIdRef.current === userId) return; // already attached

    const attach = async () => {
      try {
        await Purchases.logIn({ appUserID: userId });
        attachedUserIdRef.current = userId;
        console.log('[RevenueCat] Attached userId after anonymous init:', userId);
      } catch (err) {
        console.warn('[RevenueCat] logIn failed:', err);
        // Continue anyway — anonymous purchases still work, just won't be attributed
      }

      // Always refresh entitlements and offerings after attach attempt
      // (even if logIn failed, offerings may now be available)
      try {
        await checkEntitlements();
        await loadOfferings();
      } catch (err) {
        console.warn('[RevenueCat] Post-attach refresh failed:', err);
      }
    };

    attach();
  }, [isNative, userId]);

  // Resolve the highest-priority active entitlement from customerInfo
  const resolveActiveTier = useCallback(
    (
      activeEntitlements: Record<string, unknown>
    ): { isEntitled: boolean; tier: RevenueCatTier } => {
      // Check multi-tier entitlements (highest priority first)
      for (const entId of ENTITLEMENT_IDS) {
        if (activeEntitlements[entId] !== undefined) {
          return { isEntitled: true, tier: entId };
        }
      }
      // Fallback: legacy single entitlement (users who purchased before multi-tier migration)
      if (activeEntitlements[LEGACY_ENTITLEMENT_ID] !== undefined) {
        return { isEntitled: true, tier: 'electrician' }; // Legacy Pro maps to Electrician
      }
      return { isEntitled: false, tier: null };
    },
    []
  );

  // Check which entitlements the user has
  const checkEntitlements = useCallback(async (): Promise<boolean> => {
    if (!isNative) return false;

    try {
      const { customerInfo } = await Purchases.getCustomerInfo();
      const { isEntitled, tier } = resolveActiveTier(customerInfo.entitlements.active);

      setState((prev) => ({ ...prev, isProEntitled: isEntitled, activeTier: tier, error: null }));
      return isEntitled;
    } catch (err) {
      console.error('RevenueCat entitlement check error:', err);
      setState((prev) => ({
        ...prev,
        error: err instanceof Error ? err.message : String(err),
      }));
      return false;
    }
  }, [isNative, resolveActiveTier]);

  // Load available offerings/packages
  const loadOfferings = useCallback(async () => {
    if (!isNative) return;

    try {
      const offerings = await Purchases.getOfferings();
      const current = offerings?.current;

      if (current?.availablePackages && current.availablePackages.length > 0) {
        setState((prev) => ({
          ...prev,
          availablePackages: current.availablePackages,
          error: null, // clear any previous offerings error
        }));
      } else {
        console.warn(
          '[RevenueCat] No current offering or packages returned — check RevenueCat dashboard + App Store Connect'
        );
        setState((prev) => ({
          ...prev,
          error:
            prev.availablePackages.length > 0
              ? null // keep existing packages if we had them
              : 'No subscription plans available. This is usually temporary — please try again.',
        }));
      }
    } catch (err) {
      console.error('RevenueCat offerings error:', err);
      setState((prev) => ({
        ...prev,
        error:
          prev.availablePackages.length > 0
            ? null // keep existing packages, don't show error
            : err instanceof Error
              ? err.message
              : 'Failed to load subscription plans. Please try again.',
      }));
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

        const { isEntitled, tier } = resolveActiveTier(customerInfo.entitlements.active);

        setState((prev) => ({
          ...prev,
          isProEntitled: isEntitled,
          activeTier: tier,
          isPurchasing: false,
        }));

        if (isEntitled) haptic.success(); // celebratory thud on successful purchase

        return isEntitled;
      } catch (err: unknown) {
        // User cancelled — not an error, but surface a friendly message so
        // the UI can let them retry instead of sitting silently.
        if (
          err &&
          typeof err === 'object' &&
          'userCancelled' in err &&
          (err as Record<string, unknown>).userCancelled
        ) {
          setState((prev) => ({
            ...prev,
            isPurchasing: false,
            error: 'Purchase was cancelled. Tap the button to try again.',
          }));
          return false;
        }

        console.error('RevenueCat purchase error:', err);
        haptic.error(); // error buzz on purchase failure
        setState((prev) => ({
          ...prev,
          isPurchasing: false,
          error: err instanceof Error ? err.message : String(err),
        }));
        return false;
      }
    },
    [isNative, resolveActiveTier]
  );

  // Restore purchases (required by Apple for all subscription apps)
  const restorePurchases = useCallback(async (): Promise<boolean> => {
    if (!isNative) return false;

    setState((prev) => ({ ...prev, isPurchasing: true, error: null }));

    try {
      const { customerInfo } = await Purchases.restorePurchases();
      const { isEntitled, tier } = resolveActiveTier(customerInfo.entitlements.active);

      setState((prev) => ({
        ...prev,
        isProEntitled: isEntitled,
        activeTier: tier,
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
  }, [isNative, resolveActiveTier]);

  // Find the package matching a given plan ID (e.g. 'apprentice-monthly')
  const getPackageForPlan = useCallback(
    (planId: string): PurchasesPackage | undefined => {
      // Convert dashes to underscores to match RC package identifiers
      // e.g. 'apprentice-monthly' → 'apprentice_monthly'
      const normalised = planId.replace(/-/g, '_');
      const tierKey = planId.replace(/-(?:monthly|yearly)$/, '');
      const resolvedKey = TIER_ALIASES[tierKey] || tierKey;
      const resolvedNormalised = normalised.replace(
        tierKey,
        TIER_ALIASES[tierKey] || tierKey
      );

      return (
        // 1. Exact match with underscores (e.g. 'apprentice_monthly')
        state.availablePackages.find((pkg) => pkg.identifier === normalised) ||
        // 2. Exact match with resolved alias (e.g. 'business-ai-monthly' → 'mate_monthly')
        state.availablePackages.find((pkg) => pkg.identifier === resolvedNormalised) ||
        // 3. Match on full plan ID including period (e.g. includes 'apprentice_monthly')
        state.availablePackages.find((pkg) =>
          pkg.identifier.toLowerCase().includes(resolvedKey.replace(/-/g, '_') + '_' + (planId.includes('yearly') ? 'yearly' : 'monthly'))
        ) ||
        // 4. Last resort: exact match on original plan ID
        state.availablePackages.find((pkg) => pkg.identifier === planId)
      );
    },
    [state.availablePackages]
  );

  return {
    isNative,
    isInitialised: state.isInitialised,
    isProEntitled: state.isProEntitled,
    activeTier: state.activeTier,
    activeTierDisplayName: state.activeTier
      ? (TIER_DISPLAY_NAMES[state.activeTier] ?? state.activeTier)
      : null,
    availablePackages: state.availablePackages,
    isPurchasing: state.isPurchasing,
    error: state.error,
    checkEntitlements,
    purchasePackage,
    restorePurchases,
    loadOfferings,
    getPackageForPlan,
  };
}
