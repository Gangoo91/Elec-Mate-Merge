import { useState, useMemo } from 'react';
import { Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import QuizNavigation from '@/components/upskilling/quiz/QuizNavigation';
import type { QuizQuestion } from '@/types/quiz';

export const EmergencyLightingQuiz = () => {
  const questions: QuizQuestion[] = useMemo(
    () => [
      {
        id: 1,
        question:
          'Which legislation places fire safety duties on the responsible person in England and Wales?',
        options: [
          'The Building Regulations 2010',
          'The Regulatory Reform (Fire Safety) Order 2005',
          'The Health and Safety at Work etc. Act 1974',
          'The Fire Safety Act 2021',
        ],
        correctAnswer: 1,
        explanation:
          'The Regulatory Reform (Fire Safety) Order 2005 is the primary fire safety legislation placing duties on the responsible person for most non-domestic premises in England and Wales.',
      },
      {
        id: 2,
        question:
          'What is the typical floor area threshold above which emergency lighting is generally required?',
        options: ['100m²', '200m²', '300m²', '500m²'],
        correctAnswer: 1,
        explanation:
          'Emergency lighting is generally expected once the floor area exceeds about 200m², though the fire risk assessment can require it in smaller premises too.',
      },
      {
        id: 3,
        question:
          'Which standard is the main code of practice for emergency lighting in the UK?',
        options: ['BS 5266-1', 'BS EN 1838', 'BS 5499-4', 'BS 7909'],
        correctAnswer: 0,
        explanation:
          'BS 5266-1 is the British Standard code of practice for the emergency lighting of premises, covering design, installation and maintenance.',
      },
      {
        id: 4,
        question: 'Under the Fire Safety Order, what is the maximum penalty for serious offences?',
        options: [
          'A fixed penalty notice of £5,000',
          'A capped fine of up to £20,000',
          'An unlimited fine and/or imprisonment',
          'A community service order',
        ],
        correctAnswer: 2,
        explanation:
          'For serious fire safety offences the Order allows an unlimited fine and/or imprisonment for up to two years.',
      },
      {
        id: 5,
        question:
          'Which Approved Document references BS 5266-1 for emergency lighting in new buildings?',
        options: [
          'Approved Document A',
          'Approved Document M',
          'Approved Document B',
          'Approved Document L',
        ],
        correctAnswer: 2,
        explanation:
          'Approved Document B (Fire Safety) of the Building Regulations references BS 5266-1 for emergency lighting provision.',
      },
      {
        id: 6,
        question: 'Which testing regime does BS 5266-1 set out for emergency lighting?',
        options: [
          'Daily visual checks, monthly brief tests and an annual full-duration test',
          'Monthly full-duration tests only',
          'Annual visual checks only',
          'Weekly brief functional tests only',
        ],
        correctAnswer: 0,
        explanation:
          'BS 5266-1 requires daily visual checks of indicators, monthly brief functional tests and an annual full-duration discharge test.',
      },
      {
        id: 7,
        question: 'Under the Fire Safety Order, who is typically the responsible person?',
        options: [
          'The local fire and rescue service',
          'The building owner or person in control of the premises',
          'The local authority building control body',
          'The emergency lighting manufacturer',
        ],
        correctAnswer: 1,
        explanation:
          'The responsible person is usually the employer, building owner or other person who has control of the premises.',
      },
      {
        id: 8,
        question: 'Which building type effectively always requires emergency lighting?',
        options: [
          'Single-storey warehouses',
          'Open-air agricultural buildings',
          'Buildings with sleeping accommodation',
          'Outdoor car parks',
        ],
        correctAnswer: 2,
        explanation:
          'Premises with sleeping accommodation always require emergency lighting because of the increased vulnerability of sleeping occupants.',
      },
      {
        id: 9,
        question: 'BS EN 1838 specifically addresses which aspect of emergency lighting?',
        options: [
          'Routine maintenance procedures',
          'The relative installation costs',
          'Approved installation methods',
          'Photometric requirements and illumination levels',
        ],
        correctAnswer: 3,
        explanation:
          'BS EN 1838 sets out the photometric performance requirements, including minimum illuminance levels, for emergency lighting.',
      },
      {
        id: 10,
        question: 'What must be kept to demonstrate emergency lighting compliance?',
        options: [
          'The original installation certificate only',
          'Test records and maintenance logs',
          'Manufacturer warranty documents only',
          'The building floor plans only',
        ],
        correctAnswer: 1,
        explanation:
          'A log of test results, maintenance activities and any faults found and rectified must be kept to demonstrate ongoing compliance.',
      },
    ],
    []
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    Array(questions.length).fill(undefined as unknown as number)
  );
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentQuestion] = answerIndex;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((q) => q + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion((q) => Math.max(0, q - 1));
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(Array(questions.length).fill(undefined as unknown as number));
    setShowResults(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce(
      (acc, answer, index) => (answer === questions[index].correctAnswer ? acc + 1 : acc),
      0
    );
  };

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Brain className="h-5 w-5 text-elec-yellow" />
          Knowledge Assessment: Legal Framework
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {showResults ? (
          <div className="space-y-6">
            <div className="flex items-baseline gap-3">
              <p className="text-2xl font-bold text-elec-yellow">
                Score: {calculateScore()} / {questions.length}
              </p>
              <p className="text-gray-400">
                ({Math.round((calculateScore() / questions.length) * 100)}%)
              </p>
            </div>

            <div className="space-y-4">
              {questions.map((question, index) => {
                const isCorrect = selectedAnswers[index] === question.correctAnswer;
                return (
                  <div key={question.id} className="p-4 rounded-md border border-gray-700">
                    <p className="font-semibold text-foreground mb-2">
                      Q{index + 1}. {question.question}
                    </p>
                    <p className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                      Your answer: {question.options[selectedAnswers[index]] || '—'}
                      {isCorrect ? ' (Correct)' : ' (Incorrect)'}
                    </p>
                    {!isCorrect && (
                      <p className="text-gray-400">
                        Correct: {question.options[question.correctAnswer]}
                      </p>
                    )}
                    <p className="text-gray-300 mt-1">Explanation: {question.explanation}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end">
              <Button onClick={resetQuiz} className="bg-elec-yellow text-black hover:bg-yellow-400">
                Restart Quiz
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <QuizProgress currentQuestion={currentQuestion} totalQuestions={questions.length} />

            <div>
              <p className="text-lg font-semibold text-foreground mb-4">
                Q{currentQuestion + 1}. {questions[currentQuestion].question}
              </p>
              <div className="space-y-2">
                {questions[currentQuestion].options.map((option, index) => {
                  const isSelected = selectedAnswers[currentQuestion] === index;
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-left p-3 rounded-md border transition-colors ${
                        isSelected
                          ? 'bg-elec-yellow text-black border-elec-yellow'
                          : 'border-gray-700 hover:bg-[#323232] text-gray-300'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            <QuizNavigation
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}
              selectedAnswer={selectedAnswers[currentQuestion]}
              onPrevious={handlePrevious}
              onNext={handleNext}
              isLastQuestion={currentQuestion === questions.length - 1}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
