import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Clock, AlertTriangle, RotateCcw, ArrowLeft } from 'lucide-react';
import { renewableEnergyMockExamQuestions } from '@/data/upskilling/renewableEnergyMockExamData';
import { Link } from 'react-router-dom';

interface SelectedAnswer {
  questionId: number;
  selectedOption: number;
}

const RenewableEnergyMockExam = () => {
  const [examStarted, setExamStarted] = useState(false);
  const [examFinished, setExamFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes in seconds
  const [examQuestions, setExamQuestions] = useState<typeof renewableEnergyMockExamQuestions>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Select random 30 questions when exam starts
  const selectRandomQuestions = useCallback(() => {
    const shuffled = [...renewableEnergyMockExamQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 30);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (examStarted && !examFinished && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setExamFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [examStarted, examFinished, timeRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startExam = () => {
    const questions = selectRandomQuestions();
    setExamQuestions(questions);
    setExamStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setTimeRemaining(3600);
    setExamFinished(false);
    setShowResults(false);
    setScore(0);
  };

  const handleAnswerSelect = (questionId: number, selectedOption: number) => {
    setSelectedAnswers(prev => {
      const existingIndex = prev.findIndex(answer => answer.questionId === questionId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { questionId, selectedOption };
        return updated;
      } else {
        return [...prev, { questionId, selectedOption }];
      }
    });
  };

  const getSelectedAnswer = (questionId: number) => {
    return selectedAnswers.find(answer => answer.questionId === questionId)?.selectedOption;
  };

  const nextQuestion = () => {
    if (currentQuestion < examQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const finishExam = () => {
    setExamFinished(true);
    calculateScore();
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    examQuestions.forEach(question => {
      const selectedAnswer = getSelectedAnswer(question.id);
      if (selectedAnswer === question.correct) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setShowResults(true);
  };

  const resetExam = () => {
    setExamStarted(false);
    setExamFinished(false);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setTimeRemaining(3600);
    setExamQuestions([]);
    setShowResults(false);
    setScore(0);
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBadge = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'Excellent';
    if (percentage >= 70) return 'Good';
    if (percentage >= 60) return 'Pass';
    return 'Needs Improvement';
  };

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-elec-dark text-elec-light">
        <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <Link to="/renewable-energy-course">
            <Button
              variant="ghost"
              className="text-elec-light hover:bg-elec-gray hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Course
            </Button>
          </Link>
          
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                Renewable Energy Mock Exam
              </h1>
              <p className="text-lg sm:text-xl text-foreground">
                Test your knowledge with 30 questions covering the entire course
              </p>
            </div>

            <Card className="bg-elec-gray border-transparent">
              <CardHeader className="pb-4">
                <CardTitle className="text-foreground text-xl sm:text-2xl text-center">Exam Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-foreground">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-foreground font-bold text-lg">Exam Details:</h3>
                    <ul className="space-y-3 text-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow font-bold">•</span>
                        <span><strong className="text-foreground">Questions:</strong> 30 randomly selected from 300 question bank</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow font-bold">•</span>
                        <span><strong className="text-foreground">Time Limit:</strong> 60 minutes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow font-bold">•</span>
                        <span><strong className="text-foreground">Format:</strong> Multiple choice questions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow font-bold">•</span>
                        <span><strong className="text-foreground">Pass Mark:</strong> 70% (21 out of 30 questions)</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-foreground font-bold text-lg">Instructions:</h3>
                    <ul className="space-y-3 text-foreground">
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow font-bold">•</span>
                        <span>Read each question carefully</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow font-bold">•</span>
                        <span>Select the best answer for each question</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow font-bold">•</span>
                        <span>You can navigate between questions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-elec-yellow font-bold">•</span>
                        <span>Submit your exam before time expires</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-6 mt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="h-6 w-6 text-yellow-400" />
                    <h4 className="text-yellow-400 font-bold text-lg">Important Notes:</h4>
                  </div>
                  <ul className="text-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 font-bold">•</span>
                      <span>Once you start, the timer will begin immediately</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 font-bold">•</span>
                      <span>The exam will auto-submit when time expires</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 font-bold">•</span>
                      <span>Make sure you have a stable internet connection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-yellow-400 font-bold">•</span>
                      <span>This exam covers all modules from the renewable energy course</span>
                    </li>
                  </ul>
                </div>

                <div className="text-center pt-8">
                  <Button 
                    onClick={startExam}
                    className="bg-elec-yellow text-elec-dark hover:bg-yellow-600 px-8 py-4 text-lg font-bold rounded-lg"
                  >
                    Start Mock Exam
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const percentage = Math.round((score / examQuestions.length) * 100);
    const passed = percentage >= 70;

    return (
      <div className="min-h-screen bg-elec-dark text-elec-light">
        <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          <Link to="/renewable-energy-course">
            <Button
              variant="ghost"
              className="text-elec-light hover:bg-elec-gray hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Course
            </Button>
          </Link>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-3">
              <h1 className="text-2xl font-bold text-foreground">Exam Results</h1>
            </div>

            <Card className="bg-elec-gray border-transparent">
              <CardHeader>
                <CardTitle className="text-foreground text-center">Your Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className={`text-6xl font-bold ${getScoreColor(score, examQuestions.length)}`}>
                    {percentage}%
                  </div>
                  <div className="space-y-2">
                    <Badge variant={passed ? "default" : "destructive"} className="text-lg px-4 py-2">
                      {getScoreBadge(score, examQuestions.length)}
                    </Badge>
                    <p className="text-gray-300">
                      You answered <strong>{score}</strong> out of <strong>{examQuestions.length}</strong> questions correctly
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-green-900/20 p-4 rounded border border-green-500/30">
                    <div className="text-green-400 text-2xl font-bold">{score}</div>
                    <div className="text-gray-300">Correct</div>
                  </div>
                  <div className="bg-red-900/20 p-4 rounded border border-red-500/30">
                    <div className="text-red-400 text-2xl font-bold">{examQuestions.length - score}</div>
                    <div className="text-gray-300">Incorrect</div>
                  </div>
                  <div className="bg-blue-900/20 p-4 rounded border border-blue-500/30">
                    <div className="text-blue-400 text-2xl font-bold">{examQuestions.length - selectedAnswers.length}</div>
                    <div className="text-gray-300">Unanswered</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-foreground font-semibold">Question Review:</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {examQuestions.map((question, index) => {
                      const selectedAnswer = getSelectedAnswer(question.id);
                      const isCorrect = selectedAnswer === question.correct;
                      const wasAnswered = selectedAnswer !== undefined;

                      return (
                        <div key={question.id} className="bg-elec-dark p-4 rounded border border-gray-600">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 mt-1">
                              {!wasAnswered ? (
                                <div className="w-5 h-5 rounded-full bg-gray-500"></div>
                              ) : isCorrect ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : (
                                <XCircle className="w-5 h-5 text-red-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="text-foreground text-sm font-medium">
                                Question {index + 1}: {question.question}
                              </p>
                              {wasAnswered && (
                                <div className="mt-2 space-y-1 text-sm">
                                  <p className="text-gray-300">
                                    Your answer: <span className={isCorrect ? 'text-green-400' : 'text-red-400'}>
                                      {question.options[selectedAnswer]}
                                    </span>
                                  </p>
                                  {!isCorrect && (
                                    <p className="text-gray-300">
                                      Correct answer: <span className="text-green-400">
                                        {question.options[question.correct]}
                                      </span>
                                    </p>
                                  )}
                                  <p className="text-gray-400 text-xs">{question.explanation}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="text-center">
                  <Button 
                    onClick={resetExam}
                    className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Take Another Exam
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = examQuestions[currentQuestion];
  const selectedAnswer = getSelectedAnswer(currentQ.id);
  const progress = ((currentQuestion + 1) / examQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-elec-dark text-elec-light">
      <div className="px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <Link to="/renewable-energy-course">
          <Button
            variant="ghost"
            className="text-elec-light hover:bg-elec-gray hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header with timer and progress */}
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <h1 className="text-xl font-bold text-foreground">Mock Exam</h1>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="border-gray-600 text-gray-300">
                  Question {currentQuestion + 1} of {examQuestions.length}
                </Badge>
                <div className="flex items-center gap-2 text-yellow-400">
                  <Clock className="h-4 w-4" />
                  <span className="font-mono">{formatTime(timeRemaining)}</span>
                </div>
              </div>
            </div>
            <Button 
              onClick={finishExam}
              variant="outline"
              className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-elec-dark"
            >
              Finish Exam
            </Button>
          </div>

          <Progress value={progress} className="h-2" />

          {/* Question Card */}
          <Card className="bg-elec-gray border-transparent">
            <CardHeader>
              <CardTitle className="text-foreground">
                {currentQ.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(currentQ.id, index)}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                      selectedAnswer === index
                        ? 'border-elec-yellow bg-elec-yellow/10 text-foreground'
                        : 'border-gray-600 hover:border-gray-500 text-gray-300 hover:text-foreground'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-semibold min-w-[24px]">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between pt-6">
                <Button
                  onClick={previousQuestion}
                  disabled={currentQuestion === 0}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-elec-gray"
                >
                  Previous
                </Button>
                <Button
                  onClick={nextQuestion}
                  disabled={currentQuestion === examQuestions.length - 1}
                  className="bg-elec-yellow text-elec-dark hover:bg-yellow-600"
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Question Navigation Grid */}
          <Card className="bg-elec-gray border-transparent">
            <CardHeader>
              <CardTitle className="text-foreground text-sm">Question Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-10 gap-2">
                {examQuestions.map((question, index) => {
                  const isAnswered = getSelectedAnswer(question.id) !== undefined;
                  const isCurrent = index === currentQuestion;

                  return (
                    <button
                      key={question.id}
                      onClick={() => setCurrentQuestion(index)}
                      className={`w-8 h-8 rounded text-xs font-semibold transition-all duration-200 ${
                        isCurrent
                          ? 'bg-elec-yellow text-elec-dark'
                          : isAnswered
                          ? 'bg-green-600 text-foreground hover:bg-green-500'
                          : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                      }`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-4 mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-elec-yellow rounded"></div>
                  <span className="text-gray-300">Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-600 rounded"></div>
                  <span className="text-gray-300">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-600 rounded"></div>
                  <span className="text-gray-300">Unanswered</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyMockExam;