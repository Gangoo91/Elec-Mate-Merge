
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import UnitQuiz from "@/components/apprentice/UnitQuiz";
import { healthAndSafetyQuizzes } from "@/data/unitQuizzes";
import StartQuizPanel from "@/components/apprentice/quiz/StartQuizPanel";
import QuizTimerDisplay from "@/components/apprentice/quiz/QuizTimerDisplay";
import { useQuizTimer } from "@/hooks/quiz/useQuizTimer";
import { useQuizCompletion } from "@/hooks/quiz/useQuizCompletion";

const QUIZ_TIME_IN_SECONDS = 45 * 60; // 45 minutes
const QUESTION_COUNT = 30;

const QuizContent = () => {
  const { courseSlug, unitSlug } = useParams();
  const navigate = useNavigate();
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  
  // Extract unit code from the unitSlug
  const unitCode = unitSlug?.includes('-') ? 
    unitSlug.split('-').slice(0, 2).join('/').toUpperCase() : '';
  
  // Use our custom hooks
  const { handleQuizComplete, checkQuizCompletion } = useQuizCompletion({
    courseSlug,
    unitCode
  });
  
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Check if quiz is completed
  useEffect(() => {
    if (unitCode) {
      setIsCompleted(checkQuizCompletion());
    }
  }, [unitCode, checkQuizCompletion]);
  
  const { timeRemaining, resetTimer } = useQuizTimer({
    totalTimeInSeconds: QUIZ_TIME_IN_SECONDS,
    isActive: quizStarted,
    isPaused: quizSubmitted,
    onTimeUp: () => setQuizSubmitted(true)
  });

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setQuizSubmitted(false);
    resetTimer();
  };

  const handleQuizComplete = async (score: number, totalQuestions: number) => {
    // Calculate time taken
    const timeTaken = QUIZ_TIME_IN_SECONDS - timeRemaining;
    
    const success = await handleQuizComplete(score, totalQuestions, timeTaken);
    if (success) {
      setIsCompleted(true);
      setQuizSubmitted(true);
    }
  };

  const handleRetakeQuiz = () => {
    setQuizStarted(false);
    setQuizSubmitted(false);
    resetTimer();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-6">
        <Link to={`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}`}>
          <Button 
            variant="outline" 
            className="border-elec-yellow/30 hover:bg-elec-yellow/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Unit
          </Button>
        </Link>
      </div>
      
      <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-elec-yellow text-elec-dark font-bold text-lg">
            Q
          </span>
          <h2 className="text-2xl font-bold">Knowledge Assessment Quiz</h2>
          {isCompleted && (
            <div className="ml-auto flex items-center text-green-500 gap-2">
              <span className="text-sm">Completed</span>
            </div>
          )}
        </div>
        
        {!quizStarted ? (
          <StartQuizPanel 
            isCompleted={isCompleted}
            onStartQuiz={handleStartQuiz}
            onBack={() => navigate(`/apprentice/study/eal/${courseSlug}/unit/${unitSlug}`)}
          />
        ) : (
          <>
            {/* Timer display */}
            <div className="mb-6">
              <QuizTimerDisplay 
                timeRemaining={timeRemaining} 
                totalTime={QUIZ_TIME_IN_SECONDS} 
              />
            </div>
            
            <div className="mt-6">
              <UnitQuiz
                unitCode={unitCode}
                questions={healthAndSafetyQuizzes.questions}
                onQuizComplete={handleQuizComplete}
                questionCount={QUESTION_COUNT}
                timeLimit={QUIZ_TIME_IN_SECONDS}
                currentTime={timeRemaining}
                isSubmitted={quizSubmitted}
              />
              
              {quizSubmitted && (
                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={handleRetakeQuiz}
                    className="bg-elec-yellow hover:bg-elec-yellow/80 text-elec-dark"
                  >
                    Retake Quiz
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizContent;
