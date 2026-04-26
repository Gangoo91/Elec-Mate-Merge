import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import useSEO from '@/hooks/useSEO';
import { MyCollegePlanCard } from '@/components/apprentice-hub/MyCollegePlanCard';
import { MyEpaBriefCard } from '@/components/apprentice-hub/MyEpaBriefCard';
import { AssignedQuizzesCard } from '@/components/apprentice-hub/AssignedQuizzesCard';

/* ==========================================================================
   MyCollegePlanPage — /apprentice/college-plan
   Full-page view of the apprentice's current Individual Learning Plan
   from their college. Tutor sets goals, apprentice ticks them off and
   replies — all realtime.
   ========================================================================== */

export default function MyCollegePlanPage() {
  useSEO({
    title: 'My College Plan',
    description: 'Goals from your tutor — tick them off and reply.',
    noindex: true,
  });
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 pb-24">
        <motion.button
          onClick={() => navigate(-1)}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-1 text-[12.5px] font-medium text-white/85 hover:text-white transition-colors touch-manipulation"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-4 lg:mt-6"
        >
          <div className="text-[10px] lg:text-[11px] font-medium uppercase tracking-[0.18em] text-purple-300/85">
            From your college
          </div>
          <h1 className="mt-1.5 text-2xl sm:text-[32px] lg:text-[40px] font-semibold text-white tracking-tight leading-[1.05]">
            My college hub
          </h1>
          <p className="mt-3 text-[13px] lg:text-[14px] text-white/85 leading-relaxed max-w-2xl">
            Everything your tutor and assessor have sent — quizzes, your learning plan,
            and your personalised pre-EPA brief. Take action here and your college sees it
            instantly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.05 }}
          className="mt-6 lg:mt-8 space-y-4"
        >
          <AssignedQuizzesCard />
          <MyEpaBriefCard />
          <MyCollegePlanCard />
        </motion.div>
      </div>
    </div>
  );
}
