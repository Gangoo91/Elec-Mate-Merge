/**
 * AssessorInvitePage — /assessor-invite/:token (ELE-1870)
 *
 * An apprentice invited this person to assess their portfolio. Signed in:
 * accept in one tap. Signed out: stash the token, sign in or create a free
 * account, and PendingAssessorInviteRedeemer finishes the job.
 */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { storageSetSync } from '@/utils/storage';
import {
  PENDING_ASSESSOR_INVITE_KEY,
  INVITE_ERROR_COPY,
  ROLE_LABEL,
  acceptAssessorInvite,
  assessorWorkspacePath,
  previewAssessorInvite,
  type AssessorInvitePreview,
} from '@/lib/assessorInvite';
import {
  PublicCard,
  PublicEyebrow,
  PublicH1,
  PublicLead,
  PublicPageShell,
  PUBLIC_PRIMARY_CTA,
  PUBLIC_SECONDARY_CTA,
} from '@/components/public/PublicPageShell';


export default function AssessorInvitePage() {
  const { token } = useParams<{ token: string }>();
  const { user, isLoading: authLoading } = useAuth() as ReturnType<typeof useAuth> & { isLoading?: boolean };
  const navigate = useNavigate();
  const [preview, setPreview] = useState<AssessorInvitePreview | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) previewAssessorInvite(token).then(setPreview);
  }, [token]);

  const first = preview?.learner_name?.split(' ')[0] ?? 'An apprentice';
  const role = ROLE_LABEL[preview?.role ?? 'assessor'];

  const accept = async () => {
    if (!token) return;
    setBusy(true);
    setError(null);
    const res = await acceptAssessorInvite(token);
    setBusy(false);
    if (res.success && res.learner_id) {
      navigate(assessorWorkspacePath(res.learner_id), { replace: true });
      return;
    }
    setError(
      res.error === 'wrong_account' && res.invited_email
        ? `This invite was sent to ${res.invited_email}. Sign in with that account to accept it.`
        : INVITE_ERROR_COPY[res.error ?? 'invite_not_found']
    );
  };

  const goAuth = (path: '/auth/signin' | '/auth/signup') => {
    if (token) storageSetSync(PENDING_ASSESSOR_INVITE_KEY, token);
    navigate(path);
  };

  const POINTS = [
    `See ${first}'s evidence against every criterion of their qualification.`,
    'Record a decision on each one: passed, needs more, or not yet. They see your feedback straight away.',
    `Your account is free. Access ends whenever ${first} removes it.`,
  ];

  return (
    <PublicPageShell>
      <PublicEyebrow>Portfolio invite</PublicEyebrow>

      {!preview && (
        <div className="mt-6 flex items-center gap-2 text-[15px] text-white">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading…
        </div>
      )}

      {preview?.error && (
        <>
          <PublicH1>This invite can't be used</PublicH1>
          <PublicLead>{INVITE_ERROR_COPY[preview.error]}</PublicLead>
          {preview.error === 'network' && token && (
            <button
              type="button"
              onClick={() => previewAssessorInvite(token).then(setPreview)}
              className={`${PUBLIC_SECONDARY_CTA} mt-8`}
            >
              Try again
            </button>
          )}
        </>
      )}

      {preview && !preview.error && (
        <>
          <PublicH1>
            {first} has asked you to be their <span className="text-elec-yellow">{role}</span>
          </PublicH1>
          <PublicLead>Their apprenticeship portfolio lives on Elec-Mate. This is what you can do.</PublicLead>

          <PublicCard className="mt-8">
            <ol className="space-y-4">
              {POINTS.map((p, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-elec-yellow text-[14px] font-bold text-black">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-[15px] leading-relaxed text-white">{p}</span>
                </li>
              ))}
            </ol>
          </PublicCard>

          <div className="mt-6 space-y-3">
            {preview.status === 'active' && (
              <p className="text-[15px] font-semibold text-emerald-300">Already accepted.</p>
            )}
            {error && (
              <p role="alert" className="text-[14px] text-red-300">
                {error}
              </p>
            )}
            {user ? (
              <button type="button" onClick={accept} disabled={busy} className={PUBLIC_PRIMARY_CTA}>
                {busy ? 'Accepting…' : preview.status === 'active' ? `Open ${first}'s portfolio` : 'Accept and open portfolio'}
              </button>
            ) : authLoading ? null : (
              <div className="grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={() => goAuth('/auth/signup')} className={PUBLIC_PRIMARY_CTA}>
                  Create free account
                </button>
                <button type="button" onClick={() => goAuth('/auth/signin')} className={PUBLIC_SECONDARY_CTA}>
                  I have an account
                </button>
              </div>
            )}
            {preview.assessor_email && (
              <p className="text-[14px] text-white">
                Sent to <span className="font-semibold">{preview.assessor_email}</span>. Use that email to accept.
              </p>
            )}
          </div>
        </>
      )}
    </PublicPageShell>
  );
}
