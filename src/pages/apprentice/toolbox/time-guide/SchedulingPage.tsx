import SchedulePlanningTab from '@/components/apprentice/time-management/SchedulePlanningTab';
import { motion } from 'framer-motion';
import { itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import GuideIntro from './GuideIntro';

const SchedulingPage = () => {
  return (
    <HubPage>
      <HubMasthead
        section="Apprentice · Time"
        title="Schedule Planning"
        backTo="/apprentice/toolbox/time-management"
      />
      <HubBody>
        <motion.div variants={itemVariants}>
          <GuideIntro
            eyebrow="Apprentice · Time"
            title="Creating your weekly schedule"
            blurb="A well-planned schedule is your best tool for balancing apprenticeship demands. Learn how to structure your week around work, college, study, and personal time — and how to adjust when things do not go to plan. Protect 7-8 hours of sleep first, then build everything else around it."
            listLabel="Planning tips"
            items={[
              'Block out fixed commitments first (work, college)',
              'Schedule study time like an appointment',
              'Include travel time in your planning',
              'Build in breaks and personal time',
              'Review and adjust weekly — plans need flexibility',
            ]}
          />
        </motion.div>

        <SchedulePlanningTab />
      </HubBody>
    </HubPage>
  );
};

export default SchedulingPage;
