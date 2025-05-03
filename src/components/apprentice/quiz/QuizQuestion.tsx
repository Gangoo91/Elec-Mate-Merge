
import { QuestionProps } from "@/types/quiz";

const QuizQuestion = ({ question, selectedAnswer, isAnswered, onAnswer }: QuestionProps) => {
  return (
    <div className="py-4">
      <h4 className="text-lg font-medium mb-4">{question.question}</h4>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <div 
            key={index}
            className={`
              p-3 rounded-md border cursor-pointer transition-all
              ${selectedAnswer === index 
                ? selectedAnswer === question.correctAnswer
                  ? 'border-green-500 bg-green-500/10'
                  : 'border-destructive bg-destructive/10'
                : isAnswered && index === question.correctAnswer
                  ? 'border-green-500 bg-green-500/10'
                  : 'border-elec-yellow/30 hover:border-elec-yellow hover:bg-elec-yellow/5'
              }
            `}
            onClick={() => onAnswer(index)}
          >
            <div className="flex items-center gap-3">
              <div className={`
                flex items-center justify-center h-6 w-6 rounded-full shrink-0
                ${selectedAnswer === index 
                  ? selectedAnswer === question.correctAnswer
                    ? 'bg-green-500 text-white'
                    : 'bg-destructive text-destructive-foreground'
                  : isAnswered && index === question.correctAnswer
                    ? 'bg-green-500 text-white'
                    : 'bg-elec-yellow/70 text-elec-dark'
                }
              `}>
                {String.fromCharCode(65 + index)}
              </div>
              <span>{option}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
