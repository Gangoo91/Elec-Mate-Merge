import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Flag, CheckCircle, Clock, BookOpen, Target, TrendingUp, Filter, FileText, X, Eye, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { getRandomQuestions, validateQuestionBank, type Question } from "@/data/apprentice-courses/level2/module6/questionBank";
import { ExamDesktopSidebar } from "@/components/apprentice-courses/ExamDesktopSidebar";
import { ExamMobileLayout } from "@/components/apprentice-courses/ExamMobileLayout";

const Level2Module8MockExam6 = () => {
  useSEO(
    "Mock Exam 6: Inspection, Testing & Certification - Level 2 Module 8",
    "Test your knowledge of electrical inspection, testing procedures, certification requirements, and safe isolation practices for Level 2 electrical installation."
  );

  // Exam state management
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes in seconds
  const [showResults, setShowResults] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [reviewMode, setReviewMode] = useState<'all' | 'correct' | 'incorrect' | 'unanswered' | 'flagged' | boolean>(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'incorrect' | 'unanswered' | 'flagged'>('all');

  // Initialize exam
  const startExam = () => {
    const questions = getRandomQuestions(30, { basic: 40, intermediate: 45, advanced: 15 });
    setExamQuestions(questions);
    setSelectedAnswers({});
    setCurrentQuestion(0);
    setTimeRemaining(45 * 60);
    setShowResults(false);
    setFlaggedQuestions(new Set());
    setExamStarted(true);
    validateQuestionBank(); // Log validation info
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

  // Helper functions
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

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
    setExamStarted(false);
  };

  const toggleFlag = () => {
    const newFlagged = new Set(flaggedQuestions);
    if (newFlagged.has(currentQuestion)) {
      newFlagged.delete(currentQuestion);
    } else {
      newFlagged.add(currentQuestion);
    }
    setFlaggedQuestions(newFlagged);
  };

  const calculateScore = () => {
    let correct = 0;
    examQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: examQuestions.length, percentage: Math.round((correct / examQuestions.length) * 100) };
  };

  const getQuestionStatus = (index: number) => {
    const answer = selectedAnswers[index];
    const isCorrect = answer === examQuestions[index]?.correctAnswer;
    const isAnswered = answer !== undefined;
    
    if (!isAnswered) return { type: "unanswered", color: "text-muted-foreground" };
    if (isCorrect) return { type: "correct", color: "text-green-500" };
    return { type: "incorrect", color: "text-emerald-400" };
  };

  const getFilteredQuestions = () => {
    return examQuestions.map((_, index) => index).filter(index => {
      const status = getQuestionStatus(index);
      const isFlagged = flaggedQuestions.has(index);
      
      switch (reviewFilter) {
        case "correct": return status.type === "correct";
        case "incorrect": return status.type === "incorrect";
        case "unanswered": return status.type === "unanswered";
        case "flagged": return isFlagged;
        default: return true;
      }
    });
  };

  const getSummaryStats = () => {
    const answered = Object.keys(selectedAnswers).length;
    const unanswered = examQuestions.length - answered;
    const flagged = flaggedQuestions.size;
    
    return { answered, unanswered, flagged };
  };

  const goToNextFlagged = () => {
    const flaggedArray = Array.from(flaggedQuestions).sort((a, b) => a - b);
    const currentIndex = flaggedArray.indexOf(currentQuestion);
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < flaggedArray.length) {
      setCurrentQuestion(flaggedArray[nextIndex]);
    } else if (flaggedArray.length > 0) {
      setCurrentQuestion(flaggedArray[0]); // Go to first flagged
    }
  };

  const answeredQuestions = Object.keys(selectedAnswers).length;
  const progressPercentage = (answeredQuestions / examQuestions.length) * 100;

  // Exam start screen
  if (!examStarted && !showResults) {
    return (
      <div className="min-h-screen bg-background p-2 sm:p-4">
        <div>
          <Card className="border-emerald-500/30 bg-card">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
                  <FileText className="h-6 w-6 text-emerald-400" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">Mock Exam 6</h1>
                <h2 className="text-lg text-emerald-400 mb-6">Inspection, Testing & Certification</h2>
                <p className="text-muted-foreground mb-6">
                  Test your knowledge of electrical inspection procedures, testing methods, certification requirements, and safe isolation practices.
                </p>
              </div>

              <div className="bg-background p-4 rounded-xl border border-muted/40 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20">
                    <CheckCircle className="h-3 w-3 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-foreground">Instructions</h3>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed">30 questions randomly selected from Module 6 content</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed">45 minutes time limit</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed">Progress automatically saved</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  onClick={startExam}
                  className="w-full bg-emerald-500 hover:bg-emerald-500/90 text-black font-bold py-3 text-base touch-manipulation min-h-[48px] rounded-lg"
                  size="lg"
                >
                  <div className="flex items-center justify-center gap-3">
                    <FileText className="h-4 w-4" />
                    Start Exam
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Results screen
  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score.correct / examQuestions.length) * 100);
    const stats = getSummaryStats();
    
    if (reviewMode) {
      const filteredQuestions = getFilteredQuestions();
      
      return (
        <div className="min-h-screen bg-background p-2 sm:p-4">
          <div className="max-w-6xl mx-auto">
            {/* Review Header */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-lg sm:text-lg sm:text-xl font-semibold text-foreground">Review Answers</h1>
                  <p className="text-sm text-muted-foreground">Score: {percentage}% ({score.correct}/{examQuestions.length})</p>
                </div>
                <Button
                  onClick={() => setReviewMode(false)}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-emerald-400"
                >
                  <X className="h-4 w-4 mr-2" />
                  Exit Review
                </Button>
              </div>
              
              {/* Summary Stats - Clickable Filters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4">
                <Card 
                  className={`bg-card border-green-500/20 cursor-pointer hover:bg-card transition-colors ${
                    reviewFilter === "correct" ? "ring-2 ring-green-500/50" : ""
                  }`}
                  onClick={() => setReviewFilter(reviewFilter === "correct" ? "all" : "correct")}
                >
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-green-500">{stats.answered - (stats.answered - score.correct)}</div>
                    <div className="text-xs text-muted-foreground">Correct</div>
                  </CardContent>
                </Card>
                <Card 
                  className={`bg-card border-red-500/20 cursor-pointer hover:bg-card transition-colors ${
                    reviewFilter === "incorrect" ? "ring-2 ring-red-500/50" : ""
                  }`}
                  onClick={() => setReviewFilter(reviewFilter === "incorrect" ? "all" : "incorrect")}
                >
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-emerald-400">{stats.answered - score.correct}</div>
                    <div className="text-xs text-muted-foreground">Incorrect</div>
                  </CardContent>
                </Card>
                <Card 
                  className={`bg-card border-muted/20 cursor-pointer hover:bg-muted/10 transition-colors ${
                    reviewFilter === "unanswered" ? "ring-2 ring-muted/50" : ""
                  }`}
                  onClick={() => setReviewFilter(reviewFilter === "unanswered" ? "all" : "unanswered")}
                >
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-muted-foreground">{stats.unanswered}</div>
                    <div className="text-xs text-muted-foreground">Unanswered</div>
                  </CardContent>
                </Card>
                <Card 
                  className={`bg-card border-emerald-500/30 cursor-pointer hover:bg-emerald-500/5 transition-colors ${
                    reviewFilter === "flagged" ? "ring-2 ring-emerald-500/50" : ""
                  }`}
                  onClick={() => setReviewFilter(reviewFilter === "flagged" ? "all" : "flagged")}
                >
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-emerald-400">{stats.flagged}</div>
                    <div className="text-xs text-muted-foreground">Flagged</div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Question List */}
            <div className="space-y-4">
              {filteredQuestions.map(questionIndex => {
                const question = examQuestions[questionIndex];
                const userAnswer = selectedAnswers[questionIndex];
                const correctAnswer = question.correctAnswer;
                const status = getQuestionStatus(questionIndex);
                const isFlagged = flaggedQuestions.has(questionIndex);
                
                return (
                  <Card key={questionIndex} className="bg-card border-emerald-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-base text-foreground font-semibold">
                          Question {questionIndex + 1}
                        </div>
                        <div className="flex items-center gap-2">
                          {isFlagged && (
                            <Badge variant="outline" className="text-emerald-400 border-emerald-500/40">
                              <Flag className="h-3 w-3 mr-1 fill-current" />
                              Flagged
                            </Badge>
                          )}
                          <Badge 
                            variant={status.type === "correct" ? "default" : "destructive"}
                            className={
                              status.type === "correct" 
                                ? "bg-green-500/20 text-green-500 border-green-500/40" 
                                : status.type === "incorrect"
                                ? "bg-red-500/20 text-emerald-400 border-red-500/40"
                                : "bg-muted/20 text-muted-foreground border-muted/40"
                            }
                          >
                            {status.type === "correct" ? "Correct" : status.type === "incorrect" ? "Incorrect" : "Unanswered"}
                          </Badge>
                        </div>
                      </div>
                      
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
                                  ? "border-green-500 bg-card text-green-500"
                                  : isUserAnswer && !isCorrectAnswer
                                  ? "border-red-500 bg-card text-emerald-400"
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
                                  <X className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {question.explanation && (
                        <div className="mt-4 p-3 bg-card rounded-lg border border-emerald-500/30">
                          <div className="flex items-start gap-2">
                            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/20 flex-shrink-0 mt-0.5">
                              <Eye className="h-3 w-3 text-emerald-400" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-1">Explanation</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">{question.explanation}</p>
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
    
    return (
      <div className="min-h-screen bg-background p-2 sm:p-4">
        <div>
          <Card className="border-emerald-500/30 bg-card">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
                  <CheckCircle className="h-6 w-6 text-emerald-400" />
                </div>
                <h1 className="text-xl font-bold text-foreground mb-2">Exam Complete</h1>
                <h2 className="text-lg text-emerald-400">Inspection, Testing & Certification</h2>
              </div>
              
              <div className="bg-background p-6 rounded-xl border border-muted/40 text-center mb-6">
                <div className="text-4xl font-bold text-emerald-400 mb-2">
                  {score.correct}/{examQuestions.length}
                </div>
                <div className="text-xl text-foreground mb-2">
                  {percentage}%
                </div>
                <div className="text-sm text-muted-foreground">
                  {percentage >= 70 ? "Pass - Well done!" : "Additional study recommended"}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-card p-3 rounded-lg border border-green-500/20 text-center">
                  <div className="text-lg font-bold text-green-500">{score.correct}</div>
                  <div className="text-xs text-muted-foreground">Correct</div>
                </div>
                <div className="bg-card p-3 rounded-lg border border-red-500/20 text-center">
                  <div className="text-lg font-bold text-emerald-400">{stats.answered - score.correct}</div>
                  <div className="text-xs text-muted-foreground">Incorrect</div>
                </div>
                <div className="bg-muted/10 p-3 rounded-lg border border-muted/20 text-center">
                  <div className="text-lg font-bold text-muted-foreground">{stats.unanswered}</div>
                  <div className="text-xs text-muted-foreground">Unanswered</div>
                </div>
                <div className="bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/30 text-center">
                  <div className="text-lg font-bold text-emerald-400">{stats.flagged}</div>
                  <div className="text-xs text-muted-foreground">Flagged</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Button 
                  onClick={() => setReviewMode(true)}
                  variant="outline"
                  className="border-emerald-500/40 text-foreground hover:bg-emerald-500/10 py-3 min-h-[48px]"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Review Answers
                </Button>
                <Button 
                  onClick={startExam}
                  className="bg-emerald-500 hover:bg-emerald-500/90 text-black font-bold py-3 min-h-[48px]"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retake Exam
                </Button>
              </div>

              <div className="text-center">
                <Link 
                  to=".."
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Mock Examinations
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Active exam interface
  const currentQ = examQuestions[currentQuestion];
  const stats = getSummaryStats();

  return (
    <div className="min-h-screen bg-background p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link 
              to=".." 
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Exit Exam
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <Clock className="h-4 w-4" />
              <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Panel */}
          <Card className="lg:col-span-3 bg-card border border-emerald-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Question {currentQuestion + 1} of {examQuestions.length}
                  </h2>
                  <div className="text-sm text-muted-foreground mt-1">
                    Section {currentQ?.section} • {currentQ?.difficulty} • {currentQ?.topic}
                  </div>
                </div>
                <Button
                  onClick={toggleFlag}
                  variant="outline"
                  size="sm"
                  className={`border-emerald-500/30 ${
                    flaggedQuestions.has(currentQuestion) 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : 'text-foreground hover:bg-emerald-500/10'
                  }`}
                >
                  <Flag className="h-4 w-4 mr-2" />
                  {flaggedQuestions.has(currentQuestion) ? 'Flagged' : 'Flag'}
                </Button>
              </div>

              <div className="mb-8">
                <p className="text-foreground text-lg leading-relaxed mb-6">
                  {currentQ?.question}
                </p>
                
                <div className="space-y-3">
                  {currentQ?.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left rounded-lg border transition-colors ${
                        selectedAnswers[currentQuestion] === index
                          ? 'bg-emerald-500/20 border-emerald-500 text-foreground'
                          : 'bg-background/30 border-emerald-500/30 text-muted-foreground hover:bg-emerald-500/10 hover:border-emerald-500/40'
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
              <div className="flex justify-between items-center pt-6 border-t border-emerald-500/30">
                <Button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  variant="outline"
                  className="border-emerald-500/30 text-foreground hover:bg-emerald-500/10 disabled:opacity-50"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <div className="flex gap-2">
                  {currentQuestion === examQuestions.length - 1 ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={answeredQuestions === 0}
                      className="bg-emerald-500 hover:bg-emerald-500/90 text-black disabled:opacity-50 text-sm sm:text-sm px-6 py-3 sm:py-3 min-h-[52px] touch-manipulation font-semibold rounded-xl flex-shrink-0"
                      size="sm"
                    >
                      <span className="hidden xs:inline">Submit Exam</span>
                      <span className="xs:hidden">Submit</span>
                      <CheckCircle className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      className="flex-1 sm:flex-initial sm:px-8 bg-emerald-500 hover:bg-emerald-500/90 text-black font-bold py-3 sm:py-3 text-base sm:text-base touch-manipulation min-h-[48px] rounded-lg"
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
          <Card className="bg-card border border-emerald-500/30 shadow-lg">
            <CardContent className="p-4">
              <div className="space-y-6">
                {/* Enhanced Timer */}
                <div className="text-center">
                  <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 p-4 rounded-xl border border-emerald-500/30">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-emerald-400" />
                      <span className="text-sm font-medium text-foreground">Time Remaining</span>
                    </div>
                    <div className="font-mono text-2xl font-bold text-emerald-400">
                      {formatTime(timeRemaining)}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {timeRemaining < 300 ? 'Final 5 minutes!' : 'Stay focused'}
                    </div>
                  </div>
                </div>

                {/* Enhanced Progress */}
                <div>
                  <div className="bg-background/50 p-4 rounded-lg border border-emerald-500/30">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-foreground">Progress</span>
                      <span className="text-lg font-bold text-emerald-400">{answeredQuestions}/{examQuestions.length}</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3 mb-3" />
                    <div className="text-xs text-center text-muted-foreground">
                      {Math.round(progressPercentage)}% Complete
                    </div>
                  </div>
                </div>

                {/* Enhanced Stats */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4 text-emerald-400" />
                    Statistics
                  </h3>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-green-400">Answered</span>
                      </div>
                      <span className="font-bold text-green-400">{stats.answered}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-red-500/20">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-emerald-400">Remaining</span>
                      </div>
                      <span className="font-bold text-emerald-400">{stats.unanswered}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-emerald-500/20">
                      <div className="flex items-center gap-2">
                        <Flag className="w-3 h-3 text-emerald-400" />
                        <span className="text-sm text-emerald-400">Flagged</span>
                      </div>
                      <span className="font-bold text-emerald-400">{stats.flagged}</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Question Grid */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-emerald-400" />
                    Questions
                  </h3>
                  <div className="grid grid-cols-5 gap-2">
                    {examQuestions.map((_, index) => {
                      const isAnswered = selectedAnswers.hasOwnProperty(index);
                      const isCurrent = index === currentQuestion;
                      const isFlagged = flaggedQuestions.has(index);
                      
                      return (
                        <button
                          key={index}
                          onClick={() => setCurrentQuestion(index)}
                          className={`
                            relative w-10 h-10 text-xs font-bold rounded-lg transition-all duration-200 border-2
                            ${isCurrent 
                              ? 'bg-emerald-500 text-black border-emerald-500 shadow-lg scale-110' 
                              : isAnswered 
                                ? 'bg-green-500/30 text-green-400 border-green-500/50 hover:bg-green-500/40' 
                                : 'bg-background/30 text-muted-foreground border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-500/40'
                            }
                          `}
                        >
                          {index + 1}
                          {isFlagged && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full flex items-center justify-center">
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
                    className="w-full text-xs border-border/30 text-emerald-400 hover:bg-card disabled:opacity-50"
                  >
                    <Flag className="h-3 w-3 mr-2" />
                    Next Flagged ({flaggedQuestions.size})
                  </Button>
                  
                  <div className="text-xs text-center text-muted-foreground pt-2 border-t border-emerald-500/30">
                    <div>Exam: Module 6</div>
                    <div>Testing & Certification</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Level2Module8MockExam6;