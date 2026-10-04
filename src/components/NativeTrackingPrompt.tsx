/**
 * In-app privacy choice for the iPhone and Android apps (ELE-1812, 4 Oct 2026).
 *
 * The web asks through the cookie banner; the apps had no way to ask at all,
 * so server-side Meta events fired for app purchases with nobody's consent.
 * This asks once, after sign-in, in plain words. On iPhone, "Allow" is
 * followed by Apple's own App Tracking Transparency dialog — Apple's answer is
 * final (if they decline there, we record no consent).
 *
 * Volt sheet: no icon, two buttons, "Not now" as the equal-weight choice.
 */
import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { storageGetSync, storageSetSync, storageSetJSONSync } from '@/utils/storage';
import { saveAdTrackingConsent } from '@/lib/consentSync';
import { cn } from '@/lib/utils';
import { buttonPrimaryCn, buttonSecondaryCn } from '@/components/forms/fieldStyles';

const ASKED_KEY = 'elec-mate-native-tracking-asked';
const PREFS_KEY = 'elec-mate-cookie-preferences';

async function requestAppleTracking(): Promise<boolean> {
  if (Capacitor.getPlatform() !== 'ios') return true;
  try {
    const { AppTrackingTransparency } = await import('@capgo/capacitor-app-tracking-transparency');
    const { status } = await AppTrackingTransparency.requestPermission();
    return status === 'authorized';
  } catch {
    // Older build without the native plugin — treat as no consent.
    return false;
  }
}

export function NativeTrackingPrompt() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!Capacitor.isNativePlatform() || !user) return;
    if (storageGetSync(ASKED_KEY)) return;
    // Let the dashboard settle first — never the first thing on screen.
    const t = window.setTimeout(() => setOpen(true), 4000);
    return () => window.clearTimeout(t);
  }, [user]);

  const record = async (allowed: boolean) => {
    storageSetSync(ASKED_KEY, new Date().toISOString());
    setOpen(false);
    let consent = allowed;
    if (allowed) consent = await requestAppleTracking();
    storageSetJSONSync(PREFS_KEY, { essential: true, analytics: false, marketing: consent });
    await saveAdTrackingConsent(
      consent,
      Capacitor.getPlatform() === 'ios' ? 'ios_att' : 'android_prompt'
    );
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && void record(false)}>
      <SheetContent
        side="bottom"
        className="rounded-t-2xl border-t border-elec-yellow/35 bg-background p-0"
      >
        <div className="px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6">
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
            Your privacy
          </p>
          <h2 className="mt-1.5 text-[22px] font-bold tracking-tight text-white">
            Can we measure our adverts?
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-white">
            If you allow it, we tell Meta (Facebook and Instagram) when someone who saw our advert
            subscribes, using a scrambled copy of your email. It helps us spend less on adverts that
            don’t work. It doesn’t change anything in the app, and you can change your mind in
            Settings → Privacy.
          </p>
          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={() => void record(false)}
              className={cn(buttonSecondaryCn, 'flex-1')}
            >
              Not now
            </button>
            <button
              type="button"
              onClick={() => void record(true)}
              className={cn(buttonPrimaryCn, 'flex-1')}
            >
              Allow
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
