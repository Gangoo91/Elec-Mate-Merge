import { useState } from 'react';
import { getRandomMockExamQuestions } from '@/data/upskilling/mockExamQuizData';
import QuizQuestion from './quiz/QuizQuestion';
import QuizResults from './quiz/QuizResults';
import QuizNavigation from './quiz/QuizNavigation';
import QuizProgress from './quiz/QuizProgress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck, RefreshCw } from 'lucide-react';

const MockExamQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [examQuestions, setExamQuestions] = useState<any[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const handleStartExam = () => {
    console.log("Starting exam...");
    const newQuestions = getRandomMockExamQuestions(30);
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
        message: "Outstanding performance! You demonstrate excellent understanding of inspection and testing principles.",
        color: "text-green-400"
      };
    }
    if (percentage >= 65) {
      return {
        grade: "Merit", 
        message: "Good performance! You have a solid grasp of inspection and testing fundamentals.",
        color: "text-blue-400"
      };
    }
    if (percentage >= 60) {
      return {
        grade: "Pass",
        message: "Satisfactory performance. You meet the minimum requirements but could benefit from further study.",
        color: "text-yellow-400"
      };
    }
    return {
      grade: "Fail",
      message: "Unfortunately, you haven't met the pass criteria. Please review the material and try again.",
      color: "text-red-400"
    };
  };

  // Start Screen
  if (!examStarted) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="bg-elec-gray border-transparent">
          <CardHeader>
            <CardTitle className="text-foreground text-center text-2xl">Mock Examination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-6">
              <FileCheck className="h-16 w-16 text-elec-yellow mx-auto" />
              <p className="text-gray-300 text-lg">
                Test your knowledge with 30 comprehensive questions covering inspection and testing procedures
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-elec-dark border border-gray-600 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-elec-yellow">30</div>
                <div className="text-sm text-gray-400">Questions</div>
              </div>
              <div className="bg-elec-dark border border-gray-600 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-elec-yellow">60</div>
                <div className="text-sm text-gray-400">Minutes</div>
              </div>
              <div className="bg-elec-dark border border-gray-600 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-elec-yellow">60%</div>
                <div className="text-sm text-gray-400">Pass Mark</div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
              <h3 className="text-foreground font-semibold mb-3">Examination Instructions</h3>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>• Answer all 30 questions to complete the examination</li>
                <li>• You can navigate between questions using the navigation buttons</li>
                <li>• Review your answers before submitting</li>
                <li>• A score of 60% or higher is required to pass</li>
              </ul>
            </div>

            {/* Start Button */}
            <div className="text-center pt-4">
              <Button 
                onClick={() => {
                  console.log("Button clicked - this should appear in console");
                  handleStartExam();
                }}
                className="bg-elec-yellow text-black hover:bg-yellow-400 px-8 py-3 text-lg font-semibold"
                size="lg"
                onMouseDown={() => console.log("Button mouse down")}
                onMouseUp={() => console.log("Button mouse up")}
              >
                <FileCheck className="mr-2 h-5 w-5" />
                Begin Examination
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Results Screen
  if (showResults) {
    const score = calculateScore();
    const gradeInfo = getGradeInfo(score);
    const duration = getExamDuration();

    return (
      <div className="space-y-6">
        <Card className="bg-elec-gray border-transparent">
          <CardHeader>
            <CardTitle className="text-foreground text-center text-2xl">Examination Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
                  <h3 className="text-gray-400 text-sm">Score</h3>
                  <div className="text-3xl font-bold text-elec-yellow">
                    {score} / {examQuestions.length}
                  </div>
                  <div className="text-gray-300 text-sm">
                    {Math.round((score / examQuestions.length) * 100)}%
                  </div>
                </div>
                <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
                  <h3 className="text-gray-400 text-sm">Grade</h3>
                  <div className={`text-3xl font-bold ${gradeInfo.color}`}>
                    {gradeInfo.grade}
                  </div>
                </div>
                <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
                  <h3 className="text-gray-400 text-sm">Duration</h3>
                  <div className="text-3xl font-bold text-foreground">
                    {duration}
                  </div>
                  <div className="text-gray-300 text-sm">minutes</div>
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
                          <p className="text-gray-300 text-xs mb-2">
                            <strong>Your answer:</strong> {question.options[userAnswer]}
                          </p>
                          {!isCorrect && (
                            <p className="text-gray-300 text-xs mb-2">
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

export default MockExamQuiz;