import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';

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
    question: "What is a lighting scene?",
    options: [
      "A single light fixture in a room",
      "A pre-programmed setting that controls multiple lights at once",
      "A type of LED bulb with colour changing capability",
      "A manual switch that dims lights gradually"
    ],
    correctAnswer: 1,
    explanation: "A lighting scene is a pre-programmed setting that controls multiple lights simultaneously, allowing instant activation of specific lighting configurations for different activities or situations."
  },
  {
    id: 2,
    question: "Give one example of a common smart home lighting scene.",
    options: [
      "Single bulb dimming",
      "'Movie night' - dims ambient lights while keeping subtle accent lighting",
      "Switching one light on manually",
      "Changing a single bulb colour"
    ],
    correctAnswer: 1,
    explanation: "'Movie night' is a common scene that automatically adjusts multiple lights to create the ideal environment for watching films - dimming main lights while maintaining subtle accent lighting."
  },
  {
    id: 3,
    question: "How can PIR sensors be linked to security lighting?",
    options: [
      "PIR sensors cannot work with smart lighting",
      "Only through manual activation",
      "PIR sensors automatically trigger security lights when motion is detected",
      "PIR sensors only work during daylight hours"
    ],
    correctAnswer: 2,
    explanation: "PIR sensors can automatically trigger security lighting when motion is detected, providing immediate illumination for deterrence and improved visibility for security cameras."
  },
  {
    id: 4,
    question: "Why might interior lights switch on when motion is detected outside?",
    options: [
      "It's an error in the system",
      "To simulate occupancy and deter potential intruders",
      "To save energy on outdoor lighting",
      "Interior lights are brighter than outdoor lights"
    ],
    correctAnswer: 1,
    explanation: "Interior lights may activate when outdoor motion is detected to simulate occupancy, making the property appear occupied and discouraging potential intruders from attempting entry."
  },
  {
    id: 5,
    question: "How can lighting integration help simulate occupancy?",
    options: [
      "By keeping all lights on permanently",
      "By creating random lighting patterns that mimic normal daily routines",
      "By flashing lights continuously",
      "By using only red-coloured lights"
    ],
    correctAnswer: 1,
    explanation: "Occupancy simulation uses random lighting patterns that replicate normal daily routines - lights in living areas during evening, bedroom lights at appropriate times, and bathroom lights for brief periods."
  },
  {
    id: 6,
    question: "Give one way smart lighting can assist during a fire alarm.",
    options: [
      "Turn off all lights to save power",
      "Flash red lights for danger alerts and illuminate evacuation pathways",
      "Dim lights to reduce heat generation",
      "Change all lights to blue colour"
    ],
    correctAnswer: 1,
    explanation: "Smart lighting can flash red to indicate danger and automatically illuminate evacuation pathways to guide occupants safely to exits, even in smoke-filled conditions."
  },
  {
    id: 7,
    question: "What colour might smart bulbs turn to indicate danger?",
    options: [
      "Green for safety",
      "Blue for emergency services",
      "Red to indicate danger or emergency situations",
      "Purple for medical emergencies"
    ],
    correctAnswer: 2,
    explanation: "Red is universally recognised as a danger colour, making it the most appropriate choice for smart bulbs to indicate emergency situations and alert occupants to immediate threats."
  },
  {
    id: 8,
    question: "Why must electricians carefully plan lighting zones for automation?",
    options: [
      "To use more expensive equipment",
      "To ensure reliable communication, proper coverage, and safety compliance",
      "To make the installation more complicated",
      "To increase the final bill amount"
    ],
    correctAnswer: 1,
    explanation: "Careful zone planning ensures reliable device communication, adequate coverage for all scenarios, proper emergency evacuation routes, and compliance with safety regulations."
  },
  {
    id: 9,
    question: "How should emergency lighting be tested?",
    options: [
      "Only when problems occur",
      "Annually for basic function checks only",
      "Monthly for function, annually for full duration, with proper documentation",
      "Testing is not required for smart systems"
    ],
    correctAnswer: 2,
    explanation: "Emergency lighting requires monthly functional testing and annual full-duration testing, with all tests properly documented to meet safety regulations and ensure reliable operation."
  },
  {
    id: 10,
    question: "Why is homeowner training important in lighting and emergency scene setups?",
    options: [
      "Homeowners need to become electricians",
      "To ensure proper system usage, emergency preparedness, and maintenance awareness",
      "Training is only needed for commercial buildings",
      "Smart systems don't require any user knowledge"
    ],
    correctAnswer: 1,
    explanation: "Proper training ensures homeowners can effectively use their system, understand emergency procedures, perform basic maintenance, and know how to override automatic functions when necessary."
  }
];

