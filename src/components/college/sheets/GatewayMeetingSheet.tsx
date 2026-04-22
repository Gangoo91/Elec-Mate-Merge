import { useState, useCallback } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import EPAGatewayChecklist from '@/components/college/portfolio/EPAGatewayChecklist';
import { useUpdateEPA, useUpdateEPAStatus } from '@/hooks/college/useCollegeEPA';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useToast } from '@/hooks/use-toast';
import { useHapticFeedback, SuccessCheckmark } from '@/components/college/ui/HapticFeedback';
import type { EPAStatus } from '@/services/college';

interface GatewayMeetingSheetProps {
  epaId: string | null;
  studentId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const inputClass =
  'h-11 w-full px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/35 focus:outline-none focus:border-elec-yellow/60 touch-manipulation';

const textareaClass =
  'w-full px-4 py-3 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/35 focus:outline-none focus:border-elec-yellow/60 touch-manipulation min-h-[120px] resize-none';

const eyebrow = 'text-[10px] font-medium uppercase tracking-[0.16em] text-white/40';

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
      }, 1500);
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
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_8%)]">
        <div className="flex flex-col h-full">
          <SuccessCheckmark show={showSuccess} />

          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          <SheetHeader className="flex-shrink-0 border-b border-white/[0.06] px-5 pb-4">
            <div className={eyebrow}>Gateway Meeting</div>
            <SheetTitle className="text-[20px] font-semibold text-white mt-1 text-left">
              {studentName}
            </SheetTitle>
            <p className="text-[12.5px] text-white/55 mt-1 text-left">
              Confirm gateway readiness and record meeting outcome
            </p>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-4">
            <EPAGatewayChecklist studentId={studentId} qualificationId="" />

            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
              <div className={eyebrow}>Gateway Date</div>
              <div className="space-y-1.5">
                <div className="text-[11.5px] text-white/60">Date of gateway meeting</div>
                <input
                  type="date"
                  value={gatewayDate}
                  onChange={(e) => setGatewayDate(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
              <div className={eyebrow}>Meeting Notes</div>
              <textarea
                value={meetingNotes}
                onChange={(e) => setMeetingNotes(e.target.value)}
                placeholder="Record key discussion points, outcomes, and any conditions…"
                className={textareaClass}
              />
            </div>
          </div>

          <SheetFooter className="flex-shrink-0 border-t border-white/[0.06] p-4 flex-row gap-2">
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
              className="flex-1 h-11 text-[12.5px] font-medium text-white/70 hover:text-white transition-colors touch-manipulation border border-white/[0.08] rounded-full"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmGateway}
              disabled={isSubmitting}
              className="flex-1 h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
            >
              {isSubmitting ? 'Confirming…' : 'Confirm Gateway →'}
            </button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
