/* ==========================================================================
   StaffMfaGate (ELE-1915): two-step sign-in for College Hub staff.

   Wraps every College Hub page (CollegeGuard). A staff member is asked for a
   code from their authenticator app when:
     - their college requires two steps (colleges.require_staff_mfa) and this
       session is not yet aal2, or
     - they have set up two steps themselves and this session is aal1
       (a password-only sign-in).
   Without a factor yet, they set one up here (QR code or key), then verify.

   The server holds the same rule: restrictive RLS on learner records refuses
   staff of a requiring college until the session is aal2
   (college_staff_mfa_ok, migration 20261010151000). This screen is the
   friendly front of that rule, not the rule itself.
   ========================================================================== */

import { useEffect, useState, type ReactNode } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useMfaRequirement } from './useCollegeSecurity';
import { COLLEGE_BTN, COLLEGE_BTN_PRIMARY, COLLEGE_CARD } from '@/components/college/ui/CollegeUi';
import { inputCn, labelCn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';

type Aal = { current: string | null; next: string | null; factorId: string | null };

function friendly(e: unknown): string {
  const code = (e as { code?: string })?.code;
  const msg = e instanceof Error ? e.message : String(e ?? '');
  if (code === 'mfa_totp_enroll_not_enabled' || /disabled for TOTP/i.test(msg)) {
    return 'Two-step sign-in is not switched on for Elec-Mate yet. Email founder@elec-mate.com.';
  }
  if (/invalid|expired/i.test(msg))
    return "That code didn't match. Check the app and try the newest code.";
  return msg || 'Something went wrong. Try again.';
}

export function StaffMfaGate({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { data: req, isLoading } = useMfaRequirement();
  const [aal, setAal] = useState<Aal | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!user?.id) return;
    void (async () => {
      const [{ data: level }, { data: factors }] = await Promise.all([
        supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
        supabase.auth.mfa.listFactors(),
      ]);
      if (cancelled) return;
      const verified = factors?.totp?.find((f) => f.status === 'verified');
      setAal({
        current: level?.currentLevel ?? null,
        next: level?.nextLevel ?? null,
        factorId: verified?.id ?? null,
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.id, req?.aal]);

  if (isLoading || !req || !aal) return <>{children}</>;
  if (!req.is_staff) return <>{children}</>;

  const collegeRequires = req.required && !req.satisfied;
  const selfEnrolledButAal1 = !!aal.factorId && aal.current !== 'aal2';
  if (!collegeRequires && !selfEnrolledButAal1) return <>{children}</>;

  return (
    <MfaScreen
      collegeName={req.college_name}
      factorId={aal.factorId}
      collegeRequires={collegeRequires}
      onDone={(level) => setAal((a) => (a ? { ...a, current: level } : a))}
    />
  );
}

export function MfaScreen({
  collegeName,
  factorId,
  collegeRequires,
  onDone,
  embedded = false,
}: {
  collegeName: string | null;
  factorId: string | null;
  collegeRequires: boolean;
  onDone: (level: string) => void;
  /** Inside another card (College settings): no page padding, no exit links. */
  embedded?: boolean;
}) {
  const qc = useQueryClient();
  const { signOut } = useAuth();
  const [enrol, setEnrol] = useState<{ id: string; qr: string; secret: string } | null>(null);
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startEnrol = async () => {
    setBusy(true);
    setError(null);
    try {
      // Clear an abandoned, unverified factor: Supabase refuses a second one.
      const { data: existing } = await supabase.auth.mfa.listFactors();
      for (const f of existing?.all ?? []) {
        if (f.factor_type === 'totp' && f.status !== 'verified') {
          await supabase.auth.mfa.unenroll({ factorId: f.id });
        }
      }
      const { data, error: err } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: 'Elec-Mate College Hub',
      });
      if (err) throw err;
      setEnrol({ id: data.id, qr: data.totp.qr_code, secret: data.totp.secret });
    } catch (e) {
      setError(friendly(e));
    } finally {
      setBusy(false);
    }
  };

  const verify = async () => {
    const id = enrol?.id ?? factorId;
    if (!id) return;
    if (!/^\d{6}$/.test(code.trim())) {
      setError('Enter the 6-digit code from your authenticator app.');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const { error: err } = await supabase.auth.mfa.challengeAndVerify({
        factorId: id,
        code: code.trim(),
      });
      if (err) throw err;
      await qc.invalidateQueries({ queryKey: ['my-mfa-requirement'] });
      // Learner records were refused at aal1; fetch them again now.
      await qc.invalidateQueries();
      onDone('aal2');
    } catch (e) {
      setError(friendly(e));
    } finally {
      setBusy(false);
    }
  };

  const needsSetup = !factorId && !enrol;
  const Heading = embedded ? 'h3' : 'h1';

  return (
    <div className={embedded ? '' : 'mx-auto w-full max-w-xl px-4 py-8 sm:py-14'}>
      <div className={cn(!embedded && COLLEGE_CARD, 'space-y-5')}>
        <div>
          <p className="text-[13px] font-semibold text-white">Two-step sign-in</p>
          <Heading className="mt-1 text-[20px] font-semibold tracking-tight text-white">
            {needsSetup ? 'Set up two-step sign-in' : 'Enter your sign-in code'}
          </Heading>
          <p className="mt-2 text-[13.5px] leading-relaxed text-white">
            {collegeRequires
              ? `${collegeName ?? 'Your college'} asks staff to sign in with a password and a code from an authenticator app. It keeps learners' records safe if a password is ever guessed.`
              : 'You turned on two-step sign-in. Enter the code from your authenticator app to open the College Hub.'}
          </p>
        </div>

        {needsSetup && (
          <div className="space-y-3 border-t border-white/[0.10] pt-5">
            <p className="text-[13.5px] leading-relaxed text-white">
              You need an authenticator app on your phone, such as Microsoft Authenticator or Google
              Authenticator. It takes about a minute.
            </p>
            <button
              type="button"
              onClick={() => void startEnrol()}
              disabled={busy}
              className={cn(COLLEGE_BTN_PRIMARY, 'w-full')}
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
              Start set-up
            </button>
          </div>
        )}

        {enrol && (
          <div className="grid gap-5 border-t border-white/[0.10] pt-5 sm:grid-cols-[180px_1fr] sm:items-start">
            <div className="mx-auto rounded-xl bg-white p-3">
              <img
                src={enrol.qr}
                alt="QR code to add Elec-Mate to your authenticator app"
                className="h-40 w-40"
              />
            </div>
            <div className="space-y-2">
              <p className="text-[13.5px] leading-relaxed text-white">
                Scan the code with your authenticator app. If you cannot scan it, type this key into
                the app instead:
              </p>
              <p className="break-all rounded-lg border border-white/[0.14] px-3 py-2 font-mono text-[13px] text-white">
                {enrol.secret}
              </p>
            </div>
          </div>
        )}

        {!needsSetup && (
          <form
            className="space-y-4 border-t border-white/[0.10] pt-5"
            onSubmit={(e) => {
              e.preventDefault();
              void verify();
            }}
          >
            <div>
              <label htmlFor="staff-mfa-code" className={labelCn}>
                6-digit code
              </label>
              <input
                id="staff-mfa-code"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                className={cn(inputCn, 'font-mono tracking-[0.3em]')}
                aria-describedby={error ? 'staff-mfa-error' : undefined}
              />
            </div>
            <button type="submit" disabled={busy} className={cn(COLLEGE_BTN_PRIMARY, 'w-full')}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
              {enrol ? 'Turn on and continue' : 'Continue'}
            </button>
          </form>
        )}

        {error && (
          <p id="staff-mfa-error" role="alert" className="text-[13px] font-medium text-orange-300">
            {error}
          </p>
        )}

        {!embedded && (
          <div className="flex flex-wrap gap-2 border-t border-white/[0.10] pt-5">
            <a href="/dashboard" className={COLLEGE_BTN}>
              Back to the dashboard
            </a>
            <button type="button" onClick={() => void signOut()} className={COLLEGE_BTN}>
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
