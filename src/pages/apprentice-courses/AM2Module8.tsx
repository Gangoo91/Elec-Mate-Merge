import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock, CheckCircle, XCircle, AlertTriangle, Flag, RotateCcw, FileText, Target, BookOpen, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ExamDesktopSidebar } from "@/components/apprentice-courses/ExamDesktopSidebar";
import { ExamMobileLayout } from "@/components/apprentice-courses/ExamMobileLayout";
import { getRandomQuestions, AM2Question } from "@/data/apprentice-courses/am2/questionBank";
import { toast } from "sonner";
import useSEO from "@/hooks/useSEO";

const AM2Module8 = () => {
  const navigate = useNavigate();
  useSEO(
    "Module 8: AM2 Mock Examination - AM2 Preparation Course",
    "Practice AM2 knowledge test with 40 questions, 60-minute timer from 500+ question bank covering safe isolation, BS7671, testing and fault finding"
  );

  // Exam state
  const [examStarted, setExamStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [examQuestions, setExamQuestions] = useState<AM2Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes in seconds
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'incorrect' | 'unanswered' | 'flagged'>('all');

  // Start exam
  const startExam = () => {
    const questions = getRandomQuestions(40, { basic: 0.4, intermediate: 0.4, advanced: 0.2 });
    setExamQuestions(questions);
    setSelectedAnswers(new Array(40).fill(-1));
    setCurrentQuestion(0);
    setTimeRemaining(3600);
    setFlaggedQuestions(new Set());
    setExamStarted(true);
    setShowResults(false);
    setShowReview(false);
    toast.success("AM2 Mock Exam started! Good luck!");
  };

  // Timer effect
  useEffect(() => {
    if (examStarted && !showResults && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [examStarted, showResults, timeRemaining]);

  // Format time display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  // Navigation
  const handleNext = () => {
    if (currentQuestion < examQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    toast.success("Exam submitted successfully!");
  };

  // Flag functionality
  const toggleFlag = () => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(currentQuestion)) {
      newFlagged.delete(currentQuestion);
    } else {
      newFlagged.add(currentQuestion);
    }
    setFlaggedQuestions(newFlagged);
  };

  // Calculate score
  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      if (answer === examQuestions[index]?.correctAnswer) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  // Get question status for review
  const getQuestionStatus = (index: number): 'correct' | 'incorrect' | 'unanswered' => {
    if (selectedAnswers[index] === -1) return 'unanswered';
    return selectedAnswers[index] === examQuestions[index].correctAnswer ? 'correct' : 'incorrect';
  };

  // Review functionality
  const getFilteredQuestions = () => {
    return examQuestions.map((q, index) => ({ question: q, index })).filter(({ index }) => {
      const status = getQuestionStatus(index);
      const isFlagged = flaggedQuestions.has(index);
      
      switch (reviewFilter) {
        case 'correct': return status === 'correct';
        case 'incorrect': return status === 'incorrect';
        case 'unanswered': return status === 'unanswered';
        case 'flagged': return isFlagged;
        default: return true;
      }
    });
  };

  // Statistics
  const getSummaryStats = () => {
    const answered = selectedAnswers.filter(a => a !== -1).length;
    const unanswered = examQuestions.length - answered;
    const flagged = flaggedQuestions.size;
    const correct = showResults ? calculateScore() : 0;
    const incorrect = showResults ? answered - correct : 0;
    
    return { answered, unanswered, flagged, correct, incorrect };
  };

  const stats = getSummaryStats();
  const score = calculateScore();
  const percentage = examQuestions.length > 0 ? Math.round((score / examQuestions.length) * 100) : 0;
  const passed = percentage >= 60;

  // Reset exam
  const resetExam = () => {
    setExamStarted(false);
    setShowResults(false);
    setShowReview(false);
    setExamQuestions([]);
    setSelectedAnswers([]);
    setCurrentQuestion(0);
    setTimeRemaining(3600);
    setFlaggedQuestions(new Set());
    setReviewFilter('all');
  };

  // Before exam starts
  if (!examStarted) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] p-2 sm:p-4">
        <div>
          <Card className="border-elec-yellow/30 ">
            <CardHeader className="text-center pb-3 sm:pb-4 px-3 sm:px-6">
              <div className="mx-auto mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-elec-yellow/10">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
              </div>
              <CardTitle className="text-lg sm:text-xl md:text-2xl text-white mb-1">AM2 Mock Examination</CardTitle>
              <h2 className="text-xs sm:text-sm md:text-lg text-elec-yellow">Comprehensive AM2 Assessment Practice</h2>
            </CardHeader>
            
            <CardContent className="space-y-4 sm:space-y-6 px-3 sm:px-6">
              <div className="bg-[#1a1a1a] p-3 sm:p-4 rounded-lg sm:rounded-xl border border-muted/40">
                <div className="flex items-center gap-2 mb-3 sm:mb-3">
                  <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-md sm:rounded-lg bg-elec-yellow/20">
                    <CheckCircle className="h-3 w-3 sm:h-3 sm:w-3 text-elec-yellow" />
                  </div>
                  <h3 className="font-semibold text-white text-sm sm:text-base">Instructions</h3>
                </div>
                <div className="grid gap-2 sm:gap-2">
                  <div className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 sm:h-1.5 sm:w-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                    <p className="text-sm sm:text-sm text-white leading-relaxed">40 questions randomly selected from 500+ question bank</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 sm:h-1.5 sm:w-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                    <p className="text-sm sm:text-sm text-white leading-relaxed">60 minutes time limit</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 sm:h-1.5 sm:w-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                    <p className="text-sm sm:text-sm text-white leading-relaxed">Pass mark: 60% (24/40 questions)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 sm:h-1.5 sm:w-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                    <p className="text-sm sm:text-sm text-white leading-relaxed">Covers all AM2 assessment areas</p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={startExam}
                className="w-full bg-elec-yellow hover:bg-elec-yellow/90 text-black font-bold py-3 sm:py-3 text-base sm:text-base touch-manipulation min-h-[48px] rounded-lg"
                size="lg"
              >
                <div className="flex items-center justify-center gap-3">
                  <FileText className="h-4 w-4 sm:h-4 sm:w-4" />
                  Start Exam
                  <Clock className="h-4 w-4 sm:h-4 sm:w-4" />
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Results screen
  if (showResults && !showReview) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] p-2 sm:p-4">
        <div>
          <Card className="border-elec-yellow/30 ">
            <CardHeader className="text-center pb-4 px-4 sm:px-6">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-lg font-semibold mb-4 ${
                passed ? 'bg-elec-yellow/20 text-elec-yellow' : 'bg-red-500/20 text-elec-yellow'
              }`}>
                {passed ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                {passed ? 'PASSED' : 'FAILED'}
              </div>
              <CardTitle className="text-xl sm:text-2xl text-white mb-2">Exam Complete</CardTitle>
              <p className="text-lg text-white">
                You scored {score} out of {examQuestions.length} ({percentage}%)
              </p>
            </CardHeader>
            
            <CardContent className="px-4 sm:px-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Card className="bg-transparent border-green-500/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-500">{stats.correct}</div>
                    <div className="text-sm text-white">Correct</div>
                  </CardContent>
                </Card>
                <Card className="bg-transparent border-red-500/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-elec-yellow">{stats.incorrect}</div>
                    <div className="text-sm text-white">Incorrect</div>
                  </CardContent>
                </Card>
                <Card className="bg-transparent border-muted/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-white">{stats.unanswered}</div>
                    <div className="text-sm text-white">Unanswered</div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => setShowReview(true)}
                  variant="outline"
                  size="lg"
                  className="border-elec-yellow/40 hover:bg-elec-yellow/10 text-white"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Review Answers
                </Button>
                <Button 
                  onClick={resetExam}
                  size="lg"
                  className="bg-elec-yellow hover:bg-elec-yellow/90 text-black"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake Exam
                </Button>
                <Button
                  onClick={() => navigate("am2")}
                  variant="outline"
                  size="lg"
                  className="border-border/40 hover:bg-card/10 text-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Course
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Review screen
  if (showReview) {
    const filteredQuestions = getFilteredQuestions();
    
    return (
      <div className="min-h-screen bg-[#1a1a1a] p-2 sm:p-4">
        <div className="max-w-6xl mx-auto">
          {/* Review Header */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-lg sm:text-lg sm:text-xl font-semibold text-white">Review Answers</h1>
                <p className="text-sm text-white">Score: {percentage}% ({score}/{examQuestions.length})</p>
              </div>
              <Button
                onClick={() => setShowReview(false)}
                variant="ghost"
                size="sm"
                className="text-white hover:text-elec-yellow"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Results
              </Button>
            </div>
            
            {/* Summary Stats - Clickable Filters */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 mb-4">
              <Card 
                className={`bg-transparent border-elec-yellow/30 cursor-pointer hover:bg-elec-yellow/5 transition-colors ${
                  reviewFilter === "all" ? "ring-2 ring-elec-yellow/50" : ""
                }`}
                onClick={() => setReviewFilter(reviewFilter === "all" ? "all" : "all")}
              >
                <CardContent className="p-3 text-center">
                  <div className="text-lg font-bold text-elec-yellow">{examQuestions.length}</div>
                  <div className="text-xs text-white">All</div>
                </CardContent>
              </Card>
              <Card 
                className={`bg-transparent border-green-500/20 cursor-pointer hover:bg-transparent transition-colors ${
                  reviewFilter === "correct" ? "ring-2 ring-green-500/50" : ""
                }`}
                onClick={() => setReviewFilter(reviewFilter === "correct" ? "all" : "correct")}
              >
                <CardContent className="p-3 text-center">
                  <div className="text-lg font-bold text-green-500">{stats.correct}</div>
                  <div className="text-xs text-white">Correct</div>
                </CardContent>
              </Card>
              <Card 
                className={`bg-transparent border-red-500/20 cursor-pointer hover:bg-transparent transition-colors ${
                  reviewFilter === "incorrect" ? "ring-2 ring-red-500/50" : ""
                }`}
                onClick={() => setReviewFilter(reviewFilter === "incorrect" ? "all" : "incorrect")}
              >
                <CardContent className="p-3 text-center">
                  <div className="text-lg font-bold text-elec-yellow">{stats.incorrect}</div>
                  <div className="text-xs text-white">Incorrect</div>
                </CardContent>
              </Card>
              <Card 
                className={`bg-transparent border-muted/20 cursor-pointer hover:bg-muted/10 transition-colors ${
                  reviewFilter === "unanswered" ? "ring-2 ring-muted/50" : ""
                }`}
                onClick={() => setReviewFilter(reviewFilter === "unanswered" ? "all" : "unanswered")}
              >
                <CardContent className="p-3 text-center">
                  <div className="text-lg font-bold text-white">{stats.unanswered}</div>
                  <div className="text-xs text-white">Unanswered</div>
                </CardContent>
              </Card>
              <Card 
                className={`bg-transparent border-elec-yellow/30 cursor-pointer hover:bg-elec-yellow/5 transition-colors ${
                  reviewFilter === "flagged" ? "ring-2 ring-elec-yellow/50" : ""
                }`}
                onClick={() => setReviewFilter(reviewFilter === "flagged" ? "all" : "flagged")}
              >
                <CardContent className="p-3 text-center">
                  <div className="text-lg font-bold text-elec-yellow">{stats.flagged}</div>
                  <div className="text-xs text-white">Flagged</div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Question List */}
          <div className="space-y-4">
            {filteredQuestions.map(({ question, index }) => {
              const status = getQuestionStatus(index);
              const userAnswer = selectedAnswers[index];
              const correctAnswer = question.correctAnswer;
              const isFlagged = flaggedQuestions.has(index);
              
              return (
                <Card key={index} className="bg-transparent border-elec-yellow/30">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base text-white">
                        Question {index + 1}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        {isFlagged && (
                          <Badge variant="outline" className="text-elec-yellow border-elec-yellow/40">
                            <Flag className="h-3 w-3 mr-1 fill-current" />
                            Flagged
                          </Badge>
                        )}
                        <Badge 
                          variant={status === "correct" ? "default" : "destructive"}
                          className={
                            status === "correct" 
                              ? "bg-green-500/20 text-green-500 border-green-500/40" 
                              : status === "incorrect"
                              ? "bg-red-500/20 text-elec-yellow border-red-500/40"
                              : "bg-muted/20 text-white border-muted/40"
                          }
                        >
                          {status === "correct" ? "Correct" : status === "incorrect" ? "Incorrect" : "Unanswered"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed mb-4 font-medium">{question.question}</p>
                    
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => {
                        const isUserAnswer = userAnswer === optionIndex;
                        const isCorrectAnswer = correctAnswer === optionIndex;
                        
                        return (
                          <div
                            key={optionIndex}
                            className={`p-3 rounded-lg border-2 text-sm ${
                              isCorrectAnswer
                                ? "border-green-500 text-green-500"
                                : isUserAnswer && !isCorrectAnswer
                                ? "border-red-500 text-elec-yellow"
                                : "border-muted/40 bg-muted/5"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                isCorrectAnswer
                                  ? "border-green-500 bg-green-500"
                                  : isUserAnswer && !isCorrectAnswer
                                  ? "border-red-500 bg-red-500"
                                  : "border-muted-foreground"
                              }`}>
                                {(isUserAnswer || isCorrectAnswer) && (
                                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                )}
                              </div>
                              <span className="flex-1 leading-relaxed">{option}</span>
                              {isCorrectAnswer && (
                                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              )}
                              {isUserAnswer && !isCorrectAnswer && (
                                <XCircle className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {question.explanation && (
                      <div className="mt-4 p-3 rounded-lg border border-elec-yellow/30">
                        <div className="flex items-start gap-2">
                          <div className="flex h-5 w-5 items-center justify-center rounded-md bg-elec-yellow/20 flex-shrink-0 mt-0.5">
                            <CheckCircle className="h-3 w-3 text-elec-yellow" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-white mb-1">Explanation</h4>
                            <p className="text-sm text-white leading-relaxed">{question.explanation}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Active exam interface
  const answeredCount = selectedAnswers.filter(a => a !== -1).length;
  const progressPercentage = (answeredCount / examQuestions.length) * 100;

  const goToNextFlagged = () => {
    const flaggedArray = Array.from(flaggedQuestions).sort((a, b) => a - b);
    if (flaggedArray.length > 0) {
      const currentIndex = flaggedArray.indexOf(currentQuestion);
      const nextIndex = (currentIndex + 1) % flaggedArray.length;
      setCurrentQuestion(flaggedArray[nextIndex]);
    }
  };
  
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Header */}
      <div className="sticky top-0 z-50 backdrop-blur-sm bg-[#1a1a1a]/80 border-b border-elec-yellow/30 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <Link to=".." className="text-white hover:text-elec-yellow">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
          <div className="text-center">
            <div className="text-sm text-white">AM2 Mock Examination</div>
            <div className="font-mono text-lg font-bold text-elec-yellow">
              {formatTime(timeRemaining)}
            </div>
          </div>
          <div></div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <ExamMobileLayout
          examTitle="AM2 Mock Exam"
          currentQuestion={currentQuestion}
          totalQuestions={examQuestions.length}
          timeRemaining={timeRemaining}
          answeredQuestions={answeredCount}
          selectedAnswers={selectedAnswers}
          flaggedQuestions={flaggedQuestions}
          onQuestionSelect={setCurrentQuestion}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          onToggleFlag={toggleFlag}
          exitPath="am2"
          formatTime={formatTime}
        >
          {/* Question content for mobile */}
          {examQuestions[currentQuestion] && (
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">
                    Question {currentQuestion + 1} of {examQuestions.length}
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleFlag}
                    className={flaggedQuestions.has(currentQuestion) ? "text-elec-yellow" : "text-white"}
                  >
                    <Flag className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-white leading-relaxed">
                  {examQuestions[currentQuestion].question}
                </p>
              </div>

              <div className="space-y-3">
                {examQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left rounded-lg border transition-colors ${
                      selectedAnswers[currentQuestion] === index
                        ? 'bg-elec-yellow/20 border-elec-yellow text-white'
                        : 'bg-transparent border-elec-yellow/30 text-white hover:bg-elec-yellow/10 hover:border-elec-yellow/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold min-w-[20px]">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </ExamMobileLayout>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Question Panel */}
            <Card className="lg:col-span-3 border border-elec-yellow/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      Question {currentQuestion + 1} of {examQuestions.length}
                    </h2>
                    <div className="text-sm text-white mt-1">
                      AM2 Assessment • Electrical Installation • BS7671
                    </div>
                  </div>
                  <Button
                    onClick={toggleFlag}
                    variant="outline"
                    size="sm"
                    className={`border-elec-yellow/30 ${
                      flaggedQuestions.has(currentQuestion) 
                        ? 'bg-elec-yellow/20 text-elec-yellow' 
                        : 'text-white hover:bg-elec-yellow/10'
                    }`}
                  >
                    <Flag className="h-4 w-4 mr-2" />
                    {flaggedQuestions.has(currentQuestion) ? 'Flagged' : 'Flag'}
                  </Button>
                </div>

                <div className="mb-8">
                  <p className="text-white text-lg leading-relaxed mb-6">
                    {examQuestions[currentQuestion]?.question}
                  </p>
                  
                  <div className="space-y-3">
                    {examQuestions[currentQuestion]?.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full p-4 text-left rounded-lg border transition-colors ${
                          selectedAnswers[currentQuestion] === index
                            ? 'bg-elec-yellow/20 border-elec-yellow text-white'
                            : 'bg-[#1a1a1a]/30 border-elec-yellow/30 text-white hover:bg-elec-yellow/10 hover:border-elec-yellow/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-semibold min-w-[20px]">
                            {String.fromCharCode(65 + index)}.
                          </span>
                          <span>{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center pt-6 border-t border-elec-yellow/30">
                  <Button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    variant="outline"
                    className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10 disabled:opacity-50"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>

                  <div className="flex gap-2">
                    {currentQuestion === examQuestions.length - 1 ? (
                      <Button
                        onClick={handleSubmit}
                        disabled={answeredCount === 0}
                        className="bg-elec-yellow hover:bg-elec-yellow/90 text-black disabled:opacity-50 text-sm px-6 py-3 min-h-[52px] font-semibold rounded-xl"
                        size="sm"
                      >
                        Submit Exam
                        <CheckCircle className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNext}
                        className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-bold py-3 text-base min-h-[48px] rounded-lg px-8"
                        size="lg"
                      >
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Sidebar */}
            <Card className="bg-transparent border border-elec-yellow/30 shadow-lg">
              <CardContent className="p-4">
                <div className="space-y-6">
                  {/* Enhanced Timer */}
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/10 p-4 rounded-xl border border-elec-yellow/30">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Clock className="h-5 w-5 text-elec-yellow" />
                        <span className="text-sm font-medium text-white">Time Remaining</span>
                      </div>
                      <div className="font-mono text-2xl font-bold text-elec-yellow">
                        {formatTime(timeRemaining)}
                      </div>
                      <div className="text-xs text-white mt-1">
                        {timeRemaining < 300 ? 'Final 5 minutes!' : 'Stay focused'}
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Progress */}
                  <div>
                    <div className="bg-[#1a1a1a]/50 p-4 rounded-lg border border-elec-yellow/30">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-white">Progress</span>
                        <span className="text-lg font-bold text-elec-yellow">{answeredCount}/{examQuestions.length}</span>
                      </div>
                      <Progress value={progressPercentage} className="h-3 mb-3" />
                      <div className="text-xs text-center text-white">
                        {Math.round(progressPercentage)}% Complete
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Stats */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <Target className="h-4 w-4 text-elec-yellow" />
                      Statistics
                    </h3>
                    
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center justify-between p-3 rounded-lg border border-green-500/20">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-400">Answered</span>
                        </div>
                        <span className="font-bold text-green-400">{answeredCount}</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg border border-red-500/20">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm text-elec-yellow">Remaining</span>
                        </div>
                        <span className="font-bold text-elec-yellow">{examQuestions.length - answeredCount}</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg border border-elec-yellow/20">
                        <div className="flex items-center gap-2">
                          <Flag className="w-3 h-3 text-elec-yellow" />
                          <span className="text-sm text-elec-yellow">Flagged</span>
                        </div>
                        <span className="font-bold text-elec-yellow">{flaggedQuestions.size}</span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Question Grid */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-elec-yellow" />
                      Questions
                    </h3>
                    <div className="grid grid-cols-5 gap-2">
                      {examQuestions.map((_, index) => {
                        const isAnswered = selectedAnswers[index] !== -1;
                        const isCurrent = index === currentQuestion;
                        const isFlagged = flaggedQuestions.has(index);
                        
                        return (
                          <button
                            key={index}
                            onClick={() => setCurrentQuestion(index)}
                            className={`
                              relative w-10 h-10 text-xs font-bold rounded-lg transition-all duration-200 border-2
                              ${isCurrent 
                                ? 'bg-elec-yellow text-black border-elec-yellow shadow-lg scale-110' 
                                : isAnswered 
                                  ? 'bg-green-500/30 text-green-400 border-green-500/50 hover:bg-green-500/40' 
                                  : 'bg-[#1a1a1a]/30 text-white border-elec-yellow/30 hover:bg-elec-yellow/20 hover:border-elec-yellow/40'
                              }
                            `}
                          >
                            {index + 1}
                            {isFlagged && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-elec-yellow rounded-full flex items-center justify-center">
                                <Flag className="w-2 h-2 text-white fill-current" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Enhanced Quick Actions */}
                  <div className="space-y-2">
                    <Button
                      onClick={goToNextFlagged}
                      disabled={flaggedQuestions.size === 0}
                      variant="outline"
                      size="sm"
                      className="w-full text-xs border-border/30 text-elec-yellow hover:bg-transparent disabled:opacity-50"
                    >
                      <Flag className="h-3 w-3 mr-2" />
                      Next Flagged ({flaggedQuestions.size})
                    </Button>
                    
                    <div className="text-xs text-center text-white pt-2 border-t border-elec-yellow/30">
                      <div>Exam: AM2</div>
                      <div>Electrical Assessment</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AM2Module8;