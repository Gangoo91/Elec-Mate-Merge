import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

const quizData = [
  {
    question: "What is the minimum depth requirement for earth rod installation in typical soil conditions?",
    answers: [
      "1.2 metres below ground level",
      "1.8 metres below ground level", 
      "2.4 metres below ground level",
      "3.0 metres below ground level"
    ],
    correctAnswer: 2,
    explanation: "Earth rods should penetrate to a minimum depth of 2.4m in most soil types to reach stable moisture levels and provide effective earth contact below the frost line."
  },
  {
    question: "What is the recommended minimum spacing between multiple earth rods for optimal effectiveness?",
    answers: [
      "Equal to the rod length",
      "1.5 times the rod length",
      "2.5 times the rod length", 
      "5 times the rod length"
    ],
    correctAnswer: 2,
    explanation: "Earth rods should be spaced at least 2.5 times their length apart to avoid mutual interference effects and achieve additive resistance reduction."
  },
  {
    question: "Which earth resistance testing method provides the most accurate results for new installations?",
    answers: [
      "Clamp-on earth resistance testing",
      "Fall-of-potential method",
      "Two-wire resistance measurement",
      "Stakeless earth testing"
    ],
    correctAnswer: 1,
    explanation: "The fall-of-potential method using current and potential probes provides the most accurate earth resistance measurements for new installations and verification testing."
  },
  {
    question: "What is the maximum earth resistance typically required for a TT system with 30mA RCD protection?",
    answers: [
      "50 ohms",
      "100 ohms",
      "200 ohms",
      "1667 ohms"
    ],
    correctAnswer: 1,
    explanation: "While theoretically 1667Ω is acceptable (50V ÷ 0.03A), practically aim for less than 100Ω to ensure reliable RCD operation and allow for electrode deterioration."
  },
  {
    question: "What minimum copper coating thickness is required for copper-bonded steel earth rods?",
    answers: [
      "100 microns",
      "200 microns",
      "250 microns",
      "350 microns"
    ],
    correctAnswer: 2,
    explanation: "Copper-bonded steel earth rods must have a minimum copper coating thickness of 250 microns to provide adequate corrosion protection and conductivity."
  },
  {
    question: "During fall-of-potential testing, at what distances should the potential probe be positioned for verification?",
    answers: [
      "0.5D, 0.6D, and 0.7D from the earth electrode",
      "0.52D, 0.62D, and 0.72D from the earth electrode",
      "0.4D, 0.5D, and 0.6D from the earth electrode", 
      "0.3D, 0.4D, and 0.5D from the earth electrode"
    ],
    correctAnswer: 1,
    explanation: "The potential probe should be positioned at 0.52D, 0.62D, and 0.72D from the earth electrode to verify test validity, with readings within ±5%."
  },
  {
    question: "What type of earth electrode is most suitable for chemically contaminated soil conditions?",
    answers: [
      "Galvanised steel rods",
      "Copper-bonded steel rods",
      "Stainless steel electrodes",
      "Cast iron earth plates"
    ],
    correctAnswer: 2,
    explanation: "Stainless steel electrodes (preferably 316L grade) offer the best corrosion resistance in chemically contaminated or aggressive soil conditions."
  },
  {
    question: "How often should earth electrode resistance be tested for ongoing compliance verification?",
    answers: [
      "Annually",
      "Every 2 years",
      "Every 5 years",
      "Every 10 years"
    ],
    correctAnswer: 2,
    explanation: "Earth electrode resistance should be tested every 5 years or when changes occur to the installation, with annual visual inspections of connections."
  },
  {
    question: "What is the recommended minimum cross-sectional area for earth electrode connections?",
    answers: [
      "2.5mm²",
      "4mm²", 
      "6mm²",
      "10mm²"
    ],
    correctAnswer: 2,
    explanation: "Earth electrode connections should use a minimum 6mm² conductor, with larger sizes required for higher fault currents or longer cable runs."
  },
  {
    question: "When using bentonite clay to enhance earth electrode performance, what is the primary benefit?",
    answers: [
      "Increases mechanical strength of the electrode",
      "Provides corrosion protection",
      "Reduces earth resistance in high resistivity soil",
      "Prevents electrode movement"
    ],
    correctAnswer: 2,
    explanation: "Bentonite clay absorbs moisture and provides a low-resistance path around the earth electrode, particularly effective in reducing earth resistance in high resistivity soils."
  }
];

export const EVChargingModule4Section4Quiz = () => {
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