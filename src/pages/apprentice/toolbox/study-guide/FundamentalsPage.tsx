import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import StudyFundamentalsTab from '@/components/apprentice/study-tips/StudyFundamentalsTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

const FundamentalsPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button onClick={() => navigate('/apprentice/toolbox/study-tips')} className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation">
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Study"
          title="Study Fundamentals"
          tone="yellow"
        />
      </motion.div>

      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Building Strong Study Habits
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Success in electrical training starts with good study habits.
            Whether you are preparing for the 18th Edition exam, AM2 practical,
            or college assessments, these fundamentals will help you study more
            effectively and retain information longer.
          </p>

          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 sm:p-4 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
              Key Principles
            </span>
            <ul className="space-y-1.5">
              {[
                '30 minutes daily beats a 3-hour weekend cram',
                'Active recall is more effective than re-reading',
                'Study in short, focused blocks (25 min on, 5 min off)',
                'Mix up topics to strengthen connections',
                'Test yourself regularly with practice questions',
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

      <StudyFundamentalsTab />
    </PageFrame>
  );
};

export default FundamentalsPage;
