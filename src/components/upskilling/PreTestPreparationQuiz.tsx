
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RotateCcw, ClipboardList } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const PreTestPreparationQuiz = () => {
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "Why is checking test lead condition important before testing?",
      options: [
        "It's required by health and safety regulations",
        "Damaged leads can give false readings or cause shock",
        "It helps calibrate the test instrument",
        "It's only necessary for high voltage testing"
      ],
      correctAnswer: 1,
      explanation: "Damaged leads can give false readings or cause shock - this is the primary safety and accuracy concern when using test equipment."
    },
    {
      id: 2,
      question: "What document should you review before starting periodic testing?",
      options: [
        "The manufacturer's installation manual only",
        "Building regulations approval",
        "Previous test records or EICRs",
        "The client's insurance policy"
      ],
      correctAnswer: 2,
      explanation: "Previous test records or EICRs provide essential information about the installation's history, previous faults, and testing requirements."
    },
    {
      id: 3,
      question: "True or False: You should prove your voltage tester both before and after use.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 0,
      explanation: "True - Proving your voltage tester before and after use ensures it's working correctly throughout the testing process, which is essential for safety."
    },
    {
      id: 4,
      question: "What's one reason to post 'Do Not Switch On' signs?",
      options: [
        "To comply with insurance requirements",
        "To prevent others from re-energising whilst you're testing",
        "To show you're a professional electrician",
        "To avoid paying for electricity used during testing"
      ],
      correctAnswer: 1,
      explanation: "To prevent others from re-energising whilst you're testing - this prevents dangerous situations where circuits could be switched on while you're working."
    },
    {
      id: 5,
      question: "Which of the following is NOT part of pre-test prep?",
      options: [
        "Checking calibration certificates are in date",
        "Reviewing circuit diagrams or schedules",
        "Guessing circuit layout instead of reviewing documents",
        "Verifying work area safety conditions"
      ],
      correctAnswer: 2,
      explanation: "Guessing circuit layout instead of reviewing documents is NOT part of proper pre-test preparation - you should always review available documentation."
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
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
    setSelectedAnswers(new Array(questions.length).fill(null));
    setShowResults(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScorePercentage = () => {
    return Math.round((calculateScore() / questions.length) * 100);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = getScorePercentage();
    
    return (
      <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-green-400" />
            Pre-Test Preparation Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              {score}/{questions.length}
            </div>
            <div className="text-xl text-foreground">
              {percentage}% Complete
            </div>
            <div className={`text-lg font-semibold ${
              percentage >= 80 ? 'text-green-400' : 
              percentage >= 60 ? 'text-yellow-400' : 
              'text-red-400'
            }`}>
              {percentage >= 80 ? "Excellent work!" : 
               percentage >= 60 ? "Good effort!" : 
               "Consider reviewing the material again."}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-green-400">Review Your Answers:</h4>
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-4 rounded-lg border border-gray-700/30">
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-400" />
                    )}
                    <span className="font-semibold text-foreground">Question {index + 1}</span>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{question.question}</p>
                  <p className="text-xs text-gray-400 mb-2">
                    Your answer: {userAnswer !== null ? question.options[userAnswer] : "Not answered"}
                  </p>
                  {!isCorrect && (
                    <p className="text-xs text-green-400 mb-2">
                      Correct answer: {question.options[question.correctAnswer]}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 bg-gray-800/30 p-2 rounded">{question.explanation}</p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={handleRestart}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-foreground hover:from-green-700 hover:to-blue-700"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQuestion];

  return (
    <Card className="bg-gradient-to-br from-green-900/20 to-teal-900/20 border-green-500/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-green-400" />
            <span>Pre-Test Preparation Knowledge Check</span>
          </div>
          <span className="text-sm text-gray-400">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-4 rounded-lg border border-gray-700/30">
          <h4 className="font-semibold text-green-400 mb-3">
            Question {currentQuestion + 1}
          </h4>
          <p className="text-sm mb-4">{question.question}</p>
          
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-3 rounded border transition-all duration-200 text-sm ${
                  selectedAnswer === index
                    ? 'border-green-400 bg-gradient-to-r from-green-600/30 to-teal-600/30 text-foreground shadow-lg'
                    : 'border-gray-600 hover:border-gray-500 text-gray-300 hover:bg-gradient-to-r hover:from-gray-700/30 hover:to-gray-800/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded text-xs flex items-center justify-center font-semibold ${
                    selectedAnswer === index 
                      ? 'bg-gradient-to-r from-green-500 to-teal-500 text-foreground shadow-md' 
                      : 'bg-gray-600 text-foreground'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
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
            className="border-gray-600 text-gray-300 hover:bg-gradient-to-r hover:from-gray-700/30 hover:to-gray-800/30 hover:text-foreground"
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="bg-gradient-to-r from-green-600 to-teal-600 text-foreground hover:from-green-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>

        {selectedAnswer === null && (
          <p className="text-center text-sm text-gray-500">
            Please select an answer to continue
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default PreTestPreparationQuiz;
