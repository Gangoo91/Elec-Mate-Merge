import { CheckCircle2 } from 'lucide-react';
import CaseStudiesTab from '@/components/apprentice/learning-mistakes/CaseStudiesTab';
import { motion } from 'framer-motion';
import { itemVariants } from '@/components/college/primitives';
import { CollegeHeading } from '@/components/college/ui/CollegeUi';
import { GuidePage } from '@/components/apprentice/shared/GuideKit';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

const CaseStudiesPage = () => {
  return (
    <GuidePage
      section="Apprentice · Resilience"
      area="Learning from mistakes"
      title="Case Studies"
      backTo="/apprentice/toolbox/learning-from-mistakes"
    >
      <motion.div
        variants={itemVariants}
        className={cn(
          'space-y-4 -mx-4 rounded-none border-y border-white/[0.08] sm:mx-0 sm:rounded-2xl sm:border-x px-4 py-4 sm:p-5',
          CARD_SURFACE
        )}
      >
        <CollegeHeading>Real-world learning examples</CollegeHeading>
        <p className="text-white text-sm leading-relaxed">
          Learn from real scenarios that apprentice electricians have faced. Each case study walks
          through what happened, what went wrong, how it was resolved, and the lessons learned.
          These stories show that mistakes are part of the journey — not the end of it.
        </p>

        <div className="space-y-2 sm:rounded-md sm:border sm:border-white/[0.08] sm:bg-white/[0.05] sm:p-4">
          <span className="text-[13px] font-semibold text-elec-yellow">Case Study Topics</span>
          <ul className="space-y-1.5">
            {[
              'Technical errors on real installations',
              'Safety near-misses and how they were handled',
              'Communication breakdowns and their consequences',
              'Failed assessments turned into pass marks',
              'Career setbacks that became turning points',
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[14px] text-white leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <CaseStudiesTab />
    </GuidePage>
  );
};

export default CaseStudiesPage;
