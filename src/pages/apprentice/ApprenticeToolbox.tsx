import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ActiveToolContent from '@/components/apprentice/toolbox/ActiveToolContent';
import useSEO from '@/hooks/useSEO';
import { cn } from '@/lib/utils';
import {
  PageFrame,
  PageHero,
  SectionHeader,
  HubGrid,
  HubCard,
  Pill,
  itemVariants,
  type Tone,
} from '@/components/college/primitives';

interface ToolboxItem {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  link?: string;
  category: 'essential' | 'skills' | 'wellbeing';
  badge?: string;
  tone: Tone;
}

const TOOLBOX_ITEMS: ToolboxItem[] = [
  {
    id: 'apprenticeship-expectations',
    number: '01',
    eyebrow: 'Start here',
    title: 'Apprenticeship expectations',
    description:
      'What to expect during your electrical apprenticeship — roles, responsibilities and milestones.',
    link: '/apprentice/toolbox/apprenticeship-expectations',
    category: 'essential',
    badge: 'Start here',
    tone: 'yellow',
  },
  {
    id: 'off-job-training',
    number: '02',
    eyebrow: 'OTJ',
    title: 'Off-the-job training',
    description: 'Your 20% off-the-job training requirements and what counts toward them.',
    link: '/apprentice/toolbox/off-job-training-guide',
    category: 'essential',
    tone: 'blue',
  },
  {
    id: 'apprenticeship-funding',
    number: '03',
    eyebrow: 'Funding',
    title: 'Apprenticeship funding',
    description:
      'How apprenticeship funding works — levy, co-investment and CITB grants explained.',
    link: '/apprentice/toolbox/apprenticeship-funding',
    category: 'essential',
    badge: '2026 updated',
    tone: 'emerald',
  },
  {
    id: 'end-point-assessment',
    number: '04',
    eyebrow: 'EPA',
    title: 'End-point assessment',
    description: 'Components, grades and preparation tips for your final apprenticeship test.',
    link: '/apprentice/toolbox/end-point-assessment',
    category: 'essential',
    tone: 'purple',
  },
  {
    id: 'rights-and-pay',
    number: '05',
    eyebrow: 'Rights',
    title: 'Apprentice rights & pay',
    description: 'National wage tiers, your rights on site, and support when things go wrong.',
    link: '/apprentice/rights-and-pay',
    category: 'essential',
    badge: 'April 2026',
    tone: 'amber',
  },
  {
    id: 'site-jargon',
    number: '06',
    eyebrow: 'Language',
    title: 'Site jargon & terminology',
    description: 'Common electrical and construction terms — don\'t get caught out on day one.',
    link: '/apprentice/toolbox/site-jargon',
    category: 'skills',
    tone: 'cyan',
  },
  {
    id: 'portfolio-building',
    number: '07',
    eyebrow: 'Evidence',
    title: 'Portfolio building',
    description: 'How to document your work and build a professional portfolio for EPA.',
    link: '/apprentice/toolbox/portfolio-building',
    category: 'skills',
    tone: 'indigo',
  },
  {
    id: 'communication-skills',
    number: '08',
    eyebrow: 'Comms',
    title: 'Communication skills',
    description:
      'How to speak with supervisors, report problems, and take feedback professionally.',
    link: '/apprentice/toolbox/communication-skills',
    category: 'skills',
    tone: 'blue',
  },
  {
    id: 'study-tips',
    number: '09',
    eyebrow: 'Learning',
    title: 'Study tips & techniques',
    description: 'Effective learning strategies for electrical theory and practical skills.',
    link: '/apprentice/toolbox/study-tips',
    category: 'skills',
    tone: 'emerald',
  },
  {
    id: 'learning-from-mistakes',
    number: '10',
    eyebrow: 'Resilience',
    title: 'Learning from mistakes',
    description: 'Handle errors professionally and turn them into learning opportunities.',
    link: '/apprentice/toolbox/learning-from-mistakes',
    category: 'wellbeing',
    tone: 'orange',
  },
  {
    id: 'time-management',
    number: '11',
    eyebrow: 'Balance',
    title: 'Time management & balance',
    description: 'Manage your apprenticeship workload while keeping a healthy work-life balance.',
    link: '/apprentice/toolbox/time-management',
    category: 'wellbeing',
    tone: 'purple',
  },
];

