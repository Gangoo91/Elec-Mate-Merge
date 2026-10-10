import { CheckCircle2 } from 'lucide-react';
import TimeManagementTab from '@/components/apprentice/study-tips/TimeManagementTab';
import { GuidePage } from '@/components/apprentice/shared/GuideKit';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

const StudyTimePage = () => {
  return (
    <GuidePage
      section="Apprentice · Study"
      area="Study tips"
      title="Study Time Management"
      backTo="/apprentice/toolbox/study-tips"
    >
      <div
        className={cn(
          '-mx-4 rounded-none border-y border-white/[0.08] sm:mx-0 sm:rounded-2xl sm:border-x px-4 py-4 sm:p-5 space-y-4',
          CARD_SURFACE
        )}
      >
        <h2 className="text-lg font-semibold text-white">Finding Time to Study</h2>
        <p className="text-white text-sm leading-relaxed">
          Balancing a full-time apprenticeship with study can feel overwhelming. Between early
          starts, long days on site, and college commitments, finding time to revise is a real
          challenge. These strategies will help you make the most of the time you have.
        </p>

        <div className="rounded-md border border-white/[0.08] bg-white/[0.05] p-3 sm:p-4 space-y-2 max-sm:-mx-4 max-sm:rounded-none max-sm:border-x-0">
          <span className="text-[13px] font-semibold text-elec-yellow">Key Strategies</span>
          <ul className="space-y-1.5">
            {[
              'Use commute time for audio learning or flashcards',
              'Study in 25-minute focused blocks (Pomodoro technique)',
              'Create a weekly study schedule and stick to it',
              'Prioritise quality over quantity — 30 min focused beats 2 hrs distracted',
              'Use dead time on site (waiting for deliveries, etc.)',
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

      <TimeManagementTab />
    </GuidePage>
  );
};

export default StudyTimePage;
