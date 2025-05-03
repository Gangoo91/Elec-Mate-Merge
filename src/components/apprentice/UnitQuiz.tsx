
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, HelpCircle, AlertCircle } from "lucide-react";
import { QuizQuestion } from "@/data/unitQuizzes";

interface UnitQuizProps {
  unitCode: string;
  questions: QuizQuestion[];
  onQuizComplete: (score: number, totalQuestions: number) => void;
  questionCount?: number;
  timeLimit?: number;
  currentTime?: number;
  isSubmitted?: boolean;
}

const UnitQuiz = ({ 
  unitCode, 
  questions, 
  onQuizComplete,
  questionCount = 10,
  timeLimit,
  currentTime,
  isSubmitted = false
}: UnitQuizProps) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Select random questions from the pool when component mounts
  useEffect(() => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, questionCount);
    setQuizQuestions(selected);
    // Initialize userAnswers array with nulls
    setUserAnswers(new Array(selected.length).fill(null));
  }, [questions, questionCount]);

  // Handle auto-submission when time is up
  useEffect(() => {
    if (isSubmitted && !quizCompleted) {
      // Auto-calculate score from answered questions
      const finalScore = userAnswers.reduce((total, answer, index) => {
        if (answer === quizQuestions[index]?.correctAnswer) {
          return total + 1;
        }
        return total;
      }, 0);
      setScore(finalScore);
      setQuizCompleted(true);
      onQuizComplete(finalScore, quizQuestions.length);
    }
  }, [isSubmitted, quizCompleted, userAnswers, quizQuestions, onQuizComplete]);

  const handleAnswer = (selectedIndex: number) => {
    if (isAnswered) return;
    
    // Store the user's answer
    const updatedAnswers = [...userAnswers];
    updatedAnswers[activeQuestion] = selectedIndex;
    setUserAnswers(updatedAnswers);
    setSelectedAnswer(selectedIndex);
    setIsAnswered(true);

    // Check if answer is correct
    if (selectedIndex === quizQuestions[activeQuestion]?.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    
    if (activeQuestion < quizQuestions.length - 1) {
      setActiveQuestion(prev => prev + 1);
    } else {
      setQuizCompleted(true);
      onQuizComplete(score, quizQuestions.length);
    }
  };

  const handleNavigateToQuestion = (index: number) => {
    setActiveQuestion(index);
    setSelectedAnswer(userAnswers[index]);
    setIsAnswered(userAnswers[index] !== null);
  };

  const handleSubmitQuiz = () => {
    setQuizCompleted(true);
    onQuizComplete(score, quizQuestions.length);
  };

  if (quizQuestions.length === 0) {
    return <div>Loading quiz questions...</div>;
  }

  if (quizCompleted) {
    const percentage = (score / quizQuestions.length) * 100;
    return (
      <div className="bg-elec-gray p-6 rounded-lg border border-elec-yellow/20 space-y-4 animate-fade-in">
        <h3 className="text-xl font-bold text-center">Quiz Complete!</h3>
        <div className="flex flex-col items-center justify-center py-4">
          <div className="w-32 h-32 rounded-full border-4 border-elec-yellow flex items-center justify-center mb-4">
            <span className="text-3xl font-bold">{percentage}%</span>
          </div>
          <p className="text-center text-lg">
            You scored <span className="font-bold text-elec-yellow">{score}</span> out of <span className="font-bold">{quizQuestions.length}</span>
          </p>
          {percentage >= 70 ? (
            <div className="mt-4 flex items-center gap-2 text-green-500">
              <Check className="h-5 w-5" /> 
              <span>Well done! You've passed this unit quiz.</span>
            </div>
          ) : (
            <div className="mt-4 flex items-center gap-2 text-amber-500">
              <HelpCircle className="h-5 w-5" /> 
              <span>You might want to review this unit again.</span>
            </div>
          )}
        </div>

        <div className="mt-8 space-y-6">
          <h4 className="font-semibold text-lg">Review Your Answers</h4>
          
          <div className="space-y-6">
            {quizQuestions.map((question, index) => (
              <div key={question.id} className="p-4 border border-elec-yellow/20 rounded-lg">
                <div className="flex gap-2 mb-3">
                  <span className="font-medium">Question {index + 1}:</span>
                  {userAnswers[index] === question.correctAnswer ? (
                    <span className="text-green-500 flex items-center gap-1">
                      <Check className="h-4 w-4" /> Correct
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" /> Incorrect
                    </span>
                  )}
                </div>
                
                <p className="mb-2">{question.question}</p>
                
                <div className="ml-4 space-y-1">
                  {question.options.map((option, optIndex) => (
                    <div 
                      key={optIndex}
                      className={`
                        p-2 rounded flex items-center gap-2
                        ${optIndex === question.correctAnswer ? 'bg-green-500/10 text-green-500' : ''}
                        ${optIndex === userAnswers[index] && optIndex !== question.correctAnswer ? 'bg-red-500/10 text-red-500' : ''}
                      `}
                    >
                      {optIndex === question.correctAnswer ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (optIndex === userAnswers[index]) ? (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      ) : (
                        <span className="w-4" />
                      )}
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-6">
          <Button 
            onClick={() => {
              setActiveQuestion(0);
              setSelectedAnswer(null);
              setIsAnswered(false);
              setScore(0);
              setQuizCompleted(false);
              
              // Shuffle questions again for a new attempt
              const shuffled = [...questions].sort(() => 0.5 - Math.random());
              setQuizQuestions(shuffled.slice(0, questionCount));
              setUserAnswers(new Array(questionCount).fill(null));
            }}
            className="bg-elec-yellow hover:bg-elec-yellow/80 text-elec-dark"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = quizQuestions[activeQuestion];
  const answeredCount = userAnswers.filter(answer => answer !== null).length;

  return (
    <div className="bg-elec-gray p-6 rounded-lg border border-elec-yellow/20 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">Unit Quiz</h3>
        <span className="text-sm text-muted-foreground">
          Question {activeQuestion + 1} of {quizQuestions.length}
        </span>
      </div>
      
      {/* Question navigation */}
      <div className="flex flex-wrap gap-2 py-2">
        {quizQuestions.map((_, index) => (
          <div
            key={index}
            className={`
              cursor-pointer w-8 h-8 rounded-full flex items-center justify-center text-sm
              ${index === activeQuestion ? 'bg-elec-yellow text-elec-dark' : ''}
              ${userAnswers[index] !== null && index !== activeQuestion ? 'bg-elec-yellow/20 text-elec-yellow' : ''}
              ${userAnswers[index] === null && index !== activeQuestion ? 'border border-elec-yellow/30' : ''}
            `}
            onClick={() => handleNavigateToQuestion(index)}
          >
            {index + 1}
          </div>
        ))}
      </div>
      
      <div className="py-4">
        <h4 className="text-lg font-medium mb-4">{currentQuestion.question}</h4>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <div 
              key={index}
              className={`
                p-3 rounded-md border cursor-pointer transition-all
                ${selectedAnswer === index 
                  ? selectedAnswer === currentQuestion.correctAnswer
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-destructive bg-destructive/10'
                  : isAnswered && index === currentQuestion.correctAnswer
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-elec-yellow/30 hover:border-elec-yellow hover:bg-elec-yellow/5'
                }
              `}
              onClick={() => handleAnswer(index)}
            >
              <div className="flex items-center gap-3">
                <div className={`
                  flex items-center justify-center h-6 w-6 rounded-full shrink-0
                  ${selectedAnswer === index 
                    ? selectedAnswer === currentQuestion.correctAnswer
                      ? 'bg-green-500 text-white'
                      : 'bg-destructive text-destructive-foreground'
                    : isAnswered && index === currentQuestion.correctAnswer
                      ? 'bg-green-500 text-white'
                      : 'bg-elec-yellow/70 text-elec-dark'
                  }
                `}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span>{option}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm text-muted-foreground">
            {answeredCount} of {quizQuestions.length} questions answered
          </span>
        </div>
        <div className="flex gap-2">
          {activeQuestion < quizQuestions.length - 1 ? (
            <Button 
              onClick={handleNextQuestion}
              disabled={!isAnswered}
              className={`
                ${isAnswered ? 'bg-elec-yellow hover:bg-elec-yellow/80 text-elec-dark' : 'bg-muted text-muted-foreground'}
              `}
            >
              Next Question
            </Button>
          ) : (
            <Button 
              onClick={handleNextQuestion}
              disabled={!isAnswered}
              className={`
                ${isAnswered ? 'bg-elec-yellow hover:bg-elec-yellow/80 text-elec-dark' : 'bg-muted text-muted-foreground'}
              `}
            >
              See Results
            </Button>
          )}
          
          {answeredCount > 0 && answeredCount < quizQuestions.length && activeQuestion === quizQuestions.length - 1 && (
            <Button 
              onClick={handleSubmitQuiz}
              variant="outline"
              className="border-elec-yellow/30 hover:bg-elec-yellow/10"
            >
              Submit Quiz Early
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UnitQuiz;
