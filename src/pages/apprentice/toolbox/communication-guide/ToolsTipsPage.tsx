import { CheckCircle2 } from 'lucide-react';
import InteractiveToolsTab from '@/components/apprentice/communication-skills/InteractiveToolsTab';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

const ToolsTipsPage = () => {
  return (
    <HubPage>
      <HubMasthead
        section="Apprentice · Communication"
        title="Tools & Tips"
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
          <h2 className="text-lg font-semibold text-white">Communication Frameworks & Practice</h2>
          <p className="text-white text-sm leading-relaxed">
            Use these proven frameworks and practice scenarios to build your communication
            confidence. The STAR method, CLEAR communication model, and real-world practice
            scenarios will help you handle any situation on site.
          </p>

          <div className="rounded-md border border-elec-yellow/20 bg-white/[0.05] p-3 sm:p-4 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
              Included
            </span>
            <ul className="space-y-1.5">
              {[
                'STAR Method — structure your responses clearly',
                'CLEAR Communication — 5-step model for any situation',
                'Practice scenarios with real electrical context',
                'Tips for phone, face-to-face, written, and urgent comms',
                'Difficult conversation scripts and approaches',
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
        <InteractiveToolsTab />
      </HubBody>
    </HubPage>
  );
};

export default ToolsTipsPage;
