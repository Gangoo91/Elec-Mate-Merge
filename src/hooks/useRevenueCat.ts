import { useState, useEffect, useCallback, useRef } from 'react';
import { Capacitor } from '@capacitor/core';
import { Purchases, type PurchasesPackage, LOG_LEVEL } from '@revenuecat/purchases-capacitor';
import { useHaptic } from '@/hooks/useHaptic';
import { trackInitiateCheckout, trackSubscribe } from '@/lib/marketing-pixels';

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

// Detect the store signalling "you already own this" — Play Billing
// ITEM_ALREADY_OWNED / StoreKit, surfaced by RevenueCat as
// PRODUCT_ALREADY_PURCHASED_ERROR ("6") or RECEIPT_ALREADY_IN_USE_ERROR ("7").
// Happens when a subscription exists on the store account but isn't attached to
// the current RevenueCat user (e.g. bought anonymously before sign-in). ELE-1231.
function isAlreadyOwnedError(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false;
  const e = err as Record<string, unknown>;
  const code = String(e.code ?? '');
  const readable = String(e.readableErrorCode ?? '').toLowerCase();
  const text = `${String(e.message ?? '')} ${String(e.underlyingErrorMessage ?? '')}`.toLowerCase();
  return (
    code === '6' ||
    code === '7' ||
    readable.includes('alreadypurchased') ||
    readable.includes('alreadyinuse') ||
    (/already/.test(text) && /(own|subscrib|purchas)/.test(text))
  );
}

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
          // Android: surface Google Play prepaid plans alongside auto-renewing ones
          pendingTransactionsForPrepaidPlansEnabled: true,
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

  // Pull any existing store purchase into the current RevenueCat user and
  // re-resolve entitlement. Recovers a subscription the app didn't recognise:
  // anonymous-before-login purchase, Android Play sync lag, or "already owned".
  // ELE-1231.
  const recoverEntitlement = useCallback(async (): Promise<{
    isEntitled: boolean;
    tier: RevenueCatTier;
  }> => {
    try {
      await Purchases.syncPurchases();
    } catch (e) {
      console.warn('[RevenueCat] syncPurchases during recovery failed:', e);
    }
    try {
      const { customerInfo } = await Purchases.restorePurchases();
      return resolveActiveTier(customerInfo.entitlements.active);
    } catch (e) {
      console.warn('[RevenueCat] restorePurchases during recovery failed:', e);
      try {
        const { customerInfo } = await Purchases.getCustomerInfo();
        return resolveActiveTier(customerInfo.entitlements.active);
      } catch {
        return { isEntitled: false, tier: null };
      }
    }
  }, [resolveActiveTier]);

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

      // Fire InitiateCheckout before the native payment sheet appears. Web-only
      // pixels — on native, attribution is handled by RevenueCat's ad-network
      // integrations (Meta / Google Ads) configured in the RC dashboard.
      const priceStr = pkg.product?.priceString || '';
      const priceNum =
        typeof pkg.product?.price === 'number'
          ? pkg.product.price
          : Number(priceStr.replace(/[^0-9.]/g, '')) || 0;
      trackInitiateCheckout({
        value: priceNum,
        currency: pkg.product?.currencyCode || 'GBP',
        contentName: pkg.identifier,
        contentIds: [pkg.product?.identifier || pkg.identifier],
      });

      try {
        const { customerInfo } = await Purchases.purchasePackage({
          aPackage: pkg,
        });

        // Force-sync Play Billing / StoreKit → RevenueCat so the webhook fires
        // against the latest state before the UI declares success
        try {
          await Purchases.syncPurchases();
        } catch (syncErr) {
          console.warn('[RevenueCat] syncPurchases after purchase failed:', syncErr);
        }

        let { isEntitled, tier } = resolveActiveTier(customerInfo.entitlements.active);

        // Android: the entitlement can lag a completed purchase while Google
        // Play syncs to RevenueCat. Recover via sync+restore before declaring
        // failure so the user isn't bounced back to the paywall. ELE-1231.
        if (!isEntitled) {
          const recovered = await recoverEntitlement();
          isEntitled = recovered.isEntitled;
          tier = recovered.tier;
        }

        setState((prev) => ({
          ...prev,
          isProEntitled: isEntitled,
          activeTier: tier,
          isPurchasing: false,
          error: isEntitled
            ? null
            : 'Your payment went through but is taking a moment to activate. Reopen the app shortly, or tap Restore purchase.',
        }));

        if (isEntitled) {
          haptic.success(); // celebratory thud on successful purchase
          // Fire browser-side Subscribe for lookalike audiences; server CAPI
          // fires from revenuecat-webhook (authoritative).
          trackSubscribe({
            value: priceNum,
            currency: pkg.product?.currencyCode || 'GBP',
            contentName: tier || pkg.identifier,
            subscriptionId: pkg.product?.identifier || pkg.identifier,
          });
        }

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

        // Already-owned: the store account holds the subscription but it isn't
        // attached to this RevenueCat user (commonly an anonymous purchase made
        // before sign-in). Attach it via restore instead of failing. ELE-1231.
        if (isAlreadyOwnedError(err)) {
          const recovered = await recoverEntitlement();
          if (recovered.isEntitled) {
            haptic.success();
            trackSubscribe({
              value: priceNum,
              currency: pkg.product?.currencyCode || 'GBP',
              contentName: recovered.tier || pkg.identifier,
              subscriptionId: pkg.product?.identifier || pkg.identifier,
            });
            setState((prev) => ({
              ...prev,
              isProEntitled: true,
              activeTier: recovered.tier,
              isPurchasing: false,
              error: null,
            }));
            return true;
          }
          setState((prev) => ({
            ...prev,
            isPurchasing: false,
            error:
              'You already have an active subscription on this account, but we could not activate it automatically. Tap Restore purchase below, or email info@elec-mate.com.',
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
    [isNative, resolveActiveTier, recoverEntitlement]
  );

  // Restore purchases (required by Apple for all subscription apps)
  const restorePurchases = useCallback(async (): Promise<boolean> => {
    if (!isNative) return false;

    setState((prev) => ({ ...prev, isPurchasing: true, error: null }));

    try {
      try {
        await Purchases.syncPurchases();
      } catch (syncErr) {
        console.warn('[RevenueCat] syncPurchases during restore failed:', syncErr);
      }
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
      const resolvedNormalised = normalised.replace(tierKey, TIER_ALIASES[tierKey] || tierKey);

      const match =
        // 1. Exact match with underscores (e.g. 'apprentice_monthly')
        state.availablePackages.find((pkg) => pkg.identifier === normalised) ||
        // 2. Exact match with resolved alias (e.g. 'business-ai-monthly' → 'mate_monthly')
        state.availablePackages.find((pkg) => pkg.identifier === resolvedNormalised) ||
        // 3. Match on full plan ID including period (e.g. includes 'apprentice_monthly')
        state.availablePackages.find((pkg) =>
          pkg.identifier
            .toLowerCase()
            .includes(
              resolvedKey.replace(/-/g, '_') +
                '_' +
                (planId.includes('yearly') ? 'yearly' : 'monthly')
            )
        ) ||
        // 4. Last resort: exact match on original plan ID
        state.availablePackages.find((pkg) => pkg.identifier === planId);

      if (!match) {
        console.warn(
          '[RevenueCat] No package matched for plan',
          planId,
          '— searched for',
          { normalised, resolvedNormalised, resolvedKey },
          'available packages:',
          state.availablePackages.map((p) => p.identifier)
        );
      }

      return match;
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
