/* ==========================================================================
   TempPasswordPrompt — global, mounted once at the router root (ELE-1900).

   A college can put people on Elec-Mate in bulk (college-roster-import): each
   new person gets a login with a TEMPORARY password, and the account carries
   user_metadata.must_change_password. The first time they sign in, this asks
   them to choose their own password before anything else, so a password a
   tutor typed out or emailed never stays in use.

   Not on auth / checkout routes: those pages own the screen.
   ========================================================================== */

import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { FormSheet } from '@/components/forms/FormSheet';
import { buttonPrimaryCn, buttonSecondaryCn, inputCn, labelCn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';

const SKIP_PREFIXES = ['/auth', '/checkout', '/payment', '/reset-password', '/update-password'];

const RULES = [
  { label: '8+ characters', test: (p: string) => p.length >= 8 },
  { label: 'upper case', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'lower case', test: (p: string) => /[a-z]/.test(p) },
  { label: 'a number', test: (p: string) => /\d/.test(p) },
];

export default function TempPasswordPrompt() {
  const { user, profile } = useAuth();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [later, setLater] = useState(false);
  const [done, setDone] = useState(false);

  const needs = !!user && (user.user_metadata as { must_change_password?: boolean } | undefined)?.must_change_password === true;
  const onSkippedRoute = SKIP_PREFIXES.some((p) => location.pathname.startsWith(p));
  const open = needs && !later && !done && !onSkippedRoute;
  if (!needs) return null;

  const firstName = (profile?.full_name ?? '').trim().split(/\s+/)[0] || '';
  const allMet = RULES.every((r) => r.test(password));

  const save = async () => {
    setError(null);
    if (!allMet) return setError('Your password needs 8+ characters, upper and lower case, and a number.');
    if (password !== confirm) return setError('The two passwords do not match. Type the same password twice.');
    setBusy(true);
    try {
      const { error: e } = await supabase.auth.updateUser({ password, data: { must_change_password: false } });
      if (e) {
        const m = (e.message || '').toLowerCase();
        setError(
          m.includes('same') || m.includes('different')
            ? 'That is the temporary password. Choose a new one of your own.'
            : m.includes('weak') || m.includes('pwned') || m.includes('breach')
              ? 'That password has appeared in a known data breach. Choose one you have not used on other sites.'
              : 'Your password was not saved. Check your connection and try again.'
        );
        return;
      }
      setDone(true);
      toast.success('Password saved', { description: 'Use it from now on, on the web and in the app.' });
    } finally {
      setBusy(false);
    }
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={(o) => {
        if (!o) setLater(true);
      }}
      width="md"
      eyebrow="Welcome to Elec-Mate"
      title={firstName ? `${firstName}, choose your own password` : 'Choose your own password'}
      description="You signed in with a temporary password from your college. Set your own now: it is what you will use from here on."
      footer={
        <div className="grid grid-cols-[1fr_2fr] gap-2.5">
          <button type="button" onClick={() => setLater(true)} className={buttonSecondaryCn}>
            Not now
          </button>
          <button type="button" onClick={() => void save()} disabled={busy} className={buttonPrimaryCn}>
            {busy ? 'Saving…' : 'Save my password'}
          </button>
        </div>
      }
    >
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          void save();
        }}
      >
        <div>
          <label htmlFor="tpp-new" className={labelCn}>
            New password
          </label>
          <div className="relative">
            <input
              id="tpp-new"
              type={show ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              className={cn(inputCn, 'pr-12')}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? 'Hide password' : 'Show password'}
              className="absolute right-0 top-0 inline-flex h-11 w-11 items-center justify-center text-white touch-manipulation"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <p className="mt-1.5 text-[12px] text-white">
            {RULES.map((r, i) => (
              <span key={r.label} className={r.test(password) ? 'text-emerald-300' : undefined}>
                {i ? ' · ' : ''}
                {r.label}
              </span>
            ))}
          </p>
        </div>
        <div>
          <label htmlFor="tpp-confirm" className={labelCn}>
            Type it again
          </label>
          <input
            id="tpp-confirm"
            type={show ? 'text' : 'password'}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            autoComplete="new-password"
            className={inputCn}
          />
        </div>
        {error && (
          <p role="alert" className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2.5 text-[13px] text-orange-300">
            {error}
          </p>
        )}
        <p className="text-[12.5px] leading-relaxed text-white">
          Choosing &ldquo;Not now&rdquo; keeps the temporary password working; we will ask again next time you sign in.
        </p>
        <button type="submit" className="hidden" aria-hidden tabIndex={-1} />
      </form>
    </FormSheet>
  );
}
