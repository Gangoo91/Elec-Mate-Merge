import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';
import { rcdTestingQuizData } from '@/data/upskilling/rcdTestingQuizData';

export const RCDTestingQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmitAnswer = () => {
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < rcdTestingQuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === rcdTestingQuizData[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResult(false);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const score = calculateScore();
    const percentage = Math.round((score / rcdTestingQuizData.length) * 100);
    
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Award className="h-5 w-5 text-elec-yellow" />
            Quiz Complete - RCD Testing Procedures
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-2">
            <div className={`text-4xl font-bold ${
              percentage >= 80 ? 'text-green-400' : 
              percentage >= 60 ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {score}/{rcdTestingQuizData.length}
            </div>
            <div className="text-foreground">Score: <span className={
              percentage >= 80 ? 'text-green-400' : 
              percentage >= 60 ? 'text-yellow-400' : 'text-red-400'
            }>{percentage}%</span></div>
          </div>
          
          <div className="space-y-4">
            {percentage >= 80 && (
              <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
                <p className="text-green-200 font-medium">Excellent! 🎉</p>
                <p className="text-sm sm:text-base text-foreground">
                  You have a strong understanding of RCD testing procedures and BS 7671 requirements.
                </p>
              </div>
            )}
            
            {percentage >= 60 && percentage < 80 && (
              <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4">
                <p className="text-yellow-200 font-medium">Good work! 👍</p>
                <p className="text-sm sm:text-base text-foreground">
                  You understand the key concepts. Review the test procedures and equipment requirements.
                </p>
              </div>
            )}
            
            {percentage < 60 && (
              <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-4">
                <p className="text-red-200 font-medium">Keep studying 📚</p>
                <p className="text-sm sm:text-base text-foreground">
                  Review the section content focusing on test currents, procedures, and safety requirements.
                </p>
              </div>
            )}
          </div>

          <Button 
            onClick={restartQuiz} 
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-500"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Restart Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = rcdTestingQuizData[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;
  const userAnswer = selectedAnswers[currentQuestion];
  const isCorrect = userAnswer === question.correctAnswer;

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-foreground">
          <span className="flex items-center gap-2">
            <Award className="h-5 w-5 text-elec-yellow" />
            RCD Testing Procedures Quiz
          </span>
          <span className="text-sm text-foreground">
            {currentQuestion + 1} of {rcdTestingQuizData.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="w-full bg-[#323232] rounded-full h-2">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentQuestion + 1) / rcdTestingQuizData.length) * 100}%` }} 
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-foreground leading-relaxed">
            {question.question}
          </h3>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button 
                key={index} 
                variant="outline" 
                className={`w-full justify-start text-left h-auto p-4 ${
                  showResult
                    ? index === question.correctAnswer
                      ? "bg-green-600/20 text-green-200 border-green-600/30"
                      : index === userAnswer && userAnswer !== question.correctAnswer
                      ? "bg-red-600/20 text-red-200 border-red-600/30"
                      : "bg-[#323232] text-foreground border-transparent"
                    : userAnswer === index
                    ? "bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30"
                    : "bg-[#323232] text-foreground hover:bg-[#404040] border-transparent"
                }`} 
                onClick={() => handleAnswerSelect(index)} 
                disabled={showResult}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-current/20 flex items-center justify-center text-xs font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                  {showResult && index === question.correctAnswer && (
                    <CheckCircle className="h-5 w-5 text-green-400 ml-auto" />
                  )}
                  {showResult && index === userAnswer && userAnswer !== question.correctAnswer && (
                    <XCircle className="h-5 w-5 text-red-400 ml-auto" />
                  )}
                </div>
              </Button>
            ))}
          </div>
        </div>

        {showResult && (
          <div className={`rounded-lg p-4 ${
            isCorrect 
              ? 'bg-green-600/10 border border-green-600/20' 
              : 'bg-red-600/10 border border-red-600/20'
          }`}>
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              ) : (
                <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              )}
              <div>
                <p className={`font-medium ${isCorrect ? 'text-green-200' : 'text-red-200'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="text-foreground text-sm sm:text-base mt-1">
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <div className="text-sm text-foreground">
            Question {currentQuestion + 1} of {rcdTestingQuizData.length}
          </div>
          <div className="space-x-2">
            {!showResult && isAnswered && (
              <Button 
                onClick={handleSubmitAnswer} 
                className="bg-elec-yellow text-elec-dark hover:bg-yellow-500"
              >
                Submit Answer
              </Button>
            )}
            {showResult && (
              <Button 
                onClick={handleNextQuestion} 
                className="bg-elec-yellow text-elec-dark hover:bg-yellow-500"
              >
                {currentQuestion < rcdTestingQuizData.length - 1 ? 'Next Question' : 'Complete Quiz'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

