import InteractiveToolsTab from '@/components/apprentice/time-management/InteractiveToolsTab';
import { motion } from 'framer-motion';
import { itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import GuideIntro from './GuideIntro';

const InteractivePage = () => {
  return (
    <HubPage>
      <HubMasthead
        section="Apprentice · Time"
        title="Interactive Tools"
        backTo="/apprentice/toolbox/time-management"
      />
      <HubBody>
        <motion.div variants={itemVariants}>
          <GuideIntro
            eyebrow="Apprentice · Time"
            title="Practice & self-assessment"
            blurb="Use these interactive tools to assess your current time management skills, identify areas for improvement, and practise techniques that will help you stay on top of your apprenticeship demands."
            listLabel="Included"
            items={[
              'Time audit — where does your time actually go?',
              'Priority matrix — urgent vs important',
              'Weekly planner template',
              'Goal-setting frameworks',
              'Progress tracking tools',
            ]}
          />
        </motion.div>

        <InteractiveToolsTab />
      </HubBody>
    </HubPage>
  );
};

export default InteractivePage;
