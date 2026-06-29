import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, RotateCcw } from 'lucide-react';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import QuizNavigation from '@/components/upskilling/quiz/QuizNavigation';
import QuizQuestion from '@/components/upskilling/quiz/QuizQuestion';
import QuizResults from '@/components/upskilling/quiz/QuizResults';
import { QuizQuestion as QuizQuestionType } from '@/types/quiz';

const quizQuestions: QuizQuestionType[] = [
  {
    id: 1,
    question: 'What is the primary purpose of escape route lighting?',
    options: [
      'To provide general ambient lighting under normal conditions',
      'To highlight the location of fire alarm call points',
      'To illuminate escape routes so occupants can evacuate safely',
      'To act as security lighting during power outages',
    ],
    correctAnswer: 2,
    explanation:
      'Escape route lighting is specifically designed to illuminate escape routes, exits and any change of direction along the evacuation path so occupants can leave safely during an emergency.',
  },
  {
    id: 2,
    question: 'Which type of emergency lighting helps people locate fire safety equipment?',
    options: [
      'Fire safety sign lighting',
      'Open area (anti-panic) lighting',
      'Escape route lighting',
      'High-risk task area lighting',
    ],
    correctAnswer: 0,
    explanation:
      'Fire safety sign lighting illuminates safety signs so occupants can locate fire safety equipment such as extinguishers, alarm call points and emergency exits.',
  },
  {
    id: 3,
    question: 'What is the main characteristic of a maintained emergency lighting system?',
    options: [
      'It illuminates only during a mains power failure',
      'It operates continuously, whether or not mains power is available',
      'It must be switched on manually when needed',
      'It provides light for a maximum of 30 minutes',
    ],
    correctAnswer: 1,
    explanation:
      'A maintained emergency lighting system operates continuously, providing illumination at all times whether or not mains power is available, ensuring constant visibility of escape routes.',
  },
  {
    id: 4,
    question: 'In a non-maintained emergency lighting system, when do the lights operate?',
    options: [
      'Continuously during normal operation',
      'Only when manually activated by a switch',
      'Only when the mains supply fails',
      'Only during scheduled testing periods',
    ],
    correctAnswer: 2,
    explanation:
      'Non-maintained emergency lighting operates only when the mains supply fails. During normal operation the lamps remain off, with the battery on charge ready for use.',
  },
  {
    id: 5,
    question: 'What is open area (anti-panic) lighting designed to illuminate?',
    options: [
      'Escape routes and exit doors only',
      'External areas around the building',
      'Plant rooms and storage areas',
      'Large open spaces to prevent panic and allow safe movement',
    ],
    correctAnswer: 3,
    explanation:
      'Open area (anti-panic) lighting illuminates large open spaces to reduce panic and allow occupants to move safely towards escape routes during an emergency.',
  },
  {
    id: 6,
    question: 'High-risk task area lighting is required where:',
    options: [
      'The normal lighting levels are unusually high',
      'A sudden loss of normal lighting could cause danger or injury',
      'There is an elevated risk of fire',
      'Building security is particularly important',
    ],
    correctAnswer: 1,
    explanation:
      'High-risk task area lighting is provided where a sudden loss of normal lighting could cause danger or injury, allowing a hazardous process to be shut down safely.',
  },
  {
    id: 7,
    question: 'What is the typical minimum illumination level required along an escape route?',
    options: ['0.2 lux', '1 lux', '5 lux', '10 lux'],
    correctAnswer: 1,
    explanation:
      'Escape route lighting requires a minimum of 1 lux measured at floor level along the centre line of the route, as specified in BS 5266-1.',
  },
  {
    id: 8,
    question: 'Which system allows emergency lights to be monitored and controlled centrally?',
    options: [
      'Self-contained system',
      'Non-maintained system',
      'Central battery system',
      'Maintained system',
    ],
    correctAnswer: 2,
    explanation:
      'A central battery system supplies all luminaires from one battery source, allowing the emergency lighting to be monitored and controlled from a central location.',
  },
  {
    id: 9,
    question: 'What is the main advantage of self-contained emergency lighting luminaires?',
    options: [
      'They have a lower initial purchase cost',
      'They are easier to maintain than any alternative',
      'Each unit is independent, so one failure does not affect others',
      'They always produce a higher light output',
    ],
    correctAnswer: 2,
    explanation:
      'Self-contained luminaires each have their own battery, making them independent of any central system, so the failure of one unit does not affect the others.',
  },
  {
    id: 10,
    question:
      'According to BS 5266-1, what is the minimum duration emergency lighting should operate?',
    options: ['30 minutes', '1 hour', '2 hours', '3 hours'],
    correctAnswer: 1,
    explanation:
      'BS 5266-1 sets a minimum duration of 1 hour, though many premises (such as those with sleeping accommodation or where re-entry is needed) require 3 hours.',
  },
];

export const EmergencyLightingTypesQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Brain className="h-5 w-5 text-elec-yellow" />
            Quiz Results - Emergency Lighting Types
          </CardTitle>
        </CardHeader>
        <CardContent>
          <QuizResults
            questions={quizQuestions}
            selectedAnswers={selectedAnswers}
            onRestart={handleRestart}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Brain className="h-5 w-5 text-elec-yellow" />
          Knowledge Assessment - Types of Emergency Lighting Systems
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <QuizProgress currentQuestion={currentQuestion} totalQuestions={quizQuestions.length} />

        <QuizQuestion
          question={quizQuestions[currentQuestion]}
          selectedAnswer={selectedAnswers[currentQuestion]}
          onAnswerSelect={handleAnswerSelect}
        />

        <QuizNavigation
          currentQuestion={currentQuestion}
          totalQuestions={quizQuestions.length}
          selectedAnswer={selectedAnswers[currentQuestion]}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isLastQuestion={currentQuestion === quizQuestions.length - 1}
        />
      </CardContent>
    </Card>
  );
};
