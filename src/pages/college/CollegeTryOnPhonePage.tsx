import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { cn } from '@/lib/utils';
import { containerVariants } from '@/components/college/primitives';
import { HubBody, HubMasthead, HubPage } from '@/components/hub/HubPrimitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_BTN,
  COLLEGE_BTN_PRIMARY,
  COLLEGE_CARD,
  CollegeEmpty,
  CollegePageHeader,
  CollegeStats,
} from '@/components/college/ui/CollegeUi';
import {
  createDemoTryToken,
  demoTryUrl,
  getDemoTryStatus,
  type DemoTryStatus,
  type DemoTryToken,
} from '@/lib/demoTry';

/* ==========================================================================
   ELE-1854 — "Try it on your phone", the presenter's screen.

   Shows a QR that lets ONE visitor in as a throwaway demo learner at the demo
   college. The page watches the code: once someone scans it, it says who got
   in and puts up the next code by itself. A code that nobody scans runs out
   after 15 minutes and is replaced. Only works in the demo college; the
   account is made by the college-demo-try edge function.
   ========================================================================== */

const HELP: PageHelpContent = {
  id: 'college-try-on-phone',
  title: 'Try it on your phone',
  what: 'Put this on the screen at the end of a demo. Each person who scans the code gets their own demo learner account at the demo college, on their own phone, signed in already.',
  steps: [
    {
      title: 'Show the code',
      body: 'One code lets one person in. As soon as they are in, the next code appears.',
    },
    {
      title: 'They scan it',
      body: 'The phone camera opens a link. In a few seconds they are a learner in a demo cohort, with a demo tutor, lessons and quizzes.',
    },
    {
      title: 'It tidies itself up',
      body: 'Each visit lasts two hours. The account is shut then, and deleted after 48 hours.',
    },
  ],
  notes: [
    {
      title: 'Limits',
      body: 'Ten visitors a day for the demo college and three per network an hour, so a code that gets shared cannot fill the college with accounts.',
    },
    {
      title: 'Safe by design',
      body: 'Visitors only ever join the demo college, in a cohort led by a demo tutor. Nothing they do reaches a real college, tutor or learner, and no email is sent.',
    },
  ],
};

export default function CollegeTryOnPhonePage() {
  const [token, setToken] = useState<DemoTryToken | null>(null);
  const [status, setStatus] = useState<DemoTryStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [justIn, setJustIn] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const minting = useRef(false);

  const mint = useCallback(async () => {
    if (minting.current) return;
    minting.current = true;
    try {
      const t = await createDemoTryToken();
      setToken(t);
      setError(null);
      setStatus((s) => (s ? { ...s, used: false, expired: false, visitor_name: null } : s));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      minting.current = false;
    }
  }, []);

  useEffect(() => {
    void mint();
  }, [mint]);

  // Watch the code: a scan swaps in the next one; an unscanned code is renewed when it runs out.
  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    const tick = async () => {
      setNow(Date.now());
      try {
        const s = await getDemoTryStatus(token.token_id);
        if (cancelled || !s) return;
        setStatus(s);
        if (s.used) {
          setJustIn(s.visitor_name ?? 'A visitor');
          if (s.visitors_today < s.daily_limit) void mint();
          else setToken(null);
        } else if (s.expired) {
          void mint();
        }
      } catch {
        /* keep the code up; try again next tick */
      }
    };
    void tick();
    const id = window.setInterval(() => void tick(), 3000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [token, mint]);

  const secondsLeft = token
    ? Math.max(0, Math.round((new Date(token.expires_at).getTime() - now) / 1000))
    : 0;
  const notDemo = error && /demo college/i.test(error);
  const full = status ? status.visitors_today >= status.daily_limit : false;

  return (
    <HubPage ground="landing">
      <HubMasthead section="College" title="Try it on your phone" backTo="/college" />
      <HubBody hidePushPrompt>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <CollegePageHeader
            eyebrow="Demo college"
            title="Try it on your phone"
            description="Scan the code with your phone camera. You will be a learner at the demo college in a few seconds, on your own phone."
            help={HELP}
          />

          {notDemo ? (
            <CollegeEmpty
              title="Only in the demo college"
              body="This screen lets visitors try a demo learner account. It works in the Elec-Mate demo college only, never in a real college."
            />
          ) : (
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <section className={cn(COLLEGE_CARD, 'flex flex-col items-center gap-4 text-center')}>
                {token && !full ? (
                  <>
                    <div className="rounded-2xl bg-white p-4 sm:p-5" data-testid="try-qr">
                      <QRCodeSVG
                        value={demoTryUrl(token.token)}
                        size={280}
                        level="M"
                        className="h-auto w-[240px] sm:w-[280px]"
                      />
                    </div>
                    <p className="text-[13px] text-white">
                      This code lets one person in. It runs out in{' '}
                      <span className="font-semibold tabular-nums">
                        {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}
                      </span>
                      .
                    </p>
                    <a
                      href={demoTryUrl(token.token)}
                      className="break-all text-[12px] text-white underline underline-offset-2"
                      data-testid="try-link"
                    >
                      {demoTryUrl(token.token)}
                    </a>
                  </>
                ) : full ? (
                  <div className="py-10">
                    <p className="text-[17px] font-semibold text-white">
                      That is everyone for today
                    </p>
                    <p className="mt-2 text-[13.5px] text-white">
                      The demo college takes ten visitors a day. New codes are back tomorrow.
                    </p>
                  </div>
                ) : (
                  <div className="py-10 text-[14px] text-white">{error ?? 'Making a code…'}</div>
                )}
                {justIn && (
                  <p
                    className="rounded-full border border-emerald-400/50 px-3 py-1.5 text-[13px] font-semibold text-emerald-300"
                    data-testid="try-just-in"
                  >
                    {justIn} is in. The next code is up.
                  </p>
                )}
              </section>

              <section className="space-y-4">
                <CollegeStats
                  items={[
                    {
                      label: 'Visitors today',
                      value: status ? `${status.visitors_today} of ${status.daily_limit}` : '…',
                      sub: 'Ten a day for the demo college',
                    },
                    {
                      label: 'Trying it now',
                      value: status ? String(status.live_now) : '…',
                      sub: 'Each visit lasts two hours',
                    },
                  ]}
                />
                <div className={cn(COLLEGE_CARD, 'space-y-3')}>
                  <p className="text-[15px] font-semibold text-white">What the visitor gets</p>
                  <ol className="space-y-2 text-[13.5px] leading-relaxed text-white">
                    <li>
                      1. Their own demo learner, signed in, in a demo cohort with a demo tutor.
                    </li>
                    <li>2. Lessons, quizzes, hours and evidence, as an apprentice sees them.</li>
                    <li>
                      3. A bar on screen saying it is a demo, with the time left and an end button.
                    </li>
                  </ol>
                  <p className="text-[13px] leading-relaxed text-white">
                    The account closes after two hours and is deleted after 48. Nothing reaches a
                    real college, tutor or learner.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => void mint()}
                      className={COLLEGE_BTN_PRIMARY}
                    >
                      New code
                    </button>
                    {token && (
                      <button
                        type="button"
                        onClick={() => void navigator.clipboard?.writeText(demoTryUrl(token.token))}
                        className={COLLEGE_BTN}
                      >
                        Copy link
                      </button>
                    )}
                  </div>
                </div>
              </section>
            </div>
          )}
        </motion.div>
      </HubBody>
    </HubPage>
  );
}
