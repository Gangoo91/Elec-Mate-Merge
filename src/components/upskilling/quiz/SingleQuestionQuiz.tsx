import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useIsMobile } from '@/hooks/use-mobile';

interface FlexibleQuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer?: number;
  correct?: number;
  explanation: string;
}

// Support both array format and single question format
interface SingleQuestionQuizProps {
  // Array format (new)
  questions?: FlexibleQuizQuestion[];
  title?: string;
  // Single question format (legacy)
  question?: string;
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
}

const SingleQuestionQuiz = (props: SingleQuestionQuizProps) => {
  const isMobile = useIsMobile();

  // Normalize props: convert single question format to array format
  const questions: FlexibleQuizQuestion[] = props.questions || (props.question ? [{
    id: 1,
    question: props.question,
    options: props.options || [],
    correctAnswer: props.correctAnswer,
    explanation: props.explanation || ''
  }] : []);

  const title = props.title || 'Section Quiz';

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Array<{ question: number; answer: number; correct: boolean }>>([]);

  // Helper function to get correct answer from either property
  const getCorrectAnswer = (question: FlexibleQuizQuestion): number => {
    return question.correctAnswer !== undefined ? question.correctAnswer : question.correct || 0;
  };

  // Guard against undefined or empty questions array
  if (!questions || questions.length === 0) {
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="bg-[#2a2a2a] border-gray-600">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-foreground">
              No quiz questions available. Please check back later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  const handleOptionSelect = (optionIndex: number) => {
    if (!answered) {
      setSelectedOption(optionIndex);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    
    setAnswered(true);
    const correctAnswer = getCorrectAnswer(questions[currentQuestion]);
    const isCorrect = selectedOption === correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setUserAnswers([...userAnswers, {
      question: currentQuestion,
      answer: selectedOption,
      correct: isCorrect
    }]);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0 && !answered) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null);
      setAnswered(false);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setAnswered(false);
    setScore(0);
    setShowResults(false);
    setUserAnswers([]);
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'Excellent work!';
    if (percentage >= 60) return 'Good job!';
    return 'Keep studying!';
  };

  if (showResults) {
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader className={isMobile ? "px-4 py-4" : ""}>
          <CardTitle className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-foreground text-center`}>
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className={`space-y-6 ${isMobile ? 'px-4' : ''}`}>
          <div className="text-center">
            <div className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold mb-2 ${getScoreColor()}`}>
              {score}/{questions.length}
            </div>
            <div className={`${isMobile ? 'text-base' : 'text-lg'} text-foreground mb-2`}>
              {((score / questions.length) * 100).toFixed(0)}%
            </div>
            <div className={`${isMobile ? 'text-base' : 'text-lg'} font-medium ${getScoreColor()}`}>
              {getScoreMessage()}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-foreground`}>Review Your Answers:</h3>
            {questions.map((question, idx) => {
              const userAnswer = userAnswers.find(ua => ua.question === idx);
              const correctAnswer = getCorrectAnswer(question);
              return (
                <div key={idx} className={`bg-[#2a2a2a] rounded-lg border border-gray-600 ${isMobile ? 'p-3' : 'p-4'}`}>
                  <h4 className={`text-foreground font-medium mb-3 ${isMobile ? 'text-sm' : ''}`}>
                    Question {idx + 1}: {question.question}
                  </h4>
                  <div className="space-y-2">
                    {question.options.map((option, optIdx) => (
                      <div
                        key={optIdx}
                        className={`flex items-center gap-2 px-3 py-2 rounded ${isMobile ? 'text-xs' : 'text-sm'} ${
                          optIdx === correctAnswer
                            ? 'bg-green-500/20 text-green-200'
                            : optIdx === userAnswer?.answer && userAnswer?.answer !== correctAnswer
                            ? 'bg-red-500/20 text-red-200'  
                            : 'text-foreground'
                        }`}
                      >
                        {optIdx === correctAnswer ? (
                          <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                        ) : optIdx === userAnswer?.answer && userAnswer?.answer !== correctAnswer ? (
                          <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
                        ) : (
                          <div className="h-4 w-4 flex-shrink-0" />
                        )}
                        <span className="break-words">{option}</span>
                      </div>
                    ))}
                  </div>
                  <div className={`mt-3 p-3 bg-[#1a1a1a] rounded ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    <p className="text-foreground">
                      <span className="font-medium">Explanation:</span> {question.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button 
              onClick={handleRestartQuiz}
              className={`bg-elec-yellow text-elec-dark hover:bg-yellow-500 transition-all duration-200 ${
                isMobile ? 'w-full py-3' : ''
              }`}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentCorrectAnswer = getCorrectAnswer(questions[currentQuestion]);
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader className={isMobile ? "px-4 py-4" : ""}>
        <CardTitle className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold text-foreground`}>
          {title}
        </CardTitle>
        
        {/* Progress Bar */}
        <div className="space-y-2 mt-4">
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className={`flex justify-between items-center ${isMobile ? 'text-xs' : 'text-sm'} text-foreground`}>
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>Score: {score}/{currentQuestion + (answered ? 1 : 0)}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className={`space-y-6 ${isMobile ? 'px-4' : ''}`}>
        <div className={`bg-[#323232] rounded-lg ${isMobile ? 'p-4' : 'p-6'}`}>
          <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-medium text-foreground mb-4`}>
            {questions[currentQuestion].question}
          </h3>
          
          <div className={`space-y-${isMobile ? '4' : '3'}`}>
            {questions[currentQuestion].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                disabled={answered}
                className={`w-full ${isMobile ? 'p-4 min-h-[56px] text-base' : 'p-3'} text-left border rounded-lg transition-all ${
                  answered
                    ? idx === currentCorrectAnswer
                      ? 'bg-green-500/20 border-green-500 text-green-200'
                      : idx === selectedOption
                      ? 'bg-red-500/20 border-red-500 text-red-200'
                      : 'bg-[#2a2a2a] border-gray-600 text-foreground'
                    : selectedOption === idx
                    ? 'bg-elec-yellow/20 border-elec-yellow text-elec-yellow'
                    : 'bg-[#2a2a2a] border-gray-600 text-foreground hover:bg-[#323232] active:bg-[#323232]'
                } ${isMobile ? 'touch-manipulation shadow-sm' : ''}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={`break-words leading-relaxed ${isMobile ? 'text-base' : ''}`}>{option}</span>
                  {answered && (
                    <div className="flex-shrink-0 mt-1">
                      {idx === currentCorrectAnswer ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : idx === selectedOption ? (
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                      ) : null}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {answered && (
          <Alert className={`bg-[#2a2a2a] border-gray-600 ${isMobile ? 'p-3' : ''}`}>
            <AlertDescription>
              <div className="space-y-2">
                <div className={`flex items-center gap-2 ${
                  selectedOption === currentCorrectAnswer ? 'text-green-200' : 'text-red-200'
                }`}>
                  {selectedOption === currentCorrectAnswer ? (
                    <CheckCircle className="h-4 w-4 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                  )}
                  <span className={`font-medium ${isMobile ? 'text-sm' : ''}`}>
                    {selectedOption === currentCorrectAnswer ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                {selectedOption !== currentCorrectAnswer && (
                  <p className={`text-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>
                    <span className="font-medium">Correct Answer:</span> {questions[currentQuestion].options[currentCorrectAnswer]}
                  </p>
                )}
                <p className={`text-foreground ${isMobile ? 'text-xs' : 'text-sm'} leading-relaxed`}>
                  <span className="font-medium">Explanation:</span> {questions[currentQuestion].explanation}
                </p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className={`flex ${isMobile ? 'flex-col gap-3' : 'justify-between items-center'}`}>
          {!isMobile && (
            <Button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0 || answered}
              variant="outline"
              className="bg-transparent border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-elec-dark disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
          )}

          {!answered ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
              className={`bg-elec-yellow text-elec-dark hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                isMobile ? 'w-full py-3' : ''
              }`}
            >
              Submit Answer
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              className={`bg-elec-yellow text-elec-dark hover:bg-yellow-500 ${
                isMobile ? 'w-full py-3' : ''
              }`}
            >
              {currentQuestion < questions.length - 1 ? (
                <>
                  Next Question
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                'Show Results'
              )}
            </Button>
          )}

          {isMobile && currentQuestion > 0 && !answered && (
            <Button
              onClick={handlePreviousQuestion}
              variant="outline"
              className="w-full py-3 bg-transparent border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-elec-dark"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Question
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SingleQuestionQuiz;