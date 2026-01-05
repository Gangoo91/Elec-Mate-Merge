import { useState, useEffect } from 'react';
import { getRandomBMSMockExamQuestions } from '@/data/upskilling/bmsMockExamData';
import QuizQuestion from './quiz/QuizQuestion';
import QuizResults from './quiz/QuizResults';
import QuizNavigation from './quiz/QuizNavigation';
import QuizProgress from './quiz/QuizProgress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, RefreshCw, Clock } from 'lucide-react';

const BMSMockExam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [examStarted, setExamStarted] = useState(true); // Start immediately
  const [examQuestions, setExamQuestions] = useState<any[]>(() => getRandomBMSMockExamQuestions(30)); // Initialize with questions
  const [startTime, setStartTime] = useState<Date | null>(() => new Date()); // Initialize with current time
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes in seconds

  // Timer effect - countdown during exam
  useEffect(() => {
    if (examStarted && !showResults && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Time's up - auto submit
            setQuizCompleted(true);
            setShowResults(true);
            setEndTime(new Date());
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [examStarted, showResults, timeRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartExam = () => {
    console.log("Starting BMS exam...");
    const newQuestions = getRandomBMSMockExamQuestions(30);
    setExamQuestions(newQuestions);
    setExamStarted(true);
    setStartTime(new Date());
    setTimeRemaining(45 * 60); // Reset timer to 45 minutes
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
    setEndTime(null);
    console.log("BMS exam started with", newQuestions.length, "questions");
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
    setTimeRemaining(45 * 60); // Reset timer
  };

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
        message: "Outstanding performance! You demonstrate excellent understanding of Building Management Systems principles.",
        color: "text-green-400"
      };
    }
    if (percentage >= 65) {
      return {
        grade: "Merit", 
        message: "Good performance! You have a solid grasp of BMS fundamentals and integration principles.",
        color: "text-blue-400"
      };
    }
    if (percentage >= 60) {
      return {
        grade: "Pass",
        message: "Satisfactory performance. You meet the minimum requirements but could benefit from further study of BMS systems.",
        color: "text-yellow-400"
      };
    }
    return {
      grade: "Fail",
      message: "Unfortunately, you haven't met the pass criteria. Please review the BMS course material and try again.",
      color: "text-red-400"
    };
  };

  // Results Screen
  if (showResults) {
    const score = calculateScore();
    const gradeInfo = getGradeInfo(score);
    const duration = getExamDuration();

    return (
      <div className="space-y-6">
        <Card className="bg-elec-gray border-transparent">
          <CardHeader>
            <CardTitle className="text-foreground text-center text-2xl">BMS Examination Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
                  <h3 className="text-foreground text-sm">Score</h3>
                  <div className="text-3xl font-bold text-elec-yellow">
                    {score} / {examQuestions.length}
                  </div>
                  <div className="text-foreground text-sm">
                    {Math.round((score / examQuestions.length) * 100)}%
                  </div>
                </div>
                <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
                  <h3 className="text-foreground text-sm">Grade</h3>
                  <div className={`text-3xl font-bold ${gradeInfo.color}`}>
                    {gradeInfo.grade}
                  </div>
                </div>
                <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
                  <h3 className="text-foreground text-sm">Duration</h3>
                  <div className="text-3xl font-bold text-foreground">
                    {duration}
                  </div>
                  <div className="text-foreground text-sm">minutes</div>
                </div>
              </div>
              
              <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
                <p className={`${gradeInfo.color} font-medium`}>
                  {gradeInfo.message}
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-foreground font-semibold">Question Review:</h3>
              {examQuestions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <Card key={question.id} className="bg-elec-dark border-gray-600">
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
                          <p className="text-foreground font-medium text-sm mb-2">
                            Q{index + 1}: {question.question}
                          </p>
                          <p className="text-foreground text-xs mb-2">
                            <strong>Your answer:</strong> {question.options[userAnswer]}
                          </p>
                          {!isCorrect && (
                            <p className="text-foreground text-xs mb-2">
                              <strong>Correct answer:</strong> {question.options[question.correctAnswer]}
                            </p>
                          )}
                          <p className="text-foreground text-xs">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <div className="text-center space-x-4">
              <Button 
                onClick={handleRestart}
                className="bg-elec-yellow text-black hover:bg-yellow-400"
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

  return (
    <div className="space-y-6">
      {/* Timer Display */}
      <Card className="bg-elec-gray border-transparent">
        <CardContent className="p-4">
          <div className="flex items-center justify-center gap-3">
            <Clock className={`h-5 w-5 ${timeRemaining <= 300 ? 'text-red-400' : 'text-elec-yellow'}`} />
            <span className={`text-xl font-mono font-bold ${timeRemaining <= 300 ? 'text-red-400' : 'text-foreground'}`}>
              {formatTime(timeRemaining)}
            </span>
            <span className="text-foreground text-sm">remaining</span>
          </div>
          {timeRemaining <= 300 && (
            <p className="text-red-400 text-center text-sm mt-2">⚠️ Less than 5 minutes remaining!</p>
          )}
        </CardContent>
      </Card>

      <QuizProgress 
        currentQuestion={currentQuestion}
        totalQuestions={examQuestions.length}
      />

      <QuizQuestion
        question={question}
        selectedAnswer={selectedAnswers[currentQuestion]}
        onAnswerSelect={handleAnswerSelect}
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

export default BMSMockExam;