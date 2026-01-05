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
    question: "Why must visual inspection be carried out before testing?",
    options: [
      "To save time",
      "To ensure the installation is safe to test and identify defects that could make testing unsafe",
      "To impress the client",
      "To check the weather conditions"
    ],
    correctAnswer: 1,
    explanation: "Visual inspection ensures the installation is safe to test and identifies visible defects that could make testing unsafe or mask underlying issues before electrical testing begins."
  },
  {
    id: 2,
    question: "Name two defects that can be identified during inspection.",
    options: [
      "High electricity bills and slow internet",
      "Damaged cables and loose terminations",
      "Poor mobile signal and bad lighting",
      "Uncomfortable temperature and noise"
    ],
    correctAnswer: 1,
    explanation: "Visual inspection identifies defects such as damaged cables, loose terminations, inadequate mechanical protection, incorrect protective devices, and non-compliance with regulations."
  },
  {
    id: 3,
    question: "What must be confirmed about equipment IP ratings?",
    options: [
      "They look professional",
      "They are expensive enough",
      "They are suitable for the environment (e.g., bathrooms, outdoors)",
      "They are the latest models"
    ],
    correctAnswer: 2,
    explanation: "Equipment must have appropriate IP ratings for their environment - higher IP ratings are required for bathrooms, outdoor installations, and other locations with moisture or dust exposure."
  },
  {
    id: 4,
    question: "What sequence must be followed when testing under BS 7671?",
    options: [
      "Any order is acceptable",
      "Start with the most expensive test first",
      "Follow the prescribed sequence: continuity, insulation resistance, polarity, loop impedance, RCD, functional tests",
      "Test whatever is easiest to reach first"
    ],
    correctAnswer: 2,
    explanation: "BS 7671 requires testing in a specific sequence: continuity of protective conductors, insulation resistance, polarity, earth fault loop impedance, RCD performance, and functional tests."
  },
  {
    id: 5,
    question: "What should be done if test results do not meet BS 7671 requirements?",
    options: [
      "Ignore the results and continue",
      "Make a note and energise anyway",
      "Carry out corrective work before energising",
      "Reduce the test parameters"
    ],
    correctAnswer: 2,
    explanation: "If test results are unsatisfactory and fall outside BS 7671 limits, corrective work must be carried out before energising the installation to ensure safety and compliance."
  },
  {
    id: 6,
    question: "Why must test instruments be calibrated?",
    options: [
      "To look professional",
      "To ensure accuracy of recorded results and validity of testing",
      "To increase their value",
      "To satisfy equipment manufacturers"
    ],
    correctAnswer: 1,
    explanation: "Test instruments must be calibrated and traceable to ensure the accuracy of recorded results. The tester is responsible for both safety and accuracy of all recorded results."
  },
  {
    id: 7,
    question: "Name one item that must be labelled clearly during inspection.",
    options: [
      "The electrician's name",
      "Circuits and identification of isolation points",
      "The installation date only",
      "The client's preferences"
    ],
    correctAnswer: 1,
    explanation: "Circuits must be clearly labelled, along with identification of isolation points, protective devices, and emergency switching arrangements for safety and maintenance purposes."
  },
  {
    id: 8,
    question: "Who signs off the inspection and testing results?",
    options: [
      "The building owner",
      "Any qualified electrician",
      "The electrician who carried out the work is legally accountable",
      "The equipment supplier"
    ],
    correctAnswer: 2,
    explanation: "The electrician who signs the certificate is legally accountable for the accuracy of all inspection and test results, taking full responsibility for compliance and safety."
  },
  {
    id: 9,
    question: "Why should electricians not assume previous work was correct?",
    options: [
      "To create more work",
      "To verify everything and ensure compliance - never assume previous work was done correctly",
      "To show superiority",
      "To justify higher charges"
    ],
    correctAnswer: 1,
    explanation: "Electricians must verify everything during inspection and testing, never assuming previous work was done correctly, as they become legally responsible for the entire installation's safety."
  },
  {
    id: 10,
    question: "In the real-world example, what error was identified during inspection?",
    options: [
      "Wrong cable colours",
      "Several socket circuits were not labelled correctly on the distribution board",
      "Incorrect voltage ratings",
      "Missing protective devices"
    ],
    correctAnswer: 1,
    explanation: "In the retail unit example, several socket circuits were not labelled correctly on the distribution board, which would have caused confusion during testing and maintenance if not corrected."
  }
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
            Test your understanding of visual inspection and testing responsibilities with this comprehensive 10-question quiz.
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
              {score >= 8 ? 'Excellent knowledge of inspection procedures!' : score >= 6 ? 'Good understanding!' : 'Review the material and try again!'}
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
                    <p className="text-xs text-foreground">
                      {question.explanation}
                    </p>
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
                      {selectedAnswers[currentQuestion] === question.correctAnswer ? 'Correct' : 'Incorrect'}
                    </p>
                    <p className="text-xs text-foreground">{question.explanation}</p>
                    {selectedAnswers[currentQuestion] !== question.correctAnswer && (
                      <p className="text-xs text-foreground mt-1">
                        Correct answer: <span className="text-elec-yellow font-medium">
                          {String.fromCharCode(65 + question.correctAnswer)}. {question.options[question.correctAnswer]}
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