import { CheckCircle2 } from 'lucide-react';
import StudyPsychologyTab from '@/components/apprentice/study-tips/StudyPsychologyTab';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

const PsychologyPage = () => {
  return (
    <HubPage>
      <HubMasthead
        section="Apprentice · Study"
        title="Study Psychology"
        backTo="/apprentice/toolbox/study-tips"
      />
      <HubBody>
        <div
          className={cn(
            '-mx-4 rounded-none border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x px-4 py-4 sm:p-5 space-y-4',
            CARD_SURFACE
          )}
        >
          <h2 className="text-lg font-semibold text-white">The Mental Side of Studying</h2>
          <p className="text-white text-sm leading-relaxed">
            Your mindset has a massive impact on how effectively you learn. Understanding
            motivation, dealing with procrastination, managing study anxiety, and building
            confidence are just as important as the study techniques themselves.
          </p>

          <div className="rounded-md border border-elec-yellow/20 bg-white/[0.05] p-3 sm:p-4 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
              Topics Covered
            </span>
            <ul className="space-y-1.5">
              {[
                'Overcoming procrastination — why we avoid studying',
                'Building motivation when you feel like giving up',
                'Managing exam anxiety and performance pressure',
                'Growth mindset — believing you can improve',
                'Celebrating progress and staying positive',
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

        <StudyPsychologyTab />
      </HubBody>
    </HubPage>
  );
};

export default PsychologyPage;
