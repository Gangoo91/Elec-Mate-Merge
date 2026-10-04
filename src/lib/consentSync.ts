/**
 * Keeps profiles.ad_tracking_consent in step with the person's marketing
 * choice, so server-side Meta events (Stripe / RevenueCat webhooks) only fire
 * for people who opted in — ELE-1812, 4 Oct 2026.
 *
 * Sources of the choice:
 *  - web: the cookie banner / Settings → Privacy (both dispatch
 *    `cookieConsentUpdated` and store `elec-mate-cookie-preferences`)
 *  - apps: the in-app privacy prompt (NativeTrackingPrompt), which on iPhone
 *    is followed by Apple's App Tracking Transparency dialog.
 *
 * Called once from App.tsx.
 */
import { supabase } from '@/integrations/supabase/client';
import { storageGetJSONSync } from '@/utils/storage';

const PREFS_KEY = 'elec-mate-cookie-preferences';

export async function saveAdTrackingConsent(consent: boolean, source: string): Promise<void> {
  const { data } = await supabase.auth.getSession();
  const userId = data.session?.user.id;
  if (!userId) return;
  await supabase
    .from('profiles')
    .update({
      ad_tracking_consent: consent,
      ad_tracking_consent_at: new Date().toISOString(),
      ad_tracking_consent_source: source,
    } as never)
    .eq('id', userId);
}

let started = false;
export function initConsentSync(): void {
  if (started || typeof window === 'undefined') return;
  started = true;

  window.addEventListener('cookieConsentUpdated', (e: Event) => {
    const prefs = (e as CustomEvent<{ marketing?: boolean }>).detail;
    void saveAdTrackingConsent(prefs?.marketing === true, 'web_cookie_banner');
  });

  // A choice made while signed out (cookie banner before sign-up) is carried
  // onto the account when they sign in.
  supabase.auth.onAuthStateChange((event) => {
    if (event !== 'SIGNED_IN') return;
    const prefs = storageGetJSONSync<{ marketing?: boolean } | null>(PREFS_KEY, null);
    if (prefs) void saveAdTrackingConsent(prefs.marketing === true, 'web_cookie_banner');
  });
}
