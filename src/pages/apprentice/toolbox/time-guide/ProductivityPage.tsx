import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import ProductivityToolsTab from '@/components/apprentice/time-management/ProductivityToolsTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

const ProductivityPage = () => {
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
          title="Productivity Tools"
          tone="yellow"
        />
      </motion.div>

      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Tools to Boost Your Productivity
          </h2>
          <p className="text-white text-sm leading-relaxed">
            The right tools and techniques can dramatically improve how much
            you get done in the time you have. From apps and planners to
            proven productivity methods, find what works for you.
          </p>

          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 sm:p-4 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
              Productivity Methods
            </span>
            <ul className="space-y-1.5">
              {[
                'Pomodoro Technique — 25 min focus, 5 min break',
                'To-do lists — write it down, tick it off',
                'The 2-minute rule — if it takes 2 min, do it now',
                'Batch similar tasks together for efficiency',
                'Digital tools — calendars, reminders, note apps',
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

      <ProductivityToolsTab />
    </PageFrame>
  );
};

export default ProductivityPage;
