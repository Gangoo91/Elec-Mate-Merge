import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import PreventionTab from '@/components/apprentice/learning-mistakes/PreventionTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

const PreventionPage = () => {
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
          title="Prevention Strategies"
          tone="yellow"
        />
      </motion.div>

      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Preventing Mistakes Before They Happen
          </h2>
          <p className="text-white text-sm leading-relaxed">
            The best approach to mistakes is preventing them in the first
            place. These strategies cover pre-work checks, systematic
            approaches, and habits that dramatically reduce the chance of
            errors on site and in your studies.
          </p>

          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 sm:p-4 space-y-2">
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
        </div>

      <PreventionTab />
    </PageFrame>
  );
};

export default PreventionPage;
