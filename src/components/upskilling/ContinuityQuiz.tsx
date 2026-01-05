
import { useState } from 'react';
import { Brain, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QuizQuestion } from '@/types/quiz';
import QuizNavigation from '@/components/upskilling/quiz/QuizNavigation';

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What does continuity testing confirm?",
    options: [
      "That insulation resistance is adequate",
      "That a conductor is complete and has a low-resistance fault path",
      "That the supply voltage is correct",
      "That RCDs are functioning properly"
    ],
    correctAnswer: 1,
    explanation: "Continuity testing confirms that conductors are electrically continuous from end to end and provide a complete, low-resistance path for fault current to return to the supply."
  },
  {
    id: 2,
    question: "Which conductors are tested for continuity?",
    options: [
      "Only the line conductors",
      "Only the neutral conductors", 
      "CPCs, bonding conductors, and ring circuit conductors",
      "Only the main bonding conductors"
    ],
    correctAnswer: 2,
    explanation: "Continuity testing must be carried out on Circuit Protective Conductors (CPCs), main and supplementary bonding conductors, and all conductors in ring final circuits."
  },
  {
    id: 3,
    question: "True or False: Continuity testing is optional if the wiring looks fine during inspection.",
    options: [
      "True - visual inspection is sufficient",
      "False - continuity testing is always required",
      "True - only if the installation is new",
      "False - but only for commercial installations"
    ],
    correctAnswer: 1,
    explanation: "False. Continuity testing is mandatory regardless of visual appearance. Visual inspection cannot confirm electrical continuity, and this is a critical life safety test."
  },
  {
    id: 4,
    question: "When should continuity testing be carried out?",
    options: [
      "Before visual inspection",
      "After isolation and visual inspection, before other tests",
      "At the same time as insulation resistance testing",
      "Only after all other tests are complete"
    ],
    correctAnswer: 1,
    explanation: "Continuity testing should be carried out after safe isolation and visual inspection, but before insulation resistance and polarity testing. If continuity fails, further testing should not proceed."
  },
  {
    id: 5,
    question: "Why is a break in the CPC dangerous?",
    options: [
      "It reduces the supply voltage",
      "It could prevent fault current from causing protective device operation",
      "It increases the insulation resistance",
      "It affects the power factor"
    ],
    correctAnswer: 1,
    explanation: "A break in the CPC could prevent fault current from returning to the supply and causing protective device operation, leaving exposed metalwork dangerously live during fault conditions."
  },
  {
    id: 6,
    question: "What test current should be used for continuity testing?",
    options: [
      "Between 200mA and 1A",
      "Maximum available from the tester",
      "1mA to avoid damaging circuits",
      "Any current is acceptable"
    ],
    correctAnswer: 0,
    explanation: "BS 7671 requires a test current between 200mA and 1A for continuity testing to ensure accurate readings while avoiding damage to circuits."
  },
  {
    id: 7,
    question: "What is the purpose of testing ring final circuit continuity?",
    options: [
      "To check the circuit breaker rating",
      "To verify both legs of the ring are complete and connected correctly",
      "To measure the insulation resistance",
      "To test RCD operation"
    ],
    correctAnswer: 1,
    explanation: "Ring final circuit continuity testing verifies that both legs of the ring are complete, properly connected, and that there are no interconnections or spurs incorrectly wired."
  },
  {
    id: 8,
    question: "Why must test leads be zeroed before continuity testing?",
    options: [
      "To calibrate the battery voltage",
      "To remove the resistance of the test leads from measurements",
      "To check the tester is working",
      "It's not necessary with modern testers"
    ],
    correctAnswer: 1,
    explanation: "Zeroing removes the resistance of the test leads themselves from the measurement, ensuring accurate readings and preventing false high resistance readings."
  },
  {
    id: 9,
    question: "What action should be taken if a CPC shows high resistance?",
    options: [
      "Continue with other tests",
      "Note it on the certificate and continue",
      "Investigate and rectify before proceeding with further testing",
      "Reduce the test current and try again"
    ],
    correctAnswer: 2,
    explanation: "High CPC resistance indicates a fault that must be investigated and rectified before any further testing, as it represents a potential safety hazard."
  },
  {
    id: 10,
    question: "Which regulation in BS 7671 covers continuity testing requirements?",
    options: [
      "Regulation 612.2",
      "Regulation 543.1", 
      "Regulation 411.3",
      "Regulation 531.2"
    ],
    correctAnswer: 0,
    explanation: "Regulation 612.2 in BS 7671 specifically covers the requirements for continuity of protective conductors, including test methods and acceptance criteria."
  }
];

export const ContinuityQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | undefined)[]>(
    new Array(quizQuestions.length).fill(undefined)
  );
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    console.log('Answer selected:', answerIndex, 'for question:', currentQuestion);
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(quizQuestions.length).fill(undefined));
    setShowResults(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
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
    const percentage = Math.round((score / quizQuestions.length) * 100);

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
            <div className={`text-4xl font-bold ${getScoreColor(score, quizQuestions.length)}`}>
              {score}/{quizQuestions.length}
            </div>
            <div className={`text-2xl font-semibold ${getScoreColor(score, quizQuestions.length)}`}>
              {percentage}%
            </div>
            <p className="text-foreground">
              {percentage >= 80 ? 'Excellent work!' : 
               percentage >= 60 ? 'Good effort! Review the areas you missed.' : 
               'Keep studying! Review the content and try again.'}
            </p>
          </div>

          <div className="space-y-4">
            {quizQuestions.map((question, index) => {
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
                      <p className="text-foreground text-sm">{question.explanation}</p>
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

  const currentQ = quizQuestions[currentQuestion];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Brain className="h-5 w-5 text-elec-yellow" />
          Quick Quiz
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center text-xs sm:text-sm text-foreground">
          <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}% Complete</span>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>

        <div className="space-y-4 sm:space-y-6">
          <h3 className="text-base sm:text-lg font-semibold text-foreground leading-relaxed">{currentQ.question}</h3>
          
          <div className="space-y-3 sm:space-y-4">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion] === index;
              
              return (
                <div
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 sm:p-5 rounded-lg border transition-all duration-200 cursor-pointer select-none min-h-[44px] ${
                    isSelected
                      ? 'border-elec-yellow bg-elec-yellow/10 text-foreground'
                      : 'border-gray-600 bg-[#323232] text-foreground hover:border-gray-500 hover:bg-[#404040]'
                  }`}
                >
                  <div className="flex items-center gap-3 pointer-events-none">
                    <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold flex-shrink-0 ${
                      isSelected
                        ? 'border-elec-yellow bg-elec-yellow text-black'
                        : 'border-gray-500 text-gray-500'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="text-sm sm:text-base leading-relaxed">{option}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <QuizNavigation
          currentQuestion={currentQuestion}
          totalQuestions={quizQuestions.length}
          selectedAnswer={selectedAnswers[currentQuestion]}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isLastQuestion={currentQuestion === quizQuestions.length - 1}
        />
      </CardContent>
    </Card>
  );
};
