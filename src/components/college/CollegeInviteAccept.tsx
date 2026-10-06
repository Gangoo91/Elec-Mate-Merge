/**
 * CollegeInviteAccept
 *
 * Inline form for redeeming a college JOIN code (the 8-character code a tutor
 * hands out — not the discount code used at sign-up). Calls
 * `accept_college_invite` through the shared redeem helper, refreshes the
 * profile and the college context, then hands the details to the parent.
 */

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { PrimaryButton } from '@/components/college/primitives';
import { redeemCollegeInvite, type RedeemResult } from '@/lib/collegeInvite';
import { invalidateMyCollegeContext } from '@/hooks/useMyCollegeContext';

export type InviteAcceptDetails = Pick<
  RedeemResult,
  | 'college_name'
  | 'cohort_name'
  | 'course_name'
  | 'qualification_title'
  | 'tutor_name'
  | 'student_id'
  | 'linked'
  | 'already_member'
  | 'role'
>;

interface CollegeInviteAcceptProps {
  onSuccess?: (collegeName: string, inviteType: string, details: InviteAcceptDetails) => void;
}

// Underline input — the house recipe (CLAUDE.md). No box, no ring.
const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] ' +
  'bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 ' +
  'caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow ' +
  'focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation ' +
  'font-mono uppercase tracking-[0.25em] placeholder:font-sans placeholder:normal-case placeholder:tracking-normal';

export function CollegeInviteAccept({ onSuccess }: CollegeInviteAcceptProps) {
  const { fetchProfile, user } = useAuth();
  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<RedeemResult | null>(null);

  const handleSubmit = async () => {
    const trimmed = code.trim().toUpperCase();
    if (isSubmitting || trimmed.length < 4) return;

    setIsSubmitting(true);
    setResult(null);

    const res = await redeemCollegeInvite(trimmed);
    setResult(res);

    if (res.success) {
      toast.success(
        res.linked || res.already_member
          ? `Welcome back — linked to ${res.college_name ?? 'your college'}`
          : `Joined ${res.college_name ?? 'your college'}`
      );
      if (fetchProfile && user?.id) await fetchProfile(user.id);
      invalidateMyCollegeContext();
      onSuccess?.(res.college_name ?? '', res.invite_type ?? '', {
        college_name: res.college_name,
        cohort_name: res.cohort_name,
        course_name: res.course_name,
        qualification_title: res.qualification_title,
        tutor_name: res.tutor_name,
        student_id: res.student_id,
        linked: res.linked,
        already_member: res.already_member,
        role: res.role,
      });
    }
    setIsSubmitting(false);
  };

  const errorText = result && !result.success ? result.message || result.error || 'Could not join.' : null;
  const courseLine = result?.qualification_title || result?.course_name || null;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-[15px] font-semibold tracking-tight text-white">
          Join with your tutor's code
        </h3>
        <p className="mt-1 text-[12.5px] leading-relaxed text-white">
          This is the 8-character code or link your tutor gave you. It is not the discount code
          you used at sign-up.
        </p>
      </div>

      <div>
        <label htmlFor="college-join-code" className="mb-1 block text-[12px] font-medium text-white">
          Join code
        </label>
        <div className="flex items-end gap-3">
          <input
            id="college-join-code"
            type="text"
            inputMode="text"
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck={false}
            placeholder="8-character code"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            maxLength={12}
            disabled={isSubmitting}
            className={inputCn}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <PrimaryButton
            onClick={handleSubmit}
            disabled={isSubmitting || code.trim().length < 4}
            size="lg"
            className="shrink-0"
          >
            {isSubmitting ? 'Joining…' : 'Join'}
          </PrimaryButton>
        </div>
      </div>

      <AnimatePresence>
        {errorText && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="alert"
            className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-3.5 text-[13px] leading-relaxed text-orange-300"
          >
            {errorText}
          </motion.div>
        )}

        {result?.success && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border border-white/[0.14] bg-white/[0.04] p-4"
          >
            <p className="text-[13px] font-semibold text-white">
              {result.already_member ? "You're already in" : "You're in"}
            </p>
            <dl className="mt-2 space-y-1.5 text-[12.5px] text-white">
              <div className="flex gap-2">
                <dt className="w-16 shrink-0 text-white">College</dt>
                <dd className="font-medium text-white">{result.college_name ?? '—'}</dd>
              </div>
              {result.invite_type === 'staff' ? (
                <div className="flex gap-2">
                  <dt className="w-16 shrink-0 text-white">Role</dt>
                  <dd className="font-medium capitalize text-white">
                    {(result.role ?? 'tutor').replace(/_/g, ' ')}
                  </dd>
                </div>
              ) : (
                <>
                  {result.cohort_name && (
                    <div className="flex gap-2">
                      <dt className="w-16 shrink-0 text-white">Cohort</dt>
                      <dd className="font-medium text-white">{result.cohort_name}</dd>
                    </div>
                  )}
                  {courseLine && (
                    <div className="flex gap-2">
                      <dt className="w-16 shrink-0 text-white">Course</dt>
                      <dd className="font-medium text-white">{courseLine}</dd>
                    </div>
                  )}
                  {result.tutor_name && (
                    <div className="flex gap-2">
                      <dt className="w-16 shrink-0 text-white">Tutor</dt>
                      <dd className="font-medium text-white">{result.tutor_name}</dd>
                    </div>
                  )}
                </>
              )}
            </dl>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
