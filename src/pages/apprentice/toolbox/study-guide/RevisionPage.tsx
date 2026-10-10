import { CheckCircle2 } from 'lucide-react';
import RevisionTechniquesTab from '@/components/apprentice/study-tips/RevisionTechniquesTab';
import { GuidePage } from '@/components/apprentice/shared/GuideKit';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

const RevisionPage = () => {
  return (
    <GuidePage
      section="Apprentice · Study"
      area="Study tips"
      title="Learning & Revision"
      backTo="/apprentice/toolbox/study-tips"
    >
      <div
        className={cn(
          '-mx-4 rounded-none border-y border-white/[0.08] sm:mx-0 sm:rounded-2xl sm:border-x px-4 py-4 sm:p-5 space-y-4',
          CARD_SURFACE
        )}
      >
        <h2 className="text-lg font-semibold text-white">Proven Revision Techniques</h2>
        <p className="text-white text-sm leading-relaxed">
          Not all revision methods are equal. Research shows that some techniques are far more
          effective than others for long-term retention. Learn the science-backed methods that will
          help you remember cable sizes, regulation numbers, and testing procedures.
        </p>

        <div className="rounded-md border border-white/[0.08] bg-white/[0.05] p-3 sm:p-4 space-y-2 max-sm:-mx-4 max-sm:rounded-none max-sm:border-x-0">
          <span className="text-[13px] font-semibold text-elec-yellow">Techniques Covered</span>
          <ul className="space-y-1.5">
            {[
              'Spaced repetition — review at increasing intervals',
              'Active recall — test yourself, do not just re-read',
              'Flashcards — for regulations, cable sizes, and formulas',
              'Mind mapping — connect related concepts visually',
              'Practice questions — the closest thing to the real exam',
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

      <RevisionTechniquesTab />
    </GuidePage>
  );
};

export default RevisionPage;
