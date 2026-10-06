import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { motion } from 'framer-motion';
import { School } from 'lucide-react';
import { CollegeInviteAccept } from '@/components/college/CollegeInviteAccept';
import { invalidateMyCollegeContext } from '@/hooks/useMyCollegeContext';

/* ==========================================================================
   JoinCollegeCard — apprentice-side entry to redeem a college JOIN code.

   This closes the onboarding loop: a tutor mints a cohort code
   (CreateInviteSheet), the apprentice enters it here, accept_college_invite
   enrols them into the cohort, and their plan / OTJ / quizzes / portfolio
   start syncing. Shown on the college-plan page only when the learner has
   no college link yet.

   The join code is NOT the college discount code used at sign-up — nothing
   connects the two, so the copy says so.
   ========================================================================== */

interface Props {
  /** Called after a successful join so the parent can re-query enrolment. */
  onJoined?: () => void;
}

export function JoinCollegeCard({ onJoined }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.05 }}
    >
      <div className={cn('rounded-2xl border border-white/[0.08] p-5 sm:p-6', CARD_SURFACE)}>
        <div className="mb-5 flex items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-elec-yellow/30 bg-white/[0.06]">
            <School className="h-5 w-5 text-elec-yellow" />
          </div>
          <div className="min-w-0">
            <h2 className="text-[15px] font-semibold text-white">Join your college</h2>
            <p className="mt-0.5 text-[12.5px] leading-relaxed text-white">
              Joining links you to your tutor: your learning plan, quizzes, off-the-job hours
              sign-off, timetable and portfolio feedback all come from your college.
            </p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-white">
              You need the 8-character join code from your tutor. It is a different code from any
              discount code you used at sign-up.
            </p>
          </div>
        </div>
        <CollegeInviteAccept
          onSuccess={() => {
            invalidateMyCollegeContext();
            onJoined?.();
          }}
        />
      </div>
    </motion.div>
  );
}
