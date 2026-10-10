/* ==========================================================================
   /auth/microsoft (ELE-1971): where Supabase returns after Sign in with
   Microsoft.

   1. Exchange the PKCE code for a session (the client has
      detectSessionInUrl off, so this page does it).
   2. sso_claim_my_college(): links the person to their college ONLY if the
      college already listed them (staff list or learner roster, by email,
      with a Microsoft-verified email). It never grants a role on its own.
   3. Route: staff to /college, learners to /apprentice/college-plan,
      everyone else to a plain explanation.
   ========================================================================== */

import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AuthFrame } from '@/components/auth/AuthFrame';
import { invalidateMyCollegeContext } from '@/hooks/useMyCollegeContext';
import { buttonPrimaryCn, buttonSecondaryCn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';

type Claim = {
  status:
    | 'staff'
    | 'learner'
    | 'not_on_list'
    | 'no_college'
    | 'email_not_verified'
    | 'wrong_tenant'
    | 'other_college'
    | 'not_microsoft'
    | 'not_signed_in';
  college_name?: string;
  email?: string;
  already?: boolean;
};

/** Where to send each outcome (exported for the spec). */
export function destinationFor(status: Claim['status']): string | null {
  if (status === 'staff') return '/college';
  if (status === 'learner') return '/apprentice/college-plan';
  if (status === 'no_college' || status === 'not_microsoft') return '/dashboard';
  return null;
}

const MESSAGES: Partial<Record<Claim['status'], (c: Claim) => { title: string; body: string }>> = {
  not_on_list: (c) => ({
    title: `${c.college_name ?? 'Your college'} hasn't added you yet`,
    body: `You signed in with Microsoft as ${c.email ?? 'your college account'}, but that address is not on ${c.college_name ?? 'the college'}'s staff list or learner roster. Ask your tutor or college admin to add it, or join with the code they gave you.`,
  }),
  email_not_verified: () => ({
    title: 'Microsoft did not confirm your email',
    body: 'Your organisation has not verified this email address with Microsoft, so we cannot match it to your college. Ask your college for a join code instead.',
  }),
  wrong_tenant: (c) => ({
    title: 'Use your college Microsoft account',
    body: `${c.college_name ?? 'Your college'} only accepts its own Microsoft organisation. Sign out of Microsoft and sign in with your college account.`,
  }),
  other_college: () => ({
    title: 'Your account is linked to another college',
    body: 'One account links to one college. If you have moved, ask your new college to contact Elec-Mate.',
  }),
  not_signed_in: () => ({
    title: 'Sign-in did not finish',
    body: 'Microsoft sent you back without a signed-in session. Try again.',
  }),
};

export default function MicrosoftSignInComplete() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [claim, setClaim] = useState<Claim | null>(null);
  const [error, setError] = useState<string | null>(null);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    void (async () => {
      const oauthError = params.get('error_description') || params.get('error');
      if (oauthError) {
        setError(oauthError);
        return;
      }
      const code = params.get('code');
      if (code) {
        const { error: exErr } = await supabase.auth.exchangeCodeForSession(code);
        if (exErr) {
          setError(exErr.message);
          return;
        }
      }
      const { data: s } = await supabase.auth.getSession();
      if (!s.session) {
        setClaim({ status: 'not_signed_in' });
        return;
      }
      const { data, error: rpcErr } = await supabase.rpc('sso_claim_my_college' as never);
      if (rpcErr) {
        setError(rpcErr.message);
        return;
      }
      const c = (data ?? { status: 'no_college' }) as Claim;
      invalidateMyCollegeContext();
      const to = destinationFor(c.status);
      if (to) {
        navigate(to, { replace: true });
        return;
      }
      setClaim(c);
    })();
  }, [params, navigate]);

  const msg = claim ? MESSAGES[claim.status]?.(claim) : null;

  return (
    <AuthFrame>
      <div className="mx-auto w-full max-w-md space-y-5 pt-10" aria-live="polite">
        {!claim && !error && (
          <div className="flex items-center gap-3 text-[15px] text-white">
            <Loader2 className="h-5 w-5 animate-spin text-elec-yellow" aria-hidden />
            Signing you in with Microsoft…
          </div>
        )}
        {(msg || error) && (
          <>
            <h1 className="text-[22px] font-semibold tracking-tight text-white">
              {msg?.title ?? 'Sign-in did not finish'}
            </h1>
            <p className="text-[14px] leading-relaxed text-white">{msg?.body ?? error}</p>
            <div className="space-y-3 pt-2">
              <Link
                to="/college"
                className={cn(buttonPrimaryCn, 'flex w-full items-center justify-center')}
              >
                I have a join code
              </Link>
              <Link
                to="/dashboard"
                className={cn(buttonSecondaryCn, 'flex w-full items-center justify-center')}
              >
                Go to my dashboard
              </Link>
            </div>
          </>
        )}
      </div>
    </AuthFrame>
  );
}
