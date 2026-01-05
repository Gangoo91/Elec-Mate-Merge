import { useState, useMemo } from 'react';
import { Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import QuizNavigation from '@/components/upskilling/quiz/QuizNavigation';
import { smartHomeSection2QuizQuestions } from '@/data/upskilling/smartHomeSection2QuizData';

export const SmartHomeSection2Quiz = () => {
  const questions = useMemo(() => smartHomeSection2QuizQuestions, []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(undefined as unknown as number));
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentQuestion] = answerIndex;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion((q) => Math.max(0, q - 1));
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(Array(questions.length).fill(undefined as unknown as number));
    setShowResults(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((acc, answer, index) => 
      answer === questions[index].correctAnswer ? acc + 1 : acc, 0
    );
  };

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Brain className="h-5 w-5 text-elec-yellow" />
          Knowledge Assessment: Benefits and Applications
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {showResults ? (
          <div className="space-y-6">
            <div className="flex items-baseline gap-3">
              <p className="text-2xl font-bold text-elec-yellow">
                Score: {calculateScore()} / {questions.length}
              </p>
              <p className="text-gray-400">
                ({Math.round((calculateScore() / questions.length) * 100)}%)
              </p>
            </div>

            <div className="space-y-4">
              {questions.map((question, index) => {
                const isCorrect = selectedAnswers[index] === question.correctAnswer;
                return (
                  <div key={question.id} className="p-4 rounded-md border border-gray-700">
                    <p className="font-semibold text-foreground mb-2">
                      Q{index + 1}. {question.question}
                    </p>
                    <p className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                      Your answer: {question.options[selectedAnswers[index]] || '—'} 
                      {isCorrect ? ' (Correct)' : ' (Incorrect)'}
                    </p>
                    {!isCorrect && (
                      <p className="text-gray-400">
                        Correct: {question.options[question.correctAnswer]}
                      </p>
                    )}
                    <p className="text-gray-300 mt-1">
                      Explanation: {question.explanation}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={resetQuiz} 
                className="bg-elec-yellow text-black hover:bg-yellow-400"
              >
                Restart Quiz
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <QuizProgress 
              currentQuestion={currentQuestion} 
              totalQuestions={questions.length} 
            />

            <div>
              <p className="text-lg font-semibold text-foreground mb-4">
                Q{currentQuestion + 1}. {questions[currentQuestion].question}
              </p>
              <div className="space-y-2">
                {questions[currentQuestion].options.map((option, index) => {
                  const isSelected = selectedAnswers[currentQuestion] === index;
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-left p-3 rounded-md border transition-colors ${
                        isSelected
                          ? 'bg-elec-yellow text-black border-elec-yellow'
                          : 'border-gray-700 hover:bg-[#323232] text-gray-300'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            <QuizNavigation
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
              selectedAnswer={selectedAnswers[currentQuestion]}
              onPrevious={handlePrevious}
              onNext={handleNext}
              isLastQuestion={currentQuestion === questions.length - 1}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};