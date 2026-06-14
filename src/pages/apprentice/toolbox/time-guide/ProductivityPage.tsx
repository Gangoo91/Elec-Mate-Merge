import { ArrowLeft } from 'lucide-react';
import ProductivityToolsTab from '@/components/apprentice/time-management/ProductivityToolsTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';
import GuideIntro from './GuideIntro';

const ProductivityPage = () => {
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
        <PageHero eyebrow="Apprentice · Time" title="Productivity Tools" tone="yellow" />
      </motion.div>

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
    </PageFrame>
  );
};

export default ProductivityPage;
