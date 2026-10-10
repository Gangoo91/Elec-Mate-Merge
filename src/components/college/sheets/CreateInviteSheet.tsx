import { useEffect, useMemo, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  chipBase,
  chipOff,
  chipOnQuiet as chipOn,
  inputCn,
  labelCn,
  selectTriggerCn,
} from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { COLLEGE_CARD } from '@/components/college/ui/CollegeUi';
import { cn } from '@/lib/utils';
import { useCollegeCan } from '@/hooks/useCollegeCan';
import { getActingCollegeId } from '@/hooks/college/useCollegeAccess';

/* ==========================================================================
   CreateInviteSheet — generate a college JOIN code.

   A learner code enrols whoever redeems it into a COHORT (college_invites.
   cohort_id); the course comes from the cohort, or from the course picker
   when the cohort has none — the invite must always carry a qualification.
   Learners redeem it via CollegeInviteAccept / the join link ->
   accept_college_invite. Codes are uppercase to match the accept screen.

   This is NOT the college discount code (applied at sign-up via ?offer=).
   Nothing connects the two; the copy says so.
   ========================================================================== */

// No ambiguous characters (0/O, 1/I) so codes are easy to read aloud / type.
const CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function generateCode(len = 8): string {
  const bytes = new Uint32Array(len);
  crypto.getRandomValues(bytes);
  let out = '';
  for (let i = 0; i < len; i++) out += CODE_ALPHABET[bytes[i] % CODE_ALPHABET.length];
  return out;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: () => void;
}

interface CourseRow {
  id: string;
  name: string;
  code: string | null;
  level: string | null;
  qualification_id: string | null;
}

interface CohortRow {
  id: string;
  name: string;
  course_id: string | null;
}

// ELE-1898: every role college_staff allows (assessor, IQA and EQA were missing).
const STAFF_ROLES = [
  { value: 'tutor', label: 'Tutor' },
  { value: 'assessor', label: 'Assessor' },
  { value: 'iqa', label: 'IQA' },
  { value: 'head_of_department', label: 'Head of department' },
  { value: 'admin', label: 'College admin' },
  { value: 'support', label: 'Support staff' },
  { value: 'eqa', label: 'EQA (external)' },
];

const EXPIRY_OPTIONS = [
  { value: '0', label: 'No expiry' },
  { value: '7', label: '7 days' },
  { value: '30', label: '30 days' },
  { value: '90', label: '90 days' },
];

