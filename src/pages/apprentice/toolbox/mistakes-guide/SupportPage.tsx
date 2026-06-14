import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import SupportSystemsTab from '@/components/apprentice/learning-mistakes/SupportSystemsTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageFrame, PageHero, SectionHeader, itemVariants } from '@/components/college/primitives';

const SupportPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/toolbox/learning-from-mistakes')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero eyebrow="Apprentice · Resilience" title="Support Systems" tone="yellow" />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="space-y-4 sm:rounded-xl sm:border sm:border-white/[0.06] sm:bg-[hsl(0_0%_10%)] sm:p-5"
      >
        <SectionHeader eyebrow="Overview" title="Building your support network" />
        <p className="text-white text-sm leading-relaxed">
          You do not have to face challenges alone. Building a strong support network — mentors,
          colleagues, training providers, and external resources — gives you people to turn to when
          things get tough. Knowing who to talk to and when is a professional skill in itself.
        </p>

        <div className="space-y-2 sm:rounded-md sm:border sm:border-elec-yellow/20 sm:bg-elec-yellow/[0.04] sm:p-4">
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
                className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <SupportSystemsTab />
    </PageFrame>
  );
};

export default SupportPage;
