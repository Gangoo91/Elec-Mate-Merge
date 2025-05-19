
import { AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ExamExitDialogProps {
  open: boolean;
  onClose: () => void;
  onExit: () => void;
}

const ExamExitDialog: React.FC<ExamExitDialogProps> = ({
  open,
  onClose,
  onExit
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="bg-elec-gray border-elec-yellow/30">
        <AlertDialogHeader className="flex flex-col items-center">
          <AlertTriangle className="h-12 w-12 text-amber-500 mb-2" />
          <AlertDialogTitle>Exit Exam?</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Your progress will be lost if you exit now. 
            Are you sure you want to leave the exam?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-2">
          <AlertDialogCancel className="w-full sm:w-auto">Continue Exam</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onExit}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
          >
            Exit Exam
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ExamExitDialog;