export function CreateInviteSheet({ open, onOpenChange, onCreated }: Props) {
  const { toast } = useToast();
  const [inviteType, setInviteType] = useState<'student' | 'staff'>('student');
  const [role, setRole] = useState('tutor');
  const [expiryDays, setExpiryDays] = useState('30');
  const [multiUse, setMultiUse] = useState(true);
  const [code, setCode] = useState(generateCode());
  const [creating, setCreating] = useState(false);
  const [createdCode, setCreatedCode] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [collegeId, setCollegeId] = useState<string | null>(null);
  // Staff codes: only people who may give out roles (college_can 'staff.grant_roles',
  // the same check the college_invites policy makes).
  const { can } = useCollegeCan();
  const isAdmin = can('staff.grant_roles');
  const [courses, setCourses] = useState<CourseRow[]>([]);
  const [cohorts, setCohorts] = useState<CohortRow[]>([]);
  const [cohortId, setCohortId] = useState('');
  const [courseId, setCourseId] = useState('');

  useEffect(() => {
    if (!open) return;
    setInviteType('student');
    setRole('tutor');
    setExpiryDays('30');
    setMultiUse(true);
    setCode(generateCode());
    setCreatedCode(null);
    setCohortId('');
    setCourseId('');

    let cancelled = false;
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      const id = userData.user?.id ?? null;
      let cId: string | null = null;
      if (id) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('college_id')
          .eq('id', id)
          .maybeSingle();
        // White-glove: acting for a college makes codes for THAT college.
        cId = getActingCollegeId() ?? (profile?.college_id as string | null) ?? null;
      }
      let courseRows: CourseRow[] = [];
      let cohortRows: CohortRow[] = [];
      if (cId) {
        const [{ data: cRows }, { data: coRows }] = await Promise.all([
          // All active courses: names for the cohort list, and the fallback
          // picker (which only offers those that resolve to a qualification).
          supabase
            .from('college_courses')
            .select('id, name, code, level, qualification_id')
            .eq('college_id', cId)
            .eq('status', 'Active')
            .order('name'),
          supabase
            .from('college_cohorts')
            .select('id, name, course_id')
            .eq('college_id', cId)
            .eq('status', 'Active')
            .order('name'),
        ]);
        courseRows = (cRows ?? []) as CourseRow[];
        cohortRows = (coRows ?? []) as CohortRow[];
      }
      if (cancelled) return;
      setUid(id);
      setCollegeId(cId);
      setCourses(courseRows);
      setCohorts(cohortRows);
    })();
    return () => {
      cancelled = true;
    };
  }, [open]);

  const courseById = useMemo(() => new Map(courses.map((c) => [c.id, c])), [courses]);
  const qualifiedCourses = useMemo(() => courses.filter((c) => c.qualification_id), [courses]);
  const selectedCohort = cohorts.find((c) => c.id === cohortId) ?? null;
  const cohortCourse = selectedCohort?.course_id
    ? (courseById.get(selectedCohort.course_id) ?? null)
    : null;
  // The course the invite carries: the cohort's own, or the picked fallback.
  const effectiveCourseId = selectedCohort
    ? selectedCohort.course_id && cohortCourse?.qualification_id
      ? selectedCohort.course_id
      : courseId
    : '';
  const needsCoursePicker = Boolean(
    selectedCohort && !(selectedCohort.course_id && cohortCourse?.qualification_id)
  );
  const learnerReady =
    inviteType !== 'student' || (Boolean(cohortId) && Boolean(effectiveCourseId));

  const handleCreate = async () => {
    if (creating) return;
    setCreating(true);
    try {
      if (!uid) throw new Error('Not signed in.');
      if (!collegeId) throw new Error('Your account is not linked to a college.');
      // Defence in depth — RLS also blocks this, but don't even attempt it.
      if (inviteType === 'staff' && !isAdmin) {
        throw new Error('Only an admin can create staff invites.');
      }
      if (inviteType === 'student' && !cohortId) {
        throw new Error('Choose the cohort this code enrols learners into.');
      }
      if (inviteType === 'student' && !effectiveCourseId) {
        throw new Error(
          'This cohort has no course. Choose the course so the invite carries a qualification.'
        );
      }

      const expires =
        expiryDays === '0'
          ? null
          : new Date(Date.now() + Number(expiryDays) * 86400_000).toISOString();

      // A learner code is multi-use by default (a whole cohort redeems it);
      // a staff code is single-use unless multi-use is ticked.
      const maxUses = multiUse ? null : 1;

      const { data, error } = await supabase
        .from('college_invites')
        .insert({
          college_id: collegeId,
          invite_code: code,
          invite_type: inviteType,
          role_to_assign: inviteType === 'staff' ? role : null,
          cohort_id: inviteType === 'student' ? cohortId : null,
          course_id: inviteType === 'student' ? effectiveCourseId : null,
          max_uses: maxUses,
          expires_at: expires,
          created_by: uid,
          is_active: true,
        })
        .select('invite_code');
      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error('Could not create the invite. You may not have permission.');
      }

      setCreatedCode(code);
      onCreated?.();
      toast({ title: 'Invite created', description: `Code ${code} is ready to share.` });
    } catch (e) {
      toast({
        title: 'Could not create invite',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setCreating(false);
    }
  };

  const joinLink = createdCode
    ? `${typeof window !== 'undefined' ? window.location.origin : 'https://elec-mate.com'}/college/join/${createdCode}`
    : '';

  const copyCode = async () => {
    if (!createdCode) return;
    try {
      await navigator.clipboard.writeText(createdCode);
      toast({ title: 'Copied', description: `${createdCode} copied to clipboard.` });
    } catch {
      /* clipboard may be blocked; the code is shown on screen regardless */
    }
  };

  const copyLink = async () => {
    if (!joinLink) return;
    try {
      await navigator.clipboard.writeText(joinLink);
      toast({
        title: 'Join link copied',
        description: 'They sign in or create an account, and the code links them to this cohort.',
      });
    } catch {
      /* clipboard may be blocked; the link is shown on screen regardless */
    }
  };

  const expiryLabel = expiryDays === '0' ? 'No expiry' : `Expires in ${expiryDays} days`;
  const createdSummary =
    inviteType === 'staff'
      ? `Staff · ${role.replace(/_/g, ' ')} · ${multiUse ? 'Multi-use' : 'Single-use'} · ${expiryLabel}`
      : `Learner · ${selectedCohort?.name ?? 'Cohort'} · ${multiUse ? 'Multi-use' : 'Single-use'} · ${expiryLabel}`;

  const chip = (on: boolean) => cn(chipBase, 'px-3 text-[13.5px]', on ? chipOn : chipOff);

  return (
    <FormSheet
      width="wide"
      bodyClassName={createdCode ? 'space-y-5' : 'grid items-start gap-x-10 gap-y-6 lg:grid-cols-2'}
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="People · Invite"
      title={createdCode ? 'Invite ready' : 'Create a join code'}
      description={
        createdCode
          ? inviteType === 'staff'
            ? 'Send the join link. They sign in or create an account, and the code gives them their staff role.'
            : 'Send the join link. They sign in or create an account, and the code links them to this cohort.'
          : 'A code a learner or staff member uses to join this college. It is separate from any discount code the college uses at sign-up.'
      }
      footer={
        createdCode ? (
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className={cn(buttonPrimaryCn, 'w-full')}
          >
            Done
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={creating}
              className={buttonSecondaryCn}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCreate}
              disabled={creating || !learnerReady}
              className={buttonPrimaryCn}
            >
              {creating ? 'Creating…' : 'Create invite'}
            </button>
          </div>
        )
      }
    >
      {createdCode ? (
        <div className={cn(COLLEGE_CARD, 'text-center')}>
          <p className="text-[12px] font-medium text-white">Join code</p>
          <p className="mt-2 font-mono text-[34px] font-semibold tracking-[0.3em] text-elec-yellow">
            {createdCode}
          </p>
          <p className="mt-2 text-[13px] capitalize text-white">{createdSummary}</p>
          <div className="mx-auto mt-5 flex max-w-sm flex-col gap-2">
            <button type="button" onClick={copyLink} className={buttonPrimaryCn}>
              Copy join link
            </button>
            <button type="button" onClick={copyCode} className={buttonSecondaryCn}>
              Copy the code only
            </button>
          </div>
          <p className="mt-4 break-all px-2 text-[12px] text-white">{joinLink}</p>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            <div>
              <p className={labelCn}>Who is this for?</p>
              <div className={cn('mt-1 grid gap-2', isAdmin ? 'grid-cols-2' : 'grid-cols-1')}>
                {(['student', 'staff'] as const)
                  .filter((t) => t === 'student' || isAdmin)
                  .map((t) => (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={inviteType === t}
                      onClick={() => {
                        setInviteType(t);
                        // Learners share one cohort code (multi-use); a staff code
                        // grants a role and should be single-use by default.
                        setMultiUse(t === 'student');
                      }}
                      className={chip(inviteType === t)}
                    >
                      {t === 'student' ? 'Learner' : 'Staff member'}
                    </button>
                  ))}
              </div>
            </div>

            {inviteType === 'staff' && (
              <div>
                <p className={labelCn}>Staff role</p>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  {STAFF_ROLES.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      aria-pressed={role === r.value}
                      onClick={() => setRole(r.value)}
                      className={chip(role === r.value)}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {inviteType === 'student' && (
              <>
                <div>
                  <label className={labelCn} htmlFor="ci-cohort">
                    Cohort <span className="text-elec-yellow">*</span>
                  </label>
                  {cohorts.length === 0 ? (
                    <p className="py-2 text-[13.5px] text-white">
                      No active cohorts yet. Add a cohort first, then create the invite.
                    </p>
                  ) : (
                    <MobileSelectPicker
                      value={cohortId}
                      onValueChange={(v) => {
                        setCohortId(v);
                        setCourseId('');
                      }}
                      title="Cohort"
                      placeholder="Choose a cohort…"
                      triggerClassName={selectTriggerCn}
                      options={cohorts.map((c) => {
                        const course = c.course_id ? courseById.get(c.course_id) : null;
                        return {
                          value: c.id,
                          label: `${c.name}${course ? ` · ${course.name}` : ' · No course set'}`,
                        };
                      })}
                    />
                  )}
                  <p className="mt-2 text-[12px] leading-relaxed text-white">
                    Everyone who uses this code joins this cohort. Learners enter it in the app or
                    open the link.
                  </p>
                </div>

                {needsCoursePicker && (
                  <div>
                    <label className={labelCn} htmlFor="ci-course">
                      Course <span className="text-elec-yellow">*</span>
                    </label>
                    {qualifiedCourses.length === 0 ? (
                      <p className="py-2 text-[13.5px] text-white">
                        No courses linked to a qualification yet. Add one in the curriculum first,
                        then create the invite.
                      </p>
                    ) : (
                      <MobileSelectPicker
                        value={courseId}
                        onValueChange={setCourseId}
                        title="Course"
                        placeholder="Choose a course…"
                        triggerClassName={selectTriggerCn}
                        options={qualifiedCourses.map((c) => ({
                          value: c.id,
                          label: `${c.name}${c.level ? ` · ${c.level}` : ''}${c.code ? ` · ${c.code}` : ''}`,
                        }))}
                      />
                    )}
                    <p className="mt-2 text-[12px] leading-relaxed text-orange-300">
                      This cohort has no course with a qualification. Choose one so the invite
                      carries a qualification.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <p className={labelCn}>Expires</p>
              <div className="mt-1 grid grid-cols-4 gap-2">
                {EXPIRY_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    type="button"
                    aria-pressed={expiryDays === o.value}
                    onClick={() => setExpiryDays(o.value)}
                    className={cn(chip(expiryDays === o.value), 'px-1 text-[13px]')}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className={labelCn}>How many people can use it</p>
              <div className="mt-1 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  aria-pressed={multiUse}
                  onClick={() => setMultiUse(true)}
                  className={chip(multiUse)}
                >
                  Many people
                </button>
                <button
                  type="button"
                  aria-pressed={!multiUse}
                  onClick={() => setMultiUse(false)}
                  className={chip(!multiUse)}
                >
                  One person
                </button>
              </div>
            </div>

            <div>
              <label className={labelCn} htmlFor="ci-code">
                Code
              </label>
              <div className="flex items-end gap-3">
                <input
                  id="ci-code"
                  value={code}
                  readOnly
                  className={cn(inputCn, 'font-mono tracking-[0.25em]')}
                />
                <button
                  type="button"
                  onClick={() => setCode(generateCode())}
                  className="h-11 shrink-0 rounded-xl px-3 text-[13px] font-semibold text-elec-yellow touch-manipulation hover:bg-white/[0.06]"
                >
                  New code
                </button>
              </div>
              <p className="mt-2 text-[12px] text-white">
                Made for you. No 0/O or 1/I, so it is easy to read out.
              </p>
            </div>
          </div>
        </>
      )}
    </FormSheet>
  );
}
