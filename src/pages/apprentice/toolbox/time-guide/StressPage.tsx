import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import StressManagementTab from '@/components/apprentice/time-management/StressManagementTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

const StressPage = () => {
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
          title="Stress & Wellbeing"
          tone="yellow"
        />
      </motion.div>

      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Managing Stress as an Apprentice
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Feeling stressed is normal — especially when you are balancing work,
            study, and exams. The key is recognising it early and having
            strategies to manage it. These techniques will help you stay in
            control and protect your mental health.
          </p>

          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 sm:p-4 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
              Stress Management Tips
            </span>
            <ul className="space-y-1.5">
              {[
                'Recognise your stress triggers early',
                'Use breathing techniques to calm down quickly',
                'Talk to someone you trust when things get tough',
                'Exercise regularly — even a 20-minute walk helps',
                'Sleep is not a luxury — protect your 7-8 hours',
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

      <StressManagementTab />
    </PageFrame>
  );
};

export default StressPage;
