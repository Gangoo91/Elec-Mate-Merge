import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, ArrowLeft, ArrowRight } from 'lucide-react';

export const SmartHomeModule2Section4NewQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: 'What is wireless interference in smart home networks?',
      options: [
        'When multiple signals compete for the same frequency space',
        'When devices use too much internet bandwidth',
        'When devices are simply too far from the router',
        'When the batteries run low in wireless devices',
      ],
      correct: 0,
      explanation:
        'Interference occurs when overlapping signals share the same radio frequencies, corrupting each other and reducing reliability.',
    },
    {
      question: 'Which frequency band is most crowded in typical homes?',
      options: ['5 GHz', '900 MHz', '2.4 GHz', '868 MHz'],
      correct: 2,
      explanation:
        'The 2.4 GHz band is shared by Wi-Fi, Zigbee, Bluetooth, microwaves and more, making it the most congested band in most homes.',
    },
    {
      question: 'Why can Zigbee and Wi-Fi interfere with each other?',
      options: [
        'They use different security protocols',
        'They have very different power requirements',
        'They use incompatible mesh topologies',
        'They both operate in the 2.4 GHz frequency band',
      ],
      correct: 3,
      explanation:
        'Zigbee and 2.4 GHz Wi-Fi share the same band, so their channels can overlap and degrade each other’s signals.',
    },
    {
      question: 'What is the recommended minimum distance between a Wi-Fi router and a Zigbee hub?',
      options: ['1 metre (about 3 feet)', '30 cm (about 1 foot)', '60 cm (about 2 feet)', '2 metres (about 6 feet)'],
      correct: 0,
      explanation:
        'Keeping roughly a metre between the Wi-Fi router and the Zigbee hub reduces near-field interference between the two radios.',
    },
    {
      question: 'Which devices typically require high bandwidth in smart homes?',
      options: [
        'Temperature sensors and door contacts',
        'Security cameras and video doorbells',
        'Smart switches and dimmers',
        'Motion sensors and smart locks',
      ],
      correct: 1,
      explanation:
        'Streaming video from cameras and doorbells needs far more bandwidth than the tiny status messages from sensors and switches.',
    },
    {
      question: 'Which Wi-Fi channels are best chosen to avoid 2.4 GHz interference?',
      options: [
        'Channels 3, 8, and 13',
        'Channels 1, 6, and 11',
        'Channels 2, 7, and 12',
        'Any channel works equally well',
      ],
      correct: 1,
      explanation:
        'Channels 1, 6 and 11 are the only three non-overlapping 2.4 GHz Wi-Fi channels, so using them minimises mutual interference.',
    },
    {
      question: 'If Wi-Fi is on channel 6, which Zigbee channel is a sensible choice?',
      options: ['Channel 11', 'Channel 15', 'Channel 20', 'Channel 1'],
      correct: 2,
      explanation:
        'Zigbee channels 15, 20, 25 and 26 sit in the gaps between Wi-Fi channels 1, 6 and 11, so channel 20 avoids a Wi-Fi channel-6 network.',
    },
    {
      question: 'Which common household appliance interferes with 2.4 GHz devices?',
      options: ['Electric kettle', 'Microwave oven', 'Washing machine', 'Air conditioning unit'],
      correct: 1,
      explanation:
        'Microwave ovens emit strong 2.4 GHz radiation while running, which can disrupt Wi-Fi and Zigbee devices nearby.',
    },
    {
      question: 'Why might smart devices work during the day but struggle at night?',
      options: [
        'Higher evening network use from streaming and calls',
        'Lower temperatures weaken the wireless signal',
        'Devices automatically update their firmware overnight',
        'Wi-Fi automatically switches channels after dark',
      ],
      correct: 0,
      explanation:
        'Evening streaming, video calls and gaming load the network and the 2.4 GHz band, so devices can become unreliable at peak times.',
    },
    {
      question: 'What advantage does Z-Wave have over Wi-Fi and Zigbee regarding interference?',
      options: [
        'It transmits at much higher power',
        'It uses stronger encryption',
        'It supports more devices per network',
        'It operates in the sub-1 GHz band, avoiding 2.4 GHz congestion',
      ],
      correct: 3,
      explanation:
        'Z-Wave works in the sub-1 GHz band (around 868 MHz in the UK), so it sidesteps the crowded 2.4 GHz spectrum entirely.',
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
          <div className="text-foreground">
            {percentage >= 80
              ? 'Excellent understanding of interference and bandwidth management!'
              : percentage >= 60
                ? 'Good grasp of wireless concepts - review channel planning strategies.'
                : 'Keep studying interference causes and mitigation techniques.'}
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
          Knowledge Quiz - {questions.length} Questions
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
                    : 'text-foreground'
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
            className="border-gray-600 text-foreground hover:bg-[#323232] hover:text-foreground disabled:opacity-50"
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
