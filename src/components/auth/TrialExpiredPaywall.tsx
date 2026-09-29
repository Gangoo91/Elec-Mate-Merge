import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Capacitor } from '@capacitor/core';
import { motion, useReducedMotion, type MotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { storageGetSync, storageRemoveSync } from '@/utils/storage';
import { trackInitiateCheckout } from '@/lib/marketing-pixels';
import { fireServerCapi } from '@/lib/attribution';

type PriceInfo = {
  planId: string;
  priceId: string;
  label: string;
  price: string;
  amount: number;
};

const ROLE_TO_PRICE: Record<string, PriceInfo> = {
  electrician: {
    planId: 'electrician-monthly',
    priceId: 'price_1TnbOh2RKw5t5RAmsf2KcHT6',
    label: 'Electrician',
    price: '£19.99',
    amount: 19.99,
  },
  apprentice: {
    planId: 'apprentice-monthly',
    priceId: 'price_1TnbOk2RKw5t5RAmiOCTkqS3',
    label: 'Apprentice',
    price: '£6.99',
    amount: 6.99,
  },
};

const FEATURES = [
  {
    title: 'Every BS 7671 certificate',
    detail: 'EICR, EIC, Minor Works and 16 more — signed on site, A4:2026 ready.',
  },
  {
    title: 'Quotes and invoices',
    detail: 'Branded, tracked and chased automatically — paid by card or Apple Pay.',
  },
  {
    title: '5 AI specialists',
    detail: 'Cost engineer, circuit designer, RAMS and more — trained on BS 7671.',
  },
  {
    title: '70+ electrical calculators',
    detail: 'Cable sizing, volt drop, Zs, fault current — all BS 7671 compliant.',
  },
  {
    title: 'Full Study Centre',
    detail: '46+ courses, mock exams and CPD tracking.',
  },
];

const SUPPORT_EMAIL = 'founder@elec-mate.com';

// "Mr Philip Henwood" must greet Philip, not Mr. Names are stored however the
// person typed them, titles included — the lifecycle emails got this wrong.
const TITLES = new Set(['mr', 'mrs', 'ms', 'miss', 'mx', 'dr', 'sir', 'prof']);
const firstNameOf = (fullName: string | null | undefined): string | null => {
  if (!fullName) return null;
  const parts = fullName.trim().split(/\s+/);
  const first = parts.find((p) => !TITLES.has(p.replace(/\./g, '').toLowerCase()));
  if (!first || first.includes('@')) return null;
  return first.charAt(0).toUpperCase() + first.slice(1);
};

const formatDate = (iso: string): string => {
  const d = new Date(iso);
  const sameYear = d.getFullYear() === new Date().getFullYear();
  return d.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    ...(sameYear ? {} : { year: 'numeric' }),
  });
};

/**
 * What they built while subscribed — real counts, shown only when non-zero.
 * Both tables let a user read their own rows regardless of subscription, so
 * this works on a lapsed account. A failed count hides the line, never the page.
 */
const useSavedWork = (userId: string | undefined, enabled: boolean) =>
  useQuery({
    queryKey: ['paywall-saved-work', userId],
    enabled: !!userId && enabled,
    staleTime: 10 * 60 * 1000,
    queryFn: async () => {
      const [certs, quotes] = await Promise.all([
        supabase
          .from('reports')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', userId!)
          .is('deleted_at', null)
          .neq('status', 'auto-draft'),
        supabase
          .from('quotes')
          .select('id', { count: 'exact', head: true })
          .eq('user_id', userId!)
          .is('deleted_at', null),
      ]);
      return {
        certificates: certs.error ? 0 : (certs.count ?? 0),
        quotes: quotes.error ? 0 : (quotes.count ?? 0),
      };
    },
  });

