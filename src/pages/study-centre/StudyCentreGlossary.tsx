/**
 * Study Centre — glossary (all courses)
 *
 * The app-wide version. Every course links here; MOET's own page renders the
 * same component filtered to its course key, so the definitions cannot drift
 * apart between courses.
 */

import { useSearchParams } from 'react-router-dom';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { StudyPage, ReadingProgress } from '@/components/study-centre/learning';
import { GlossaryView } from '@/components/study-centre/GlossaryView';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Electrical Glossary - Study Centre';
const DESCRIPTION =
  'Every abbreviation used across the Elec-Mate study centre, defined in plain English — testing and measurement, protection and earthing, legislation, maintenance and reliability, control and instrumentation, and assessment.';

const StudyCentreGlossary = () => {
  const [params] = useSearchParams();
  useSEO(TITLE, DESCRIPTION);
  // `?course=` narrows the glossary to one course's terms, so every course can
  // link here rather than each carrying its own copy of the definitions.
  const course = params.get('course') ?? undefined;

  return (
    <HubPage ground="reading">
      <HubMasthead section="Study Centre" title="Glossary" backTo="/study-centre" />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage measure="76rem" wide="92rem">
          <GlossaryView
            course={course}
            eyebrow="Study Centre · Reference"
            intro="Every abbreviation the Study Centre uses, in plain English: what it is and why it matters on the job, not just what the letters stand for."
          />
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default StudyCentreGlossary;
