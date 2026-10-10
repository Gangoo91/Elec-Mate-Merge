import InteractiveToolsTab from '@/components/apprentice/time-management/InteractiveToolsTab';
import { motion } from 'framer-motion';
import { itemVariants } from '@/components/college/primitives';
import { GuidePage } from '@/components/apprentice/shared/GuideKit';
import GuideIntro from './GuideIntro';

const InteractivePage = () => {
  return (
    <GuidePage
      section="Apprentice · Time"
      area="Time management"
      title="Interactive Tools"
      backTo="/apprentice/toolbox/time-management"
    >
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
    </GuidePage>
  );
};

export default InteractivePage;
