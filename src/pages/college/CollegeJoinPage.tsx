/* ==========================================================================
   CollegeJoinPage — public one-tap join landing for a college invite link.

   The college shares https://elec-mate.com/college/join/<CODE> (one shareable
   cohort code, not one-per-student). This page collapses the old two-step
   "sign up, then hunt for the code box and type it" journey:

     - Logged in  → auto-redeem via accept_college_invite, land in the hub.
     - Logged out → stash the code and send them to sign up / sign in. Once
       they're authenticated, <PendingCollegeInviteRedeemer/> (mounted globally)
       picks the stashed code back up and links them — so the code survives the
       whole signup/checkout flow without touching those pages.

   accept_college_invite reconciles by email: a bulk-added learner whose signup
   email matches their pre-loaded college_students row is linked to it. (If they
   sign up under a different email the RPC creates a fresh row instead.)

   Single-purpose by design: masthead, one card, one solid volt action. This
   is a PUBLIC route outside the app layout, so it deliberately does not use
   HubBody — that would put a push-permission prompt in front of a visitor
   who has no account yet.
   ========================================================================== */

import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { storageSetSync, storageRemoveSync } from '@/utils/storage';
import { PENDING_INVITE_KEY, redeemCollegeInvite } from '@/lib/collegeInvite';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubMasthead } from '@/components/hub/HubPrimitives';

type Phase = 'checking' | 'joining' | 'success' | 'error' | 'signed_out';

export default function CollegeJoinPage() {
  const { code: rawCode } = useParams<{ code: string }>();
  const code = (rawCode ?? '').trim().toUpperCase();
  const { user, isLoading, fetchProfile } = useAuth();
  const navigate = useNavigate();

  const [phase, setPhase] = useState<Phase>('checking');
  const [collegeName, setCollegeName] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const ranRef = useRef(false);

  useEffect(() => {
    if (isLoading) return; // wait for auth to settle
    if (!code || code.length < 4) {
      setPhase('error');
      setErrorMsg('This join link is missing its code. Ask your college to resend it.');
      return;
    }
    if (ranRef.current) return;

    if (!user) {
      // Stash the code so it survives signup → checkout → onboarding, then show CTAs.
      storageSetSync(PENDING_INVITE_KEY, code);
      setPhase('signed_out');
      return;
    }

    ranRef.current = true;
    setPhase('joining');
    void (async () => {
      const res = await redeemCollegeInvite(code);
      if (res.success) {
        // Clear any stash so the global redeemer doesn't re-fire on the next page.
        storageRemoveSync(PENDING_INVITE_KEY);
        setCollegeName(res.college_name ?? 'your college');
        setPhase('success');
        if (fetchProfile && user.id) await fetchProfile(user.id);
        const hub = res.invite_type === 'staff' ? '/college' : '/apprentice';
        window.setTimeout(() => navigate(hub, { replace: true }), 1400);
      } else {
        setPhase('error');
        setErrorMsg(res.message ?? res.error ?? 'That invite code is invalid or has expired.');
      }
    })();
  }, [isLoading, user, code, fetchProfile, navigate]);

  return (
    <div
      className="min-h-[100dvh] bg-elec-dark"
      style={{ paddingBottom: 'calc(6rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <HubMasthead section="College" title="Join your college" backTo="/" />

      <div className="mx-auto max-w-[1600px] px-4 py-8 sm:py-14 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'mx-auto w-full max-w-sm rounded-2xl border border-elec-yellow/35 p-6 text-center sm:p-7',
            CARD_SURFACE
          )}
        >
          {(phase === 'checking' || phase === 'joining') && (
            <>
              <Loader2 className="mx-auto h-7 w-7 animate-spin text-elec-yellow" aria-hidden />
              <h2 className="mt-4 text-[17px] font-semibold text-white">
                {phase === 'joining' ? 'Joining your college…' : 'Checking your invite…'}
              </h2>
              <p className="mt-1.5 text-[12.5px] text-white">One moment.</p>
            </>
          )}

          {phase === 'success' && (
            <>
              <div
                aria-hidden
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-elec-yellow text-2xl text-elec-yellow"
              >
                ✓
              </div>
              <h2 className="mt-4 text-[17px] font-semibold text-white">
                You're in — welcome to {collegeName}
              </h2>
              <p className="mt-1.5 text-[12.5px] text-white">Taking you to your hub…</p>
            </>
          )}

          {phase === 'error' && (
            <>
              {/* Red stays: a link that will not redeem is a genuine problem. */}
              <div
                aria-hidden
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-red-400/40 text-xl font-semibold text-red-300"
              >
                !
              </div>
              <h2 className="mt-4 text-[17px] font-semibold text-white">Couldn't join</h2>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-white">{errorMsg}</p>
              <button
                type="button"
                onClick={() => navigate('/dashboard', { replace: true })}
                className="mt-5 h-11 w-full rounded-full border border-white/[0.12] bg-white/[0.06] text-[13px] font-medium text-white transition-colors touch-manipulation hover:bg-white/[0.09]"
              >
                Go to Elec-Mate
              </button>
            </>
          )}

          {phase === 'signed_out' && (
            <>
              <h2 className="text-[18px] font-semibold text-white">Join your college</h2>
              <p className="mt-2 text-[12.5px] leading-relaxed text-white">
                Create your free Elec-Mate account (or sign in) and we'll link you to your college
                automatically — no code to type.
              </p>
              {/* The one solid volt control on the page. */}
              <button
                type="button"
                onClick={() => navigate('/auth/signup')}
                className="mt-5 h-11 w-full rounded-full bg-elec-yellow text-[14px] font-semibold text-black transition-colors touch-manipulation hover:bg-elec-yellow/90"
              >
                Join — create my account
              </button>
              <button
                type="button"
                onClick={() => navigate('/auth/signin')}
                className="mt-2.5 h-11 w-full rounded-full border border-white/[0.12] bg-white/[0.06] text-[13px] font-medium text-white transition-colors touch-manipulation hover:bg-white/[0.09]"
              >
                I already have an account
              </button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
