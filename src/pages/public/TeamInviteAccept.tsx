import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Check, Briefcase, Clock, FileText, ShieldCheck } from 'lucide-react';

/**
 * /team/accept/:token — branded team-invite acceptance.
 * New user: choose a password → account created (already confirmed) → linked.
 * Existing user: sign in → linked via accept_team_invite RPC.
 * Free for the worker; the employer covers the seat.
 */

type InviteInfo = { company_name: string; employee_name: string; email: string };

const WORKER_TOOLS = '/electrician/worker-tools';

// get_team_invite / accept_team_invite are added by the ELE-1272 migration and
// aren't in the generated Supabase types yet — cast the rpc caller.
const rpc = supabase.rpc as unknown as (
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
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!token) return;
      const { data, error } = await rpc('get_team_invite', { p_token: token });
      if (!active) return;
      const result = data as { error?: string } & Partial<InviteInfo>;
      if (error || !result || result.error) {
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
          company_name: result.company_name!,
          employee_name: result.employee_name!,
          email: result.email!,
        });
        setName(result.employee_name || '');
      }
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [token]);

  const finish = () => {
    setDone(true);
    setTimeout(() => {
      window.location.href = WORKER_TOOLS;
    }, 1400);
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
          setFormError('You already have an account — sign in to join.');
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

  return (
    <div className="min-h-[100svh] bg-[#0a0e17] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-7 w-7 animate-spin text-elec-yellow" />
          </div>
        ) : loadError ? (
          <div className="rounded-2xl border border-white/10 bg-[hsl(0_0%_10%)] p-8 text-center">
            <p className="text-white/90 text-[15px] leading-relaxed">{loadError}</p>
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
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          if (mode === 'new') handleCreate();
                          else handleSignIn();
                        }
                      }}
                      placeholder={mode === 'new' ? 'At least 8 characters' : 'Password'}
                      autoComplete={mode === 'new' ? 'new-password' : 'current-password'}
                      className="w-full h-11 rounded-xl bg-[hsl(0_0%_13%)] border border-white/10 px-3.5 text-[14px] text-white focus:border-elec-yellow/60 focus:outline-none touch-manipulation"
                    />
                  </div>

                  {formError && (
                    <p className="text-[12.5px] text-red-400 leading-relaxed">{formError}</p>
                  )}

                  <button
                    onClick={mode === 'new' ? handleCreate : handleSignIn}
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
                    }}
                    className="w-full text-center text-[12.5px] text-white/55 hover:text-white/80 transition-colors py-1"
                  >
                    {mode === 'new'
                      ? 'Already have an Elec-Mate account? Sign in'
                      : 'New to Elec-Mate? Create an account'}
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
