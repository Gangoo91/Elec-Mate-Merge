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

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { StudyPage, ReadingProgress } from '@/components/study-centre/learning';
import { GlossaryView } from '@/components/study-centre/GlossaryView';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Glossary - MOET';
const DESCRIPTION =
  'Every abbreviation and technical term used across the MOET course, defined in plain English for maintenance engineering technicians — testing, protection, legislation, reliability, control and assessment.';

const MOETGlossary = () => {
  useSEO(TITLE, DESCRIPTION);

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
            eyebrow="MOET · Reference"
            intro="Every abbreviation this course uses, in plain English: what it is, why it matters on the job, and the section that covers it in full."
          />
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default MOETGlossary;
