import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface StartQuizPanelProps {
  isCompleted: boolean;
  onStartQuiz: () => void;
  onBack: () => void;
}

const StartQuizPanel = ({ isCompleted, onStartQuiz, onBack }: StartQuizPanelProps) => {
  return (
    <div className="flex flex-col h-full space-y-6">
      <p className="text-[14px] text-white/85 leading-relaxed">
        This quiz will test your understanding of the key health and safety concepts covered in
        this unit. Complete the quiz to demonstrate your knowledge.
      </p>

      {isCompleted && (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0 mt-0.5" />
          <p className="text-[14px] text-white/85 leading-relaxed">
            You have already completed this quiz. You can retake it to improve your score.
          </p>
        </div>
      )}

      <div className="flex-grow rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-5">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Timed assessment
          </span>
          <h3 className="text-[18px] font-semibold text-white">45 minutes</h3>
        </div>

        <ul className="space-y-2">
          {[
            'You have 45 minutes to complete the quiz',
            'You can retake the quiz as many times as needed',
            'Take your time and read each question carefully',
          ].map((note, idx) => (
            <li
              key={idx}
              className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
              <span>{note}</span>
            </li>
          ))}
        </ul>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Important
          </span>
          <p className="text-[14px] text-white/85 leading-relaxed">
            Make sure you have enough time to complete the quiz before starting. If you leave the
            page, your progress may be lost.
          </p>
        </div>
      </div>

      <div className="flex justify-between gap-3">
        <Button
          variant="outline"
          className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation w-[120px]"
          onClick={onBack}
        >
          Back
        </Button>

        <Button
          onClick={onStartQuiz}
          className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98] w-[140px]"
        >
          {isCompleted ? 'Retake Quiz' : 'Start Quiz'}
        </Button>
      </div>
    </div>
  );
};

export default StartQuizPanel;
