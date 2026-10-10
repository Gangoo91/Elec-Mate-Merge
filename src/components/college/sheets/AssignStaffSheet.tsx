import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  labelCn,
  selectTriggerCn,
} from '@/components/forms/fieldStyles';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { SuccessCheckmark } from '@/components/college/primitives';
import { COLLEGE_CARD } from '@/components/college/ui/CollegeUi';
import { cn } from '@/lib/utils';

/* ==========================================================================
   AssignStaffSheet — assign a tutor / assessor / IQA to a learner.

   Writes the role columns on college_student_assignments that the assessor
   queue, EPA gateway, IQA sampling and portfolio-review dashboards filter on.
   Before this existed there was no client write-path for those columns, so the
   dashboards rendered empty for everyone. Updates the learner's existing
   assignment row (created at enrolment); a learner with no assignment row has
   not accepted their invite yet and must do so first.
   ========================================================================== */

const NONE = '__none__';

interface StaffOption {
  user_id: string;
  name: string;
  role: string;
  assessor_qual: string | null;
  iqa_qual: string | null;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** auth user id (== profiles.id) of the learner */
  studentUserId: string;
  studentName: string;
  collegeId: string;
  onSaved?: () => void;
}

const roleLabel: Record<string, string> = {
  tutor: 'Tutor',
  head_of_department: 'Head of Dept',
  support: 'Support',
  admin: 'Admin',
};

export function AssignStaffSheet({
  open,
  onOpenChange,
  studentUserId,
  studentName,
  collegeId,
  onSaved,
}: Props) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedTick, setSavedTick] = useState(false);
  const [staff, setStaff] = useState<StaffOption[]>([]);
  const [assignmentId, setAssignmentId] = useState<string | null>(null);
  const [tutorId, setTutorId] = useState<string>(NONE);
  const [assessorId, setAssessorId] = useState<string>(NONE);
  const [iqaId, setIqaId] = useState<string>(NONE);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoading(true);
    setSavedTick(false);
    (async () => {
      // Staff who can be assigned (must have a login — the role columns FK profiles.id).
      const { data: staffRows, error: staffErr } = await supabase
        .from('college_staff')
        .select('user_id, name, role, assessor_qual, iqa_qual')
        .eq('college_id', collegeId)
        .is('archived_at', null)
        .not('user_id', 'is', null)
        .order('name');

      // The learner's current assignment row + any roles already set.
      // order+limit keeps maybeSingle() safe even if a duplicate row ever exists.
      const { data: assignment, error: aErr } = await supabase
        .from('college_student_assignments')
        .select('id, tutor_id, assessor_id, iqa_id')
        .eq('student_id', studentUserId)
        .eq('college_id', collegeId)
        .order('created_at', { ascending: true })
        .limit(1)
        .maybeSingle();

      if (cancelled) return;
      if (staffErr) {
        toast({
          title: 'Could not load staff',
          description: staffErr.message,
          variant: 'destructive',
        });
      }
      if (aErr) {
        toast({
          title: 'Could not load assignment',
          description: aErr.message,
          variant: 'destructive',
        });
      }

      setStaff((staffRows ?? []) as StaffOption[]);
      setAssignmentId((assignment?.id as string | undefined) ?? null);
      setTutorId((assignment?.tutor_id as string | null) ?? NONE);
      setAssessorId((assignment?.assessor_id as string | null) ?? NONE);
      setIqaId((assignment?.iqa_id as string | null) ?? NONE);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [open, studentUserId, collegeId, toast]);

  const handleSave = async () => {
    if (saving || !assignmentId) return;
    setSaving(true);
    try {
      // .select() so we can confirm a row was actually updated. A blocked RLS
      // update returns no error but affects 0 rows — without this check the user
      // would see a false "saved" toast.
      const { data, error } = await supabase
        .from('college_student_assignments')
        .update({
          tutor_id: tutorId === NONE ? null : tutorId,
          assessor_id: assessorId === NONE ? null : assessorId,
          iqa_id: iqaId === NONE ? null : iqaId,
        })
        .eq('id', assignmentId)
        .select('id');
      if (error) throw error;
      if (!data || data.length === 0) {
        throw new Error(
          'Update did not apply. You may not have permission to assign staff for this learner.'
        );
      }

      setSavedTick(true);
      toast({
        title: 'Staff assigned',
        description: `${studentName.split(' ')[0]}'s tutor / assessor / IQA updated.`,
      });
      onSaved?.();
      setTimeout(() => {
        setSavedTick(false);
        onOpenChange(false);
      }, 700);
    } catch (e) {
      toast({
        title: 'Could not save',
        description: (e as Error).message ?? 'Try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const first = studentName.split(' ')[0];

  const picker = (
    id: string,
    label: string,
    hint: string,
    value: string,
    onChange: (v: string) => void,
    qualKey?: 'assessor_qual' | 'iqa_qual'
  ) => (
    <div>
      <label className={labelCn} htmlFor={id}>
        {label}
      </label>
      <MobileSelectPicker
        value={value}
        onValueChange={onChange}
        title={label}
        placeholder="Unassigned"
        triggerClassName={selectTriggerCn}
        options={[
          { value: NONE, label: 'Unassigned' },
          ...staff.map((s) => {
            const qualified = qualKey ? !!s[qualKey] : false;
            return {
              value: s.user_id,
              label: `${s.name} · ${roleLabel[s.role] ?? s.role}${qualified ? ' ✓' : ''}`,
              description: qualKey
                ? qualified
                  ? 'Holds the qualification'
                  : 'No qualification recorded'
                : undefined,
            };
          }),
        ]}
      />
      <p className="mt-2 text-[12px] leading-relaxed text-white">{hint}</p>
    </div>
  );

  return (
    <FormSheet
      width="wide"
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="People · Assignment"
      title={`Assign staff to ${first}`}
      description="Set who is responsible for this learner. This is what fills the tutor, assessor and IQA dashboards."
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={saving}
            className={buttonSecondaryCn}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || loading || !assignmentId}
            className={cn(buttonPrimaryCn, 'relative')}
          >
            {saving ? 'Saving…' : savedTick ? 'Saved' : 'Save assignment'}
            <SuccessCheckmark show={savedTick} />
          </button>
        </div>
      }
    >
      {loading ? (
        <p className="py-10 text-center text-[14px] text-white">Loading staff…</p>
      ) : !assignmentId ? (
        <div className={COLLEGE_CARD}>
          <p className="text-[15px] font-semibold text-white">{first} hasn&apos;t joined yet</p>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-white">
            They need to accept their college invite before staff can be assigned. Once they&apos;ve
            joined, their tutor, assessor and IQA can be set here.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-3">
            {picker(
              'as-tutor',
              'Tutor',
              'Day-to-day contact. Sees them on the tutor dashboard.',
              tutorId,
              setTutorId
            )}
            {picker(
              'as-assessor',
              'Assessor',
              'Marks their portfolio and signs off evidence.',
              assessorId,
              setAssessorId,
              'assessor_qual'
            )}
            {picker(
              'as-iqa',
              'IQA',
              'Samples the assessor’s decisions for quality.',
              iqaId,
              setIqaId,
              'iqa_qual'
            )}
          </div>
          <p className="border-t border-white/[0.1] pt-4 text-[12.5px] leading-relaxed text-white">
            ✓ marks staff who hold the relevant assessor or IQA qualification. Only staff with a
            login can be assigned.
          </p>
        </>
      )}
    </FormSheet>
  );
}
