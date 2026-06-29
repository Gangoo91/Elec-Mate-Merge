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
    question: 'Why must visual inspection be carried out before testing?',
    options: [
      'To confirm the installation is safe to test and reveal defects that could make testing dangerous',
      'To produce a quicker certificate by skipping some electrical tests',
      'To establish the commercial value of the installation',
      'To record the ambient temperature at the time of work',
    ],
    correctAnswer: 0,
    explanation:
      'Visual inspection confirms the installation is safe to test and identifies visible defects that could make testing hazardous or mask underlying issues before any test is applied.',
  },
  {
    id: 2,
    question: 'Which of the following are defects that visual inspection would identify?',
    options: [
      'A slow broadband connection and weak mobile signal',
      'Damaged cables and loose terminations',
      'High running costs and poor room lighting',
      'Excessive heat and background noise in the room',
    ],
    correctAnswer: 1,
    explanation:
      'Visual inspection identifies defects such as damaged cables, loose terminations, inadequate mechanical protection, and incorrect protective devices.',
  },
  {
    id: 3,
    question: 'What must be confirmed about the IP rating of installed equipment?',
    options: [
      'That it carries a recognised manufacturer brand',
      'That it is the most recent model available',
      'That it is suitable for the environment, such as bathrooms or outdoors',
      'That it matches the cost expected by the client',
    ],
    correctAnswer: 2,
    explanation:
      'Equipment must have an IP rating suited to its environment; higher ratings are needed in bathrooms, outdoors and other locations exposed to moisture or dust.',
  },
  {
    id: 4,
    question: 'What sequence must be followed when testing under BS 7671?',
    options: [
      'Continuity, insulation resistance, polarity, earth fault loop impedance, RCD, then functional tests',
      'Whichever tests are quickest to set up are carried out first',
      'The most critical safety test is always carried out last',
      'Any order is acceptable provided all tests are completed',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 sets a defined sequence: continuity of protective conductors, insulation resistance, polarity, earth fault loop impedance, RCD operation and functional testing.',
  },
  {
    id: 5,
    question: 'What should be done if test results do not meet BS 7671 requirements?',
    options: [
      'Record the readings and energise the installation regardless',
      'Adjust the test parameters until the readings pass',
      'Carry out corrective work before the installation is energised',
      'Disregard the results if the installation appears to work',
    ],
    correctAnswer: 2,
    explanation:
      'Unsatisfactory results falling outside BS 7671 limits must be corrected before energising to ensure the installation is safe and compliant.',
  },
  {
    id: 6,
    question: 'Why must test instruments be calibrated?',
    options: [
      'To increase the resale value of the instrument',
      'To meet a manufacturer marketing requirement',
      'To present a professional image to the client',
      'To ensure recorded results are accurate and the testing is valid',
    ],
    correctAnswer: 3,
    explanation:
      'Calibrated, traceable instruments ensure recorded results are accurate. The tester remains responsible for both safety and the accuracy of every recorded result.',
  },
  {
    id: 7,
    question: 'Which item must be clearly labelled as part of the inspection?',
    options: [
      'The name of the electrician carrying out the work',
      'Circuits and the identification of isolation points',
      'Only the date the installation was completed',
      "The client's stated preferences for the work",
    ],
    correctAnswer: 1,
    explanation:
      'Circuits must be clearly identified, along with isolation points, protective devices and emergency switching arrangements, to support safe use and maintenance.',
  },
  {
    id: 8,
    question: 'Who is legally accountable for the inspection and testing results recorded?',
    options: [
      'The owner of the building',
      'The supplier of the installed equipment',
      'The electrician who carried out and signed off the work',
      'Any qualified electrician available at handover',
    ],
    correctAnswer: 2,
    explanation:
      'The electrician who signs the certificate is legally accountable for the accuracy of the inspection and test results and for the safety of the work.',
  },
  {
    id: 9,
    question: 'Why should an electrician not assume previous work was carried out correctly?',
    options: [
      'It allows additional chargeable work to be added',
      'Verifying everything ensures compliance, as they become responsible for the installation',
      'It demonstrates greater skill than the previous installer',
      'It provides a reason to increase the quoted price',
    ],
    correctAnswer: 1,
    explanation:
      'Everything must be verified rather than assumed, because once the work is signed off the electrician becomes responsible for the safety of the whole installation.',
  },
  {
    id: 10,
    question: 'In the retail unit example, what error was identified during inspection?',
    options: [
      'Cables were installed using out-of-date colour coding',
      'Equipment carried incorrect voltage ratings',
      'Several socket circuits were mislabelled on the distribution board',
      'Required protective devices were missing entirely',
    ],
    correctAnswer: 2,
    explanation:
      'Several socket circuits were incorrectly labelled on the distribution board, which would have caused confusion during testing and maintenance had it not been corrected.',
  },
];

const BS7671Module6Section2Quiz = () => {
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
          <CardTitle className="text-foreground">🧠 Knowledge Check Quiz</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            Test your understanding of visual inspection and testing responsibilities with this
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
                ? 'Excellent knowledge of inspection procedures!'
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

export default BS7671Module6Section2Quiz;
