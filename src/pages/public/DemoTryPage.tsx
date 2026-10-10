/**
 * /try/:token — "Try it on your phone" (ELE-1854).
 *
 * The page a visitor's phone opens from the presenter's QR. It swaps the
 * single-use token for a throwaway demo learner (made by the college-demo-try
 * edge function, never here) and drops them into the learner's college area.
 *
 * If the phone is already signed in to a real account, nothing happens until
 * the person agrees to be signed out of it, so a token is never spent by
 * accident and nobody loses their own session without being told.
 *
 * /try (no token) is where a visit ends: a thank-you and a way back.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import useSEO from '@/hooks/useSEO';
import { supabase } from '@/integrations/supabase/client';
import {
  PUBLIC_PRIMARY_CTA,
  PUBLIC_SECONDARY_CTA,
  PublicCard,
  PublicEyebrow,
  PublicH1,
  PublicLead,
  PublicPageShell,
} from '@/components/public/PublicPageShell';
import {
  DEMO_TRY_MESSAGES,
  isDemoVisitorEmail,
  redeemDemoTry,
  type DemoTryError,
} from '@/lib/demoTry';

type Phase =
  | { kind: 'checking' }
  | { kind: 'confirm'; email: string }
  | { kind: 'working' }
  | { kind: 'error'; error: DemoTryError }
  | { kind: 'ended' };

export default function DemoTryPage() {
  const { token = '' } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>(token ? { kind: 'checking' } : { kind: 'ended' });
  const started = useRef(false);

  useSEO({
    title: 'Try Elec-Mate on your phone',
    description: 'A demo learner account in the Elec-Mate demo college, ready in one scan.',
    noindex: true,
  });

  const go = useCallback(async () => {
    if (started.current) return;
    started.current = true;
    setPhase({ kind: 'working' });
    const res = await redeemDemoTry(token);
    if (!res.ok || !res.session) {
      started.current = false;
      setPhase({ kind: 'error', error: res.error ?? 'failed' });
      return;
    }
    const { error } = await supabase.auth.setSession(res.session);
    if (error) {
      started.current = false;
      setPhase({ kind: 'error', error: 'failed' });
      return;
    }
    navigate('/apprentice/college-plan', { replace: true });
  }, [navigate, token]);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      const email = data.session?.user?.email ?? null;
      if (data.session && !isDemoVisitorEmail(email)) {
        setPhase({ kind: 'confirm', email: email ?? 'your account' });
        return;
      }
      if (data.session) await supabase.auth.signOut().catch(() => undefined);
      void go();
    })();
    return () => {
      cancelled = true;
    };
  }, [token, go]);

  const signOutAndGo = async () => {
    await supabase.auth.signOut().catch(() => undefined);
    void go();
  };

  return (
    <PublicPageShell>
      {phase.kind === 'checking' || phase.kind === 'working' ? (
        <div className="flex flex-col items-start gap-4" data-testid="demo-try-working">
          <PublicEyebrow>Try it on your phone</PublicEyebrow>
          <PublicH1>Setting up your demo learner</PublicH1>
          <PublicLead>
            You will be a learner at the Elec-Mate demo college for the next two hours. Nothing you
            do here touches a real college or a real person.
          </PublicLead>
          <Loader2 className="mt-2 h-6 w-6 animate-spin text-elec-yellow" aria-label="Loading" />
        </div>
      ) : null}

      {phase.kind === 'confirm' && (
        <div className="space-y-6">
          <div>
            <PublicEyebrow>Try it on your phone</PublicEyebrow>
            <PublicH1>You are signed in already</PublicH1>
            <PublicLead>
              This phone is signed in as {phase.email}. Trying the demo signs you out of that
              account here. Your own account is not changed, and you can sign back in afterwards.
            </PublicLead>
          </div>
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => void signOutAndGo()}
              className={PUBLIC_PRIMARY_CTA}
            >
              Sign out and try the demo
            </button>
            <Link to="/" className={PUBLIC_SECONDARY_CTA}>
              Keep my account
            </Link>
          </div>
        </div>
      )}

      {phase.kind === 'error' && (
        <div className="space-y-6" data-testid="demo-try-error">
          <div>
            <PublicEyebrow>Try it on your phone</PublicEyebrow>
            <PublicH1>{DEMO_TRY_MESSAGES[phase.error].title}</PublicH1>
            <PublicLead>{DEMO_TRY_MESSAGES[phase.error].body}</PublicLead>
          </div>
          <Link to="/for-colleges" className={PUBLIC_SECONDARY_CTA}>
            See how it works for colleges
          </Link>
        </div>
      )}

      {phase.kind === 'ended' && (
        <div className="space-y-6" data-testid="demo-try-ended">
          <div>
            <PublicEyebrow>Demo finished</PublicEyebrow>
            <PublicH1>Thanks for trying Elec-Mate</PublicH1>
            <PublicLead>
              Your demo learner has been signed out and the account will be deleted. Nothing you
              entered is kept.
            </PublicLead>
          </div>
          <PublicCard>
            <p className="text-[15px] font-semibold text-white">What you just used</p>
            <p className="mt-2 text-[14.5px] leading-relaxed text-white">
              The same app an apprentice gets: their college, their tutor, their hours and evidence,
              and the study tools, all on their own phone. The record is theirs and stays with them
              when the course ends.
            </p>
          </PublicCard>
          <Link to="/for-colleges" className={PUBLIC_PRIMARY_CTA}>
            Elec-Mate for colleges
          </Link>
        </div>
      )}
    </PublicPageShell>
  );
}
