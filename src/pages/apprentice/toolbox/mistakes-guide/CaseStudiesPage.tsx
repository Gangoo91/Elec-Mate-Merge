import { CheckCircle2 } from 'lucide-react';
import CaseStudiesTab from '@/components/apprentice/learning-mistakes/CaseStudiesTab';
import { motion } from 'framer-motion';
import { SectionHeader, itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';

const CaseStudiesPage = () => {
  return (
    <HubPage>
      <HubMasthead
        section="Apprentice · Resilience"
        title="Case Studies"
        backTo="/apprentice/toolbox/learning-from-mistakes"
      />
      <HubBody>
        <motion.div
          variants={itemVariants}
          className="space-y-4 sm:rounded-xl sm:border sm:border-white/[0.06] sm:bg-[hsl(0_0%_10%)] sm:p-5"
        >
          <SectionHeader eyebrow="Overview" title="Real-world learning examples" />
          <p className="text-white text-sm leading-relaxed">
            Learn from real scenarios that apprentice electricians have faced. Each case study walks
            through what happened, what went wrong, how it was resolved, and the lessons learned.
            These stories show that mistakes are part of the journey — not the end of it.
          </p>

          <div className="space-y-2 sm:rounded-md sm:border sm:border-elec-yellow/20 sm:bg-elec-yellow/[0.04] sm:p-4">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
              Case Study Topics
            </span>
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
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <CaseStudiesTab />
      </HubBody>
    </HubPage>
  );
};

export default CaseStudiesPage;
