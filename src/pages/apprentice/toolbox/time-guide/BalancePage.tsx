import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import WorkLifeBalanceTab from '@/components/apprentice/time-management/WorkLifeBalanceTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

const BalancePage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button onClick={() => navigate('/apprentice/toolbox/time-management')} className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation">
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Time"
          title="Work-Life Balance"
          tone="yellow"
        />
      </motion.div>

      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Balancing Work, Study, and Life
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Your apprenticeship is a 4-year commitment, and you cannot
            sustain it if you burn out. Finding the right balance between
            work demands, study obligations, and personal life is essential
            for your long-term success and wellbeing.
          </p>

          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 sm:p-4 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
              Balance Strategies
            </span>
            <ul className="space-y-1.5">
              {[
                'Set boundaries — work stays at work where possible',
                'Protect your weekends for rest and personal time',
                'Stay connected with friends and family',
                'Find hobbies and activities outside of work',
                'Remember: a rested apprentice is a better apprentice',
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

      <WorkLifeBalanceTab />
    </PageFrame>
  );
};

export default BalancePage;
