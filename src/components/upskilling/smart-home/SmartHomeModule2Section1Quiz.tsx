import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, ArrowLeft, ArrowRight } from 'lucide-react';

export const SmartHomeModule2Section1Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: 'What is the purpose of a wireless protocol?',
      options: [
        'To define how devices communicate and exchange data',
        'To supply electrical power to smart devices',
        'To connect every device directly to the internet',
        'To control the brightness of smart lights',
      ],
      correct: 0,
      explanation:
        'A wireless protocol is the agreed set of rules that lets devices talk to and understand each other over the air.',
    },
    {
      question: 'Name two reasons why protocols matter in smart homes.',
      options: [
        'Their colour and switching speed',
        'Compatibility and power consumption',
        'Their physical size and weight',
        'Their price and warranty length',
      ],
      correct: 1,
      explanation:
        'The protocol a device uses determines what it can pair with (compatibility) and how much energy it draws — both critical in a smart home.',
    },
    {
      question: 'Which of these protocols uses mesh networking?',
      options: ['Wi-Fi', 'Bluetooth Classic', 'Zigbee', 'Ethernet'],
      correct: 2,
      explanation:
        'Zigbee forms a self-healing mesh where mains-powered devices relay messages, extending range across the home.',
    },
    {
      question: 'Which protocol is best suited to streaming camera video?',
      options: ['Wi-Fi', 'Zigbee', 'Z-Wave', 'Bluetooth'],
      correct: 0,
      explanation:
        'Wi-Fi provides the high bandwidth that video streaming needs, which the low-data-rate mesh protocols cannot match.',
    },
    {
      question: 'Which of these connection types consumes the least power?',
      options: ['Wi-Fi', 'Ethernet', '4G', 'Bluetooth Low Energy'],
      correct: 3,
      explanation:
        'Bluetooth Low Energy is designed for tiny power draw, letting battery sensors run for months or years between charges.',
    },
    {
      question: 'Do Zigbee and Z-Wave operate on the same radio frequency?',
      options: [
        'Yes — both use the 2.4 GHz band',
        'Yes — both use the 5 GHz band',
        'No — Zigbee uses 2.4 GHz while Z-Wave uses sub-1 GHz',
        'No — both avoid radio and use infrared',
      ],
      correct: 2,
      explanation:
        'Zigbee runs on 2.4 GHz, whereas Z-Wave uses the less-congested sub-1 GHz band (around 868 MHz in the UK).',
    },
    {
      question: 'What is the main drawback of using Wi-Fi for battery sensors?',
      options: [
        'It is too slow for sensors',
        'It is too expensive to license',
        'It offers poor security',
        'Its high power consumption drains batteries',
      ],
      correct: 3,
      explanation:
        'Wi-Fi’s relatively high power draw flattens small batteries quickly, which is why low-power mesh protocols are preferred for sensors.',
    },
    {
      question: 'Which protocol was designed specifically for IoT with mesh networking?',
      options: ['Thread', 'Wi-Fi', 'Bluetooth Classic', 'Ethernet'],
      correct: 0,
      explanation:
        'Thread is a low-power, IPv6-based mesh protocol built for IoT devices and underpins many Matter products.',
    },
    {
      question: "What is 'Matter' and why is it important?",
      options: [
        'A new type of rechargeable battery',
        'A dedicated security encryption protocol',
        'A type of high-gain antenna',
        'An interoperability standard for cross-platform compatibility',
      ],
      correct: 3,
      explanation:
        'Matter is an industry interoperability standard that lets devices from different brands and ecosystems work together reliably.',
    },
    {
      question:
        "Scenario: You're installing a battery smart lock — which protocol is the most likely choice and why?",
      options: [
        'Wi-Fi for its high speed',
        'Zigbee or Z-Wave for low-power mesh operation',
        'Ethernet for a wired connection',
        '4G for nationwide range',
      ],
      correct: 1,
      explanation:
        'Battery smart locks favour low-power mesh protocols like Zigbee or Z-Wave, which preserve battery life far better than Wi-Fi.',
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
              ? 'Excellent understanding of wireless protocols!'
              : percentage >= 60
                ? 'Good grasp of the concepts - review the areas you missed.'
                : 'Keep studying the protocol characteristics and applications.'}
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
