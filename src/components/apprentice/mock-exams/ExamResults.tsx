import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface ExamResultsProps {
  examTitle: string;
  questions: Question[];
  selectedAnswers: Record<number, number>;
  onReturn: () => void;
}

const ExamResults: React.FC<ExamResultsProps> = ({
  examTitle,
  questions,
  selectedAnswers,
  onReturn,
}) => {
  const navigate = useNavigate();

  const calculateResults = () => {
    let correctCount = 0;

    questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });

    const percentage = (correctCount / questions.length) * 100;

    return {
      correct: correctCount,
      total: questions.length,
      percentage: Math.round(percentage),
    };
  };

  const results = calculateResults();

  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-6">
      <div className="space-y-1">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Exam result
        </span>
        <h2 className="text-[20px] sm:text-[22px] font-semibold text-white leading-tight">
          {examTitle}
        </h2>
      </div>

      <div className="text-center py-4 space-y-2">
        <div className="text-[40px] font-mono text-white leading-none">{results.percentage}%</div>
        <p className="text-[14px] text-white/85 leading-relaxed">
          {results.correct} of {results.total} questions correct
        </p>
      </div>

      <div className="space-y-6 pt-2 border-t border-white/[0.06]">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Review your answers
        </span>

        {questions.map((question, index) => (
          <div key={question.id} className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                {selectedAnswers[question.id] === question.correctAnswer ? (
                  <CheckCircle className="h-5 w-5 text-elec-yellow mt-1" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-400 mt-1" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-[14px] text-white/85 leading-relaxed font-medium">
                  {index + 1}. {question.text}
                </p>
                <div className="mt-3 space-y-1.5">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`p-3 rounded-md text-[13px] ${
                        optionIndex === question.correctAnswer
                          ? 'bg-elec-yellow/[0.06] border border-elec-yellow/30 text-white'
                          : optionIndex === selectedAnswers[question.id]
                            ? 'bg-red-500/[0.04] border border-red-500/30 text-white/85'
                            : 'bg-white/[0.02] border border-white/[0.06] text-white/70'
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
                {selectedAnswers[question.id] !== question.correctAnswer && (
                  <div className="mt-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                      Explanation
                    </span>
                    <p className="text-[14px] text-white/85 leading-relaxed">
                      {question.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
        onClick={onReturn}
      >
        Return to Mock Exams
      </Button>
    </div>
  );
};

export default ExamResults;
