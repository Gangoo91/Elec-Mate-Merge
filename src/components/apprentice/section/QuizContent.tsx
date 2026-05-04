import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import UnitQuiz from '@/components/apprentice/UnitQuiz';
import { healthAndSafetyQuizzes } from '@/data/unitQuizzes';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { userKey } from '@/lib/userStorage';
import { useHaptic } from '@/hooks/useHaptic';
import { storageGetSync, storageSetSync, storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';

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
  markAsComplete,
}: QuizContentProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const haptic = useHaptic();
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number>(30 * 60); // 30 minutes in seconds

  // Extract unit code from the unitSlug
  const unitCode = effectiveUnitSlug.includes('-')
    ? effectiveUnitSlug.split('-').slice(0, 2).join('/').toUpperCase()
    : 'ELEC2/01';

  // Format remaining time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const timeProgress = 100 - (timeRemaining / (30 * 60)) * 100;

  // Timer effect to count down when quiz is started
  React.useEffect(() => {
    if (!quizStarted || quizSubmitted) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          toast({
            title: "Time's up!",
            description: 'Your quiz has been automatically submitted.',
            variant: 'destructive',
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
    haptic.medium();
    setQuizStarted(true);
    toast({
      title: 'Quiz Started',
      description: 'You have 30 minutes to complete this assessment.',
    });
  };

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    haptic.success();
    // Mark quiz as completed
    markAsComplete();

    // Calculate time taken
    const timeTaken = 30 * 60 - timeRemaining;
    const minutesTaken = Math.ceil(timeTaken / 60);

    // Add to off-the-job training record
    try {
      const uid = user?.id;
      const existingTime = parseInt(
        storageGetSync(userKey(uid, `course_${effectiveCourseSlug}_todayTime`)) || '0'
      );
      const newTime = existingTime + timeTaken;
      storageSetSync(
        userKey(uid, `course_${effectiveCourseSlug}_todayTime`),
        newTime.toString()
      );

      // Record quiz attempt in storage (user-scoped)
      const attempts = storageGetJSONSync<any[]>(userKey(uid, `unit_${unitCode}_quiz_attempts`), []);
      attempts.push({
        date: new Date().toISOString(),
        score,
        totalQuestions,
        timeTaken,
        percentage: Math.round((score / totalQuestions) * 100),
      });
      storageSetJSONSync(
        userKey(uid, `unit_${unitCode}_quiz_attempts`),
        attempts
      );
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }

    // Show toast
    toast({
      title: 'Quiz Completed',
      description: `You scored ${score} out of ${totalQuestions}. ${minutesTaken} minutes has been added to your off-the-job training.`,
    });

    setQuizSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Assessment
          </span>
          <h1 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-white leading-tight">
            Unit assessment quiz
          </h1>
        </div>
        {isCompleted && <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0" />}
      </div>

      {!quizStarted ? (
        <>
          <p className="text-[14px] text-white/85 leading-relaxed">
            This quiz will test your understanding of the key health and safety concepts covered in
            this unit. Complete the quiz to demonstrate your knowledge.
          </p>

          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Quiz instructions
            </span>
            <ul className="space-y-1.5">
              {[
                'The quiz contains 30 multiple choice questions',
                'You need to score at least 70% to pass',
                'You have 30 minutes to complete the quiz',
                'You can retake the quiz as many times as needed',
                'Take your time and read each question carefully',
              ].map((item, i) => (
                <li
                  key={i}
                  className="text-[14px] text-white/85 leading-relaxed flex items-start gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <Button
              variant="outline"
              className="h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
              onClick={() =>
                navigate(`/apprentice/study/eal/${effectiveCourseSlug}/unit/${effectiveUnitSlug}`)
              }
            >
              Back to unit
            </Button>

            <Button
              onClick={handleStartQuiz}
              disabled={isCompleted}
              className="h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98] disabled:opacity-40"
            >
              {isCompleted ? 'Quiz completed' : 'Start quiz'}
              {isCompleted && <CheckCircle className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Time remaining
              </span>
              <span
                className={`font-mono text-[14px] ${timeRemaining < 300 ? 'text-red-300 animate-pulse' : 'text-white'}`}
              >
                {formatTime(timeRemaining)}
              </span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-elec-yellow transition-all duration-500"
                style={{ width: `${timeProgress}%` }}
              />
            </div>
          </div>

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
