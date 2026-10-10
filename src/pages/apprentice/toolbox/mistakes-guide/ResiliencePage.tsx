import { CheckCircle2 } from 'lucide-react';
import ResilienceTab from '@/components/apprentice/learning-mistakes/ResilienceTab';
import { motion } from 'framer-motion';
import { itemVariants } from '@/components/college/primitives';
import { CollegeHeading } from '@/components/college/ui/CollegeUi';
import { GuidePage } from '@/components/apprentice/shared/GuideKit';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

const ResiliencePage = () => {
  return (
    <GuidePage
      section="Apprentice · Resilience"
      area="Learning from mistakes"
      title="Building Resilience"
      backTo="/apprentice/toolbox/learning-from-mistakes"
    >
      <motion.div
        variants={itemVariants}
        className={cn(
          'space-y-4 -mx-4 rounded-none border-y border-white/[0.08] sm:mx-0 sm:rounded-2xl sm:border-x px-4 py-4 sm:p-5',
          CARD_SURFACE
        )}
      >
        <CollegeHeading>Developing mental toughness</CollegeHeading>
        <p className="text-white text-sm leading-relaxed">
          Resilience is your ability to bounce back from setbacks. In the electrical trade, you will
          face challenges — failed assessments, difficult days on site, criticism from supervisors.
          Building resilience helps you handle these situations without losing confidence or
          motivation.
        </p>

        <div className="space-y-2 sm:rounded-md sm:border sm:border-white/[0.08] sm:bg-white/[0.05] sm:p-4">
          <span className="text-[13px] font-semibold text-elec-yellow">What You Will Learn</span>
          <ul className="space-y-1.5">
            {[
              'Growth mindset — seeing challenges as opportunities',
              'Self-talk techniques to stay positive',
              'How to handle criticism constructively',
              'Building confidence through small wins',
              'When to seek support and how to ask for it',
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

      <ResilienceTab />
    </GuidePage>
  );
};

export default ResiliencePage;
