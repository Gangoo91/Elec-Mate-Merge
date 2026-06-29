import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, ArrowLeft, ArrowRight } from 'lucide-react';

export const SmartHomeModule4Section3Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: 'Why is indoor air quality important?',
      options: [
        'It affects health, comfort, and productivity',
        'It only affects how warm a room feels',
        'It only matters in industrial buildings',
        'It has no measurable impact on people',
      ],
      correct: 0,
      explanation:
        'Poor indoor air quality is linked to headaches, fatigue and reduced concentration, so it directly affects occupant health and productivity.',
    },
    {
      question: 'What is the ideal indoor relative humidity range?',
      options: ['40–60%', '20–30%', '70–80%', '80–90%'],
      correct: 0,
      explanation:
        'Keeping relative humidity between roughly 40% and 60% limits both mould growth and the dryness that causes static and irritation.',
    },
    {
      question: 'What problem occurs if indoor humidity is too high?',
      options: [
        'Static electricity builds up rapidly',
        'The air becomes uncomfortably dry',
        'Mould growth and dust mites proliferate',
        'CO₂ levels rise as a direct result',
      ],
      correct: 2,
      explanation:
        'Excess moisture encourages mould and dust mites, which worsen allergies and can damage the building fabric.',
    },
    {
      question: 'What is the effect of high CO₂ levels on occupants?',
      options: [
        'Improved concentration and alertness',
        'Reduced concentration and drowsiness',
        'Noticeably better sleep quality',
        'No measurable effect at all',
      ],
      correct: 1,
      explanation:
        'Rising indoor CO₂ is associated with drowsiness and impaired decision-making, which is why fresh-air ventilation matters.',
    },
    {
      question: 'At roughly what CO₂ level is ventilation usually increased?',
      options: ['500 ppm', '750 ppm', '3000 ppm', '1000 ppm'],
      correct: 3,
      explanation:
        'Around 1000 ppm is a common indoor air-quality threshold above which additional fresh-air ventilation is recommended.',
    },
    {
      question: 'Which pair of pollutants are commonly detected by air quality sensors?',
      options: ['Oxygen and nitrogen', 'PM2.5 and VOCs', 'Water vapour and CO₂', 'Heat and light'],
      correct: 1,
      explanation:
        'Air-quality sensors typically measure particulate matter (PM2.5) and volatile organic compounds (VOCs), key indicators of pollution.',
    },
    {
      question: 'How can an HVAC system respond to poor indoor air quality?',
      options: [
        'By only changing the temperature setpoint',
        'By turning off all systems immediately',
        'By reducing air circulation to trap pollutants',
        'By increasing ventilation and activating filtration',
      ],
      correct: 3,
      explanation:
        'On detecting poor air quality, an HVAC system can bring in more fresh air and run filtration to dilute and remove pollutants.',
    },
    {
      question: 'How does sensor placement affect air-quality readings?',
      options: [
        'Placement strongly affects accuracy and must be considered',
        'Placement has no effect on the readings',
        'Only the brand of sensor affects accuracy',
        'Sensors are accurate only when mounted at floor level',
      ],
      correct: 0,
      explanation:
        'Poorly sited sensors — near vents, windows or heat sources — give misleading readings, so placement is critical to accuracy.',
    },
    {
      question: 'What is one energy-management benefit of environmental sensors?',
      options: [
        'They increase overall energy consumption',
        'They have no impact on energy use',
        'Demand-controlled ventilation cuts unnecessary HVAC operation',
        'They only function during the winter',
      ],
      correct: 2,
      explanation:
        'By ventilating only when sensors show it is needed, demand-controlled ventilation avoids running the HVAC system unnecessarily.',
    },
    {
      question:
        'An office reports drowsy staff and poor focus, and the CO₂ sensor reads 1500 ppm. What should the HVAC system do?',
      options: [
        'Reduce ventilation to save energy',
        'Turn the air conditioning off',
        'Increase fresh-air supply and boost ventilation',
        'Take no action as 1500 ppm is acceptable',
      ],
      correct: 2,
      explanation:
        'At 1500 ppm CO₂ the air is stale, so increasing fresh-air supply and ventilation restores alertness and comfort.',
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
