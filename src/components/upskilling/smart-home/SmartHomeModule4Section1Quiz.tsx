import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, ArrowLeft, ArrowRight } from 'lucide-react';

export const SmartHomeModule4Section1Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: 'What is a smart thermostat?',
      options: [
        'An electronic device allowing app, voice or web-based temperature control',
        'A traditional mechanical wall thermostat',
        'A heating element fitted inside a radiator',
        'A temperature sensor with no control function',
      ],
      correct: 0,
      explanation:
        'A smart thermostat adds connectivity so heating can be controlled and scheduled remotely via an app, voice assistant or web.',
    },
    {
      question: 'Give one example of a smart thermostat brand.',
      options: ['British Gas', 'Worcester Bosch', 'Nest', 'Vaillant'],
      correct: 2,
      explanation:
        'Google Nest is a well-known smart thermostat brand; the others listed are primarily energy suppliers or boiler manufacturers.',
    },
    {
      question: 'How does a smart thermostat differ from a traditional thermostat?',
      options: [
        'It offers remote access and advanced features',
        'It is simply larger in physical size',
        'It only works with gas boilers',
        'It is more expensive to run day to day',
      ],
      correct: 0,
      explanation:
        'The key difference is connectivity — remote access, scheduling, learning and integration — rather than size or running cost.',
    },
    {
      question: 'What is room zoning?',
      options: [
        'Installing multiple separate boilers',
        'Dividing a property into independently heated zones',
        'Using several different heating fuels',
        'Setting the same temperature everywhere',
      ],
      correct: 1,
      explanation:
        'Zoning lets different areas be heated to different temperatures or schedules, improving comfort and cutting wasted energy.',
    },
    {
      question: 'Name one method of zoning a radiator heating system.',
      options: [
        'Motorised air dampers',
        'Central distribution manifolds',
        'Smart TRVs (Thermostatic Radiator Valves)',
        'Wireless sensors used on their own',
      ],
      correct: 2,
      explanation:
        'Smart TRVs control each radiator individually, allowing room-by-room zoning without major pipework changes.',
    },
    {
      question: 'Name one method of zoning used in underfloor heating.',
      options: ['Smart TRVs', 'Radiator valves', 'Ductwork dampers', 'Manifold zoning with actuators'],
      correct: 3,
      explanation:
        'Underfloor heating is zoned at the manifold, where actuators open and close the flow to each loop under thermostat control.',
    },
    {
      question: 'What is geofencing in smart heating?',
      options: [
        'Installing fences around the heating equipment',
        'Automatic heating control based on occupant location',
        'Setting maximum temperature boundaries',
        'Limiting the wireless signal range',
      ],
      correct: 1,
      explanation:
        'Geofencing uses the location of occupants’ phones to turn heating down when everyone leaves and back up as they return.',
    },
    {
      question: 'Give one limitation of zoning systems.',
      options: [
        'Retrofitting them can be disruptive',
        'They always guarantee cost savings',
        'They work with every heating system',
        'They never require any maintenance',
      ],
      correct: 0,
      explanation:
        'Adding zoning to an existing property can mean significant pipework or wiring changes, making retrofit disruptive and costly.',
    },
    {
      question: 'Can smart thermostats integrate with voice assistants?',
      options: [
        'No — they cannot connect to voice assistants at all',
        'No — voice control is blocked for safety reasons',
        'Yes — but only with a paid yearly subscription',
        'Yes — most work with assistants like Alexa and Google Assistant',
      ],
      correct: 3,
      explanation:
        'Most modern smart thermostats integrate with Alexa and Google Assistant, allowing hands-free temperature control.',
    },
    {
      question:
        'A homeowner wants to reduce heating costs but still keep bedrooms warm at night. What zoning approach would you recommend?',
      options: [
        'Heat the whole house at night',
        'Turn off all heating at night',
        'Use smart TRVs to heat only the bedrooms while turning down other zones',
        'Install multiple separate boilers',
      ],
      correct: 2,
      explanation:
        'Smart TRVs let only the bedrooms be heated overnight while other zones are turned down, saving energy without sacrificing comfort.',
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
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct.toString()) {
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
              ? 'Excellent work!'
              : percentage >= 60
                ? 'Good effort!'
                : 'Keep studying!'}
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
          Knowledge Quiz
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
                onClick={() => handleAnswerSelect(index.toString())}
                className={`w-full text-left justify-start p-4 border-gray-600 hover:bg-[#323232] ${
                  selectedAnswers[currentQuestion] === index.toString()
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
              disabled={!selectedAnswers[currentQuestion]}
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
