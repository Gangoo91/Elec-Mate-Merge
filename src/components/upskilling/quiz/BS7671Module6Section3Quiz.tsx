import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the purpose of RCD testing?',
    options: [
      'To verify the RCD operates at its rated tripping current within the required time limits',
      'To measure the insulation resistance of the protected circuit',
      'To confirm correct polarity at the RCD terminals',
      'To measure the earth fault loop impedance of the circuit',
    ],
    correctAnswer: 0,
    explanation:
      'RCD testing verifies that the device operates correctly at its rated tripping current (IΔn) and within the required time limits as specified in BS 7671.',
  },
  {
    id: 2,
    question: 'Which pair best describes the two essential RCD performance tests?',
    options: [
      'A visual inspection followed by a continuity test',
      'An insulation resistance test and a polarity check',
      'An operation test at rated tripping current (IΔn) and a trip-time test',
      'An earth fault loop impedance test and a functional switch test',
    ],
    correctAnswer: 2,
    explanation:
      'The two essential RCD tests are an operation test at the rated tripping current (IΔn) to confirm it trips, and a trip-time test to confirm it operates within the specified time limits.',
  },
  {
    id: 3,
    question:
      'A 30mA RCD is tested at ½ IΔn (15mA). What is the expected result at this test current?',
    options: [
      'The RCD should trip instantly to prove sensitivity',
      'The RCD should NOT trip at this current',
      'The RCD should trip within 40ms',
      'The RCD should trip within 300ms',
    ],
    correctAnswer: 1,
    explanation:
      'At ½ IΔn (15mA for a 30mA device) the RCD should NOT trip. This confirms the device will not nuisance-trip below its rated residual current.',
  },
  {
    id: 4,
    question: 'What is the maximum tripping time for a general-purpose 30mA RCD at 5 × IΔn (150mA)?',
    options: ['40ms', '150ms', '300ms', '500ms'],
    correctAnswer: 0,
    explanation:
      'For general-purpose RCDs the maximum tripping time at 5 × IΔn is 40ms. This rapid operation is essential for protection against electric shock.',
  },
  {
    id: 5,
    question: 'Why is the ½ IΔn test important?',
    options: [
      'To confirm the device trips as fast as possible',
      'To measure the earth fault loop impedance at the RCD',
      'To verify the RCD does NOT trip at currents below its rated residual current',
      'To check the insulation resistance of the downstream circuit',
    ],
    correctAnswer: 2,
    explanation:
      'The ½ IΔn test (e.g. 15mA for a 30mA RCD) confirms the device does not trip below its rated residual current, preventing nuisance tripping while maintaining protection.',
  },
  {
    id: 6,
    question: 'What should be done before conducting RCD tests?',
    options: [
      'Begin testing immediately with the load connected',
      'Confirm downstream circuits are isolated and sensitive equipment disconnected',
      'Test only when ambient temperature is above 10°C',
      'Apply the highest test current first to save time',
    ],
    correctAnswer: 1,
    explanation:
      'Before RCD testing, ensure downstream circuits are isolated and sensitive equipment disconnected to prevent damage and obtain accurate, repeatable results.',
  },
  {
    id: 7,
    question: 'How should RCD test results be recorded?',
    options: [
      'Only the readings for any device that fails',
      "A single 'RCD OK' note on the certificate",
      'No record is needed once the test button operates',
      'The actual measured tripping current and time for each test',
    ],
    correctAnswer: 3,
    explanation:
      'All RCD results must be recorded, including the measured tripping current and time for each test. This evidences compliance and helps detect deterioration over time.',
  },
  {
    id: 8,
    question: 'What action is required if an RCD fails to meet the test requirements?',
    options: [
      'Move on and test the remaining circuits first',
      'Replace or repair the RCD before the installation is energised',
      'Lower the test current until it passes, then record that value',
      'Note the failure on the certificate and energise anyway',
    ],
    correctAnswer: 1,
    explanation:
      'If an RCD fails (does not trip at IΔn, trips at ½ IΔn, or exceeds the time limits) it must be replaced or repaired before the installation can be safely energised.',
  },
  {
    id: 9,
    question: 'Why should each pole/phase of a multi-pole RCD be tested?',
    options: [
      'To reduce overall testing time on site',
      'To minimise wear on the test instrument',
      'Single-pole testing is sufficient and the others can be assumed correct',
      'To confirm every phase provides equal protection and the wiring is sound',
    ],
    correctAnswer: 3,
    explanation:
      'Testing each phase confirms all phases provide equal protection and verifies correct RCD wiring and connection integrity, rather than assuming the device is uniform.',
  },
  {
    id: 10,
    question:
      'During testing, an RCD trips at 5 × IΔn but takes 65ms to operate. What does this indicate?',
    options: [
      'Normal performance within the permitted limit',
      'A faulty test instrument rather than the device',
      'Deteriorated performance exceeding the 40ms limit, requiring replacement',
      'A wiring fault on the load side of the RCD',
    ],
    correctAnswer: 2,
    explanation:
      'A 65ms trip time at 5 × IΔn exceeds the 40ms maximum for a general-purpose RCD, indicating deteriorated performance and the need for replacement before energising.',
  },
];

