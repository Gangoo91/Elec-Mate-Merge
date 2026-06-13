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
   ========================================================================== */

import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { storageSetSync, storageRemoveSync } from '@/utils/storage';
import { PENDING_INVITE_KEY, redeemCollegeInvite } from '@/lib/collegeInvite';

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
    <div className="min-h-[100dvh] flex items-center justify-center bg-[hsl(0_0%_6%)] px-5">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-sm rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_9%)] p-7 text-center"
      >
        <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80">
          Elec-Mate · College
        </div>

        {(phase === 'checking' || phase === 'joining') && (
          <>
            <Loader2 className="mx-auto mt-5 h-7 w-7 animate-spin text-elec-yellow" />
            <h1 className="mt-4 text-[17px] font-semibold text-white">
              {phase === 'joining' ? 'Joining your college…' : 'Checking your invite…'}
            </h1>
            <p className="mt-1.5 text-[12.5px] text-white/60">One moment.</p>
          </>
        )}

        {phase === 'success' && (
          <>
            <div className="mx-auto mt-5 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/15 text-2xl">
              ✓
            </div>
            <h1 className="mt-4 text-[17px] font-semibold text-white">
              You're in — welcome to {collegeName}
            </h1>
            <p className="mt-1.5 text-[12.5px] text-white/60">Taking you to your hub…</p>
          </>
        )}

        {phase === 'error' && (
          <>
            <div className="mx-auto mt-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/15 text-xl text-red-300">
              !
            </div>
            <h1 className="mt-4 text-[17px] font-semibold text-white">Couldn't join</h1>
            <p className="mt-1.5 text-[12.5px] text-white/65">{errorMsg}</p>
            <button
              onClick={() => navigate('/dashboard', { replace: true })}
              className="mt-5 h-11 w-full rounded-xl bg-white/[0.06] text-[13px] font-medium text-white touch-manipulation"
            >
              Go to Elec-Mate
            </button>
          </>
        )}

        {phase === 'signed_out' && (
          <>
            <h1 className="mt-5 text-[18px] font-semibold text-white">Join your college</h1>
            <p className="mt-2 text-[12.5px] leading-relaxed text-white/65">
              Create your free Elec-Mate account (or sign in) and we'll link you to your college
              automatically — no code to type.
            </p>
            <button
              onClick={() => navigate('/auth/signup')}
              className="mt-5 h-12 w-full rounded-xl bg-elec-yellow text-[14px] font-semibold text-black touch-manipulation"
            >
              Create my account →
            </button>
            <button
              onClick={() => navigate('/auth/signin')}
              className="mt-2.5 h-11 w-full rounded-xl bg-white/[0.06] text-[13px] font-medium text-white touch-manipulation"
            >
              I already have an account
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
