
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

interface ExamExitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExit: () => void;
}

const ExamExitDialog: React.FC<ExamExitDialogProps> = ({ open, onOpenChange, onExit }) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Exit Exam?</AlertDialogTitle>
          <AlertDialogDescription>
            Your progress will be lost if you exit now. Are you sure you want to leave the exam?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Continue Exam</AlertDialogCancel>
          <AlertDialogAction onClick={onExit}>
            Exit Exam
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ExamExitDialog;
