import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getRandomEmergencyLightingMockExamQuestions } from '@/data/upskilling/emergencyLightingMockExamData';
import QuizQuestion from './quiz/QuizQuestion';
import QuizResults from './quiz/QuizResults';
import QuizNavigation from './quiz/QuizNavigation';
import QuizProgress from './quiz/QuizProgress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FileCheck, RefreshCw, ArrowLeft, Clock, CheckCircle, XCircle, Flag } from 'lucide-react';
import { QuizQuestion as QuizQuestionType } from '@/types/quiz';
import { useToast } from '@/hooks/use-toast';

const EmergencyLightingMockExam = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  // Results filter state - URL-based for back button support
  const reviewFilter = (searchParams.get("filter") as 'all' | 'incorrect' | 'flagged' | 'correct') || 'all';
  const setReviewFilter = (filter: 'all' | 'incorrect' | 'flagged' | 'correct') => setSearchParams({ filter }, { replace: false });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [examQuestions, setExamQuestions] = useState<QuizQuestionType[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  // Timer state
  const [timeRemaining, setTimeRemaining] = useState<number>(45 * 60); // 45 minutes in seconds
  const [timerActive, setTimerActive] = useState<boolean>(false);

  // Flag system state
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());

  // Timer logic
  useEffect(() => {
    if (timerActive && timeRemaining > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timerActive, timeRemaining, showResults]);

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeRemaining === 0 && examStarted && !showResults) {
      setQuizCompleted(true);
      setShowResults(true);
      setEndTime(new Date());
      setTimerActive(false);
      toast({
        title: "Time's Up!",
        description: "The exam has been automatically submitted.",
        variant: "default",
      });
    }
  }, [timeRemaining, examStarted, showResults, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeRemaining > 900) return "text-green-400"; // > 15 mins
    if (timeRemaining > 300) return "text-yellow-400"; // 5-15 mins
    return "text-red-400"; // < 5 mins
  };

  const handleStartExam = () => {
    const newQuestions = getRandomEmergencyLightingMockExamQuestions(30);
    setExamQuestions(newQuestions);
    setExamStarted(true);
    setStartTime(new Date());
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
    setEndTime(null);
    setTimeRemaining(45 * 60);
    setTimerActive(true);
    setFlaggedQuestions(new Set());
    setReviewFilter('all');
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < examQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
      setEndTime(new Date());
      setTimerActive(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setExamStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
    setStartTime(null);
    setEndTime(null);
    setTimeRemaining(45 * 60);
    setTimerActive(false);
    setFlaggedQuestions(new Set());
    setReviewFilter('all');
  };

  const toggleFlag = useCallback((questionIndex: number) => {
    const newFlags = new Set(flaggedQuestions);
    if (newFlags.has(questionIndex)) {
      newFlags.delete(questionIndex);
    } else {
      newFlags.add(questionIndex);
    }
    setFlaggedQuestions(newFlags);
  }, [flaggedQuestions]);

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === examQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getExamDuration = () => {
    if (startTime && endTime) {
      const duration = Math.round((endTime.getTime() - startTime.getTime()) / 1000 / 60);
      return duration;
    }
    return 0;
  };

  const getGradeInfo = (score: number) => {
    const percentage = (score / examQuestions.length) * 100;
    if (percentage >= 80) {
      return {
        grade: "Distinction",
        message: "Outstanding performance! You demonstrate excellent understanding of emergency lighting principles.",
        color: "text-green-400"
      };
    }
    if (percentage >= 65) {
      return {
        grade: "Merit", 
        message: "Good performance! You have a solid grasp of emergency lighting fundamentals.",
        color: "text-blue-400"
      };
    }
    if (percentage >= 60) {
      return {
        grade: "Pass",
        message: "Satisfactory performance. You meet the minimum requirements but could benefit from further study.",
        color: "text-yellow-400"
      };
    }
    return {
      grade: "Fail",
      message: "Unfortunately, you haven't met the pass criteria. Please review the material and try again.",
      color: "text-red-400"
    };
  };

  const getModulePerformance = () => {
    const moduleScores: { [key: number]: { correct: number, total: number } } = {};
    
    examQuestions.forEach((question, index) => {
      const moduleId = question.moduleId || 1;
      if (!moduleScores[moduleId]) {
        moduleScores[moduleId] = { correct: 0, total: 0 };
      }
      moduleScores[moduleId].total++;
      if (selectedAnswers[index] === question.correctAnswer) {
        moduleScores[moduleId].correct++;
      }
    });
    
    return moduleScores;
  };

  const getFilteredQuestions = () => {
    return examQuestions.filter((question, index) => {
      const isCorrect = selectedAnswers[index] === question.correctAnswer;
      const isFlagged = flaggedQuestions.has(index);
      
      if (reviewFilter === 'all') return true;
      if (reviewFilter === 'correct') return isCorrect;
      if (reviewFilter === 'incorrect') return !isCorrect;
      if (reviewFilter === 'flagged') return isFlagged;
      return true;
    }).map((question, originalIndex) => ({
      question,
      originalIndex: examQuestions.indexOf(question)
    }));
  };

  // Start Screen
  if (!examStarted) {
    return (
      <div className="max-w-4xl mx-auto">
        <Button
          onClick={() => navigate('/electrician/upskilling/emergency-lighting-course')}
          variant="outline"
          className="mb-4 border-border bg-card text-white hover:bg-accent min-h-[48px]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Course
        </Button>
        
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-white text-center text-2xl">Emergency Lighting Mock Examination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-6">
              <FileCheck className="h-16 w-16 text-primary mx-auto" />
              <p className="text-white text-lg">
                Test your knowledge with 30 comprehensive questions covering emergency lighting design, installation, testing, and BS 5266 compliance
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-background border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">30</div>
                <div className="text-sm text-white">Questions</div>
              </div>
              <div className="bg-background border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">45</div>
                <div className="text-sm text-white">Minutes</div>
              </div>
              <div className="bg-background border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">60%</div>
                <div className="text-sm text-white">Pass Mark</div>
              </div>
            </div>

            <div className="bg-background border border-border rounded-lg p-4">
              <h3 className="text-white font-semibold mb-3">Examination Instructions</h3>
              <ul className="text-white text-sm space-y-2">
                <li>• Answer all 30 questions to complete the examination</li>
                <li>• You have 45 minutes to complete the exam</li>
                <li>• You can flag questions for review</li>
                <li>• Navigate between questions using the navigation buttons</li>
                <li>• Review your answers before submitting</li>
                <li>• A score of 60% or higher is required to pass</li>
                <li>• This exam covers all 6 modules of the Emergency Lighting course</li>
              </ul>
            </div>

            <div className="text-center pt-4">
              <Button
                onClick={handleStartExam}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 text-lg font-semibold min-h-[48px]"
                size="lg"
              >
                <FileCheck className="mr-2 h-5 w-5" />
                Begin Examination
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Results Screen
  if (showResults) {
    const score = calculateScore();
    const gradeInfo = getGradeInfo(score);
    const duration = getExamDuration();
    const modulePerformance = getModulePerformance();
    const correctCount = score;
    const incorrectCount = examQuestions.length - score;
    const flaggedCount = flaggedQuestions.size;
    const filteredQuestions = getFilteredQuestions();

    const moduleNames: { [key: number]: string } = {
      1: "Module 1: Introduction",
      2: "Module 2: System Categories",
      3: "Module 3: Design Requirements",
      4: "Module 4: Installation & Wiring",
      5: "Module 5: Testing & Maintenance",
      6: "Module 6: Compliance & Documentation"
    };

    return (
      <div className="space-y-6">
        <Button
          onClick={() => navigate('/electrician/upskilling/emergency-lighting-course')}
          variant="outline"
          className="border-border bg-card text-white hover:bg-accent min-h-[48px]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Course
        </Button>
        
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-white text-center text-2xl">Examination Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Score Summary */}
            <div className="text-center space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-background border border-border rounded-lg p-4">
                  <h3 className="text-white text-sm">Score</h3>
                  <div className="text-3xl font-bold text-primary">
                    {score} / {examQuestions.length}
                  </div>
                  <div className="text-white text-sm">
                    {Math.round((score / examQuestions.length) * 100)}%
                  </div>
                </div>
                <div className="bg-background border border-border rounded-lg p-4">
                  <h3 className="text-white text-sm">Grade</h3>
                  <div className={`text-3xl font-bold ${gradeInfo.color}`}>
                    {gradeInfo.grade}
                  </div>
                </div>
                <div className="bg-background border border-border rounded-lg p-4">
                  <h3 className="text-white text-sm">Duration</h3>
                  <div className="text-3xl font-bold text-white">
                    {duration}
                  </div>
                  <div className="text-white text-sm">minutes</div>
                </div>
              </div>
              
              <div className="bg-background border border-border rounded-lg p-4">
                <p className={`${gradeInfo.color} font-medium`}>
                  {gradeInfo.message}
                </p>
              </div>
            </div>

            {/* Performance Breakdown */}
            <div className="bg-background border border-border rounded-lg p-4">
              <h3 className="text-white font-semibold mb-4">Performance Breakdown</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-white">Correct</span>
                      <span className="text-sm font-medium text-white">{correctCount} ({Math.round((correctCount / examQuestions.length) * 100)}%)</span>
                    </div>
                    <Progress value={(correctCount / examQuestions.length) * 100} className="h-2" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-white">Incorrect</span>
                      <span className="text-sm font-medium text-white">{incorrectCount} ({Math.round((incorrectCount / examQuestions.length) * 100)}%)</span>
                    </div>
                    <Progress value={(incorrectCount / examQuestions.length) * 100} className="h-2 [&>div]:bg-red-500" />
                  </div>
                </div>
                {flaggedCount > 0 && (
                  <div className="flex items-center gap-3">
                    <Flag className="h-5 w-5 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-white">Flagged for Review</span>
                        <span className="text-sm font-medium text-white">{flaggedCount} ({Math.round((flaggedCount / examQuestions.length) * 100)}%)</span>
                      </div>
                      <Progress value={(flaggedCount / examQuestions.length) * 100} className="h-2" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Module Performance */}
            <div className="bg-background border border-border rounded-lg p-4">
              <h3 className="text-white font-semibold mb-4">Module Performance</h3>
              <div className="space-y-3">
                {Object.entries(modulePerformance).map(([moduleId, stats]) => {
                  const percentage = (stats.correct / stats.total) * 100;
                  return (
                    <div key={moduleId}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-white">{moduleNames[parseInt(moduleId)] || `Module ${moduleId}`}</span>
                        <span className="text-sm font-medium text-white">{stats.correct}/{stats.total} ({Math.round(percentage)}%)</span>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Time Analytics */}
            <div className="bg-background border border-border rounded-lg p-4">
              <h3 className="text-white font-semibold mb-4">Time Analytics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-white">Time Taken</div>
                  <div className="text-2xl font-bold text-white">{duration} min</div>
                </div>
                <div>
                  <div className="text-sm text-white">Time Allowed</div>
                  <div className="text-2xl font-bold text-white">45 min</div>
                </div>
                <div>
                  <div className="text-sm text-white">Efficiency</div>
                  <div className="text-2xl font-bold text-white">{Math.round((duration / 45) * 100)}%</div>
                </div>
              </div>
            </div>

            {/* Question Review with Filters */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-white font-semibold">Question Review</h3>
                <Tabs value={reviewFilter} onValueChange={(value) => setReviewFilter(value as typeof reviewFilter)} className="w-full sm:w-auto">
                  <TabsList className="grid w-full grid-cols-4 sm:w-auto">
                    <TabsTrigger value="all" className="text-xs sm:text-sm">All ({examQuestions.length})</TabsTrigger>
                    <TabsTrigger value="incorrect" className="text-xs sm:text-sm">Incorrect ({incorrectCount})</TabsTrigger>
                    <TabsTrigger value="flagged" className="text-xs sm:text-sm">Flagged ({flaggedCount})</TabsTrigger>
                    <TabsTrigger value="correct" className="text-xs sm:text-sm">Correct ({correctCount})</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {filteredQuestions.length === 0 ? (
                <div className="text-center py-8 text-white">
                  No questions match this filter
                </div>
              ) : (
                filteredQuestions.map(({ question, originalIndex }) => {
                  const userAnswer = selectedAnswers[originalIndex];
                  const isCorrect = userAnswer === question.correctAnswer;
                  const isFlagged = flaggedQuestions.has(originalIndex);
                  
                  return (
                    <Card key={question.id} className="bg-background border-border">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3 mb-3">
                          {isCorrect ? (
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-foreground text-xs font-bold">✓</span>
                            </div>
                          ) : (
                            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-foreground text-xs font-bold">✗</span>
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-white font-medium text-sm mb-2">
                                Q{originalIndex + 1}: {question.question}
                              </p>
                              {isFlagged && (
                                <Flag className="h-4 w-4 text-primary fill-primary flex-shrink-0 mt-1" />
                              )}
                            </div>
                            <p className="text-white text-xs mb-2">
                              <strong>Your answer:</strong> {question.options[userAnswer]}
                            </p>
                            {!isCorrect && (
                              <p className="text-white text-xs mb-2">
                                <strong>Correct answer:</strong> {question.options[question.correctAnswer]}
                              </p>
                            )}
                            <p className="text-white text-xs">
                              <strong>Explanation:</strong> {question.explanation}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => navigate('/electrician/upskilling/emergency-lighting-course')}
                variant="outline"
                className="border-border bg-card text-white hover:bg-accent min-h-[48px]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Course
              </Button>
              <Button
                onClick={handleRestart}
                className="bg-primary text-primary-foreground hover:bg-primary/90 min-h-[48px]"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Quiz Screen
  const question = examQuestions[currentQuestion];
  const flagCount = flaggedQuestions.size;
  const isFlagged = flaggedQuestions.has(currentQuestion);

  return (
    <div className="space-y-6">
      {/* Back Button and Timer */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Button
          onClick={() => navigate('/electrician/upskilling/emergency-lighting-course')}
          variant="outline"
          className="border-border bg-card text-white hover:bg-accent min-h-[48px]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Back to Course</span>
          <span className="sm:hidden">Back</span>
        </Button>
        
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card ${timeRemaining <= 300 && timeRemaining > 0 ? 'animate-pulse' : ''}`}>
          <Clock className={`h-5 w-5 ${getTimerColor()}`} />
          <span className={`text-lg font-bold ${getTimerColor()}`}>
            {formatTime(timeRemaining)}
          </span>
        </div>
      </div>

      <QuizProgress 
        currentQuestion={currentQuestion}
        totalQuestions={examQuestions.length}
      />

      {/* Flag Counter */}
      {flagCount > 0 && (
        <div className="flex items-center justify-center gap-2 text-sm">
          <Flag className="h-4 w-4 text-primary fill-primary" />
          <span className="text-white">
            {flagCount} question{flagCount !== 1 ? 's' : ''} flagged for review
          </span>
        </div>
      )}

      <QuizQuestion
        question={question}
        selectedAnswer={selectedAnswers[currentQuestion]}
        onAnswerSelect={handleAnswerSelect}
        isFlagged={isFlagged}
        onToggleFlag={() => toggleFlag(currentQuestion)}
      />

      <QuizNavigation
        currentQuestion={currentQuestion}
        totalQuestions={examQuestions.length}
        selectedAnswer={selectedAnswers[currentQuestion]}
        onPrevious={handlePrevious}
        onNext={handleNext}
        isLastQuestion={currentQuestion === examQuestions.length - 1}
      />
    </div>
  );
};

export default EmergencyLightingMockExam;
