import { CheckCircle2 } from 'lucide-react';
import RecoveryStrategiesTab from '@/components/apprentice/learning-mistakes/RecoveryStrategiesTab';
import { motion } from 'framer-motion';
import { SectionHeader, itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';

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
          className="space-y-4 sm:rounded-xl sm:border sm:border-white/[0.06] sm:bg-[hsl(0_0%_10%)] sm:p-5"
        >
          <SectionHeader eyebrow="Overview" title="How to recover from a mistake" />
          <p className="text-white text-sm leading-relaxed">
            Everyone makes mistakes — what matters is how you respond. These recovery strategies
            will help you handle mistakes professionally, learn from them effectively, and come back
            stronger. The best electricians are not the ones who never make mistakes — they are the
            ones who recover well.
          </p>

          <div className="space-y-2 sm:rounded-md sm:border sm:border-elec-yellow/20 sm:bg-elec-yellow/[0.04] sm:p-4">
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
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
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
