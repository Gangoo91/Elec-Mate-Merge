import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, ArrowLeft, ArrowRight } from 'lucide-react';

export const SmartHomeModule4Section2Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: 'What does TRV stand for?',
      options: [
        'Temperature Regulating Valve',
        'Thermostatic Radiator Valve',
        'Thermal Regulation Valve',
        'Temperature Responsive Valve',
      ],
      correct: 1,
      explanation:
        'TRV stands for Thermostatic Radiator Valve — a valve that controls the flow of hot water through a radiator based on room temperature.',
    },
    {
      question: 'How does a smart TRV differ from a manual TRV?',
      options: [
        'It has motorised control and wireless connectivity',
        'It is simply larger in physical size',
        'It is made from different metals',
        'It only works with electric heating',
      ],
      correct: 0,
      explanation:
        'A smart TRV adds a motorised actuator and wireless link, letting it be controlled remotely and scheduled rather than turned by hand.',
    },
    {
      question: 'Name two communication protocols commonly used by smart TRVs.',
      options: ['Bluetooth and USB', 'Ethernet and HDMI', 'Zigbee and Z-Wave', 'GSM and GPS'],
      correct: 2,
      explanation:
        'Smart TRVs typically use low-power mesh protocols such as Zigbee and Z-Wave to communicate with the hub or thermostat.',
    },
    {
      question: 'What are the three main types of domestic boiler?',
      options: [
        'Combi, system and conventional',
        'Gas, oil and electric',
        'Small, medium and large',
        'Indoor, outdoor and hybrid',
      ],
      correct: 0,
      explanation:
        'Boilers are classified as combi, system or conventional (regular/heat-only) based on how they store and deliver hot water.',
    },
    {
      question: 'What is OpenTherm?',
      options: [
        'A digital communication protocol for boiler control',
        'A particular type of smart TRV',
        'A type of heating fuel',
        'A standalone temperature sensor',
      ],
      correct: 0,
      explanation:
        'OpenTherm is a communication standard that lets a compatible thermostat modulate a boiler’s output rather than just switching it on and off.',
    },
    {
      question: "What is the difference between on/off and modulating boiler control?",
      options: [
        'On/off is the newer technology',
        'Modulating adjusts output while on/off switches fully on or off',
        'On/off is the more efficient of the two',
        "There is no real difference",
      ],
      correct: 1,
      explanation:
        'Modulating control varies the boiler’s flame to match demand, which is more efficient than simply cycling fully on and off.',
    },
    {
      question: 'Why are heat pumps usually run at lower flow temperatures?',
      options: [
        'Simply to save electricity',
        'To prevent the unit overheating',
        'Because it is a legal requirement',
        'For maximum efficiency, matching their operating characteristics',
      ],
      correct: 3,
      explanation:
        'Heat pumps achieve their best coefficient of performance at lower flow temperatures, so systems are designed around larger emitters and steady low-temperature heat.',
    },
    {
      question: 'Are all smart thermostats compatible with all boilers?',
      options: [
        'Yes — any smart thermostat works with any boiler',
        'No — compatibility depends on the boiler’s wiring and protocols',
        'Yes, provided the boiler is gas-fired',
        'No — only combi boilers can ever be controlled',
      ],
      correct: 1,
      explanation:
        'Compatibility varies: the boiler’s wiring, controls and whether it supports protocols like OpenTherm determine which thermostats will work.',
    },
    {
      question: "What is one challenge of retrofitting smart controls to older systems?",
      options: [
        'They are always far too expensive to fit',
        'They require excessive ongoing maintenance',
        'Older systems may lack digital communication interfaces',
        'They are too complicated for anyone to operate',
      ],
      correct: 2,
      explanation:
        'Older heating systems often have only simple on/off wiring, so they may lack the digital interfaces that smart modulating controls rely on.',
    },
    {
      question:
        "A client installs smart TRVs but doesn't link them to the boiler. What issue might this cause?",
      options: [
        "The TRVs won't work at all",
        'The system will dangerously overheat',
        'Nothing — they always work fully independently',
        'The boiler may keep running even when all TRVs are closed',
      ],
      correct: 3,
      explanation:
        'Without boiler interlock, the boiler can keep firing and circulating water even when every TRV has shut, wasting energy and short-cycling the boiler.',
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
