import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Brain, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const SmartHomeModule5Section6Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      question: 'Why is network security essential in smart homes?',
      options: [
        'To prevent unauthorised access and protect personal data',
        'To make connected devices respond more quickly',
        'To reduce the household electricity bill',
        'To simplify the installation process',
      ],
      correct: 0,
      explanation:
        'Network security prevents unauthorised access to devices and protects personal data from theft or misuse.',
    },
    {
      question: 'Which pair are common communication methods used by smart devices?',
      options: [
        'Radio broadcast and television',
        'Telephone line and fax',
        'Wi-Fi and Bluetooth',
        'Postal mail and email',
      ],
      correct: 2,
      explanation:
        'Smart devices commonly use Wi-Fi, Bluetooth, Zigbee and Z-Wave to communicate with hubs and each other.',
    },
    {
      question: 'What kind of data could be exposed if a smart home system is hacked?',
      options: [
        'Only the device serial numbers',
        'Video feeds, access logs and personal details',
        'Just the Wi-Fi network name',
        'Nothing of any real value',
      ],
      correct: 1,
      explanation:
        'Attackers can reach video feeds, door access logs, daily schedules and other sensitive personal information.',
    },
    {
      question: 'Give one example of a privacy risk in smart homes.',
      options: [
        'Lights being set too bright',
        'Devices drawing standby electricity',
        'Smart speakers recording conversations',
        'Wi-Fi running slower than expected',
      ],
      correct: 2,
      explanation:
        'Smart speakers can capture and store fragments of conversation, creating a genuine privacy risk for occupants.',
    },
    {
      question: 'How can location data reveal when a home is vulnerable?',
      options: [
        'It displays the property market value',
        'It reveals usage patterns showing when occupants are away',
        'It simply shows the postal address',
        'It identifies the surrounding neighbourhood',
      ],
      correct: 1,
      explanation:
        'Location and usage data can reveal patterns that show when a home is regularly empty, making it a target for burglary.',
    },
    {
      question: 'What is the recommended Wi-Fi encryption standard?',
      options: [
        'WEP encryption',
        'An open network with no encryption',
        'WPA3, or at least WPA2',
        'No encryption is needed indoors',
      ],
      correct: 2,
      explanation:
        'WPA3 is the most secure current standard, with WPA2 as an acceptable minimum; WEP and open networks are insecure.',
    },
    {
      question: 'Why should clients change default device passwords?',
      options: [
        'Default passwords are widely published and easily exploited',
        'To make the passwords easier to remember',
        'To match their other account passwords',
        'It is only necessary on outdoor devices',
      ],
      correct: 0,
      explanation:
        'Default passwords are publicly documented and routinely targeted by attackers, so they must be changed during setup.',
    },
    {
      question: 'Give one advantage of setting up a guest Wi-Fi network for smart devices.',
      options: [
        'It increases the overall Wi-Fi speed',
        'It reduces the power the devices consume',
        'It is a legal requirement for IoT devices',
        'It isolates smart devices from the main network',
      ],
      correct: 3,
      explanation:
        'A separate guest or IoT network isolates smart devices, so a breach of one device is less likely to reach the main network.',
    },
    {
      question: 'What role does an electrician play in ensuring system security?',
      options: [
        'Only mounting and wiring the physical devices',
        'Changing default passwords and educating the client',
        'Simply handing over the user manual',
        'Security is outside their responsibility',
      ],
      correct: 1,
      explanation:
        'Electricians should configure devices securely, change default passwords and explain good security practice to the client.',
    },
    {
      question: 'Which real-world case shows the danger of weak passwords on smart devices?',
      options: [
        'Smart lights occasionally flickering',
        'A smart thermostat showing the wrong temperature',
        'A baby monitor hacked via its default password',
        'Wi-Fi dropping connection from time to time',
      ],
      correct: 2,
      explanation:
        'Reported baby-monitor hacks show how an unchanged default password can lead to serious privacy breaches and remote access.',
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
      calculateScore();
      setShowResults(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (parseInt(selectedAnswers[index]) === question.correct) {
        correct++;
      }
    });
    setScore(correct);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBadgeColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'bg-green-600';
    if (percentage >= 60) return 'bg-yellow-600';
    return 'bg-red-600';
  };

  if (showResults) {
    return (
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Brain className="h-5 w-5 text-elec-yellow" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-4">
            <div className={`text-4xl font-bold ${getScoreColor()}`}>
              {score}/{questions.length}
            </div>
            <Badge className={`${getScoreBadgeColor()} text-foreground px-4 py-2 text-lg`}>
              {Math.round((score / questions.length) * 100)}%
            </Badge>
            <p className="text-foreground">
              {score === questions.length
                ? 'Perfect score! Excellent understanding of network security.'
                : score >= 8
                  ? 'Great job! You have a solid grasp of smart home security principles.'
                  : score >= 6
                    ? 'Good effort! Review the areas you missed to strengthen your knowledge.'
                    : 'Keep studying! Network security is crucial for professional installations.'}
            </p>
          </div>

          <div className="space-y-3">
            {questions.map((question, index) => {
              const userAnswer = parseInt(selectedAnswers[index]);
              const isCorrect = userAnswer === question.correct;

              return (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    isCorrect
                      ? 'bg-green-950/20 border-green-800/30'
                      : 'bg-red-950/20 border-red-800/30'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-400" />
                    )}
                    <span className="font-medium text-foreground">Question {index + 1}</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-2">{question.question}</p>
                  {!isCorrect && (
                    <p className="text-gray-300 text-sm">
                      <span className="text-red-400">Your answer:</span>{' '}
                      {question.options[userAnswer]}
                    </p>
                  )}
                  <p className="text-gray-300 text-sm">
                    <span className="text-green-400">Correct answer:</span>{' '}
                    {question.options[question.correct]}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">{question.explanation}</p>
                </div>
              );
            })}
          </div>

          <Button
            onClick={resetQuiz}
            className="w-full bg-elec-yellow text-elec-dark hover:bg-yellow-500"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Take Quiz Again
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
          Knowledge Check Quiz
        </CardTitle>
        <div className="flex items-center gap-2">
          <span className="text-gray-400">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <div className="flex-1 bg-gray-700 h-2 rounded-full">
            <div
              className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">
            {questions[currentQuestion].question}
          </h3>

          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full justify-start text-left h-auto p-4 border-gray-600 hover:bg-elec-dark ${
                  selectedAnswers[currentQuestion] === index.toString()
                    ? 'bg-elec-yellow text-elec-dark border-elec-yellow'
                    : 'text-gray-300 hover:border-elec-yellow'
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
            className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
          >
            Previous
          </Button>

          <Button
            onClick={nextQuestion}
            disabled={!selectedAnswers[currentQuestion]}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-500 disabled:opacity-50"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
