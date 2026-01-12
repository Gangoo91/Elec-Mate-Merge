import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Clock, CheckCircle, XCircle, Award, RotateCcw, ArrowLeft, ArrowRight, Home, Flag, Zap } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { evChargingQuestions } from '@/data/upskilling/evChargingQuestions';
import { QuizQuestion } from '@/types/quiz';
import { cn } from '@/lib/utils';

interface SelectedAnswer {
  questionId: number;
  selectedOption: number;
}

const EVChargingMockExam = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Results filter state - URL-based for back button support
  const reviewFilter = (searchParams.get("filter") as 'all' | 'incorrect' | 'flagged' | 'correct') || 'all';
  const setReviewFilter = (filter: 'all' | 'incorrect' | 'flagged' | 'correct') => setSearchParams({ filter }, { replace: false });

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [examQuestions, setExamQuestions] = useState<QuizQuestion[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes in seconds
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [score, setScore] = useState(0);

  const toggleFlag = (questionId: number) => {
    setFlaggedQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const getTimerColor = () => {
    if (timeRemaining > 1800) return 'text-green-400'; // > 30 mins: green
    if (timeRemaining > 900) return 'text-yellow-400';  // > 15 mins: yellow
    return 'text-red-400';                               // < 15 mins: red
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (examStarted && !showResults && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            finishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [examStarted, showResults, timeRemaining]);

  const selectRandomQuestions = () => {
    const shuffled = [...evChargingQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 30);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startExam = () => {
    const questions = selectRandomQuestions();
    setExamQuestions(questions);
    setExamStarted(true);
    setStartTime(new Date());
    setShowResults(false);
    setSelectedAnswers([]);
    setCurrentQuestion(0);
    setTimeRemaining(45 * 60);
    setScore(0);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswer: SelectedAnswer = {
      questionId: examQuestions[currentQuestion].id,
      selectedOption: answerIndex
    };

    setSelectedAnswers(prev => {
      const filtered = prev.filter(a => a.questionId !== examQuestions[currentQuestion].id);
      return [...filtered, newAnswer];
    });
  };

  const getSelectedAnswer = (questionId: number): number | undefined => {
    const answer = selectedAnswers.find(a => a.questionId === questionId);
    return answer?.selectedOption;
  };

  const nextQuestion = () => {
    if (currentQuestion < examQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishExam = () => {
    setEndTime(new Date());
    calculateScore();
    setShowResults(true);
    setExamStarted(false);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    examQuestions.forEach(question => {
      const selectedAnswer = getSelectedAnswer(question.id);
      if (selectedAnswer === question.correctAnswer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
  };

  const resetExam = () => {
    setExamStarted(false);
    setShowResults(false);
    setSelectedAnswers([]);
    setCurrentQuestion(0);
    setTimeRemaining(45 * 60);
    setFlaggedQuestions([]);
    setScore(0);
    setStartTime(null);
    setEndTime(null);
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBadge = (percentage: number) => {
    if (percentage >= 80) return { text: 'Distinction', color: 'bg-green-600' };
    if (percentage >= 70) return { text: 'Merit', color: 'bg-blue-600' };
    if (percentage >= 60) return { text: 'Pass', color: 'bg-yellow-600' };
    return { text: 'Fail', color: 'bg-red-600' };
  };

  const getModulePerformance = () => {
    const moduleScores: { [key: number]: { correct: number; total: number } } = {};
    
    examQuestions.forEach(question => {
      const moduleId = question.moduleId || 1;
      if (!moduleScores[moduleId]) {
        moduleScores[moduleId] = { correct: 0, total: 0 };
      }
      moduleScores[moduleId].total++;
      
      const selectedAnswer = getSelectedAnswer(question.id);
      if (selectedAnswer === question.correctAnswer) {
        moduleScores[moduleId].correct++;
      }
    });

    return Object.entries(moduleScores).map(([moduleId, scores]) => ({
      moduleId: parseInt(moduleId),
      percentage: Math.round((scores.correct / scores.total) * 100),
      correct: scores.correct,
      total: scores.total
    }));
  };

  const getFilteredQuestions = () => {
    return examQuestions.filter((question, index) => {
      const selectedAnswer = getSelectedAnswer(question.id);
      const isCorrect = selectedAnswer === question.correctAnswer;
      const isFlagged = flaggedQuestions.includes(question.id);

      if (reviewFilter === 'incorrect') return !isCorrect;
      if (reviewFilter === 'flagged') return isFlagged;
      if (reviewFilter === 'correct') return isCorrect;
      return true; // 'all'
    });
  };

  // Initial exam view
  if (!examStarted && !showResults) {
    return (
      <div className="min-h-screen bg-elec-dark text-elec-light">
        <div className="container mx-auto px-4 py-8">
          {/* Back to Course Button */}
          <div className="mb-6">
            <Link to="../ev-charging-course">
              <Button
                variant="ghost"
                className="bg-elec-gray text-white hover:bg-[#323232] hover:text-elec-yellow transition-all duration-200 px-4 py-2 rounded-md min-h-[48px]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Course
              </Button>
            </Link>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-elec-gray border-transparent">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Zap className="h-16 w-16 text-elec-yellow" />
                </div>
                <CardTitle className="text-3xl font-bold text-foreground mb-2">
                  EV Charging Mock Examination
                </CardTitle>
                <p className="text-gray-300 text-lg">
                  Test your knowledge of electric vehicle charging systems and installation practices
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-elec-dark border border-gray-600 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-elec-yellow">30</div>
                    <div className="text-sm text-gray-400">Questions</div>
                  </div>
                  <div className="bg-elec-dark border border-gray-600 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-elec-yellow">45</div>
                    <div className="text-sm text-gray-400">Minutes</div>
                  </div>
                  <div className="bg-elec-dark border border-gray-600 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-elec-yellow">60%</div>
                    <div className="text-sm text-gray-400">Pass Mark</div>
                  </div>
                </div>

                <div className="bg-elec-dark border border-gray-600 rounded-lg p-6">
                  <h3 className="text-foreground font-semibold mb-4">Examination Instructions</h3>
                  <ul className="text-gray-300 text-sm space-y-2">
                    <li>• Answer all 30 questions to complete the examination</li>
                    <li>• You have 45 minutes to complete the exam</li>
                    <li>• Questions are randomly selected from a bank of 300 questions</li>
                    <li>• You can flag questions for review and navigate between questions</li>
                    <li>• The exam will auto-submit when time expires</li>
                    <li>• A score of 60% or higher is required to pass</li>
                    <li>• This exam covers all 7 modules of the EV Charging course</li>
                  </ul>
                </div>

                <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
                  <h3 className="text-foreground font-semibold mb-3">Topics Covered</h3>
                  <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-300">
                    <div>• EV charging standards and protocols</div>
                    <div>• Safety requirements and protection</div>
                    <div>• Installation practices and regulations</div>
                    <div>• Testing and commissioning procedures</div>
                    <div>• Load management and grid integration</div>
                    <div>• Maintenance and troubleshooting</div>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <Button
                    onClick={startExam}
                    className="bg-elec-yellow text-black hover:bg-yellow-400 px-8 py-3 text-lg font-semibold min-h-[48px]"
                  >
                    <Award className="mr-2 h-5 w-5" />
                    Begin EV Charging Examination
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Results view
  if (showResults) {
    const percentage = Math.round((score / examQuestions.length) * 100);
    const scoreBadge = getScoreBadge(percentage);
    const duration = startTime && endTime ? Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60)) : 0;
    const modulePerformance = getModulePerformance();
    const avgTimePerQuestion = duration > 0 ? (duration / examQuestions.length).toFixed(1) : 0;
    const incorrectCount = examQuestions.filter(q => getSelectedAnswer(q.id) !== q.correctAnswer).length;
    const flaggedCount = examQuestions.filter(q => flaggedQuestions.includes(q.id)).length;
    const correctCount = score;
    const filteredQuestions = getFilteredQuestions();

    const moduleNames: { [key: number]: string } = {
      1: "Module 1: Introduction to EV Charging",
      2: "Module 2: EVSE Types & Standards",
      3: "Module 3: Electrical Design & Installation",
      4: "Module 4: Earthing & Protection",
      5: "Module 5: Smart Charging & Load Management",
      6: "Module 6: Testing & Commissioning",
      7: "Module 7: OZEV Grants & Compliance"
    };

    return (
      <div className="min-h-screen bg-elec-dark text-elec-light">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              onClick={resetExam}
              variant="ghost"
              className="bg-elec-gray text-white hover:bg-[#323232] hover:text-elec-yellow transition-all duration-200 px-4 py-2 rounded-md min-h-[48px]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Start
            </Button>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="bg-elec-gray border-transparent">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className={`w-20 h-20 ${scoreBadge.color} rounded-full flex items-center justify-center`}>
                    <Award className="w-10 h-10 text-foreground" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-foreground mb-2">
                  Examination Complete
                </CardTitle>
                <Badge className={`${scoreBadge.color} text-foreground text-lg px-4 py-2`}>
                  {scoreBadge.text}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Score Summary */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-elec-dark border border-gray-600 rounded-lg p-4 text-center">
                    <h3 className="text-gray-400 text-sm mb-1">Score</h3>
                    <div className={`text-3xl font-bold ${getScoreColor(percentage)}`}>
                      {score} / {examQuestions.length}
                    </div>
                    <div className="text-foreground text-sm mt-1">{percentage}%</div>
                  </div>
                  <div className="bg-elec-dark border border-gray-600 rounded-lg p-4 text-center">
                    <h3 className="text-gray-400 text-sm mb-1">Grade</h3>
                    <div className="text-3xl font-bold text-foreground">{scoreBadge.text}</div>
                  </div>
                  <div className="bg-elec-dark border border-gray-600 rounded-lg p-4 text-center">
                    <h3 className="text-gray-400 text-sm mb-1">Duration</h3>
                    <div className="text-3xl font-bold text-foreground">{duration}</div>
                    <div className="text-gray-400 text-sm mt-1">minutes</div>
                  </div>
                </div>

                {/* Performance Message */}
                <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
                  <p className={`${getScoreColor(percentage)} font-medium text-center`}>
                    {percentage >= 80 ? "Outstanding performance! You demonstrate excellent understanding of EV charging principles." :
                     percentage >= 70 ? "Good performance! You have a solid grasp of EV charging fundamentals." :
                     percentage >= 60 ? "Satisfactory performance. You meet the minimum requirements but could benefit from further study." :
                     "Unfortunately, you haven't met the pass criteria. Please review the material and try again."}
                  </p>
                </div>

                {/* Performance Breakdown */}
                <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
                  <h3 className="text-foreground font-semibold mb-4">Performance Breakdown</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-400">Correct</span>
                          <span className="text-sm font-medium text-foreground">{correctCount} ({Math.round((correctCount / examQuestions.length) * 100)}%)</span>
                        </div>
                        <Progress value={(correctCount / examQuestions.length) * 100} className="h-2" />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-400">Incorrect</span>
                          <span className="text-sm font-medium text-foreground">{incorrectCount} ({Math.round((incorrectCount / examQuestions.length) * 100)}%)</span>
                        </div>
                        <Progress value={(incorrectCount / examQuestions.length) * 100} className="h-2 [&>div]:bg-red-500" />
                      </div>
                    </div>
                    {flaggedCount > 0 && (
                      <div className="flex items-center gap-3">
                        <Flag className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-400">Flagged for Review</span>
                            <span className="text-sm font-medium text-foreground">{flaggedCount} ({Math.round((flaggedCount / examQuestions.length) * 100)}%)</span>
                          </div>
                          <Progress value={(flaggedCount / examQuestions.length) * 100} className="h-2" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Module Performance */}
                <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
                  <h3 className="text-foreground font-semibold mb-4">Module Performance</h3>
                  <div className="space-y-3">
                    {modulePerformance.map((module) => (
                      <div key={module.moduleId}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-400">{moduleNames[module.moduleId] || `Module ${module.moduleId}`}</span>
                          <span className="text-sm font-medium text-foreground">{module.correct}/{module.total} ({module.percentage}%)</span>
                        </div>
                        <Progress value={module.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time Analytics */}
                <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
                  <h3 className="text-foreground font-semibold mb-4">Time Analytics</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-400">Time Taken</div>
                      <div className="text-2xl font-bold text-foreground">{duration} min</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Time Allowed</div>
                      <div className="text-2xl font-bold text-foreground">45 min</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Efficiency</div>
                      <div className="text-2xl font-bold text-foreground">{Math.round((duration / 45) * 100)}%</div>
                    </div>
                  </div>
                </div>

                {/* Review Filters */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-foreground font-semibold">Question Review</h3>
                    <Tabs value={reviewFilter} onValueChange={(v) => setReviewFilter(v as any)} className="w-auto">
                      <TabsList className="grid grid-cols-4 bg-elec-dark">
                        <TabsTrigger value="all">All ({examQuestions.length})</TabsTrigger>
                        <TabsTrigger value="incorrect">Incorrect ({incorrectCount})</TabsTrigger>
                        <TabsTrigger value="flagged">Flagged ({flaggedCount})</TabsTrigger>
                        <TabsTrigger value="correct">Correct ({correctCount})</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  <div className="space-y-4">
                    {filteredQuestions.map((question, idx) => {
                      const selectedAnswer = getSelectedAnswer(question.id);
                      const isCorrect = selectedAnswer === question.correctAnswer;
                      const isFlagged = flaggedQuestions.includes(question.id);
                      const originalIndex = examQuestions.findIndex(q => q.id === question.id);
                      
                      return (
                        <div
                          key={question.id}
                          className="bg-elec-gray border border-gray-600 rounded-lg p-4"
                        >
                          <div className="flex items-start gap-3 mb-2">
                            {isCorrect ? (
                              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-1" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-1" />
                            )}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-foreground font-semibold">Question {originalIndex + 1}</span>
                                {isFlagged && <Flag className="h-4 w-4 text-elec-yellow" />}
                              </div>
                              <p className="text-foreground mb-3">{question.question}</p>
                              <div className="space-y-2">
                                {question.options.map((option, optionIdx) => (
                                  <div
                                    key={optionIdx}
                                    className={cn(
                                      "p-2 rounded text-sm",
                                      optionIdx === question.correctAnswer && "bg-green-900/30 border border-green-600 text-green-200",
                                      optionIdx === selectedAnswer && optionIdx !== question.correctAnswer && "bg-red-900/30 border border-red-600 text-red-200",
                                      optionIdx !== question.correctAnswer && optionIdx !== selectedAnswer && "bg-elec-dark text-gray-400"
                                    )}
                                  >
                                    {String.fromCharCode(65 + optionIdx)}) {option}
                                  </div>
                                ))}
                              </div>
                              {question.explanation && (
                                <div className="mt-3 p-3 bg-elec-dark rounded border border-gray-600">
                                  <p className="text-sm text-gray-300">
                                    <span className="font-semibold text-foreground">Explanation: </span>
                                    {question.explanation}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4 mt-6">
                  <Button
                    onClick={resetExam}
                    className="bg-elec-yellow text-black hover:bg-yellow-400 px-6 py-2 font-semibold min-h-[48px]"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Take Another Exam
                  </Button>
                  <Link to="../ev-charging-course">
                    <Button
                      variant="outline"
                      className="border-gray-600 text-white hover:bg-elec-gray hover:text-elec-yellow px-6 py-2 min-h-[48px]"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Back to Course
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Active exam view
  if (examStarted && examQuestions.length > 0) {
    const currentQ = examQuestions[currentQuestion];
    const selectedAnswer = getSelectedAnswer(currentQ.id);
    const progress = ((currentQuestion + 1) / examQuestions.length) * 100;
    const answeredCount = examQuestions.filter(q => getSelectedAnswer(q.id) !== undefined).length;

    return (
      <div className="min-h-screen bg-elec-dark text-elec-light">
        <div className="container mx-auto px-4 py-6">
          {/* Back Button */}
          <div className="mb-4">
            <Button
              onClick={resetExam}
              variant="ghost"
              className="bg-elec-gray text-white hover:bg-[#323232] hover:text-elec-yellow transition-all duration-200 px-4 py-2 rounded-md min-h-[48px]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Start
            </Button>
          </div>
          <div className="max-w-4xl mx-auto">
            {/* Header with timer and progress */}
            <Card className="bg-elec-gray border-transparent mb-6">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                  <div className="flex items-center gap-4">
                    <Clock className="w-5 h-5 text-elec-yellow" />
                    <span className={`text-lg font-semibold ${getTimerColor()}`}>
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    {flaggedQuestions.length > 0 && (
                      <div className="flex items-center gap-1 text-yellow-400">
                        <Flag className="w-4 h-4" />
                        <span className="text-sm">{flaggedQuestions.length}</span>
                      </div>
                    )}
                    <div className="text-sm text-gray-400">
                      {answeredCount}/{examQuestions.length} answered
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-foreground">
                    Question {currentQuestion + 1} of {examQuestions.length}
                  </div>
                </div>
                <Progress value={progress} className="h-2" />
              </CardContent>
            </Card>

            {/* Question */}
            <Card className="bg-elec-gray border-transparent mb-6">
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <CardTitle className="text-xl text-foreground flex-1">
                    {currentQ.question}
                  </CardTitle>
                  <Button
                    onClick={() => toggleFlag(currentQ.id)}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "flex-shrink-0 min-h-[48px]",
                      flaggedQuestions.includes(currentQ.id)
                        ? "text-yellow-400 hover:text-yellow-300"
                        : "text-gray-500 hover:text-gray-400"
                    )}
                  >
                    <Flag className="w-5 h-5" fill={flaggedQuestions.includes(currentQ.id) ? "currentColor" : "none"} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200 min-h-[48px] ${
                      selectedAnswer === index
                        ? 'border-elec-yellow bg-elec-yellow/20 text-white'
                        : 'border-gray-600 bg-elec-dark text-white hover:border-gray-500 hover:bg-elec-gray'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selectedAnswer === index
                          ? 'border-elec-yellow bg-elec-yellow'
                          : 'border-gray-600'
                      }`}>
                        {selectedAnswer === index && (
                          <div className="w-2 h-2 rounded-full bg-black"></div>
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Navigation */}
            <Card className="bg-elec-gray border-transparent mb-6">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <Button
                    onClick={previousQuestion}
                    disabled={currentQuestion === 0}
                    variant="outline"
                    className="border-gray-600 text-white hover:bg-[#323232] hover:text-white disabled:opacity-50 min-h-[48px]"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  
                  <div className="flex space-x-4">
                    {currentQuestion === examQuestions.length - 1 ? (
                      <Button
                        onClick={finishExam}
                        className="bg-elec-yellow text-black hover:bg-yellow-400 font-semibold min-h-[48px]"
                      >
                        Finish Exam
                      </Button>
                    ) : (
                      <Button
                        onClick={nextQuestion}
                        className="bg-elec-yellow text-black hover:bg-yellow-400 font-semibold min-h-[48px]"
                      >
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Question Navigation Grid */}
            <Card className="bg-elec-gray border-transparent">
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold text-gray-400 mb-3">Question Navigator</h3>
                <div className="grid grid-cols-10 gap-2">
                  {examQuestions.map((q, idx) => {
                    const answered = getSelectedAnswer(q.id) !== undefined;
                    const flagged = flaggedQuestions.includes(q.id);
                    const current = idx === currentQuestion;
                    
                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQuestion(idx)}
                        className={cn(
                          "relative w-10 h-10 min-h-[48px] rounded-full border-2 flex items-center justify-center text-xs font-semibold transition-all",
                          current && "ring-2 ring-elec-yellow ring-offset-2 ring-offset-elec-dark",
                          answered
                            ? "bg-elec-yellow text-black border-elec-yellow"
                            : "bg-transparent text-white border-gray-600 hover:border-gray-500"
                        )}
                      >
                        {idx + 1}
                        {flagged && (
                          <Flag className="absolute -top-1 -right-1 w-3 h-3 text-red-500" fill="currentColor" />
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-elec-yellow rounded-full border-2 border-elec-yellow"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-transparent rounded-full border-2 border-gray-600"></div>
                    <span>Unanswered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flag className="w-4 h-4 text-red-500" fill="currentColor" />
                    <span>Flagged</span>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default EVChargingMockExam;