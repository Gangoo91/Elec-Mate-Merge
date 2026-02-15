import { useState } from 'react';
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogBody,
} from '@/components/ui/responsive-dialog';
import { Button } from '@/components/ui/button';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import type { CollegeStudent } from '@/contexts/CollegeSupabaseContext';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WithdrawStudentDialogProps {
  student: CollegeStudent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWithdrawn?: () => void;
}

export function WithdrawStudentDialog({
  student,
  open,
  onOpenChange,
  onWithdrawn,
}: WithdrawStudentDialogProps) {
  const { withdrawStudent } = useCollegeSupabase();
  const { toast } = useToast();
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const handleWithdraw = async () => {
    if (!student) return;
    setIsWithdrawing(true);

    try {
      await withdrawStudent(student.id);
      toast({
        title: 'Student Withdrawn',
        description: `${student.name} has been withdrawn successfully.`,
      });
      onOpenChange(false);
      onWithdrawn?.();
    } catch (error) {
      console.error('Failed to withdraw student:', error);
      toast({
        title: 'Withdrawal Failed',
        description: 'There was an error withdrawing the student. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsWithdrawing(false);
    }
  };

  if (!student) return null;

  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent className="sm:max-w-[440px]">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Withdraw Student
          </ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            This will change the student's status and remove them from active registers.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>

        <ResponsiveDialogBody>
          <div className="space-y-4">
            <p className="text-sm text-white">
              Are you sure you want to withdraw <strong>{student.name}</strong>?
            </p>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 space-y-1">
              <p className="text-sm font-medium text-destructive">This action will:</p>
              <ul className="text-sm text-white space-y-1 list-disc pl-4">
                <li>Change the student's status to "Withdrawn"</li>
                <li>Remove them from active cohort registers</li>
                <li>Flag any outstanding assessments as incomplete</li>
              </ul>
            </div>
            <p className="text-xs text-white">
              Records will be preserved for audit purposes. This can be reversed by changing status
              back to "Active".
            </p>
          </div>
        </ResponsiveDialogBody>

        <ResponsiveDialogFooter>
          <Button
            variant="outline"
            className="h-11 touch-manipulation"
            onClick={() => onOpenChange(false)}
            disabled={isWithdrawing}
          >
            Cancel
          </Button>
          <Button
            className="h-11 touch-manipulation bg-destructive hover:bg-destructive/90 text-white gap-2"
            onClick={handleWithdraw}
            disabled={isWithdrawing}
          >
            {isWithdrawing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Withdrawing...
              </>
            ) : (
              'Withdraw Student'
            )}
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  );
}