export const SmartHomeModule5Section5Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newUserAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(newUserAnswers);

    if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setShowResult(true);
  };

  const handleContinue = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setUserAnswers([]);
    setQuizCompleted(false);
  };

  const getScoreColor = () => {
    const percentage = (score / quizQuestions.length) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (quizCompleted) {
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Award className="h-6 w-6 text-elec-yellow" />
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-6xl mb-4">
            {score >= 8 ? '🏆' : score >= 6 ? '🎉' : '📚'}
          </div>
          <h3 className={`text-3xl font-bold ${getScoreColor()}`}>
            {score}/{quizQuestions.length}
          </h3>
          <p className="text-foreground">
            {score >= 8 && "Excellent! You have a thorough understanding of lighting integration and emergency scenes."}
            {score >= 6 && score < 8 && "Good job! You understand the key concepts of smart lighting integration."}
            {score < 6 && "Keep studying! Review the lighting scenes and emergency response concepts covered in this section."}
          </p>
          <Button 
            onClick={resetQuiz}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-500"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQ = quizQuestions[currentQuestion];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Award className="h-6 w-6 text-elec-yellow" />
            Quiz: Lighting & Emergency Scenes
          </span>
          <span className="text-sm text-gray-400">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-foreground text-lg font-semibold">
            {currentQ.question}
          </h3>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full text-left p-4 h-auto justify-start ${
                  selectedAnswer === index
                    ? 'bg-elec-yellow text-elec-dark border-elec-yellow'
                    : 'bg-elec-dark text-foreground border-gray-600 hover:bg-gray-700'
                } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={() => !showResult && handleAnswerSelect(index)}
                disabled={showResult}
              >
                <span className="mr-3 font-bold">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
                {showResult && index === currentQ.correctAnswer && (
                  <CheckCircle className="ml-auto h-5 w-5 text-green-400" />
                )}
                {showResult && selectedAnswer === index && index !== currentQ.correctAnswer && (
                  <XCircle className="ml-auto h-5 w-5 text-red-400" />
                )}
              </Button>
            ))}
          </div>
        </div>

        {showResult && (
          <div className={`p-4 rounded-lg border ${
            selectedAnswer === currentQ.correctAnswer 
              ? 'bg-green-600/10 border-green-600/30' 
              : 'bg-red-600/10 border-red-600/30'
          }`}>
            <div className="flex items-start gap-2 mb-2">
              {selectedAnswer === currentQ.correctAnswer ? (
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
              )}
              <span className={`font-semibold ${
                selectedAnswer === currentQ.correctAnswer ? 'text-green-400' : 'text-red-400'
              }`}>
                {selectedAnswer === currentQ.correctAnswer ? 'Correct!' : 'Incorrect'}
              </span>
            </div>
            <p className="text-foreground text-sm">
              {currentQ.explanation}
            </p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-400">
            Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
          </div>
          
          {!showResult ? (
            <Button 
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Answer
            </Button>
          ) : (
            <Button 
              onClick={handleContinue}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-500"
            >
              {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'Complete Quiz'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};