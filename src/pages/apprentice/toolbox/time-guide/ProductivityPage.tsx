import ProductivityToolsTab from '@/components/apprentice/time-management/ProductivityToolsTab';
import { motion } from 'framer-motion';
import { itemVariants } from '@/components/college/primitives';
import { GuidePage } from '@/components/apprentice/shared/GuideKit';
import GuideIntro from './GuideIntro';

const ProductivityPage = () => {
  return (
    <GuidePage
      section="Apprentice · Time"
      area="Time management"
      title="Productivity Tools"
      backTo="/apprentice/toolbox/time-management"
    >
      <motion.div variants={itemVariants}>
        <GuideIntro
          eyebrow="Apprentice · Time"
          title="Tools to boost your productivity"
          blurb="The right tools and techniques can dramatically improve how much you get done in the time you have. From apps and planners to proven productivity methods, find what works for you."
          listLabel="Productivity methods"
          items={[
            'Pomodoro Technique — 25 min focus, 5 min break',
            'To-do lists — write it down, tick it off',
            'The 2-minute rule — if it takes 2 min, do it now',
            'Batch similar tasks together for efficiency',
            'Digital tools — calendars, reminders, note apps',
          ]}
        />
      </motion.div>

      <ProductivityToolsTab />
    </GuidePage>
  );
};

export default ProductivityPage;
