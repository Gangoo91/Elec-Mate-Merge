
import React, { useState } from 'react';
import { diagnosticQuestions } from './diagnosticQuestions';
import { generateResult } from './diagnosticLogic';
import { DiagnosticResult } from './types';
import DiagnosticQuestionCard from './DiagnosticQuestionCard';
import DiagnosticResultCard from './DiagnosticResultCard';

const DiagnosticWizard = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const newAnswers = { ...answers, [diagnosticQuestions[currentQuestion].id]: selectedAnswer };
    setAnswers(newAnswers);

    if (currentQuestion < diagnosticQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      const diagnosticResult = generateResult(newAnswers);
      setResult(diagnosticResult);
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const previousAnswer = answers[diagnosticQuestions[currentQuestion - 1].id] || '';
      setSelectedAnswer(previousAnswer);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedAnswer('');
    setShowResult(false);
    setResult(null);
  };

  if (showResult && result) {
    return <DiagnosticResultCard result={result} onRestart={handleRestart} />;
  }

  return (
    <DiagnosticQuestionCard
      question={diagnosticQuestions[currentQuestion]}
      currentQuestion={currentQuestion}
      totalQuestions={diagnosticQuestions.length}
      selectedAnswer={selectedAnswer}
      onAnswerSelect={handleAnswerSelect}
      onNext={handleNext}
      onPrevious={handlePrevious}
      canGoNext={!!selectedAnswer}
      canGoPrevious={currentQuestion > 0}
      isLastQuestion={currentQuestion === diagnosticQuestions.length - 1}
    />
  );
};

export default DiagnosticWizard;
