
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, AlertTriangle } from "lucide-react";
import UnitQuiz from "@/components/apprentice/UnitQuiz";
import { healthAndSafetyQuizzes } from "@/data/unitQuizzes";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

interface QuizContentProps {
  effectiveCourseSlug: string;
  effectiveUnitSlug: string;
  isCompleted: boolean;
  markAsComplete: () => void;
}

const QuizContent = ({ 
  effectiveCourseSlug, 
  effectiveUnitSlug, 
  isCompleted, 
  markAsComplete 
}: QuizContentProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(30 * 60); // 30 minutes in seconds
  
  // Extract unit code from the unitSlug
  const unitCode = effectiveUnitSlug.includes('-') ? 
    effectiveUnitSlug.split('-').slice(0, 2).join('/').toUpperCase() : 'ELEC2/01';

  // Format remaining time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress percentage
  const timeProgress = 100 - ((timeRemaining / (30 * 60)) * 100);

  // Timer effect to count down when quiz is started
  React.useEffect(() => {
    if (!quizStarted || quizSubmitted) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          toast({
            title: "Time's up!",
            description: "Your quiz has been automatically submitted.",
            variant: "destructive"
          });
          setQuizSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [quizStarted, quizSubmitted, toast]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    toast({
      title: "Quiz Started",
      description: "You have 30 minutes to complete this assessment.",
    });
  };

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    // Mark quiz as completed
    markAsComplete();
    
    // Calculate time taken
    const timeTaken = (30 * 60) - timeRemaining;
    const minutesTaken = Math.ceil(timeTaken / 60);
    
    // Add to off-the-job training record
    try {
      const existingTime = parseInt(localStorage.getItem(`course_${effectiveCourseSlug}_todayTime`) || '0');
      const newTime = existingTime + timeTaken;
      localStorage.setItem(`course_${effectiveCourseSlug}_todayTime`, newTime.toString());
      
      // Record quiz attempt in localStorage
      const attempts = JSON.parse(localStorage.getItem(`unit_${unitCode}_quiz_attempts`) || '[]');
      attempts.push({
        date: new Date().toISOString(),
        score,
        totalQuestions,
        timeTaken,
        percentage: Math.round((score / totalQuestions) * 100)
      });
      localStorage.setItem(`unit_${unitCode}_quiz_attempts`, JSON.stringify(attempts));
    } catch (error) {
      console.error("Error saving quiz result:", error);
    }
    
    // Show toast
    toast({
      title: "Quiz Completed",
      description: `You scored ${score} out of ${totalQuestions}. ${minutesTaken} minutes has been added to your off-the-job training.`,
    });
    
    setQuizSubmitted(true);
  };

  return (
    <div className="bg-elec-gray border border-elec-yellow/20 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-elec-yellow flex items-center justify-center">
            <span className="text-elec-dark font-bold text-xl">Q</span>
          </div>
          <h1 className="text-2xl font-semibold">Unit Assessment Quiz</h1>
        </div>
        
        {isCompleted && (
          <div className="flex items-center text-green-500 gap-2">
            <CheckCircle className="h-5 w-5" />
            <span className="text-sm">Completed</span>
          </div>
        )}
      </div>
      
      {!quizStarted ? (
        <>
          <div className="mb-8">
            <p className="text-muted-foreground">
              This quiz will test your understanding of the key health and safety concepts 
              covered in this unit. Complete the quiz to demonstrate your knowledge.
            </p>
          </div>
          
          <div className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-elec-yellow">Quiz Instructions</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• The quiz contains 30 multiple choice questions</li>
              <li>• You need to score at least 70% to pass</li>
              <li>• You have 30 minutes to complete the quiz</li>
              <li>• You can retake the quiz as many times as needed</li>
              <li>• Take your time and read each question carefully</li>
            </ul>
          </div>
          
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              className="border-elec-yellow/30 hover:bg-elec-yellow/10"
              onClick={() => navigate(`/apprentice/study/eal/${effectiveCourseSlug}/unit/${effectiveUnitSlug}`)}
            >
              Back to Unit
            </Button>
            
            <Button
              onClick={handleStartQuiz}
              disabled={isCompleted}
              className={`${isCompleted ? 'bg-green-600/20 border-green-500/50 text-green-400' : 'hover:bg-elec-yellow hover:text-elec-dark'}`}
            >
              {isCompleted ? 'Quiz Completed' : 'Start Quiz'}
              {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* Timer display */}
          <div className="mb-6 p-4 border border-elec-yellow/20 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-elec-yellow" />
                <span className="font-semibold">Time Remaining</span>
              </div>
              <span className={`font-mono text-lg ${timeRemaining < 300 ? 'text-red-500 animate-pulse' : 'text-elec-yellow'}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
            <Progress value={timeProgress} className="h-2" />
          </div>
          
          {/* Quiz component */}
          <UnitQuiz
            unitCode={unitCode}
            questions={healthAndSafetyQuizzes.questions}
            onQuizComplete={handleQuizComplete}
            questionCount={30}
            timeLimit={30 * 60}
            currentTime={timeRemaining}
            isSubmitted={quizSubmitted}
          />
        </>
      )}
    </div>
  );
};

export default QuizContent;
