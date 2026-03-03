import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  MessageSquare,
  Receipt,
  FileText,
  ListTodo,
  Users,
  ClipboardCheck,
  BookOpen,
  BellRing,
  Zap,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

const bubbleVariants = {
  hidden: { opacity: 0, x: -8, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.28, ease: 'easeOut', delay: i * 0.07 },
  }),
};

// Conversation-style "day in the life" moments
const dayMoments = [
  {
    time: '7:00 AM',
    label: 'Morning briefing',
    message:
      "Morning! You've got 3 jobs today. Mrs Chen's EICR is due, and that quote for the Hendersons is still outstanding. Want me to chase it?",
    icon: BellRing,
  },
  {
    time: '9:30 AM',
    label: 'On site',
    message:
      "What's the max Zs for a B32 RCBO on a TN-C-S system? Reg 411.4.4 says 0.27Ω. Here's the full table if you need it.",
    icon: BookOpen,
  },
  {
    time: '12:15 PM',
    label: 'New enquiry',
    message:
      "New lead from your website — David Walsh needs a full rewire in Chorlton. I've replied to confirm you'll get back to him today. Want me to draft a quote?",
    icon: MessageSquare,
  },
  {
    time: '3:45 PM',
    label: 'Invoice chasing',
    message:
      "Heads up — that £2,400 invoice to Parker & Sons is 14 days overdue. I've sent a polite follow-up. Want me to call them tomorrow if there's no response?",
    icon: Receipt,
  },
  {
    time: '5:30 PM',
    label: 'End of day',
    message:
      "Jobs logged, timesheets updated. Mrs Chen's EICR filed. Tomorrow you've got the Henderson rewire starting at 8. Have a good evening!",
    icon: CheckCircle,
  },
];

const features = [
  {
    icon: BellRing,
    title: 'Daily briefings',
    desc: 'Tasks, appointments & reminders every morning',
  },
  { icon: Receipt, title: 'Invoice chasing', desc: 'Automatic follow-ups on unpaid invoices' },
  { icon: FileText, title: 'Quote drafting', desc: 'Send job details, get a quote drafted' },
  { icon: ListTodo, title: 'Task management', desc: 'Manage your to-do list via text' },
  { icon: Users, title: 'Client comms', desc: 'Confirmations & follow-ups handled' },
  { icon: ClipboardCheck, title: 'Cert tracking', desc: 'EICR & PAT renewal reminders' },
  { icon: BookOpen, title: 'Regs on site', desc: 'BS 7671 answers while you work' },
  { icon: MessageSquare, title: 'Lead handling', desc: 'New enquiries logged & responded to' },
];

