import { useState, useEffect } from 'react';
import { Check, Copy, ExternalLink, MoreHorizontal, X } from 'lucide-react';
import { copyToClipboard } from '@/utils/clipboard';

/**
 * Nudges people out of an in-app browser (Facebook, Instagram, Gmail…) and into
 * a real one, where sign-in, payments and file downloads actually behave.
 *
 * The honest bit
 * --------------
 * There is NO way to leave an iOS in-app browser programmatically. The previous
 * version pretended otherwise: it navigated to `x-safari-<url>` — a trick Apple
 * has largely closed — and fell back to `window.open(url, '_system')`, where
 * `_system` is a Capacitor target with no meaning on the web, so it just opened
 * another tab inside Facebook. The button did nothing, and the small print
 * underneath quietly admitted it by telling people to use the ••• menu anyway.
 *
 * So the action is now platform-specific and each one is real:
 *   - Android: an `intent://` URL genuinely hands off to Chrome. Kept.
 *   - iOS: copy the link. That always works, and the ••• instruction is
 *     promoted from apologetic footnote to the actual route out.
 *
 * Tone matters too. This is the first thing a visitor from a social ad sees, so
 * it leads with what they get rather than confessing that someone else's
 * browser is poor.
 */
export function InAppBrowserDetector() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [browserName, setBrowserName] = useState('');
  const [copied, setCopied] = useState(false);

  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = typeof navigator !== 'undefined' && /Android/.test(navigator.userAgent);

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || '';

    const inAppBrowsers = [
      { pattern: /FBAN|FBAV/i, name: 'Facebook' },
      { pattern: /Instagram/i, name: 'Instagram' },
      { pattern: /LinkedInApp/i, name: 'LinkedIn' },
      { pattern: /Twitter/i, name: 'Twitter' },
      { pattern: /Snapchat/i, name: 'Snapchat' },
      { pattern: /TikTok/i, name: 'TikTok' },
      // Gmail's in-app WebView (GSA = Google app shell on iOS) can silently
      // stall fetch calls — and invite links arrive by email, so this is the
      // browser invitees actually open them in (ELE-1286)
      { pattern: /GSA\/|Gmail/i, name: 'Gmail' },
    ];

    for (const browser of inAppBrowsers) {
      if (browser.pattern.test(ua)) {
        setBrowserName(browser.name);
        if (!sessionStorage.getItem('inapp-browser-dismissed')) setShowPrompt(true);
        break;
      }
    }
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem('inapp-browser-dismissed', 'true');
    setShowPrompt(false);
  };

  // Android only — this one genuinely leaves the in-app browser.
  const handleOpenInChrome = () => {
    const url = window.location.href;
    window.location.href = `intent://${url.replace(/^https?:\/\//, '')}#Intent;scheme=https;action=android.intent.action.VIEW;end`;
  };

  const handleCopyLink = async () => {
    const ok = await copyToClipboard(window.location.href);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!showPrompt) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end justify-center bg-black/70 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inapp-browser-title"
    >
      {/* Edge-to-edge sheet on a phone, inset card from sm: up. */}
      <div className="w-full max-w-md space-y-5 rounded-t-2xl border-t border-white/[0.14] bg-zinc-950 p-5 pb-7 sm:rounded-2xl sm:border sm:pb-5">
        <div className="flex items-start justify-between gap-4">
          <h2
            id="inapp-browser-title"
            className="text-[19px] font-semibold tracking-tight text-white"
          >
            Open Elec-Mate in {isIOS ? 'Safari' : 'your browser'}
          </h2>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss"
            className="-m-2 p-2 text-white touch-manipulation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-[15px] leading-relaxed text-white">
          Signing in, payments and saving certificates all work properly there. The {browserName}{' '}
          browser blocks some of it.
        </p>

        {isAndroid ? (
          <button
            type="button"
            onClick={handleOpenInChrome}
            className="flex h-11 w-full touch-manipulation items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black active:scale-[0.98] transition-transform"
          >
            <ExternalLink className="h-4 w-4" />
            Open in browser
          </button>
        ) : (
          <>
            {/* iOS: the ••• menu IS the way out, so it leads. */}
            <div className="flex items-center gap-3 rounded-xl border border-white/[0.12] bg-white/[0.06] p-3">
              <MoreHorizontal className="h-5 w-5 shrink-0 text-elec-yellow" />
              <p className="text-[14px] leading-snug text-white">
                Tap <span className="font-semibold">•••</span> at the top right, then{' '}
                <span className="font-semibold">Open in browser</span>
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyLink}
              className="flex h-11 w-full touch-manipulation items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black active:scale-[0.98] transition-transform"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Link copied — paste it in Safari' : 'Copy link instead'}
            </button>
          </>
        )}

        {/* Dismissal is a quiet way out, not a button competing with the action. */}
        <button
          type="button"
          onClick={handleDismiss}
          className="h-11 w-full touch-manipulation text-[14px] font-medium text-white underline underline-offset-4"
        >
          Continue here anyway
        </button>
      </div>
    </div>
  );
}

export default InAppBrowserDetector;
