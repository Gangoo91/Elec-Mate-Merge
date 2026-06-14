import { ArrowLeft } from 'lucide-react';
import InteractiveToolsTab from '@/components/apprentice/time-management/InteractiveToolsTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';
import GuideIntro from './GuideIntro';

const InteractivePage = () => {
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
        <PageHero eyebrow="Apprentice · Time" title="Interactive Tools" tone="yellow" />
      </motion.div>

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
    </PageFrame>
  );
};

export default InteractivePage;
