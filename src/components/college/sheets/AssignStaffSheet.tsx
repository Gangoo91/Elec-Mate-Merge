import { useEffect, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import {
  SheetShell,
  PrimaryButton,
  SecondaryButton,
  Field,
  FormCard,
  selectTriggerClass,
  selectContentClass,
  SuccessCheckmark,
} from '@/components/college/primitives';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
        toast({ title: 'Could not load staff', description: staffErr.message, variant: 'destructive' });
      }
      if (aErr) {
        toast({ title: 'Could not load assignment', description: aErr.message, variant: 'destructive' });
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
          'Update did not apply — you may not have permission to assign staff for this learner.'
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

  const picker = (
    label: string,
    value: string,
    onChange: (v: string) => void,
    qualKey?: 'assessor_qual' | 'iqa_qual'
  ) => (
    <Field label={label}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={selectTriggerClass}>
          <SelectValue placeholder="Unassigned" />
        </SelectTrigger>
        <SelectContent className={selectContentClass}>
          <SelectItem value={NONE}>Unassigned</SelectItem>
          {staff.map((s) => {
            const qualified = qualKey ? !!s[qualKey] : true;
            return (
              <SelectItem key={s.user_id} value={s.user_id}>
                {s.name}
                <span className="text-white/70">
                  {' · '}
                  {roleLabel[s.role] ?? s.role}
                  {qualKey && qualified ? ' ✓' : ''}
                </span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </Field>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent hideCloseButton
        side="bottom"
        className="h-[80vh] sm:max-w-lg sm:mx-auto p-0 rounded-t-2xl overflow-hidden border-white/10"
      >
        <SheetShell
          eyebrow="People · Assignment"
          title={`Assign staff to ${studentName.split(' ')[0]}`}
          description="Set who is responsible for this learner. This is what populates the tutor, assessor and IQA dashboards."
          footer={
            <>
              <SecondaryButton onClick={() => onOpenChange(false)} disabled={saving} fullWidth>
                Cancel
              </SecondaryButton>
              <PrimaryButton
                onClick={handleSave}
                disabled={saving || loading || !assignmentId}
                fullWidth
                className="relative"
              >
                {saving ? 'Saving…' : 'Save assignment'}
                <SuccessCheckmark show={savedTick} />
              </PrimaryButton>
            </>
          }
        >
          <div className="space-y-4">
            {loading ? (
              <div className="py-10 text-center text-sm text-white/50">Loading…</div>
            ) : !assignmentId ? (
              <FormCard>
                <p className="text-sm text-white/70">
                  {studentName.split(' ')[0]} isn&apos;t enrolled yet — they need to accept their
                  college invite before staff can be assigned. Once they&apos;ve joined, their
                  tutor, assessor and IQA can be set here.
                </p>
              </FormCard>
            ) : (
              <FormCard>
                {picker('Tutor', tutorId, setTutorId)}
                {picker('Assessor', assessorId, setAssessorId, 'assessor_qual')}
                {picker('IQA', iqaId, setIqaId, 'iqa_qual')}
                <p className="text-[11px] text-white/70 pt-1">
                  ✓ marks staff who hold the relevant assessor / IQA qualification.
                </p>
              </FormCard>
            )}
          </div>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
