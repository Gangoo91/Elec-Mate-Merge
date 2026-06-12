import { useParams, Navigate } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import { SubPageShell } from '@/components/apprentice-hub/college-hub/SubPageShell';
import { MyTodayFocusCard } from '@/components/apprentice-hub/MyTodayFocusCard';
import { MyThisWeekCard } from '@/components/apprentice-hub/MyThisWeekCard';
import { MyTimetableCard } from '@/components/apprentice-hub/MyTimetableCard';
import { MyAttendanceCard } from '@/components/apprentice-hub/MyAttendanceCard';
import { MyCollegePlanCard } from '@/components/apprentice-hub/MyCollegePlanCard';
import { MyTutorMessagesCard } from '@/components/apprentice-hub/MyTutorMessagesCard';
import { MyAcCoverageCard } from '@/components/apprentice-hub/MyAcCoverageCard';
import { AssignedQuizzesCard } from '@/components/apprentice-hub/AssignedQuizzesCard';
import { MyOtjSubmitCard } from '@/components/apprentice-hub/MyOtjSubmitCard';
import { MyPortfolioSummaryCard } from '@/components/apprentice-hub/MyPortfolioSummaryCard';
import { MyTutorResourcesCard } from '@/components/apprentice-hub/MyTutorResourcesCard';
import { MyEpaBriefCard } from '@/components/apprentice-hub/MyEpaBriefCard';
import { MyEpaSimulatorCard } from '@/components/apprentice-hub/MyEpaSimulatorCard';
import { MyVoiceSurveyCard } from '@/components/apprentice-hub/MyVoiceSurveyCard';
import { MyReflectionCard } from '@/components/apprentice-hub/MyReflectionCard';
import { MyComplianceCard } from '@/components/apprentice-hub/MyComplianceCard';
import { MyActivityFeedCard } from '@/components/apprentice-hub/MyActivityFeedCard';
import { CollegeAiCard } from '@/components/apprentice-hub/CollegeAiCard';

/* ==========================================================================
   MyCollegeSectionPage — /apprentice/college/:section

   Parameterised sub-page reached from the College Hub grid. Each section
   renders a focused set of cards (typically 1-4) instead of the giant
   one-scroll dashboard the hub used to be. Apprentices now drill in from
   8 hub cards to focused pages, not scroll 19 cards on phone.

   New section? Add a case below. Same lazy-import chunk for all of them
   — the bottleneck is the cards themselves, not the wrapper.
   ========================================================================== */

type Section =
  | 'today'
  | 'plan'
  | 'progress'
  | 'activities'
  | 'epa'
  | 'voice'
  | 'compliance'
  | 'activity';

interface SectionDef {
  eyebrow: string;
  title: string;
  description: string;
  render: () => JSX.Element;
}

const SECTIONS: Record<Section, SectionDef> = {
  today: {
    eyebrow: 'Today',
    title: 'Your day at college',
    description:
      "Today's focus, this week's lessons, your timetable and your attendance record — everything in one place.",
    render: () => (
      <>
        <MyTodayFocusCard />
        <MyThisWeekCard />
        <MyTimetableCard />
        <MyAttendanceCard />
      </>
    ),
  },
  plan: {
    eyebrow: 'Your ILP',
    title: 'Learning plan & messages',
    description:
      'Goals your tutor has set, your messages back, and the comment thread between you.',
    render: () => (
      <>
        <MyCollegePlanCard />
        <MyTutorMessagesCard />
      </>
    ),
  },
  progress: {
    eyebrow: 'Progress',
    title: 'Your qualification',
    description: 'Live progress through every assessment criterion on your course.',
    render: () => <MyAcCoverageCard />,
  },
  activities: {
    eyebrow: 'Activities',
    title: 'Quizzes, hours & portfolio',
    description:
      'Take quizzes, submit off-the-job hours, and keep your portfolio moving toward sign-off.',
    render: () => (
      <>
        <AssignedQuizzesCard />
        <div id="otj" className="scroll-mt-6">
          <MyOtjSubmitCard />
        </div>
        <div id="portfolio" className="scroll-mt-6">
          <MyPortfolioSummaryCard />
        </div>
        <div id="resources" className="scroll-mt-6">
          <MyTutorResourcesCard />
        </div>
      </>
    ),
  },
  epa: {
    eyebrow: 'End-point assessment',
    title: 'EPA brief & simulator',
    description:
      'Read your personalised pre-EPA brief and practice with timed mocks. Your scores feed into your tutor\'s read of your readiness.',
    render: () => (
      <>
        <MyEpaBriefCard />
        <div id="epa-simulator" className="scroll-mt-6">
          <MyEpaSimulatorCard />
        </div>
      </>
    ),
  },
  voice: {
    eyebrow: 'Your voice',
    title: 'Surveys & reflection',
    description: 'Tell the college how it\'s going. Your input shapes what your tutor focuses on next.',
    render: () => (
      <>
        <MyVoiceSurveyCard />
        <MyReflectionCard />
      </>
    ),
  },
  compliance: {
    eyebrow: 'Compliance',
    title: 'Funding & ESFA evidence',
    description:
      'What the funding body needs from you and where you stand against it. Tutor can see the same thing.',
    render: () => <MyComplianceCard />,
  },
  activity: {
    eyebrow: 'Activity',
    title: "What's happened on your record",
    description: 'Live feed of comments, sign-offs and observations from your college team.',
    render: () => (
      <>
        <MyActivityFeedCard />
        <CollegeAiCard />
      </>
    ),
  },
};

export default function MyCollegeSectionPage() {
  const { section } = useParams<{ section: string }>();
  const def = section ? SECTIONS[section as Section] : undefined;

  useSEO({
    title: def ? `${def.title} · My College Hub` : 'My College Hub',
    description: def?.description,
    noindex: true,
  });

  if (!def) {
    return <Navigate to="/apprentice/college-plan" replace />;
  }

  return (
    <SubPageShell eyebrow={def.eyebrow} title={def.title} description={def.description}>
      {def.render()}
    </SubPageShell>
  );
}
