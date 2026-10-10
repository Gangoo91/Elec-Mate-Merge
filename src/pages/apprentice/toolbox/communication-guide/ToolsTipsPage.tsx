import { CheckCircle2 } from 'lucide-react';
import InteractiveToolsTab from '@/components/apprentice/communication-skills/InteractiveToolsTab';
import { GuidePage } from '@/components/apprentice/shared/GuideKit';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

const ToolsTipsPage = () => {
  return (
    <GuidePage
      section="Apprentice · Communication"
      area="Communication skills"
      title="Tools & Tips"
      backTo="/apprentice/toolbox/communication-skills"
    >
      {/* Intro Card */}
      <div
        className={cn(
          'border-0 bg-transparent p-0 space-y-4 -mx-4 rounded-none border-y border-white/[0.08] sm:mx-0 sm:rounded-2xl sm:border-x px-4 py-4 sm:p-5',
          CARD_SURFACE
        )}
      >
        <h2 className="text-lg font-semibold text-white">Communication Frameworks & Practice</h2>
        <p className="text-white text-sm leading-relaxed">
          Use these proven frameworks and practice scenarios to build your communication confidence.
          The STAR method, CLEAR communication model, and real-world practice scenarios will help
          you handle any situation on site.
        </p>

        <div className="rounded-md border border-white/[0.08] bg-white/[0.05] p-3 sm:p-4 space-y-2 max-sm:-mx-4 max-sm:rounded-none max-sm:border-x-0">
          <span className="text-[13px] font-semibold text-elec-yellow">Included</span>
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
                className="flex items-start gap-2 text-[14px] text-white leading-relaxed"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <InteractiveToolsTab />
    </GuidePage>
  );
};

export default ToolsTipsPage;
