/**
 * MFA challenge gate — the enforcement half of two-factor authentication.
 *
 * Supabase issues an AAL1 session after password sign-in even when the user
 * has a verified TOTP factor; without this gate, 2FA would be decorative.
 * Mounted once at app root: whenever the session's assurance level needs
 * stepping up (aal1 → aal2), it overlays a full-screen code prompt and the
 * app stays blocked until the factor verifies or the user signs out.
 */
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export default function MfaGate() {
  const [required, setRequired] = useState(false);
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const check = useCallback(async () => {
    try {
      const { data } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      setRequired(data?.currentLevel === 'aal1' && data?.nextLevel === 'aal2');
    } catch {
      setRequired(false);
    }
  }, []);

  useEffect(() => {
    check();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'SIGNED_OUT') {
        check();
      }
    });
    return () => subscription.unsubscribe();
  }, [check]);

  const verify = async () => {
    if (code.trim().length !== 6 || busy) return;
    setBusy(true);
    setError(null);
    try {
      const { data: factors, error: fErr } = await supabase.auth.mfa.listFactors();
      if (fErr) throw fErr;
      const totp = factors?.totp?.find((f) => f.status === 'verified');
      if (!totp) {
        setRequired(false);
        return;
      }
      const { data: challenge, error: cErr } = await supabase.auth.mfa.challenge({
        factorId: totp.id,
      });
      if (cErr) throw cErr;
      const { error: vErr } = await supabase.auth.mfa.verify({
        factorId: totp.id,
        challengeId: challenge.id,
        code: code.trim(),
      });
      if (vErr) throw vErr;
      setCode('');
      setRequired(false);
    } catch (e) {
      setError(
        e instanceof Error && /invalid/i.test(e.message)
          ? "That code didn't match — try the current one from your app."
          : e instanceof Error
            ? e.message
            : 'Verification failed'
      );
    } finally {
      setBusy(false);
    }
  };

  const signOutInstead = async () => {
    await supabase.auth.signOut();
    toast.info('Signed out');
    window.location.replace('/');
  };

  if (!required) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-elec-yellow/80">
          Two-factor authentication
        </p>
        <h1 className="mt-1.5 text-2xl font-semibold text-white tracking-[-0.02em]">
          Enter your code
        </h1>
        <p className="mt-2 text-[13px] text-white/70 leading-relaxed">
          Open your authenticator app and enter the 6-digit code for Elec-Mate.
        </p>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
            <p className="text-[13px] text-red-400 text-center">{error}</p>
          </div>
        )}

        <input
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          autoFocus
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
          onKeyDown={(e) => e.key === 'Enter' && verify()}
          placeholder="123456"
          className={cn(
            'mt-5 w-full h-14 px-4 rounded-xl text-center tracking-[0.5em] text-[20px] font-semibold tabular-nums',
            'bg-white/[0.08] border text-white placeholder:text-white/40 placeholder:tracking-[0.5em]',
            'outline-none transition-all border-white/[0.16] focus:border-elec-yellow/60 touch-manipulation'
          )}
        />

        <Button
          onClick={verify}
          disabled={busy || code.length !== 6}
          className="mt-4 w-full h-12 rounded-xl bg-elec-yellow hover:bg-yellow-400 text-black font-semibold touch-manipulation"
        >
          {busy ? 'Checking…' : 'Continue'}
        </Button>

        <button
          type="button"
          onClick={signOutInstead}
          className="mt-3 w-full min-h-[44px] text-[12.5px] text-white/60 hover:text-white touch-manipulation"
        >
          Sign out instead
        </button>
      </div>
    </div>
  );
}
