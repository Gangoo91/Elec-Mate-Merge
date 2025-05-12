
import { QuizResultsProps } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, RotateCcw } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const QuizResults = ({
  score,
  totalQuestions,
  questions,
  userAnswers,
  onRetry
}: QuizResultsProps) => {
  // Calculate score percentage
  const percentage = Math.round((score / totalQuestions) * 100);
  const isPassing = percentage >= 70; // 70% is passing
  
  return (
    <div className="space-y-6">
      <div className="p-6 bg-elec-dark border border-elec-yellow/20 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-2">Quiz Results</h2>
        <p className="text-muted-foreground mb-6">You have completed the Health & Safety unit assessment</p>
        
        <div className="mb-8">
          <div className="flex items-center justify-center mb-2">
            <span className="text-4xl font-bold text-elec-yellow">{score}</span>
            <span className="text-xl text-elec-light/70 mx-2">/</span>
            <span className="text-xl text-elec-light/70">{totalQuestions}</span>
          </div>
          
          <div className="flex justify-center items-center mb-2">
            <Progress 
              value={percentage} 
              className="h-2 w-64" 
              indicatorClassName={isPassing ? "bg-green-500" : "bg-amber-500"} 
            />
          </div>
          
          <p className="text-lg">
            <span className="font-bold">{percentage}%</span> - 
            <span className={isPassing ? " text-green-500" : " text-amber-500"}>
              {isPassing ? " Pass" : " Keep practicing"}
            </span>
          </p>
        </div>
        
        <div className={`p-4 rounded-lg ${isPassing ? 'bg-green-500/20 border border-green-500/30' : 'bg-amber-500/20 border border-amber-500/30'}`}>
          {isPassing ? (
            <div className="flex flex-col items-center">
              <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
              <p className="font-medium text-green-500">Congratulations!</p>
              <p className="text-muted-foreground">
                You've successfully passed the Health & Safety assessment.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <XCircle className="h-12 w-12 text-amber-500 mb-2" />
              <p className="font-medium text-amber-500">Almost there!</p>
              <p className="text-muted-foreground">
                You need 70% to pass. Keep studying and try again.
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-6">
          <Button 
            onClick={onRetry}
            className="bg-elec-yellow hover:bg-elec-yellow/80 text-elec-dark"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Retry Quiz
          </Button>
        </div>
      </div>
      
      <div className="p-6 bg-elec-dark border border-elec-yellow/20 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Question Review</h3>
        <div className="space-y-6">
          {questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <div key={index} className="pb-4 border-b border-elec-yellow/10 last:border-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium mb-2">{index + 1}. {question.question}</p>
                    <div className="pl-4 space-y-1 text-sm">
                      {question.options.map((option, optIndex) => {
                        let optionClass = ""; 
                        if (optIndex === question.correctAnswer) {
                          optionClass = "text-green-500";
                        } else if (optIndex === userAnswer && userAnswer !== question.correctAnswer) {
                          optionClass = "text-red-500"; 
                        } else {
                          optionClass = "text-elec-light/70";
                        }
                        
                        return (
                          <p key={optIndex} className={optionClass}>
                            {String.fromCharCode(65 + optIndex)}. {option} 
                            {optIndex === question.correctAnswer && " ✓"}
                          </p>
                        );
                      })}
                    </div>
                    {!isCorrect && question.explanation && (
                      <div className="mt-2 p-2 bg-elec-yellow/5 rounded text-xs border border-elec-yellow/10">
                        <span className="font-medium text-elec-yellow">Explanation:</span> {question.explanation}
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
