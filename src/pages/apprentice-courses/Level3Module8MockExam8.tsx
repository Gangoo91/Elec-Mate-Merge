/**
 * Level 3 Full Practice Exam (AM2-Style)
 *
 * Comprehensive mock exam covering all 7 Level 3 modules
 * - 40 questions balanced across modules
 * - 90 minute time limit
 * - 60% pass mark (24/40)
 * - ExamMobileLayout for mobile-first experience
 * - Category breakdown in results
 */

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Flag, CheckCircle, XCircle, Clock, BookOpen, Target, FileText, X, Eye, RotateCcw, Shuffle, Trophy, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { ExamMobileLayout } from "@/components/apprentice-courses/ExamMobileLayout";
import { ExamDesktopSidebar } from "@/components/apprentice-courses/ExamDesktopSidebar";
import { getBalancedRandomQuestions, getCategoryBreakdown, Question } from "@/data/apprentice-courses/level3/mixed/questionBank";

const EXAM_CONFIG = {
  totalQuestions: 40,
  timeInSeconds: 90 * 60, // 90 minutes
  passPercentage: 60,
  exitPath: "/study-centre/apprentice/level3-module8"
};

const Level3Module8MockExam8 = () => {
  useSEO(
    "Level 3 Full Practice Exam | Comprehensive Mock Assessment",
    "Complete 40-question practice exam covering all Level 3 modules. Balanced difficulty, 90-minute timed conditions, category breakdown."
  );

  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(EXAM_CONFIG.timeInSeconds);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [reviewFilter, setReviewFilter] = useState<'all' | 'correct' | 'incorrect' | 'unanswered' | 'flagged'>('all');

  // Start exam
  const startExam = () => {
    const questions = getBalancedRandomQuestions(EXAM_CONFIG.totalQuestions);
    setExamQuestions(questions);
    setSelectedAnswers(new Array(EXAM_CONFIG.totalQuestions).fill(-1));
    setCurrentQuestion(0);
    setExamStarted(true);
    setShowResults(false);
    setShowReview(false);
    setTimeRemaining(EXAM_CONFIG.timeInSeconds);
    setFlaggedQuestions(new Set());
  };

  // Timer
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

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
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
    return selectedAnswers.reduce((score, answer, index) => {
      return answer === examQuestions[index]?.correctAnswer ? score + 1 : score;
    }, 0);
  };

  const goToNextFlagged = () => {
    const flaggedArray = Array.from(flaggedQuestions).sort((a, b) => a - b);
    if (flaggedArray.length > 0) {
      const currentIndex = flaggedArray.indexOf(currentQuestion);
      const nextIndex = (currentIndex + 1) % flaggedArray.length;
      setCurrentQuestion(flaggedArray[nextIndex]);
    }
  };

  const getQuestionStatus = (index: number) => {
    const answer = selectedAnswers[index];
    const isCorrect = answer === examQuestions[index]?.correctAnswer;
    const isAnswered = answer !== -1;

    if (!isAnswered) return 'unanswered';
    if (isCorrect) return 'correct';
    return 'incorrect';
  };

  const getFilteredQuestions = () => {
    return examQuestions.map((_, index) => index).filter(index => {
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

  const answeredQuestions = selectedAnswers.filter(answer => answer !== -1).length;

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // ========== START SCREEN ==========
  if (!examStarted) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] p-4 flex items-center justify-center">
        <Card className="max-w-md w-full border-elec-yellow/30 bg-transparent">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-elec-yellow/20 to-amber-600/10">
              <Shuffle className="h-7 w-7 text-elec-yellow" />
            </div>
            <CardTitle className="text-xl text-white mb-2">Level 3 Full Practice Exam</CardTitle>
            <p className="text-elec-yellow text-sm">All 7 Modules Combined</p>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="bg-white/[0.02] p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-4 w-4 text-elec-yellow" />
                <span className="font-semibold text-white text-sm">Instructions</span>
              </div>
              <ul className="space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                  <span>40 questions from 1,400+ question bank</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                  <span>90 minutes time limit</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                  <span>60% pass mark (24/40 correct)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                  <span>Balanced across all Level 3 modules</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10">
                <div className="text-lg font-bold text-elec-yellow">40</div>
                <div className="text-xs text-white/50">Questions</div>
              </div>
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/10">
                <div className="text-lg font-bold text-elec-yellow">90</div>
                <div className="text-xs text-white/50">Minutes</div>
              </div>
            </div>

            <Button
              onClick={startExam}
              className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-bold touch-manipulation active:scale-[0.98]"
            >
              <FileText className="h-5 w-5 mr-2" />
              Start Exam
            </Button>

            <Link to={EXAM_CONFIG.exitPath}>
              <Button variant="ghost" className="w-full text-white/50 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Module 8
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ========== RESULTS SCREEN ==========
  if (showResults && !showReview) {
    const score = calculateScore();
    const percentage = Math.round((score / examQuestions.length) * 100);
    const passed = percentage >= EXAM_CONFIG.passPercentage;
    const categoryBreakdown = getCategoryBreakdown(examQuestions, selectedAnswers);
    const correct = score;
    const incorrect = selectedAnswers.filter((a, i) => a !== -1 && a !== examQuestions[i]?.correctAnswer).length;
    const unanswered = selectedAnswers.filter(a => a === -1).length;

    return (
      <div className="min-h-screen bg-[#0d0d0d] p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Pass/Fail Header */}
          <Card className={`border-2 ${passed ? 'border-green-500/40 bg-green-500/5' : 'border-red-500/40 bg-red-500/5'}`}>
            <CardContent className="p-6 text-center">
              <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${passed ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                {passed ? (
                  <Trophy className="h-8 w-8 text-green-400" />
                ) : (
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                )}
              </div>
              <Badge className={`mb-3 ${passed ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                {passed ? 'PASSED' : 'NOT PASSED'}
              </Badge>
              <div className="text-4xl font-bold text-white mb-2">{percentage}%</div>
              <p className="text-white/70">
                {score} out of {examQuestions.length} questions correct
              </p>
              <p className="text-xs text-white/50 mt-2">
                Pass mark: {EXAM_CONFIG.passPercentage}%
              </p>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <div className="text-xl font-bold text-green-400">{correct}</div>
              <div className="text-xs text-white/50">Correct</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <div className="text-xl font-bold text-red-400">{incorrect}</div>
              <div className="text-xs text-white/50">Incorrect</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="text-xl font-bold text-white/70">{unanswered}</div>
              <div className="text-xs text-white/50">Skipped</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
              <div className="text-xl font-bold text-elec-yellow">{flaggedQuestions.size}</div>
              <div className="text-xs text-white/50">Flagged</div>
            </div>
          </div>

          {/* Category Breakdown */}
          <Card className="border-white/10 bg-transparent">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-white flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-elec-yellow" />
                Module Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {categoryBreakdown.map((cat, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-white/80">{cat.label}</span>
                    <span className={`text-sm font-semibold ${cat.percent >= 60 ? 'text-green-400' : 'text-red-400'}`}>
                      {cat.correct}/{cat.total} ({cat.percent}%)
                    </span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${cat.percent >= 60 ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${cat.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => setShowReview(true)}
              className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation"
            >
              <Eye className="h-5 w-5 mr-2" />
              Review Answers
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => {
                  setExamStarted(false);
                  setShowResults(false);
                }}
                variant="outline"
                className="h-11 border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/10"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake
              </Button>
              <Link to={EXAM_CONFIG.exitPath} className="h-11">
                <Button variant="outline" className="w-full h-full border-white/20 text-white/70 hover:text-white">
                  Back to Course
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ========== REVIEW SCREEN ==========
  if (showReview) {
    const filteredQuestions = getFilteredQuestions();
    const score = calculateScore();
    const percentage = Math.round((score / examQuestions.length) * 100);
    const stats = {
      correct: score,
      incorrect: selectedAnswers.filter((a, i) => a !== -1 && a !== examQuestions[i]?.correctAnswer).length,
      unanswered: selectedAnswers.filter(a => a === -1).length,
      flagged: flaggedQuestions.size
    };

    return (
      <div className="min-h-screen bg-[#0d0d0d]">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-[#0d0d0d] border-b border-white/10 p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-white">Review Answers</h1>
              <p className="text-sm text-white/60">Score: {percentage}% ({score}/{examQuestions.length})</p>
            </div>
            <Button
              onClick={() => setShowReview(false)}
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-white"
            >
              <X className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-4 space-y-4">
          {/* Filter Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { key: 'correct' as const, label: 'Correct', count: stats.correct, color: 'green' },
              { key: 'incorrect' as const, label: 'Incorrect', count: stats.incorrect, color: 'red' },
              { key: 'unanswered' as const, label: 'Skipped', count: stats.unanswered, color: 'gray' },
              { key: 'flagged' as const, label: 'Flagged', count: stats.flagged, color: 'yellow' }
            ].map(({ key, label, count, color }) => (
              <button
                key={key}
                onClick={() => setReviewFilter(reviewFilter === key ? 'all' : key)}
                className={`p-3 rounded-xl border-2 text-center transition-all touch-manipulation ${
                  reviewFilter === key
                    ? color === 'green' ? 'border-green-500 bg-green-500/10' :
                      color === 'red' ? 'border-red-500 bg-red-500/10' :
                      color === 'yellow' ? 'border-elec-yellow bg-elec-yellow/10' :
                      'border-white/40 bg-white/5'
                    : 'border-white/10 bg-transparent'
                }`}
              >
                <div className={`text-lg font-bold ${
                  color === 'green' ? 'text-green-400' :
                  color === 'red' ? 'text-red-400' :
                  color === 'yellow' ? 'text-elec-yellow' :
                  'text-white/60'
                }`}>{count}</div>
                <div className="text-xs text-white/50">{label}</div>
              </button>
            ))}
          </div>

          {/* Questions */}
          <div className="space-y-4">
            {filteredQuestions.map(qIndex => {
              const question = examQuestions[qIndex];
              const userAnswer = selectedAnswers[qIndex];
              const correctAnswer = question.correctAnswer;
              const status = getQuestionStatus(qIndex);
              const isFlagged = flaggedQuestions.has(qIndex);

              return (
                <Card key={qIndex} className="border-white/10 bg-transparent">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-base text-white">Question {qIndex + 1}</CardTitle>
                        <p className="text-xs text-white/50 mt-1">{question.module}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {isFlagged && (
                          <Badge variant="outline" className="text-elec-yellow border-elec-yellow/40">
                            <Flag className="h-3 w-3 mr-1 fill-current" />Flagged
                          </Badge>
                        )}
                        <Badge className={
                          status === 'correct' ? 'bg-green-500/20 text-green-400 border-green-500/40' :
                          status === 'incorrect' ? 'bg-red-500/20 text-red-400 border-red-500/40' :
                          'bg-white/10 text-white/60 border-white/20'
                        }>
                          {status === 'correct' ? 'Correct' : status === 'incorrect' ? 'Incorrect' : 'Skipped'}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white mb-4 leading-relaxed">{question.question}</p>
                    <div className="space-y-2">
                      {question.options.map((option, optIndex) => {
                        const isUserAnswer = userAnswer === optIndex;
                        const isCorrectAnswer = correctAnswer === optIndex;

                        return (
                          <div
                            key={optIndex}
                            className={`p-3 rounded-xl border-2 text-sm ${
                              isCorrectAnswer
                                ? 'border-green-500 bg-green-500/10 text-green-400'
                                : isUserAnswer && !isCorrectAnswer
                                ? 'border-red-500 bg-red-500/10 text-red-400'
                                : 'border-white/10 text-white/70'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <span className="font-semibold text-xs mt-0.5">{String.fromCharCode(65 + optIndex)}.</span>
                              <span className="flex-1">{option}</span>
                              {isCorrectAnswer && <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />}
                              {isUserAnswer && !isCorrectAnswer && <XCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {question.explanation && (
                      <div className="mt-4 p-3 rounded-xl bg-elec-yellow/5 border border-elec-yellow/20">
                        <div className="flex items-start gap-2">
                          <Eye className="h-4 w-4 text-elec-yellow flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-semibold text-elec-yellow mb-1">Explanation</p>
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

  // ========== ACTIVE EXAM SCREEN ==========
  const questionContent = (
    <div className="space-y-4">
      {/* Module badge */}
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-xs text-white/60 border-white/20">
          {examQuestions[currentQuestion]?.module || 'Level 3'}
        </Badge>
      </div>

      {/* Question */}
      <p className="text-white text-base leading-relaxed">
        {examQuestions[currentQuestion]?.question}
      </p>

      {/* Options */}
      <div className="space-y-2">
        {examQuestions[currentQuestion]?.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            className={`w-full min-h-[48px] p-3 flex items-center gap-3 rounded-xl border-2 transition-all touch-manipulation active:scale-[0.98] ${
              selectedAnswers[currentQuestion] === index
                ? 'bg-elec-yellow/20 border-elec-yellow'
                : 'bg-white/[0.02] border-white/15 active:border-white/25'
            }`}
          >
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
              selectedAnswers[currentQuestion] === index
                ? 'bg-elec-yellow text-black'
                : 'bg-white/10 text-white/60'
            }`}>
              <span className="text-xs font-bold">{String.fromCharCode(65 + index)}</span>
            </div>
            <span className="text-sm text-white leading-snug text-left">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Layout */}
      <ExamMobileLayout
        examTitle="Level 3 Full Practice"
        currentQuestion={currentQuestion}
        totalQuestions={examQuestions.length}
        timeRemaining={timeRemaining}
        answeredQuestions={answeredQuestions}
        flaggedQuestions={flaggedQuestions}
        selectedAnswers={selectedAnswers}
        onQuestionSelect={setCurrentQuestion}
        onToggleFlag={toggleFlag}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSubmit={handleSubmit}
        exitPath={EXAM_CONFIG.exitPath}
        formatTime={formatTime}
      >
        {questionContent}
      </ExamMobileLayout>

      {/* Desktop Layout */}
      <div className="hidden lg:block min-h-screen bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-4 gap-6">
            {/* Main Question Area */}
            <div className="col-span-3">
              <Card className="border-white/10 bg-transparent">
                <CardHeader className="pb-4 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg text-white">Question {currentQuestion + 1} of {examQuestions.length}</CardTitle>
                      <p className="text-sm text-white/50 mt-1">{examQuestions[currentQuestion]?.module}</p>
                    </div>
                    <Button
                      onClick={toggleFlag}
                      variant="outline"
                      size="sm"
                      className={`border-elec-yellow/30 ${flaggedQuestions.has(currentQuestion) ? 'bg-elec-yellow/20 text-elec-yellow' : 'text-white/60 hover:text-white'}`}
                    >
                      <Flag className={`h-4 w-4 mr-2 ${flaggedQuestions.has(currentQuestion) ? 'fill-current' : ''}`} />
                      {flaggedQuestions.has(currentQuestion) ? 'Flagged' : 'Flag'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-white text-lg leading-relaxed mb-6">{examQuestions[currentQuestion]?.question}</p>
                  <div className="space-y-3">
                    {examQuestions[currentQuestion]?.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                          selectedAnswers[currentQuestion] === index
                            ? 'bg-elec-yellow/20 border-elec-yellow text-white'
                            : 'bg-white/[0.02] border-white/10 text-white/70 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-semibold">{String.fromCharCode(65 + index)}.</span>
                          <span>{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-6 mt-6 border-t border-white/10">
                    <Button
                      onClick={handlePrevious}
                      disabled={currentQuestion === 0}
                      variant="outline"
                      className="border-white/20 text-white/70 hover:text-white disabled:opacity-30"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    {currentQuestion === examQuestions.length - 1 ? (
                      <Button
                        onClick={handleSubmit}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6"
                      >
                        Submit Exam
                        <CheckCircle className="h-4 w-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNext}
                        className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold px-6"
                      >
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Desktop Sidebar */}
            <ExamDesktopSidebar
              timeRemaining={timeRemaining}
              answeredQuestions={answeredQuestions}
              totalQuestions={examQuestions.length}
              flaggedQuestions={flaggedQuestions}
              selectedAnswers={selectedAnswers}
              currentQuestion={currentQuestion}
              onQuestionSelect={setCurrentQuestion}
              onSubmit={handleSubmit}
              exitPath={EXAM_CONFIG.exitPath}
              formatTime={formatTime}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Level3Module8MockExam8;
