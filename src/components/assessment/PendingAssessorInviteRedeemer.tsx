/**
 * PendingAssessorInviteRedeemer — global, render-null. Same shape as
 * PendingCollegeInviteRedeemer: when a signed-in user lands on a normal app
 * page with an assessor invite stashed, accept it and open the learner.
 */
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { storageGetSync, storageRemoveSync } from '@/utils/storage';
import {
  PENDING_ASSESSOR_INVITE_KEY,
  INVITE_ERROR_COPY,
  acceptAssessorInvite,
  assessorWorkspacePath,
} from '@/lib/assessorInvite';

// Runs on the checkout page on purpose: an invited assessor needs no
// subscription, so accepting moves them straight to /assessor.
const SKIP_PREFIXES = ['/auth', '/payment', '/complete-profile', '/walkthrough', '/assessor-invite'];

export default function PendingAssessorInviteRedeemer() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const tried = useRef<string | null>(null);

  useEffect(() => {
    if (!user) return;
    if (SKIP_PREFIXES.some((p) => location.pathname.startsWith(p))) return;
    const token = storageGetSync(PENDING_ASSESSOR_INVITE_KEY);
    if (!token || tried.current === token) return;
    tried.current = token;
    void (async () => {
      const res = await acceptAssessorInvite(token);
      if (res.success) {
        storageRemoveSync(PENDING_ASSESSOR_INVITE_KEY);
        toast.success(`You are now assessing ${res.learner_name ?? 'this apprentice'}`);
        navigate(assessorWorkspacePath(res.learner_id), { replace: true });
      } else if (res.error && res.error !== 'sign_in_required' && res.error !== 'network') {
        storageRemoveSync(PENDING_ASSESSOR_INVITE_KEY);
        toast.error(INVITE_ERROR_COPY[res.error] ?? 'That invite is no longer valid.');
      } else if (res.error === 'network') {
        tried.current = null; // try again on the next page
      }
    })();
  }, [user, location.pathname, navigate]);

  return null;
}
