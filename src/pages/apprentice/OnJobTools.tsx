/**
 * On-the-job tools.
 *
 * Rebuilt on the shared hub shell (`@/components/hub/HubPrimitives`), the same
 * one the Business Hub uses, so the two halves of the app look like one product.
 *
 * What changed beyond the shell:
 *
 * - Three tools appeared TWICE. Site assessment was card 03 and card 05,
 *   Flashcards were 02 and 10, Calculators were 01 and 11 — and the number 10
 *   was printed on two different cards. Thirteen card slots held ten tools, so
 *   a third of the page was the same links again under a different heading.
 *   Each tool now appears once, in the group where someone would look for it.
 *
 * - The counts were footnotes. "20+ tools" sat at 11px along the bottom edge
 *   while the card led with a sentence explaining what a calculator is. The
 *   count IS the card, so it now uses `value`/`valueLabel` like every other
 *   hub — the same reasoning as the Business Hub's "£6,027 overdue".
 *
 * - Groups are named for what you are doing, not what the tool is filed under:
 *   "On site", "Look it up", "Practise & people" rather than "Safety &
 *   Compliance", "Guides & Reference", "Practice & Quick Reference". Split
 *   4/3/3 rather than 4/4/2 — the grid is auto-fit, so a two-card group
 *   stretches its cards to twice the width of every other row on a monitor.
 */

import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { itemVariants } from '@/components/college/primitives';
import { type HubTool, type HubQuickAction } from '@/components/hub/HubPrimitives';
import {
  GUIDE_CARD,
  GuideActions,
  GuideIndex,
  GuidePage,
  type GuideLink,
} from '@/components/apprentice/shared/GuideKit';

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
    tip: 'GS38 voltage indicator, per GN3 — prove, test, prove. Never skip the second prove. Your life depends on it.',
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

/** A hub tool card as a guide row: the count rides as a chip beside the title. */
const toLink = (t: HubTool): GuideLink => ({
  id: t.id,
  title: t.title,
  badge: t.value ? `${t.value} ${t.valueLabel ?? ''}`.trim() : undefined,
  description: t.description ?? t.meta,
  meta: t.description ? t.meta : undefined,
  to: t.to,
});

