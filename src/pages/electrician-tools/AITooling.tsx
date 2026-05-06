/**
 * AITooling — editorial AI tools hub.
 *
 * Replaces the BusinessCard multi-colour grid (blue / orange / emerald /
 * cyan / pink chrome) with the College Hub editorial cadence:
 *  • Hero with "Power up." headline + tech sub-line
 *  • Numbered eyebrows (01 · FEATURED, 02 · VISUAL, 03 · TEXT)
 *  • Uniform gradient-surface cards with elec-yellow accent
 *  • Capability strip — speed, citation depth, currency
 *  • Tool cards have a numbered tabular index, a single icon glyph, type-led
 *    title + description, and an "Open →" tail. No flood-fill chrome.
 */

import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

interface Tool {
  number: string;
  title: string;
  description: string;
  href: string;
  primary?: boolean;
}

const FEATURED: Tool[] = [
  {
    number: '01',
    title: 'Quick Capture',
    description: 'Photograph any component. Get specs, BS 7671 cites, install steps in seconds.',
    href: '/electrician-tools/ai-tooling/component-identify',
    primary: true,
  },
  {
    number: '02',
    title: 'Fault Diagnosis',
    description: 'Trace symptoms to root cause. EICR codes, fixes and risk grades on the spot.',
    href: '/electrician-tools/ai-tooling/fault-diagnosis',
    primary: true,
  },
];

const VISUAL: Tool[] = [
  {
    number: '03',
    title: 'Component ID',
    description: 'Identify components, specs and the BS 7671 regs that apply.',
    href: '/electrician-tools/ai-tooling/component-identify',
  },
  {
    number: '04',
    title: 'Wiring Guide',
    description: 'Step-by-step UK wiring instructions, scheme-by-scheme.',
    href: '/electrician-tools/ai-tooling/wiring-instruction',
  },
  {
    number: '05',
    title: 'Install Verify',
    description: 'BS 7671 compliance — pass / fail with cited regulations.',
    href: '/electrician-tools/ai-tooling/installation-verify',
  },
];

const TEXT: Tool[] = [
  {
    number: '06',
    title: 'Client Explainer',
    description: 'Translate technical findings into plain English clients understand.',
    href: '/electrician-tools/ai-tooling/explainer',
  },
];

const AITooling = () => {
  const navigate = useNavigate();

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-elec-dark min-h-screen pb-24">
      {/* Sticky header */}
      <div className="sticky top-0 z-40 bg-elec-dark/95 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <button
              type="button"
              onClick={() => navigate('/electrician')}
              aria-label="Back"
              className="text-white/85 hover:text-white border border-white/15 hover:border-white/30 rounded-full h-9 w-9 inline-flex items-center justify-center touch-manipulation transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex items-baseline gap-2">
              <Eyebrow>AI TOOLING</Eyebrow>
              <span className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
                · BS 7671 cited · Streaming
              </span>
            </div>
          </div>
        </div>
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="px-4 sm:px-6 pt-6 sm:pt-10 pb-6 space-y-8 sm:space-y-10 max-w-5xl mx-auto"
      >
        {/* Hero */}
        <motion.section variants={itemVariants} className="space-y-3">
          <Eyebrow>WHAT IT DOES</Eyebrow>
          <h1 className="text-[34px] sm:text-[44px] lg:text-[54px] font-semibold tracking-tight leading-[1.05]">
            <span className="text-elec-yellow">Power</span>{' '}
            <span className="text-white">up the work.</span>
          </h1>
          <p className="text-[14px] sm:text-[15px] leading-relaxed text-white/85 max-w-3xl">
            Six tools for the day-to-day. Component ID, fault diagnosis, wiring guides, install
            verification, plain-English client comms — every answer cited to BS 7671 A4:2026, every
            response streamed in under five seconds.
          </p>
        </motion.section>

        {/* Capability strip */}
        <motion.section
          variants={itemVariants}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          <CapabilityCell label="Speed" value="< 5s" sub="Streamed answer" accent />
          <CapabilityCell label="Grounded" value="BS 7671 cited" sub="Every claim referenced" />
          <CapabilityCell label="Cited" value="A4:2026" sub="Latest amendment" />
          <CapabilityCell label="Tip" value="Bright + flat" sub="Best capture light" />
        </motion.section>

        {/* 01 · Featured */}
        <motion.section variants={itemVariants} className="space-y-4">
          <Eyebrow>01 · FEATURED</Eyebrow>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 sm:auto-rows-fr">
            {FEATURED.map((tool, idx) => (
              <ToolCard key={tool.title} tool={tool} index={idx} />
            ))}
          </div>
        </motion.section>

        {/* 02 · Visual */}
        <motion.section variants={itemVariants} className="space-y-4">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <Eyebrow>02 · VISUAL ANALYSIS</Eyebrow>
            <span className="text-[10.5px] tabular-nums text-white/65">
              Photo-led · Camera or upload
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 sm:auto-rows-fr">
            {VISUAL.map((tool, idx) => (
              <ToolCard key={tool.title} tool={tool} index={idx + FEATURED.length} />
            ))}
          </div>
        </motion.section>

        {/* 03 · Text */}
        <motion.section variants={itemVariants} className="space-y-4">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <Eyebrow>03 · TEXT AI</Eyebrow>
            <span className="text-[10.5px] tabular-nums text-white/65">
              Conversational · Streamed
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 sm:auto-rows-fr">
            {TEXT.map((tool, idx) => (
              <ToolCard
                key={tool.title}
                tool={tool}
                index={idx + FEATURED.length + VISUAL.length}
              />
            ))}
          </div>
        </motion.section>

        {/* Footer note */}
        <motion.p
          variants={itemVariants}
          className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65 text-center pt-4"
        >
          Every answer cited to BS 7671:2018+A4:2026 · No hallucinations · No invented regs
        </motion.p>
      </motion.main>
    </div>
  );
};

