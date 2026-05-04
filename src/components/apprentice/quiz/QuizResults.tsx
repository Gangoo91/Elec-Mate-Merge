import { QuizResultsProps } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const QuizResults = ({
  score,
  totalQuestions,
  questions,
  userAnswers,
  onRetry,
}: QuizResultsProps) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPassing = percentage >= 70;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-6 text-center">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Quiz result
          </span>
          <h2 className="text-[20px] sm:text-[22px] font-semibold text-white leading-tight">
            Health & Safety unit assessment
          </h2>
        </div>

        <div className="space-y-3 py-2">
          <div className="text-[40px] font-mono text-white leading-none">{percentage}%</div>
          <div className="text-[14px] text-white/85">
            {score} of {totalQuestions} correct
          </div>

          <div className="h-1 w-64 mx-auto bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-elec-yellow transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p
            className={`text-[14px] ${isPassing ? 'text-elec-yellow' : 'text-white/85'}`}
          >
            {isPassing ? 'Pass' : 'Keep practising'}
          </p>
        </div>

        {isPassing ? (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Result
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">
              Congratulations — you&apos;ve successfully passed the Health & Safety assessment.
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Almost there
            </span>
            <p className="text-[14px] text-white/85 leading-relaxed">
              You need 70% to pass. Keep studying and try again.
            </p>
          </div>
        )}

        <Button
          onClick={onRetry}
          className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98]"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Retry Quiz
        </Button>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-5">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Question review
        </span>
        <div className="space-y-5">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;

            return (
              <div
                key={index}
                className="pb-4 border-b border-white/[0.06] last:border-0 last:pb-0"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-elec-yellow" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] text-white/85 leading-relaxed font-medium mb-2">
                      {index + 1}. {question.question}
                    </p>
                    <div className="space-y-1 text-[13px]">
                      {question.options.map((option, optIndex) => {
                        let optionClass = 'text-white/55';
                        if (optIndex === question.correctAnswer) {
                          optionClass = 'text-elec-yellow';
                        } else if (
                          optIndex === userAnswer &&
                          userAnswer !== question.correctAnswer
                        ) {
                          optionClass = 'text-red-400';
                        }

                        return (
                          <p key={optIndex} className={optionClass}>
                            {String.fromCharCode(65 + optIndex)}. {option}
                            {optIndex === question.correctAnswer && ' ✓'}
                          </p>
                        );
                      })}
                    </div>
                    {!isCorrect && question.explanation && (
                      <div className="mt-3 rounded-md border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                          Explanation
                        </span>
                        <p className="text-[13px] text-white/85 leading-relaxed">
                          {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
