
import React from "react";
import { QuestionProps } from "@/types/quiz";

const QuestionComponent: React.FC<QuestionProps> = ({ 
  question, 
  selectedAnswer, 
  isAnswered, 
  onAnswer 
}) => {
  const handleOptionClick = (index: number) => {
    if (!isAnswered) {
      onAnswer(index);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-elec-dark border border-elec-yellow/20 rounded-lg">
        <h3 className="text-lg font-semibold mb-6 border-b border-elec-yellow/20 pb-3">
          {question.question}
        </h3>
        
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = question.correctAnswer === index && isAnswered;
            const isIncorrect = isSelected && isAnswered && !isCorrect;
            
            let optionClasses = "p-4 border rounded-md transition-all relative";
            
            if (isSelected) {
              optionClasses += " border-elec-yellow bg-elec-yellow/10";
            } else {
              optionClasses += " border-elec-gray/30 hover:border-elec-yellow/50 hover:bg-elec-yellow/5";
            }
            
            if (isAnswered) {
              if (isCorrect) {
                optionClasses = "p-4 border border-green-500 bg-green-500/10 rounded-md";
              } else if (isIncorrect) {
                optionClasses = "p-4 border border-red-500 bg-red-500/10 rounded-md";
              } else {
                optionClasses += " opacity-70";
              }
            }
            
            return (
              <div
                key={index}
                className={optionClasses}
                onClick={() => handleOptionClick(index)}
              >
                <div className="flex items-center">
                  <div 
                    className={`w-6 h-6 mr-3 rounded-full border flex items-center justify-center
                      ${isSelected ? 'bg-elec-yellow/90 border-elec-yellow' : 'border-elec-light/30'}`}
                  >
                    <span className="text-xs">
                      {String.fromCharCode(65 + index)}
                    </span>
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
