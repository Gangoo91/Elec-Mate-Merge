import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, FileCheck, RefreshCw } from 'lucide-react';
import { getRandomPATTestingExamQuestions } from '@/data/upskilling/patTestingMockExamData';
import QuizQuestion from './quiz/QuizQuestion';
import QuizResults from './quiz/QuizResults';
import QuizNavigation from './quiz/QuizNavigation';
import QuizProgress from './quiz/QuizProgress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const PATTestingMockExam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [examQuestions, setExamQuestions] = useState<any[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(45 * 60); // 45 minutes in seconds

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (examStarted && !quizCompleted && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            // Time's up - auto-submit exam
            setQuizCompleted(true);
            setShowResults(true);
            setEndTime(new Date());
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [examStarted, quizCompleted, timeRemaining]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartExam = () => {
    console.log("Starting PAT Testing mock exam...");
    const newQuestions = getRandomPATTestingExamQuestions(25);
    setExamQuestions(newQuestions);
    setExamStarted(true);
    setStartTime(new Date());
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
    setEndTime(null);
    setTimeRemaining(45 * 60); // Reset to 45 minutes
    console.log("PAT Testing exam started with", newQuestions.length, "questions");
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
    setTimeRemaining(45 * 60);
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
        message: "Outstanding performance! You demonstrate excellent understanding of PAT testing principles and electrical safety requirements.",
        color: "text-green-400"
      };
    }
    if (percentage >= 70) {
      return {
        grade: "Merit", 
        message: "Good performance! You have a solid grasp of PAT testing fundamentals and equipment safety assessment.",
        color: "text-blue-400"
      };
    }
    if (percentage >= 60) {
      return {
        grade: "Pass",
        message: "Satisfactory performance. You understand the basic principles of PAT testing and equipment safety.",
        color: "text-yellow-400"
      };
    }
    return {
      grade: "Fail",
      message: "Further study required. Please review the PAT testing modules and retake the exam when ready.",
      color: "text-red-400"
    };
  };

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-elec-dark text-foreground p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/pat-testing-course">
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-[#323232] hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course
              </Button>
            </Link>
          </div>

          {/* Exam Introduction */}
          <Card className="bg-[#323232] border-transparent mb-8">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <FileCheck className="w-16 h-16 text-elec-yellow" />
              </div>
              <CardTitle className="text-3xl font-bold text-foreground mb-2">
                PAT Testing Mock Exam
              </CardTitle>
              <p className="text-gray-400 text-lg">
                Professional Assessment - Test Your Knowledge
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Exam Details */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-elec-gray rounded-lg">
                  <div className="text-2xl font-bold text-elec-yellow">25</div>
                  <div className="text-gray-400">Questions</div>
                </div>
                <div className="text-center p-4 bg-elec-gray rounded-lg">
                  <div className="text-2xl font-bold text-elec-yellow">45</div>
                  <div className="text-gray-400">Minutes</div>
                </div>
                <div className="text-center p-4 bg-elec-gray rounded-lg">
                  <div className="text-2xl font-bold text-elec-yellow">60%</div>
                  <div className="text-gray-400">Pass Mark</div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-elec-gray p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-foreground mb-4">Exam Instructions</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• This exam contains 25 multiple-choice questions covering all PAT testing modules</li>
                  <li>• You have 45 minutes to complete the exam</li>
                  <li>• You need 15 or more correct answers (60%) to pass</li>
                  <li>• Questions cover: Legal framework, equipment classification, visual inspection, testing procedures, and documentation</li>
                  <li>• The exam will auto-submit when time expires</li>
                  <li>• Review your answers before submitting - you cannot change them after submission</li>
                </ul>
              </div>

              {/* Grade Boundaries */}
              <div className="bg-elec-gray p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-foreground mb-4">Grade Boundaries</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <Badge variant="outline" className="border-green-500 text-green-400 mb-2">Distinction</Badge>
                    <div className="text-gray-400">80%+ (20+)</div>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="border-blue-500 text-blue-400 mb-2">Merit</Badge>
                    <div className="text-gray-400">70%+ (18+)</div>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="border-yellow-500 text-yellow-400 mb-2">Pass</Badge>
                    <div className="text-gray-400">60%+ (15+)</div>
                  </div>
                  <div className="text-center">
                    <Badge variant="outline" className="border-red-500 text-red-400 mb-2">Fail</Badge>
                    <div className="text-gray-400">&lt;60% (&lt;15)</div>
                  </div>
                </div>
              </div>

              {/* Start Button */}
              <div className="text-center pt-4">
                <Button 
                  onClick={handleStartExam}
                  className="bg-elec-yellow text-black hover:bg-yellow-400 px-8 py-3 text-lg font-semibold"
                >
                  <FileCheck className="w-5 h-5 mr-2" />
                  Start Mock Exam
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const gradeInfo = getGradeInfo(score);
    const duration = getExamDuration();

    return (
      <div className="min-h-screen bg-elec-dark text-foreground p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/pat-testing-course">
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-[#323232] hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course
              </Button>
            </Link>
          </div>

          {/* Results Summary */}
          <Card className="bg-[#323232] border-transparent mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-foreground mb-4">
                Exam Results
              </CardTitle>
              <div className="text-6xl font-bold text-elec-yellow mb-2">
                {score}/{examQuestions.length}
              </div>
              <div className="text-xl text-gray-400 mb-4">
                {Math.round((score / examQuestions.length) * 100)}% Score
              </div>
              <Badge variant="outline" className={`${gradeInfo.color} border-current text-lg px-4 py-2`}>
                {gradeInfo.grade}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <p className={`text-lg ${gradeInfo.color}`}>
                  {gradeInfo.message}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-elec-gray rounded-lg">
                  <div className="text-2xl font-bold text-elec-yellow">{duration}</div>
                  <div className="text-gray-400">Minutes Taken</div>
                </div>
                <div className="text-center p-4 bg-elec-gray rounded-lg">
                  <div className="text-2xl font-bold text-elec-yellow">
                    {score >= 15 ? "PASS" : "FAIL"}
                  </div>
                  <div className="text-gray-400">Result</div>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  onClick={handleRestart}
                  className="bg-elec-yellow text-black hover:bg-yellow-400 mr-4"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retake Exam
                </Button>
                <Link to="/pat-testing-course">
                  <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-[#323232] hover:text-foreground">
                    Return to Course
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Results */}
          <QuizResults 
            questions={examQuestions}
            selectedAnswers={selectedAnswers}
            onRestart={handleRestart}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-elec-dark text-foreground p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with Timer */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link to="/pat-testing-course">
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-[#323232] hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">PAT Testing Mock Exam</h1>
          </div>
          
          <div className="flex items-center gap-2 bg-[#323232] px-4 py-2 rounded-lg">
            <Clock className="w-5 h-5 text-elec-yellow" />
            <span className={`font-mono text-lg ${timeRemaining < 300 ? 'text-red-400' : 'text-elec-yellow'}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <QuizProgress 
          currentQuestion={currentQuestion} 
          totalQuestions={examQuestions.length} 
        />

        {/* Question */}
        <div className="my-8">
          <QuizQuestion
            question={examQuestions[currentQuestion]}
            selectedAnswer={selectedAnswers[currentQuestion]}
            onAnswerSelect={handleAnswerSelect}
          />
        </div>

        {/* Navigation */}
        <QuizNavigation
          currentQuestion={currentQuestion}
          totalQuestions={examQuestions.length}
          selectedAnswer={selectedAnswers[currentQuestion]}
          onPrevious={handlePrevious}
          onNext={handleNext}
          isLastQuestion={currentQuestion === examQuestions.length - 1}
        />
      </div>
    </div>
  );
};

export default PATTestingMockExam;