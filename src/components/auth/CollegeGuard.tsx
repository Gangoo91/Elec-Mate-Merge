import { ReactNode } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useMyCollegeContext } from '@/hooks/useMyCollegeContext';
import { CollegeInviteAccept } from '@/components/college/CollegeInviteAccept';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { cn } from '@/lib/utils';

interface CollegeGuardProps {
  children: ReactNode;
}

/**
 * Guards the STAFF hub at /college/*.
 *
 * Staff get `profiles.college_id` (trigger) and pass straight through. A
 * linked APPRENTICE has a college_students row but never a college_id, so
 * before this they landed on the invite-code screen with nowhere to go —
 * they are sent to their own college plan instead. Everyone else sees the
 * staff-code screen.
 */
export default function CollegeGuard({ children }: CollegeGuardProps) {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const { loading, isLearner, isStaff } = useMyCollegeContext();

  if (profile?.college_id) return <>{children}</>;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-elec-dark">
        <Loader2 className="h-10 w-10 animate-spin text-elec-yellow" aria-hidden />
      </div>
    );
  }

  // Staff row exists but the profile hasn't caught up yet (e.g. right after a
  // join) — let them in rather than ask for a code they've already used.
  if (isStaff) return <>{children}</>;

  if (isLearner) return <Navigate to="/apprentice/college-plan" replace />;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-elec-dark p-4">
      <div className="w-full max-w-md space-y-4">
        <div className={cn('rounded-2xl border border-white/[0.10] p-5 sm:p-6', CARD_SURFACE)}>
          <h1 className="text-[17px] font-semibold tracking-tight text-white">College Hub</h1>
          <p className="mt-1.5 text-[13px] leading-relaxed text-white">
            College Hub is for college staff. If your college gave you a staff code, enter it
            here.
          </p>
          <div className="mt-5 border-t border-white/[0.10] pt-5">
            <CollegeInviteAccept
              onSuccess={() => {
                // fetchProfile in the invite component sets college_id; the
                // guard passes on the next render.
              }}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/apprentice/college-plan')}
          className="h-11 w-full rounded-full border border-white/[0.12] bg-white/[0.06] text-[13px] font-medium text-white transition-colors touch-manipulation hover:bg-white/[0.09]"
        >
          I'm an apprentice — join my college
        </button>
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          className="h-11 w-full rounded-full text-[13px] font-medium text-white transition-colors touch-manipulation hover:bg-white/[0.06]"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
