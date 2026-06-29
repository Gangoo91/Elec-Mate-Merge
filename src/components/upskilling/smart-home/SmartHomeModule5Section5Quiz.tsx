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
    question: 'What is a lighting scene?',
    options: [
      'A pre-programmed setting that controls multiple lights at once',
      'A single light fixture within a room',
      'A type of LED bulb capable of changing colour',
      'A manual switch that dims one light gradually',
    ],
    correctAnswer: 0,
    explanation:
      'A lighting scene is a pre-programmed setting that controls several lights at once, letting a specific configuration be recalled instantly for different activities.',
  },
  {
    id: 2,
    question: 'Which is an example of a common smart home lighting scene?',
    options: [
      'Dimming a single bulb on its own',
      'Switching one light on manually',
      "'Movie night', which dims ambient lights while keeping subtle accent lighting",
      'Changing the colour of one bulb',
    ],
    correctAnswer: 2,
    explanation:
      "'Movie night' adjusts several lights together, dimming the main lights while keeping gentle accent lighting to suit watching films.",
  },
  {
    id: 3,
    question: 'How can PIR sensors be linked to security lighting?',
    options: [
      'PIR sensors cannot be used with smart lighting',
      'They automatically trigger security lights when motion is detected',
      'They can only be operated manually by the user',
      'They function only during daylight hours',
    ],
    correctAnswer: 1,
    explanation:
      'A PIR sensor can automatically switch on security lighting when it detects motion, providing immediate illumination for deterrence and camera visibility.',
  },
  {
    id: 4,
    question: 'Why might interior lights switch on when motion is detected outside?',
    options: [
      'It is a fault in the system configuration',
      'To save energy on the outdoor lighting',
      'Because interior lights are brighter than outdoor ones',
      'To simulate occupancy and deter potential intruders',
    ],
    correctAnswer: 3,
    explanation:
      'Interior lights may come on when outdoor motion is detected to make the property appear occupied, discouraging an intruder from approaching.',
  },
  {
    id: 5,
    question: 'How can lighting integration help simulate occupancy?',
    options: [
      'By keeping every light switched on permanently',
      'By creating random patterns that mimic normal daily routines',
      'By flashing the lights continuously',
      'By using only red-coloured lighting',
    ],
    correctAnswer: 1,
    explanation:
      'Occupancy simulation uses varied, realistic lighting patterns that mimic a normal routine, such as living-room lights in the evening and brief bathroom use.',
  },
  {
    id: 6,
    question: 'Give one way smart lighting can assist during a fire alarm.',
    options: [
      'Switch off all lights to save power',
      'Dim the lights to reduce heat generation',
      'Flash red for danger and illuminate evacuation routes',
      'Turn all lights blue across the property',
    ],
    correctAnswer: 2,
    explanation:
      'Smart lighting can flash red to signal danger and illuminate escape routes, helping occupants reach exits safely even in poor visibility.',
  },
  {
    id: 7,
    question: 'What colour might smart bulbs turn to indicate danger?',
    options: [
      'Green to indicate safety',
      'Blue to summon emergency services',
      'Red to indicate danger or an emergency',
      'Purple to indicate a medical emergency',
    ],
    correctAnswer: 2,
    explanation:
      'Red is widely recognised as a danger colour, making it the most effective choice for alerting occupants to an emergency.',
  },
  {
    id: 8,
    question: 'Why must electricians carefully plan lighting zones for automation?',
    options: [
      'To justify using more expensive equipment',
      'To ensure reliable communication, full coverage and safety compliance',
      'To make the installation deliberately more complex',
      'To increase the final amount billed to the client',
    ],
    correctAnswer: 1,
    explanation:
      'Careful zone planning ensures reliable device communication, adequate coverage, sound emergency routes and compliance with safety requirements.',
  },
  {
    id: 9,
    question: 'How should emergency lighting be tested?',
    options: [
      'Only when a problem is noticed',
      'Once a year for a basic function check only',
      'Monthly for function and annually for full duration, with documentation',
      'No testing is needed for smart emergency systems',
    ],
    correctAnswer: 2,
    explanation:
      'Emergency lighting needs monthly functional tests and an annual full-duration test, all properly documented, to confirm it will work when needed.',
  },
  {
    id: 10,
    question: 'Why is homeowner training important for lighting and emergency scene setups?',
    options: [
      'So the homeowner can qualify as an electrician',
      'To ensure correct use, emergency readiness and maintenance awareness',
      'Because training is only ever needed in commercial buildings',
      'Because smart systems need no user knowledge at all',
    ],
    correctAnswer: 1,
    explanation:
      'Training helps homeowners use the system correctly, follow emergency procedures, carry out basic maintenance and override automation when required.',
  },
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
          <div className="text-6xl mb-4">{score >= 8 ? '🏆' : score >= 6 ? '🎉' : '📚'}</div>
          <h3 className={`text-3xl font-bold ${getScoreColor()}`}>
            {score}/{quizQuestions.length}
          </h3>
          <p className="text-foreground">
            {score >= 8 &&
              'Excellent! You have a thorough understanding of lighting integration and emergency scenes.'}
            {score >= 6 &&
              score < 8 &&
              'Good job! You understand the key concepts of smart lighting integration.'}
            {score < 6 &&
              'Keep studying! Review the lighting scenes and emergency response concepts covered in this section.'}
          </p>
          <Button onClick={resetQuiz} className="bg-elec-yellow text-elec-dark hover:bg-yellow-500">
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
          <h3 className="text-foreground text-lg font-semibold">{currentQ.question}</h3>

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
                <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
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
          <div
            className={`p-4 rounded-lg border ${
              selectedAnswer === currentQ.correctAnswer
                ? 'bg-green-600/10 border-green-600/30'
                : 'bg-red-600/10 border-red-600/30'
            }`}
          >
            <div className="flex items-start gap-2 mb-2">
              {selectedAnswer === currentQ.correctAnswer ? (
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-red-400 mt-0.5" />
              )}
              <span
                className={`font-semibold ${
                  selectedAnswer === currentQ.correctAnswer ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {selectedAnswer === currentQ.correctAnswer ? 'Correct!' : 'Incorrect'}
              </span>
            </div>
            <p className="text-foreground text-sm">{currentQ.explanation}</p>
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
