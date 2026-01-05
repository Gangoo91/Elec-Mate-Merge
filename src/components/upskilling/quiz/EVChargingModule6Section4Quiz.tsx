import { useState } from 'react';
import { Brain, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QuizQuestion } from '@/types/quiz';

const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the first step in diagnosing EV charging installation faults according to BS 7671?",
    options: [
      "Replace the RCD immediately",
      "Systematic isolation and safe working procedures",
      "Contact the manufacturer",
      "Test the earth loop impedance"
    ],
    correctAnswer: 1,
    explanation: "BS 7671 requires systematic isolation and implementation of safe working procedures before any fault diagnosis begins."
  },
  {
    id: 2,
    question: "When an RCD trips repeatedly on an EV charging circuit, the most likely cause is:",
    options: [
      "Overload on the circuit",
      "Earth leakage current exceeding the RCD rating",
      "Wrong fuse rating",
      "Poor ventilation"
    ],
    correctAnswer: 1,
    explanation: "Repeated RCD tripping typically indicates earth leakage current exceeding the RCD's rated residual current, often due to insulation breakdown or moisture ingress."
  },
  {
    id: 3,
    question: "If an EV charging point shows no power output, what should be checked first?",
    options: [
      "The vehicle compatibility",
      "Supply voltage and protective device operation",
      "The charging cable",
      "Control pilot signal strength"
    ],
    correctAnswer: 1,
    explanation: "First check that supply voltage is present and that no protective devices have operated, as this covers the most common causes of complete power loss."
  },
  {
    id: 4,
    question: "When remedial work requires component replacement, BS 7671 requires:",
    options: [
      "Any equivalent component can be used",
      "Only exact manufacturer replacements",
      "Components meeting original specifications and standards",
      "Components rated 10% higher than original"
    ],
    correctAnswer: 2,
    explanation: "Replacement components must meet or exceed the original specifications and relevant standards, but don't need to be from the same manufacturer."
  },
  {
    id: 5,
    question: "After completing remedial work on an EV charging installation, what is mandatory?",
    options: [
      "Visual inspection only",
      "Full testing schedule and certification",
      "Basic continuity test only",
      "Manufacturer notification"
    ],
    correctAnswer: 1,
    explanation: "After remedial work, a full testing schedule must be completed and appropriate certification issued to ensure compliance with BS 7671."
  },
  {
    id: 6,
    question: "Common causes of overheating in EV charging connections include:",
    options: [
      "Too much current only",
      "Poor connections, incorrect torque settings, and contamination",
      "Wrong cable colour",
      "Excessive ventilation"
    ],
    correctAnswer: 1,
    explanation: "Overheating typically results from poor connections, incorrect torque settings, contamination, or oxidation increasing resistance at connection points."
  },
  {
    id: 7,
    question: "When Control Pilot communication fails, possible causes include:",
    options: [
      "Wrong charging rate only",
      "Cable damage, connector faults, or electronic control issues",
      "Incorrect earthing only",
      "Wrong supply voltage"
    ],
    correctAnswer: 1,
    explanation: "Control Pilot failures can result from physical cable damage, connector faults, or electronic control system malfunctions affecting vehicle-charger communication."
  },
  {
    id: 8,
    question: "Documentation requirements for remedial work include:",
    options: [
      "Basic work description only",
      "Detailed records of faults found, work done, and test results",
      "Invoice only",
      "Verbal report to client"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive documentation must include fault identification, remedial action taken, test results, and any recommendations for future maintenance."
  },
  {
    id: 9,
    question: "When investigating charging speed issues, key factors to check include:",
    options: [
      "Cable length only",
      "Supply characteristics, temperature derating, and communication protocols",
      "Cable colour coding",
      "Time of day only"
    ],
    correctAnswer: 1,
    explanation: "Charging speed can be affected by supply voltage/frequency, ambient temperature derating, vehicle-charger communication, and load management systems."
  },
  {
    id: 10,
    question: "Safety isolation requirements during remedial work include:",
    options: [
      "Switching off at the charger only",
      "Complete isolation, locking off, and verification of dead circuit",
      "Unplugging the vehicle only",
      "Reducing current only"
    ],
    correctAnswer: 1,
    explanation: "Safe isolation requires complete supply isolation, secure locking off, and verification that the circuit is dead before any remedial work begins."
  }
];

export const EVChargingModule6Section4Quiz = () => {
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
              {percentage >= 80 ? 'Excellent understanding of fault diagnosis procedures!' : 
               percentage >= 60 ? 'Good knowledge! Review the areas you missed.' : 
               'Keep studying fault diagnosis techniques and try again.'}
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

export default EVChargingModule6Section4Quiz;