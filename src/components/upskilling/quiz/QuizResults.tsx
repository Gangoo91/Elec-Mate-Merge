
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { QuizQuestion } from '@/types/quiz';

interface QuizResultsProps {
  questions: QuizQuestion[];
  selectedAnswers: number[];
  onRestart: () => void;
}

const QuizResults = ({ questions, selectedAnswers, onRestart }: QuizResultsProps) => {
  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreMessage = (score: number) => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "Excellent! You have a strong understanding of inspection and testing fundamentals.";
    if (percentage >= 60) return "Good work! You have a solid grasp of the basics with room for improvement.";
    if (percentage >= 40) return "Fair effort. Consider reviewing the material to strengthen your understanding.";
    return "You may need to review the content more thoroughly before proceeding.";
  };

  const score = calculateScore();

  return (
    <div className="space-y-6">
      <Card className="bg-[#323232] border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground text-center">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-elec-yellow mb-2">
              {score} / {questions.length}
            </div>
            <div className="text-foreground mb-4">
              {getScoreMessage(score)}
            </div>
          </div>
          
          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <Card key={question.id} className="bg-elec-gray border-transparent">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-3">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-foreground font-medium text-sm mb-2">
                          {question.question}
                        </p>
                        <p className={`text-xs mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                          <strong>Your answer:</strong> {question.options[userAnswer]}
                        </p>
                        {!isCorrect && (
                          <p className="text-green-400 text-xs mb-2">
                            <strong>Correct answer:</strong> {question.options[question.correctAnswer]}
                          </p>
                        )}
                        <p className="text-foreground text-xs">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="text-center pt-4">
            <Button 
              onClick={onRestart}
              className="bg-elec-yellow text-black hover:bg-yellow-400"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizResults;
