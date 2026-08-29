import WorkLifeBalanceTab from '@/components/apprentice/time-management/WorkLifeBalanceTab';
import { motion } from 'framer-motion';
import { itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import GuideIntro from './GuideIntro';

const BalancePage = () => {
  return (
    <HubPage>
      <HubMasthead
        section="Apprentice · Time"
        title="Work-Life Balance"
        backTo="/apprentice/toolbox/time-management"
      />
      <HubBody>
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
      </HubBody>
    </HubPage>
  );
};

export default BalancePage;
