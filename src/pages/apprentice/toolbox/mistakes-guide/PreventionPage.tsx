import { CheckCircle2 } from 'lucide-react';
import PreventionTab from '@/components/apprentice/learning-mistakes/PreventionTab';
import { motion } from 'framer-motion';
import { itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead, HubSectionHeading } from '@/components/hub/HubPrimitives';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

const PreventionPage = () => {
  return (
    <HubPage>
      <HubMasthead
        section="Apprentice · Resilience"
        title="Prevention Strategies"
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
          <HubSectionHeading>Preventing mistakes before they happen</HubSectionHeading>
          <p className="text-white text-sm leading-relaxed">
            The best approach to mistakes is preventing them in the first place. These strategies
            cover pre-work checks, systematic approaches, and habits that dramatically reduce the
            chance of errors on site and in your studies.
          </p>

          <div className="space-y-2 sm:rounded-md sm:border sm:border-elec-yellow/20 sm:bg-white/[0.05] sm:p-4">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
              Prevention Methods
            </span>
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
                  className="flex items-start gap-2 text-[12.5px] text-white leading-relaxed"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <PreventionTab />
      </HubBody>
    </HubPage>
  );
};

export default PreventionPage;
