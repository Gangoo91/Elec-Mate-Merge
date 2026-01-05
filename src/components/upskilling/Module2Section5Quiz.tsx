import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What is the standard calibration interval for multifunction test instruments used in routine electrical testing?",
    options: [
      "6 months",
      "12 months", 
      "24 months",
      "36 months"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 and professional standards recommend 12-month calibration intervals for multifunction testers. This balances cost against the risk of measurement drift whilst ensuring legal compliance."
  },
  {
    id: 2,
    question: "Which organisation provides the UK's national measurement standards for electrical calibration traceability?",
    options: [
      "BSI (British Standards Institution)",
      "IET (Institution of Engineering and Technology)",
      "NPL (National Physical Laboratory)",
      "HSE (Health and Safety Executive)"
    ],
    correctAnswer: 2,
    explanation: "The National Physical Laboratory (NPL) maintains the UK's national measurement standards. All legitimate calibration certificates should show traceability back to NPL standards through an unbroken chain."
  },
  {
    id: 3,
    question: "According to GS 38, what is the most critical daily check for test leads?",
    options: [
      "Checking the lead length",
      "Testing continuity between probe and instrument",
      "Visual inspection for insulation damage",
      "Verifying the lead colour coding"
    ],
    correctAnswer: 2,
    explanation: "Visual inspection for cuts, nicks, or damage to insulation is critical. Damaged test leads can expose users to dangerous voltages and are the most common cause of test-related electrical accidents."
  },
  {
    id: 4,
    question: "What should you do if your test instrument fails its calibration check?",
    options: [
      "Continue using it but note the failure on certificates",
      "Use it only for low-voltage testing",
      "Stop using it immediately and review recent test results",
      "Recalibrate it yourself using a proving unit"
    ],
    correctAnswer: 2,
    explanation: "Immediately stop using failed instruments and review recent work. Failed calibration means readings may have been inaccurate, potentially affecting safety. Some certificates may need to be recalled."
  },
  {
    id: 5,
    question: "What does UKAS accreditation on a calibration certificate guarantee?",
    options: [
      "The instrument will never fail",
      "The calibration is legally acceptable in UK courts",
      "The instrument is suitable for all testing applications",
      "The calibration is free from measurement uncertainty"
    ],
    correctAnswer: 1,
    explanation: "UKAS (United Kingdom Accreditation Service) accreditation provides confidence that calibration meets international standards and will be accepted by courts, insurance companies, and regulatory bodies."
  },
  {
    id: 6,
    question: "How often should test instruments be visually inspected?",
    options: [
      "Before each use (daily if used regularly)",
      "Weekly",
      "Monthly", 
      "Only when calibration is due"
    ],
    correctAnswer: 0,
    explanation: "Test instruments should be visually inspected before each use. Daily checks help identify damage early, prevent accidents, and ensure reliable operation throughout the working day."
  },
  {
    id: 7,
    question: "What environmental condition can most significantly affect test instrument accuracy?",
    options: [
      "High humidity",
      "Low light levels",
      "Excessive noise",
      "Temperature extremes"
    ],
    correctAnswer: 3,
    explanation: "Temperature extremes can significantly affect electronic circuits and battery performance. Most instruments have specified operating temperature ranges, and accuracy can deteriorate outside these limits."
  },
  {
    id: 8,
    question: "Which document must be checked to verify an instrument's calibration status?",
    options: [
      "User manual",
      "Calibration certificate",
      "Purchase receipt",
      "Insurance certificate"
    ],
    correctAnswer: 1,
    explanation: "The calibration certificate shows calibration date, due date, measurement uncertainties, and traceability. It's the only document that proves an instrument's measurement accuracy and legal compliance."
  },
  {
    id: 9,
    question: "What is the main risk of using test instruments beyond their calibration due date?",
    options: [
      "The instrument will stop working",
      "Readings may be inaccurate, affecting safety",
      "The warranty will be void",
      "The battery will drain faster"
    ],
    correctAnswer: 1,
    explanation: "Out-of-calibration instruments may give false readings, potentially passing dangerous installations as safe or failing safe installations unnecessarily. This creates serious safety and legal risks."
  },
  {
    id: 10,
    question: "What is the best practice for storing test instruments when not in use?",
    options: [
      "In a toolbox with other tools",
      "In the van or vehicle",
      "In a clean, dry environment with original cases",
      "On the workshop bench ready for use"
    ],
    correctAnswer: 2,
    explanation: "Instruments should be stored in clean, dry conditions using their original protective cases. This prevents physical damage, moisture ingress, and contamination that could affect accuracy and reliability."
  }
];