const ToolCard = ({ tool, index }: { tool: Tool; index: number }) => {
  const navigate = useNavigate();

  return (
    <motion.button
      type="button"
      onClick={() => navigate(tool.href)}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'text-left group rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] hover:border-elec-yellow/40 active:bg-white/[0.04] transition-colors p-5 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] touch-manipulation flex flex-col h-full',
        tool.primary && 'min-h-[180px] sm:min-h-[200px]'
      )}
    >
      {/* Top row — index + open caret */}
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-elec-yellow">
          {tool.number}
        </span>
        <span className="text-[10.5px] uppercase tracking-[0.14em] font-semibold text-white/65 group-hover:text-elec-yellow transition-colors">
          Open →
        </span>
      </div>

      {/* Title + body */}
      <h3
        className={cn(
          'mt-4 font-semibold tracking-tight text-white leading-tight',
          tool.primary ? 'text-[22px] sm:text-[26px]' : 'text-[17px] sm:text-[18px]'
        )}
      >
        {tool.title}
      </h3>
      <p
        className={cn(
          'mt-1.5 leading-relaxed text-white/85',
          tool.primary ? 'text-[13px] sm:text-[13.5px] max-w-md' : 'text-[12.5px]'
        )}
      >
        {tool.description}
      </p>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
        <span className="text-[10px] uppercase tracking-[0.14em] font-semibold text-white/65 tabular-nums">
          {tool.primary ? 'FEATURED' : 'TOOL'} · {String(index + 1).padStart(2, '0')}
        </span>
        <span className="inline-flex items-center text-[10.5px] uppercase tracking-[0.14em] font-semibold text-elec-yellow group-hover:text-elec-yellow/80">
          Launch →
        </span>
      </div>
    </motion.button>
  );
};

const CapabilityCell = ({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}) => (
  <div className="rounded-2xl bg-[linear-gradient(180deg,hsl(0_0%_13%)_0%,hsl(0_0%_10%)_100%)] border border-white/[0.10] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] p-4">
    <span className="text-[9.5px] uppercase tracking-[0.14em] font-semibold text-white/65">
      {label}
    </span>
    <div
      className={cn(
        'mt-1.5 text-[15px] sm:text-[16px] font-semibold tabular-nums leading-tight',
        accent ? 'text-emerald-300' : 'text-white'
      )}
    >
      {value}
    </div>
    <p className="mt-0.5 text-[10.5px] text-white/65">{sub}</p>
  </div>
);

export default AITooling;
