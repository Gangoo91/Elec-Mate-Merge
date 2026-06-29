import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Why is it good practice to compress large evidence files before uploading to the OZEV portal?',
    options: [
      'Compressed files always upload at a higher quality',
      'The portal rejects any file in PDF format',
      'Smaller files upload reliably and avoid hitting size limits',
      'Compression is required to encrypt the documents',
    ],
    correctAnswer: 2,
    explanation:
      'Keeping individual uploads within the portal’s size limit (commonly around 10MB) means files transfer reliably and are not rejected.',
  },
  {
    id: 2,
    question: 'Which document format is NOT typically accepted by the OZEV portal?',
    options: ['PDF', 'JPEG', 'PNG', 'DOC'],
    correctAnswer: 3,
    explanation:
      'OZEV portal typically accepts PDF, JPEG, and PNG formats. DOC files should be converted to PDF before upload.',
  },
  {
    id: 3,
    question: 'What is the key requirement for photographic evidence of an installation?',
    options: [
      'It can be any resolution provided the file is small',
      'It must be a low resolution to keep uploads fast',
      'It should be high resolution so detail is clearly legible',
      'It must be supplied as a printed photograph only',
    ],
    correctAnswer: 2,
    explanation:
      'Photographic evidence must be sharp and high enough resolution (a modern smartphone camera is ample) so serial numbers and installation detail can be assessed.',
  },
  {
    id: 4,
    question:
      'How are grant claims handled when an installer has several jobs ready to submit on the OZEV portal?',
    options: [
      'Only one claim may be open at any time per installer',
      'Multiple claims can be submitted, supporting high-volume installers',
      'Claims must be batched and submitted once per calendar month',
      'A separate installer login is required for each claim',
    ],
    correctAnswer: 1,
    explanation:
      'The OZEV portal lets installers progress multiple grant claims, which is essential for businesses completing many installations.',
  },
  {
    id: 5,
    question: 'What should you do if a document upload fails repeatedly?',
    options: [
      'Check the file size and format, then retry during off-peak hours',
      'Keep retrying the identical file until it eventually uploads',
      'Telephone the customer to report the portal is broken',
      'Abandon the application and start a fresh claim',
    ],
    correctAnswer: 0,
    explanation:
      'If uploads fail, check file size (under 10MB), ensure correct format (PDF/JPEG/PNG), and try during off-peak hours when server load is lower.',
  },
  {
    id: 6,
    question: 'Which approach provides the strongest photographic evidence of a charger installation?',
    options: [
      'Multiple angles showing both context and close-up detail',
      'A single front-on photograph of the unit',
      'One wide shot taken from across the room',
      'A top-down photograph of the charger only',
    ],
    correctAnswer: 0,
    explanation:
      'A set of images covering the wider context and close-up detail gives the assessor a complete picture of the installation.',
  },
  {
    id: 7,
    question: 'What is the likely consequence of submitting incomplete documentation?',
    options: [
      'The grant is automatically approved at a reduced rate',
      'The portal silently completes the missing fields for you',
      'The application is delayed or rejected pending resubmission',
      'There is no impact, as documents are reviewed later',
    ],
    correctAnswer: 2,
    explanation:
      'Incomplete documentation leads to application delays or outright rejection, requiring resubmission and potentially delaying grant payments.',
  },
  {
    id: 8,
    question: 'Why should installers keep their own copies of all submitted grant documents?',
    options: [
      'To resell the data to third parties',
      'Because the portal deletes everything after 24 hours',
      'It is optional and serves no real purpose',
      'To support possible OZEV audits and compliance checks',
    ],
    correctAnswer: 3,
    explanation:
      'Retaining copies of submitted documentation lets installers respond to any later OZEV audit or compliance query.',
  },
];

export const EVChargingModule7Section3Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(
    new Array(quizQuestions.length).fill(-1)
  );
  const [showResults, setShowResults] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    new Array(quizQuestions.length).fill(false)
  );

  const handleAnswerSelect = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);

    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
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
    setSelectedAnswers(new Array(quizQuestions.length).fill(-1));
    setShowResults(false);
    setAnsweredQuestions(new Array(quizQuestions.length).fill(false));
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quizQuestions.length) * 100);

    return (
      <Card className="bg-elec-gray border-elec-yellow/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground text-center">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(score, quizQuestions.length)}`}>
              {score}/{quizQuestions.length}
            </div>
            <div className="text-gray-300 text-lg">{percentage}% Correct</div>
            <div className="mt-2 text-gray-400">
              {percentage >= 80
                ? 'Excellent work!'
                : percentage >= 60
                  ? 'Good job! Review the areas you missed.'
                  : 'Keep studying! Review the content and try again.'}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-foreground font-semibold">Review Your Answers:</h3>
            {quizQuestions.map((question, index) => {
              const isCorrect = selectedAnswers[index] === question.correctAnswer;
              return (
                <div
                  key={question.id}
                  className="bg-elec-dark/50 p-4 rounded-lg border border-gray-600"
                >
                  <div className="flex items-start gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-foreground font-medium mb-2">
                        Q{index + 1}: {question.question}
                      </p>
                      <p className="text-gray-300 text-sm mb-1">
                        Your answer:{' '}
                        {selectedAnswers[index] >= 0
                          ? question.options[selectedAnswers[index]]
                          : 'Not answered'}
                      </p>
                      {!isCorrect && (
                        <p className="text-green-400 text-sm mb-2">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                      <p className="text-gray-400 text-sm">{question.explanation}</p>
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
              <RefreshCw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentQ = quizQuestions[currentQuestion];
  const isAnswered = answeredQuestions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];

  return (
    <Card className="bg-elec-gray border-elec-yellow/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground">
          Knowledge Check - Question {currentQuestion + 1} of {quizQuestions.length}
        </CardTitle>
        <div className="w-full bg-elec-dark rounded-full h-2">
          <div
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
          ></div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-foreground text-lg font-medium mb-4">{currentQ.question}</h3>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => {
              let buttonClass =
                'w-full text-left p-4 rounded-lg border transition-all duration-200 ';

              if (isAnswered) {
                if (index === currentQ.correctAnswer) {
                  buttonClass += 'border-green-500 bg-green-500/20 text-green-300';
                } else if (index === selectedAnswer && index !== currentQ.correctAnswer) {
                  buttonClass += 'border-red-500 bg-red-500/20 text-red-300';
                } else {
                  buttonClass += 'border-gray-600 bg-elec-dark/50 text-gray-400';
                }
              } else {
                if (selectedAnswer === index) {
                  buttonClass += 'border-elec-yellow bg-elec-yellow/20 text-foreground';
                } else {
                  buttonClass +=
                    'border-gray-600 bg-elec-dark/50 text-gray-300 hover:border-elec-yellow/50 hover:bg-elec-yellow/10';
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => !isAnswered && handleAnswerSelect(index)}
                  className={buttonClass}
                  disabled={isAnswered}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-sm font-medium">
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {isAnswered && (
          <div className="bg-blue-900/30 border border-blue-500/30 p-4 rounded-lg">
            <p className="text-blue-300 font-medium mb-2">Explanation:</p>
            <p className="text-gray-300">{currentQ.explanation}</p>
          </div>
        )}

        <div className="flex justify-between items-center pt-4">
          <Button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-elec-gray disabled:opacity-50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <div className="text-gray-400 text-sm">
            Question {currentQuestion + 1} of {quizQuestions.length}
          </div>

          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === -1}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-600 disabled:opacity-50"
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
