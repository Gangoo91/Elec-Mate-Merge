
import { useState, useEffect } from "react";
import { QuizQuestion } from "@/data/unitQuizzes";
import { QuizProps } from "@/types/quiz";
import QuizNavigation from "./quiz/QuizNavigation";
import QuestionComponent from "./quiz/QuizQuestion";
import QuizControls from "./quiz/QuizControls";
import QuizResults from "./quiz/QuizResults";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const UnitQuiz = ({ 
  unitCode, 
  questions, 
  onQuizComplete,
  questionCount = 10,
  timeLimit,
  currentTime,
  isSubmitted = false
}: QuizProps) => {
  const { toast } = useToast();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState<number>(Date.now());

  // Select random questions from the pool when component mounts
  useEffect(() => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, questionCount);
    setQuizQuestions(selected);
    // Initialize userAnswers array with nulls
    setUserAnswers(new Array(selected.length).fill(null));
    // Record start time
    setQuizStartTime(Date.now());
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
      handleQuizCompletion(finalScore, quizQuestions.length);
    }
  }, [isSubmitted, quizCompleted, userAnswers, quizQuestions]);

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
      handleQuizCompletion(score, quizQuestions.length);
    }
  };

  const handleNavigateToQuestion = (index: number) => {
    setActiveQuestion(index);
    setSelectedAnswer(userAnswers[index]);
    setIsAnswered(userAnswers[index] !== null);
  };

  const handleSubmitQuiz = () => {
    setQuizCompleted(true);
    handleQuizCompletion(score, quizQuestions.length);
  };

  const handleQuizCompletion = async (finalScore: number, totalQuestions: number) => {
    // Calculate time taken
    const timeTaken = Math.floor((Date.now() - quizStartTime) / 1000); // in seconds
    const percentage = Math.round((finalScore / totalQuestions) * 100);
    
    try {
      // First attempt to save to Supabase if user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // If user is authenticated, save to Supabase
        const { error } = await supabase
          .from('quiz_attempts')
          .insert({
            user_id: user.id,
            unit_code: unitCode,
            score: finalScore,
            total_questions: totalQuestions,
            percentage: percentage,
            time_taken: timeTaken
          });
          
        if (error) {
          console.error('Error saving quiz attempt to Supabase:', error);
          saveQuizLocalStorage(unitCode, finalScore, totalQuestions, percentage, timeTaken);
        } else {
          toast({
            title: "Quiz result saved",
            description: "Your result has been saved to your profile.",
          });
        }
      } else {
        // If not authenticated, save to localStorage
        saveQuizLocalStorage(unitCode, finalScore, totalQuestions, percentage, timeTaken);
      }
      
      // Call the parent callback
      onQuizComplete(finalScore, totalQuestions);
      
    } catch (error) {
      console.error('Error handling quiz completion:', error);
      // Fallback to localStorage
      saveQuizLocalStorage(unitCode, finalScore, totalQuestions, percentage, timeTaken);
      onQuizComplete(finalScore, totalQuestions);
    }
  };
  
  // Fallback method to save quiz attempts to localStorage
  const saveQuizLocalStorage = (
    unitCode: string, 
    score: number, 
    totalQuestions: number, 
    percentage: number, 
    timeTaken: number
  ) => {
    const storageKey = `unit_${unitCode}_quiz_attempts`;
    
    try {
      // Get existing attempts
      const existingAttemptsJson = localStorage.getItem(storageKey);
      const existingAttempts = existingAttemptsJson ? JSON.parse(existingAttemptsJson) : [];
      
      // Add new attempt
      existingAttempts.push({
        date: new Date().toISOString(),
        score,
        totalQuestions,
        percentage,
        timeTaken
      });
      
      // Save back to localStorage
      localStorage.setItem(storageKey, JSON.stringify(existingAttempts));
      
      toast({
        title: "Quiz result saved locally",
        description: "Your result has been saved on this device.",
      });
    } catch (e) {
      console.error("Error saving quiz attempt to localStorage:", e);
      toast({
        title: "Could not save quiz result",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  const handleRetryQuiz = () => {
    setActiveQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setQuizCompleted(false);
    setQuizStartTime(Date.now());
    
    // Shuffle questions again for a new attempt
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setQuizQuestions(shuffled.slice(0, questionCount));
    setUserAnswers(new Array(questionCount).fill(null));
  };

  if (quizQuestions.length === 0) {
    return <div>Loading quiz questions...</div>;
  }

  if (quizCompleted) {
    return (
      <QuizResults 
        score={score} 
        totalQuestions={quizQuestions.length} 
        questions={quizQuestions} 
        userAnswers={userAnswers} 
        onRetry={handleRetryQuiz} 
      />
    );
  }

  const currentQuestion = quizQuestions[activeQuestion];
  const answeredCount = userAnswers.filter(answer => answer !== null).length;
  const isLastQuestion = activeQuestion === quizQuestions.length - 1;

  return (
    <div className="bg-elec-gray p-6 rounded-lg border border-elec-yellow/20 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">Unit Quiz</h3>
      </div>
      
      {/* Simplified question navigation */}
      <QuizNavigation 
        questionsCount={quizQuestions.length} 
        activeQuestion={activeQuestion} 
        userAnswers={userAnswers} 
        onNavigate={handleNavigateToQuestion} 
      />
      
      {/* Current question */}
      <QuestionComponent
        question={currentQuestion} 
        selectedAnswer={selectedAnswer} 
        isAnswered={isAnswered} 
        onAnswer={handleAnswer} 
      />

      {/* Quiz controls */}
      <QuizControls 
        isAnswered={isAnswered}
        isLastQuestion={isLastQuestion}
        answeredCount={answeredCount}
        totalQuestions={quizQuestions.length}
        onNext={handleNextQuestion}
        onSubmit={handleSubmitQuiz}
      />
    </div>
  );
};

export default UnitQuiz;
