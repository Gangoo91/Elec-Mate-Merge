import { CheckCircle2 } from 'lucide-react';
import RevisionTechniquesTab from '@/components/apprentice/study-tips/RevisionTechniquesTab';
import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';

const RevisionPage = () => {
  return (
    <HubPage>
      <HubMasthead
        section="Apprentice · Study"
        title="Learning & Revision"
        backTo="/apprentice/toolbox/study-tips"
      />
      <HubBody>
        <div className="sm:rounded-xl sm:border sm:border-white/[0.06] sm:bg-[hsl(0_0%_10%)] sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-white">Proven Revision Techniques</h2>
          <p className="text-white text-sm leading-relaxed">
            Not all revision methods are equal. Research shows that some techniques are far more
            effective than others for long-term retention. Learn the science-backed methods that
            will help you remember cable sizes, regulation numbers, and testing procedures.
          </p>

          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 sm:p-4 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
              Techniques Covered
            </span>
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
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <RevisionTechniquesTab />
      </HubBody>
    </HubPage>
  );
};

export default RevisionPage;
