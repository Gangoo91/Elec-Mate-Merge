import { CheckCircle2 } from 'lucide-react';
import WorkplaceCommunicationTab from '@/components/apprentice/communication-skills/WorkplaceCommunicationTab';
import { GuidePage } from '@/components/apprentice/shared/GuideKit';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

const WorkplacePage = () => {
  return (
    <GuidePage
      section="Apprentice · Communication"
      area="Communication skills"
      title="Workplace Communication"
      backTo="/apprentice/toolbox/communication-skills"
    >
      {/* Intro Card */}
      <div
        className={cn(
          'border-0 bg-transparent p-0 space-y-4 -mx-4 rounded-none border-y border-white/[0.08] sm:mx-0 sm:rounded-2xl sm:border-x px-4 py-4 sm:p-5',
          CARD_SURFACE
        )}
      >
        <h2 className="text-lg font-semibold text-white">Communicating on Site</h2>
        <p className="text-white text-sm leading-relaxed">
          Good communication on site keeps everyone safe, prevents costly mistakes, and builds your
          professional reputation. Whether you are talking to your supervisor, working alongside
          colleagues, or dealing with clients, how you communicate matters.
        </p>

        <div className="rounded-md border border-white/[0.08] bg-white/[0.05] p-3 sm:p-4 space-y-2 max-sm:-mx-4 max-sm:rounded-none max-sm:border-x-0">
          <span className="text-[13px] font-semibold text-elec-yellow">Key Principles</span>
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
      <WorkplaceCommunicationTab />
    </GuidePage>
  );
};

export default WorkplacePage;
