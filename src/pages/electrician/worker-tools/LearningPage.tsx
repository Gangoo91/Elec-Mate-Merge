/**
 * Worker Tools › Learning (ELE-1834): Study Centre courses the firm asked this
 * worker to do. The "course assigned" notification deep-links here with
 * ?assignment=<id>, which rings that course.
 */
import { useSearchParams } from 'react-router-dom';
import { WorkerToolPage } from './WorkerToolPage';
import { AssignedCoursesCard } from '@/components/study-centre/AssignedCoursesCard';
import type { PageHelpContent } from '@/components/hub/PageHelp';

const WT_LEARNING_HELP: PageHelpContent = {
  id: 'worker-tools-learning',
  title: 'Courses from your firm',
  what: 'Study Centre courses your firm has asked you to do, with the date they need them by.',
  steps: [
    {
      title: 'Start the course',
      body: 'Tap Start course. It opens in the Study Centre, where you work through it at your own pace.',
    },
    {
      title: 'Pass the final paper',
      body: 'Each course ends with a final mock paper. Tap Take the final paper when you are ready. Passing it is what marks the course done.',
    },
    {
      title: 'Your firm sees it',
      body: "They're told straight away, and if you have an Elec-ID it's added there as a Study Centre course. Nothing to send.",
    },
  ],
  notes: [
    {
      title: 'Is it the qualification?',
      body: 'No. A Study Centre course is learning (CPD). It does not replace a certificate from an awarding body, such as the City & Guilds 2382.',
    },
  ],
};

export default function LearningPage() {
  const [params] = useSearchParams();
  return (
    <WorkerToolPage
      eyebrow="Learning"
      title="Courses from your firm"
      description="What your firm has asked you to do in the Study Centre, and by when."
      maxWidth="5xl"
      help={WT_LEARNING_HELP}
    >
      <AssignedCoursesCard variant="full" highlightId={params.get('assignment')} />
    </WorkerToolPage>
  );
}
