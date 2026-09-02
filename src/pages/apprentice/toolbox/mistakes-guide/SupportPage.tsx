import { CheckCircle2 } from 'lucide-react';
import SupportSystemsTab from '@/components/apprentice/learning-mistakes/SupportSystemsTab';
import { motion } from 'framer-motion';
import { itemVariants } from '@/components/college/primitives';
import { HubPage, HubBody, HubMasthead, HubSectionHeading } from '@/components/hub/HubPrimitives';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

const SupportPage = () => {
  return (
    <HubPage>
      <HubMasthead
        section="Apprentice · Resilience"
        title="Support Systems"
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
          <HubSectionHeading>Building your support network</HubSectionHeading>
          <p className="text-white text-sm leading-relaxed">
            You do not have to face challenges alone. Building a strong support network — mentors,
            colleagues, training providers, and external resources — gives you people to turn to
            when things get tough. Knowing who to talk to and when is a professional skill in
            itself.
          </p>

          <div className="space-y-2 sm:rounded-md sm:border sm:border-elec-yellow/20 sm:bg-white/[0.05] sm:p-4">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
              Support Network
            </span>
            <ul className="space-y-1.5">
              {[
                'Your mentor or supervisor — first port of call',
                'Fellow apprentices — shared experience and peer support',
                'Training provider — academic and pastoral support',
                'Trade unions — workplace advice and representation',
                'Professional organisations — IET, JIB, NICEIC',
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

        <SupportSystemsTab />
      </HubBody>
    </HubPage>
  );
};

export default SupportPage;
