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
    question: "Why must electrical equipment be readily accessible?",
    options: [
      "To make the installation look professional",
      "To ensure safe and complete inspection, testing, and maintenance",
      "To comply with insurance requirements only", 
      "To reduce installation costs"
    ],
    correctAnswer: 1,
    explanation: "Equipment must be readily accessible to ensure safe and complete inspection, testing, and maintenance as required by BS 7671."
  },
  {
    id: 2,
    question: "Which of the following must be clearly labelled on a distribution board?",
    options: [
      "Only the main switch",
      "Circuit purpose, protective device, and isolation point",
      "Just the RCD devices",
      "Only emergency circuits"
    ],
    correctAnswer: 1,
    explanation: "Circuit purpose, protective device, and isolation point must all be clearly labelled to ensure proper identification and safety."
  },
  {
    id: 3,
    question: "True or False: You can assume circuit layout if labels are missing.",
    options: [
      "True - assumptions are acceptable for experienced electricians",
      "False - assumptions should never be made",
      "True - only for simple installations",
      "False - but only if documented properly"
    ],
    correctAnswer: 1,
    explanation: "False. You should never assume circuit layout if labels are missing. This creates safety risks and compliance issues."
  },
  {
    id: 4,
    question: "What should you do if a key test point is blocked by a fixed structure?",
    options: [
      "Force access by removing the obstruction",
      "Skip that test and continue with others",
      "Record it as a limitation and do not proceed until access is made safe",
      "Estimate the values based on similar circuits"
    ],
    correctAnswer: 2,
    explanation: "Record it as a limitation and do not proceed until access is made safe. Never force access or make assumptions."
  },
  {
    id: 5,
    question: "Which notice is required when an RCD is installed?",
    options: [
      "A maintenance schedule only",
      "A test notice showing how and when to test the RCD",
      "An installation certificate reference",
      "A warranty information sheet"
    ],
    correctAnswer: 1,
    explanation: "A test notice showing how and when to test the RCD is required to ensure proper ongoing maintenance and safety."
  },
  {
    id: 6,
    question: "What is the minimum height requirement for consumer units in domestic properties?",
    options: [
      "1.0m from floor level",
      "1.35m from floor level",
      "1.8m from floor level",
      "No specific height requirement"
    ],
    correctAnswer: 1,
    explanation: "Consumer units in domestic properties must be mounted at least 1.35m from floor level for accessibility and safety reasons."
  },
  {
    id: 7,
    question: "Which areas require emergency lighting circuits to be clearly identified?",
    options: [
      "Only hospitals and schools",
      "All commercial premises",
      "Only buildings over 3 storeys",
      "Premises with escape lighting systems"
    ],
    correctAnswer: 3,
    explanation: "Any premises with escape lighting systems must have emergency lighting circuits clearly identified for maintenance and emergency purposes."
  },
  {
    id: 8,
    question: "What should you do if cable identification labels are illegible?",
    options: [
      "Make your best guess",
      "Use a circuit tracer to verify and re-label",
      "Skip testing that circuit",
      "Assume standard layout"
    ],
    correctAnswer: 1,
    explanation: "If cable identification labels are illegible, use a circuit tracer to verify the circuit and create new, clear labels."
  },
  {
    id: 9,
    question: "How should isolation points be marked in industrial installations?",
    options: [
      "With electrical warning signs only",
      "Clear, durable labels stating the circuit controlled",
      "Just with the isolation point symbol",
      "No marking required if obvious"
    ],
    correctAnswer: 1,
    explanation: "Isolation points must be clearly marked with durable labels stating exactly what circuit or equipment they control."
  },
  {
    id: 10,
    question: "What minimum clearance is required around distribution boards?",
    options: [
      "500mm all around",
      "700mm in front, 500mm sides",
      "1000mm in front",
      "As much as practically possible"
    ],
    correctAnswer: 1,
    explanation: "Distribution boards require 700mm clearance in front for safe operation and 500mm clearance on sides for proper access."
  }
];

export const AccessibilityQuizNewStyle = () => {
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
    if (percentage >= 80) return 'Excellent! You have a strong understanding of accessibility and labelling requirements.';
    if (percentage >= 60) return 'Good work! Review the explanations for questions you missed.';
    return 'Consider reviewing the material again to strengthen your understanding.';
  };

  if (quizComplete) {
    const percentage = (score / questions.length) * 100;
    
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground text-center text-xl sm:text-2xl">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="text-4xl sm:text-5xl font-bold">
            <span className={getScoreColor(percentage)}>
              {score}/{questions.length}
            </span>
          </div>
          <div className="text-xl sm:text-2xl text-foreground">
            Score: <span className={getScoreColor(percentage)}>{percentage.toFixed(0)}%</span>
          </div>
          <p className="text-foreground text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            {getScoreMessage(percentage)}
          </p>
          <Button 
            onClick={resetQuiz}
            className="bg-elec-yellow text-black hover:bg-yellow-400 text-base px-6 py-3"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm sm:text-base text-foreground">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-elec-yellow h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground text-lg sm:text-xl lg:text-2xl leading-relaxed">
            {currentQ.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQ.options.map((option, index) => {
            let buttonClass = "w-full text-left p-4 sm:p-5 rounded-lg border transition-all duration-200 ";
            
            if (showExplanation) {
              if (index === currentQ.correctAnswer) {
                buttonClass += "border-green-500 bg-green-500/20 text-foreground";
              } else if (index === selectedAnswer && index !== currentQ.correctAnswer) {
                buttonClass += "border-red-500 bg-red-500/20 text-foreground";
              } else {
                buttonClass += "border-gray-600 bg-elec-gray text-foreground";
              }
            } else {
              if (selectedAnswer === index) {
                buttonClass += "border-elec-yellow bg-yellow-600/20 text-foreground";
              } else {
                buttonClass += "border-gray-600 bg-elec-gray text-foreground hover:border-gray-500 hover:bg-[#323232]";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={buttonClass}
                disabled={showExplanation}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-6 h-6">
                    {showExplanation && index === currentQ.correctAnswer && (
                      <CheckCircle2 className="h-6 w-6 text-green-400" />
                    )}
                    {showExplanation && index === selectedAnswer && index !== currentQ.correctAnswer && (
                      <XCircle className="h-6 w-6 text-red-400" />
                    )}
                    {!showExplanation && (
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
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
                  <span className="text-sm sm:text-base leading-relaxed">{option}</span>
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
            <p className="text-blue-200 text-sm sm:text-base leading-relaxed">
              <strong>Explanation:</strong> {currentQ.explanation}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <div className="text-sm sm:text-base text-foreground">
          Score: {score}/{currentQuestion + (showExplanation ? 1 : 0)}
        </div>
        <Button
          onClick={handleNext}
          disabled={selectedAnswer === undefined}
          className="bg-elec-yellow text-black hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-base px-6 py-3"
        >
          {!showExplanation ? 'Submit Answer' : 
           currentQuestion === questions.length - 1 ? 'Complete Quiz' : 'Next Question'}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};