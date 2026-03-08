import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  Mail,
  Calendar,
  FileDown,
  ShieldCheck,
  BarChart3,
  Calculator,
  Loader2,
  Shield,
  Banknote,
  Phone,
  Check,
  Star,
  Quote,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

/* ── animation ── */
const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const childFade = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

/* ── data ── */
const chatPreview = [
  {
    from: 'mate' as const,
    text: 'Morning! 3 jobs today. Henderson quote is outstanding — want me to chase it?',
    icon: BellRing,
  },
  { from: 'user' as const, text: 'Yes please' },
  {
    from: 'mate' as const,
    text: "Done — sent a polite reminder. I'll follow up tomorrow if no reply.",
    icon: Zap,
  },
];

const stats = [
  { value: '80', label: 'Tools' },
  { value: '24/7', label: 'Available' },
  { value: '1', label: 'WhatsApp chat' },
];

const features = [
  {
    icon: Receipt,
    title: 'Invoicing & Quoting',
    desc: 'Draft, send, chase and track — all from a text message',
    colour: 'amber',
  },
  {
    icon: BookOpen,
    title: 'BS 7671 on Tap',
    desc: 'Zs tables, cable ratings, disconnection times — instant answers on site',
    colour: 'blue',
  },
  {
    icon: Users,
    title: 'Client Management',
    desc: 'CRM, job history, notes and follow-ups without opening an app',
    colour: 'green',
  },
  {
    icon: ClipboardCheck,
    title: 'Certificates',
    desc: 'EICR, EIC, minor works — filed, generated and delivered',
    colour: 'purple',
  },
  {
    icon: ListTodo,
    title: 'Projects & Scheduling',
    desc: 'Create jobs, assign tasks, set reminders — Mate keeps you on track',
    colour: 'orange',
  },
  {
    icon: BarChart3,
    title: 'Business Analytics',
    desc: 'Revenue, outstanding invoices, job profitability at a glance',
    colour: 'cyan',
  },
];

