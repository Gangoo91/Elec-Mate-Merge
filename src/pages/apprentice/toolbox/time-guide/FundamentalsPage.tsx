import { ArrowLeft } from 'lucide-react';
import TimeManagementFundamentalsTab from '@/components/apprentice/time-management/TimeManagementFundamentalsTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';
import GuideIntro from './GuideIntro';

const FundamentalsPage = () => {
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
        <PageHero eyebrow="Apprentice · Time" title="Time Fundamentals" tone="yellow" />
      </motion.div>

      <motion.div variants={itemVariants}>
        <GuideIntro
          eyebrow="Apprentice · Time"
          title="Mastering your time"
          blurb="As an apprentice electrician, you are juggling work on site, college days, study time, and personal life. Good time management is not about working harder — it is about working smarter and protecting your wellbeing. Remember that your off-the-job training is paid working time, so plan your week around it rather than squeezing it into your own hours."
          listLabel="Core principles"
          items={[
            'Plan your week — do not leave it to chance',
            'Prioritise tasks using urgency and importance',
            'Break large tasks into smaller, manageable steps',
            'Build buffer time for unexpected delays',
            'Protect your rest and recovery time',
          ]}
        />
      </motion.div>

      <TimeManagementFundamentalsTab />
    </PageFrame>
  );
};

export default FundamentalsPage;
