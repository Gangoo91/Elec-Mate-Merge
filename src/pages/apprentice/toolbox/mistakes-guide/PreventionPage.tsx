import { CheckCircle2 } from 'lucide-react';
import PreventionTab from '@/components/apprentice/learning-mistakes/PreventionTab';
import { motion } from 'framer-motion';
import { itemVariants } from '@/components/college/primitives';
import { CollegeHeading } from '@/components/college/ui/CollegeUi';
import { GuidePage } from '@/components/apprentice/shared/GuideKit';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

const PreventionPage = () => {
  return (
    <GuidePage
      section="Apprentice · Resilience"
      area="Learning from mistakes"
      title="Prevention Strategies"
      backTo="/apprentice/toolbox/learning-from-mistakes"
    >
      <motion.div
        variants={itemVariants}
        className={cn(
          'space-y-4 -mx-4 rounded-none border-y border-white/[0.08] sm:mx-0 sm:rounded-2xl sm:border-x px-4 py-4 sm:p-5',
          CARD_SURFACE
        )}
      >
        <CollegeHeading>Preventing mistakes before they happen</CollegeHeading>
        <p className="text-white text-sm leading-relaxed">
          The best approach to mistakes is preventing them in the first place. These strategies
          cover pre-work checks, systematic approaches, and habits that dramatically reduce the
          chance of errors on site and in your studies.
        </p>

        <div className="space-y-2 sm:rounded-md sm:border sm:border-white/[0.08] sm:bg-white/[0.05] sm:p-4">
          <span className="text-[13px] font-semibold text-elec-yellow">Prevention Methods</span>
          <ul className="space-y-1.5">
            {[
              'Pre-work checklists and planning routines',
              'Double-checking techniques for critical tasks',
              'Asking questions when unsure (it is never wrong to ask)',
              'Using reference materials — BS 7671, On-Site Guide',
              'Learning from near-misses before they become incidents',
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

      <PreventionTab />
    </GuidePage>
  );
};

export default PreventionPage;
