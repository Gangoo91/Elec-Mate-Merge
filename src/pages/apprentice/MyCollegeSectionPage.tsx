import type React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import { SubPageShell } from '@/components/apprentice-hub/college-hub/SubPageShell';
import { MyTodayFocusCard } from '@/components/apprentice-hub/MyTodayFocusCard';
import { MyThisWeekCard } from '@/components/apprentice-hub/MyThisWeekCard';
import { MyTimetableCard } from '@/components/apprentice-hub/MyTimetableCard';
import { MyTaughtLessonsCard } from '@/components/apprentice-hub/MyTaughtLessonsCard';
import { MyAttendanceCard } from '@/components/apprentice-hub/MyAttendanceCard';
import { MyCollegePlanCard } from '@/components/apprentice-hub/MyCollegePlanCard';
import { MyTutorMessagesCard } from '@/components/apprentice-hub/MyTutorMessagesCard';
import { MyAssessmentCard } from '@/components/apprentice-hub/MyAssessmentCard';
import { AssignedQuizzesCard } from '@/components/apprentice-hub/AssignedQuizzesCard';
import { MyOtjSubmitCard } from '@/components/apprentice-hub/MyOtjSubmitCard';
import { MyPortfolioLinkCard } from '@/components/apprentice-hub/MyPortfolioLinkCard';
import { MyTutorResourcesCard } from '@/components/apprentice-hub/MyTutorResourcesCard';
import { MyEpaBriefCard } from '@/components/apprentice-hub/MyEpaBriefCard';
import { MyGatewayCard } from '@/components/apprentice-hub/MyGatewayCard';
import { FORECAST_HELP_NOTE_LEARNER } from '@/lib/epa/gatewayForecast';
import { MyEpaSimulatorCard } from '@/components/apprentice-hub/MyEpaSimulatorCard';
import { MyVoiceSurveyCard } from '@/components/apprentice-hub/MyVoiceSurveyCard';
import { MyReflectionCard } from '@/components/apprentice-hub/MyReflectionCard';
import { MyComplianceCard } from '@/components/apprentice-hub/MyComplianceCard';
import { MyActivityFeedCard } from '@/components/apprentice-hub/MyActivityFeedCard';
import { CollegeAiCard } from '@/components/apprentice-hub/CollegeAiCard';
import { NoCollegeSectionPanel } from '@/components/apprentice-hub/college-hub/NoCollegeSectionPanel';
import { useMyCollegeContext } from '@/hooks/useMyCollegeContext';
import type { PageHelpContent } from '@/components/hub/PageHelp';

/* ==========================================================================
   MyCollegeSectionPage — /apprentice/college/:section

   Parameterised sub-page reached from the College Hub grid. Each section
   renders a focused set of cards (typically 1-4) instead of the giant
   one-scroll dashboard the hub used to be. Apprentices now drill in from
   8 hub cards to focused pages, not scroll 19 cards on phone.

   New section? Add a case below. Same lazy-import chunk for all of them
   — the bottleneck is the cards themselves, not the wrapper.
   ========================================================================== */

/**
 * One column of a two-column section. Cards stack inside it, so a short card
 * never leaves a gap beside a tall one; the two columns are weighted to end
 * at about the same height on desktop. One column on a phone.
 */
function Col({ children }: { children: React.ReactNode }) {
  return <div className="min-w-0 space-y-4 lg:space-y-5">{children}</div>;
}

type Section =
  'today' | 'plan' | 'progress' | 'activities' | 'epa' | 'voice' | 'compliance' | 'activity';

interface SectionDef {
  eyebrow: string;
  title: string;
  description: string;
  /** `lead` gives the first card two thirds — see SubPageShell. */
  layout?: 'even' | 'lead';
  render: () => JSX.Element;
}

