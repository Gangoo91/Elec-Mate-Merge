import { CheckCircle2 } from 'lucide-react';
import ResourcesTab from '@/components/apprentice/study-tips/ResourcesTab';
import { GuidePage } from '@/components/apprentice/shared/GuideKit';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

const ResourcesPage = () => {
  return (
    <GuidePage
      section="Apprentice · Study"
      area="Study tips"
      title="Study Resources"
      backTo="/apprentice/toolbox/study-tips"
    >
      <div
        className={cn(
          '-mx-4 rounded-none border-y border-white/[0.08] sm:mx-0 sm:rounded-2xl sm:border-x px-4 py-4 sm:p-5 space-y-4',
          CARD_SURFACE
        )}
      >
        <h2 className="text-lg font-semibold text-white">
          Essential Resources for Electrical Training
        </h2>
        <p className="text-white text-sm leading-relaxed">
          The right resources make all the difference. From textbooks and online platforms to
          practice exam sites and video tutorials, here is everything you need to support your
          electrical apprenticeship studies.
        </p>

        <div className="rounded-md border border-white/[0.08] bg-white/[0.05] p-3 sm:p-4 space-y-2 max-sm:-mx-4 max-sm:rounded-none max-sm:border-x-0">
          <span className="text-[13px] font-semibold text-elec-yellow">Resource Categories</span>
          <ul className="space-y-1.5">
            {[
              'Essential textbooks (BS 7671:2018+A4:2026, On-Site Guide, Guidance Notes)',
              'Online learning platforms and practice exams',
              'Video tutorials and YouTube channels',
              'Mobile apps for on-the-go revision',
              'Free and paid resources compared',
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

      <ResourcesTab />
    </GuidePage>
  );
};

export default ResourcesPage;
