import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import {
  PageFrame,
  PageHero,
  SectionHeader,
  HubGrid,
  HubCard,
  itemVariants,
  type Tone,
} from '@/components/college/primitives';

interface ToolDef {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  meta: string;
  link: string;
  tone: Tone;
}

const QUICK_ACCESS: ToolDef[] = [
  {
    number: '01',
    eyebrow: 'Calculations',
    title: 'On-site calculators',
    description: 'Cable sizing, voltage drop, max demand and protective device selection.',
    meta: '20+ tools',
    link: '/apprentice/on-job-tools/calculations',
    tone: 'emerald',
  },
  {
    number: '02',
    eyebrow: 'Revision',
    title: 'Flashcards',
    description: 'Cable colours, BS 7671 regs, EICR codes, safe isolation and fault finding.',
    meta: '100+ cards',
    link: '/apprentice/on-job-tools/flashcards',
    tone: 'amber',
  },
  {
    number: '03',
    eyebrow: 'Pre-job',
    title: 'Site assessment',
    description: 'Pre-job safety checklists, site condition assessments and risk analysis.',
    meta: '15+ checklists',
    link: '/apprentice/on-job-tools/assessment',
    tone: 'blue',
  },
];

const SAFETY: ToolDef[] = [
  {
    number: '04',
    eyebrow: 'Interactive',
    title: 'Safety case studies',
    description:
      'Learn from real electrical incidents — make decisions in realistic scenarios and see consequences.',
    meta: 'Interactive',
    link: '/apprentice/on-job-tools/safety-cases',
    tone: 'red',
  },
  {
    number: '05',
    eyebrow: 'Pre-job',
    title: 'Site assessment',
    description: 'Pre-job safety checklists, condition assessments, risk analysis templates.',
    meta: '15+ checklists',
    link: '/apprentice/on-job-tools/assessment',
    tone: 'emerald',
  },
  {
    number: '06',
    eyebrow: 'BS 7671',
    title: 'Inspection & testing run-through',
    description: 'Complete A4:2026 inspection & testing procedures with step-by-step documentation.',
    meta: 'Full guide',
    link: '/apprentice/on-job-tools/bs7671-runthrough',
    tone: 'yellow',
  },
];

const GUIDES: ToolDef[] = [
  {
    number: '07',
    eyebrow: 'Reference',
    title: 'Tools & materials guide',
    description:
      'Professional electrician tools — hand tools to test equipment, with UK supplier picks.',
    meta: 'Essential',
    link: '/apprentice/on-job-tools/tools-guide',
    tone: 'yellow',
  },
  {
    number: '08',
    eyebrow: 'Step-by-step',
    title: 'Installation guides',
    description:
      'Domestic, commercial, industrial and outdoor installations with BS 7671 compliance.',
    meta: '4 sectors',
    link: '/apprentice/on-job-tools/electrical-installation-guides',
    tone: 'blue',
  },
  {
    number: '09',
    eyebrow: 'FAQ',
    title: 'Ask a supervisor',
    description:
      'Knowledge bank of common site questions, when to ask for help, and professional comms tips.',
    meta: 'Question bank',
    link: '/apprentice/on-job-tools/supervisor-knowledge',
    tone: 'purple',
  },
];

const PRACTICE: ToolDef[] = [
  {
    number: '10',
    eyebrow: 'Quick recall',
    title: 'Flashcards',
    description: 'Cable colours, BS 7671 regs, EICR codes, safe isolation and fault finding.',
    meta: '100+ cards',
    link: '/apprentice/on-job-tools/flashcards',
    tone: 'amber',
  },
  {
    number: '11',
    eyebrow: 'On-site',
    title: 'Calculators',
    description: 'Cable sizing, voltage drop, max demand and protective device selection.',
    meta: '20+ tools',
    link: '/apprentice/on-job-tools/calculations',
    tone: 'emerald',
  },
  {
    number: '12',
    eyebrow: 'People skills',
    title: 'Workplace culture',
    description:
      'Site comms, UK trade culture, regional terminology and professional relationships.',
    meta: '6 modules',
    link: '/apprentice/on-job-tools/workplace-culture',
    tone: 'cyan',
  },
];