const featureColours: Record<string, { icon: string; bg: string; border: string }> = {
  amber: { icon: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  blue: { icon: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  green: { icon: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  purple: { icon: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  orange: { icon: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  cyan: { icon: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
};

const pipeline = ['Lead', 'Quote', 'Job', 'Cert', 'Invoice', 'Paid'];

const trustPoints = [
  'Invoices drafted but never sent without your say-so',
  'Quotes reviewed by you before clients see them',
  'Messages held for your OK before sending',
  'Payments tracked — never initiated without you',
];

const included = [
  'All 80 business tools',
  'WhatsApp access 24/7',
  'BS 7671 knowledge base',
  'Invoice & quote management',
  'Client CRM',
  'Certificate filing & delivery',
  'RAMS & compliance tools',
  'Everything in the Electrician plan',
];

/* ── component ── */
export function BusinessAISalesView() {
  const [loading, setLoading] = useState(false);
  const [waitlistJoined, setWaitlistJoined] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

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
      const { error } = await supabase.from('business_ai_waitlist').insert({ user_id: user.id });
      if (error && error.code !== '23505') throw error;
      setWaitlistJoined(true);
      toast({
        title: "You're on the list!",
        description: "We'll be in touch as soon as Mate is ready for you.",
        variant: 'success',
      });
    } catch (err) {
      console.error('Waitlist error:', err);
      toast({
        title: 'Something went wrong',
        description: 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const CtaButton = () =>
    waitlistJoined ? (
      <div className="flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-green-500/10 border border-green-500/25">
        <CheckCircle className="h-5 w-5 text-green-400 shrink-0" />
        <span className="text-sm font-bold text-green-400">You're on the waitlist!</span>
      </div>
    ) : (
      <Button
        onClick={handleJoinWaitlist}
        disabled={loading}
        className="w-full touch-manipulation font-bold text-[15px] rounded-2xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 active:scale-[0.98] text-black shadow-lg shadow-amber-500/25 transition-all"
        style={{ height: 56 }}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            One sec...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Join the Waitlist — Free
          </span>
        )}
      </Button>
    );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto pb-32">
        {/* ── Nav ── */}
        <div className="px-4 pt-4 pb-2">
          <Link to="/electrician">
            <Button
              variant="ghost"
              className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back
            </Button>
          </Link>
        </div>

        {/* ════════════════════════════════════════════
            1. HERO — full bleed amber gradient
        ════════════════════════════════════════════ */}
        <motion.section variants={fade} initial="hidden" animate="visible" className="px-4 pb-12">
          <div className="relative overflow-hidden rounded-3xl">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/25 via-amber-500/8 to-transparent" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-amber-400/15 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative px-5 pt-10 pb-8 space-y-6">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-500 flex items-center justify-center shrink-0 shadow-xl shadow-amber-500/30">
                  <Zap className="h-7 w-7 text-black" />
                </div>
                <div>
                  <div className="text-xl font-extrabold text-white leading-none">Mate</div>
                  <div className="text-xs text-amber-400 font-semibold mt-0.5">by Elec-Mate</div>
                </div>
              </div>

              {/* Headline */}
              <div className="space-y-3">
                <h1 className="text-[34px] font-extrabold leading-[1.08] tracking-tight">
                  <span className="text-white">Stay on the tools.</span>
                  <br />
                  <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">
                    Let Mate run the office.
                  </span>
                </h1>
                <p className="text-[15px] text-white leading-relaxed">
                  Your AI business assistant — right inside WhatsApp. Invoicing, scheduling, regs,
                  client comms. All from one chat.
                </p>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-3">
                {stats.map(({ value, label }) => (
                  <div
                    key={label}
                    className="flex-1 py-3 px-3 rounded-2xl bg-black/30 border border-white/[0.06]"
                  >
                    <div className="text-xl font-extrabold text-amber-400">{value}</div>
                    <div className="text-[11px] text-white font-medium mt-0.5">{label}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <CtaButton />
            </div>
          </div>
        </motion.section>

        {/* ════════════════════════════════════════════
            2. WHATSAPP PREVIEW — mini chat
        ════════════════════════════════════════════ */}
        <motion.section
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="px-4 pb-12"
        >
          <div className="mb-5 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <Phone className="h-3.5 w-3.5 text-green-400" />
              <span className="text-xs font-bold text-green-400">Works on WhatsApp</span>
            </div>
            <h2 className="text-xl font-extrabold text-white">Just text. Mate handles the rest.</h2>
          </div>

          <div
            className="rounded-2xl overflow-hidden border border-green-500/15"
            style={{ background: '#0b1612' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-2.5" style={{ background: '#1a2b20' }}>
              <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                <Zap className="h-4 w-4 text-black" />
              </div>
              <div>
                <div className="text-sm font-bold text-white leading-none">Mate</div>
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-[10px] text-green-400">Online</span>
                </div>
              </div>
            </div>

            {/* Bubbles */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="px-3 py-3 space-y-2"
            >
              {chatPreview.map((msg, i) => (
                <motion.div key={i} variants={childFade}>
                  {msg.from === 'mate' ? (
                    <div className="flex items-start gap-2 max-w-[85%]">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center mt-0.5">
                        {msg.icon && <msg.icon className="h-3 w-3 text-black" />}
                      </div>
                      <div
                        className="rounded-2xl rounded-tl-md px-3 py-2"
                        style={{
                          background: '#1f2d22',
                          border: '1px solid rgba(255,255,255,0.06)',
                        }}
                      >
                        <p className="text-[13px] text-white leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <div
                        className="rounded-2xl rounded-tr-md px-3 py-2 max-w-[70%]"
                        style={{ background: '#005c4b' }}
                      >
                        <p className="text-[13px] text-white">{msg.text}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Input */}
            <div
              className="flex items-center gap-2 px-3 py-2 border-t border-white/[0.06]"
              style={{ background: '#111c14' }}
            >
              <div className="flex-1 h-8 rounded-full bg-white/[0.05] flex items-center px-3">
                <span className="text-[11px] text-white/30">Message Mate...</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                <Zap className="h-3.5 w-3.5 text-black" />
              </div>
            </div>
          </div>
        </motion.section>

        {/* ════════════════════════════════════════════
            3. PIPELINE — linear flow
        ════════════════════════════════════════════ */}
        <motion.section
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="px-4 pb-12"
        >
          <div className="mb-5 space-y-1">
            <h2 className="text-xl font-extrabold text-white">Lead to Paid. Automated.</h2>
            <p className="text-sm text-white">Mate handles every stage of the job</p>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
            <div className="flex items-center justify-between">
              {pipeline.map((step, i) => (
                <React.Fragment key={step}>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center">
                      <span className="text-xs font-extrabold text-amber-400">{i + 1}</span>
                    </div>
                    <span className="text-[10px] font-bold text-white">{step}</span>
                  </div>
                  {i < pipeline.length - 1 && (
                    <div className="flex-1 h-px bg-gradient-to-r from-amber-500/30 to-amber-500/10 mx-1" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ════════════════════════════════════════════
            4. FEATURES — cards with colour variety
        ════════════════════════════════════════════ */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="px-4 pb-12"
        >
          <div className="mb-5 space-y-1">
            <h2 className="text-xl font-extrabold text-white">80 Tools. One Chat.</h2>
            <p className="text-sm text-white">Everything you need to run your business</p>
          </div>

          <div className="space-y-3">
            {features.map(({ icon: Icon, title, desc, colour }) => {
              const c = featureColours[colour];
              return (
                <motion.div
                  key={title}
                  variants={childFade}
                  className="flex items-start gap-4 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
                >
                  <div
                    className={`w-11 h-11 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center shrink-0`}
                  >
                    <Icon className={`h-5 w-5 ${c.icon}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-bold text-white">{title}</p>
                    <p className="text-[13px] text-white mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Extra tools footnote */}
          <p className="text-xs text-white mt-4 font-medium">
            Plus: expenses, documents, RAMS, email monitoring, calendar and more
          </p>
        </motion.section>

        {/* ════════════════════════════════════════════
            5. TESTIMONIAL / SOCIAL PROOF
        ════════════════════════════════════════════ */}
        <motion.section
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="px-4 pb-12"
        >
          <div className="rounded-2xl border border-amber-500/15 bg-amber-500/[0.03] p-5 space-y-5">
            {/* Stars at top */}
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-4 w-4 text-amber-400 fill-amber-400" />
              ))}
            </div>

            {/* Quote */}
            <div className="space-y-3">
              <p className="text-[15px] text-white leading-[1.7]">
                "I used to allocate a few hours every night just to sort the admin — invoices,
                chasing payments, replying to enquiries. Now I just message Mate on WhatsApp, it
                does it all and messages me back with what it's done.
              </p>
              <p className="text-[15px] text-white leading-[1.7]">
                It never sends anything client-facing without your say-so, which I really love. And
                you can ask it about different electrical things — regs, Zs values, cable sizes —
                and it answers super accurately. It's like having a business partner and a technical
                library in your pocket."
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
              <div className="w-10 h-10 rounded-full bg-amber-500/15 flex items-center justify-center shrink-0">
                <span className="text-sm font-bold text-amber-400">AM</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Andrew M.</p>
                <p className="text-xs text-white">Electrician, Cumbria</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ════════════════════════════════════════════
            6. HOW IT WORKS
        ════════════════════════════════════════════ */}
        <motion.section
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="px-4 pb-12"
        >
          <div className="mb-5 space-y-1">
            <h2 className="text-xl font-extrabold text-white">Up and Running in 60 Seconds</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                n: '1',
                title: 'Subscribe',
                desc: 'Add Business AI to your Elec-Mate plan',
                icon: Zap,
              },
              {
                n: '2',
                title: 'Connect WhatsApp',
                desc: 'Link your number — takes 30 seconds',
                icon: Phone,
              },
              {
                n: '3',
                title: 'Text Mate',
                desc: "That's it. Start running your business from chat.",
                icon: MessageSquare,
              },
            ].map(({ n, title, desc, icon: Icon }) => (
              <div
                key={n}
                className="flex items-center gap-4 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]"
              >
                <div className="w-11 h-11 rounded-full bg-amber-500 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
                  <span className="text-lg font-extrabold text-black">{n}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-white">{title}</p>
                  <p className="text-[13px] text-white mt-0.5">{desc}</p>
                </div>
                <Icon className="h-5 w-5 text-amber-400/50 shrink-0" />
              </div>
            ))}
          </div>
        </motion.section>

        {/* ════════════════════════════════════════════
            7. TRUST — approval-first
        ════════════════════════════════════════════ */}
        <motion.section
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="px-4 pb-12"
        >
          <div className="rounded-2xl border border-green-500/15 bg-green-500/[0.03] p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-green-500/15 border border-green-500/20 flex items-center justify-center shrink-0">
                <Shield className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-white">Mate always asks first</h3>
                <p className="text-xs text-white mt-0.5">
                  Nothing leaves your business without your OK
                </p>
              </div>
            </div>

            <div className="space-y-3 pl-1">
              {trustPoints.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
                  <span className="text-[13px] text-white leading-snug">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ════════════════════════════════════════════
            8. PRICING
        ════════════════════════════════════════════ */}
        <motion.section
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="px-4 pb-8"
        >
          <div className="relative overflow-hidden rounded-3xl border border-amber-500/25">
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/15 via-amber-500/5 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-amber-400/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative p-6 space-y-6">
              {/* Price */}
              <div className="space-y-2">
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/25">
                  <span className="text-xs font-bold text-amber-400">Early Access</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold text-white">£29.99</span>
                  <span className="text-sm text-white font-medium">/mo</span>
                </div>
                <p className="text-sm text-white">Launching soon</p>
              </div>

              {/* What's included */}
              <div className="space-y-2.5">
                {included.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-500/15 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-amber-400" />
                    </div>
                    <span className="text-sm text-white">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <CtaButton />

              <p className="text-xs text-white">
                No card required. We'll notify you when Mate is ready.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
