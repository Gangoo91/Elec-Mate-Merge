import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface CompletionButtonProps {
  isCompleted: boolean;
  markAsComplete: () => void;
}

const CompletionButton = ({ isCompleted, markAsComplete }: CompletionButtonProps) => {
  return (
    <div className="flex justify-end pt-4 mt-6 border-t border-white/[0.06]">
      <Button
        onClick={markAsComplete}
        disabled={isCompleted}
        className="h-11 px-6 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98] disabled:opacity-40"
      >
        {isCompleted ? 'Section completed' : 'Mark as complete'}
        {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
      </Button>
    </div>
  );
};

export default CompletionButton;
