import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, CheckCircle, XCircle, RotateCcw, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import QuizQuestion from '@/components/upskilling/quiz/QuizQuestion';
import QuizNavigation from '@/components/upskilling/quiz/QuizNavigation';
import QuizProgress from '@/components/upskilling/quiz/QuizProgress';
import { getRandomSmartHomeMockExamQuestions } from '@/data/upskilling/smartHomeMockExamData';
import { QuizQuestion as QuizQuestionType } from '@/types/quiz';

const EXAM_DURATION = 45 * 60; // 45 minutes in seconds
const EXAM_QUESTION_COUNT = 30;

const SmartHomeMockExam = () => {
  const [examState, setExamState] = useState<'start' | 'exam' | 'results'>('start');
  const [questions, setQuestions] = useState<QuizQuestionType[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(EXAM_DURATION);
  const [examStartTime, setExamStartTime] = useState<number>(0);

  // Timer effect
  useEffect(() => {
    if (examState === 'exam' && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setExamState('results');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [examState, timeRemaining]);

  const startExam = () => {
    const randomQuestions = getRandomSmartHomeMockExamQuestions(EXAM_QUESTION_COUNT);
    setQuestions(randomQuestions);
    setSelectedAnswers(new Array(EXAM_QUESTION_COUNT).fill(undefined));
    setCurrentQuestion(0);
    setTimeRemaining(EXAM_DURATION);
    setExamStartTime(Date.now());
    setExamState('exam');
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setExamState('results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setExamState('start');
    setQuestions([]);
    setSelectedAnswers([]);
    setCurrentQuestion(0);
    setTimeRemaining(EXAM_DURATION);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateResults = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer !== undefined && answer === questions[index]?.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const getGrade = (score: number) => {
    const percentage = (score / EXAM_QUESTION_COUNT) * 100;
    if (percentage >= 80) return { grade: 'Distinction', color: 'text-green-400' };
    if (percentage >= 70) return { grade: 'Merit', color: 'text-elec-yellow' };
    if (percentage >= 60) return { grade: 'Pass', color: 'text-elec-yellow' };
    return { grade: 'Fail', color: 'text-red-400' };
  };

  // Start Screen
  if (examState === 'start') {
    return (
      <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden">
        {/* Header */}
        <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8 bg-[#1a1a1a]/95">
          <Link to="../smart-home-course">
            <Button
              variant="ghost"
              className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Smart Home Course
            </Button>
          </Link>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-elec-yellow" />
              <Badge
                variant="secondary"
                className="bg-yellow-600/40 text-elec-yellow hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
              >
                Mock Exam
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Smart Home Mock Exam
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
              Test your knowledge with a comprehensive examination covering all aspects of smart home technology
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="bg-elec-yellow text-black">
                30 Questions
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                45 Minutes
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                Pass Mark: 70%
              </Badge>
            </div>

            <Card className="bg-card/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="h-6 w-6 text-elec-yellow" />
                  <h3 className="text-xl font-bold text-white">Exam Details</h3>
                </div>
                <div className="space-y-3 text-gray-300">
                  <p>30 randomly selected questions</p>
                  <p>45-minute time limit</p>
                  <p>Pass mark: 70% (21 correct answers)</p>
                  <p>Covers all smart home technology areas</p>
                  <p>Immediate results and detailed feedback</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-elec-yellow" />
                  <h3 className="text-xl font-bold text-white">Topics Covered</h3>
                </div>
                <div className="space-y-3 text-gray-300">
                  <p>Smart home system fundamentals</p>
                  <p>Communication protocols (WiFi, Zigbee, Z-Wave, Matter)</p>
                  <p>Lighting control and scene programming</p>
                  <p>HVAC and environmental systems</p>
                  <p>Security and access control</p>
                  <p>Hubs and voice assistants</p>
                  <p>Installation and safety (BS 7671)</p>
                  <p>Troubleshooting and maintenance</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-elec-yellow/10 border-elec-yellow/30">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-elec-yellow" />
                  <h3 className="text-xl font-bold text-white">Before You Begin</h3>
                </div>
                <div className="space-y-3 text-gray-300">
                  <p>Ensure you have a stable internet connection</p>
                  <p>Find a quiet environment for concentration</p>
                  <p>Allow uninterrupted time for the full 45-minute duration</p>
                  <p>Have a calculator and notepad available if needed</p>
                  <p>Review key concepts from all modules if needed</p>
                </div>
              </CardContent>
            </Card>

            <div className="text-center pt-4">
              <Button
                onClick={startExam}
                className="bg-elec-yellow text-black hover:bg-yellow-600 transition-all duration-200 px-8 py-3 text-lg font-semibold touch-manipulation active:scale-[0.98]"
              >
                <Clock className="mr-2 h-5 w-5" />
                Start Mock Exam
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Results Screen
  if (examState === 'results') {
    const correctAnswers = calculateResults();
    const percentage = Math.round((correctAnswers / EXAM_QUESTION_COUNT) * 100);
    const { grade, color } = getGrade(correctAnswers);
    const timeElapsed = Math.round((Date.now() - examStartTime) / 1000);
    const timeTaken = formatTime(Math.min(timeElapsed, EXAM_DURATION));

    return (
      <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden">
        {/* Header */}
        <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8 bg-[#1a1a1a]/95">
          <Link to="../smart-home-course">
            <Button
              variant="ghost"
              className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Smart Home Course
            </Button>
          </Link>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-elec-yellow" />
              <Badge
                variant="secondary"
                className="bg-yellow-600/40 text-elec-yellow hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
              >
                Exam Complete
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Exam Results
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
              Review your performance and learn from the explanations
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Score Card */}
            <Card className="bg-card/50 border-gray-700">
              <CardContent className="p-6 sm:p-8">
                <div className="text-center space-y-4">
                  <div className="text-6xl font-bold text-elec-yellow">
                    {percentage}%
                  </div>
                  <div className={`text-2xl font-bold ${color}`}>
                    {grade}
                  </div>
                  <div className="text-gray-300">
                    {correctAnswers} out of {EXAM_QUESTION_COUNT} questions correct
                  </div>
                  <div className="text-gray-300">
                    Time taken: {timeTaken}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Question Review */}
            <Card className="bg-card/50 border-gray-700">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-xl font-bold text-white mb-6">Question Review</h3>
                <div className="space-y-4">
                  {questions.map((question, index) => {
                    const isCorrect = selectedAnswers[index] === question.correctAnswer;
                    const wasAnswered = selectedAnswers[index] !== undefined;

                    return (
                      <div
                        key={question.id}
                        className="p-4 sm:p-5 border border-gray-600 rounded-lg bg-[#1a1a1a]/50"
                      >
                        <div className="flex items-start gap-4 mb-3">
                          {isCorrect ? (
                            <CheckCircle className="h-6 w-6 text-green-400 mt-0.5 flex-shrink-0" />
                          ) : (
                            <XCircle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
                          )}
                          <div className="flex-grow min-w-0">
                            <p className="text-white font-medium mb-3 text-sm sm:text-base">
                              Question {index + 1}: {question.question}
                            </p>

                            {wasAnswered && (
                              <div className="mb-3 p-3 bg-[#1a1a1a] rounded-lg">
                                <span className="text-white text-sm font-medium">Your answer: </span>
                                <span className={`text-sm ${isCorrect ? 'text-green-400' : 'text-red-400'} font-medium`}>
                                  {question.options[selectedAnswers[index]]}
                                </span>
                              </div>
                            )}

                            {!isCorrect && (
                              <div className="mb-3 p-3 bg-[#1a1a1a] border border-green-500/20 rounded-lg">
                                <span className="text-white text-sm font-medium">Correct answer: </span>
                                <span className="text-green-400 text-sm font-medium">
                                  {question.options[question.correctAnswer]}
                                </span>
                              </div>
                            )}

                            <div className="text-sm text-gray-300 bg-[#1a1a1a] p-4 rounded-lg">
                              <strong className="text-elec-yellow">Explanation:</strong> {question.explanation}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                onClick={handleRestart}
                className="bg-elec-yellow text-black hover:bg-yellow-600 transition-all duration-200 px-8 py-3 text-lg font-semibold touch-manipulation active:scale-[0.98]"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Take Again
              </Button>
              <Link to="../smart-home-course">
                <Button
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-700 transition-all duration-200 px-8 py-3 text-lg font-semibold w-full sm:w-auto touch-manipulation active:scale-[0.98]"
                >
                  Return to Course
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Exam Screen
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-[#1a1a1a] overflow-x-hidden">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6 bg-[#1a1a1a]/95">
        <div className="flex justify-between items-center mb-4">
          <Link to="../smart-home-course">
            <Button
              variant="ghost"
              className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 px-4 py-2 rounded-md touch-manipulation active:scale-[0.98]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Back to Smart Home Course</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>

          <Badge variant="outline" className="border-elec-yellow text-elec-yellow px-3 py-2 text-base font-semibold">
            <Clock className="mr-2 h-4 w-4" />
            {formatTime(timeRemaining)}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-elec-yellow" />
            <Badge
              variant="secondary"
              className="bg-yellow-600/40 text-elec-yellow hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              In Progress
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Smart Home Mock Exam
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <QuizProgress
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
          />

          {question && (
            <>
              <QuizQuestion
                question={question}
                selectedAnswer={selectedAnswers[currentQuestion]}
                onAnswerSelect={handleAnswerSelect}
              />

              <QuizNavigation
                currentQuestion={currentQuestion}
                totalQuestions={questions.length}
                selectedAnswer={selectedAnswers[currentQuestion]}
                onPrevious={handlePrevious}
                onNext={handleNext}
                isLastQuestion={currentQuestion === questions.length - 1}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default SmartHomeMockExam;