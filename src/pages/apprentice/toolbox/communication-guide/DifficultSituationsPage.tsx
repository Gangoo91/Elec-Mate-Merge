import { CheckCircle2, AlertTriangle } from 'lucide-react';
import DifficultSituationsTab from '@/components/apprentice/communication-skills/DifficultSituationsTab';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

const DifficultSituationsPage = () => {
  return (
    <HubPage>
      <HubMasthead
        section="Apprentice · Communication"
        title="Difficult Situations"
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
          <h2 className="text-lg font-semibold text-white">Handling Challenging Conversations</h2>
          <p className="text-white text-sm leading-relaxed">
            Every electrician will face difficult conversations — disagreements with supervisors,
            unhappy clients, or workplace conflicts. How you handle these situations defines your
            professionalism and can make the difference between escalation and resolution.
          </p>

          <div className="rounded-md border border-elec-yellow/20 bg-white/[0.05] p-3 sm:p-4 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
              What You Will Learn
            </span>
            <ul className="space-y-1.5">
              {[
                'De-escalation techniques that actually work',
                'How to disagree professionally with your supervisor',
                'Managing client expectations and complaints',
                'Resolving workplace conflicts constructively',
                'Knowing when and how to escalate an issue',
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

          <div className="rounded-lg border border-elec-yellow/20 bg-white/[0.05] p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
              <p className="text-white text-xs leading-relaxed">
                <strong className="text-elec-yellow/90">Safety first:</strong> If you reasonably
                believe the work puts you in serious and imminent danger (such as being asked to
                work live without justification), you are protected under the Employment Rights Act
                1996 (s.44/s.100) if you refuse — your employer must not dismiss or penalise you for
                it. See the Your Rights section for more detail.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <DifficultSituationsTab />
      </HubBody>
    </HubPage>
  );
};

export default DifficultSituationsPage;
