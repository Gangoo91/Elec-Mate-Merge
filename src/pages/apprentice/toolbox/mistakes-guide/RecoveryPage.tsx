import { CheckCircle2 } from 'lucide-react';
import RecoveryStrategiesTab from '@/components/apprentice/learning-mistakes/RecoveryStrategiesTab';
import { motion } from 'framer-motion';
import { itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead, HubSectionHeading } from '@/components/hub/HubPrimitives';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

const RecoveryPage = () => {
  return (
    <HubPage>
      <HubMasthead
        section="Apprentice · Resilience"
        title="Recovery Strategies"
        backTo="/apprentice/toolbox/learning-from-mistakes"
      />
      <HubBody>
        <motion.div
          variants={itemVariants}
          className={cn(
            'space-y-4 -mx-4 rounded-none border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x px-4 py-4 sm:p-5',
            CARD_SURFACE
          )}
        >
          <HubSectionHeading>How to recover from a mistake</HubSectionHeading>
          <p className="text-white text-sm leading-relaxed">
            Everyone makes mistakes — what matters is how you respond. These recovery strategies
            will help you handle mistakes professionally, learn from them effectively, and come back
            stronger. The best electricians are not the ones who never make mistakes — they are the
            ones who recover well.
          </p>

          <div className="space-y-2 sm:rounded-md sm:border sm:border-elec-yellow/20 sm:bg-white/[0.05] sm:p-4">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
              Key Recovery Steps
            </span>
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
                  className="flex items-start gap-2 text-[12.5px] text-white leading-relaxed"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <RecoveryStrategiesTab />
      </HubBody>
    </HubPage>
  );
};

export default RecoveryPage;