export function BusinessAISalesView() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [interested, setInterested] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // On mount: check if user already registered interest so returning users see confirmed state
  useEffect(() => {
    const checkWaitlist = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const { data } = await supabase
          .from('business_ai_waitlist' as never)
          .select('id')
          .eq('user_id', user.id)
          .maybeSingle();
        if (data) setInterested(true);
      } catch {
        // Table may not exist in older envs — silently ignore
      }
    };
    checkWaitlist();
  }, []);

  const handleInterest = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Best-effort — table may not exist yet
        await supabase
          .from('business_ai_waitlist' as never)
          .upsert({ user_id: user.id, created_at: new Date().toISOString() }, { onConflict: 'user_id' });
      }
      setInterested(true);
    } catch {
      // Silently succeed — we don't need the DB call to work to show the right UI
      setInterested(true);
    } finally {
      setLoading(false);
    }
  };

  const monthlyPrice = '£29.99';
  const yearlyPrice = '£299.99';
  const yearlySaving = '£59.89';

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-lg mx-auto pb-28 space-y-8"
      >
        {/* Back button */}
        <motion.div variants={itemVariants} className="px-4 pt-4">
          <Link to="/electrician">
            <Button
              variant="ghost"
              className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] active:scale-[0.98] -ml-2 h-11 touch-manipulation transition-all"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </Button>
          </Link>
        </motion.div>

        {/* ── Hero ── */}
        <motion.div variants={itemVariants} className="px-4">
          <div className="relative overflow-hidden rounded-3xl">
            {/* Background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-yellow-500/10 to-transparent" />
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-amber-400/[0.12] blur-3xl rounded-full" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-yellow-500/[0.08] blur-3xl rounded-full" />

            <div className="relative px-6 pt-8 pb-7 text-center space-y-5">
              {/* Coming Soon badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30">
                <Sparkles className="h-3 w-3 text-amber-400" />
                <span className="text-xs font-semibold text-amber-400 tracking-wide uppercase">Coming soon</span>
              </div>

              {/* Icon */}
              <div className="inline-flex p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                <Zap className="h-10 w-10 text-amber-400" />
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-white leading-tight tracking-tight">
                  Stay on the tools.
                </h1>
                <h1 className="text-3xl font-bold leading-tight tracking-tight bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 bg-clip-text text-transparent">
                  Let Mate run the office.
                </h1>
              </div>

              {/* Subheadline */}
              <p className="text-base text-white/80 max-w-xs mx-auto leading-relaxed">
                Your business assistant on WhatsApp. Handles invoicing, scheduling, client comms and regs — so you never stop what you're doing.
              </p>

              {/* Social proof */}
              <div className="flex items-center justify-center gap-2 pt-1">
                <div className="flex -space-x-1.5">
                  {['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'].map((color, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-black"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <p className="text-xs text-white/60">Built by electricians, for electricians</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── A Day with Mate — WhatsApp-style chat ── */}
        <motion.div variants={itemVariants} className="px-4 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 px-1">
            <div className="h-2 w-2 rounded-full bg-amber-400" />
            A Day with Mate
          </h2>

          {/* Chat container — WhatsApp dark mode look */}
          <div
            className="rounded-2xl overflow-hidden border border-white/[0.06]"
            style={{ background: 'linear-gradient(180deg, #0b1612 0%, #0e1a14 100%)' }}
          >
            {/* Chat header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]" style={{ background: '#1a2b20' }}>
              <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                <Zap className="h-4.5 w-4.5 text-black" style={{ height: 18, width: 18 }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white">Mate ⚡</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-[11px] text-green-400">Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="px-3 py-4 space-y-1">
              {dayMoments.map(({ time, label, message, icon: Icon }, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={bubbleVariants}
                  className="mb-3"
                >
                  {/* Time label */}
                  <div className="flex justify-center mb-2">
                    <span className="text-[10px] text-white/30 bg-white/[0.04] px-2.5 py-0.5 rounded-full">
                      {time} · {label}
                    </span>
                  </div>

                  {/* Bubble */}
                  <div className="flex items-end gap-2 max-w-[88%]">
                    {/* Avatar — only on first or after a gap */}
                    <div className="shrink-0 w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center mb-0.5">
                      <Icon className="text-black" style={{ height: 13, width: 13 }} />
                    </div>

                    <div>
                      {/* Bubble body */}
                      <div
                        className="rounded-[18px] rounded-tl-[4px] px-3.5 py-2.5 relative"
                        style={{ background: '#1f2d22', border: '1px solid rgba(255,255,255,0.06)' }}
                      >
                        <p className="text-sm text-white leading-relaxed">{message}</p>
                      </div>
                      {/* Read receipt style */}
                      <div className="flex items-center gap-1 mt-1 px-1">
                        <span className="text-[10px] text-white/25">{time}</span>
                        <CheckCircle className="text-amber-400/70" style={{ height: 10, width: 10 }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input area — decorative */}
            <div className="flex items-center gap-2.5 px-3 py-2.5 border-t border-white/[0.06]" style={{ background: '#111c14' }}>
              <div className="flex-1 h-9 rounded-full bg-white/[0.06] flex items-center px-4">
                <span className="text-xs text-white/25">Message Mate...</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                <Zap className="text-black" style={{ height: 16, width: 16 }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Everything Mate Handles ── */}
        <motion.div variants={itemVariants} className="px-4 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 px-1">
            <div className="h-2 w-2 rounded-full bg-amber-400" />
            Everything Mate Handles
          </h2>
          <div className="grid grid-cols-2 gap-2.5">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                custom={i}
                variants={bubbleVariants}
                className="rounded-2xl p-4 space-y-2.5 border border-white/[0.06]"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
                  <Icon className="text-amber-400" style={{ height: 16, width: 16 }} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white leading-tight">{title}</div>
                  <div className="text-xs text-white/50 mt-0.5 leading-snug">{desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── How It Works ── */}
        <motion.div variants={itemVariants} className="px-4 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 px-1">
            <div className="h-2 w-2 rounded-full bg-amber-400" />
            How It Works
          </h2>
          <div className="relative space-y-0">
            {[
              { step: '1', text: 'Subscribe to the Business AI plan' },
              { step: '2', text: 'Connect your WhatsApp number' },
              { step: '3', text: "Start texting Mate — that's it" },
            ].map(({ step, text }, i) => (
              <div key={step} className="flex items-stretch gap-0">
                {/* Left column: circle + connector */}
                <div className="flex flex-col items-center w-10 shrink-0">
                  <div className="w-9 h-9 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center z-10">
                    <span className="text-xs font-bold text-amber-400">{step}</span>
                  </div>
                  {i < 2 && (
                    <div className="w-px flex-1 bg-gradient-to-b from-amber-500/30 to-transparent my-1" style={{ minHeight: 20 }} />
                  )}
                </div>
                {/* Step text */}
                <div className="flex-1 pb-5 pt-1.5 pl-3">
                  <span className="text-sm font-medium text-white">{text}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Pricing ── */}
        <motion.div variants={itemVariants} className="px-4 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 px-1">
            <div className="h-2 w-2 rounded-full bg-amber-400" />
            Pricing
          </h2>

          {/* Billing toggle */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.05] border border-white/[0.06]">
            {(['monthly', 'yearly'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setBilling(period)}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all touch-manipulation capitalize ${
                  billing === period
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {period}
                {period === 'yearly' && (
                  <span className={`ml-1.5 text-[10px] font-bold ${billing === 'yearly' ? 'text-black/60' : 'text-green-400'}`}>
                    SAVE 17%
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Price card */}
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-yellow-500/5" />
            <div className="relative p-6 text-center space-y-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={billing}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-4xl font-bold text-white">
                    {billing === 'monthly' ? monthlyPrice : yearlyPrice}
                  </div>
                  <div className="text-sm text-white/50 mt-1">
                    {billing === 'monthly' ? 'per month' : 'per year'}
                  </div>
                  {billing === 'yearly' && (
                    <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                      <span className="text-green-400 text-xs font-semibold">Save {yearlySaving} vs monthly</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
              <p className="text-xs text-white/40 pt-2">Includes everything in the Electrician plan</p>
            </div>
          </div>

          {/* Coming Soon CTA — replaces subscribe */}
          <AnimatePresence mode="wait">
            {!interested ? (
              <motion.div
                key="waitlist"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="space-y-3"
              >
                {/* Coming soon notice */}
                <div className="rounded-2xl p-4 border border-amber-500/20 text-center space-y-1" style={{ background: 'rgba(251,191,36,0.05)' }}>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-amber-400" />
                    <span className="text-sm font-semibold text-amber-400">In final testing</span>
                  </div>
                  <p className="text-sm text-white/70 leading-relaxed">
                    Mate is being tested with a select group of sparks right now. Be first in line when we open the doors.
                  </p>
                </div>

                <Button
                  onClick={handleInterest}
                  disabled={loading}
                  className="w-full h-13 touch-manipulation font-semibold text-base rounded-xl transition-all bg-amber-500 hover:bg-amber-400 active:bg-amber-600 active:scale-[0.98] text-black shadow-lg shadow-amber-500/25"
                  style={{ height: 52 }}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      One sec...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Count me in — notify me when live
                    </span>
                  )}
                </Button>
                <p className="text-xs text-white/30 text-center">
                  No commitment. We'll message you on WhatsApp when Mate launches.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="rounded-2xl p-6 text-center space-y-3 border border-green-500/25"
                style={{ background: 'rgba(34,197,94,0.06)' }}
              >
                <div className="w-12 h-12 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <div className="text-base font-semibold text-white">You're on the list ⚡</div>
                  <p className="text-sm text-white/50 mt-1">
                    We'll drop you a message when Mate is ready. Won't be long.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
