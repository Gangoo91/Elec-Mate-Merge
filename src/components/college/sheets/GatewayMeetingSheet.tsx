import { useState, useCallback } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import EPAGatewayChecklist from '@/components/college/portfolio/EPAGatewayChecklist';
import { useUpdateEPA, useUpdateEPAStatus } from '@/hooks/college/useCollegeEPA';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
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
              <PrimaryButton
                fullWidth
                onClick={handleConfirmGateway}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Confirming…' : 'Confirm Gateway →'}
              </PrimaryButton>
            </>
          }
        >
          <EPAGatewayChecklist studentId={studentId} qualificationId="" />

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
