import { useState, useCallback } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
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
import { Award, Calendar, FileText, Loader2, Plus, User } from 'lucide-react';

interface AddEPARecordSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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

  // Sort students alphabetically for the dropdown
  const sortedStudents = (students ?? [])
    .filter((s) => s.status === 'Active')
    .sort((a, b) => a.name.localeCompare(b.name));

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
                <Award className="h-6 w-6 text-elec-yellow" />
              </div>
              <div className="flex-1 min-w-0">
                <SheetTitle className="text-xl text-left">Add EPA Record</SheetTitle>
                <p className="text-sm text-white mt-0.5">
                  Create a new End Point Assessment record
                </p>
              </div>
            </div>
          </SheetHeader>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-4 space-y-4">
            {/* Student Selector */}
            <Card className="border-white/10">
              <CardContent className="p-4 space-y-3">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <User className="h-4 w-4 text-elec-yellow" />
                  Student
                </h4>
                <Select
                  value={selectedStudentId}
                  onValueChange={setSelectedStudentId}
                  disabled={studentsLoading}
                >
                  <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent className="z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground max-h-[280px]">
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
                      <div className="p-4 text-center text-sm text-white">
                        No active students found
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Initial Status */}
            <Card className="border-white/10">
              <CardContent className="p-4 space-y-3">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
                  Initial Status
                </h4>
                <Select value={status} onValueChange={(val) => setStatus(val as EPAStatus)}>
                  <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground">
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
              </CardContent>
            </Card>

            {/* Dates */}
            <Card className="border-white/10">
              <CardContent className="p-4 space-y-4">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-elec-yellow" />
                  Dates (Optional)
                </h4>
                <div className="space-y-3">
                  <div>
                    <Label className="text-xs text-white mb-1 block">Gateway Date</Label>
                    <Input
                      type="date"
                      value={gatewayDate}
                      onChange={(e) => setGatewayDate(e.target.value)}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-white mb-1 block">EPA Date</Label>
                    <Input
                      type="date"
                      value={epaDate}
                      onChange={(e) => setEpaDate(e.target.value)}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="border-white/10">
              <CardContent className="p-4 space-y-3">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <FileText className="h-4 w-4 text-elec-yellow" />
                  Notes
                </h4>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any initial notes about this EPA record..."
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
              onClick={handleCreate}
              disabled={isSubmitting || !selectedStudentId}
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              Create Record
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}
