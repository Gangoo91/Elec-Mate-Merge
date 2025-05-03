
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, AlertTriangle } from "lucide-react";
import UnitQuiz from "@/components/apprentice/UnitQuiz";
import { healthAndSafetyQuizzes } from "@/data/unitQuizzes";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";

const QuizContent = () => {
  const { courseSlug, unitSlug } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState<number>(30 * 60); // 30 minutes in seconds
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  
  // Extract unit code from the unitSlug
  const unitCode = unitSlug?.includes('-') ? 
    unitSlug.split('-').slice(0, 2).join('/').toUpperCase() : '';
  
  // Timer effect
  useEffect(() => {
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
  
  // Format remaining time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress percentage
  const timeProgress = 100 - ((timeRemaining / (30 * 60)) * 100);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    toast({
      title: "Quiz Started",
      description: "You have 30 minutes to complete this assessment.",
    });
  };

  const handleQuizComplete = async (score: number, totalQuestions: number) => {
    // Mark quiz as completed in localStorage
    localStorage.setItem(`unit_${unitCode}_quiz_completed`, 'true');
    
    // Calculate time taken
    const timeTaken = (30 * 60) - timeRemaining;
    const minutesTaken = Math.ceil(timeTaken / 60);
    
    // Add to off-the-job training record
    try {
      // In a real implementation, this would save to Supabase
      // For now, we'll just add to localStorage
      const existingTime = parseInt(localStorage.getItem(`course_${courseSlug}_todayTime`) || '0');
      const newTime = existingTime + timeTaken;
      localStorage.setItem(`course_${courseSlug}_todayTime`, newTime.toString());
      
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
        </div>
        
        {!quizStarted ? (
          <div className="space-y-6 p-4 border border-elec-yellow/20 rounded-lg">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-elec-yellow" />
              <h3 className="font-semibold">Timed Assessment - 30 Minutes</h3>
            </div>
            
            <div className="space-y-4">
              <p>This quiz consists of 30 questions randomly selected from a large question pool.</p>
              <p>Once started, you'll have 30 minutes to complete the quiz. Your results will be recorded as part of your off-the-job training hours.</p>
              <div className="flex items-start gap-3 bg-amber-950/30 p-4 rounded-lg border border-amber-500/30">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-500">Important</p>
                  <p className="text-sm text-muted-foreground">Make sure you have enough time to complete the quiz before starting. If you leave the page, your progress may be lost.</p>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleStartQuiz}
              className="bg-elec-yellow hover:bg-elec-yellow/80 text-elec-dark"
            >
              Start Quiz
            </Button>
          </div>
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
            
            <div className="mt-6">
              <UnitQuiz
                unitCode={unitCode}
                questions={healthAndSafetyQuizzes.questions}
                onQuizComplete={handleQuizComplete}
                questionCount={30}
                timeLimit={30 * 60}
                currentTime={timeRemaining}
                isSubmitted={quizSubmitted}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizContent;
