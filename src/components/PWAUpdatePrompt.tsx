import { useEffect, useState, useSyncExternalStore } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { isReloadHeld, STALE_BUILD_EVENT, subscribeReloadHold } from '@/lib/reloadGuard';

const UPDATE_CHECK_INTERVAL = 60 * 60 * 1000; // Check for updates every hour

/** Set only by the Update button — the one thing allowed to reload the page. */
let userAskedToUpdate = false;

/** The open page's main script, e.g. /assets/index-AbC123.js. */
function entryScript(doc: Document): string | null {
  const el = doc.querySelector<HTMLScriptElement>('script[type="module"][src*="/assets/index-"]');
  if (!el) return null;
  try {
    return new URL(el.getAttribute('src') ?? '', location.origin).pathname;
  } catch {
    return null;
  }
}

/**
 * Is the open page already the live build? Navigation is network-first
 * (sw.ts), so anyone who opened or refreshed the app after a deploy is ALREADY
 * running it — only the offline copy (the waiting worker) is behind. Asking
 * them to "update" would be a pointless card after every deploy.
 *
 * Answers by comparing this page's main script with the live index.html's.
 * `null` when it can't tell (offline, dev, odd markup).
 */
async function pageIsLiveBuild(): Promise<boolean | null> {
  const mine = entryScript(document);
  if (!mine || navigator.onLine === false) return null;
  try {
    // The query keeps it out of the precache; no-store keeps it off disk.
    const res = await fetch(`/?__build_check=${Date.now()}`, {
      cache: 'no-store',
      credentials: 'same-origin',
    });
    if (!res.ok) return null;
    const live = entryScript(new DOMParser().parseFromString(await res.text(), 'text/html'));
    return live ? live === mine : null;
  } catch {
    return null;
  }
}

/**
 * The only thing that may reload the page for a new version — and only when
 * the user taps it (Andrzej, 7 Oct 2026: the old autoUpdate reloaded tabs
 * mid-exam after every deploy).
 *
 * Two cases:
 *   - a new version is installed and waiting (`needRefresh`). Shown whenever
 *     nothing is holding reloads; hidden mid-paper (lib/reloadGuard).
 *   - this page's build is out of date and something failed to load while a
 *     hold was on (STALE_BUILD_EVENT). Shown even mid-paper, because it is the
 *     way out — the paper is saved, so a reload brings it back.
 */
export function PWAUpdatePrompt() {
  // Only show "New version ready" once we KNOW this page is behind — the
  // check takes a moment, and the card must not flash up meanwhile.
  const [behind, setBehind] = useState(false);
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    // The plugin reloads when the new worker takes control. Only allow that
    // when the user asked for it — a silent switch (below) must never reload.
    onNeedReload() {
      if (userAskedToUpdate) window.location.reload();
    },
    onNeedRefresh() {
      // A page already on the live build just needs the offline copy brought
      // up to date: do it quietly, no card, no reload.
      void pageIsLiveBuild().then((live) => {
        if (live) {
          setNeedRefresh(false);
          void updateServiceWorker(false);
        } else if (live === null && navigator.onLine === false) {
          // Offline: nothing to switch to yet; the next check tries again.
          setNeedRefresh(false);
        } else {
          // Behind (or can't tell while online — then err on offering it).
          setBehind(true);
        }
      });
    },
    onRegisteredSW(swUrl, registration) {
      console.log('SW Registered:', swUrl);
      if (registration) {
        // Periodically check for updates (catches new deploys during long sessions).
        // A found update now only WAITS — it never reloads the page by itself.
        // `registration.update()` can reject when the sw.js fetch fails — typically a
        // transient network blip, an in-flight deploy that swapped chunk hashes, or
        // a cached SW pointing at a removed file. The next tick (or a user refresh)
        // recovers automatically, so we swallow the rejection here to avoid
        // polluting Sentry with `Script .../sw.js load failed` (was Sentry issues
        // 2H/2S — 12 users / 79 events combined).
        setInterval(() => {
          registration.update().catch((err) => {
            // Keep visibility in dev / breadcrumb trail without escalating.
            console.debug('[SW] periodic update failed (recoverable):', err);
          });
        }, UPDATE_CHECK_INTERVAL);
      }
    },
    onRegisterError(error) {
      // VitePWA already swallows these into this callback rather than letting them
      // bubble — but log for breadcrumb visibility.
      console.log('SW registration error', error);
    },
  });

  const held = useSyncExternalStore(subscribeReloadHold, isReloadHeld, () => false);
  const [stale, setStale] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const onStale = () => setStale(true);
    window.addEventListener(STALE_BUILD_EVENT, onStale);
    return () => window.removeEventListener(STALE_BUILD_EVENT, onStale);
  }, []);

  const showStale = stale;
  const showUpdate = !stale && needRefresh && behind && !held;
  if (!showStale && !showUpdate) return null;

  const reload = () => {
    setBusy(true);
    userAskedToUpdate = true;
    if (needRefresh) {
      // Activates the waiting worker; onNeedReload reloads once it has control.
      void updateServiceWorker(true);
      // Belt and braces: if the worker never takes over, reload anyway.
      setTimeout(() => window.location.reload(), 4000);
    } else {
      window.location.reload();
    }
  };

  const close = () => {
    setStale(false);
    setNeedRefresh(false);
    setBehind(false);
  };

  const title = showStale ? 'This page is out of date' : 'New version ready';
  const body = showStale
    ? held
      ? 'Your progress is saved. Reload when you’re ready and you’ll carry on where you were.'
      : 'Part of the page couldn’t load. Reload to get the latest version.'
    : 'Tap Update to switch now, or it’ll switch over next time you open Elec-Mate.';

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-4 bottom-[calc(env(safe-area-inset-bottom,0px)+5.5rem)] z-50 sm:inset-x-auto sm:right-4 sm:bottom-4 sm:w-[22rem] rounded-2xl border border-white/[0.14] bg-[#171717] p-4 shadow-2xl animate-in slide-in-from-bottom-5"
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-elec-yellow/15">
          <RefreshCw className="h-[18px] w-[18px] text-elec-yellow" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold text-white">{title}</p>
          <p className="mt-1 text-[13px] leading-snug text-white">{body}</p>
          <div className="mt-3 flex gap-2">
            <Button
              size="sm"
              onClick={reload}
              disabled={busy}
              className="h-11 flex-1 bg-elec-yellow font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation"
            >
              {busy ? 'Updating…' : showStale ? 'Reload' : 'Update'}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={close}
              aria-label="Not now"
              className="h-11 w-11 border-white/[0.14] bg-transparent text-white hover:bg-white/[0.06] touch-manipulation"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
