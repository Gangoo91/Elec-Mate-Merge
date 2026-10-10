/* ==========================================================================
   Sign in with Microsoft (ELE-1971): Entra ID through Supabase Auth's
   'azure' provider, for college staff and learners on college accounts.

   The button only shows once the provider is switched on in Supabase (read
   from the public /auth/v1/settings endpoint), so there is never a button
   that can only fail. After Microsoft, Supabase returns to /auth/microsoft,
   which links the person to their college if the college already listed
   them (sso_claim_my_college) and sends them to the right place.
   Web only until the native deep-link return is built.
   ========================================================================== */

import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { supabase, SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';
import { buttonSecondaryCn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';

let enabledPromise: Promise<boolean> | null = null;

/** Is the Azure (Microsoft) provider enabled on the Supabase project? */
export function fetchMicrosoftEnabled(): Promise<boolean> {
  if (!enabledPromise) {
    enabledPromise = fetch(`${SUPABASE_URL}/auth/v1/settings`, {
      headers: { apikey: SUPABASE_PUBLISHABLE_KEY },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((j: { external?: { azure?: boolean } } | null) => !!j?.external?.azure)
      .catch(() => {
        enabledPromise = null;
        return false;
      });
  }
  return enabledPromise;
}

export function useMicrosoftSignInEnabled(): boolean | null {
  const [on, setOn] = useState<boolean | null>(null);
  useEffect(() => {
    let cancelled = false;
    void fetchMicrosoftEnabled().then((v) => {
      if (!cancelled) setOn(v);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return on;
}

export async function signInWithMicrosoft(): Promise<string | null> {
  const redirectTo = `${window.location.origin}/auth/microsoft`;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'azure',
    options: {
      // `email` is required for Entra to return the address Supabase stores.
      scopes: 'openid profile email offline_access',
      redirectTo,
    },
  });
  return error ? error.message : null;
}

function MicrosoftMark() {
  return (
    <svg viewBox="0 0 21 21" className="h-4 w-4" aria-hidden="true">
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  );
}

export function MicrosoftSignInButton({ className }: { className?: string }) {
  const enabled = useMicrosoftSignInEnabled();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Web only for now: the native app needs a deep-link return (see
  // docs/college-microsoft-sign-in-setup.md), so it keeps email sign-in.
  if (!enabled || Capacitor.isNativePlatform()) return null;
  return (
    <div className="space-y-2">
      <button
        type="button"
        data-testid="microsoft-sign-in"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          setError(null);
          const err = await signInWithMicrosoft();
          if (err) {
            setError(err);
            setBusy(false);
          }
        }}
        className={cn(
          buttonSecondaryCn,
          'flex w-full items-center justify-center gap-2.5',
          className
        )}
      >
        <MicrosoftMark />
        {busy ? 'Opening Microsoft…' : 'Sign in with Microsoft'}
      </button>
      <p className="text-center text-[12px] text-white">
        For your college account. Apprentices can keep using email.
      </p>
      {error && (
        <p role="alert" className="text-center text-[13px] font-medium text-orange-300">
          {error}
        </p>
      )}
    </div>
  );
}