export default function OnJobTools() {
  const navigate = useNavigate();

  const todaysTip = useMemo(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );
    return DAILY_TIPS[dayOfYear % DAILY_TIPS.length];
  }, []);

  // The three things someone opens this page on a van seat to actually start.
  const quickStart: HubQuickAction[] = [
    {
      title: 'Work a calculation',
      description: 'Cable size, volt drop, max demand',
      primary: true,
      onClick: () => navigate('/apprentice/on-job-tools/calculations'),
    },
    {
      title: 'Check the site first',
      description: 'Pre-job safety and condition checks',
      onClick: () => navigate('/apprentice/on-job-tools/assessment'),
    },
    {
      title: 'Test yourself',
      description: 'Flashcards for regs, colours and codes',
      onClick: () => navigate('/apprentice/on-job-tools/flashcards'),
    },
  ];

  const onSite: HubTool[] = [
    {
      id: 'calculations',
      title: 'On-site calculators',
      value: '20+',
      valueLabel: 'calculators',
      meta: 'Cable sizing, volt drop, max demand, device selection',
      to: '/apprentice/on-job-tools/calculations',
    },
    {
      id: 'assessment',
      eyebrow: 'Before you start',
      title: 'Site assessment',
      value: '15+',
      valueLabel: 'checklists',
      meta: 'Safety checks, site condition, risk analysis',
      to: '/apprentice/on-job-tools/assessment',
    },
    {
      id: 'safety-cases',
      title: 'Safety case studies',
      description: 'Real incidents — make the call, then see what happened.',
      meta: 'Interactive',
      to: '/apprentice/on-job-tools/safety-cases',
    },
    {
      id: 'bs7671-runthrough',
      eyebrow: 'BS 7671',
      title: 'Inspection & testing run-through',
      description: 'The full A4:2026 procedure, step by step, with the paperwork.',
      meta: 'Full guide',
      to: '/apprentice/on-job-tools/bs7671-runthrough',
    },
    {
      /*
       * This route existed but nothing on this hub linked to it — the four
       * core dead tests were reachable only by a winding path through the
       * inspection-testing pages, which is the last place someone stood at a
       * board would look.
       */
      id: 'testing-procedures',
      eyebrow: 'Step by step',
      title: 'Testing procedures',
      value: '4',
      valueLabel: 'core tests',
      // Not "dead tests" — Zs is measured live, and the page itself says so.
      meta: 'R₁+R₂, insulation resistance, Zs and polarity',
      to: '/apprentice/on-job-tools/testing-procedures',
    },
  ];

  const lookItUp: HubTool[] = [
    {
      id: 'symbols',
      title: 'Electrical symbols chart',
      description: 'Every circuit and installation symbol, for drawings and coursework.',
      meta: 'IEC 60617',
      to: '/guides/electrical-symbols-chart',
    },
    {
      id: 'installation-guides',
      title: 'Installation guides',
      value: '4',
      valueLabel: 'sectors',
      meta: 'Domestic, commercial, industrial and outdoor',
      to: '/apprentice/on-job-tools/electrical-installation-guides',
    },
    {
      id: 'tools-guide',
      title: 'Tools & materials guide',
      description: 'Hand tools through to test equipment, with UK supplier picks.',
      meta: 'Essential kit',
      to: '/apprentice/on-job-tools/tools-guide',
    },
  ];

  const practise: HubTool[] = [
    {
      id: 'flashcards',
      title: 'Flashcards',
      value: '100+',
      valueLabel: 'cards',
      meta: 'Cable colours, regs, EICR codes, safe isolation, fault finding',
      to: '/apprentice/on-job-tools/flashcards',
    },
    {
      id: 'workplace-culture',
      eyebrow: 'People skills',
      title: 'Workplace culture',
      value: '6',
      valueLabel: 'modules',
      meta: 'Site comms, trade culture, regional terms, relationships',
      to: '/apprentice/on-job-tools/workplace-culture',
    },
    {
      id: 'supervisor-knowledge',
      eyebrow: 'Ask a supervisor',
      title: 'The questions you’d rather not ask',
      description: 'Common site questions, when to get help, and how to ask well.',
      meta: 'Question bank',
      to: '/apprentice/on-job-tools/supervisor-knowledge',
    },
  ];

  return (
    <GuidePage
      section="Apprentice · On-the-job tools"
      area="On-the-job tools"
      title="Everything you need on site"
      backTo="/apprentice"
    >
      <GuideActions items={quickStart} />

      {/* Tip of the day — the one editorial note on the page. Neutral
          surface: a translucent volt fill goes muddy brown on this ground. */}
      <motion.div variants={itemVariants} className={GUIDE_CARD}>
        <p className="mb-1.5 text-[13px] font-semibold text-elec-yellow">
          Tip · {todaysTip.category}
        </p>
        <p className="max-w-3xl text-[14.5px] leading-relaxed text-white">{todaysTip.tip}</p>
      </motion.div>

      <GuideIndex title="On site" items={onSite.map(toLink)} columns={3} />

      <GuideIndex title="Look it up" items={lookItUp.map(toLink)} columns={3} />

      <GuideIndex title="Practise & people" items={practise.map(toLink)} columns={3} />

      {/* The one thing worth saying twice, kept to the end so it is the last
          thing read rather than a wall between the tools. */}
      <motion.div variants={itemVariants} className={GUIDE_CARD}>
        <p className="mb-1.5 text-[13px] font-semibold text-elec-yellow">Safety · Stop and ask</p>
        <p className="max-w-3xl text-[14.5px] leading-relaxed text-white">
          These tools help you prepare properly — they don’t replace training or supervision. When
          in doubt, stop and ask. No one ever got sacked for checking.
        </p>
      </motion.div>
    </GuidePage>
  );
}
