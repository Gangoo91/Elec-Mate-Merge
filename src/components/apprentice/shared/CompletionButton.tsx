
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface CompletionButtonProps {
  isCompleted: boolean;
  markAsComplete: () => void;
}

const CompletionButton = ({ isCompleted, markAsComplete }: CompletionButtonProps) => {
  return (
    <div className="flex justify-end pt-6 mt-8 border-t border-elec-yellow/20">
      <Button
        onClick={markAsComplete}
        disabled={isCompleted}
        size="lg"
        className={`rounded-xl min-h-[48px] px-6 ${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold'}`}
      >
        {isCompleted ? 'Section Completed' : 'Mark as Complete'}
        {isCompleted && <CheckCircle className="ml-2 h-5 w-5" />}
      </Button>
    </div>
  );
};

export default CompletionButton;