const DAILY_TIPS = [
  {
    tip: 'Always prove dead with a voltage indicator, not a multimeter alone. A multimeter can give false readings on inductively coupled circuits.',
    category: 'Safe isolation',
  },
  {
    tip: 'Label every circuit as you go — future you (and the next sparky) will thank you. It’s a BS 7671 requirement too.',
    category: 'Best practice',
  },
  {
    tip: 'Before drilling into any wall, use a cable detector AND check the other side. Services can run in unexpected places.',
    category: 'Site safety',
  },
  {
    tip: 'Take a photo of the distribution board before you start any work. It’s your evidence if anything is disputed later.',
    category: 'Documentation',
  },
  {
    tip: 'GN3 voltage indicator — prove, test, prove. Never skip the second prove. Your life depends on it.',
    category: 'Safe isolation',
  },
  {
    tip: 'Ring circuit continuity: R1+R2 at each point should be roughly equal. If one spikes, you’ve found a break or spur.',
    category: 'Testing',
  },
  {
    tip: 'On site, if you’re not sure — stop and ask. No one ever got sacked for checking, but plenty have been hurt for guessing.',
    category: 'Professionalism',
  },
];

export default function OnJobTools() {
  const navigate = useNavigate();
  const todaysTip = useMemo(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );
    return DAILY_TIPS[dayOfYear % DAILY_TIPS.length];
  }, []);

  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button onClick={() => navigate('/apprentice')} className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation">
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · On-the-job tools"
          title="Everything you need on site"
          description="Safety checklists, quick-reference guides and on-site calculators. Built by electricians, for apprentices."
          tone="yellow"
        />
      </motion.div>

      {/* TIP OF THE DAY — editorial alert card, no icon */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-elec-yellow/20 bg-gradient-to-br from-elec-yellow/[0.06] via-amber-500/[0.02] to-transparent px-5 py-4 sm:px-6 sm:py-5"
      >
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">
            Tip
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            · {todaysTip.category}
          </span>
        </div>
        <p className="text-[13px] leading-relaxed text-white/80 max-w-3xl">{todaysTip.tip}</p>
      </motion.div>

      {/* QUICK ACCESS */}
      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <SectionHeader eyebrow="Quick Access" title="Most-used tools" />
        <HubGrid columns={3}>
          {QUICK_ACCESS.map((t) => (
            <HubCard
              key={t.link + t.number}
              size="sm"
              number={t.number}
              eyebrow={t.eyebrow}
              title={t.title}
              description={t.description}
              meta={t.meta}
              tone={t.tone}
              onClick={() => navigate(t.link)}
            />
          ))}
        </HubGrid>
      </motion.section>

      {/* SAFETY BANNER — calmer editorial note */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] px-5 py-4 sm:px-6 sm:py-5"
      >
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber-300/85 tabular-nums">
            Safety
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            · Stop and ask
          </span>
        </div>
        <p className="text-[13px] leading-relaxed text-white/80 max-w-3xl">
          These tools help you prepare properly — they don't replace training or supervision. When
          in doubt, stop and ask. No one ever got sacked for checking.
        </p>
      </motion.div>

      {/* SAFETY & COMPLIANCE */}
      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <SectionHeader eyebrow="Safety & Compliance" title="Stay safe, stay legal" />
        <HubGrid columns={3}>
          {SAFETY.map((t) => (
            <HubCard
              key={t.link + t.number}
              size="sm"
              number={t.number}
              eyebrow={t.eyebrow}
              title={t.title}
              description={t.description}
              meta={t.meta}
              tone={t.tone}
              onClick={() => navigate(t.link)}
            />
          ))}
        </HubGrid>
      </motion.section>

      {/* GUIDES & REFERENCE */}
      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <SectionHeader eyebrow="Guides & Reference" title="Look it up" />
        <HubGrid columns={3}>
          {GUIDES.map((t) => (
            <HubCard
              key={t.link + t.number}
              size="sm"
              number={t.number}
              eyebrow={t.eyebrow}
              title={t.title}
              description={t.description}
              meta={t.meta}
              tone={t.tone}
              onClick={() => navigate(t.link)}
            />
          ))}
        </HubGrid>
      </motion.section>

      {/* PRACTICE & QUICK REF */}
      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <SectionHeader eyebrow="Practice & Quick Reference" title="Sharpen the basics" />
        <HubGrid columns={3}>
          {PRACTICE.map((t) => (
            <HubCard
              key={t.link + t.number}
              size="sm"
              number={t.number}
              eyebrow={t.eyebrow}
              title={t.title}
              description={t.description}
              meta={t.meta}
              tone={t.tone}
              onClick={() => navigate(t.link)}
            />
          ))}
        </HubGrid>
      </motion.section>
    </PageFrame>
  );
}
