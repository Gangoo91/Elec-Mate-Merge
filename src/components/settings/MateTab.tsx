import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ContactRound,
  ExternalLink,
  HelpCircle,
  Image as ImageIcon,
  MessageCircle,
  Mic,
  Phone,
  Sun,
  Wallet,
  Calendar,
  PenLine,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useBusinessAIProfile } from '@/components/business-ai/useBusinessAIProfile';
import { FounderBadge } from '@/components/business-ai/FounderBanner';
import { MATE_PHONE_DISPLAY, MATE_PHONE_RAW, MATE_WHATSAPP_LINK } from '@/constants/mate';
import { downloadMateVCard } from '@/utils/mate-vcard';
import { openExternalUrl } from '@/utils/open-external-url';

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-elec-yellow">
    {children}
  </span>
);

const SubEyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white">
    {children}
  </span>
);

/** Mask middle digits of a UK phone for the "your number" display row. */
function maskPhone(p?: string | null): string {
  if (!p) return 'Not connected';
  const digits = p.replace(/\D/g, '');
  if (digits.length < 7) return p;
  return `+${digits.slice(0, 4)} ${digits.slice(4, 6)}•• ${digits.slice(-3)}`;
}

const PROMPTS: Array<{ label: string; prompt: string; Icon: typeof Sun }> = [
  { label: 'Morning brief', prompt: 'morning brief', Icon: Sun },
  { label: "Who hasn't paid?", prompt: "who hasn't paid?", Icon: Wallet },
  { label: "What's on today?", prompt: "what's on today?", Icon: Calendar },
  { label: 'Draft a quote', prompt: 'draft a quote', Icon: PenLine },
];

const SEND_HINTS: Array<{ label: string; hint: string; Icon: typeof MessageCircle }> = [
  { label: 'Text', hint: 'Anything — quotes, regs, scheduling', Icon: MessageCircle },
  { label: 'Voice notes', hint: "Hands-free in the van", Icon: Mic },
  { label: 'Photos', hint: 'CU board, receipt, install', Icon: ImageIcon },
];

/**
 * Mate settings tab — three states matching useBusinessAIProfile.state:
 *   sales      → "Get Mate" CTA pointing at /electrician/business-ai
 *   onboarding → "Finish setup" CTA
 *   active     → editorial hero with Mate identity, number, prompts, support
 *
 * The active layout is the most-visited surface for paying users — it should
 * feel like a contact card for a real assistant, not a row in a settings table.
 */
