import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, RotateCcw } from 'lucide-react';

export const SmartHomeModule4Section4Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(
    new Array(10).fill(null)
  );
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      question: 'What is scheduled heating control?',
      options: [
        'Heating that runs to user-programmed times',
        'Heating controlled automatically by an AI system',
        'Heating that responds only to outdoor weather',
        'Heating that runs continuously to hold one setpoint',
      ],
      correct: 0,
      explanation:
        'Scheduled control follows fixed times set by the user, so the heating comes on and off according to a programmed timetable.',
    },
    {
      question: 'Give one benefit of scheduled control.',
      options: [
        'It adapts automatically to lifestyle changes',
        'It learns the occupants preferences over time',
        'Its operation is predictable and easy to understand',
        'It adjusts using live weather data',
      ],
      correct: 2,
      explanation:
        'A key benefit of scheduled control is predictability: occupants know exactly when the heating will run, which is easy to understand and verify.',
    },
    {
      question: 'What is the main disadvantage of fixed schedules?',
      options: [
        'They are expensive to set up',
        'They are rigid and wasteful when the routine changes',
        'They require a constant internet connection',
        'They are too complicated to programme',
      ],
      correct: 1,
      explanation:
        'Fixed schedules cannot adapt, so if the household routine changes the heating may run when no one is home, wasting energy.',
    },
    {
      question: 'What is AI learning control?',
      options: [
        'Heating set only by manual adjustments',
        'A simple fixed timer arrangement',
        'A system controlled only by the weather',
        'A system that adapts automatically to occupant behaviour',
      ],
      correct: 3,
      explanation:
        'AI learning control observes occupant behaviour and adjusts heating automatically, rather than following only a fixed timetable.',
    },
    {
      question: 'Which pair of methods do AI heating systems use to detect occupancy?',
      options: [
        'Motion sensors and geofencing',
        'Timers and manual switches',
        'Weather forecasts and energy cost',
        'Manual data entry only',
      ],
      correct: 0,
      explanation:
        'AI systems commonly use motion sensors and smartphone geofencing to detect when occupants are present or approaching home.',
    },
    {
      question: 'How do smart heating systems typically respond to outdoor weather?',
      options: [
        'They ignore weather and follow the timetable only',
        'They can adapt heating output to weather conditions',
        'They switch off entirely whenever it is cold',
        'They require manual reprogramming for each season',
      ],
      correct: 1,
      explanation:
        'Many smart systems factor in outdoor temperature, pre-heating sooner on colder days to reach the target temperature on time.',
    },
    {
      question: 'Which method is best for a family with a very regular routine?',
      options: [
        'AI learning control',
        'Scheduled control',
        'Hybrid control with frequent overrides',
        'Weather-compensation control on its own',
      ],
      correct: 1,
      explanation:
        'A predictable schedule suits a regular routine well, because the times rarely change and simple programming is enough.',
    },
    {
      question: 'Which method best suits shift workers with irregular hours?',
      options: [
        'A fixed weekday schedule',
        'AI learning control that adapts to changing patterns',
        'Manual control only',
        'A weekend-only timer programme',
      ],
      correct: 1,
      explanation:
        'Irregular hours defeat a fixed schedule, so AI learning control that adapts to changing patterns is a better fit for shift workers.',
    },
    {
      question: 'What is a hybrid approach to heating control?',
      options: [
        'AI control used on its own',
        'A schedule baseline refined by AI optimisations',
        'A fixed schedule used on its own',
        'Weather-based control used on its own',
      ],
      correct: 1,
      explanation:
        'A hybrid approach keeps a predictable schedule as the baseline while AI optimises around it, combining reliability with efficiency.',
    },
    {
      question: 'A client travels frequently for work. Which control method would you recommend?',
      options: [
        'Fixed daily schedules',
        'Manual control only',
        'AI learning with geofencing',
        'Weather-compensation control on its own',
      ],
      correct: 2,
      explanation:
        'Geofencing detects when the client is away or returning, so AI learning with geofencing avoids heating an empty home during frequent travel.',
    },
  ];

  const handleAnswerSelect = (answerIndex: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return answer !== null && parseInt(answer) === questions[index].correct ? score + 1 : score;
    }, 0);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(10).fill(null));
    setShowResults(false);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;

    return (
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Brain className="h-5 w-5 text-elec-yellow" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-4xl font-bold text-foreground">
            {score}/{questions.length}
          </div>
          <div className="text-xl text-indigo-200">{percentage}% Correct</div>

          <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
            {percentage >= 80 ? (
              <p className="text-green-300">
                Excellent! You have a strong understanding of heating control methods.
              </p>
            ) : percentage >= 60 ? (
              <p className="text-yellow-300">
                Good work! Review the material to strengthen your understanding.
              </p>
            ) : (
              <p className="text-red-300">
                Consider reviewing the section material before proceeding.
              </p>
            )}
          </div>

          <Button onClick={resetQuiz} className="bg-elec-yellow text-elec-dark hover:bg-yellow-600">
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
          Knowledge Quiz: Schedule vs AI Learning Control
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <div className="flex gap-1">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  selectedAnswers[index] !== null
                    ? 'bg-elec-yellow'
                    : index === currentQuestion
                      ? 'bg-gray-500'
                      : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="p-4 bg-[#1a1a1a] border border-gray-600 rounded-lg">
          <h3 className="text-foreground font-semibold text-lg mb-4">
            {questions[currentQuestion].question}
          </h3>

          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full text-left justify-start p-3 border-gray-600 ${
                  selectedAnswers[currentQuestion] === index.toString()
                    ? 'bg-elec-yellow text-elec-dark'
                    : 'text-gray-300 hover:bg-[#323232]'
                }`}
                onClick={() => handleAnswerSelect(index.toString())}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="border-gray-600 text-gray-300 hover:bg-[#323232]"
          >
            Previous
          </Button>

          {currentQuestion === questions.length - 1 ? (
            <Button
              onClick={handleSubmit}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
              disabled={selectedAnswers.some((answer) => answer === null)}
            >
              Submit Quiz
            </Button>
          ) : (
            <Button
              onClick={() =>
                setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))
              }
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
            >
              Next
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
