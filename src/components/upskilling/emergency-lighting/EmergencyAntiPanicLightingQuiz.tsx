import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye } from 'lucide-react';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import QuizQuestion from '@/components/upskilling/quiz/QuizQuestion';
import QuizNavigation from '@/components/upskilling/quiz/QuizNavigation';
import QuizResults from '@/components/upskilling/quiz/QuizResults';
import { emergencyAntiPanicQuizData } from '@/data/upskilling/emergencyAntiPanicQuizData';

export const EmergencyAntiPanicLightingQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(emergencyAntiPanicQuizData.length).fill(-1));
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < emergencyAntiPanicQuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(emergencyAntiPanicQuizData.length).fill(-1));
    setShowResults(false);
  };

  if (showResults) {
    return (
      <QuizResults 
        questions={emergencyAntiPanicQuizData}
        selectedAnswers={selectedAnswers}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader className="text-center pb-6">
        <CardTitle className="flex items-center justify-center gap-2 text-foreground">
          <Eye className="h-6 w-6 text-elec-yellow" />
          Anti-Panic Lighting Knowledge Check
        </CardTitle>
        <p className="text-foreground/70 mt-2">
          Test your understanding of open area (anti-panic) emergency lighting
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <QuizProgress 
          currentQuestion={currentQuestion}
          totalQuestions={emergencyAntiPanicQuizData.length}
        />
        
        <QuizQuestion
          question={emergencyAntiPanicQuizData[currentQuestion]}
          selectedAnswer={selectedAnswers[currentQuestion] === -1 ? undefined : selectedAnswers[currentQuestion]}
          onAnswerSelect={handleAnswerSelect}
        />
        
        <QuizNavigation
          currentQuestion={currentQuestion}
          totalQuestions={emergencyAntiPanicQuizData.length}
          selectedAnswer={selectedAnswers[currentQuestion] === -1 ? undefined : selectedAnswers[currentQuestion]}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isLastQuestion={currentQuestion === emergencyAntiPanicQuizData.length - 1}
        />
      </CardContent>
    </Card>
  );
};