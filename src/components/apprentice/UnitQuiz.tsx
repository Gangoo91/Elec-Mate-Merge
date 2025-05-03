
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, HelpCircle } from "lucide-react";
import { QuizQuestion } from "@/data/unitQuizzes";

interface UnitQuizProps {
  unitCode: string;
  questions: QuizQuestion[];
  onQuizComplete: (score: number) => void;
}

const UnitQuiz = ({ unitCode, questions, onQuizComplete }: UnitQuizProps) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Select 10 random questions from the pool when component mounts
  useEffect(() => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setQuizQuestions(shuffled.slice(0, 10));
  }, [questions]);

  const handleAnswer = (selectedIndex: number) => {
    if (isAnswered) return;
    
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
      onQuizComplete(score);
    }
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
        <div className="flex justify-center mt-4">
          <Button 
            onClick={() => {
              setActiveQuestion(0);
              setSelectedAnswer(null);
              setIsAnswered(false);
              setScore(0);
              setQuizCompleted(false);
              
              // Shuffle questions again for a new attempt
              const shuffled = [...questions].sort(() => 0.5 - Math.random());
              setQuizQuestions(shuffled.slice(0, 10));
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

  return (
    <div className="bg-elec-gray p-6 rounded-lg border border-elec-yellow/20 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">Unit Quiz</h3>
        <span className="text-sm text-muted-foreground">
          Question {activeQuestion + 1} of {quizQuestions.length}
        </span>
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

      <div className="flex justify-end">
        <Button 
          onClick={handleNextQuestion}
          disabled={!isAnswered}
          className={`
            ${isAnswered ? 'bg-elec-yellow hover:bg-elec-yellow/80 text-elec-dark' : 'bg-muted text-muted-foreground'}
          `}
        >
          {activeQuestion < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
        </Button>
      </div>
    </div>
  );
};

export default UnitQuiz;
