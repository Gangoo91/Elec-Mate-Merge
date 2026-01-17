import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Flag, CheckCircle, Clock, BookOpen, Target, FileText, X, Eye, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import useSEO from "@/hooks/useSEO";
import { getRandomQuestions } from "@/data/study-centre/apprentice/level3/module7/questionBank";

const Level3Module8MockExam7 = () => {
  useSEO("Mock Exam 7: Career Development | Level 3 Electrical Course", "Test your knowledge of Module 7 career development with this comprehensive 30-question mock exam.");

  const [examQuestions, setExamQuestions] = useState<any[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60 * 45);
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set<number>());
  const [reviewMode, setReviewMode] = useState(false);
  const [reviewFilter, setReviewFilter] = useState("all");

  const startExam = () => {
    const selectedQuestions = getRandomQuestions(30);
    setExamQuestions(selectedQuestions);
    setSelectedAnswers(new Array(30).fill(-1));
    setCurrentQuestion(0);
    setExamStarted(true);
    setShowResults(false);
    setTimeRemaining(60 * 45);
    setFlaggedQuestions(new Set());
  };

  useEffect(() => {
    if (examStarted && !showResults && timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && examStarted && !showResults) {
      handleSubmit();
    }
  }, [timeRemaining, examStarted, showResults]);

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

  const getQuestionStatus = (index: number) => {
    const answer = selectedAnswers[index];
    const isCorrect = answer === examQuestions[index]?.correctAnswer;
    const isAnswered = answer !== -1;

    if (!isAnswered) return { type: "unanswered", color: "text-white/70" };
    if (isCorrect) return { type: "correct", color: "text-green-500" };
    return { type: "incorrect", color: "text-elec-yellow" };
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
    const correct = examQuestions.filter((_, index) => selectedAnswers[index] === examQuestions[index]?.correctAnswer).length;
    const incorrect = examQuestions.filter((_, index) => selectedAnswers[index] !== -1 && selectedAnswers[index] !== examQuestions[index]?.correctAnswer).length;
    const unanswered = examQuestions.filter((_, index) => selectedAnswers[index] === -1).length;
    const flagged = flaggedQuestions.size;

    return { correct, incorrect, unanswered, flagged };
  };

  const goToNextFlagged = () => {
    const flaggedArray = Array.from(flaggedQuestions).sort((a, b) => a - b);
    if (flaggedArray.length > 0) {
      const currentIndex = flaggedArray.indexOf(currentQuestion);
      const nextIndex = (currentIndex + 1) % flaggedArray.length;
      setCurrentQuestion(flaggedArray[nextIndex]);
    }
  };

  const answeredQuestions = selectedAnswers.filter(answer => answer !== -1).length;
  const progressPercentage = examQuestions.length > 0 ? (answeredQuestions / examQuestions.length) * 100 : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!examStarted) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] p-2 sm:p-4">
        <div>
          <Card className="border-elec-yellow/30 bg-transparent">
            <CardHeader className="text-center pb-3 sm:pb-4 px-3 sm:px-6">
              <div className="mx-auto mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-elec-yellow/10">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
              </div>
              <CardTitle className="text-lg sm:text-xl md:text-2xl text-white mb-1">Level 3 Mock Exam 7</CardTitle>
              <h2 className="text-xs sm:text-sm md:text-lg text-elec-yellow">Career Development & Industry</h2>
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
                    <p className="text-sm sm:text-sm text-white/70 leading-relaxed">30 questions randomly selected from 200 Module 7 questions</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 sm:h-1.5 sm:w-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                    <p className="text-sm sm:text-sm text-white/70 leading-relaxed">45 minutes time limit</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-1.5 w-1.5 sm:h-1.5 sm:w-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                    <p className="text-sm sm:text-sm text-white/70 leading-relaxed">Topics: Industry Roles, JIB Grading, Qualifications, CPD, Professional Bodies, Business Skills</p>
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
                  <ArrowRight className="h-4 w-4 sm:h-4 sm:w-4" />
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / examQuestions.length) * 100);
    const stats = getSummaryStats();

    if (reviewMode) {
      const filteredQuestions = getFilteredQuestions();

      return (
        <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] p-2 sm:p-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-lg sm:text-lg sm:text-xl font-semibold text-white">Review Answers</h1>
                  <p className="text-sm text-white/70">Score: {percentage}% ({score}/{examQuestions.length})</p>
                </div>
                <Button
                  onClick={() => setReviewMode(false)}
                  variant="ghost"
                  size="sm"
                  className="text-white/70 hover:text-elec-yellow"
                >
                  <X className="h-4 w-4 mr-2" />
                  Exit Review
                </Button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4">
                <Card
                  className={`bg-transparent border-green-500/20 cursor-pointer hover:bg-transparent transition-colors ${reviewFilter === "correct" ? "ring-2 ring-green-500/50" : ""}`}
                  onClick={() => setReviewFilter(reviewFilter === "correct" ? "all" : "correct")}
                >
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-green-500">{stats.correct}</div>
                    <div className="text-xs text-white/70">Correct</div>
                  </CardContent>
                </Card>
                <Card
                  className={`bg-transparent border-red-500/20 cursor-pointer hover:bg-transparent transition-colors ${reviewFilter === "incorrect" ? "ring-2 ring-red-500/50" : ""}`}
                  onClick={() => setReviewFilter(reviewFilter === "incorrect" ? "all" : "incorrect")}
                >
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-elec-yellow">{stats.incorrect}</div>
                    <div className="text-xs text-white/70">Incorrect</div>
                  </CardContent>
                </Card>
                <Card
                  className={`bg-transparent border-muted/20 cursor-pointer hover:bg-muted/10 transition-colors ${reviewFilter === "unanswered" ? "ring-2 ring-muted/50" : ""}`}
                  onClick={() => setReviewFilter(reviewFilter === "unanswered" ? "all" : "unanswered")}
                >
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-white/70">{stats.unanswered}</div>
                    <div className="text-xs text-white/70">Unanswered</div>
                  </CardContent>
                </Card>
                <Card
                  className={`bg-transparent border-elec-yellow/30 cursor-pointer hover:bg-elec-yellow/5 transition-colors ${reviewFilter === "flagged" ? "ring-2 ring-elec-yellow/50" : ""}`}
                  onClick={() => setReviewFilter(reviewFilter === "flagged" ? "all" : "flagged")}
                >
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-elec-yellow">{stats.flagged}</div>
                    <div className="text-xs text-white/70">Flagged</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-4">
              {filteredQuestions.map(questionIndex => {
                const question = examQuestions[questionIndex];
                const userAnswer = selectedAnswers[questionIndex];
                const correctAnswer = question.correctAnswer;
                const status = getQuestionStatus(questionIndex);
                const isFlagged = flaggedQuestions.has(questionIndex);

                return (
                  <Card key={questionIndex} className="bg-transparent border-elec-yellow/30">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base text-white">Question {questionIndex + 1}</CardTitle>
                        <div className="flex items-center gap-2">
                          {isFlagged && (
                            <Badge variant="outline" className="text-elec-yellow border-elec-yellow/40">
                              <Flag className="h-3 w-3 mr-1 fill-current" />Flagged
                            </Badge>
                          )}
                          <Badge
                            variant={status.type === "correct" ? "default" : "destructive"}
                            className={status.type === "correct" ? "bg-green-500/20 text-green-500 border-green-500/40" : status.type === "incorrect" ? "bg-red-500/20 text-elec-yellow border-red-500/40" : "bg-muted/20 text-white/70 border-muted/40"}
                          >
                            {status.type === "correct" ? "Correct" : status.type === "incorrect" ? "Incorrect" : "Unanswered"}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm leading-relaxed mb-4 font-medium">{question.question}</p>
                      <div className="space-y-2">
                        {question.options.map((option: string, optionIndex: number) => {
                          const isUserAnswer = userAnswer === optionIndex;
                          const isCorrectAnswer = correctAnswer === optionIndex;

                          return (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded-lg border-2 text-sm ${isCorrectAnswer ? "border-green-500 bg-transparent text-green-500" : isUserAnswer && !isCorrectAnswer ? "border-red-500 bg-transparent text-elec-yellow" : "border-muted/40 bg-muted/5"}`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${isCorrectAnswer ? "border-green-500 bg-green-500" : isUserAnswer && !isCorrectAnswer ? "border-red-500 bg-red-500" : "border-muted-foreground"}`}>
                                  {(isUserAnswer || isCorrectAnswer) && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                </div>
                                <span className="flex-1 leading-relaxed">{option}</span>
                                {isCorrectAnswer && <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />}
                                {isUserAnswer && !isCorrectAnswer && <X className="h-4 w-4 text-elec-yellow flex-shrink-0" />}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {question.explanation && (
                        <div className="mt-4 p-3 bg-transparent rounded-lg border border-elec-yellow/30">
                          <div className="flex items-start gap-2">
                            <div className="flex h-5 w-5 items-center justify-center rounded-md bg-elec-yellow/20 flex-shrink-0 mt-0.5">
                              <Eye className="h-3 w-3 text-elec-yellow" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-white mb-1">Explanation</h4>
                              <p className="text-sm text-white/70 leading-relaxed">{question.explanation}</p>
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
      <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a] p-2 sm:p-4">
        <div>
          <Card className="border-elec-yellow/30 bg-transparent">
            <CardHeader className="text-center pb-3 sm:pb-4 px-3 sm:px-6">
              <div className="mx-auto mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-elec-yellow/10">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
              </div>
              <CardTitle className="text-lg sm:text-xl md:text-2xl text-white mb-1">Exam Complete!</CardTitle>
              <h2 className="text-xs sm:text-sm md:text-lg text-elec-yellow">Career Development & Industry</h2>
            </CardHeader>

            <CardContent className="space-y-4 sm:space-y-6 px-3 sm:px-6">
              <div className="text-center bg-[#1a1a1a] p-4 sm:p-6 rounded-xl">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-elec-yellow mb-2">{percentage}%</div>
                <p className="text-xs sm:text-sm text-white/70">You scored {score} out of {examQuestions.length} questions correctly</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                <div className="text-center p-3 bg-transparent rounded-lg border border-green-500/20">
                  <div className="text-lg font-bold text-green-500">{stats.correct}</div>
                  <div className="text-xs text-white/70">Correct</div>
                </div>
                <div className="text-center p-3 bg-transparent rounded-lg border border-red-500/20">
                  <div className="text-lg font-bold text-elec-yellow">{stats.incorrect}</div>
                  <div className="text-xs text-white/70">Incorrect</div>
                </div>
                <div className="text-center p-3 bg-muted/10 rounded-lg border border-muted/20">
                  <div className="text-lg font-bold text-white/70">{stats.unanswered}</div>
                  <div className="text-xs text-white/70">Unanswered</div>
                </div>
                <div className="text-center p-3 bg-elec-yellow/10 rounded-lg border border-elec-yellow/30">
                  <div className="text-lg font-bold text-elec-yellow">{stats.flagged}</div>
                  <div className="text-xs text-white/70">Flagged</div>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <Button
                  onClick={() => { setReviewFilter("all"); setReviewMode(true); }}
                  className="w-full bg-elec-yellow hover:bg-elec-yellow/90 text-black touch-manipulation min-h-[44px]"
                >
                  <Eye className="h-4 w-4 mr-2" />Review Answers
                </Button>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => {
                      setCurrentQuestion(0);
                      setSelectedAnswers([]);
                      setShowResults(false);
                      setExamStarted(false);
                      setTimeRemaining(60 * 45);
                      setReviewMode(false);
                      setReviewFilter("all");
                    }}
                    variant="outline"
                    className="flex-1 border-elec-yellow/40 text-elec-yellow hover:bg-[#1a1a1a] bg-[#1a1a1a] touch-manipulation min-h-[44px]"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />Retake Exam
                  </Button>
                  <Link to="/study-centre/apprentice/level3-course/module8-section7" className="flex-1">
                    <Button variant="outline" className="w-full border-elec-yellow/40 text-elec-yellow hover:bg-[#1a1a1a] bg-[#1a1a1a] touch-manipulation min-h-[44px]">
                      Back to Mock Exams
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#1a1a1a]">
      <div className="border-b border-muted/20 bg-transparent/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/study-centre/apprentice/level3-course/module8-section7" className="text-sm text-white/70 hover:text-elec-yellow transition-colors flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />Exit Exam
            </Link>
            <div className="text-2xl font-bold font-mono text-elec-yellow">{formatTime(timeRemaining)}</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-3 bg-transparent border border-elec-yellow/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-white">Question {currentQuestion + 1} of {examQuestions.length}</h2>
                  <div className="text-sm text-white/70 mt-1">Level 3 Module 7 • Career Development</div>
                </div>
                <Button
                  onClick={toggleFlag}
                  variant="outline"
                  size="sm"
                  className={`border-elec-yellow/30 ${flaggedQuestions.has(currentQuestion) ? 'bg-elec-yellow/20 text-elec-yellow' : 'text-white hover:bg-elec-yellow/10'}`}
                >
                  <Flag className="h-4 w-4 mr-2" />{flaggedQuestions.has(currentQuestion) ? 'Flagged' : 'Flag'}
                </Button>
              </div>

              <div className="mb-8">
                <p className="text-white text-lg leading-relaxed mb-6">{examQuestions[currentQuestion]?.question}</p>
                <div className="space-y-3">
                  {examQuestions[currentQuestion]?.options.map((option: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left rounded-lg border transition-colors ${selectedAnswers[currentQuestion] === index ? 'bg-elec-yellow/20 border-elec-yellow text-white' : 'bg-[#1a1a1a]/30 border-elec-yellow/30 text-white/70 hover:bg-elec-yellow/10 hover:border-elec-yellow/40'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold min-w-[20px]">{String.fromCharCode(65 + index)}.</span>
                        <span>{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-elec-yellow/30">
                <Button onClick={handlePrevious} disabled={currentQuestion === 0} variant="outline" className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10 disabled:opacity-50">
                  <ArrowLeft className="h-4 w-4 mr-2" />Previous
                </Button>
                <div className="flex gap-2">
                  {currentQuestion === examQuestions.length - 1 ? (
                    <Button onClick={handleSubmit} disabled={answeredQuestions === 0} className="bg-elec-yellow hover:bg-elec-yellow/90 text-black disabled:opacity-50 text-sm sm:text-sm px-6 py-3 sm:py-3 min-h-[52px] touch-manipulation font-semibold rounded-xl flex-shrink-0" size="sm">
                      <span className="hidden xs:inline">Submit Exam</span><span className="xs:hidden">Submit</span>
                      <CheckCircle className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={handleNext} className="flex-1 sm:flex-initial sm:px-8 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-bold py-3 sm:py-3 text-base sm:text-base touch-manipulation min-h-[48px] rounded-lg" size="lg">
                      Next<ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-transparent border border-elec-yellow/30 shadow-lg hidden lg:block">
            <CardContent className="p-4">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/10 p-4 rounded-xl border border-elec-yellow/30">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock className="h-5 w-5 text-elec-yellow" />
                      <span className="text-sm font-medium text-white">Time Remaining</span>
                    </div>
                    <div className="font-mono text-2xl font-bold text-elec-yellow">{formatTime(timeRemaining)}</div>
                    <div className="text-xs text-white/70 mt-1">{timeRemaining < 300 ? 'Final 5 minutes!' : 'Stay focused'}</div>
                  </div>
                </div>

                <div>
                  <div className="bg-[#1a1a1a]/50 p-4 rounded-lg border border-elec-yellow/30">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-white">Progress</span>
                      <span className="text-lg font-bold text-elec-yellow">{answeredQuestions}/{examQuestions.length}</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3 mb-3" />
                    <div className="text-xs text-center text-white/70">{Math.round(progressPercentage)}% Complete</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <Target className="h-4 w-4 text-elec-yellow" />Statistics
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between p-3 bg-transparent rounded-lg border border-green-500/20">
                      <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full"></div><span className="text-sm text-green-400">Answered</span></div>
                      <span className="font-bold text-green-400">{answeredQuestions}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-transparent rounded-lg border border-red-500/20">
                      <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div><span className="text-sm text-elec-yellow">Remaining</span></div>
                      <span className="font-bold text-elec-yellow">{examQuestions.length - answeredQuestions}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-transparent rounded-lg border border-elec-yellow/20">
                      <div className="flex items-center gap-2"><Flag className="w-3 h-3 text-elec-yellow" /><span className="text-sm text-elec-yellow">Flagged</span></div>
                      <span className="font-bold text-elec-yellow">{flaggedQuestions.size}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-elec-yellow" />Questions
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
                          className={`relative w-10 h-10 text-xs font-bold rounded-lg transition-all duration-200 border-2 ${isCurrent ? 'bg-elec-yellow text-black border-elec-yellow shadow-lg scale-110' : isAnswered ? 'bg-green-500/30 text-green-400 border-green-500/50 hover:bg-green-500/40' : 'bg-[#1a1a1a]/30 text-white/70 border-elec-yellow/30 hover:bg-elec-yellow/20 hover:border-elec-yellow/40'}`}
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

                <div className="space-y-2">
                  <Button onClick={goToNextFlagged} disabled={flaggedQuestions.size === 0} variant="outline" size="sm" className="w-full text-xs border-white/10/30 text-elec-yellow hover:bg-transparent disabled:opacity-50">
                    <Flag className="h-3 w-3 mr-2" />Next Flagged ({flaggedQuestions.size})
                  </Button>
                  <div className="text-xs text-center text-white/70 pt-2 border-t border-elec-yellow/30">
                    <div>Level 3 Module 7</div>
                    <div>Career Development</div>
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

export default Level3Module8MockExam7;
