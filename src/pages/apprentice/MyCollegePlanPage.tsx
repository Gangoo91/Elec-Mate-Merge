import { motion } from 'framer-motion';
import useSEO from '@/hooks/useSEO';
import { useMyCollegeOverview } from '@/hooks/useMyCollegeOverview';
import { HubHero } from '@/components/apprentice-hub/college-hub/HubHero';
import { HubHeadlineStrip } from '@/components/apprentice-hub/college-hub/HubHeadlineStrip';
import { HubActionRequired } from '@/components/apprentice-hub/college-hub/HubActionRequired';
import { HubSection } from '@/components/apprentice-hub/college-hub/HubSection';
import { MyCollegePlanCard } from '@/components/apprentice-hub/MyCollegePlanCard';
import { MyEpaBriefCard } from '@/components/apprentice-hub/MyEpaBriefCard';
import { AssignedQuizzesCard } from '@/components/apprentice-hub/AssignedQuizzesCard';
import { MyOtjSubmitCard } from '@/components/apprentice-hub/MyOtjSubmitCard';
import { MyPortfolioSummaryCard } from '@/components/apprentice-hub/MyPortfolioSummaryCard';
import { MyEpaSimulatorCard } from '@/components/apprentice-hub/MyEpaSimulatorCard';
import { MyComplianceCard } from '@/components/apprentice-hub/MyComplianceCard';
import { MyTutorMessagesCard } from '@/components/apprentice-hub/MyTutorMessagesCard';
import { MyActivityFeedCard } from '@/components/apprentice-hub/MyActivityFeedCard';
import { MyTimetableCard } from '@/components/apprentice-hub/MyTimetableCard';
import { MyAcCoverageCard } from '@/components/apprentice-hub/MyAcCoverageCard';
import { MyReflectionCard } from '@/components/apprentice-hub/MyReflectionCard';
import { MyTutorResourcesCard } from '@/components/apprentice-hub/MyTutorResourcesCard';
import { CollegeAiCard } from '@/components/apprentice-hub/CollegeAiCard';
import { MyThisWeekCard } from '@/components/apprentice-hub/MyThisWeekCard';

/* ==========================================================================
   MyCollegePlanPage — /apprentice/college-plan
   The single source of truth for everything college-driven from the
   apprentice's perspective. Editorial dashboard layout:

     1. Hero (name, course, EPA verdict pill)
     2. Headline strip — 4 KPI tiles
     3. Action required strip (only if anything is)
     4. Section groups: Plan · Activities · EPA · Feedback (placeholder)

   Each section anchors so the headline strip + action items can deep-link.
   ========================================================================== */

export default function MyCollegePlanPage() {
  useSEO({
    title: 'My College Hub',
    description: 'Your college plan, quizzes, hours and EPA brief — one place.',
    noindex: true,
  });

  const overview = useMyCollegeOverview();

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-10 pb-24 space-y-6 sm:space-y-8 lg:space-y-10">
        <HubHero
          studentName={overview.studentName}
          courseName={overview.courseName}
          latestVerdict={null}
          latestGrade={null}
        />

        {overview.hasCollegeLink && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
          >
            <HubHeadlineStrip stats={overview.stats} />
          </motion.div>
        )}

        {overview.actionRequired.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.08 }}
          >
            <HubActionRequired items={overview.actionRequired} />
          </motion.div>
        )}

        {overview.hasCollegeLink && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: 0.1 }}
            className="space-y-3 sm:space-y-4"
          >
            <MyThisWeekCard />
            <CollegeAiCard />
            <MyComplianceCard />
            <MyReflectionCard />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="space-y-6 sm:space-y-8"
        >
          <HubSection
            id="this-week"
            eyebrow="Schedule"
            title="What's coming up"
            description="Lessons your cohort has scheduled and ILP targets due in the next two weeks."
          >
            <MyTimetableCard />
          </HubSection>

          <HubSection
            id="plan"
            eyebrow="ILP"
            title="Your Individual Learning Plan"
            description="Goals your tutor has set — tick them off, reply, and acknowledge feedback. Both sides see the same thing."
          >
            <MyCollegePlanCard />
            <MyTutorMessagesCard />
          </HubSection>

          <HubSection
            id="progress"
            eyebrow="Progress"
            title="Your qualification"
            description="Live progress through every assessment criterion in your course."
          >
            <MyAcCoverageCard />
          </HubSection>

          <HubSection
            id="activities"
            eyebrow="Activities"
            title="Quizzes, hours, and portfolio"
            description="Take quizzes, submit work-based hours, and keep your portfolio moving toward sign-off — all act on it here."
          >
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
          </HubSection>

          <HubSection
            id="epa"
            eyebrow="End-point assessment"
            title="EPA brief and simulator"
            description="Read your personalised pre-EPA brief. Practice with timed mocks — your scores feed into your tutor's read of your readiness."
          >
            <MyEpaBriefCard />
            <div id="epa-simulator" className="scroll-mt-6">
              <MyEpaSimulatorCard />
            </div>
          </HubSection>

          <HubSection
            id="activity"
            eyebrow="Recent"
            title="What's happened on your record"
            description="Live feed of comments, sign-offs, and observations from your college team."
          >
            <MyActivityFeedCard />
          </HubSection>
        </motion.div>
      </div>
    </div>
  );
}
