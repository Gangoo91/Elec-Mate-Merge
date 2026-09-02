import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ActiveToolContent from '@/components/apprentice/toolbox/ActiveToolContent';
import useSEO from '@/hooks/useSEO';
import { cn } from '@/lib/utils';
import { CARD_BASE, CARD_NEUTRAL } from '@/components/ui/card-recipe';
import { HubKpi, HubKpiRow, HubToolGrid, HubSectionHeading } from '@/components/hub/HubPrimitives';
import { itemVariants, type Tone } from '@/components/college/primitives';
import { HubSubPage } from '@/components/hub/HubSubPage';

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
    description:
      'Your fixed off-the-job training hours (1,066h for Installation & Maintenance Electricians) and what counts toward them.',
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
    description:
      'National wage tiers (£8.00/hr apprentice minimum from April 2026), your rights on site, and support when things go wrong.',
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
    description: "Common electrical and construction terms — don't get caught out on day one.",
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

const CATEGORIES: Array<{
  id: 'essential' | 'skills' | 'wellbeing';
  eyebrow: string;
  title: string;
}> = [
  { id: 'essential', eyebrow: 'Essential', title: 'Foundation knowledge' },
  { id: 'skills', eyebrow: 'Skills', title: 'Skills development' },
  { id: 'wellbeing', eyebrow: 'Wellbeing', title: 'Wellbeing & growth' },
];

const QUICK_STATS = [
  { label: 'Topics', value: '11' },
  { label: 'Duration', value: '3–4 yrs' },
  { label: 'Off-job (L3)', value: '1,066h' },
  { label: 'Final', value: 'Level 3' },
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
    <HubSubPage
      title="The whole job, demystified"
      backTo="/apprentice"
      description="Essential resources, skills development and support for UK electrical apprentices — eleven topics, from funding to EPA to your rights on site."
    >
      <motion.div variants={itemVariants}>
        <HubKpiRow>
          {QUICK_STATS.map((s, i) => (
            <HubKpi key={s.label} label={s.label} value={s.value} accent={i === 0} />
          ))}
        </HubKpiRow>
      </motion.div>

      {/* CATEGORY SECTIONS */}
      {CATEGORIES.map((cat) => {
        const items = TOOLBOX_ITEMS.filter((i) => i.category === cat.id);
        if (items.length === 0) return null;
        return (
          <motion.section key={cat.id} variants={itemVariants} className="space-y-5 sm:space-y-6">
            <HubSectionHeading>{cat.title}</HubSectionHeading>
            <HubToolGrid
              label=""
              columns={cat.id === 'wellbeing' ? 'two' : 'three'}
              cards={items.map((item) => ({
                id: item.id,
                eyebrow: item.eyebrow,
                title: item.title,
                description: item.description,
                meta: item.badge,
                onClick: () => item.link && navigate(item.link),
              }))}
            />
          </motion.section>
        );
      })}

      {/* RELATED HUBS */}
      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <HubSectionHeading>Related hubs</HubSectionHeading>
        <HubToolGrid
          label=""
          columns="two"
          cards={[
            {
              id: 'mental-health',
              eyebrow: 'Wellbeing',
              title: 'Mental health support',
              description: 'Resources, crisis support and wellbeing tools for apprentices.',
              meta: 'Open hub',
              onClick: () => navigate('/apprentice/mental-health'),
            },
            {
              id: 'career-pathways',
              eyebrow: 'Career',
              title: 'Career pathways',
              description: 'Career pathways, certifications and professional development.',
              meta: 'Open hub',
              onClick: () => navigate('/apprentice/professional-development'),
            },
          ]}
        />
      </motion.section>

      {/* CRISIS / WELLBEING — one-tap helplines */}
      <motion.section variants={itemVariants} className="space-y-3 sm:space-y-4">
        <HubSectionHeading>Need to talk now?</HubSectionHeading>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <a
            href="tel:116123"
            className={cn(CARD_BASE, CARD_NEUTRAL, 'min-h-11 gap-1 px-4 py-3.5 sm:p-5')}
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-elec-yellow">
              Samaritans · free, 24/7
            </span>
            <span className="text-lg font-semibold tabular-nums tracking-tight text-white">
              116 123
            </span>
          </a>
          <a
            href="tel:03456051956"
            className={cn(CARD_BASE, CARD_NEUTRAL, 'min-h-11 gap-1 px-4 py-3.5 sm:p-5')}
          >
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-elec-yellow">
              Lighthouse · construction industry
            </span>
            <span className="text-lg font-semibold tabular-nums tracking-tight text-white">
              0345 605 1956
            </span>
          </a>
        </div>
      </motion.section>
    </HubSubPage>
  );
}
