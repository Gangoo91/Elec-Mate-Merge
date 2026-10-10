/**
 * Opening an App Store / Google Play subscription for management.
 *
 * One place, so every "manage" or "cancel" button for a store subscriber
 * behaves the same. Five buttons used to link straight to Apple/Google
 * settings, past the RevenueCat Customer Center — the only screen that can
 * make a store subscriber a retention offer before they go. Only Settings →
 * Billing opened it, so in practice nobody saw it.
 *
 * The Customer Center needs the native module, so on the web or an old binary
 * without it we fall back to the store's own subscriptions page.
 */
import { Capacitor } from '@capacitor/core';
import { RevenueCatUI } from '@revenuecat/purchases-capacitor-ui';
import { openExternalUrl } from '@/utils/open-external-url';

export type StoreKind = 'app_store' | 'play_store';

/** The store that belongs to this device. */
export function deviceStore(): StoreKind {
  return Capacitor.getPlatform() === 'android' ? 'play_store' : 'app_store';
}

/**
 * The store that actually bills this person: the profile's
 * subscription_source when it names a store, otherwise this device's store.
 * The device alone is wrong for anyone who subscribed on another phone.
 */
export function billingStore(subscriptionSource?: string | null): StoreKind {
  if (subscriptionSource === 'app_store' || subscriptionSource === 'play_store') {
    return subscriptionSource;
  }
  return deviceStore();
}

export function storeName(store: StoreKind): string {
  return store === 'play_store' ? 'Google Play' : 'Apple';
}

export function storeSubscriptionsUrl(store: StoreKind = deviceStore()): string {
  return store === 'play_store'
    ? 'https://play.google.com/store/account/subscriptions'
    : 'https://apps.apple.com/account/subscriptions';
}

/**
 * Resolves once the Customer Center is dismissed, or once the store page has
 * been opened. Returns which one the user got, so callers can explain the
 * store-settings fallback ("Apple needs you to cancel from Settings…").
 */
export async function openStoreSubscriptionManager(
  store: StoreKind = deviceStore()
): Promise<'customer_center' | 'store_settings'> {
  // The Customer Center manages purchases made on THIS device's store. A Play
  // subscriber on an iPhone (or the reverse) is sent to the store that
  // actually bills them.
  if (Capacitor.isNativePlatform() && store === deviceStore()) {
    try {
      await RevenueCatUI.presentCustomerCenter();
      return 'customer_center';
    } catch (err) {
      console.warn(
        '[storeSubscriptionManager] Customer Center unavailable, using store settings',
        err
      );
    }
  }
  await openExternalUrl(storeSubscriptionsUrl(store));
  return 'store_settings';
}
