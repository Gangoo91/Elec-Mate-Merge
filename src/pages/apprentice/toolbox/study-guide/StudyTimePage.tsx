import { CheckCircle2 } from 'lucide-react';
import TimeManagementTab from '@/components/apprentice/study-tips/TimeManagementTab';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

const StudyTimePage = () => {
  return (
    <HubPage>
      <HubMasthead
        section="Apprentice · Study"
        title="Study Time Management"
        backTo="/apprentice/toolbox/study-tips"
      />
      <HubBody>
        <div
          className={cn(
            '-mx-4 rounded-none border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x px-4 py-4 sm:p-5 space-y-4',
            CARD_SURFACE
          )}
        >
          <h2 className="text-lg font-semibold text-white">Finding Time to Study</h2>
          <p className="text-white text-sm leading-relaxed">
            Balancing a full-time apprenticeship with study can feel overwhelming. Between early
            starts, long days on site, and college commitments, finding time to revise is a real
            challenge. These strategies will help you make the most of the time you have.
          </p>

          <div className="rounded-md border border-elec-yellow/20 bg-white/[0.05] p-3 sm:p-4 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
              Key Strategies
            </span>
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
                  className="flex items-start gap-2 text-[12.5px] text-white leading-relaxed"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <TimeManagementTab />
      </HubBody>
    </HubPage>
  );
};

export default StudyTimePage;
