import { CheckCircle2 } from 'lucide-react';
import PreventionTab from '@/components/apprentice/learning-mistakes/PreventionTab';
import { motion } from 'framer-motion';
import { SectionHeader, itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';

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
          className="space-y-4 sm:rounded-xl sm:border sm:border-white/[0.06] sm:bg-[hsl(0_0%_10%)] sm:p-5"
        >
          <SectionHeader eyebrow="Overview" title="Preventing mistakes before they happen" />
          <p className="text-white text-sm leading-relaxed">
            The best approach to mistakes is preventing them in the first place. These strategies
            cover pre-work checks, systematic approaches, and habits that dramatically reduce the
            chance of errors on site and in your studies.
          </p>

          <div className="space-y-2 sm:rounded-md sm:border sm:border-elec-yellow/20 sm:bg-elec-yellow/[0.04] sm:p-4">
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
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
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
