import { CheckCircle2 } from 'lucide-react';
import RecoveryStrategiesTab from '@/components/apprentice/learning-mistakes/RecoveryStrategiesTab';
import { motion } from 'framer-motion';
import { itemVariants } from '@/components/college/primitives';
import { CollegeHeading } from '@/components/college/ui/CollegeUi';
import { GuidePage } from '@/components/apprentice/shared/GuideKit';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

const RecoveryPage = () => {
  return (
    <GuidePage
      section="Apprentice · Resilience"
      area="Learning from mistakes"
      title="Recovery Strategies"
      backTo="/apprentice/toolbox/learning-from-mistakes"
    >
      <motion.div
        variants={itemVariants}
        className={cn(
          'space-y-4 -mx-4 rounded-none border-y border-white/[0.08] sm:mx-0 sm:rounded-2xl sm:border-x px-4 py-4 sm:p-5',
          CARD_SURFACE
        )}
      >
        <CollegeHeading>How to recover from a mistake</CollegeHeading>
        <p className="text-white text-sm leading-relaxed">
          Everyone makes mistakes — what matters is how you respond. These recovery strategies will
          help you handle mistakes professionally, learn from them effectively, and come back
          stronger. The best electricians are not the ones who never make mistakes — they are the
          ones who recover well.
        </p>

        <div className="space-y-2 sm:rounded-md sm:border sm:border-white/[0.08] sm:bg-white/[0.05] sm:p-4">
          <span className="text-[13px] font-semibold text-elec-yellow">Key Recovery Steps</span>
          <ul className="space-y-1.5">
            {[
              'Own the mistake immediately — do not hide it',
              'Assess the impact and make it safe',
              'Report it to the right person',
              'Identify what went wrong and why',
              'Put a plan in place to prevent it happening again',
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

      <RecoveryStrategiesTab />
    </GuidePage>
  );
};

export default RecoveryPage;
