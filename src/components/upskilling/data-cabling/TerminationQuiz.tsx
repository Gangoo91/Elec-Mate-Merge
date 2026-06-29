import { useState } from 'react';
import { Lightbulb, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
    question:
      'What is the nominal characteristic impedance that a Cat 6A twisted-pair channel is designed to maintain through a termination?',
    options: ['50 ohms', '75 ohms', '100 ohms', '120 ohms'],
    correctAnswer: 2,
    explanation:
      'Balanced twisted-pair structured cabling (Cat 5e through Cat 8) is specified at a nominal 100 ohm impedance. Keeping the termination close to 100 ohms minimises reflections and return loss. 50 and 75 ohms are coaxial values.',
  },
  {
    id: 2,
    question:
      'Why is an insulation-displacement (IDC) punch-down regarded as a reliable termination method for twisted-pair data cable?',
    options: [
      'It forms a gas-tight connection that resists corrosion and movement',
      'It removes the need to maintain pair twists at the termination',
      'It allows the cable to be soldered for extra strength',
      'It lets any conductor size be terminated without a tool',
    ],
    correctAnswer: 0,
    explanation:
      'The IDC blade slices through the insulation and grips the copper under constant spring pressure, forming a gas-tight contact that resists corrosion and vibration without needing solder or stripping each conductor.',
  },
  {
    id: 3,
    question:
      'What is the recommended maximum amount of pair untwist when terminating Cat 6A cable, to control crosstalk?',
    options: ['25mm (1 inch)', '19mm (0.75 inches)', '38mm (1.5 inches)', '13mm (0.5 inches)'],
    correctAnswer: 3,
    explanation:
      'Best practice keeps untwisting to no more than 13mm (0.5 inches). The tighter the twists are kept up to the contact, the lower the near-end crosstalk and the better the impedance match.',
  },
  {
    id: 4,
    question:
      'On a standard T568B-terminated RJ45, which colour pair occupies pins 1 and 2?',
    options: [
      'The brown pair',
      'The orange pair',
      'The blue pair',
      'The green pair',
    ],
    correctAnswer: 1,
    explanation:
      'Under T568B, pin 1 is white/orange and pin 2 is orange, so the orange pair sits on pins 1 and 2. The green pair is split across pins 3 and 6, blue is on 4 and 5, and brown is on 7 and 8.',
  },
  {
    id: 5,
    question:
      'After terminating a permanent link, which field test result confirms the wiring map and pair assignments are correct end-to-end?',
    options: [
      'A wiremap test showing each pin connected pin-to-pin with no split pairs',
      'An insertion-loss reading at the highest frequency only',
      'A return-loss sweep across the full frequency band',
      'A propagation-delay measurement on the longest pair',
    ],
    correctAnswer: 0,
    explanation:
      'The wiremap test verifies continuity, correct pin-to-pin pairing and the absence of opens, shorts, reversals, transpositions and split pairs. Insertion loss, return loss and delay measure performance but do not by themselves confirm the map.',
  },
];

export const TerminationQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizComplete(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const currentQ = quizQuestions[currentQuestion];
  const score = calculateScore();
  const percentage = Math.round((score / quizQuestions.length) * 100);

  if (showResults) {
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-elec-yellow mb-2">
              {score} / {quizQuestions.length}
            </div>
            <div className="text-xl text-foreground mb-4">{percentage}% Complete</div>
            <div
              className={`text-lg ${percentage >= 80 ? 'text-green-400' : percentage >= 60 ? 'text-yellow-400' : 'text-red-400'}`}
            >
              {percentage >= 80
                ? 'Excellent work!'
                : percentage >= 60
                  ? 'Good effort!'
                  : 'Keep studying and try again!'}
            </div>
          </div>

          <div className="space-y-4">
            {quizQuestions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div key={question.id} className="bg-[#323232] rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h4 className="text-foreground font-medium mb-2">
                        Question {index + 1}: {question.question}
                      </h4>
                      <p
                        className={`text-sm mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}
                      >
                        Your answer: {question.options[userAnswer]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-400 mb-2">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                      <p className="text-sm text-gray-400">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button onClick={resetQuiz} className="bg-elec-yellow text-black hover:bg-yellow-500">
              Take Quiz Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          Quick Quiz
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>
            Question {currentQuestion + 1} of {quizQuestions.length}
          </span>
          <span>{Math.round(((currentQuestion + 1) / quizQuestions.length) * 100)}% Complete</span>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground">{currentQ.question}</h3>

          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-elec-yellow bg-yellow-600/10 text-elec-yellow'
                    : 'border-gray-600 bg-[#323232] text-gray-300 hover:border-gray-500'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="bg-elec-yellow text-black hover:bg-yellow-500"
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
