import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomDataCablingMockExamQuestions } from '@/data/upskilling/dataCablingMockExamData';
import QuizQuestion from './quiz/QuizQuestion';
import QuizNavigation from './quiz/QuizNavigation';
import QuizProgress from './quiz/QuizProgress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FileCheck, RefreshCw, AlertTriangle, ArrowLeft } from 'lucide-react';

const DataCablingMockExam = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const [examQuestions, setExamQuestions] = useState<any[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const handleStartExam = () => {
    console.log("Starting Data Cabling mock exam...");
    const newQuestions = getRandomDataCablingMockExamQuestions(30);
    setExamQuestions(newQuestions);
    setExamStarted(true);
    setStartTime(new Date());
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
    setEndTime(null);
    console.log("Data Cabling exam started with", newQuestions.length, "questions");
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

  const handleQuestionJump = (questionIndex: number) => {
    setCurrentQuestion(questionIndex);
  };

  const resetExam = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
    setExamStarted(false);
    setExamQuestions([]);
    setStartTime(null);
    setEndTime(null);
  };

  const calculateScore = () => {
    let correct = 0;
    examQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: examQuestions.length,
      percentage: Math.round((correct / examQuestions.length) * 100)
    };
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 80) return 'Excellent! You have a strong understanding of data cabling principles.';
    if (percentage >= 70) return 'Good work! Review the areas you missed to strengthen your knowledge.';
    if (percentage >= 60) return 'Satisfactory. More study is recommended before certification.';
    return 'Additional study required. Focus on understanding fundamental concepts.';
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString();
  };

  const calculateDuration = () => {
    if (startTime && endTime) {
      const duration = endTime.getTime() - startTime.getTime();
      const minutes = Math.floor(duration / 60000);
      const seconds = Math.floor((duration % 60000) / 1000);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    return '0:00';
  };

  const getResultsByTopic = () => {
    const topics = [
      { name: 'Introduction to Data Cabling', range: [1, 25] },
      { name: 'Cable Types and Specifications', range: [26, 50] },
      { name: 'Installation Techniques', range: [51, 75] },
      { name: 'Testing and Certification', range: [76, 100] },
      { name: 'Network Applications and PoE', range: [101, 125] },
      { name: 'International Standards', range: [126, 150] }
    ];

    return topics.map(topic => {
      const questionsInTopic = examQuestions.filter(q => 
        q.id >= topic.range[0] && q.id <= topic.range[1]
      );
      
      const correctInTopic = questionsInTopic.reduce((count, question, index) => {
        const questionGlobalIndex = examQuestions.findIndex(q => q.id === question.id);
        if (selectedAnswers[questionGlobalIndex] === question.correctAnswer) {
          return count + 1;
        }
        return count;
      }, 0);

      return {
        name: topic.name,
        correct: correctInTopic,
        total: questionsInTopic.length,
        percentage: questionsInTopic.length > 0 ? Math.round((correctInTopic / questionsInTopic.length) * 100) : 0
      };
    }).filter(topic => topic.total > 0);
  };

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-elec-dark text-elec-light">
        <div className="px-8 pt-8 pb-12">
          <Button
            onClick={() => navigate('/data-cabling-course')}
            variant="ghost"
            className="text-elec-light hover:bg-elec-gray hover:text-elec-yellow transition-all duration-200 mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Data Cabling Course
          </Button>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-elec-gray border-gray-700">
              <CardHeader className="text-center">
                <FileCheck className="mx-auto h-16 w-16 text-elec-yellow mb-4" />
                <CardTitle className="text-3xl font-bold text-foreground mb-2">
                  Data Cabling Mock Exam
                </CardTitle>
                <p className="text-gray-400 text-lg">
                  Test your knowledge of structured cabling systems
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-elec-dark p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Exam Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-elec-yellow mb-2">Format</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>• 30 questions selected randomly</li>
                        <li>• Multiple choice format</li>
                        <li>• Questions from 150 question bank</li>
                        <li>• All course modules covered</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-elec-yellow mb-2">Coverage</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>• Introduction to Data Cabling</li>
                        <li>• Cable Types and Specifications</li>
                        <li>• Installation Techniques</li>
                        <li>• Testing and Certification</li>
                        <li>• Network Applications and PoE</li>
                        <li>• International Standards</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-900/20 border border-blue-500 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-200 mb-1">Exam Instructions</h4>
                      <ul className="space-y-1 text-blue-100 text-sm">
                        <li>• Read each question carefully</li>
                        <li>• Select the best answer from the options provided</li>
                        <li>• You can review and change answers before submitting</li>
                        <li>• Aim for 80% or higher for excellent understanding</li>
                        <li>• Results include detailed explanations for learning</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <Button
                    onClick={handleStartExam}
                    className="bg-elec-yellow text-elec-dark hover:bg-yellow-600 px-8 py-3 text-lg font-semibold"
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
    const score = calculateScore();
    const topicResults = getResultsByTopic();

    return (
      <div className="min-h-screen bg-elec-dark text-elec-light">
        <div className="px-8 pt-8 pb-12">
          <div className="max-w-6xl mx-auto">
            <Card className="bg-elec-gray border-gray-700 mb-6">
              <CardHeader className="text-center">
                <FileCheck className="mx-auto h-16 w-16 text-elec-yellow mb-4" />
                <CardTitle className="text-3xl font-bold text-foreground mb-2">
                  Data Cabling Mock Exam Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-elec-dark p-6 rounded-lg text-center">
                    <h3 className="text-2xl font-bold text-foreground mb-4">Your Score</h3>
                    <div className={`text-6xl font-bold ${getScoreColor(score.percentage)} mb-2`}>
                      {score.percentage}%
                    </div>
                    <p className="text-gray-400 text-lg mb-4">
                      {score.correct} out of {score.total} correct
                    </p>
                    <p className="text-gray-300">
                      {getScoreMessage(score.percentage)}
                    </p>
                  </div>

                  <div className="bg-elec-dark p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-foreground mb-4">Exam Details</h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex justify-between">
                        <span>Start Time:</span>
                        <span>{startTime ? formatTime(startTime) : 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>End Time:</span>
                        <span>{endTime ? formatTime(endTime) : 'N/A'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span>{calculateDuration()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Questions:</span>
                        <span>{examQuestions.length}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {topicResults.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-foreground mb-4">Performance by Topic</h3>
                    <div className="grid gap-4">
                      {topicResults.map((topic, index) => (
                        <div key={index} className="bg-elec-dark p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-foreground">{topic.name}</span>
                            <span className={`font-bold ${getScoreColor(topic.percentage)}`}>
                              {topic.percentage}%
                            </span>
                          </div>
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>{topic.correct} correct out of {topic.total}</span>
                            <div className="w-32 bg-gray-700 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  topic.percentage >= 80 ? 'bg-green-400' :
                                  topic.percentage >= 70 ? 'bg-yellow-400' : 'bg-red-400'
                                }`}
                                style={{ width: `${topic.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="detailed-results" className="bg-elec-dark rounded-lg border-gray-600">
                    <AccordionTrigger className="px-6 py-4 text-foreground hover:text-elec-yellow">
                      <span className="text-lg font-semibold">View Detailed Results</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-6">
                        {examQuestions.map((question, index) => {
                          const isCorrect = selectedAnswers[index] === question.correctAnswer;
                          const userAnswer = selectedAnswers[index];
                          
                          return (
                            <div key={index} className="border border-gray-600 rounded-lg p-4">
                              <div className="flex items-start gap-3 mb-3">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                                  isCorrect ? 'bg-green-400 text-elec-dark' : 'bg-red-400 text-foreground'
                                }`}>
                                  {index + 1}
                                </div>
                                <div className="flex-1">
                                  <p className="text-foreground font-medium mb-3">{question.question}</p>
                                  <div className="space-y-2">
                                    {question.options.map((option: string, optIndex: number) => (
                                      <div
                                        key={optIndex}
                                        className={`p-2 rounded text-sm ${
                                          optIndex === question.correctAnswer
                                            ? 'bg-green-900/30 border border-green-500 text-green-200'
                                            : optIndex === userAnswer && !isCorrect
                                            ? 'bg-red-900/30 border border-red-500 text-red-200'
                                            : 'bg-gray-700 text-gray-300'
                                        }`}
                                      >
                                        {String.fromCharCode(65 + optIndex)}. {option}
                                        {optIndex === question.correctAnswer && (
                                          <span className="ml-2 text-xs">(Correct)</span>
                                        )}
                                        {optIndex === userAnswer && optIndex !== question.correctAnswer && (
                                          <span className="ml-2 text-xs">(Your answer)</span>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                  <div className="mt-3 p-3 bg-blue-900/20 rounded border border-blue-500">
                                    <p className="text-blue-200 text-sm">
                                      <strong>Explanation:</strong> {question.explanation}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex justify-center gap-4 mt-8">
                  <Button
                    onClick={resetExam}
                    className="bg-elec-yellow text-elec-dark hover:bg-yellow-600 px-6 py-2"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Take Another Exam
                  </Button>
                  <Button
                    onClick={() => navigate('/data-cabling-course')}
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 px-6 py-2"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Course
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const question = examQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / examQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-elec-dark text-foreground px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-6">
            Knowledge Check ({examQuestions.length} Questions)
          </h1>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-elec-yellow h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          {/* Question Counter */}
          <div className="text-center text-gray-400 text-lg mb-8">
            Question {currentQuestion + 1} of {examQuestions.length}
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            {question.question}
          </h2>
          
          {/* Options */}
          <div className="space-y-4">
            {question.options.map((option: string, index: number) => {
              const isSelected = selectedAnswers[currentQuestion] === index;
              
              return (
                <div 
                  key={index}
                  className={`flex items-center space-x-4 p-4 rounded-lg border transition-all cursor-pointer ${
                    isSelected 
                      ? 'border-elec-yellow bg-elec-yellow/10' 
                      : 'border-gray-600 bg-transparent hover:border-gray-500'
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    isSelected 
                      ? 'border-elec-yellow bg-elec-yellow' 
                      : 'border-gray-500'
                  }`}>
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-black"></div>
                    )}
                  </div>
                  <label className="text-foreground cursor-pointer flex-1">
                    {option}
                  </label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed px-8 py-2"
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="bg-elec-yellow text-black hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-2"
          >
            {currentQuestion === examQuestions.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataCablingMockExam;