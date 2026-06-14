import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import ResourcesTab from '@/components/apprentice/study-tips/ResourcesTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';

const ResourcesPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/toolbox/study-tips')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero eyebrow="Apprentice · Study" title="Study Resources" tone="yellow" />
      </motion.div>

      <div className="sm:rounded-xl sm:border sm:border-white/[0.06] sm:bg-[hsl(0_0%_10%)] sm:p-5 space-y-4">
        <h2 className="text-lg font-semibold text-white">
          Essential Resources for Electrical Training
        </h2>
        <p className="text-white text-sm leading-relaxed">
          The right resources make all the difference. From textbooks and online platforms to
          practice exam sites and video tutorials, here is everything you need to support your
          electrical apprenticeship studies.
        </p>

        <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 sm:p-4 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
            Resource Categories
          </span>
          <ul className="space-y-1.5">
            {[
              'Essential textbooks (BS 7671:2018+A4:2026, On-Site Guide, Guidance Notes)',
              'Online learning platforms and practice exams',
              'Video tutorials and YouTube channels',
              'Mobile apps for on-the-go revision',
              'Free and paid resources compared',
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ResourcesTab />
    </PageFrame>
  );
};

export default ResourcesPage;
