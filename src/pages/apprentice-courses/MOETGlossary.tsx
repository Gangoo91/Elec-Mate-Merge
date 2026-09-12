/**
 * MOET · Glossary
 *
 * A thin wrapper over the shared Study Centre glossary, filtered to MOET. The
 * definitions live in `src/data/study-centre/glossary.ts` and are shared with
 * every other course — a term-overlap count across 11 courses found 21 of 26
 * core terms in five or more of them, so keeping a separate copy per course
 * would only create chances for them to drift apart.
 *
 * MOET-specific entries (ST1426, KSB, EPA, gateway, RCM, P-F interval) are
 * tagged with `courses` in the data file and appear only here.
 *
 * Standard: ST1426 Engineering maintenance technician – single discipline,
 * electrical option.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { StudyPage, ReadingProgress, TLDR, SectionRule } from '@/components/study-centre/learning';
import { GlossaryView, glossaryTermCount } from '@/components/study-centre/GlossaryView';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Glossary - MOET';
const DESCRIPTION =
  'Every abbreviation and technical term used across the MOET course, defined in plain English for maintenance engineering technicians — testing, protection, legislation, reliability, control and assessment.';

const MOETGlossary = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);
  const total = glossaryTermCount('moet');

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="MOET · Reference"
        title="Glossary"
        backTo="/study-centre/apprentice/moet"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        {/* A glossary is scanned, not read line by line, so it takes a wider
            measure than a study page: 76rem of content with a 92rem bleed. */}
        <StudyPage measure="76rem" wide="92rem">
          <GlossaryView
            course="moet"
            intro={
              <>
                <p className="max-w-[52rem] text-[13px] leading-relaxed text-white">
                  Every abbreviation this course uses, in one place. Each entry says what the thing
                  is and why it matters on the job, not just what the letters stand for.
                </p>
                <TLDR
                  points={[
                    `${total} terms, grouped by where you meet them — testing, protection, legislation, reliability, control, and assessment.`,
                    'Each entry names the section that covers it in full, so you can go straight there.',
                    'Shared with every other course, so a term means the same thing wherever you meet it.',
                    'Search filters every group at once. Try "Zs", "PEN", "P-F" or "loop".',
                  ]}
                />
              </>
            }
          />

          <SectionRule />

          <button
            onClick={() => navigate('/study-centre/apprentice/moet')}
            className="touch-manipulation rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_16%)] p-4 text-left transition-colors hover:bg-[hsl(0_0%_19%)] active:scale-[0.99]"
          >
            <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
              <ChevronLeft className="h-3 w-3" /> Back to course
            </div>
            <div className="mt-1 truncate text-[14px] font-semibold text-white">
              Maintenance and operations engineering technician
            </div>
          </button>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETGlossary;
