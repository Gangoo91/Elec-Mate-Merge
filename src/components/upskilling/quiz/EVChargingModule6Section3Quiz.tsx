import { useState } from 'react';
import { Brain, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QuizQuestion } from '@/types/quiz';

const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the minimum insulation resistance required for a 400V EV charging circuit under BS 7671?",
    options: [
      "0.5 MΩ",
      "1.0 MΩ", 
      "1.5 MΩ",
      "2.0 MΩ"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires a minimum of 1.0 MΩ insulation resistance for circuits operating at 400V nominal voltage."
  },
  {
    id: 2,
    question: "During earth fault loop impedance testing for EV charging points, what is the maximum Zs value for a 32A Type B MCB?",
    options: [
      "0.87Ω",
      "1.15Ω",
      "1.37Ω",
      "1.44Ω"
    ],
    correctAnswer: 3,
    explanation: "For a 32A Type B MCB, the maximum Zs value is 1.44Ω to ensure disconnection within the required time."
  },
  {
    id: 3,
    question: "Which test method is preferred for earth fault loop impedance testing on EV charging circuits?",
    options: [
      "Direct test method only",
      "No-trip test method",
      "External fault loop test only",
      "Any method is acceptable"
    ],
    correctAnswer: 1,
    explanation: "The no-trip test method is preferred for EV charging circuits to avoid nuisance tripping of RCDs and ensure circuit protection remains active."
  },
  {
    id: 4,
    question: "What additional verification is required for smart EV charging systems?",
    options: [
      "Only electrical testing",
      "Communication protocols and environmental monitoring",
      "Visual inspection only",
      "Standard electrical tests are sufficient"
    ],
    correctAnswer: 1,
    explanation: "Smart EV charging systems require verification of communication protocols, environmental monitoring systems, and integration with grid management systems."
  },
  {
    id: 5,
    question: "The Control Pilot (CP) signal testing verifies:",
    options: [
      "Earth continuity only",
      "Communication between vehicle and charging point",
      "Insulation resistance values",
      "RCD sensitivity"
    ],
    correctAnswer: 1,
    explanation: "Control Pilot signal testing verifies proper communication between the electric vehicle and charging point, including charge state signalling and safety interlocks."
  },
  {
    id: 6,
    question: "Emergency stop systems on EV charging points must be tested to ensure:",
    options: [
      "They stop charging within 5 seconds",
      "They completely isolate the supply within the required time",
      "They only reduce charging current",
      "They sound an alarm only"
    ],
    correctAnswer: 1,
    explanation: "Emergency stop systems must completely isolate the supply within the specified time to ensure user safety and compliance with BS 7671."
  },
  {
    id: 7,
    question: "What is the required test voltage for insulation resistance testing on EV charging circuits rated at 230V?",
    options: [
      "250V DC",
      "500V DC",
      "750V DC",
      "1000V DC"
    ],
    correctAnswer: 1,
    explanation: "For circuits rated up to 500V including 230V, the test voltage should be 500V DC according to BS 7671."
  },
  {
    id: 8,
    question: "Pre-testing safety requirements for EV charging installations include:",
    options: [
      "Visual inspection only",
      "Safe isolation, securing, and visual inspection",
      "Just turning off the main switch",
      "Testing with power on"
    ],
    correctAnswer: 1,
    explanation: "Pre-testing safety requires proper isolation, securing against re-energisation, and thorough visual inspection before any electrical testing begins."
  },
  {
    id: 9,
    question: "What environmental factors must be considered during EV charging testing?",
    options: [
      "Temperature only",
      "Humidity only", 
      "Temperature, humidity, and exposure conditions",
      "None - testing is the same regardless"
    ],
    correctAnswer: 2,
    explanation: "Environmental factors including temperature, humidity, and exposure conditions can affect test results and equipment safety."
  },
  {
    id: 10,
    question: "Loop impedance testing on EV circuits should verify that fault current will:",
    options: [
      "Flow to earth only",
      "Operate protective devices within required disconnection times",
      "Reduce to safe levels gradually",
      "Activate the emergency stop only"
    ],
    correctAnswer: 1,
    explanation: "Loop impedance testing ensures that fault current will be sufficient to operate protective devices within the required disconnection times for safety."
  }
];

export const EVChargingModule6Section3Quiz = () => {
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
              {percentage >= 80 ? 'Excellent understanding of BS 7671 testing procedures!' : 
               percentage >= 60 ? 'Good knowledge! Review the areas you missed.' : 
               'Keep studying the testing requirements and try again.'}
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

export default EVChargingModule6Section3Quiz;