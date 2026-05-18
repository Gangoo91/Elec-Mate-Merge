import { useEffect, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

interface SEOStickyMobileCTAProps {
  /** Button label. Defaults to "Start 7-Day Free Trial". */
  label?: string;
  /** Where the CTA goes. Defaults to /auth/signup. */
  href?: string;
  /** Show after scrolling this many px. Defaults to 600. */
  appearAfterScroll?: number;
  /** Storage key for dismiss state — namespaced per CTA variant. */
  dismissKey?: string;
}

/**
 * Sticky mobile CTA bar — appears on mobile only after the user has scrolled
 * past the hero. Single high-contrast button to /auth/signup.
 *
 * Why it exists:
 *  - End-of-page CTA only converts users who actually reach the bottom
 *  - Mobile is the majority of SEO traffic (electricians on site)
 *  - Sticky CTAs typically lift signup conversion 2-4x on mobile vs static
 *
 * Dismissible (X button) — respects the user, only re-prompts after 7 days
 * via localStorage TTL.
 */
export function SEOStickyMobileCTA({
  label = 'Start 7-Day Free Trial',
  href = '/auth/signup',
  appearAfterScroll = 600,
  dismissKey = 'seo-sticky-cta-v1',
}: SEOStickyMobileCTAProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Restore dismiss state on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(dismissKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        const sevenDays = 1000 * 60 * 60 * 24 * 7;
        if (parsed?.at && Date.now() - parsed.at < sevenDays) {
          setDismissed(true);
        }
      }
    } catch {
      /* localStorage unavailable — ignore */
    }
  }, [dismissKey]);

  // Show after the user has scrolled past the hero
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > appearAfterScroll) {
        setVisible(true);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [appearAfterScroll]);

  // Hide while the user is typing in any input — prevents the sticky bar
  // covering the email field on the inline lead magnet (and any other form).
  const [inputFocused, setInputFocused] = useState(false);
  useEffect(() => {
    const onFocusIn = (e: FocusEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) {
        setInputFocused(true);
      }
    };
    const onFocusOut = (e: FocusEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) {
        setInputFocused(false);
      }
    };
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    return () => {
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(dismissKey, JSON.stringify({ at: Date.now() }));
    } catch {
      /* ignore */
    }
  };

  if (dismissed || !visible || inputFocused) return null;

  return (
    <div
      role="region"
      aria-label="Sign up call to action"
      className="fixed inset-x-0 bottom-0 z-50 sm:hidden pointer-events-none"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="mx-3 mb-3 rounded-2xl bg-elec-gray/95 backdrop-blur border border-yellow-500/30 shadow-2xl pointer-events-auto">
        <div className="flex items-center gap-2 p-3">
          <a
            href={href}
            className="flex-1 flex items-center justify-center gap-2 h-12 px-4 bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-400 text-black font-semibold rounded-xl touch-manipulation transition-colors"
          >
            {label}
            <ArrowRight className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss"
            className="flex items-center justify-center h-12 w-12 rounded-xl text-white/70 hover:text-white hover:bg-white/5 touch-manipulation transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
