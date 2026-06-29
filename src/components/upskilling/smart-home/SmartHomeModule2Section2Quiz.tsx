import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, ArrowLeft, ArrowRight } from 'lucide-react';

export const SmartHomeModule2Section2Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: 'Which statement best describes mesh networking?',
      options: [
        'Devices relay signals through each other to extend coverage',
        'A single central hub connects directly to every device',
        'Devices communicate only via the home broadband router',
        'A high-gain antenna broadcasts to all rooms at once',
      ],
      correct: 0,
      explanation:
        'In a mesh network, mains-powered nodes repeat signals for one another, so coverage and resilience grow as devices are added.',
    },
    {
      question: 'Which frequency band does Zigbee primarily operate on?',
      options: ['868 MHz', '908 MHz', '2.4 GHz', '5 GHz'],
      correct: 2,
      explanation:
        'Zigbee mainly uses the global 2.4 GHz ISM band, which gives higher data rates but is shared with Wi-Fi and Bluetooth.',
    },
    {
      question: 'Which frequency does Z-Wave use in Europe?',
      options: ['2.4 GHz', '5 GHz', '908 MHz', '868 MHz'],
      correct: 3,
      explanation:
        'Z-Wave operates on sub-1 GHz bands, around 868 MHz in Europe (and 908 MHz in North America), reducing congestion and improving range.',
    },
    {
      question: 'Compared with Z-Wave, how many devices can a Zigbee network support?',
      options: [
        'Far fewer, capped at around 50 nodes',
        'Many more, theoretically tens of thousands',
        'Exactly the same, both cap at 232',
        'Zigbee supports no more than 100 nodes',
      ],
      correct: 1,
      explanation:
        'Zigbee can theoretically address tens of thousands of devices per network, whereas Z-Wave is limited to 232 nodes.',
    },
    {
      question: 'Which protocol generally penetrates walls more effectively?',
      options: ['Zigbee', 'Z-Wave', 'Both are exactly equal', 'Neither works through walls'],
      correct: 1,
      explanation:
        'Z-Wave’s lower sub-1 GHz frequency penetrates walls and solid obstacles better than Zigbee’s 2.4 GHz signal.',
    },
    {
      question: 'Which of these is a well-known Zigbee-based product?',
      options: ['Nest Thermostat', 'Ring Video Doorbell', 'Philips Hue bulbs', 'Amazon Echo (Wi-Fi)'],
      correct: 2,
      explanation:
        'Philips Hue lighting uses Zigbee, communicating with the Hue Bridge to form a lighting mesh.',
    },
    {
      question: "What is a drawback of Z-Wave compared with Zigbee?",
      options: [
        'It is limited to 232 devices per network',
        'It has noticeably poorer wall penetration',
        'It consumes far more power on battery devices',
        'It has no mesh networking capability at all',
      ],
      correct: 0,
      explanation:
        'Z-Wave’s 232-node ceiling can be restrictive for large installations, whereas Zigbee scales much further.',
    },
    {
      question: 'Why is Zigbee more prone to radio interference than Z-Wave?',
      options: [
        'It relies on outdated, unsupported hardware',
        'It uses weaker encryption that picks up noise',
        'It only functions reliably indoors',
        'It shares the 2.4 GHz band with Wi-Fi and Bluetooth',
      ],
      correct: 3,
      explanation:
        'Operating on the busy 2.4 GHz band, Zigbee competes with Wi-Fi and Bluetooth traffic, making interference more likely.',
    },
    {
      question: 'Which protocol best suits a large house with thick stone walls?',
      options: ['Z-Wave', 'Zigbee', 'Bluetooth', 'Standard Wi-Fi'],
      correct: 0,
      explanation:
        'Z-Wave’s sub-1 GHz range and strong wall penetration make it well suited to large, solidly built properties.',
    },
    {
      question: 'A client wants 80 smart bulbs in one apartment. Which protocol is most suitable?',
      options: [
        'Wi-Fi, for the fastest individual speeds',
        'Bluetooth, for the simplest pairing',
        'Zigbee, for high device counts at low cost',
        'Z-Wave, despite its 232-node limit',
      ],
      correct: 2,
      explanation:
        'Zigbee comfortably supports large numbers of low-power devices like bulbs and is cost-effective at scale.',
    },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex,
    });
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct) {
        correct++;
      }
    });
    return correct;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Brain className="h-5 w-5 text-elec-yellow" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-4xl font-bold text-elec-yellow">
            {score}/{questions.length}
          </div>
          <div className="text-xl text-foreground">{percentage}% Correct</div>
          <div className="text-gray-300">
            {percentage >= 80
              ? 'Excellent understanding of Zigbee vs Z-Wave!'
              : percentage >= 60
                ? 'Good grasp of mesh protocols - review the differences.'
                : 'Keep studying the protocol characteristics and use cases.'}
          </div>
          <Button onClick={resetQuiz} className="bg-elec-yellow text-elec-dark hover:bg-yellow-600">
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
          <Brain className="h-5 w-5 text-elec-yellow" />
          Knowledge Quiz - 10 Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <div className="flex gap-1">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentQuestion
                    ? 'bg-elec-yellow'
                    : selectedAnswers[index] !== undefined
                      ? 'bg-green-400'
                      : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            {questions[currentQuestion].question}
          </h3>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left justify-start p-4 border-gray-600 hover:bg-[#323232] ${
                  selectedAnswers[currentQuestion] === index
                    ? 'bg-elec-yellow text-elec-dark border-elec-yellow'
                    : 'text-gray-300'
                }`}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            disabled={currentQuestion === 0}
            className="border-gray-600 text-gray-300 hover:bg-[#323232] hover:text-foreground disabled:opacity-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {currentQuestion === questions.length - 1 ? (
            <Button
              onClick={() => setShowResults(true)}
              disabled={Object.keys(selectedAnswers).length !== questions.length}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-600 disabled:opacity-50"
            >
              Submit Quiz
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-600 disabled:opacity-50"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
