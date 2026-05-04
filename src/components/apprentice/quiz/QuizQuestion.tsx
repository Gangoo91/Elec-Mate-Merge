import React from 'react';
import { QuestionProps } from '@/types/quiz';

const QuestionComponent: React.FC<QuestionProps> = ({
  question,
  selectedAnswer,
  isAnswered,
  onAnswer,
}) => {
  const handleOptionClick = (index: number) => {
    if (!isAnswered) {
      onAnswer(index);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-5">
        <h3 className="text-[18px] sm:text-[20px] font-semibold text-white leading-snug pb-3 border-b border-white/[0.06]">
          {question.question}
        </h3>

        <div className="space-y-2.5">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = question.correctAnswer === index && isAnswered;
            const isIncorrect = isSelected && isAnswered && !isCorrect;

            let optionClasses =
              'p-4 min-h-[52px] rounded-md border text-[14px] leading-relaxed transition-all touch-manipulation cursor-pointer';

            if (isAnswered) {
              if (isCorrect) {
                optionClasses += ' border-green-500/30 bg-green-500/[0.04] text-white';
              } else if (isIncorrect) {
                optionClasses += ' border-red-500/30 bg-red-500/[0.04] text-white';
              } else {
                optionClasses += ' border-white/[0.06] bg-white/[0.02] text-white/55';
              }
            } else if (isSelected) {
              optionClasses += ' border-elec-yellow bg-elec-yellow/[0.06] text-white';
            } else {
              optionClasses +=
                ' border-white/[0.06] bg-white/[0.02] text-white/85 hover:border-white/15';
            }

            return (
              <div key={index} className={optionClasses} onClick={() => handleOptionClick(index)}>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 ${
                      isSelected || isCorrect
                        ? 'bg-elec-yellow/[0.06] border-elec-yellow text-elec-yellow'
                        : isIncorrect
                          ? 'border-red-400 text-red-400'
                          : 'border-white/15 text-white/55'
                    }`}
                  >
                    <span className="text-[11px] font-mono">{String.fromCharCode(65 + index)}</span>
                  </div>
                  <span>{option}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestionComponent;
