import { useState } from 'react';
import { Brain, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QuizQuestion } from '@/types/quiz';

const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: "Within how many days must an Electrical Installation Certificate be provided to the customer?",
    options: [
      "7 days",
      "14 days", 
      "28 days",
      "30 days"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 requires that a copy of the Electrical Installation Certificate must be provided to the customer within 28 days of completion of the work."
  },
  {
    id: 2,
    question: "What is the recommended frequency for RCD testing using the test button in domestic installations?",
    options: [
      "Weekly",
      "Monthly",
      "Quarterly", 
      "Annually"
    ],
    correctAnswer: 1,
    explanation: "RCD test buttons should be operated monthly to ensure the device is functioning correctly. This is a simple test that can be performed by the user."
  },
  {
    id: 3,
    question: "Which document provides legal evidence that an installation has been designed and constructed in accordance with BS 7671?",
    options: [
      "Minor Works Certificate",
      "Electrical Installation Certificate",
      "Condition Report",
      "Test Result Schedule"
    ],
    correctAnswer: 1,
    explanation: "The Electrical Installation Certificate (EIC) is the legal document that certifies compliance with BS 7671 for new installations or additions."
  },
  {
    id: 4,
    question: "What should be done if an error is discovered on a completed Electrical Installation Certificate?",
    options: [
      "Use correction fluid to fix the error",
      "Overwrite the incorrect information",
      "Strike through the error, initial it, and attach an amendment",
      "Issue a completely new certificate"
    ],
    correctAnswer: 2,
    explanation: "Errors should be formally corrected by striking through, initialing the change, and providing an amendment sheet if necessary. Never use correction fluid or overwrite."
  },
  {
    id: 5,
    question: "How long should installation certificates and test results be retained by the installer?",
    options: [
      "2 years",
      "5 years", 
      "6 years minimum",
      "Life of the installation"
    ],
    correctAnswer: 2,
    explanation: "Installers should retain copies for at least 6 years for insurance and legal purposes, though customers should keep them for the life of the installation."
  },
  {
    id: 6,
    question: "What is the purpose of the Schedule of Test Results?",
    options: [
      "To record material costs",
      "To provide detailed evidence of electrical test compliance",
      "To schedule future maintenance",
      "To list equipment warranties"
    ],
    correctAnswer: 1,
    explanation: "The Schedule of Test Results provides detailed evidence that all required electrical tests have been performed and results meet BS 7671 requirements."
  },
  {
    id: 7,
    question: "Which of the following should be included in emergency contact information for customers?",
    options: [
      "Only the installation company details",
      "24/7 emergency electrical services and company contacts",
      "Just the equipment manufacturer support",
      "Only local emergency services"
    ],
    correctAnswer: 1,
    explanation: "Emergency contacts should include 24/7 electrical emergency services, installation company details, equipment manufacturer support, and guidance on when to use each."
  },
  {
    id: 8,
    question: "What type of labels are recommended for outdoor EV charging installations?",
    options: [
      "Standard paper labels",
      "Laminated paper labels",
      "Marine-grade vinyl or aluminium labels",
      "Temporary adhesive labels"
    ],
    correctAnswer: 2,
    explanation: "Outdoor installations require marine-grade vinyl or aluminium labels with UV-stable inks and weather-resistant adhesive for 15+ year durability."
  },
  {
    id: 9,
    question: "In a comprehensive handover package, what documentation relates to future maintenance planning?",
    options: [
      "Installation drawings only",
      "Warranty certificates only",
      "Maintenance schedule, procedures, and contact information",
      "Test results only"
    ],
    correctAnswer: 2,
    explanation: "Maintenance planning requires a schedule of tasks, detailed procedures for each maintenance activity, and contact information for support services."
  },
  {
    id: 10,
    question: "What is the recommended interval for professional inspection and testing of commercial EV charging installations?",
    options: [
      "6 months",
      "Annually",
      "Every 2 years",
      "Every 5 years"
    ],
    correctAnswer: 1,
    explanation: "Commercial EV charging installations should receive professional inspection and testing annually to ensure continued safe operation and compliance."
  }
];

