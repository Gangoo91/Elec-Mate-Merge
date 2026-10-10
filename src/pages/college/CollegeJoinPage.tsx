/* ==========================================================================
   CollegeJoinPage — public join landing for a college invite link.

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

   college_invites is NOT readable anonymously, so a signed-out visitor is told
   "your college" rather than the college's name. Sign-up routes through the
   paid trial checkout — never promise a free account here.

   Single-purpose by design: masthead, one card, one solid volt action. This
   is a PUBLIC route outside the app layout, so it deliberately does not use
   HubBody — that would put a push-permission prompt in front of a visitor
   who has no account yet.
   ========================================================================== */

import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { storageSetSync, storageRemoveSync } from '@/utils/storage';
import {
  PENDING_INVITE_KEY,
  postJoinPath,
  redeemCollegeInvite,
  describeJoinCode,
  cleanJoinCode,
  joinLine,
  type JoinCodeInfo,
  type RedeemResult,
} from '@/lib/collegeInvite';
import { invalidateMyCollegeContext } from '@/hooks/useMyCollegeContext';
import { cn } from '@/lib/utils';
import { HubMasthead } from '@/components/hub/HubPrimitives';
import { PageHelpButton, type PageHelpContent } from '@/components/hub/PageHelp';
import { COLLEGE_BTN, COLLEGE_BTN_PRIMARY, COLLEGE_CARD } from '@/components/college/ui/CollegeUi';
import { MoveCollegeSheet } from '@/components/apprentice-hub/MoveCollegeSheet';

type Phase = 'checking' | 'joining' | 'success' | 'error' | 'signed_out';

const SUCCESS_HOLD_MS = 2400;

const SECONDARY_BTN = cn(COLLEGE_BTN, 'w-full');
const PRIMARY_BTN = cn(COLLEGE_BTN_PRIMARY, 'w-full');

const HELP: PageHelpContent = {
  id: 'college-join',
  title: 'Joining your college',
  what: 'Your college sent you this link so your Elec-Mate account is linked to them. Once you join, your tutor can see your progress and you can see your college plan.',
  steps: [
    {
      title: 'Sign in or create an account',
      body: 'Use the email your college has for you if you can; it links you to your place on their roll straight away.',
    },
    {
      title: 'We link you automatically',
      body: 'The code in this link is kept while you sign up, so you never have to type it.',
    },
    {
      title: 'Open your college plan',
      body: 'You land on your college plan: your cohort, your tutor, timetable and what is due.',
    },
  ],
  notes: [
    {
      title: 'Discount codes',
      body: 'If your college has a discount with Elec-Mate, this join code carries it: it is applied when you create your account. A separate discount code from your college works too.',
    },
    {
      title: 'Already in another college',
      body: 'If you have moved, move your record here in one step. Every decision, witness statement and hour comes with you, and your old college stops seeing it.',
    },
  ],
};

const WHAT_YOU_GET = [
  {
    title: 'Your tutor sees your progress',
    body: 'Portfolio, off-the-job hours and quizzes reach them without you sending anything.',
  },
  {
    title: 'Your hours count',
    body: 'Learning you do in the app counts towards your off-the-job hours.',
  },
  {
    title: 'Your college plan in one place',
    body: 'Cohort, timetable, reviews and what is due next.',
  },
];

