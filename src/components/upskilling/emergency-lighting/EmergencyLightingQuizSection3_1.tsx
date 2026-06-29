import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export const EmergencyLightingQuizSection3_1 = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = [
    {
      id: 1,
      question: 'What is the minimum illuminance required along the centre line of an escape route?',
      options: ['0.5 lux', '1 lux', '2 lux', '5 lux'],
      correctAnswer: 1,
      explanation:
        'BS 5266-1 requires a minimum of 1 lux along the centre line of an escape route to allow safe movement during evacuation.',
    },
    {
      id: 2,
      question: 'What illuminance is required in high-risk task areas?',
      options: [
        '15 lux, or 10% of the normal task lighting if greater',
        '5 lux minimum, regardless of the normal task lighting',
        '10 lux minimum, regardless of the normal task lighting',
        '20 lux minimum, regardless of the normal task lighting',
      ],
      correctAnswer: 0,
      explanation:
        'High-risk task areas require at least 15 lux, or 10% of the normal task lighting level if that is greater, so a hazardous activity can be made safe.',
    },
    {
      id: 3,
      question: 'What is the minimum illuminance in open (anti-panic) areas?',
      options: ['0.2 lux', '0.5 lux', '1 lux', '1.5 lux'],
      correctAnswer: 1,
      explanation:
        'Open (anti-panic) areas require a minimum of 0.5 lux across the core floor area to reduce panic and enable orderly evacuation.',
    },
    {
      id: 4,
      question: 'Why is good uniformity important in emergency lighting design?',
      options: [
        'It reduces the energy the system consumes',
        'It avoids shadows and dark patches that could cause panic',
        'It lowers the cost of the installation',
        'It extends the life of the batteries',
      ],
      correctAnswer: 1,
      explanation:
        'Good uniformity avoids dark patches and harsh shadows that could cause panic, disorientation or accidents during evacuation.',
    },
    {
      id: 5,
      question: 'What is the maximum ratio of maximum to minimum illuminance typically allowed on an escape route?',
      options: ['20:1', '40:1', '60:1', '80:1'],
      correctAnswer: 1,
      explanation:
        'For escape routes the diversity (uniformity) ratio of maximum to minimum illuminance should not exceed 40:1 to avoid excessive contrast.',
    },
    {
      id: 6,
      question: 'What is the minimum emergency lighting duration in a general building?',
      options: ['30 minutes', '1 hour', '2 hours', '3 hours'],
      correctAnswer: 1,
      explanation:
        'General buildings require a minimum 1-hour duration, although many installations use 3-hour fittings for a greater safety margin.',
    },
    {
      id: 7,
      question: 'In a public assembly space, how long must emergency lighting operate?',
      options: ['1 hour', '2 hours', '3 hours', '4 hours'],
      correctAnswer: 2,
      explanation:
        'Public assembly spaces, and premises where re-entry may be required, must have emergency lighting that operates for a minimum of 3 hours.',
    },
    {
      id: 8,
      question: 'Why should designers allow for battery ageing in their calculations?',
      options: [
        'The system must still meet the lux levels at end of battery life',
        'It reduces the overall material cost of the installation',
        'It improves the lighting efficiency of the luminaires',
        "It is needed to satisfy the manufacturer's battery warranty",
      ],
      correctAnswer: 0,
      explanation:
        'Battery capacity falls with age, so the design must still achieve the required lux levels at the end of the battery service life.',
    },
    {
      id: 9,
      question: 'Which instrument is used to measure lux levels during testing?',
      options: ['A multimeter', 'An oscilloscope', 'A calibrated lux meter', 'An infrared thermometer'],
      correctAnswer: 2,
      explanation:
        'A calibrated lux meter is used to measure illuminance at floor level during commissioning and periodic testing.',
    },
    {
      id: 10,
      question: 'Why is a 3-hour duration fitting often chosen as the default?',
      options: [
        'It is the cheapest fitting available to install on site',
        'It meets the requirements for most building types',
        'It consumes the least standby energy of any fitting',
        'It is required by law in every type of building',
      ],
      correctAnswer: 1,
      explanation:
        '3-hour fittings satisfy the requirements of most commercial and public premises and give margin for complex evacuations and future changes.',
    },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizComplete(false);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);

  if (showResults) {
    return (
      <Card className="bg-slate-200/20 border-elec-yellow/20">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Award className="h-6 w-6 text-elec-yellow" />
            Quiz Results: Minimum Illumination Levels and Durations
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-elec-yellow mb-2">
              {score}/{questions.length}
            </div>
            <div className="text-2xl mb-4">{percentage}% Score</div>
            <div
              className={`text-lg ${percentage >= 80 ? 'text-green-400' : percentage >= 60 ? 'text-yellow-400' : 'text-red-400'}`}
            >
              {percentage >= 80
                ? 'Excellent! Well done!'
                : percentage >= 60
                  ? 'Good effort! Review the areas below.'
                  : 'Keep studying and try again!'}
            </div>
          </div>

          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div key={index} className="bg-elec-dark/40 p-4 rounded-lg border border-gray-600">
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-grow">
                      <h4 className="font-medium text-foreground mb-2">
                        Question {index + 1}: {question.question}
                      </h4>

                      {!isCorrect && (
                        <div className="mb-2">
                          <span className="text-red-400 text-sm">Your answer: </span>
                          <span className="text-foreground text-sm">
                            {question.options[userAnswer]}
                          </span>
                        </div>
                      )}

                      <div className="mb-2">
                        <span className="text-green-400 text-sm">Correct answer: </span>
                        <span className="text-foreground text-sm">
                          {question.options[question.correctAnswer]}
                        </span>
                      </div>

                      <div className="bg-elec-gray/30 p-3 rounded border border-gray-600">
                        <p className="text-sm text-gray-300">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleRestartQuiz}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="bg-slate-200/20 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Award className="h-6 w-6 text-elec-yellow" />
            Quiz: Minimum Illumination Levels and Durations
          </span>
          <span className="text-sm text-gray-400">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </CardTitle>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
          <div
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-6 text-foreground">{currentQ.question}</h3>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-elec-yellow bg-elec-yellow/10 text-foreground'
                    : 'border-gray-600 bg-elec-gray/30 text-foreground hover:border-gray-500 hover:bg-elec-gray/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-elec-yellow bg-elec-yellow'
                        : 'border-gray-400'
                    }`}
                  >
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-2 h-2 bg-elec-dark rounded-full"></div>
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
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-600 text-foreground hover:bg-elec-gray/50"
          >
            Previous
          </Button>

          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
