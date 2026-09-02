import { CheckCircle2 } from 'lucide-react';
import StudyFundamentalsTab from '@/components/apprentice/study-tips/StudyFundamentalsTab';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

const FundamentalsPage = () => {
  return (
    <HubPage>
      <HubMasthead
        section="Apprentice · Study"
        title="Study Fundamentals"
        backTo="/apprentice/toolbox/study-tips"
      />
      <HubBody>
        <div
          className={cn(
            '-mx-4 rounded-none border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x px-4 py-4 sm:p-5 space-y-4',
            CARD_SURFACE
          )}
        >
          <h2 className="text-lg font-semibold text-white">Building Strong Study Habits</h2>
          <p className="text-white text-sm leading-relaxed">
            Success in electrical training starts with good study habits. Whether you are preparing
            for the 18th Edition exam, the AM2S end-point assessment, or college assessments, these
            fundamentals will help you study more effectively and retain information longer.
          </p>

          <div className="rounded-md border border-elec-yellow/20 bg-white/[0.05] p-3 sm:p-4 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
              Key Principles
            </span>
            <ul className="space-y-1.5">
              {[
                '30 minutes daily beats a 3-hour weekend cram',
                'Active recall is more effective than re-reading',
                'Study in short, focused blocks (25 min on, 5 min off)',
                'Mix up topics to strengthen connections',
                'Test yourself regularly with practice questions',
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

        <StudyFundamentalsTab />
      </HubBody>
    </HubPage>
  );
};

export default FundamentalsPage;
