import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';

export const SmartHomeModule3Section4Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const questions = [
    {
      question: 'What are the three main types of electrical load in lighting circuits?',
      options: [
        'Resistive, inductive and capacitive',
        'LED, halogen and fluorescent',
        'High, medium and low power',
        'AC, DC and mixed supply',
      ],
      correct: 0,
      explanation:
        'Loads are classified by their electrical behaviour as resistive, inductive or capacitive, which determines how they interact with dimmers and controls.',
    },
    {
      question: 'What type of load are most electronic LED drivers usually classified as?',
      options: ['Resistive', 'Inductive', 'Capacitive', 'Purely DC'],
      correct: 2,
      explanation:
        'Electronic LED drivers behave largely as capacitive loads, which is why trailing-edge dimmers designed for capacitive loads usually suit them best.',
    },
    {
      question: 'Which dimmer type is suitable for traditional incandescent lamps?',
      options: [
        'Only trailing-edge dimmers',
        'Only PWM controllers',
        'Either leading-edge or trailing-edge dimmers',
        'Only DALI controllers',
      ],
      correct: 2,
      explanation:
        'Incandescent lamps are resistive, so they tolerate either leading-edge or trailing-edge dimming without performance issues.',
    },
    {
      question: 'Which dimmer type is generally best for LED lamps?',
      options: [
        'Trailing-edge (MOSFET)',
        'Leading-edge (TRIAC)',
        'A simple resistive dimmer',
        'Any dimmer type performs equally',
      ],
      correct: 0,
      explanation:
        'Trailing-edge (MOSFET) dimmers give smoother, quieter control of the capacitive electronic drivers used in LED lamps.',
    },
    {
      question: 'What can happen if a non-dimmable LED is placed on a dimmer?',
      options: [
        'It operates perfectly with no issues',
        'It becomes noticeably more efficient',
        'It may flicker, be damaged or cause safety issues',
        'Nothing changes about its behaviour',
      ],
      correct: 2,
      explanation:
        'A non-dimmable LED is not designed for a chopped waveform, so on a dimmer it may flicker, buzz, fail early or pose a safety risk.',
    },
    {
      question: 'Which control method is typically used for LED strip lighting?',
      options: [
        'Standard wall dimmers',
        'PWM drivers or DMX controllers',
        'Ordinary light switches only',
        'The circuit breaker at the board',
      ],
      correct: 1,
      explanation:
        'LED strips are usually controlled with PWM drivers, or DMX controllers for colour and effects, rather than mains phase-cut dimmers.',
    },
    {
      question: 'Can halogen and LED lamps be mixed on the same dimmer?',
      options: [
        'Yes, they always work perfectly together',
        'Yes, but only when smart dimmers are used',
        'No, it is not recommended due to their different load characteristics',
        'No, because it is specifically prohibited by BS 7671',
      ],
      correct: 2,
      explanation:
        'Mixing halogen and LED lamps on one dimmer is not recommended because their differing load characteristics cause flicker and unstable dimming.',
    },
    {
      question: 'What is PWM dimming?',
      options: [
        'Power Management Wiring',
        'Permanent Wave Modulation',
        'Passive Wire Management',
        'Pulse Width Modulation, rapid on/off switching',
      ],
      correct: 3,
      explanation:
        'PWM (Pulse Width Modulation) switches the supply on and off very rapidly; varying the on-time changes the average power and so the brightness.',
    },
    {
      question: 'Why should installers check manufacturer compatibility charts?',
      options: [
        'It is a specific legal requirement',
        'To ensure correct performance and avoid damaging equipment',
        'It is needed to register the warranty',
        'To satisfy the Building Regulations',
      ],
      correct: 1,
      explanation:
        'Compatibility charts confirm a dimmer and lamp combination will perform correctly and avoid flicker, buzzing or damage.',
    },
    {
      question:
        'A client reports buzzing LEDs after an installation. What is the most likely cause?',
      options: [
        'The LEDs are simply too bright',
        'The supply voltage is incorrect',
        'An incompatible dimmer type is causing interference',
        'The LEDs are overheating in their fittings',
      ],
      correct: 2,
      explanation:
        'Buzzing LEDs are most often caused by an incompatible dimmer, typically a leading-edge dimmer driving capacitive LED loads.',
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
                Perfect score! Excellent understanding of load compatibility.
              </p>
            )}
            {score >= questions.length * 0.8 && score < questions.length && (
              <p className="text-yellow-400">
                Great work! Strong grasp of control and load matching.
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
            Load Compatibility Quiz
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
                          : 'bg-elec-dark border-gray-600 text-gray-400'
                      : selectedAnswer === index.toString()
                        ? 'bg-elec-yellow/20 border-elec-yellow text-foreground'
                        : 'bg-elec-dark border-gray-600 text-gray-300 hover:border-gray-500'
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
