import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { cn } from '@/lib/utils';
import { PhoneChatMock } from './PhoneChatMock';
import { FounderBanner } from './FounderBanner';
import { stripePrices } from '@/data/stripePrices';
import { capabilityGroups } from './mateCapabilities';
import { useMateFounderCount } from '@/hooks/useMateFounderCount';

// ─── Animation ────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

// ─── Content ─────────────────────────────────────────────────────────────────
// Small inline accent for yellow pull-words
const Y = ({ children }: { children: React.ReactNode }) => (
  <span className="text-elec-yellow font-semibold">{children}</span>
);

interface Capability {
  title: string;
  body: React.ReactNode;
}

const CAPABILITIES: Capability[] = [
  {
    title: 'Actually talk to Mate',
    body: (
      <>
        <Y>Two-way voice</Y> conversations — speak hands-free, hear the reply. Perfect for the van,
        the ladder, or when your hands are covered in dust.
      </>
    ),
  },
  {
    title: 'Morning brief at 7am',
    body: (
      <>
        Today&apos;s schedule, overdue invoices, urgent tasks and anything needing attention —{' '}
        <Y>one message</Y> before you turn the key.
      </>
    ),
  },
  {
    title: 'Photo becomes a quote',
    body: (
      <>
        Send a photo of a consumer unit or an install. Mate <Y>drafts the quote</Y> — materials,
        labour, the lot.
      </>
    ),
  },
  {
    title: 'Calendar and bookings',
    body: (
      <>
        Create, move and update jobs in your Elec-Mate calendar from chat. Share a{' '}
        <Y>booking link</Y> — clients pick their own slot.
      </>
    ),
  },
  {
    title: 'Plan my day',
    body: (
      <>
        Say the words and Mate returns an <Y>optimised route</Y> between today&apos;s jobs, with
        live traffic and a 3-day weather outlook.
      </>
    ),
  },
  {
    title: 'Quotes that chase themselves',
    body: (
      <>
        Drafted, sent, <Y>followed up automatically</Y>. Opens and clicks tracked. Clients who go
        quiet get a polite nudge.
      </>
    ),
  },
  {
    title: 'Invoices with Stripe links',
    body: (
      <>
        <Y>One-tap pay links</Y>. Safety checks block £0 errors and flag duplicates within 7 days —
        before they leave your hand.
      </>
    ),
  },
  {
    title: 'RAMS in three minutes',
    body: (
      <>
        Full Risk Assessment and Method Statement generated in <Y>about three minutes</Y>.
        Standalone method statements too.
      </>
    ),
  },
  {
    title: 'The regs, on tap',
    body: (
      <>
        <Y>BS 7671 A4:2026</Y> end-to-end — Zs tables, cable ratings, disconnection times, AFDDs,
        PNB, new schedule columns. Ask anything, get the specific citation in seconds.
      </>
    ),
  },
  {
    title: 'Live prices, on demand',
    body: (
      <>
        Ask for the cost of a Hager CU, a 100m reel of 2.5mm T&amp;E, or a specific RCD — Mate pulls{' '}
        <Y>live pricing from UK wholesalers</Y> and brings back options to compare.
      </>
    ),
  },
  {
    title: 'Expenses to Xero',
    body: (
      <>
        Photo a receipt. Mate extracts line items and VAT, categorises, syncs to{' '}
        <Y>Xero or QuickBooks</Y>. HMRC mileage logged too.
      </>
    ),
  },
  {
    title: 'Business intelligence',
    body: (
      <>
        Revenue forecast, cash flow, top clients, inactive clients, seasonal trends, at-risk alerts.{' '}
        <Y>Answers in seconds</Y>.
      </>
    ),
  },
  {
    title: 'Email assistant',
    body: (
      <>
        Forward a customer email. Mate classifies, drafts your reply <Y>in your tone</Y>, waits for
        your OK before sending.
      </>
    ),
  },
];

// PhoneChatMock + chat sequence now live in ./PhoneChatMock — both this view
// and the onboarding view consume it.

const TRUST_POINTS = [
  'Mate never sends anything client-facing without your explicit OK.',
  'Every action Mate takes is logged to a full audit trail.',
  'STOP or opt-out stops all outbound instantly.',
  'Your data never trains a public model.',
];

