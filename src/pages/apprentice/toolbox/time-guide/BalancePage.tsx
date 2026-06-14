import { ArrowLeft } from 'lucide-react';
import WorkLifeBalanceTab from '@/components/apprentice/time-management/WorkLifeBalanceTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';
import GuideIntro from './GuideIntro';

const BalancePage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/toolbox/time-management')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero eyebrow="Apprentice · Time" title="Work-Life Balance" tone="yellow" />
      </motion.div>

      <motion.div variants={itemVariants}>
        <GuideIntro
          eyebrow="Apprentice · Time"
          title="Balancing work, study, and life"
          blurb="Your apprenticeship is a 4-year commitment, and you cannot sustain it if you burn out. Finding the right balance between work demands, study obligations, and personal life is essential for your long-term success and wellbeing."
          listLabel="Balance strategies"
          items={[
            'Set boundaries — work stays at work where possible',
            'Protect your weekends for rest and personal time',
            'Stay connected with friends and family',
            'Find hobbies and activities outside of work',
            'Remember: a rested apprentice is a better apprentice',
          ]}
        />
      </motion.div>

      <WorkLifeBalanceTab />
    </PageFrame>
  );
};

export default BalancePage;
