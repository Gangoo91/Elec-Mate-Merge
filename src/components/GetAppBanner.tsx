/**
 * GetAppBanner — Android web → Play Store install bar.
 *
 * iOS already gets Safari's native Smart App Banner via the
 * `apple-itunes-app` meta tag in index.html; Android has no built-in
 * equivalent, so this is it. Shown only to signed-out Android visitors on
 * the mobile web (the SEO traffic we want converting into installs) —
 * signed-in users live inside the app shell where a fixed bar would fight
 * the bottom navigation.
 *
 * Dismissal is remembered for 30 days in localStorage.
 */

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { supabase } from '@/integrations/supabase/client';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';

const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.elecmate.app';
const DISMISS_KEY = 'elec_mate_get_app_banner_dismissed_at';
const DISMISS_DAYS = 30;

function isAndroidBrowser(): boolean {
  return /android/i.test(navigator.userAgent);
}

function recentlyDismissed(): boolean {
  const at = storageGetJSONSync<number | null>(DISMISS_KEY, null);
  if (!at) return false;
  return (Date.now() - at) / (1000 * 60 * 60 * 24) < DISMISS_DAYS;
}

export default function GetAppBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) return;
    if (!isAndroidBrowser()) return;
    if (recentlyDismissed()) return;

    let cancelled = false;
    supabase.auth.getSession().then(({ data }) => {
      if (!cancelled && !data.session) setVisible(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.14] bg-[#0a0a0a]/95 backdrop-blur"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto flex max-w-xl items-center gap-3 px-4 py-3">
        <img
          src="/pwa-192x192.png"
          alt=""
          className="h-10 w-10 rounded-xl"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-semibold text-white">Elec-Mate app</p>
          <p className="truncate text-[12px] font-medium text-white">
            Certs, quotes and calcs — free on Google Play
          </p>
        </div>
        <a
          href={PLAY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="h-11 shrink-0 rounded-xl bg-elec-yellow px-4 text-[14px] font-semibold leading-[44px] text-black touch-manipulation"
        >
          Get the app
        </a>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => {
            storageSetJSONSync(DISMISS_KEY, Date.now());
            setVisible(false);
          }}
          className="flex h-11 w-11 shrink-0 items-center justify-center text-white touch-manipulation"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
