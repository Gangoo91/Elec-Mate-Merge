import { CheckCircle2 } from 'lucide-react';
import WorkplaceCommunicationTab from '@/components/apprentice/communication-skills/WorkplaceCommunicationTab';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

const WorkplacePage = () => {
  return (
    <HubPage>
      <HubMasthead
        section="Apprentice · Communication"
        title="Workplace Communication"
        backTo="/apprentice/toolbox/communication-skills"
      />
      <HubBody>
        {/* Intro Card */}
        <div
          className={cn(
            'border-0 bg-transparent p-0 space-y-4 -mx-4 rounded-none border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x px-4 py-4 sm:p-5',
            CARD_SURFACE
          )}
        >
          <h2 className="text-lg font-semibold text-white">Communicating on Site</h2>
          <p className="text-white text-sm leading-relaxed">
            Good communication on site keeps everyone safe, prevents costly mistakes, and builds
            your professional reputation. Whether you are talking to your supervisor, working
            alongside colleagues, or dealing with clients, how you communicate matters.
          </p>

          <div className="rounded-md border border-elec-yellow/20 bg-white/[0.05] p-3 sm:p-4 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
              Key Principles
            </span>
            <ul className="space-y-1.5">
              {[
                'Be clear and specific — avoid vague descriptions',
                'Confirm instructions by repeating them back',
                'Ask questions if anything is unclear',
                'Use the right communication method for the situation',
                'Stay calm and professional, even under pressure',
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

        {/* Main Content */}
        <WorkplaceCommunicationTab />
      </HubBody>
    </HubPage>
  );
};

export default WorkplacePage;