const BS7671Module6Section3Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswers[currentQuestion] !== undefined) return; // lock after first pick
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizStarted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizData[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (!quizStarted) {
    return (
      <Card className="bg-gradient-to-r from-elec-yellow/10 to-elec-gray border-elec-yellow/30">
        <CardHeader>
          <CardTitle className="text-foreground">Knowledge Check Quiz</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            Test your understanding of RCD testing procedures and requirements with this
            comprehensive 10-question quiz.
          </p>
          <Button
            onClick={() => setQuizStarted(true)}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
          >
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const score = calculateScore();
    return (
      <Card className="bg-gradient-to-r from-elec-yellow/10 to-elec-gray border-elec-yellow/30">
        <CardHeader>
          <CardTitle className="text-foreground">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
              {score}/{quizData.length}
            </div>
            <p className="text-foreground mt-2">
              {score >= 8
                ? 'Excellent knowledge of RCD testing procedures!'
                : score >= 6
                  ? 'Good understanding!'
                  : 'Review the material and try again!'}
            </p>
          </div>

          <div className="space-y-3">
            {quizData.map((question, index) => (
              <div key={question.id} className="bg-elec-dark p-3 rounded-md border border-gray-600">
                <div className="flex items-start gap-2">
                  {selectedAnswers[index] === question.correctAnswer ? (
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">
                      {question.id}. {question.question}
                    </p>
                    <p className="text-xs text-foreground">{question.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={handleRestart}
            className="w-full bg-elec-yellow text-elec-dark hover:bg-yellow-600"
          >
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = quizData[currentQuestion];
  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  return (
    <Card className="bg-gradient-to-r from-elec-yellow/10 to-elec-gray border-elec-yellow/30">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-foreground">Knowledge Check Quiz</CardTitle>
          <Badge variant="secondary" className="bg-elec-yellow text-elec-dark">
            Question {currentQuestion + 1} of {quizData.length}
          </Badge>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <p className="text-foreground font-semibold mb-4">
            {question.id}. {question.question}
          </p>

          <div className="space-y-2">
            {question.options.map((option, index) => {
              const answered = selectedAnswers[currentQuestion] !== undefined;
              const isCorrect = answered && index === question.correctAnswer;
              const isSelected = answered && index === selectedAnswers[currentQuestion];

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={answered}
                  className={`w-full text-left p-3 rounded-md border transition-all duration-200 ${
                    answered
                      ? isCorrect
                        ? 'border-green-500/60 bg-green-500/10 text-foreground'
                        : isSelected
                          ? 'border-red-500/60 bg-red-500/10 text-foreground'
                          : 'border-gray-600 bg-elec-gray text-foreground opacity-60'
                      : selectedAnswers[currentQuestion] === index
                        ? 'border-elec-yellow bg-elec-yellow/10 text-foreground'
                        : 'border-gray-600 bg-elec-gray text-foreground hover:border-gray-500'
                  }`}
                >
                  <span className="font-semibold text-elec-yellow mr-2">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              );
            })}

            {selectedAnswers[currentQuestion] !== undefined && (
              <div className="mt-3 p-3 rounded-md border border-gray-600 bg-elec-gray">
                <div className="flex items-start gap-2">
                  {selectedAnswers[currentQuestion] === question.correctAnswer ? (
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {selectedAnswers[currentQuestion] === question.correctAnswer
                        ? 'Correct'
                        : 'Incorrect'}
                    </p>
                    <p className="text-xs text-foreground">{question.explanation}</p>
                    {selectedAnswers[currentQuestion] !== question.correctAnswer && (
                      <p className="text-xs text-foreground mt-1">
                        Correct answer:{' '}
                        <span className="text-elec-yellow font-medium">
                          {String.fromCharCode(65 + question.correctAnswer)}.{' '}
                          {question.options[question.correctAnswer]}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-600 text-foreground hover:bg-elec-gray disabled:opacity-50"
          >
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-600 disabled:opacity-50"
          >
            {currentQuestion === quizData.length - 1 ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BS7671Module6Section3Quiz;
