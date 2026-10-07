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
import { useLocation } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { supabase } from '@/integrations/supabase/client';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

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
  const { pathname } = useLocation();

  useEffect(() => {
    if (Capacitor.isNativePlatform()) return;
    if (!isAndroidBrowser()) return;
    if (recentlyDismissed()) return;

    let cancelled = false;
    supabase.auth.getSession().then(({ data }) => {
      // Public guide pages carry their own bottom bar, which now shows the
      // Google Play badge itself — a second bar would stack on top of it.
      const hasStickyCta = document.body?.classList.contains('has-sticky-cta');
      if (!cancelled && !data.session && !hasStickyCta) setVisible(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Not mid-sign-up: those screens have their own Continue bar in the same
  // spot, and someone creating an account on the web is already converting.
  const onAuthFlow = /^\/(auth|checkout-trial|complete-profile)/.test(pathname);
  // The landing page has its own sticky "Start your free week" bar in the
  // same spot, plus store badges — two bars would stack.
  // No bottom bar of any kind in the College Hub (Andrew, 7 Oct), including
  // its public join and set-up screens.
  const inCollegeHub = /^\/college(\/|$)/.test(pathname);
  if (!visible || onAuthFlow || inCollegeHub || pathname === '/') return null;

  const dismiss = () => {
    storageSetJSONSync(DISMISS_KEY, Date.now());
    setVisible(false);
  };

  // Volt card floating above the bottom edge (4 Oct 2026): no icon button,
  // no truncated copy — two short lines, the store button, and "Not now".
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 px-3 pt-2"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <div
        role="region"
        aria-label="Get the Elec-Mate app"
        className={cn(
          'relative mx-auto max-w-xl overflow-hidden rounded-2xl border border-white/[0.14] p-3.5',
          CARD_SURFACE,
          'bg-[hsl(0_0%_9%)] shadow-[0_18px_50px_rgba(0,0,0,0.6)]'
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0"
        />
        <div className="flex items-center gap-3">
          <img src="/logo.jpg" alt="" className="h-11 w-11 shrink-0 rounded-xl object-cover" />
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-bold leading-tight tracking-tight text-white">
              Elec-Mate for Android
            </p>
            <p className="mt-0.5 text-[12.5px] leading-snug text-white">
              Certificates, quotes and calcs in your pocket.
            </p>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={dismiss}
            className="h-11 flex-1 rounded-xl border border-white/[0.14] text-[14px] font-semibold text-white touch-manipulation active:scale-[0.98]"
          >
            Not now
          </button>
          <a
            href={PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 flex-[2] items-center justify-center rounded-xl bg-elec-yellow text-[14px] font-bold text-black touch-manipulation active:scale-[0.98]"
          >
            Get it on Google Play
          </a>
        </div>
      </div>
    </div>
  );
}
