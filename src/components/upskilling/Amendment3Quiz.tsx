import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import QuizQuestion from '@/components/upskilling/quiz/QuizQuestion';
import QuizNavigation from '@/components/upskilling/quiz/QuizNavigation';
import { useToast } from '@/hooks/use-toast';

const quizQuestions = [
  {
    id: 1,
    question: "When did Amendment 3 to BS 7671 become mandatory for new electrical installations?",
    options: [
      "1st January 2024",
      "31st July 2024",
      "1st September 2024",
      "31st December 2024"
    ],
    correctAnswer: 1,
    explanation: "Amendment 3 to BS 7671 became mandatory on 31st July 2024. All new installations from this date must comply with the Amendment 3 requirements."
  },
  {
    id: 2,
    question: "Which scenario REQUIRES bidirectional protection devices according to Amendment 3?",
    options: [
      "Standard domestic lighting circuits",
      "Solar PV system with battery storage",
      "Electric shower installation",
      "Garage socket outlets"
    ],
    correctAnswer: 1,
    explanation: "Solar PV systems with battery storage require bidirectional protection because energy can flow in both directions - from the grid to charge batteries and from batteries back to the grid during discharge."
  },
  {
    id: 3,
    question: "What is the maximum time allowed for anti-islanding protection to disconnect a system after grid loss detection?",
    options: [
      "1 second",
      "3 seconds", 
      "5 seconds",
      "10 seconds"
    ],
    correctAnswer: 2,
    explanation: "Anti-islanding protection must disconnect the system within 5 seconds of detecting grid loss to prevent dangerous islanding conditions where the local generation continues to energise the local grid."
  },
  {
    id: 4,
    question: "Which consumer unit component must remain effective under reverse current conditions according to Amendment 3?",
    options: [
      "Main switch only",
      "MCBs only",
      "RCD protection",
      "Meter tails"
    ],
    correctAnswer: 2,
    explanation: "RCD protection must remain effective under reverse current conditions. Standard RCDs may not operate correctly when current flows in the reverse direction, requiring bidirectional RCD protection in renewable energy installations."
  },
  {
    id: 5,
    question: "What must be included when testing bidirectional protection devices during commissioning?",
    options: [
      "Testing in the forward direction only",
      "Visual inspection only",
      "Testing operation in both current directions",
      "Insulation resistance testing only"
    ],
    correctAnswer: 2,
    explanation: "Bidirectional protection devices must be tested for operation in both current directions to ensure they provide adequate protection whether current flows from the grid to the installation or from the installation back to the grid."
  }
];

export const Amendment3Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | undefined)[]>(new Array(quizQuestions.length).fill(undefined));
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
      
      const score = selectedAnswers.reduce((acc, answer, index) => {
        return acc + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
      }, 0);
      
      const percentage = Math.round((score / quizQuestions.length) * 100);
      
      toast({
        title: "Quiz Completed!",
        description: `You scored ${score}/${quizQuestions.length} (${percentage}%)`,
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(quizQuestions.length).fill(undefined));
    setShowResults(false);
    setQuizCompleted(false);
  };

  const score = selectedAnswers.reduce((acc, answer, index) => {
    return acc + (answer === quizQuestions[index].correctAnswer ? 1 : 0);
  }, 0);

  const percentage = Math.round((score / quizQuestions.length) * 100);

  if (showResults) {
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <HelpCircle className="h-5 w-5 text-elec-yellow" />
            Quiz Results - Amendment 3 Knowledge
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-foreground">{percentage}%</div>
            <div className="text-xl text-gray-300">
              You scored {score} out of {quizQuestions.length} questions correctly
            </div>
            
            <div className={`text-lg font-semibold ${
              percentage >= 80 ? 'text-green-400' : 
              percentage >= 60 ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {percentage >= 80 ? 'Excellent understanding!' : 
               percentage >= 60 ? 'Good knowledge, review key areas' : 'Requires further study'}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-foreground font-semibold text-lg">Review Your Answers:</h3>
            {quizQuestions.map((question, index) => (
              <div key={index} className="border border-gray-600/30 rounded-lg p-4">
                <div className="flex items-start gap-3 mb-2">
                  {selectedAnswers[index] === question.correctAnswer ? (
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-foreground font-medium mb-2">{question.question}</p>
                    <p className="text-gray-300 text-sm mb-2">
                      <strong>Your answer:</strong> {question.options[selectedAnswers[index] || 0]}
                    </p>
                    <p className="text-gray-300 text-sm mb-2">
                      <strong>Correct answer:</strong> {question.options[question.correctAnswer]}
                    </p>
                    <p className="text-gray-400 text-sm">{question.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={resetQuiz}
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

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <HelpCircle className="h-5 w-5 text-elec-yellow" />
          Knowledge Check - Amendment 3 Requirements
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <QuizProgress 
          currentQuestion={currentQuestion} 
          totalQuestions={quizQuestions.length} 
        />
        
        <QuizQuestion
          question={quizQuestions[currentQuestion]}
          selectedAnswer={selectedAnswers[currentQuestion]}
          onAnswerSelect={handleAnswerSelect}
        />
        
        <QuizNavigation
          currentQuestion={currentQuestion}
          totalQuestions={quizQuestions.length}
          selectedAnswer={selectedAnswers[currentQuestion]}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isLastQuestion={currentQuestion === quizQuestions.length - 1}
        />
      </CardContent>
    </Card>
  );
};