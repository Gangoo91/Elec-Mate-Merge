import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { getRandomInstrumentationExamQuestions } from '@/data/upskilling/instrumentationMockExamData';
import QuizQuestion from './quiz/QuizQuestion';
import QuizResults from './quiz/QuizResults';
import QuizNavigation from './quiz/QuizNavigation';
import QuizProgress from './quiz/QuizProgress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const InstrumentationMockExam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [examQuestions, setExamQuestions] = useState<any[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const handleStartExam = () => {
    console.log("Starting instrumentation exam...");
    const newQuestions = getRandomInstrumentationExamQuestions(30);
    setExamQuestions(newQuestions);
    setExamStarted(true);
    setStartTime(new Date());
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
    setEndTime(null);
    console.log("Exam started with", newQuestions.length, "questions");
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
        message: "Outstanding performance! You demonstrate excellent understanding of instrumentation principles and practices.",
        color: "text-green-400"
      };
    }
    if (percentage >= 65) {
      return {
        grade: "Merit", 
        message: "Good performance! You have a solid grasp of instrumentation fundamentals and applications.",
        color: "text-blue-400"
      };
    }
    if (percentage >= 60) {
      return {
        grade: "Pass",
        message: "Satisfactory performance. You meet the minimum requirements but could benefit from further study of specific topics.",
        color: "text-yellow-400"
      };
    }
    return {
      grade: "Fail",
      message: "Unfortunately, you haven't met the pass criteria. Please review the instrumentation material and take additional study time before retaking.",
      color: "text-red-400"
    };
  };

  // Start Screen
  if (!examStarted) {
    return (
      <div className="min-h-screen bg-elec-dark text-elec-light px-4 md:px-8 pt-4 md:pt-8 pb-8 md:pb-12">
        <Link to="/instrumentation-course">
          <Button
            variant="ghost"
            className="text-elec-light hover:bg-elec-gray hover:text-elec-yellow transition-all duration-200 mb-4 md:mb-6 px-3 md:px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <Card className="bg-elec-gray border-transparent">
            <CardContent className="p-4 md:p-8 text-center space-y-4 md:space-y-6">
              {/* Icon */}
              <FileCheck className="h-12 md:h-16 w-12 md:w-16 text-elec-yellow mx-auto" />
              
              {/* Title and Description */}
              <div className="space-y-2 md:space-y-3">
                <h1 className="text-xl md:text-2xl font-bold text-foreground">Instrumentation Mock Exam</h1>
                <p className="text-sm md:text-base text-gray-400">
                  Professional Assessment - Test Your Knowledge
                </p>
              </div>

              {/* Stats - Clean horizontal layout */}
              <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto py-4 md:py-8">
                <div className="text-center">
                  <div className="text-2xl md:text-4xl font-bold text-elec-yellow mb-1 md:mb-2">30</div>
                  <div className="text-xs md:text-sm text-gray-400">Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-4xl font-bold text-elec-yellow mb-1 md:mb-2">60</div>
                  <div className="text-xs md:text-sm text-gray-400">Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-4xl font-bold text-elec-yellow mb-1 md:mb-2">60%</div>
                  <div className="text-xs md:text-sm text-gray-400">Pass Mark</div>
                </div>
              </div>

              {/* Instructions */}
              <div className="text-left max-w-3xl mx-auto space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-semibold text-foreground">Exam Instructions</h3>
                <ul className="text-sm md:text-base text-gray-300 space-y-2 md:space-y-3">
                  <li>• This exam contains 30 multiple-choice questions covering all instrumentation modules</li>
                  <li>• You have 60 minutes to complete the exam</li>
                  <li>• You need 18 or more correct answers (60%) to pass</li>
                  <li>• Questions cover: Sensors, transmitters, signal conditioning, control systems, calibration, wiring, and troubleshooting</li>
                  <li>• You can navigate between questions and review your answers before submitting</li>
                </ul>
              </div>

              {/* Start Button */}
              <div className="pt-4 md:pt-6">
                <Button 
                  onClick={handleStartExam}
                  className="bg-elec-yellow text-black hover:bg-yellow-400 px-8 md:px-12 py-3 md:py-4 text-base md:text-lg font-semibold rounded-lg"
                  size="lg"
                >
                  <FileCheck className="mr-2 h-4 md:h-5 w-4 md:w-5" />
                  Begin Examination
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Results Screen
  if (showResults) {
    const score = calculateScore();
    const gradeInfo = getGradeInfo(score);
    const duration = getExamDuration();

    return (
      <div className="min-h-screen bg-elec-dark text-elec-light px-4 md:px-8 pt-4 md:pt-8 pb-8 md:pb-12">
        <Link to="/instrumentation-course">
          <Button
            variant="ghost"
            className="text-elec-light hover:bg-elec-gray hover:text-elec-yellow transition-all duration-200 mb-4 md:mb-6 px-3 md:px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Course
          </Button>
        </Link>
        
        <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto">
          <Card className="bg-elec-gray border-transparent">
            <CardHeader>
              <CardTitle className="text-foreground text-center text-lg md:text-2xl">Instrumentation Examination Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6">
              <div className="text-center space-y-3 md:space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                  <div className="bg-elec-dark border border-gray-600 rounded-lg p-3 md:p-4">
                    <h3 className="text-gray-400 text-xs md:text-sm">Score</h3>
                    <div className="text-2xl md:text-3xl font-bold text-elec-yellow">
                      {score} / {examQuestions.length}
                    </div>
                    <div className="text-gray-300 text-xs md:text-sm">
                      {Math.round((score / examQuestions.length) * 100)}%
                    </div>
                  </div>
                  <div className="bg-elec-dark border border-gray-600 rounded-lg p-3 md:p-4">
                    <h3 className="text-gray-400 text-xs md:text-sm">Grade</h3>
                    <div className={`text-2xl md:text-3xl font-bold ${gradeInfo.color}`}>
                      {gradeInfo.grade}
                    </div>
                  </div>
                  <div className="bg-elec-dark border border-gray-600 rounded-lg p-3 md:p-4">
                    <h3 className="text-gray-400 text-xs md:text-sm">Duration</h3>
                    <div className="text-2xl md:text-3xl font-bold text-foreground">
                      {duration}
                    </div>
                    <div className="text-gray-300 text-xs md:text-sm">minutes</div>
                  </div>
                </div>
                
                <div className="bg-elec-dark border border-gray-600 rounded-lg p-3 md:p-4">
                  <p className={`${gradeInfo.color} font-medium text-sm md:text-base`}>
                    {gradeInfo.message}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-foreground font-semibold text-sm md:text-base">Question Review:</h3>
                {examQuestions.map((question, index) => {
                  const userAnswer = selectedAnswers[index];
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <Card key={question.id} className="bg-elec-dark border-gray-600">
                      <CardContent className="p-3 md:p-4">
                        <div className="flex items-start gap-2 md:gap-3 mb-2 md:mb-3">
                          {isCorrect ? (
                            <div className="w-5 md:w-6 h-5 md:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-foreground text-xs font-bold">✓</span>
                            </div>
                          ) : (
                            <div className="w-5 md:w-6 h-5 md:h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-foreground text-xs font-bold">✗</span>
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="text-foreground font-medium text-xs md:text-sm mb-1 md:mb-2">
                              Q{index + 1}: {question.question}
                            </p>
                            <p className="text-gray-300 text-xs mb-1 md:mb-2">
                              <strong>Your answer:</strong> {question.options[userAnswer]}
                            </p>
                            {!isCorrect && (
                              <p className="text-gray-300 text-xs mb-1 md:mb-2">
                                <strong>Correct answer:</strong> {question.options[question.correctAnswer]}
                              </p>
                            )}
                            <p className="text-gray-400 text-xs">
                              <strong>Explanation:</strong> {question.explanation}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              <div className="text-center">
                <Button 
                  onClick={handleRestart}
                  className="bg-elec-yellow text-black hover:bg-yellow-400 w-full md:w-auto"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Take New Exam
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Quiz Screen
  const question = examQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-elec-dark text-elec-light px-4 md:px-8 pt-4 md:pt-8 pb-8 md:pb-12">
      <Link to="/instrumentation-course">
        <Button
          variant="ghost"
          className="text-elec-light hover:bg-elec-gray hover:text-elec-yellow transition-all duration-200 mb-4 md:mb-6 px-3 md:px-4 py-2 rounded-md"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Course
        </Button>
      </Link>
      
      <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto">
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
    </div>
  );
};

export default InstrumentationMockExam;