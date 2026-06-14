import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import ExamStrategiesTab from '@/components/apprentice/study-tips/ExamStrategiesTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageFrame, PageHero, SectionHeader, itemVariants } from '@/components/college/primitives';

const ExamStrategiesPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button
          onClick={() => navigate('/apprentice/toolbox/study-tips')}
          className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero eyebrow="Apprentice · Study" title="Exam Strategies" tone="yellow" />
      </motion.div>

      <div className="sm:rounded-xl sm:border sm:border-white/[0.06] sm:bg-[hsl(0_0%_10%)] sm:p-5 space-y-4">
        <h2 className="text-lg font-semibold text-white">Exam Day Success</h2>
        <p className="text-white text-sm leading-relaxed">
          Passing your electrical exams requires more than just knowledge — you need a strategy.
          Learn how to manage exam time, tackle different question types, and stay calm under
          pressure. These techniques work for the 18th Edition (BS 7671:2018+A4:2026), City &amp;
          Guilds, EAL, and the AM2S end-point assessment.
        </p>

        <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 sm:p-4 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
            What You Will Learn
          </span>
          <ul className="space-y-1.5">
            {[
              'Time management strategies for timed exams',
              'How to approach multiple-choice questions',
              'Dealing with questions you cannot answer',
              'Managing exam anxiety and staying focused',
              'The night-before and morning-of routines that work',
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

      <ExamStrategiesTab />

      <motion.section variants={itemVariants} className="space-y-4">
        <SectionHeader eyebrow="Your rights" title="If you have dyslexia or a disability" />
        <div className="sm:rounded-xl sm:border sm:border-white/[0.06] sm:bg-[hsl(0_0%_10%)] sm:p-5 space-y-3">
          <p className="text-white text-sm leading-relaxed">
            A large share of electrical apprentices are dyslexic. Awarding bodies such as City &amp;
            Guilds and EAL must make reasonable adjustments so an assessment measures your skill,
            not your reading speed — but you normally have to ask for them in advance.
          </p>
          <ul className="space-y-1.5">
            {[
              'Extra time (commonly 25%) on written and online papers',
              'A reader, scribe, or text-to-speech / read-aloud software',
              'Coloured overlays, modified-paper formats, or a separate room',
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
          <p className="text-white/65 text-[12.5px] leading-relaxed">
            Tell your tutor or assessment centre as early as possible — adjustments need a diagnosis
            or evidence of need and must be arranged before exam day. It is your entitlement, not a
            favour.
          </p>
        </div>
      </motion.section>
    </PageFrame>
  );
};

export default ExamStrategiesPage;
