import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase, SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '@/integrations/supabase/client';
import {
  Loader2,
  Check,
  Briefcase,
  Clock,
  FileText,
  ShieldCheck,
  Eye,
  EyeOff,
  UserCheck,
  AlertCircle,
} from 'lucide-react';

// The public accept page loads BEFORE any session exists. The shared supabase
// client initialises auth (storage + a cross-tab lock) on mount, and firing an
// rpc in that same tick can race and throw on a cold public page. So read the
// invite over a plain fetch to the public RPC — no auth machinery in the path.
async function publicRpc<T>(fn: string, args: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });
  if (!res.ok) throw new Error(`${fn} failed (${res.status})`);
  return res.json() as Promise<T>;
}

/**
 * /team/accept/:token — branded team-invite acceptance.
 *
 * Handles every way a person can arrive:
 *  • Already signed in as the invited email → one tap, no password.
 *  • Signed in as someone else            → sign out & continue.
 *  • Has an account, signed out           → sign in & join (+ forgot password).
 *  • Brand new                            → create account & join.
 *
 * Free for the worker; the employer covers the seat.
 */

type InviteInfo = {
  company_name: string;
  employee_name: string;
  email: string;
  has_account: boolean;
};

const WORKER_TOOLS = '/electrician/worker-tools';

// get_team_invite / accept_team_invite are added by the ELE-1272 migration and
// aren't in the generated Supabase types yet — cast the rpc caller.
// MUST stay bound to the client: extracting the bare method loses `this`, and
// supabase-js's rpc() reads this.rest → "undefined is not an object
// (evaluating 'this.rest')" crashed every accept in prod (Sentry REACT-C3).
const rpc = ((fn: string, args?: Record<string, unknown>) =>
  supabase.rpc(fn as never, args as never)) as (
  fn: string,
  args?: Record<string, unknown>
) => Promise<{ data: unknown; error: unknown }>;

const PERKS = [
  { icon: Briefcase, label: 'Your assigned jobs' },
  { icon: Clock, label: 'Clock in & out on site' },
  { icon: FileText, label: 'Timesheets, leave & expenses' },
];

