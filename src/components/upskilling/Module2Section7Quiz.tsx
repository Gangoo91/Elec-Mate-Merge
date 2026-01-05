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
    question: "What percentage of common testing errors can be prevented through proper pre-test preparation?",
    options: [
      "Up to 50%",
      "Up to 60%",
      "Up to 80%",
      "Up to 90%"
    ],
    correctAnswer: 2,
    explanation: "Proper preparation can prevent up to 80% of common testing errors. This demonstrates why systematic pre-test procedures are so important for accuracy and safety."
  },
  {
    id: 2,
    question: "What is the first step in any pre-test preparation checklist?",
    options: [
      "Check instrument calibration",
      "Conduct site assessment and safety verification",
      "Review documentation",
      "Test equipment verification"
    ],
    correctAnswer: 1,
    explanation: "Site assessment and safety verification must come first to identify environmental hazards, access issues, and workspace adequacy before any other preparation activities begin."
  },
  {
    id: 3,
    question: "According to GS 38, when should test leads be inspected?",
    options: [
      "Weekly",
      "Monthly",
      "Before each use",
      "Only when calibration is due"
    ],
    correctAnswer: 2,
    explanation: "GS 38 requires test leads to be inspected before each use. This includes checking for insulation damage, probe condition, and finger guard integrity to prevent accidents."
  },
  {
    id: 4,
    question: "What is the correct sequence for voltage indicator testing?",
    options: [
      "Test on unknown source, then prove on known live source",
      "Prove on known live source, use for testing, prove again on known live source",
      "Self-test only before use",
      "Visual inspection followed by battery check"
    ],
    correctAnswer: 1,
    explanation: "The correct sequence is: prove on known live source → use for testing → prove again on known live source. This ensures the indicator is working before and after use."
  },
  {
    id: 5,
    question: "What should be included in isolation planning?",
    options: [
      "Only the main circuit to be tested",
      "All sources of supply and coordination with building occupants",
      "Just the distribution board being worked on",
      "Only emergency circuits"
    ],
    correctAnswer: 1,
    explanation: "Isolation planning must identify ALL sources of supply, plan the isolation sequence, coordinate with occupants, and prepare appropriate lock-off devices for comprehensive safety."
  },
  {
    id: 6,
    question: "What is the most critical environmental condition to check before testing?",
    options: [
      "Temperature levels",
      "Lighting adequacy",
      "Dry conditions - no moisture present",
      "Noise levels"
    ],
    correctAnswer: 2,
    explanation: "Dry conditions are absolutely critical. Any moisture creates serious electrical hazards and can damage sensitive test equipment. Testing should be postponed if any dampness is present."
  },
  {
    id: 7,
    question: "What documentation should be reviewed before commencing testing?",
    options: [
      "Only the current RAMS",
      "Previous EICR, circuit schedules, RAMS, and as-built drawings",
      "Just the building plans",
      "Only safety certificates"
    ],
    correctAnswer: 1,
    explanation: "Comprehensive documentation review should include current RAMS, previous EICR/certificates, circuit schedules, distribution board charts, as-built drawings, and permit to work authorisations."
  },
  {
    id: 8,
    question: "How should lock-off procedures be communicated?",
    options: [
      "Verbal notification only",
      "Email to management",
      "Clear warning signs and established communication protocols",
      "Note in the site diary"
    ],
    correctAnswer: 2,
    explanation: "Lock-off procedures require clear 'Danger - Do Not Switch On' signs, notification of all affected parties, established emergency communication methods, and documented key holders."
  },
  {
    id: 9,
    question: "What personal preparation factor is most important for safe testing?",
    options: [
      "Having the right tools",
      "Being well-rested and alert",
      "Wearing company uniform",
      "Having previous experience"
    ],
    correctAnswer: 1,
    explanation: "Being well-rested and alert is crucial as fatigue significantly increases error rates and accident risk. Testing should be avoided when fatigued or distracted."
  },
  {
    id: 10,
    question: "What should be done if sensitive equipment is connected to circuits being tested?",
    options: [
      "Test at lower voltages",
      "Disconnect or isolate sensitive equipment before testing",
      "Test quickly to minimise exposure",
      "Use insulation testing only"
    ],
    correctAnswer: 1,
    explanation: "Sensitive equipment such as computers, medical devices, or control systems must be disconnected or isolated before high-voltage testing to prevent expensive damage."
  }
];

const Module2Section7Quiz = () => {
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
    if (percentage >= 80) return 'Excellent! You have mastered pre-test preparation procedures.';
    if (percentage >= 60) return 'Good work! Review the areas you missed to strengthen your preparation skills.';
    return 'Consider reviewing the material again to improve your understanding of systematic preparation.';
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

export default Module2Section7Quiz;