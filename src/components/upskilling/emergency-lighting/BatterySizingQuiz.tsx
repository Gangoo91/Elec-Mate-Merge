import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, BookOpen } from 'lucide-react';
import { batterySizingQuizData } from '@/data/upskilling/emergencyLightingModule4Section3QuizData';

export const BatterySizingQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    new Array(batterySizingQuizData.length).fill(false)
  );

  const handleAnswerClick = (answerIndex: number) => {
    if (answeredQuestions[currentQuestion]) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);
    
    if (answerIndex === batterySizingQuizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentQuestion(currentQuestion + 1);
  };

  const handlePreviousQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setCurrentQuestion(currentQuestion - 1);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Array(batterySizingQuizData.length).fill(false));
  };

  const question = batterySizingQuizData[currentQuestion];
  const isLastQuestion = currentQuestion === batterySizingQuizData.length - 1;
  const allQuestionsAnswered = answeredQuestions.every(answered => answered);

  return (
    <Card className="bg-slate-200/20 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Knowledge Check Quiz
        </CardTitle>
        <p className="text-sm text-gray-400">
          Question {currentQuestion + 1} of {batterySizingQuizData.length}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {!allQuestionsAnswered || currentQuestion < batterySizingQuizData.length ? (
          <>
            <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4">
              <h3 className="text-foreground text-lg font-semibold mb-4">
                {question.question}
              </h3>
              <div className="space-y-3">
                {question.answers.map((answer, index) => {
                  const isCorrect = index === question.correctAnswer;
                  const isSelected = selectedAnswer === index;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(index)}
                      disabled={answeredQuestions[currentQuestion]}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        answeredQuestions[currentQuestion]
                          ? isCorrect
                            ? 'border-green-500 bg-green-900/20'
                            : isSelected
                            ? 'border-red-500 bg-red-900/20'
                            : 'border-gray-600/30 bg-gray-800/30'
                          : 'border-gray-600/30 bg-gray-800/50 hover:border-elec-yellow/50 hover:bg-gray-800/70'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {answeredQuestions[currentQuestion] && (
                          <div className="mt-0.5">
                            {isCorrect ? (
                              <CheckCircle className="h-5 w-5 text-green-400" />
                            ) : isSelected ? (
                              <XCircle className="h-5 w-5 text-red-400" />
                            ) : null}
                          </div>
                        )}
                        <span className={`${
                          answeredQuestions[currentQuestion] && isCorrect
                            ? 'text-green-300'
                            : answeredQuestions[currentQuestion] && isSelected
                            ? 'text-red-300'
                            : 'text-foreground'
                        }`}>
                          {answer}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {showResult && (
              <div className={`border-2 rounded-lg p-4 ${
                selectedAnswer === question.correctAnswer
                  ? 'border-green-500 bg-green-900/20'
                  : 'border-red-500 bg-red-900/20'
              }`}>
                <p className={`font-semibold mb-2 ${
                  selectedAnswer === question.correctAnswer
                    ? 'text-green-300'
                    : 'text-red-300'
                }`}>
                  {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="text-sm text-gray-300">{question.explanation}</p>
              </div>
            )}

            <div className="flex gap-3">
              {currentQuestion > 0 && (
                <Button
                  onClick={handlePreviousQuestion}
                  variant="outline"
                  className="text-foreground border-gray-600 hover:bg-gray-800"
                >
                  Previous
                </Button>
              )}
              {answeredQuestions[currentQuestion] && !isLastQuestion && (
                <Button
                  onClick={handleNextQuestion}
                  className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 ml-auto"
                >
                  Next Question
                </Button>
              )}
            </div>
          </>
        ) : null}

        {allQuestionsAnswered && (
          <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Quiz Complete!</h3>
            <p className="text-xl text-elec-yellow mb-6">
              Your Score: {score} out of {batterySizingQuizData.length}
            </p>
            <p className="text-gray-300 mb-6">
              {score === batterySizingQuizData.length
                ? 'Perfect score! You have excellent understanding of battery sizing principles.'
                : score >= batterySizingQuizData.length * 0.7
                ? 'Good work! You have a solid grasp of battery sizing fundamentals.'
                : 'Consider reviewing the material and trying again to improve your understanding.'}
            </p>
            <Button
              onClick={resetQuiz}
              className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
            >
              Retake Quiz
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
