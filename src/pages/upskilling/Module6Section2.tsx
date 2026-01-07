import { ArrowLeft, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { RCDFundamentalsContent } from '@/components/upskilling/RCDFundamentalsContent';
import { RCDFundamentalsPractical } from '@/components/upskilling/RCDFundamentalsPractical';
import { RCDFundamentalsFAQ } from '@/components/upskilling/RCDFundamentalsFAQ';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';
import { rcdTypesQuizData } from '@/data/upskilling/rcdTypesQuizData';

const RCDTypesQuiz = () => {
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

  const handleSubmitAnswer = () => setShowResult(true);
  const handleNextQuestion = () => {
    if (currentQuestion < rcdTypesQuizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === rcdTypesQuizData[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  if (quizCompleted) {
    const score = calculateScore();
    const percentage = Math.round((score / rcdTypesQuizData.length) * 100);
    
    return (
      <Card className="bg-transparent border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Award className="h-5 w-5 text-elec-yellow" />
            Quiz Complete - RCD Types
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="space-y-2">
            <div className={`text-4xl font-bold ${percentage >= 80 ? 'text-green-400' : percentage >= 60 ? 'text-elec-yellow' : 'text-red-400'}`}>
              {score}/{rcdTypesQuizData.length}
            </div>
            <div className="text-white">Score: {percentage}%</div>
          </div>
          <Button onClick={() => window.location.reload()} className="bg-elec-yellow text-black hover:bg-elec-yellow min-h-[48px]">
            <RotateCcw className="mr-2 h-4 w-4" />
            Restart Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = rcdTypesQuizData[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;
  const userAnswer = selectedAnswers[currentQuestion];
  const isCorrect = userAnswer === question.correctAnswer;

  return (
    <Card className="bg-transparent border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-white">
          <span className="flex items-center gap-2">
            <Award className="h-5 w-5 text-elec-yellow" />
            RCD Types Quiz
          </span>
          <span className="text-sm text-white">{currentQuestion + 1} of {rcdTypesQuizData.length}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="w-full bg-transparent/80 rounded-full h-2">
          <div className="bg-elec-yellow h-2 rounded-full transition-all duration-300" style={{ width: `${((currentQuestion + 1) / rcdTypesQuizData.length) * 100}%` }} />
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white leading-relaxed">{question.question}</h3>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button key={index} variant="outline" className={`w-full justify-start text-left h-auto p-4 ${
                showResult
                  ? index === question.correctAnswer
                    ? "bg-green-600/20 text-green-200 border-green-600/30"
                    : index === userAnswer && userAnswer !== question.correctAnswer
                    ? "bg-red-600/20 text-red-200 border-red-600/30"
                    : "bg-transparent/80 text-white border-transparent"
                  : userAnswer === index
                  ? "bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30"
                  : "bg-transparent/80 text-white hover:bg-[#404040] border-transparent"
              }`} onClick={() => handleAnswerSelect(index)} disabled={showResult}>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-current/20 flex items-center justify-center text-xs font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                  {showResult && index === question.correctAnswer && <CheckCircle className="h-5 w-5 text-green-400 ml-auto" />}
                  {showResult && index === userAnswer && userAnswer !== question.correctAnswer && <XCircle className="h-5 w-5 text-red-400 ml-auto" />}
                </div>
              </Button>
            ))}
          </div>
        </div>
        {showResult && (
          <div className={`rounded-lg p-4 ${isCorrect ? 'bg-green-600/10 border border-green-600/20' : 'bg-red-600/10 border border-red-600/20'}`}>
            <div className="flex items-start gap-3">
              {isCorrect ? <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" /> : <XCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />}
              <div>
                <p className={`font-medium ${isCorrect ? 'text-green-200' : 'text-red-200'}`}>{isCorrect ? 'Correct!' : 'Incorrect'}</p>
                <p className="text-white text-sm mt-1">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between">
          <div className="text-sm text-white">Question {currentQuestion + 1} of {rcdTypesQuizData.length}</div>
          <div className="space-x-2">
            {!showResult && isAnswered && (
              <Button onClick={handleSubmitAnswer} className="bg-elec-yellow text-black hover:bg-elec-yellow min-h-[48px]">Submit Answer</Button>
            )}
            {showResult && (
              <Button onClick={handleNextQuestion} className="bg-elec-yellow text-black hover:bg-elec-yellow min-h-[48px]">
                {currentQuestion < rcdTypesQuizData.length - 1 ? 'Next Question' : 'Complete Quiz'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Module6Section2 = () => {
  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <Link to="../module-6">
          <Button variant="ghost" className="bg-transparent text-white hover:bg-transparent/80 hover:text-elec-yellow transition-all duration-200 mb-6 px-4 py-2 rounded-md min-h-[48px]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 6
          </Button>
        </Link>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Layers className="h-8 w-8 text-elec-yellow" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">Types of RCDs and Applications</h1>
          </div>
          <p className="text-sm sm:text-lg lg:text-xl text-white max-w-3xl leading-relaxed">Understanding different RCD types and their specific applications</p>
          <div className="flex gap-4">
            <Badge variant="secondary" className="bg-elec-yellow text-black">Module 6.2</Badge>
            <Badge variant="outline" className="border-gray-600 text-white">30 minutes</Badge>
          </div>
        </div>
      </header>
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          <RCDFundamentalsContent />
          <RCDFundamentalsPractical />
          <RCDFundamentalsFAQ />
          <RCDTypesQuiz />
        </div>
      </main>
      <footer className="px-4 sm:px-6 lg:px-8 pb-8">
        <div>
          <div className="flex justify-between items-center">
            <Link to="../module-6/section-1">
              <Button variant="outline" className="bg-transparent border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black transition-all duration-200 min-h-[48px]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: RCD Fundamentals
              </Button>
            </Link>
            <Link to="../module-6/section-3">
              <Button className="bg-elec-yellow text-black hover:bg-elec-yellow transition-all duration-200 min-h-[48px]">
                Next: Testing Procedures
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Module6Section2;