import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
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
  Mail,
  Calendar,
  FileDown,
  ShieldCheck,
  BarChart3,
  Calculator,
  Loader2,
  Shield,
  Banknote,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
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
    interaction: {
      userReply: 'Yes',
      mateFollowUp:
        "Done — chased Henderson, sent a polite reminder. I'll follow up tomorrow if no reply.",
    },
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

// Pipeline steps — Lead to Paid
const pipelineSteps = [
  { icon: Users, label: 'Lead', desc: 'Captured & replied to', tools: 5 },
  { icon: FileText, label: 'Quote', desc: 'Drafted & sent', tools: 7 },
  { icon: ListTodo, label: 'Job', desc: 'Scheduled & tracked', tools: 10 },
  { icon: ClipboardCheck, label: 'Cert', desc: 'Filed & delivered', tools: 5 },
  { icon: Receipt, label: 'Invoice', desc: 'Raised & chased', tools: 6 },
  { icon: Banknote, label: 'Paid', desc: 'Tracked & reconciled', tools: 4 },
];

// Capability groups with real tool counts
const capabilityGroups = [
  {
    title: 'Running Your Business',
    cards: [
      {
        icon: Receipt,
        title: 'Invoicing',
        tools: 6,
        examples: 'Create · send · chase · track payments · overdue alerts · statements',
      },
      {
        icon: FileText,
        title: 'Quoting',
        tools: 7,
        examples: 'Draft · price · send · follow up · convert to job · templates · revisions',
      },
      {
        icon: BarChart3,
        title: 'Analytics',
        tools: 4,
        examples: 'Revenue · outstanding · job profit · monthly summary',
      },
      {
        icon: Calculator,
        title: 'Expenses',
        tools: 3,
        examples: 'Log receipts · mileage · material costs',
      },
    ],
  },
  {
    title: 'On Site',
    cards: [
      {
        icon: BookOpen,
        title: 'Knowledge Base',
        tools: 6,
        examples: 'BS 7671 regs · Zs tables · cable ratings · inspection guidance · GN3 · IET',
      },
      {
        icon: ShieldCheck,
        title: 'RAMS & Compliance',
        tools: 4,
        examples: 'Risk assessments · method statements · site safety · toolbox talks',
      },
      {
        icon: ClipboardCheck,
        title: 'Certificates',
        tools: 5,
        examples: 'EICR · EIC · minor works · delivery · PDF generation',
      },
    ],
  },
  {
    title: 'Your Clients',
    cards: [
      {
        icon: Users,
        title: 'Client Management',
        tools: 4,
        examples: 'Add · search · notes · job history',
      },
      {
        icon: MessageSquare,
        title: 'Messaging',
        tools: 2,
        examples: 'WhatsApp replies · appointment confirmations',
      },
      {
        icon: Mail,
        title: 'Email & Leads',
        tools: 5,
        examples: 'Gmail monitor · lead capture · auto-reply · follow-up · enquiry log',
      },
    ],
  },
  {
    title: 'Back Office',
    cards: [
      {
        icon: ListTodo,
        title: 'Projects & Tasks',
        tools: 10,
        examples:
          'Create · assign · schedule · track · complete · notes · dependencies · reminders · archive · projects',
      },
      {
        icon: Calendar,
        title: 'Calendar',
        tools: 3,
        examples: 'Schedule · reminders · availability',
      },
      {
        icon: FileDown,
        title: 'Documents',
        tools: 2,
        examples: 'Generate PDFs · file storage',
      },
    ],
  },
];

// Trust points for approval-first section
const trustPoints = [
  'Invoices drafted but never sent without approval',
  'Quotes reviewed by you before going to clients',
  'Messages composed then held for your OK to send',
  'Payments tracked but never initiated without you',
];

