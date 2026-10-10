import TimeManagementFundamentalsTab from '@/components/apprentice/time-management/TimeManagementFundamentalsTab';
import { motion } from 'framer-motion';
import { itemVariants } from '@/components/college/primitives';
import { GuidePage } from '@/components/apprentice/shared/GuideKit';
import GuideIntro from './GuideIntro';

const FundamentalsPage = () => {
  return (
    <GuidePage
      section="Apprentice · Time"
      area="Time management"
      title="Time Fundamentals"
      backTo="/apprentice/toolbox/time-management"
    >
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
    </GuidePage>
  );
};

export default FundamentalsPage;