export default function MateTab() {
  const { profile } = useAuth();
  const { state, isAgentActive } = useBusinessAIProfile();
  const userPhone = profile?.agent_whatsapp_number ?? null;
  const firstName = profile?.full_name?.trim().split(/\s+/)[0] || 'there';

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6 max-w-2xl"
    >
      {/* ── Header ───────────────────────────────────────────────── */}
      <motion.div variants={fadeUp}>
        <div className="flex items-center gap-3 flex-wrap">
          <Eyebrow>WhatsApp Mate</Eyebrow>
          <FounderBadge isFounder={profile?.is_founder} />
        </div>
        <h2 className="mt-3 text-[28px] sm:text-[34px] font-bold tracking-[-0.02em] leading-[1.05] text-white">
          {isAgentActive ? (
            <>
              Hey {firstName}.
              <br />
              <span className="text-white">Mate's listening.</span>
            </>
          ) : state === 'onboarding' ? (
            'Finish setting up Mate.'
          ) : (
            'Your AI business assistant on WhatsApp.'
          )}
        </h2>
        <p className="mt-3 text-sm text-white leading-relaxed">
          {isAgentActive
            ? 'Save the number, message Mate, or grab one of the prompts below.'
            : state === 'onboarding'
              ? "You're subscribed — one tap on WhatsApp and Mate is live."
              : 'Quotes, invoices, regs lookups — all from WhatsApp. No app-switching.'}
        </p>
      </motion.div>

      {/* ── ACTIVE STATE ─────────────────────────────────────────── */}
      {isAgentActive ? (
        <>
          {/* ─── Hero contact card ──────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01]"
          >
            {/* Top gradient accent — same language as sales page */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-orange-400" />
            {/* Soft halo */}
            <div className="pointer-events-none absolute -top-24 -right-24 w-56 h-56 rounded-full bg-elec-yellow/[0.08] blur-3xl" />

            <div className="relative p-5 sm:p-7">
              {/* Identity row — avatar + name + online */}
              <div className="flex items-center gap-3.5">
                <div className="relative h-12 w-12 rounded-2xl bg-elec-yellow flex items-center justify-center shrink-0 shadow-[0_0_0_1.5px_rgba(0,0,0,0.2)_inset]">
                  <span className="text-black font-extrabold text-[18px] leading-none">M</span>
                  {/* Online dot, anchored to the avatar */}
                  <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-green-500 border-[2.5px] border-[#1c1c1c]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-base font-semibold text-white leading-tight">
                    Mate by Elec-Mate
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-60" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                    </span>
                    <span className="text-[11px] text-green-400 font-medium">
                      Online · usually replies in seconds
                    </span>
                  </div>
                </div>
              </div>

              {/* Big tabular number — the actual hero */}
              <div className="mt-7">
                <SubEyebrow>WhatsApp number</SubEyebrow>
                <div className="mt-2 text-[28px] sm:text-[34px] font-bold font-mono tabular-nums text-white tracking-tight leading-none">
                  {MATE_PHONE_DISPLAY}
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => openExternalUrl(MATE_WHATSAPP_LINK)}
                  className="inline-flex items-center justify-center gap-2 h-12 px-4 rounded-2xl bg-[#25D366] hover:bg-[#1ebe57] active:bg-[#1ba350] text-white font-semibold text-sm touch-manipulation shadow-[0_16px_40px_-18px_rgba(37,211,102,0.55)] transition-all"
                >
                  <MessageCircle className="h-4 w-4" />
                  Open WhatsApp
                  <ExternalLink className="h-3.5 w-3.5 opacity-80" />
                </button>
                <button
                  type="button"
                  onClick={downloadMateVCard}
                  className="inline-flex items-center justify-center gap-2 h-12 px-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] active:scale-[0.99] text-white font-semibold text-sm touch-manipulation transition-all"
                >
                  <ContactRound className="h-4 w-4 text-elec-yellow" />
                  Save to contacts
                </button>
              </div>
            </div>
          </motion.div>

          {/* ─── Connected from ─────────────────────────────────── */}
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.015] px-4 py-3.5"
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                <Phone className="h-4 w-4 text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <SubEyebrow>Connected from</SubEyebrow>
                <div className="text-sm font-mono font-semibold text-white mt-0.5">
                  {maskPhone(userPhone)}
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-green-400">
                Verified
              </span>
            </div>
          </motion.div>

          {/* ─── Prompts grid ───────────────────────────────────── */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center justify-between gap-3 mb-3.5">
              <Eyebrow>Try these</Eyebrow>
              <span className="text-[10px] text-white uppercase tracking-[0.18em]">
                Tap to send
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {PROMPTS.map(({ label, prompt, Icon }) => (
                <a
                  key={label}
                  href={`https://wa.me/${MATE_PHONE_RAW}?text=${encodeURIComponent(prompt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05] active:scale-[0.98] transition-all p-4 text-left touch-manipulation"
                >
                  {/* Subtle hover gradient on top edge */}
                  <span className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/40 to-elec-yellow/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Icon className="h-5 w-5 text-elec-yellow mb-3" />
                  <div className="text-sm font-semibold text-white leading-tight">{label}</div>
                  <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] text-white group-hover:text-elec-yellow transition-colors">
                    Send <ArrowRight className="h-3 w-3" />
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* ─── How to talk to Mate ────────────────────────────── */}
          <motion.div variants={fadeUp}>
            <Eyebrow>How to talk to Mate</Eyebrow>
            <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {SEND_HINTS.map(({ label, hint, Icon }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.015] p-4"
                >
                  <Icon className="h-4 w-4 text-white mb-2.5" />
                  <div className="text-sm font-semibold text-white">{label}</div>
                  <div className="mt-1 text-[12px] text-white leading-snug">{hint}</div>
                </div>
              ))}
            </div>
            <p className="mt-3.5 text-[12px] text-white leading-relaxed">
              Mate forwards email enquiries too — connect Gmail or Outlook in Settings → Integrations.
            </p>
          </motion.div>

          {/* ─── Help footer ────────────────────────────────────── */}
          <motion.a
            variants={fadeUp}
            href="mailto:founder@elec-mate.com?subject=Help%20with%20Mate"
            className="flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-4 hover:bg-white/[0.04] active:scale-[0.99] transition-all touch-manipulation"
          >
            <div className="h-9 w-9 rounded-xl bg-white/[0.04] flex items-center justify-center shrink-0">
              <HelpCircle className="h-4 w-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white">Need a hand?</div>
              <div className="text-xs text-white mt-0.5">
                Email founder@elec-mate.com — real humans, fast replies.
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-white shrink-0" />
          </motion.a>
        </>
      ) : state === 'onboarding' ? (
        /* ── SUBSCRIBED BUT NOT YET ACTIVATED ─────────────────────── */
        <motion.div variants={fadeUp}>
          <Link
            to="/electrician/business-ai"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold text-sm touch-manipulation transition-colors"
          >
            Activate now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      ) : (
        /* ── NOT SUBSCRIBED ───────────────────────────────────────── */
        <motion.div variants={fadeUp}>
          <Link
            to="/subscriptions"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold text-sm touch-manipulation transition-colors"
          >
            Get Mate
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}
