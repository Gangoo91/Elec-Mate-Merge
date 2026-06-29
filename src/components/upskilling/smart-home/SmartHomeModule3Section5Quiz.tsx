import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';

export const SmartHomeModule3Section5Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const questions = [
    {
      question: 'What does grouping lights mean?',
      options: [
        'Connecting multiple lights so they are controlled as a single unit',
        'Installing the lights physically close together',
        'Using the same type of bulb throughout the home',
        'Wiring all the lights onto one electrical circuit',
      ],
      correct: 0,
      explanation:
        'Grouping links several lights so a single command controls them together, independent of how they are physically wired.',
    },
    {
      question: 'Give one benefit of grouping lights.',
      options: [
        'It automatically reduces the electricity bill',
        'It makes every bulb output more light',
        'One command can control several lights at once',
        'It stops bulbs from failing prematurely',
      ],
      correct: 2,
      explanation:
        'The main benefit of grouping is convenience: a single action or scene controls multiple lights at the same time.',
    },
    {
      question: 'What does linking lighting to a security system achieve?',
      options: [
        'It protects the light fittings from theft',
        'It prevents electrical faults in the lighting circuit',
        'Lighting responds automatically to security events',
        'It reduces the number of false alarms triggered',
      ],
      correct: 2,
      explanation:
        'Linking lighting to security allows lights to react automatically to events, such as switching on when an alarm or sensor is triggered.',
    },
    {
      question: 'Give an example of entertainment-linked lighting.',
      options: [
        'Lights set brighter specifically for reading',
        'Lights that dim automatically when a film starts',
        'Motion sensors fitted in the hallway',
        'Timer-controlled lighting in the garden',
      ],
      correct: 1,
      explanation:
        'Entertainment-linked lighting reacts to media, for example dimming the room automatically when the TV or a film begins playing.',
    },
    {
      question: 'What is basic motion logic?',
      options: [
        'Lights that change colour as people move',
        'Sensors that detect several different types of movement',
        'Motion detected switches the light on, no motion switches it off',
        'Movement in one room controlling lights in several rooms',
      ],
      correct: 2,
      explanation:
        'Basic motion logic is a simple rule: detected motion turns the light on, and the absence of motion turns it off.',
    },
    {
      question: 'What is conditional motion logic?',
      options: [
        'Motion sensors that respond more quickly',
        'A motion response that only applies under specific conditions',
        'Several motion sensors working together as a group',
        'Sensors that learn the user behaviour over time',
      ],
      correct: 1,
      explanation:
        'Conditional motion logic adds extra criteria, such as only switching lights on when motion is detected and it is also dark.',
    },
    {
      question: 'Name one drawback of motion sensors.',
      options: [
        'They consume a large amount of electricity',
        'They are expensive to keep maintained',
        'They only function in complete darkness',
        'They can produce false triggers from pets or air movement',
      ],
      correct: 3,
      explanation:
        'A common drawback is false triggering, where pets, draughts or moving air activate the sensor when no person is present.',
    },
    {
      question: 'Why is over-automation a risk?',
      options: [
        'It physically damages the electrical installation',
        'It can frustrate users with unnecessary switching',
        'It always uses more energy than manual control',
        'It needs a constant internet connection to work',
      ],
      correct: 1,
      explanation:
        'Too much automation can annoy occupants when lights switch unexpectedly, undermining confidence in the system.',
    },
    {
      question: 'What is one best practice when setting up automations?',
      options: [
        'Fit as many sensors as the budget allows',
        'Remove all manual override options',
        'Start simple and add complexity gradually',
        'Use only wireless components throughout',
      ],
      correct: 2,
      explanation:
        'Starting simple and expanding gradually lets occupants adapt and makes problems easier to diagnose than a complex setup installed all at once.',
    },
    {
      question:
        'A family complains their hallway light keeps switching on at night when the dog walks past. How would you fix this?',
      options: [
        'Remove the motion sensor altogether',
        'Move the dog into a different room at night',
        'Adjust the sensor sensitivity or fit a pet-immune sensor',
        'Replace the fitting with a brighter lamp',
      ],
      correct: 2,
      explanation:
        'Reducing the sensor sensitivity or using a pet-immune sensor stops small animals triggering the light while still detecting people.',
    },
  ];

  const handleAnswerSelect = (answerIndex: string) => {
    if (!showResult) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowResult(true);
      const newAnswers = [...userAnswers, selectedAnswer];
      setUserAnswers(newAnswers);

      if (parseInt(selectedAnswer) === questions[currentQuestion].correct) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
    setUserAnswers([]);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (quizComplete) {
    return (
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Award className="h-6 w-6 text-elec-yellow" />
            Quiz Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-6xl">🎉</div>
          <h3 className="text-2xl font-bold text-foreground">Well Done!</h3>
          <p className="text-xl">
            Your Score:{' '}
            <span className={`font-bold ${getScoreColor()}`}>
              {score}/{questions.length} ({Math.round((score / questions.length) * 100)}%)
            </span>
          </p>
          <div className="space-y-2">
            {score === questions.length && (
              <p className="text-green-400">
                Perfect score! Excellent understanding of automation principles.
              </p>
            )}
            {score >= questions.length * 0.8 && score < questions.length && (
              <p className="text-yellow-400">
                Great work! Strong grasp of grouping, linking, and motion logic.
              </p>
            )}
            {score < questions.length * 0.8 && (
              <p className="text-red-400">
                Good effort. Review the material and try again to improve your score.
              </p>
            )}
          </div>
          <Button onClick={resetQuiz} className="bg-elec-yellow text-elec-dark hover:bg-yellow-400">
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Award className="h-6 w-6 text-elec-yellow" />
            Grouping, Linking & Motion Logic Quiz
          </span>
          <span className="text-sm text-gray-400">
            {currentQuestion + 1}/{questions.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {questions[currentQuestion].question}
            </h3>

            <div className="grid gap-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index.toString())}
                  disabled={showResult}
                  className={`p-4 text-left rounded-lg border transition-all ${
                    showResult
                      ? index === questions[currentQuestion].correct
                        ? 'bg-green-900/30 border-green-600 text-green-200'
                        : selectedAnswer === index.toString()
                          ? 'bg-red-900/30 border-red-600 text-red-200'
                          : 'bg-elec-gray border-gray-600 text-gray-400'
                      : selectedAnswer === index.toString()
                        ? 'bg-elec-yellow/20 border-elec-yellow text-foreground'
                        : 'bg-elec-gray border-gray-600 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && index === questions[currentQuestion].correct && (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    )}
                    {showResult &&
                      selectedAnswer === index.toString() &&
                      index !== questions[currentQuestion].correct && (
                        <XCircle className="h-5 w-5 text-red-400" />
                      )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {!showResult ? (
            <Button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="w-full bg-elec-yellow text-elec-dark hover:bg-yellow-400"
            >
              Submit Answer
            </Button>
          ) : (
            <div className="space-y-4">
              {parseInt(selectedAnswer!) === questions[currentQuestion].correct ? (
                <div className="bg-green-900/20 border border-green-600/50 p-4 rounded-lg">
                  <p className="text-green-200 text-sm">✓ Correct! Great understanding.</p>
                </div>
              ) : (
                <div className="bg-red-900/20 border border-red-600/50 p-4 rounded-lg">
                  <p className="text-red-200 text-sm">
                    ✗ Incorrect. The correct answer is:{' '}
                    {questions[currentQuestion].options[questions[currentQuestion].correct]}
                  </p>
                </div>
              )}
              <Button
                onClick={handleNext}
                className="w-full bg-elec-yellow text-elec-dark hover:bg-yellow-400"
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
              </Button>
            </div>
          )}

          <div className="flex justify-center">
            <div className="text-sm text-gray-400">
              Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
