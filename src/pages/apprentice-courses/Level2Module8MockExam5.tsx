import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Flag, CheckCircle, Clock, BookOpen, Target, TrendingUp, Filter, FileText, X, Eye, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { getRandomQuestions } from "@/data/apprentice-courses/level2/module5/questionBank";
import { ExamDesktopSidebar } from "@/components/apprentice-courses/ExamDesktopSidebar";
import { ExamMobileLayout } from "@/components/apprentice-courses/ExamMobileLayout";

const Level2Module8MockExam5 = () => {
  useSEO(
    "Mock Exam 5: Design, Planning & Communication - Level 2 Module 8",
    "Test your knowledge of electrical design principles, planning techniques, documentation, and communication skills for Level 2 electrical installation."
  );

  // Exam state management
  const [examQuestions, setExamQuestions] = useState<any[]>([]);
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
    // Questions loaded successfully
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

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle answer selection
  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  // Navigation functions
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
    let correct = 0;
    examQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return { correct };
  };

  // Get question status for review
  const getQuestionStatus = (index: number) => {
    const userAnswer = selectedAnswers[index];
    const correctAnswer = examQuestions[index]?.correctAnswer;
    
    if (userAnswer === undefined) return { type: 'unanswered' };
    return { type: userAnswer === correctAnswer ? 'correct' : 'incorrect' };
  };

  // Filter questions for review mode
  const getFilteredQuestions = () => {
    if (reviewFilter === 'all') return examQuestions.map((_, index) => index);
    
    return examQuestions.map((_, index) => index).filter(index => {
      const status = getQuestionStatus(index);
      if (reviewFilter === 'flagged') {
        return flaggedQuestions.has(index);
      }
      return status.type === reviewFilter;
    });
  };

  // Get summary statistics
  const getSummaryStats = () => {
    const answered = Object.keys(selectedAnswers).length;
    const unanswered = examQuestions.length - answered;
    const flagged = flaggedQuestions.size;
    
    let correct = 0;
    let incorrect = 0;
    
    if (showResults) {
      examQuestions.forEach((question, index) => {
        const userAnswer = selectedAnswers[index];
        if (userAnswer !== undefined) {
          if (userAnswer === question.correctAnswer) {
            correct++;
          } else {
            incorrect++;
          }
        }
      });
    }
    
    return { answered, unanswered, flagged, correct, incorrect };
  };

  // Go to next flagged question
  const goToNextFlagged = () => {
    const flaggedArray = Array.from(flaggedQuestions).sort((a, b) => a - b);
    const currentIndex = flaggedArray.indexOf(currentQuestion);
    
    if (currentIndex !== -1 && currentIndex < flaggedArray.length - 1) {
      setCurrentQuestion(flaggedArray[currentIndex + 1]);
    } else if (flaggedArray.length > 0) {
      setCurrentQuestion(flaggedArray[0]);
    }
  };

  // Before exam starts
  if (!examStarted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-card border-elec-yellow/30">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Module 5: Design, Planning & Communication
                </h1>
                <p className="text-white/80">
                  Level 2 Electrical Installation - Mock Exam 5
                </p>
              </div>

              <div className="bg-background/50 p-6 rounded-lg border border-elec-yellow/30">
                <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">Exam Instructions</h2>
                <ul className="text-sm text-white/80 space-y-2 text-left">
                  <li>• 30 questions covering design principles, planning, and communication</li>
                  <li>• 45 minutes time limit</li>
                  <li>• You can flag questions for review</li>
                  <li>• Navigate between questions freely</li>
                  <li>• Submit when ready or time expires</li>
                </ul>
              </div>

              <Button 
                onClick={startExam}
                className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-bold text-lg px-12 py-4"
                size="lg"
              >
                Start Exam
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
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
                  <p className="text-sm text-white/80">Score: {percentage}% ({score.correct}/{examQuestions.length})</p>
                </div>
                <Button
                  onClick={() => setReviewMode(false)}
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-elec-yellow"
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
                    <div className="text-xs text-white/80">Correct</div>
                  </CardContent>
                </Card>
                <Card 
                  className={`bg-card border-red-500/20 cursor-pointer hover:bg-card transition-colors ${
                    reviewFilter === "incorrect" ? "ring-2 ring-red-500/50" : ""
                  }`}
                  onClick={() => setReviewFilter(reviewFilter === "incorrect" ? "all" : "incorrect")}
                >
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-elec-yellow">{stats.answered - score.correct}</div>
                    <div className="text-xs text-white/80">Incorrect</div>
                  </CardContent>
                </Card>
                <Card 
                  className={`bg-card border-muted/20 cursor-pointer hover:bg-muted/10 transition-colors ${
                    reviewFilter === "unanswered" ? "ring-2 ring-muted/50" : ""
                  }`}
                  onClick={() => setReviewFilter(reviewFilter === "unanswered" ? "all" : "unanswered")}
                >
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-white/80">{stats.unanswered}</div>
                    <div className="text-xs text-white/80">Unanswered</div>
                  </CardContent>
                </Card>
                <Card 
                  className={`bg-card border-elec-yellow/30 cursor-pointer hover:bg-elec-yellow/5 transition-colors ${
                    reviewFilter === "flagged" ? "ring-2 ring-elec-yellow/50" : ""
                  }`}
                  onClick={() => setReviewFilter(reviewFilter === "flagged" ? "all" : "flagged")}
                >
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-elec-yellow">{stats.flagged}</div>
                    <div className="text-xs text-white/80">Flagged</div>
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
                  <Card key={questionIndex} className="bg-card border-elec-yellow/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-base text-foreground font-semibold">
                          Question {questionIndex + 1}
                        </div>
                        <div className="flex items-center gap-2">
                          {isFlagged && (
                            <Badge variant="outline" className="text-elec-yellow border-elec-yellow/40">
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
                                ? "bg-red-500/20 text-elec-yellow border-red-500/40"
                                : "bg-muted/20 text-white/80 border-muted/40"
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
                                  ? "border-red-500 bg-card text-elec-yellow"
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
                                  <X className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {question.explanation && (
                        <div className="mt-4 p-3 bg-card rounded-lg border border-elec-yellow/30">
                          <div className="flex items-start gap-2">
                            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-elec-yellow/20 flex-shrink-0 mt-0.5">
                              <Eye className="h-3 w-3 text-elec-yellow" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-1">Explanation</h4>
                              <p className="text-sm text-white/80 leading-relaxed">{question.explanation}</p>
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

    // Main results screen
    return (
      <div className="min-h-screen bg-background p-2 sm:p-4">
        <div>
          <Card className="border-elec-yellow/30 bg-card">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-elec-yellow/10">
                  <CheckCircle className="h-6 w-6 text-elec-yellow" />
                </div>
                <h1 className="text-xl font-bold text-foreground mb-2">Exam Complete</h1>
                <h2 className="text-lg text-elec-yellow">Design, Planning & Communication</h2>
              </div>
              
              <div className="bg-background p-6 rounded-xl border border-muted/40 text-center mb-6">
                <div className="text-4xl font-bold text-elec-yellow mb-2">
                  {score.correct}/{examQuestions.length}
                </div>
                <div className="text-xl text-foreground mb-2">
                  {percentage}%
                </div>
                <div className="text-sm text-white/80">
                  {percentage >= 70 ? "Pass - Well done!" : "Additional study recommended"}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="bg-card p-3 rounded-lg border border-green-500/20 text-center">
                  <div className="text-lg font-bold text-green-500">{score.correct}</div>
                  <div className="text-xs text-white/80">Correct</div>
                </div>
                <div className="bg-card p-3 rounded-lg border border-red-500/20 text-center">
                  <div className="text-lg font-bold text-elec-yellow">{stats.answered - score.correct}</div>
                  <div className="text-xs text-white/80">Incorrect</div>
                </div>
                <div className="bg-muted/10 p-3 rounded-lg border border-muted/20 text-center">
                  <div className="text-lg font-bold text-white/80">{stats.unanswered}</div>
                  <div className="text-xs text-white/80">Unanswered</div>
                </div>
                <div className="bg-elec-yellow/10 p-3 rounded-lg border border-elec-yellow/30 text-center">
                  <div className="text-lg font-bold text-elec-yellow">{stats.flagged}</div>
                  <div className="text-xs text-white/80">Flagged</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Button 
                  onClick={() => setReviewMode(true)}
                  variant="outline"
                  className="border-elec-yellow/40 text-foreground hover:bg-elec-yellow/10 py-3 min-h-[48px]"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Review Answers
                </Button>
                <Button 
                  onClick={startExam}
                  className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-bold py-3 min-h-[48px]"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retake Exam
                </Button>
              </div>

              <div className="text-center">
                <Link 
                  to=".."
                  className="inline-flex items-components gap-2 text-sm text-white/80 hover:text-elec-yellow transition-colors"
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
  const answeredQuestions = Object.keys(selectedAnswers).length;
  const progressPercentage = (answeredQuestions / examQuestions.length) * 100;
  const stats = getSummaryStats();

  return (
    <div className="min-h-screen bg-background p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link 
              to=".." 
              className="inline-flex items-center text-white/80 hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Exit Exam
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-elec-yellow">
              <Clock className="h-4 w-4" />
              <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Panel */}
          <Card className="lg:col-span-3 bg-card border border-elec-yellow/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Question {currentQuestion + 1} of {examQuestions.length}
                  </h2>
                  <div className="text-sm text-white/80 mt-1">
                    Section {currentQ?.section} • {currentQ?.difficulty} • {currentQ?.topic}
                  </div>
                </div>
                <Button
                  onClick={toggleFlag}
                  variant="outline"
                  size="sm"
                  className={`border-elec-yellow/30 ${
                    flaggedQuestions.has(currentQuestion) 
                      ? 'bg-elec-yellow/20 text-elec-yellow' 
                      : 'text-foreground hover:bg-elec-yellow/10'
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
                          ? 'bg-elec-yellow/20 border-elec-yellow text-foreground'
                          : 'bg-background/30 border-elec-yellow/30 text-white/80 hover:bg-elec-yellow/10 hover:border-elec-yellow/40'
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
                  className="border-elec-yellow/30 text-foreground hover:bg-elec-yellow/10 disabled:opacity-50"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <div className="flex gap-2">
                  {currentQuestion === examQuestions.length - 1 ? (
                    <Button
                      onClick={handleSubmit}
                      disabled={answeredQuestions === 0}
                      className="bg-elec-yellow hover:bg-elec-yellow/90 text-black disabled:opacity-50 text-sm sm:text-sm px-6 py-3 sm:py-3 min-h-[52px] touch-manipulation font-semibold rounded-xl flex-shrink-0"
                      size="sm"
                    >
                      <span className="hidden xs:inline">Submit Exam</span>
                      <span className="xs:hidden">Submit</span>
                      <CheckCircle className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      className="flex-1 sm:flex-initial sm:px-8 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-bold py-3 sm:py-3 text-base sm:text-base touch-manipulation min-h-[48px] rounded-lg"
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
          <Card className="bg-card border border-elec-yellow/30 shadow-lg">
            <CardContent className="p-4">
              <div className="space-y-6">
                {/* Enhanced Timer */}
                <div className="text-center">
                  <div className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/10 p-4 rounded-xl border border-elec-yellow/30">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-elec-yellow" />
                      <span className="text-sm font-medium text-foreground">Time Remaining</span>
                    </div>
                    <div className="font-mono text-2xl font-bold text-elec-yellow">
                      {formatTime(timeRemaining)}
                    </div>
                    <div className="text-xs text-white/80 mt-1">
                      {timeRemaining < 300 ? 'Final 5 minutes!' : 'Stay focused'}
                    </div>
                  </div>
                </div>

                {/* Enhanced Progress */}
                <div>
                  <div className="bg-background/50 p-4 rounded-lg border border-elec-yellow/30">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-foreground">Progress</span>
                      <span className="text-lg font-bold text-elec-yellow">{answeredQuestions}/{examQuestions.length}</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3 mb-3" />
                    <div className="text-xs text-center text-white/80">
                      {Math.round(progressPercentage)}% Complete
                    </div>
                  </div>
                </div>

                {/* Enhanced Stats */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4 text-elec-yellow" />
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
                        <span className="text-sm text-elec-yellow">Remaining</span>
                      </div>
                      <span className="font-bold text-elec-yellow">{stats.unanswered}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-elec-yellow/20">
                      <div className="flex items-center gap-2">
                        <Flag className="w-3 h-3 text-elec-yellow" />
                        <span className="text-sm text-elec-yellow">Flagged</span>
                      </div>
                      <span className="font-bold text-elec-yellow">{stats.flagged}</span>
                    </div>
                  </div>
                </div>

                {/* Enhanced Question Grid */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-elec-yellow" />
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
                              ? 'bg-elec-yellow text-black border-elec-yellow shadow-lg scale-110' 
                              : isAnswered 
                                ? 'bg-green-500/30 text-green-400 border-green-500/50 hover:bg-green-500/40' 
                                : 'bg-background/30 text-white/80 border-elec-yellow/30 hover:bg-elec-yellow/20 hover:border-elec-yellow/40'
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
                    className="w-full text-xs border-border/30 text-elec-yellow hover:bg-card disabled:opacity-50"
                  >
                    <Flag className="h-3 w-3 mr-2" />
                    Next Flagged ({flaggedQuestions.size})
                  </Button>
                  
                  <div className="text-xs text-center text-white/80 pt-2 border-t border-elec-yellow/30">
                    <div>Exam: Module 5</div>
                    <div>Design & Communication</div>
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

export default Level2Module8MockExam5;