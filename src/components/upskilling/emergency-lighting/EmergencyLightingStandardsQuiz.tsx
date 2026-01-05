import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import type { QuizQuestion } from '@/types/quiz';

const EmergencyLightingStandardsQuiz = () => {
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: 'What is the primary British Standard governing emergency lighting design and installation?',
      options: [
        'BS 7671',
        'BS 5266-1',
        'BS 9999',
        'BS 5839-1'
      ],
      correctAnswer: 1,
      explanation: 'BS 5266-1 is the Code of practice for the emergency lighting of premises, providing comprehensive guidance on design and installation.'
    },
    {
      id: 2,
      question: 'Which document provides guidance on fire safety engineering and emergency lighting integration?',
      options: [
        'Approved Document B',
        'BS 9999',
        'Building Regulations',
        'All of the above'
      ],
      correctAnswer: 3,
      explanation: 'All these documents provide guidance on fire safety and emergency lighting integration, with BS 9999 focusing on fire safety engineering.'
    },
    {
      id: 3,
      question: 'What is the minimum duration for emergency lighting in escape routes?',
      options: [
        '30 minutes',
        '1 hour',
        '3 hours',
        'Variable depending on occupancy'
      ],
      correctAnswer: 1,
      explanation: 'BS 5266-1 typically requires 1 hour minimum duration for escape lighting, though some applications may require 3 hours.'
    },
    {
      id: 4,
      question: 'Which standard covers the electrical installation requirements for emergency lighting systems?',
      options: [
        'BS 5266-1',
        'BS 7671',
        'BS 9999',
        'BS EN 1838'
      ],
      correctAnswer: 1,
      explanation: 'BS 7671 (IET Wiring Regulations) covers electrical installation requirements, including those for emergency lighting systems.'
    },
    {
      id: 5,
      question: 'What is the recommended illuminance level for escape route lighting?',
      options: [
        '0.2 lux',
        '1 lux',
        '5 lux',
        '15 lux'
      ],
      correctAnswer: 1,
      explanation: 'BS EN 1838 specifies 1 lux minimum along the centre line of escape routes at floor level.'
    },
    {
      id: 6,
      question: 'Which European standard specifically addresses photometric requirements for emergency lighting?',
      options: [
        'BS EN 1838',
        'BS EN 50172',
        'BS EN 60598',
        'BS EN 12464'
      ],
      correctAnswer: 0,
      explanation: 'BS EN 1838 covers lighting applications and specifies photometric requirements and measurement methods for emergency lighting.'
    },
    {
      id: 7,
      question: 'How often should emergency lighting systems be tested according to BS 5266-1?',
      options: [
        'Weekly brief test, monthly longer test',
        'Monthly brief test, annual full test',
        'Daily brief test, weekly longer test',
        'Quarterly brief test, annual full test'
      ],
      correctAnswer: 1,
      explanation: 'BS 5266-1 requires monthly brief functional tests and annual full-duration tests of emergency lighting systems.'
    },
    {
      id: 8,
      question: 'Which standard covers emergency lighting luminaires and control gear?',
      options: [
        'BS EN 50172',
        'BS EN 60598',
        'BS 5266-1',
        'Both A and B'
      ],
      correctAnswer: 3,
      explanation: 'BS EN 50172 covers emergency escape lighting systems, while BS EN 60598 covers luminaire safety requirements.'
    },
    {
      id: 9,
      question: 'What does the Regulatory Reform (Fire Safety) Order 2005 require regarding emergency lighting?',
      options: [
        'Monthly testing only',
        'Risk assessment and appropriate provision',
        'Annual certification',
        'Specific luminaire types'
      ],
      correctAnswer: 1,
      explanation: 'The RR(FS)O requires responsible persons to conduct risk assessments and provide appropriate emergency lighting based on the premises use and occupancy.'
    },
    {
      id: 10,
      question: 'Which factor is NOT typically considered when determining emergency lighting requirements under BS 5266-1?',
      options: [
        'Building occupancy type',
        'Escape route complexity',
        'External weather conditions',
        'Occupant familiarity with premises'
      ],
      correctAnswer: 2,
      explanation: 'External weather conditions are not a primary factor in BS 5266-1 requirements, which focus on internal building characteristics and occupancy factors.'
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(questions.length).fill(undefined as unknown as number));
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestion(Math.max(0, currentQuestion - 1));
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(Array(questions.length).fill(undefined as unknown as number));
    setShowResults(false);
  };

  const score = selectedAnswers.reduce((acc, answer, index) => {
    return answer === questions[index].correctAnswer ? acc + 1 : acc;
  }, 0);

  if (showResults) {
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground">Quiz Results: BS 5266 and Standards</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-elec-yellow mb-2">
              {score} / {questions.length}
            </div>
            <div className="text-gray-400">
              {Math.round((score / questions.length) * 100)}% Complete
            </div>
          </div>

          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="p-4 border border-gray-700 rounded-lg">
                  <p className="font-semibold text-foreground mb-2">
                    Q{index + 1}. {question.question}
                  </p>
                  <div className="space-y-1">
                    <p className={`${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                      Your answer: {question.options[userAnswer]} {isCorrect ? '✓' : '✗'}
                    </p>
                    {!isCorrect && (
                      <p className="text-green-400">
                        Correct answer: {question.options[question.correctAnswer]}
                      </p>
                    )}
                    <p className="text-gray-400 text-sm mt-1">
                      {question.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={resetQuiz} 
              className="bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground">Knowledge Check: BS 5266 and Standards</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <QuizProgress currentQuestion={currentQuestion} totalQuestions={questions.length} />
        
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Question {currentQuestion + 1} of {questions.length}
          </h3>
          <p className="text-foreground mb-4">
            {questions[currentQuestion].question}
          </p>
          
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-elec-yellow bg-elec-yellow/20 text-foreground'
                    : 'border-gray-600 bg-elec-gray text-gray-300 hover:border-gray-500 hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-elec-yellow bg-elec-yellow'
                      : 'border-gray-600'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-2 h-2 rounded-full bg-black"></div>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="bg-elec-yellow text-black hover:bg-elec-yellow/90 disabled:opacity-50"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyLightingStandardsQuiz;