
import { QuizQuestion } from '@/types/quiz';

interface ProtectiveConductorQuizQuestionProps {
  question: QuizQuestion;
  selectedAnswer?: number;
  onAnswerSelect: (answerIndex: number) => void;
}

export const ProtectiveConductorQuizQuestion = ({ 
  question, 
  selectedAnswer, 
  onAnswerSelect 
}: ProtectiveConductorQuizQuestionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">{question.question}</h3>
      
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          
          return (
            <div
              key={index}
              onClick={() => onAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-200 cursor-pointer select-none ${
                isSelected
                  ? 'border-elec-yellow bg-elec-yellow/10 text-foreground'
                  : 'border-gray-600 bg-[#323232] text-gray-300 hover:border-gray-500 hover:bg-[#404040]'
              }`}
            >
              <div className="flex items-center gap-3 pointer-events-none">
                <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${
                  isSelected
                    ? 'border-elec-yellow bg-elec-yellow text-black'
                    : 'border-gray-500 text-gray-500'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