export default function TeamInviteAccept() {
  const { token } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(true);
  const [invite, setInvite] = useState<InviteInfo | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [mode, setMode] = useState<'new' | 'existing'>('new');
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let active = true;

    // Safety net: never leave the spinner hanging. If the network stalls,
    // surface a friendly, actionable error instead of an infinite loader.
    const timeout = setTimeout(() => {
      if (!active) return;
      setLoadError(
        'This is taking longer than expected. If you opened this from your email app, copy the link into Safari or Chrome — or check your connection and try again.'
      );
      setLoading(false);
    }, 12000);

    (async () => {
      if (!token) {
        setLoadError('This invite link is not valid. Ask your employer to resend it.');
        setLoading(false);
        clearTimeout(timeout);
        return;
      }
      try {
        const result = await publicRpc<{ error?: string } & Partial<InviteInfo>>(
          'get_team_invite',
          { p_token: token }
        );
        if (!active) return;
        if (!result || result.error) {
          const code = result?.error || 'not_found';
          setLoadError(
            code === 'expired'
              ? 'This invite has expired. Ask your employer to resend it.'
              : code === 'accepted'
                ? "This invite has already been used. Just sign in and you're in."
                : 'This invite link is not valid. Ask your employer to resend it.'
          );
        } else {
          setInvite({
            company_name: result.company_name || 'Your employer',
            employee_name: result.employee_name || '',
            email: result.email!,
            has_account: !!result.has_account,
          });
          setName(result.employee_name || '');
          // Open in the right mode: people with an account go straight to sign-in.
          setMode(result.has_account ? 'existing' : 'new');
        }
      } catch (e) {
        // Surface the real cause — a silent catch is why this was hard to debug.
        console.error('[team-invite] failed to load invite', e);
        if (active)
          setLoadError(
            "We couldn't load your invite. Check your connection and reopen the link from your email."
          );
      } finally {
        if (active) setLoading(false);
        clearTimeout(timeout);
      }
    })();

    // Best-effort: if they're already signed in, we can offer a one-tap join.
    // Never blocks the load, never throws into the invite flow.
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (active && data.session?.user?.email)
          setSessionEmail(data.session.user.email.toLowerCase());
      })
      .catch(() => {});

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [token]);

  const finish = () => {
    setDone(true);
    setTimeout(() => {
      window.location.href = WORKER_TOOLS;
    }, 1400);
  };

  const invitedEmail = invite?.email.toLowerCase() ?? '';
  const signedInAsInvitee = !!sessionEmail && sessionEmail === invitedEmail;
  const signedInAsSomeoneElse = !!sessionEmail && sessionEmail !== invitedEmail;

  // Already signed in as the right person — link the roster row, no password.
  const handleJoinAsCurrent = async () => {
    setSubmitting(true);
    setFormError(null);
    try {
      const { data, error } = await rpc('accept_team_invite', { p_token: token });
      const res = data as { success?: boolean; error?: string };
      if (error || !res?.success) throw new Error(res?.error || 'Could not join the team.');
      finish();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSwitchAccount = async () => {
    setSubmitting(true);
    setFormError(null);
    try {
      await supabase.auth.signOut();
    } catch {
      /* ignore — we just want the password flow next */
    }
    setSessionEmail(null);
    setMode(invite?.has_account ? 'existing' : 'new');
    setSubmitting(false);
  };

  const handleCreate = async () => {
    if (password.length < 8) {
      setFormError('Choose a password of at least 8 characters.');
      return;
    }
    setSubmitting(true);
    setFormError(null);
    try {
      const { data, error } = await supabase.functions.invoke('accept-team-invite', {
        body: { token, password, fullName: name },
      });
      const res = data as { success?: boolean; error?: string; code?: string; email?: string };
      if (error || !res?.success) {
        if (res?.code === 'account_exists') {
          setMode('existing');
          setFormError('You already have an account — enter your password to sign in and join.');
          return;
        }
        throw new Error(res?.error || 'Could not create your account.');
      }
      // Sign in to establish a session, then land in Worker Tools.
      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email: res.email || invite!.email,
        password,
      });
      if (signInErr) throw signInErr;
      finish();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignIn = async () => {
    if (!password) {
      setFormError('Enter your password.');
      return;
    }
    setSubmitting(true);
    setFormError(null);
    try {
      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email: invite!.email,
        password,
      });
      if (signInErr) throw new Error('Wrong password for ' + invite!.email + '. Try again.');
      const { data, error } = await rpc('accept_team_invite', { p_token: token });
      const res = data as { success?: boolean; error?: string };
      if (error || !res?.success) throw new Error(res?.error || 'Could not join the team.');
      finish();
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!invite) return;
    setFormError(null);
    try {
      // Use the app's BRANDED reset. send-password-reset builds the recovery
      // link itself (https://elec-mate.com/auth/reset-password?token_hash=…),
      // so it's Elec-Mate branded AND immune to the Supabase Site-URL fallback
      // that was dumping people on localhost. NOT supabase.auth.resetPassword
      // ForEmail, whose default email is Supabase-branded.
      await supabase.functions.invoke('send-password-reset', { body: { email: invite.email } });
      setResetSent(true);
    } catch {
      // Don't reveal whether the account exists — always show the same message.
      setResetSent(true);
    }
  };

  const submit = () => {
    if (signedInAsInvitee) handleJoinAsCurrent();
    else if (mode === 'new') handleCreate();
    else handleSignIn();
  };

  return (
    <div
      className="min-h-[100svh] bg-[#0a0e17] flex items-center justify-center px-4 py-10"
      style={{ paddingBottom: 'max(2.5rem, env(safe-area-inset-bottom))' }}
    >
      <div className="w-full max-w-md">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-7 w-7 animate-spin text-elec-yellow" />
          </div>
        ) : loadError ? (
          <div className="rounded-2xl border border-white/10 bg-[hsl(0_0%_10%)] p-8 text-center">
            <p className="text-white/90 text-[15px] leading-relaxed">{loadError}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-5 h-11 w-full rounded-xl bg-elec-yellow text-black font-semibold text-[14px] active:scale-[0.99] touch-manipulation"
            >
              Try again
            </button>
          </div>
        ) : done ? (
          <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-10 text-center">
            <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-emerald-500/15 grid place-items-center">
              <Check className="h-7 w-7 text-emerald-400" />
            </div>
            <h1 className="text-xl font-semibold text-white">You're in</h1>
            <p className="mt-2 text-[14px] text-white/70">Taking you to Worker Tools…</p>
          </div>
        ) : (
          invite && (
            <div className="rounded-2xl border border-white/10 bg-[hsl(0_0%_10%)] overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-elec-yellow via-amber-400 to-orange-400" />
              <div className="p-7 sm:p-8">
                <p className="text-[12px] uppercase tracking-[0.18em] text-elec-yellow font-medium">
                  Team invite
                </p>
                <h1 className="mt-2 text-[22px] leading-tight font-semibold text-white">
                  {invite.company_name} added you to their team
                </h1>
                <div className="mt-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 flex items-start gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  <p className="text-[13px] text-emerald-200/90 leading-relaxed">
                    <span className="font-semibold text-emerald-100">It's free for you</span> —{' '}
                    {invite.company_name} covers your access. No card needed.
                  </p>
                </div>

                <div className="mt-5 divide-y divide-white/[0.06]">
                  {PERKS.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-3 py-2.5 first:pt-0">
                      <div className="h-8 w-8 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20 grid place-items-center shrink-0">
                        <Icon className="h-4 w-4 text-elec-yellow" />
                      </div>
                      <span className="text-[13.5px] text-white/85">{label}</span>
                    </div>
                  ))}
                </div>

                {/* ---- Already signed in as the invited person: one tap ---- */}
                {signedInAsInvitee ? (
                  <div className="mt-6 space-y-3">
                    <div className="rounded-xl bg-elec-yellow/10 border border-elec-yellow/25 px-4 py-3 flex items-center gap-2.5">
                      <UserCheck className="h-4 w-4 text-elec-yellow shrink-0" />
                      <p className="text-[13px] text-white/85 leading-relaxed">
                        Signed in as{' '}
                        <span className="font-semibold text-white">{invite.email}</span> — one tap
                        and you're on the team.
                      </p>
                    </div>

                    {formError && (
                      <p className="text-[12.5px] text-red-400 leading-relaxed">{formError}</p>
                    )}

                    <button
                      onClick={handleJoinAsCurrent}
                      disabled={submitting}
                      className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 touch-manipulation"
                    >
                      {submitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        `Join ${invite.company_name}`
                      )}
                    </button>
                    <button
                      onClick={handleSwitchAccount}
                      disabled={submitting}
                      className="w-full text-center text-[12.5px] text-white/55 hover:text-white/80 transition-colors py-1 touch-manipulation"
                    >
                      Not you? Use a different account
                    </button>
                  </div>
                ) : signedInAsSomeoneElse ? (
                  /* ---- Signed in as a different account ---- */
                  <div className="mt-6 space-y-3">
                    <div className="rounded-xl bg-amber-500/10 border border-amber-500/25 px-4 py-3 flex items-start gap-2.5">
                      <AlertCircle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                      <p className="text-[13px] text-amber-100/90 leading-relaxed">
                        You're signed in as{' '}
                        <span className="font-semibold text-white">{sessionEmail}</span>, but this
                        invite is for{' '}
                        <span className="font-semibold text-white">{invite.email}</span>.
                      </p>
                    </div>

                    {formError && (
                      <p className="text-[12.5px] text-red-400 leading-relaxed">{formError}</p>
                    )}

                    <button
                      onClick={handleSwitchAccount}
                      disabled={submitting}
                      className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 touch-manipulation"
                    >
                      {submitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        `Continue as ${invite.email}`
                      )}
                    </button>
                  </div>
                ) : (
                  /* ---- Signed out: create or sign in ---- */
                  <div className="mt-6 space-y-3">
                    <div>
                      <label className="block text-[12px] text-white/50 mb-1.5">Your email</label>
                      <input
                        value={invite.email}
                        readOnly
                        className="w-full h-11 rounded-xl bg-[hsl(0_0%_13%)] border border-white/10 px-3.5 text-[14px] text-white/60"
                      />
                    </div>

                    {mode === 'new' && (
                      <div>
                        <label className="block text-[12px] text-white/50 mb-1.5">Your name</label>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Full name"
                          className="w-full h-11 rounded-xl bg-[hsl(0_0%_13%)] border border-white/10 px-3.5 text-[14px] text-white focus:border-elec-yellow/60 focus:outline-none touch-manipulation"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-[12px] text-white/50 mb-1.5">
                        {mode === 'new' ? 'Choose a password' : 'Your password'}
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') submit();
                          }}
                          placeholder={mode === 'new' ? 'At least 8 characters' : 'Password'}
                          autoComplete={mode === 'new' ? 'new-password' : 'current-password'}
                          className="w-full h-11 rounded-xl bg-[hsl(0_0%_13%)] border border-white/10 pl-3.5 pr-11 text-[14px] text-white focus:border-elec-yellow/60 focus:outline-none touch-manipulation"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((s) => !s)}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 grid place-items-center text-white/40 hover:text-white/70 touch-manipulation"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {mode === 'existing' && (
                        <div className="mt-1.5 text-right">
                          {resetSent ? (
                            <span className="text-[12px] text-emerald-300/90">
                              Reset link sent to {invite.email}
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={handleForgotPassword}
                              className="text-[12px] text-white/45 hover:text-white/75 transition-colors touch-manipulation"
                            >
                              Forgot password?
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {formError && (
                      <p className="text-[12.5px] text-red-400 leading-relaxed">{formError}</p>
                    )}

                    <button
                      onClick={submit}
                      disabled={submitting}
                      className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 touch-manipulation"
                    >
                      {submitting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : mode === 'new' ? (
                        'Create account & join'
                      ) : (
                        'Sign in & join'
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setMode(mode === 'new' ? 'existing' : 'new');
                        setFormError(null);
                        setResetSent(false);
                      }}
                      className="w-full text-center text-[12.5px] text-white/55 hover:text-white/80 transition-colors py-1 touch-manipulation"
                    >
                      {mode === 'new'
                        ? 'Already have an Elec-Mate account? Sign in'
                        : 'New to Elec-Mate? Create an account'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
