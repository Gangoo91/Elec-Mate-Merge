import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Award, RotateCcw } from 'lucide-react';

export const SmartHomeModule2Section6Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      question: 'How is compatibility best defined in smart home systems?',
      options: [
        'All devices must come from the same manufacturer',
        'The ability of devices to work together within an ecosystem',
        'All devices must share the same power supply',
        'All devices must be installed on the same day',
      ],
      correct: 1,
      explanation:
        'Compatibility is the ability of devices to work together within an ecosystem, regardless of manufacturer, provided they support compatible protocols and platforms.',
    },
    {
      question: 'What is the role of a bridge?',
      options: [
        'To supply electrical power to connected devices',
        'To boost the strength of the Wi-Fi signal',
        'To translate between different protocols or ecosystems',
        'To store all device data locally',
      ],
      correct: 2,
      explanation:
        'A bridge acts as a translator between protocols or ecosystems, letting devices that would not otherwise communicate work together.',
    },
    {
      question: 'Which of these is a well-known example of a bridge?',
      options: ['Amazon Echo Dot', 'Samsung smart TV', 'Google Nest Thermostat', 'Philips Hue Bridge'],
      correct: 3,
      explanation:
        'The Philips Hue Bridge is a classic smart home bridge, translating between Zigbee bulbs and Wi-Fi or cloud services.',
    },
    {
      question: 'What is the main drawback of using bridges?',
      options: [
        'They add complexity and extra points of failure',
        'They are always far more expensive than hubs',
        'They draw a large amount of standby power',
        'They only work with brand-new devices',
      ],
      correct: 0,
      explanation:
        'Bridges add complexity and another point of failure; if the bridge fails, all of the devices that rely on it become uncontrollable.',
    },
    {
      question: 'Which protocol do Philips Hue bulbs use?',
      options: ['Wi-Fi', 'Zigbee', 'Z-Wave', 'Bluetooth'],
      correct: 1,
      explanation:
        'Philips Hue bulbs use Zigbee, which is why they need the Hue Bridge to link to Wi-Fi networks and voice assistants.',
    },
    {
      question: 'Why can latency be higher when a bridge is used?',
      options: [
        'Bridges always use slow processors',
        'Commands need extra protocol translation and routing steps',
        'Bridges must connect through the internet',
        'Bridges are connected wirelessly by design',
      ],
      correct: 1,
      explanation:
        'A bridge adds latency because commands must be translated between protocols and routed through extra steps, increasing total response time.',
    },
    {
      question: 'Which statement about Home Assistant acting as a software bridge is correct?',
      options: [
        'It cannot bridge protocols and only controls Wi-Fi devices',
        'It only works as a bridge with paid cloud add-ons',
        'It can act as a software bridge across multiple protocols',
        'It must run on dedicated bridge hardware to function',
      ],
      correct: 2,
      explanation:
        'Home Assistant is a software platform that can act as a bridge, supporting multiple protocols and integrating different ecosystems.',
    },
    {
      question: 'What should installers always check before buying devices?',
      options: [
        'The range of colour options available',
        "Compatibility with the client's chosen ecosystem",
        'The length of the manufacturer warranty',
        'The physical dimensions of the device',
      ],
      correct: 1,
      explanation:
        "Installers should confirm compatibility with the client's chosen ecosystem, including protocol and platform support, before purchasing any devices.",
    },
    {
      question: 'Which standard is designed to reduce the need for bridges?',
      options: ['Zigbee 4.0', 'Wi-Fi 7', 'Bluetooth 6.0', 'Matter'],
      correct: 3,
      explanation:
        'Matter (formerly Project CHIP) aims to provide universal compatibility across smart home ecosystems, reducing the need for separate bridges.',
    },
    {
      question:
        'A client buys a Zigbee sensor but only has a Wi-Fi hub. What is the best solution?',
      options: [
        'Return the sensor as unusable',
        'Use a hub with Zigbee support or add a bridge',
        'Try to pair the sensor over Bluetooth instead',
        'Attempt to convert the sensor to Wi-Fi',
      ],
      correct: 1,
      explanation:
        'The fix is to use a hub with built-in Zigbee support, or add a bridge that translates between Zigbee and the existing Wi-Fi network.',
    },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex.toString();
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (parseInt(answer) === questions[index].correct ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (quizCompleted) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-400" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(score)} mb-2`}>
              {score}/{questions.length}
            </div>
            <div className={`text-xl ${getScoreColor(score)} mb-4`}>{percentage}% Score</div>
            <p className="text-foreground">
              {percentage >= 80
                ? 'Excellent! You have a strong understanding of compatibility and bridges.'
                : percentage >= 60
                  ? 'Good work! Review the areas you missed to strengthen your knowledge.'
                  : 'Keep studying! Review the section content and try again.'}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-foreground font-semibold">Question Review:</h4>
            {questions.map((q, index) => {
              const userAnswer = parseInt(selectedAnswers[index]);
              const isCorrect = userAnswer === q.correct;

              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${isCorrect ? 'border-green-600/30 bg-green-900/10' : 'border-red-600/30 bg-red-900/10'}`}
                >
                  <div className="flex items-start gap-2">
                    {isCorrect ? (
                      <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-foreground text-sm font-medium mb-1">
                        Q{index + 1}: {q.question}
                      </p>
                      <p
                        className={`text-xs mb-1 ${isCorrect ? 'text-green-200' : 'text-red-200'}`}
                      >
                        Your answer: {q.options[userAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-green-200 text-xs mb-1">
                          Correct answer: {q.options[q.correct]}
                        </p>
                      )}
                      <p className="text-gray-400 text-xs">{q.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Button
            onClick={resetQuiz}
            className="w-full bg-elec-yellow text-elec-dark hover:bg-yellow-400"
          >
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
        <CardTitle className="text-foreground flex items-center gap-2">
          <Award className="h-5 w-5 text-blue-400" />
          Section Quiz: Compatibility and Bridges
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress indicator */}
        <div className="flex items-center gap-2 mb-6">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full ${
                index < currentQuestion
                  ? 'bg-green-500'
                  : index === currentQuestion
                    ? 'bg-blue-500'
                    : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>

          <h3 className="text-foreground font-semibold mb-4">
            {questions[currentQuestion].question}
          </h3>

          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedAnswers[currentQuestion] === index.toString()
                    ? 'border-blue-500 bg-blue-900/20'
                    : 'border-gray-600 bg-gray-800/30 hover:bg-gray-700/30'
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                <span className="text-foreground">{option}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-600 text-foreground hover:bg-gray-700"
          >
            Previous
          </Button>

          <Button
            onClick={nextQuestion}
            disabled={!selectedAnswers[currentQuestion]}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-400"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
