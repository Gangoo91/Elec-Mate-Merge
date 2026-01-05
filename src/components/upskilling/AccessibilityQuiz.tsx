
import { useState } from 'react';
import { Lightbulb, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
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

export const AccessibilityQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
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
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizComplete(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const currentQ = quizQuestions[currentQuestion];
  const score = calculateScore();
  const percentage = Math.round((score / quizQuestions.length) * 100);

  if (showResults) {
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-elec-yellow mb-2">
              {score} / {quizQuestions.length}
            </div>
            <div className="text-xl text-foreground mb-4">
              {percentage}% Complete
            </div>
            <div className={`text-lg ${percentage >= 80 ? 'text-green-400' : percentage >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
              {percentage >= 80 ? 'Excellent work!' : percentage >= 60 ? 'Good effort!' : 'Keep studying and try again!'}
            </div>
          </div>

          <div className="space-y-4">
            {quizQuestions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="bg-[#323232] rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h4 className="text-foreground font-medium mb-2">
                        Question {index + 1}: {question.question}
                      </h4>
                      <p className={`text-sm mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                        Your answer: {question.options[userAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-400 mb-2">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                      <p className="text-sm text-foreground">
                        {question.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button
              onClick={resetQuiz}
              className="bg-elec-yellow text-black hover:bg-yellow-500"
            >
              Take Quiz Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          Quick Quiz
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center text-sm text-foreground">
          <span>Question {currentQuestion + 1} of {quizQuestions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}% Complete</span>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">
            {currentQ.question}
          </h3>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-elec-yellow bg-yellow-600/10 text-elec-yellow'
                    : 'border-gray-600 bg-[#323232] text-foreground hover:border-gray-500'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="bg-transparent border-gray-600 text-foreground hover:bg-gray-700"
          >
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="bg-elec-yellow text-black hover:bg-yellow-500"
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