const SECTIONS: Record<Section, SectionDef> = {
  today: {
    eyebrow: 'Today',
    title: 'Your day at college',
    description:
      "Today's focus, this week's lessons, your timetable, what was taught in class and your attendance record, all in one place.",
    render: () => (
      <>
        <Col>
          <MyTodayFocusCard />
          <MyThisWeekCard />
        </Col>
        <Col>
          <MyTimetableCard />
          {/* ELE-1890: what was taught to the class, and what to catch up on. */}
          <MyTaughtLessonsCard />
          <MyAttendanceCard />
        </Col>
      </>
    ),
  },
  plan: {
    eyebrow: 'Learning plan',
    title: 'Learning plan & messages',
    description:
      'Goals your tutor has set, your messages back, and the comment thread between you.',
    // The plan is the page; messages are the aside.
    layout: 'lead',
    render: () => (
      <>
        <MyCollegePlanCard />
        <MyTutorMessagesCard />
      </>
    ),
  },
  progress: {
    eyebrow: 'Progress & assessment',
    title: 'Your qualification',
    description:
      'Every criterion on your course, where it stands and what your assessor said. Ask a supervisor to witness your work, or invite an assessor. Your record stays yours.',
    render: () => <MyAssessmentCard />,
  },
  activities: {
    eyebrow: 'Activities',
    title: 'Quizzes, hours & portfolio',
    description:
      'Take quizzes, submit off-the-job hours, and keep your portfolio moving toward sign-off.',
    render: () => (
      <>
        <Col>
          <AssignedQuizzesCard />
          <div id="otj" className="scroll-mt-6">
            <MyOtjSubmitCard />
          </div>
          <div id="resources" className="scroll-mt-6">
            <MyTutorResourcesCard />
          </div>
        </Col>
        <Col>
          {/* Funding evidence sits with the hours it is mostly made of. The
            /college/compliance section still exists for a direct link; this
            is how a learner finds it from the hub, which previously had no
            tile pointing at it at all. */}
          <div id="compliance" className="scroll-mt-6">
            <MyComplianceCard />
          </div>
          {/* ELE-1892: links to the one portfolio home; submitting (with the
            signed declaration) happens on the evidence itself. */}
          <div id="portfolio" className="scroll-mt-6">
            <MyPortfolioLinkCard />
          </div>
        </Col>
      </>
    ),
  },
  epa: {
    eyebrow: 'End-point assessment',
    title: 'EPA brief & simulator',
    description:
      "Read your personalised pre-EPA brief and practice with timed mocks. Your scores feed into your tutor's read of your readiness.",
    render: () => (
      <>
        <Col>
          <MyGatewayCard />
        </Col>
        <Col>
          <MyEpaBriefCard />
          <div id="epa-simulator" className="scroll-mt-6">
            <MyEpaSimulatorCard />
          </div>
        </Col>
      </>
    ),
  },
  voice: {
    eyebrow: 'Your voice',
    title: 'Surveys & reflection',
    description:
      "Tell the college how it's going. Your input shapes what your tutor focuses on next.",
    render: () => (
      <>
        <MyVoiceSurveyCard />
        <MyReflectionCard />
      </>
    ),
  },
  compliance: {
    eyebrow: 'Compliance',
    title: 'Funding & compliance evidence',
    description:
      'What the funding body needs from you and where you stand against it. Tutor can see the same thing.',
    render: () => <MyComplianceCard />,
  },
  activity: {
    eyebrow: 'Activity',
    title: "What's happened on your record",
    description:
      'Live feed of comments, sign-offs, observations and quiz results from your college team.',
    render: () => (
      <>
        <MyActivityFeedCard />
        <CollegeAiCard />
      </>
    ),
  },
};

const SECTION_HELP: PageHelpContent = {
  id: 'apprentice-college-section',
  title: 'Your college area',
  what: 'One part of your college area: lessons, your learning plan, quizzes and hours, assessment, your end-point assessment, surveys or your record. Everything here is about you; your college sees the same.',
  steps: [
    {
      title: 'Do what is waiting',
      body: 'Anything your tutor has set or is waiting on is at the top. Tap it to deal with it.',
    },
    {
      title: 'Keep your evidence moving',
      body: 'Your portfolio, witness statements and assessor decisions live under Progress and assessment.',
    },
    {
      title: 'No college yet?',
      body: 'Your portfolio, hours and study all work without one. Join with your college or cohort code when you have it, or invite an assessor yourself.',
    },
  ],
  notes: [
    {
      title: 'Who sees what',
      body: 'Your college tutor and assessor see your portfolio, hours and quiz results. An assessor you invite sees your evidence and can record decisions until you remove them.',
    },
    FORECAST_HELP_NOTE_LEARNER,
  ],
};

/** No college: sections run by a college say so; the rest drop tutor-only cards. */
const NO_COLLEGE_ALT: Partial<
  Record<Section, { description: string; render?: () => JSX.Element }>
> = {
  today: { description: 'Your day at college: lessons, timetable and attendance.' },
  plan: { description: 'Goals you agree with your college tutor, and messages between you.' },
  voice: { description: 'Surveys and reflections for your college.' },
  compliance: { description: 'What your college’s funding body needs from you.' },
  activity: {
    description: 'Comments, sign-offs, observations and quiz results from your college team.',
  },
  activities: {
    description:
      'Log your off-the-job hours and keep your portfolio moving. Quizzes from a tutor appear here once you join a college.',
    render: () => (
      <>
        <div id="otj" className="scroll-mt-6">
          <MyOtjSubmitCard />
        </div>
        <div id="portfolio" className="scroll-mt-6">
          <MyPortfolioLinkCard />
        </div>
      </>
    ),
  },
  epa: {
    description:
      'Practise for your end-point assessment with timed mocks marked against your course.',
    render: () => (
      <div id="epa-simulator" className="scroll-mt-6">
        <MyEpaSimulatorCard />
      </div>
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

  // ELE-1897: a learner with no college gets an honest page, never empty
  // cards or promises about a tutor they do not have.
  const { learner, loading } = useMyCollegeContext();
  const noCollege = !loading && !learner;

  if (!def) {
    return <Navigate to="/apprentice/college-plan" replace />;
  }

  // Wait for who the learner is before mounting college cards: a learner
  // without a college would otherwise fire their college reads (403s).
  if (loading) {
    return (
      <SubPageShell
        eyebrow={def.eyebrow}
        title={def.title}
        description={def.description}
        help={SECTION_HELP}
      >
        <div className="h-40 animate-pulse rounded-3xl bg-white/[0.04]" />
      </SubPageShell>
    );
  }

  if (noCollege && section && NO_COLLEGE_ALT[section as Section]) {
    const alt = NO_COLLEGE_ALT[section as Section]!;
    return (
      <SubPageShell
        eyebrow={def.eyebrow}
        title={def.title}
        description={alt.description}
        help={SECTION_HELP}
      >
        {alt.render ? alt.render() : <NoCollegeSectionPanel section={section} />}
      </SubPageShell>
    );
  }

  return (
    <SubPageShell
      eyebrow={def.eyebrow}
      title={def.title}
      description={def.description}
      layout={def.layout}
      help={SECTION_HELP}
    >
      {def.render()}
    </SubPageShell>
  );
}
