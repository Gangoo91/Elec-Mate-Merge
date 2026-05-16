import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import CaseStudiesTab from '@/components/apprentice/learning-mistakes/CaseStudiesTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

const CaseStudiesPage = () => {
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
          title="Case Studies"
          tone="yellow"
        />
      </motion.div>

      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Real-World Learning Examples
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Learn from real scenarios that apprentice electricians have faced.
            Each case study walks through what happened, what went wrong, how
            it was resolved, and the lessons learned. These stories show that
            mistakes are part of the journey — not the end of it.
          </p>

          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 sm:p-4 space-y-2">
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
        </div>

      <CaseStudiesTab />
    </PageFrame>
  );
};

export default CaseStudiesPage;
