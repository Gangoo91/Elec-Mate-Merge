
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const PPEQuiz = () => {
  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "Which of the following is a standard PPE item for electrical testing?",
      options: [
        "Rubber sandals",
        "Flame-resistant clothing",
        "Earplugs for dust",
        "Reflective vest"
      ],
      correctAnswer: 1,
      explanation: "Flame-resistant clothing is essential PPE for electrical work to protect against arc flash burns."
    },
    {
      id: 2,
      question: "True or False: PPE replaces the need for safe isolation.",
      options: [
        "True",
        "False"
      ],
      correctAnswer: 1,
      explanation: "PPE is the last line of defence and does not replace safe isolation procedures. It protects you if other controls fail."
    },
    {
      id: 3,
      question: "What does PPE protect against in electrical testing?",
      options: [
        "Financial loss",
        "Electrical hazards if procedures fail",
        "Noise complaints",
        "Poor documentation"
      ],
      correctAnswer: 1,
      explanation: "PPE is designed to protect against electrical hazards when other safety procedures fail or are inadequate."
    },
    {
      id: 4,
      question: "Who is responsible for ensuring PPE is worn correctly?",
      options: [
        "The site manager",
        "The insurance company",
        "The electrician using it",
        "The manufacturer"
      ],
      correctAnswer: 2,
      explanation: "The individual electrician is ultimately responsible for wearing PPE correctly and ensuring it's in good condition."
    },
    {
      id: 5,
      question: "What regulation covers PPE requirements in the workplace?",
      options: [
        "BS7671",
        "Electricity at Work Regulations",
        "PPE Regulations 1992",
        "COSHH"
      ],
      correctAnswer: 2,
      explanation: "PPE Regulations 1992, along with the Health and Safety at Work Act, covers PPE requirements in the workplace."
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
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-elec-yellow" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          <div className="text-center space-y-4">
            <div className="text-3xl font-bold text-elec-yellow">
              {score}/{questions.length}
            </div>
            <div className="text-xl text-foreground">
              {percentage}% Complete
            </div>
            <div className="text-gray-400">
              {percentage >= 80 ? "Excellent work!" : percentage >= 60 ? "Good effort!" : "Consider reviewing the material again."}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-elec-yellow">Review Your Answers:</h4>
            {questions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={question.id} className="bg-[#323232] p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
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
                  <p className="text-xs text-gray-400">{question.explanation}</p>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={handleRestart}
              className="bg-elec-yellow text-black hover:bg-yellow-400"
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
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center justify-between">
          <span>PPE Knowledge Check</span>
          <span className="text-sm text-gray-400">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <div className="bg-[#323232] p-4 rounded-lg">
          <h4 className="font-semibold text-elec-yellow mb-3">
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
                    ? 'border-elec-yellow bg-yellow-600/20 text-foreground'
                    : 'border-gray-600 hover:border-gray-500 text-gray-300 hover:bg-[#404040]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded text-xs flex items-center justify-center ${
                    selectedAnswer === index 
                      ? 'bg-elec-yellow text-black' 
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
            className="border-gray-600 text-gray-300 hover:bg-[#404040] hover:text-foreground"
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="bg-elec-yellow text-black hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
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

export default PPEQuiz;
