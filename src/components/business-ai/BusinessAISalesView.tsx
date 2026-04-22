import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  Loader2,
  MoreVertical,
  Phone,
  Play,
  Video,
} from 'lucide-react';
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
        <Y>Two-way voice</Y> conversations — speak hands-free, hear the reply. Perfect for the
        van, the ladder, or when your hands are covered in dust.
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
        <Y>One-tap pay links</Y>. Safety checks block £0 errors and flag duplicates within 7
        days — before they leave your hand.
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
        Ask for the cost of a Hager CU, a 100m reel of 2.5mm T&amp;E, or a specific RCD — Mate
        pulls <Y>live pricing from UK wholesalers</Y> and brings back options to compare.
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
        Revenue forecast, cash flow, top clients, inactive clients, seasonal trends, at-risk
        alerts. <Y>Answers in seconds</Y>.
      </>
    ),
  },
  {
    title: 'Email assistant',
    body: (
      <>
        Forward a customer email. Mate classifies, drafts your reply <Y>in your tone</Y>, waits
        for your OK before sending.
      </>
    ),
  },
];

// ─── Chat sequence ────────────────────────────────────────────────────────────
type ChatMsg =
  | { from: 'mate' | 'user'; kind?: 'text'; text: string; time: string }
  | { from: 'mate' | 'user'; kind: 'voice'; text: string; duration: string; time: string };

const CHAT_SEQUENCE: ChatMsg[] = [
  {
    from: 'mate',
    text: "Morning. 3 jobs today. Henderson's quote is still outstanding — want me to chase it?",
    time: '09:41',
  },
  { from: 'user', text: 'Yes please', time: '09:41' },
  {
    from: 'mate',
    text: "Done — polite reminder sent. I'll follow up tomorrow if no reply.",
    time: '09:42',
  },
  {
    from: 'user',
    kind: 'voice',
    text: 'New job from Sally at 16 Acacia Road, fit a shower pull cord',
    duration: '0:14',
    time: '09:45',
  },
  {
    from: 'mate',
    text: 'Got it. Added Sally, scheduled Thursday 10am, draft quote ready at £180 — tap to review.',
    time: '09:45',
  },
  { from: 'user', text: "what's the max Zs for a 32A MCB type B?", time: '09:46' },
  { from: 'mate', text: '1.37 Ω — table 41.3, BS 7671 A4:2026.', time: '09:46' },
];

