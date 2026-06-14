import { ArrowLeft } from 'lucide-react';
import SchedulePlanningTab from '@/components/apprentice/time-management/SchedulePlanningTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';
import GuideIntro from './GuideIntro';

const SchedulingPage = () => {
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
        <PageHero eyebrow="Apprentice · Time" title="Schedule Planning" tone="yellow" />
      </motion.div>

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
    </PageFrame>
  );
};

export default SchedulingPage;
