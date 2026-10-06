import { useState, useCallback, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import EPAGatewayChecklist from '@/components/college/portfolio/EPAGatewayChecklist';
import { useUpdateEPA, useUpdateEPAStatus } from '@/hooks/college/useCollegeEPA';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import {
  SheetShell,
  FormCard,
  Field,
  PrimaryButton,
  SecondaryButton,
  SuccessCheckmark,
  inputClass,
  textareaClass,
} from '@/components/college/primitives';
import type { EPAStatus } from '@/services/college';

interface GatewayMeetingSheetProps {
  epaId: string | null;
  studentId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GatewayMeetingSheet({
  epaId,
  studentId,
  open,
  onOpenChange,
}: GatewayMeetingSheetProps) {
  const { data: students } = useCollegeStudents();
  const updateEPA = useUpdateEPA();
  const updateEPAStatus = useUpdateEPAStatus();
  const { toast } = useToast();
  const { triggerSuccess } = useHapticFeedback();

  const [gatewayDate, setGatewayDate] = useState('');
  const [meetingNotes, setMeetingNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const studentName = students?.find((s) => s.id === studentId)?.name ?? 'Unknown Student';

  // The checklist is keyed on the learner's account (auth user id) and their
  // qualification — this sheet only has the college_students id, and passed it
  // (with an empty qualification) straight through, so the checklist was empty
  // and any tick would have failed. Resolve both the way every other screen does.
  const [learner, setLearner] = useState<{
    userId: string | null;
    qualificationId: string | null;
  } | null>(null);
  useEffect(() => {
    if (!open || !studentId) return;
    let cancelled = false;
    void (async () => {
      const { data: cs } = await supabase
        .from('college_students')
        .select('user_id')
        .eq('id', studentId)
        .maybeSingle();
      const userId = (cs as { user_id: string | null } | null)?.user_id ?? null;
      let qualificationId: string | null = null;
      if (userId) {
        const { data: q } = await (
          supabase.rpc as unknown as (
            fn: string,
            params: Record<string, unknown>
          ) => Promise<{ data: { qualification_id?: string | null } | null }>
        )('resolve_learner_qualification', { p_user_id: userId, p_student_id: studentId });
        qualificationId = q?.qualification_id ?? null;
      }
      if (!cancelled) setLearner({ userId, qualificationId });
    })();
    return () => {
      cancelled = true;
    };
  }, [open, studentId]);

  const handleOpenChange = useCallback(
    (value: boolean) => {
      if (!value) {
        setGatewayDate('');
        setMeetingNotes('');
        setShowSuccess(false);
      }
      onOpenChange(value);
    },
    [onOpenChange]
  );

  const handleConfirmGateway = async () => {
    if (!epaId) return;
    setIsSubmitting(true);

    try {
      await updateEPAStatus.mutateAsync({
        id: epaId,
        status: 'Gateway Ready' as EPAStatus,
        updatedBy: 'staff',
      });

      await updateEPA.mutateAsync({
        id: epaId,
        updates: {
          gateway_date: gatewayDate || null,
          notes: meetingNotes || null,
        },
      });

      triggerSuccess();
      setShowSuccess(true);
      toast({
        title: 'Gateway confirmed',
        description: `${studentName} has been marked as Gateway Ready`,
      });

      setTimeout(() => {
        setShowSuccess(false);
        handleOpenChange(false);
      }, 700);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to confirm gateway. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!epaId || !studentId) return null;

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        hideCloseButton
        side="bottom"
        className="h-[85vh] p-0 overflow-hidden bg-[hsl(0_0%_8%)]"
      >
        <SheetShell
          eyebrow="Gateway Meeting"
          title={studentName}
          description="Confirm gateway readiness and record meeting outcome"
          footer={
            <>
              <SecondaryButton
                fullWidth
                onClick={() => handleOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </SecondaryButton>
              <PrimaryButton fullWidth onClick={handleConfirmGateway} disabled={isSubmitting}>
                {isSubmitting ? 'Confirming…' : 'Confirm Gateway →'}
              </PrimaryButton>
            </>
          }
        >
          {learner?.userId && learner.qualificationId ? (
            <EPAGatewayChecklist
              studentId={learner.userId}
              qualificationId={learner.qualificationId}
            />
          ) : learner ? (
            <p className="text-[13px] text-white">
              {learner.userId
                ? 'This learner has no qualification set yet, so there’s no gateway checklist to show.'
                : 'This learner hasn’t linked an Elec-Mate account yet, so there’s no gateway checklist to show.'}
            </p>
          ) : null}

          <FormCard eyebrow="Gateway Date">
            <Field label="Date of gateway meeting">
              <input
                type="date"
                value={gatewayDate}
                onChange={(e) => setGatewayDate(e.target.value)}
                className={inputClass}
              />
            </Field>
          </FormCard>

          <FormCard eyebrow="Meeting Notes">
            <textarea
              value={meetingNotes}
              onChange={(e) => setMeetingNotes(e.target.value)}
              placeholder="Record key discussion points, outcomes, and any conditions…"
              className={`${textareaClass} min-h-[120px]`}
            />
          </FormCard>
        </SheetShell>
        <SuccessCheckmark show={showSuccess} />
      </SheetContent>
    </Sheet>
  );
}
