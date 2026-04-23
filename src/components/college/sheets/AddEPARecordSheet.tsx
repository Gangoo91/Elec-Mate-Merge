import { useState, useCallback } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCreateEPA } from '@/hooks/college/useCollegeEPA';
import { useCollegeStudents } from '@/hooks/college/useCollegeStudents';
import { useToast } from '@/hooks/use-toast';
import { useHapticFeedback, SuccessCheckmark } from '@/components/college/ui/HapticFeedback';
import type { EPAStatus } from '@/services/college';

interface AddEPARecordSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const inputClass =
  'h-11 w-full px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/65 focus:outline-none focus:border-elec-yellow/60 touch-manipulation';

const textareaClass =
  'w-full px-4 py-3 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] placeholder:text-white/65 focus:outline-none focus:border-elec-yellow/60 touch-manipulation min-h-[120px] resize-none';

const selectTriggerClass =
  'h-11 px-4 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-xl text-white text-[13px] focus:outline-none focus:border-elec-yellow/60 touch-manipulation data-[state=open]:border-elec-yellow/60';

const selectContentClass =
  'z-[100] max-w-[calc(100vw-2rem)] bg-[hsl(0_0%_12%)] border border-white/[0.08] text-white';

const eyebrow =
  'text-[10px] font-medium uppercase tracking-[0.16em] text-white/55';

export function AddEPARecordSheet({ open, onOpenChange }: AddEPARecordSheetProps) {
  const { data: students, isLoading: studentsLoading } = useCollegeStudents();
  const createEPA = useCreateEPA();
  const { toast } = useToast();
  const { triggerSuccess } = useHapticFeedback();

  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [status, setStatus] = useState<EPAStatus>('Not Started');
  const [gatewayDate, setGatewayDate] = useState('');
  const [epaDate, setEpaDate] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const resetForm = useCallback(() => {
    setSelectedStudentId('');
    setStatus('Not Started');
    setGatewayDate('');
    setEpaDate('');
    setNotes('');
    setShowSuccess(false);
  }, []);

  const handleOpenChange = useCallback(
    (value: boolean) => {
      if (!value) {
        resetForm();
      }
      onOpenChange(value);
    },
    [onOpenChange, resetForm]
  );

  const handleCreate = async () => {
    if (!selectedStudentId) {
      toast({
        title: 'Student required',
        description: 'Please select a student for this EPA record.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await createEPA.mutateAsync({
        student_id: selectedStudentId,
        status,
        gateway_date: gatewayDate || null,
        epa_date: epaDate || null,
        notes: notes || null,
        result: null,
        updated_by: null,
      });

      triggerSuccess();
      setShowSuccess(true);

      const studentName = students?.find((s) => s.id === selectedStudentId)?.name ?? 'student';

      toast({
        title: 'EPA record created',
        description: `EPA record for ${studentName} has been created successfully.`,
      });

      setTimeout(() => {
        setShowSuccess(false);
        handleOpenChange(false);
      }, 1500);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to create EPA record. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const sortedStudents = (students ?? [])
    .filter((s) => s.status === 'Active')
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_8%)]">
        <div className="flex flex-col h-full">
          <SuccessCheckmark show={showSuccess} />

          {/* Drag Handle */}
          <div className="flex justify-center pt-2.5 pb-1 flex-shrink-0">
            <div className="h-1 w-10 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <SheetHeader className="flex-shrink-0 border-b border-white/[0.06] px-5 pb-4">
            <div className={eyebrow}>End Point Assessment</div>
            <SheetTitle className="text-[20px] font-semibold text-white mt-1 text-left">
              Add EPA record
            </SheetTitle>
            <p className="text-[12.5px] text-white/55 mt-1 text-left">
              Create a new End Point Assessment record
            </p>
          </SheetHeader>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-4">
            {/* Student */}
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
              <div className={eyebrow}>Student</div>
              <Select
                value={selectedStudentId}
                onValueChange={setSelectedStudentId}
                disabled={studentsLoading}
              >
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Select a student" />
                </SelectTrigger>
                <SelectContent className={`${selectContentClass} max-h-[280px]`}>
                  {sortedStudents.map((student) => (
                    <SelectItem
                      key={student.id}
                      value={student.id}
                      className="h-11 touch-manipulation"
                    >
                      {student.name}
                    </SelectItem>
                  ))}
                  {sortedStudents.length === 0 && (
                    <div className="p-4 text-center text-[13px] text-white/75">
                      No active students found
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Initial Status */}
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
              <div className={eyebrow}>Initial Status</div>
              <Select value={status} onValueChange={(val) => setStatus(val as EPAStatus)}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  <SelectItem value="Not Started" className="h-11 touch-manipulation">
                    Not Started
                  </SelectItem>
                  <SelectItem value="In Progress" className="h-11 touch-manipulation">
                    In Progress
                  </SelectItem>
                  <SelectItem value="Pre-Gateway" className="h-11 touch-manipulation">
                    Pre-Gateway
                  </SelectItem>
                  <SelectItem value="Gateway Ready" className="h-11 touch-manipulation">
                    Gateway Ready
                  </SelectItem>
                  <SelectItem value="Complete" className="h-11 touch-manipulation">
                    Complete
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dates */}
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-4">
              <div className={eyebrow}>Dates (Optional)</div>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <div className="text-[11.5px] text-white/60">Gateway Date</div>
                  <input
                    type="date"
                    value={gatewayDate}
                    onChange={(e) => setGatewayDate(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="text-[11.5px] text-white/60">EPA Date</div>
                  <input
                    type="date"
                    value={epaDate}
                    onChange={(e) => setEpaDate(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 space-y-3">
              <div className={eyebrow}>Notes</div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any initial notes about this EPA record..."
                className={textareaClass}
              />
            </div>
          </div>

          {/* Footer */}
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
              onClick={handleCreate}
              disabled={isSubmitting || !selectedStudentId}
              className="flex-1 h-11 px-5 bg-elec-yellow text-black rounded-full text-[13px] font-semibold hover:opacity-90 disabled:opacity-40 transition-opacity touch-manipulation"
            >
              {isSubmitting ? 'Creating…' : 'Create Record →'}
            </button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
