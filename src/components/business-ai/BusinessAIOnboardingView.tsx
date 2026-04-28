import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ContactRound,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { DeepLinkActivationStep } from './DeepLinkActivationStep';
import { PhoneChatMock } from './PhoneChatMock';
import { useBusinessAIProfile } from './useBusinessAIProfile';
import { MATE_PHONE_DISPLAY, MATE_PHONE_RAW } from '@/constants/mate';
import { downloadMateVCard } from '@/utils/mate-vcard';

// ─── Motion ───────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

// ─── Editorial atoms (mirror admin/editorial language) ────────────────────────
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-elec-yellow">
    {children}
  </span>
);

const Y = ({ children }: { children: React.ReactNode }) => (
  <span className="text-elec-yellow">{children}</span>
);

// ═════════ ONBOARDING VIEW ═══════════════════════════════════════════════════
export function BusinessAIOnboardingView() {
  const { user, fetchProfile } = useAuth();
  const { isAgentActive } = useBusinessAIProfile();
  const [activated, setActivated] = useState(false);

  const showSuccess = activated || isAgentActive;

  const handleActivated = useCallback(() => {
    setActivated(true);
  }, []);

  const transitionToDashboard = useCallback(async () => {
    if (user && fetchProfile) {
      await fetchProfile(user.id);
    }
  }, [user, fetchProfile]);

  useEffect(() => {
    if (!showSuccess) return;
    const timer = setTimeout(transitionToDashboard, 10_000);
    return () => clearTimeout(timer);
  }, [showSuccess, transitionToDashboard]);

  if (showSuccess) {
    return <SuccessState onContinue={transitionToDashboard} />;
  }

  return (
    <div className="relative min-h-screen bg-background text-white overflow-hidden">
      {/* Subtle yellow halo to tie into the sales-page hero language */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[280px] bg-gradient-to-b from-elec-yellow/[0.04] to-transparent" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative max-w-5xl mx-auto px-5 sm:px-8 pt-4 sm:pt-6 pb-16 sm:pb-24"
      >
        {/* ── Back button (always visible — small, ghost) ───────────── */}
        <motion.div variants={fadeUp}>
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

        {/* ── Section 1 — Hero ─────────────────────────────────────── */}
        <motion.section
          variants={fadeUp}
          className="pt-6 sm:pt-12 pb-10 sm:pb-14 text-center lg:text-left"
        >
          <Eyebrow>Almost there</Eyebrow>
          <h1 className="mt-4 text-[44px] sm:text-[72px] lg:text-[88px] font-bold tracking-[-0.03em] leading-[0.95] text-white">
            Tap one button.
            <br />
            <Y>Mate is yours.</Y>
          </h1>
          <p className="mt-6 sm:mt-7 text-base sm:text-lg text-white/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            No SMS, no codes to type. Tap, hit send in WhatsApp, you're done in 5 seconds.
          </p>
        </motion.section>

        {/* ── Section 2 — Activation card + phone mock side-by-side on lg ── */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-start">
          <motion.div variants={fadeUp}>
            <DeepLinkActivationStep onActivated={handleActivated} />
          </motion.div>

          {/* Phone mock — desktop only; user's own WhatsApp is the demo on mobile */}
          <motion.div variants={fadeUp} className="hidden lg:flex justify-end pt-4">
            <PhoneChatMock />
          </motion.div>
        </section>

        {/* ── Section 3 — "What happens next" 3-up ───────────────────── */}
        <motion.section
          variants={fadeUp}
          className="mt-16 sm:mt-24 border-t border-white/[0.06] pt-12 sm:pt-16"
        >
          <Eyebrow>What happens next</Eyebrow>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-white">
            From tap to chatting in five seconds.
          </h2>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-10">
            {[
              {
                n: '01',
                title: 'You tap',
                body: 'WhatsApp opens with the activation code already typed.',
              },
              {
                n: '02',
                title: 'You hit send',
                body: 'Mate verifies the code and sets up your account in five seconds.',
              },
              {
                n: '03',
                title: "You're chatting",
                body:
                  'Quotes, invoices, regs lookups, the lot — from WhatsApp. No app-switching.',
              },
            ].map((step) => (
              <div
                key={step.n}
                className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6 overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-elec-yellow/70 via-amber-400/60 to-orange-400/60" />
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/40 tabular-nums">
                  {step.n}
                </div>
                <div className="mt-2 text-lg font-semibold text-white">{step.title}</div>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ── Section 4 — Trust strip ──────────────────────────────── */}
        <motion.section
          variants={fadeUp}
          className="mt-14 sm:mt-20 border-t border-white/[0.06] pt-8 text-center"
        >
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-white/55">
            <li>Cancel anytime</li>
            <li className="hidden sm:inline text-white/20">·</li>
            <li>Your data stays in the EU</li>
            <li className="hidden sm:inline text-white/20">·</li>
            <li>WhatsApp end-to-end encrypted</li>
            <li className="hidden sm:inline text-white/20">·</li>
            <li>Real humans answer support emails</li>
          </ul>
        </motion.section>
      </motion.div>
    </div>
  );
}

// ─── Success state ────────────────────────────────────────────────────────────
function SuccessState({ onContinue }: { onContinue: () => void }) {
  const PROMPTS: Array<{ label: string; prompt: string }> = [
    { label: 'Morning brief', prompt: 'morning brief' },
    { label: "Who hasn't paid?", prompt: "who hasn't paid?" },
    { label: "What's on today?", prompt: "what's on today?" },
    { label: 'Draft a quote', prompt: 'draft a quote' },
  ];

  return (
    <div className="relative min-h-screen bg-background text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[280px] bg-gradient-to-b from-green-500/[0.06] to-transparent" />
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative max-w-3xl mx-auto px-5 sm:px-8 pt-12 sm:pt-20 pb-16 text-center"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.7, bounce: 0.45 }}
          className="inline-flex p-5 rounded-3xl bg-green-500/10 border border-green-500/20"
        >
          <CheckCircle className="h-14 w-14 text-green-400" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="mt-7 text-[44px] sm:text-6xl font-bold tracking-[-0.03em] leading-[1] text-white"
        >
          You're in <Y>⚡</Y>
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-4 text-base sm:text-lg text-white/75">
          Mate is live on <span className="font-mono text-white">{MATE_PHONE_DISPLAY}</span>
        </motion.p>

        {/* Try one of these */}
        <motion.section variants={fadeUp} className="mt-12 sm:mt-16">
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/50">
            Try one of these
          </div>
          <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {PROMPTS.map((p) => {
              const link = `https://wa.me/${MATE_PHONE_RAW}?text=${encodeURIComponent(p.prompt)}`;
              return (
                <a
                  key={p.label}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] active:scale-[0.98] transition-all p-4 sm:p-5 text-left touch-manipulation"
                >
                  <div className="text-sm sm:text-base font-semibold text-white leading-tight">
                    {p.label}
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1 text-xs text-white/50 group-hover:text-elec-yellow transition-colors">
                    Open WhatsApp
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </a>
              );
            })}
          </div>
        </motion.section>

        {/* Big CTAs */}
        <motion.div
          variants={fadeUp}
          className="mt-12 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href={`https://wa.me/${MATE_PHONE_RAW}?text=${encodeURIComponent('Hey Mate')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-14 px-7 rounded-2xl bg-[#25D366] hover:bg-[#1ebe57] active:bg-[#1ba350] text-white font-semibold text-base shadow-[0_20px_60px_-20px_rgba(37,211,102,0.55)] touch-manipulation"
          >
            <MessageCircle className="h-5 w-5" />
            Open WhatsApp
            <ExternalLink className="h-4 w-4 opacity-80" />
          </a>
          <Button
            onClick={onContinue}
            variant="outline"
            className="h-14 px-7 touch-manipulation bg-white/[0.03] border-white/10 hover:bg-white/[0.06] text-white rounded-2xl text-base"
          >
            Go to dashboard
          </Button>
        </motion.div>

        {/* Save Mate to contacts — small secondary affordance below the big CTAs */}
        <motion.button
          variants={fadeUp}
          type="button"
          onClick={downloadMateVCard}
          className="mt-5 inline-flex items-center justify-center gap-2 text-sm text-white/70 hover:text-white underline-offset-2 hover:underline touch-manipulation"
        >
          <ContactRound className="h-4 w-4" />
          Save Mate to your phone contacts
        </motion.button>

        <motion.p variants={fadeUp} className="mt-6 text-xs text-white/40">
          Auto-redirecting to your dashboard in a moment.
        </motion.p>
      </motion.div>
    </div>
  );
}
