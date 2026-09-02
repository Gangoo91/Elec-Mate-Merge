import { CheckCircle2 } from 'lucide-react';
import ProfessionalSkillsTab from '@/components/apprentice/communication-skills/ProfessionalSkillsTab';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

const ProfessionalSkillsPage = () => {
  return (
    <HubPage>
      <HubMasthead
        section="Apprentice · Communication"
        title="Professional Skills"
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
          <h2 className="text-lg font-semibold text-white">Building Professional Communication</h2>
          <p className="text-white text-sm leading-relaxed">
            Professional communication goes beyond just talking. It includes active listening, body
            language, written communication, and knowing how to express yourself clearly. These
            skills set top electricians apart and are essential for career progression.
          </p>

          <div className="rounded-md border border-elec-yellow/20 bg-white/[0.05] p-3 sm:p-4 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
              Core Skills Covered
            </span>
            <ul className="space-y-1.5">
              {[
                'Active listening — hear what is actually being said',
                'Clear speaking — get your point across effectively',
                'Body language — non-verbal communication matters',
                'Written communication — emails, reports, and site notes',
                'Professional language — choosing the right words',
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
        <ProfessionalSkillsTab />
      </HubBody>
    </HubPage>
  );
};

export default ProfessionalSkillsPage;