const CATEGORIES: Array<{ id: 'essential' | 'skills' | 'wellbeing'; eyebrow: string; title: string }> = [
  { id: 'essential', eyebrow: 'Essential', title: 'Foundation knowledge' },
  { id: 'skills', eyebrow: 'Skills', title: 'Skills development' },
  { id: 'wellbeing', eyebrow: 'Wellbeing', title: 'Wellbeing & growth' },
];

const QUICK_STATS = [
  { number: '01', label: 'Topics', value: '11' },
  { number: '02', label: 'Duration', value: '3–4 yrs' },
  { number: '03', label: 'Off-job', value: '20%' },
  { number: '04', label: 'Final', value: 'Level 3' },
];

export default function ApprenticeToolbox() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTool = searchParams.get('tool') || null;
  const setActiveTool = (tool: string | null) => {
    if (tool) setSearchParams({ tool }, { replace: false });
    else {
      searchParams.delete('tool');
      setSearchParams(searchParams, { replace: false });
    }
  };

  useSEO({
    title: 'Apprentice Guidance Area | Elec-Mate',
    description:
      'Essential resources, skills development, and support for UK electrical apprentices. 11 guidance topics covering funding, EPA, rights, and more.',
  });

  if (activeTool) {
    return <ActiveToolContent activeTool={activeTool} onClose={() => setActiveTool(null)} />;
  }

  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={() => navigate('/apprentice')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Guidance Area"
          title="The whole job, demystified"
          description="Essential resources, skills development and support for UK electrical apprentices — eleven topics, from funding to EPA to your rights on site."
          tone="yellow"
        />
      </motion.div>

      {/* QUICK STATS — yellow editorial strip */}
      <motion.div variants={itemVariants}>
        <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.08] rounded-2xl overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/50 to-elec-yellow/0 pointer-events-none z-10" />
          {QUICK_STATS.map((s) => (
            <div
              key={s.number}
              className={cn(
                'bg-[hsl(0_0%_10%)] px-5 py-6 sm:px-7 sm:py-8 flex flex-col text-left'
              )}
            >
              <div className="flex items-baseline gap-2 whitespace-nowrap">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">
                  {s.number}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 truncate">
                  · {s.label}
                </span>
              </div>
              <span className="mt-3 sm:mt-4 font-semibold tabular-nums tracking-tight leading-none text-white text-3xl sm:text-4xl lg:text-5xl">
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CATEGORY SECTIONS */}
      {CATEGORIES.map((cat) => {
        const items = TOOLBOX_ITEMS.filter((i) => i.category === cat.id);
        if (items.length === 0) return null;
        return (
          <motion.section
            key={cat.id}
            variants={itemVariants}
            className="space-y-5 sm:space-y-6"
          >
            <SectionHeader eyebrow={cat.eyebrow} title={cat.title} />
            <HubGrid columns={cat.id === 'wellbeing' ? 2 : 3}>
              {items.map((item) => (
                <HubCard
                  key={item.id}
                  size="sm"
                  number={item.number}
                  eyebrow={item.eyebrow}
                  title={item.title}
                  description={item.description}
                  meta={item.badge}
                  tone={item.tone}
                  badge={item.badge ? <Pill tone={item.tone}>{item.badge}</Pill> : undefined}
                  onClick={() => item.link && navigate(item.link)}
                />
              ))}
            </HubGrid>
          </motion.section>
        );
      })}

      {/* RELATED HUBS */}
      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <SectionHeader eyebrow="Need More" title="Related hubs" />
        <HubGrid columns={2}>
          <HubCard
            number="12"
            eyebrow="Wellbeing"
            title="Mental health support"
            description="Resources, crisis support and wellbeing tools for apprentices."
            meta="Open hub"
            tone="cyan"
            onClick={() => navigate('/apprentice/mental-health')}
          />
          <HubCard
            number="13"
            eyebrow="Career"
            title="Career pathways"
            description="Career pathways, certifications and professional development."
            meta="Open hub"
            tone="emerald"
            onClick={() => navigate('/apprentice/professional-development')}
          />
        </HubGrid>
      </motion.section>
    </PageFrame>
  );
}
