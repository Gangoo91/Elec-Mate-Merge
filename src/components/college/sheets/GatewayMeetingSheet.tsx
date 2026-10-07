import { useState, useCallback, useEffect } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import EPAGatewayChecklist from '@/components/college/portfolio/EPAGatewayChecklist';
import { useUpdateEPA, useUpdateEPAStatus } from '@/hooks/college/useCollegeEPA';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import { SuccessCheckmark } from '@/components/college/primitives';
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
    <>
      <FormSheet
        open={open}
        onOpenChange={handleOpenChange}
        width="wide"
        eyebrow="Gateway meeting"
        title={studentName}
        description="Check the gateway evidence, then record the meeting. Confirming marks the learner Gateway Ready."
        bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-6 lg:grid-cols-[minmax(0,1fr)_24rem]"
        footer={
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
              className={buttonSecondaryCn}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmGateway}
              disabled={isSubmitting}
              className={buttonPrimaryCn}
            >
              {isSubmitting ? 'Confirming…' : 'Confirm gateway'}
            </button>
          </div>
        }
      >
        <section className="min-w-0">
          {!(learner?.userId && learner.qualificationId) && (
            <h3 className="mb-2 text-[15px] font-semibold text-white">Gateway checklist</h3>
          )}
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
          ) : (
            <p className="text-[13px] text-white">Loading the checklist…</p>
          )}
        </section>

        <section className="space-y-5 border-t border-white/[0.08] pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <h3 className="text-[15px] font-semibold text-white">The meeting</h3>
          <div className="max-w-xs">
            <label className={labelCn} htmlFor="gm-date">
              Date of gateway meeting
            </label>
            <input
              id="gm-date"
              type="date"
              value={gatewayDate}
              onChange={(e) => setGatewayDate(e.target.value)}
              className={inputCn}
            />
          </div>
          <div>
            <label className={labelCn} htmlFor="gm-notes">
              Meeting notes
            </label>
            <textarea
              id="gm-notes"
              value={meetingNotes}
              onChange={(e) => setMeetingNotes(e.target.value)}
              placeholder="Key discussion points, the outcome and any conditions"
              className={`${textareaCn} min-h-[160px]`}
            />
          </div>
        </section>
      </FormSheet>
      <SuccessCheckmark show={showSuccess} />
    </>
  );
}
