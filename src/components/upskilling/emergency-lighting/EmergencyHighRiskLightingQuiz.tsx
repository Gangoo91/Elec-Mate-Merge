import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { emergencyHighRiskQuizData } from '@/data/upskilling/emergencyHighRiskQuizData';
import QuizQuestion from '@/components/upskilling/quiz/QuizQuestion';
import QuizResults from '@/components/upskilling/quiz/QuizResults';
import QuizNavigation from '@/components/upskilling/quiz/QuizNavigation';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';

export const EmergencyHighRiskLightingQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(emergencyHighRiskQuizData.questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < emergencyHighRiskQuizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(emergencyHighRiskQuizData.questions.length).fill(-1));
    setShowResults(false);
  };

  if (showResults) {
    return (
      <QuizResults
        questions={emergencyHighRiskQuizData.questions}
        selectedAnswers={selectedAnswers}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <Card className="bg-[#323232] border-elec-yellow/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          {emergencyHighRiskQuizData.title}
        </CardTitle>
        <p className="text-gray-300 text-sm">
          {emergencyHighRiskQuizData.description}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <QuizProgress
          currentQuestion={currentQuestion}
          totalQuestions={emergencyHighRiskQuizData.questions.length}
        />
        
        <QuizQuestion
          question={emergencyHighRiskQuizData.questions[currentQuestion]}
          selectedAnswer={selectedAnswers[currentQuestion]}
          onAnswerSelect={handleAnswerSelect}
        />
        
        <QuizNavigation
          currentQuestion={currentQuestion}
          totalQuestions={emergencyHighRiskQuizData.questions.length}
          selectedAnswer={selectedAnswers[currentQuestion]}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isLastQuestion={currentQuestion === emergencyHighRiskQuizData.questions.length - 1}
        />
      </CardContent>
    </Card>
  );
};