export function BusinessAISalesView() {
  const [loading, setLoading] = useState(false);
  const [waitlistJoined, setWaitlistJoined] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if user is already on the waitlist
  useEffect(() => {
    if (!user) return;
    supabase
      .from('business_ai_waitlist')
      .select('id')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setWaitlistJoined(true);
      });
  }, [user]);

  const handleJoinWaitlist = async () => {
    if (!user) {
      toast({
        title: 'Sign in required',
        description: 'Please sign in or create an account to join the waitlist.',
      });
      navigate('/auth/signin');
      return;
    }

    if (waitlistJoined) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('business_ai_waitlist')
        .insert({ user_id: user.id });

      if (error && error.code !== '23505') throw error; // ignore duplicate

      setWaitlistJoined(true);
      toast({
        title: "You're on the list! ⚡",
        description: "We'll be in touch as soon as Elec-AI is ready for you.",
      });
    } catch (err) {
      console.error('Waitlist error:', err);
      toast({
        title: 'Something went wrong',
        description: 'Please try again in a moment.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

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

        {/* ── 1. Hero ── */}
        <motion.div variants={itemVariants} className="px-4">
          <div className="relative overflow-hidden rounded-3xl">
            {/* Background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-yellow-500/10 to-transparent" />
            <div className="absolute -top-20 -right-20 w-56 h-56 bg-amber-400/[0.12] blur-3xl rounded-full" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-yellow-500/[0.08] blur-3xl rounded-full" />

            <div className="relative px-6 pt-8 pb-7 text-center space-y-5">
              {/* Stat badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30">
                <Zap className="h-3 w-3 text-amber-400" />
                <span className="text-xs font-semibold text-amber-400 tracking-wide">
                  80 tools. One WhatsApp number.
                </span>
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
              <p className="text-base text-white max-w-xs mx-auto leading-relaxed">
                Your business assistant on WhatsApp. Handles invoicing, scheduling, client comms and
                regs — so you never stop what you're doing.
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
                <p className="text-xs text-white">Built by electricians, for electricians</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 2. A Day with Mate — WhatsApp-style chat ── */}
        <motion.div variants={itemVariants} className="px-4 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 px-1">
            <div className="h-2 w-2 rounded-full bg-amber-400" />A Day with Mate
          </h2>

          {/* Chat container — WhatsApp dark mode look */}
          <div
            className="rounded-2xl overflow-hidden border border-white/[0.06]"
            style={{ background: 'linear-gradient(180deg, #0b1612 0%, #0e1a14 100%)' }}
          >
            {/* Chat header */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]"
              style={{ background: '#1a2b20' }}
            >
              <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                <Zap className="text-black" style={{ height: 18, width: 18 }} />
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
              {dayMoments.map(({ time, label, message, icon: Icon, interaction }, i) => (
                <motion.div key={i} custom={i} variants={bubbleVariants} className="mb-3">
                  {/* Time label */}
                  <div className="flex justify-center mb-2">
                    <span className="text-[10px] text-white bg-white/[0.04] px-2.5 py-0.5 rounded-full">
                      {time} · {label}
                    </span>
                  </div>

                  {/* Mate bubble */}
                  <div className="flex items-end gap-2 max-w-[88%]">
                    {/* Avatar */}
                    <div className="shrink-0 w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center mb-0.5">
                      <Icon className="text-black" style={{ height: 13, width: 13 }} />
                    </div>

                    <div>
                      {/* Bubble body */}
                      <div
                        className="rounded-[18px] rounded-tl-[4px] px-3.5 py-2.5 relative"
                        style={{
                          background: '#1f2d22',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        <p className="text-sm text-white leading-relaxed">{message}</p>
                      </div>
                      {/* Read receipt style */}
                      <div className="flex items-center gap-1 mt-1 px-1">
                        <span className="text-[10px] text-white">{time}</span>
                        <CheckCircle
                          className="text-amber-400/70"
                          style={{ height: 10, width: 10 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Interactive Yes/No buttons + user reply + Mate follow-up */}
                  {interaction && (
                    <div className="mt-3 space-y-3">
                      {/* WhatsApp-style quick reply buttons */}
                      <div className="flex items-center justify-center gap-3">
                        <div className="px-6 py-2 rounded-full border border-amber-500/40 text-sm font-medium text-amber-400 bg-amber-500/[0.08]">
                          Yes
                        </div>
                        <div className="px-6 py-2 rounded-full border border-white/[0.12] text-sm font-medium text-white bg-white/[0.04]">
                          No
                        </div>
                      </div>

                      {/* User reply bubble — right-aligned, WhatsApp green */}
                      <div className="flex justify-end">
                        <div className="max-w-[88%]">
                          <div
                            className="rounded-[18px] rounded-tr-[4px] px-3.5 py-2.5"
                            style={{ background: '#005c4b' }}
                          >
                            <p className="text-sm text-white leading-relaxed">
                              {interaction.userReply}
                            </p>
                          </div>
                          <div className="flex items-center justify-end gap-1 mt-1 px-1">
                            <span className="text-[10px] text-white">7:01 AM</span>
                            <CheckCircle
                              className="text-blue-400/70"
                              style={{ height: 10, width: 10 }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Mate follow-up bubble */}
                      <div className="flex items-end gap-2 max-w-[88%]">
                        <div className="shrink-0 w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center mb-0.5">
                          <Zap className="text-black" style={{ height: 13, width: 13 }} />
                        </div>
                        <div>
                          <div
                            className="rounded-[18px] rounded-tl-[4px] px-3.5 py-2.5 relative"
                            style={{
                              background: '#1f2d22',
                              border: '1px solid rgba(255,255,255,0.06)',
                            }}
                          >
                            <p className="text-sm text-white leading-relaxed">
                              {interaction.mateFollowUp}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 mt-1 px-1">
                            <span className="text-[10px] text-white">7:01 AM</span>
                            <CheckCircle
                              className="text-amber-400/70"
                              style={{ height: 10, width: 10 }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Input area — decorative */}
            <div
              className="flex items-center gap-2.5 px-3 py-2.5 border-t border-white/[0.06]"
              style={{ background: '#111c14' }}
            >
              <div className="flex-1 h-9 rounded-full bg-white/[0.06] flex items-center px-4">
                <span className="text-xs text-white">Message Mate...</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                <Zap className="text-black" style={{ height: 16, width: 16 }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── 3. The Pipeline ── */}
        <motion.div variants={itemVariants} className="px-4 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 px-1">
            <div className="h-2 w-2 rounded-full bg-amber-400" />
            The Pipeline
          </h2>

          {/* Horizontal scrollable pipeline */}
          <div className="relative">
            <div
              className="overflow-x-auto -mx-4 px-4 pb-2 scrollbar-hide"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <div className="flex items-center gap-0 min-w-max">
                {pipelineSteps.map(({ icon: Icon, label, desc, tools }, i) => (
                  <React.Fragment key={label}>
                    <div className="flex flex-col items-center text-center w-[88px] shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-2">
                        <Icon className="text-amber-400" style={{ height: 20, width: 20 }} />
                      </div>
                      <span className="text-sm font-semibold text-white">{label}</span>
                      <span className="text-[11px] text-white mt-0.5">{desc}</span>
                      <span className="mt-1.5 text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                        {tools} tools
                      </span>
                    </div>
                    {i < pipelineSteps.length - 1 && (
                      <ArrowRight
                        className="text-amber-400/50 shrink-0 mx-1"
                        style={{ height: 16, width: 16 }}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            {/* Right-edge fade to hint at scrollability */}
            <div className="absolute top-0 right-0 bottom-2 w-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          </div>

          <p className="text-sm text-white text-center">
            80 tools working behind one WhatsApp chat
          </p>
        </motion.div>

        {/* ── 4. Everything Mate Handles ── */}
        <motion.div variants={itemVariants} className="px-4 space-y-5">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 px-1">
            <div className="h-2 w-2 rounded-full bg-amber-400" />
            Everything Mate Handles
          </h2>

          {capabilityGroups.map(({ title, cards }) => (
            <div key={title} className="space-y-2.5">
              <h3 className="text-sm font-semibold text-amber-400 px-1">{title}</h3>
              <div className="grid grid-cols-2 gap-2.5">
                {cards.map(({ icon: Icon, title: cardTitle, tools, examples }, i) => (
                  <motion.div
                    key={cardTitle}
                    custom={i}
                    variants={bubbleVariants}
                    className="rounded-2xl p-4 space-y-2.5 border border-white/[0.06]"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center shrink-0">
                        <Icon className="text-amber-400" style={{ height: 16, width: 16 }} />
                      </div>
                      <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                        {tools} tools
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white leading-tight">
                        {cardTitle}
                      </div>
                      <div className="text-[11px] text-white mt-1 leading-snug">{examples}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── 5. How It Works ── */}
        <motion.div variants={itemVariants} className="px-4 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 px-1">
            <div className="h-2 w-2 rounded-full bg-amber-400" />
            How It Works
          </h2>
          <div className="relative space-y-0">
            {[
              { step: '1', text: 'Subscribe to Business AI' },
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
                    <div
                      className="w-px flex-1 bg-gradient-to-b from-amber-500/30 to-transparent my-1"
                      style={{ minHeight: 20 }}
                    />
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

        {/* ── 6. Approval-First Trust ── */}
        <motion.div variants={itemVariants} className="px-4">
          <div
            className="rounded-2xl p-6 border border-green-500/20 space-y-4"
            style={{ background: 'rgba(34,197,94,0.05)' }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/15 border border-green-500/25 flex items-center justify-center shrink-0">
                <Shield className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Mate always asks first</h3>
                <p className="text-sm text-white mt-0.5">
                  Nothing leaves your business without your OK
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-green-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="h-3 w-3 text-green-400" />
                  </div>
                  <span className="text-sm text-white leading-snug">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── 7. Waitlist CTA ── */}
        <motion.div variants={itemVariants} className="px-4 space-y-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 px-1">
            <div className="h-2 w-2 rounded-full bg-amber-400" />
            Early Access
          </h2>

          {/* Waitlist card */}
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-yellow-500/5" />
            <div className="relative p-6 text-center space-y-2">
              <div className="text-3xl font-bold text-white">£29.99</div>
              <div className="text-sm text-white">per month · launching soon</div>
              <p className="text-xs text-white pt-1">Includes everything in the Electrician plan</p>
            </div>
          </div>

          {/* Waitlist CTA button */}
          {waitlistJoined ? (
            <div className="w-full rounded-xl border border-green-500/30 bg-green-500/10 flex items-center justify-center gap-2 text-green-400 font-semibold text-base" style={{ height: 52 }}>
              <CheckCircle className="h-4 w-4" />
              You're on the waitlist!
            </div>
          ) : (
            <Button
              onClick={handleJoinWaitlist}
              disabled={loading}
              className="w-full touch-manipulation font-semibold text-base rounded-xl transition-all bg-amber-500 hover:bg-amber-400 active:bg-amber-600 active:scale-[0.98] text-black shadow-lg shadow-amber-500/25"
              style={{ height: 52 }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  One sec...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Join the Waitlist
                </span>
              )}
            </Button>
          )}

          <p className="text-center text-xs text-white">
            We'll let you know as soon as Elec-AI is ready
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
