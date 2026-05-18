import { motion } from 'framer-motion';
import useSEO from '@/hooks/useSEO';
import { useMyCollegeOverview } from '@/hooks/useMyCollegeOverview';
import { HubHero } from '@/components/apprentice-hub/college-hub/HubHero';
import { HubHeadlineStrip } from '@/components/apprentice-hub/college-hub/HubHeadlineStrip';
import { HubActionRequired } from '@/components/apprentice-hub/college-hub/HubActionRequired';
import { HubGrid } from '@/components/apprentice-hub/college-hub/HubGrid';

/* ==========================================================================
   MyCollegePlanPage — /apprentice/college-plan

   Apprentice College Hub LANDING page. Until May 2026 this page rendered
   19+ cards stacked on a single scroll — fine on desktop, brutal on
   phone. It's now a hub-and-spoke shell:

     1. Hero (name + course + EPA-ish status)
     2. Headline KPI strip (verified hours, open goals, quizzes, portfolio)
     3. Action required strip (only when there's something to act on)
     4. Hub grid — 8 nav cards, each routing to a focused sub-page at
        /apprentice/college/<section>

   The detail content (ILP, OTJ, quizzes, EPA, etc.) now lives on those
   sub-pages, not here. See MyCollegeSectionPage for the per-section
   composition.
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-10 pb-24 space-y-5 sm:space-y-6">
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
          >
            <HubGrid stats={overview.stats} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
