import { CheckCircle2 } from 'lucide-react';
import ExamStrategiesTab from '@/components/apprentice/study-tips/ExamStrategiesTab';
import { motion } from 'framer-motion';
import { itemVariants } from '@/components/college/primitives';
import { CollegeHeading } from '@/components/college/ui/CollegeUi';
import { GuidePage } from '@/components/apprentice/shared/GuideKit';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

const ExamStrategiesPage = () => {
  return (
    <GuidePage
      section="Apprentice · Study"
      area="Study tips"
      title="Exam Strategies"
      backTo="/apprentice/toolbox/study-tips"
    >
      <div
        className={cn(
          '-mx-4 rounded-none border-y border-white/[0.08] sm:mx-0 sm:rounded-2xl sm:border-x px-4 py-4 sm:p-5 space-y-4',
          CARD_SURFACE
        )}
      >
        <h2 className="text-lg font-semibold text-white">Exam Day Success</h2>
        <p className="text-white text-sm leading-relaxed">
          Passing your electrical exams requires more than just knowledge — you need a strategy.
          Learn how to manage exam time, tackle different question types, and stay calm under
          pressure. These techniques work for the 18th Edition (BS 7671:2018+A4:2026), City &amp;
          Guilds, EAL, and the AM2S end-point assessment.
        </p>

        <div className="rounded-md border border-white/[0.08] bg-white/[0.05] p-3 sm:p-4 space-y-2 max-sm:-mx-4 max-sm:rounded-none max-sm:border-x-0">
          <span className="text-[13px] font-semibold text-elec-yellow">What You Will Learn</span>
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
                className="flex items-start gap-2 text-[14px] text-white leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ExamStrategiesTab />

      <motion.section variants={itemVariants} className="space-y-4">
        <CollegeHeading>If you have dyslexia or a disability</CollegeHeading>
        <div
          className={cn(
            '-mx-4 rounded-none border-y border-white/[0.08] sm:mx-0 sm:rounded-2xl sm:border-x px-4 py-4 sm:p-5 space-y-3',
            CARD_SURFACE
          )}
        >
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
                className="flex items-start gap-2 text-[14px] text-white leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-white text-[14px] leading-relaxed">
            Tell your tutor or assessment centre as early as possible — adjustments need a diagnosis
            or evidence of need and must be arranged before exam day. It is your entitlement, not a
            favour.
          </p>
        </div>
      </motion.section>
    </GuidePage>
  );
};

export default ExamStrategiesPage;
