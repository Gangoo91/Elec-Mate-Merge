import { useEffect, useState } from 'react';

/**
 * LTI launch handoff page.
 *
 * The `/functions/v1/lti-launch` edge function redirects here with a Supabase
 * magic-link URL in `?magic=`. This page:
 *   1. Breaks out of any LMS iframe (so the magic-link `Set-Cookie` lands
 *      first-party on our domain instead of being blocked as third-party).
 *   2. Navigates to the magic-link URL.
 *
 * Cannot live in an edge function because Supabase's edge runtime enforces a
 * maximally-restrictive `sandbox` CSP that blocks scripts.
 */
export default function LtiHandoff() {
  const [manualFallback, setManualFallback] = useState(false);
  const params = new URLSearchParams(window.location.search);
  const magic = params.get('magic');
  const correlationId = params.get('cid');

  useEffect(() => {
    if (!magic) return;

    let fired = false;
    try {
      const inIframe = window.top && window.top !== window.self;
      if (inIframe) {
        try {
          window.top!.location.href = magic;
          fired = true;
        } catch {
          // Cross-origin iframe access blocked — fall through to manual fallback.
        }
      } else {
        window.location.replace(magic);
        fired = true;
      }
    } catch {
      // ignore
    }

    // Show manual "continue" button after a short delay if auto-redirect failed.
    const t = setTimeout(() => {
      if (!fired) setManualFallback(true);
    }, 600);
    return () => clearTimeout(t);
  }, [magic]);

  if (!magic) {
    return (
      <div className="min-h-screen bg-background text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-8 text-center">
          <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
            LTI Launch
          </div>
          <h1 className="mt-1 text-lg font-semibold">Missing launch token</h1>
          <p className="mt-3 text-sm text-white/60">
            This page needs a <code className="bg-white/10 px-1.5 py-0.5 rounded">magic</code> query
            parameter. Return to your LMS and click the Elec-Mate link again.
          </p>
          {correlationId && (
            <p className="mt-3 text-[11px] text-white/40 font-mono">ref: {correlationId}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-8 text-center">
        <div
          className="mx-auto mb-5 h-9 w-9 rounded-full border-[3px] border-white/10 border-t-elec-yellow animate-spin"
          aria-hidden
        />
        <h1 className="text-base font-semibold">Opening Elec-Mate…</h1>
        <p className="mt-2 text-[13px] text-white/60">
          Finalising your secure sign-in from the LMS.
        </p>
        {manualFallback && (
          <a
            href={magic}
            target="_top"
            rel="noopener"
            className="mt-5 inline-block px-5 py-2.5 rounded-full bg-elec-yellow hover:bg-elec-yellow/90 text-black text-sm font-medium touch-manipulation"
          >
            Continue →
          </a>
        )}
        {correlationId && (
          <p className="mt-6 text-[11px] text-white/30 font-mono">ref: {correlationId}</p>
        )}
      </div>
    </div>
  );
}
