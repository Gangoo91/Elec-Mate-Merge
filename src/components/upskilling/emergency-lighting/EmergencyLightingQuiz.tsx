import { useState, useMemo } from 'react';
import { Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import QuizNavigation from '@/components/upskilling/quiz/QuizNavigation';
import type { QuizQuestion } from '@/types/quiz';

export const EmergencyLightingQuiz = () => {
  const questions: QuizQuestion[] = useMemo(() => [
    {
      id: 1,
      question: 'Which legislation places fire safety duties on the responsible person in England and Wales?',
      options: [
        'Building Regulations 2010',
        'Regulatory Reform (Fire Safety) Order 2005',
        'Health and Safety at Work Act 1974',
        'Fire Safety Act 2021'
      ],
      correctAnswer: 1,
      explanation: 'The RRO 2005 is the primary fire safety legislation placing duties on responsible persons for most non-domestic premises.'
    },
    {
      id: 2,
      question: 'What is the typical floor area threshold above which emergency lighting is generally required?',
      options: [
        '100m²',
        '200m²',
        '300m²',
        '500m²'
      ],
      correctAnswer: 1,
      explanation: 'Buildings over 200m² floor area typically require emergency lighting, though this can vary based on risk assessment.'
    },
    {
      id: 3,
      question: 'Which standard provides the primary technical guidance for emergency lighting in the UK?',
      options: [
        'BS EN 1838:2013',
        'BS 5499-4:2013',
        'BS 5266-1:2016',
        'BS 7909:2013'
      ],
      correctAnswer: 2,
      explanation: 'BS 5266-1:2016 is the main British Standard code of practice for emergency lighting design and installation.'
    },
    {
      id: 4,
      question: 'Under the RRO, what is the maximum penalty for serious fire safety offences?',
      options: [
        'Fixed penalty of £5,000',
        'Up to £20,000 fine',
        'Unlimited fine and/or imprisonment',
        'Community service order'
      ],
      correctAnswer: 2,
      explanation: 'The RRO allows for unlimited fines and imprisonment up to 2 years for serious fire safety offences.'
    },
    {
      id: 5,
      question: 'Which document references BS 5266-1 for emergency lighting requirements in new buildings?',
      options: [
        'Approved Document A',
        'Approved Document B',
        'Approved Document L',
        'Approved Document M'
      ],
      correctAnswer: 1,
      explanation: 'Approved Document B (Fire Safety) of the Building Regulations references BS 5266-1 for emergency lighting.'
    },
    {
      id: 6,
      question: 'Emergency lighting testing frequency under BS 5266-1 includes:',
      options: [
        'Monthly full duration tests only',
        'Annual visual checks only',
        'Daily visual, monthly brief, annual full tests',
        'Weekly brief tests only'
      ],
      correctAnswer: 2,
      explanation: 'BS 5266-1 requires daily visual checks, monthly brief functional tests, and annual full-duration tests.'
    },
    {
      id: 7,
      question: 'The responsible person under the RRO is typically:',
      options: [
        'The fire brigade',
        'The local authority',
        'The building owner or person in control',
        'The emergency lighting manufacturer'
      ],
      correctAnswer: 2,
      explanation: 'The responsible person is usually the employer, building owner, or person with control over the premises.'
    },
    {
      id: 8,
      question: 'Which building types always require emergency lighting?',
      options: [
        'Single-storey warehouses only',
        'Buildings with sleeping accommodation',
        'Outdoor car parks',
        'Agricultural buildings'
      ],
      correctAnswer: 1,
      explanation: 'Buildings with sleeping accommodation always require emergency lighting due to the vulnerability of sleeping occupants.'
    },
    {
      id: 9,
      question: 'BS EN 1838:2013 specifically addresses:',
      options: [
        'Emergency lighting maintenance',
        'Photometric requirements for emergency lighting',
        'Emergency lighting costs',
        'Emergency lighting installation methods'
      ],
      correctAnswer: 1,
      explanation: 'BS EN 1838:2013 sets out the photometric requirements and illumination levels for emergency lighting.'
    },
    {
      id: 10,
      question: 'What must be maintained for emergency lighting compliance?',
      options: [
        'Installation certificates only',
        'Test records and maintenance logs',
        'Manufacturer warranties only',
        'Building plans only'
      ],
      correctAnswer: 1,
      explanation: 'Comprehensive records including test results, maintenance activities, and fault reports must be maintained for compliance.'
    }
  ], []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(undefined as unknown as number));
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
    return selectedAnswers.reduce((acc, answer, index) => 
      answer === questions[index].correctAnswer ? acc + 1 : acc, 0
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
                    <p className="text-gray-300 mt-1">
                      Explanation: {question.explanation}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={resetQuiz} 
                className="bg-elec-yellow text-black hover:bg-yellow-400"
              >
                Restart Quiz
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <QuizProgress 
              currentQuestion={currentQuestion} 
              totalQuestions={questions.length} 
            />

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