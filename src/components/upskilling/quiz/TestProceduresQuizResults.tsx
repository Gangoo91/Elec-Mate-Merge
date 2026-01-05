
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Brain } from 'lucide-react';
import { QuizQuestion } from '@/types/quiz';

interface TestProceduresQuizResultsProps {
  questions: QuizQuestion[];
  selectedAnswers: (number | undefined)[];
  onRestart: () => void;
}

export const TestProceduresQuizResults = ({ 
  questions, 
  selectedAnswers, 
  onRestart 
}: TestProceduresQuizResultsProps) => {
  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Brain className="h-5 w-5 text-elec-yellow" />
          Quiz Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-4">
          <div className={`text-4xl font-bold ${getScoreColor(score, questions.length)}`}>
            {score}/{questions.length}
          </div>
          <div className={`text-2xl font-semibold ${getScoreColor(score, questions.length)}`}>
            {percentage}%
          </div>
          <p className="text-foreground">
            {percentage >= 80 ? 'Excellent work!' : 
             percentage >= 60 ? 'Good effort! Review the areas you missed.' : 
             'Keep studying! Review the content and try again.'}
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((question, index) => {
            const userAnswer = selectedAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <div key={question.id} className="bg-[#323232] rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-foreground font-medium mb-2">{question.question}</p>
                    <p className={`text-sm mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                      Your answer: {question.options[userAnswer || 0]}
                    </p>
                    {!isCorrect && (
                      <p className="text-green-400 text-sm mb-2">
                        Correct answer: {question.options[question.correctAnswer]}
                      </p>
                    )}
                    <p className="text-foreground text-sm">{question.explanation}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={onRestart}
            className="bg-elec-yellow text-black hover:bg-yellow-400"
          >
            Retake Quiz
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
