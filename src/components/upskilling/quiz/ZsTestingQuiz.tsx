import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, CheckCircle, XCircle, RotateCcw, ArrowRight, ArrowLeft } from 'lucide-react';
import { zsTestingQuizQuestions } from '@/data/upskilling/zsTestingQuizData';

export function ZsTestingQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(zsTestingQuizQuestions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newSelectedAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < zsTestingQuizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(zsTestingQuizQuestions.length).fill(-1));
    setShowResults(false);
    setQuizCompleted(false);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === zsTestingQuizQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const getScoreColor = (score: number) => {
    const percentage = (score / zsTestingQuizQuestions.length) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBadge = (score: number) => {
    const percentage = (score / zsTestingQuizQuestions.length) * 100;
    if (percentage >= 80) return { text: 'Excellent', color: 'bg-green-600' };
    if (percentage >= 60) return { text: 'Good', color: 'bg-yellow-600' };
    return { text: 'Needs Improvement', color: 'bg-red-600' };
  };

  if (showResults) {
    const score = calculateScore();
    const badge = getScoreBadge(score);
    
    return (
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Brain className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-foreground">Quiz Results</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <h3 className={`text-3xl font-bold ${getScoreColor(score)}`}>
                {score}/{zsTestingQuizQuestions.length}
              </h3>
              <Badge className={`${badge.color} text-foreground`}>
                {badge.text}
              </Badge>
            </div>
            
            <div className="space-y-4">
              {zsTestingQuizQuestions.map((question, index) => (
                <div key={question.id} className="bg-elec-dark p-4 rounded-lg border border-gray-600">
                  <div className="flex items-start gap-3">
                    {selectedAnswers[index] === question.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                    )}
                    <div className="space-y-2">
                      <p className="text-foreground font-medium">{question.question}</p>
                      <p className="text-xs sm:text-sm text-foreground">
                        <span className="font-medium">Correct answer:</span> {question.options[question.correctAnswer]}
                      </p>
                      {selectedAnswers[index] !== question.correctAnswer && (
                        <p className="text-xs sm:text-sm text-red-300">
                          <span className="font-medium">Your answer:</span> {question.options[selectedAnswers[index]]}
                        </p>
                      )}
                      <p className="text-xs sm:text-sm text-foreground">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={handleRestart}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-500"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const question = zsTestingQuizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / zsTestingQuizQuestions.length) * 100;

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Brain className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-foreground">Knowledge Check</CardTitle>
          </div>
          <Badge variant="outline" className="border-elec-yellow text-elec-yellow">
            Question {currentQuestion + 1} of {zsTestingQuizQuestions.length}
          </Badge>
        </div>
        
        <div className="w-full bg-elec-dark rounded-full h-2">
          <div 
            className="bg-elec-yellow h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">{question.question}</h3>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
            className={`w-full p-3 sm:p-4 text-left rounded-lg border-2 transition-all duration-200 text-sm sm:text-base ${
              selectedAnswers[currentQuestion] === index
                ? 'border-elec-yellow bg-elec-yellow/10 text-foreground'
                : 'border-gray-600 bg-elec-dark text-foreground hover:border-gray-500'
            }`}
          >
            <span className="font-medium mr-2 sm:mr-3">
              {String.fromCharCode(65 + index)}.
            </span>
                {option}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="border-gray-600 text-foreground hover:bg-gray-700 px-3 py-2 sm:px-4 sm:py-3"
          >
            <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={selectedAnswers[currentQuestion] === -1}
            className="bg-elec-yellow text-elec-dark hover:bg-yellow-500 px-3 py-2 sm:px-4 sm:py-3"
          >
            {currentQuestion === zsTestingQuizQuestions.length - 1 ? 'Finish Quiz' : 'Next'}
            <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}