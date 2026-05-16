import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import RecoveryStrategiesTab from '@/components/apprentice/learning-mistakes/RecoveryStrategiesTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

const RecoveryPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button onClick={() => navigate('/apprentice/toolbox/learning-from-mistakes')} className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation">
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Resilience"
          title="Recovery Strategies"
          tone="yellow"
        />
      </motion.div>

      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            How to Recover From a Mistake
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Everyone makes mistakes — what matters is how you respond. These
            recovery strategies will help you handle mistakes professionally,
            learn from them effectively, and come back stronger. The best
            electricians are not the ones who never make mistakes — they are
            the ones who recover well.
          </p>

          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 sm:p-4 space-y-2">
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
        </div>

      <RecoveryStrategiesTab />
    </PageFrame>
  );
};

export default RecoveryPage;