const TrialExpiredPaywall = () => {
  const navigate = useNavigate();
  const { user, profile, trialEndsAt, signOut } = useAuth();
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const role = profile?.role || storageGetSync('elec-mate-profile-role') || 'electrician';
  const priceInfo = ROLE_TO_PRICE[role] || ROLE_TO_PRICE.electrician;
  const platform = Capacitor.getPlatform();
  const isNative = Capacitor.isNativePlatform();
  const storeName = platform === 'android' ? 'Google Play' : 'the App Store';

  // Returning customer = they have had a subscription before. create-checkout
  // gives NO second trial to anyone with a prior subscription to the product
  // and charges on the spot, so promising "7 days free, £0 today" here was
  // untrue for exactly these people. `subscription_end` is written by the
  // Stripe and RevenueCat webhooks when a subscription ends; a never-subscribed
  // account has none. When in doubt this errs towards "billed today" — nobody
  // is promised a trial they will not get.
  const endedAt = profile?.subscription_end ?? null;
  const isReturning = !!endedAt && new Date(endedAt).getTime() < Date.now();

  const trialEnded = !isReturning && !!trialEndsAt && new Date(trialEndsAt).getTime() < Date.now();

  const firstName = firstNameOf(profile?.full_name);
  const { data: saved } = useSavedWork(user?.id, isReturning || trialEnded);
  const reduceMotion = useReducedMotion();

  const startCheckout = useCallback(async () => {
    if (isStarting) return;

    // Native devices must use StoreKit / Play Billing via RevenueCat — Stripe
    // Checkout isn't allowed there. /checkout-trial runs the in-app purchase.
    if (isNative) {
      navigate('/checkout-trial');
      return;
    }

    setIsStarting(true);
    setError(null);

    try {
      const offerCode = storageGetSync('elec-mate-offer-code');
      const referralCode = storageGetSync('elec-mate-referral-code');

      const { data, error: fnErr } = await supabase.functions.invoke('create-checkout', {
        body: {
          priceId: priceInfo.priceId,
          mode: 'subscription',
          planId: priceInfo.planId,
          offerCode,
          referralCode,
        },
      });

      if (fnErr) throw new Error(fnErr.message);
      // Payment already went through (webhook still syncing) — go straight in
      if (data?.already_subscribed) {
        window.location.assign('/dashboard');
        return;
      }
      if (!data?.url) throw new Error('No checkout URL returned');

      const eventId = trackInitiateCheckout({
        value: priceInfo.amount,
        currency: 'GBP',
        contentName: priceInfo.label,
        contentIds: [priceInfo.priceId],
      });
      fireServerCapi({
        event_name: 'InitiateCheckout',
        event_id: eventId,
        email: user?.email || undefined,
        user_id: user?.id,
        value: priceInfo.amount,
        currency: 'GBP',
        content_name: priceInfo.label,
      });

      if (offerCode) storageRemoveSync('elec-mate-offer-code');
      if (referralCode) storageRemoveSync('elec-mate-referral-code');
      window.location.replace(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not start checkout. Please try again.');
      setIsStarting(false);
    }
  }, [isStarting, isNative, navigate, priceInfo, user?.email, user?.id]);

  const handleSignOut = async () => {
    await signOut();
    window.location.replace('/');
  };

  // ── Copy — one source per state, so the two layouts cannot disagree ──────
  const headline = isReturning
    ? firstName
      ? `Welcome back, ${firstName}.`
      : 'Welcome back.'
    : trialEnded
      ? 'Your free week has ended.'
      : "Everything's ready when you are.";

  const lede = isReturning
    ? `Your subscription ended on ${formatDate(endedAt!)}. Your account is exactly as you left it — resubscribe and it all opens up again.`
    : trialEnded
      ? `Your trial finished on ${formatDate(String(trialEndsAt))}. Your account is exactly as you left it.`
      : 'Start your free week and the whole app unlocks. Nothing is charged for 7 days.';

  const ctaLabel = isReturning
    ? `Resubscribe — ${priceInfo.price}/month`
    : 'Start 7-day free trial';

  const billingNote = isNative
    ? `Billed through ${storeName}. Cancel any time in your ${platform === 'android' ? 'Play Store' : 'Apple'} subscriptions.`
    : isReturning
      ? 'Secure checkout by Stripe · Apple Pay, Google Pay or card'
      : 'Secure checkout by Stripe · No charge during your trial';

  const steps = isReturning
    ? [
        { when: 'Today', what: `${priceInfo.price} — everything unlocks straight away.` },
        { when: 'Monthly', what: `${priceInfo.price} on the same date each month.` },
        {
          when: 'Any time',
          what: "Cancel from Settings. You keep access to the end of the month you've paid for.",
        },
      ]
    : [
        { when: 'Today', what: 'Everything unlocks. £0 charged.' },
        { when: 'Before day 8', what: "We email you a reminder, with the date you'd be charged." },
        { when: 'Day 8', what: `${priceInfo.price}/month — only if you keep it.` },
      ];

  // ── Motion — a short settle on arrival, nothing on reduced motion ────────
  const rise = (i: number): MotionProps =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.42, delay: 0.05 + i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
        };

  // ── Pieces ───────────────────────────────────────────────────────────────
  const planLine = (
    <div className="flex items-center justify-between gap-3">
      <p className="text-[14px] font-semibold tracking-[-0.01em] text-white">
        {priceInfo.label} <span className="font-normal">· monthly</span>
      </p>
      {!isReturning && (
        <p className="text-[13px] font-semibold text-elec-yellow">7 days free</p>
      )}
    </div>
  );

  const priceBlock = (
    <div>
      {planLine}
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-[60px] font-extrabold leading-[0.9] tracking-[-0.05em] text-white tabular-nums lg:text-[68px]">
          {isReturning ? priceInfo.price : '£0'}
        </span>
        <span className="text-[16px] font-medium text-white">
          {isReturning ? 'a month' : 'today'}
        </span>
      </div>
      <p className="mt-3 text-[14px] leading-[1.5] text-white">
        {isReturning ? (
          <>Billed today, then monthly. Cancel any time.</>
        ) : (
          <>
            Then <span className="font-semibold">{priceInfo.price} a month</span>. Cancel any time.
          </>
        )}
      </p>

      {/* How the money works — stacked rows, so a phone never wastes a column */}
      <ol className="mt-6 border-t border-white/[0.12]">
        {steps.map((s, i) => (
          <li key={s.when} className="flex gap-3.5 border-b border-white/[0.12] py-3.5">
            <span
              aria-hidden
              className={cn(
                'mt-[5px] h-2 w-2 flex-shrink-0 rounded-full',
                i === 0 ? 'bg-elec-yellow' : 'border border-white/[0.5]'
              )}
            />
            <div className="min-w-0">
              <p className="text-[13px] font-semibold leading-tight text-white">{s.when}</p>
              <p className="mt-1 text-[13.5px] leading-[1.5] text-white">{s.what}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );

  const savedWork =
    saved && (saved.certificates > 0 || saved.quotes > 0) ? (
      <div className="grid grid-cols-2 border-y border-white/[0.12]">
        {[
          { n: saved.certificates, label: saved.certificates === 1 ? 'certificate' : 'certificates' },
          { n: saved.quotes, label: saved.quotes === 1 ? 'quote' : 'quotes' },
        ].map((c, i) => (
          <div key={c.label} className={cn('py-4', i === 1 && 'border-l border-white/[0.12] pl-5')}>
            <p className="text-[32px] font-bold leading-none tracking-[-0.04em] text-white tabular-nums">
              {c.n}
            </p>
            <p className="mt-1.5 text-[13px] text-white">{c.label} saved</p>
          </div>
        ))}
      </div>
    ) : null;

  const featureList = (
    <ol className="grid border-t border-white/[0.12] sm:grid-cols-2 sm:gap-x-8">
      {FEATURES.map((f, i) => (
        <li
          key={f.title}
          className={cn(
            'grid grid-cols-[2rem_1fr] gap-1.5 border-b border-white/[0.12] py-4',
            // An odd last item spans both columns rather than leaving a hole.
            i === FEATURES.length - 1 && FEATURES.length % 2 === 1 && 'sm:col-span-2'
          )}
        >
          <span className="pt-[3px] text-[12px] font-semibold tabular-nums text-elec-yellow">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="min-w-0">
            <p className="text-[15px] font-semibold leading-tight tracking-[-0.015em] text-white">
              {f.title}
            </p>
            <p className="mt-1.5 text-[13px] leading-[1.55] text-white">{f.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );

  const cta = (
    <Button
      onClick={startCheckout}
      disabled={isStarting}
      // md: variants pinned — the default Button size drops to h-10 / text-sm from md up.
      className="h-14 w-full touch-manipulation rounded-xl bg-elec-yellow text-[16px] font-bold tracking-[-0.01em] text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] transition-transform hover:bg-elec-yellow/90 active:scale-[0.985] disabled:bg-white/[0.1] disabled:text-white md:h-14 md:text-[16px]"
    >
      {isStarting ? <Loader2 className="h-5 w-5 animate-spin" /> : ctaLabel}
    </Button>
  );

  const errorBox = error && (
    <p
      role="alert"
      className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-[13px] text-orange-300"
    >
      {error}
    </p>
  );

  const help = (
    <div>
      <p className="text-[14px] font-semibold text-white">Stuck getting in?</p>
      <p className="mt-1 text-[13px] leading-[1.6] text-white">
        Email <span className="select-all font-semibold text-elec-yellow">{SUPPORT_EMAIL}</span>.
        It comes straight to Andrew, the founder, who usually replies the same day.
      </p>
    </div>
  );

  return (
    // bg-background, not bg-black — the app's page root is #0a0a0a everywhere.
    <div className="min-h-[100svh] bg-background text-white">
      {/* Top bar — brand left, the only exit right */}
      <header className="mx-auto flex max-w-[1120px] items-center justify-between px-4 pt-[calc(env(safe-area-inset-top)+10px)] sm:px-8 lg:px-12">
        <div className="flex items-center gap-2.5">
          <img src="/logo.jpg" alt="" className="h-8 w-8 rounded-lg" />
          <span className="text-[17px] font-bold tracking-[-0.02em]">
            Elec-<span className="text-elec-yellow">Mate</span>
          </span>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="-mr-2 inline-flex h-11 touch-manipulation items-center px-2 text-[14px] font-medium text-white transition-colors hover:text-elec-yellow"
        >
          Sign out
        </button>
      </header>

      <main
        className={cn(
          'mx-auto max-w-[1120px] px-4 sm:px-8 lg:px-12',
          // Room for the fixed CTA strip on phones and tablets; desktop has it inline.
          'pb-[calc(env(safe-area-inset-bottom)+136px)] lg:pb-20'
        )}
      >
        <div className="mx-auto max-w-[640px] lg:grid lg:max-w-none lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start lg:gap-20 lg:pt-20 xl:gap-24">
          {/* Left — who they are, what's waiting, what they get */}
          <section className="pt-9 sm:pt-14 lg:pt-0">
            <motion.h1
              {...rise(0)}
              className="text-[36px] font-extrabold leading-[1.02] tracking-[-0.045em] [text-wrap:balance] sm:text-[46px] lg:text-[56px]"
            >
              {headline}
            </motion.h1>
            <motion.p
              {...rise(1)}
              className="mt-4 max-w-[32rem] text-[16px] leading-[1.6] text-white sm:text-[17px]"
            >
              {lede}
            </motion.p>

            {savedWork && (
              <motion.div {...rise(2)} className="mt-7 max-w-[26rem]">
                {savedWork}
              </motion.div>
            )}

            {/* Offer — under the intro on phones and tablets, a panel on desktop */}
            <motion.div {...rise(3)} className="mt-9 lg:hidden">
              {priceBlock}
            </motion.div>

            <motion.div {...rise(4)} className="mt-11 lg:mt-14">
              <h2 className="mb-1 text-[15px] font-semibold tracking-tight text-white">
                {isReturning ? 'What you get back' : 'What you unlock'}
              </h2>
              {featureList}
            </motion.div>

            <motion.div {...rise(5)} className="mt-10 max-w-[30rem]">
              {help}
            </motion.div>
          </section>

          {/* Desktop — the offer panel, pinned while the left column scrolls */}
          <motion.aside {...rise(2)} className="hidden lg:sticky lg:top-12 lg:block">
            <div className="rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.025] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_60px_-20px_rgba(0,0,0,0.6)]">
              {priceBlock}
              <div className="mt-7 space-y-3">
                {errorBox}
                {cta}
                <p className="text-center text-[12px] leading-snug text-white">{billingNote}</p>
              </div>
            </div>
          </motion.aside>
        </div>
      </main>

      {/* Phones and tablets — CTA pinned under the thumb. Flat strip, not a card. */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/[0.1] bg-background/95 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 backdrop-blur-md sm:px-8 lg:hidden">
        <div className="mx-auto max-w-[640px] space-y-2">
          {errorBox}
          {cta}
          <p className="text-center text-[11.5px] leading-snug text-white">{billingNote}</p>
        </div>
      </div>
    </div>
  );
};

export default TrialExpiredPaywall;
