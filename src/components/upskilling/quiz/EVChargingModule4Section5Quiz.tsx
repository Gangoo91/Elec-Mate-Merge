import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const quizData = [
  {
    question: "Which SPD type is specifically designed to protect against direct lightning strikes?",
    answers: [
      "Type 1 SPDs",
      "Type 2 SPDs", 
      "Type 3 SPDs",
      "Type 4 SPDs"
    ],
    correctAnswer: 0,
    explanation: "Type 1 SPDs are designed for direct lightning protection, tested with 10/350μs current waveforms and capable of handling the high energy content of direct lightning strikes."
  },
  {
    question: "What is the maximum recommended total lead length for SPD connections?",
    answers: [
      "0.25 metres",
      "0.5 metres",
      "1.0 metre", 
      "1.5 metres"
    ],
    correctAnswer: 1,
    explanation: "SPD connecting leads should be kept as short as possible, ideally less than 0.5m total length (0.25m each way) to minimise inductance and maintain protection effectiveness."
  },
  {
    question: "Which current waveform is used to test Type 2 SPDs?",
    answers: [
      "10/350μs impulse current",
      "8/20μs impulse current",
      "1.2/50μs voltage wave",
      "Combination wave 1.2/50μs - 8/20μs"
    ],
    correctAnswer: 1,
    explanation: "Type 2 SPDs are tested with 8/20μs impulse current waveforms, representing indirect lightning effects and switching surges in electrical installations."
  },
  {
    question: "What is the minimum distance required between protection stages for proper SPD coordination?",
    answers: [
      "5 metres",
      "10 metres",
      "15 metres",
      "20 metres"
    ],
    correctAnswer: 1,
    explanation: "A minimum distance of 10m is required between SPD protection stages to ensure proper energy coordination, unless decoupling inductors are used."
  },
  {
    question: "According to BS 7671, when is surge protection required for electrical circuits?",
    answers: [
      "For all circuits regardless of equipment type",
      "Only for outdoor installations",
      "For circuits supplying equipment with impulse withstand voltage less than 2.5kV",
      "Only in areas with high lightning activity"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 requires surge protection for circuits supplying equipment with rated impulse withstand voltage less than 2.5kV, which includes most EV charging equipment."
  },
  {
    question: "What technology is typically used in Type 2 SPDs for EV charging applications?",
    answers: [
      "Spark gaps",
      "Gas discharge tubes",
      "Metal oxide varistors (MOVs)",
      "Silicon avalanche diodes"
    ],
    correctAnswer: 2,
    explanation: "Type 2 SPDs commonly use metal oxide varistor (MOV) technology, providing fast response times and appropriate energy handling for indirect lightning protection."
  },
  {
    question: "Which additional protection is specifically important for EV charging control circuits?",
    answers: [
      "DC surge protection only",
      "Control pilot signal (CP/PP line) protection",
      "Motor protection devices",
      "Harmonic filters"
    ],
    correctAnswer: 1,
    explanation: "EV charging systems require specific protection for control pilot signals (CP/PP lines) which are essential for safe charging communication between vehicle and charger."
  },
  {
    question: "What is the primary consideration when selecting SPDs for DC rapid charging stations?",
    answers: [
      "Lower voltage requirements only",
      "Reduced current handling capability",
      "Enhanced AC side protection and DC output surge protection",
      "Simplified installation requirements"
    ],
    correctAnswer: 2,
    explanation: "DC rapid charging stations require both enhanced AC side protection due to higher power levels and specific DC output surge protection for the high-voltage DC circuits."
  },
  {
    question: "How should SPD backup protection be provided?",
    answers: [
      "Using the same MCB as other circuits",
      "No backup protection required",
      "Dedicated MCB for each SPD",
      "Shared protection with lighting circuits"
    ],
    correctAnswer: 2,
    explanation: "Each SPD should have dedicated MCB protection, not shared with other circuits, to ensure proper fault isolation and protection coordination."
  },
  {
    question: "What is a key consideration when installing SPDs in relation to RCD protection for EV charging?",
    answers: [
      "SPDs eliminate the need for RCDs",
      "Use only AC type RCDs with SPDs",
      "SPD earth leakage characteristics must be considered in RCD selection",
      "RCDs should be bypassed when SPDs are installed"
    ],
    correctAnswer: 2,
    explanation: "SPDs can cause temporary earth leakage during operation, so their leakage characteristics must be considered when selecting RCD types (A or B) suitable for EV charging applications."
  }
];

export const EVChargingModule4Section5Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (quizCompleted) return;
    
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizData[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    const percentage = (score / quizData.length) * 100;
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / quizData.length) * 100;

    return (
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
              {score}/{quizData.length}
            </div>
            <div className="text-gray-400 text-lg">
              {percentage.toFixed(0)}% Correct
            </div>
          </div>
          
          <div className="space-y-4">
            {quizData.map((question, index) => {
              const isCorrect = selectedAnswers[index] === question.correctAnswer;
              return (
                <div key={index} className="border border-gray-600 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <div className="font-medium text-foreground mb-2">
                        {question.question}
                      </div>
                      <div className="text-sm text-gray-400 mb-2">
                        Your answer: {question.answers[selectedAnswers[index]]}
                      </div>
                      {!isCorrect && (
                        <div className="text-sm text-green-400 mb-2">
                          Correct answer: {question.answers[question.correctAnswer]}
                        </div>
                      )}
                      <div className="text-sm text-gray-300">
                        {question.explanation}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={handleRestart}
              className="bg-elec-yellow text-black hover:bg-yellow-600"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = quizData[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-foreground">Knowledge Check</CardTitle>
          <Badge variant="outline" className="border-gray-600 text-gray-300">
            {currentQuestion + 1} of {quizData.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4">
            {currentQ.question}
          </h3>
          
          <div className="space-y-3">
            {currentQ.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-elec-yellow bg-yellow-600/10 text-foreground'
                    : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500'
                }`}
                disabled={quizCompleted}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-elec-yellow bg-elec-yellow text-black'
                      : 'border-gray-500'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <CheckCircle className="h-4 w-4" />
                    )}
                  </div>
                  <span>{answer}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="bg-elec-gray border-gray-600 text-foreground hover:bg-gray-700"
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!isAnswered}
            className="bg-elec-yellow text-black hover:bg-yellow-600"
          >
            {currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};