// ─── Component ────────────────────────────────────────────────────────────────
export function BusinessAISalesView() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [starting, setStarting] = useState(false);
  const [phoneSheetOpen, setPhoneSheetOpen] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Live founder programme — drives all pricing copy. While slots remain we
  // lead with £29.99 founder pricing; once the 100 cap is hit we fall back to
  // the regular £39.99 number. Stripe applies the discount automatically via
  // the founder coupon configured in supabase/functions/create-checkout.
  const { data: founderData, hasFounderSlots } = useMateFounderCount();
  const headlinePrice = hasFounderSlots ? '£29.99' : '£39.99';
  const slotsLeft = founderData?.slots_left ?? 0;
  const slotsCap = founderData?.cap ?? 100;

  // Opens the phone-capture sheet (or kicks to /auth if signed out)
  const handleStartTrial = useCallback(() => {
    if (!user?.id) {
      window.location.href = `/auth?redirect=${encodeURIComponent('/electrician/business-ai')}`;
      return;
    }
    setPhoneInput('');
    setPhoneError(null);
    setPhoneSheetOpen(true);
  }, [user?.id]);

  // Normalises "07xxxxxxxxx" / "7xxxxxxxxx" / "+447xxxxxxxxx" into E.164
  const normalisePhone = (raw: string): string | null => {
    const digits = raw.replace(/\D/g, '');
    let core: string;
    if (digits.startsWith('44')) core = digits.slice(2);
    else if (digits.startsWith('0')) core = digits.slice(1);
    else core = digits;
    if (!/^7[0-9]{9}$/.test(core)) return null;
    return `+44${core}`;
  };

  // Save the phone as a hint and redirect to Stripe Checkout. The 3-day trial,
  // founder coupon and webhook activation all sit downstream of this call —
  // see supabase/functions/create-checkout/index.ts (trial_period_days=3 for
  // planBase 'business-ai') and stripe-subscription-webhook (sets
  // business_ai_enabled=true). After the user pays, PaymentSuccess routes them
  // back to /electrician/business-ai where the state machine flips into the
  // onboarding (deep-link activation) view.
  const handleStartCheckout = useCallback(async () => {
    if (!user?.id) return;
    const phone = normalisePhone(phoneInput);
    if (!phone) {
      setPhoneError('Enter a valid UK mobile (e.g. 07700 900123)');
      return;
    }
    setPhoneError(null);
    try {
      setStarting(true);

      // Save phone as a hint on the profile. The actual verified WhatsApp
      // number is set later by the wa-onboarding flow when the user sends the
      // activation code from their device — that flow overwrites this hint.
      await supabase.from('profiles').update({ agent_whatsapp_number: phone }).eq('id', user.id);

      const { data, error } = await supabase.functions.invoke<{ url?: string; error?: string }>(
        'create-checkout',
        {
          body: {
            priceId: stripePrices.monthly.business_ai,
            mode: 'subscription',
            planId: 'business-ai-monthly',
          },
        }
      );

      if (error) throw new Error(error.message);
      if (data?.error) throw new Error(data.error);
      if (!data?.url) throw new Error('Checkout session unavailable. Please try again.');

      // Hard redirect to Stripe.
      window.location.href = data.url;
    } catch (err) {
      console.error('[Mate sales] checkout error:', err);
      const message = err instanceof Error ? err.message : 'Could not start checkout.';
      setPhoneError(message);
      toast({ title: 'Checkout unavailable', description: message, variant: 'destructive' });
      setStarting(false);
    }
  }, [phoneInput, toast, user?.id]);

  const PrimaryCta = ({ size = 'lg' }: { size?: 'lg' | 'md' }) => (
    <Button
      onClick={handleStartTrial}
      disabled={starting}
      className={cn(
        'font-bold rounded-full active:scale-[0.98] touch-manipulation transition-all relative',
        size === 'lg'
          ? 'h-16 sm:h-[72px] px-9 sm:px-14 text-[17px] sm:text-lg'
          : 'h-12 px-6 text-[15px]',
        'bg-elec-yellow text-black hover:bg-elec-yellow/90 hover:scale-[1.02]',
        'shadow-[0_25px_80px_-15px_rgba(250,204,21,0.55)] ring-1 ring-elec-yellow/40'
      )}
    >
      {starting ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <>
          Start your 3-day free trial
          <ArrowRight
            className={cn('ml-2.5', size === 'lg' ? 'h-5 w-5 sm:h-6 sm:w-6' : 'h-5 w-5')}
          />
        </>
      )}
    </Button>
  );

  return (
    <div className="min-h-screen bg-background text-white pb-[calc(env(safe-area-inset-bottom)+72px)] lg:pb-0">
      {/* Top nav */}
      <div className="px-4 sm:px-6 pt-3 pb-1 max-w-6xl mx-auto">
        <Link to="/electrician">
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] active:scale-[0.98] -ml-2 h-11 touch-manipulation transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Electrical Hub
          </Button>
        </Link>
      </div>

      {/* ═════════ HERO ═════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-elec-yellow/[0.05] blur-[120px]" />
        <motion.div
          initial="visible"
          animate="visible"
          variants={stagger}
          className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-8 sm:pt-20 pb-12 sm:pb-24 text-center"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 mb-7 sm:mb-10">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-elec-yellow animate-ping opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-elec-yellow" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white">
              {hasFounderSlots
                ? `Founder pricing · only ${slotsLeft} of ${slotsCap} left`
                : 'Live · 3-day free trial'}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-[44px] sm:text-[88px] lg:text-[120px] xl:text-[136px] font-bold tracking-[-0.04em] leading-[0.9] text-white"
          >
            Stop drowning in admin.
            <br />
            <span className="text-elec-yellow">Text Mate.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 sm:mt-9 text-lg sm:text-2xl lg:text-[26px] text-white max-w-3xl mx-auto leading-[1.4]"
          >
            The first AI business partner built for sparks — lives on <Y>WhatsApp</Y>, listens to
            voice notes, talks back through your earbuds, and gets the admin done while you{' '}
            <Y>stay on the tools</Y>.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 sm:mt-14 flex flex-col items-center gap-7 sm:gap-9"
          >
            {hasFounderSlots ? (
              <div className="text-center space-y-1.5">
                <p className="text-base sm:text-lg text-white">
                  <Y>3 days free.</Y> Then lock in{' '}
                  <span className="font-bold text-elec-yellow">£29.99/month forever</span>.
                </p>
                <p className="text-[13px] sm:text-sm text-white/60">
                  Replaces your Electrician sub · roughly <Y>£15 extra</Y> to add Mate
                </p>
              </div>
            ) : (
              <p className="text-base sm:text-lg text-white text-center">
                <Y>3 days free</Y>, then <span className="font-bold">£39.99/month</span> — replaces
                your Electrician sub.
              </p>
            )}

            <div className="flex flex-col items-center gap-3.5">
              <PrimaryCta size="lg" />
              <p className="text-[12px] sm:text-[13px] text-white/55 text-center">
                3 days totally free · no charge until day 4 · cancel any time
                {hasFounderSlots && (
                  <>
                    {' · '}then £39.99 after first {slotsCap}
                  </>
                )}
              </p>
            </div>
          </motion.div>

          {/* Founder banner — live counter, hides itself when slots are full */}
          <motion.div variants={fadeUp} className="mt-10 sm:mt-12 max-w-2xl mx-auto">
            <FounderBanner />
          </motion.div>
        </motion.div>
      </section>

      {/* ═════════ PAIN HOOK ════════════════════════════════════════ */}
      <section className="relative border-t border-white/[0.06]">
        <motion.div
          initial="visible"
          animate="visible"
          variants={stagger}
          className="max-w-3xl mx-auto px-5 sm:px-8 py-16 sm:py-24"
        >
          <motion.p
            variants={fadeUp}
            className="text-[11px] font-bold uppercase tracking-[0.22em] text-elec-yellow mb-6"
          >
            Tonight, after the job
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-3xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-white mb-10"
          >
            You finish at 5. By 9pm, you still need to:
          </motion.h2>
          <motion.ul variants={stagger} className="space-y-4 sm:space-y-5">
            {[
              'Draft three quotes from memory',
              "Chase Henderson's invoice. Again.",
              'Type the same RAMS for the fifth time this month',
              'Sort receipts for the accountant',
              'Reply about a fault you wrote about last week',
              'Send that EICR you keep forgetting',
            ].map((line) => (
              <motion.li
                key={line}
                variants={fadeUp}
                className="flex items-start gap-4 text-lg sm:text-2xl text-white font-medium leading-snug"
              >
                <span className="mt-3 h-[2px] w-8 rounded-full bg-white/25 shrink-0 sm:mt-[18px]" />
                <span>{line}</span>
              </motion.li>
            ))}
          </motion.ul>
          <motion.p
            variants={fadeUp}
            className="mt-12 text-2xl sm:text-4xl font-bold tracking-[-0.02em] text-white"
          >
            <span className="text-white">Or you just</span>{' '}
            <span className="text-elec-yellow">message Mate.</span>
          </motion.p>
        </motion.div>
      </section>

      {/* ═════════ PHONE CHAT — live demo ═══════════════════════════ */}
      <section className="relative">
        <motion.div
          initial="visible"
          animate="visible"
          variants={stagger}
          className="max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-24 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center"
        >
          <motion.div variants={fadeUp} className="space-y-5 order-1 lg:order-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-elec-yellow">
              Lives on WhatsApp
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.02] text-white">
              Just text. Or talk.
              <br />
              <span className="text-elec-yellow">Mate</span> does the rest.
            </h2>
            <p className="text-base sm:text-lg text-white leading-relaxed max-w-md">
              No new app. No extra login. Mate lives inside the chat app you already use — sends
              photos, listens to voice notes, and <Y>replies in a real voice</Y> through your
              earbuds.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="order-2 lg:order-2 flex justify-center">
            <PhoneChatMock />
          </motion.div>
        </motion.div>
      </section>

      {/* ═════════ HAVE A CRAIC — voice both ways ═══════════════════ */}
      <section className="relative border-t border-white/[0.06] overflow-hidden">
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-elec-yellow/[0.05] blur-[120px]" />
        <motion.div
          initial="visible"
          animate="visible"
          variants={stagger}
          className="relative max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-28"
        >
          <motion.div variants={fadeUp} className="max-w-2xl mb-12 sm:mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-elec-yellow mb-4">
              Voice notes — both ways
            </p>
            <h2 className="text-[44px] sm:text-[80px] lg:text-[88px] font-bold tracking-[-0.035em] leading-[0.95] text-white">
              Have a <Y>craic</Y>
              <br />
              with Mate.
            </h2>
            <p className="mt-7 text-lg sm:text-2xl text-white leading-[1.4]">
              Tap and talk on WhatsApp. Mate listens, gets on with the job, and <Y>talks back</Y>{' '}
              through your earbuds. Hands-free in the van. Eyes on the road. Business getting done.
            </p>
          </motion.div>

          <div className="divide-y divide-white/[0.06]">
            {[
              {
                you: '"Plan my day, Mate."',
                you_ctx: 'Voice note · 6:48am · driveway',
                back: 'Three jobs. Walsh first — twenty minutes if you go via the M60. Set off in eight.',
                back_ctx: 'Mate · spoken to your earbuds',
              },
              {
                you: '"What did I quote Walsh last week?"',
                you_ctx: 'Voice note · 11:12am · M62',
                back: 'Twelve hundred for the CU change, plus four-eighty for the EV charger. She opened it twice.',
                back_ctx: 'Mate · spoken back · still driving',
              },
              {
                you: '"Add a task — order MCBs for Friday."',
                you_ctx: 'Voice note · 14:35 · in the loft',
                back: 'Done. Friday morning, top of the list. I\u2019ll nudge you at 7.',
                back_ctx: 'Mate · spoken · two seconds later',
              },
            ].map((row) => (
              <motion.div
                key={row.you}
                variants={fadeUp}
                className="grid grid-cols-1 lg:grid-cols-2 gap-y-5 lg:gap-x-12 py-7 sm:py-10 items-start"
              >
                <div className="space-y-1.5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">
                    {row.you_ctx}
                  </p>
                  <p className="text-xl sm:text-2xl font-semibold tracking-[-0.015em] text-white leading-snug">
                    <span className="text-elec-yellow">&ldquo;</span>
                    {row.you.replace(/^"|"$/g, '')}
                    <span className="text-elec-yellow">&rdquo;</span>
                  </p>
                </div>
                <div className="space-y-1.5 lg:pl-6 lg:border-l lg:border-elec-yellow/30">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-elec-yellow">
                    {row.back_ctx}
                  </p>
                  <p className="text-xl sm:text-2xl font-semibold tracking-[-0.015em] text-white leading-snug">
                    {row.back}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={fadeUp}
            className="mt-10 sm:mt-14 text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl"
          >
            Voice in, voice out — natural cadence, real conversation. Mate is a colleague you can{' '}
            <Y>actually talk to</Y>.
          </motion.p>
        </motion.div>
      </section>

      {/* ═════════ WINS — day log ═══════════════════════════════════ */}
      <section className="relative border-t border-white/[0.06]">
        <motion.div
          initial="visible"
          animate="visible"
          variants={stagger}
          className="max-w-4xl mx-auto px-5 sm:px-8 py-14 sm:py-20"
        >
          <motion.div variants={fadeUp} className="mb-8 sm:mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-elec-yellow mb-3">
              A day with Mate
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] leading-[1.05] text-white">
              Four moments. One quiet evening.
            </h2>
          </motion.div>

          <div className="divide-y divide-white/[0.06]">
            {[
              { quote: 'That overdue invoice chased itself.', stamp: '09:42', tag: 'Invoice' },
              { quote: 'RAMS in 3 minutes, not 3 hours.', stamp: '11:08', tag: 'RAMS' },
              {
                quote: 'Quote drafted from a photo, while you ate your tea.',
                stamp: '14:18',
                tag: 'Quote',
              },
              {
                quote: 'Receipt scanned. Xero updated. Done.',
                stamp: '17:30',
                tag: 'Expenses',
              },
            ].map((win) => (
              <motion.div
                key={win.stamp}
                variants={fadeUp}
                className="grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-8 py-6 sm:py-8 items-start"
              >
                <div className="flex flex-col items-start gap-1 pt-1 min-w-[64px] sm:min-w-[92px]">
                  <span className="text-elec-yellow text-sm sm:text-base font-bold tabular-nums tracking-tight">
                    {win.stamp}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                    {win.tag}
                  </span>
                </div>
                <p className="text-xl sm:text-2xl font-semibold tracking-[-0.015em] leading-[1.2] text-white">
                  <span className="text-elec-yellow">&ldquo;</span>
                  {win.quote}
                  <span className="text-elec-yellow">&rdquo;</span>
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═════════ CAPABILITIES ═════════════════════════════════════ */}
      <section className="relative border-t border-white/[0.06]">
        <motion.div
          initial="visible"
          animate="visible"
          variants={stagger}
          className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-28"
        >
          <motion.div variants={fadeUp} className="max-w-2xl mb-12 sm:mb-20">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-elec-yellow mb-4">
              What Mate does
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.02] text-white">
              Built to make
              <br />
              admin <span className="text-elec-yellow">disappear.</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-white leading-relaxed">
              Every capability below is live inside Mate today — being tested by real electricians
              in active beta.
            </p>
          </motion.div>

          <div className="grid gap-y-9 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((cap) => (
              <motion.div key={cap.title} variants={fadeUp} className="group space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="h-1 w-5 rounded-full bg-elec-yellow/80 shrink-0" />
                  <h3 className="text-[17px] font-bold text-white tracking-tight">{cap.title}</h3>
                </div>
                <p className="text-[14px] leading-relaxed text-white pl-[30px]">{cap.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.p variants={fadeUp} className="mt-12 text-sm text-white leading-relaxed">
            <span className="text-elec-yellow font-bold uppercase tracking-wider text-[11px]">
              Plus
            </span>
            <span className="mx-2 text-white">·</span>
            snagging lists · client portal links · project templates · smart pricing suggestions ·
            completion checklists · audit trail of every action.
          </motion.p>
        </motion.div>
      </section>

      {/* ═════════ REAL PROMPTS — what you'd actually say to Mate ═══ */}
      <section className="relative border-t border-white/[0.06]">
        <motion.div
          initial="visible"
          animate="visible"
          variants={stagger}
          className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-28"
        >
          <motion.div variants={fadeUp} className="max-w-2xl mb-12 sm:mb-20">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-elec-yellow mb-4">
              What you&apos;d actually say
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.02] text-white">
              Plain English.
              <br />
              <span className="text-elec-yellow">Real answers.</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-white leading-relaxed">
              Every prompt below maps to a tool that&apos;s already wired up. Photos, voice notes
              and typed messages all work — Mate figures out the rest.
            </p>
          </motion.div>

          <div className="space-y-14 sm:space-y-20">
            {capabilityGroups.map((group) => (
              <motion.div
                key={group.id}
                variants={fadeUp}
                className="grid gap-5 sm:gap-8 lg:grid-cols-[260px_1fr]"
              >
                <div className="lg:pt-2 space-y-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-elec-yellow">
                    {group.title}
                  </p>
                  <p className="text-[13px] sm:text-sm text-white/65 leading-relaxed max-w-[240px]">
                    {group.strapline}
                  </p>
                </div>
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-3.5 sm:gap-y-4">
                  {group.prompts.map((prompt) => (
                    <li
                      key={prompt.text}
                      className="text-[17px] sm:text-xl font-semibold tracking-[-0.01em] leading-[1.3] text-white flex items-start gap-2"
                    >
                      {prompt.featured && (
                        <span
                          className="inline-block mt-2 h-1 w-3 rounded-full bg-elec-yellow shrink-0"
                          aria-label="Featured"
                        />
                      )}
                      <span className="flex-1">
                        <span className="text-elec-yellow">&ldquo;</span>
                        {prompt.text}
                        <span className="text-elec-yellow">&rdquo;</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═════════ MATE ↔ ELEC-MATE SYNC ═══════════════════════════ */}
      <section className="relative border-t border-white/[0.06]">
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-elec-yellow/[0.04] blur-[120px]" />
        <motion.div
          initial="visible"
          animate="visible"
          variants={stagger}
          className="relative max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-28"
        >
          <motion.div variants={fadeUp} className="max-w-3xl mb-12 sm:mb-20">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-elec-yellow mb-4">
              One business · two doors
            </p>
            <h2 className="text-4xl sm:text-[64px] font-bold tracking-[-0.02em] leading-[1] text-white">
              What happens in Mate,
              <br />
              happens in <span className="text-elec-yellow">Elec-Mate.</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-white leading-relaxed">
              Mate is the WhatsApp side of your Elec-Mate account. Send Mate a photo on the road —
              the quote shows up on your dashboard at the desk. Ask Mate &ldquo;who hasn&apos;t
              paid?&rdquo; — same answer as the Invoices page.{' '}
              <span className="text-elec-yellow font-semibold">
                One business, one source of truth.
              </span>
            </p>
          </motion.div>

          <div className="divide-y divide-white/[0.06]">
            {[
              {
                say: 'Photo of this CU on WhatsApp',
                arrow: 'becomes',
                appears: 'A draft quote in your Elec-Mate quotes list',
                where: '/electrician/quotes',
                whereLabel: 'Quotes',
              },
              {
                say: '"Add task: order MCBs Friday"',
                arrow: 'becomes',
                appears: 'A task on your Elec-Mate task list',
                where: '/electrician/tasks',
                whereLabel: 'Tasks',
              },
              {
                say: 'Photo of receipt',
                arrow: 'becomes',
                appears: 'A line in your Elec-Mate expenses, ready to sync to Xero',
                where: '/electrician/expenses',
                whereLabel: 'Expenses',
              },
              {
                say: '"Plan my day"',
                arrow: 'becomes',
                appears: 'An optimised route across the day in your install planner',
                where: '/electrician/install-planner',
                whereLabel: 'Install planner',
              },
              {
                say: '"Create RAMS for the Walsh job"',
                arrow: 'becomes',
                appears: 'A RAMS document in your Health & Safety section',
                where: '/electrician/health-safety',
                whereLabel: 'Health & Safety',
              },
              {
                say: '"Who hasn\u2019t paid?"',
                arrow: 'is',
                appears: 'The same answer as the Invoices · Outstanding view',
                where: '/electrician/invoices',
                whereLabel: 'Invoices',
              },
            ].map((row) => (
              <motion.div
                key={row.appears}
                variants={fadeUp}
                className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-y-3 lg:gap-x-10 py-7 sm:py-10 items-start lg:items-center"
              >
                <div className="space-y-1.5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">
                    On WhatsApp, you say
                  </p>
                  <p className="text-lg sm:text-2xl font-semibold tracking-[-0.015em] text-white leading-snug">
                    {row.say}
                  </p>
                </div>
                <div className="hidden lg:flex items-center gap-2 text-elec-yellow font-bold uppercase tracking-[0.22em] text-[11px]">
                  <span className="h-px w-8 bg-elec-yellow/40" />
                  {row.arrow}
                  <span className="h-px w-8 bg-elec-yellow/40" />
                </div>
                <div className="space-y-1.5 lg:text-right">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-elec-yellow">
                    In Elec-Mate · {row.whereLabel}
                  </p>
                  <p className="text-lg sm:text-2xl font-semibold tracking-[-0.015em] text-white leading-snug">
                    {row.appears}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={fadeUp}
            className="mt-10 sm:mt-14 text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl"
          >
            No re-keying. No copy-paste between apps. Mate writes straight into the same database
            your Elec-Mate dashboard reads from — so the apprentice on the desk and you on the van
            see the same business, in real time.
          </motion.p>
        </motion.div>
      </section>

      {/* ═════════ INTEGRATIONS ═══════════════════════════════════ */}
      <section className="relative border-t border-white/[0.06]">
        <motion.div
          initial="visible"
          animate="visible"
          variants={stagger}
          className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-20"
        >
          <motion.div variants={fadeUp} className="max-w-2xl mb-8 sm:mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-elec-yellow mb-3">
              Plugs into
            </p>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] leading-[1.05] text-white">
              Your existing stack.
            </h3>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-9 gap-y-5">
            {['WhatsApp', 'Stripe', 'Xero', 'QuickBooks', 'Gmail', 'Outlook', 'Google Maps'].map(
              (name) => (
                <span
                  key={name}
                  className="text-xl sm:text-2xl font-semibold text-white tracking-tight"
                >
                  {name}
                </span>
              )
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* ═════════ HOW IT WORKS ═════════════════════════════════════ */}
      <section className="relative border-t border-white/[0.06]">
        <motion.div
          initial="visible"
          animate="visible"
          variants={stagger}
          className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-28"
        >
          <motion.div variants={fadeUp} className="max-w-2xl mb-12 sm:mb-20">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-elec-yellow mb-4">
              How it works
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.02] text-white">
              Up and running
              <br />
              in under a minute.
            </h2>
          </motion.div>

          <div className="divide-y divide-white/[0.06]">
            {[
              {
                n: '01',
                title: 'Start your free trial',
                body: (
                  <>
                    Pop in your number and confirm in Stripe. <Y>3 days free</Y>, cancel anytime —
                    no charge until day four.
                  </>
                ),
              },
              {
                n: '02',
                title: 'Connect WhatsApp',
                body: (
                  <>
                    One tap opens WhatsApp with your activation code already typed. <Y>Hit send.</Y>{' '}
                    Mate is yours in five seconds.
                  </>
                ),
              },
              {
                n: '03',
                title: 'Get your evenings back',
                body: (
                  <>
                    Voice notes, photos, plain English — Mate handles the admin while you{' '}
                    <Y>stay on the tools</Y>.
                  </>
                ),
              },
            ].map((step) => (
              <motion.div
                key={step.n}
                variants={fadeUp}
                className="grid grid-cols-[auto_1fr] gap-x-6 sm:gap-x-10 py-7 sm:py-10 items-start"
              >
                <span className="text-3xl sm:text-5xl font-bold text-elec-yellow/60 tracking-tight tabular-nums">
                  {step.n}
                </span>
                <div className="space-y-2 pt-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-base text-white leading-relaxed max-w-xl">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═════════ PRICING — explained, not added on top ═══════════ */}
      <section className="relative border-t border-white/[0.06]">
        <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-elec-yellow/[0.04] blur-[120px]" />
        <motion.div
          initial="visible"
          animate="visible"
          variants={stagger}
          className="relative max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-28"
        >
          <motion.div variants={fadeUp} className="max-w-3xl mb-12 sm:mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-elec-yellow mb-4">
              How the pricing works
            </p>
            <h2 className="text-4xl sm:text-[64px] font-bold tracking-[-0.02em] leading-[1] text-white">
              It <Y>replaces</Y> your sub.
              <br />
              Not on top of it.
            </h2>
            <p className="mt-6 text-base sm:text-lg text-white leading-relaxed">
              Mate is a tier — not an add-on. Upgrade and{' '}
              <Y>£{hasFounderSlots ? '29.99' : '39.99'}/month becomes your subscription</Y>. You
              keep everything you had on Electrician (15 cert types, 9 AI specialists, calculators,
              CRM) and unlock the full Mate stack on WhatsApp on top.
            </p>
          </motion.div>

          <div className="divide-y divide-white/[0.06]">
            {[
              {
                from: 'On Apprentice',
                fromPrice: '£6.99/mo',
                arrow: 'becomes',
                to: hasFounderSlots ? '£29.99/mo founder' : '£39.99/mo',
                extra: hasFounderSlots
                  ? '£23 extra to unlock the lot'
                  : '£33 extra to unlock the lot',
                featured: false,
              },
              {
                from: 'On Electrician',
                fromPrice: '£14.99/mo',
                arrow: 'becomes',
                to: hasFounderSlots ? '£29.99/mo founder' : '£39.99/mo',
                extra: hasFounderSlots
                  ? 'Just £15 extra to add Mate'
                  : 'Just £25 extra to add Mate',
                featured: true,
              },
              {
                from: 'Brand new',
                fromPrice: 'No subscription yet',
                arrow: 'starts at',
                to: hasFounderSlots ? '£29.99/mo founder' : '£39.99/mo',
                extra: hasFounderSlots
                  ? 'Locked in for life — first 100 only'
                  : 'Cancel anytime, no contract',
                featured: false,
              },
            ].map((row) => (
              <motion.div
                key={row.from}
                variants={fadeUp}
                className={cn(
                  'grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-y-3 lg:gap-x-10 py-7 sm:py-10 items-start lg:items-center',
                  row.featured && 'relative'
                )}
              >
                {row.featured && (
                  <span className="absolute -left-2 top-7 sm:top-10 hidden lg:block h-8 w-1 rounded-full bg-elec-yellow" />
                )}
                <div className="space-y-1.5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/45">
                    {row.from}
                  </p>
                  <p className="text-xl sm:text-3xl font-bold tracking-[-0.015em] text-white leading-none tabular-nums">
                    {row.fromPrice}
                  </p>
                </div>
                <div className="hidden lg:flex items-center gap-2 text-elec-yellow font-bold uppercase tracking-[0.22em] text-[11px]">
                  <span className="h-px w-8 bg-elec-yellow/40" />
                  {row.arrow}
                  <span className="h-px w-8 bg-elec-yellow/40" />
                </div>
                <div className="space-y-1.5 lg:text-right">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-elec-yellow">
                    {row.extra}
                  </p>
                  <p className="text-xl sm:text-3xl font-bold tracking-[-0.015em] text-white leading-none tabular-nums">
                    {row.to}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            className="mt-10 sm:mt-14 grid gap-4 sm:gap-6 lg:grid-cols-3"
          >
            {[
              {
                t: 'Replaces, not adds',
                b: 'You don\u2019t pay both. £29.99 IS your sub now.',
              },
              {
                t: 'Keeps everything',
                b: 'All 9 AI specialists, 15 cert types, calculators, CRM, photos — still yours.',
              },
              {
                t: 'Plus the full Mate stack',
                b: 'WhatsApp, voice both ways, 197 tools, RAMS, photo-to-quote, day planner.',
              },
            ].map((card) => (
              <div
                key={card.t}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:p-6"
              >
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-elec-yellow mb-2">
                  {card.t}
                </div>
                <p className="text-sm sm:text-base text-white leading-relaxed">{card.b}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ═════════ TRUST ════════════════════════════════════════════ */}
      <section className="relative border-t border-white/[0.06]">
        <motion.div
          initial="visible"
          animate="visible"
          variants={stagger}
          className="max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-28"
        >
          <motion.div variants={fadeUp} className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-elec-yellow">
                Approval-first
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.02] text-white">
                Your business.
                <br />
                <span className="text-elec-yellow">Your call.</span>
              </h2>
              <p className="text-base text-white leading-relaxed max-w-md">
                Mate drafts. You approve. Nothing goes out — no email, no message, no invoice —
                without your green light.
              </p>
            </div>
            <motion.ul variants={stagger} className="space-y-5 self-center">
              {TRUST_POINTS.map((point) => (
                <motion.li key={point} variants={fadeUp} className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-6 rounded-full bg-elec-yellow shrink-0" />
                  <span className="text-base text-white leading-relaxed">{point}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </section>

      {/* ═════════ TESTIMONIAL ═════════════════════════════════════ */}
      <section className="relative border-t border-white/[0.06]">
        <motion.div
          initial="visible"
          animate="visible"
          variants={stagger}
          className="max-w-4xl mx-auto px-5 sm:px-8 py-16 sm:py-24"
        >
          <motion.div variants={fadeUp}>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-elec-yellow mb-6">
              From the beta
            </p>
            <blockquote className="text-2xl sm:text-4xl font-semibold tracking-[-0.015em] leading-[1.2] text-white">
              <span className="text-elec-yellow">&ldquo;</span>I used to spend an hour every night
              on admin — invoices, chasing, replying. Now I just message Mate. It does it, then
              tells me what it did. First tool that&apos;s actually given me time back.
              <span className="text-elec-yellow">&rdquo;</span>
            </blockquote>
            <div className="mt-8 flex items-start gap-3">
              <span className="mt-2.5 h-1 w-6 rounded-full bg-elec-yellow shrink-0" />
              <div>
                <div className="text-sm font-semibold text-white">Beta tester</div>
                <div className="text-[13px] text-white">Working electrician · Active beta</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═════════ PHONE-CAPTURE SHEET ═══════════════════════════ */}
      <Sheet open={phoneSheetOpen} onOpenChange={setPhoneSheetOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-[28px] border-white/10 bg-background p-0 sm:max-w-lg sm:mx-auto"
        >
          <div
            className="px-6 pt-8 pb-8"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 32px)' }}
          >
            <SheetHeader className="text-left space-y-3 mb-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-elec-yellow">
                Step 1 of 2
              </p>
              <SheetTitle className="text-3xl font-bold tracking-[-0.02em] text-white leading-tight">
                Your WhatsApp number.
              </SheetTitle>
              <SheetDescription className="text-white text-base leading-relaxed">
                Mate lives on WhatsApp. Pop in your number, then we&apos;ll send you to Stripe to
                start your <span className="text-elec-yellow font-semibold">3-day free trial</span>.
                {hasFounderSlots ? (
                  <>
                    {' '}
                    Founder price{' '}
                    <span className="text-elec-yellow font-semibold">
                      £29.99/month forever
                    </span>{' '}
                    locks in at checkout.
                  </>
                ) : (
                  <> No charge for 3 days. Cancel anytime.</>
                )}
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="mate-phone"
                  className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white mb-2"
                >
                  UK mobile
                </label>
                <div
                  className={cn(
                    'flex items-center gap-3 h-14 rounded-2xl border bg-white/[0.04] px-4 transition-colors',
                    phoneError
                      ? 'border-red-500/60 focus-within:border-red-500/80'
                      : 'border-white/15 focus-within:border-elec-yellow'
                  )}
                >
                  <span className="text-white font-semibold">+44</span>
                  <div className="h-5 w-px bg-white/15" />
                  <input
                    id="mate-phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    value={phoneInput}
                    onChange={(e) => {
                      setPhoneInput(e.target.value);
                      if (phoneError) setPhoneError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleStartCheckout();
                    }}
                    placeholder="7700 900123"
                    className="flex-1 bg-transparent outline-none text-white text-base placeholder:text-white/35"
                  />
                </div>
                {phoneError && (
                  <p className="text-[13px] text-red-400 mt-2 leading-snug">{phoneError}</p>
                )}
              </div>

              <Button
                onClick={handleStartCheckout}
                disabled={starting}
                className="w-full h-14 rounded-full bg-elec-yellow text-black hover:bg-elec-yellow/90 font-bold text-base shadow-[0_20px_60px_-20px_rgba(250,204,21,0.5)] touch-manipulation active:scale-[0.98] transition-all"
              >
                {starting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Continue to Stripe
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <p className="text-[12px] text-white text-center leading-relaxed">
                {hasFounderSlots
                  ? `3-day free trial · then £29.99/month forever · ${slotsLeft} of ${slotsCap} founder spots left`
                  : '3-day free trial · then £39.99/month · cancel or downgrade anytime in Subscriptions.'}
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* ═════════ MOBILE STICKY CTA — always reachable ═══════════ */}
      <div
        className={cn(
          'lg:hidden fixed left-0 right-0 bottom-0 z-50',
          'bg-background/92 backdrop-blur-xl border-t border-white/10',
          'px-4 pt-3'
        )}
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 12px)' }}
      >
        <div className="flex items-center gap-3 max-w-sm mx-auto">
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
              {hasFounderSlots ? `Founder · ${slotsLeft} left` : '3 days free'}
            </div>
            <div className="text-[13px] text-white font-semibold truncate">
              {hasFounderSlots ? '3 days free · then £29.99/mo forever' : 'then £39.99/month'}
            </div>
          </div>
          <Button
            onClick={handleStartTrial}
            disabled={starting}
            className={cn(
              'h-11 px-5 text-sm font-bold rounded-full shrink-0 touch-manipulation active:scale-[0.98]',
              'bg-elec-yellow text-black hover:bg-elec-yellow/90'
            )}
          >
            {starting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Start free trial'}
          </Button>
        </div>
      </div>

      {/* ═════════ FINAL CTA ═══════════════════════════════════════ */}
      <section className="relative border-t border-white/[0.06]">
        <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-elec-yellow/[0.05] blur-[120px]" />
        <motion.div
          initial="visible"
          animate="visible"
          variants={stagger}
          className="relative max-w-4xl mx-auto px-5 sm:px-8 py-16 sm:py-32 text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-[40px] sm:text-[72px] lg:text-[80px] font-bold tracking-[-0.03em] leading-[1] text-white"
          >
            Get your
            <br />
            <span className="text-elec-yellow">evenings</span> back.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-7 sm:mt-8 text-lg sm:text-xl text-white max-w-xl mx-auto leading-relaxed"
          >
            <span className="font-bold text-elec-yellow">3 days free</span>, then{' '}
            {hasFounderSlots ? (
              <>
                <span className="font-bold">£29.99/month — locked in for life</span>. Founder price
                · only {slotsLeft} of {slotsCap} spots left.
              </>
            ) : (
              <>£39.99/month. Cancel anytime, no questions asked.</>
            )}
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="mt-3 text-sm text-white/65 max-w-xl mx-auto leading-relaxed"
          >
            Mate <Y>replaces</Y> your Electrician sub — you don&apos;t pay both. If you&apos;re on
            Electrician at £14.99, that&apos;s only{' '}
            <Y>{hasFounderSlots ? '£15' : '£25'} extra a month</Y> to add Mate.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 sm:mt-10 flex flex-col items-center gap-4">
            <PrimaryCta size="lg" />
            <p className="text-[13px] text-white">
              {hasFounderSlots
                ? `3-day free trial · £29.99/mo forever (founder) · replaces Electrician sub · cancel anytime`
                : '3-day free trial · £39.99/month · replaces Electrician sub · cancel anytime'}
            </p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
