import { motion } from 'framer-motion';
import { School } from 'lucide-react';
import { CollegeInviteAccept } from '@/components/college/CollegeInviteAccept';

/* ==========================================================================
   JoinCollegeCard — apprentice-side entry to redeem a college invite code.

   This closes the onboarding loop: a college mints a learner code
   (CreateInviteSheet), the apprentice enters it here, accept_college_invite
   creates their roll row + assignment, and their ILP / OTJ / quizzes /
   portfolio start syncing. Shown on the College Hub landing page only when
   the learner has no college link yet.
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
      <div className="rounded-2xl border border-white/[0.08] bg-[hsl(0_0%_11%)] p-5 sm:p-6">
        <div className="flex items-start gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 grid place-items-center shrink-0">
            <School className="h-5 w-5 text-elec-yellow" />
          </div>
          <div className="min-w-0">
            <h2 className="text-[15px] font-semibold text-white">Join your college</h2>
            <p className="text-[12.5px] text-white/60 mt-0.5 leading-relaxed">
              Enter the invite code from your tutor to link your apprenticeship. Your learning
              plan, off-the-job hours, quizzes and portfolio will sync automatically.
            </p>
          </div>
        </div>
        <CollegeInviteAccept onSuccess={() => onJoined?.()} />
      </div>
    </motion.div>
  );
}