export default function CollegeJoinPage() {
  const { code: rawCode } = useParams<{ code: string }>();
  const code = cleanJoinCode(rawCode);
  const { user, isLoading, fetchProfile } = useAuth();
  const navigate = useNavigate();

  const [phase, setPhase] = useState<Phase>('checking');
  const [result, setResult] = useState<RedeemResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const ranRef = useRef(false);
  // ELE-1899: signed out, the code itself says which college and cohort, and
  // whether it carries the college's discount (describe_join_code is public).
  // undefined while checking; null when the code is not a live join code.
  const [info, setInfo] = useState<JoinCodeInfo | null | undefined>(undefined);
  // ELE-1882: already with another college. Offer the move.
  const [moveOpen, setMoveOpen] = useState(false);
  useEffect(() => {
    if (phase !== 'signed_out' || !code) return;
    let cancelled = false;
    void describeJoinCode(code).then((d) => {
      if (cancelled) return;
      setInfo(d);
      // A dead code must not follow them through sign-up.
      if (!d) storageRemoveSync(PENDING_INVITE_KEY);
    });
    return () => {
      cancelled = true;
    };
  }, [phase, code]);

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
    let timer: number | undefined;
    void (async () => {
      const res = await redeemCollegeInvite(code);
      if (res.success) {
        // Clear any stash so the global redeemer doesn't re-fire on the next page.
        storageRemoveSync(PENDING_INVITE_KEY);
        setResult(res);
        setPhase('success');
        if (fetchProfile && user.id) await fetchProfile(user.id);
        invalidateMyCollegeContext();
        timer = window.setTimeout(
          () => navigate(postJoinPath(res.invite_type), { replace: true }),
          SUCCESS_HOLD_MS
        );
      } else {
        setResult(res);
        setPhase('error');
        setErrorMsg(res.message ?? res.error ?? 'That join code is invalid or has expired.');
      }
    })();
    return () => {
      if (timer) window.clearTimeout(timer);
    };
  }, [isLoading, user, code, fetchProfile, navigate]);

  const successLine = (() => {
    if (!result) return '';
    const parts = [result.college_name ?? 'your college'];
    if (result.cohort_name) parts.push(result.cohort_name);
    if (result.tutor_name) parts.push(`Tutor ${result.tutor_name}`);
    return parts.join(' · ');
  })();

  const inOtherCollege = result?.error === 'already_in_other_college';

  return (
    <div
      className="min-h-[100dvh]"
      style={{
        backgroundColor: 'hsl(var(--background))',
        paddingBottom: 'calc(6rem + env(safe-area-inset-bottom, 0px))',
      }}
    >
      <HubMasthead
        section="College"
        title="Join your college"
        backTo="/"
        trailing={<PageHelpButton help={HELP} compact />}
      />

      <div className="mx-auto grid max-w-[1200px] gap-6 px-4 py-8 sm:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-x-16 lg:gap-y-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-start-1 lg:row-start-1"
        >
          <p className="text-[13px] font-semibold text-elec-yellow">Your college</p>
          <h1 className="mt-1.5 text-[26px] font-bold leading-tight tracking-tight text-white sm:text-[34px]">
            {phase === 'success' ? 'You are in.' : 'Join your college on Elec-Mate'}
          </h1>
          <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-white">
            {code ? (
              <>
                Join code{' '}
                <span className="font-semibold tabular-nums text-elec-yellow">{code}</span>. One
                step links your account to your college, your cohort and your tutor.
              </>
            ) : (
              'One step links your account to your college, your cohort and your tutor.'
            )}
          </p>
        </motion.div>
        <motion.ul
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="order-last grid gap-3 sm:grid-cols-3 lg:order-none lg:col-start-1 lg:row-start-2 lg:grid-cols-1"
        >
          {WHAT_YOU_GET.map((w) => (
            <li
              key={w.title}
              className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.025] px-4 py-3.5"
            >
              <p className="text-[14px] font-semibold text-white">{w.title}</p>
              <p className="mt-1 text-[12.5px] leading-snug text-white">{w.body}</p>
            </li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className={cn(
            COLLEGE_CARD,
            'text-center sm:p-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center'
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
              <h2 className="mt-4 text-[17px] font-semibold text-white">You're in</h2>
              <p className="mt-1.5 text-[13px] font-medium leading-relaxed text-white">
                {successLine}
              </p>
              <p className="mt-3 text-[12.5px] text-white">
                {result?.invite_type === 'staff'
                  ? 'Taking you to College Hub…'
                  : 'Taking you to your college plan…'}
              </p>
            </>
          )}

          {phase === 'error' && (
            <>
              <div
                aria-hidden
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-orange-500/40 text-xl font-semibold text-orange-300"
              >
                !
              </div>
              <h2 className="mt-4 text-[17px] font-semibold text-white">
                {inOtherCollege ? 'You are with another college' : "Couldn't join"}
              </h2>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-white">
                {inOtherCollege
                  ? `Your account is linked to ${result?.other_college_name ?? 'another college'}. If you have moved, bring your record here: every decision, witness statement and hour comes with you.`
                  : errorMsg}
              </p>
              {inOtherCollege ? (
                <>
                  <button
                    type="button"
                    onClick={() => setMoveOpen(true)}
                    className={cn('mt-5', PRIMARY_BTN)}
                  >
                    Move my record here
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/apprentice/college-plan', { replace: true })}
                    className={cn('mt-2.5', SECONDARY_BTN)}
                  >
                    Stay with {result?.other_college_name ?? 'my college'}
                  </button>
                  <MoveCollegeSheet open={moveOpen} onOpenChange={setMoveOpen} initialCode={code} />
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate('/dashboard', { replace: true })}
                  className={cn('mt-5', SECONDARY_BTN)}
                >
                  Go to Elec-Mate
                </button>
              )}
            </>
          )}

          {phase === 'signed_out' && info === undefined && (
            <>
              <Loader2 className="mx-auto h-7 w-7 animate-spin text-elec-yellow" aria-hidden />
              <h2 className="mt-4 text-[17px] font-semibold text-white">Checking your code…</h2>
            </>
          )}

          {phase === 'signed_out' && info === null && (
            <>
              <div
                aria-hidden
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-orange-500/40 text-xl font-semibold text-orange-300"
              >
                !
              </div>
              <h2 className="mt-4 text-[17px] font-semibold text-white">This code does not work</h2>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-white">
                {code} is not a live join code. It may have been typed wrong, switched off or used
                up. Check it with your tutor, or ask them to send the link again.
              </p>
              <button
                type="button"
                onClick={() => navigate('/auth/signin')}
                className={cn('mt-5', SECONDARY_BTN)}
              >
                I already have an account
              </button>
            </>
          )}

          {phase === 'signed_out' && info && (
            <>
              <h2 className="text-[18px] font-semibold text-white">Sign in to join</h2>
              <p className="mt-2 text-[12.5px] leading-relaxed text-white">
                Create your Elec-Mate account or sign in, and we'll link you to your college
                automatically.
              </p>
              {info && (
                <p className="mt-2 text-[13px] font-semibold leading-relaxed text-elec-yellow">
                  {joinLine(info)}
                </p>
              )}
              <p className="mt-2 text-[12.5px] leading-relaxed text-white">
                {info?.invite_type === 'staff'
                  ? 'This is a staff link. College staff use Elec-Mate free: there is nothing to pay.'
                  : info?.apprentice_offer || info?.electrician_offer
                    ? 'Your college discount comes with this code: it is applied when you create your account.'
                    : 'If your college gave you a discount code too, you can enter it when you create your account.'}
              </p>
              {/* The one solid volt control on the page. Join links are learner
                  codes in practice — staff accounts are provisioned by admin. */}
              <button
                type="button"
                onClick={() =>
                  navigate(
                    info?.invite_type === 'staff'
                      ? `/auth/signup?join=${encodeURIComponent(code)}`
                      : `/auth/signup?role=apprentice&join=${encodeURIComponent(code)}`
                  )
                }
                className={cn('mt-5', PRIMARY_BTN)}
              >
                Create my account
              </button>
              <button
                type="button"
                onClick={() => navigate('/auth/signin')}
                className={cn('mt-2.5', SECONDARY_BTN)}
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
