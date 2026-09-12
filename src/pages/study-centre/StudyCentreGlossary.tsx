/**
 * Study Centre — glossary (all courses)
 *
 * The app-wide version. Every course links here; MOET's own page renders the
 * same component filtered to its course key, so the definitions cannot drift
 * apart between courses.
 */

import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { StudyPage, ReadingProgress, TLDR, SectionRule } from '@/components/study-centre/learning';
import { GlossaryView, glossaryTermCount } from '@/components/study-centre/GlossaryView';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Electrical Glossary - Study Centre';
const DESCRIPTION =
  'Every abbreviation used across the Elec-Mate study centre, defined in plain English — testing and measurement, protection and earthing, legislation, maintenance and reliability, control and instrumentation, and assessment.';

const StudyCentreGlossary = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  useSEO(TITLE, DESCRIPTION);
  // `?course=` narrows the glossary to one course's terms, so every course can
  // link here rather than each carrying its own copy of the definitions.
  const course = params.get('course') ?? undefined;
  const total = glossaryTermCount(course);

  return (
    <HubPage ground="reading">
      <HubMasthead section="Study centre · Reference" title="Glossary" backTo="/study-centre" />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage measure="76rem" wide="92rem">
          <GlossaryView
            course={course}
            intro={
              <>
                <p className="max-w-[52rem] text-[13px] leading-relaxed text-white">
                  Every abbreviation the study centre uses, in one place. Each entry says what the
                  thing is and why it matters on the job, not just what the letters stand for.
                </p>
                <TLDR
                  points={[
                    `${total} terms, grouped by where you meet them — testing, protection, legislation, reliability, control, and assessment.`,
                    'Shared across every course, so a term means the same thing in HNC as it does in MOET.',
                    'Search filters every group at once. Try "Zs", "PEN", "P-F" or "loop".',
                    'Regulatory references are checked against BS 7671:2018+A4:2026, GN3 and the On-Site Guide.',
                  ]}
                />
              </>
            }
          />

          <SectionRule />

          <button
            onClick={() => navigate('/study-centre')}
            className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
          >
            <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
              <ChevronLeft className="h-3 w-3" /> Back
            </div>
            <div className="mt-1 truncate text-[14px] font-semibold text-white">Study centre</div>
          </button>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default StudyCentreGlossary;
