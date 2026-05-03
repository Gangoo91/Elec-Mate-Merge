import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OJTRatioCard from '@/components/apprentice/OJTRatioCard';
import StudyProgressCard from '@/components/apprentice/StudyProgressCard';
import { useApprenticeData } from '@/hooks/useApprenticeData';
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

const QUICK_ACCESS: Array<{
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  tone: Tone;
}> = [
  {
    number: '01',
    eyebrow: 'AI tutor',
    title: 'Advanced help',
    description: 'AI-powered assistance, exam prep and on-demand expert guidance.',
    href: '/apprentice/advanced-help',
    tone: 'yellow',
  },
  {
    number: '02',
    eyebrow: 'Reference',
    title: 'Professional toolbox',
    description: 'Guides, expectations, EPA prep, rights and pay — the whole job demystified.',
    href: '/apprentice/toolbox',
    tone: 'blue',
  },
  {
    number: '03',
    eyebrow: 'Logbook',
    title: 'Site diary',
    description: 'Log daily site activities, hours and reflections towards your portfolio.',
    href: '/apprentice/site-diary',
    tone: 'amber',
  },
  {
    number: '04',
    eyebrow: 'Career',
    title: 'Career development',
    description: 'Pathways, certifications and the CPD that moves your earning ceiling.',
    href: '/apprentice/professional-development',
    tone: 'emerald',
  },
  {
    number: '05',
    eyebrow: 'Network',
    title: 'Community chat',
    description: 'Talk to other apprentices and qualified electricians in moderated channels.',
    href: '/apprentice/chat',
    tone: 'purple',
  },
  {
    number: '06',
    eyebrow: 'Evidence',
    title: 'Portfolio & OJT',
    description: 'Build your apprenticeship portfolio and track your 20% off-the-job training.',
    href: '/apprentice/hub',
    tone: 'cyan',
  },
];

export default function ApprenticeIndex() {
  const navigate = useNavigate();
  const { user, isLoading } = useApprenticeData();
  const greeting = isLoading ? 'Welcome to Elec-Mate' : `Welcome back, ${user.firstName}`;

  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Dashboard
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Welcome"
          title={greeting}
          description="Your apprenticeship companion — purpose-built for UK electrical apprentices. Pick a card below to start, or jump back into where you left off."
          tone="yellow"
        />
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <SectionHeader eyebrow="Track" title="This week" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <StudyProgressCard />
          <OJTRatioCard />
        </div>
      </motion.section>

      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <SectionHeader eyebrow="Quick access" title="Six places to go" />
        <HubGrid columns={3}>
          {QUICK_ACCESS.map((item) => (
            <HubCard
              key={item.href}
              size="sm"
              number={item.number}
              eyebrow={item.eyebrow}
              title={item.title}
              description={item.description}
              tone={item.tone}
              badge={
                item.title === 'Advanced help' ? <Pill tone="yellow">AI</Pill> : undefined
              }
              onClick={() => navigate(item.href)}
            />
          ))}
        </HubGrid>
      </motion.section>
    </PageFrame>
  );
}
