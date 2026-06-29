import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

export const SmartHomeModule2Section5Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: 'What is a hub in a smart home system?',
      options: [
        'A central device that coordinates device communication and local automation',
        'A router whose only job is providing internet connectivity',
        'A smart speaker used purely for voice control',
        'A dedicated controller for the security system alone',
      ],
      correctAnswer: 0,
      explanation:
        'A hub is the central coordinator that bridges protocols, relays commands between devices, and can run automations locally.',
    },
    {
      question: 'Which of these is an example of a hub-based ecosystem?',
      options: [
        'Individual Wi-Fi smart bulbs',
        'Samsung SmartThings',
        'Standalone Wi-Fi security cameras',
        'Basic plug-in smart plugs',
      ],
      correctAnswer: 1,
      explanation:
        'Samsung SmartThings centres on a hub that links Zigbee, Z-Wave and Wi-Fi devices together, unlike standalone Wi-Fi gadgets.',
    },
    {
      question: 'What are two advantages of hub-based systems?',
      options: [
        'Cheaper setup and simpler installation',
        'No internet needed and unlimited device support',
        'Single-brand lock-in with no configuration',
        'Reliable mesh networking and better scalability',
      ],
      correctAnswer: 3,
      explanation:
        'Hubs enable robust mesh networks and let the system scale to many devices while bridging different wireless protocols.',
    },
    {
      question: 'What is a disadvantage of hub-based systems?',
      options: [
        'They cannot work with multiple protocols',
        'They are too reliable for most users',
        'Higher upfront cost and technical complexity',
        'They only work during internet outages',
      ],
      correctAnswer: 2,
      explanation:
        'Adding a hub increases the initial cost and setup complexity compared with simply plugging in standalone Wi-Fi devices.',
    },
    {
      question: 'What is an advantage of hubless (Wi-Fi-only) systems?',
      options: [
        'Simple setup with no extra hardware needed',
        'Superior scalability and reliability',
        'Better mesh networking capabilities',
        'More protocol bridging options',
      ],
      correctAnswer: 0,
      explanation:
        'Hubless systems connect each device straight to the home Wi-Fi, so there is no extra hub hardware to buy or configure.',
    },
    {
      question: 'What is the biggest weakness of Wi-Fi-only setups?',
      options: [
        'They are too expensive for most homes',
        'They cannot connect to the internet',
        'Network congestion and reliability issues at scale',
        'They only work with one device type',
      ],
      correctAnswer: 2,
      explanation:
        'As device numbers grow, a single Wi-Fi network becomes congested and less reliable, which mesh hub systems handle better.',
    },
    {
      question: 'Are hubless systems more scalable than hub-based ones?',
      options: [
        'Yes — Wi-Fi networks can handle unlimited devices',
        'No — hub-based systems scale better with mesh networking',
        'Yes — cloud services provide infinite scalability',
        'No — neither system can exceed ten devices',
      ],
      correctAnswer: 1,
      explanation:
        'Hub-based mesh networks distribute traffic and extend range, so they scale to large device counts more reliably than Wi-Fi-only setups.',
    },
    {
      question: 'What is a hybrid approach in smart homes?',
      options: [
        'Using only wireless protocols throughout',
        'Combining hub-based devices with cloud and voice integration',
        'Installing both security and lighting systems',
        'Splitting the home half on Wi-Fi and half on wired Ethernet',
      ],
      correctAnswer: 1,
      explanation:
        'A hybrid setup keeps a local hub for reliability while adding cloud services and voice assistants for convenience and remote access.',
    },
    {
      question: 'For which type of property is a hub-based system most appropriate?',
      options: [
        'Only commercial office buildings',
        'Small flats with one or two devices',
        'Properties with no internet access',
        'Medium to large homes with 10+ devices',
      ],
      correctAnswer: 3,
      explanation:
        'The benefits of a hub — mesh range and protocol bridging — pay off in larger homes running many devices, not tiny single-device setups.',
    },
    {
      question: 'Which emerging standard may reduce the need for dedicated hubs?',
      options: ['Wi-Fi 7', '5G networks', 'Bluetooth 6.0', 'Matter'],
      correctAnswer: 3,
      explanation:
        'Matter standardises how devices interoperate across ecosystems, lessening reliance on a single proprietary hub.',
    },
  ];

  const handleAnswerSelect = (answerIndex: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex,
    });
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (parseInt(selectedAnswers[index]) === q.correctAnswer) {
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

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
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
        <CardContent className="text-center space-y-6">
          <div className="text-4xl font-bold text-elec-yellow">
            {score}/{questions.length}
          </div>

          <div className="text-2xl font-semibold text-foreground">{percentage}% Correct</div>

          <div
            className={`text-lg ${
              percentage >= 80
                ? 'text-green-400'
                : percentage >= 60
                  ? 'text-yellow-400'
                  : 'text-red-400'
            }`}
          >
            {percentage >= 80
              ? '🎉 Excellent! You have a strong understanding of hub vs hubless ecosystems.'
              : percentage >= 60
                ? '👍 Good work! Review the sections on system advantages and limitations.'
                : '📚 Keep studying! Focus on the key differences between hub-based and hubless approaches.'}
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
        <CardTitle className="text-foreground flex items-center gap-2">
          <Brain className="h-5 w-5 text-elec-yellow" />
          Section Quiz ({currentQuestion + 1}/10)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">
            {questions[currentQuestion].question}
          </h3>

          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleAnswerSelect(index.toString())}
                className={`w-full justify-start text-left p-4 h-auto border-gray-600 hover:bg-gray-700 ${
                  selectedAnswers[currentQuestion] === index.toString()
                    ? 'bg-blue-900/20 border-blue-600 text-blue-100'
                    : 'text-gray-300'
                }`}
              >
                <span className="mr-3 font-bold">{String.fromCharCode(65 + index)})</span>
                {option}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Previous
          </Button>

          <Button
            onClick={nextQuestion}
            disabled={!selectedAnswers[currentQuestion]}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-400"
          >
            {currentQuestion === questions.length - 1 ? 'Submit Quiz' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
