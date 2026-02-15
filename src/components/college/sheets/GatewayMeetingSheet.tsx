import { useState, useCallback } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import EPAGatewayChecklist from '@/components/college/portfolio/EPAGatewayChecklist';
import { useUpdateEPA, useUpdateEPAStatus } from '@/hooks/college/useCollegeEPA';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useToast } from '@/hooks/use-toast';
import { useHapticFeedback, SuccessCheckmark } from '@/components/college/ui/HapticFeedback';
import type { EPAStatus } from '@/services/college';
import { Calendar, CheckCircle2, FileText, Loader2, Shield } from 'lucide-react';

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
      // Update the status to Gateway Ready
      await updateEPAStatus.mutateAsync({
        id: epaId,
        status: 'Gateway Ready' as EPAStatus,
        updatedBy: 'staff',
      });

      // Update the gateway date and notes
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
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          <SuccessCheckmark show={showSuccess} />

          {/* Drag Handle */}
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <SheetHeader className="flex-shrink-0 border-b border-border px-4 pb-4">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-elec-yellow/10 flex items-center justify-center shrink-0">
                <Shield className="h-6 w-6 text-elec-yellow" />
              </div>
              <div className="flex-1 min-w-0">
                <SheetTitle className="text-xl text-left">Gateway Meeting</SheetTitle>
                <p className="text-sm text-white mt-0.5">{studentName}</p>
              </div>
            </div>
          </SheetHeader>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-6">
            {/* Gateway Checklist */}
            <EPAGatewayChecklist studentId={studentId} qualificationId="" />

            {/* Gateway Date */}
            <Card className="border-white/10">
              <CardContent className="p-4 space-y-3">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-elec-yellow" />
                  Gateway Date
                </h4>
                <div>
                  <Label className="text-xs text-white mb-1 block">Date of gateway meeting</Label>
                  <Input
                    type="date"
                    value={gatewayDate}
                    onChange={(e) => setGatewayDate(e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Meeting Notes */}
            <Card className="border-white/10">
              <CardContent className="p-4 space-y-3">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <FileText className="h-4 w-4 text-elec-yellow" />
                  Meeting Notes
                </h4>
                <Textarea
                  value={meetingNotes}
                  onChange={(e) => setMeetingNotes(e.target.value)}
                  placeholder="Record key discussion points, outcomes, and any conditions..."
                  className="touch-manipulation text-base min-h-[120px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
                />
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <SheetFooter className="flex-shrink-0 border-t border-border p-4 flex-row gap-2">
            <Button
              variant="outline"
              className="flex-1 h-11 touch-manipulation"
              onClick={() => handleOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/80 gap-2"
              onClick={handleConfirmGateway}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
              Confirm Gateway
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
