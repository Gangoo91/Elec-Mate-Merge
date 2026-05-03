import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { DeepLinkActivationStep } from './DeepLinkActivationStep';
import { PhoneChatMock } from './PhoneChatMock';
import { useBusinessAIProfile } from './useBusinessAIProfile';
import { MATE_PHONE_DISPLAY, MATE_PHONE_RAW } from '@/constants/mate';
import { downloadMateVCard } from '@/utils/mate-vcard';

// ─── Animation ────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

// ─── Editorial atoms ─────────────────────────────────────────────────────────
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-elec-yellow">
    {children}
  </span>
);

const Y = ({ children }: { children: React.ReactNode }) => (
  <span className="text-elec-yellow font-semibold">{children}</span>
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
      {/* Top nav */}
      <div className="px-4 sm:px-6 pt-3 pb-1 max-w-6xl mx-auto">
        <Link to="/electrician">
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] active:scale-[0.98] -ml-2 h-11 touch-manipulation transition-all"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>

      {/* ═════════ HERO ═════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-elec-yellow/[0.05] blur-[120px]" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-6 sm:pt-16 pb-10 sm:pb-16 text-center lg:text-left"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 mb-7 sm:mb-10">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-elec-yellow animate-ping opacity-75" />
              <span className="relative h-2 w-2 rounded-full bg-elec-yellow" />
            </span>
            <Eyebrow>Almost there · One step left</Eyebrow>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-[44px] sm:text-[80px] lg:text-[96px] font-bold tracking-[-0.035em] leading-[0.95] text-white"
          >
            Tap one button.
            <br />
            <Y>Mate is yours.</Y>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 sm:mt-9 text-lg sm:text-2xl text-white max-w-2xl mx-auto lg:mx-0 leading-[1.4]"
          >
            No SMS, no codes to type. Tap the button, hit send in WhatsApp, you&apos;re done in{' '}
            <Y>five seconds</Y>.
          </motion.p>
        </motion.div>
      </section>

      {/* ═════════ ACTIVATION ═══════════════════════════════════════ */}
      <section className="relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="max-w-6xl mx-auto px-5 sm:px-8 pb-14 sm:pb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-14 items-start">
            <motion.div variants={fadeUp}>
              <DeepLinkActivationStep onActivated={handleActivated} />
            </motion.div>
            <motion.div variants={fadeUp} className="hidden lg:flex justify-end pt-4">
              <PhoneChatMock />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═════════ HOW IT WORKS — editorial numbered rows ══════════ */}
      <section className="relative border-t border-white/[0.06]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-24"
        >
          <motion.div variants={fadeUp} className="max-w-2xl mb-10 sm:mb-16">
            <Eyebrow>What happens next</Eyebrow>
            <h2 className="mt-3 text-3xl sm:text-5xl font-bold tracking-[-0.02em] leading-[1.05] text-white">
              From tap to chatting in <Y>five seconds.</Y>
            </h2>
          </motion.div>

          <div className="divide-y divide-white/[0.06]">
            {[
              {
                n: '01',
                title: 'You tap',
                body: (
                  <>
                    WhatsApp opens with the activation code <Y>already typed.</Y>
                  </>
                ),
              },
              {
                n: '02',
                title: 'You hit send',
                body: (
                  <>
                    Mate verifies the code and sets up your account in <Y>under five seconds</Y>.
                  </>
                ),
              },
              {
                n: '03',
                title: "You're chatting",
                body: (
                  <>
                    Quotes, invoices, regs lookups — all from WhatsApp. <Y>No app-switching.</Y>
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-14"
        >
          <motion.ul
            variants={stagger}
            className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs sm:text-sm text-white/55"
          >
            {[
              'Cancel anytime',
              'Your data stays in the EU',
              'WhatsApp end-to-end encrypted',
              'Real humans answer support',
            ].map((point, i, arr) => (
              <React.Fragment key={point}>
                <motion.li variants={fadeUp}>{point}</motion.li>
                {i < arr.length - 1 && (
                  <li className="hidden sm:inline text-white/20" aria-hidden>
                    ·
                  </li>
                )}
              </React.Fragment>
            ))}
          </motion.ul>
        </motion.div>
      </section>
    </div>
  );
}

// ═════════ SUCCESS STATE ═════════════════════════════════════════════════════
function SuccessState({ onContinue }: { onContinue: () => void }) {
  const PROMPTS: Array<{ label: string; prompt: string }> = [
    { label: 'Morning brief', prompt: 'morning brief' },
    { label: "Who hasn't paid?", prompt: "who hasn't paid?" },
    { label: "What's on today?", prompt: "what's on today?" },
    { label: 'Draft a quote', prompt: 'draft a quote' },
  ];

  return (
    <div className="relative min-h-screen bg-background text-white overflow-hidden">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-green-500/[0.06] blur-[120px]" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative max-w-4xl mx-auto px-5 sm:px-8 pt-12 sm:pt-24 pb-16 sm:pb-24 text-center"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.7, bounce: 0.45 }}
          className="inline-flex p-5 rounded-3xl bg-green-500/10 border border-green-500/20"
        >
          <CheckCircle className="h-14 w-14 text-green-400" />
        </motion.div>

        <motion.div variants={fadeUp} className="mt-8 mb-3">
          <Eyebrow>You&apos;re in</Eyebrow>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-[44px] sm:text-[72px] lg:text-[80px] font-bold tracking-[-0.035em] leading-[0.95] text-white"
        >
          Mate is <Y>live.</Y>
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-6 sm:mt-7 text-lg sm:text-xl text-white/80">
          On <span className="font-mono text-white">{MATE_PHONE_DISPLAY}</span>. Right now. Try one
          of these.
        </motion.p>

        {/* Prompts — typographic quoted lines, each opens WhatsApp ──── */}
        <motion.ul
          variants={stagger}
          className="mt-10 sm:mt-14 max-w-xl mx-auto space-y-4 sm:space-y-5 text-left"
        >
          {PROMPTS.map((p) => {
            const link = `https://wa.me/${MATE_PHONE_RAW}?text=${encodeURIComponent(p.prompt)}`;
            return (
              <motion.li key={p.label} variants={fadeUp}>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline gap-3 text-xl sm:text-3xl font-semibold tracking-[-0.015em] leading-[1.2] text-white hover:text-white touch-manipulation"
                >
                  <span className="text-elec-yellow">&ldquo;</span>
                  <span className="flex-1 underline-offset-4 decoration-white/10 group-hover:underline group-hover:decoration-elec-yellow/60">
                    {p.label}
                  </span>
                  <span className="text-elec-yellow">&rdquo;</span>
                </a>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* Big CTAs ─────────────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          className="mt-12 sm:mt-16 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center"
        >
          <a
            href={`https://wa.me/${MATE_PHONE_RAW}?text=${encodeURIComponent('Hey Mate')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-elec-yellow text-black hover:bg-elec-yellow/90 font-bold text-base shadow-[0_20px_60px_-20px_rgba(250,204,21,0.5)] touch-manipulation active:scale-[0.98] transition-all"
          >
            Open WhatsApp
            <ArrowRight className="h-5 w-5" />
          </a>
          <Button
            onClick={onContinue}
            variant="ghost"
            className="h-14 px-7 touch-manipulation text-white hover:bg-white/[0.05] hover:text-white rounded-full text-base"
          >
            Go to dashboard
          </Button>
        </motion.div>

        <motion.button
          variants={fadeUp}
          type="button"
          onClick={downloadMateVCard}
          className="mt-7 inline-flex items-center justify-center text-sm text-white/65 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white/60 touch-manipulation"
        >
          Save Mate to your phone contacts
        </motion.button>

        <motion.p variants={fadeUp} className="mt-8 text-xs text-white/40">
          Auto-redirecting to your dashboard in a moment.
        </motion.p>
      </motion.div>
    </div>
  );
}
