
import { useState } from 'react';
import { Brain, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QuizQuestion } from '@/types/quiz';
import QuizNavigation from '@/components/upskilling/quiz/QuizNavigation';

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What does the initial ring continuity test check?",
    options: [
      "That insulation resistance is adequate",
      "That each conductor (L, N, CPC) forms a complete loop",
      "That the voltage drop is acceptable",
      "That RCD operation times are correct"
    ],
    correctAnswer: 1,
    explanation: "The initial ring continuity test checks that each conductor (line, neutral, and CPC) forms a complete loop from the distribution board and back."
  },
  {
    id: 2,
    question: "Why are cross-connections used in ring testing?",
    options: [
      "To increase test voltage",
      "To check that conductors are correctly wired at each accessory",
      "To reduce testing time",
      "To improve test accuracy"
    ],
    correctAnswer: 1,
    explanation: "Cross-connections are used to check that conductors are correctly wired at each accessory and to identify interconnections or wiring faults."
  },
  {
    id: 3,
    question: "True or False: If one leg of the CPC is disconnected, the ring will still function safely.",
    options: [
      "True - the other leg provides protection",
      "False - earth protection is compromised",
      "True - only if RCD protection is present",
      "False - but only for high-power loads"
    ],
    correctAnswer: 1,
    explanation: "False. If one leg of the CPC is disconnected, earth protection is compromised, potentially leaving some outlets without proper earthing."
  },
  {
    id: 4,
    question: "What would a significantly low resistance reading at one socket suggest during a cross-connection test?",
    options: [
      "Perfect continuity",
      "A possible interconnection or wiring fault",
      "Normal ring operation",
      "High-quality connections"
    ],
    correctAnswer: 1,
    explanation: "A significantly low resistance reading at one socket suggests a possible interconnection with another circuit or a wiring fault that creates a parallel path."
  },
  {
    id: 5,
    question: "Which conductor usually shows higher resistance in the end-to-end test?",
    options: [
      "Line conductor",
      "Neutral conductor", 
      "CPC (due to smaller cross-sectional area)",
      "All should be identical"
    ],
    correctAnswer: 2,
    explanation: "The CPC usually shows higher resistance due to its smaller cross-sectional area compared to line and neutral conductors in many cable types."
  },
  {
    id: 6,
    question: "What is the purpose of testing at both ends of the ring circuit?",
    options: [
      "To double-check the readings",
      "To verify the ring is complete and identify which leg is which",
      "To test different socket outlets",
      "To reduce measurement errors"
    ],
    correctAnswer: 1,
    explanation: "Testing at both ends verifies the ring is complete and helps identify which conductors form the outgoing and return legs of the ring."
  },
  {
    id: 7,
    question: "What should you do if the end-to-end readings show infinite resistance?",
    options: [
      "Continue with cross-connection testing",
      "Record as a limitation and continue",
      "Investigate for open circuit and rectify before proceeding",
      "Use a different test instrument"
    ],
    correctAnswer: 2,
    explanation: "Infinite resistance indicates an open circuit that must be investigated and rectified before any further testing can proceed safely."
  },
  {
    id: 8,
    question: "During cross-connection testing, what should the resistance readings be?",
    options: [
      "All readings should be identical",
      "Readings should gradually increase from the distribution board",
      "Readings should be roughly equal with slight variation due to cable lengths",
      "Readings should be infinite at all points"
    ],
    correctAnswer: 2,
    explanation: "Cross-connection readings should be roughly equal with slight variations due to different cable lengths to each socket outlet on the ring."
  },
  {
    id: 9,
    question: "What indicates a successful ring final circuit test?",
    options: [
      "All readings below 1 ohm",
      "End-to-end continuity confirmed and cross-connections showing expected values",
      "No open circuits detected",
      "All socket outlets working when energised"
    ],
    correctAnswer: 1,
    explanation: "A successful test requires confirmed end-to-end continuity on all conductors plus cross-connection readings showing expected values without anomalies."
  },
  {
    id: 10,
    question: "Which regulation in BS 7671 covers ring final circuit testing?",
    options: [
      "Regulation 612.2.2",
      "Regulation 433.1.5",
      "Regulation 411.3.2",
      "Regulation 543.7"
    ],
    correctAnswer: 0,
    explanation: "Regulation 612.2.2 in BS 7671 specifically covers the testing requirements for ring final circuits, including continuity and cross-connection tests."
  }
];

export const RingFinalQuiz = () => {
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
        <div className="flex justify-between items-center text-sm text-foreground">
          <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}% Complete</span>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">{currentQ.question}</h3>
          
          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion] === index;
              
              return (
                <div
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 cursor-pointer select-none ${
                    isSelected
                      ? 'border-elec-yellow bg-elec-yellow/10 text-foreground'
                      : 'border-gray-600 bg-[#323232] text-foreground hover:border-gray-500 hover:bg-[#404040]'
                  }`}
                >
                  <div className="flex items-center gap-3 pointer-events-none">
                    <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${
                      isSelected
                        ? 'border-elec-yellow bg-elec-yellow text-black'
                        : 'border-gray-500 text-foreground/60'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
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