export const EVChargingModule6Section5Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | undefined)[]>(
    new Array(quizData.length).fill(undefined)
  );
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (!showAnswer) {
      setShowAnswer(true);
    } else {
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setShowAnswer(false);
      } else {
        setQuizCompleted(true);
        setShowResults(true);
      }
    }
  };

  const handlePrevious = () => {
    if (showAnswer) {
      setShowAnswer(false);
    } else if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowAnswer(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(quizData.length).fill(undefined));
    setShowResults(false);
    setQuizCompleted(false);
    setShowAnswer(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizData[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quizData.length) * 100);

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
            <div className={`text-4xl font-bold ${getScoreColor(score, quizData.length)}`}>
              {score}/{quizData.length}
            </div>
            <div className={`text-2xl font-semibold ${getScoreColor(score, quizData.length)}`}>
              {percentage}%
            </div>
            <p className="text-gray-300">
              {percentage >= 80 ? 'Excellent understanding of customer walkthrough and labelling procedures!' : 
               percentage >= 60 ? 'Good knowledge! Review the areas you missed.' : 
               'Keep studying walkthrough and labelling requirements and try again.'}
            </p>
          </div>

          <div className="space-y-4">
            {quizData.map((question, index) => {
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
                      <p className="text-gray-300 text-sm">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button
              onClick={resetQuiz}
              className="bg-elec-yellow text-black hover:bg-yellow-400"
            >
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = quizData[currentQuestion];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Brain className="h-5 w-5 text-elec-yellow" />
          Quick Quiz
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>Question {currentQuestion + 1} of {quizData.length}</span>
          <span>{Math.round(((currentQuestion + 1) / quizData.length) * 100)}% Complete</span>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">{currentQ.question}</h3>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion] === index;
              const isCorrect = index === currentQ.correctAnswer;
              const showOptionResult = showAnswer;
              
              let optionClasses = "w-full text-left p-4 rounded-lg border transition-all duration-200 select-none ";
              
              if (showOptionResult) {
                if (isCorrect) {
                  optionClasses += "border-green-400 bg-green-400/20 text-green-400";
                } else if (isSelected && !isCorrect) {
                  optionClasses += "border-red-400 bg-red-400/20 text-red-400";
                } else {
                  optionClasses += "border-gray-600 bg-[#323232] text-gray-300";
                }
              } else {
                optionClasses += `cursor-pointer ${
                  isSelected
                    ? 'border-elec-yellow bg-elec-yellow/10 text-foreground'
                    : 'border-gray-600 bg-[#323232] text-gray-300 hover:border-gray-500 hover:bg-[#404040]'
                }`;
              }
              
              return (
                <div
                  key={index}
                  onClick={!showAnswer ? () => handleAnswerSelect(index) : undefined}
                  className={optionClasses}
                >
                  <div className="flex items-center gap-3 pointer-events-none">
                    <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${
                      showOptionResult
                        ? (isCorrect 
                          ? 'border-green-400 bg-green-400 text-black'
                          : isSelected && !isCorrect
                          ? 'border-red-400 bg-red-400 text-foreground'
                          : 'border-gray-500 text-gray-500')
                        : (isSelected
                          ? 'border-elec-yellow bg-elec-yellow text-black'
                          : 'border-gray-500 text-gray-500')
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {showOptionResult && isCorrect && (
                      <CheckCircle className="h-4 w-4 text-green-400 ml-auto" />
                    )}
                    {showOptionResult && isSelected && !isCorrect && (
                      <XCircle className="h-4 w-4 text-red-400 ml-auto" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {showAnswer && (
            <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-4">
              <p className="text-blue-300 font-semibold mb-2">Explanation:</p>
              <p className="text-gray-300 text-sm">{currentQ.explanation}</p>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0 && !showAnswer}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-[#323232] hover:text-foreground disabled:opacity-50"
          >
            {showAnswer ? 'Back to Question' : 'Previous'}
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!showAnswer && selectedAnswers[currentQuestion] === undefined}
            className="bg-elec-yellow text-black hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {showAnswer 
              ? (currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next Question')
              : 'Show Answer'
            }
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EVChargingModule6Section5Quiz;