const Module2Section5Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(undefined);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === undefined) return;

    if (!showExplanation) {
      setShowExplanation(true);
      const newUserAnswers = [...userAnswers];
      newUserAnswers[currentQuestion] = selectedAnswer;
      setUserAnswers(newUserAnswers);

      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
    } else {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(undefined);
        setShowExplanation(false);
      } else {
        setQuizComplete(true);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(undefined);
    setShowExplanation(false);
    setScore(0);
    setQuizComplete(false);
    setUserAnswers([]);
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 80) return 'Excellent! You have a strong understanding of instrument calibration and maintenance.';
    if (percentage >= 60) return 'Good work! Review the areas you missed to strengthen your knowledge.';
    return 'Consider reviewing the material again to improve your understanding of calibration requirements.';
  };

  if (quizComplete) {
    const percentage = (score / questions.length) * 100;
    
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground text-center">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-4xl font-bold">
            <span className={getScoreColor(percentage)}>
              {score}/{questions.length}
            </span>
          </div>
          <div className="text-xl text-gray-300">
            Score: <span className={getScoreColor(percentage)}>{percentage.toFixed(0)}%</span>
          </div>
          <p className="text-gray-300 max-w-md mx-auto">
            {getScoreMessage(percentage)}
          </p>
          <Button 
            onClick={resetQuiz}
            className="bg-elec-yellow text-black hover:bg-yellow-400"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground text-lg">
            {currentQ.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQ.options.map((option, index) => {
            let buttonClass = "w-full text-left p-4 rounded-lg border transition-all duration-200 ";
            
            if (showExplanation) {
              if (index === currentQ.correctAnswer) {
                buttonClass += "border-green-500 bg-green-500/20 text-foreground";
              } else if (index === selectedAnswer && index !== currentQ.correctAnswer) {
                buttonClass += "border-red-500 bg-red-500/20 text-foreground";
              } else {
                buttonClass += "border-gray-600 bg-elec-gray text-gray-400";
              }
            } else {
              if (selectedAnswer === index) {
                buttonClass += "border-elec-yellow bg-yellow-600/20 text-foreground";
              } else {
                buttonClass += "border-gray-600 bg-elec-gray text-gray-300 hover:border-gray-500 hover:bg-[#323232]";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={buttonClass}
                disabled={showExplanation}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6">
                    {showExplanation && index === currentQ.correctAnswer && (
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    )}
                    {showExplanation && index === selectedAnswer && index !== currentQ.correctAnswer && (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                    {!showExplanation && (
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === index
                          ? 'border-elec-yellow bg-elec-yellow'
                          : 'border-gray-600'
                      }`}>
                        {selectedAnswer === index && (
                          <div className="w-2 h-2 rounded-full bg-black"></div>
                        )}
                      </div>
                    )}
                  </div>
                  <span className="text-sm">{option}</span>
                </div>
              </button>
            );
          })}
        </CardContent>
      </Card>

      {/* Explanation */}
      {showExplanation && (
        <Card className="bg-blue-900/20 border border-blue-600/30">
          <CardContent className="pt-6">
            <p className="text-blue-200 text-sm leading-relaxed">
              <strong>Explanation:</strong> {currentQ.explanation}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <div className="text-sm text-gray-400">
          Score: {score}/{currentQuestion + (showExplanation ? 1 : 0)}
        </div>
        <Button
          onClick={handleNext}
          disabled={selectedAnswer === undefined}
          className="bg-elec-yellow text-black hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {!showExplanation ? 'Submit Answer' : 
           currentQuestion === questions.length - 1 ? 'Complete Quiz' : 'Next Question'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Module2Section5Quiz;