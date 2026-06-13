/* ==========================================================================
   PendingCollegeInviteRedeemer — global, render-null effect.

   Mounted once at the router root. When a user becomes authenticated AND a
   college invite code is stashed (from CollegeJoinPage while logged out), it
   redeems the code and routes them into their hub — so a join link survives
   the whole signup → checkout → onboarding journey without editing any of
   those pages.

   It deliberately does NOT fire on auth/checkout/onboarding routes, so it can't
   yank a new user out of the paywall mid-flow. It waits until they land on a
   normal app page.
   ========================================================================== */

import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { storageGetSync, storageRemoveSync } from '@/utils/storage';
import {
  PENDING_INVITE_KEY,
  isTerminalInviteError,
  redeemCollegeInvite,
} from '@/lib/collegeInvite';

// Don't redeem mid-onboarding — wait until the user is fully landed in the app.
const SKIP_PREFIXES = [
  '/auth',
  '/checkout',
  '/payment',
  '/subscriptions',
  '/complete-profile',
  '/walkthrough',
  '/college/join',
];

export default function PendingCollegeInviteRedeemer() {
  const { user, fetchProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const attemptedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const path = location.pathname;
    if (SKIP_PREFIXES.some((p) => path.startsWith(p))) return;

    const code = storageGetSync(PENDING_INVITE_KEY);
    if (!code) return;
    if (attemptedRef.current === code) return; // one attempt per code per session
    attemptedRef.current = code;

    void (async () => {
      const res = await redeemCollegeInvite(code);
      if (res.success) {
        storageRemoveSync(PENDING_INVITE_KEY);
        if (fetchProfile && user.id) await fetchProfile(user.id);
        toast.success(`Linked to ${res.college_name ?? 'your college'}`);
        navigate(res.invite_type === 'staff' ? '/college' : '/apprentice', { replace: true });
      } else if (isTerminalInviteError(res.error) || isTerminalInviteError(res.message)) {
        // Bad/expired code — stop retrying, surface once.
        storageRemoveSync(PENDING_INVITE_KEY);
        toast.error(res.message ?? 'Your college invite code is no longer valid.');
      }
      // Transient error: leave the code stashed for a future attempt.
    })();
  }, [user, location.pathname, fetchProfile, navigate]);

  return null;
}