const WAVE_HEIGHTS = [
  4, 7, 11, 15, 18, 22, 16, 10, 6, 9, 14, 19, 23, 20, 14, 8, 12, 18, 22, 25, 20, 14, 10, 16, 21, 18,
  13, 8, 5, 3,
];

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
  const [joined, setJoined] = useState(false);
  const [joining, setJoining] = useState(false);
  const [phoneSheetOpen, setPhoneSheetOpen] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    (async () => {
      const { data } = await supabase
        .from('business_ai_waitlist')
        .select('user_id')
        .eq('user_id', user.id)
        .eq('plan', 'mate')
        .maybeSingle();
      if (data) setJoined(true);
    })();
  }, [user?.id]);

  // Opens the phone-capture sheet (or kicks to /auth if signed out)
  const handleJoinWaitlist = useCallback(() => {
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

  const handleConfirmPhone = useCallback(async () => {
    const phone = normalisePhone(phoneInput);
    if (!phone) {
      setPhoneError('Enter a valid UK mobile (e.g. 07700 900123)');
      return;
    }
    setPhoneError(null);
    try {
      setJoining(true);
      const { error } = await supabase.functions.invoke('join-waitlist', {
        body: { plan: 'mate', phone_number: phone },
      });
      if (error) throw new Error(error.message);
      setJoined(true);
      setPhoneSheetOpen(false);
      toast({
        title: "You're on the list",
        description: "We'll WhatsApp you the moment early access opens.",
      });
    } catch (err) {
      console.error('[Mate sales] waitlist error:', err);
      setPhoneError(err instanceof Error ? err.message : 'Please try again.');
    } finally {
      setJoining(false);
    }
  }, [phoneInput, toast]);

  const PrimaryCta = ({ size = 'lg' }: { size?: 'lg' | 'md' }) => (
    <Button
      onClick={handleJoinWaitlist}
      disabled={joined || joining}
      className={cn(
        'font-bold rounded-full active:scale-[0.98] touch-manipulation transition-all',
        size === 'lg' ? 'h-14 px-8 text-base' : 'h-12 px-6 text-[15px]',
        joined
          ? 'bg-white/[0.06] text-white border border-white/25 cursor-default shadow-none hover:bg-white/[0.06]'
          : 'bg-elec-yellow text-black hover:bg-elec-yellow/90 shadow-[0_20px_60px_-20px_rgba(250,204,21,0.5)]'
      )}
    >
      {joining ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : joined ? (
        <>
          <Check className="mr-2 h-5 w-5" />
          You're on the list
        </>
      ) : (
        <>
          Join the waitlist
          <ArrowRight className="ml-2 h-5 w-5" />
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
          className="relative max-w-5xl mx-auto px-5 sm:px-8 pt-8 sm:pt-20 pb-12 sm:pb-24 text-center"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 mb-7 sm:mb-10">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-white">
              Active beta · Waitlist open
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-[44px] sm:text-[80px] lg:text-[96px] font-bold tracking-[-0.035em] leading-[0.95] text-white"
          >
            Stop drowning in admin.
            <br />
            <span className="text-elec-yellow">Text Mate.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 sm:mt-8 text-lg sm:text-2xl text-white max-w-2xl mx-auto leading-[1.4]"
          >
            Your AI business partner on <Y>WhatsApp</Y>. Send photos, voice notes, forward
            emails — Mate handles the admin while you <Y>stay on the tools</Y>.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 sm:mt-12 space-y-4">
            <p className="text-sm sm:text-base text-white font-medium">
              <Y>3 days free</Y>, then <span className="font-bold">£29.99/month</span> —
              introductory price, cancel anytime.
            </p>
            <PrimaryCta size="lg" />
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
            <span className="text-white/60">Or you just</span>{' '}
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
          className="max-w-5xl mx-auto px-5 sm:px-8 py-14 sm:py-24 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center"
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
              No new app. No extra login. Mate lives inside the chat app you already use — and
              it understands voice notes, photos and plain English.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="order-2 lg:order-2 flex justify-center">
            <PhoneChatMock />
          </motion.div>
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
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/60">
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
          className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-28"
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
              Every capability below is live inside Mate today — being tested by real
              electricians in active beta.
            </p>
          </motion.div>

          <div className="grid gap-y-9 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((cap) => (
              <motion.div key={cap.title} variants={fadeUp} className="group space-y-2">
                <div className="flex items-center gap-2.5">
                  <span className="h-1 w-5 rounded-full bg-elec-yellow/80 shrink-0" />
                  <h3 className="text-[17px] font-bold text-white tracking-tight">
                    {cap.title}
                  </h3>
                </div>
                <p className="text-[14px] leading-relaxed text-white pl-[30px]">{cap.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.p variants={fadeUp} className="mt-12 text-sm text-white leading-relaxed">
            <span className="text-elec-yellow font-bold uppercase tracking-wider text-[11px]">
              Plus
            </span>
            <span className="mx-2 text-white/40">·</span>
            snagging lists · client portal links · project templates · smart pricing
            suggestions · completion checklists · audit trail of every action.
          </motion.p>
        </motion.div>
      </section>

      {/* ═════════ INTEGRATIONS ═══════════════════════════════════ */}
      <section className="relative border-t border-white/[0.06]">
        <motion.div
          initial="visible"
          animate="visible"
          variants={stagger}
          className="max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-20"
        >
          <motion.div variants={fadeUp} className="max-w-2xl mb-8 sm:mb-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-elec-yellow mb-3">
              Plugs into
            </p>
            <h3 className="text-3xl sm:text-4xl font-bold tracking-[-0.02em] leading-[1.05] text-white">
              Your existing stack.
            </h3>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-x-9 gap-y-5"
          >
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
          className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-28"
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
                title: 'Join the waitlist',
                body: (
                  <>
                    Takes <Y>ten seconds</Y>. You land in our priority queue for early access.
                  </>
                ),
              },
              {
                n: '02',
                title: 'Get your invite',
                body: (
                  <>
                    We&apos;ll email you the moment beta opens up a slot. <Y>First in, first
                    invited.</Y>
                  </>
                ),
              },
              {
                n: '03',
                title: 'Connect and start your trial',
                body: (
                  <>
                    Link WhatsApp in thirty seconds. Your <Y>3-day free trial</Y> starts the
                    moment you say hello.
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

      {/* ═════════ TRUST ════════════════════════════════════════════ */}
      <section className="relative border-t border-white/[0.06]">
        <motion.div
          initial="visible"
          animate="visible"
          variants={stagger}
          className="max-w-5xl mx-auto px-5 sm:px-8 py-16 sm:py-28"
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
                Mate drafts. You approve. Nothing goes out — no email, no message, no
                invoice — without your green light.
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
              <span className="text-elec-yellow">&ldquo;</span>I used to spend an hour every
              night on admin — invoices, chasing, replying. Now I just message Mate. It does
              it, then tells me what it did. First tool that&apos;s actually given me time back.
              <span className="text-elec-yellow">&rdquo;</span>
            </blockquote>
            <div className="mt-8 flex items-start gap-3">
              <span className="mt-2.5 h-1 w-6 rounded-full bg-elec-yellow shrink-0" />
              <div>
                <div className="text-sm font-semibold text-white">Beta tester</div>
                <div className="text-[13px] text-white/70">
                  Working electrician · Active beta
                </div>
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
                One more thing
              </p>
              <SheetTitle className="text-3xl font-bold tracking-[-0.02em] text-white leading-tight">
                Your mobile number.
              </SheetTitle>
              <SheetDescription className="text-white/85 text-base leading-relaxed">
                Mate lives on WhatsApp, so we need your number to set up your account when your
                invite lands.
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="mate-phone"
                  className="block text-[11px] font-bold uppercase tracking-[0.14em] text-white/70 mb-2"
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
                      if (e.key === 'Enter') handleConfirmPhone();
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
                onClick={handleConfirmPhone}
                disabled={joining}
                className="w-full h-14 rounded-full bg-elec-yellow text-black hover:bg-elec-yellow/90 font-bold text-base shadow-[0_20px_60px_-20px_rgba(250,204,21,0.5)] touch-manipulation active:scale-[0.98] transition-all"
              >
                {joining ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Confirm &amp; join waitlist
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <p className="text-[12px] text-white/60 text-center leading-relaxed">
                We&apos;ll only use this to activate Mate on WhatsApp. Unsubscribe anytime.
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
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">
              3 days free
            </div>
            <div className="text-[13px] text-white font-semibold truncate">
              then £29.99/month · intro price
            </div>
          </div>
          <Button
            onClick={handleJoinWaitlist}
            disabled={joined || joining}
            className={cn(
              'h-11 px-5 text-sm font-bold rounded-full shrink-0 touch-manipulation active:scale-[0.98]',
              joined
                ? 'bg-white/[0.06] text-white border border-white/25 cursor-default'
                : 'bg-elec-yellow text-black hover:bg-elec-yellow/90'
            )}
          >
            {joining ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : joined ? (
              <>
                <Check className="h-4 w-4" />
              </>
            ) : (
              'Join waitlist'
            )}
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
            Active beta. Priority invite on the waitlist.{' '}
            <span className="font-bold text-elec-yellow">3 days free</span> the moment a slot
            opens for you.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-9 sm:mt-10 flex flex-col items-center gap-4">
            <PrimaryCta size="lg" />
            <p className="text-[13px] text-white">
              3-day free trial · £29.99/month introductory price · Cancel anytime
            </p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

// ═════════ PHONE CHAT MOCK ═══════════════════════════════════════════════════
function PhoneChatMock() {
  const [visibleCount, setVisibleCount] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [voiceProgress, setVoiceProgress] = useState(0);

  const voiceIndex = CHAT_SEQUENCE.findIndex((m) => 'kind' in m && m.kind === 'voice');
  const voiceVisible = visibleCount > voiceIndex && voiceIndex >= 0;

  // Auto-play the sequence
  useEffect(() => {
    if (visibleCount >= CHAT_SEQUENCE.length) {
      const t = setTimeout(() => {
        setVisibleCount(1);
        setVoiceProgress(0);
      }, 6000);
      return () => clearTimeout(t);
    }

    const next = CHAT_SEQUENCE[visibleCount];
    const isMate = next.from === 'mate';

    if (isMate) {
      setIsTyping(true);
      const t = setTimeout(() => {
        setIsTyping(false);
        setVisibleCount((c) => c + 1);
      }, 1400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisibleCount((c) => c + 1), 1700);
    return () => clearTimeout(t);
  }, [visibleCount]);

  // Voice playback animation
  useEffect(() => {
    if (!voiceVisible) {
      setVoiceProgress(0);
      return;
    }
    setVoiceProgress(0);
    const interval = setInterval(() => {
      setVoiceProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 2;
      });
    }, 90);
    return () => clearInterval(interval);
  }, [voiceVisible]);

  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[380px] select-none">
      {/* Phone outer bezel */}
      <div className="relative rounded-[52px] p-[9px] bg-gradient-to-b from-zinc-800 via-zinc-900 to-black shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.08)]">
        <div
          className="relative rounded-[44px] overflow-hidden bg-[#0b1410]"
          style={{ height: 580 }}
        >
          {/* Dynamic Island */}
          <div className="absolute top-[14px] left-1/2 -translate-x-1/2 h-[28px] w-[104px] rounded-full bg-black z-30" />

          {/* Status bar — padded clear of the 44px rounded corner */}
          <div className="relative z-10 flex items-center justify-between px-10 pt-[22px] pb-1.5 text-white text-[13px] font-semibold tabular-nums">
            <span>9:41</span>
            <div className="flex items-center gap-[6px]">
              {/* signal — tidy 4-bar svg, all inside its viewBox */}
              <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden>
                <rect x="0" y="7" width="3" height="4" rx="0.5" />
                <rect x="5" y="5" width="3" height="6" rx="0.5" />
                <rect x="10" y="2.5" width="3" height="8.5" rx="0.5" />
                <rect x="15" y="0" width="2" height="11" rx="0.5" opacity="0.4" />
              </svg>
              {/* wifi — centered in a 13x11 box, no overflow */}
              <svg width="15" height="11" viewBox="0 0 13 11" fill="currentColor" aria-hidden>
                <path d="M6.5 11a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" />
                <path d="M2.6 6.5a5.5 5.5 0 017.8 0l1.2-1.2a7.2 7.2 0 00-10.2 0l1.2 1.2z" />
                <path d="M0 3.9a9.2 9.2 0 0113 0l1.25-1.3a11 11 0 00-15.5 0L0 3.9z" transform="translate(-0.5 0)" opacity="0.85" />
              </svg>
              {/* battery */}
              <svg width="26" height="12" viewBox="0 0 26 12" fill="none" aria-hidden>
                <rect x="0.5" y="0.5" width="22" height="11" rx="2.5" stroke="currentColor" opacity="0.5" />
                <rect x="23" y="4" width="1.5" height="4" rx="0.5" fill="currentColor" opacity="0.5" />
                <rect x="2" y="2" width="19" height="8" rx="1.5" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* WhatsApp header */}
          <div
            className="relative z-10 flex items-center gap-2.5 px-3 py-2.5 border-b border-black/30"
            style={{ background: '#1f2c34' }}
          >
            <ChevronLeft className="h-5 w-5 text-white shrink-0" />
            <div className="h-9 w-9 rounded-full bg-elec-yellow flex items-center justify-center shrink-0 shadow-[0_0_0_1.5px_rgba(0,0,0,0.2)_inset]">
              <span className="text-black font-extrabold text-[14px]">M</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-semibold text-white leading-tight truncate">
                Mate
              </div>
              <div className="text-[11px] text-white/60 leading-tight mt-0.5">online</div>
            </div>
            <Video className="h-5 w-5 text-white/80 shrink-0" />
            <Phone className="h-[18px] w-[18px] text-white/80 shrink-0" />
            <MoreVertical className="h-5 w-5 text-white/80 shrink-0" />
          </div>

          {/* Chat wallpaper + messages */}
          <div
            className="relative px-3 pt-3 pb-4 space-y-1.5 overflow-hidden"
            style={{
              height: 'calc(100% - 94px)',
              background:
                'linear-gradient(to bottom, #0b1410 0%, #0b1410 100%), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.015) 0%, transparent 70%)',
            }}
          >
            {/* faint wallpaper dots */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '18px 18px',
              }}
            />

            <div className="relative flex flex-col justify-end min-h-full space-y-1.5">
              {CHAT_SEQUENCE.slice(0, visibleCount).map((msg, i) => (
                <MessageBubble
                  key={i}
                  msg={msg}
                  voiceProgress={'kind' in msg && msg.kind === 'voice' ? voiceProgress : 0}
                />
              ))}
              {isTyping && <TypingIndicator />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Message bubble ───────────────────────────────────────────────────────────
function MessageBubble({ msg, voiceProgress }: { msg: ChatMsg; voiceProgress: number }) {
  const isOutgoing = msg.from === 'user';

  if ('kind' in msg && msg.kind === 'voice') {
    return <VoiceBubble from={msg.from} duration={msg.duration} time={msg.time} progress={voiceProgress} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 380, damping: 24, mass: 0.6 }}
      className={cn('flex', isOutgoing ? 'justify-end' : 'justify-start')}
    >
      <div
        className={cn(
          'max-w-[82%] rounded-[10px] px-2.5 pt-1.5 pb-1 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]',
          isOutgoing
            ? 'bg-[#005c4b] rounded-br-[4px] text-white'
            : 'bg-[#1f2c34] rounded-bl-[4px] text-white'
        )}
      >
        <div className="text-[14px] leading-[1.35] whitespace-pre-line">{msg.text}</div>
        <div className="flex items-center justify-end gap-1 mt-0.5">
          <span className="text-[10px] text-white/50 tabular-nums leading-none">{msg.time}</span>
          {isOutgoing && (
            <svg className="h-3.5 w-3.5" viewBox="0 0 16 11" fill="none">
              <path
                d="M11.071.653a.457.457 0 00-.304-.102.47.47 0 00-.381.178l-6.19 7.636-2.405-2.272a.458.458 0 00-.655.024.487.487 0 00.025.677l2.813 2.656a.457.457 0 00.312.125h.04a.466.466 0 00.324-.17L11.192 1.35a.49.49 0 00-.121-.697z"
                fill="#53bdeb"
              />
              <path
                d="M15.36.653a.457.457 0 00-.304-.102.47.47 0 00-.381.178l-6.19 7.636-.87-.82a.458.458 0 00-.654.023.487.487 0 00.024.677l1.283 1.211a.457.457 0 00.312.125h.04a.466.466 0 00.324-.17L15.48 1.35a.49.49 0 00-.12-.697z"
                fill="#53bdeb"
              />
            </svg>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Voice bubble ─────────────────────────────────────────────────────────────
function VoiceBubble({
  from,
  duration,
  time,
  progress,
}: {
  from: 'mate' | 'user';
  duration: string;
  time: string;
  progress: number;
}) {
  const isOutgoing = from === 'user';
  const playedCount = Math.floor((progress / 100) * WAVE_HEIGHTS.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 380, damping: 24, mass: 0.6 }}
      className={cn('flex', isOutgoing ? 'justify-end' : 'justify-start')}
    >
      <div
        className={cn(
          'flex items-center gap-2 rounded-[10px] pl-2 pr-3 py-1.5 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]',
          isOutgoing ? 'bg-[#005c4b] rounded-br-[4px]' : 'bg-[#1f2c34] rounded-bl-[4px]'
        )}
        style={{ minWidth: 210 }}
      >
        {/* Small avatar circle */}
        <div className="relative h-8 w-8 rounded-full bg-elec-yellow flex items-center justify-center shrink-0">
          <span className="text-black font-extrabold text-[11px]">
            {isOutgoing ? 'You' : 'M'}
          </span>
          {/* Mic dot */}
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-[#54656f] border border-[#005c4b] flex items-center justify-center">
            <svg width="7" height="7" viewBox="0 0 24 24" fill="white">
              <path d="M12 14a3 3 0 003-3V5a3 3 0 00-6 0v6a3 3 0 003 3zM17 11a5 5 0 01-10 0H5a7 7 0 006 6.92V21h2v-3.08A7 7 0 0019 11h-2z" />
            </svg>
          </span>
        </div>

        {/* Play button */}
        <button
          type="button"
          className="h-7 w-7 rounded-full flex items-center justify-center shrink-0 text-white"
          aria-label="Play voice message"
        >
          {progress >= 100 ? (
            <Play className="h-3.5 w-3.5 ml-0.5" fill="currentColor" />
          ) : (
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          )}
        </button>

        {/* Waveform */}
        <div className="flex items-center gap-[1.5px] h-7 flex-1">
          {WAVE_HEIGHTS.map((h, i) => {
            const played = i < playedCount;
            return (
              <span
                key={i}
                className={cn(
                  'w-[2px] rounded-full transition-colors duration-150',
                  played ? 'bg-white' : 'bg-white/45'
                )}
                style={{ height: `${h}px` }}
              />
            );
          })}
        </div>

        {/* Duration + time */}
        <div className="flex flex-col items-end shrink-0">
          <span className="text-[11px] text-white/85 font-medium tabular-nums leading-none">
            {duration}
          </span>
          <span className="text-[10px] text-white/55 tabular-nums leading-none mt-1">
            {time}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 26 }}
      className="flex justify-start"
    >
      <div className="bg-[#1f2c34] rounded-[10px] rounded-bl-[4px] px-3 py-2.5 flex items-center gap-1 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">
        {[0, 0.15, 0.3].map((delay, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, delay }}
            className="h-1.5 w-1.5 rounded-full bg-white/60"
          />
        ))}
      </div>
    </motion.div>
  );
}
